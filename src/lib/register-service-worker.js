import log from './log';

// Only the installed app (PWA window) downloads the offline cache, so regular browser
// visits do not spend school bandwidth on files they may never use.
const isInstalledApp = () => typeof window.matchMedia === 'function' &&
    window.matchMedia('(display-mode: standalone)').matches;

const registerServiceWorker = () => {
    if (process.env.NODE_ENV !== 'production' || process.env.OPENBLOCK_TAURI_LIGHT === 'true') return;
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator) || !isInstalledApp()) return;
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(error => {
            log.warn('Could not register the DoGoBlock offline service worker', error);
        });
    });
};

export default registerServiceWorker;
