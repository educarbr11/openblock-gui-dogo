import {isScratchDesktop} from './isScratchDesktop';
import {downloadArduinoRealtimeFirmware, downloadBundledArduinoRealtimeFirmware} from './dogoblock-api';

const WEB_SERIAL_FIRMWARE_BOARDS = ['arduinoUno', 'arduinoNano'];

const getRealDeviceId = deviceId => {
    const id = deviceId || '';
    return id.indexOf('_') === -1 ? id : id.split('_')[1];
};

const isWebSerialSupported = () => process.env.OPENBLOCK_TAURI_DESKTOP !== 'true' &&
    typeof navigator !== 'undefined' &&
    Boolean(navigator.serial) &&
    !(typeof window !== 'undefined' && window.isSecureContext === false);

const shouldUseWebSerialFirmware = (deviceId, connectionType) => {
    const board = getRealDeviceId(deviceId);
    if (isScratchDesktop()) return false;
    if (WEB_SERIAL_FIRMWARE_BOARDS.indexOf(board) === -1) return false;
    if (connectionType === 'webSerial') return true;
    return connectionType === 'auto' && isWebSerialSupported();
};

const shouldUseLinkFirmwareArtifact = (deviceId, connectionType) => {
    const board = getRealDeviceId(deviceId);
    if (isScratchDesktop()) return false;
    if (WEB_SERIAL_FIRMWARE_BOARDS.indexOf(board) === -1) return false;
    return connectionType === 'link' || (connectionType === 'auto' && !isWebSerialSupported());
};

const emitUploadStdout = (vm, message) => {
    vm.emit('PERIPHERAL_UPLOAD_STDOUT', {message});
};

const emitUploadError = (vm, message) => {
    vm.emit('PERIPHERAL_UPLOAD_ERROR', {message});
};

const uploadArduinoRealtimeFirmware = ({
    vm,
    deviceId,
    connectionType,
    onOpenUploadProgress,
    onSetRealtimeConnection
}) => {
    const board = getRealDeviceId(deviceId);

    if (shouldUseWebSerialFirmware(deviceId, connectionType)) {
        if (!isWebSerialSupported()) {
            if (onOpenUploadProgress) onOpenUploadProgress();
            emitUploadError(vm,
                'Web Serial USB nao esta disponivel neste navegador. Use Chrome/Edge com HTTPS/localhost.');
            return true;
        }
        if (!vm.getPeripheralIsConnected(deviceId)) {
            if (onOpenUploadProgress) onOpenUploadProgress();
            emitUploadError(vm, 'Conecte a placa via Web Serial USB antes de enviar o firmware.');
            return true;
        }

        if (onOpenUploadProgress) onOpenUploadProgress();
        if (onSetRealtimeConnection) onSetRealtimeConnection(false);
        emitUploadStdout(vm, 'Baixando firmware Arduino realtime do Dogoblock API...\n');
        downloadArduinoRealtimeFirmware(board)
            .then(hex => {
                emitUploadStdout(vm, 'Firmware recebido. Iniciando gravacao Web Serial USB...\n');
                vm.uploadArtifactToPeripheral(deviceId, hex, null, {
                    firmware: true,
                    resumeRealtime: true
                });
            })
            .catch(error => {
                emitUploadError(vm, error && error.message ? error.message : String(error));
            });
        return true;
    }

    if (shouldUseLinkFirmwareArtifact(deviceId, connectionType)) {
        if (!vm.getPeripheralIsConnected(deviceId)) {
            if (onOpenUploadProgress) onOpenUploadProgress();
            emitUploadError(vm, 'Conecte a placa via OpenBlock Link antes de enviar o firmware.');
            return true;
        }

        if (onOpenUploadProgress) onOpenUploadProgress();
        if (onSetRealtimeConnection) onSetRealtimeConnection(false);
        // DoGoBlock Link works offline, so it uses the firmware bundled with the editor.
        emitUploadStdout(vm, 'Preparando firmware Arduino realtime...\n');
        downloadBundledArduinoRealtimeFirmware(board)
            .then(hex => {
                emitUploadStdout(vm, 'Firmware pronto. Iniciando gravacao via DoGoBlock Link...\n');
                vm.uploadArtifactToPeripheral(deviceId, hex, null, {
                    artifactType: 'compiledArtifact',
                    firmware: true,
                    resumeRealtime: true
                });
            })
            .catch(error => {
                emitUploadError(vm, error && error.message ? error.message : String(error));
            });
        return true;
    }

    if (connectionType === 'webSerial' && WEB_SERIAL_FIRMWARE_BOARDS.indexOf(board) === -1) {
        if (onOpenUploadProgress) onOpenUploadProgress();
        emitUploadError(vm,
            'Envio de firmware via Web Serial USB suporta apenas Arduino Uno e Nano. ' +
            'Use OpenBlock Link para esta placa.');
        return true;
    }

    return false;
};

export default uploadArduinoRealtimeFirmware;
