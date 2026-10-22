const STORAGE_KEY = 'dogoblock.auth';

const readAuthSession = () => {
    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const writeAuthSession = session => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

const clearAuthSession = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
};

const getAuthToken = () => {
    const session = readAuthSession();
    return session && session.accessToken ? session.accessToken : null;
};

const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? {Authorization: `Bearer ${token}`} : {};
};

export {
    clearAuthSession,
    getAuthHeaders,
    getAuthToken,
    readAuthSession,
    writeAuthSession
};
