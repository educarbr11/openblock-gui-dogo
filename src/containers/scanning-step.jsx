import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ScanningStepComponent from '../components/connection-modal/scanning-step.jsx';
import VM from 'openblock-vm';

class ScanningStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePeripheralListUpdate',
            'handlePeripheralScanTimeout',
            'handleClickListAll',
            'handleConnectionTypeChange',
            'handleRefresh'
        ]);
        this.state = {
            scanning: true,
            peripheralList: []
        };
    }
    componentDidMount () {
        this.scanForPeripheral(this.props.isListAll);
        this.props.vm.on(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.on(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    componentWillUnmount () {
        // @todo: stop the peripheral scan here
        this.props.vm.removeListener(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.removeListener(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    getEffectiveConnectionType (connectionType = this.props.connectionType) {
        if (connectionType === 'webBluetooth' && !this.props.webBluetoothConnectionSupported) {
            return 'link';
        }
        if (connectionType === 'webSerial' && !this.props.webSerialConnectionSupported) {
            return 'link';
        }
        return connectionType;
    }
    scanForPeripheral (listAll, connectionType = this.props.connectionType) {
        this.props.vm.scanForPeripheral(this.props.deviceId, listAll, this.getEffectiveConnectionType(connectionType));
    }
    handlePeripheralScanTimeout () {
        this.setState({
            scanning: false,
            peripheralList: []
        });
    }
    handlePeripheralListUpdate (newList) {
        // TODO: sort peripherals by signal strength? so they don't jump around
        const peripheralArray = Object.keys(newList).map(id =>
            newList[id]
        );
        this.setState({peripheralList: peripheralArray});
    }
    handleClickListAll () {
        this.props.onClickListAll(!this.props.isListAll);
        this.scanForPeripheral(!this.props.isListAll);
        this.setState({
            scanning: true,
            peripheralList: []
        });
    }
    handleConnectionTypeChange (e) {
        const connectionType = e.target.value;
        this.props.onConnectionTypeChange(connectionType);
        this.scanForPeripheral(this.props.isListAll, connectionType);
        this.setState({
            scanning: true,
            peripheralList: []
        });
    }
    handleRefresh () {
        this.scanForPeripheral(this.props.isListAll);
        this.setState({
            scanning: true,
            peripheralList: []
        });
    }
    render () {
        return (
            <ScanningStepComponent
                connectionType={this.props.connectionType}
                connectionSmallIconURL={this.props.connectionSmallIconURL}
                firmwareUploadRequired={this.props.firmwareUploadRequired}
                isChromeOS={this.props.isChromeOS}
                isSerialport={this.props.isSerialport}
                isListAll={this.props.isListAll}
                webBluetoothConnectionSupported={this.props.webBluetoothConnectionSupported}
                webBluetoothConnectionVisible={this.props.webBluetoothConnectionVisible}
                webBluetoothDebugInfo={this.props.webBluetoothDebugInfo}
                webBluetoothStatus={this.props.webBluetoothStatus}
                webSerialConnectionSupported={this.props.webSerialConnectionSupported}
                webSerialConnectionVisible={this.props.webSerialConnectionVisible}
                webSerialStatus={this.props.webSerialStatus}
                peripheralList={this.state.peripheralList}
                phase={this.state.phase}
                scanning={this.state.scanning}
                title={this.props.deviceId}
                onConnected={this.props.onConnected}
                onConnectionTypeChange={this.handleConnectionTypeChange}
                onConnecting={this.props.onConnecting}
                onClickListAll={this.handleClickListAll}
                onRefresh={this.handleRefresh}
                onUploadFirmware={this.props.onUploadFirmware}
            />
        );
    }
}

ScanningStep.propTypes = {
    connectionSmallIconURL: PropTypes.string,
    connectionType: PropTypes.string,
    firmwareUploadRequired: PropTypes.bool,
    isChromeOS: PropTypes.bool,
    isSerialport: PropTypes.bool.isRequired,
    isListAll: PropTypes.bool.isRequired,
    deviceId: PropTypes.string.isRequired,
    onConnected: PropTypes.func.isRequired,
    onConnectionTypeChange: PropTypes.func,
    onConnecting: PropTypes.func.isRequired,
    onClickListAll: PropTypes.func.isRequired,
    onUploadFirmware: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired,
    webBluetoothConnectionSupported: PropTypes.bool,
    webBluetoothConnectionVisible: PropTypes.bool,
    webBluetoothDebugInfo: PropTypes.string,
    webBluetoothStatus: PropTypes.string,
    webSerialConnectionSupported: PropTypes.bool,
    webSerialConnectionVisible: PropTypes.bool,
    webSerialStatus: PropTypes.string
};

ScanningStep.defaultProps = {
    connectionType: 'link',
    webBluetoothConnectionSupported: false,
    webBluetoothConnectionVisible: false,
    webBluetoothStatus: 'notMicrobitBle',
    webSerialConnectionSupported: false,
    webSerialConnectionVisible: false,
    webSerialStatus: 'notArduino'
};

export default ScanningStep;
