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
        path.join(root, 'node_modules', 'openblock-blocks'),
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
        path.join(root, 'node_modules', 'openblock-blocks'),
        path.join(root, '.openblock-vm', 'node_modules', 'openblock-blocks')
    ].forEach(patchOpenBlockBlocksKeyReleasedPackage);
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
        path.join(root, 'node_modules', 'openblock-vm'),
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
        path.join(root, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmArduinoNanoUploadPackage);
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
        path.join(root, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmWebSerialUploadPackage);
};

const patchOpenBlockVmCompiledArtifactUploadPackage = packageDir => {
    if (!fs.existsSync(packageDir)) return;

    const peripheralFile = path.join(packageDir, 'src', 'devices', 'common', 'arduino-peripheral.js');
    if (!fs.existsSync(peripheralFile)) return;
    let source = fs.readFileSync(peripheralFile, 'utf8');
    if (source.includes("Object.assign({artifactType: 'compiledArtifact'}")) {
        console.log(`openblock-vm compiled artifact upload patch already applied: ${packageDir}`);
        return;
    }

    const before = '        return this._serialport.upload(artifact, this.diveceOpt, encoding, options);';
    const after = "        const uploadOptions = Object.assign({artifactType: 'compiledArtifact'}, options || {});\n" +
        '        return this._serialport.upload(artifact, this.diveceOpt, encoding, uploadOptions);';
    if (!source.includes(before)) {
        throw new Error(`Could not apply openblock-vm compiled artifact upload patch: ${peripheralFile}`);
    }
    source = source.replace(before, after);
    fs.writeFileSync(peripheralFile, source);
    console.log(`Applied openblock-vm compiled artifact upload patch: ${packageDir}`);
};

const patchOpenBlockVmCompiledArtifactUpload = () => {
    [
        path.join(root, 'node_modules', 'openblock-vm'),
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
        path.join(root, 'node_modules', 'openblock-vm'),
        path.join(root, '.openblock-vm')
    ].forEach(patchOpenBlockVmMicrobitBleWatchdogPackage);
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
    [
        path.join(root, 'node_modules', 'openblock-l10n'),
        path.join(root, '.openblock-vm', 'node_modules', 'openblock-l10n')
    ].forEach(patchOpenBlockL10nKeyReleasedPackage);
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
    'microbit.runningTime': 'tempo ligado'
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
    [
        path.join(root, 'node_modules', 'openblock-l10n'),
        path.join(root, '.openblock-vm', 'node_modules', 'openblock-l10n')
    ].forEach(patchOpenBlockL10nMicrobitPackage);
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
patchOpenBlockBlocksKeyReleased();
patchOpenBlockVmKeyReleased();
patchOpenBlockVmArduinoNanoUpload();
patchOpenBlockVmWebSerialUpload();
patchOpenBlockVmCompiledArtifactUpload();
patchOpenBlockVmMicrobitBleWatchdog();
patchOpenBlockL10nKeyReleased();
patchOpenBlockL10nMicrobit();
