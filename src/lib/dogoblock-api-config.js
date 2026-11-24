const DEFAULT_API_HOST = process.env.DOGOBLOCK_API_HOST || 'https://dogoblockapi.dogomaker.com';
const DEFAULT_ASSET_HOST = process.env.DOGOBLOCK_ASSET_HOST || 'https://dogoblockcdn.dogomaker.com';

const trimSlash = value => value.replace(/\/+$/, '');

const getApiHost = () => {
    if (typeof window === 'undefined') return DEFAULT_API_HOST;
    const matches = window.location.search.match(/[?&]api_host=([^&]*)/);
    if (matches && matches[1]) return trimSlash(decodeURIComponent(matches[1]));
    return DEFAULT_API_HOST;
};

const getProjectHost = () => `${getApiHost()}/projects`;
const getProjectCoverUrl = value => {
    if (!value) return value;
    const apiHost = getApiHost();
    let url;
    try {
        url = new URL(value, `${apiHost}/`);
    } catch (error) {
        return value;
    }
    const isRelativeCover = value.startsWith('/project-covers/');
    const isLegacyCover = ['localhost', '127.0.0.1'].includes(url.hostname) && url.port === '3000';
    if (!isRelativeCover && !isLegacyCover) return value;
    if (!/^\/project-covers\/[a-zA-Z0-9_-]+\.(png|jpe?g|webp|gif)$/.test(url.pathname)) return value;
    return `${apiHost}${url.pathname}${url.search}`;
};
const getAssetHost = () => {
    if (typeof window === 'undefined') return trimSlash(DEFAULT_ASSET_HOST);
    const matches = window.location.search.match(/[?&]asset_host=([^&]*)/);
    if (matches && matches[1]) return trimSlash(decodeURIComponent(matches[1]));
    return trimSlash(DEFAULT_ASSET_HOST);
};

export {
    getApiHost,
    getAssetHost,
    getProjectCoverUrl,
    getProjectHost
};
