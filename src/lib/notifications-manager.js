import {getApiHost} from './dogoblock-api-config';

const MIN_RETRY_MS = 2000;
const MAX_RETRY_MS = 32000;

/**
 * Manages a Server-Sent Events connection for notifications.
 * Automatically reconnects with exponential backoff when the connection drops.
 */
class NotificationsManager {
    constructor () {
        this._source = null;
        this._token = null;
        this._retryMs = MIN_RETRY_MS;
        this._retryTimer = null;
        this._destroyed = false;

        this.onNotification = null;  // (notification) => void
        this.onUnreadCount = null;   // (count) => void
        this.onReconnect = null;     // () => void
    }

    connect (token) {
        if (!token || typeof window === 'undefined' || typeof EventSource === 'undefined') return;
        this._token = token;
        this._destroyed = false;
        this._retryMs = MIN_RETRY_MS;
        this._openStream();
    }

    disconnect () {
        this._destroyed = true;
        this._clearRetryTimer();
        this._closeSource();
    }

    _openStream () {
        this._closeSource();
        if (!this._token || this._destroyed) return;

        const url = `${getApiHost()}/notifications/stream?token=${encodeURIComponent(this._token)}`;
        const source = new EventSource(url);
        this._source = source;

        source.addEventListener('notification', event => {
            try {
                const notification = JSON.parse(event.data);
                if (typeof this.onNotification === 'function') this.onNotification(notification);
                this._retryMs = MIN_RETRY_MS; // Reset backoff on successful message
            } catch {
                // Ignore malformed payloads
            }
        });

        source.addEventListener('unread-count', event => {
            try {
                const data = JSON.parse(event.data);
                if (typeof this.onUnreadCount === 'function') {
                    this.onUnreadCount(data.unreadCount || 0);
                }
                this._retryMs = MIN_RETRY_MS;
            } catch {
                // Ignore malformed payloads
            }
        });

        source.onerror = () => {
            this._closeSource();
            if (!this._destroyed) this._scheduleRetry();
        };
    }

    _closeSource () {
        if (this._source) {
            this._source.close();
            this._source = null;
        }
    }

    _scheduleRetry () {
        this._clearRetryTimer();
        if (this._destroyed) return;
        this._retryTimer = setTimeout(() => {
            if (!this._destroyed) {
                if (typeof this.onReconnect === 'function') this.onReconnect();
                this._openStream();
            }
        }, this._retryMs);
        this._retryMs = Math.min(this._retryMs * 2, MAX_RETRY_MS);
    }

    _clearRetryTimer () {
        if (this._retryTimer) {
            clearTimeout(this._retryTimer);
            this._retryTimer = null;
        }
    }
}

export default NotificationsManager;
