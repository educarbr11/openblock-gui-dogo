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

const MICROBIT_REALTIME_FIRMWARE_V2_URL = 'static/firmwares/microbit/dogoblock-microbit-realtime-v2.hex';
const isMicrobitFirmwareDevice = deviceId => ['microbit', 'microbitV2', 'microbitBle'].indexOf(deviceId) !== -1;

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
                                'Web Bluetooth está desativado por enquanto. Use o DoGoBlock Link para enviar ' +
                                'o firmware e conectar o micro:bit.'
                            }
                            description="Prompt for Web Bluetooth micro:bit BLE firmware limitation"
                            id="gui.connection.scanning.microbitBleWebBluetoothInstructions"
                        />
                    ) : (
                        <FormattedMessage
                            defaultMessage="Envie o firmware pelo DoGoBlock Link. Depois selecione seu micro:bit."
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
            {props.firmwareUploadRequired && isMicrobitFirmwareDevice(props.deviceId) ? (
                <button
                    className={classNames(styles.bottomAreaItem, styles.connectionButton, styles.microbitFirmwareManualButton)}
                    onClick={props.onOpenManualFirmware}
                >
                    <FormattedMessage
                        defaultMessage="Enviar manualmente"
                        description="Button to open manual micro:bit firmware installation instructions"
                        id="gui.connection.microbitFirmwareManual.openButton"
                    />
                </button>
            ) : null}
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
        {props.showManualFirmware ? (
            <Box className={styles.microbitFirmwareOverlay}>
                <Box className={styles.microbitFirmwareManual}>
                    <div className={styles.microbitFirmwareTitle}>
                        <FormattedMessage
                            defaultMessage="Instalar firmware manualmente"
                            description="Title for manual micro:bit firmware install instructions"
                            id="gui.connection.microbitFirmwareManual.title"
                        />
                    </div>
                    <ol className={styles.microbitFirmwareSteps}>
                        <li>
                            <FormattedMessage
                                defaultMessage="Baixe o arquivo .hex."
                                description="Manual micro:bit firmware install step"
                                id="gui.connection.microbitFirmwareManual.stepDownload"
                            />
                        </li>
                        <li>
                            <FormattedMessage
                                defaultMessage="Conecte o micro:bit pelo cabo USB."
                                description="Manual micro:bit firmware install step"
                                id="gui.connection.microbitFirmwareManual.stepConnect"
                            />
                        </li>
                        <li>
                            <FormattedMessage
                                defaultMessage="Copie o arquivo para a unidade MICROBIT."
                                description="Manual micro:bit firmware install step"
                                id="gui.connection.microbitFirmwareManual.stepCopy"
                            />
                        </li>
                        <li>
                            <FormattedMessage
                                defaultMessage="Aguarde o micro:bit reiniciar."
                                description="Manual micro:bit firmware install step"
                                id="gui.connection.microbitFirmwareManual.stepRestart"
                            />
                        </li>
                        <li>
                            <FormattedMessage
                                defaultMessage="Clique em Atualizar e conecte pelo DoGoBlock Link."
                                description="Manual micro:bit firmware install step"
                                id="gui.connection.microbitFirmwareManual.stepConnectLink"
                            />
                        </li>
                    </ol>
                    <div className={styles.microbitFirmwareActions}>
                        <a
                            className={classNames(styles.connectionButton, styles.microbitFirmwareDownload)}
                            download="dogoblock-microbit-realtime-v2.hex"
                            href={MICROBIT_REALTIME_FIRMWARE_V2_URL}
                        >
                            <FormattedMessage
                                defaultMessage="Baixar firmware do modo palco"
                                description="Button to download Dogoblock realtime firmware for micro:bit v2"
                                id="gui.connection.microbitFirmwareManual.downloadV2"
                            />
                        </a>
                    </div>
                    <button
                        className={classNames(styles.connectionButton, styles.microbitFirmwareClose)}
                        onClick={props.onCloseManualFirmware}
                    >
                        <FormattedMessage
                            defaultMessage="Fechar"
                            description="Button to close manual micro:bit firmware install instructions"
                            id="gui.connection.microbitFirmwareManual.close"
                        />
                    </button>
                </Box>
            </Box>
        ) : null}
    </Box>
);

ScanningStep.propTypes = {
    connectionType: PropTypes.string,
    connectionSmallIconURL: PropTypes.string,
    deviceId: PropTypes.string,
    firmwareUploadRequired: PropTypes.bool,
    isChromeOS: PropTypes.bool,
    isListAll: PropTypes.bool.isRequired,
    isSerialport: PropTypes.bool,
    onClickListAll: PropTypes.func.isRequired,
    onConnectionTypeChange: PropTypes.func,
    onConnecting: PropTypes.func,
    onCloseManualFirmware: PropTypes.func,
    onOpenManualFirmware: PropTypes.func,
    onUploadFirmware: PropTypes.func,
    onRefresh: PropTypes.func,
    peripheralList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        rssi: PropTypes.number,
        peripheralId: PropTypes.string
    })),
    scanning: PropTypes.bool.isRequired,
    showManualFirmware: PropTypes.bool,
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
    showManualFirmware: false,
    webBluetoothConnectionSupported: false,
    webBluetoothConnectionVisible: false,
    webBluetoothStatus: 'notMicrobitBle',
    webSerialConnectionSupported: false,
    webSerialConnectionVisible: false,
    webSerialStatus: 'notArduino'
};

export default ScanningStep;
