import * as Sentry from '@sentry/react';

const FEEDBACK_FLUSH_TIMEOUT_MS = 5000;
const FEEDBACK_DELIVERY_TIMEOUT_MS = 10000;
const REDACTED_VALUE = '[Filtered]';
const TRUNCATED_VALUE = '[Truncated]';
const SENSITIVE_KEY_PATTERN = /(authorization|cookie|password|secret|token|access[_-]?token|refresh[_-]?token)/i;
const DEFAULT_SENTRY_TUNNEL_URL = 'https://dogoblockapi.dogomaker.com/observability/envelope';
const LOOPBACK_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];

let initializationAttempted = false;
let initialized = false;
const feedbackDeliveryWaiters = [];

const getDsn = () => process.env.SENTRY_DSN || '';
const isLoopbackUrl = value => {
    try {
        return LOOPBACK_HOSTS.includes(new URL(value).hostname);
    } catch (error) {
        return false;
    }
};
const getTunnelUrl = () => {
    const configuredUrl = process.env.SENTRY_TUNNEL_URL ||
        `${process.env.DOGOBLOCK_API_HOST || 'https://dogoblockapi.dogomaker.com'}/observability/envelope`;
    if (process.env.NODE_ENV === 'production' && isLoopbackUrl(configuredUrl)) {
        return DEFAULT_SENTRY_TUNNEL_URL;
    }
    return configuredUrl;
};

const envelopeContainsFeedback = body => {
    if (!body) return false;
    if (typeof body === 'string') return body.slice(0, 4096).indexOf('"type":"feedback"') !== -1;
    if (typeof TextDecoder === 'undefined') return false;
    const bytes = body instanceof Uint8Array ? body : new Uint8Array(body);
    return new TextDecoder().decode(bytes.slice(0, 4096))
        .indexOf('"type":"feedback"') !== -1;
};

const settleNextFeedbackDelivery = error => {
    const waiter = feedbackDeliveryWaiters.shift();
    if (!waiter) return;
    clearTimeout(waiter.timeout);
    if (error) waiter.reject(error);
    else waiter.resolve();
};

const waitForFeedbackDelivery = () => new Promise((resolve, reject) => {
    const waiter = {resolve, reject, timeout: null};
    waiter.timeout = setTimeout(() => {
        const index = feedbackDeliveryWaiters.indexOf(waiter);
        if (index !== -1) feedbackDeliveryWaiters.splice(index, 1);
        reject(new Error('Sentry feedback delivery timed out'));
    }, FEEDBACK_DELIVERY_TIMEOUT_MS);
    feedbackDeliveryWaiters.push(waiter);
});

const trackedFetch = (url, options) => {
    const isFeedbackRequest = envelopeContainsFeedback(options && options.body);
    return fetch(url, options).then(response => {
        if (isFeedbackRequest) {
            settleNextFeedbackDelivery(response.ok ? null :
                new Error(`Sentry feedback request failed with status ${response.status}`));
        }
        return response;
    })
        .catch(error => {
            if (isFeedbackRequest) settleNextFeedbackDelivery(error);
            throw error;
        });
};

const createTrackedTransport = options => Sentry.makeFetchTransport(options, trackedFetch);

const getPlatform = () => {
    if (typeof process !== 'undefined' && process.versions && process.versions.electron) {
        return 'desktop';
    }
    return 'web';
};

const sanitizeUrl = value => {
    if (typeof value !== 'string' || !value) return value;

    try {
        const base = typeof window !== 'undefined' && window.location ?
            window.location.origin : 'https://dogoblock.local';
        const url = new URL(value, base);
        url.search = '';
        url.hash = '';

        if (/^[a-z][a-z\d+.-]*:/i.test(value)) return url.toString();
        return `${url.pathname}`;
    } catch (error) {
        return value.replace(/([?#]).*$/, '');
    }
};

const sanitizeObject = (value, depth) => {
    if (depth > 5) return TRUNCATED_VALUE;
    if (value === null || typeof value === 'undefined') return value;
    if (Array.isArray(value)) return value.map(item => sanitizeObject(item, depth + 1));
    if (typeof value !== 'object') return value;

    return Object.keys(value).reduce((result, key) => {
        if (SENSITIVE_KEY_PATTERN.test(key)) {
            result[key] = REDACTED_VALUE;
        } else if (key.toLowerCase().indexOf('url') !== -1 && typeof value[key] === 'string') {
            result[key] = sanitizeUrl(value[key]);
        } else {
            result[key] = sanitizeObject(value[key], depth + 1);
        }
        return result;
    }, {});
};

const sanitizeEvent = event => {
    if (!event) return event;

    const sanitized = Object.assign({}, event);
    if (sanitized.request) {
        sanitized.request = sanitizeObject(sanitized.request, 0);
        sanitized.request.url = sanitizeUrl(sanitized.request.url);
        delete sanitized.request.cookies;
        delete sanitized.request.data;
    }
    if (sanitized.contexts) sanitized.contexts = sanitizeObject(sanitized.contexts, 0);
    if (sanitized.extra) sanitized.extra = sanitizeObject(sanitized.extra, 0);
    delete sanitized.user;
    delete sanitized.breadcrumbs;
    return sanitized;
};

const getSafeRoute = () => {
    if (typeof window === 'undefined' || !window.location) return '';
    if (getPlatform() === 'desktop') {
        const route = new URLSearchParams(window.location.search).get('route') || 'app';
        return `/desktop/${route.replace(/[^a-z0-9_-]/gi, '') || 'app'}`;
    }
    const hash = (window.location.hash || '').replace(/[?].*$/, '');
    return `${window.location.pathname || '/'}${hash}`;
};

const getSafeContext = context => {
    let browser = '';
    let os = '';
    if (typeof navigator === 'object') {
        browser = navigator.userAgent;
        os = navigator.platform;
    }
    return Object.assign({
        browser,
        os,
        platform: getPlatform(),
        release: process.env.SENTRY_RELEASE || '',
        route: getSafeRoute()
    }, context || {});
};

const setContextTags = (scope, context) => {
    scope.setTag('platform', context.platform || 'unknown');
    scope.setTag('device', context.deviceId || 'none');
    scope.setTag('programMode', context.programMode || 'unknown');
    scope.setTag('locale', context.locale || 'unknown');
};

const readAttachmentData = data => {
    if (data instanceof Uint8Array) return Promise.resolve(data);
    if (data && typeof data.arrayBuffer === 'function') {
        return Promise.resolve(data.arrayBuffer()).then(buffer => new Uint8Array(buffer));
    }
    return Promise.reject(new Error('Unsupported screenshot data'));
};

const sanitizeAttachmentFilename = filename => String(filename || 'screenshot.png')
    .replace(/[^a-z0-9_.-]/gi, '_')
    .slice(-120);

const initializeSentry = () => {
    if (initializationAttempted) return initialized;
    initializationAttempted = true;

    if (!getDsn() || process.env.OPENBLOCK_TAURI_LIGHT === 'true') return false;

    const options = {
        dsn: getDsn(),
        environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',
        sendDefaultPii: false,
        tracesSampleRate: 0,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0,
        tunnel: getTunnelUrl(),
        transport: createTrackedTransport,
        integrations: defaultIntegrations => defaultIntegrations
            .filter(integration => integration.name !== 'Breadcrumbs')
            .concat(Sentry.feedbackIntegration({
                autoInject: false,
                colorScheme: 'system',
                enableScreenshot: true
            })),
        beforeSend: sanitizeEvent,
        initialScope: {
            tags: {
                application: 'dogoblock',
                platform: getPlatform()
            }
        }
    };
    if (process.env.SENTRY_RELEASE) options.release = process.env.SENTRY_RELEASE;
    try {
        Sentry.init(options);
        initialized = true;
        return true;
    } catch (error) {
        return false;
    }
};

const isFeedbackEnabled = () => {
    if (!initializationAttempted) initializeSentry();
    return initialized;
};

const captureAppException = (error, context) => {
    if (!isFeedbackEnabled()) return null;

    try {
        const safeContext = getSafeContext(context);
        let eventId = null;
        Sentry.withScope(scope => {
            scope.setTag('source', 'error-boundary');
            setContextTags(scope, safeContext);
            scope.setContext('dogoblock', sanitizeObject(safeContext, 0));
            eventId = Sentry.captureException(error);
        });
        return eventId;
    } catch (captureError) {
        return null;
    }
};

const submitFeedback = feedback => {
    if (!isFeedbackEnabled()) {
        return Promise.reject(new Error('Sentry feedback is not configured'));
    }
    if (typeof navigator === 'object' && navigator.onLine === false) {
        return Promise.reject(new Error('Network is offline'));
    }

    const context = getSafeContext(feedback.context);
    const tags = {
        'feedback.kind': feedback.category,
        'platform': context.platform,
        'device': context.deviceId || 'none',
        'programMode': context.programMode || 'unknown',
        'locale': context.locale || 'unknown'
    };
    const message = `[${feedback.category}] ${feedback.title.trim()}\n\n${feedback.description.trim()}`;
    const screenshotAttachment = feedback.screenshot && feedback.screenshot.data ?
        readAttachmentData(feedback.screenshot.data).then(data => ({
            contentType: feedback.screenshot.contentType,
            data,
            filename: sanitizeAttachmentFilename(feedback.screenshot.filename)
        })) : Promise.resolve(null);

    return screenshotAttachment.then(attachment => {
        const delivery = waitForFeedbackDelivery();
        let eventId = null;
        try {
            Sentry.withScope(scope => {
                scope.setContext('dogoblock', sanitizeObject(context, 0));
                const feedbackEvent = {
                    message,
                    source: feedback.associatedEventId ? 'dogoblock-crash-screen' : 'dogoblock-header',
                    tags
                };
                if (feedback.name) feedbackEvent.name = feedback.name.trim();
                if (feedback.email) feedbackEvent.email = feedback.email.trim();
                if (feedback.associatedEventId) feedbackEvent.associatedEventId = feedback.associatedEventId;
                eventId = attachment ?
                    Sentry.captureFeedback(feedbackEvent, {attachments: [attachment]}) :
                    Sentry.captureFeedback(feedbackEvent);
            });
        } catch (error) {
            settleNextFeedbackDelivery(error);
        }

        return Promise.all([
            delivery,
            Sentry.flush(FEEDBACK_FLUSH_TIMEOUT_MS)
        ]).then(results => {
            if (!results[1]) throw new Error('Sentry feedback delivery timed out');
            return eventId;
        });
    });
};

export {
    captureAppException,
    initializeSentry,
    isFeedbackEnabled,
    submitFeedback
};
