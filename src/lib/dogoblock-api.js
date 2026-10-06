import {getApiHost, getProjectHost} from './dogoblock-api-config';
import {
    clearAuthSession,
    getAuthHeaders,
    readAuthSession,
    writeAuthSession
} from './auth-session';

let authSessionChangeHandler = null;
let refreshRequest = null;

class ApiError extends Error {
    constructor (message, status) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

const parseJson = response => response.text().then(text => {
    if (!text) return null;
    return JSON.parse(text);
});

const createResponseError = response => parseJson(response)
    .catch(() => null)
    .then(body => {
        const message = body && body.message ? body.message : `HTTP ${response.status}`;
        return new ApiError(Array.isArray(message) ? message.join(', ') : message, response.status);
    });

const fetchApi = (path, options = {}) => {
    const headers = Object.assign(
        {},
        options.skipAuth ? {} : getAuthHeaders(),
        options.headers || {}
    );
    const fetchOptions = Object.assign({}, options, {headers});
    delete fetchOptions.skipAuth;
    delete fetchOptions.skipRefresh;
    return fetch(`${getApiHost()}${path}`, fetchOptions);
};

const notifyAuthSessionChange = session => {
    if (typeof authSessionChangeHandler === 'function') {
        authSessionChangeHandler(session);
    }
};

const expireAuthSession = () => {
    const hadSession = Boolean(readAuthSession());
    clearAuthSession();
    if (hadSession) notifyAuthSessionChange(null);
};

const refreshAuthSession = () => {
    if (refreshRequest) return refreshRequest;

    const currentSession = readAuthSession();
    if (!currentSession || !currentSession.refreshToken) {
        return Promise.reject(new ApiError('Sessão expirada', 401));
    }

    const operation = fetchApi('/auth/refresh', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refreshToken: currentSession.refreshToken}),
        skipAuth: true,
        skipRefresh: true
    }).then(response => {
        if (!response.ok) {
            return createResponseError(response).then(error => Promise.reject(error));
        }
        return parseJson(response);
    })
        .then(session => {
            writeAuthSession(session);
            notifyAuthSessionChange(session);
            return session;
        });

    refreshRequest = operation.then(
        session => {
            refreshRequest = null;
            return session;
        },
        error => {
            refreshRequest = null;
            throw error;
        });
    return refreshRequest;
};

const fetchWithSession = (path, options = {}, retried = false) => fetchApi(path, options)
    .then(response => {
        if (response.status !== 401 || options.skipAuth || options.skipRefresh) {
            return response;
        }
        if (retried) {
            expireAuthSession();
            return response;
        }

        return refreshAuthSession().then(
            () => fetchWithSession(path, options, true),
            () => {
                expireAuthSession();
                return response;
            }
        );
    });

const request = (path, options = {}) => fetchWithSession(path, options)
    .then(response => {
        if (response.ok) return parseJson(response);
        return createResponseError(response).then(error => Promise.reject(error));
    });

const requestRaw = (path, options = {}) => fetchWithSession(path, options)
    .then(response => {
        if (response.ok) return response;
        return createResponseError(response).then(error => Promise.reject(error));
    });

const setAuthSessionChangeHandler = handler => {
    authSessionChangeHandler = typeof handler === 'function' ? handler : null;
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
    const session = readAuthSession();
    clearAuthSession();
    if (!session || !session.refreshToken) return Promise.resolve();
    return request('/auth/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refreshToken: session.refreshToken}),
        skipAuth: true,
        skipRefresh: true
    }).catch(() => null);
};

const me = () => request('/auth/me');

const forgotPassword = email => request('/auth/forgot-password', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email}),
    skipAuth: true
});

const resetPassword = (token, newPassword) => request('/auth/reset-password', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({token, newPassword}),
    skipAuth: true
});

// ─── User Profile ────────────────────────────────────────────────────────────

const getMyProfile = () => request('/users/me');

const updateMyProfile = profile => request('/users/me', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(profile)
});

const listFavoriteProjects = () => request('/users/me/favorites');

const getPublicUserProfile = username => request(`/users/${username}`, {skipAuth: true});

// ─── Projects ────────────────────────────────────────────────────────────────

const listProjects = () => request('/projects');
const listPublicProjects = () => request('/projects/public', {skipAuth: true});
const getProjectDetails = projectId => request(`/projects/${projectId}/details`);
const deleteProject = projectId => request(`/projects/${projectId}`, {method: 'DELETE'});
const updateProjectVisibility = (projectId, visibility) => request(`/projects/${projectId}/visibility`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({visibility})
});

const updateProjectDetails = (projectId, details) => request(`/projects/${projectId}/details`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(details)
});

const uploadProjectCover = (projectId, coverFile) => {
    const body = new FormData();
    body.append('cover', coverFile);
    return request(`/projects/${projectId}/cover`, {
        method: 'POST',
        body
    });
};

const projectHost = getProjectHost();

// ─── Interactions ─────────────────────────────────────────────────────────────

const likeProject = projectId => request(`/projects/${projectId}/like`, {method: 'POST'});
const unlikeProject = projectId => request(`/projects/${projectId}/like`, {method: 'DELETE'});
const favoriteProject = projectId => request(`/projects/${projectId}/favorite`, {method: 'POST'});
const unfavoriteProject = projectId => request(`/projects/${projectId}/favorite`, {method: 'DELETE'});
const recordProjectView = projectId => request(`/projects/${projectId}/view`, {method: 'POST'});
const remixProject = projectId => request(`/projects/${projectId}/remix`, {method: 'POST'});

// ─── Comments ─────────────────────────────────────────────────────────────────

const getComments = (projectId, page = 1, limit = 20) =>
    request(`/projects/${projectId}/comments?page=${page}&limit=${limit}`);

const postComment = (projectId, content, parentId) => request(`/projects/${projectId}/comments`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(parentId ? {content, parentId} : {content})
});

const deleteComment = (projectId, commentId) =>
    request(`/projects/${projectId}/comments/${commentId}`, {method: 'DELETE'});

// ─── Notifications ───────────────────────────────────────────────────────────

const listNotifications = (page = 1, limit = 10) =>
    request(`/notifications?page=${page}&limit=${limit}`);

const getUnreadCount = () => request('/notifications/unread-count');

const markNotificationRead = notificationId =>
    request(`/notifications/${notificationId}/read`, {method: 'PATCH'});

const markAllNotificationsRead = () =>
    request('/notifications/read-all', {method: 'PATCH'});

const deleteNotification = notificationId =>
    request(`/notifications/${notificationId}`, {method: 'DELETE'});

const createNotificationsStream = token => {
    if (!token || typeof window === 'undefined' || typeof EventSource === 'undefined') {
        return null;
    }
    return new EventSource(`${getApiHost()}/notifications/stream?token=${encodeURIComponent(token)}`);
};

// ─── Arduino Compiler ────────────────────────────────────────────────────────

const createArduinoCompileJob = (board, code, libraries = []) => request('/compiler/arduino/jobs', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({board, code, libraries}),
    skipAuth: true
});

const getArduinoCompileJob = jobId => request(`/compiler/arduino/jobs/${jobId}`, {
    skipAuth: true
});

const downloadArduinoCompileArtifact = jobId => requestRaw(`/compiler/arduino/jobs/${jobId}/artifact`, {
    skipAuth: true
}).then(response => response.text());

const createMicrobitCompileJob = code => request('/compiler/microbit/jobs', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({board: 'microbitV2', code}),
    skipAuth: true
});

const getMicrobitCompileJob = jobId => request(`/compiler/microbit/jobs/${jobId}`, {
    skipAuth: true
});

const downloadMicrobitCompileArtifact = jobId => requestRaw(`/compiler/microbit/jobs/${jobId}/artifact`, {
    skipAuth: true
}).then(response => response.text());

const downloadArduinoRealtimeFirmware = board => requestRaw(`/firmwares/arduino/realtime/${board}`, {
    skipAuth: true
}).then(response => response.text());

export {
    deleteProject,
    getProjectDetails,
    listProjects,
    listFavoriteProjects,
    listPublicProjects,
    login,
    logout,
    me,
    projectHost,
    register,
    forgotPassword,
    resetPassword,
    setAuthSessionChangeHandler,
    getMyProfile,
    getPublicUserProfile,
    updateProjectVisibility,
    updateProjectDetails,
    uploadProjectCover,
    updateMyProfile,
    likeProject,
    unlikeProject,
    favoriteProject,
    unfavoriteProject,
    recordProjectView,
    remixProject,
    getComments,
    postComment,
    deleteComment,
    listNotifications,
    getUnreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    createNotificationsStream,
    createArduinoCompileJob,
    getArduinoCompileJob,
    downloadArduinoCompileArtifact,
    createMicrobitCompileJob,
    getMicrobitCompileJob,
    downloadMicrobitCompileArtifact,
    downloadArduinoRealtimeFirmware
};
