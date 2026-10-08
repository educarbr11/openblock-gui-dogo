import getMlVendorPath from '../ml-vendor-path';
import {acquireResourcePack} from '../resource-pack-service';

const scriptPaths = [
    'tfjs/4.22.0/tf.min.js',
    'mobilenet/2.1.1/mobilenet.min.js',
    'knn-classifier/1.2.6/knn-classifier.min.js'
];

let loadingPromise = null;

const loadScript = src => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
        if (existing.getAttribute('data-loaded') === 'true') {
            resolve();
            return;
        }
        existing.addEventListener('load', resolve, {once: true});
        existing.addEventListener('error', reject, {once: true});
        return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        resolve();
    };
    script.onerror = () => {
        script.remove();
        reject(new Error(`Failed to load ${src}`));
    };
    document.head.appendChild(script);
});

const loadLibraries = baseUrl => {
    if (!loadingPromise) {
        const scripts = scriptPaths.map(relativePath => getMlVendorPath(relativePath, baseUrl));
        loadingPromise = scripts.reduce(
            (promise, src) => promise.then(() => loadScript(src)),
            Promise.resolve()
        ).then(() => {
            if (!window.tf || !window.mobilenet || !window.knnClassifier) {
                throw new Error('TensorFlow.js libraries were not available after loading.');
            }
            return {
                tf: window.tf,
                mobilenet: window.mobilenet,
                knnClassifier: window.knnClassifier
            };
        })
            .catch(error => {
                loadingPromise = null;
                throw error;
            });
    }
    return loadingPromise;
};

const loadTensorflow = () => acquireResourcePack('ai-ml').then(lease =>
    loadLibraries(lease.baseUrl)
        .then(libraries => Object.assign({}, libraries, {
            mobilenetModelUrl: getMlVendorPath('mobilenet/model/model.json', lease.baseUrl),
            releaseResourcePack: lease.release
        }))
        .catch(error => {
            lease.release();
            throw error;
        })
);

export default loadTensorflow;
