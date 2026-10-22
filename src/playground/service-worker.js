/* eslint-env serviceworker */
// Offline support for the installed DoGoBlock app (PWA). This file is not bundled: the
// PwaServiceWorkerPlugin in webpack.config.js emits it as sw.js and replaces the
// PRECACHE_* and ASSET_ORIGINS placeholders with the build file list.
//
// Every web visit registers this worker (Chrome requires it to offer installation), but
// files are only cached after the installed app window sends ENABLE_OFFLINE. Until then
// requests go straight to the network.

const PRECACHE_VERSION = /* PRECACHE_VERSION */'dev';
const PRECACHE_ENTRIES = /* PRECACHE_ENTRIES */[];
// Library sprites, backdrops and sounds are named by md5, so cached copies never go stale.
const ASSET_ORIGINS = /* ASSET_ORIGINS */[];

const PRECACHE_PREFIX = 'dogoblock-precache-';
const PRECACHE_NAME = `${PRECACHE_PREFIX}${PRECACHE_VERSION}`;
const RUNTIME_CACHE_NAME = 'dogoblock-runtime';
const SETTINGS_CACHE_NAME = 'dogoblock-settings';
const ASSET_CACHE_NAME = 'dogoblock-assets';
const REVISION_HEADER = 'X-DoGoBlock-Revision';
const PRECACHE_CONCURRENCY = 6;

const scopeUrl = path => new URL(path, self.registration.scope).href;
const APP_SHELL_URL = scopeUrl('index.html');
const OFFLINE_MARKER_URL = scopeUrl('__dogoblock/offline-enabled');

let offlineEnabled = null;
// An existing precache also counts: earlier versions cached files without writing the marker.
const isOfflineEnabled = () => {
    if (!offlineEnabled) {
        offlineEnabled = Promise.all([
            caches.open(SETTINGS_CACHE_NAME).then(cache => cache.match(OFFLINE_MARKER_URL)),
            caches.keys().then(names => names.some(name => name.startsWith(PRECACHE_PREFIX)))
        ]).then(([marker, hasPrecache]) => Boolean(marker) || hasPrecache);
    }
    return offlineEnabled;
};

const withRevision = async (response, revision) => {
    const headers = new Headers(response.headers);
    headers.set(REVISION_HEADER, revision);
    // Rebuilding the response also drops the `redirected` flag, which navigations reject.
    return new Response(await response.blob(), {
        status: response.status,
        statusText: response.statusText,
        headers
    });
};

const findPreviousRevision = async (url, revision) => {
    const names = (await caches.keys())
        .filter(name => name.startsWith(PRECACHE_PREFIX) && name !== PRECACHE_NAME);
    for (const name of names) {
        const cached = await (await caches.open(name)).match(url);
        if (cached && cached.headers.get(REVISION_HEADER) === revision) return cached;
    }
    return null;
};

// Only files whose content changed since the previous version are downloaded again.
const precacheEntry = async (cache, {url, revision}) => {
    const absoluteUrl = scopeUrl(url);
    const current = await cache.match(absoluteUrl);
    if (current && current.headers.get(REVISION_HEADER) === revision) return;
    const previous = await findPreviousRevision(absoluteUrl, revision);
    if (previous) {
        await cache.put(absoluteUrl, previous);
        return;
    }
    const response = await fetch(new Request(absoluteUrl, {cache: 'no-cache', credentials: 'same-origin'}));
    if (!response.ok) {
        throw new Error(`Could not precache ${url}: HTTP ${response.status}`);
    }
    await cache.put(absoluteUrl, await withRevision(response, revision));
};

const precache = async () => {
    const cache = await caches.open(PRECACHE_NAME);
    const queue = PRECACHE_ENTRIES.slice();
    const worker = async () => {
        while (queue.length) {
            await precacheEntry(cache, queue.shift());
        }
    };
    await Promise.all(Array.from({length: PRECACHE_CONCURRENCY}, worker));
};

const networkFirst = async request => {
    const cache = await caches.open(RUNTIME_CACHE_NAME);
    try {
        const response = await fetch(request);
        if (response.status === 200) await cache.put(request, response.clone());
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        if (cached) return cached;
        throw error;
    }
};

const cacheFirst = async request => {
    const cache = await caches.open(ASSET_CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.status === 200) await cache.put(request, response.clone());
    return response;
};

const enableOffline = async () => {
    const cache = await caches.open(SETTINGS_CACHE_NAME);
    await cache.put(OFFLINE_MARKER_URL, new Response('1'));
    offlineEnabled = Promise.resolve(true);
    await precache();
};

const respondSameOrigin = async request => {
    const precached = await caches.match(request, {cacheName: PRECACHE_NAME});
    if (precached) return precached;
    return (await isOfflineEnabled()) ? networkFirst(request) : fetch(request);
};

const respondAsset = async request => ((await isOfflineEnabled()) ? cacheFirst(request) : fetch(request));

const respondWithAppShell = async request => {
    const shell = await caches.match(APP_SHELL_URL, {cacheName: PRECACHE_NAME});
    return shell || fetch(request);
};

self.addEventListener('install', event => {
    event.waitUntil(isOfflineEnabled().then(enabled => (enabled ? precache() : null)));
});

// Sent by the installed app window on every launch; also finishes an interrupted download.
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'ENABLE_OFFLINE') {
        event.waitUntil(enableOffline());
    }
});

// A new version waits until every DoGoBlock window is closed, so an open editor never
// mixes files from two builds.
self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(names
            .filter(name => name.startsWith(PRECACHE_PREFIX) && name !== PRECACHE_NAME)
            .map(name => caches.delete(name)));
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', event => {
    const {request} = event;
    if (request.method !== 'GET') return;
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;

    const url = new URL(request.url);
    if (url.origin === self.location.origin) {
        if (request.mode === 'navigate') {
            const scopePath = new URL(self.registration.scope).pathname;
            if (url.pathname === scopePath || url.pathname === `${scopePath}index.html`) {
                event.respondWith(respondWithAppShell(request));
            }
            return;
        }
        event.respondWith(respondSameOrigin(request));
        return;
    }
    if (ASSET_ORIGINS.includes(url.origin)) {
        event.respondWith(respondAsset(request));
    }
});
