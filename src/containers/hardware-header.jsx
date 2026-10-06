import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {injectIntl} from 'react-intl';

import VM from 'openblock-vm';

import {setStageSize} from '../reducers/stage-size';
import {STAGE_SIZE_MODES, STAGE_DISPLAY_SIZES} from '../lib/layout-constants';
import {openUploadProgress} from '../reducers/modals';
import {showAlertWithTimeout} from '../reducers/alerts';
import {isScratchDesktop} from '../lib/isScratchDesktop';
import {
    createArduinoCompileJob,
    getArduinoCompileJob,
    downloadArduinoCompileArtifact,
    createMicrobitCompileJob,
    getMicrobitCompileJob,
    downloadMicrobitCompileArtifact
} from '../lib/dogoblock-api';

import HardwareHeaderComponent from '../components/hardware-header/hardware-header.jsx';

class HardwareHeader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleUpload',
            'handleUploadAfterResourceCheck',
            'handleArduinoCompilerUpload',
            'handleMicrobitCompilerUpload'
        ]);
        this.compileLogLength = 0;
    }

    waitForUploadCompletion () {
        let timeoutId = null;
        let handleSuccess = null;
        let handleError = null;
        const cleanup = () => {
            if (timeoutId) window.clearTimeout(timeoutId);
            this.props.vm.removeListener('PERIPHERAL_UPLOAD_SUCCESS', handleSuccess);
            this.props.vm.removeListener('PERIPHERAL_UPLOAD_ERROR', handleError);
        };
        const promise = new Promise((resolve, reject) => {
            handleSuccess = () => {
                cleanup();
                resolve();
            };
            handleError = error => {
                cleanup();
                reject(new Error(error && error.message ? error.message : String(error)));
            };
            timeoutId = window.setTimeout(() => {
                cleanup();
                reject(new Error(
                    'Tempo limite ao enviar para o Arduino. Verifique se a placa esta conectada e tente novamente.'
                ));
            }, 120000);
            this.props.vm.once('PERIPHERAL_UPLOAD_SUCCESS', handleSuccess);
            this.props.vm.once('PERIPHERAL_UPLOAD_ERROR', handleError);
        });
        return {promise, cancel: cleanup};
    }

    waitForUploadResult (uploadResult, uploadCompletion) {
        if (!uploadResult || typeof uploadResult.then !== 'function') {
            return uploadCompletion.promise;
        }
        const uploadResultPromise = uploadResult.then(() =>
            new Promise((resolve, reject) => {
                window.setTimeout(() => reject(new Error(
                    'O envio terminou sem confirmacao do Arduino. Reconecte a placa e tente novamente.'
                )), 0);
            })
        );
        return Promise.race([
            uploadCompletion.promise,
            uploadResultPromise
        ]);
    }

    handleUpload () {
        if (this.isEsp32ResourceDevice() && this.props.onEnsureResourcePack) {
            this.props.onEnsureResourcePack('esp32')
                .then(this.handleUploadAfterResourceCheck)
                .catch(() => {});
            return;
        }
        this.handleUploadAfterResourceCheck();
    }

    handleUploadAfterResourceCheck () {
        const isMicrobitUpload = this.isMicrobitCompilerDevice();
        if (this.props.peripheralName || isMicrobitUpload) {
            const blocklyBlockCanvas = document.querySelector('.blocklyWorkspace .blocklyBlockCanvas');
            if (blocklyBlockCanvas.childNodes.length === 0) {
                this.props.onWorkspaceIsEmpty();
            } else {
                const startUpload = () => {
                    this.props.onOpenUploadProgress();
                    if (!isScratchDesktop() && isMicrobitUpload) {
                        window.setTimeout(this.handleMicrobitCompilerUpload, 0);
                    } else if (!isScratchDesktop() && this.isArduinoCompilerDevice()) {
                        window.setTimeout(this.handleArduinoCompilerUpload, 0);
                    } else {
                        this.props.vm.uploadToPeripheral(this.props.deviceId, this.props.codeEditorValue);
                    }
                };
                startUpload();
            }
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }

    getEffectiveConnectionType () {
        if (this.props.connectionType === 'webSerial') return 'webSerial';
        if (this.props.connectionType === 'auto' &&
            !isScratchDesktop() &&
            this.isWebSerialArduinoDevice() &&
            this.isWebSerialSupported()) {
            return 'webSerial';
        }
        return 'link';
    }

    isWebSerialSupported () {
        return typeof navigator !== 'undefined' &&
            Boolean(navigator.serial) &&
            !(typeof window !== 'undefined' && window.isSecureContext === false);
    }

    isWebSerialArduinoDevice () {
        return ['arduinoUno', 'arduinoNano'].indexOf(this.getRealDeviceId()) !== -1;
    }

    isArduinoCompilerDevice () {
        return ['arduinoUno', 'arduinoNano', 'arduinoLeonardo'].indexOf(this.getRealDeviceId()) !== -1;
    }

    isMicrobitCompilerDevice () {
        return ['microbit', 'microbitV2'].indexOf(this.getRealDeviceId()) !== -1;
    }

    isEsp32ResourceDevice () {
        return ['arduinoEsp32', 'arduinoEsp32S3'].indexOf(this.getRealDeviceId()) !== -1;
    }

    getRealDeviceId () {
        const deviceId = this.props.deviceId || '';
        return deviceId.indexOf('_') === -1 ? deviceId : deviceId.split('_')[1];
    }

    emitUploadStdout (message) {
        this.props.vm.emit('PERIPHERAL_UPLOAD_STDOUT', {message});
    }

    emitUploadError (message) {
        this.props.vm.emit('PERIPHERAL_UPLOAD_ERROR', {message});
    }

    getUploadCode () {
        const code = this.props.codeEditorValue || '';
        if (/^Cannot read properties of undefined/.test(code) ||
                /^TypeError:/.test(code) ||
                /^Error:/.test(code)) {
            throw new Error(
                'Nao foi possivel gerar o codigo Arduino. Verifique se todos os blocos usados possuem suporte ' +
                'no modo programacao.'
            );
        }
        if (!/\bvoid\s+setup\s*\(/.test(code) && !/\bvoid\s+loop\s*\(/.test(code)) {
            throw new Error('Codigo Arduino invalido ou vazio. Altere os blocos e tente enviar novamente.');
        }
        return code;
    }

    getMicrobitUploadCode () {
        const code = this.props.codeEditorValue || '';
        if (/^Cannot read properties of undefined/.test(code) ||
                /^TypeError:/.test(code) ||
                /^Error:/.test(code)) {
            throw new Error(
                'Nao foi possivel gerar o codigo MicroPython. Verifique se todos os blocos usados possuem suporte.'
            );
        }
        if (!code.trim()) {
            throw new Error('Codigo MicroPython vazio. Altere os blocos e tente enviar novamente.');
        }
        return code;
    }

    handleArduinoCompilerUpload () {
        const board = this.getRealDeviceId();
        const connectionType = this.getEffectiveConnectionType();
        this.compileLogLength = 0;
        if (connectionType === 'webSerial' && ['arduinoUno', 'arduinoNano'].indexOf(board) === -1) {
            this.emitUploadError(
                'Web Serial USB currently supports only Arduino Uno and Nano. Use OpenBlock Link for this board.'
            );
            return;
        }
        let code;
        try {
            code = this.getUploadCode();
        } catch (error) {
            this.emitUploadError(error.message);
            return;
        }
        this.emitUploadStdout('Compilando no Dogoblock API...\n');
        createArduinoCompileJob(board, code, [])
            .then(job => this.pollCompileJob(job.id))
            .then(job => {
                if (!job.artifact) {
                    throw new Error('Compiler did not return an artifact.');
                }
                this.emitUploadStdout('Baixando arquivo compilado...\n');
                return downloadArduinoCompileArtifact(job.id);
            })
            .then(hex => {
                this.emitUploadStdout(connectionType === 'webSerial' ?
                    'Enviando para Arduino via Web Serial USB...\n' :
                    'Enviando para Arduino via OpenBlock Link...\n');
                const uploadCompletion = this.waitForUploadCompletion();
                const uploadResult = this.props.vm.uploadArtifactToPeripheral(this.props.deviceId, hex, null, {
                    artifactType: 'compiledArtifact',
                    firmware: false,
                    resumeRealtime: false
                });
                if (uploadResult === false) {
                    uploadCompletion.cancel();
                    throw new Error('Nao foi possivel iniciar o envio. Reconecte o Arduino e tente novamente.');
                }
                this.emitUploadStdout('Upload iniciado. Aguardando bootloader do Arduino...\n');
                return this.waitForUploadResult(uploadResult, uploadCompletion);
            })
            .catch(error => {
                this.emitUploadError(error && error.message ? error.message : String(error));
            });
    }

    pollCompileJob (jobId) {
        const startedAt = Date.now();
        const poll = () => getArduinoCompileJob(jobId)
            .then(job => {
                if (job.logs) {
                    const newLogs = job.logs.slice(this.compileLogLength);
                    if (newLogs) {
                        this.emitUploadStdout(newLogs);
                        this.compileLogLength = job.logs.length;
                    }
                }
                if (job.status === 'SUCCEEDED') return job;
                if (job.status === 'FAILED') {
                    throw new Error(job.errorSummary || job.logs || 'Arduino compilation failed.');
                }
                if (Date.now() - startedAt > 120000) {
                    throw new Error('Arduino compilation timed out.');
                }
                return new Promise(resolve => window.setTimeout(resolve, 1000)).then(poll);
            });
        return poll();
    }

    handleMicrobitCompilerUpload () {
        this.compileLogLength = 0;
        let code;
        try {
            code = this.getMicrobitUploadCode();
        } catch (error) {
            this.emitUploadError(error.message);
            return;
        }
        this.emitUploadStdout('Compilando MicroPython no Dogoblock API...\n');
        createMicrobitCompileJob(code)
            .then(job => this.pollMicrobitCompileJob(job.id))
            .then(job => {
                if (!job.artifact) {
                    throw new Error('Compiler did not return an artifact.');
                }
                this.emitUploadStdout('Baixando arquivo .hex do micro:bit...\n');
                return downloadMicrobitCompileArtifact(job.id);
            })
            .then(hex => {
                this.emitUploadStdout('Enviando programa para o micro:bit via DoGoBlock Link...\n');
                const uploadCompletion = this.waitForUploadCompletion();
                const uploadResult = this.props.vm.uploadArtifactToPeripheral(this.props.deviceId, hex, null, {
                    artifactType: 'microbitHex',
                    fileName: 'dogoblock-microbit-program.hex',
                    resumeRealtime: false
                });
                if (uploadResult === false) {
                    uploadCompletion.cancel();
                    throw new Error('Nao foi possivel iniciar o envio. Abra o DoGoBlock Link e tente novamente.');
                }
                this.emitUploadStdout('Programa recebido. Copiando .hex para a unidade MICROBIT...\n');
                return this.waitForUploadResult(uploadResult, uploadCompletion);
            })
            .catch(error => {
                this.emitUploadError(error && error.message ? error.message : String(error));
            });
    }

    pollMicrobitCompileJob (jobId) {
        const startedAt = Date.now();
        const poll = () => getMicrobitCompileJob(jobId)
            .then(job => {
                if (job.logs) {
                    const newLogs = job.logs.slice(this.compileLogLength);
                    if (newLogs) {
                        this.emitUploadStdout(newLogs);
                        this.compileLogLength = job.logs.length;
                    }
                }
                if (job.status === 'SUCCEEDED') return job;
                if (job.status === 'FAILED') {
                    throw new Error(job.errorSummary || job.logs || 'MicroPython compilation failed.');
                }
                if (Date.now() - startedAt > 120000) {
                    throw new Error('MicroPython compilation timed out.');
                }
                return new Promise(resolve => window.setTimeout(resolve, 1000)).then(poll);
            });
        return poll();
    }

    render () {
        const {
            ...props
        } = this.props;
        return (
            <HardwareHeaderComponent
                onUpload={this.handleUpload}
                {...props}
            />
        );
    }
}

HardwareHeader.propTypes = {
    codeEditorValue: PropTypes.string,
    connectionType: PropTypes.string,
    deviceId: PropTypes.string,
    onNoPeripheralIsConnected: PropTypes.func.isRequired,
    onEnsureResourcePack: PropTypes.func,
    onOpenUploadProgress: PropTypes.func,
    onWorkspaceIsEmpty: PropTypes.func.isRequired,
    peripheralName: PropTypes.string,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    codeEditorValue: state.scratchGui.code.codeEditorValue,
    connectionType: state.scratchGui.connectionModal.connectionType,
    deviceId: state.scratchGui.device.deviceId,
    peripheralName: state.scratchGui.connectionModal.peripheralName
});

const mapDispatchToProps = dispatch => ({
    onNoPeripheralIsConnected: () => showAlertWithTimeout(dispatch, 'connectAPeripheralFirst'),
    onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZE_MODES.large)),
    onSetStageSmall: () => dispatch(setStageSize(STAGE_SIZE_MODES.small)),
    onSetStageHide: () => dispatch(setStageSize(STAGE_SIZE_MODES.hide)),
    onOpenUploadProgress: () => dispatch(openUploadProgress()),
    onWorkspaceIsEmpty: () => showAlertWithTimeout(dispatch, 'workspaceIsEmpty')
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(HardwareHeader);
