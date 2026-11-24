import {createUSBConnection} from '@microbit/microbit-connection/build/cjs/usb/index.js';
import {createUniversalHexFlashDataSource} from '@microbit/microbit-connection/build/cjs/universal-hex/index.js';

export const MICROBIT_REALTIME_FIRMWARE_V2_URL =
    'static/firmwares/microbit/dogoblock-microbit-realtime-v2.hex';

let connection = null;

export const isMicrobitWebUsbSupported = () =>
    typeof navigator !== 'undefined' && Boolean(navigator.usb) &&
    !(typeof window !== 'undefined' && window.isSecureContext === false);

export const connectMicrobitWebUsb = () => {
    if (!isMicrobitWebUsbSupported()) {
        return Promise.reject(new Error(
            'O envio direto ao micro:bit exige Chrome ou Edge em HTTPS.'
        ));
    }
    if (!connection) connection = createUSBConnection({pauseOnHidden: false});
    return connection.status === 'Connected' ? Promise.resolve(connection) :
        connection.connect().then(() => connection);
};

export const getMicrobitWebUsbErrorMessage = error => {
    const messages = {
        'no-device-selected': 'Nenhum micro:bit foi selecionado.',
        'device-in-use': 'O micro:bit esta em uso por outro programa. Feche-o e tente novamente.',
        'device-disconnected': 'O micro:bit foi desconectado durante o envio.',
        'permission-denied': 'O acesso USB foi negado. Autorize o micro:bit e tente novamente.'
    };
    return messages[error && error.code] || (error && error.message ? error.message : String(error));
};

export const flashMicrobitHex = (usbConnection, hex, onProgress) => {
    const upload = typeof hex !== 'string' || !hex.trim().startsWith(':') ?
        Promise.reject(new Error('Arquivo .hex do micro:bit invalido. Tente compilar novamente.')) :
        usbConnection.flash(createUniversalHexFlashDataSource(hex), {
            partial: true,
            progress: onProgress
        });
    return upload.finally(() => usbConnection.disconnect());
};

export const fetchMicrobitRealtimeFirmware = () =>
    fetch(MICROBIT_REALTIME_FIRMWARE_V2_URL)
        .then(response => {
            if (!response.ok) throw new Error('Firmware do micro:bit nao encontrado.');
            return response.text();
        });
