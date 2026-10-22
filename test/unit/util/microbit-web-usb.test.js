/* eslint-env jest */
/* eslint-disable global-require */

const loadService = () => {
    jest.resetModules();
    const usb = {
        status: 'Disconnected',
        connect: jest.fn(() => Promise.resolve()),
        flash: jest.fn(() => Promise.resolve()),
        disconnect: jest.fn(() => Promise.resolve())
    };
    const createUSBConnection = jest.fn(() => usb);
    const createUniversalHexFlashDataSource = jest.fn(hex => hex);
    jest.doMock('@microbit/microbit-connection/build/cjs/usb/index.js', () => ({createUSBConnection}));
    jest.doMock('@microbit/microbit-connection/build/cjs/universal-hex/index.js', () => ({
        createUniversalHexFlashDataSource
    }));
    return {service: require('../../../src/lib/microbit-web-usb'), usb, createUSBConnection};
};

const originalUsb = Object.getOwnPropertyDescriptor(navigator, 'usb');
const originalSecureContext = Object.getOwnPropertyDescriptor(window, 'isSecureContext');

afterEach(() => {
    if (originalUsb) Object.defineProperty(navigator, 'usb', originalUsb);
    else delete navigator.usb;
    if (originalSecureContext) Object.defineProperty(window, 'isSecureContext', originalSecureContext);
    else delete window.isSecureContext;
});

test('requires a secure browser with WebUSB', () => {
    Object.defineProperty(navigator, 'usb', {configurable: true, value: null});
    Object.defineProperty(window, 'isSecureContext', {configurable: true, value: true});
    const {service, createUSBConnection} = loadService();

    expect(service.isMicrobitWebUsbSupported()).toBe(false);
    return service.connectMicrobitWebUsb().catch(error => {
        expect(error.message).toMatch(/Chrome ou Edge/);
        expect(createUSBConnection).not.toHaveBeenCalled();
    });
});

test('flashes a valid hex and releases the USB interface', () => {
    Object.defineProperty(navigator, 'usb', {configurable: true, value: {}});
    Object.defineProperty(window, 'isSecureContext', {configurable: true, value: true});
    const {service, usb, createUSBConnection} = loadService();

    return service.connectMicrobitWebUsb()
        .then(connection => service.flashMicrobitHex(connection, ':00000001FF'))
        .then(() => {
            expect(createUSBConnection).toHaveBeenCalledTimes(1);
            expect(usb.connect).toHaveBeenCalledTimes(1);
            expect(usb.flash).toHaveBeenCalledTimes(1);
            expect(usb.disconnect).toHaveBeenCalledTimes(1);
        });
});

test('does not flash an invalid artifact', () => {
    const {service, usb} = loadService();
    return service.flashMicrobitHex(usb, 'not a hex').catch(error => {
        expect(error.message).toMatch(/invalido/);
        expect(usb.flash).not.toHaveBeenCalled();
        expect(usb.disconnect).toHaveBeenCalledTimes(1);
    });
});

test('explains a busy USB interface', () => {
    const {service} = loadService();
    expect(service.getMicrobitWebUsbErrorMessage({code: 'device-in-use'})).toMatch(/em uso/);
});
