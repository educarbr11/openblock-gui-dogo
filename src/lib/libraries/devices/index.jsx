import React from 'react';
import {FormattedMessage} from 'react-intl';
import {defaults} from 'lodash';
import log from '../../log';
import {DeviceType} from '../../device';


import unselectDeviceIconURL from './unselectDevice/unselectDevice.png';

import arduinoUnoIconURL from './arduinoUno/arduinoUno.png';
import arduinoUnoConnectionIconURLL from './arduinoUno/arduinoUno-illustration.svg';
import arduinoUnoConnectionSmallIconURL from './arduinoUno/arduinoUno-small.svg';

import arduinoNanoIconURL from './arduinoNano/arduinoNano.png';
import arduinoNanoConnectionIconURLL from './arduinoNano/arduinoNano-illustration.svg';
import arduinoNanoConnectionSmallIconURL from './arduinoNano/arduinoNano-small.svg';

import arduinoLeonardoIconURL from './arduinoLeonardo/arduinoLeonardo.png';
import arduinoLeonardoConnectionIconURLL from './arduinoLeonardo/arduinoLeonardo-illustration.svg';
import arduinoLeonardoConnectionSmallIconURL from './arduinoLeonardo/arduinoLeonardo-small.svg';

import arduinoUnoR4WifiIconURL from './arduinoUnoR4Wifi/arduinoUnoR4Wifi.png';
import arduinoUnoR4WifiConnectionIconURLL from './arduinoUnoR4Wifi/arduinoUnoR4Wifi-illustration.svg';
import arduinoUnoR4WifiConnectionSmallIconURL from './arduinoUnoR4Wifi/arduinoUnoR4Wifi-small.svg';

import esp32IconURL from './esp32/esp32.png';
import esp32ConnectionIconURLL from './esp32/esp32-illustration.svg';
import esp32ConnectionSmallIconURL from './esp32/esp32-small.svg';

import microbitIconURL from './microbit/microbit.png';
import microbitConnectionIconURL from './microbit/microbit-illustration.svg';
import microbitConnectionSmallIconURL from './microbit/microbit-small.svg';


const deviceData = [
    /**
     * Unselect the deivce back to pure scratch mode
     */
    {
        name: (
            <FormattedMessage
                defaultMessage="Unselect device"
                description="Name for the unselect device"
                id="gui.device.unselectDevice.name"
            />
        ),
        deviceId: 'null',
        iconURL: unselectDeviceIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Unselect the device, return to pure realtime programming mode."
                description="Description for the unselect device"
                id="gui.device.unselectDevice.description"
            />
        ),
        featured: true,
        programMode: ['realtime'],
        programLanguage: ['block'],
        tags: ['realtime']
    },
    {
        name: 'micro:bit',
        deviceId: 'microbitV2',
        manufactor: 'micro:bit',
        learnMore: 'https://microbit.org/get-started/user-guide/overview/',
        type: DeviceType.microbit,
        iconURL: microbitIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Use o micro:bit pelo DoGoBlock Link com cabo USB."
                description="Description for the micro:bit device"
                id="gui.device.microbitV2.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '115200',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: false,
        useAutoScan: false,
        connectionIconURL: microbitConnectionIconURL,
        connectionSmallIconURL: microbitConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.connectingMessage"
            />
        ),
        programMode: ['realtime', 'upload'],
        defaultProgramMode: 'upload',
        programLanguage: ['python'],
        tags: ['microbit'],
        helpLink: 'https://microbit.org/get-started/user-guide/overview/'
    },
    {
        name: 'Arduino Uno',
        deviceId: 'arduinoUno',
        manufactor: 'arduino.cc',
        learnMore: 'https://docs.arduino.cc/hardware/uno-rev3',
        type: DeviceType.arduino,
        iconURL: arduinoUnoIconURL,
        description: (
            <FormattedMessage
                defaultMessage="A great board to get started with electronics and coding."
                description="Description for the Arduino Uno Rev3 device"
                id="gui.device.arduinoUno.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '9600',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: arduinoUnoConnectionIconURLL,
        connectionSmallIconURL: arduinoUnoConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.connectingMessage"
            />
        ),
        programMode: ['realtime', 'upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['arduino'],
        helpLink: 'https://wiki.openblock.cc/general-hardware-guidelines/boards/arduino-uno'
    },
    {
        name: 'Arduino Nano',
        deviceId: 'arduinoNano',
        manufactor: 'arduino.cc',
        learnMore: 'https://docs.arduino.cc/hardware/nano',
        type: DeviceType.arduino,
        iconURL: arduinoNanoIconURL,
        description: (
            <FormattedMessage
                defaultMessage="The Arduino Nano is a classic small board to build your projects with."
                description="Description for the Arduino Nano device"
                id="gui.device.arduinoNano.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '9600',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: arduinoNanoConnectionIconURLL,
        connectionSmallIconURL: arduinoNanoConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.connectingMessage"
            />
        ),
        programMode: ['realtime', 'upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['arduino'],
        helpLink: 'https://wiki.openblock.cc/general-hardware-guidelines/boards/arduino-nano'
    },
    {
        name: 'Arduino Leonardo',
        deviceId: 'arduinoLeonardo',
        manufactor: 'arduino.cc',
        learnMore: 'https://docs.arduino.cc/hardware/leonardo',
        type: DeviceType.arduino,
        iconURL: arduinoLeonardoIconURL,
        description: (
            <FormattedMessage
                defaultMessage="The classic Arduino board that can act as a mouse or keyboard."
                description="Description for the Arduino Leonardo device"
                id="gui.device.arduinoLeonardo.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '9600',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: arduinoLeonardoConnectionIconURLL,
        connectionSmallIconURL: arduinoLeonardoConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.connectingMessage"
            />
        ),
        programMode: ['upload'], // due to the software serilport realtim mode is unstable
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['arduino'],
        helpLink: 'https://wiki.openblock.cc/general-hardware-guidelines/boards/arduino-leonardo'
    },
    {
        name: 'Arduino Uno R4 WiFi',
        deviceId: 'arduinoUnoR4Wifi',
        manufactor: 'arduino',
        learnMore: 'https://docs.arduino.cc/hardware/uno-r4-wifi',
        type: DeviceType.arduino,
        iconURL: arduinoUnoR4WifiIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Provides Wi-Fi and Bluetooth connectivity, along with an on-board 12x8 LED matrix for visualizations." // eslint-disable-line max-len
                description="Description for the Arduino Uno R4 WiFi device"
                id="gui.device.arduinoUnoR4Wifi.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '9600',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: arduinoUnoR4WifiConnectionIconURLL,
        connectionSmallIconURL: arduinoUnoR4WifiConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.connectingMessage"
            />
        ),
        programMode: ['upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['arduino'],
        helpLink: 'https://wiki.openblock.cc/general-hardware-guidelines/boards/arduino-uno-r4-wifi'
    },
    {
        name: 'ESP32',
        deviceId: 'arduinoEsp32',
        manufactor: 'espressif',
        learnMore: 'https://docs.espressif.com/projects/esp-dev-kits/en/latest/esp32/index.html',
        type: DeviceType.arduino,
        iconURL: esp32IconURL,
        description: (
            <FormattedMessage
                defaultMessage="Wi-Fi & Bluetooth control board with rich functions."
                description="Description for the esp32 device"
                id="gui.device.esp32.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: false,
        serialportRequired: true,
        defaultBaudRate: '115200',
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: esp32ConnectionIconURLL,
        connectionSmallIconURL: esp32ConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their device."
                id="gui.device.connectingMessage"
            />
        ),
        programMode: ['upload'],
        programLanguage: ['block', 'c', 'cpp'],
        tags: ['arduino'],
        helpLink: 'https://wiki.openblock.cc/general-hardware-guidelines/boards/esp32'
    }
];

const allowedDeviceIds = new Set(deviceData.map(device => device.deviceId));

/**
 * Unique event blocks under different programming frameworks.
 */
const eventBlock = {
    [DeviceType.arduino]: '<block type="event_whenarduinobegin"/>',
    [DeviceType.microPython]: '<block type="event_whenmicropythonbegin"/>',
    [DeviceType.microbit]: `<block type="event_whenmicrobitbegin"/>
                                <block type="event_whenmicrobitbuttonpressed"/>
                                <block type="event_whenmicrobitpinbeingtouched"/>
                                <block type="event_whenmicrobitgesture"/>`
};

/**
 * To get real device id. eg: the third party id like ironKit_arduinoUno.
 * @param {string} deviceId - the id of the device.
 * @return {string} deviceId - the real device id.
 */
const analysisRealDeviceId = deviceId => {
    // if the id contain '_' use the string afer the '_'.
    if (deviceId.indexOf('_') !== -1) {
        return deviceId.split('_')[1];
    }
    return deviceId;
};

/**
 * Make device data from the input data. If it is a buid-in device, return the buid-in
 * data. If it is a third party device, find it's parent device, and overwrite its attributes
 * with the input data.
 * @param {string} deviceList - the list of devices.
 * @return {string} fullData - processed data of devices.
 */
const makeDeviceLibrary = (deviceList = null) => {
    let regeneratedDeviceData = [];

    if (deviceList) {
        if (deviceList[0].isOrdered) { // External resources customize the device arrangement
            regeneratedDeviceData.push(deviceData[0]);
        } else {
            deviceList = deviceData.concat(deviceList);
        }

        deviceList.forEach(dev => {
            const realDeviceId = analysisRealDeviceId(dev.deviceId);
            if (!allowedDeviceIds.has(realDeviceId)) {
                return;
            }
            const matchedDevice = deviceData.find(item => realDeviceId === item.deviceId);
            if (matchedDevice) {
                if (realDeviceId !== dev.deviceId) {
                    return regeneratedDeviceData.push(defaults({}, dev, {hide: false}, matchedDevice));
                }
                return regeneratedDeviceData.push(matchedDevice);
            }
            log.warn('Unable to find the corresponding built-in device:', dev.deviceId);
            return;
        });
    } else {
        regeneratedDeviceData = deviceData;
    }

    return regeneratedDeviceData;
};

export {
    deviceData as default,
    eventBlock,
    makeDeviceLibrary
};
