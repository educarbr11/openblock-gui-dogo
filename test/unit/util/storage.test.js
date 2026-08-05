import storage from '../../../src/lib/storage';

describe('Dogoblock asset storage routing', () => {
    const asset = {
        assetId: 'asset-hash',
        dataFormat: 'svg'
    };

    beforeEach(() => {
        storage.setProjectHost('https://dogoblockapi.dogomaker.com/projects');
        storage.setAssetHost('https://dogoblockcdn.dogomaker.com');
    });

    test('reads public assets from the CDN first', () => {
        expect(storage.getAssetGetConfig(asset))
            .toBe('https://dogoblockcdn.dogomaker.com/asset-hash.svg');
    });

    test('uses the API as the fallback read source', () => {
        expect(storage.getAssetApiGetConfig(asset))
            .toBe('https://dogoblockapi.dogomaker.com/assets/asset-hash.svg');
    });

    test('uploads user assets through the API', () => {
        const request = storage.getAssetCreateConfig(asset);
        expect(request.url).toBe('https://dogoblockapi.dogomaker.com/assets/asset-hash.svg');
        expect(request.method).toBe('post');
        expect(request.headers['Content-Type']).toBe('image/svg+xml');
    });
});
