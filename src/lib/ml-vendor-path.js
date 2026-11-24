const ML_VENDOR_PATH = 'static/ml-vendor';

const getMlVendorPath = (relativePath, resourceBaseUrl = null) => {
    const cleanPath = relativePath.replace(/^\/+/, '');
    if (resourceBaseUrl) return `${resourceBaseUrl.replace(/\/+$/, '')}/${cleanPath}`;
    const basePath = `${ML_VENDOR_PATH}/${cleanPath}`;

    if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
        return basePath;
    }

    return `/${basePath}`;
};

export default getMlVendorPath;
