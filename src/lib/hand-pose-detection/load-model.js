import getMlVendorPath from '../ml-vendor-path';
import {acquireResourcePack} from '../resource-pack-service';

const MEDIAPIPE_VERSION = '0.4.1675469240';
const scriptPaths = [
    'tfjs/4.22.0/tf.min.js',
    'knn-classifier/1.2.6/knn-classifier.min.js',
    `mediapipe-hands/${MEDIAPIPE_VERSION}/hands.js`,
    'hand-pose-detection/2.0.0/hand-pose-detection.min.js'
];

let loadingPromise = null;

const runWithBrowserEnvironment = callback => {
    if (typeof window === 'undefined' || !window.process) return callback();
    const process = window.process;
    window.process = void 0;
    return Promise.resolve()
        .then(callback)
        .finally(() => {
            window.process = process;
        });
};

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
            if (!window.tf || !window.knnClassifier || !window.handPoseDetection || !window.Hands) {
                throw new Error('Hand pose detection libraries were not available after loading.');
            }
            return {
                handPoseDetection: window.handPoseDetection,
                knnClassifier: window.knnClassifier,
                tf: window.tf,
                runWithBrowserEnvironment
            };
        })
            .catch(error => {
                loadingPromise = null;
                throw error;
            });
    }
    return loadingPromise;
};

const loadHandPoseDetection = () => acquireResourcePack('ai-ml').then(lease =>
    loadLibraries(lease.baseUrl)
        .then(libraries => Object.assign({}, libraries, {
            solutionPath: getMlVendorPath(`mediapipe-hands/${MEDIAPIPE_VERSION}`, lease.baseUrl),
            releaseResourcePack: lease.release
        }))
        .catch(error => {
            lease.release();
            throw error;
        })
);

export default loadHandPoseDetection;
