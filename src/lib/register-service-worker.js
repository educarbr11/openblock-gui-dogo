import log from './log';

const isInstalledApp = () => typeof window.matchMedia === 'function' &&
    window.matchMedia('(display-mode: standalone)').matches;

// Every web visit registers sw.js, which Chrome needs to offer the "Baixar app" install prompt.
// Only the installed app (PWA window) asks it to download the offline files, so regular
// browser visits do not spend school bandwidth on files they may never use.
const registerServiceWorker = () => {
    if (process.env.NODE_ENV !== 'production' || process.env.OPENBLOCK_TAURI_LIGHT === 'true' ||
        process.env.OPENBLOCK_TAURI_DESKTOP === 'true') return;
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(() => {
                if (!isInstalledApp()) return;
                return navigator.serviceWorker.ready.then(registration => {
                    registration.active.postMessage({type: 'ENABLE_OFFLINE'});
                });
            })
            .catch(error => {
                log.warn('Could not register the DoGoBlock service worker', error);
            });
    });
};

export default registerServiceWorker;
