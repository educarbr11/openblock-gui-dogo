import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import GUI from '../containers/gui.jsx';
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

import styles from './dogoblock-web-app.css';

const parseRoute = () => {
    const rawHash = window.location.hash.replace(/^#/, '');
    const legacyMatch = rawHash.match(/^(\d+)$/);
    if (legacyMatch) {
        return {name: 'editor', projectId: legacyMatch[1]};
    }
    const [path, query = ''] = (rawHash || '/projects').split('?');
    const parts = path.split('/').filter(Boolean);
    const queryParams = new URLSearchParams(query);
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

const currentRouteHash = () => window.location.hash.replace(/^#/, '') || '/projects';

const loginRouteFor = route => `/login?next=${encodeURIComponent(route || currentRouteHash())}`;

const formatDate = value => {
    if (!value) return '';
    return new Date(value).toLocaleString();
};

class DogoblockWebApp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            route: parseRoute(),
            error: null,
            loading: false,
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
        this.handleUpdateVisibility = this.handleUpdateVisibility.bind(this);
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
    }

    handleHashChange () {
        const route = parseRoute();
        this.setState({route, error: null}, () => this.loadRouteData(route));
    }

    loadRouteData (route) {
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
            this.setState({loading: true, projectDetails: null});
            getProjectDetails(route.projectId)
                .then(projectDetails => this.setState({projectDetails, loading: false}))
                .catch(error => this.setState({error: error.message, loading: false}));
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

    handleDeleteProject () {
        if (!this.props.user) {
            navigate(loginRouteFor());
            return;
        }
        const id = this.state.route.projectId;
        if (!id) return;
        this.setState({loading: true, error: null});
        deleteProject(id)
            .then(() => navigate('/projects'))
            .catch(error => this.setState({error: error.message, loading: false}));
    }

    handleProjectCreated (projectId) {
        if (projectId && projectId !== defaultProjectId) navigate(`/editor/${projectId}`);
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

    renderHeader () {
        return (
            <div className={styles.topbar}>
                <div
                    className={styles.brand}
                    onClick={() => navigate('/projects')}
                >
                    {'Dogoblock'}
                </div>
                <div className={styles.nav}>
                    {this.props.user ? (
                        <React.Fragment>
                            <button
                                className={styles.navButton}
                                onClick={() => navigate('/projects')}
                            >
                                {'Meus Projetos'}
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={() => navigate('/explore')}
                            >
                                {'Explorar'}
                            </button>
                            <span>{this.props.user.username}</span>
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
                                onClick={() => navigate('/projects')}
                            >
                                {'Projetos'}
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={() => navigate('/editor')}
                            >
                                {'Editor'}
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={() => navigate('/login')}
                            >
                                {'Entrar'}
                            </button>
                            <button
                                className={styles.navButton}
                                onClick={() => navigate('/register')}
                            >
                                {'Cadastrar'}
                            </button>
                        </React.Fragment>
                    )}
                </div>
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
                                className={styles.primaryButton}
                                onClick={this.handleNewProject}
                            >
                                {'Novo Projeto'}
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
                            key={project.id}
                            onClick={() => navigate(`/projects/${project.id}`)}
                        >
                            <span className={styles.projectTitle}>{project.title}</span>
                            <span className={styles.muted}>{project.visibility}</span>
                            <span className={styles.muted}>{formatDate(project.updatedAt)}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    renderProjectDetails () {
        const project = this.state.projectDetails;
        const userOwnsProject = Boolean(project && this.props.user && project.ownerId === this.props.user.id);
        const nextVisibility = project && project.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
        return (
            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <h1>{project ? project.title : 'Projeto'}</h1>
                    <div className={styles.actions}>
                        <button
                            className={styles.secondaryButton}
                            onClick={() => navigate('/projects')}
                        >
                            {'Voltar'}
                        </button>
                        {project ? (
                            <button
                                className={styles.primaryButton}
                                onClick={() => navigate(`/editor/${project.id}`)}
                            >
                                {'Abrir no editor'}
                            </button>
                        ) : null}
                        {userOwnsProject ? (
                            <button
                                className={styles.secondaryButton}
                                onClick={() => this.handleUpdateVisibility(nextVisibility)}
                            >
                                {project.visibility === 'PUBLIC' ? 'Despublicar' : 'Publicar'}
                            </button>
                        ) : null}
                        {userOwnsProject ? (
                            <button
                                className={styles.dangerButton}
                                onClick={this.handleDeleteProject}
                            >
                                {'Excluir'}
                            </button>
                        ) : null}
                    </div>
                </div>
                {this.state.error ? <div className={styles.error}>{this.state.error}</div> : null}
                {this.state.loading ? <p>{'Carregando...'}</p> : null}
                {project ? (
                    <div className={styles.panel}>
                        <p><strong>{'ID: '}</strong>{project.id}</p>
                        <p><strong>{'Visibilidade: '}</strong>{project.visibility}</p>
                        <p><strong>{'Criado em: '}</strong>{formatDate(project.createdAt)}</p>
                        <p><strong>{'Atualizado em: '}</strong>{formatDate(project.updatedAt)}</p>
                    </div>
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
                canCreateNew={canPersist}
                canEditTitle
                canSave={canPersist}
                saveUploadedProjectAsNew
                assetHost={getAssetHost()}
                autoStartFileUploadKey={route.importProject ? route.importKey : null}
                projectHost={getProjectHost()}
                projectId={projectId}
                onProjectLoaded={() => {}}
                onShowMessageBox={(type, message) => {
                    if (type === MessageBoxType.confirm) return confirm(message); // eslint-disable-line no-alert
                    if (type === MessageBoxType.alert) return alert(message); // eslint-disable-line no-alert
                }}
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
    onLogout: () => dispatch(logoutAction())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DogoblockWebApp);
