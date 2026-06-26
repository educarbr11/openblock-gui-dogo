import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ConnectionModalComponent, {PHASES} from '../components/connection-modal/connection-modal.jsx';
import VM from 'openblock-vm';
import analytics from '../lib/analytics';
import {connect} from 'react-redux';
import {closeConnectionModal, openUploadProgress} from '../reducers/modals';
import {setConnectionModalPeripheralName, setListAll, setConnectionType} from '../reducers/connection-modal';
import extensionData from '../lib/libraries/extensions/index.jsx';
import {isScratchDesktop} from '../lib/isScratchDesktop';
import uploadArduinoRealtimeFirmware from '../lib/upload-arduino-realtime-firmware';

class ConnectionModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleScanning',
            'handleCancel',
            'handleConnected',
            'handleConnectionTypeChange',
            'handleConnecting',
            'handleDisconnect',
            'handleError',
            'handleHelp',
            'handleUploadFirmware'
        ]);
        const peripheralData = props.deviceData.concat(extensionData);
        this.state = {
            device: peripheralData.find(device => (device.deviceId || device.extensionId) === props.deviceId),
            phase: props.vm.getPeripheralIsConnected(props.deviceId) ?
                PHASES.connected : PHASES.scanning,
            peripheralName: null,
            errorMessage: null
        };
    }
    componentDidMount () {
        this.props.vm.on('PERIPHERAL_CONNECTED', this.handleConnected);
        this.props.vm.on('PERIPHERAL_REQUEST_ERROR', this.handleError);
    }
    componentWillUnmount () {
        this.props.vm.removeListener('PERIPHERAL_CONNECTED', this.handleConnected);
        this.props.vm.removeListener('PERIPHERAL_REQUEST_ERROR', this.handleError);
    }
    handleScanning () {
        this.setState({
            phase: PHASES.scanning
        });
    }
    handleConnecting (peripheralId, peripheralName) {
        const connectionType = this.getEffectiveConnectionType();
        if (this.props.isRealtimeMode) {
            this.props.vm.connectPeripheral(this.props.deviceId, peripheralId, null, connectionType);
        } else {
            this.props.vm.connectPeripheral(
                this.props.deviceId,
                peripheralId,
                parseInt(this.props.baudrate, 10),
                connectionType
            );
        }
        this.setState({
            phase: PHASES.connecting,
            peripheralName: peripheralName
        });
        analytics.event({
            category: 'devices',
            action: 'connecting',
            label: this.props.deviceId
        });
    }
    handleDisconnect () {
        try {
            this.props.vm.disconnectPeripheral(this.props.deviceId);
        } finally {
            this.props.onCancel();
        }
    }
    handleCancel () {
        try {
            // If we're not connected to a peripheral, close the websocket so we stop scanning.
            if (!this.props.vm.getPeripheralIsConnected(this.props.deviceId)) {
                this.props.vm.disconnectPeripheral(this.props.deviceId);
            }
        } finally {
            // Close the modal.
            this.props.onCancel();
        }
    }
    handleError (err) {
        // Assume errors that come in during scanning phase are the result of not
        // having scratch-link installed.
        if (this.state.phase === PHASES.scanning || this.state.phase === PHASES.unavailable) {
            this.setState({
                phase: PHASES.unavailable
            });
        } else {
            this.setState({
                phase: PHASES.error,
                errorMessage: err.message
            });
            analytics.event({
                category: 'devices',
                action: 'connecting error',
                label: this.props.deviceId
            });
        }
    }
    handleConnected () {
        this.props.onSetConnectionType(this.getEffectiveConnectionType());
        this.setState({
            phase: PHASES.connected
        });
        analytics.event({
            category: 'devices',
            action: 'connected',
            label: this.props.deviceId
        });
        this.props.onConnected(this.state.peripheralName);
    }
    handleHelp () {
        window.open(this.state.device.helpLink, '_blank');
        analytics.event({
            category: 'devices',
            action: 'device help',
            label: this.props.deviceId
        });
    }
    isMicrobitBleConnection () {
        return this.props.deviceId === 'microbitBle' ||
            (this.state.device && this.state.device.extensionId === 'microbitBle');
    }
    isArduinoWebSerialConnection () {
        return ['arduinoUno', 'arduinoNano', 'arduinoLeonardo'].indexOf(this.props.deviceId) !== -1;
    }
    getWebBluetoothStatus () {
        return 'disabled';
    }
    getWebBluetoothDebugInfo () {
        if (this.isMicrobitBleConnection()) {
            return 'Web Bluetooth is temporarily disabled for micro:bit Bluetooth.';
        }
        return 'Web Bluetooth is not available for this device.';
    }
    getWebSerialStatus () {
        if (!this.isArduinoWebSerialConnection()) {
            return 'notArduino';
        }
        if (typeof window !== 'undefined' && window.isSecureContext === false) {
            return 'notSecure';
        }
        if (typeof navigator !== 'undefined' && Boolean(navigator.serial)) {
            return 'supported';
        }
        return 'missingApi';
    }
    getEffectiveConnectionType (connectionType = this.props.connectionType) {
        const webSerialStatus = this.getWebSerialStatus();
        if (this.isMicrobitBleConnection()) {
            return 'link';
        }
        if (connectionType === 'auto') {
            if (!isScratchDesktop() && webSerialStatus === 'supported') {
                return 'webSerial';
            }
            return 'link';
        }
        if (connectionType === 'webBluetooth') {
            return 'link';
        }
        if (connectionType === 'webSerial' && webSerialStatus !== 'supported') {
            return 'link';
        }
        if (connectionType === 'webSerial' && webSerialStatus === 'notArduino') return 'link';
        return connectionType;
    }
    getDisplayConnectionType () {
        const webSerialStatus = this.getWebSerialStatus();
        if (this.isMicrobitBleConnection()) {
            return 'link';
        }
        if (this.props.connectionType === 'auto') {
            return this.getEffectiveConnectionType('auto');
        }
        if (this.props.connectionType === 'webBluetooth') {
            return 'link';
        }
        if (this.props.connectionType === 'webSerial' && webSerialStatus !== 'supported') {
            return 'link';
        }
        return this.getEffectiveConnectionType();
    }
    handleConnectionTypeChange (connectionType) {
        this.props.onSetConnectionType(this.getEffectiveConnectionType(connectionType));
    }
    handleUploadFirmware () {
        if (uploadArduinoRealtimeFirmware({
            vm: this.props.vm,
            deviceId: this.props.deviceId,
            connectionType: this.getDisplayConnectionType(),
            onOpenUploadProgress: this.props.onOpenUploadProgress
        })) {
            return;
        }
        this.props.vm.uploadFirmwareToPeripheral(this.props.deviceId);
        this.props.onOpenUploadProgress();
    }
    render () {
        const isChromeOS = typeof navigator !== 'undefined' &&
            typeof navigator.userAgent === 'string' &&
            navigator.userAgent.indexOf('CrOS') !== -1;
        const webBluetoothStatus = this.getWebBluetoothStatus();
        const webSerialStatus = this.getWebSerialStatus();
        const webBluetoothConnectionVisible = false;
        const webBluetoothConnectionSupported = webBluetoothStatus === 'supported';
        const webSerialConnectionVisible = this.isArduinoWebSerialConnection();
        const webSerialConnectionSupported = webSerialStatus === 'supported';
        const connectionType = this.getDisplayConnectionType();
        return (
            <ConnectionModalComponent
                connectionType={connectionType}
                connectingMessage={this.state.device && this.state.device.connectingMessage}
                connectionIconURL={this.state.device && this.state.device.connectionIconURL}
                connectionSmallIconURL={this.state.device && this.state.device.connectionSmallIconURL}
                errorMessage={this.state.errorMessage}
                isSerialport={this.state.device && this.state.device.serialportRequired}
                isChromeOS={isChromeOS}
                isListAll={this.props.isListAll}
                webBluetoothConnectionSupported={webBluetoothConnectionSupported}
                webBluetoothConnectionVisible={webBluetoothConnectionVisible}
                webBluetoothDebugInfo={this.getWebBluetoothDebugInfo()}
                webBluetoothStatus={webBluetoothStatus}
                webSerialConnectionSupported={webSerialConnectionSupported}
                webSerialConnectionVisible={webSerialConnectionVisible}
                webSerialStatus={webSerialStatus}
                firmwareUploadRequired={this.state.device && this.state.device.firmwareUploadRequired}
                connectionTipIconURL={this.state.device && this.state.device.connectionTipIconURL}
                deviceId={this.props.deviceId}
                name={this.state.device && this.state.device.name}
                phase={this.state.phase}
                title={this.props.deviceId}
                useAutoScan={this.state.device && this.state.device.useAutoScan}
                vm={this.props.vm}
                onCancel={this.handleCancel}
                onConnected={this.handleConnected}
                onConnectionTypeChange={this.handleConnectionTypeChange}
                onConnecting={this.handleConnecting}
                onClickListAll={this.props.onClickListAll}
                onDisconnect={this.handleDisconnect}
                onHelp={this.handleHelp}
                onUploadFirmware={this.handleUploadFirmware}
                onScanning={this.handleScanning}
            />
        );
    }
}

ConnectionModal.propTypes = {
    baudrate: PropTypes.string.isRequired,
    connectionType: PropTypes.string.isRequired,
    deviceId: PropTypes.string.isRequired,
    deviceData: PropTypes.instanceOf(Array).isRequired,
    isRealtimeMode: PropTypes.bool,
    isListAll: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onConnected: PropTypes.func.isRequired,
    onClickListAll: PropTypes.func.isRequired,
    onOpenUploadProgress: PropTypes.func.isRequired,
    onSetConnectionType: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    baudrate: state.scratchGui.hardwareConsole.baudrate,
    deviceData: state.scratchGui.deviceData.deviceData,
    deviceId: state.scratchGui.connectionModal.deviceId || state.scratchGui.device.deviceId,
    isRealtimeMode: state.scratchGui.programMode.isRealtimeMode,
    isListAll: state.scratchGui.connectionModal.isListAll,
    connectionType: state.scratchGui.connectionModal.connectionType
});

const mapDispatchToProps = dispatch => ({
    onCancel: () => {
        dispatch(closeConnectionModal());
    },
    onConnected: peripheralName => {
        dispatch(setConnectionModalPeripheralName(peripheralName));
    },
    onClickListAll: state => {
        dispatch(setListAll(state));
    },
    onSetConnectionType: connectionType => {
        dispatch(setConnectionType(connectionType));
    },
    onOpenUploadProgress: () => dispatch(openUploadProgress())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionModal);
