import getMlVendorPath from '../ml-vendor-path';

const MEDIAPIPE_VERSION = '0.4.1675469240';

const scripts = [
    getMlVendorPath('tfjs/4.22.0/tf.min.js'),
    getMlVendorPath('knn-classifier/1.2.6/knn-classifier.min.js'),
    getMlVendorPath(`mediapipe-hands/${MEDIAPIPE_VERSION}/hands.js`),
    getMlVendorPath('hand-pose-detection/2.0.0/hand-pose-detection.min.js')
];

const solutionPath = getMlVendorPath(`mediapipe-hands/${MEDIAPIPE_VERSION}`);

let loadingPromise = null;

const runWithBrowserEnvironment = callback => {
    if (typeof window === 'undefined' || !window.process) {
        return callback();
    }

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
        existing.addEventListener('load', resolve);
        existing.addEventListener('error', reject);
        return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
});

const loadHandPoseDetection = () => {
    if (!loadingPromise) {
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
                solutionPath,
                tf: window.tf,
                runWithBrowserEnvironment
            };
        });
    }
    return loadingPromise;
};

export default loadHandPoseDetection;
