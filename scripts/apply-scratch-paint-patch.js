const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');

const root = path.resolve(__dirname, '..');
const patches = [
    {
        label: 'scratch-paint rotation center',
        packageDir: path.join(root, 'node_modules', 'scratch-paint'),
        applyDirectory: 'node_modules/scratch-paint',
        patchFile: path.join(root, 'patches', 'scratch-paint-rotation-center.patch'),
        markerFile: path.join(root, 'node_modules', 'scratch-paint', 'src', 'containers', 'paint-editor.jsx'),
        markerText: 'startRotationCenterPick'
    },
    {
        label: 'openblock-l10n Arduino begin translation',
        packageDir: path.join(root, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-arduino-begin-pt.patch'),
        markerFile: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'blocks', 'pt-br.json'),
        markerText: '"EVENT_WHENARDUINOBEGIN": "quando o Arduino iniciar"',
        jsonUpdates: [
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'blocks', 'pt-br.json'),
                values: {
                    EVENT_WHENARDUINOBEGIN: 'quando o Arduino iniciar'
                }
            },
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'blocks', 'pt.json'),
                values: {
                    EVENT_WHENARDUINOBEGIN: 'quando o Arduino iniciar'
                }
            }
        ]
    },
    {
        label: 'openblock-l10n paint rotation center translation',
        packageDir: path.join(root, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-paint-rotation-center-pt.patch'),
        markerFile: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'paint-editor', 'pt-br.json'),
        markerText: '"paint.paintEditor.rotationCenter": "Centro"',
        jsonUpdates: [
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'paint-editor', 'pt-br.json'),
                values: {
                    'paint.paintEditor.rotationCenter': 'Centro'
                }
            },
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'paint-editor', 'pt.json'),
                values: {
                    'paint.paintEditor.rotationCenter': 'Centro'
                }
            }
        ]
    },
    {
        label: 'openblock-l10n Web Serial connection translation',
        packageDir: path.join(root, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-web-serial-pt.patch'),
        markerFile: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
        markerText: '"gui.connection.scanning.arduinoWebSerialSelect": "Use Atualizar para selecionar seu Arduino USB"',
        jsonUpdates: [
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
                values: {
                    'gui.connection.type.label': 'Tipo de conexão',
                    'gui.connection.webSerial.notSecure': 'Web Serial exige HTTPS ou localhost.',
                    'gui.connection.webSerial.missingApi': 'Web Serial não está disponível. Use Chrome/Edge com HTTPS/localhost.',
                    'gui.connection.scanning.arduinoWebSerialSelect': 'Use Atualizar para selecionar seu Arduino USB'
                }
            },
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt.json'),
                values: {
                    'gui.connection.type.label': 'Tipo de ligação',
                    'gui.connection.webSerial.notSecure': 'Web Serial requer HTTPS ou localhost.',
                    'gui.connection.webSerial.missingApi': 'Web Serial não está disponível. Use Chrome/Edge com HTTPS/localhost.',
                    'gui.connection.scanning.arduinoWebSerialSelect': 'Use Refrescar para seleccionar o seu Arduino USB'
                }
            }
        ]
    },
    {
        label: 'openblock-l10n default project title translation',
        packageDir: path.join(root, 'node_modules', 'openblock-l10n'),
        applyDirectory: 'node_modules/openblock-l10n',
        patchFile: path.join(root, 'patches', 'openblock-l10n-default-project-title-pt.patch'),
        markerFile: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
        markerText: '"gui.gui.defaultProjectTitle": "Projeto DoGo Block"',
        jsonUpdates: [
            {
                file: path.join(root, 'node_modules', 'openblock-l10n', 'editor', 'interface', 'pt-br.json'),
                values: {
                    'gui.gui.defaultProjectTitle': 'Projeto DoGo Block'
                }
            }
        ]
    }
];

const gitApply = (patch, args) => spawnSync('git', ['apply'].concat(args), {
    cwd: root,
    encoding: 'utf8'
});

const patchArgs = patch => patch.applyDirectory ?
    [`--directory=${patch.applyDirectory}`, patch.patchFile] :
    [patch.patchFile];

const applyJsonUpdates = patch => {
    if (!patch.jsonUpdates) return false;

    patch.jsonUpdates.forEach(update => {
        if (!fs.existsSync(update.file)) return;
        const data = JSON.parse(fs.readFileSync(update.file, 'utf8'));
        Object.keys(update.values).forEach(key => {
            data[key] = update.values[key];
        });
        fs.writeFileSync(update.file, `${JSON.stringify(data, null, 4)}\n`);
    });

    return true;
};

for (const patch of patches) {
    if (!fs.existsSync(patch.packageDir) || !fs.existsSync(patch.patchFile)) {
        continue;
    }

    if (
        patch.markerFile &&
        patch.markerText &&
        fs.existsSync(patch.markerFile) &&
        fs.readFileSync(patch.markerFile, 'utf8').includes(patch.markerText)
    ) {
        console.log(`${patch.label} patch already applied.`);
        continue;
    }

    if (applyJsonUpdates(patch)) {
        console.log(`Applied ${patch.label} JSON updates.`);
        continue;
    }

    const check = gitApply(patch, ['--check'].concat(patchArgs(patch)));
    if (check.status !== 0) {
        console.error(check.stderr || check.stdout);
        process.exit(check.status || 1);
    }

    const apply = gitApply(patch, patchArgs(patch));
    if (apply.status !== 0) {
        console.error(apply.stderr || apply.stdout);
        process.exit(apply.status || 1);
    }

    console.log(`Applied ${patch.label} patch.`);
}
