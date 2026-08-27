const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const dependencyRoot = process.env.OPENBLOCK_PATCH_DEPENDENCIES_ROOT ?
    path.resolve(process.env.OPENBLOCK_PATCH_DEPENDENCIES_ROOT) :
    root;
const translationsOnly = process.env.OPENBLOCK_PATCH_TRANSLATIONS_ONLY === '1';
const dependenciesOnly = process.env.OPENBLOCK_PATCH_DEPENDENCIES_ONLY === '1';
const dependencyPackageDirs = packageName => [
    path.join(dependencyRoot, 'node_modules', packageName)
].concat(dependencyRoot === root ? [
    path.join(root, '.openblock-vm', 'node_modules', packageName)
] : []);
const patches = [
    {
        label: 'scratch-paint rotation center',
        packageDir: path.join(dependencyRoot, 'node_modules', 'scratch-paint'),
        applyDirectory: 'node_modules/scratch-paint',
        patchFile: path.join(root, 'patches', 'scratch-paint-rotation-center.patch'),
        markerFile: path.join(dependencyRoot, 'node_modules', 'scratch-paint', 'src', 'containers', 'paint-editor.jsx'),
        markerText: 'startRotationCenterPick'
    },
    {
        label: 'openblock-l10n Arduino begin translation',
        packageDir: path.join(dependencyRoot, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-arduino-begin-pt.patch'),
        markerFile: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'blocks', 'pt-br.json'),
        markerText: '"EVENT_WHENARDUINOBEGIN": "quando o Arduino iniciar"',
        jsonUpdates: [
            {
                file: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'blocks', 'pt-br.json'),
                values: {
                    EVENT_WHENARDUINOBEGIN: 'quando o Arduino iniciar'
                }
            },
            {
                file: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'blocks', 'pt.json'),
                values: {
                    EVENT_WHENARDUINOBEGIN: 'quando o Arduino iniciar'
                }
            }
        ]
    },
    {
        label: 'openblock-l10n paint rotation center translation',
        packageDir: path.join(dependencyRoot, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-paint-rotation-center-pt.patch'),
        markerFile: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'paint-editor', 'pt-br.json'),
        markerText: '"paint.paintEditor.rotationCenter": "Centro"',
        jsonUpdates: [
            {
                file: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'paint-editor', 'pt-br.json'),
                values: {
                    'paint.paintEditor.rotationCenter': 'Centro'
                }
            },
            {
                file: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'paint-editor', 'pt.json'),
                values: {
                    'paint.paintEditor.rotationCenter': 'Centro'
                }
            }
        ]
    },
    {
        label: 'openblock-l10n Web Serial connection translation',
        packageDir: path.join(dependencyRoot, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-web-serial-pt.patch'),
        markerFile: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
        markerText: '"gui.connection.scanning.arduinoWebSerialSelect": "Use Atualizar para selecionar seu Arduino USB"',
        jsonUpdates: [
            {
                file: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
                values: {
                    'gui.connection.type.label': 'Tipo de conexão',
                    'gui.connection.webSerial.notSecure': 'Web Serial exige HTTPS ou localhost.',
                    'gui.connection.webSerial.missingApi': 'Web Serial não está disponível. Use Chrome/Edge com HTTPS/localhost.',
                    'gui.connection.scanning.arduinoWebSerialSelect': 'Use Atualizar para selecionar seu Arduino USB'
                }
            },
            {
                file: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt.json'),
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
        packageDir: path.join(dependencyRoot, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-default-project-title-pt.patch'),
        markerFile: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
        markerText: '"gui.gui.defaultProjectTitle": "Projeto DoGo Block"',
        jsonUpdates: [
            {
                file: path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
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
  Blockly.Arduino.setups_['setups_pin_mode_output_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
  return 'digitalWrite(' + pin + ', ' + level + ');\\n';
};
Blockly.Arduino.__dogoblockDigitalWriteSetupOnly = true;
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

    const serialAutoBeginGenerator = `

Blockly.Arduino['arduino_serial_serialBegin'] = function(block) {
  var arg0 = block.getFieldValue('VALUE') || '9600';
  Blockly.Arduino.setups_['setup_serial_begin'] = 'Serial.begin(' + arg0 + ');';
  return '';
};

Blockly.Arduino['arduino_serial_serialPrint'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
  var eol = block.getFieldValue('EOL') || 'warp';
  Blockly.Arduino.setups_['setup_serial_begin'] = Blockly.Arduino.setups_['setup_serial_begin'] || 'Serial.begin(9600);';
  var code = '';
  if (eol === 'warp') {
    code = 'Serial.println(' + arg0 + ');\\n';
  } else {
    code = 'Serial.print(' + arg0 + ');\\n';
  }
  return code;
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
        if (file.endsWith(path.join('generators', 'arduino', 'arduino.js'))) {
            const digitalStart = after.indexOf("Blockly.Arduino['arduino_pin_setDigitalOutput'] = function(block) {");
            const digitalEnd = after.indexOf("Blockly.Arduino['arduino_pin_menu_level']", digitalStart);
            if (digitalStart !== -1 && digitalEnd !== -1) {
                after = after.slice(0, digitalStart) + digitalOutputGenerator.trim() + '\n\n' +
                    after.slice(digitalEnd);
            }
        }
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
        if (
            file.endsWith(path.join('generators', 'arduino', 'arduino.js')) &&
            !after.includes("setup_serial_begin")
        ) {
            const serialStart = after.indexOf("Blockly.Arduino['arduino_serial_serialBegin'] = function(block) {");
            const serialEnd = after.indexOf("Blockly.Arduino['arduino_serial_serialAvailable']", serialStart);
            if (serialStart !== -1 && serialEnd !== -1) {
                after = after.slice(0, serialStart) + serialAutoBeginGenerator + '\n' + after.slice(serialEnd);
            }
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
    if (!after.includes('__dogoblockDigitalWriteSetupOnly')) {
        after += digitalOutputGenerator;
    }
    if (!after.includes("arduino_pin_menu_pins")) {
        after += pinMenuGenerators;
    }
    if (!after.includes("dogoblockDigitalWrite")) {
        after += digitalOutputGenerator;
    }
    if (!after.includes("arduino_pin_playToneForSeconds")) {
        after += buzzerUltrasonicGenerators;
    }
    if (!after.includes("setup_serial_begin")) {
        after = after
            .replace(
                'Blockly.Arduino.arduino_serial_serialBegin=function(a){return"Serial.begin("+(a.getFieldValue("VALUE")||"9600")+");\\n"};',
                'Blockly.Arduino.arduino_serial_serialBegin=function(a){a=a.getFieldValue("VALUE")||"9600";Blockly.Arduino.setups_.setup_serial_begin="Serial.begin("+a+");";return""};'
            )
            .replace(
                'Blockly.Arduino.arduino_serial_serialPrint=function(a){var b=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_UNARY_POSTFIX)||"";return"warp"===(a.getFieldValue("EOL")||"warp")?"Serial.println("+b+");\\n":"Serial.print("+b+");\\n"};',
                'Blockly.Arduino.arduino_serial_serialPrint=function(a){var b=Blockly.Arduino.valueToCode(a,"VALUE",Blockly.Arduino.ORDER_UNARY_POSTFIX)||"";Blockly.Arduino.setups_.setup_serial_begin=Blockly.Arduino.setups_.setup_serial_begin||"Serial.begin(9600);";return"warp"===(a.getFieldValue("EOL")||"warp")?"Serial.println("+b+");\\n":"Serial.print("+b+");\\n"};'
            );
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
        path.join(dependencyRoot, 'node_modules', 'openblock-blocks'),
        path.join(root, '.openblock-vm', 'node_modules', 'openblock-blocks')
    ].forEach(patchOpenBlockBlocksArduinoPinsPackage);
};

const keyReleasedBlockSource = `Blockly.Blocks['event_whenkeyreleased'] = {
  /**
   * Block to trigger when a keyboard key is released.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "event_whenkeyreleased",
      "message0": Blockly.Msg.EVENT_WHENKEYRELEASED,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "KEY_OPTION",
          "options": [
            [Blockly.Msg.EVENT_WHENKEYPRESSED_SPACE, 'space'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_UP, 'up arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_DOWN, 'down arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_RIGHT, 'right arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_LEFT, 'left arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_ANY, 'any'],
            ['a', 'a'],
            ['b', 'b'],
            ['c', 'c'],
            ['d', 'd'],
            ['e', 'e'],
            ['f', 'f'],
            ['g', 'g'],
            ['h', 'h'],
            ['i', 'i'],
            ['j', 'j'],
            ['k', 'k'],
            ['l', 'l'],
            ['m', 'm'],
            ['n', 'n'],
            ['o', 'o'],
            ['p', 'p'],
            ['q', 'q'],
            ['r', 'r'],
            ['s', 's'],
            ['t', 't'],
            ['u', 'u'],
            ['v', 'v'],
            ['w', 'w'],
            ['x', 'x'],
            ['y', 'y'],
            ['z', 'z'],
            ['0', '0'],
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
            ['5', '5'],
            ['6', '6'],
            ['7', '7'],
            ['8', '8'],
            ['9', '9']
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};
`;

const keyReleasedBlockCompressed = 'Blockly.Blocks.event_whenkeyreleased={init:function(){this.jsonInit({id:"event_whenkeyreleased",message0:Blockly.Msg.EVENT_WHENKEYRELEASED,args0:[{type:"field_dropdown",name:"KEY_OPTION",options:[[Blockly.Msg.EVENT_WHENKEYPRESSED_SPACE,"space"],[Blockly.Msg.EVENT_WHENKEYPRESSED_UP,"up arrow"],[Blockly.Msg.EVENT_WHENKEYPRESSED_DOWN,"down arrow"],[Blockly.Msg.EVENT_WHENKEYPRESSED_RIGHT,"right arrow"],[Blockly.Msg.EVENT_WHENKEYPRESSED_LEFT,"left arrow"],[Blockly.Msg.EVENT_WHENKEYPRESSED_ANY,"any"],["a","a"],["b","b"],["c","c"],["d","d"],["e","e"],["f","f"],["g","g"],["h","h"],["i","i"],["j","j"],["k","k"],["l","l"],["m","m"],["n","n"],["o","o"],["p","p"],["q","q"],["r","r"],["s","s"],["t","t"],["u","u"],["v","v"],["w","w"],["x","x"],["y","y"],["z","z"],["0","0"],["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"]]}],category:Blockly.Categories.event,extensions:["colours_event","shape_hat"]})}};';

const patchOpenBlockBlocksKeyReleasedPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const eventFile = path.join(packageDir, 'blocks_vertical', 'event.js');
    if (fs.existsSync(eventFile)) {
        const before = fs.readFileSync(eventFile, 'utf8');
        if (!before.includes("event_whenkeyreleased")) {
            fs.writeFileSync(eventFile, before.replace(
                "Blockly.Blocks['event_whengreaterthan']",
                `${keyReleasedBlockSource}\nBlockly.Blocks['event_whengreaterthan']`
            ));
        }
    }

    const defaultToolboxFile = path.join(packageDir, 'blocks_vertical', 'default_toolbox.js');
    if (fs.existsSync(defaultToolboxFile)) {
        const before = fs.readFileSync(defaultToolboxFile, 'utf8');
        if (!before.includes('event_whenkeyreleased')) {
            fs.writeFileSync(defaultToolboxFile, before.replace(
                "'<block type=\"event_whenkeypressed\" id=\"event_whenkeypressed\">' +\n" +
                "    '</block>' +",
                "'<block type=\"event_whenkeypressed\" id=\"event_whenkeypressed\">' +\n" +
                "    '</block>' +\n" +
                "    '<block type=\"event_whenkeyreleased\" id=\"event_whenkeyreleased\">' +\n" +
                "    '</block>' +"
            ));
        }
    }

    const messageFiles = [
        [path.join(packageDir, 'msg', 'messages.js'),
            "Blockly.Msg.EVENT_WHENKEYPRESSED = 'when %1 key pressed';",
            "Blockly.Msg.EVENT_WHENKEYPRESSED = 'when %1 key pressed';\nBlockly.Msg.EVENT_WHENKEYRELEASED = 'when %1 key released';"],
        [path.join(packageDir, 'msg', 'js', 'en.js'),
            'Blockly.Msg["EVENT_WHENKEYPRESSED"] = "when %1 key pressed";',
            'Blockly.Msg["EVENT_WHENKEYPRESSED"] = "when %1 key pressed";\nBlockly.Msg["EVENT_WHENKEYRELEASED"] = "when %1 key released";']
    ];
    messageFiles.forEach(([file, from, to]) => {
        if (!fs.existsSync(file)) return;
        const before = fs.readFileSync(file, 'utf8');
        if (!before.includes('EVENT_WHENKEYRELEASED')) {
            fs.writeFileSync(file, before.replace(from, to));
        }
    });

    const jsonFile = path.join(packageDir, 'msg', 'json', 'en.json');
    if (fs.existsSync(jsonFile)) {
        const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
        data.EVENT_WHENKEYRELEASED = 'when %1 key released';
        fs.writeFileSync(jsonFile, `${JSON.stringify(data, null, 4)}\n`);
    }

    const scratchMsgsFile = path.join(packageDir, 'msg', 'scratch_msgs.js');
    if (fs.existsSync(scratchMsgsFile)) {
        let text = fs.readFileSync(scratchMsgsFile, 'utf8');
        if (!text.includes('"EVENT_WHENKEYRELEASED": "when %1 key released"')) {
            text = text.replace(
                '"EVENT_WHENKEYPRESSED": "when %1 key pressed",',
                '"EVENT_WHENKEYPRESSED": "when %1 key pressed",\n    "EVENT_WHENKEYRELEASED": "when %1 key released",'
            );
        }
        if (!text.includes('"EVENT_WHENKEYRELEASED": "quando a tecla %1 for solta"')) {
            text = text.replace(
                '"EVENT_WHENKEYPRESSED": "quando a tecla %1 for pressionada",',
                '"EVENT_WHENKEYPRESSED": "quando a tecla %1 for pressionada",\n    "EVENT_WHENKEYRELEASED": "quando a tecla %1 for solta",'
            );
        }
        fs.writeFileSync(scratchMsgsFile, text);
    }

    const compressedFile = path.join(packageDir, 'blocks_compressed_vertical.js');
    if (fs.existsSync(compressedFile)) {
        let text = fs.readFileSync(compressedFile, 'utf8');
        if (!text.includes('event_whenkeyreleased')) {
            text = text.replace('Blockly.Blocks.event_whengreaterthan=', `${keyReleasedBlockCompressed}Blockly.Blocks.event_whengreaterthan=`);
        }
        text = text.replace(
            '<block type="event_whenkeypressed" id="event_whenkeypressed"></block><block type="event_whenthisspriteclicked"',
            '<block type="event_whenkeypressed" id="event_whenkeypressed"></block><block type="event_whenkeyreleased" id="event_whenkeyreleased"></block><block type="event_whenthisspriteclicked"'
        );
        fs.writeFileSync(compressedFile, text);
    }

    const distFile = path.join(packageDir, 'dist', 'vertical.js');
    if (fs.existsSync(distFile)) {
        let text = fs.readFileSync(distFile, 'utf8');
        if (!text.includes('event_whenkeyreleased')) {
            text = text.replace('Blockly.Blocks.event_whengreaterthan=', `${keyReleasedBlockCompressed}Blockly.Blocks.event_whengreaterthan=`);
        }
        text = text.replace(
            '<block type="event_whenkeypressed" id="event_whenkeypressed"></block><block type="event_whenthisspriteclicked"',
            '<block type="event_whenkeypressed" id="event_whenkeypressed"></block><block type="event_whenkeyreleased" id="event_whenkeyreleased"></block><block type="event_whenthisspriteclicked"'
        );
        if (!text.includes('Blockly.Msg.EVENT_WHENKEYRELEASED')) {
            text = text.replace(
                "Blockly.Msg.EVENT_WHENKEYPRESSED = 'when %1 key pressed';",
                "Blockly.Msg.EVENT_WHENKEYPRESSED = 'when %1 key pressed';\\nBlockly.Msg.EVENT_WHENKEYRELEASED = 'when %1 key released';"
            );
        }
        if (!text.includes('\\"EVENT_WHENKEYRELEASED\\": \\"when %1 key released\\"')) {
            text = text.replace(
                '\\"EVENT_WHENKEYPRESSED\\": \\"when %1 key pressed\\",',
                '\\"EVENT_WHENKEYPRESSED\\": \\"when %1 key pressed\\",\\n    \\"EVENT_WHENKEYRELEASED\\": \\"when %1 key released\\",'
            );
        }
        if (!text.includes('\\"EVENT_WHENKEYRELEASED\\": \\"quando a tecla %1 for solta\\"')) {
            text = text.replace(
                '\\"EVENT_WHENKEYPRESSED\\": \\"quando a tecla %1 for pressionada\\",',
                '\\"EVENT_WHENKEYPRESSED\\": \\"quando a tecla %1 for pressionada\\",\\n    \\"EVENT_WHENKEYRELEASED\\": \\"quando a tecla %1 for solta\\",'
            );
        }
        fs.writeFileSync(distFile, text);
    }

    console.log(`Applied openblock-blocks key released event patch: ${packageDir}`);
};

const patchOpenBlockBlocksKeyReleased = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-blocks'),
        path.join(root, '.openblock-vm', 'node_modules', 'openblock-blocks')
    ].forEach(patchOpenBlockBlocksKeyReleasedPackage);
};

const patchOpenBlockBlocksMicrobitPythonEventsPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const microbitV2InputGenerators = `

Blockly.Python.__dogoblockMicrobitV2InputPatch = true;
Blockly.Python.microbit_sensor_logoIsPressed = function() {
  return ["pin_logo.is_touched()", Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.microbit_sensor_soundLevel = function() {
  return ["microphone.sound_level()", Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.microbit_sensor_setSoundThreshold = function(block) {
  var event = Blockly.Python.microbitValueOrField_(block, "EVENT", ["soundEvents"], "loud");
  var value = Blockly.Python.microbitNumberCode_(block, "VALUE", 128);
  var soundEvent = String(event).toLowerCase() === "quiet" ? "QUIET" : "LOUD";
  return "microphone.set_threshold(SoundEvent." + soundEvent + ", int(" + value + "))\\n";
};
Blockly.Python.microbit_whenSound = function(block) {
  if (!Blockly.Python.microbitHasEventBody_(block)) return null;
  Blockly.Python.imports_.microbit = "from microbit import *";
  var event = Blockly.Python.microbitValueOrField_(block, "EVENT", ["soundEvents"], "loud");
  var soundEvent = String(event).toLowerCase() === "quiet" ? "QUIET" : "LOUD";
  var loopKey = "microbit_whenSound" + soundEvent;
  var suffix = Blockly.Python.microbitEventSuffix_(loopKey);
  var functionName = "on_sound_" + String(event).toLowerCase() + suffix;
  Blockly.Python.loops_[loopKey + suffix] =
    "if microphone.was_event(SoundEvent." + soundEvent + "):\\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + functionName + "()";
  Blockly.Python.libraries_["def " + functionName] = Blockly.Python.microbitEventFunction_(block, functionName);
  return null;
};
Blockly.Python.microbit_whenLogo = function(block) {
  if (!Blockly.Python.microbitHasEventBody_(block)) return null;
  Blockly.Python.imports_.microbit = "from microbit import *";
  var event = Blockly.Python.microbitValueOrField_(block, "EVENT", ["logoEvents"], "pressed");
  var loopKey = "microbit_whenLogo" + event;
  var suffix = Blockly.Python.microbitEventSuffix_(loopKey);
  var functionName = "on_logo_" + event + suffix;
  var stateName = "_dogoblock_logo_" + event + suffix;
  var currentName = stateName + "_current";
  var expected = event === "released" ? "False" : "True";
  Blockly.Python.variables_[stateName] = stateName + " = pin_logo.is_touched()";
  Blockly.Python.loops_[loopKey + suffix] = "global " + stateName + "\\n" +
    Blockly.Python.INDENT + currentName + " = pin_logo.is_touched()\\n" +
    Blockly.Python.INDENT + "if " + currentName + " != " + stateName + ":\\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + stateName + " = " + currentName + "\\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + "if " + currentName + " == " + expected + ":\\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + Blockly.Python.INDENT + functionName + "()";
  Blockly.Python.libraries_["def " + functionName] = Blockly.Python.microbitEventFunction_(block, functionName);
  return null;
};
Blockly.Python.microbit_microbit_whenSound = Blockly.Python.microbit_whenSound;
Blockly.Python.microbit_microbit_whenLogo = Blockly.Python.microbit_whenLogo;
Blockly.Python.microbit_logoIsPressed = Blockly.Python.microbit_sensor_logoIsPressed;
Blockly.Python.microbit_soundLevel = Blockly.Python.microbit_sensor_soundLevel;
Blockly.Python.microbit_setSoundThreshold = Blockly.Python.microbit_sensor_setSoundThreshold;
Blockly.Python.sensor_logoIsPressed = Blockly.Python.microbit_sensor_logoIsPressed;
Blockly.Python.sensor_soundLevel = Blockly.Python.microbit_sensor_soundLevel;
Blockly.Python.sensor_setSoundThreshold = Blockly.Python.microbit_sensor_setSoundThreshold;
Blockly.Python.microbit_menu_soundEvents = function(block) {
  return [Blockly.Python.microbitFieldValueFromNames_(block, ["soundEvents", "EVENT"], "loud"), Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.microbit_menu_logoEvents = function(block) {
  return [Blockly.Python.microbitFieldValueFromNames_(block, ["logoEvents", "EVENT"], "pressed"), Blockly.Python.ORDER_ATOMIC];
};
`;

    const microbitGenerator = path.join(packageDir, 'generators', 'python', 'microbit.js');
    if (fs.existsSync(microbitGenerator)) {
        let text = fs.readFileSync(microbitGenerator, 'utf8');
        if (!text.includes('microbitIndentedEventBody_')) {
            text = text.replace(
                `Blockly.Python.microbitEventFunction_ = Blockly.Python.microbitEventFunction_ || function(block, functionName) {
  var code = "def " + functionName + "():\\n";
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (!nextBlock) {
    code += Blockly.Python.INDENT + "pass\\n";
  } else {
    code += Blockly.Python.microbitGlobalVariables_();
    code = Blockly.Python.scrub_(block, code);
  }
  return code;
};
`,
                `Blockly.Python.microbitIndentedEventBody_ = Blockly.Python.microbitIndentedEventBody_ || function(block) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (!nextBlock) {
    return Blockly.Python.INDENT + "pass\\n";
  }

  var code = Blockly.Python.microbitGlobalVariables_();
  var body = Blockly.Python.blockToCode(nextBlock);
  if (!body) {
    body = "pass\\n";
  }
  return code + Blockly.Python.prefixLines(body, Blockly.Python.INDENT);
};

Blockly.Python.microbitEventFunction_ = Blockly.Python.microbitEventFunction_ || function(block, functionName) {
  var code = "def " + functionName + "():\\n";
  return code + Blockly.Python.microbitIndentedEventBody_(block);
};
`
            );
            fs.writeFileSync(microbitGenerator, text);
        }
        if (!text.includes('microbitImageValue_')) {
            text = text.replace(
                `Blockly.Python['microbit_display_showImage'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';

  arg0 = arg0.replace(/1/g, '9');
  arg0 = arg0.slice(0, 5) + ':' + arg0.slice(5, 10) + ':' + arg0.slice(10, 15)
    + ':' + arg0.slice(15, 20) + ':' + arg0.slice(20, 25);
  var code = "display.show(Image('" + arg0 + "'))\\n";
  return code;
};

Blockly.Python['microbit_display_showImageUntil'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
  var arg1 = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || '0';

  arg0 = arg0.replace(/1/g, '9');
  arg0 = arg0.slice(0, 5) + ':' + arg0.slice(5, 10) + ':' + arg0.slice(10, 15)
    + ':' + arg0.slice(15, 20) + ':' + arg0.slice(20, 25);
  var code = "display.show(Image('" + arg0 + "'))\\n" + "sleep(float(" + arg1 + ") * 1000)\\n" + "display.clear()\\n";
  return code;
};
`,
                `Blockly.Python.microbitImageValue_ = Blockly.Python.microbitImageValue_ || function(value) {
  value = String(value || '0');
  if ((value.charAt(0) === "'" && value.charAt(value.length - 1) === "'") ||
      (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"')) {
    value = value.slice(1, -1);
  }
  value = value.replace(/[^01]/g, '');
  if (value.length < 25) {
    value = (value + '0000000000000000000000000').slice(0, 25);
  } else if (value.length > 25) {
    value = value.slice(0, 25);
  }
  value = value.replace(/1/g, '9');
  return value.slice(0, 5) + ':' + value.slice(5, 10) + ':' + value.slice(10, 15) +
    ':' + value.slice(15, 20) + ':' + value.slice(20, 25);
};

Blockly.Python['microbit_display_showImage'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';

  arg0 = Blockly.Python.microbitImageValue_(arg0);
  var code = "display.show(Image('" + arg0 + "'))\\n";
  return code;
};

Blockly.Python['microbit_display_showImageUntil'] = function(block) {
  var arg0 = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || '0';
  var arg1 = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_ATOMIC) || '0';

  arg0 = Blockly.Python.microbitImageValue_(arg0);
  var code = "display.show(Image('" + arg0 + "'))\\n" + "sleep(float(" + arg1 + ") * 1000)\\n" + "display.clear()\\n";
  return code;
};
`
            );
            fs.writeFileSync(microbitGenerator, text);
        }
        text = fs.readFileSync(microbitGenerator, 'utf8');
        if (!text.includes('__dogoblockMicrobitEventIndentPatch')) {
            text += `

Blockly.Python.__dogoblockMicrobitEventIndentPatch = true;
Blockly.Python.microbitIndentedEventBody_ = function(block) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (!nextBlock) {
    return Blockly.Python.INDENT + "pass\\n";
  }

  var code = Blockly.Python.microbitGlobalVariables_ ? Blockly.Python.microbitGlobalVariables_() : "";
  var body = Blockly.Python.blockToCode(nextBlock);
  if (!body) {
    body = "pass\\n";
  }
  return code + Blockly.Python.prefixLines(body, Blockly.Python.INDENT);
};

Blockly.Python.microbitEventFunction_ = function(block, functionName) {
  return "def " + functionName + "():\\n" + Blockly.Python.microbitIndentedEventBody_(block);
};
`;
            fs.writeFileSync(microbitGenerator, text);
        }
        text = fs.readFileSync(microbitGenerator, 'utf8');
        if (!text.includes('__dogoblockMicrobitSafeCodePatch')) {
            text += `

Blockly.Python.__dogoblockMicrobitSafeCodePatch = true;
Blockly.Python.microbitNumberCode_ = function(block, name, fallback) {
  return Blockly.Python.valueToCode(block, name, Blockly.Python.ORDER_FUNCTION_CALL) || String(fallback);
};
Blockly.Python.microbitTextCode_ = function(block, name, fallback) {
  return Blockly.Python.valueToCode(block, name, Blockly.Python.ORDER_FUNCTION_CALL) || Blockly.Python.quote_(fallback || "");
};
Blockly.Python.microbitDigitalLevelCode_ = function(block) {
  var value = Blockly.Python.valueToCode(block, "LEVEL", Blockly.Python.ORDER_FUNCTION_CALL) ||
    block.getFieldValue("LEVEL") ||
    Blockly.Python.microbitFieldValueFromNames_(block, ["level"], "1");
  var normalized = String(value).replace(/^['"]|['"]$/g, "").toUpperCase();
  if (normalized === "HIGH" || normalized === "ON" || normalized === "LIGADO") return "1";
  if (normalized === "LOW" || normalized === "OFF" || normalized === "DESLIGADO") return "0";
  return value;
};
Blockly.Python.microbit_pin_setDigitalOutput = function(block) {
  var pin = Blockly.Python.microbitValueOrField_(block, "PIN", ["pins"], "0");
  return "pin" + pin + ".write_digital(" + Blockly.Python.microbitDigitalLevelCode_(block) + ")\\n";
};
Blockly.Python.microbit_pin_setPwmOutput = function(block) {
  var pin = Blockly.Python.microbitValueOrField_(block, "PIN", ["pins"], "0");
  return "pin" + pin + ".write_analog(" + Blockly.Python.microbitNumberCode_(block, "OUT", 0) + ")\\n";
};
Blockly.Python.microbit_display_show = function(block) {
  var text = Blockly.Python.microbitTextCode_(block, "TEXT", "");
  return "display.scroll(str(" + text + "), wait=False, loop=False)\\n";
};
Blockly.Python.microbit_display_showUntilScrollDone = function(block) {
  var text = Blockly.Python.microbitTextCode_(block, "TEXT", "");
  return "display.scroll(str(" + text + "), wait=True, loop=False)\\n";
};
Blockly.Python.microbit_display_lightPixelAt = function(block) {
  var state = Blockly.Python.microbitValueOrField_(block, "STATE", ["ledState"], "on") === "off" ? 0 : 9;
  var x = Blockly.Python.microbitNumberCode_(block, "X", 0);
  var y = Blockly.Python.microbitNumberCode_(block, "Y", 0);
  return "display.set_pixel(int(" + x + "), int(" + y + "), " + state + ")\\n";
};
Blockly.Python.microbit_display_showOnPiexlbrightness = function(block) {
  var x = Blockly.Python.microbitNumberCode_(block, "X", 0);
  var y = Blockly.Python.microbitNumberCode_(block, "Y", 0);
  var brightness = Blockly.Python.microbitNumberCode_(block, "BRT", 9);
  return "display.set_pixel(int(" + x + "), int(" + y + "), " + brightness + ")\\n";
};
Blockly.Python.microbit_wireless_sendWirelessMessage = function(block) {
  Blockly.Python.imports_.radio = "import radio";
  var text = Blockly.Python.microbitTextCode_(block, "TEXT", "");
  return "radio.send(str(" + text + "))\\n";
};
Blockly.Python.microbit_wireless_setWirelessCommunicationChannel = function(block) {
  Blockly.Python.imports_.radio = "import radio";
  var channel = Blockly.Python.microbitValueOrField_(block, "CH", ["channel"], "0");
  return "radio.config(channel=int(" + channel + "))\\n";
};
Blockly.Python.microbit_console_consolePrint = function(block) {
  return "print(" + Blockly.Python.microbitTextCode_(block, "TEXT", "") + ")\\n";
};
Blockly.Python.microbit_setDigitalOutput = Blockly.Python.microbit_pin_setDigitalOutput;
Blockly.Python.microbit_setPwmOutput = Blockly.Python.microbit_pin_setPwmOutput;
Blockly.Python.microbit_show = Blockly.Python.microbit_display_show;
Blockly.Python.microbit_showUntilScrollDone = Blockly.Python.microbit_display_showUntilScrollDone;
Blockly.Python.microbit_lightPixelAt = Blockly.Python.microbit_display_lightPixelAt;
Blockly.Python.microbit_showOnPiexlbrightness = Blockly.Python.microbit_display_showOnPiexlbrightness;
Blockly.Python.microbit_sendWirelessMessage = Blockly.Python.microbit_wireless_sendWirelessMessage;
Blockly.Python.microbit_setWirelessCommunicationChannel = Blockly.Python.microbit_wireless_setWirelessCommunicationChannel;
Blockly.Python.microbit_consolePrint = Blockly.Python.microbit_console_consolePrint;
Blockly.Python.pin_setDigitalOutput = Blockly.Python.microbit_pin_setDigitalOutput;
Blockly.Python.pin_setPwmOutput = Blockly.Python.microbit_pin_setPwmOutput;
Blockly.Python.display_show = Blockly.Python.microbit_display_show;
Blockly.Python.display_showUntilScrollDone = Blockly.Python.microbit_display_showUntilScrollDone;
Blockly.Python.display_lightPixelAt = Blockly.Python.microbit_display_lightPixelAt;
Blockly.Python.display_showOnPiexlbrightness = Blockly.Python.microbit_display_showOnPiexlbrightness;
Blockly.Python.wireless_sendWirelessMessage = Blockly.Python.microbit_wireless_sendWirelessMessage;
Blockly.Python.wireless_setWirelessCommunicationChannel = Blockly.Python.microbit_wireless_setWirelessCommunicationChannel;
Blockly.Python.console_consolePrint = Blockly.Python.microbit_console_consolePrint;
`;
            fs.writeFileSync(microbitGenerator, text);
        }
        text = fs.readFileSync(microbitGenerator, 'utf8');
        if (!text.includes('__dogoblockMicrobitEventFilteringPatch')) {
            text += `

Blockly.Python.__dogoblockMicrobitEventFilteringPatch = true;
Blockly.Python.microbitHasEventBody_ = function(block) {
  return Boolean(block && block.nextConnection && block.nextConnection.targetBlock());
};
Blockly.Python.microbitEventSuffix_ = function(key) {
  var suffix = "";
  while (Blockly.Python.loops_[key + suffix]) suffix = suffix === "" ? 1 : suffix + 1;
  return suffix;
};
Blockly.Python.microbit_whenMicrobitBegin = function(block) {
  if (!Blockly.Python.microbitHasEventBody_(block)) return null;
  Blockly.Python.imports_.microbit = "from microbit import *";
  return "";
};
Blockly.Python.microbit_whenButtonPressed = function(block) {
  if (!Blockly.Python.microbitHasEventBody_(block)) return null;
  Blockly.Python.imports_.microbit = "from microbit import *";
  var key = Blockly.Python.microbitValueOrField_(block, "KEY", ["keys"], "a");
  var loopKey = "microbit_whenButtonPressed" + key;
  var suffix = Blockly.Python.microbitEventSuffix_(loopKey);
  var functionName = "on_button_" + key + suffix;
  Blockly.Python.loops_[loopKey + suffix] = "if button_" + key + ".was_pressed():\\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + functionName + "()";
  Blockly.Python.libraries_["def " + functionName] = Blockly.Python.microbitEventFunction_(block, functionName);
  return null;
};
Blockly.Python.microbit_whenPinTouched = function(block) {
  if (!Blockly.Python.microbitHasEventBody_(block)) return null;
  Blockly.Python.imports_.microbit = "from microbit import *";
  var pin = Blockly.Python.microbitValueOrField_(block, "PIN", ["touchPins"], "0");
  var loopKey = "microbit_whenPinTouched" + pin;
  var suffix = Blockly.Python.microbitEventSuffix_(loopKey);
  var functionName = "on_pin" + pin + suffix;
  Blockly.Python.loops_[loopKey + suffix] = "if pin" + pin + ".is_touched():\\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + functionName + "()";
  Blockly.Python.libraries_["def " + functionName] = Blockly.Python.microbitEventFunction_(block, functionName);
  return null;
};
Blockly.Python.microbit_whenGesture = function(block) {
  if (!Blockly.Python.microbitHasEventBody_(block)) return null;
  Blockly.Python.imports_.microbit = "from microbit import *";
  var gesture = Blockly.Python.microbitValueOrField_(block, "STA", ["gestrues"], "shake");
  var safeGesture = String(gesture).replace(/[^a-z0-9_]/gi, "_");
  var loopKey = "microbit_whenGesture" + safeGesture;
  var suffix = Blockly.Python.microbitEventSuffix_(loopKey);
  var functionName = "on_" + safeGesture + suffix;
  Blockly.Python.loops_[loopKey + suffix] = "if accelerometer.was_gesture('" + gesture + "'):\\n" +
    Blockly.Python.INDENT + Blockly.Python.INDENT + functionName + "()";
  Blockly.Python.libraries_["def " + functionName] = Blockly.Python.microbitEventFunction_(block, functionName);
  return null;
};
`;
            fs.writeFileSync(microbitGenerator, text);
        }
        text = fs.readFileSync(microbitGenerator, 'utf8');
        if (!text.includes('__dogoblockMicrobitV2InputPatch')) {
            fs.writeFileSync(microbitGenerator, text + microbitV2InputGenerators);
        }
        text = fs.readFileSync(microbitGenerator, 'utf8');
        if (!text.includes('microbit_microbit_whenLogo')) {
            fs.appendFileSync(microbitGenerator,
                '\nBlockly.Python.microbit_microbit_whenSound = Blockly.Python.microbit_whenSound;' +
                '\nBlockly.Python.microbit_microbit_whenLogo = Blockly.Python.microbit_whenLogo;\n');
        }
    }

    const compressedFile = path.join(packageDir, 'python_compressed.js');
    if (fs.existsSync(compressedFile)) {
        let text = fs.readFileSync(compressedFile, 'utf8');
        if (!text.includes('microbitIndentedEventBody_')) {
            text = text.replace(
                /Blockly\.Python\.microbitEventFunction_=Blockly\.Python\.microbitEventFunction_\|\|function\(a,b\)\{var c="def "\+b\+"\(\):\\n";[\s\S]*?return c\};/,
                'Blockly.Python.microbitIndentedEventBody_=Blockly.Python.microbitIndentedEventBody_||function(a){var b=a.nextConnection&&a.nextConnection.targetBlock();if(!b)return Blockly.Python.INDENT+"pass\\n";a=Blockly.Python.microbitGlobalVariables_();(b=Blockly.Python.blockToCode(b))||(b="pass\\n");return a+Blockly.Python.prefixLines(b,Blockly.Python.INDENT)};Blockly.Python.microbitEventFunction_=Blockly.Python.microbitEventFunction_||function(a,b){return"def "+b+"():\\n"+Blockly.Python.microbitIndentedEventBody_(a)};'
            );
            fs.writeFileSync(compressedFile, text);
        }
        if (!text.includes('__dogoblockMicrobitEventIndentPatch')) {
            text += '\nBlockly.Python.__dogoblockMicrobitEventIndentPatch=!0;Blockly.Python.microbitIndentedEventBody_=function(a){var b=a.nextConnection&&a.nextConnection.targetBlock();if(!b)return Blockly.Python.INDENT+"pass\\n";var c=Blockly.Python.microbitGlobalVariables_?Blockly.Python.microbitGlobalVariables_():"";(b=Blockly.Python.blockToCode(b))||(b="pass\\n");return c+Blockly.Python.prefixLines(b,Blockly.Python.INDENT)};Blockly.Python.microbitEventFunction_=function(a,b){return"def "+b+"():\\n"+Blockly.Python.microbitIndentedEventBody_(a)};\n';
            fs.writeFileSync(compressedFile, text);
        }
        if (!text.includes('__dogoblockMicrobitSafeCodePatch')) {
            text += '\nBlockly.Python.__dogoblockMicrobitSafeCodePatch=!0;Blockly.Python.microbitNumberCode_=function(a,b,c){return Blockly.Python.valueToCode(a,b,Blockly.Python.ORDER_FUNCTION_CALL)||String(c)};Blockly.Python.microbitTextCode_=function(a,b,c){return Blockly.Python.valueToCode(a,b,Blockly.Python.ORDER_FUNCTION_CALL)||Blockly.Python.quote_(c||"")};Blockly.Python.microbitDigitalLevelCode_=function(a){var b=Blockly.Python.valueToCode(a,"LEVEL",Blockly.Python.ORDER_FUNCTION_CALL)||a.getFieldValue("LEVEL")||Blockly.Python.microbitFieldValueFromNames_(a,["level"],"1"),c=String(b).replace(/^[\\\'"]|[\\\'"]$/g,"").toUpperCase();return"HIGH"===c||"ON"===c||"LIGADO"===c?"1":"LOW"===c||"OFF"===c||"DESLIGADO"===c?"0":b};Blockly.Python.microbit_pin_setDigitalOutput=function(a){var b=Blockly.Python.microbitValueOrField_(a,"PIN",["pins"],"0");return"pin"+b+".write_digital("+Blockly.Python.microbitDigitalLevelCode_(a)+")\\n"};Blockly.Python.microbit_pin_setPwmOutput=function(a){var b=Blockly.Python.microbitValueOrField_(a,"PIN",["pins"],"0");return"pin"+b+".write_analog("+Blockly.Python.microbitNumberCode_(a,"OUT",0)+")\\n"};Blockly.Python.microbit_display_show=function(a){a=Blockly.Python.microbitTextCode_(a,"TEXT","");return"display.scroll(str("+a+"), wait=False, loop=False)\\n"};Blockly.Python.microbit_display_showUntilScrollDone=function(a){a=Blockly.Python.microbitTextCode_(a,"TEXT","");return"display.scroll(str("+a+"), wait=True, loop=False)\\n"};Blockly.Python.microbit_display_lightPixelAt=function(a){var b="off"===Blockly.Python.microbitValueOrField_(a,"STATE",["ledState"],"on")?0:9,c=Blockly.Python.microbitNumberCode_(a,"X",0);a=Blockly.Python.microbitNumberCode_(a,"Y",0);return"display.set_pixel(int("+c+"), int("+a+"), "+b+")\\n"};Blockly.Python.microbit_display_showOnPiexlbrightness=function(a){var b=Blockly.Python.microbitNumberCode_(a,"X",0),c=Blockly.Python.microbitNumberCode_(a,"Y",0);a=Blockly.Python.microbitNumberCode_(a,"BRT",9);return"display.set_pixel(int("+b+"), int("+c+"), "+a+")\\n"};Blockly.Python.microbit_wireless_sendWirelessMessage=function(a){Blockly.Python.imports_.radio="import radio";a=Blockly.Python.microbitTextCode_(a,"TEXT","");return"radio.send(str("+a+"))\\n"};Blockly.Python.microbit_wireless_setWirelessCommunicationChannel=function(a){Blockly.Python.imports_.radio="import radio";a=Blockly.Python.microbitValueOrField_(a,"CH",["channel"],"0");return"radio.config(channel=int("+a+"))\\n"};Blockly.Python.microbit_console_consolePrint=function(a){return"print("+Blockly.Python.microbitTextCode_(a,"TEXT","")+")\\n"};Blockly.Python.microbit_setDigitalOutput=Blockly.Python.microbit_pin_setDigitalOutput;Blockly.Python.microbit_setPwmOutput=Blockly.Python.microbit_pin_setPwmOutput;Blockly.Python.microbit_show=Blockly.Python.microbit_display_show;Blockly.Python.microbit_showUntilScrollDone=Blockly.Python.microbit_display_showUntilScrollDone;Blockly.Python.microbit_lightPixelAt=Blockly.Python.microbit_display_lightPixelAt;Blockly.Python.microbit_showOnPiexlbrightness=Blockly.Python.microbit_display_showOnPiexlbrightness;Blockly.Python.microbit_sendWirelessMessage=Blockly.Python.microbit_wireless_sendWirelessMessage;Blockly.Python.microbit_setWirelessCommunicationChannel=Blockly.Python.microbit_wireless_setWirelessCommunicationChannel;Blockly.Python.microbit_consolePrint=Blockly.Python.microbit_console_consolePrint;Blockly.Python.pin_setDigitalOutput=Blockly.Python.microbit_pin_setDigitalOutput;Blockly.Python.pin_setPwmOutput=Blockly.Python.microbit_pin_setPwmOutput;Blockly.Python.display_show=Blockly.Python.microbit_display_show;Blockly.Python.display_showUntilScrollDone=Blockly.Python.microbit_display_showUntilScrollDone;Blockly.Python.display_lightPixelAt=Blockly.Python.microbit_display_lightPixelAt;Blockly.Python.display_showOnPiexlbrightness=Blockly.Python.microbit_display_showOnPiexlbrightness;Blockly.Python.wireless_sendWirelessMessage=Blockly.Python.microbit_wireless_sendWirelessMessage;Blockly.Python.wireless_setWirelessCommunicationChannel=Blockly.Python.microbit_wireless_setWirelessCommunicationChannel;Blockly.Python.console_consolePrint=Blockly.Python.microbit_console_consolePrint;\n';
            fs.writeFileSync(compressedFile, text);
        }
        text = fs.readFileSync(compressedFile, 'utf8');
        if (!text.includes('__dogoblockMicrobitEventFilteringPatch')) {
            text += '\nBlockly.Python.__dogoblockMicrobitEventFilteringPatch=!0;Blockly.Python.microbitHasEventBody_=function(a){return!!(a&&a.nextConnection&&a.nextConnection.targetBlock())};Blockly.Python.microbitEventSuffix_=function(a){for(var b="";Blockly.Python.loops_[a+b];)b=""===b?1:b+1;return b};Blockly.Python.microbit_whenMicrobitBegin=function(a){if(!Blockly.Python.microbitHasEventBody_(a))return null;Blockly.Python.imports_.microbit="from microbit import *";return""};Blockly.Python.microbit_whenButtonPressed=function(a){if(!Blockly.Python.microbitHasEventBody_(a))return null;Blockly.Python.imports_.microbit="from microbit import *";var b=Blockly.Python.microbitValueOrField_(a,"KEY",["keys"],"a"),c="microbit_whenButtonPressed"+b,d=Blockly.Python.microbitEventSuffix_(c),e="on_button_"+b+d;Blockly.Python.loops_[c+d]="if button_"+b+".was_pressed():\\n"+Blockly.Python.INDENT+Blockly.Python.INDENT+e+"()";Blockly.Python.libraries_["def "+e]=Blockly.Python.microbitEventFunction_(a,e);return null};Blockly.Python.microbit_whenPinTouched=function(a){if(!Blockly.Python.microbitHasEventBody_(a))return null;Blockly.Python.imports_.microbit="from microbit import *";var b=Blockly.Python.microbitValueOrField_(a,"PIN",["touchPins"],"0"),c="microbit_whenPinTouched"+b,d=Blockly.Python.microbitEventSuffix_(c),e="on_pin"+b+d;Blockly.Python.loops_[c+d]="if pin"+b+".is_touched():\\n"+Blockly.Python.INDENT+Blockly.Python.INDENT+e+"()";Blockly.Python.libraries_["def "+e]=Blockly.Python.microbitEventFunction_(a,e);return null};Blockly.Python.microbit_whenGesture=function(a){if(!Blockly.Python.microbitHasEventBody_(a))return null;Blockly.Python.imports_.microbit="from microbit import *";var b=Blockly.Python.microbitValueOrField_(a,"STA",["gestrues"],"shake"),c=String(b).replace(/[^a-z0-9_]/gi,"_"),d="microbit_whenGesture"+c,e=Blockly.Python.microbitEventSuffix_(d),f="on_"+c+e;Blockly.Python.loops_[d+e]="if accelerometer.was_gesture(\\\'"+b+"\\\'):\\n"+Blockly.Python.INDENT+Blockly.Python.INDENT+f+"()";Blockly.Python.libraries_["def "+f]=Blockly.Python.microbitEventFunction_(a,f);return null};\n';
            fs.writeFileSync(compressedFile, text);
        }
        const compressedImagePatch = '\nBlockly.Python.microbitImageValue_=Blockly.Python.microbitImageValue_||function(a){' +
            'a=String(a||"0");' +
            'var b=a.charCodeAt(0),c=a.charCodeAt(a.length-1);' +
            'if(39===b&&39===c||34===b&&34===c)a=a.slice(1,-1);' +
            'a=a.replace(/[^01]/g,"");' +
            '25>a.length?a=(a+"0000000000000000000000000").slice(0,25):25<a.length&&(a=a.slice(0,25));' +
            'a=a.replace(/1/g,"9");' +
            'return a.slice(0,5)+":"+a.slice(5,10)+":"+a.slice(10,15)+":"+a.slice(15,20)+":"+a.slice(20,25)};' +
            'Blockly.Python.microbit_display_showImage=function(a){' +
            'a=Blockly.Python.microbitImageValue_(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_ATOMIC)||"0");' +
            'return"display.show(Image(\\\'"+a+"\\\'))\\\\n"};' +
            'Blockly.Python.microbit_display_showImageUntil=function(a){' +
            'var b=Blockly.Python.microbitImageValue_(Blockly.Python.valueToCode(a,"VALUE",Blockly.Python.ORDER_ATOMIC)||"0");' +
            'a=Blockly.Python.valueToCode(a,"TIME",Blockly.Python.ORDER_ATOMIC)||"0";' +
            'return"display.show(Image(\\\'"+b+"\\\'))\\\\nsleep(float("+a+") * 1000)\\\\ndisplay.clear()\\\\n"};\n';
        if (!text.includes('microbitImageValue_')) {
            text += compressedImagePatch;
            fs.writeFileSync(compressedFile, text);
        } else if (text.includes('if("\\\'"===a.charAt(0)')) {
            const patchIndex = text.indexOf('\nBlockly.Python.microbitImageValue_=');
            if (patchIndex < 0) {
                throw new Error(`Could not repair openblock-blocks Python image patch: ${compressedFile}`);
            }
            text = text.slice(0, patchIndex) + compressedImagePatch;
            fs.writeFileSync(compressedFile, text);
        }
        text = fs.readFileSync(compressedFile, 'utf8');
        if (!text.includes('__dogoblockMicrobitV2InputPatch')) {
            fs.writeFileSync(compressedFile, text + microbitV2InputGenerators);
        }
        text = fs.readFileSync(compressedFile, 'utf8');
        if (!text.includes('microbit_microbit_whenLogo')) {
            fs.appendFileSync(compressedFile,
                '\nBlockly.Python.microbit_microbit_whenSound=Blockly.Python.microbit_whenSound;' +
                'Blockly.Python.microbit_microbit_whenLogo=Blockly.Python.microbit_whenLogo;\n');
        }
    }

    console.log(`Applied openblock-blocks micro:bit Python event patch: ${packageDir}`);
};

const patchOpenBlockBlocksMicrobitPythonEvents = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-blocks'),
        path.join(root, '.openblock-vm', 'node_modules', 'openblock-blocks')
    ].forEach(patchOpenBlockBlocksMicrobitPythonEventsPackage);
};

const patchOpenBlockVmKeyReleasedPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const keyboardFile = path.join(packageDir, 'src', 'io', 'keyboard.js');
    if (fs.existsSync(keyboardFile)) {
        const before = fs.readFileSync(keyboardFile, 'utf8');
        if (!before.includes("KEY_RELEASED")) {
            fs.writeFileSync(keyboardFile, before.replace(
                'this._keysPressed.splice(index, 1);',
                "this._keysPressed.splice(index, 1);\n            this.runtime.emit('KEY_RELEASED', scratchKey);"
            ));
        }
    }

    const eventFile = path.join(packageDir, 'src', 'blocks', 'scratch3_event.js');
    if (fs.existsSync(eventFile)) {
        let text = fs.readFileSync(eventFile, 'utf8');
        if (!text.includes("KEY_RELEASED")) {
            text = text.replace(
                "        });\n    }\n\n    /**\n",
                "        });\n\n        this.runtime.on('KEY_RELEASED', key => {\n            this.runtime.startHats('event_whenkeyreleased', {\n                KEY_OPTION: key\n            });\n            this.runtime.startHats('event_whenkeyreleased', {\n                KEY_OPTION: 'any'\n            });\n        });\n    }\n\n    /**\n"
            );
        }
        if (!text.includes("event_whenkeyreleased:")) {
            text = text.replace(
                "            event_whenkeypressed: {\n                restartExistingThreads: false\n            },",
                "            event_whenkeypressed: {\n                restartExistingThreads: false\n            },\n            event_whenkeyreleased: {\n                restartExistingThreads: false\n            },"
            );
        }
        fs.writeFileSync(eventFile, text);
    }

    console.log(`Applied openblock-vm key released event patch: ${packageDir}`);
};

const patchOpenBlockVmKeyReleased = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmKeyReleasedPackage);
};

const patchOpenBlockVmArduinoNanoUploadPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const nanoFile = path.join(packageDir, 'src', 'devices', 'arduinoUno', 'arduinoNano.js');
    if (!fs.existsSync(nanoFile)) return;

    const before = fs.readFileSync(nanoFile, 'utf8');
    let after = before;

    after = after.replace(
        "fqbn: 'arduino:avr:nano:cpu=atmega328old',\n    uploadFallbackFqbns: ['arduino:avr:nano'],",
        "fqbn: 'arduino:avr:nano',\n    uploadFallbackFqbns: ['arduino:avr:nano:cpu=atmega328old'],"
    );

    after = after.replace(
        "fqbn: 'arduino:avr:nano:cpu=atmega328old',\n    firmware: 'arduinoUnoUltra.hex'",
        "fqbn: 'arduino:avr:nano',\n    uploadFallbackFqbns: ['arduino:avr:nano:cpu=atmega328old'],\n    firmware: 'arduinoUnoUltra.hex'"
    );

    if (after !== before) {
        fs.writeFileSync(nanoFile, after);
        console.log(`Applied openblock-vm Arduino Nano upload fallback patch: ${packageDir}`);
    } else if (after.includes("fqbn: 'arduino:avr:nano'")) {
        console.log(`openblock-vm Arduino Nano upload fallback patch already applied: ${packageDir}`);
    }
};

const patchOpenBlockVmArduinoNanoUpload = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmArduinoNanoUploadPackage);
};

const patchOpenBlockVmArduinoDiscoveryPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const nanoFile = path.join(packageDir, 'src', 'devices', 'arduinoUno', 'arduinoNano.js');
    const webSerialFile = path.join(packageDir, 'src', 'util', 'scratch-link-web-serial.js');
    let changed = false;

    if (fs.existsSync(nanoFile)) {
        const before = fs.readFileSync(nanoFile, 'utf8');
        let after = before;
        const knownIds = [
            "'*'",
            "'USB\\\\VID_1A86&PID_55D3'",
            "'USB\\\\VID_067B&PID_2303'",
            "'USB\\\\VID_0403&PID_6010'"
        ];

        if (!after.includes("'*'")) {
            after = after.replace(
                'const PNPID_LIST = [\n',
                "const PNPID_LIST = [\n    // Nano clones use many USB-serial chips. Some drivers do not report a\n" +
                    "    // stable VID/PID, so show all serial ports and let the user pick the Nano.\n" +
                    "    '*',\n"
            );
        }

        for (const id of knownIds) {
            if (!after.includes(id) && id !== "'*'") {
                after = after.replace(
                    "    'USB\\\\VID_1A86&PID_7523',",
                    `    'USB\\\\VID_1A86&PID_7523',\n    ${id},`
                );
            }
        }

        if (after !== before) {
            fs.writeFileSync(nanoFile, after);
            changed = true;
        }
    }

    if (fs.existsSync(webSerialFile)) {
        const before = fs.readFileSync(webSerialFile, 'utf8');
        const after = before.replace(
            "const allowAnyPort = params.deviceId === 'arduinoNano';",
            "const allowAnyPort = ['arduinoUno', 'arduinoNano'].includes(params.deviceId);"
        );
        if (after !== before) {
            fs.writeFileSync(webSerialFile, after);
            changed = true;
        }
    }

    if (changed) {
        console.log(`Applied openblock-vm Arduino discovery patch: ${packageDir}`);
    } else if (
        (!fs.existsSync(nanoFile) || fs.readFileSync(nanoFile, 'utf8').includes("'*'")) &&
        (!fs.existsSync(webSerialFile) ||
            fs.readFileSync(webSerialFile, 'utf8').includes("['arduinoUno', 'arduinoNano']"))
    ) {
        console.log(`openblock-vm Arduino discovery patch already applied: ${packageDir}`);
    }
};

const patchOpenBlockVmArduinoDiscovery = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmArduinoDiscoveryPackage);
};

const patchOpenBlockVmLinkPortPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const websocketFile = path.join(packageDir, 'src', 'util', 'scratch-link-websocket.js');
    if (!fs.existsSync(websocketFile)) return;

    const before = fs.readFileSync(websocketFile, 'utf8');
    let after = before;

    if (!after.includes('_getServerUrl (path)')) {
        after = after.replace(
            '        this._ws = null;\n    }\n\n    open () {',
            '        this._ws = null;\n    }\n\n' +
                '    _getServerUrl (path) {\n' +
                "        const envPort = typeof process !== 'undefined' && process.env ?\n" +
                '            process.env.OPENBLOCK_LINK_PORT :\n' +
                '            null;\n' +
                "        const port = envPort || '20111';\n" +
                '        return `ws://127.0.0.1:${port}${path}`;\n' +
                '    }\n\n' +
                '    open () {'
        );
    }

    after = after
        .replace(
            "new WebSocket('ws://127.0.0.1:20111/openblock/ble')",
            "new WebSocket(this._getServerUrl('/openblock/ble'))"
        )
        .replace(
            "new WebSocket('ws://127.0.0.1:20111/openblock/bt')",
            "new WebSocket(this._getServerUrl('/openblock/bt'))"
        )
        .replace(
            "new WebSocket('ws://127.0.0.1:20111/openblock/serialport')",
            "new WebSocket(this._getServerUrl('/openblock/serialport'))"
        );

    if (after !== before) {
        fs.writeFileSync(websocketFile, after);
        console.log(`Applied openblock-vm configurable Link port patch: ${packageDir}`);
    } else if (after.includes('_getServerUrl (path)')) {
        console.log(`openblock-vm configurable Link port patch already applied: ${packageDir}`);
    }
};

const patchOpenBlockVmLinkPort = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmLinkPortPackage);
};

const webSerialUploadStk500Method = `    _uploadStk500v1 (params) {
        const hex = this._decodeTextMessage(params.message, params.encoding);
        const config = params.config || {};
        const fqbn = config.fqbn || '';
        if (!/arduino:avr:(uno|nano)/.test(fqbn)) {
            throw new Error('Web Serial upload currently supports only Arduino Uno and Nano.');
        }
        if (!this._port) {
            throw new Error('Serial port is not connected');
        }

        const isNano = fqbn.indexOf('nano') !== -1;
        const isOldNanoBootloader = fqbn.indexOf('atmega328old') !== -1;
        const uploadBaudRates = isNano && isOldNanoBootloader ? [57600, 115200] :
            (isNano ? [115200, 57600] : [115200]);
        const pages = this._hexToPages(hex, 128);
        const port = this._port;
        const portId = this._portId;
        this._sendUploadStdout('Compilado recebido. Iniciando gravação Web Serial...\\\\n');

        return this._disconnectPort()
            .then(() => this._tryUploadBaudRates(port, portId, pages, uploadBaudRates))
            .then(() => {
                this._sendUploadStdout('Gravação concluída.\\\\n');
                return this._reopenAfterUpload(port, portId);
            });
    }

    _tryUploadBaudRates (port, portId, pages, baudRates, index = 0) {
        const baudRate = baudRates[index];
        this._sendUploadStdout(\`Tentando bootloader em \${baudRate} bps...\\\\n\`);
        return this._uploadWithBaudRate(port, portId, pages, baudRate)
            .catch(error => this._closeUploadPort(port)
                .then(() => {
                    if (index + 1 >= baudRates.length) {
                        throw error;
                    }
                    this._sendUploadStdout(
                        \`Bootloader nao respondeu em \${baudRate} bps. Tentando outro modo...\\\\n\`
                    );
                    return this._sleep(450)
                        .then(() => this._tryUploadBaudRates(port, portId, pages, baudRates, index + 1));
                })
            );
    }

    _uploadWithBaudRate (port, portId, pages, baudRate) {
        return this._sleep(250)
            .then(() => port.open({
                baudRate,
                dataBits: 8,
                stopBits: 1
            }))
            .then(() => {
                this._port = port;
                this._portId = portId || 'webserial:upload';
                return this._resetAvrBootloader(port);
            })
            .then(() => this._createStk500Session(port))
            .then(session => this._syncStk500(session)
                .then(() => this._programPages(session, pages))
                .then(() => this._leaveProgrammingMode(session))
                .finally(() => session.close())
            );
    }

    _closeUploadPort (port) {
        this._port = null;
        this._portId = null;
        if (!port) return Promise.resolve(null);
        return port.close()
            .catch(() => null)
            .then(() => null);
    }

`;

const patchOpenBlockVmWebSerialUploadPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const webSerialFile = path.join(packageDir, 'src', 'util', 'scratch-link-web-serial.js');
    if (!fs.existsSync(webSerialFile)) return;

    const before = fs.readFileSync(webSerialFile, 'utf8');
    let after = before;

    if (!after.includes('_tryUploadBaudRates')) {
        const start = after.indexOf('    _uploadStk500v1 (params) {');
        const end = after.indexOf('    _reopenAfterUpload (port, portId) {');
        if (start !== -1 && end !== -1 && end > start) {
            after = after.slice(0, start) + webSerialUploadStk500Method + after.slice(end);
        }
    }

    after = after.replace(
        'const uploadBaudRates = isNano ? [57600, 115200] : [115200];',
        "const isOldNanoBootloader = fqbn.indexOf('atmega328old') !== -1;\n" +
        '        const uploadBaudRates = isNano && isOldNanoBootloader ? [57600, 115200] :\n' +
        '            (isNano ? [115200, 57600] : [115200]);'
    );

    after = after.replace(
        "return port.setSignals({dataTerminalReady: true, requestToSend: true})\n" +
        '            .catch(() => null)\n' +
        '            .then(() => this._sleep(60))\n' +
        '            .then(() => port.setSignals({dataTerminalReady: false, requestToSend: false}).catch(() => null))\n' +
        '            .then(() => this._sleep(120))\n' +
        '            .then(() => port.setSignals({dataTerminalReady: true, requestToSend: true}).catch(() => null))\n' +
        '            .then(() => this._sleep(650));',
        "return port.setSignals({dataTerminalReady: true, requestToSend: true})\n" +
        '            .catch(() => null)\n' +
        '            .then(() => this._sleep(80))\n' +
        '            .then(() => port.setSignals({dataTerminalReady: false, requestToSend: false}).catch(() => null))\n' +
        '            .then(() => this._sleep(250))\n' +
        '            .then(() => port.setSignals({dataTerminalReady: true, requestToSend: true}).catch(() => null))\n' +
        '            .then(() => this._sleep(450));'
    );

    if (!after.includes('const readInsync = (attempts = 24) => readByte(250)')) {
        after = after.replace(
            '        const expectOk = () => readByte()\n' +
            '            .then(insync => {\n' +
            '                if (insync !== 0x14) {\n' +
            '                    throw new Error(`Unexpected bootloader response: 0x${insync.toString(16)}`);\n' +
            '                }\n' +
            '                return readByte();\n' +
            '            })\n' +
            '            .then(ok => {\n' +
            '                if (ok !== 0x10) {\n' +
            '                    throw new Error(`Bootloader command failed: 0x${ok.toString(16)}`);\n' +
            '                }\n' +
            '                return null;\n' +
            '            });',
            '        const readInsync = (attempts = 24) => readByte(250)\n' +
            '            .then(insync => {\n' +
            '                if (insync === 0x14) {\n' +
            '                    return insync;\n' +
            '                }\n' +
            '                if (attempts <= 0) {\n' +
            '                    throw new Error(`Unexpected bootloader response: 0x${insync.toString(16)}`);\n' +
            '                }\n' +
            '                return readInsync(attempts - 1);\n' +
            '            });\n' +
            '        const expectOk = () => readInsync()\n' +
            '            .then(ok => {\n' +
            '                if (ok !== 0x14) {\n' +
            '                    throw new Error(`Unexpected bootloader response: 0x${ok.toString(16)}`);\n' +
            '                }\n' +
            '                return readByte();\n' +
            '            })\n' +
            '            .then(ok => {\n' +
            '                if (ok === 0x10) {\n' +
            '                    return null;\n' +
            '                }\n' +
            '                throw new Error(`Bootloader command failed: 0x${ok.toString(16)}`);\n' +
            '            });'
        );
    }

    if (after !== before) {
        fs.writeFileSync(webSerialFile, after);
        console.log(`Applied openblock-vm Web Serial upload patch: ${packageDir}`);
    } else if (after.includes('const readInsync = (attempts = 24) => readByte(250)')) {
        console.log(`openblock-vm Web Serial upload patch already applied: ${packageDir}`);
    }
};

const patchOpenBlockVmWebSerialUpload = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmWebSerialUploadPackage);
};

const patchOpenBlockVmCompiledArtifactUploadPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const peripheralFile = path.join(packageDir, 'src', 'devices', 'common', 'arduino-peripheral.js');
    if (!fs.existsSync(peripheralFile)) return;
    let source = fs.readFileSync(peripheralFile, 'utf8');
    if (source.includes("artifactType: 'compiledArtifact'")) {
        console.log(`openblock-vm compiled artifact upload patch already applied: ${packageDir}`);
        return;
    }

    const uploadCallPattern =
        /(\s*)return this\._serialport\.upload\(artifact,\s*this\.(diveceOpt|deviceOpt),\s*encoding(?:,\s*options)?\);/;
    const uploadCallMatch = source.match(uploadCallPattern);
    const after = "        const uploadOptions = Object.assign({artifactType: 'compiledArtifact'}, options || {});\n" +
        '        return this._serialport.upload(artifact, this.$DEVICE_OPT, encoding, uploadOptions);';
    if (!uploadCallMatch) {
        console.warn(`Could not apply openblock-vm compiled artifact upload patch; upload call was not found: ${peripheralFile}`);
        return;
    }
    source = source.replace(uploadCallPattern, after.replace('$DEVICE_OPT', uploadCallMatch[2]));
    fs.writeFileSync(peripheralFile, source);
    console.log(`Applied openblock-vm compiled artifact upload patch: ${packageDir}`);
};

const patchOpenBlockVmCompiledArtifactUpload = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmCompiledArtifactUploadPackage);
};

const microbitBleWatchdogMethod = `    _handleDataTimeout () {
        if (!this._ble || !this._ble.isConnected()) return;

        this._missedDataTimeouts++;
        if (this._missedDataTimeouts >= BLEDataTimeoutLimit) {
            this._ble.handleDisconnectError(BLEDataStoppedError);
            return;
        }

        this._timeoutID = window.setTimeout(
            this._handleDataTimeout,
            BLETimeout
        );
    }

`;

const patchOpenBlockVmMicrobitBleWatchdogPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const microbitBleFile = path.join(packageDir, 'src', 'extensions', 'scratch3_microbit_ble', 'index.js');
    if (!fs.existsSync(microbitBleFile)) return;

    const before = fs.readFileSync(microbitBleFile, 'utf8');
    let after = before;

    after = after.replace(
        'const BLETimeout = 8000;',
        'const BLETimeout = 15000;\n\n' +
        '/**\n' +
        ' * Number of missed sensor packet windows tolerated before treating the\n' +
        ' * connection as lost. The Link will still report real disconnects immediately.\n' +
        ' */\n' +
        'const BLEDataTimeoutLimit = 4;'
    );

    after = after.replace(
        '        this._sendQueue = Promise.resolve();\n\n' +
        '        this.reset = this.reset.bind(this);',
        '        this._sendQueue = Promise.resolve();\n' +
        '        this._missedDataTimeouts = 0;\n\n' +
        '        this.reset = this.reset.bind(this);'
    );

    if (!after.includes('this._missedDataTimeouts = 0;\n\n        this.reset = this.reset.bind(this);')) {
        after = after.replace(
            '        this._busyTimeoutID = null;\n\n' +
            '        this.reset = this.reset.bind(this);',
            '        this._busyTimeoutID = null;\n' +
            '        this._sendQueue = Promise.resolve();\n' +
            '        this._missedDataTimeouts = 0;\n\n' +
            '        this.reset = this.reset.bind(this);'
        );
    }

    if (!after.includes('this._handleDataTimeout = this._handleDataTimeout.bind(this);')) {
        after = after.replace(
            '        this._onMessage = this._onMessage.bind(this);\n',
            '        this._onMessage = this._onMessage.bind(this);\n' +
            '        this._handleDataTimeout = this._handleDataTimeout.bind(this);\n'
        );
    }

    after = after.replace(
        '            this._timeoutID = null;\n' +
        '        }\n' +
        '    }\n',
        '            this._timeoutID = null;\n' +
        '        }\n' +
        '        this._missedDataTimeouts = 0;\n' +
        '        this._sendQueue = Promise.resolve();\n' +
        '    }\n'
    );

    after = after.replace(
        '            .then(() => {\n' +
        '                this._timeoutID = window.setTimeout(\n' +
        '                    () => this._ble.handleDisconnectError(BLEDataStoppedError),\n' +
        '                    BLETimeout\n' +
        '                );\n' +
        '            })',
        '            .then(() => {\n' +
        '                this._missedDataTimeouts = 0;\n' +
        '                this._timeoutID = window.setTimeout(\n' +
        '                    this._handleDataTimeout,\n' +
        '                    BLETimeout\n' +
        '                );\n' +
        '            })'
    );

    after = after.replace(
        '        // cancel disconnect timeout and start a new one\n' +
        '        window.clearTimeout(this._timeoutID);\n' +
        '        this._timeoutID = window.setTimeout(\n' +
        '            () => this._ble.handleDisconnectError(BLEDataStoppedError),\n' +
        '            BLETimeout\n' +
        '        );\n' +
        '    }\n\n' +
        '    /**\n' +
        '     * @param {number} pin - the pin to check touch state.',
        '        // cancel disconnect timeout and start a new one\n' +
        '        this._missedDataTimeouts = 0;\n' +
        '        window.clearTimeout(this._timeoutID);\n' +
        '        this._timeoutID = window.setTimeout(\n' +
        '            this._handleDataTimeout,\n' +
        '            BLETimeout\n' +
        '        );\n' +
        '    }\n\n' +
        microbitBleWatchdogMethod +
        '    /**\n' +
        '     * @param {number} pin - the pin to check touch state.'
    );

    if (after !== before) {
        fs.writeFileSync(microbitBleFile, after);
        console.log(`Applied openblock-vm micro:bit BLE watchdog patch: ${packageDir}`);
    } else if (after.includes('const BLEDataTimeoutLimit = 4') && after.includes('_handleDataTimeout')) {
        console.log(`openblock-vm micro:bit BLE watchdog patch already applied: ${packageDir}`);
    }
};

const patchOpenBlockVmMicrobitBleWatchdog = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmMicrobitBleWatchdogPackage);
};

const patchOpenBlockVmWebpackHashPackage = packageDir => {
    const webpackConfig = path.join(packageDir, 'webpack.config.js');
    if (!fs.existsSync(webpackConfig)) return;

    let text = fs.readFileSync(webpackConfig, 'utf8');
    if (text.includes("hashFunction: 'sha256'")) {
        console.log(`openblock-vm webpack hash patch already applied: ${packageDir}`);
        return;
    }

    const before = text;
    text = text.replace(
        `    output: {
        library: 'VirtualMachine',
        filename: '[name].js'
    },`,
        `    output: {
        library: 'VirtualMachine',
        filename: '[name].js',
        hashFunction: 'sha256'
    },`
    );

    if (text === before) {
        throw new Error(`Could not patch openblock-vm webpack hash: ${webpackConfig}`);
    }

    fs.writeFileSync(webpackConfig, text);
    console.log(`Applied openblock-vm webpack hash patch: ${packageDir}`);
};

const patchOpenBlockVmWebpackHash = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmWebpackHashPackage);
};

const patchOpenBlockVmWebpackCreateHashPackage = packageDir => {
    const createHashFile = path.join(packageDir, 'node_modules', 'webpack', 'lib', 'util', 'createHash.js');
    if (!fs.existsSync(createHashFile)) return;

    let text = fs.readFileSync(createHashFile, 'utf8');
    if (text.includes('algorithm === "md4"')) {
        console.log(`openblock-vm webpack createHash patch already applied: ${packageDir}`);
        return;
    }

    const before = text;
    text = text.replace(
        'module.exports = algorithm => {\n\tif (typeof algorithm === "function") {',
        'module.exports = algorithm => {\n\tif (algorithm === "md4") algorithm = "sha256";\n\tif (typeof algorithm === "function") {'
    );

    if (text === before) {
        throw new Error(`Could not patch webpack createHash: ${createHashFile}`);
    }

    fs.writeFileSync(createHashFile, text);
    console.log(`Applied openblock-vm webpack createHash patch: ${packageDir}`);
};

const patchOpenBlockVmWebpackCreateHash = () => {
    [
        path.join(dependencyRoot, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmWebpackCreateHashPackage);
};

const patchOpenBlockL10nKeyReleasedPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    [
        ['pt-br.json', 'quando a tecla %1 for solta'],
        ['pt.json', 'Quando alguém soltar a tecla %1']
    ].forEach(([fileName, value]) => {
        const file = path.join(packageDir, 'editor', 'blocks', fileName);
        if (!fs.existsSync(file)) return;
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        data.EVENT_WHENKEYRELEASED = value;
        fs.writeFileSync(file, `${JSON.stringify(data, null, 4)}\n`);
    });

    const blocksMsgsFile = path.join(packageDir, 'locales', 'blocks-msgs.js');
    if (fs.existsSync(blocksMsgsFile)) {
        let text = fs.readFileSync(blocksMsgsFile, 'utf8');
        if (!text.includes('"EVENT_WHENKEYRELEASED": "when %1 key released"')) {
            text = text.replace(
                '"EVENT_WHENKEYPRESSED": "when %1 key pressed",',
                '"EVENT_WHENKEYPRESSED": "when %1 key pressed",\n    "EVENT_WHENKEYRELEASED": "when %1 key released",'
            );
        }
        if (!text.includes('"EVENT_WHENKEYRELEASED": "quando a tecla %1 for solta"')) {
            text = text.replace(
                '"EVENT_WHENKEYPRESSED": "quando a tecla %1 for pressionada",',
                '"EVENT_WHENKEYPRESSED": "quando a tecla %1 for pressionada",\n    "EVENT_WHENKEYRELEASED": "quando a tecla %1 for solta",'
            );
        }
        if (!text.includes('"EVENT_WHENKEYRELEASED": "Quando alguém soltar a tecla %1"')) {
            text = text.replace(
                '"EVENT_WHENKEYPRESSED": "Quando alguém pressionar a tecla %1",',
                '"EVENT_WHENKEYPRESSED": "Quando alguém pressionar a tecla %1",\n    "EVENT_WHENKEYRELEASED": "Quando alguém soltar a tecla %1",'
            );
        }
        fs.writeFileSync(blocksMsgsFile, text);
    }

    console.log(`Applied openblock-l10n key released event patch: ${packageDir}`);
};

const patchOpenBlockL10nKeyReleased = () => {
    dependencyPackageDirs('openblock-l10n').forEach(patchOpenBlockL10nKeyReleasedPackage);
};

const patchOpenBlockL10nLostConnectionBrandingPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    writeJsonValues(
        path.join(packageDir, 'editor', 'interface', 'pt-br.json'),
        {
            'gui.alerts.lostPeripheralConnection': 'O DoGo Block perdeu a conexão com {extensionName}.'
        }
    );
    writeJsonValues(
        path.join(packageDir, 'editor', 'interface', 'pt.json'),
        {
            'gui.alerts.lostPeripheralConnection': 'O DoGo Block perdeu a ligação a {extensionName}.'
        }
    );

    console.log(`Applied openblock-l10n lost connection branding patch: ${packageDir}`);
};

const patchOpenBlockL10nLostConnectionBranding = () => {
    dependencyPackageDirs('openblock-l10n').forEach(patchOpenBlockL10nLostConnectionBrandingPackage);
};

const microbitBleBlockTranslationsPtBr = {
    'microbit.buttonsMenu.any': 'qualquer',
    'microbit.gesturesMenu.moved': 'movido',
    'microbit.gesturesMenu.shaken': 'sacudido',
    'microbit.gesturesMenu.jumped': 'queda livre',
    'microbit.pinStateMenu.on': 'ligado',
    'microbit.pinStateMenu.off': 'desligado',
    'microbit.tiltDirectionMenu.front': 'para frente',
    'microbit.tiltDirectionMenu.back': 'para trás',
    'microbit.tiltDirectionMenu.left': 'para esquerda',
    'microbit.tiltDirectionMenu.right': 'para direita',
    'microbit.tiltDirectionMenu.any': 'qualquer direção',
    'microbitBle.uploadBleFirmware': 'enviar firmware Bluetooth',
    'microbit.whenButtonPressed': 'quando o botão [BTN] for pressionado',
    'microbit.isButtonPressed': 'botão [BTN] pressionado?',
    'microbit.whenGesture': 'quando [GESTURE]',
    'microbit.displaySymbol': 'mostrar [MATRIX]',
    'microbit.displayText': 'mostrar texto [TEXT]',
    'microbit.defaultTextToDisplay': 'Olá!',
    'microbit.clearDisplay': 'limpar tela',
    'microbit.whenTilted': 'quando inclinar [DIRECTION]',
    'microbit.isTilted': 'inclinado [DIRECTION]?',
    'microbit.tiltAngle': 'ângulo de inclinação [DIRECTION]',
    'microbit.whenPinConnected': 'quando o pino [PIN] for tocado',
    'microbit.isPinConnected': 'pino [PIN] tocado?',
    'microbit.pinValue': 'valor do pino [PIN]',
    'microbit.setPinValue': 'definir pino [PIN] para [VALUE]',
    'microbit.setPwmValue': 'definir PWM do pino [PIN] para [VALUE]',
    'microbit.analogPinValue': 'valor analógico do pino [PIN]',
    'microbit.acceleration': 'aceleração [AXIS]',
    'microbit.temperature': 'temperatura',
    'microbit.lightLevel': 'nível de luz',
    'microbit.runningTime': 'tempo ligado',
    'microbit.ledState.on': 'ligado',
    'microbit.ledState.off': 'desligado',
    'microbit.gestruesMenu.shaken': 'sacudido',
    'microbit.gestruesMenu.tiltedUpward': 'inclinado para cima',
    'microbit.gestruesMenu.tiltedDownward': 'inclinado para baixo',
    'microbit.gestruesMenu.tiltedLeftward': 'inclinado para a esquerda',
    'microbit.gestruesMenu.tiltedRightward': 'inclinado para a direita',
    'microbit.gestruesMenu.faceUp': 'virado para cima',
    'microbit.gestruesMenu.faceDown': 'virado para baixo',
    'microbit.gestruesMenu.freefall': 'queda livre',
    'microbit.axisMenu.xAxis': 'eixo X',
    'microbit.axisMenu.yAxis': 'eixo Y',
    'microbit.axisMenu.zAxis': 'eixo Z',
    'microbit.levelMenu.high': 'ligado',
    'microbit.levelMenu.low': 'desligado',
    'microbit.category.pins': 'Pinos',
    'microbit.pins.setDigitalOutput': 'definir pino digital [PIN] para [LEVEL]',
    'microbit.pins.setPwmOutput': 'definir PWM do pino [PIN] para [OUT]',
    'microbit.pins.readDigitalPin': 'ler pino digital [PIN]',
    'microbit.pins.readAnalogPin': 'ler pino analógico [PIN]',
    'microbit.pins.pinIsTouched': 'pino [PIN] tocado?',
    'microbit.category.display': 'Tela',
    'microbit.display.showImage': 'mostrar desenho [VALUE]',
    'microbit.display.showImageUntil': 'mostrar desenho [VALUE] por [TIME] segundos',
    'microbit.display.show': 'mostrar texto [TEXT]',
    'microbit.display.showUntilScrollDone': 'mostrar texto [TEXT] até terminar',
    'microbit.display.clearDisplay': 'limpar tela',
    'microbit.display.lightPixelAt': 'definir LED em x [X] y [Y] para [STATE]',
    'microbit.display.showOnPiexlbrightness': 'mostrar LED em x [X] y [Y] com brilho [BRT]',
    'microbit.category.sensor': 'Sensores',
    'microbit.sensor.buttonIsPressed': 'botão [KEY] pressionado?',
    'microbit.sensor.gestureIsX': 'gesto é [STA]?',
    'microbit.sensor.axisAcceleration': 'aceleração no [AXIS]',
    'microbit.sensor.compassAngle': 'ângulo da bússola',
    'microbit.sensor.compassMagneticDensity': 'força magnética da bússola',
    'microbit.sensor.calibrateCompass': 'calibrar bússola',
    'microbit.sensor.lightLevel': 'nível de luz',
    'microbit.sensor.temperature': 'temperatura',
    'microbit.sensor.runningTime': 'tempo ligado',
    'microbit.sensor.logoIsPressed': 'logotipo pressionado?',
    'microbit.sensor.soundLevel': 'nível do som',
    'microbit.sensor.setSoundThreshold': 'definir som [EVENT] no limite [VALUE]',
    'microbit.soundEvent.loud': 'forte',
    'microbit.soundEvent.quiet': 'baixo',
    'microbit.logoEvent.pressed': 'pressionado',
    'microbit.logoEvent.released': 'liberado',
    'microbit.category.wireless': 'Rádio',
    'microbit.wireless.openWirelessCommunication': 'iniciar rádio',
    'microbit.wireless.closeWirelessCommunication': 'parar rádio',
    'microbit.wireless.resetWirelessCommunication': 'reiniciar rádio',
    'microbit.wireless.sendWirelessMessage': 'enviar mensagem [TEXT] pelo rádio',
    'microbit.wireless.receiveWirelessMessage': 'mensagem recebida pelo rádio',
    'microbit.wireless.setWirelessCommunicationChannel': 'definir canal do rádio para [CH]',
    'microbit.category.console': 'Console',
    'microbit.console.consolePrint': 'imprimir [TEXT]',
    'microbit.event.whenMicrobitBegin': 'quando o micro:bit iniciar',
    'microbit.event.whenButtonPressed': 'quando o botão [KEY] for pressionado',
    'microbit.event.whenPinTouched': 'quando o pino [PIN] for tocado',
    'microbit.event.whenGesture': 'quando o gesto for [STA]',
    'microbit.event.whenSound': 'quando o som estiver [EVENT]',
    'microbit.event.whenLogo': 'quando o logotipo for [EVENT]',
    'microbit.category.microbit': 'micro:bit v2'
};

const microbitBleBlockTranslationsPt = Object.assign({}, microbitBleBlockTranslationsPtBr, {
    'microbit.buttonsMenu.any': 'qualquer',
    'microbit.tiltDirectionMenu.left': 'para a esquerda',
    'microbit.tiltDirectionMenu.right': 'para a direita',
    'microbit.tiltDirectionMenu.any': 'qualquer direção',
    'microbitBle.uploadBleFirmware': 'enviar firmware Bluetooth',
    'microbit.whenButtonPressed': 'quando o botão [BTN] for pressionado',
    'microbit.defaultTextToDisplay': 'Olá!',
    'microbit.clearDisplay': 'limpar ecrã',
    'microbit.whenPinConnected': 'quando o pino [PIN] for tocado',
    'microbit.isPinConnected': 'pino [PIN] tocado?',
    'microbit.runningTime': 'tempo ligado'
});

const microbitConnectionTranslationsPtBr = {
    'gui.connection.reconnect': 'Reconectar',
    'gui.connection.auto-scanning.noPeripheralsFound': 'Nenhum dispositivo encontrado',
    'gui.connection.auto-scanning.prescan': 'Deixe o dispositivo perto do computador e comece a busca.',
    'gui.connection.auto-scanning.pressbutton': 'Pressione o botão no dispositivo.',
    'gui.connection.auto-scanning.start-search': 'Começar busca',
    'gui.connection.connecting-searchbutton': 'Procurando...',
    'gui.connection.auto-scanning.try-again': 'Tentar novamente',
    'gui.connection.connected': 'Conectado',
    'gui.connection.disconnect': 'Desconectar',
    'gui.connection.go-to-editor': 'Voltar ao editor',
    'gui.connection.connecting-cancelbutton': 'Conectando...',
    'gui.connection.accessDeniedError.errorMessage': 'Não foi possível acessar a porta. Verifique se ela já está sendo usada.',
    'gui.connection.unknownErrorCode31.errorMessage': 'Não foi possível conectar. Desconecte o dispositivo, conecte novamente e tente outra vez.',
    'gui.connection.error.errorMessage': 'Algo deu errado na conexão.',
    'gui.connection.error.tryagainbutton': 'Tentar novamente',
    'gui.connection.error.helpbutton': 'Ajuda',
    'gui.connection.peripheral-name-label': 'Nome do dispositivo',
    'gui.connection.connect': 'Conectar',
    'gui.connection.scanning.listAll': 'Mostrar todos os dispositivos conectáveis',
    'gui.connection.scanning.lookingforperipherals': 'Procurando dispositivos',
    'gui.connection.scanning.noPeripheralsFound': 'Nenhum dispositivo encontrado',
    'gui.connection.scanning.instructions': 'Selecione seu dispositivo na lista acima.',
    'gui.connection.scanning.webSerialSelect': 'Clique em Atualizar para escolher um dispositivo USB',
    'gui.connection.scanning.webBluetoothSelect': 'Clique em Atualizar para escolher seu micro:bit pelo Web Bluetooth',
    'gui.connection.scanning.microbitBleInstructions': 'Envie o firmware pelo DoGoBlock Link. Depois selecione seu micro:bit.',
    'gui.connection.scanning.microbitBleWebBluetoothInstructions': 'Web Bluetooth está desativado por enquanto. Use o DoGoBlock Link para enviar o firmware e conectar o micro:bit.',
    'gui.connection.microbitFirmwareManual.openButton': 'Enviar manualmente',
    'gui.connection.microbitFirmwareManual.title': 'Instalar firmware manualmente',
    'gui.connection.microbitFirmwareManual.stepDownload': 'Baixe o arquivo .hex.',
    'gui.connection.microbitFirmwareManual.stepConnect': 'Conecte o micro:bit pelo cabo USB.',
    'gui.connection.microbitFirmwareManual.stepCopy': 'Copie o arquivo para a unidade MICROBIT.',
    'gui.connection.microbitFirmwareManual.stepRestart': 'Aguarde o micro:bit reiniciar.',
    'gui.connection.microbitFirmwareManual.stepConnectLink': 'Clique em Atualizar e conecte pelo DoGoBlock Link.',
    'gui.connection.microbitFirmwareManual.downloadV2': 'Baixar firmware micro:bit v2',
    'gui.connection.microbitFirmwareManual.downloadV1': 'Baixar firmware micro:bit v1',
    'gui.connection.microbitFirmwareManual.close': 'Fechar',
    'gui.connection.search': 'Atualizar',
    'gui.connection.sendFirmware': 'Enviar firmware',
    'gui.connection.type.label': 'Tipo de conexão',
    'gui.connection.webBluetooth.notSecure': 'Web Bluetooth exige HTTPS ou localhost.',
    'gui.connection.webBluetooth.missingApi': 'Web Bluetooth não está disponível. Use Chrome ou Edge com HTTPS/localhost.',
    'gui.connection.webSerial.notSecure': 'Web Serial exige HTTPS ou localhost.',
    'gui.connection.webSerial.missingApi': 'Web Serial não está disponível. Use Chrome ou Edge com HTTPS/localhost.',
    'gui.connection.scanning.arduinoWebSerialSelect': 'Clique em Atualizar para escolher seu Arduino USB',
    'gui.connection.unavailable.webSerialAccess': 'Use o Chrome no ChromeOS e permita acesso ao dispositivo USB quando solicitado.',
    'gui.connection.unavailable.installscratchlink': 'Confira se o DoGoBlock Link está instalado e aberto.',
    'gui.connection.unavailable.webSerialFirmware': 'Conecte o USB e confira se o Arduino está com o firmware de tempo real.',
    'gui.connection.unavailable.connectUsbEnableBluetooth': 'Confira se o cabo USB está conectado ou se o Bluetooth está ligado.',
    'gui.connection.unavailable.tryagainbutton': 'Tentar novamente',
    'gui.connection.unavailable.helpbutton': 'Ajuda',
    'gui.extension.microbitBle.name': 'micro:bit Bluetooth',
    'gui.extension.microbitBle.description': 'Controle personagens usando o micro:bit por Bluetooth.',
    'gui.extension.microbit.connectingMessage': 'Conectando'
};

const microbitConnectionTranslationsPt = Object.assign({}, microbitConnectionTranslationsPtBr, {
    'gui.connection.go-to-editor': 'Voltar ao editor',
    'gui.connection.error.errorMessage': 'Algo correu mal na ligação.',
    'gui.connection.scanning.instructions': 'Selecione o seu dispositivo na lista acima.',
    'gui.connection.search': 'Atualizar',
    'gui.connection.type.label': 'Tipo de ligação',
    'gui.connection.unavailable.installscratchlink': 'Confirme que o DoGoBlock Link está instalado e aberto.',
    'gui.extension.microbitBle.description': 'Controle personagens usando o micro:bit por Bluetooth.',
    'gui.extension.microbit.connectingMessage': 'Ligando'
});

const writeJsonValues = (file, values) => {
    if (!fs.existsSync(file)) return;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    Object.keys(values).forEach(key => {
        data[key] = values[key];
    });
    fs.writeFileSync(file, `${JSON.stringify(data, null, 4)}\n`);
};

const basicBlockTranslationsPtBr = Object.freeze({
    CONTROL_REPEAT: 'repetir %1 vezes',
    CONTROL_STOP: 'parar',
    CONTROL_WAIT: 'esperar %1 seg',
    CONTROL_WAITUNTIL: 'esperar até que %1',
    CONTROL_REPEATUNTIL: 'repetir até que %1',
    CONTROL_CREATECLONEOF: 'criar clone de %1',
    CONTROL_DELETETHISCLONE: 'apagar este clone',
    DATA_SETVARIABLETO: 'definir %1 para %2',
    DATA_CHANGEVARIABLEBY: 'mudar %1 por %2',
    DATA_SHOWVARIABLE: 'mostrar a variável %1',
    DATA_HIDEVARIABLE: 'esconder a variável %1',
    DATA_ADDTOLIST: 'adicionar %1 a %2',
    DATA_DELETEOFLIST: 'apagar %1 de %2',
    DATA_DELETEALLOFLIST: 'apagar todos os itens de %1',
    DATA_INSERTATLIST: 'inserir %1 na posição %2 de %3',
    DATA_REPLACEITEMOFLIST: 'substituir o item %1 de %2 por %3',
    DATA_SHOWLIST: 'mostrar a lista %1',
    DATA_HIDELIST: 'esconder a lista %1',
    EVENT_WHENARDUINOBEGIN: 'quando o Arduino iniciar',
    EVENT_BROADCAST: 'transmitir %1',
    EVENT_BROADCASTANDWAIT: 'transmitir %1 e esperar',
    LOOKS_SAYFORSECS: 'dizer %1 por %2 segundos',
    LOOKS_SAY: 'dizer %1',
    LOOKS_THINKFORSECS: 'pensar %1 por %2 segundos',
    LOOKS_THINK: 'pensar %1',
    LOOKS_SHOW: 'mostrar',
    LOOKS_HIDE: 'esconder',
    LOOKS_HIDEALLSPRITES: 'esconder todos os atores',
    LOOKS_CHANGEEFFECTBY: 'mudar o efeito %1 por %2',
    LOOKS_SETEFFECTTO: 'definir o efeito %1 para %2',
    LOOKS_CLEARGRAPHICEFFECTS: 'remover os efeitos gráficos',
    LOOKS_CHANGESIZEBY: 'mudar o tamanho por %1',
    LOOKS_SETSIZETO: 'definir o tamanho para %1 %',
    LOOKS_CHANGESTRETCHBY: 'mudar o alongamento por %1',
    LOOKS_SETSTRETCHTO: 'definir o alongamento para %1 %',
    LOOKS_SWITCHCOSTUMETO: 'mudar para o traje %1',
    LOOKS_NEXTCOSTUME: 'próximo traje',
    LOOKS_COSTUMENUMBERNAME: 'traje %1',
    LOOKS_SWITCHBACKDROPTO: 'mudar para o cenário %1',
    LOOKS_GOTOFRONTBACK: 'ir para a camada %1',
    LOOKS_GOFORWARDBACKWARDLAYERS: 'ir para %1 %2 camadas',
    LOOKS_SWITCHBACKDROPTOANDWAIT: 'mudar para o cenário %1 e esperar',
    MOTION_MOVESTEPS: 'mover %1 passos',
    MOTION_TURNLEFT: 'girar %1 %2 graus',
    MOTION_TURNRIGHT: 'girar %1 %2 graus',
    MOTION_POINTINDIRECTION: 'apontar para a direção %1',
    MOTION_POINTTOWARDS: 'apontar para %1',
    MOTION_GOTO: 'ir para %1',
    MOTION_GOTOXY: 'ir para x: %1 y: %2',
    MOTION_GLIDESECSTOXY: 'deslizar por %1 segs. até x: %2 y: %3',
    MOTION_GLIDETO: 'deslizar por %1 segs. até %2',
    MOTION_CHANGEXBY: 'mudar x por %1',
    MOTION_SETX: 'definir x para %1',
    MOTION_CHANGEYBY: 'mudar y por %1',
    MOTION_SETY: 'definir y para %1',
    MOTION_IFONEDGEBOUNCE: 'se tocar na borda, voltar',
    MOTION_SETROTATIONSTYLE: 'definir o estilo de rotação para %1',
    PROCEDURES_DEFINITION: 'definir %1',
    SENSING_ASKANDWAIT: 'perguntar %1 e esperar',
    SENSING_SETDRAGMODE: 'definir modo de arrasto para %1',
    SENSING_RESETTIMER: 'zerar o cronômetro',
    SENSING_OF_COSTUMENUMBER: 'n° do traje',
    SENSING_OF_COSTUMENAME: 'nome do traje',
    SOUND_PLAY: 'tocar o som %1',
    SOUND_PLAYUNTILDONE: 'tocar o som %1 até o fim',
    SOUND_STOPALLSOUNDS: 'parar todos os sons',
    SOUND_SETEFFECTO: 'definir o efeito %1 para %2',
    SOUND_CHANGEEFFECTBY: 'mudar o efeito %1 por %2',
    SOUND_CLEAREFFECTS: 'remover os efeitos sonoros',
    SOUND_CHANGEVOLUMEBY: 'mudar o volume por %1',
    SOUND_SETVOLUMETO: 'definir o volume para %1%'
});

const costumeInterfaceTranslationsPtBr = Object.freeze({
    'gui.backpack.costumeLabel': 'traje',
    'gui.gui.costumesTab': 'Trajes',
    'gui.SpriteInfo.direction': 'Rotação',
    'gui.SpriteInfo.draggable': 'Arrastável',
    'gui.SpriteInfo.draggableOn': 'Permitir arrastar durante o jogo',
    'gui.SpriteInfo.draggableOff': 'Não permitir arrastar durante o jogo',
    'gui.SpriteInfo.draggableEnabled': 'Ativado',
    'gui.SpriteInfo.draggableDisabled': 'Desativado',
    'gui.menuBar.restoreCostume': 'Restaurar o Traje',
    'gui.costumeLibrary.chooseACostume': 'Escolher Traje',
    'gui.costumeTab.addCostumeFromLibrary': 'Escolher Traje',
    'gui.costumeTab.addFileCostume': 'Carregar Traje',
    'gui.howtos.imagine.step_imagineChangeCostumes': 'Mudar de Traje',
    'gui.howtos.add-a-move-block.step_stepflySwitchLooks': 'Próximo Traje',
    'gui.howtos.code-cartoon.step_codeCartoonChangeCostumes': 'Mudar de Traje',
    'gui.opcodeLabels.costumename': 'nome do traje',
    'gui.opcodeLabels.costumenumber': 'número do traje',
    'gui.sharedMessages.costume': 'traje{index}'
});

const patchOpenBlockL10nBasicBlocksPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    writeJsonValues(
        path.join(packageDir, 'editor', 'blocks', 'pt-br.json'),
        basicBlockTranslationsPtBr
    );
    writeJsonValues(
        path.join(packageDir, 'editor', 'interface', 'pt-br.json'),
        costumeInterfaceTranslationsPtBr
    );

    console.log(`Applied openblock-l10n basic block and costume PT-BR translations: ${packageDir}`);
};

const patchOpenBlockL10nBasicBlocks = () => {
    dependencyPackageDirs('openblock-l10n').forEach(patchOpenBlockL10nBasicBlocksPackage);
};

const penAndMusicBlockTranslationsPtBr = Object.freeze({
    'music.changeTempo': 'mudar o ritmo por [TEMPO]',
    'music.midiPlayDrumForBeats': 'tocar o instrumento [DRUM] por [BEATS] batidas',
    'music.midiSetInstrument': 'definir o instrumento para [INSTRUMENT]',
    'music.playDrumForBeats': 'tocar o instrumento [DRUM] por [BEATS] batidas',
    'music.playNoteForBeats': 'tocar a nota [NOTE] por [BEATS] batidas',
    'music.restForBeats': 'pausar por [BEATS] batidas',
    'music.setInstrument': 'definir o instrumento para [INSTRUMENT]',
    'music.setTempo': 'definir o ritmo para [TEMPO]',
    'pen.changeColorParam': 'mudar [COLOR_PARAM] da caneta por [VALUE]',
    'pen.changeHue': 'mudar a cor da caneta por [HUE]',
    'pen.changeShade': 'mudar a tonalidade da caneta por [SHADE]',
    'pen.changeSize': 'mudar o tamanho da caneta por [SIZE]',
    'pen.clear': 'apagar tudo',
    'pen.penDown': 'baixar a caneta',
    'pen.penUp': 'levantar a caneta',
    'pen.setColor': 'definir a cor da caneta para [COLOR]',
    'pen.setColorParam': 'definir [COLOR_PARAM] da caneta para [VALUE]',
    'pen.setHue': 'definir a cor da caneta para [HUE]',
    'pen.setShade': 'definir a tonalidade da caneta para [SHADE]',
    'pen.setSize': 'definir o tamanho da caneta para [SIZE]',
    'pen.stamp': 'carimbar'
});

const patchOpenBlockL10nPenAndMusicPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    writeJsonValues(
        path.join(packageDir, 'editor', 'extensions', 'pt-br.json'),
        penAndMusicBlockTranslationsPtBr
    );

    console.log(`Applied openblock-l10n Pen and Music PT-BR translations: ${packageDir}`);
};

const patchOpenBlockL10nPenAndMusic = () => {
    dependencyPackageDirs('openblock-l10n').forEach(patchOpenBlockL10nPenAndMusicPackage);
};

const patchOpenBlockL10nMicrobitPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    writeJsonValues(
        path.join(packageDir, 'editor', 'blocks', 'pt-br.json'),
        microbitBleBlockTranslationsPtBr
    );
    writeJsonValues(
        path.join(packageDir, 'editor', 'blocks', 'pt.json'),
        microbitBleBlockTranslationsPt
    );
    writeJsonValues(
        path.join(packageDir, 'editor', 'extensions', 'pt-br.json'),
        microbitBleBlockTranslationsPtBr
    );
    writeJsonValues(
        path.join(packageDir, 'editor', 'extensions', 'pt.json'),
        microbitBleBlockTranslationsPt
    );
    writeJsonValues(
        path.join(packageDir, 'editor', 'interface', 'pt-br.json'),
        microbitConnectionTranslationsPtBr
    );
    writeJsonValues(
        path.join(packageDir, 'editor', 'interface', 'pt.json'),
        microbitConnectionTranslationsPt
    );

    console.log(`Applied openblock-l10n micro:bit BLE translations: ${packageDir}`);
};

const patchOpenBlockL10nMicrobit = () => {
    dependencyPackageDirs('openblock-l10n').forEach(patchOpenBlockL10nMicrobitPackage);
};

const syncOpenBlockBlocksLocalesPackage = packageDir => {
    const scratchMessagesFile = path.join(packageDir, 'msg', 'scratch_msgs.js');
    const l10nBlocksDir = path.join(dependencyRoot, 'node_modules', 'openblock-l10n', 'editor', 'blocks');
    if (!fs.existsSync(scratchMessagesFile) || !fs.existsSync(l10nBlocksDir)) return;

    let source = fs.readFileSync(scratchMessagesFile, 'utf8');
    ['pt-br', 'pt'].forEach(locale => {
        const translationsFile = path.join(l10nBlocksDir, `${locale}.json`);
        if (!fs.existsSync(translationsFile)) return;

        const marker = `Blockly.ScratchMsgs.locales["${locale}"] =`;
        const assignment = `${marker}\n${JSON.stringify(
            JSON.parse(fs.readFileSync(translationsFile, 'utf8')),
            null,
            4
        )};\n`;
        const start = source.indexOf(marker);
        if (start === -1) {
            source = `${source.trimEnd()}\n${assignment}`;
            return;
        }

        const next = source.indexOf('Blockly.ScratchMsgs.locales["', start + marker.length);
        source = `${source.slice(0, start)}${assignment}${next === -1 ? '' : source.slice(next)}`;
    });

    fs.writeFileSync(scratchMessagesFile, source);
    console.log(`Synchronized openblock-blocks PT locales: ${packageDir}`);
};

const syncOpenBlockBlocksLocales = () => {
    dependencyPackageDirs('openblock-blocks').forEach(syncOpenBlockBlocksLocalesPackage);
};

const patchOpenBlockBlocksGeneratedCodeBrandingPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const files = [
        path.join(packageDir, 'generators', 'arduino.js'),
        path.join(packageDir, 'generators', 'python.js'),
        path.join(packageDir, 'arduino_compressed.js'),
        path.join(packageDir, 'python_compressed.js')
    ];
    files.forEach(file => {
        if (!fs.existsSync(file)) return;
        const before = fs.readFileSync(file, 'utf8');
        const after = before
            .replace(/\/\/ (?:generated by OpenBlock|gerado pelo DoGo Block)\\n/g,
                '// generated by DoGo Block\\n')
            .replace(/# (?:generated by OpenBlock|gerado pelo DoGo Block)\\n/g,
                '# generated by DoGo Block\\n');
        if (after !== before) fs.writeFileSync(file, after);
    });

    console.log(`Applied generated code DoGo Block branding: ${packageDir}`);
};

const patchOpenBlockBlocksGeneratedCodeBranding = () => {
    dependencyPackageDirs('openblock-blocks').forEach(patchOpenBlockBlocksGeneratedCodeBrandingPackage);
};

const patchOpenBlockVmDefaultTextBrandingPackage = packageDir => {
    const devicesDir = path.join(packageDir, 'src', 'devices');
    if (!fs.existsSync(devicesDir)) return;

    const visit = directory => {
        fs.readdirSync(directory, {withFileTypes: true}).forEach(entry => {
            const file = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                visit(file);
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                const before = fs.readFileSync(file, 'utf8');
                const after = before.replace(/defaultValue: 'Hello OpenBlock'/g, "defaultValue: 'DoGo Block'");
                if (after !== before) fs.writeFileSync(file, after);
            }
        });
    };
    visit(devicesDir);
    console.log(`Applied default block text DoGo Block branding: ${packageDir}`);
};

const patchOpenBlockVmDefaultTextBranding = () => {
    const externalVmPath = process.env.OPENBLOCK_VM_PATH ?
        [path.resolve(process.env.OPENBLOCK_VM_PATH)] :
        [];
    dependencyPackageDirs('openblock-vm')
        .concat(dependencyRoot === root ? [path.join(root, '.openblock-vm')] : [])
        .concat(externalVmPath)
        .forEach(patchOpenBlockVmDefaultTextBrandingPackage);
};

const patchOpenBlockVmVideoSensingLifecyclePackage = packageDir => {
    const managerFile = path.join(packageDir, 'src', 'extension-support', 'extension-manager.js');
    const videoSensingFile = path.join(packageDir, 'src', 'extensions', 'scratch3_video_sensing', 'index.js');
    if (!fs.existsSync(managerFile) || !fs.existsSync(videoSensingFile)) return;

    let managerSource = fs.readFileSync(managerFile, 'utf8');
    if (!managerSource.includes('this._loadedExtensionInstances = new Map();')) {
        const loadedExtensionsMarker = '        this._loadedExtensions = new Map();';
        if (!managerSource.includes(loadedExtensionsMarker)) {
            throw new Error(`Could not patch extension lifecycle map: ${managerFile}`);
        }
        managerSource = managerSource.replace(
            loadedExtensionsMarker,
            `${loadedExtensionsMarker}\n\n` +
            '        /** Internal extension instances which may own disposable resources. */\n' +
            '        this._loadedExtensionInstances = new Map();'
        );

        const syncLoadMarker =
            '        this._loadedExtensions.set(extensionId, serviceName);\n' +
            '        this.runtime.addScratchExtension(extensionId);';
        const asyncLoadMarker =
            '            this._loadedExtensions.set(extensionURL, serviceName);\n' +
            '            this.runtime.addScratchExtension(extensionURL);';
        if (!managerSource.includes(syncLoadMarker) || !managerSource.includes(asyncLoadMarker)) {
            throw new Error(`Could not patch extension lifecycle registration: ${managerFile}`);
        }
        managerSource = managerSource
            .replace(
                syncLoadMarker,
                '        this._loadedExtensions.set(extensionId, serviceName);\n' +
                '        this._loadedExtensionInstances.set(extensionId, extensionInstance);\n' +
                '        this.runtime.addScratchExtension(extensionId);'
            )
            .replace(
                asyncLoadMarker,
                '            this._loadedExtensions.set(extensionURL, serviceName);\n' +
                '            this._loadedExtensionInstances.set(extensionURL, extensionInstance);\n' +
                '            this.runtime.addScratchExtension(extensionURL);'
            );

        const unloadMarker =
            '    unloadExtension (extensionURL) {\n' +
            '        this._loadedExtensions.delete(extensionURL);\n' +
            '        this.runtime.removeScratchExtension(extensionURL);\n' +
            '    }';
        const clearMarker =
            '    clearExtensions () {\n' +
            '        this._loadedExtensions.clear();\n' +
            '        this.runtime.clearScratchExtension();\n' +
            '    }';
        if (!managerSource.includes(unloadMarker) || !managerSource.includes(clearMarker)) {
            throw new Error(`Could not patch extension lifecycle cleanup: ${managerFile}`);
        }
        managerSource = managerSource
            .replace(
                unloadMarker,
                '    unloadExtension (extensionURL) {\n' +
                '        this._disposeExtension(extensionURL);\n' +
                '        this._loadedExtensions.delete(extensionURL);\n' +
                '        this.runtime.removeScratchExtension(extensionURL);\n' +
                '    }'
            )
            .replace(
                clearMarker,
                '    clearExtensions () {\n' +
                '        Array.from(this._loadedExtensionInstances.keys()).forEach(extensionId => {\n' +
                '            this._disposeExtension(extensionId);\n' +
                '        });\n' +
                '        this._loadedExtensions.clear();\n' +
                '        this.runtime.clearScratchExtension();\n' +
                '    }\n\n' +
                '    _disposeExtension (extensionId) {\n' +
                '        const extensionInstance = this._loadedExtensionInstances.get(extensionId);\n' +
                '        this._loadedExtensionInstances.delete(extensionId);\n' +
                "        if (!extensionInstance || typeof extensionInstance.dispose !== 'function') return;\n\n" +
                '        try {\n' +
                '            extensionInstance.dispose();\n' +
                '        } catch (error) {\n' +
                '            log.warn(`Could not dispose extension ${extensionId}: ${error.message || error}`);\n' +
                '        }\n' +
                '    }'
            );
        fs.writeFileSync(managerFile, managerSource);
    }

    let videoSource = fs.readFileSync(videoSensingFile, 'utf8');
    if (!videoSource.includes('dispose () {')) {
        const installMarker = '        this.firstInstall = true;\n\n        if (this.runtime.ioDevices) {';
        const projectListenerMarker =
            '            this.runtime.on(Runtime.PROJECT_LOADED, this.updateVideoDisplay.bind(this));';
        const runListenerMarker = '            this.runtime.on(Runtime.PROJECT_RUN_START, this.reset.bind(this));';
        const loopMarker =
            '    _loop () {\n' +
            '        setTimeout(this._loop.bind(this), ' +
            'Math.max(this.runtime.currentStepTime, Scratch3VideoSensingBlocks.INTERVAL));';
        if (
            !videoSource.includes(installMarker) ||
            !videoSource.includes(projectListenerMarker) ||
            !videoSource.includes(runListenerMarker) ||
            !videoSource.includes(loopMarker)
        ) {
            throw new Error(`Could not patch video sensing lifecycle: ${videoSensingFile}`);
        }
        videoSource = videoSource
            .replace(
                installMarker,
                '        this.firstInstall = true;\n\n' +
                '        this._disposed = false;\n' +
                '        this._loopTimeout = null;\n' +
                '        this._boundLoop = this._loop.bind(this);\n' +
                '        this._boundUpdateVideoDisplay = this.updateVideoDisplay.bind(this);\n' +
                '        this._boundReset = this.reset.bind(this);\n\n' +
                '        if (this.runtime.ioDevices) {'
            )
            .replace(
                projectListenerMarker,
                '            this.runtime.on(Runtime.PROJECT_LOADED, this._boundUpdateVideoDisplay);'
            )
            .replace(
                runListenerMarker,
                '            this.runtime.on(Runtime.PROJECT_RUN_START, this._boundReset);'
            )
            .replace(
                loopMarker,
                '    _loop () {\n' +
                '        if (this._disposed) return;\n\n' +
                '        this._loopTimeout = setTimeout(\n' +
                '            this._boundLoop,\n' +
                '            Math.max(this.runtime.currentStepTime, Scratch3VideoSensingBlocks.INTERVAL)\n' +
                '        );'
            );

        const classEndMarker = '\n}\n\nmodule.exports = Scratch3VideoSensingBlocks;';
        if (!videoSource.includes(classEndMarker)) {
            throw new Error(`Could not append video sensing dispose lifecycle: ${videoSensingFile}`);
        }
        videoSource = videoSource.replace(
            classEndMarker,
            '\n\n    dispose () {\n' +
            '        if (this._disposed) return;\n' +
            '        this._disposed = true;\n\n' +
            '        if (this._loopTimeout !== null) {\n' +
            '            clearTimeout(this._loopTimeout);\n' +
            '            this._loopTimeout = null;\n' +
            '        }\n\n' +
            '        this.runtime.removeListener(Runtime.PROJECT_LOADED, this._boundUpdateVideoDisplay);\n' +
            '        this.runtime.removeListener(Runtime.PROJECT_RUN_START, this._boundReset);\n' +
            '        this.globalVideoState = VideoState.OFF;\n' +
            '        if (this.runtime.ioDevices && this.runtime.ioDevices.video) {\n' +
            '            this.runtime.ioDevices.video.disableVideo();\n' +
            '        }\n' +
            '        this.reset();\n' +
            '    }' + classEndMarker
        );
        fs.writeFileSync(videoSensingFile, videoSource);
    }

    console.log(`Applied openblock-vm video sensing lifecycle patch: ${packageDir}`);
};

const patchOpenBlockVmVideoSensingLifecycle = () => {
    const externalVmPath = process.env.OPENBLOCK_VM_PATH ?
        [path.resolve(process.env.OPENBLOCK_VM_PATH)] :
        [];
    dependencyPackageDirs('openblock-vm')
        .concat(dependencyRoot === root ? [path.join(root, '.openblock-vm')] : [])
        .concat(externalVmPath)
        .forEach(patchOpenBlockVmVideoSensingLifecyclePackage);
};

for (const patch of patches) {
    if ((translationsOnly || dependenciesOnly) && !patch.jsonUpdates) {
        continue;
    }
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

if (!translationsOnly) {
    patchOpenBlockBlocksArduinoPins();
    patchOpenBlockBlocksKeyReleased();
    patchOpenBlockBlocksMicrobitPythonEvents();
}
if (!translationsOnly && !dependenciesOnly) {
    patchOpenBlockVmKeyReleased();
    patchOpenBlockVmArduinoNanoUpload();
    patchOpenBlockVmArduinoDiscovery();
    patchOpenBlockVmLinkPort();
    patchOpenBlockVmWebSerialUpload();
    patchOpenBlockVmCompiledArtifactUpload();
    patchOpenBlockVmMicrobitBleWatchdog();
    patchOpenBlockVmWebpackHash();
    patchOpenBlockVmWebpackCreateHash();
    patchOpenBlockVmVideoSensingLifecycle();
}
patchOpenBlockL10nKeyReleased();
patchOpenBlockL10nLostConnectionBranding();
patchOpenBlockL10nBasicBlocks();
patchOpenBlockL10nPenAndMusic();
patchOpenBlockL10nMicrobit();
syncOpenBlockBlocksLocales();
patchOpenBlockBlocksGeneratedCodeBranding();
patchOpenBlockVmDefaultTextBranding();
