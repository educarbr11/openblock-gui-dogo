import {getApiHost, getProjectHost} from './dogoblock-api-config';
import {getAuthHeaders, writeAuthSession, clearAuthSession} from './auth-session';

const parseJson = response => response.text().then(text => {
    if (!text) return null;
    return JSON.parse(text);
});

const request = (path, options = {}) => {
    const headers = Object.assign(
        {},
        options.skipAuth ? {} : getAuthHeaders(),
        options.headers || {}
    );
    return fetch(`${getApiHost()}${path}`, Object.assign({}, options, {headers}))
        .then(response => {
            if (response.ok) return parseJson(response);
            return parseJson(response)
                .catch(() => null)
                .then(body => {
                    const message = body && body.message ? body.message : `HTTP ${response.status}`;
                    throw new Error(Array.isArray(message) ? message.join(', ') : message);
                });
        });
};

const login = credentials => request('/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials),
    skipAuth: true
}).then(session => {
    writeAuthSession(session);
    return session;
});

const register = data => request('/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
    skipAuth: true
}).then(session => {
    writeAuthSession(session);
    return session;
});

const logout = () => {
    clearAuthSession();
};

const me = () => request('/auth/me');

const listProjects = () => request('/projects');
const listPublicProjects = () => request('/projects/public', {skipAuth: true});
const getProjectDetails = projectId => request(`/projects/${projectId}/details`);
const deleteProject = projectId => request(`/projects/${projectId}`, {method: 'DELETE'});
const updateProjectVisibility = (projectId, visibility) => request(`/projects/${projectId}/visibility`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({visibility})
});

const projectHost = getProjectHost();

export {
    deleteProject,
    getProjectDetails,
    listProjects,
    listPublicProjects,
    login,
    logout,
    me,
    projectHost,
    register,
    updateProjectVisibility
};
