// Keeps Chrome's install prompt so DoGoBlock can show its own "Baixar app" button.
// The event can fire before React mounts, so listenForInstallPrompt runs at startup.
let deferredPrompt = null;
const listeners = new Set();

const isRunningAsApp = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' &&
    window.matchMedia('(display-mode: standalone)').matches;

const canInstallApp = () => Boolean(deferredPrompt) && !isRunningAsApp();

const notifyListeners = () => {
    listeners.forEach(listener => listener(canInstallApp()));
};

const listenForInstallPrompt = () => {
    if (typeof window === 'undefined' || process.env.OPENBLOCK_TAURI_LIGHT === 'true') return;
    window.addEventListener('beforeinstallprompt', event => {
        // Keep the event for the button instead of Chrome's own banner (shown on Android).
        event.preventDefault();
        deferredPrompt = event;
        notifyListeners();
    });
    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        notifyListeners();
    });
};

/**
 * Listen for changes in whether the app can be installed.
 * @param {function(boolean)} listener - called with the new availability.
 * @returns {function} unsubscribe function.
 */
const subscribeInstallAvailability = listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

/**
 * Show the browser's install dialog. A prompt can only be used once; Chrome sends a new
 * beforeinstallprompt event if the user dismisses it and the app is still installable.
 * @returns {Promise<string>} 'accepted', 'dismissed' or 'unavailable'.
 */
const promptInstallApp = () => {
    if (!deferredPrompt) return Promise.resolve('unavailable');
    const installPrompt = deferredPrompt;
    deferredPrompt = null;
    notifyListeners();
    return installPrompt.prompt()
        .then(() => installPrompt.userChoice)
        .then(choice => choice.outcome);
};

export {
    canInstallApp,
    listenForInstallPrompt,
    promptInstallApp,
    subscribeInstallAvailability
};
