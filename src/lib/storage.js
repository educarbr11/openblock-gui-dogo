import ScratchStorage from 'scratch-storage';

import defaultProject from './default-project';
import {getAuthHeaders} from './auth-session';

const normalizeHost = host => {
    if (!host) return host;
    const hostWithProtocol = /^https?:\/\//.test(host) ? host : `https://${host}`;
    return hostWithProtocol.replace(/\/+$/, '');
};

const contentTypeForFormat = dataFormat => {
    const format = dataFormat && dataFormat.toLowerCase ? dataFormat.toLowerCase() : dataFormat;
    const contentTypes = {
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        wav: 'audio/wav',
        mp3: 'audio/mpeg',
        json: 'application/json'
    };
    return contentTypes[format] || 'application/octet-stream';
};

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
class Storage extends ScratchStorage {
    constructor () {
        super();
        this.cacheDefaultProject();
    }
    load (assetType, assetId, dataFormat) {
        if (assetType === this.AssetType.Project && assetId && assetId.toString() !== '0') {
            return this.webHelper.load(assetType, assetId, dataFormat || assetType.runtimeFormat);
        }
        return super.load(assetType, assetId, dataFormat);
    }
    addOfficialScratchWebStores () {
        this.addWebStore(
            [this.AssetType.Project],
            this.getProjectGetConfig.bind(this),
            this.getProjectCreateConfig.bind(this),
            this.getProjectUpdateConfig.bind(this)
        );
        this.addWebStore(
            [this.AssetType.ImageVector, this.AssetType.ImageBitmap, this.AssetType.Sound],
            this.getAssetGetConfig.bind(this),
            // We set both the create and update configs to the same method because
            // storage assumes it should update if there is an assetId, but the
            // asset store uses the assetId as part of the create URI.
            this.getAssetCreateConfig.bind(this),
            this.getAssetCreateConfig.bind(this)
        );
        this.addWebStore(
            [this.AssetType.Sound],
            asset => `static/extension-assets/scratch3_music/${asset.assetId}.${asset.dataFormat}`
        );
    }
    setProjectHost (projectHost) {
        this.projectHost = normalizeHost(projectHost);
    }
    getProjectGetConfig (projectAsset) {
        return {
            url: `${this.projectHost}/${projectAsset.assetId}`,
            headers: getAuthHeaders()
        };
    }
    getProjectCreateConfig () {
        return {
            url: `${this.projectHost}/`,
            headers: getAuthHeaders(),
            withCredentials: true
        };
    }
    getProjectUpdateConfig (projectAsset) {
        return {
            url: `${this.projectHost}/${projectAsset.assetId}`,
            headers: getAuthHeaders(),
            withCredentials: true
        };
    }
    setAssetHost (assetHost) {
        this.assetHost = normalizeHost(assetHost);
    }
    getAssetGetConfig (asset) {
        if (this.assetHost && this.assetHost.includes('dogoblockcdn.dogomaker.com')) {
            return `${this.assetHost}/${asset.assetId}.${asset.dataFormat}`;
        }
        if (this.assetHost && this.assetHost.includes('cdn.assets.scratch.mit.edu')) {
            if (this.assetHost.includes('internalapi/asset')) {
                return `${this.assetHost}/${asset.assetId}.${asset.dataFormat}/get/`;
            }
            return `${this.assetHost}/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`;
        }
        if (this.assetHost && this.assetHost.includes('assets.scratch.mit.edu')) {
            return `https://cdn.assets.scratch.mit.edu/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`;
        }
        return `${this.assetHost}/${asset.assetId}.${asset.dataFormat}`;
    }
    getAssetCreateConfig (asset) {
        return {
            // There is no such thing as updating assets, but storage assumes it
            // should update if there is an assetId, and the asset store uses the
            // assetId as part of the create URI. So, force the method to POST.
            // Then when storage finds this config to use for the "update", still POSTs
            method: 'post',
            url: `${this.assetHost}/${asset.assetId}.${asset.dataFormat}`,
            headers: Object.assign({
                'Content-Type': contentTypeForFormat(asset.dataFormat)
            }, getAuthHeaders()),
            withCredentials: true
        };
    }
    setTranslatorFunction (translator) {
        this.translator = translator;
        this.cacheDefaultProject();
    }
    cacheDefaultProject () {
        const defaultProjectAssets = defaultProject(this.translator);
        defaultProjectAssets.forEach(asset => this.builtinHelper._store(
            this.AssetType[asset.assetType],
            this.DataFormat[asset.dataFormat],
            asset.data,
            asset.id
        ));
    }
}

const storage = new Storage();

export default storage;
