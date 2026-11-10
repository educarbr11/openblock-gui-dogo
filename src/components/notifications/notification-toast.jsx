import React from 'react';
import PropTypes from 'prop-types';
import {Bell, Heart, MessageCircle, Reply, Repeat2, Star, X} from 'lucide-react';
import styles from './notification-toast.css';

const typeIcon = {
    PROJECT_COMMENT: MessageCircle,
    COMMENT_REPLY: Reply,
    PROJECT_LIKE: Heart,
    PROJECT_FAVORITE: Star,
    PROJECT_REMIX: Repeat2
};

const getInitials = user => (
    ((user && (user.name || user.username)) || '?')
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
);

const NotificationToast = ({notification, onDismiss, onClick}) => {
    const Icon = typeIcon[notification.type] || Bell;
    const actorName = notification.actor && (notification.actor.name || notification.actor.username);

    return (
        <div
            className={styles.toast}
            role="alert"
            aria-live="polite"
        >
            <button
                className={styles.toastBody}
                onClick={onClick}
            >
                <span className={styles.toastAvatar}>
                    {notification.actor && notification.actor.avatarUrl ? (
                        <img
                            alt=""
                            src={notification.actor.avatarUrl}
                        />
                    ) : getInitials(notification.actor)}
                </span>
                <span className={styles.toastContent}>
                    <span className={styles.toastIconWrap}>
                        <Icon
                            aria-hidden="true"
                            className={styles.toastIcon}
                        />
                    </span>
                    <span className={styles.toastText}>
                        <strong className={styles.toastActor}>{actorName || 'Alguém'}</strong>
                        {' '}
                        {notification.message}
                    </span>
                </span>
            </button>
            <button
                aria-label="Fechar"
                className={styles.toastClose}
                onClick={onDismiss}
            >
                <X
                    aria-hidden="true"
                    className={styles.toastCloseIcon}
                />
            </button>
            <span
                aria-hidden="true"
                className={styles.toastProgress}
            />
        </div>
    );
};

NotificationToast.propTypes = {
    notification: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired
};

export default NotificationToast;
