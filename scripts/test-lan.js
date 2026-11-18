const path = require('path');
const {spawnSync} = require('child_process');

const guiRoot = path.resolve(__dirname, '..');
const vmRoot = path.resolve(guiRoot, '../openblock-vm');
const linkRoot = path.resolve(guiRoot, '../openblock-link');
const run = (command, args, cwd) => {
    const result = spawnSync(command, args, {cwd, stdio: 'inherit', env: process.env});
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status || 1);
};

for (const file of ['test/unit/util_lan-client.js', 'test/unit/extension_lan.js', 'test/integration/lan-project.js']) {
    run(process.execPath, [file], vmRoot);
}
run(process.execPath, ['test/lan-session.test.js'], linkRoot);
run(process.execPath, [path.join(guiRoot, 'node_modules/jest/bin/jest.js'), '--runInBand', '--silent',
    'test/unit/util/vm-listener-lan.test.jsx',
    'test/unit/containers/gui-lan-lifecycle.test.jsx',
    'test/unit/containers/extension-library-loading.test.jsx'], guiRoot);
run(process.execPath, ['scripts/test-lan-e2e.js'], guiRoot);
if (process.argv.includes('--tauri')) {
    run('cargo', ['test', '--offline', '--lib', 'lan'], path.resolve(guiRoot, '../openblock-tauri/src-tauri'));
}
