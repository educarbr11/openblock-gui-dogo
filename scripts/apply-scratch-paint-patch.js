const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const packageDir = path.join(root, 'node_modules', 'scratch-paint');
const patchFile = path.join(root, 'patches', 'scratch-paint-rotation-center.patch');

const gitApply = args => spawnSync('git', ['apply'].concat(args), {
    cwd: packageDir,
    encoding: 'utf8'
});

if (!fs.existsSync(packageDir) || !fs.existsSync(patchFile)) {
    process.exit(0);
}

if (gitApply(['--reverse', '--check', patchFile]).status === 0) {
    console.log('scratch-paint rotation center patch already applied.');
    process.exit(0);
}

const check = gitApply(['--check', patchFile]);
if (check.status !== 0) {
    console.error(check.stderr || check.stdout);
    process.exit(check.status || 1);
}

const apply = gitApply([patchFile]);
if (apply.status !== 0) {
    console.error(apply.stderr || apply.stdout);
    process.exit(apply.status || 1);
}

console.log('Applied scratch-paint rotation center patch.');
