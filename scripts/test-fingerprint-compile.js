/* eslint-disable no-console */
const fs = require('fs');
const os = require('os');
const path = require('path');
const {spawnSync} = require('child_process');
const {createFullSketch} = require('../test/helpers/fingerprint');

const root = path.resolve(__dirname, '..');
const tools = path.resolve(root, '../openblock-desktop/tools/Arduino');
const cli = process.env.ARDUINO_CLI ||
    path.join(tools, process.platform === 'win32' ? 'arduino-cli.exe' : 'arduino-cli');
const data = process.env.ARDUINO_DATA_DIR || tools;
const user = process.env.ARDUINO_USER_DIR || tools;
const libraries = path.join(root, 'static', 'device-extensions', 'fingerprint', 'lib');
const boards = [
    ['arduinoUno', 'arduino:avr:uno'],
    ['arduinoNano', 'arduino:avr:nano:cpu=atmega328old'],
    ['arduinoLeonardo', 'arduino:avr:leonardo']
];

if (!fs.existsSync(cli)) {
    throw new Error('Arduino CLI is required. Set ARDUINO_CLI, ARDUINO_DATA_DIR and ARDUINO_USER_DIR, ' +
        'or prepare openblock-desktop/tools/Arduino.');
}

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'dogoblock-fingerprint-compile-'));
try {
    const config = path.join(temporary, 'arduino-cli.yaml');
    // JSON strings are valid YAML scalars, including Windows paths and spaces.
    fs.writeFileSync(config, `directories:\n  data: ${JSON.stringify(data)}\n` +
        `  downloads: ${JSON.stringify(path.join(temporary, 'downloads'))}\n  user: ${JSON.stringify(user)}\n`);
    for (const [deviceId, fqbn] of boards) {
        const sketch = path.join(temporary, deviceId);
        fs.mkdirSync(sketch);
        const source = createFullSketch(deviceId);
        fs.writeFileSync(path.join(sketch, `${deviceId}.ino`), source);
        const result = spawnSync(cli, [
            '--config-file', config, 'compile', '--fqbn', fqbn,
            '--libraries', libraries, '--build-path', path.join(temporary, `build-${deviceId}`), sketch
        ], {encoding: 'utf8', timeout: 180000, maxBuffer: 8 * 1024 * 1024});
        if (result.error || result.status !== 0) {
            throw new Error(`${deviceId} compilation failed:\n${result.error || ''}\n` +
                `${result.stdout}\n${result.stderr}`);
        }
        const output = result.stdout.split(/\r?\n/).filter(line => /Sketch uses|Global variables|bytes/.test(line));
        console.log(`${deviceId}: compiled generated Blockly sketch (${fqbn})`);
        output.forEach(line => console.log(line));
    }
} finally {
    fs.rmSync(temporary, {recursive: true, force: true});
}
