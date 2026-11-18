/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const runNode = (label, args, cwd = root) => {
    console.log(`\n${label}`);
    const result = spawnSync(process.execPath, args, {
        cwd,
        stdio: 'inherit',
        env: {...process.env, CI: 'true'},
        timeout: 600000
    });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status || 1);
};

runNode('Fingerprint blocks, translations, toolbox and generated code', [
    'node_modules/jest/bin/jest.js', '--runInBand', 'test/unit/device-extensions/fingerprint.test.js',
    'test/unit/containers/extension-library-loading.test.jsx', 'test/unit/util/device-pin-options.test.js'
]);
runNode('Native Fingerprint state and sensor error handling', ['scripts/test-fingerprint-native.js']);
runNode('VM catalog, loading, SB3 persistence and restoration', [
    'test/unit/device_extension_fingerprint.js'
], path.resolve(root, '../openblock-vm'));
runNode('Extension synchronization behavior', ['scripts/test-sync-device-extensions.js']);
runNode('Cross-repository extension copies', ['scripts/sync-device-extensions.js', 'fingerprint', '--check']);

const api = path.resolve(root, '../openblock-api');
if (fs.existsSync(path.join(api, 'package.json'))) {
    runNode('Online compiler library contract', [
        'node_modules/jest/bin/jest.js', '--runInBand', 'create-arduino-compile-job.dto.spec.ts'
    ], api);
}
const agent = path.resolve(root, '../openblock-agent');
if (fs.existsSync(path.join(agent, 'package.json'))) {
    runNode('Offline compiler resource packaging', ['--test', 'test/fingerprint-resources.test.js'], agent);
}
const tauri = path.resolve(root, '../openblock-tauri');
if (fs.existsSync(path.join(tauri, 'package.json'))) {
    runNode('Tauri offline toolchain requirements', ['scripts/test-prepare-desktop-resources.js'], tauri);
}
runNode('Real AVR compilation for all supported boards', ['scripts/test-fingerprint-compile.js']);
console.log('\nFingerprint validation completed. Physical wiring/enrollment still requires the sensor.');
