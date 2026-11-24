const fs = require('fs');
const path = require('path');
const vm = require('vm');
const {jsdom} = require('jsdom');
const installDevicePinOptions = require('../../src/lib/device-pin-options');

const extensionPath = path.resolve(__dirname, '../../static/device-extensions/fingerprint');
const localVMPath = path.resolve(__dirname, '../../../openblock-vm');
const vmPath = process.env.OPENBLOCK_VM_PATH || (fs.existsSync(path.join(localVMPath, 'src/engine/runtime.js')) ?
    localVMPath : path.dirname(require.resolve('openblock-vm/package.json')));
const Runtime = require(path.join(vmPath, 'src/engine/runtime'));
const formatMessage = require(path.join(vmPath, 'node_modules/format-message'));
const originalMessageSettings = formatMessage.setup();
formatMessage.setup({missingTranslation: 'ignore'});
const ArduinoUno = require(path.join(vmPath, 'src/devices/arduinoUno/arduinoUno'));
const ArduinoNano = require(path.join(vmPath, 'src/devices/arduinoUno/arduinoNano'));
const ArduinoLeonardo = require(path.join(vmPath, 'src/devices/arduinoLeonardo/arduinoLeonardo'));
const devices = {
    arduinoUno: ArduinoUno,
    arduinoNano: ArduinoNano,
    arduinoLeonardo: ArduinoLeonardo
};
formatMessage.setup(originalMessageSettings);
let realBlockly;
let deviceRuntime;

const loadExtensionScript = (filename, extensionId = 'fingerprint') => {
    const sandbox = {module: {exports: {}}, exports: null};
    const scriptPath = path.join(path.dirname(extensionPath), extensionId, filename);
    vm.runInNewContext(fs.readFileSync(scriptPath, 'utf8'), sandbox, {filename});
    return sandbox.exports;
};

const createDeviceRuntime = (deviceId = 'arduinoUno') => {
    const Device = devices[deviceId];
    if (!Device) throw new Error(`Unsupported test device: ${deviceId}`);
    const runtime = new Runtime();
    const messageSettings = formatMessage.setup();
    formatMessage.setup({missingTranslation: 'ignore'});
    try {
        // Reading the real metadata through the prototype avoids constructing/connecting a peripheral.
        const categories = Object.create(Device.prototype).getInfo();
        categories.forEach(category => {
            category.id = `arduino_${category.id}`;
            Object.keys(category.menus || {}).forEach(name => {
                const menu = category.menus[name];
                if (!menu.items) category.menus[name] = {items: menu};
            });
            const metadata = {
                id: category.id,
                name: category.name,
                color1: category.color1,
                color2: category.color2,
                color3: category.color3
            };
            runtime._fillExtensionCategory(metadata, category);
            runtime._deviceBlockInfo.push(metadata);
        });
        return runtime;
    } finally {
        formatMessage.setup(messageSettings);
    }
};

const loadRealBlockly = () => {
    if (realBlockly) return realBlockly;
    const documentRef = typeof document === 'undefined' ?
        jsdom('<!doctype html><html><body></body></html>') : document;
    const windowRef = documentRef.defaultView;
    const packageRoot = path.dirname(require.resolve('openblock-blocks/package.json'));
    const sandbox = vm.createContext({
        window: windowRef,
        document: documentRef,
        navigator: windowRef.navigator,
        XMLSerializer: windowRef.XMLSerializer,
        DOMParser: windowRef.DOMParser,
        console,
        setTimeout,
        clearTimeout
    });
    // Load the same published runtime, block and message files as the browser, without webpack's DOM shim.
    ['blockly_compressed_vertical.js', 'msg/messages.js', 'blocks_compressed.js', 'blocks_compressed_vertical.js',
        'msg/scratch_msgs.js']
        .forEach(filename => vm.runInContext(fs.readFileSync(path.join(packageRoot, filename), 'utf8'), sandbox,
            {filename}));
    vm.runInNewContext(fs.readFileSync(path.join(packageRoot, 'arduino_compressed.js'), 'utf8'), {
        require: () => sandbox.Blockly
    }, {filename: 'arduino_compressed.js'});
    realBlockly = sandbox.Blockly;
    return realBlockly;
};

const createBlockly = (deviceId = 'arduinoUno', locale = 'en') => {
    const Blockly = loadRealBlockly();
    Blockly.Device.setDevice(deviceId, 'arduino');
    if (deviceRuntime) deviceRuntime.dispose();
    deviceRuntime = createDeviceRuntime(deviceId);
    installDevicePinOptions(Blockly, {runtime: deviceRuntime});
    loadExtensionScript('translations.js')(Blockly);
    // Arduino hats are supplied dynamically by the selected device in the editor.
    Blockly.Blocks.event_whenarduinobegin = {
        init: function () {
            this.jsonInit({message0: Blockly.Msg.EVENT_WHENARDUINOBEGIN,
                extensions: ['colours_event', 'shape_hat']});
        }
    };
    loadExtensionScript('generator.js')(Blockly);
    loadExtensionScript('blocks.js')(Blockly);
    // Match handleDeviceExtensionAdded: locale is applied only after every registration function runs.
    Blockly.ScratchMsgs.setLocale(locale);
    return Blockly;
};

const numberXml = (name, value) => `<value name="${name}"><shadow type="math_whole_number">` +
    `<field name="NUM">${value}</field></shadow></value>`;
const commandXml = (opcode, contents = '') => `<block type="fingerprint_${opcode}">${contents}</block>`;

const createFullSketchXML = () => {
    const commands = [
        commandXml('init', '<field name="RX">10</field><field name="TX">11</field><field name="BAUD">57600</field>'),
        commandXml('verifyPassword'),
        commandXml('captureImage'),
        commandXml('image2Tz', '<field name="BUFFER">1</field>'),
        commandXml('captureImage'),
        commandXml('image2Tz', '<field name="BUFFER">2</field>'),
        commandXml('createModel'),
        commandXml('storeModel', numberXml('ID', 1)),
        commandXml('captureImage'),
        commandXml('image2Tz', '<field name="BUFFER">1</field>'),
        commandXml('search'),
        commandXml('deleteModel', numberXml('ID', 1)),
        commandXml('refreshTemplateCount')
    ];
    // Put reporters into real statement blocks so every opcode is compiled as a valid sketch.
    const reporters = ['lastStatus', 'fingerID', 'confidence', 'templateCount', 'statusConstant'];
    const variables = reporters.map(name => `<variable id="${name}" type="">${name}</variable>`).join('');
    reporters.forEach(opcode => commands.push(`<block type="data_setvariableto">` +
        `<field name="VARIABLE" id="${opcode}" variabletype="">${opcode}</field>` +
        `<value name="VALUE">${commandXml(opcode)}</value></block>`));
    commands.push(`<block type="control_if"><value name="CONDITION">${
        commandXml('lastOperationSucceeded')}</value></block>`);
    const stack = commands.reduceRight((next, command) => {
        if (!next) return command;
        return command.replace(/<\/block>$/, `<next>${next}</next></block>`);
    }, '');
    return `<xml xmlns="http://www.w3.org/1999/xhtml"><variables>${variables}</variables>` +
        `<block type="event_whenarduinobegin"><next>${stack}</next></block></xml>`;
};

const createFullSketch = (deviceId = 'arduinoUno') => {
    const Blockly = createBlockly(deviceId);
    const workspace = new Blockly.Workspace();
    try {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(createFullSketchXML()), workspace);
        return Blockly.Arduino.workspaceToCode(workspace);
    } finally {
        workspace.dispose();
    }
};

module.exports = {
    createBlockly,
    createDeviceRuntime,
    loadExtensionScript,
    createFullSketchXML,
    createFullSketch,
    buildSketch: createFullSketch,
    extensionPath
};
