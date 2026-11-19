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

    test('uses the API as the primary read source', () => {
        expect(storage.getAssetApiGetConfig(asset))
            .toBe('https://dogoblockapi.dogomaker.com/assets/asset-hash.svg');
    });

    test('keeps the CDN as the fallback read source', () => {
        expect(storage.getAssetGetConfig(asset))
            .toBe('https://dogoblockcdn.dogomaker.com/asset-hash.svg');
    });

    test('registers the API before the CDN for Dogoblock assets', () => {
        storage.addOfficialScratchWebStores();
        const imageStores = storage.webHelper.stores.filter(store =>
            store.types.includes(storage.AssetType.ImageVector.name)
        );
        const readUrls = imageStores
            .map(store => store.get && store.get(asset))
            .filter(Boolean);

        expect(readUrls.slice(0, 2)).toEqual([
            'https://dogoblockapi.dogomaker.com/assets/asset-hash.svg',
            'https://dogoblockcdn.dogomaker.com/asset-hash.svg'
        ]);
    });

    test('uploads user assets through the API', () => {
        const request = storage.getAssetCreateConfig(asset);
        expect(request.url).toBe('https://dogoblockapi.dogomaker.com/assets/asset-hash.svg');
        expect(request.method).toBe('post');
        expect(request.headers['Content-Type']).toBe('image/svg+xml');
    });
});
