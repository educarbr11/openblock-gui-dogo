/* eslint-disable no-console */
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {syncDeviceExtension} = require('./sync-device-extensions');

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'dogoblock-extension-sync-'));
const write = (file, data) => {
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.writeFileSync(file, data);
};
try {
    const guiRoot = path.join(temporary, 'openblock-gui');
    const source = path.join(guiRoot, 'static', 'device-extensions', 'fingerprint');
    write(path.join(source, 'index.js'), "module.exports = () => ({extensionId: 'fingerprint', library: 'lib'});\n");
    for (const file of ['msg.json', 'blocks.js', 'generator.js', 'toolbox.js', 'translations.js']) {
        write(path.join(source, file), file === 'msg.json' ? '{}' : '// fixture\n');
    }
    write(path.join(source, 'lib', 'Sensor', 'library.properties'), 'name=Sensor\nversion=1.0.0\n');
    write(path.join(source, 'lib', 'Sensor', 'src', 'Sensor.h'), '// sensor\n');
    for (const repository of ['openblock-api', 'openblock-agent', 'openblock-desktop']) {
        write(path.join(temporary, repository, 'package.json'), '{}');
    }
    const agentTools = path.join(temporary, 'openblock-agent', 'tools', 'Arduino');
    fs.mkdirSync(agentTools, {recursive: true});
    const options = {guiRoot, withToolchains: true};
    const targets = syncDeviceExtension('fingerprint', options);
    assert.strictEqual(targets.length, 4);
    syncDeviceExtension('fingerprint', {...options, check: true});
    assert.strictEqual(fs.readFileSync(path.join(agentTools, 'libraries', 'Sensor', 'src', 'Sensor.h'), 'utf8'),
        '// sensor\n');
    const copy = path.join(temporary, 'openblock-desktop', 'local-resources', 'extensions', 'fingerprint', 'blocks.js');
    write(copy, '// stale copy\n');
    assert.throws(() => syncDeviceExtension('fingerprint', {...options, check: true}), /out of sync/);
    assert.strictEqual(fs.readFileSync(copy, 'utf8'), '// stale copy\n', 'check does not mutate files');
    syncDeviceExtension('fingerprint', options);
    assert.strictEqual(fs.readFileSync(copy, 'utf8'), '// fixture\n');
    assert.throws(() => syncDeviceExtension('../fingerprint', options), /extension ID/);
    assert.throws(() => syncDeviceExtension('missing', options), /Missing extension file/);
    console.log('Extension synchronization: copies, toolchains, drift detection and invalid IDs passed');
} finally {
    fs.rmSync(temporary, {recursive: true, force: true});
}
