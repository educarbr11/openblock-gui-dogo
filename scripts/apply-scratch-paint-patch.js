const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const patches = [
    {
        label: 'scratch-paint rotation center',
        packageDir: path.join(root, 'node_modules', 'scratch-paint'),
        applyDirectory: 'node_modules/scratch-paint',
        patchFile: path.join(root, 'patches', 'scratch-paint-rotation-center.patch'),
        markerFile: path.join(root, 'node_modules', 'scratch-paint', 'src', 'containers', 'paint-editor.jsx'),
        markerText: 'startRotationCenterPick'
    },
    {
        label: 'openblock-l10n Arduino begin translation',
        packageDir: path.join(root, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-arduino-begin-pt.patch'),
        markerFile: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'blocks', 'pt-br.json'),
        markerText: '"EVENT_WHENARDUINOBEGIN": "quando o Arduino iniciar"',
        jsonUpdates: [
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'blocks', 'pt-br.json'),
                values: {
                    EVENT_WHENARDUINOBEGIN: 'quando o Arduino iniciar'
                }
            },
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'blocks', 'pt.json'),
                values: {
                    EVENT_WHENARDUINOBEGIN: 'quando o Arduino iniciar'
                }
            }
        ]
    },
    {
        label: 'openblock-l10n paint rotation center translation',
        packageDir: path.join(root, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-paint-rotation-center-pt.patch'),
        markerFile: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'paint-editor', 'pt-br.json'),
        markerText: '"paint.paintEditor.rotationCenter": "Centro"',
        jsonUpdates: [
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'paint-editor', 'pt-br.json'),
                values: {
                    'paint.paintEditor.rotationCenter': 'Centro'
                }
            },
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'paint-editor', 'pt.json'),
                values: {
                    'paint.paintEditor.rotationCenter': 'Centro'
                }
            }
        ]
    },
    {
        label: 'openblock-l10n Web Serial connection translation',
        packageDir: path.join(root, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-web-serial-pt.patch'),
        markerFile: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
        markerText: '"gui.connection.scanning.arduinoWebSerialSelect": "Use Atualizar para selecionar seu Arduino USB"',
        jsonUpdates: [
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
                values: {
                    'gui.connection.type.label': 'Tipo de conexão',
                    'gui.connection.webSerial.notSecure': 'Web Serial exige HTTPS ou localhost.',
                    'gui.connection.webSerial.missingApi': 'Web Serial não está disponível. Use Chrome/Edge com HTTPS/localhost.',
                    'gui.connection.scanning.arduinoWebSerialSelect': 'Use Atualizar para selecionar seu Arduino USB'
                }
            },
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt.json'),
                values: {
                    'gui.connection.type.label': 'Tipo de ligação',
                    'gui.connection.webSerial.notSecure': 'Web Serial requer HTTPS ou localhost.',
                    'gui.connection.webSerial.missingApi': 'Web Serial não está disponível. Use Chrome/Edge com HTTPS/localhost.',
                    'gui.connection.scanning.arduinoWebSerialSelect': 'Use Refrescar para seleccionar o seu Arduino USB'
                }
            }
        ]
    },
    {
        label: 'openblock-l10n default project title translation',
        packageDir: path.join(root, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-default-project-title-pt.patch'),
        markerFile: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
        markerText: '"gui.gui.defaultProjectTitle": "Projeto DoGo Block"',
        jsonUpdates: [
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
                values: {
                    'gui.gui.defaultProjectTitle': 'Projeto DoGo Block'
                }
            }
        ]
    }
];

const gitApply = (patch, args) => spawnSync('git', ['apply'].concat(args), {
    cwd: root,
    encoding: 'utf8'
});

const patchArgs = patch => patch.applyDirectory ?
    [`--directory=${patch.applyDirectory}`, patch.patchFile] :
    [patch.patchFile];

const applyJsonUpdates = patch => {
    if (!patch.jsonUpdates) return false;

    patch.jsonUpdates.forEach(update => {
        if (!fs.existsSync(update.file)) return;
        const data = JSON.parse(fs.readFileSync(update.file, 'utf8'));
        Object.keys(update.values).forEach(key => {
            data[key] = update.values[key];
        });
        fs.writeFileSync(update.file, `${JSON.stringify(data, null, 4)}\n`);
    });

    return true;
};

const replaceAll = (source, replacements) => {
    let result = source;
    replacements.forEach(([from, to]) => {
        result = result.split(from).join(to);
    });
    return result;
};

const patchOpenBlockBlocksArduinoPinsPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const pinMenuGenerators = `

Blockly.Arduino.fieldValueFromNames_ = Blockly.Arduino.fieldValueFromNames_ || function(block, names, fallback) {
  for (var i = 0; i < names.length; i++) {
    var value = block.getFieldValue(names[i]);
    if (value !== null && value !== undefined) {
      return value;
    }
  }
  return fallback;
};

Blockly.Arduino['arduino_pin_menu_pins'] = function(block) {
  var code = Blockly.Arduino.fieldValueFromNames_(block, ['pins', 'PIN'], '0');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_menu_analogPins'] = function(block) {
  var code = Blockly.Arduino.fieldValueFromNames_(block, ['analogPins', 'PIN'], 'A0');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_menu_pwmPins'] = function(block) {
  var code = Blockly.Arduino.fieldValueFromNames_(block, ['pwmPins', 'PIN'], '3');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_menu_interruptPins'] = function(block) {
  var code = Blockly.Arduino.fieldValueFromNames_(block, ['interruptPins', 'PIN'], '2');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_menu_level'] = Blockly.Arduino['arduino_pin_menu_level'] || function(block) {
  var code = block.getFieldValue('level') || 'LOW';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
`;

    const digitalOutputGenerator = `

Blockly.Arduino['arduino_pin_setDigitalOutput'] = function(block) {
  var pin = Blockly.Arduino.pinToCode_(block, 'PIN', '0');
  var level = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'LOW';
  var pinIsReporter = Boolean(block.getInputTargetBlock && block.getInputTargetBlock('PIN'));
  if (pinIsReporter) {
    Blockly.Arduino.customFunctions_['dogoblock_digital_write'] =
      'void dogoblockDigitalWrite(int pin, int value) {\\n' +
      '  pinMode(pin, OUTPUT);\\n' +
      '  digitalWrite(pin, value);\\n' +
      '}\\n';
    return 'dogoblockDigitalWrite(' + pin + ', ' + level + ');\\n';
  }
  Blockly.Arduino.setups_['setups_pin_mode_output_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
  return 'digitalWrite(' + pin + ', ' + level + ');\\n';
};
`;

    const buzzerUltrasonicGenerators = `

Blockly.Arduino['arduino_pin_menu_note'] = function(block) {
  var code = block.getFieldValue('note') || '262';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_menu_beatTime'] = function(block) {
  var code = block.getFieldValue('beatTime') || '0.5';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_menu_distanceUnit'] = function(block) {
  var unit = block.getFieldValue('distanceUnit') || 'CM';
  var code = unit === 'INC' ? '1' : '0';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_playToneForSeconds'] = function(block) {
  var pin = Blockly.Arduino.pinToCode_(block, 'PIN', '9');
  var note = Blockly.Arduino.valueToCode(block, 'NOTE', Blockly.Arduino.ORDER_ATOMIC) || '262';
  var seconds = Blockly.Arduino.valueToCode(block, 'SECONDS', Blockly.Arduino.ORDER_ATOMIC) || '0.5';
  var code = 'tone(' + pin + ', ' + note + ');\\n';
  code += 'delay((unsigned long)((' + seconds + ') * 1000));\\n';
  code += 'noTone(' + pin + ');\\n';
  return code;
};

Blockly.Arduino['arduino_pin_playToneForBeat'] = function(block) {
  var pin = Blockly.Arduino.pinToCode_(block, 'PIN', '9');
  var note = Blockly.Arduino.valueToCode(block, 'NOTE', Blockly.Arduino.ORDER_ATOMIC) || '262';
  var beat = Blockly.Arduino.valueToCode(block, 'BEAT', Blockly.Arduino.ORDER_ATOMIC) || '0.5';
  var code = 'tone(' + pin + ', ' + note + ');\\n';
  code += 'delay((unsigned long)((' + beat + ') * 500));\\n';
  code += 'noTone(' + pin + ');\\n';
  return code;
};

Blockly.Arduino['arduino_pin_stopTone'] = function(block) {
  var pin = Blockly.Arduino.pinToCode_(block, 'PIN', '9');
  return 'noTone(' + pin + ');\\n';
};

Blockly.Arduino['arduino_pin_readUltrasonicDistance'] = function(block) {
  var trig = Blockly.Arduino.pinToCode_(block, 'TRIG', '9');
  var echo = Blockly.Arduino.pinToCode_(block, 'ECHO', '10');
  var unit = Blockly.Arduino.valueToCode(block, 'UNIT', Blockly.Arduino.ORDER_ATOMIC);
  if (!unit) {
    unit = (block.getFieldValue('UNIT') || 'CM') === 'INC' ? '1' : '0';
  }

  Blockly.Arduino.definitions_['dogoblock_read_ultrasonic'] =
    'float dogoblockReadUltrasonic(long trigPin, long echoPin, int unit) {\\n' +
    '  pinMode(trigPin, OUTPUT);\\n' +
    '  digitalWrite(trigPin, LOW);\\n' +
    '  delayMicroseconds(2);\\n' +
    '  digitalWrite(trigPin, HIGH);\\n' +
    '  delayMicroseconds(10);\\n' +
    '  digitalWrite(trigPin, LOW);\\n' +
    '  pinMode(echoPin, INPUT);\\n' +
    '  unsigned long duration = pulseIn(echoPin, HIGH, 30000UL);\\n' +
    '  float cm = duration / 58.0;\\n' +
    '  if (unit == 1) {\\n' +
    '    return cm / 2.54;\\n' +
    '  }\\n' +
    '  return cm;\\n' +
    '}\\n';

  var code = 'dogoblockReadUltrasonic(' + trig + ', ' + echo + ', ' + unit + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
`;

    const sourceReplacements = [
        [
            "goog.require('Blockly.Arduino');\n\n\nBlockly.Arduino['arduino_pin_setPinMode']",
            "goog.require('Blockly.Arduino');\n\n\nBlockly.Arduino.pinToCode_ = function(block, name, fallback) {\n  return Blockly.Arduino.valueToCode(block, name, Blockly.Arduino.ORDER_ATOMIC) ||\n      block.getFieldValue(name) ||\n      fallback;\n};\n\nBlockly.Arduino['arduino_pin_setPinMode']"
        ],
        ["var arg0 = block.getFieldValue('PIN') || '0';", "var arg0 = Blockly.Arduino.pinToCode_(block, 'PIN', '0');"],
        ["var arg0 = block.getFieldValue('PIN') || 'A1';", "var arg0 = Blockly.Arduino.pinToCode_(block, 'PIN', 'A1');"],
        ["var arg0 = block.getFieldValue('PIN') || '2';", "var arg0 = Blockly.Arduino.pinToCode_(block, 'PIN', '2');"]
    ];

    const sourceFiles = [
        path.join(packageDir, 'generators', 'arduino', 'arduino.js'),
        path.join(packageDir, 'generators', 'arduino', 'esp32.js'),
        path.join(packageDir, 'generators', 'arduino', 'esp8266.js'),
        path.join(packageDir, 'generators', 'arduino', 'k210.js')
    ];

    sourceFiles.forEach(file => {
        if (!fs.existsSync(file)) return;
        const before = fs.readFileSync(file, 'utf8');
        let after = replaceAll(before, sourceReplacements);
        if (
            file.endsWith(path.join('generators', 'arduino', 'arduino.js')) &&
            !after.includes("arduino_pin_menu_pins")
        ) {
            after += pinMenuGenerators;
        }
        if (
            file.endsWith(path.join('generators', 'arduino', 'arduino.js')) &&
            !after.includes("dogoblockDigitalWrite")
        ) {
            after += digitalOutputGenerator;
        }
        if (
            file.endsWith(path.join('generators', 'arduino', 'arduino.js')) &&
            !after.includes("arduino_pin_playToneForSeconds")
        ) {
            after += buzzerUltrasonicGenerators;
        }
        if (after !== before) {
            fs.writeFileSync(file, after);
        }
    });

    const compressedFile = path.join(packageDir, 'arduino_compressed.js');
    if (!fs.existsSync(compressedFile)) return;

    const compressedReplacements = [
        [
            'Blockly.Arduino.arduino={};Blockly.Arduino.arduino_pin_setPinMode=function(a){var b=a.getFieldValue("PIN")||"0";',
            'Blockly.Arduino.arduino={};Blockly.Arduino.pinToCode_=function(a,b,c){return Blockly.Arduino.valueToCode(a,b,Blockly.Arduino.ORDER_ATOMIC)||a.getFieldValue(b)||c};Blockly.Arduino.arduino_pin_setPinMode=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","0");'
        ],
        [
            'Blockly.Arduino.arduino_pin_setDigitalOutput=function(a){var b=a.getFieldValue("PIN")||"0";',
            'Blockly.Arduino.arduino_pin_setDigitalOutput=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","0");'
        ],
        [
            'Blockly.Arduino.arduino_pin_setPwmOutput=function(a){var b=a.getFieldValue("PIN")||"0";',
            'Blockly.Arduino.arduino_pin_setPwmOutput=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","0");'
        ],
        [
            'Blockly.Arduino.arduino_pin_readDigitalPin=function(a){return["digitalRead("+(a.getFieldValue("PIN")||"0")+")",Blockly.Arduino.ORDER_ATOMIC]};',
            'Blockly.Arduino.arduino_pin_readDigitalPin=function(a){return["digitalRead("+Blockly.Arduino.pinToCode_(a,"PIN","0")+")",Blockly.Arduino.ORDER_ATOMIC]};'
        ],
        [
            'Blockly.Arduino.arduino_pin_readAnalogPin=function(a){return["analogRead("+(a.getFieldValue("PIN")||"A1")+")",Blockly.Arduino.ORDER_ATOMIC]};',
            'Blockly.Arduino.arduino_pin_readAnalogPin=function(a){return["analogRead("+Blockly.Arduino.pinToCode_(a,"PIN","A1")+")",Blockly.Arduino.ORDER_ATOMIC]};'
        ],
        [
            'Blockly.Arduino.arduino_pin_setServoOutput=function(a){var b=a.getFieldValue("PIN")||"A1";',
            'Blockly.Arduino.arduino_pin_setServoOutput=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","A1");'
        ],
        [
            'Blockly.Arduino.arduino_pin_attachInterrupt=function(a){var b=a.getFieldValue("PIN")||"2";',
            'Blockly.Arduino.arduino_pin_attachInterrupt=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","2");'
        ],
        [
            'Blockly.Arduino.arduino_pin_detachInterrupt=function(a){var b=a.getFieldValue("PIN")||"2";',
            'Blockly.Arduino.arduino_pin_detachInterrupt=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","2");'
        ],
        [
            'Blockly.Arduino.arduino_pin_esp32SetPwmOutput=function(a){var b=a.getFieldValue("PIN")||"0";',
            'Blockly.Arduino.arduino_pin_esp32SetPwmOutput=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","0");'
        ],
        [
            'Blockly.Arduino.arduino_pin_esp32SetDACOutput=function(a){var b=a.getFieldValue("PIN")||"0";',
            'Blockly.Arduino.arduino_pin_esp32SetDACOutput=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","0");'
        ],
        [
            'Blockly.Arduino.arduino_pin_esp32ReadTouchPin=function(a){return["touchRead("+(a.getFieldValue("PIN")||"0")+")",Blockly.Arduino.ORDER_ATOMIC]};',
            'Blockly.Arduino.arduino_pin_esp32ReadTouchPin=function(a){return["touchRead("+Blockly.Arduino.pinToCode_(a,"PIN","0")+")",Blockly.Arduino.ORDER_ATOMIC]};'
        ],
        [
            'Blockly.Arduino.arduino_pin_esp32SetServoOutput=function(a){var b=a.getFieldValue("PIN")||"0";',
            'Blockly.Arduino.arduino_pin_esp32SetServoOutput=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","0");'
        ],
        [
            'Blockly.Arduino.arduino_pin_esp32AttachInterrupt=function(a){var b=a.getFieldValue("PIN")||"0";',
            'Blockly.Arduino.arduino_pin_esp32AttachInterrupt=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","0");'
        ],
        [
            'Blockly.Arduino.arduino_pin_esp32DetachInterrupt=function(a){var b=a.getFieldValue("PIN")||"0";',
            'Blockly.Arduino.arduino_pin_esp32DetachInterrupt=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","0");'
        ],
        [
            'Blockly.Arduino.arduino_pin_esp8266AttachInterrupt=function(a){var b=a.getFieldValue("PIN")||"2";',
            'Blockly.Arduino.arduino_pin_esp8266AttachInterrupt=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","2");'
        ],
        [
            'Blockly.Arduino.arduino_pin_k210SetPwmOutput=function(a){var b=a.getFieldValue("PIN")||"0";',
            'Blockly.Arduino.arduino_pin_k210SetPwmOutput=function(a){var b=Blockly.Arduino.pinToCode_(a,"PIN","0");'
        ]
    ];

    const before = fs.readFileSync(compressedFile, 'utf8');
    let after = replaceAll(before, compressedReplacements);
    if (!after.includes("arduino_pin_menu_pins")) {
        after += pinMenuGenerators;
    }
    if (!after.includes("dogoblockDigitalWrite")) {
        after += digitalOutputGenerator;
    }
    if (!after.includes("arduino_pin_playToneForSeconds")) {
        after += buzzerUltrasonicGenerators;
    }
    if (after !== before) {
        fs.writeFileSync(compressedFile, after);
        console.log(`Applied openblock-blocks Arduino pin reporter patch: ${packageDir}`);
    } else if (after.includes('pinToCode_')) {
        console.log(`openblock-blocks Arduino pin reporter patch already applied: ${packageDir}`);
    }
};

const patchOpenBlockBlocksArduinoPins = () => {
    [
        path.join(root, 'node_modules', 'openblock-blocks'),
        path.join(root, '.openblock-vm', 'node_modules', 'openblock-blocks')
    ].forEach(patchOpenBlockBlocksArduinoPinsPackage);
};

for (const patch of patches) {
    if (!fs.existsSync(patch.packageDir) || !fs.existsSync(patch.patchFile)) {
        continue;
    }

    if (
        patch.markerFile &&
        patch.markerText &&
        fs.existsSync(patch.markerFile) &&
        fs.readFileSync(patch.markerFile, 'utf8').includes(patch.markerText)
    ) {
        console.log(`${patch.label} patch already applied.`);
        continue;
    }

    if (applyJsonUpdates(patch)) {
        console.log(`Applied ${patch.label} JSON updates.`);
        continue;
    }

    const check = gitApply(patch, ['--check'].concat(patchArgs(patch)));
    if (check.status !== 0) {
        console.error(check.stderr || check.stdout);
        process.exit(check.status || 1);
    }

    const apply = gitApply(patch, patchArgs(patch));
    if (apply.status !== 0) {
        console.error(apply.stderr || apply.stdout);
        process.exit(apply.status || 1);
    }

    console.log(`Applied ${patch.label} patch.`);
}

patchOpenBlockBlocksArduinoPins();
