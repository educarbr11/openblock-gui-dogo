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
    downloadArduinoCompileArtifact
} from '../lib/dogoblock-api';

import HardwareHeaderComponent from '../components/hardware-header/hardware-header.jsx';

class HardwareHeader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleUpload',
            'handleWebSerialUpload'
        ]);
        this.compileLogLength = 0;
    }

    handleUpload () {
        if (this.props.peripheralName) {
            const blocklyBlockCanvas = document.querySelector('.blocklyWorkspace .blocklyBlockCanvas');
            if (blocklyBlockCanvas.childNodes.length === 0) {
                this.props.onWorkspaceIsEmpty();
            } else {
                this.props.onOpenUploadProgress();
                if (this.getEffectiveConnectionType() === 'webSerial') {
                    window.setTimeout(this.handleWebSerialUpload, 0);
                } else {
                    this.props.vm.uploadToPeripheral(this.props.deviceId, this.props.codeEditorValue);
                }
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
                'Nao foi possivel gerar o codigo Arduino. Verifique se todos os blocos usados possuem suporte no modo programacao.'
            );
        }
        if (!/\bvoid\s+setup\s*\(/.test(code) && !/\bvoid\s+loop\s*\(/.test(code)) {
            throw new Error('Codigo Arduino invalido ou vazio. Altere os blocos e tente enviar novamente.');
        }
        return code;
    }

    handleWebSerialUpload () {
        const board = this.getRealDeviceId();
        this.compileLogLength = 0;
        if (['arduinoUno', 'arduinoNano'].indexOf(board) === -1) {
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
                this.emitUploadStdout('Enviando para Arduino via Web Serial USB...\n');
                this.props.vm.uploadArtifactToPeripheral(this.props.deviceId, hex, null, {
                    firmware: false,
                    resumeRealtime: false
                });
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
