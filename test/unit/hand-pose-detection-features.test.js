import {
    canonicalLandmarkVector,
    correctHandednessForUnmirroredInput,
    KEYPOINT_NAMES
} from '../../src/lib/hand-pose-detection/features';

const coordinates = [
    [0, 0, 0],
    [-0.25, 0.25, 0], [-0.45, 0.45, 0], [-0.62, 0.66, 0], [-0.82, 0.85, 0],
    [-0.42, 0.88, 0], [-0.44, 1.35, 0], [-0.45, 1.72, 0], [-0.46, 2.08, 0],
    [0, 1.02, 0], [0, 1.55, 0], [0, 1.95, 0], [0, 2.34, 0],
    [0.35, 0.91, 0], [0.38, 1.4, 0], [0.4, 1.76, 0], [0.42, 2.08, 0],
    [0.68, 0.72, 0], [0.75, 1.1, 0], [0.8, 1.4, 0], [0.84, 1.68, 0]
];

const makeHand = (transform, handedness) => ({
    handedness,
    worldKeypoints: coordinates.map((coordinate, index) => {
        const point = transform(coordinate);
        return {
            name: KEYPOINT_NAMES[index],
            x: point[0],
            y: point[1],
            z: point[2]
        };
    })
});

const expectVectorsClose = (actual, expected) => {
    expect(actual).toHaveLength(63);
    actual.forEach((value, index) => {
        expect(value).toBeCloseTo(expected[index], 4);
    });
};

describe('canonical hand landmarks', () => {
    test('is invariant to translation and scale', () => {
        const base = canonicalLandmarkVector(makeHand(point => point, 'right'));
        const transformed = canonicalLandmarkVector(makeHand(point => [
            (point[0] * 3.4) + 18,
            (point[1] * 3.4) - 7,
            point[2] * 3.4
        ], 'right'));
        expectVectorsClose(transformed, base);
    });

    test('is invariant to rotation around the camera axis', () => {
        const base = canonicalLandmarkVector(makeHand(point => point, 'right'));
        const angle = Math.PI / 3;
        const rotated = canonicalLandmarkVector(makeHand(point => [
            (point[0] * Math.cos(angle)) - (point[1] * Math.sin(angle)),
            (point[0] * Math.sin(angle)) + (point[1] * Math.cos(angle)),
            point[2]
        ], 'right'));
        expectVectorsClose(rotated, base);
    });

    test('mirrors the left hand into the right hand reference', () => {
        const right = canonicalLandmarkVector(makeHand(point => point, 'right'));
        const left = canonicalLandmarkVector(makeHand(point => [-point[0], point[1], point[2]], 'left'));
        expectVectorsClose(left, right);
    });
});

describe('detected hand side', () => {
    test('corrects MediaPipe handedness for the unmirrored camera input', () => {
        expect(correctHandednessForUnmirroredInput('Left')).toBe('right');
        expect(correctHandednessForUnmirroredInput('Right')).toBe('left');
    });

    test('keeps an unavailable hand side empty', () => {
        expect(correctHandednessForUnmirroredInput()).toBe('');
    });
});
