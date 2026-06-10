const DEFAULT_API_HOST = 'http://localhost:3000';

const trimSlash = value => value.replace(/\/+$/, '');

const getApiHost = () => {
    if (typeof window === 'undefined') return DEFAULT_API_HOST;
    const matches = window.location.search.match(/[?&]api_host=([^&]*)/);
    if (matches && matches[1]) return trimSlash(decodeURIComponent(matches[1]));
    return DEFAULT_API_HOST;
};

const getProjectHost = () => `${getApiHost()}/projects`;
const getAssetHost = () => `${getApiHost()}/assets`;

export {
    getApiHost,
    getAssetHost,
    getProjectHost
};
