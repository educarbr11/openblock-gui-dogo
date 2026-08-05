import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Code2,
    Compass,
    Copy,
    FolderOpen,
    Heart,
    LogIn,
    LogOut,
    MessageCircle,
    Plus,
    Save,
    Search,
    Settings,
    Star,
    Trash2,
    Upload,
    User,
    UserCircle,
    UserPlus
} from 'lucide-react';

import GUI from '../containers/gui.jsx';
import NotificationsBell from '../components/notifications/notifications-bell.jsx';
import NotificationToast from '../components/notifications/notification-toast.jsx';
import ProjectPageContainer from '../containers/project-page.jsx';
import MessageBoxType from '../lib/message-box.js';
import analytics from '../lib/analytics';
import {getAssetHost, getProjectHost} from '../lib/dogoblock-api-config';
import {
    deleteNotification,
    deleteProject,
    getUnreadCount,
    getMyProfile,
    getProjectDetails,
    getPublicUserProfile,
    listFavoriteProjects,
    listNotifications,
    listProjects,
    listPublicProjects,
    login,
    logout as apiLogout,
    markAllNotificationsRead,
    markNotificationRead,
    register,
    forgotPassword,
    resetPassword,
    updateMyProfile,
    updateProjectVisibility,
    updateProjectDetails,
    uploadProjectCover,
    likeProject,
    unlikeProject,
    favoriteProject,
    unfavoriteProject,
    postComment,
    getComments,
    deleteComment,
    remixProject
} from '../lib/dogoblock-api';
import NotificationsManager from '../lib/notifications-manager';
import {readAuthSession, writeAuthSession} from '../lib/auth-session';
import {defaultProjectId} from '../reducers/project-state';
import {loginSuccess, logout as logoutAction} from '../reducers/session';
import {setPlayer} from '../reducers/mode';

import dogoblockLogo from '../../static/dogoblock_logo_full.svg';
import heroIllustration from '../../static/hero-illustration.png';
import styles from './dogoblock-web-app.css';

const NOTIFICATIONS_PAGE_SIZE = 10;
const TOAST_DISMISS_MS = 5000;

const parseRoute = () => {
    const rawHash = window.location.hash.replace(/^#/, '');
    const legacyMatch = rawHash.match(/^(\d+)$/);
    if (legacyMatch) {
        return {name: 'editor', projectId: legacyMatch[1]};
    }
    const [path, query = ''] = (rawHash || '/').split('?');
    const parts = path.split('/').filter(Boolean);
    const queryParams = new URLSearchParams(query);
    if (!parts.length) return {name: 'home'};
    if (parts[0] === 'login') return {name: 'login', next: queryParams.get('next')};
    if (parts[0] === 'register') return {name: 'register', next: queryParams.get('next')};
    if (parts[0] === 'forgot-password') return {name: 'forgotPassword'};
    if (parts[0] === 'reset-password') return {name: 'resetPassword', token: queryParams.get('token')};
    if (parts[0] === 'profile') return {name: 'profile'};
    if (parts[0] === 'user' && parts[1]) return {name: 'publicProfile', username: parts[1]};
    if (parts[0] === 'explore') return {name: 'explore'};
    if (parts[0] === 'editor') {
        return {
            name: 'editor',
            projectId: parts[1],
            importProject: queryParams.has('import'),
            importKey: queryParams.get('import')
        };
    }
    if (parts[0] === 'projects' && parts[1]) return {name: 'projectDetails', projectId: parts[1]};
    return {name: 'projects'};
};

const navigate = hash => {
    window.location.hash = hash;
};

const noop = () => { };

const trackEvent = (action, label) => {
    analytics.event({
        category: 'dogoblock-web',
        action,
        label
    });
};

const currentRouteHash = () => window.location.hash.replace(/^#/, '') || '/';

const loginRouteFor = route => `/login?next=${encodeURIComponent(route || currentRouteHash())}`;

const formatDate = value => {
    if (!value) return '';
    return new Date(value).toLocaleDateString('pt-BR');
};

const getVisibilityLabel = visibility => {
    if (visibility === 'PUBLIC') return 'Publico';
    if (visibility === 'UNLISTED') return 'Nao listado';
    return 'Privado';
};

const getProjectThumbnail = project => (
    project.thumbnailUrl ||
    project.thumbnail ||
    project.image ||
    project.thumb ||
    null
);

const getProjectAuthor = project => (
    project.author ||
    project.username ||
    (project.owner && (project.owner.username || project.owner.name)) ||
    project.ownerUsername ||
    'Dogoblocker'
);

const getProjectInstructions = project => (
    project.instructions ||
    project.description ||
    'O autor ainda nao adicionou instrucoes para este projeto.'
);

const getProjectCredits = project => (
    project.notesAndCredits ||
    project.credits ||
    project.notes ||
    'O autor ainda nao adicionou notas ou creditos.'
);

const getProjectMetric = (project, fields) => {
    for (let i = 0; i < fields.length; i++) {
        const value = project[fields[i]];
        if (typeof value === 'number') return value;
    }
    return 0;
};

const getProjectPublicUrl = project => {
    const url = new URL(window.location.href);
    url.hash = `/projects/${project.id}`;
    return url.toString();
};

const getInitials = user => (
    ((user && (user.name || user.username)) || '?')
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
);

const renderProjectThumbnail = project => {
    const thumbnail = getProjectThumbnail(project);
    if (thumbnail) {
        return (
            <img
                alt=""
                className={styles.projectThumbnailImage}
                src={thumbnail}
            />
        );
    }
    return (
        <div className={styles.projectThumbnailFallback}>
            <span>{'DOGOBLOCK'}</span>
        </div>
    );
};

const Icon = ({children}) => (
    <span
        aria-hidden="true"
        className={styles.iconWrap}
    >
        {children}
    </span>
);

Icon.propTypes = {
    children: PropTypes.node
};

class DogoblockWebApp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            route: parseRoute(),
            error: null,
            loading: false,
            copyLinkFeedback: false,
            projects: [],
            projectDetails: null,
            featuredProjectDetails: null,
            profile: null,
            favoriteProjects: [],
            profileTab: 'overview',
            searchQuery: '',
            notifications: [],
            notificationsLoading: false,
            notificationsLoadingMore: false,
            notificationsPage: 1,
            notificationsHasMore: false,
            unreadCount: 0,
            toastNotification: null,
            // project details page state
            pdComments: [],
            pdCommentsLoading: false,
            pdCommentText: '',
            pdReplyToId: null,
            pdReplyText: '',
            pdReplyLoading: false,
            pdInstructions: '',
            pdCredits: '',
            pdSavingDetails: false,
            pdSaveDetailsFeedback: false,
            pdUploadingCover: false,
            pdLiked: false,
            pdFavorited: false,
            pdLikeCount: 0,
            pdStarCount: 0,
            // forgot/reset password
            forgotPasswordSuccess: false,
            resetPasswordSuccess: false,
            // public profile
            publicProfile: null
        };
        this.handleHashChange = this.handleHashChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleImportProject = this.handleImportProject.bind(this);
        this.handleDeleteProject = this.handleDeleteProject.bind(this);
        this.handleProjectCreated = this.handleProjectCreated.bind(this);
        this.handleNewProject = this.handleNewProject.bind(this);
        this.handleCopyProjectLink = this.handleCopyProjectLink.bind(this);
        this.handleOpenCurrentProject = this.handleOpenCurrentProject.bind(this);
        this.handleOpenProjectDetails = this.handleOpenProjectDetails.bind(this);
        this.handleDeleteProjectFromCard = this.handleDeleteProjectFromCard.bind(this);
        this.handleShowMessageBox = this.handleShowMessageBox.bind(this);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.handleUpdateVisibility = this.handleUpdateVisibility.bind(this);
        this.handleNavigateEditor = this.handleNavigateEditor.bind(this);
        this.handleNavigateExplore = this.handleNavigateExplore.bind(this);
        this.handleNavigateHome = this.handleNavigateHome.bind(this);
        this.handleNavigateLogin = this.handleNavigateLogin.bind(this);
        this.handleNavigateProfile = this.handleNavigateProfile.bind(this);
        this.handleNavigateProjects = this.handleNavigateProjects.bind(this);
        this.handleNavigateRegister = this.handleNavigateRegister.bind(this);
        this.handleRequestLoginToSave = this.handleRequestLoginToSave.bind(this);
        this.handleLoadNotifications = this.handleLoadNotifications.bind(this);
        this.handleLoadMoreNotifications = this.handleLoadMoreNotifications.bind(this);
        this.handleMarkAllNotificationsRead = this.handleMarkAllNotificationsRead.bind(this);
        this.handleOpenNotification = this.handleOpenNotification.bind(this);
        this.handleDeleteNotification = this.handleDeleteNotification.bind(this);
        this.handleDismissToast = this.handleDismissToast.bind(this);
        this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
        this.handleProfileTab = this.handleProfileTab.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handlePdLike = this.handlePdLike.bind(this);
        this.handlePdFavorite = this.handlePdFavorite.bind(this);
        this.handlePdRemix = this.handlePdRemix.bind(this);
        this.handlePdSaveDetails = this.handlePdSaveDetails.bind(this);
        this.handlePdInstructionsChange = this.handlePdInstructionsChange.bind(this);
        this.handlePdCreditsChange = this.handlePdCreditsChange.bind(this);
        this.handlePdCommentChange = this.handlePdCommentChange.bind(this);
        this.handlePdCommentSubmit = this.handlePdCommentSubmit.bind(this);
        this.handlePdCommentCancel = this.handlePdCommentCancel.bind(this);
        this.handlePdDeleteComment = this.handlePdDeleteComment.bind(this);
        this.handlePdReplyOpen = this.handlePdReplyOpen.bind(this);
        this.handlePdReplyChange = this.handlePdReplyChange.bind(this);
        this.handlePdReplySubmit = this.handlePdReplySubmit.bind(this);
        this.handlePdReplyCancel = this.handlePdReplyCancel.bind(this);
        this.handlePdDeleteReply = this.handlePdDeleteReply.bind(this);
        this.handlePdCoverChange = this.handlePdCoverChange.bind(this);
        this.renderHome = this.renderHome.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.renderRegister = this.renderRegister.bind(this);
        this.renderForgotPassword = this.renderForgotPassword.bind(this);
        this.renderResetPassword = this.renderResetPassword.bind(this);
        this.renderProjects = this.renderProjects.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.renderPublicProfile = this.renderPublicProfile.bind(this);
        this.renderProjectDetails = this.renderProjectDetails.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.handleNavigateForgotPassword = this.handleNavigateForgotPassword.bind(this);
        this.handleNavigatePublicProfile = this.handleNavigatePublicProfile.bind(this);
    }

    componentDidMount () {
        window.addEventListener('hashchange', this.handleHashChange);
        this.loadRouteData(this.state.route);
        this._notificationsManager = new NotificationsManager();
        this._notificationsManager.onNotification = notification => {
            this.setState(prevState => ({
                notifications: [
                    notification,
                    ...prevState.notifications.filter(item => item.id !== notification.id)
                ].slice(0, NOTIFICATIONS_PAGE_SIZE)
            }));
            // Only show toast on non-editor screens
            if (this.state.route.name !== 'editor') {
                this.showToast(notification);
            }
        };
        this._notificationsManager.onUnreadCount = count => {
            this.setState({unreadCount: count});
        };
        this.setupNotifications();
    }

    componentWillUnmount () {
        window.removeEventListener('hashchange', this.handleHashChange);
        if (this.copyLinkTimer) clearTimeout(this.copyLinkTimer);
        if (this._toastTimer) clearTimeout(this._toastTimer);
        if (this._notificationsManager) this._notificationsManager.disconnect();
        this.props.onSetPlayerOnly(false);
    }

    componentDidUpdate (prevProps) {
        const previousUserId = prevProps.user && prevProps.user.id;
        const currentUserId = this.props.user && this.props.user.id;
        if (previousUserId !== currentUserId) {
            this.setupNotifications();
        }
    }

    handleHashChange () {
        const route = parseRoute();
        this.setState({
            route,
            error: null
        }, () => this.loadRouteData(route));
    }

    loadRouteData (route) {
        this.props.onSetPlayerOnly(route.name === 'projectDetails');
        if (this.props.user && (route.name === 'login' || route.name === 'register')) {
            navigate(route.next || '/projects');
            return;
        }
        if (route.name === 'home') {
            this.setState({loading: true});
            listPublicProjects()
                .then(projects => this.setState({projects, loading: false}))
                .catch(() => this.setState({loading: false}));
        }
        if (route.name === 'profile') {
            if (!this.props.user) {
                navigate(loginRouteFor('/profile'));
                return;
            }
            this.setState({loading: true, error: null, featuredProjectDetails: null});
            Promise.all([
                getMyProfile(),
                listProjects(),
                listFavoriteProjects()
            ])
                .then(([profile, projects, favoriteProjects]) => {
                    this.setState({
                        profile,
                        projects,
                        favoriteProjects,
                        loading: false,
                        error: null
                    });
                    // Fetch details for up to 10 projects to find the most-liked one
                    const candidates = projects.slice(0, 10);
                    if (candidates.length > 0) {
                        Promise.all(
                            candidates.map(p => getProjectDetails(p.id).catch(() => null))
                        ).then(details => {
                            const valid = details.filter(Boolean);
                            if (!valid.length) return;
                            // Sort by likeCount desc, then favoriteCount desc as tiebreaker
                            valid.sort((a, b) => {
                                const likes = (b.likeCount || 0) - (a.likeCount || 0);
                                if (likes !== 0) return likes;
                                return (b.favoriteCount || 0) - (a.favoriteCount || 0);
                            });
                            this.setState({featuredProjectDetails: valid[0]});
                        }).catch(() => { /* silently ignore */ });
                    }
                })
                .catch(error => this.setState({error: error.message, loading: false}));
        }
        if (route.name === 'projects' || route.name === 'explore') {
            this.setState({loading: true});
            const loader = this.props.user && route.name === 'projects' ? listProjects : listPublicProjects;
            loader()
                .then(projects => this.setState({projects, loading: false}))
                .catch(error => this.setState({error: error.message, loading: false}));
        }
        if (route.name === 'publicProfile') {
            const {username} = route;
            this.setState({loading: true, error: null, publicProfile: null});
            getPublicUserProfile(username)
                .then(publicProfile => this.setState({publicProfile, loading: false, error: null}))
                .catch(error => this.setState({error: error.message, loading: false}));
        }
        if (route.name === 'projectDetails') {
            const requestedProjectId = route.projectId;
            this.setState({
                loading: true,
                projectDetails: null,
                pdComments: [],
                pdCommentText: '',
                pdLiked: false,
                pdFavorited: false,
                pdLikeCount: 0,
                pdStarCount: 0
            });
            Promise.all([
                getProjectDetails(requestedProjectId),
                getComments(requestedProjectId).catch(() => ({comments: []}))
            ])
                .then(([projectDetails, commentsResult]) => {
                    if (
                        this.state.route.name !== 'projectDetails' ||
                        this.state.route.projectId !== requestedProjectId
                    ) {
                        return;
                    }
                    this.setState({
                        projectDetails,
                        loading: false,
                        pdComments: commentsResult.comments || commentsResult || [],
                        pdInstructions: projectDetails.instructions || '',
                        pdCredits: projectDetails.notesAndCredits || projectDetails.credits || projectDetails.notes || '',
                        pdLiked: Boolean(projectDetails.liked || projectDetails.isLiked),
                        pdFavorited: Boolean(projectDetails.favorited || projectDetails.isFavorited),
                        pdLikeCount: getProjectMetric(projectDetails, ['likeCount', 'likes', 'totalLikes']),
                        pdStarCount: getProjectMetric(projectDetails, ['favoriteCount', 'favorites', 'starCount'])
                    });
                })
                .catch(error => {
                    if (
                        this.state.route.name !== 'projectDetails' ||
                        this.state.route.projectId !== requestedProjectId
                    ) {
                        return;
                    }
                    this.setState({error: error.message, loading: false});
                });
        }
    }

    handleLogin (event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        this.setState({error: null, loading: true});
        login({
            email: form.get('email'),
            password: form.get('password')
        })
            .then(session => {
                trackEvent('login success', 'email');
                this.props.onLoginSuccess(session);
                navigate(this.state.route.next || '/projects');
            })
            .catch(error => {
                trackEvent('login error', 'email');
                this.setState({error: error.message, loading: false});
            });
    }

    handleRegister (event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        this.setState({error: null, loading: true});
        register({
            name: form.get('name'),
            username: form.get('username'),
            email: form.get('email'),
            password: form.get('password')
        })
            .then(session => {
                trackEvent('register success', 'email');
                this.props.onLoginSuccess(session);
                navigate(this.state.route.next || '/projects');
            })
            .catch(error => {
                trackEvent('register error', 'email');
                this.setState({error: error.message, loading: false});
            });
    }

    handleLogout () {
        trackEvent('logout', 'header');
        this.closeNotificationsStream();
        apiLogout();
        this.props.onLogout();
        this.setState({
            notifications: [],
            unreadCount: 0,
            notificationsLoading: false
        });
        navigate('/projects');
    }

    setupNotifications () {
        if (this._notificationsManager) this._notificationsManager.disconnect();
        if (!this.props.user) {
            this.setState({
                notifications: [],
                unreadCount: 0,
                notificationsLoading: false,
                notificationsPage: 1,
                notificationsHasMore: false
            });
            return;
        }
        getUnreadCount()
            .then(result => this.setState({unreadCount: result.unreadCount || 0}))
            .catch(() => { });

        const session = readAuthSession();
        if (this._notificationsManager && session && session.accessToken) {
            this._notificationsManager.connect(session.accessToken);
        }
    }

    showToast (notification) {
        if (this._toastTimer) clearTimeout(this._toastTimer);
        this.setState({toastNotification: notification});
        this._toastTimer = setTimeout(() => {
            this.setState({toastNotification: null});
        }, TOAST_DISMISS_MS);
    }

    handleDismissToast () {
        if (this._toastTimer) clearTimeout(this._toastTimer);
        this.setState({toastNotification: null});
    }

    handleLoadNotifications () {
        if (!this.props.user) return;
        this.setState({notificationsLoading: true, notificationsPage: 1});
        listNotifications(1, NOTIFICATIONS_PAGE_SIZE)
            .then(result => this.setState({
                notifications: result.notifications || [],
                unreadCount: result.unreadCount || 0,
                notificationsPage: 1,
                notificationsHasMore: (result.notifications || []).length < (result.total || 0),
                notificationsLoading: false
            }))
            .catch(error => this.setState({
                error: error.message,
                notificationsLoading: false
            }));
    }

    handleLoadMoreNotifications () {
        if (!this.props.user || this.state.notificationsLoadingMore) return;
        const nextPage = this.state.notificationsPage + 1;
        this.setState({notificationsLoadingMore: true});
        listNotifications(nextPage, NOTIFICATIONS_PAGE_SIZE)
            .then(result => {
                const newItems = result.notifications || [];
                this.setState(prevState => ({
                    notifications: [
                        ...prevState.notifications,
                        ...newItems.filter(n => !prevState.notifications.find(e => e.id === n.id))
                    ],
                    notificationsPage: nextPage,
                    notificationsHasMore: newItems.length === NOTIFICATIONS_PAGE_SIZE &&
                        (prevState.notifications.length + newItems.length) < (result.total || 0),
                    notificationsLoadingMore: false
                }));
            })
            .catch(error => this.setState({error: error.message, notificationsLoadingMore: false}));
    }

    handleOpenNotification (notification) {
        const navigateToProject = () => {
            if (notification.projectId) {
                navigate(`/projects/${notification.projectId}`);
            }
        };
        if (!notification.readAt) {
            markNotificationRead(notification.id)
                .then(updated => {
                    this.setState(prevState => ({
                        notifications: prevState.notifications.map(item => (
                            item.id === notification.id ? Object.assign({}, item, updated) : item
                        )),
                        unreadCount: Math.max(0, prevState.unreadCount - 1)
                    }));
                    navigateToProject();
                })
                .catch(() => navigateToProject());
            return;
        }
        navigateToProject();
    }

    handleDeleteNotification (notification) {
        deleteNotification(notification.id)
            .then(() => {
                this.setState(prevState => ({
                    notifications: prevState.notifications.filter(item => item.id !== notification.id),
                    unreadCount: !notification.readAt
                        ? Math.max(0, prevState.unreadCount - 1)
                        : prevState.unreadCount
                }));
            })
            .catch(error => this.setState({error: error.message}));
    }

    handleMarkAllNotificationsRead () {
        if (!this.props.user || this.state.unreadCount === 0) return;
        markAllNotificationsRead()
            .then(result => this.setState(prevState => ({
                unreadCount: 0,
                notifications: prevState.notifications.map(item => Object.assign({}, item, {
                    readAt: item.readAt || result.readAt || new Date().toISOString()
                }))
            })))
            .catch(error => this.setState({error: error.message}));
    }

    handleImportProject () {
        const importRoute = `/editor?import=${Date.now()}`;
        if (!this.props.user) {
            trackEvent('import project requires login', 'anonymous');
            navigate(loginRouteFor(importRoute));
            return;
        }
        trackEvent('import project', 'authenticated');
        navigate(importRoute);
    }

    handleNewProject () {
        if (!this.props.user) {
            trackEvent('new project requires login', 'anonymous');
            navigate(loginRouteFor('/editor'));
            return;
        }
        trackEvent('new project', 'authenticated');
        navigate('/editor');
    }

    handleCopyProjectLink () {
        const project = this.state.projectDetails;
        if (!project) return;
        const link = getProjectPublicUrl(project);
        const onCopied = () => {
            if (this.copyLinkTimer) clearTimeout(this.copyLinkTimer);
            this.setState({copyLinkFeedback: true});
            this.copyLinkTimer = setTimeout(() => this.setState({copyLinkFeedback: false}), 2200);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link)
                .then(onCopied)
                .catch(() => { });
            return;
        }

        const textarea = document.createElement('textarea');
        textarea.value = link;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        onCopied();
    }

    handleDeleteProject () {
        if (!this.props.user) {
            navigate(loginRouteFor());
            return;
        }
        const id = this.state.route.projectId;
        if (!id) return;
        if (!window.confirm('Excluir este projeto? Esta acao nao pode ser desfeita.')) return; // eslint-disable-line no-alert
        this.setState({loading: true, error: null});
        deleteProject(id)
            .then(() => {
                trackEvent('delete project success', 'details');
                navigate('/projects');
            })
            .catch(error => {
                trackEvent('delete project error', 'details');
                this.setState({error: error.message, loading: false});
            });
    }

    handleDeleteProjectFromCard (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.props.user) {
            navigate(loginRouteFor());
            return;
        }
        const id = event.currentTarget.dataset.projectId;
        if (!id) return;
        if (!window.confirm('Excluir este projeto? Esta ação não pode ser desfeita.')) return; // eslint-disable-line no-alert
        this.setState({loading: true, error: null});
        deleteProject(id)
            .then(() => this.setState(prevState => ({
                projects: prevState.projects.filter(project => project.id !== id),
                favoriteProjects: prevState.favoriteProjects.filter(project => project.id !== id),
                loading: false,
                error: null
            }), () => trackEvent('delete project success', 'card')))
            .catch(error => {
                trackEvent('delete project error', 'card');
                this.setState({error: error.message, loading: false});
            });
    }

    handleProjectCreated (projectId) {
        if (projectId && projectId !== defaultProjectId) {
            trackEvent('project created', 'editor');
            navigate(`/editor/${projectId}`);
        }
    }

    handleOpenCurrentProject () {
        const project = this.state.projectDetails;
        this.props.onSetPlayerOnly(false);
        if (project) navigate(`/editor/${project.id}`);
    }

    handleOpenProjectDetails (event) {
        const projectId = event.currentTarget.dataset.projectId;
        if (projectId) navigate(`/projects/${projectId}`);
    }

    handleShowMessageBox (type, message) {
        if (type === MessageBoxType.confirm) return confirm(message); // eslint-disable-line no-alert
        if (type === MessageBoxType.alert) return alert(message); // eslint-disable-line no-alert
    }

    handleToggleVisibility () {
        const project = this.state.projectDetails;
        if (!project) return;
        const nextVisibility = project.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
        this.handleUpdateVisibility(nextVisibility);
    }

    handleUpdateVisibility (visibility) {
        const project = this.state.projectDetails;
        if (!this.props.user || !project) {
            navigate(loginRouteFor());
            return;
        }
        this.setState({loading: true, error: null});
        updateProjectVisibility(project.id, visibility)
            .then(() => getProjectDetails(project.id))
            .then(projectDetails => {
                trackEvent('update project visibility success', visibility);
                this.setState({projectDetails, loading: false, error: null});
            })
            .catch(error => {
                trackEvent('update project visibility error', visibility);
                this.setState({error: error.message, loading: false});
            });
    }

    handleNavigateHome () {
        navigate('/');
    }

    handleNavigateProjects () {
        navigate('/projects');
    }

    handleNavigateExplore () {
        navigate('/explore');
    }

    handleNavigateEditor () {
        navigate('/editor');
    }

    handleNavigateLogin () {
        navigate('/login');
    }

    handleNavigateProfile () {
        navigate('/profile');
    }

    handleNavigateRegister () {
        navigate('/register');
    }

    handleRequestLoginToSave () {
        trackEvent('save project requires login', 'anonymous');
        navigate(loginRouteFor(currentRouteHash()));
    }

    handleNavigateForgotPassword () {
        navigate('/forgot-password');
    }

    handleNavigatePublicProfile (usernameOrEvent) {
        const username = typeof usernameOrEvent === 'string'
            ? usernameOrEvent
            : usernameOrEvent.currentTarget.dataset.username;
        if (username) navigate(`/user/${username}`);
    }

    handleForgotPassword (event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        this.setState({error: null, loading: true, forgotPasswordSuccess: false});
        forgotPassword(form.get('email'))
            .then(() => this.setState({forgotPasswordSuccess: true, loading: false}))
            .catch(error => this.setState({error: error.message, loading: false}));
    }

    handleResetPassword (event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const password = form.get('password');
        const confirm = form.get('confirm');
        if (password !== confirm) {
            this.setState({error: 'As senhas não coincidem.'});
            return;
        }
        this.setState({error: null, loading: true, resetPasswordSuccess: false});
        resetPassword(this.state.route.token, password)
            .then(() => this.setState({resetPasswordSuccess: true, loading: false}))
            .catch(error => this.setState({error: error.message, loading: false}));
    }

    handleSearchChange (event) {
        this.setState({searchQuery: event.target.value});
    }

    handleProfileTab (event) {
        this.setState({profileTab: event.currentTarget.dataset.tab});
    }

    // ── Project Details handlers ─────────────────────────────────────────────

    handlePdLike () {
        const project = this.state.projectDetails;
        if (!project) return;
        if (!this.props.user) {
            navigate(loginRouteFor()); return;
        }
        const wasLiked = this.state.pdLiked;
        this.setState(prevState => ({
            pdLiked: !wasLiked,
            pdLikeCount: prevState.pdLikeCount + (wasLiked ? -1 : 1)
        }));
        const action = wasLiked ? unlikeProject : likeProject;
        action(project.id).then(() => {
            trackEvent(wasLiked ? 'unlike project' : 'like project', 'project details');
        }).catch(() => {
            // rollback on error
            this.setState(prevState => ({
                pdLiked: wasLiked,
                pdLikeCount: prevState.pdLikeCount + (wasLiked ? 1 : -1)
            }));
        });
    }

    handlePdFavorite () {
        const project = this.state.projectDetails;
        if (!project) return;
        if (!this.props.user) {
            navigate(loginRouteFor()); return;
        }
        const wasFavorited = this.state.pdFavorited;
        this.setState(prevState => ({
            pdFavorited: !wasFavorited,
            pdStarCount: prevState.pdStarCount + (wasFavorited ? -1 : 1)
        }));
        const action = wasFavorited ? unfavoriteProject : favoriteProject;
        action(project.id).then(() => {
            trackEvent(wasFavorited ? 'unfavorite project' : 'favorite project', 'project details');
        }).catch(() => {
            this.setState(prevState => ({
                pdFavorited: wasFavorited,
                pdStarCount: prevState.pdStarCount + (wasFavorited ? 1 : -1)
            }));
        });
    }

    handlePdRemix () {
        const project = this.state.projectDetails;
        if (!project) return;
        if (!this.props.user) {
            navigate(loginRouteFor()); return;
        }
        if (this.state.pdRemixing) return;
        this.setState({pdRemixing: true, error: null});
        remixProject(project.id)
            .then(result => {
                trackEvent('remix project success', 'project details');
                this.setState({pdRemixing: false});
                navigate(`/editor/${result.id}`);
            })
            .catch(err => {
                trackEvent('remix project error', 'project details');
                this.setState({pdRemixing: false, error: err.message || 'Erro ao replicar projeto'});
            });
    }

    handlePdSaveDetails () {
        const project = this.state.projectDetails;
        if (!project || !this.props.user) return;
        const {pdInstructions, pdCredits} = this.state;
        this.setState({pdSavingDetails: true, error: null});
        updateProjectDetails(project.id, {
            instructions: pdInstructions,
            notesAndCredits: pdCredits
        })
            .then(updated => {
                this.setState(prevState => ({
                    pdSavingDetails: false,
                    pdSaveDetailsFeedback: true,
                    projectDetails: Object.assign({}, prevState.projectDetails, updated)
                }));
                if (this.pdSaveFeedbackTimer) clearTimeout(this.pdSaveFeedbackTimer);
                this.pdSaveFeedbackTimer = setTimeout(
                    () => this.setState({pdSaveDetailsFeedback: false}), 2500
                );
            })
            .catch(err => this.setState({pdSavingDetails: false, error: err.message}));
    }

    handlePdInstructionsChange (event) {
        this.setState({pdInstructions: event.target.value});
    }

    handlePdCreditsChange (event) {
        this.setState({pdCredits: event.target.value});
    }

    handlePdCommentChange (event) {
        this.setState({pdCommentText: event.target.value});
    }

    handlePdCommentSubmit () {
        const project = this.state.projectDetails;
        if (!project || !this.props.user) {
            navigate(loginRouteFor()); return;
        }
        const content = this.state.pdCommentText.trim();
        if (!content) return;
        this.setState({pdCommentsLoading: true});
        postComment(project.id, content)
            .then(comment => {
                trackEvent('comment project success', 'project details');
                this.setState(prevState => ({
                    pdComments: [comment, ...prevState.pdComments],
                    pdCommentText: '',
                    pdCommentsLoading: false
                }));
            })
            .catch(err => {
                trackEvent('comment project error', 'project details');
                this.setState({pdCommentsLoading: false, error: err.message});
            });
    }

    handlePdCommentCancel () {
        this.setState({pdCommentText: ''});
    }

    handlePdDeleteComment (event) {
        const commentId = event.currentTarget.dataset.commentId;
        const project = this.state.projectDetails;
        if (!project || !commentId) return;
        deleteComment(project.id, commentId)
            .then(() => {
                this.setState(prevState => ({
                    pdComments: prevState.pdComments.filter(c => String(c.id) !== String(commentId))
                }));
            })
            .catch(err => this.setState({error: err.message}));
    }

    handlePdReplyOpen (event) {
        const parentId = event.currentTarget.dataset.commentId;
        this.setState({pdReplyToId: parentId, pdReplyText: ''});
    }

    handlePdReplyChange (event) {
        this.setState({pdReplyText: event.target.value});
    }

    handlePdReplyCancel () {
        this.setState({pdReplyToId: null, pdReplyText: ''});
    }

    handlePdReplySubmit () {
        const project = this.state.projectDetails;
        const {pdReplyToId, pdReplyText} = this.state;
        if (!project || !this.props.user) {
            navigate(loginRouteFor()); return;
        }
        const content = pdReplyText.trim();
        if (!content || !pdReplyToId) return;
        this.setState({pdReplyLoading: true});
        postComment(project.id, content, pdReplyToId)
            .then(reply => {
                trackEvent('reply comment success', 'project details');
                this.setState(prevState => ({
                    pdComments: prevState.pdComments.map(c => {
                        if (String(c.id) !== String(pdReplyToId)) return c;
                        return {...c, replies: [...(c.replies || []), reply]};
                    }),
                    pdReplyToId: null,
                    pdReplyText: '',
                    pdReplyLoading: false
                }));
            })
            .catch(err => {
                trackEvent('reply comment error', 'project details');
                this.setState({pdReplyLoading: false, error: err.message});
            });
    }

    handlePdDeleteReply (event) {
        const replyId = event.currentTarget.dataset.replyId;
        const parentId = event.currentTarget.dataset.parentId;
        const project = this.state.projectDetails;
        if (!project || !replyId) return;
        deleteComment(project.id, replyId)
            .then(() => {
                this.setState(prevState => ({
                    pdComments: prevState.pdComments.map(c => {
                        if (String(c.id) !== String(parentId)) return c;
                        return {...c, replies: (c.replies || []).filter(r => String(r.id) !== String(replyId))};
                    })
                }));
            })
            .catch(err => this.setState({error: err.message}));
    }

    handlePdCoverChange (event) {
        const file = event.target.files && event.target.files[0];
        const project = this.state.projectDetails;
        if (!file || !project) return;
        this.setState({pdUploadingCover: true});
        uploadProjectCover(project.id, file)
            .then(updated => {
                this.setState(prevState => ({
                    pdUploadingCover: false,
                    projectDetails: Object.assign({}, prevState.projectDetails, updated)
                }));
            })
            .catch(err => this.setState({pdUploadingCover: false, error: err.message}));
        // reset input so same file can be selected again
        event.target.value = '';
    }

    handleProfileSubmit (event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        this.setState({loading: true, error: null});
        updateMyProfile({
            name: form.get('name'),
            username: form.get('username'),
            email: form.get('email'),
            bio: form.get('bio'),
            workingOn: form.get('workingOn')
        })
            .then(profile => {
                const session = readAuthSession();
                if (session && session.accessToken) {
                    const nextSession = {
                        accessToken: session.accessToken,
                        user: Object.assign({}, session.user, profile)
                    };
                    writeAuthSession(nextSession);
                    this.props.onLoginSuccess(nextSession);
                }
                this.setState({profile, profileTab: 'overview', loading: false, error: null});
            })
            .catch(error => this.setState({error: error.message, loading: false}));
    }

    renderHeader () {
        const {user} = this.props;
        return (
            <header className={styles.topbar}>
                <div className={styles.topbarInner}>
                    <div
                        className={styles.brand}
                        onClick={this.handleNavigateHome}
                    >
                        <img
                            alt="Dogoblock"
                            className={styles.logo}
                            src={dogoblockLogo}
                        />
                    </div>
                    <nav className={styles.navCenter}>
                        <button
                            className={styles.navLink}
                            onClick={this.handleNavigateExplore}
                        >{'Explorar'}</button>
                        <button
                            className={styles.navLink}
                            onClick={this.handleNavigateProjects}
                        >{'Meus Projetos'}</button>
                        {user ? (
                            <button
                                className={styles.navLink}
                                onClick={this.handleNavigateProfile}
                            >{'Meu Perfil'}</button>
                        ) : null}
                        <button
                            className={styles.navBtnEditor}
                            onClick={this.handleNavigateEditor}
                        >
                            {'</> Editor'}
                        </button>
                    </nav>

                    <div className={styles.navRight}>
                        {user ? (
                            <React.Fragment>
                                <NotificationsBell
                                    loading={this.state.notificationsLoading}
                                    loadingMore={this.state.notificationsLoadingMore}
                                    notifications={this.state.notifications}
                                    unreadCount={this.state.unreadCount}
                                    hasMore={this.state.notificationsHasMore}
                                    onMarkAllRead={this.handleMarkAllNotificationsRead}
                                    onOpen={this.handleLoadNotifications}
                                    onOpenNotification={this.handleOpenNotification}
                                    onDeleteNotification={this.handleDeleteNotification}
                                    onLoadMore={this.handleLoadMoreNotifications}
                                />
                                <button
                                    aria-label="Meu Perfil"
                                    className={styles.navUserIconBtn}
                                    title="Meu Perfil"
                                    onClick={this.handleNavigateProfile}
                                >
                                    <UserCircle
                                        aria-hidden="true"
                                        size={26}
                                    />
                                </button>
                                <button
                                    className={`${styles.navLink} ${styles.navBtnSair}`}
                                    onClick={this.handleLogout}
                                >
                                    <LogOut
                                        aria-hidden="true"
                                        size={13}
                                    />
                                    {'Sair da Conta'}
                                </button>
                            </React.Fragment>
                        ) : (
                            <button
                                className={styles.navBtnCriarConta}
                                onClick={this.handleNavigateRegister}
                            >
                                {'Criar Conta'}
                            </button>
                        )}
                    </div>
                </div>
            </header>
        );
    }

    renderHome () {
        const featured = (this.state.projects || []).slice(0, 4);
        return (
            <div className={styles.homePage}>

                {/* ── HERO ────────────────────────────────── */}
                <section className={styles.heroSection}>
                    <div className={styles.heroInner}>
                        <div className={styles.heroCopyNew}>
                            <h1 className={styles.heroTitle}>
                                {'CRIE HISTÓRIAS, ANIMAÇÕES'}
                                <br />
                                {'E JOGOS COM O '}
                                <span className={styles.heroAccent}>{'DOGOBLOCK.'}</span>
                            </h1>
                            <div className={styles.heroActionsNew}>
                                <button
                                    className={styles.heroBtnPrimary}
                                    onClick={this.handleNavigateExplore}
                                >
                                    {'EXPLORAR PROJETOS'}
                                </button>
                                <button
                                    className={styles.heroBtnOutline}
                                    onClick={this.handleNewProject}
                                >
                                    {'COMEÇAR A CRIAR'}
                                </button>
                            </div>
                        </div>
                        <div
                            aria-hidden="true"
                            className={styles.heroIllustration}
                        >
                            <img
                                alt=""
                                src={heroIllustration}
                            />
                        </div>
                    </div>
                </section>

                {/* ── PROJETOS EM DESTAQUE ─────────────────── */}
                <section className={styles.featuredSection}>
                    <h2 className={styles.featuredTitle}>{'PROJETOS EM DESTAQUE'}</h2>
                    {featured.length === 0 ? (
                        <p className={styles.featuredEmpty}>
                            {this.state.loading ? 'Carregando projetos...' : 'Nenhum projeto em destaque ainda.'}
                        </p>
                    ) : (
                        <div className={styles.featuredGrid}>
                            {featured.map(project => (
                                <button
                                    className={styles.featuredCard}
                                    data-project-id={project.id}
                                    key={project.id}
                                    onClick={this.handleOpenProjectDetails}
                                >
                                    <div className={styles.featuredThumbnail}>
                                        {renderProjectThumbnail(project)}
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div className={styles.cardAvatarCol}>
                                            <User
                                                fill="currentColor"
                                                className={styles.cardAvatarIcon}
                                            />
                                        </div>
                                        <div className={styles.cardInfoCol}>
                                            <span className={styles.cardTitle}>
                                                {project.title || project.name || 'Projeto'}
                                            </span>
                                            <span className={styles.cardAuthor}>
                                                {getProjectAuthor(project)}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        );
    }

    renderFooter () {
        return (
            <footer className={styles.siteFooter}>
                <div className={styles.footerInner}>
                    <div className={styles.footerBrand}>
                        <img
                            alt="Editora DogoMaker"
                            className={styles.footerLogo}
                            src={dogoblockLogo}
                        />
                    </div>
                    <div className={styles.footerLinks}>
                        <strong>{'LINKS'}</strong>
                        <a
                            href="#"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{'Home'}</a>
                        <a
                            href="https://app.portaldogomaker.com.br"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{'Portal do Professor'}</a>
                        <a
                            href="https://www.editoradogomaker.com.br"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{'Site da Editora'}</a>
                    </div>
                    <div className={styles.footerLei}>
                        <strong>{'LEI'}</strong>
                        <a
                            href="#"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{'Termos de Uso'}</a>
                        <a
                            href="#"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{'Política de Privacidade'}</a>
                    </div>
                    <div className={styles.footerContact}>
                        <strong>{'CONTATO E ENDEREÇO'}</strong>
                        <span>{'contato@editoradogomaker.com'}</span>
                        <span>{'(31) 99259-9654'}</span>
                        <span>
                            {'BR-316, Km7, nº 186 – Qd. 201, Lt. 4776 (Loja)'}
                            <br />
                            {'Centro, Ananindeua – PA'}
                        </span>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    {'EDITORA DOGOMAKER - TODOS OS DIREITOS RESERVADOS'}
                </div>
            </footer>
        );
    }

    renderLogin () {
        return (
            <div className={styles.authSection}>
                <div className={styles.authCardWrap}>
                    <form
                        className={styles.panel}
                        onSubmit={this.handleLogin}
                    >
                        <h1>{'Entrar'}</h1>
                        {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}
                        <label className={styles.field}>
                            {'Email'}
                            <input
                                required
                                name="email"
                                type="email"
                            />
                        </label>
                        <label className={styles.field}>
                            {'Senha'}
                            <input
                                required
                                minLength="8"
                                name="password"
                                type="password"
                            />
                        </label>
                        <div className={styles.forgotPasswordRow}>
                            <button
                                className={styles.inlineButton}
                                type="button"
                                onClick={this.handleNavigateForgotPassword}
                            >
                                {'Esqueci minha senha'}
                            </button>
                        </div>
                        <button className={styles.primaryButton}>
                            <Icon><LogIn size={16} /></Icon>
                            {this.state.loading ? 'Entrando...' : 'Entrar'}
                        </button>
                        <p className={styles.formHint}>
                            {'Ainda nao tem conta? '}
                            <button
                                className={styles.inlineButton}
                                type="button"
                                onClick={this.handleNavigateRegister}
                            >
                                <UserPlus
                                    aria-hidden="true"
                                    className={styles.inlineIcon}
                                />
                                {'Cadastrar'}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

    renderRegister () {
        return (
            <div className={styles.authSection}>
                <div className={styles.authCardWrap}>
                    <form
                        className={styles.panel}
                        onSubmit={this.handleRegister}
                    >
                        <h1>{'Cadastrar'}</h1>
                        {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}
                        <label className={styles.field}>
                            {'Nome'}
                            <input
                                required
                                name="name"
                                type="text"
                            />
                        </label>
                        <label className={styles.field}>
                            {'Usuario'}
                            <input
                                required
                                minLength="3"
                                name="username"
                                type="text"
                            />
                        </label>
                        <label className={styles.field}>
                            {'Email'}
                            <input
                                required
                                name="email"
                                type="email"
                            />
                        </label>
                        <label className={styles.field}>
                            {'Senha'}
                            <input
                                required
                                minLength="8"
                                name="password"
                                type="password"
                            />
                        </label>
                        <button className={styles.primaryButton}>
                            <Icon><UserPlus size={16} /></Icon>
                            {this.state.loading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                        <p className={styles.formHint}>
                            {'Ja tem conta? '}
                            <button
                                className={styles.inlineButton}
                                type="button"
                                onClick={this.handleNavigateLogin}
                            >
                                <LogIn
                                    aria-hidden="true"
                                    className={styles.inlineIcon}
                                />
                                {'Entrar'}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

    renderProjects () {
        const publicList = !this.props.user || this.state.route.name === 'explore';
        const {searchQuery, projects} = this.state;
        
        const filteredProjects = projects.filter(project => {
            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase();
            const title = (project.title || project.name || '').toLowerCase();
            const author = getProjectAuthor(project).toLowerCase();
            return title.includes(query) || author.includes(query);
        });

        return (
            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <h1>{publicList ? 'Projetos Públicos' : 'Meus Projetos'}</h1>
                    <div className={styles.searchBar}>
                        <Search
                            className={styles.searchIcon}
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Buscar projetos..."
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            className={styles.searchInput}
                        />
                    </div>
                    {publicList ? null : (
                        <div className={styles.actions}>
                            <button
                                className={styles.secondaryButton}
                                onClick={this.handleImportProject}
                            >
                                <Icon><Upload size={16} /></Icon>
                                {'Importar Projeto'}
                            </button>
                            <button
                                className={styles.dangerButton}
                                onClick={this.handleNewProject}
                            >
                                <Icon><Plus size={16} /></Icon>
                                {'Criar Projeto'}
                            </button>
                        </div>
                    )}
                </div>
                {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}
                {this.state.loading ? <p>{'Carregando...'}</p> : null}
                {this.renderProjectCards(filteredProjects, !publicList)}
                {!this.state.loading && !filteredProjects.length ? (
                    <div className={styles.emptyState}>
                        {publicList ?
                            'Nenhum projeto publico encontrado.' :
                            'Voce ainda nao criou projetos.'}
                    </div>
                ) : null}
            </div>
        );
    }

    renderProjectCards (projects, canDeleteProjects) {
        return (
            <div className={styles.projectGrid}>
                {projects.map(project => (
                    <div
                        className={styles.projectCardWrap}
                        key={project.id}
                    >
                        <button
                            className={styles.projectCard}
                            data-project-id={project.id}
                            onClick={this.handleOpenProjectDetails}
                        >
                            <div className={styles.projectThumbnail}>
                                {renderProjectThumbnail(project)}
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.cardAvatarCol}>
                                    <User
                                        fill="currentColor"
                                        className={styles.cardAvatarIcon}
                                    />
                                </div>
                                <div className={styles.cardInfoCol}>
                                    <span className={styles.cardTitle}>
                                        {project.title || project.name || 'Projeto'}
                                    </span>
                                    <span className={styles.cardAuthor}>
                                        {getProjectAuthor(project)}
                                    </span>
                                </div>
                            </div>
                        </button>
                        {canDeleteProjects ? (
                            <button
                                className={styles.projectDeleteButton}
                                data-project-id={project.id}
                                title="Excluir projeto"
                                aria-label={`Excluir projeto ${project.title}`}
                                onClick={this.handleDeleteProjectFromCard}
                            >
                                <Trash2
                                    aria-hidden="true"
                                    size={15}
                                />
                            </button>
                        ) : null}
                    </div>
                ))}
            </div>
        );
    }

    renderProfile () {
        const profile = this.state.profile || this.props.user || {};
        const projects = this.state.projects;
        const favorites = this.state.favoriteProjects;
        // Use the first project as the "featured" one;
        // prefer the fully-loaded details (with stats) if available
        const featuredProject = this.state.featuredProjectDetails || projects[0] || null;

        return (
            <div className={`${styles.page} ${styles.profilePage}`}>
                {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}

                {/* ── TOP ROW: info card + featured project ─── */}
                <div className={styles.profileTopRow}>

                    {/* LEFT — user info card */}
                    <div className={`${styles.profileInfoCard} ${styles.panel}`}>
                        <div className={styles.profileInfoHeader}>
                            <div className={styles.profileAvatar}>
                                {profile.avatarUrl ? (
                                    <img
                                        alt={profile.username}
                                        src={profile.avatarUrl}
                                    />
                                ) : getInitials(profile)}
                            </div>
                            <div className={styles.profileNameStack}>
                                <h1 className={styles.profileName}>
                                    {profile.name || profile.username || 'Meu Perfil'}
                                </h1>
                                <span className={styles.profileUsername}>
                                    {`@${profile.username || 'usuario'}`}
                                </span>
                            </div>
                        </div>

                        <div className={styles.profileInfoBody}>
                            <div className={styles.profileSection}>
                                <h2 className={styles.profileSectionTitle}>{'Sobre mim'}</h2>
                                <p className={styles.profileSectionText}>
                                    {profile.bio || 'Adicione uma descrição para contar um pouco sobre você.'}
                                </p>
                            </div>

                            <div className={styles.profileSection}>
                                <h2 className={styles.profileSectionTitle}>{'No que estou trabalhando'}</h2>
                                <p className={styles.profileSectionText}>
                                    {profile.workingOn || 'Nenhum foco atual informado.'}
                                </p>
                            </div>

                            <button
                                className={styles.profileEditButton}
                                onClick={this.handleProfileTab}
                                data-tab="edit"
                            >
                                <Icon><Save size={15} /></Icon>
                                {'Editar perfil'}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT — projeto de destaque */}
                    <div className={`${styles.profileFeaturedCard} ${styles.panel}`}>
                        <div className={styles.profileFeaturedHeader}>
                            <h2 className={styles.profileFeaturedTitle}>{'PROJETO\nDE DESTAQUE'}</h2>
                        </div>
                        <div className={styles.profileFeaturedBody}>
                            {featuredProject ? (
                                <button
                                    className={styles.profileFeaturedThumb}
                                    data-project-id={featuredProject.id}
                                    onClick={this.handleOpenProjectDetails}
                                >
                                    {renderProjectThumbnail(featuredProject)}
                                </button>
                            ) : (
                                <div className={styles.profileFeaturedEmpty}>
                                    {'Nenhum projeto ainda.'}
                                </div>
                            )}
                            {featuredProject ? (
                                <div className={styles.profileFeaturedStats}>
                                    <span className={styles.profileFeaturedStat}>
                                        <Heart
                                            aria-hidden="true"
                                            size={16}
                                        />
                                        {getProjectMetric(featuredProject, ['likeCount', 'likes', 'totalLikes']) || 0}
                                    </span>
                                    <span className={styles.profileFeaturedStat}>
                                        <Star
                                            aria-hidden="true"
                                            size={16}
                                        />
                                        {getProjectMetric(featuredProject, ['favoriteCount', 'favorites', 'starCount']) || 0}
                                    </span>
                                    <span className={styles.profileFeaturedStat}>
                                        <FolderOpen
                                            aria-hidden="true"
                                            size={16}
                                        />
                                        {getProjectMetric(featuredProject, ['remixCount', 'remixes', 'forkCount']) || 0}
                                    </span>
                                    <span className={styles.profileFeaturedStat}>
                                        <MessageCircle
                                            aria-hidden="true"
                                            size={16}
                                        />
                                        {getProjectMetric(featuredProject, ['commentCount', 'comments']) || 0}
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* edit form (shown inline when tab = edit) */}
                {this.state.profileTab === 'edit' ? (
                    <form
                        className={`${styles.panel} ${styles.profileForm}`}
                        onSubmit={this.handleProfileSubmit}
                    >
                        <h2 className={styles.profileSectionTitle}>{'Editar Perfil'}</h2>
                        <label className={styles.field}>
                            {'Nome'}
                            <input
                                defaultValue={profile.name || ''}
                                maxLength="80"
                                name="name"
                                type="text"
                            />
                        </label>
                        <label className={styles.field}>
                            {'Usuário'}
                            <input
                                defaultValue={profile.username || ''}
                                maxLength="30"
                                minLength="3"
                                name="username"
                                type="text"
                            />
                        </label>
                        <label className={styles.field}>
                            {'Email'}
                            <input
                                defaultValue={profile.email || ''}
                                maxLength="120"
                                name="email"
                                type="email"
                            />
                        </label>
                        <label className={styles.field}>
                            {'Sobre mim'}
                            <textarea
                                defaultValue={profile.bio || ''}
                                maxLength="500"
                                name="bio"
                                rows="4"
                            />
                        </label>
                        <label className={styles.field}>
                            {'No que estou trabalhando'}
                            <textarea
                                defaultValue={profile.workingOn || ''}
                                maxLength="280"
                                name="workingOn"
                                rows="3"
                            />
                        </label>
                        <div className={styles.profileFormActions}>
                            <button className={styles.primaryButton}>
                                <Icon><Save size={16} /></Icon>
                                {this.state.loading ? 'Salvando...' : 'Salvar Perfil'}
                            </button>
                            <button
                                className={styles.secondaryButton}
                                type="button"
                                onClick={this.handleProfileTab}
                                data-tab="overview"
                            >
                                {'Cancelar'}
                            </button>
                        </div>
                    </form>
                ) : null}

                {/* ── PROJETOS ─────────────────────────────── */}
                <div className={styles.profileSection2}>
                    <div className={styles.profileSectionHeader}>
                        <h2 className={styles.profileSectionHeading}>
                            {`PROJETOS (${projects.length})`}
                        </h2>
                    </div>
                    <div className={styles.profileSectionBody}>
                        {projects.length ? (
                            this.renderProjectCards(projects, true)
                        ) : (
                            <div className={styles.emptyState}>{'Você ainda não criou projetos.'}</div>
                        )}
                    </div>
                </div>

                {/* ── FAVORITOS ────────────────────────────── */}
                <div className={styles.profileSection2}>
                    <div className={styles.profileSectionHeader}>
                        <h2 className={styles.profileSectionHeading}>
                            {`FAVORITOS (${favorites.length})`}
                        </h2>
                    </div>
                    <div className={styles.profileSectionBody}>
                        {favorites.length ? (
                            this.renderProjectCards(favorites, false)
                        ) : (
                            <div className={styles.emptyState}>{'Nenhum projeto favorito ainda.'}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    renderProjectDetails () {
        const {
            projectDetails, loading, error, route,
            pdComments, pdCommentsLoading, pdCommentText,
            pdReplyToId, pdReplyText, pdReplyLoading,
            pdInstructions, pdCredits,
            pdSavingDetails, pdSaveDetailsFeedback, pdUploadingCover,
            pdLiked, pdFavorited, pdLikeCount, pdStarCount
        } = this.state;
        const projectId = route.projectId;
        const project = projectDetails || {};
        const {user} = this.props;

        const isOwner = user && project.ownerId && String(user.id) === String(project.ownerId);
        const remixCount = getProjectMetric(project, ['remixCount', 'remixes', 'forkCount']);

        const thumbnail = getProjectThumbnail(project);
        const author = getProjectAuthor(project);
        const title = project.title || project.name || 'Projeto';
        const createdAt = formatDate(project.createdAt || project.created_at);
        const isPublic = project.visibility === 'PUBLIC';

        return (
            <div className={styles.pdPage}>
                {error ? <div className={styles.error}>{error}</div> : null}
                {loading ? <p className={styles.pdLoading}>{'Carregando...'}</p> : null}

                {/* ── HEADER ───────────────────────────────────── */}
                <div className={styles.pdHeader}>
                    {/* Left: thumb (clicável para trocar capa) + title info */}
                    <div className={styles.pdHeaderLeft}>
                        <div className={styles.pdThumbBox}>
                            {thumbnail ?
                                <img
                                    alt=""
                                    className={styles.pdThumbImg}
                                    src={thumbnail}
                                /> :
                                <div className={styles.pdThumbFallback}><span>{'DB'}</span></div>
                            }
                            {isOwner ? (
                                <label
                                    className={styles.pdThumbOverlay}
                                    htmlFor="pd-cover-input"
                                    title="Alterar capa"
                                >
                                    {pdUploadingCover ? '...' : (
                                        <Upload
                                            aria-hidden="true"
                                            size={18}
                                        />
                                    )}
                                    <input
                                        accept="image/*"
                                        className={styles.hiddenInput}
                                        id="pd-cover-input"
                                        type="file"
                                        onChange={this.handlePdCoverChange}
                                    />
                                </label>
                            ) : null}
                        </div>
                        <div className={styles.pdTitleGroup}>
                            <h1 className={styles.pdTitle}>{title.toUpperCase()}</h1>
                            <p className={styles.pdAuthor}>
                                {'Por '}
                                <button
                                    className={styles.authorLink}
                                    data-username={
                                        (project.owner && project.owner.username) || author
                                    }
                                    onClick={this.handleNavigatePublicProfile}
                                >
                                    {`@${author}`}
                                </button>
                            </p>
                            {createdAt ? <p className={styles.pdDate}>{`Criado em ${createdAt}`}</p> : null}
                        </div>
                    </div>

                    {/* Right: action buttons */}
                    <div className={styles.pdHeaderActions}>
                        {isOwner ? (
                            <button
                                className={isPublic ? styles.pdBtnVisibilityPublic : styles.pdBtnVisibilityPrivate}
                                onClick={this.handleToggleVisibility}
                            >
                                {isPublic ? 'Público' : 'Privado'}
                            </button>
                        ) : (
                            <span className={isPublic ? styles.pdBtnVisibilityPublic : styles.pdBtnVisibilityPrivate}>
                                {isPublic ? 'Público' : 'Privado'}
                            </span>
                        )}
                        {isOwner ? (
                            <button
                                className={styles.pdBtnDelete}
                                onClick={this.handleDeleteProject}
                            >
                                {'Excluir Projeto'}
                            </button>
                        ) : null}
                    </div>
                </div>

                {/* ── MAIN GRID ────────────────────────────────── */}
                <div className={styles.pdMainGrid}>

                    {/* LEFT: player only (no wrapper chrome) + stats + "Ver por dentro" */}
                    <div className={styles.pdPlayerCol}>
                        {/* Stage / player */}
                        <div className={styles.pdStage}>
                            {projectId ? (
                                <GUI
                                    key={`project-page-player-${projectId}`}
                                    canCreateNew={false}
                                    canEditTitle={false}
                                    canSave={false}
                                    assetHost={getAssetHost()}
                                    projectHost={getProjectHost()}
                                    projectId={projectId}
                                    routeProjectId={projectId}
                                    onProjectLoaded={noop}
                                    onShowMessageBox={this.handleShowMessageBox}
                                />
                            ) : null}
                        </div>

                        {/* Stats row (like/fav buttons) + "Ver por dentro" */}
                        <div className={styles.pdStatsRow}>
                            <div className={styles.pdStats}>
                                <button
                                    className={pdLiked ? styles.pdStatBtnActiveLike : styles.pdStatBtn}
                                    title={pdLiked ? 'Descurtir' : 'Curtir'}
                                    onClick={this.handlePdLike}
                                >
                                    <Heart
                                        aria-hidden="true"
                                        fill={pdLiked ? 'currentColor' : 'none'}
                                        size={16}
                                    />
                                    {pdLikeCount}
                                </button>
                                <button
                                    className={pdFavorited ? styles.pdStatBtnActiveFav : styles.pdStatBtn}
                                    title={pdFavorited ? 'Remover dos favoritos' : 'Favoritar'}
                                    onClick={this.handlePdFavorite}
                                >
                                    <Star
                                        aria-hidden="true"
                                        fill={pdFavorited ? 'currentColor' : 'none'}
                                        size={16}
                                    />
                                    {pdStarCount}
                                </button>
                                {/* Botão Replicar */}
                                <button
                                    className={styles.pdStatBtn}
                                    disabled={this.state.pdRemixing}
                                    title={this.state.pdRemixing ? 'Replicando...' : 'Replicar projeto para a minha biblioteca'}
                                    onClick={this.handlePdRemix}
                                >
                                    <Copy
                                        aria-hidden="true"
                                        size={16}
                                    />
                                    {this.state.pdRemixing ? '...' : remixCount}
                                </button>
                            </div>
                            <button
                                className={styles.pdBtnSeeInside}
                                onClick={() => navigate(`/editor/${projectId}`)}
                            >
                                <Code2
                                    aria-hidden="true"
                                    size={15}
                                />
                                {'Ver por dentro'}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Instructions + Notes + Save button */}
                    <div className={styles.pdInfoCol}>
                        <div className={styles.pdInfoSection}>
                            <label
                                className={styles.pdInfoLabel}
                                htmlFor="pd-instructions"
                            >
                                {'Instruções'}
                            </label>
                            <textarea
                                className={styles.pdInfoTextarea}
                                id="pd-instructions"
                                readOnly={!isOwner}
                                rows={6}
                                value={isOwner ? pdInstructions : (project.instructions || '')}
                                onChange={isOwner ? this.handlePdInstructionsChange : undefined}
                            />
                        </div>

                        <div className={styles.pdInfoSection}>
                            <label
                                className={styles.pdInfoLabel}
                                htmlFor="pd-credits"
                            >
                                {'Notas e créditos'}
                            </label>
                            <textarea
                                className={styles.pdInfoTextarea}
                                id="pd-credits"
                                readOnly={!isOwner}
                                rows={6}
                                value={isOwner ? pdCredits : (project.notesAndCredits || project.credits || project.notes || '')}
                                onChange={isOwner ? this.handlePdCreditsChange : undefined}
                            />
                        </div>

                        {isOwner ? (
                            <button
                                className={pdSaveDetailsFeedback ?
                                    styles.pdBtnSaveDetailsDone :
                                    styles.pdBtnSaveDetails}
                                disabled={pdSavingDetails}
                                onClick={this.handlePdSaveDetails}
                            >
                                <Save
                                    aria-hidden="true"
                                    size={14}
                                />
                                {pdSavingDetails ?
                                    'Salvando...' :
                                    pdSaveDetailsFeedback ?
                                        'Salvo! ✓' :
                                        'Salvar alterações'}
                            </button>
                        ) : null}
                    </div>
                </div>

                {/* ── COMENTÁRIOS ──────────────────────────────── */}
                <div className={styles.pdComments}>
                    <h2 className={styles.pdCommentsTitle}>{'Comentários'}</h2>

                    {/* Composer */}
                    <div className={styles.pdCommentComposer}>
                        <div className={styles.pdCommentAvatar}>
                            {user ?
                                <span className={styles.pdCommentAvatarInitials}>{getInitials(user)}</span> :
                                <UserCircle
                                    aria-hidden="true"
                                    size={28}
                                />
                            }
                        </div>
                        <div className={styles.pdCommentInputWrap}>
                            <textarea
                                className={styles.pdCommentInput}
                                id="pd-comment-input"
                                placeholder={user ? 'Escreva um comentário...' : 'Faça login para comentar'}
                                rows={3}
                                value={pdCommentText}
                                onChange={this.handlePdCommentChange}
                            />
                            <div className={styles.pdCommentActions}>
                                <button
                                    className={styles.pdBtnPublish}
                                    disabled={pdCommentsLoading || !pdCommentText.trim()}
                                    onClick={this.handlePdCommentSubmit}
                                >
                                    {pdCommentsLoading ? 'Publicando...' : 'Publicar'}
                                </button>
                                <button
                                    className={styles.pdBtnCancel}
                                    onClick={this.handlePdCommentCancel}
                                >
                                    {'Cancelar'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comment list */}
                    {pdComments.length > 0 ? (
                        <ul className={styles.pdCommentList}>
                            {pdComments.map(comment => {
                                const commentAuthor = comment.username || comment.author || (comment.user && (comment.user.username || comment.user.name)) || 'Usuário';
                                const commentUsername = (comment.user && comment.user.username) || comment.username || commentAuthor;
                                const canDelete = user && (String(user.id) === String(comment.userId || (comment.user && comment.user.id)) || isOwner);
                                const isReplying = pdReplyToId === String(comment.id);
                                return (
                                    <li
                                        className={styles.pdCommentItem}
                                        key={comment.id}
                                    >
                                        <div className={styles.pdCommentItemAvatar}>
                                            <UserCircle
                                                aria-hidden="true"
                                                size={32}
                                            />
                                        </div>
                                        <div className={styles.pdCommentItemBody}>
                                            <button
                                                className={styles.pdCommentItemAuthorLink}
                                                data-username={commentUsername}
                                                onClick={this.handleNavigatePublicProfile}
                                            >
                                                {`@${commentAuthor}`}
                                            </button>
                                            <p className={styles.pdCommentItemText}>{comment.content}</p>

                                            {/* Reply button */}
                                            {user ? (
                                                <button
                                                    className={styles.pdCommentReplyBtn}
                                                    data-comment-id={comment.id}
                                                    onClick={isReplying ? this.handlePdReplyCancel : this.handlePdReplyOpen}
                                                >
                                                    <MessageCircle
                                                        aria-hidden="true"
                                                        size={12}
                                                    />
                                                    {isReplying ? 'Cancelar' : 'Responder'}
                                                </button>
                                            ) : null}

                                            {/* Inline reply composer */}
                                            {isReplying ? (
                                                <div className={styles.pdReplyComposer}>
                                                    <div
                                                        className={styles.pdCommentAvatar}
                                                        style={{width: '2rem', height: '2rem'}}
                                                    >
                                                        <span
                                                            className={styles.pdCommentAvatarInitials}
                                                            style={{fontSize: '0.7rem'}}
                                                        >{getInitials(user)}</span>
                                                    </div>
                                                    <div className={styles.pdCommentInputWrap}>
                                                        <textarea
                                                            autoFocus
                                                            className={styles.pdCommentInput}
                                                            placeholder={`Respondendo a @${commentAuthor}...`}
                                                            rows={2}
                                                            value={pdReplyText}
                                                            onChange={this.handlePdReplyChange}
                                                        />
                                                        <div className={styles.pdCommentActions}>
                                                            <button
                                                                className={styles.pdBtnPublish}
                                                                disabled={pdReplyLoading || !pdReplyText.trim()}
                                                                onClick={this.handlePdReplySubmit}
                                                            >
                                                                {pdReplyLoading ? 'Enviando...' : 'Responder'}
                                                            </button>
                                                            <button
                                                                className={styles.pdBtnCancel}
                                                                onClick={this.handlePdReplyCancel}
                                                            >
                                                                {'Cancelar'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}

                                            {/* Replies list */}
                                            {comment.replies && comment.replies.length > 0 ? (
                                                <ul className={styles.pdReplyList}>
                                                    {comment.replies.map(reply => {
                                                        const replyAuthor = reply.username || reply.author || (reply.user && (reply.user.username || reply.user.name)) || 'Usuário';
                                                        const replyUsername = (reply.user && reply.user.username) || reply.username || replyAuthor;
                                                        const canDeleteReply = user && (String(user.id) === String(reply.userId || (reply.user && reply.user.id)) || isOwner);
                                                        return (
                                                            <li
                                                                className={styles.pdReplyItem}
                                                                key={reply.id}
                                                            >
                                                                <div className={styles.pdCommentItemAvatar}>
                                                                    <UserCircle
                                                                        aria-hidden="true"
                                                                        size={24}
                                                                    />
                                                                </div>
                                                                <div className={styles.pdCommentItemBody}>
                                                                    <button
                                                                        className={styles.pdCommentItemAuthorLink}
                                                                        data-username={replyUsername}
                                                                        onClick={this.handleNavigatePublicProfile}
                                                                    >
                                                                        {`@${replyAuthor}`}
                                                                    </button>
                                                                    <p className={styles.pdCommentItemText}>{reply.content}</p>
                                                                </div>
                                                                {canDeleteReply ? (
                                                                    <button
                                                                        aria-label="Excluir resposta"
                                                                        className={styles.pdCommentItemDelete}
                                                                        data-reply-id={reply.id}
                                                                        data-parent-id={comment.id}
                                                                        onClick={this.handlePdDeleteReply}
                                                                    >
                                                                        <Trash2
                                                                            aria-hidden="true"
                                                                            size={14}
                                                                        />
                                                                    </button>
                                                                ) : null}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            ) : null}
                                        </div>
                                        {canDelete ? (
                                            <button
                                                aria-label="Excluir comentário"
                                                className={styles.pdCommentItemDelete}
                                                data-comment-id={comment.id}
                                                onClick={this.handlePdDeleteComment}
                                            >
                                                <Trash2
                                                    aria-hidden="true"
                                                    size={14}
                                                />
                                            </button>
                                        ) : null}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className={styles.pdCommentEmpty}>{'Nenhum comentário ainda. Seja o primeiro!'}</p>
                    )}
                </div>
            </div>
        );
    }


    renderForgotPassword () {
        const {forgotPasswordSuccess, loading, error} = this.state;
        return (
            <div className={styles.authSection}>
                <div className={styles.authCardWrap}>
                    <div className={styles.panel}>
                        <h1>{'Recuperar Senha'}</h1>
                        {forgotPasswordSuccess ? (
                            <div className={styles.successBox}>
                                <p>{'✓ E-mail enviado! Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.'}</p>
                                <button
                                    className={styles.primaryButton}
                                    style={{marginTop: '1rem', width: '100%'}}
                                    onClick={this.handleNavigateLogin}
                                >
                                    {'Voltar para o Login'}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={this.handleForgotPassword}>
                                <p className={styles.formHint} style={{marginTop: 0, marginBottom: '1rem'}}>
                                    {'Digite seu e-mail cadastrado e enviaremos um link para redefinir sua senha.'}
                                </p>
                                {error ? <div className={styles.error}>{error}</div> : null}
                                <label className={styles.field}>
                                    {'Email'}
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                    />
                                </label>
                                <button
                                    className={styles.primaryButton}
                                    style={{width: '100%'}}
                                >
                                    {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                                </button>
                                <p className={styles.formHint}>
                                    <button
                                        className={styles.inlineButton}
                                        type="button"
                                        onClick={this.handleNavigateLogin}
                                    >
                                        {'← Voltar para o login'}
                                    </button>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    renderResetPassword () {
        const {resetPasswordSuccess, loading, error, route} = this.state;
        const hasToken = Boolean(route.token);
        return (
            <div className={styles.authSection}>
                <div className={styles.authCardWrap}>
                    <div className={styles.panel}>
                        <h1>{'Redefinir Senha'}</h1>
                        {!hasToken ? (
                            <div className={styles.error}>
                                {'Link inválido ou expirado. Solicite um novo link de recuperação.'}
                            </div>
                        ) : resetPasswordSuccess ? (
                            <div className={styles.successBox}>
                                <p>{'✓ Senha redefinida com sucesso!'}</p>
                                <button
                                    className={styles.primaryButton}
                                    style={{marginTop: '1rem', width: '100%'}}
                                    onClick={this.handleNavigateLogin}
                                >
                                    {'Entrar na conta'}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={this.handleResetPassword}>
                                {error ? <div className={styles.error}>{error}</div> : null}
                                <label className={styles.field}>
                                    {'Nova Senha'}
                                    <input
                                        required
                                        autoFocus
                                        minLength="8"
                                        name="password"
                                        type="password"
                                    />
                                </label>
                                <label className={styles.field}>
                                    {'Confirmar Nova Senha'}
                                    <input
                                        required
                                        minLength="8"
                                        name="confirm"
                                        type="password"
                                    />
                                </label>
                                <button
                                    className={styles.primaryButton}
                                    style={{width: '100%'}}
                                >
                                    {loading ? 'Salvando...' : 'Redefinir Senha'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    renderPublicProfile () {
        const {publicProfile, loading, error} = this.state;

        if (loading && !publicProfile) {
            return (
                <div className={styles.page}>
                    <p>{'Carregando perfil...'}</p>
                </div>
            );
        }

        if (error && !publicProfile) {
            return (
                <div className={styles.page}>
                    <div className={styles.error}>{error}</div>
                </div>
            );
        }

        if (!publicProfile) return null;

        const projects = publicProfile.projects || [];

        return (
            <div className={`${styles.page} ${styles.publicProfilePage}`}>
                {/* Header Card */}
                <div className={`${styles.publicProfileHeader} ${styles.panel}`}>
                    <div className={styles.publicProfileAvatar}>
                        {publicProfile.avatarUrl ? (
                            <img
                                alt={publicProfile.username}
                                src={publicProfile.avatarUrl}
                            />
                        ) : (
                            <span>{getInitials(publicProfile)}</span>
                        )}
                    </div>
                    <div className={styles.publicProfileInfo}>
                        <h1 className={styles.publicProfileName}>
                            {publicProfile.name || publicProfile.username}
                        </h1>
                        <span className={styles.publicProfileUsername}>
                            {`@${publicProfile.username}`}
                        </span>
                        {publicProfile.bio ? (
                            <p className={styles.publicProfileBio}>{publicProfile.bio}</p>
                        ) : null}
                        {publicProfile.workingOn ? (
                            <p className={styles.publicProfileWorking}>
                                <strong>{'Trabalhando em: '}</strong>
                                {publicProfile.workingOn}
                            </p>
                        ) : null}
                        <div className={styles.publicProfileStats}>
                            <span className={styles.publicProfileStat}>
                                <strong>{publicProfile.publicProjectCount || 0}</strong>
                                {' Projetos'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Projects */}
                <div className={styles.profileSection2}>
                    <div className={styles.profileSectionHeader}>
                        <h2 className={styles.profileSectionHeading}>
                            {`PROJETOS (${projects.length})`}
                        </h2>
                    </div>
                    <div className={styles.profileSectionBody}>
                        {projects.length ? (
                            this.renderProjectCards(projects, false)
                        ) : (
                            <div className={styles.emptyState}>
                                {'Este usuário ainda não publicou projetos.'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    renderEditor () {
        const route = this.state.route;
        const canPersist = Boolean(this.props.user);
        const projectId = route.projectId || defaultProjectId;
        return (
            <GUI
                key={`project-editor-${projectId}`}
                canCreateNew={canPersist}
                canEditTitle
                canPromptLoginToSave={!canPersist}
                canSave={canPersist}
                saveUploadedProjectAsNew
                assetHost={getAssetHost()}
                autoStartFileUploadKey={route.importProject ? route.importKey : null}
                projectHost={getProjectHost()}
                projectId={projectId}
                routeProjectId={projectId}
                onClickLogo={this.handleNavigateHome}
                onProjectLoaded={noop}
                onRequestLoginToSave={this.handleRequestLoginToSave}
                onShowMessageBox={this.handleShowMessageBox}
                onUpdateProjectId={this.handleProjectCreated}
            />
        );
    }

    render () {
        const route = this.state.route;
        const editor = route.name === 'editor';
        return (
            <div className={editor ? styles.editorShell : styles.appShell}>
                {editor ? null : this.renderHeader()}
                {route.name === 'home' ? this.renderHome() : null}
                {route.name === 'login' ? this.renderLogin() : null}
                {route.name === 'register' ? this.renderRegister() : null}
                {route.name === 'forgotPassword' ? this.renderForgotPassword() : null}
                {route.name === 'resetPassword' ? this.renderResetPassword() : null}
                {route.name === 'projects' || route.name === 'explore' ? this.renderProjects() : null}
                {route.name === 'profile' ? this.renderProfile() : null}
                {route.name === 'publicProfile' ? this.renderPublicProfile() : null}
                {route.name === 'projectDetails' ? this.renderProjectDetails() : null}
                {editor ? this.renderEditor() : null}
                {editor ? null : this.renderFooter()}
                {!editor && this.state.toastNotification ? (
                    <div className={styles.toastContainer}>
                        <NotificationToast
                            notification={this.state.toastNotification}
                            onClick={() => {
                                this.handleDismissToast();
                                this.handleOpenNotification(this.state.toastNotification);
                            }}
                            onDismiss={this.handleDismissToast}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

DogoblockWebApp.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onSetPlayerOnly: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        username: PropTypes.string
    })
};

const mapStateToProps = state => ({
    user: state.session && state.session.session ? state.session.session.user : null
});

const mapDispatchToProps = dispatch => ({
    onLoginSuccess: session => dispatch(loginSuccess(session)),
    onLogout: () => dispatch(logoutAction()),
    onSetPlayerOnly: isPlayerOnly => dispatch(setPlayer(isPlayerOnly))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DogoblockWebApp);
