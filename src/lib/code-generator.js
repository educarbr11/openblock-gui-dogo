import 'openblock-blocks/arduino_compressed';
import Blockly from 'openblock-blocks/python_compressed';

import {DeviceType} from './device';

const installMicrobitPythonGenerators = scratchBlocks => {
    const blockly = scratchBlocks || (typeof window !== 'undefined' && window.Blockly) || Blockly;
    if (!blockly) return;
    if (!blockly.Python && Blockly && Blockly.Python) {
        blockly.Python = Blockly.Python;
    }
    if (!blockly.Python) return;

    const python = blockly.Python;
    const aliases = {
        microbit_setDigitalOutput: 'microbit_pin_setDigitalOutput',
        microbit_setPwmOutput: 'microbit_pin_setPwmOutput',
        microbit_readDigitalPin: 'microbit_pin_readDigitalPin',
        microbit_readAnalogPin: 'microbit_pin_readAnalogPin',
        microbit_pinTouched: 'microbit_pin_pinTouched',
        microbit_showImage: 'microbit_display_showImage',
        microbit_showImageUntil: 'microbit_display_showImageUntil',
        microbit_show: 'microbit_display_show',
        microbit_showUntilScrollDone: 'microbit_display_showUntilScrollDone',
        microbit_clearDisplay: 'microbit_display_clearDisplay',
        microbit_lightPixelAt: 'microbit_display_lightPixelAt',
        microbit_showOnPiexlbrightness: 'microbit_display_showOnPiexlbrightness',
        microbit_buttonIsPressed: 'microbit_sensor_buttonIsPressed',
        microbit_gestureIsX: 'microbit_sensor_gestureIsX',
        microbit_axisAcceleration: 'microbit_sensor_axisAcceleration',
        microbit_compassAngle: 'microbit_sensor_compassAngle',
        microbit_compassMagneticDensity: 'microbit_sensor_compassMagneticDensity',
        microbit_calibrateCompass: 'microbit_sensor_calibrateCompass',
        microbit_lightLevel: 'microbit_sensor_lightLevel',
        microbit_temperature: 'microbit_sensor_temperature',
        microbit_runningTime: 'microbit_sensor_runningTime',
        microbit_openWirelessCommunication: 'microbit_wireless_openWirelessCommunication',
        microbit_closeWirelessCommunication: 'microbit_wireless_closeWirelessCommunication',
        microbit_resetWirelessCommunication: 'microbit_wireless_resetWirelessCommunication',
        microbit_sendWirelessMessage: 'microbit_wireless_sendWirelessMessage',
        microbit_receiveWirelessMessage: 'microbit_wireless_receiveWirelessMessage',
        microbit_setWirelessCommunicationChannel: 'microbit_wireless_setWirelessCommunicationChannel',
        microbit_consolePrint: 'microbit_console_consolePrint',
        microbit_menu_level: 'microbit_pin_menu_level',
        microbit_menu_ledBrightness: 'microbit_display_menu_ledBrightness',
        pin_setDigitalOutput: 'microbit_pin_setDigitalOutput',
        pin_setPwmOutput: 'microbit_pin_setPwmOutput',
        pin_readDigitalPin: 'microbit_pin_readDigitalPin',
        pin_readAnalogPin: 'microbit_pin_readAnalogPin',
        pin_pinTouched: 'microbit_pin_pinTouched',
        display_showImage: 'microbit_display_showImage',
        display_showImageUntil: 'microbit_display_showImageUntil',
        display_show: 'microbit_display_show',
        display_showUntilScrollDone: 'microbit_display_showUntilScrollDone',
        display_clearDisplay: 'microbit_display_clearDisplay',
        display_lightPixelAt: 'microbit_display_lightPixelAt',
        display_showOnPiexlbrightness: 'microbit_display_showOnPiexlbrightness',
        sensor_buttonIsPressed: 'microbit_sensor_buttonIsPressed',
        sensor_gestureIsX: 'microbit_sensor_gestureIsX',
        sensor_axisAcceleration: 'microbit_sensor_axisAcceleration',
        sensor_lightLevel: 'microbit_sensor_lightLevel',
        sensor_temperature: 'microbit_sensor_temperature',
        sensor_runningTime: 'microbit_sensor_runningTime',
        wireless_openWirelessCommunication: 'microbit_wireless_openWirelessCommunication',
        wireless_closeWirelessCommunication: 'microbit_wireless_closeWirelessCommunication',
        wireless_resetWirelessCommunication: 'microbit_wireless_resetWirelessCommunication',
        wireless_sendWirelessMessage: 'microbit_wireless_sendWirelessMessage',
        wireless_receiveWirelessMessage: 'microbit_wireless_receiveWirelessMessage',
        wireless_setWirelessCommunicationChannel: 'microbit_wireless_setWirelessCommunicationChannel',
        console_consolePrint: 'microbit_console_consolePrint',
        pin_menu_level: 'microbit_pin_menu_level',
        display_menu_ledBrightness: 'microbit_display_menu_ledBrightness'
    };

    Object.keys(aliases).forEach(alias => {
        const target = aliases[alias];
        if (!python[alias] && typeof python[target] === 'function') {
            python[alias] = python[target];
        }
    });

    python.microbitFieldValueFromNames_ = python.microbitFieldValueFromNames_ || function (block, names, fallback) {
        for (let i = 0; i < names.length; i++) {
            const value = block.getFieldValue(names[i]);
            if (value !== null && value !== undefined) {
                return value;
            }
        }
        return fallback;
    };

    python.microbitValueOrField_ = python.microbitValueOrField_ || function (block, name, fieldNames, fallback) {
        return python.valueToCode(block, name, python.ORDER_FUNCTION_CALL) ||
            python.microbitFieldValueFromNames_(block, fieldNames.concat([name]), fallback);
    };

    python.microbitNumberCode_ = function (block, name, fallback) {
        return python.valueToCode(block, name, python.ORDER_FUNCTION_CALL) || String(fallback);
    };

    python.microbitTextCode_ = function (block, name, fallback) {
        return python.valueToCode(block, name, python.ORDER_FUNCTION_CALL) || python.quote_(fallback || '');
    };

    python.microbitDigitalLevelCode_ = function (block) {
        const value = python.valueToCode(block, 'LEVEL', python.ORDER_FUNCTION_CALL) ||
            block.getFieldValue('LEVEL') ||
            python.microbitFieldValueFromNames_(block, ['level'], '1');
        const normalized = String(value).replace(/^['"]|['"]$/g, '').toUpperCase();
        if (normalized === 'HIGH' || normalized === 'ON' || normalized === 'LIGADO') return '1';
        if (normalized === 'LOW' || normalized === 'OFF' || normalized === 'DESLIGADO') return '0';
        return value;
    };

    python.microbitGlobalVariables_ = python.microbitGlobalVariables_ || function () {
        const variablesName = [];
        Object.keys(python.variables_ || {}).forEach(key => {
            const variable = python.variables_[key];
            const index = variable.indexOf('=');
            if (index > 0) {
                variablesName.push(variable.slice(0, index - 1));
            }
        });
        return variablesName.length ? `${python.INDENT}global ${variablesName.join(', ')}\n` : '';
    };

    python.microbitIndentedEventBody_ = function (block) {
        const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        if (!nextBlock) {
            return `${python.INDENT}pass\n`;
        }

        const globals = python.microbitGlobalVariables_();
        const body = python.blockToCode(nextBlock) || 'pass\n';
        return globals + python.prefixLines(body, python.INDENT);
    };

    python.microbitEventFunction_ = function (block, functionName) {
        return `def ${functionName}():\n${python.microbitIndentedEventBody_(block)}`;
    };

    if (!python.__dogoblockMicrobitCheckPatch && typeof python.check_ === 'function') {
        const originalCheck = python.check_;
        python.check_ = function (block) {
            const topBlock = block && block.getTopStackBlock ? block.getTopStackBlock() : null;
            if (topBlock && [
                'event_whenmicrobitbegin',
                'event_whenmicrobitbuttonpressed',
                'event_whenmicrobitpinbeingtouched',
                'event_whenmicrobitgesture',
                'microbit_whenMicrobitBegin',
                'microbit_whenButtonPressed',
                'microbit_whenPinTouched',
                'microbit_whenGesture'
            ].indexOf(topBlock.type) !== -1) {
                return true;
            }
            if (block && block.previousConnection !== null && topBlock &&
                typeof topBlock.type === 'string' && (
                    topBlock.type.indexOf('microbit_') === 0 ||
                    topBlock.type.indexOf('pin_') === 0 ||
                    topBlock.type.indexOf('display_') === 0 ||
                    topBlock.type.indexOf('sensor_') === 0 ||
                    topBlock.type.indexOf('wireless_') === 0 ||
                    topBlock.type.indexOf('console_') === 0
                )) {
                return true;
            }
            return originalCheck.call(this, block);
        };
        python.__dogoblockMicrobitCheckPatch = true;
    }

    if (!python.__dogoblockMicrobitScrubPatch) {
        const originalScrub = python.scrub_;
        python.scrub_ = function (block, code) {
            const rootBlock = block && block.getTopStackBlock ? block.getTopStackBlock() : null;
            if (rootBlock && typeof rootBlock.type === 'string' &&
                (rootBlock.type === 'microbit_whenMicrobitBegin' ||
                    rootBlock.type.indexOf('microbit_') === 0 ||
                    rootBlock.type.indexOf('pin_') === 0 ||
                    rootBlock.type.indexOf('display_') === 0 ||
                    rootBlock.type.indexOf('sensor_') === 0 ||
                    rootBlock.type.indexOf('wireless_') === 0 ||
                    rootBlock.type.indexOf('console_') === 0)) {
                const originalType = rootBlock.type;
                rootBlock.type = 'event_whenmicrobitbegin';
                try {
                    return originalScrub.call(this, block, code);
                } finally {
                    rootBlock.type = originalType;
                }
            }
            return originalScrub.call(this, block, code);
        };
        python.__dogoblockMicrobitScrubPatch = true;
    }

    if (!python.microbit_pin_setDigitalOutput || !python.__dogoblockMicrobitPinPatch) {
        python.microbit_pin_setDigitalOutput = block => {
            const pin = python.microbitValueOrField_(block, 'PIN', ['pins'], '0');
            const level = python.microbitDigitalLevelCode_(block);
            return `pin${pin}.write_digital(${level})\n`;
        };
        python.microbit_pin_setPwmOutput = block => {
            const pin = python.microbitValueOrField_(block, 'PIN', ['pins'], '0');
            const out = python.microbitNumberCode_(block, 'OUT', 0);
            return `pin${pin}.write_analog(${out})\n`;
        };
        python.microbit_pin_readDigitalPin = block => [
            `pin${python.microbitValueOrField_(block, 'PIN', ['pins'], '0')}.read_digital()`,
            python.ORDER_ATOMIC
        ];
        python.microbit_pin_readAnalogPin = block => [
            `pin${python.microbitValueOrField_(block, 'PIN', ['analogPins'], '0')}.read_analog()`,
            python.ORDER_ATOMIC
        ];
        python.microbit_pin_pinTouched = block => [
            `pin${python.microbitValueOrField_(block, 'PIN', ['touchPins'], '0')}.is_touched()`,
            python.ORDER_ATOMIC
        ];
        python.microbit_display_lightPixelAt = block => {
            const state = python.microbitValueOrField_(block, 'STATE', ['ledState'], 'on') === 'off' ? 0 : 9;
            const x = python.microbitNumberCode_(block, 'X', 0);
            const y = python.microbitNumberCode_(block, 'Y', 0);
            return `display.set_pixel(int(${x}), int(${y}), ${state})\n`;
        };
        python.microbit_sensor_buttonIsPressed = block => [
            `button_${python.microbitValueOrField_(block, 'KEY', ['keys'], 'a')}.is_pressed()`,
            python.ORDER_ATOMIC
        ];
        python.microbit_sensor_gestureIsX = block => [
            `accelerometer.is_gesture('${python.microbitValueOrField_(block, 'STA', ['gestrues'], 'shake')}')`,
            python.ORDER_ATOMIC
        ];
        python.microbit_sensor_axisAcceleration = block => [
            `accelerometer.get_${python.microbitValueOrField_(block, 'AXIS', ['axis'], 'x')}()`,
            python.ORDER_ATOMIC
        ];
        python.microbit_pin_menu_level = block => [
            python.microbitFieldValueFromNames_(block, ['level', 'LEVEL'], '0'),
            python.ORDER_ATOMIC
        ];
        python.microbit_menu_level = python.microbit_pin_menu_level;
        python.microbit_display_menu_ledBrightness = block => [
            python.microbitFieldValueFromNames_(block, ['ledBrightness', 'BRT'], '9'),
            python.ORDER_ATOMIC
        ];
        python.microbit_menu_ledBrightness = python.microbit_display_menu_ledBrightness;
        python.microbit_menu_channel = block => [
            python.microbitFieldValueFromNames_(block, ['channel', 'CH'], '0'),
            python.ORDER_ATOMIC
        ];
        python.microbit_menu_pins = block => [
            python.microbitFieldValueFromNames_(block, ['pins', 'PIN'], '0'),
            python.ORDER_ATOMIC
        ];
        python.microbit_menu_analogPins = block => [
            python.microbitFieldValueFromNames_(block, ['analogPins', 'PIN'], '0'),
            python.ORDER_ATOMIC
        ];
        python.microbit_menu_touchPins = block => [
            python.microbitFieldValueFromNames_(block, ['touchPins', 'PIN'], '0'),
            python.ORDER_ATOMIC
        ];
        python.microbit_menu_keys = block => [
            python.microbitFieldValueFromNames_(block, ['keys', 'KEY'], 'a'),
            python.ORDER_ATOMIC
        ];
        python.microbit_menu_gestrues = block => [
            python.microbitFieldValueFromNames_(block, ['gestrues', 'STA'], 'shake'),
            python.ORDER_ATOMIC
        ];
        python.microbit_menu_axis = block => [
            python.microbitFieldValueFromNames_(block, ['axis', 'AXIS'], 'x'),
            python.ORDER_ATOMIC
        ];
        python.microbit_menu_ledState = block => [
            python.microbitFieldValueFromNames_(block, ['ledState', 'STATE'], 'on'),
            python.ORDER_ATOMIC
        ];
        python.__dogoblockMicrobitPinPatch = true;
    }

    python.microbitImageValue_ = python.microbitImageValue_ || function (value) {
        value = String(value || '0');
        if ((value.charAt(0) === '\'' && value.charAt(value.length - 1) === '\'') ||
            (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"')) {
            value = value.slice(1, -1);
        }
        value = value.replace(/[^01]/g, '');
        if (value.length < 25) {
            value = `${value}0000000000000000000000000`.slice(0, 25);
        } else if (value.length > 25) {
            value = value.slice(0, 25);
        }
        value = value.replace(/1/g, '9');
        return `${value.slice(0, 5)}:${value.slice(5, 10)}:${value.slice(10, 15)}:` +
            `${value.slice(15, 20)}:${value.slice(20, 25)}`;
    };

    python.microbit_display_showImage = block => {
        const image = python.microbitImageValue_(python.valueToCode(block, 'VALUE', python.ORDER_ATOMIC) || '0');
        return `display.show(Image('${image}'))\n`;
    };

    python.microbit_display_showImageUntil = block => {
        const image = python.microbitImageValue_(python.valueToCode(block, 'VALUE', python.ORDER_ATOMIC) || '0');
        const time = python.microbitNumberCode_(block, 'TIME', 0);
        return `display.show(Image('${image}'))\nsleep(float(${time}) * 1000)\ndisplay.clear()\n`;
    };

    python.microbit_display_show = block => {
        const text = python.microbitTextCode_(block, 'TEXT', '');
        return `display.scroll(str(${text}), wait=False, loop=False)\n`;
    };

    python.microbit_display_showUntilScrollDone = block => {
        const text = python.microbitTextCode_(block, 'TEXT', '');
        return `display.scroll(str(${text}), wait=True, loop=False)\n`;
    };

    python.microbit_display_lightPixelAt = block => {
        const state = python.microbitValueOrField_(block, 'STATE', ['ledState'], 'on') === 'off' ? 0 : 9;
        const x = python.microbitNumberCode_(block, 'X', 0);
        const y = python.microbitNumberCode_(block, 'Y', 0);
        return `display.set_pixel(int(${x}), int(${y}), ${state})\n`;
    };

    python.microbit_display_showOnPiexlbrightness = block => {
        const x = python.microbitNumberCode_(block, 'X', 0);
        const y = python.microbitNumberCode_(block, 'Y', 0);
        const brightness = python.microbitNumberCode_(block, 'BRT', 9);
        return `display.set_pixel(int(${x}), int(${y}), ${brightness})\n`;
    };

    python.microbit_wireless_sendWirelessMessage = block => {
        python.imports_.radio = 'import radio';
        const text = python.microbitTextCode_(block, 'TEXT', '');
        return `radio.send(str(${text}))\n`;
    };

    python.microbit_wireless_setWirelessCommunicationChannel = block => {
        python.imports_.radio = 'import radio';
        const channel = python.microbitValueOrField_(block, 'CH', ['channel'], '0');
        return `radio.config(channel=int(${channel}))\n`;
    };

    python.microbit_console_consolePrint = block => {
        const text = python.microbitTextCode_(block, 'TEXT', '');
        return `print(${text})\n`;
    };

    python.microbit_showImage = python.microbit_display_showImage;
    python.microbit_showImageUntil = python.microbit_display_showImageUntil;
    python.microbit_show = python.microbit_display_show;
    python.microbit_showUntilScrollDone = python.microbit_display_showUntilScrollDone;
    python.microbit_lightPixelAt = python.microbit_display_lightPixelAt;
    python.microbit_showOnPiexlbrightness = python.microbit_display_showOnPiexlbrightness;
    python.microbit_sendWirelessMessage = python.microbit_wireless_sendWirelessMessage;
    python.microbit_setWirelessCommunicationChannel = python.microbit_wireless_setWirelessCommunicationChannel;
    python.microbit_consolePrint = python.microbit_console_consolePrint;
    python.display_showImage = python.microbit_display_showImage;
    python.display_showImageUntil = python.microbit_display_showImageUntil;
    python.display_show = python.microbit_display_show;
    python.display_showUntilScrollDone = python.microbit_display_showUntilScrollDone;
    python.display_lightPixelAt = python.microbit_display_lightPixelAt;
    python.display_showOnPiexlbrightness = python.microbit_display_showOnPiexlbrightness;
    python.wireless_sendWirelessMessage = python.microbit_wireless_sendWirelessMessage;
    python.wireless_setWirelessCommunicationChannel = python.microbit_wireless_setWirelessCommunicationChannel;
    python.console_consolePrint = python.microbit_console_consolePrint;

    if (!python.microbit_whenMicrobitBegin) {
        python.microbit_whenMicrobitBegin = block => {
            python.imports_.microbit = 'from microbit import *';
            return block.nextConnection && block.nextConnection.targetBlock() ? '' : 'pass\n';
        };
    }

    if (!python.microbit_whenButtonPressed) {
        python.microbit_whenButtonPressed = block => {
            python.imports_.microbit = 'from microbit import *';
            const key = python.microbitValueOrField_(block, 'KEY', ['keys'], 'a');
            let suffix = '';
            while (python.loops_[`microbit_whenButtonPressed${key}${suffix}`]) {
                suffix = suffix === '' ? 1 : suffix + 1;
            }
            python.loops_[`microbit_whenButtonPressed${key}${suffix}`] =
                `if button_${key}.is_pressed():\n${python.INDENT}${python.INDENT}on_button_${key}${suffix}()`;

            let code = `def on_button_${key}${suffix}():\n`;
            const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
            if (!nextBlock) {
                code += `${python.INDENT}pass\n`;
            } else {
                code = python.microbitEventFunction_(block, `on_button_${key}${suffix}`);
            }
            python.libraries_[`def on_button_${key}${suffix}`] = code;
            return null;
        };
    }

    if (!python.microbit_whenPinTouched) {
        python.microbit_whenPinTouched = block => {
            python.imports_.microbit = 'from microbit import *';
            const pin = python.microbitValueOrField_(block, 'PIN', ['touchPins'], '0');
            let suffix = '';
            while (python.loops_[`microbit_whenPinTouched${pin}${suffix}`]) {
                suffix = suffix === '' ? 1 : suffix + 1;
            }
            python.loops_[`microbit_whenPinTouched${pin}${suffix}`] =
                `if pin${pin}.is_touched():\n${python.INDENT}${python.INDENT}on_pin${pin}${suffix}()`;

            let code = `def on_pin${pin}${suffix}():\n`;
            const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
            if (!nextBlock) {
                code += `${python.INDENT}pass\n`;
            } else {
                code = python.microbitEventFunction_(block, `on_pin${pin}${suffix}`);
            }
            python.libraries_[`def on_pin${pin}${suffix}`] = code;
            return null;
        };
    }

    if (!python.microbit_whenGesture) {
        python.microbit_whenGesture = block => {
            python.imports_.microbit = 'from microbit import *';
            const gesture = python.microbitValueOrField_(block, 'STA', ['gestrues'], 'shake');
            const safeGesture = String(gesture).replace(/[^a-z0-9_]/gi, '_');
            let suffix = '';
            while (python.loops_[`microbit_whenGesture${safeGesture}${suffix}`]) {
                suffix = suffix === '' ? 1 : suffix + 1;
            }
            python.loops_[`microbit_whenGesture${safeGesture}${suffix}`] =
                `if accelerometer.was_gesture('${gesture}'):\n${python.INDENT}${python.INDENT}on_${safeGesture}${suffix}()`;

            let code = `def on_${safeGesture}${suffix}():\n`;
            const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
            if (!nextBlock) {
                code += `${python.INDENT}pass\n`;
            } else {
                code = python.microbitEventFunction_(block, `on_${safeGesture}${suffix}`);
            }
            python.libraries_[`def on_${safeGesture}${suffix}`] = code;
            return null;
        };
    }

    Object.keys(aliases).forEach(alias => {
        const target = aliases[alias];
        if (typeof python[target] === 'function') {
            python[alias] = python[target];
        }
    });

    const importWrappedNames = Object.keys(aliases)
        .concat(Object.keys(aliases).map(alias => aliases[alias]))
        .concat([
            'microbit_pin_setDigitalOutput',
            'microbit_pin_setPwmOutput',
            'microbit_pin_readDigitalPin',
            'microbit_pin_readAnalogPin',
            'microbit_pin_pinTouched',
            'microbit_display_showImage',
            'microbit_display_showImageUntil',
            'microbit_display_show',
            'microbit_display_showUntilScrollDone',
            'microbit_display_clearDisplay',
            'microbit_display_lightPixelAt',
            'microbit_display_showOnPiexlbrightness',
            'microbit_sensor_buttonIsPressed',
            'microbit_sensor_gestureIsX',
            'microbit_sensor_axisAcceleration',
            'microbit_sensor_lightLevel',
            'microbit_sensor_temperature',
            'microbit_sensor_runningTime',
            'microbit_console_consolePrint'
        ]);

    importWrappedNames.forEach(name => {
        const generator = python[name];
        if (typeof generator !== 'function' || generator.__dogoblockMicrobitImportWrapped) return;
        const wrapped = function (...args) {
            python.imports_.microbit = 'from microbit import *';
            return generator.apply(this, args);
        };
        wrapped.__dogoblockMicrobitImportWrapped = true;
        python[name] = wrapped;
    });

    [
        'pin_menu_pins',
        'microbit_menu_pins',
        'pin_menu_analogPins',
        'microbit_menu_analogPins',
        'pin_menu_touchPins',
        'microbit_menu_touchPins',
        'sensor_menu_keys',
        'microbit_menu_keys',
        'sensor_menu_gestrues',
        'microbit_menu_gestrues',
        'sensor_menu_axis',
        'microbit_menu_axis',
        'display_menu_ledState',
        'microbit_menu_ledState',
        'wireless_menu_channel',
        'microbit_menu_channel'
    ].forEach(name => {
        if (typeof python[name] !== 'function') {
            const menuName = name.replace(/^(pin|sensor|display|wireless|microbit)_menu_/, '');
            python[name] = block => [
                python.microbitFieldValueFromNames_(block, [menuName, menuName.toUpperCase()], '0'),
                python.ORDER_ATOMIC
            ];
        }
    });

    Object.keys(python).forEach(name => {
        if (name.indexOf('microbit_') !== 0 || typeof python[name] !== 'function') return;
        const doublePrefixedName = `microbit_${name}`;
        if (!python[doublePrefixedName]) {
            python[doublePrefixedName] = python[name];
        }
    });
};

installMicrobitPythonGenerators();

const getGeneratorNameFromDeviceType = deviceType => {
    if (deviceType === DeviceType.arduino) {
        return 'Arduino';
    } else if (deviceType === DeviceType.python ||
        deviceType === DeviceType.microPython ||
        deviceType === DeviceType.microbit) {
        return 'Python';
    }
    return 'null';
};

export {
    installMicrobitPythonGenerators,
    getGeneratorNameFromDeviceType
};
