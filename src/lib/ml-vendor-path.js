const ML_VENDOR_PATH = 'static/ml-vendor';

const getMlVendorPath = relativePath => {
    const cleanPath = relativePath.replace(/^\/+/, '');
    const basePath = `${ML_VENDOR_PATH}/${cleanPath}`;

    if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
        return basePath;
    }

    return `/${basePath}`;
};

export default getMlVendorPath;
