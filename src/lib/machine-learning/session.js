import loadTensorflow from './load-tfjs';

const MODEL_VERSION = '2.1.1';
const READY_CONFIDENCE = 80;

class MachineLearningSession {
    constructor (vm) {
        this.vm = vm;
        this.listeners = [];
        this.videos = [];
        this.state = this._initialState();
        this.tf = null;
        this.mobileNet = null;
        this.classifier = null;
        this.stream = null;
        this.running = false;
        this.requested = false;
        this.startToken = 0;
        this.startPromise = null;
    }

    _initialState () {
        const saved = this.vm.getMachineLearningModel && this.vm.getMachineLearningModel();
        const classifier = saved && saved.imageClassifier;
        const labels = classifier && Array.isArray(classifier.labels) && classifier.labels.length ?
            classifier.labels : ['Treino 1', 'Treino 2'];
        return {
            activeClass: labels[0],
            classes: labels.map(label => ({
                label,
                count: classifier && Array.isArray(classifier.examples) ?
                    classifier.examples.filter(example => example.label === label).length : 0,
                ready: false
            })),
            error: null,
            loading: true,
            prediction: {
                label: '',
                confidences: {}
            },
            useModelEnabled: false
        };
    }

    subscribe (listener) {
        this.listeners.push(listener);
        listener(this.state);
        this.start();
        return () => {
            this.listeners = this.listeners.filter(item => item !== listener);
            if (this.listeners.length === 0) {
                this.stop();
            }
        };
    }

    setVideo (video) {
        if (video && this.videos.indexOf(video) === -1) {
            this.videos.push(video);
        }
        if (video && this.stream) {
            video.srcObject = this.stream;
            video.play();
        }
    }

    removeVideo (video) {
        this.videos = this.videos.filter(item => item !== video);
        if (video) video.srcObject = null;
    }

    start () {
        if (this.startPromise) return this.startPromise;
        this.requested = true;
        const startToken = ++this.startToken;
        this._setState({
            error: null,
            loading: true
        });
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this._setState({
                loading: false,
                error: 'A câmera não está disponível neste navegador.'
            });
            return Promise.resolve();
        }
        this.startPromise = Promise.all([
            loadTensorflow(),
            navigator.mediaDevices.getUserMedia({video: true})
        ])
            .then(([libs, stream]) => {
                if (!this.requested || startToken !== this.startToken) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }
                this.tf = libs.tf;
                this.stream = stream;
                this.classifier = libs.knnClassifier.create();
                return libs.mobilenet.load({
                    version: 2,
                    alpha: 1.0,
                    modelUrl: libs.mobilenetModelUrl
                })
                    .then(model => {
                        if (!this.requested || startToken !== this.startToken) {
                            stream.getTracks().forEach(track => track.stop());
                            return;
                        }
                        this.mobileNet = model;
                        this._restoreSavedModel();
                        this.videos.forEach(video => {
                            video.srcObject = stream;
                            video.play();
                        });
                        this.running = true;
                        this._setState({loading: false});
                        this._predictLoop();
                    });
            })
            .catch(error => {
                this._setState({
                    loading: false,
                    error: this._cameraErrorMessage(error)
                });
            });
        return this.startPromise;
    }

    _cameraErrorMessage (error) {
        const errorName = error && error.name;
        if (errorName === 'NotAllowedError' || errorName === 'SecurityError') {
            return 'Permissão da câmera negada. Autorize o acesso à câmera e tente novamente.';
        }
        if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError') {
            return 'Nenhuma câmera foi encontrada neste dispositivo.';
        }
        if (errorName === 'NotReadableError' || errorName === 'TrackStartError') {
            return 'A câmera está sendo usada por outro aplicativo ou não pôde ser iniciada.';
        }
        if (errorName === 'OverconstrainedError' || errorName === 'ConstraintNotSatisfiedError') {
            return 'A câmera disponível não atende aos requisitos do treinamento.';
        }
        return 'Não foi possível carregar a câmera ou o modelo de aprendizagem de máquina.';
    }

    stop () {
        this.requested = false;
        this.startToken++;
        this.running = false;
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
        this.videos.forEach(video => {
            video.srcObject = null;
        });
        this.videos = [];
        this.stream = null;
        this.classifier = null;
        this.startPromise = null;
        this._setState({loading: true});
    }

    selectClass (label) {
        this._setState({activeClass: label});
    }

    addClass () {
        const labels = this.state.classes.map(item => item.label);
        let index = this.state.classes.length + 1;
        let label = `Treino ${index}`;
        while (labels.indexOf(label) > -1) {
            index++;
            label = `Treino ${index}`;
        }
        this._setState({
            activeClass: label,
            classes: this.state.classes.concat([{label, count: 0, ready: false}])
        });
        this._serializeModel();
    }

    removeClass (label) {
        if (this.state.classes.length <= 1) return;
        const classes = this.state.classes.filter(item => item.label !== label);
        this._setState({
            activeClass: this.state.activeClass === label ? classes[0].label : this.state.activeClass,
            classes
        });
        this._rebuildClassifier((itemLabel, activation) => {
            if (itemLabel === label) return null;
            return {label: itemLabel, activation};
        });
        this._serializeModel();
    }

    renameClass (oldLabel, newLabel) {
        const cleanLabel = newLabel.trim();
        if (!cleanLabel || cleanLabel === oldLabel) return;
        this._setState({
            activeClass: this.state.activeClass === oldLabel ? cleanLabel : this.state.activeClass,
            classes: this.state.classes.map(item => {
                if (item.label === oldLabel) {
                    return Object.assign({}, item, {label: cleanLabel});
                }
                return item;
            })
        });
        this._rebuildClassifier((label, activation) => ({
            label: label === oldLabel ? cleanLabel : label,
            activation
        }));
        this._serializeModel();
    }

    captureExample () {
        const video = this.videos[0];
        if (!this.classifier || !this.mobileNet || !this._isVideoReady(video) || this.state.loading) return;
        const activation = this.mobileNet.infer(video, true);
        this.classifier.addExample(activation, this.state.activeClass);
        activation.dispose();
        this._setState({
            classes: this.state.classes.map(item => {
                if (item.label === this.state.activeClass) {
                    return Object.assign({}, item, {
                        count: item.count + 1,
                        ready: false
                    });
                }
                return item;
            })
        });
        this._serializeModel();
    }

    useModel () {
        if (this.state.useModelEnabled) {
            this._serializeModel();
        }
    }

    _setState (patch) {
        this.state = Object.assign({}, this.state, patch);
        this.state = Object.assign({}, this.state, {
            useModelEnabled: this._isUseModelEnabled(this.state.classes)
        });
        this.listeners.forEach(listener => listener(this.state));
    }

    _isUseModelEnabled (classes) {
        return classes.length > 0 && classes.every(item => item.count > 0 && item.ready);
    }

    _markReadyFromPrediction (prediction) {
        const label = prediction.label;
        const confidence = prediction.confidences[label] || 0;
        if (!label || confidence < READY_CONFIDENCE) return;
        let changed = false;
        const classes = this.state.classes.map(item => {
            if (item.label === label && item.count > 0 && !item.ready) {
                changed = true;
                return Object.assign({}, item, {ready: true});
            }
            return item;
        });
        if (changed) {
            this._setState({classes});
        }
    }

    _predictLoop () {
        if (!this.running) return;
        const video = this.videos[0];
        if (this.classifier && this.mobileNet && this._isVideoReady(video) && this.classifier.getNumClasses() > 0) {
            const activation = this.mobileNet.infer(video, true);
            this.classifier.predictClass(activation)
                .then(result => {
                    activation.dispose();
                    const confidences = {};
                    Object.keys(result.confidences || {}).forEach(label => {
                        confidences[label] = Math.round(result.confidences[label] * 100);
                    });
                    const prediction = {
                        label: result.label || '',
                        confidences
                    };
                    this.vm.setMachineLearningPrediction(prediction);
                    this._setState({prediction});
                    this._markReadyFromPrediction(prediction);
                })
                .catch(() => {
                    activation.dispose();
                });
        }
        window.setTimeout(() => this._predictLoop(), 250);
    }

    _isVideoReady (video) {
        return Boolean(
            video &&
            video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
            video.videoWidth > 0 &&
            video.videoHeight > 0
        );
    }

    _restoreSavedModel () {
        const saved = this.vm.getMachineLearningModel && this.vm.getMachineLearningModel();
        const classifier = saved && saved.imageClassifier;
        if (!classifier || !Array.isArray(classifier.examples)) return;

        classifier.examples.forEach(example => {
            if (!example || !example.label || !Array.isArray(example.activation)) return;
            const tensor = this._tensorFromActivation(example.activation);
            this.classifier.addExample(tensor, example.label);
            tensor.dispose();
        });
    }

    _serializeModel () {
        if (!this.vm.setMachineLearningModel) return;
        const examples = [];
        if (this.classifier) {
            const dataset = this.classifier.getClassifierDataset();
            for (const label of Object.keys(dataset)) {
                const values = dataset[label].arraySync();
                for (const activation of values) {
                    examples.push({label, activation});
                }
            }
        }
        this.vm.setMachineLearningModel({
            version: 1,
            imageClassifier: {
                inputSource: 'webcam',
                baseModel: 'mobilenet',
                baseModelVersion: MODEL_VERSION,
                alpha: 1.0,
                labels: this.state.classes.map(item => item.label),
                examples
            }
        });
    }

    _rebuildClassifier (mapExample) {
        if (!this.classifier || !this.tf) return;
        const dataset = this.classifier.getClassifierDataset();
        const examples = [];
        Object.keys(dataset).forEach(label => {
            dataset[label].arraySync().forEach(activation => {
                const mapped = mapExample(label, activation);
                if (mapped) examples.push(mapped);
            });
        });
        this.classifier.clearAllClasses();
        examples.forEach(example => {
            const tensor = this._tensorFromActivation(example.activation);
            this.classifier.addExample(tensor, example.label);
            tensor.dispose();
        });
    }

    _tensorFromActivation (activation) {
        if (Array.isArray(activation[0])) {
            return this.tf.tensor(activation);
        }
        return this.tf.tensor(activation).reshape([1, activation.length]);
    }
}

const sessions = [];

const getMachineLearningSession = vm => {
    const existing = sessions.find(item => item.vm === vm);
    if (existing) return existing.session;
    const session = new MachineLearningSession(vm);
    sessions.push({vm, session});
    return session;
};

export {
    getMachineLearningSession,
    READY_CONFIDENCE
};
