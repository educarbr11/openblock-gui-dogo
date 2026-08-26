import loadHandPoseDetection from './load-model';
import {
    canonicalLandmarkVector,
    correctHandednessForUnmirroredInput,
    KEYPOINT_NAMES,
    recognizeNativeGesture
} from './features';

const MODEL_VERSION = 1;
const FEATURE_VERSION = 'canonical-landmarks-v1';
const MIN_EXAMPLES = 20;
const MAX_EXAMPLES = 200;
const MAX_CUSTOM_CLASSES = 10;
const CAPTURE_INTERVAL = 125;
const PREDICTION_HISTORY_SIZE = 5;

const CONNECTIONS = [
    ['wrist', 'thumb_cmc'], ['thumb_cmc', 'thumb_mcp'], ['thumb_mcp', 'thumb_ip'], ['thumb_ip', 'thumb_tip'],
    ['wrist', 'index_finger_mcp'], ['index_finger_mcp', 'index_finger_pip'],
    ['index_finger_pip', 'index_finger_dip'], ['index_finger_dip', 'index_finger_tip'],
    ['wrist', 'middle_finger_mcp'], ['middle_finger_mcp', 'middle_finger_pip'],
    ['middle_finger_pip', 'middle_finger_dip'], ['middle_finger_dip', 'middle_finger_tip'],
    ['wrist', 'ring_finger_mcp'], ['ring_finger_mcp', 'ring_finger_pip'],
    ['ring_finger_pip', 'ring_finger_dip'], ['ring_finger_dip', 'ring_finger_tip'],
    ['wrist', 'pinky_finger_mcp'], ['pinky_finger_mcp', 'pinky_finger_pip'],
    ['pinky_finger_pip', 'pinky_finger_dip'], ['pinky_finger_dip', 'pinky_finger_tip']
];

const emptyPrediction = () => ({classId: '', label: '', confidences: {}});
const emptyResult = () => ({
    handCount: 0,
    gesture: '',
    confidence: 0,
    primaryHand: null,
    hands: [],
    trainedGesture: emptyPrediction()
});
const makeId = () => `gesture-${Date.now().toString(36)}-${Math.random().toString(36)
    .slice(2, 8)}`;
const defaultModel = () => ({
    version: MODEL_VERSION,
    featureVersion: FEATURE_VERSION,
    classes: [
        {id: 'other', name: 'Outro', protected: true},
        {id: makeId(), name: 'Gesto 1', protected: false}
    ],
    examples: [],
    active: false
});

const errorMessage = error => {
    if (error && (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError')) {
        return 'Permissão da câmera negada. Libere a câmera nas configurações e tente novamente.';
    }
    if (error && (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError')) {
        return 'Nenhuma câmera foi encontrada neste dispositivo.';
    }
    return 'Não foi possível iniciar o detector de mãos. Verifique a câmera e tente novamente.';
};

class HandPoseDetectionSession {
    constructor (vm) {
        this.vm = vm;
        this.listeners = [];
        this.videos = [];
        this.canvases = [];
        this.state = this._initialState();
        this.detector = null;
        this.classifier = null;
        this.tf = null;
        this.stream = null;
        this.running = false;
        this.requested = false;
        this.startToken = 0;
        this.startPromise = null;
        this.detecting = false;
        this.captureTimer = null;
        this.captureEndTimer = null;
        this.captureResolve = null;
        this.capturedExamplesDirty = false;
        this.predictionHistory = [];
        this.sourceVideo = typeof document === 'undefined' ? null : document.createElement('video');
        this.modelReference = this.vm.getHandPoseGestureModel && this.vm.getHandPoseGestureModel();
        if (this.sourceVideo) {
            this.sourceVideo.muted = true;
            this.sourceVideo.playsInline = true;
        }
        if (this.vm.setHandPoseTrainingController) this.vm.setHandPoseTrainingController(this);
    }

    _initialState () {
        const saved = this.vm.getHandPoseGestureModel && this.vm.getHandPoseGestureModel();
        const compatible = saved && saved.version === MODEL_VERSION && saved.featureVersion === FEATURE_VERSION;
        const model = compatible ? saved : defaultModel();
        return {
            activeClassId: model.classes[0].id,
            capturing: false,
            classes: this._classesWithCounts(model),
            error: saved && !compatible ?
                'Este modelo usa uma versão antiga. Refaça o treinamento para continuar.' : null,
            feedback: 'Posicione uma mão inteira dentro do quadro.',
            incompatible: Boolean(saved && !compatible),
            loading: false,
            modelActive: Boolean(model.active),
            modelReady: this._isModelReady(model),
            prediction: emptyPrediction(),
            result: emptyResult(),
            running: false
        };
    }

    subscribe (listener, startDetector = true) {
        this.listeners.push(listener);
        listener(this.state);
        if (startDetector) this.start();
        return () => {
            this.listeners = this.listeners.filter(item => item !== listener);
        };
    }

    setVideo (video) {
        if (video && this.videos.indexOf(video) === -1) this.videos.push(video);
        this._attachStream(video);
    }

    removeVideo (video) {
        this.videos = this.videos.filter(item => item !== video);
        if (video) video.srcObject = null;
    }

    setCanvas (canvas) {
        if (canvas && this.canvases.indexOf(canvas) === -1) this.canvases.push(canvas);
        this._draw(this.state.result);
    }

    removeCanvas (canvas) {
        this.canvases = this.canvases.filter(item => item !== canvas);
        if (canvas) this._clearCanvas(canvas);
    }

    start () {
        if (this.running) return Promise.resolve();
        if (this.startPromise) return this.startPromise;
        this.requested = true;
        const startToken = ++this.startToken;
        this._setState({error: null, loading: true});
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            this._setState({loading: false, error: 'A câmera não está disponível neste navegador.'});
            return Promise.resolve();
        }
        this.startPromise = Promise.all([
            loadHandPoseDetection(),
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {facingMode: 'user', width: {ideal: 640}, height: {ideal: 480}}
            })
        ])
            .then(([libs, stream]) => {
                if (!this.requested || startToken !== this.startToken) {
                    stream.getTracks().forEach(track => track.stop());
                    return null;
                }
                this.tf = libs.tf;
                this.classifier = libs.knnClassifier.create();
                this.stream = stream;
                this._attachStream(this.sourceVideo);
                this.videos.forEach(video => this._attachStream(video));
                const model = libs.handPoseDetection.SupportedModels.MediaPipeHands;
                return libs.runWithBrowserEnvironment(() => libs.handPoseDetection.createDetector(model, {
                    runtime: 'mediapipe',
                    modelType: 'full',
                    maxHands: 2,
                    solutionPath: libs.solutionPath
                }));
            })
            .then(detector => {
                if (!detector) return;
                if (!this.requested || startToken !== this.startToken) {
                    detector.dispose();
                    return;
                }
                this.detector = detector;
                this._restoreModel();
                this.running = true;
                this.startPromise = null;
                this._setState({loading: false, running: true});
                this._detectLoop();
            })
            .catch(error => {
                this.startPromise = null;
                this._setState({loading: false, running: false, error: errorMessage(error)});
            });
        return this.startPromise;
    }

    stop () {
        this._stopCapture();
        this.requested = false;
        this.startToken++;
        this.running = false;
        if (this.stream) this.stream.getTracks().forEach(track => track.stop());
        this.videos.forEach(video => {
            video.srcObject = null;
        });
        if (this.sourceVideo) this.sourceVideo.srcObject = null;
        this.canvases.forEach(canvas => this._clearCanvas(canvas));
        if (this.detector && typeof this.detector.dispose === 'function') this.detector.dispose();
        if (this.classifier && typeof this.classifier.clearAllClasses === 'function') this.classifier.clearAllClasses();
        this.stream = null;
        this.detector = null;
        this.classifier = null;
        this.startPromise = null;
        this.predictionHistory = [];
        const result = emptyResult();
        this.vm.setHandPoseDetectionResult(result);
        this.vm.setHandPoseGesturePrediction(emptyPrediction());
        this._setState({loading: false, result, prediction: emptyPrediction(), running: false});
    }

    createGesture (name) {
        const cleanName = String(name || '').trim()
            .slice(0, 40);
        if (!cleanName) return null;
        const model = this._model();
        const existing = model.classes.find(item => item.name.toLocaleLowerCase() === cleanName.toLocaleLowerCase());
        if (existing) {
            this.selectClass(existing.id);
            return existing.id;
        }
        if (model.classes.filter(item => !item.protected).length >= MAX_CUSTOM_CLASSES) {
            this._setState({feedback: 'Limite de 10 gestos personalizados atingido.'});
            return null;
        }
        const classItem = {id: makeId(), name: cleanName, protected: false};
        model.classes.push(classItem);
        this._saveModel(model, {activeClassId: classItem.id});
        return classItem.id;
    }

    renameGesture (classId, name) {
        const cleanName = String(name || '').trim()
            .slice(0, 40);
        if (!cleanName) return;
        const model = this._model();
        const classItem = model.classes.find(item => item.id === classId);
        if (!classItem) return;
        const duplicate = model.classes.find(item => item.id !== classId &&
            item.name.toLocaleLowerCase() === cleanName.toLocaleLowerCase());
        if (duplicate) {
            this.selectClass(duplicate.id);
            return;
        }
        classItem.name = cleanName;
        this._saveModel(model);
    }

    removeGesture (classId) {
        const model = this._model();
        const classItem = model.classes.find(item => item.id === classId);
        if (!classItem || classItem.protected) return;
        model.classes = model.classes.filter(item => item.id !== classId);
        model.examples = model.examples.filter(example => example.classId !== classId);
        model.active = false;
        this._rebuildClassifier(model);
        this._saveModel(model, {activeClassId: model.classes[0].id});
    }

    selectClass (classId) {
        if (this._model().classes.some(item => item.id === classId)) this._setState({activeClassId: classId});
    }

    clearExamples (classId) {
        const model = this._model();
        model.examples = model.examples.filter(example => example.classId !== classId);
        model.active = false;
        this._rebuildClassifier(model);
        this._saveModel(model, null, {updateToolbox: false});
    }

    resetTraining () {
        const model = this._model();
        model.examples = [];
        model.active = false;
        this._rebuildClassifier(model);
        this._saveModel(model, {prediction: emptyPrediction()}, {updateToolbox: false});
    }

    captureExample (classId) {
        if (classId) this.selectClass(classId);
        return this.start().then(() => this._captureCurrent(classId || this.state.activeClassId, false));
    }

    startHoldCapture (classId) {
        if (classId) this.selectClass(classId);
        if (this.captureTimer) return Promise.resolve();
        return this.start().then(() => {
            if (!this.running) return;
            this._setState({capturing: true});
            this._captureCurrent(classId || this.state.activeClassId, true);
            this.captureTimer = window.setInterval(() => {
                this._captureCurrent(classId || this.state.activeClassId, true);
            }, CAPTURE_INTERVAL);
        });
    }

    stopHoldCapture () {
        this._stopCapture();
    }

    captureForSeconds (classId, seconds) {
        const duration = Math.max(1, Math.min(10, Number(seconds) || 3));
        return this.startHoldCapture(classId).then(() => new Promise(resolve => {
            if (!this.running) {
                resolve();
                return;
            }
            this.captureResolve = resolve;
            this.captureEndTimer = window.setTimeout(() => this._stopCapture(), duration * 1000);
        }));
    }

    useModel () {
        const model = this._model();
        if (!this._isModelReady(model)) return false;
        model.active = true;
        this._saveModel(model, {modelActive: true}, {updateToolbox: false});
        return true;
    }

    _detectLoop () {
        if (!this.running) return;
        const currentModel = this.vm.getHandPoseGestureModel && this.vm.getHandPoseGestureModel();
        if (currentModel !== this.modelReference) this._restoreModel();
        if (this.detector && this._isVideoReady(this.sourceVideo) && !this.detecting) {
            this.detecting = true;
            this.detector.estimateHands(this.sourceVideo, {flipHorizontal: false})
                .then(detectedHands => this._processHands(detectedHands || []))
                .catch(error => this._setState({error: errorMessage(error)}))
                .then(() => {
                    this.detecting = false;
                });
        }
        window.setTimeout(() => this._detectLoop(), 120);
    }

    _processHands (detectedHands) {
        const hands = detectedHands.slice(0, 2).map((hand, index) => this._normalizeHand(hand, index));
        const primaryHand = hands[0] || null;
        const result = {
            handCount: hands.length,
            gesture: primaryHand ? recognizeNativeGesture(primaryHand) : '',
            confidence: primaryHand ? Math.round((primaryHand.score || 0) * 100) : 0,
            primaryHand,
            hands,
            trainedGesture: this.state.prediction
        };
        const feedback = hands.length === 0 ? 'Nenhuma mão detectada. Mostre a mão inteira para a câmera.' :
            (hands.length > 1 ? 'Mostre apenas uma mão durante a coleta de exemplos.' :
                (primaryHand.score < 0.75 ? 'Melhore a iluminação e mantenha a mão dentro do quadro.' :
                    'Mão detectada. Mantenha a pose estável durante a captura.'));
        this.vm.setHandPoseDetectionResult(result);
        this._setState({feedback, result});
        this._draw(result);
        return this._classifyHands(hands).then(prediction => {
            const publicPrediction = this._model().active ? prediction : emptyPrediction();
            // The preview always shows the live result so users can test a model
            // before enabling it. Blocks only receive predictions from active models.
            result.trainedGesture = prediction;
            this.vm.setHandPoseDetectionResult(result);
            this.vm.setHandPoseGesturePrediction(publicPrediction);
            this._setState({prediction, result});
        });
    }

    _classifyHands (hands) {
        if (!this.classifier || this.classifier.getNumClasses() < 2 || !hands.length) {
            return Promise.resolve(emptyPrediction());
        }
        return Promise.all(hands.map(hand => {
            const vector = canonicalLandmarkVector(hand);
            if (!vector) return Promise.resolve(null);
            const tensor = this.tf.tensor(vector).reshape([1, vector.length]);
            return this.classifier.predictClass(tensor, 3)
                .then(result => {
                    tensor.dispose();
                    return result;
                })
                .catch(() => {
                    tensor.dispose();
                    return null;
                });
        })).then(results => {
            const valid = results.filter(Boolean);
            if (!valid.length) return emptyPrediction();
            const best = valid.reduce((current, candidate) =>
                ((candidate.confidences[candidate.label] || 0) > (current.confidences[current.label] || 0) ?
                    candidate : current)
            );
            return this._smoothPrediction(best);
        });
    }

    _smoothPrediction (result) {
        this.predictionHistory.push(result);
        if (this.predictionHistory.length > PREDICTION_HISTORY_SIZE) this.predictionHistory.shift();
        const votes = {};
        const confidences = {};
        this.predictionHistory.forEach(item => {
            votes[item.label] = (votes[item.label] || 0) + 1;
            Object.keys(item.confidences || {}).forEach(classId => {
                confidences[classId] = (confidences[classId] || 0) + item.confidences[classId];
            });
        });
        Object.keys(confidences).forEach(classId => {
            confidences[classId] = Math.round((confidences[classId] / this.predictionHistory.length) * 100);
        });
        const classId = Object.keys(votes).sort((a, b) => votes[b] - votes[a])[0] || '';
        const classItem = this._model().classes.find(item => item.id === classId);
        return {classId, label: classItem ? classItem.name : '', confidences};
    }

    _normalizeHand (hand, index) {
        const imagePoints = hand.keypoints || [];
        const worldPoints = hand.keypoints3D || [];
        return {
            index: index + 1,
            handedness: correctHandednessForUnmirroredInput(hand.handedness),
            score: typeof hand.score === 'number' ? hand.score : 0,
            keypoints: imagePoints.map((point, pointIndex) => Object.assign({}, point, {
                name: point.name || KEYPOINT_NAMES[pointIndex],
                z: typeof point.z === 'number' ? point.z :
                    (worldPoints[pointIndex] && typeof worldPoints[pointIndex].z === 'number' ?
                        worldPoints[pointIndex].z : 0)
            })),
            worldKeypoints: worldPoints.map((point, pointIndex) => Object.assign({}, point, {
                name: point.name ||
                    (imagePoints[pointIndex] && imagePoints[pointIndex].name) ||
                    KEYPOINT_NAMES[pointIndex]
            }))
        };
    }

    _captureCurrent (classId, deferProjectChange) {
        const result = this.state.result;
        if (!result || result.handCount !== 1 || !result.primaryHand) return false;
        const vector = canonicalLandmarkVector(result.primaryHand);
        if (!vector) return false;
        const model = this._model();
        const count = model.examples.filter(example => example.classId === classId).length;
        if (count >= MAX_EXAMPLES) {
            this._setState({feedback: 'Esta classe já atingiu o máximo de 200 exemplos.'});
            return false;
        }
        const repeated = model.examples.slice(-12)
            .filter(example => example.classId === classId)
            .some(example => this._vectorDistance(example.vector, vector) < 0.003);
        if (repeated) {
            this._setState({feedback: 'Mova levemente a mão para coletar exemplos mais variados.'});
            return false;
        }
        model.examples.push({classId, vector});
        model.active = false;
        if (this.classifier) {
            const tensor = this.tf.tensor(vector).reshape([1, vector.length]);
            this.classifier.addExample(tensor, classId);
            tensor.dispose();
        }
        this._saveModel(model, {feedback: 'Exemplo capturado.'}, {
            emitProjectChanged: !deferProjectChange,
            updateToolbox: false
        });
        if (deferProjectChange) this.capturedExamplesDirty = true;
        return true;
    }

    _stopCapture () {
        if (this.captureTimer) window.clearInterval(this.captureTimer);
        if (this.captureEndTimer) window.clearTimeout(this.captureEndTimer);
        this.captureTimer = null;
        this.captureEndTimer = null;
        if (this.capturedExamplesDirty) {
            this.capturedExamplesDirty = false;
            this.vm.setHandPoseGestureModel(this._model(), {updateToolbox: false});
        }
        this._setState({capturing: false});
        if (this.captureResolve) {
            const resolve = this.captureResolve;
            this.captureResolve = null;
            resolve();
        }
    }

    _model () {
        const saved = this.vm.getHandPoseGestureModel && this.vm.getHandPoseGestureModel();
        if (saved && saved.version === MODEL_VERSION && saved.featureVersion === FEATURE_VERSION &&
            Array.isArray(saved.classes) && Array.isArray(saved.examples)) {
            const validExamples = saved.examples.filter(item => item && item.classId &&
                Array.isArray(item.vector) && item.vector.length === 63);
            return {
                version: saved.version,
                featureVersion: saved.featureVersion,
                classes: saved.classes.map(item => Object.assign({}, item)),
                examples: validExamples.map(item => ({classId: item.classId, vector: item.vector.slice()})),
                active: Boolean(saved.active)
            };
        }
        const model = defaultModel();
        if (this.vm.setHandPoseGestureModel) this.vm.setHandPoseGestureModel(model);
        return model;
    }

    _saveModel (model, statePatch, options) {
        model.active = Boolean(model.active) && this._isModelReady(model);
        this.vm.setHandPoseGestureModel(model, options);
        this.modelReference = model;
        this._setState(Object.assign({
            classes: this._classesWithCounts(model),
            modelActive: model.active,
            modelReady: this._isModelReady(model)
        }, statePatch));
    }

    _restoreModel () {
        const model = this._model();
        this.modelReference = this.vm.getHandPoseGestureModel && this.vm.getHandPoseGestureModel();
        this._rebuildClassifier(model);
        this._setState({
            classes: this._classesWithCounts(model),
            modelActive: Boolean(model.active),
            modelReady: this._isModelReady(model)
        });
    }

    _rebuildClassifier (model) {
        if (!this.classifier || !this.tf) return;
        this.classifier.clearAllClasses();
        model.examples.forEach(example => {
            if (!example || !example.classId || !Array.isArray(example.vector) || example.vector.length !== 63) return;
            const tensor = this.tf.tensor(example.vector).reshape([1, example.vector.length]);
            this.classifier.addExample(tensor, example.classId);
            tensor.dispose();
        });
        this.predictionHistory = [];
    }

    _classesWithCounts (model) {
        return model.classes.map(item => Object.assign({}, item, {
            count: model.examples.filter(example => example.classId === item.id).length
        }));
    }

    _isModelReady (model) {
        return model.classes.length >= 2 && model.classes.every(item =>
            model.examples.filter(example => example.classId === item.id).length >= MIN_EXAMPLES
        );
    }

    _vectorDistance (a, b) {
        if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return Infinity;
        let sum = 0;
        for (let index = 0; index < a.length; index++) {
            const difference = a[index] - b[index];
            sum += difference * difference;
        }
        return Math.sqrt(sum / a.length);
    }

    _attachStream (video) {
        if (!video || !this.stream) return;
        video.srcObject = this.stream;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
    }

    _draw (result) {
        this.canvases.forEach(canvas => {
            const video = this.sourceVideo;
            if (video && video.videoWidth && video.videoHeight &&
                (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight)) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            }
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            (result.hands || []).forEach(hand => this._drawHand(ctx, hand));
        });
    }

    _drawHand (ctx, hand) {
        const points = {};
        hand.keypoints.forEach(point => {
            points[point.name] = point;
        });
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#00E0A4';
        ctx.fillStyle = '#FFFFFF';
        CONNECTIONS.forEach(([from, to]) => {
            if (!points[from] || !points[to]) return;
            ctx.beginPath();
            ctx.moveTo(points[from].x, points[from].y);
            ctx.lineTo(points[to].x, points[to].y);
            ctx.stroke();
        });
        hand.keypoints.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    _clearCanvas (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width || 1, canvas.height || 1);
    }

    _isVideoReady (video) {
        return Boolean(video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
            video.videoWidth > 0 && video.videoHeight > 0);
    }

    _setState (patch) {
        this.state = Object.assign({}, this.state, patch);
        this.listeners.forEach(listener => listener(this.state));
        if (this.vm && typeof this.vm.emit === 'function') {
            this.vm.emit('HAND_POSE_DETECTION_STATE_CHANGED', {
                running: this.state.running,
                loading: this.state.loading,
                error: this.state.error
            });
        }
    }
}

const sessions = new WeakMap();
const getHandPoseDetectionSession = vm => {
    if (sessions.has(vm)) return sessions.get(vm);
    const session = new HandPoseDetectionSession(vm);
    sessions.set(vm, session);
    return session;
};

export {
    CAPTURE_INTERVAL,
    FEATURE_VERSION,
    HandPoseDetectionSession,
    MAX_CUSTOM_CLASSES,
    MAX_EXAMPLES,
    MIN_EXAMPLES,
    MODEL_VERSION,
    getHandPoseDetectionSession
};
