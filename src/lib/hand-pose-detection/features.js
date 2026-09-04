const KEYPOINT_NAMES = [
    'wrist',
    'thumb_cmc', 'thumb_mcp', 'thumb_ip', 'thumb_tip',
    'index_finger_mcp', 'index_finger_pip', 'index_finger_dip', 'index_finger_tip',
    'middle_finger_mcp', 'middle_finger_pip', 'middle_finger_dip', 'middle_finger_tip',
    'ring_finger_mcp', 'ring_finger_pip', 'ring_finger_dip', 'ring_finger_tip',
    'pinky_finger_mcp', 'pinky_finger_pip', 'pinky_finger_dip', 'pinky_finger_tip'
];

const EPSILON = 1e-6;

const correctHandednessForUnmirroredInput = handedness => {
    const normalized = String(handedness || '').toLowerCase();
    if (normalized === 'left') return 'right';
    if (normalized === 'right') return 'left';
    return normalized;
};

const subtract = (a, b) => ({
    x: (a.x || 0) - (b.x || 0),
    y: (a.y || 0) - (b.y || 0),
    z: (a.z || 0) - (b.z || 0)
});

const multiply = (vector, scalar) => ({
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar
});

const dot = (a, b) => (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
const cross = (a, b) => ({
    x: (a.y * b.z) - (a.z * b.y),
    y: (a.z * b.x) - (a.x * b.z),
    z: (a.x * b.y) - (a.y * b.x)
});
const magnitude = vector => Math.sqrt(dot(vector, vector));
const normalize = vector => {
    const length = magnitude(vector);
    return length > EPSILON ? multiply(vector, 1 / length) : null;
};
const distance3d = (a, b) => magnitude(subtract(a, b));

const pointsByName = points => {
    const mapped = {};
    (points || []).forEach((point, index) => {
        if (!point) return;
        const name = point.name || KEYPOINT_NAMES[index];
        if (name) mapped[name] = point;
    });
    return mapped;
};

const sourcePoints = hand => {
    if (hand && Array.isArray(hand.worldKeypoints) && hand.worldKeypoints.length >= KEYPOINT_NAMES.length) {
        return hand.worldKeypoints;
    }
    return hand && Array.isArray(hand.keypoints) ? hand.keypoints : [];
};

const canonicalLandmarkVector = hand => {
    const points = pointsByName(sourcePoints(hand));
    const wrist = points.wrist;
    const indexMcp = points.index_finger_mcp;
    const middleMcp = points.middle_finger_mcp;
    const pinkyMcp = points.pinky_finger_mcp;
    if (!wrist || !indexMcp || !middleMcp || !pinkyMcp) return null;

    const lateral = normalize(subtract(indexMcp, pinkyMcp));
    const forwardSeed = normalize(subtract(middleMcp, wrist));
    if (!lateral || !forwardSeed) return null;
    let normal = normalize(cross(lateral, forwardSeed));
    if (!normal) normal = {x: 0, y: 0, z: 1};
    const forward = normalize(cross(normal, lateral)) || forwardSeed;
    const scale = (
        distance3d(wrist, indexMcp) +
        distance3d(wrist, middleMcp) +
        distance3d(wrist, pinkyMcp)
    ) / 3;
    if (!Number.isFinite(scale) || scale < EPSILON) return null;

    const vector = [];
    for (const name of KEYPOINT_NAMES) {
        if (!points[name]) return null;
        const relative = subtract(points[name], wrist);
        vector.push(
            dot(relative, lateral) / scale,
            dot(relative, forward) / scale,
            dot(relative, normal) / scale
        );
    }
    return vector.map(value => Number(value.toFixed(5)));
};

const angleDegrees = (a, vertex, c) => {
    if (!a || !vertex || !c) return 0;
    const first = normalize(subtract(a, vertex));
    const second = normalize(subtract(c, vertex));
    if (!first || !second) return 0;
    const cosine = Math.max(-1, Math.min(1, dot(first, second)));
    return Math.acos(cosine) * (180 / Math.PI);
};

const fingerIsExtended = (points, prefix) => {
    const mcp = points[`${prefix}_finger_mcp`];
    const pip = points[`${prefix}_finger_pip`];
    const dip = points[`${prefix}_finger_dip`];
    const tip = points[`${prefix}_finger_tip`];
    const wrist = points.wrist;
    return angleDegrees(mcp, pip, dip) > 150 &&
        angleDegrees(pip, dip, tip) > 145 &&
        distance3d(wrist, tip) > distance3d(wrist, pip) * 1.08;
};

const thumbIsExtended = points =>
    angleDegrees(points.thumb_mcp, points.thumb_ip, points.thumb_tip) > 145 &&
    distance3d(points.wrist, points.thumb_tip) > distance3d(points.wrist, points.thumb_ip) * 1.06;

const recognizeNativeGesture = hand => {
    const points = pointsByName(hand && hand.keypoints);
    if (!points.wrist || !points.index_finger_mcp || !points.pinky_finger_mcp) return 'nenhum';
    const palmScale = (
        distance3d(points.wrist, points.index_finger_mcp) +
        distance3d(points.wrist, points.pinky_finger_mcp)
    ) / 2;
    if (palmScale > EPSILON &&
        distance3d(points.thumb_tip, points.index_finger_tip) / palmScale < 0.32) return 'pinça';
    const extended = {
        thumb: thumbIsExtended(points),
        index: fingerIsExtended(points, 'index'),
        middle: fingerIsExtended(points, 'middle'),
        ring: fingerIsExtended(points, 'ring'),
        pinky: fingerIsExtended(points, 'pinky')
    };
    const extendedCount = Object.keys(extended).filter(name => extended[name]).length;
    if (extended.index && !extended.middle && !extended.ring && !extended.pinky) return 'apontando';
    if (extendedCount >= 4) return 'mão aberta';
    if (extendedCount === 0) return 'mão fechada';
    return 'nenhum';
};

export {
    KEYPOINT_NAMES,
    canonicalLandmarkVector,
    correctHandednessForUnmirroredInput,
    recognizeNativeGesture
};
