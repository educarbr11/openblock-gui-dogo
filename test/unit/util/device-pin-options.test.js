const fs = require('fs');
const path = require('path');
const vm = require('vm');
const installDevicePinOptions = require('../../../src/lib/device-pin-options');
const {createBlockly, createDeviceRuntime, loadExtensionScript} = require('../../helpers/fingerprint');

const digitalBlockType = 'arduino_pin_setDigitalOutput';
const optionValues = options => options.map(option => option[1]);

describe('device pin options', () => {
    let Blockly;
    let runtime;
    beforeEach(() => {
        Blockly = createBlockly();
        Blockly.mainWorkspace = null;
        runtime = createDeviceRuntime();
        installDevicePinOptions(Blockly, {runtime});
    });
    afterEach(() => runtime.dispose());

    test('reads the real Uno shadow menu without a main workspace or flyout', () => {
        expect(Blockly.getMainWorkspace()).toBe(null);
        const pins = Blockly.Device.getPinOptions(digitalBlockType);
        expect(pins[0]).toEqual(['0 (RX)', '0']);
        expect(optionValues(pins)).toEqual(Array.from({length: 14}, (_, pin) => `${pin}`));
    });

    test('reproduces the old API failure against the actual VM block and resolves its shadow metadata', () => {
        const category = runtime._deviceBlockInfo.find(info => info.id === 'arduino_pin');
        const digital = category.blocks.find(block => block.json && block.json.type === digitalBlockType);
        Blockly.defineBlocksWithJsonArray(category.menus.map(menu => menu.json).concat([digital.json]));
        const workspace = new Blockly.Workspace();
        try {
            const xml = Blockly.Xml.textToDom(`<xml>${digital.xml}</xml>`);
            const block = Blockly.Xml.domToBlock(xml.firstChild, workspace);
            expect(block.getField('PIN')).toBe(null);
            expect(block.getInputTargetBlock('PIN').type).toBe('arduino_pin_menu_digitalPins');

            const packageRoot = path.dirname(require.resolve('openblock-blocks/package.json'));
            vm.runInNewContext(fs.readFileSync(path.join(packageRoot, 'core/device.js'), 'utf8'), {
                Blockly,
                goog: {provide: () => {}}
            });
            workspace.getFlyout = () => ({getFlyoutItems: () => [block]});
            Blockly.mainWorkspace = workspace;
            expect(() => Blockly.Device.getPinOptions(digitalBlockType)).toThrow(/getOptions/);

            installDevicePinOptions(Blockly, {runtime});
            Blockly.mainWorkspace = null;
            expect(Blockly.Device.getPinOptions(digitalBlockType).length).toBe(14);
        } finally {
            workspace.dispose();
        }
    });

    test('reads fresh metadata after a board change instead of retaining the old pin list', () => {
        const nanoRuntime = createDeviceRuntime('arduinoNano');
        try {
            const analogBlockType = 'arduino_pin_readAnalogPin';
            expect(optionValues(Blockly.Device.getPinOptions(analogBlockType))).toEqual(
                ['A0', 'A1', 'A2', 'A3', 'A4', 'A5']);
            runtime._deviceBlockInfo = nanoRuntime._deviceBlockInfo;
            expect(optionValues(Blockly.Device.getPinOptions(analogBlockType))).toEqual(
                ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7']);
        } finally {
            nanoRuntime.dispose();
        }
    });

    test('supports legacy inline dropdowns and returns copies of the source option tuples', () => {
        const options = [['legacy pin', '7']];
        runtime._deviceBlockInfo = [{
            blocks: [{json: {type: 'legacyPin', args0: [{type: 'field_dropdown', name: 'PIN', options}]}}]
        }];
        const resolved = Blockly.Device.getPinOptions('legacyPin');
        expect(resolved).toEqual(options);
        resolved[0][0] = 'modified by dropdown';
        expect(options[0][0]).toBe('legacy pin');
    });

    test('evaluates dynamic menus again on each request without mutating returned metadata', () => {
        const category = runtime._deviceBlockInfo.find(info => info.id === 'arduino_pin');
        const menu = category.menus.find(info => info.json.type === 'arduino_pin_menu_digitalPins');
        let options = [['first pin', '3']];
        menu.json.args0[0].options = () => options;
        expect(Blockly.Device.getPinOptions(digitalBlockType)).toEqual(options);
        options = [['second pin', '9']];
        expect(Blockly.Device.getPinOptions(digitalBlockType)).toEqual(options);
    });

    test('reports missing device metadata without silently inventing a pin range', () => {
        runtime._deviceBlockInfo = [];
        expect(() => Blockly.Device.getPinOptions(digitalBlockType)).toThrow(
            'Pin options unavailable for device block: arduino_pin_setDigitalOutput');
    });

    test('registers the existing LCD and LED matrix pin dropdowns through the shared resolver', () => {
        const workspace = new Blockly.Workspace();
        try {
            [['displayLcd', 'displayLcd_init', 'RS'], ['ledMatrix', 'ledMatrix_matrixInit', 'DIN']]
                .forEach(([extension, opcode, field]) => {
                    loadExtensionScript('translations.js', extension)(Blockly);
                    loadExtensionScript('generator.js', extension)(Blockly);
                    loadExtensionScript('blocks.js', extension)(Blockly);
                    Blockly.ScratchMsgs.setLocale('en');
                    const block = workspace.newBlock(opcode);
                    expect(block.getField(field).getOptions()).toEqual(Blockly.Device.getPinOptions(digitalBlockType));
                });
        } finally {
            workspace.dispose();
        }
    });
});
