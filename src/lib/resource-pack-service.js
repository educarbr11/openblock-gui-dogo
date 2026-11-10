let provider = null;

const configureResourcePackService = nextProvider => {
    provider = nextProvider || null;
};

const acquireResourcePack = packId => {
    if (!provider || typeof provider.acquire !== 'function') {
        return Promise.resolve({
            baseUrl: null,
            release: () => Promise.resolve(false)
        });
    }
    return provider.acquire(packId).then(lease => {
        let released = false;
        return {
            baseUrl: lease.baseUrl,
            release: () => {
                if (released) return Promise.resolve(false);
                released = true;
                return provider && typeof provider.release === 'function' ?
                    provider.release(lease.leaseId) : Promise.resolve(false);
            }
        };
    });
};

export {
    acquireResourcePack,
    configureResourcePackService
};
