import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Code2,
    Compass,
    FolderOpen,
    LogIn,
    LogOut,
    Plus,
    Save,
    Settings,
    Star,
    Trash2,
    Upload,
    UserCircle,
    UserPlus
} from 'lucide-react';

import GUI from '../containers/gui.jsx';
import NotificationsBell from '../components/notifications/notifications-bell.jsx';
import ProjectPageContainer from '../containers/project-page.jsx';
import MessageBoxType from '../lib/message-box.js';
import { getAssetHost, getProjectHost } from '../lib/dogoblock-api-config';
import {
    createNotificationsStream,
    deleteProject,
    getUnreadCount,
    getMyProfile,
    getProjectDetails,
    listFavoriteProjects,
    listNotifications,
    listProjects,
    listPublicProjects,
    login,
    logout as apiLogout,
    markAllNotificationsRead,
    markNotificationRead,
    register,
    updateMyProfile,
    updateProjectVisibility
} from '../lib/dogoblock-api';
import { readAuthSession, writeAuthSession } from '../lib/auth-session';
import { defaultProjectId } from '../reducers/project-state';
import { loginSuccess, logout as logoutAction } from '../reducers/session';
import { setPlayer } from '../reducers/mode';

import dogoblockLogo from '../../static/dogoblock_logo_full.svg';
import heroIllustration from '../../static/hero-illustration.png';
import styles from './dogoblock-web-app.css';

const parseRoute = () => {
    const rawHash = window.location.hash.replace(/^#/, '');
    const legacyMatch = rawHash.match(/^(\d+)$/);
    if (legacyMatch) {
        return { name: 'editor', projectId: legacyMatch[1] };
    }
    const [path, query = ''] = (rawHash || '/').split('?');
    const parts = path.split('/').filter(Boolean);
    const queryParams = new URLSearchParams(query);
    if (!parts.length) return { name: 'home' };
    if (parts[0] === 'login') return { name: 'login', next: queryParams.get('next') };
    if (parts[0] === 'register') return { name: 'register', next: queryParams.get('next') };
    if (parts[0] === 'profile') return { name: 'profile' };
    if (parts[0] === 'explore') return { name: 'explore' };
    if (parts[0] === 'editor') {
        return {
            name: 'editor',
            projectId: parts[1],
            importProject: queryParams.has('import'),
            importKey: queryParams.get('import')
        };
    }
    if (parts[0] === 'projects' && parts[1]) return { name: 'projectDetails', projectId: parts[1] };
    return { name: 'projects' };
};

const navigate = hash => {
    window.location.hash = hash;
};

const noop = () => { };

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

const Icon = ({ children }) => (
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
    constructor(props) {
        super(props);
        this.state = {
            route: parseRoute(),
            error: null,
            loading: false,
            copyLinkFeedback: false,
            projects: [],
            projectDetails: null,
            profile: null,
            favoriteProjects: [],
            profileTab: 'overview',
            notifications: [],
            notificationsLoading: false,
            unreadCount: 0
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
        this.handleLoadNotifications = this.handleLoadNotifications.bind(this);
        this.handleMarkAllNotificationsRead = this.handleMarkAllNotificationsRead.bind(this);
        this.handleOpenNotification = this.handleOpenNotification.bind(this);
        this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
        this.handleProfileTab = this.handleProfileTab.bind(this);
        this.renderHome = this.renderHome.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.renderRegister = this.renderRegister.bind(this);
        this.renderProjects = this.renderProjects.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.renderProjectDetails = this.renderProjectDetails.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.handleHashChange);
        this.loadRouteData(this.state.route);
        this.setupNotifications();
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange);
        if (this.copyLinkTimer) clearTimeout(this.copyLinkTimer);
        this.closeNotificationsStream();
        this.props.onSetPlayerOnly(false);
    }

    componentDidUpdate(prevProps) {
        const previousUserId = prevProps.user && prevProps.user.id;
        const currentUserId = this.props.user && this.props.user.id;
        if (previousUserId !== currentUserId) {
            this.setupNotifications();
        }
    }

    handleHashChange() {
        const route = parseRoute();
        this.setState({
            route,
            error: null
        }, () => this.loadRouteData(route));
    }

    loadRouteData(route) {
        this.props.onSetPlayerOnly(route.name === 'projectDetails');
        if (this.props.user && (route.name === 'login' || route.name === 'register')) {
            navigate(route.next || '/projects');
            return;
        }
        if (route.name === 'home') {
            this.setState({ loading: true });
            listPublicProjects()
                .then(projects => this.setState({ projects, loading: false }))
                .catch(() => this.setState({ loading: false }));
        }
        if (route.name === 'profile') {
            if (!this.props.user) {
                navigate(loginRouteFor('/profile'));
                return;
            }
            this.setState({ loading: true, error: null });
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
                })
                .catch(error => this.setState({ error: error.message, loading: false }));
        }
        if (route.name === 'projects' || route.name === 'explore') {
            this.setState({ loading: true });
            const loader = this.props.user && route.name === 'projects' ? listProjects : listPublicProjects;
            loader()
                .then(projects => this.setState({ projects, loading: false }))
                .catch(error => this.setState({ error: error.message, loading: false }));
        }
        if (route.name === 'projectDetails') {
            const requestedProjectId = route.projectId;
            this.setState({ loading: true, projectDetails: null });
            getProjectDetails(requestedProjectId)
                .then(projectDetails => {
                    if (
                        this.state.route.name !== 'projectDetails' ||
                        this.state.route.projectId !== requestedProjectId
                    ) {
                        return;
                    }
                    this.setState({ projectDetails, loading: false });
                })
                .catch(error => {
                    if (
                        this.state.route.name !== 'projectDetails' ||
                        this.state.route.projectId !== requestedProjectId
                    ) {
                        return;
                    }
                    this.setState({ error: error.message, loading: false });
                });
        }
    }

    handleLogin(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        this.setState({ error: null, loading: true });
        login({
            email: form.get('email'),
            password: form.get('password')
        })
            .then(session => {
                this.props.onLoginSuccess(session);
                navigate(this.state.route.next || '/projects');
            })
            .catch(error => this.setState({ error: error.message, loading: false }));
    }

    handleRegister(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        this.setState({ error: null, loading: true });
        register({
            name: form.get('name'),
            username: form.get('username'),
            email: form.get('email'),
            password: form.get('password')
        })
            .then(session => {
                this.props.onLoginSuccess(session);
                navigate(this.state.route.next || '/projects');
            })
            .catch(error => this.setState({ error: error.message, loading: false }));
    }

    handleLogout() {
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

    setupNotifications() {
        this.closeNotificationsStream();
        if (!this.props.user) {
            this.setState({
                notifications: [],
                unreadCount: 0,
                notificationsLoading: false
            });
            return;
        }
        getUnreadCount()
            .then(result => this.setState({ unreadCount: result.unreadCount || 0 }))
            .catch(() => { });

        const session = readAuthSession();
        const stream = createNotificationsStream(session && session.accessToken);
        if (!stream) return;

        stream.addEventListener('notification', event => {
            try {
                const notification = JSON.parse(event.data);
                this.setState(prevState => ({
                    notifications: [
                        notification,
                        ...prevState.notifications.filter(item => item.id !== notification.id)
                    ].slice(0, 10)
                }));
            } catch {
                // Ignore malformed stream payloads.
            }
        });
        stream.addEventListener('unread-count', event => {
            try {
                const data = JSON.parse(event.data);
                this.setState({ unreadCount: data.unreadCount || 0 });
            } catch {
                // Ignore malformed stream payloads.
            }
        });
        stream.onerror = () => { };
        this.notificationsStream = stream;
    }

    closeNotificationsStream() {
        if (!this.notificationsStream) return;
        this.notificationsStream.close();
        this.notificationsStream = null;
    }

    handleLoadNotifications() {
        if (!this.props.user) return;
        this.setState({ notificationsLoading: true });
        listNotifications(1, 10)
            .then(result => this.setState({
                notifications: result.notifications || [],
                unreadCount: result.unreadCount || 0,
                notificationsLoading: false
            }))
            .catch(error => this.setState({
                error: error.message,
                notificationsLoading: false
            }));
    }

    handleOpenNotification(notification) {
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

    handleMarkAllNotificationsRead() {
        if (!this.props.user || this.state.unreadCount === 0) return;
        markAllNotificationsRead()
            .then(result => this.setState(prevState => ({
                unreadCount: 0,
                notifications: prevState.notifications.map(item => Object.assign({}, item, {
                    readAt: item.readAt || result.readAt || new Date().toISOString()
                }))
            })))
            .catch(error => this.setState({ error: error.message }));
    }

    handleImportProject() {
        const importRoute = `/editor?import=${Date.now()}`;
        if (!this.props.user) {
            navigate(loginRouteFor(importRoute));
            return;
        }
        navigate(importRoute);
    }

    handleNewProject() {
        if (!this.props.user) {
            navigate(loginRouteFor('/editor'));
            return;
        }
        navigate('/editor');
    }

    handleCopyProjectLink() {
        const project = this.state.projectDetails;
        if (!project) return;
        const link = getProjectPublicUrl(project);
        const onCopied = () => {
            if (this.copyLinkTimer) clearTimeout(this.copyLinkTimer);
            this.setState({ copyLinkFeedback: true });
            this.copyLinkTimer = setTimeout(() => this.setState({ copyLinkFeedback: false }), 2200);
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

    handleDeleteProject() {
        if (!this.props.user) {
            navigate(loginRouteFor());
            return;
        }
        const id = this.state.route.projectId;
        if (!id) return;
        if (!window.confirm('Excluir este projeto? Esta acao nao pode ser desfeita.')) return; // eslint-disable-line no-alert
        this.setState({ loading: true, error: null });
        deleteProject(id)
            .then(() => navigate('/projects'))
            .catch(error => this.setState({ error: error.message, loading: false }));
    }

    handleDeleteProjectFromCard(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.props.user) {
            navigate(loginRouteFor());
            return;
        }
        const id = event.currentTarget.dataset.projectId;
        if (!id) return;
        if (!window.confirm('Excluir este projeto? Esta ação não pode ser desfeita.')) return; // eslint-disable-line no-alert
        this.setState({ loading: true, error: null });
        deleteProject(id)
            .then(() => this.setState(prevState => ({
                projects: prevState.projects.filter(project => project.id !== id),
                favoriteProjects: prevState.favoriteProjects.filter(project => project.id !== id),
                loading: false,
                error: null
            })))
            .catch(error => this.setState({ error: error.message, loading: false }));
    }

    handleProjectCreated(projectId) {
        if (projectId && projectId !== defaultProjectId) navigate(`/editor/${projectId}`);
    }

    handleOpenCurrentProject() {
        const project = this.state.projectDetails;
        this.props.onSetPlayerOnly(false);
        if (project) navigate(`/editor/${project.id}`);
    }

    handleOpenProjectDetails(event) {
        const projectId = event.currentTarget.dataset.projectId;
        if (projectId) navigate(`/projects/${projectId}`);
    }

    handleShowMessageBox(type, message) {
        if (type === MessageBoxType.confirm) return confirm(message); // eslint-disable-line no-alert
        if (type === MessageBoxType.alert) return alert(message); // eslint-disable-line no-alert
    }

    handleToggleVisibility() {
        const project = this.state.projectDetails;
        if (!project) return;
        const nextVisibility = project.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
        this.handleUpdateVisibility(nextVisibility);
    }

    handleUpdateVisibility(visibility) {
        const project = this.state.projectDetails;
        if (!this.props.user || !project) {
            navigate(loginRouteFor());
            return;
        }
        this.setState({ loading: true, error: null });
        updateProjectVisibility(project.id, visibility)
            .then(() => getProjectDetails(project.id))
            .then(projectDetails => this.setState({ projectDetails, loading: false, error: null }))
            .catch(error => this.setState({ error: error.message, loading: false }));
    }

    handleNavigateHome() {
        navigate('/');
    }

    handleNavigateProjects() {
        navigate('/projects');
    }

    handleNavigateExplore() {
        navigate('/explore');
    }

    handleNavigateEditor() {
        navigate('/editor');
    }

    handleNavigateLogin() {
        navigate('/login');
    }

    handleNavigateProfile() {
        navigate('/profile');
    }

    handleNavigateRegister() {
        navigate('/register');
    }

    handleProfileTab(event) {
        this.setState({ profileTab: event.currentTarget.dataset.tab });
    }

    handleProfileSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        this.setState({ loading: true, error: null });
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
                this.setState({ profile, loading: false, error: null });
            })
            .catch(error => this.setState({ error: error.message, loading: false }));
    }

    renderHeader() {
        const { user } = this.props;
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
                    <nav className={styles.nav}>
                        <button
                            className={styles.navLink}
                            onClick={this.handleNavigateExplore}
                        >{'Explorar'}</button>
                        <button
                            className={styles.navLink}
                            onClick={this.handleNavigateProjects}
                        >{'Meus Projetos'}</button>
                        {user ? (
                            <React.Fragment>
                                <button
                                    className={styles.navLink}
                                    onClick={this.handleNavigateProfile}
                                >{'Meu Perfil'}</button>
                                <NotificationsBell
                                    loading={this.state.notificationsLoading}
                                    notifications={this.state.notifications}
                                    unreadCount={this.state.unreadCount}
                                    onMarkAllRead={this.handleMarkAllNotificationsRead}
                                    onOpen={this.handleLoadNotifications}
                                    onOpenNotification={this.handleOpenNotification}
                                />
                                <button
                                    className={styles.navBtnEditor}
                                    onClick={this.handleNavigateEditor}
                                >
                                    {'</> Editor'}
                                </button>
                                <button
                                    className={`${styles.navLink} ${styles.navBtnUser}`}
                                    onClick={this.handleNavigateProfile}
                                >
                                    <UserCircle
                                        aria-hidden="true"
                                        className={styles.navIcon}
                                    />
                                    {user.username}
                                </button>
                                <button
                                    className={`${styles.navLink} ${styles.navBtnSair}`}
                                    onClick={this.handleLogout}
                                >
                                    {'Sair'}
                                </button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <button
                                    className={styles.navBtnEditor}
                                    onClick={this.handleNavigateEditor}
                                >
                                    {'</> Editor'}
                                </button>
                                <button
                                    className={styles.navBtnCriarConta}
                                    onClick={this.handleNavigateRegister}
                                >
                                    {'Criar Conta'}
                                </button>
                            </React.Fragment>
                        )}
                    </nav>
                </div>
            </header>
        );
    }

    renderHome() {
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
                                    <div className={styles.featuredCardBody}>
                                        <strong className={styles.featuredCardTitle}>
                                            {project.title || project.name || 'Projeto'}
                                        </strong>
                                        <span className={styles.featuredCardAuthor}>
                                            {getProjectAuthor(project)}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        );
    }

    renderFooter() {
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
                            href="https://editoradogomaker.com/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{'Home'}</a>
                        <a
                            href="https://editoradogomaker.com/portal-do-professor"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{'Portal do Professor'}</a>
                        <a
                            href="https://editoradogomaker.com/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{'Site da Editora'}</a>
                    </div>
                    <div className={styles.footerLei}>
                        <strong>{'LEI'}</strong>
                        <a
                            href="https://editoradogomaker.com/termos-de-uso"
                            rel="noopener noreferrer"
                            target="_blank"
                        >{'Termos de Uso'}</a>
                        <a
                            href="https://editoradogomaker.com/politica-de-privacidade"
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

    renderLogin() {
        return (
            <div className={`${styles.page} ${styles.narrowPage}`}>
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
        );
    }

    renderRegister() {
        return (
            <div className={`${styles.page} ${styles.narrowPage}`}>
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
        );
    }

    renderProjects() {
        const publicList = !this.props.user || this.state.route.name === 'explore';
        return (
            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <h1>{publicList ? 'Projetos Públicos' : 'Meus Projetos'}</h1>
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
                {this.renderProjectCards(this.state.projects, !publicList)}
                {!this.state.loading && !this.state.projects.length ? (
                    <div className={styles.emptyState}>
                        {publicList ?
                            'Nenhum projeto publico encontrado.' :
                            'Voce ainda nao criou projetos.'}
                    </div>
                ) : null}
            </div>
        );
    }

    renderProjectCards(projects, canDeleteProjects) {
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
                            <span className={styles.projectThumbnail}>
                                {renderProjectThumbnail(project)}
                            </span>
                            <span className={styles.projectTitle}>{project.title}</span>
                            <span className={styles.projectMeta}>{getVisibilityLabel(project.visibility)}</span>
                            <span className={styles.projectMeta}>{formatDate(project.updatedAt)}</span>
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

    renderProfile() {
        const profile = this.state.profile || this.props.user || {};
        const tab = this.state.profileTab;
        const tabButton = (id, label, IconComponent) => (
            <button
                className={`${styles.profileTab} ${tab === id ? styles.profileTabActive : ''}`}
                data-tab={id}
                onClick={this.handleProfileTab}
            >
                <IconComponent
                    aria-hidden="true"
                    className={styles.navIcon}
                />
                {label}
            </button>
        );

        return (
            <div className={`${styles.page} ${styles.profilePage}`}>
                {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}
                <section className={styles.profileHero}>
                    <div className={styles.profileAvatar}>
                        {profile.avatarUrl ? (
                            <img
                                alt={profile.username}
                                src={profile.avatarUrl}
                            />
                        ) : getInitials(profile)}
                    </div>
                    <div className={styles.profileSummary}>
                        <p className={styles.kicker}>{'PERFIL'}</p>
                        <h1>{profile.name || profile.username || 'Meu perfil'}</h1>
                        <p>{`@${profile.username || 'usuario'}`}</p>
                        <p className={styles.profileBio}>
                            {profile.bio || 'Adicione uma descrição para contar um pouco sobre você.'}
                        </p>
                    </div>
                    <div className={styles.profileStats}>
                        <strong>{profile.projectCount || this.state.projects.length || 0}</strong>
                        <span>{'Projetos'}</span>
                        <strong>{profile.favoriteCount || this.state.favoriteProjects.length || 0}</strong>
                        <span>{'Favoritos'}</span>
                    </div>
                </section>

                <div className={styles.profileTabs}>
                    {tabButton('overview', 'Visão Geral', UserCircle)}
                    {tabButton('edit', 'Dados', Save)}
                    {tabButton('projects', 'Projetos', FolderOpen)}
                    {tabButton('favorites', 'Favoritos', Star)}
                    {tabButton('settings', 'Configurações', Settings)}
                </div>

                {this.state.loading ? <p>{'Carregando...'}</p> : null}

                {tab === 'overview' ? (
                    <div className={styles.profileGrid}>
                        <section className={styles.profilePanel}>
                            <h2>{'Descrição'}</h2>
                            <p>{profile.bio || 'Nenhuma descrição adicionada.'}</p>
                        </section>
                        <section className={styles.profilePanel}>
                            <h2>{'Em que estou trabalhando'}</h2>
                            <p>{profile.workingOn || 'Nenhum foco atual informado.'}</p>
                        </section>
                        <section className={styles.profilePanel}>
                            <h2>{'Atalhos'}</h2>
                            <div className={styles.profileActions}>
                                <button
                                    className={styles.primaryButton}
                                    onClick={this.handleNewProject}
                                >
                                    <Icon><Plus size={16} /></Icon>
                                    {'Criar Projeto'}
                                </button>
                                <button
                                    className={styles.secondaryButton}
                                    onClick={this.handleNavigateExplore}
                                >
                                    <Icon><Compass size={16} /></Icon>
                                    {'Explorar'}
                                </button>
                            </div>
                        </section>
                    </div>
                ) : null}

                {tab === 'edit' ? (
                    <form
                        className={`${styles.panel} ${styles.profileForm}`}
                        onSubmit={this.handleProfileSubmit}
                    >
                        <h1>{'Editar Perfil'}</h1>
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
                            {'Descrição'}
                            <textarea
                                defaultValue={profile.bio || ''}
                                maxLength="500"
                                name="bio"
                                rows="4"
                            />
                        </label>
                        <label className={styles.field}>
                            {'Em que está trabalhando'}
                            <textarea
                                defaultValue={profile.workingOn || ''}
                                maxLength="280"
                                name="workingOn"
                                rows="3"
                            />
                        </label>
                        <button className={styles.primaryButton}>
                            <Icon><Save size={16} /></Icon>
                            {this.state.loading ? 'Salvando...' : 'Salvar Perfil'}
                        </button>
                    </form>
                ) : null}

                {tab === 'projects' ? (
                    <React.Fragment>
                        <div className={styles.pageHeader}>
                            <h1>{'Meus Projetos'}</h1>
                            <div className={styles.actions}>
                                <button
                                    className={styles.dangerButton}
                                    onClick={this.handleNewProject}
                                >
                                    <Icon><Plus size={16} /></Icon>
                                    {'Criar Projeto'}
                                </button>
                            </div>
                        </div>
                        {this.renderProjectCards(this.state.projects, true)}
                        {!this.state.projects.length ? (
                            <div className={styles.emptyState}>{'Você ainda não criou projetos.'}</div>
                        ) : null}
                    </React.Fragment>
                ) : null}

                {tab === 'favorites' ? (
                    <React.Fragment>
                        <div className={styles.pageHeader}>
                            <h1>{'Favoritos'}</h1>
                        </div>
                        {this.renderProjectCards(this.state.favoriteProjects, false)}
                        {!this.state.favoriteProjects.length ? (
                            <div className={styles.emptyState}>{'Nenhum projeto favorito ainda.'}</div>
                        ) : null}
                    </React.Fragment>
                ) : null}

                {tab === 'settings' ? (
                    <div className={styles.profileGrid}>
                        <section className={styles.profilePanel}>
                            <h2>{'Configurações da conta'}</h2>
                            <p>{'Mais opções de segurança, senha e notificações serão adicionadas aqui.'}</p>
                        </section>
                        <section className={styles.profilePanel}>
                            <h2>{'Sessão'}</h2>
                            <button
                                className={styles.dangerButton}
                                onClick={this.handleLogout}
                            >
                                <Icon><LogOut size={16} /></Icon>
                                {'Sair da conta'}
                            </button>
                        </section>
                    </div>
                ) : null}
            </div>
        );
    }

    renderProjectDetails() {
        const projectId = this.state.route.projectId;
        return (
            <div className={`${styles.page} ${styles.projectDetailsPage}`}>
                {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}
                {this.state.loading ? <p>{'Carregando...'}</p> : null}
                {projectId ? (
                    <ProjectPageContainer
                        projectId={projectId}
                        onDeleteProject={this.handleDeleteProject}
                        onClose={this.handleNavigateProjects}
                        renderPlayer={() => (
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
                        )}
                    />
                ) : null}
            </div>
        );
    }

    renderEditor() {
        const route = this.state.route;
        const canPersist = Boolean(this.props.user);
        const projectId = route.projectId || defaultProjectId;
        return (
            <GUI
                key={`project-editor-${projectId}`}
                canCreateNew={canPersist}
                canEditTitle
                canSave={canPersist}
                saveUploadedProjectAsNew
                assetHost={getAssetHost()}
                autoStartFileUploadKey={route.importProject ? route.importKey : null}
                projectHost={getProjectHost()}
                projectId={projectId}
                routeProjectId={projectId}
                onClickLogo={this.handleNavigateHome}
                onProjectLoaded={noop}
                onShowMessageBox={this.handleShowMessageBox}
                onUpdateProjectId={this.handleProjectCreated}
            />
        );
    }

    render() {
        const route = this.state.route;
        const editor = route.name === 'editor';
        return (
            <div className={editor ? styles.editorShell : styles.appShell}>
                {editor ? null : this.renderHeader()}
                {route.name === 'home' ? this.renderHome() : null}
                {route.name === 'login' ? this.renderLogin() : null}
                {route.name === 'register' ? this.renderRegister() : null}
                {route.name === 'projects' || route.name === 'explore' ? this.renderProjects() : null}
                {route.name === 'profile' ? this.renderProfile() : null}
                {route.name === 'projectDetails' ? this.renderProjectDetails() : null}
                {editor ? this.renderEditor() : null}
                {editor ? null : this.renderFooter()}
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
