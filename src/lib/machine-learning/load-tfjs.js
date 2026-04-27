const scripts = [
    'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js',
    'https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js',
    'https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier@1.2.6/dist/knn-classifier.min.js'
];

let loadingPromise = null;

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

const loadTensorflow = () => {
    if (!loadingPromise) {
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
        });
    }
    return loadingPromise;
};

export default loadTensorflow;
