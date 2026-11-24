const fs = require('fs');
const path = require('path');
const {createBlockly, loadExtensionScript, createFullSketchXML, createFullSketch, extensionPath} =
    require('../../helpers/fingerprint');
const getMetadata = require('../../../static/device-extensions/fingerprint/index');

const opcodes = ['init', 'verifyPassword', 'captureImage', 'image2Tz', 'createModel', 'storeModel', 'search',
    'deleteModel', 'refreshTemplateCount', 'lastStatus', 'fingerID', 'confidence', 'templateCount',
    'lastOperationSucceeded', 'statusConstant'];

describe('Fingerprint Arduino extension', () => {
    let Blockly;
    let workspace;
    beforeEach(() => {
        Blockly = createBlockly();
        workspace = new Blockly.Workspace();
    });
    afterEach(() => {
        if (workspace) workspace.dispose();
    });

    test('publishes every required asset and limits compatibility to AVR boards', () => {
        const metadata = getMetadata(({default: fallback}) => fallback);
        expect(metadata.extensionId).toBe('fingerprint');
        expect(metadata.supportDevice).toEqual(['arduinoUno', 'arduinoNano', 'arduinoLeonardo']);
        ['blocks', 'generator', 'toolbox', 'translations', 'iconURL'].forEach(key => {
            expect(fs.existsSync(path.join(extensionPath, metadata[key]))).toBe(true);
        });
        expect(metadata.library).toBe('lib');
    });

    ['arduinoUno', 'arduinoNano', 'arduinoLeonardo'].forEach(deviceId => test(
        `creates every toolbox block with real ${deviceId} pin menus and standard connections`, () => {
            Blockly = createBlockly(deviceId);
            const category = Blockly.Xml.textToDom(`<xml>${loadExtensionScript('toolbox.js')()}</xml>`)
                .getElementsByTagName('category')[0];
            const blockNodes = Array.from(category.childNodes).filter(node => node.nodeName === 'block');
            expect(blockNodes.map(node => node.getAttribute('type')).sort()).toEqual(
                opcodes.map(opcode => `fingerprint_${opcode}`).sort());
            blockNodes.forEach(node => {
                const block = Blockly.Xml.domToBlock(node.cloneNode(true), workspace);
                expect(typeof Blockly.Arduino[block.type]).toBe('function');
                expect(block.getColour().toLowerCase()).toBe('#0f8b8d');
                expect(block.getColourSecondary().toLowerCase()).toBe('#0b6b6d');
                if (['lastStatus', 'fingerID', 'confidence', 'templateCount', 'statusConstant'].some(
                    opcode => block.type === `fingerprint_${opcode}`)) {
                    expect(block.outputConnection.check_).toEqual(['Number']);
                } else if (block.type === 'fingerprint_lastOperationSucceeded') {
                    expect(block.outputConnection.check_).toEqual(['Boolean']);
                } else {
                    expect(block.previousConnection).toBeTruthy();
                    expect(block.nextConnection).toBeTruthy();
                }
            });
        }));

    test('roundtrips enrollment, search, deletion and reporters through Blockly XML', () => {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(createFullSketchXML()), workspace);
        const before = Blockly.Arduino.workspaceToCode(workspace);
        const xml = Blockly.Xml.workspaceToDom(workspace);
        const restored = new Blockly.Workspace();
        try {
            Blockly.Xml.domToWorkspace(xml, restored);
            expect(Blockly.Arduino.workspaceToCode(restored).replace(/\n+/g, '\n')).toBe(
                before.replace(/\n+/g, '\n'));
            opcodes.forEach(opcode => expect(restored.getAllBlocks().some(
                block => block.type === `fingerprint_${opcode}`)).toBe(true));
            const store = restored.getAllBlocks().find(block => block.type === 'fingerprint_storeModel');
            expect(store.getInputTargetBlock('ID').getFieldValue('NUM')).toBe('1');
        } finally {
            restored.dispose();
        }
    });

    test('generates one sensor instance and setup with a complete compilable flow', () => {
        const code = createFullSketch();
        expect((code.match(/#include <DoGoFingerprint.h>/g) || []).length).toBe(1);
        expect((code.match(/DoGoFingerprint dogoblockFingerprint\(10, 11\);/g) || []).length).toBe(1);
        expect((code.match(/dogoblockFingerprint.begin\(57600\);/g) || []).length).toBe(1);
        ['verifyPassword()', 'captureImage()', 'image2Tz(1)', 'image2Tz(2)', 'createModel()', 'storeModel(1)',
            'search()', 'deleteModel(1)', 'refreshTemplateCount()', 'status()', 'fingerID()', 'confidence()',
            'templateCount()', 'succeeded()'].forEach(call => expect(code).toContain(`dogoblockFingerprint.${call}`));
        expect(code).toContain('FINGERPRINT_OK');
        expect(code).toContain('void setup()');
        expect(code).toContain('void loop()');
    });

    test('keeps explicit UART configuration when operations and cached getters are visited afterward', () => {
        const init = workspace.newBlock('fingerprint_init');
        expect(init.getFieldValue('RX')).toBe('10');
        expect(init.getFieldValue('TX')).toBe('11');
        expect(init.getFieldValue('BAUD')).toBe('57600');
        init.setFieldValue('8', 'RX');
        init.setFieldValue('9', 'TX');
        init.setFieldValue('19200', 'BAUD');
        Blockly.Arduino.init(workspace);
        Blockly.Arduino.fingerprint_captureImage();
        Blockly.Arduino.fingerprint_init(init);
        Blockly.Arduino.fingerprint_search();
        Blockly.Arduino.fingerprint_lastStatus();
        expect(Blockly.Arduino.definitions_.fingerprint).toBe('DoGoFingerprint dogoblockFingerprint(8, 9);');
        expect(Blockly.Arduino.setups_.fingerprint).toBe('dogoblockFingerprint.begin(19200);');
    });

    test('uses defaults without init and resets the configuration for the next workspace generation', () => {
        const start = workspace.newBlock('event_whenarduinobegin');
        const block = workspace.newBlock('fingerprint_captureImage');
        start.nextConnection.connect(block.previousConnection);
        let code = Blockly.Arduino.workspaceToCode(workspace);
        expect(code).toContain('DoGoFingerprint dogoblockFingerprint(10, 11);');
        expect(code).toContain('dogoblockFingerprint.begin(57600);');
        block.dispose();
        const init = workspace.newBlock('fingerprint_init');
        start.nextConnection.connect(init.previousConnection);
        init.setFieldValue('8', 'RX');
        init.setFieldValue('9', 'TX');
        code = Blockly.Arduino.workspaceToCode(workspace);
        expect(code).toContain('DoGoFingerprint dogoblockFingerprint(8, 9);');
        init.dispose();
        start.nextConnection.connect(workspace.newBlock('fingerprint_captureImage').previousConnection);
        expect(Blockly.Arduino.workspaceToCode(workspace)).toContain('DoGoFingerprint dogoblockFingerprint(10, 11);');
    });

    test('cached reporters generate only getter expressions, without new sensor commands', () => {
        Blockly.Arduino.init(workspace);
        const getters = {
            lastStatus: 'status',
            fingerID: 'fingerID',
            confidence: 'confidence',
            templateCount: 'templateCount',
            lastOperationSucceeded: 'succeeded'
        };
        Object.keys(getters).forEach(opcode => {
            expect(Blockly.Arduino[`fingerprint_${opcode}`]()).toEqual([
                `dogoblockFingerprint.${getters[opcode]}()`, Blockly.Arduino.ORDER_UNARY_POSTFIX
            ]);
        });
        expect(Blockly.Arduino.setups_.fingerprint).toBe('dogoblockFingerprint.begin(57600);');
        expect(Object.keys(Blockly.Arduino.definitions_)).toEqual(['fingerprint']);
    });

    test('accepts ID reporter expressions and defaults disconnected IDs to 1', () => {
        const store = workspace.newBlock('fingerprint_storeModel');
        const id = workspace.newBlock('fingerprint_fingerID');
        store.getInput('ID').connection.connect(id.outputConnection);
        Blockly.Arduino.init(workspace);
        expect(Blockly.Arduino.fingerprint_storeModel(store)).toBe(
            'dogoblockFingerprint.storeModel(dogoblockFingerprint.fingerID());\n');
        expect(Blockly.Arduino.fingerprint_deleteModel(workspace.newBlock('fingerprint_deleteModel'))).toBe(
            'dogoblockFingerprint.deleteModel(1);\n');
    });

    test('restricts status constants and recovers invalid serialized dropdown values safely', () => {
        Blockly.Arduino.init(workspace);
        expect(Blockly.Arduino.fingerprint_statusConstant({getFieldValue: () => 'FINGERPRINT_NOFINGER'})).toEqual([
            'FINGERPRINT_NOFINGER', Blockly.Arduino.ORDER_ATOMIC
        ]);
        const statusField = workspace.newBlock('fingerprint_statusConstant').getField('STATUS');
        const constants = statusField.getOptions();
        constants.forEach(([, value]) => {
            expect(Blockly.Arduino.fingerprint_statusConstant({getFieldValue: () => value})[0]).toBe(value);
        });
        expect(constants.some(([, value]) => value === 'FINGERPRINT_DBRANGEFAIL')).toBe(true);
        expect(Blockly.Arduino.fingerprint_statusConstant({getFieldValue: () => 'injected();'})).toEqual([
            'FINGERPRINT_OK', Blockly.Arduino.ORDER_ATOMIC
        ]);
        expect(Blockly.Arduino.fingerprint_image2Tz({getFieldValue: () => '99'})).toBe(
            'dogoblockFingerprint.image2Tz(1);\n');
        Blockly.Arduino.fingerprint_init({getFieldValue: () => 'invalid'});
        expect(Blockly.Arduino.definitions_.fingerprint).toBe('DoGoFingerprint dogoblockFingerprint(10, 11);');
        expect(Blockly.Arduino.setups_.fingerprint).toBe('dogoblockFingerprint.begin(57600);');
    });

    test('provides Portuguese and English fallback with the same argument placeholders', () => {
        const messages = JSON.parse(fs.readFileSync(path.join(extensionPath, 'msg.json'), 'utf8'));
        Blockly.ScratchMsgs.locales.fr = {};
        loadExtensionScript('translations.js')(Blockly);
        ['en', 'pt-br', 'fr'].forEach(locale => {
            Blockly.ScratchMsgs.setLocale(locale);
            Object.keys(messages).forEach(key => {
                expect(typeof Blockly.Msg[key]).toBe('string');
                expect((Blockly.Msg[key].match(/%\d/g) || []).sort()).toEqual(
                    (messages[key].match(/%\d/g) || []).sort());
            });
        });
        expect(Blockly.ScratchMsgs.locales['pt-br'].FINGERPRINT_CATEGORY).toBe('Leitor de digitais');
        expect(Blockly.ScratchMsgs.locales.fr.FINGERPRINT_CATEGORY).toBe('Fingerprint');
        expect(Blockly.ScratchMsgs.locales.en.FINGERPRINT_COUNT_TOOLTIP).toContain('-1');
    });

    test('creates the entire toolbox in the GUI registration order before applying the selected locale', () => {
        const expectedLabels = {'en': 'success', 'pt-br': 'sucesso'};
        Object.keys(expectedLabels).forEach(locale => {
            workspace.clear();
            Object.keys(Blockly.Msg).filter(key => key.indexOf('FINGERPRINT_') === 0)
                .forEach(key => delete Blockly.Msg[key]);
            loadExtensionScript('translations.js')(Blockly);
            loadExtensionScript('generator.js')(Blockly);
            loadExtensionScript('blocks.js')(Blockly);
            expect(Blockly.Msg.FINGERPRINT_STATUS_OK).toBeUndefined();

            Blockly.ScratchMsgs.setLocale(locale);
            const category = Blockly.Xml.textToDom(`<xml>${loadExtensionScript('toolbox.js')()}</xml>`)
                .getElementsByTagName('category')[0];
            const nodes = Array.from(category.childNodes).filter(node => node.nodeName === 'block');
            nodes.forEach(node => Blockly.Xml.domToBlock(node.cloneNode(true), workspace));
            expect(workspace.getAllBlocks().filter(block => block.type.indexOf('fingerprint_') === 0).length)
                .toBe(opcodes.length);
            const status = workspace.getAllBlocks().find(block => block.type === 'fingerprint_statusConstant');
            expect(status.getField('STATUS').getOptions()[0][0]).toBe(expectedLabels[locale]);
        });
    });

    test('limits Leonardo RX to the supported SoftwareSerial pins', () => {
        Blockly = createBlockly('arduinoLeonardo');
        const init = workspace.newBlock('fingerprint_init');
        expect(init.getField('RX').getOptions()
            .map(option => option[1])).toEqual(
            ['8', '9', '10', '11']);
        expect(init.getField('TX').getOptions().length).toBe(14);
    });
});
