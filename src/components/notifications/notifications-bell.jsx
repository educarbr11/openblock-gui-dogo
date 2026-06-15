import React from 'react';
import PropTypes from 'prop-types';
import {
    Bell,
    CheckCheck,
    Heart,
    MessageCircle,
    Reply,
    Repeat2,
    Star
} from 'lucide-react';
import styles from './notifications-bell.css';

const typeIcon = {
    PROJECT_COMMENT: MessageCircle,
    COMMENT_REPLY: Reply,
    PROJECT_LIKE: Heart,
    PROJECT_FAVORITE: Star,
    PROJECT_REMIX: Repeat2
};

const formatDate = value => {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getInitials = user => (
    ((user && (user.name || user.username)) || '?')
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
);

const NotificationAvatar = ({user}) => (
    <span className={styles.avatar}>
        {user && user.avatarUrl ? (
            <img
                alt=""
                src={user.avatarUrl}
            />
        ) : getInitials(user)}
    </span>
);

NotificationAvatar.propTypes = {
    user: PropTypes.object
};

const NotificationItem = ({notification, onOpen}) => {
    const NotificationIcon = typeIcon[notification.type] || Bell;
    const actorName = notification.actor && (notification.actor.name || notification.actor.username);
    const unread = !notification.readAt;
    return (
        <button
            className={unread ? `${styles.item} ${styles.itemUnread}` : styles.item}
            onClick={() => onOpen(notification)}
        >
            <NotificationAvatar user={notification.actor} />
            <span className={styles.itemBody}>
                <p className={styles.message}>
                    <span className={styles.actor}>{actorName || 'Alguem'}</span>
                    {' '}
                    {notification.message}
                </p>
                {notification.project ? (
                    <p className={styles.project}>{notification.project.title}</p>
                ) : null}
                <p className={styles.date}>{formatDate(notification.createdAt)}</p>
            </span>
            {unread ? (
                <span
                    aria-label="Nao lida"
                    className={styles.unreadDot}
                />
            ) : (
                <NotificationIcon
                    aria-hidden="true"
                    className={styles.itemIcon}
                />
            )}
        </button>
    );
};

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired
};

const NotificationsDropdown = ({
    loading,
    notifications,
    unreadCount,
    onMarkAllRead,
    onOpenNotification
}) => (
    <div className={styles.dropdown}>
        <div className={styles.dropdownHeader}>
            <h2 className={styles.dropdownTitle}>Notificacoes</h2>
            <button
                className={styles.readAllButton}
                disabled={unreadCount === 0}
                onClick={onMarkAllRead}
            >
                <CheckCheck
                    aria-hidden="true"
                    className={styles.readAllIcon}
                />
                Marcar lidas
            </button>
        </div>
        {loading ? (
            <div className={styles.loading}>Carregando...</div>
        ) : notifications.length === 0 ? (
            <div className={styles.empty}>Nenhuma notificacao.</div>
        ) : (
            <div className={styles.list}>
                {notifications.map(notification => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onOpen={onOpenNotification}
                    />
                ))}
            </div>
        )}
        <div className={styles.footer}>
            {unreadCount > 0 ? `${unreadCount} nao lida(s)` : 'Tudo em dia'}
        </div>
    </div>
);

NotificationsDropdown.propTypes = {
    loading: PropTypes.bool,
    notifications: PropTypes.array,
    unreadCount: PropTypes.number,
    onMarkAllRead: PropTypes.func.isRequired,
    onOpenNotification: PropTypes.func.isRequired
};

NotificationsDropdown.defaultProps = {
    loading: false,
    notifications: [],
    unreadCount: 0
};

class NotificationsBell extends React.Component {
    constructor (props) {
        super(props);
        this.state = {open: false};
        this.handleToggle = this.handleToggle.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleOpenNotification = this.handleOpenNotification.bind(this);
        this.setWrapRef = this.setWrapRef.bind(this);
    }

    componentDidMount () {
        document.addEventListener('mousedown', this.handleDocumentClick);
    }

    componentWillUnmount () {
        document.removeEventListener('mousedown', this.handleDocumentClick);
    }

    setWrapRef (node) {
        this.wrapRef = node;
    }

    handleDocumentClick (event) {
        if (!this.state.open || !this.wrapRef || this.wrapRef.contains(event.target)) return;
        this.setState({open: false});
    }

    handleToggle () {
        this.setState(prevState => {
            const open = !prevState.open;
            if (open) this.props.onOpen();
            return {open};
        });
    }

    handleOpenNotification (notification) {
        this.setState({open: false});
        this.props.onOpenNotification(notification);
    }

    render () {
        const {
            loading,
            notifications,
            unreadCount,
            onMarkAllRead
        } = this.props;
        const badgeText = unreadCount > 99 ? '99+' : unreadCount;
        return (
            <span
                className={styles.wrap}
                ref={this.setWrapRef}
            >
                <button
                    className={styles.bellButton}
                    title="Notificacoes"
                    aria-label="Abrir notificacoes"
                    onClick={this.handleToggle}
                >
                    <Bell
                        aria-hidden="true"
                        className={styles.bellIcon}
                    />
                    {unreadCount > 0 ? (
                        <span className={styles.badge}>{badgeText}</span>
                    ) : null}
                </button>
                {this.state.open ? (
                    <NotificationsDropdown
                        loading={loading}
                        notifications={notifications}
                        unreadCount={unreadCount}
                        onMarkAllRead={onMarkAllRead}
                        onOpenNotification={this.handleOpenNotification}
                    />
                ) : null}
            </span>
        );
    }
}

NotificationsBell.propTypes = {
    loading: PropTypes.bool,
    notifications: PropTypes.array,
    unreadCount: PropTypes.number,
    onMarkAllRead: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    onOpenNotification: PropTypes.func.isRequired
};

NotificationsBell.defaultProps = {
    loading: false,
    notifications: [],
    unreadCount: 0
};

export default NotificationsBell;
