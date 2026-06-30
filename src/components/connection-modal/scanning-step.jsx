import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import PeripheralTile from './peripheral-tile.jsx';
import Dots from './dots.jsx';

import radarIcon from './icons/searching.png';
import refreshIcon from './icons/refresh.svg';

import styles from './connection-modal.css';

const ScanningStep = props => (
    <Box className={styles.body}>
        {props.webBluetoothConnectionVisible || props.webSerialConnectionVisible ? (
            <Box className={styles.connectionTypeArea}>
                <span className={styles.connectionTypeLabel}>
                    <FormattedMessage
                        defaultMessage="Connection"
                        description="Label for choosing hardware connection type"
                        id="gui.connection.type.label"
                    />
                </span>
                <select
                    className={styles.connectionTypeSelect}
                    value={props.connectionType}
                    onChange={props.onConnectionTypeChange}
                >
                    <option value="link">
                        {'DoGoBlock Link'}
                    </option>
                    {props.webBluetoothConnectionVisible ? (
                        <option
                            disabled={!props.webBluetoothConnectionSupported}
                            value="webBluetooth"
                        >
                            {'Web Bluetooth'}
                        </option>
                    ) : null}
                    {props.webSerialConnectionVisible ? (
                        <option
                            disabled={!props.webSerialConnectionSupported}
                            value="webSerial"
                        >
                            {'Web Serial USB'}
                        </option>
                    ) : null}
                </select>
                {props.webBluetoothConnectionVisible && !props.webBluetoothConnectionSupported ? (
                    <div
                        className={styles.connectionTypeWarning}
                        title={props.webBluetoothDebugInfo}
                    >
                        {props.webBluetoothStatus === 'notSecure' ? (
                            <FormattedMessage
                                defaultMessage="Web Bluetooth requires HTTPS or localhost."
                                description="Warning when Web Bluetooth is unavailable because the page is not secure"
                                id="gui.connection.webBluetooth.notSecure"
                            />
                        ) : (
                            <FormattedMessage
                                defaultMessage="Web Bluetooth is unavailable. Use Chrome/Edge with HTTPS/localhost."
                                description="Warning when Web Bluetooth API is missing"
                                id="gui.connection.webBluetooth.missingApi"
                            />
                        )}
                    </div>
                ) : null}
                {props.webSerialConnectionVisible && !props.webSerialConnectionSupported ? (
                    <div
                        className={styles.connectionTypeWarning}
                        title={props.webBluetoothDebugInfo}
                    >
                        {props.webSerialStatus === 'notSecure' ? (
                            <FormattedMessage
                                defaultMessage="Web Serial requires HTTPS or localhost."
                                description="Warning when Web Serial is unavailable because the page is not secure"
                                id="gui.connection.webSerial.notSecure"
                            />
                        ) : (
                            <FormattedMessage
                                defaultMessage="Web Serial is unavailable. Use Chrome/Edge with HTTPS/localhost."
                                description="Warning when Web Serial API is missing"
                                id="gui.connection.webSerial.missingApi"
                            />
                        )}
                    </div>
                ) : null}
            </Box>
        ) : null}
        {props.isSerialport || props.firmwareUploadRequired ? (
            <Box className={classNames(styles.bodyHeadArea)}>
                <div className={styles.listAll}>
                    <FormattedMessage
                        defaultMessage="Show all connectable devices"
                        description="Button in prompt for show all connectable devices"
                        id="gui.connection.scanning.listAll"
                    />
                </div>
                <div className={styles.checkBox}>
                    <input
                        type="checkbox"
                        name="hexform"
                        checked={props.isListAll}
                        onChange={props.onClickListAll}
                    />
                </div>
            </Box>
        ) : null}
        <Box className={styles.activityArea}>
            {props.scanning ? (
                props.peripheralList.length === 0 ? (
                    <div className={styles.activityAreaInfo}>
                        <div className={styles.centeredRow}>
                            <img
                                className={classNames(styles.radarSmall, styles.radarSpin)}
                                src={radarIcon}
                            />
                            {props.connectionType === 'webSerial' ? (
                                <FormattedMessage
                                    defaultMessage="Use Refresh to select your Arduino USB device"
                                    description="Text shown while waiting for Web Serial Arduino device selection"
                                    id="gui.connection.scanning.arduinoWebSerialSelect"
                                />
                            ) : props.isChromeOS ? (
                                <FormattedMessage
                                    defaultMessage="Use Refresh to select a serial device in Chrome"
                                    description="Text shown while waiting for Web Serial device selection"
                                    id="gui.connection.scanning.webSerialSelect"
                                />
                            ) : props.connectionType === 'webBluetooth' ? (
                                <FormattedMessage
                                    defaultMessage="Use Refresh to select your micro:bit with Web Bluetooth"
                                    description="Text shown while waiting for Web Bluetooth device selection"
                                    id="gui.connection.scanning.webBluetoothSelect"
                                />
                            ) : (
                                <FormattedMessage
                                    defaultMessage="Looking for devices"
                                    description="Text shown while scanning for devices"
                                    id="gui.connection.scanning.lookingforperipherals"
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.peripheralTilePane}>
                        {props.peripheralList.map(peripheral =>
                            (<PeripheralTile
                                connectionSmallIconURL={props.connectionSmallIconURL}
                                key={peripheral.peripheralId}
                                name={peripheral.name}
                                peripheralId={peripheral.peripheralId}
                                rssi={peripheral.rssi}
                                isSerialport={props.isSerialport}
                                onConnecting={props.onConnecting}
                            />)
                        )}
                    </div>
                )
            ) : (
                <Box className={styles.instructions}>
                    <FormattedMessage
                        defaultMessage="No devices found"
                        description="Text shown when no devices could be found"
                        id="gui.connection.scanning.noPeripheralsFound"
                    />
                </Box>
            )}
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={classNames(styles.bottomAreaItem, styles.instructions)}>
                {props.firmwareUploadRequired ? (
                    props.connectionType === 'webBluetooth' ? (
                        <FormattedMessage
                            defaultMessage={
                                'Web Bluetooth is temporarily disabled. Use DoGoBlock Link to send firmware ' +
                                'and connect your micro:bit.'
                            }
                            description="Prompt for Web Bluetooth micro:bit BLE firmware limitation"
                            id="gui.connection.scanning.microbitBleWebBluetoothInstructions"
                        />
                    ) : (
                        <FormattedMessage
                            defaultMessage="Send the firmware with DoGoBlock Link, then select your micro:bit."
                            description="Prompt for connecting a micro:bit Bluetooth device"
                            id="gui.connection.scanning.microbitBleInstructions"
                        />
                    )
                ) : (
                    <FormattedMessage
                        defaultMessage="Select your device in the list above."
                        description="Prompt for choosing a device to connect to"
                        id="gui.connection.scanning.instructions"
                    />
                )}
            </Box>
            <Dots
                className={styles.bottomAreaItem}
                counter={0}
                total={3}
            />
            {props.firmwareUploadRequired ? (
                <button
                    className={classNames(styles.bottomAreaItem, styles.connectionButton)}
                    onClick={props.onUploadFirmware}
                >
                    <FormattedMessage
                        defaultMessage="Send firmware"
                        description="Button for uploading firmware before connecting"
                        id="gui.connection.sendFirmware"
                    />
                </button>
            ) : null}
            <button
                className={classNames(styles.bottomAreaItem, styles.connectionButton)}
                onClick={props.onRefresh}
            >
                <FormattedMessage
                    defaultMessage="Refresh"
                    description="Button in prompt for starting a search"
                    id="gui.connection.search"
                />
                <img
                    className={styles.buttonIconRight}
                    src={refreshIcon}
                />
            </button>
        </Box>
    </Box>
);

ScanningStep.propTypes = {
    connectionType: PropTypes.string,
    connectionSmallIconURL: PropTypes.string,
    firmwareUploadRequired: PropTypes.bool,
    isChromeOS: PropTypes.bool,
    isListAll: PropTypes.bool.isRequired,
    isSerialport: PropTypes.bool,
    onClickListAll: PropTypes.func.isRequired,
    onConnectionTypeChange: PropTypes.func,
    onConnecting: PropTypes.func,
    onUploadFirmware: PropTypes.func,
    onRefresh: PropTypes.func,
    peripheralList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        rssi: PropTypes.number,
        peripheralId: PropTypes.string
    })),
    scanning: PropTypes.bool.isRequired,
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
    peripheralList: [],
    scanning: true,
    webBluetoothConnectionSupported: false,
    webBluetoothConnectionVisible: false,
    webBluetoothStatus: 'notMicrobitBle',
    webSerialConnectionSupported: false,
    webSerialConnectionVisible: false,
    webSerialStatus: 'notArduino'
};

export default ScanningStep;
