const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const patches = [
    {
        label: 'scratch-paint rotation center',
        packageDir: path.join(root, 'node_modules', 'scratch-paint'),
        patchFile: path.join(root, 'patches', 'scratch-paint-rotation-center.patch')
    },
    {
        label: 'openblock-l10n Arduino begin translation',
        packageDir: path.join(root, 'node_modules', 'openblock-l10n'),
        patchFile: path.join(root, 'patches', 'openblock-l10n-arduino-begin-pt.patch')
    }
];

const gitApply = (packageDir, args) => spawnSync('git', ['apply'].concat(args), {
    cwd: packageDir,
    encoding: 'utf8'
});

for (const patch of patches) {
    if (!fs.existsSync(patch.packageDir) || !fs.existsSync(patch.patchFile)) {
        continue;
    }

    if (gitApply(patch.packageDir, ['--reverse', '--check', patch.patchFile]).status === 0) {
        console.log(`${patch.label} patch already applied.`);
        continue;
    }

    const check = gitApply(patch.packageDir, ['--check', patch.patchFile]);
    if (check.status !== 0) {
        console.error(check.stderr || check.stdout);
        process.exit(check.status || 1);
    }

    const apply = gitApply(patch.packageDir, [patch.patchFile]);
    if (apply.status !== 0) {
        console.error(apply.stderr || apply.stdout);
        process.exit(apply.status || 1);
    }

    console.log(`Applied ${patch.label} patch.`);
}
