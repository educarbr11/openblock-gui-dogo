const fs = require('fs');
const os = require('os');
const path = require('path');
const {spawnSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const tests = path.join(root, 'test', 'native', 'fingerprint');
const libraries = path.join(root, 'static', 'device-extensions', 'fingerprint', 'lib');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'dogoblock-fingerprint-native-'));
const executable = path.join(temporary, process.platform === 'win32' ? 'fingerprint-test.exe' : 'fingerprint-test');

try {
    const compiler = process.env.CXX || 'g++';
    const result = spawnSync(compiler, [
        '-std=c++11', '-Wall', '-Wextra', '-Werror', '-D__AVR__',
        '-I', tests,
        '-I', path.join(libraries, 'Adafruit_Fingerprint'),
        '-I', path.join(libraries, 'DoGoFingerprint', 'src'),
        path.join(libraries, 'DoGoFingerprint', 'src', 'DoGoFingerprint.cpp'),
        path.join(tests, 'fake-driver.cpp'),
        path.join(tests, 'fingerprint_test.cpp'),
        '-o', executable
    ], {stdio: 'inherit'});
    if (result.error) throw result.error;
    if (result.status === 0) {
        const test = spawnSync(executable, [], {stdio: 'inherit'});
        if (test.error) throw test.error;
        process.exitCode = test.status || 0;
        if (test.signal) process.exitCode = 1;
    } else process.exitCode = result.status || 1;
} finally {
    fs.rmSync(temporary, {recursive: true, force: true});
}
