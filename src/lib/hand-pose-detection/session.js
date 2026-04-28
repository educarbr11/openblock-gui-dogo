import loadHandPoseDetection from './load-model';

const CONNECTIONS = [
    ['wrist', 'thumb_cmc'],
    ['thumb_cmc', 'thumb_mcp'],
    ['thumb_mcp', 'thumb_ip'],
    ['thumb_ip', 'thumb_tip'],
    ['wrist', 'index_finger_mcp'],
    ['index_finger_mcp', 'index_finger_pip'],
    ['index_finger_pip', 'index_finger_dip'],
    ['index_finger_dip', 'index_finger_tip'],
    ['wrist', 'middle_finger_mcp'],
    ['middle_finger_mcp', 'middle_finger_pip'],
    ['middle_finger_pip', 'middle_finger_dip'],
    ['middle_finger_dip', 'middle_finger_tip'],
    ['wrist', 'ring_finger_mcp'],
    ['ring_finger_mcp', 'ring_finger_pip'],
    ['ring_finger_pip', 'ring_finger_dip'],
    ['ring_finger_dip', 'ring_finger_tip'],
    ['wrist', 'pinky_finger_mcp'],
    ['pinky_finger_mcp', 'pinky_finger_pip'],
    ['pinky_finger_pip', 'pinky_finger_dip'],
    ['pinky_finger_dip', 'pinky_finger_tip']
];

const emptyResult = () => ({
    handCount: 0,
    gesture: '',
    confidence: 0,
    primaryHand: null,
    hands: []
});

const distance = (a, b) => {
    if (!a || !b) return Infinity;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt((dx * dx) + (dy * dy));
};

class HandPoseDetectionSession {
    constructor (vm) {
        this.vm = vm;
        this.listeners = [];
        this.videos = [];
        this.canvases = [];
        this.state = {
            error: null,
            loading: true,
            result: emptyResult()
        };
        this.detector = null;
        this.stream = null;
        this.running = false;
        this.requested = false;
        this.startToken = 0;
        this.startPromise = null;
        this.detecting = false;
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

    setCanvas (canvas) {
        if (canvas && this.canvases.indexOf(canvas) === -1) {
            this.canvases.push(canvas);
        }
        this._draw(this.state.result);
    }

    removeCanvas (canvas) {
        this.canvases = this.canvases.filter(item => item !== canvas);
        if (canvas) this._clearCanvas(canvas);
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
                error: 'Camera is not available in this browser.'
            });
            return Promise.resolve();
        }
        this.startPromise = Promise.all([
            loadHandPoseDetection(),
            navigator.mediaDevices.getUserMedia({video: true})
        ])
            .then(([libs, stream]) => {
                if (!this.requested || startToken !== this.startToken) {
                    stream.getTracks().forEach(track => track.stop());
                    return;
                }
                this.stream = stream;
                this.videos.forEach(video => {
                    video.srcObject = stream;
                    video.play();
                });
                const model = libs.handPoseDetection.SupportedModels.MediaPipeHands;
                return libs.handPoseDetection.createDetector(model, {
                    runtime: 'mediapipe',
                    modelType: 'full',
                    maxHands: 2,
                    solutionPath: libs.solutionPath
                });
            })
            .then(detector => {
                if (!detector) return;
                if (!this.requested || startToken !== this.startToken) {
                    detector.dispose();
                    return;
                }
                this.detector = detector;
                this.running = true;
                this._setState({loading: false});
                this._detectLoop();
            })
            .catch(error => {
                this._setState({
                    loading: false,
                    error: error && error.message ? error.message : 'Unable to load camera or hand detector.'
                });
            });
        return this.startPromise;
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
        this.canvases.forEach(canvas => this._clearCanvas(canvas));
        if (this.detector && typeof this.detector.dispose === 'function') {
            this.detector.dispose();
        }
        this.videos = [];
        this.canvases = [];
        this.stream = null;
        this.detector = null;
        this.startPromise = null;
        const result = emptyResult();
        this.vm.setHandPoseDetectionResult(result);
        this._setState({
            loading: true,
            result
        });
    }

    _detectLoop () {
        if (!this.running) return;
        const video = this.videos[0];
        if (this.detector && this._isVideoReady(video) && !this.detecting) {
            this.detecting = true;
            this.detector.estimateHands(video, {flipHorizontal: false})
                .then(hands => {
                    const result = this._resultFromHands(hands || []);
                    this.vm.setHandPoseDetectionResult(result);
                    this._setState({result});
                    this._draw(result);
                })
                .catch(error => {
                    this._setState({
                        error: error && error.message ? error.message : 'Unable to detect hands.'
                    });
                })
                .then(() => {
                    this.detecting = false;
                });
        } else {
            this._draw(this.state.result);
        }
        window.setTimeout(() => this._detectLoop(), 120);
    }

    _resultFromHands (detectedHands) {
        const hands = detectedHands.slice(0, 2).map((hand, index) => this._normalizeHand(hand, index));
        const primaryHand = hands[0] || null;
        const gesture = primaryHand ? this._recognizeGesture(primaryHand) : 'nenhum';
        const confidence = primaryHand ? Math.round((primaryHand.score || 0) * 100) : 0;
        return {
            handCount: hands.length,
            gesture: primaryHand ? gesture : '',
            confidence,
            primaryHand,
            hands
        };
    }

    _normalizeHand (hand, index) {
        const keypoints3D = hand.keypoints3D || [];
        return {
            index: index + 1,
            handedness: (hand.handedness || '').toLowerCase(),
            score: typeof hand.score === 'number' ? hand.score : 0,
            keypoints: (hand.keypoints || []).map((point, pointIndex) => Object.assign({}, point, {
                z: typeof point.z === 'number' ? point.z :
                    (keypoints3D[pointIndex] && typeof keypoints3D[pointIndex].z === 'number' ?
                        keypoints3D[pointIndex].z : 0)
            }))
        };
    }

    _recognizeGesture (hand) {
        const points = {};
        hand.keypoints.forEach(point => {
            points[point.name] = point;
        });
        const extended = {
            index: this._fingerExtended(points, 'index_finger'),
            middle: this._fingerExtended(points, 'middle_finger'),
            ring: this._fingerExtended(points, 'ring_finger'),
            pinky: this._fingerExtended(points, 'pinky_finger')
        };
        const extendedCount = Object.keys(extended).filter(key => extended[key]).length;
        const palmSize = distance(points.wrist, points.middle_finger_mcp);
        const pinchDistance = distance(points.thumb_tip, points.index_finger_tip);
        if (pinchDistance < Math.max(24, palmSize * 0.35)) {
            return 'pinça';
        }
        if (extended.index && !extended.middle && !extended.ring && !extended.pinky) {
            return 'apontando';
        }
        if (extendedCount === 4) {
            return 'mão aberta';
        }
        if (extendedCount === 0) {
            return 'mão fechada';
        }
        return 'nenhum';
    }

    _fingerExtended (points, prefix) {
        const tip = points[`${prefix}_tip`];
        const pip = points[`${prefix}_pip`];
        const mcp = points[`${prefix}_mcp`];
        if (!tip || !pip || !mcp) return false;
        return tip.y < pip.y - 8 && pip.y < mcp.y + 18;
    }

    _draw (result) {
        this.canvases.forEach(canvas => {
            const video = this.videos[0];
            if (!this._isVideoReady(video)) {
                this._clearCanvas(canvas);
                return;
            }
            if (canvas.width !== video.videoWidth) canvas.width = video.videoWidth;
            if (canvas.height !== video.videoHeight) canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            (result.hands || []).forEach(hand => {
                this._drawHand(ctx, hand);
            });
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
        return Boolean(
            video &&
            video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
            video.videoWidth > 0 &&
            video.videoHeight > 0
        );
    }

    _setState (patch) {
        this.state = Object.assign({}, this.state, patch);
        this.listeners.forEach(listener => listener(this.state));
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
    HandPoseDetectionSession,
    getHandPoseDetectionSession
};
