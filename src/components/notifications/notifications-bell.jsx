import React from 'react';
import PropTypes from 'prop-types';
import {
    Bell,
    CheckCheck,
    ChevronDown,
    Heart,
    MessageCircle,
    Reply,
    Repeat2,
    Star,
    X
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

const NotificationItem = ({notification, onOpen, onDelete}) => {
    const NotificationIcon = typeIcon[notification.type] || Bell;
    const actorName = notification.actor && (notification.actor.name || notification.actor.username);
    const unread = !notification.readAt;
    return (
        <div className={`${styles.item} ${unread ? styles.itemUnread : ''}`}>
            <button
                className={styles.itemMain}
                onClick={() => onOpen(notification)}
            >
                <NotificationAvatar user={notification.actor} />
                <span className={styles.itemBody}>
                    <p className={styles.message}>
                        <span className={styles.actor}>{actorName || 'Alguém'}</span>
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
                        aria-label="Não lida"
                        className={styles.unreadDot}
                    />
                ) : (
                    <NotificationIcon
                        aria-hidden="true"
                        className={styles.itemIcon}
                    />
                )}
            </button>
            <button
                aria-label="Remover notificação"
                className={styles.deleteBtn}
                title="Remover"
                onClick={e => {
                    e.stopPropagation();
                    onDelete(notification);
                }}
            >
                <X
                    aria-hidden="true"
                    className={styles.deleteBtnIcon}
                />
            </button>
        </div>
    );
};

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired
};

const NotificationsDropdown = ({
    loading,
    loadingMore,
    notifications,
    unreadCount,
    hasMore,
    onMarkAllRead,
    onOpenNotification,
    onDeleteNotification,
    onLoadMore
}) => (
    <div className={styles.dropdown}>
        <div className={styles.dropdownHeader}>
            <h2 className={styles.dropdownTitle}>Notificações</h2>
            <button
                className={styles.readAllButton}
                disabled={unreadCount === 0}
                onClick={onMarkAllRead}
            >
                <CheckCheck
                    aria-hidden="true"
                    className={styles.readAllIcon}
                />
                {'Marcar lidas'}
            </button>
        </div>

        {/* aria-live region announces new items to screen readers */}
        <div
            aria-live="polite"
            aria-relevant="additions"
            className={styles.list}
        >
            {loading && notifications.length === 0 ? (
                <div className={styles.loading}>{'Carregando...'}</div>
            ) : notifications.length === 0 ? (
                <div className={styles.empty}>{'Nenhuma notificação.'}</div>
            ) : (
                notifications.map(notification => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onDelete={onDeleteNotification}
                        onOpen={onOpenNotification}
                    />
                ))
            )}
        </div>

        {hasMore ? (
            <div className={styles.loadMoreWrap}>
                <button
                    className={styles.loadMoreButton}
                    disabled={loadingMore}
                    onClick={onLoadMore}
                >
                    {loadingMore ? (
                        'Carregando...'
                    ) : (
                        <>
                            <ChevronDown
                                aria-hidden="true"
                                className={styles.loadMoreIcon}
                            />
                            {'Ver mais'}
                        </>
                    )}
                </button>
            </div>
        ) : null}

        <div className={styles.footer}>
            {unreadCount > 0 ? `${unreadCount} não lida(s)` : 'Tudo em dia ✓'}
        </div>
    </div>
);

NotificationsDropdown.propTypes = {
    hasMore: PropTypes.bool,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool,
    notifications: PropTypes.array,
    unreadCount: PropTypes.number,
    onDeleteNotification: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    onMarkAllRead: PropTypes.func.isRequired,
    onOpenNotification: PropTypes.func.isRequired
};

NotificationsDropdown.defaultProps = {
    hasMore: false,
    loading: false,
    loadingMore: false,
    notifications: [],
    unreadCount: 0
};

class NotificationsBell extends React.Component {
    constructor (props) {
        super(props);
        this.state = {open: false, shaking: false};
        this.handleToggle = this.handleToggle.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleOpenNotification = this.handleOpenNotification.bind(this);
        this.setWrapRef = this.setWrapRef.bind(this);
    }

    componentDidMount () {
        document.addEventListener('mousedown', this.handleDocumentClick);
    }

    componentDidUpdate (prevProps) {
        // Trigger shake animation when unread count increases
        if (this.props.unreadCount > prevProps.unreadCount && !this.state.open) {
            this.triggerShake();
        }
    }

    componentWillUnmount () {
        document.removeEventListener('mousedown', this.handleDocumentClick);
        if (this._shakeTimer) clearTimeout(this._shakeTimer);
    }

    triggerShake () {
        this.setState({shaking: true});
        this._shakeTimer = setTimeout(() => this.setState({shaking: false}), 700);
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
            loadingMore,
            notifications,
            unreadCount,
            hasMore,
            onMarkAllRead,
            onDeleteNotification,
            onLoadMore
        } = this.props;
        const badgeText = unreadCount > 99 ? '99+' : unreadCount;
        const bellClass = [
            styles.bellIcon,
            this.state.shaking ? styles.bellShake : ''
        ].filter(Boolean).join(' ');

        return (
            <span
                className={styles.wrap}
                ref={this.setWrapRef}
            >
                <button
                    aria-label="Abrir notificações"
                    className={styles.bellButton}
                    title="Notificações"
                    onClick={this.handleToggle}
                >
                    <Bell
                        aria-hidden="true"
                        className={bellClass}
                    />
                    {unreadCount > 0 ? (
                        <span className={styles.badge}>{badgeText}</span>
                    ) : null}
                </button>
                {this.state.open ? (
                    <NotificationsDropdown
                        hasMore={hasMore}
                        loading={loading}
                        loadingMore={loadingMore}
                        notifications={notifications}
                        unreadCount={unreadCount}
                        onDeleteNotification={onDeleteNotification}
                        onLoadMore={onLoadMore}
                        onMarkAllRead={onMarkAllRead}
                        onOpenNotification={this.handleOpenNotification}
                    />
                ) : null}
            </span>
        );
    }
}

NotificationsBell.propTypes = {
    hasMore: PropTypes.bool,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool,
    notifications: PropTypes.array,
    unreadCount: PropTypes.number,
    onDeleteNotification: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    onMarkAllRead: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    onOpenNotification: PropTypes.func.isRequired
};

NotificationsBell.defaultProps = {
    hasMore: false,
    loading: false,
    loadingMore: false,
    notifications: [],
    unreadCount: 0
};

export default NotificationsBell;
