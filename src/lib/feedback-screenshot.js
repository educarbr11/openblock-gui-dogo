const MAX_SCREENSHOT_BYTES = 8 * 1024 * 1024;
const MAX_SCREENSHOT_DIMENSION = 1920;

const waitForPaint = () => new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
});

const canvasToBlob = (canvas, type, quality) => new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error('Could not create the screenshot image'));
    }, type, quality);
});

const captureVideoFrame = video => {
    const sourceWidth = video.videoWidth;
    const sourceHeight = video.videoHeight;
    if (!sourceWidth || !sourceHeight) {
        return Promise.reject(new Error('The selected screen did not provide an image'));
    }

    const scale = Math.min(1, MAX_SCREENSHOT_DIMENSION / Math.max(sourceWidth, sourceHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(sourceWidth * scale));
    canvas.height = Math.max(1, Math.round(sourceHeight * scale));
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvasToBlob(canvas, 'image/png').then(blob => {
        if (blob.size <= MAX_SCREENSHOT_BYTES) return blob;
        return canvasToBlob(canvas, 'image/jpeg', 0.85);
    });
};

const captureScreen = callbacks => {
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getDisplayMedia !== 'function') {
        const error = new Error('Screen capture is not supported');
        error.code = 'SCREEN_CAPTURE_UNSUPPORTED';
        return Promise.reject(error);
    }

    let stream = null;
    let video = null;
    const restore = () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
        if (video) video.srcObject = null;
        if (callbacks && callbacks.onAfterCapture) callbacks.onAfterCapture();
    };

    if (callbacks && callbacks.onBeforeCapture) callbacks.onBeforeCapture();
    return waitForPaint()
        .then(() => navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: {
                height: window.innerHeight * window.devicePixelRatio,
                width: window.innerWidth * window.devicePixelRatio
            },
            monitorTypeSurfaces: 'exclude',
            preferCurrentTab: true,
            selfBrowserSurface: 'include',
            surfaceSwitching: 'exclude'
        }))
        .then(captureStream => {
            stream = captureStream;
            video = document.createElement('video');
            video.muted = true;
            video.srcObject = stream;
            return new Promise((resolve, reject) => {
                video.onloadedmetadata = resolve;
                video.onerror = reject;
                video.play().catch(reject);
            });
        })
        .then(() => captureVideoFrame(video))
        .then(blob => {
            restore();
            return blob;
        })
        .catch(error => {
            restore();
            throw error;
        });
};

const isSupportedScreenshotFile = file => Boolean(file && [
    'image/jpeg',
    'image/png',
    'image/webp'
].indexOf(file.type) !== -1 && file.size <= MAX_SCREENSHOT_BYTES);

export {
    MAX_SCREENSHOT_BYTES,
    captureScreen,
    isSupportedScreenshotFile
};
