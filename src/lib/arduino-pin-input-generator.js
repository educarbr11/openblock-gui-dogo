import ScratchBlocks from 'openblock-blocks';

const Blockly = (typeof window !== 'undefined' && window.Blockly) || ScratchBlocks;

const getPinInputCode = (block, name, fallback) => {
    if (!Blockly || !Blockly.Arduino) {
        return fallback;
    }

    let code = Blockly.Arduino.valueToCode(block, name, Blockly.Arduino.ORDER_ATOMIC);
    if (!code) {
        return fallback;
    }

    code = String(code).trim();
    if ((code.charAt(0) === '"' && code.charAt(code.length - 1) === '"') ||
        (code.charAt(0) === '\'' && code.charAt(code.length - 1) === '\'')) {
        code = code.substring(1, code.length - 1);
    }

    return code || fallback;
};

if (Blockly && Blockly.Arduino) {
    Blockly.Arduino.getPinInputCode = getPinInputCode;

    Blockly.Arduino.arduino_pin_setPinMode = block => {
        const pin = getPinInputCode(block, 'PIN', '0');
        const mode = block.getFieldValue('MODE') || 'INPUT';
        return `pinMode(${pin}, ${mode});\n`;
    };

    Blockly.Arduino.arduino_pin_setDigitalOutput = block => {
        const pin = getPinInputCode(block, 'PIN', '0');
        const level = Blockly.Arduino.valueToCode(
            block,
            'LEVEL',
            Blockly.Arduino.ORDER_UNARY_POSTFIX
        ) || 'LOW';
        return `digitalWrite(${pin}, ${level});\n`;
    };

    Blockly.Arduino.arduino_pin_setPwmOutput = block => {
        const pin = getPinInputCode(block, 'PIN', '3');
        const output = Blockly.Arduino.valueToCode(
            block,
            'OUT',
            Blockly.Arduino.ORDER_UNARY_POSTFIX
        ) || 0;
        return `analogWrite(${pin}, ${output});\n`;
    };

    Blockly.Arduino.arduino_pin_readDigitalPin = block => {
        const pin = getPinInputCode(block, 'PIN', '0');
        return [`digitalRead(${pin})`, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_pin_readAnalogPin = block => {
        const pin = getPinInputCode(block, 'PIN', '0');
        return [`analogRead(${pin})`, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.arduino_pin_setServoOutput = block => {
        const pin = getPinInputCode(block, 'PIN', '3');
        const output = Blockly.Arduino.valueToCode(
            block,
            'OUT',
            Blockly.Arduino.ORDER_UNARY_POSTFIX
        ) || 0;

        Blockly.Arduino.includes_.include_servo = '#include <Servo.h>';
        Blockly.Arduino.definitions_[`definitions_servo${pin}`] = `Servo servo_${pin};`;
        Blockly.Arduino.setups_[`setups_servo${pin}`] = `servo_${pin}.attach(${pin}, 544, 2400);`;

        return `servo_${pin}.write(${output});\n`;
    };

    Blockly.Arduino.arduino_pin_attachInterrupt = block => {
        const pin = getPinInputCode(block, 'PIN', '3');
        const mode = block.getFieldValue('MODE') || 'RISING';
        let branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Arduino.addLoopTrap(branch, block.id);

        Blockly.Arduino.definitions_[`definitions_ISR_${mode}${pin}`] =
            `void ISR_${mode}_${pin}() {\n${branch}}`;

        return `attachInterrupt(digitalPinToInterrupt(${pin}), ISR_${mode}_${pin}, ${mode});\n`;
    };

    Blockly.Arduino.arduino_pin_detachInterrupt = block => {
        const pin = getPinInputCode(block, 'PIN', '3');
        return `detachInterrupt(digitalPinToInterrupt(${pin}));\n`;
    };
}
