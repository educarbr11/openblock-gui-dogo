import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GUI from '../containers/gui.jsx';
import ProjectPageContainer from '../containers/project-page.jsx';
import MessageBoxType from '../lib/message-box.js';
import {getAssetHost, getProjectHost} from '../lib/dogoblock-api-config';
import {
    deleteProject,
    getProjectDetails,
    listProjects,
    listPublicProjects,
    login,
    logout as apiLogout,
    register,
    updateProjectVisibility
} from '../lib/dogoblock-api';
import {defaultProjectId} from '../reducers/project-state';
import {loginSuccess, logout as logoutAction} from '../reducers/session';
import {setPlayer} from '../reducers/mode';

import dogoblockLogo from '../../static/dogoblock_logo_full.svg';
import styles from './dogoblock-web-app.css';

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

const noop = () => {};

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

class DogoblockWebApp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            route: parseRoute(),
            error: null,
            loading: false,
            copyLinkFeedback: false,
            projects: [],
            projectDetails: null
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
        this.handleShowMessageBox = this.handleShowMessageBox.bind(this);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.handleUpdateVisibility = this.handleUpdateVisibility.bind(this);
        this.handleNavigateEditor = this.handleNavigateEditor.bind(this);
        this.handleNavigateExplore = this.handleNavigateExplore.bind(this);
        this.handleNavigateHome = this.handleNavigateHome.bind(this);
        this.handleNavigateLogin = this.handleNavigateLogin.bind(this);
        this.handleNavigateProjects = this.handleNavigateProjects.bind(this);
        this.handleNavigateRegister = this.handleNavigateRegister.bind(this);
        this.renderHome = this.renderHome.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.renderRegister = this.renderRegister.bind(this);
        this.renderProjects = this.renderProjects.bind(this);
        this.renderProjectDetails = this.renderProjectDetails.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
    }

    componentDidMount () {
        window.addEventListener('hashchange', this.handleHashChange);
        this.loadRouteData(this.state.route);
    }

    componentWillUnmount () {
        window.removeEventListener('hashchange', this.handleHashChange);
        if (this.copyLinkTimer) clearTimeout(this.copyLinkTimer);
        this.props.onSetPlayerOnly(false);
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
        if (route.name === 'projects' || route.name === 'explore') {
            this.setState({loading: true});
            const loader = this.props.user && route.name === 'projects' ? listProjects : listPublicProjects;
            loader()
                .then(projects => this.setState({projects, loading: false}))
                .catch(error => this.setState({error: error.message, loading: false}));
        }
        if (route.name === 'projectDetails') {
            const requestedProjectId = route.projectId;
            this.setState({loading: true, projectDetails: null});
            getProjectDetails(requestedProjectId)
                .then(projectDetails => {
                    if (
                        this.state.route.name !== 'projectDetails' ||
                        this.state.route.projectId !== requestedProjectId
                    ) {
                        return;
                    }
                    this.setState({projectDetails, loading: false});
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
                this.props.onLoginSuccess(session);
                navigate(this.state.route.next || '/projects');
            })
            .catch(error => this.setState({error: error.message, loading: false}));
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
                this.props.onLoginSuccess(session);
                navigate(this.state.route.next || '/projects');
            })
            .catch(error => this.setState({error: error.message, loading: false}));
    }

    handleLogout () {
        apiLogout();
        this.props.onLogout();
        navigate('/projects');
    }

    handleImportProject () {
        const importRoute = `/editor?import=${Date.now()}`;
        if (!this.props.user) {
            navigate(loginRouteFor(importRoute));
            return;
        }
        navigate(importRoute);
    }

    handleNewProject () {
        if (!this.props.user) {
            navigate(loginRouteFor('/editor'));
            return;
        }
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
                .catch(() => {});
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
            .then(() => navigate('/projects'))
            .catch(error => this.setState({error: error.message, loading: false}));
    }

    handleProjectCreated (projectId) {
        if (projectId && projectId !== defaultProjectId) navigate(`/editor/${projectId}`);
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
            .then(projectDetails => this.setState({projectDetails, loading: false, error: null}))
            .catch(error => this.setState({error: error.message, loading: false}));
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

    handleNavigateRegister () {
        navigate('/register');
    }

    renderHeader () {
        return (
            <div className={styles.topbar}>
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
                <div className={styles.nav}>
                    {this.props.user ? (
                        <React.Fragment>
                            <button
                                className={styles.navButton}
                                onClick={this.handleNavigateProjects}
                            >
                                {'Meus Projetos'}
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={this.handleNavigateEditor}
                            >
                                {'Editor'}
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={this.handleNavigateExplore}
                            >
                                {'Explorar Projetos'}
                            </button>
                            <span className={styles.userBadge}>{this.props.user.username}</span>
                            <button
                                className={styles.navButton}
                                onClick={this.handleLogout}
                            >
                                {'Sair'}
                            </button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <button
                                className={styles.navButton}
                                onClick={this.handleNavigateProjects}
                            >
                                {'Meus Projetos'}
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={this.handleNavigateEditor}
                            >
                                {'Editor'}
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={this.handleNavigateExplore}
                            >
                                {'Explorar Projetos'}
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={this.handleNavigateLogin}
                            >
                                {'Entrar/Cadastrar'}
                            </button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }

    renderHome () {
        return (
            <div className={`${styles.page} ${styles.homePage}`}>
                <section className={styles.hero}>
                    <div className={styles.heroCopy}>
                        <p className={styles.kicker}>{'DOGOBLOCK'}</p>
                        <h1>{'Crie, programe e compartilhe seus projetos'}</h1>
                        <p className={styles.heroText}>
                            {'Monte jogos, animações e experiências com blocos, Arduino e micro:bit em um ambiente '}
                            {'simples para aprender fazendo.'}
                        </p>
                        <div className={styles.heroActions}>
                            <button
                                className={styles.primaryButton}
                                onClick={this.handleNewProject}
                            >
                                {'Criar Projeto'}
                            </button>
                            <button
                                className={styles.secondaryButton}
                                onClick={this.handleNavigateExplore}
                            >
                                {'Explorar Projetos'}
                            </button>
                            {this.props.user ? null : (
                                <button
                                    className={styles.lightButton}
                                    onClick={this.handleNavigateLogin}
                                >
                                    {'Entrar/Cadastrar'}
                                </button>
                            )}
                        </div>
                    </div>
                    <div
                        aria-hidden="true"
                        className={styles.heroPreview}
                    >
                        <div className={styles.previewCard}>
                            <div className={styles.previewWindow}>
                                <span>{'MOON'}</span>
                            </div>
                            <strong>{'Moon Game'}</strong>
                            <small>{'Projeto em blocos'}</small>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    renderLogin () {
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
                        {this.state.loading ? 'Entrando...' : 'Entrar'}
                    </button>
                    <p className={styles.formHint}>
                        {'Ainda nao tem conta? '}
                        <button
                            className={styles.inlineButton}
                            type="button"
                            onClick={this.handleNavigateRegister}
                        >
                            {'Cadastrar'}
                        </button>
                    </p>
                </form>
            </div>
        );
    }

    renderRegister () {
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
                        {this.state.loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                    <p className={styles.formHint}>
                        {'Ja tem conta? '}
                        <button
                            className={styles.inlineButton}
                            type="button"
                            onClick={this.handleNavigateLogin}
                        >
                            {'Entrar'}
                        </button>
                    </p>
                </form>
            </div>
        );
    }

    renderProjects () {
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
                                {'Importar Projeto'}
                            </button>
                            <button
                                className={styles.dangerButton}
                                onClick={this.handleNewProject}
                            >
                                {'Criar Projeto'}
                            </button>
                        </div>
                    )}
                </div>
                {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}
                {this.state.loading ? <p>{'Carregando...'}</p> : null}
                <div className={styles.projectGrid}>
                    {this.state.projects.map(project => (
                        <button
                            className={styles.projectCard}
                            data-project-id={project.id}
                            key={project.id}
                            onClick={this.handleOpenProjectDetails}
                        >
                            <span className={styles.projectThumbnail}>
                                {renderProjectThumbnail(project)}
                            </span>
                            <span className={styles.projectTitle}>{project.title}</span>
                            <span className={styles.projectMeta}>{getVisibilityLabel(project.visibility)}</span>
                            <span className={styles.projectMeta}>{formatDate(project.updatedAt)}</span>
                        </button>
                    ))}
                </div>
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

    renderProjectDetails () {
        const projectId = this.state.route.projectId;
        return (
            <div className={`${styles.page} ${styles.projectDetailsPage}`}>
                {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}
                {this.state.loading ? <p>{'Carregando...'}</p> : null}
                {projectId ? (
                    <ProjectPageContainer
                        projectId={projectId}
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

    renderEditor () {
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

    render () {
        const route = this.state.route;
        const editor = route.name === 'editor';
        return (
            <div className={editor ? styles.editorShell : styles.appShell}>
                {editor ? null : this.renderHeader()}
                {route.name === 'home' ? this.renderHome() : null}
                {route.name === 'login' ? this.renderLogin() : null}
                {route.name === 'register' ? this.renderRegister() : null}
                {route.name === 'projects' || route.name === 'explore' ? this.renderProjects() : null}
                {route.name === 'projectDetails' ? this.renderProjectDetails() : null}
                {editor ? this.renderEditor() : null}
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
