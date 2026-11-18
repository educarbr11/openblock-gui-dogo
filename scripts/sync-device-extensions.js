/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const GUI_ROOT = path.resolve(__dirname, '..');
const REQUIRED_FILES = ['index.js', 'msg.json', 'blocks.js', 'generator.js', 'toolbox.js', 'translations.js'];

const listFiles = directory => {
    const files = [];
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isSymbolicLink()) throw new Error(`Symlinks are not supported: ${fullPath}`);
        if (entry.isDirectory()) {
            files.push(...listFiles(fullPath).map(file => path.join(entry.name, file)));
        } else if (entry.isFile()) {
            files.push(entry.name);
        }
    }
    return files.sort();
};

// Copy only files owned by the selected extension; never prune another module or toolchain.
const syncTree = (source, target, check, mismatches) => {
    for (const file of listFiles(source)) {
        const from = path.join(source, file);
        const to = path.join(target, file);
        const expected = fs.readFileSync(from);
        if (fs.existsSync(to) && fs.readFileSync(to).equals(expected)) continue;
        if (check) {
            mismatches.push(to);
        } else {
            fs.mkdirSync(path.dirname(to), {recursive: true});
            fs.copyFileSync(from, to);
        }
    }
};

const syncDeviceExtension = (extensionId, options = {}) => {
    if (!/^[a-z][a-zA-Z0-9]*$/.test(extensionId || '')) {
        throw new Error('Provide a device extension ID, for example: fingerprint');
    }
    const guiRoot = options.guiRoot || GUI_ROOT;
    const workspace = path.dirname(guiRoot);
    const source = path.join(guiRoot, 'static', 'device-extensions', extensionId);
    for (const file of REQUIRED_FILES) {
        if (!fs.existsSync(path.join(source, file))) throw new Error(`Missing extension file: ${file}`);
    }
    // Load the selected, repository-owned plugin's metadata.
    // eslint-disable-next-line global-require
    const manifest = require(path.join(source, 'index.js'))(message => message.default);
    if (manifest.extensionId !== extensionId) throw new Error('Manifest extensionId does not match its directory');
    const targets = [];
    for (const repository of ['openblock-agent', 'openblock-desktop']) {
        const repoRoot = path.join(workspace, repository);
        if (fs.existsSync(path.join(repoRoot, 'package.json'))) {
            targets.push([source, path.join(repoRoot, 'local-resources', 'extensions', extensionId)]);
        }
    }
    if (manifest.library) {
        if (manifest.library !== 'lib') throw new Error('Extension libraries must use the local lib directory');
        const libraries = path.join(source, 'lib');
        const libraryTargets = [];
        const apiRoot = path.join(workspace, 'openblock-api');
        if (fs.existsSync(path.join(apiRoot, 'package.json'))) {
            libraryTargets.push(path.join(apiRoot, 'compiler', 'libraries'));
        }
        if (options.withToolchains) {
            for (const repository of ['openblock-agent', 'openblock-desktop']) {
                const arduinoRoot = path.join(workspace, repository, 'tools', 'Arduino');
                if (fs.existsSync(arduinoRoot)) libraryTargets.push(path.join(arduinoRoot, 'libraries'));
            }
        }
        for (const library of fs.readdirSync(libraries, {withFileTypes: true})) {
            if (!library.isDirectory()) continue;
            const librarySource = path.join(libraries, library.name);
            if (!fs.existsSync(path.join(librarySource, 'library.properties'))) {
                throw new Error(`Missing library.properties: ${librarySource}`);
            }
            for (const target of libraryTargets) {
                targets.push([librarySource, path.join(target, library.name)]);
            }
        }
    }
    const mismatches = [];
    for (const [from, to] of targets) syncTree(from, to, options.check, mismatches);
    if (mismatches.length) throw new Error(`Extension copies are out of sync:\n${mismatches.join('\n')}`);
    return targets.map(([, target]) => target);
};

if (require.main === module) {
    try {
        const args = process.argv.slice(2);
        const unknown = args.filter(arg => arg.startsWith('--') &&
            !['--check', '--with-toolchains'].includes(arg));
        const ids = args.filter(arg => !arg.startsWith('--'));
        if (unknown.length || ids.length !== 1) {
            throw new Error('Usage: node scripts/sync-device-extensions.js <id> [--check] [--with-toolchains]');
        }
        const targets = syncDeviceExtension(ids[0], {
            check: args.includes('--check'),
            withToolchains: args.includes('--with-toolchains')
        });
        const action = args.includes('--check') ? 'verified' : 'synchronized';
        console.log(`${ids[0]}: ${action} ${targets.length} destinations`);
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}

module.exports = {syncDeviceExtension};
