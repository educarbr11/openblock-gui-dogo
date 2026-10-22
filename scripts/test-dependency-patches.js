const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const applyGitPatch = require('./lib/apply-git-patch');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dogoblock-patch-test-'));
const directory = 'node_modules/scratch-paint';
const before = 'const enabled = false;\n';
const after = 'const enabled = true;\n';
const patch = [
    'diff --git a/src/example.js b/src/example.js',
    '--- a/src/example.js',
    '+++ b/src/example.js',
    '@@ -1 +1 @@',
    '-const enabled = false;',
    '+const enabled = true;',
    'diff --git a/src/added.js b/src/added.js',
    'new file mode 100644',
    '--- /dev/null',
    '+++ b/src/added.js',
    '@@ -0,0 +1 @@',
    '+module.exports = true;',
    ''
].join('\n');

const createFixture = (name, content) => {
    const cwd = path.join(root, name);
    const source = path.join(cwd, directory, 'src', 'example.js');
    const added = path.join(cwd, directory, 'src', 'added.js');
    const patchFile = path.join(cwd, 'example.patch');
    fs.mkdirSync(path.dirname(source), {recursive: true});
    fs.writeFileSync(source, before);
    fs.writeFileSync(patchFile, content);
    return {cwd, source, added, patchFile};
};

try {
    for (const lineEnding of ['LF', 'CRLF']) {
        const content = lineEnding === 'CRLF' ? patch.replace(/\n/g, '\r\n') : patch;
        const fixture = createFixture(lineEnding, content);
        const args = [`--directory=${directory}`];
        const check = applyGitPatch(fixture.patchFile, ['--check'].concat(args), fixture.cwd);
        assert.strictEqual(check.status, 0, check.stderr || String(check.error));
        assert.strictEqual(fs.readFileSync(fixture.source, 'utf8'), before);
        assert.strictEqual(fs.existsSync(fixture.added), false);

        const result = applyGitPatch(fixture.patchFile, args, fixture.cwd);
        assert.strictEqual(result.status, 0, result.stderr || String(result.error));
        assert.strictEqual(fs.readFileSync(fixture.source, 'utf8'), after);
        assert.strictEqual(fs.readFileSync(fixture.added, 'utf8'), 'module.exports = true;\n');
        process.stdout.write(`Dependency patch with ${lineEnding}: passed\n`);
    }

    const incompatible = createFixture('incompatible', patch);
    fs.writeFileSync(incompatible.source, 'const differentVersion = true;\n');
    const check = applyGitPatch(incompatible.patchFile, [
        '--check', `--directory=${directory}`
    ], incompatible.cwd);
    assert.notStrictEqual(check.status, 0, 'Incompatible dependencies must fail validation');
    assert.strictEqual(fs.readFileSync(incompatible.source, 'utf8'), 'const differentVersion = true;\n');
    assert.strictEqual(fs.existsSync(incompatible.added), false);
    process.stdout.write('Incompatible dependency rejected without modifying files: passed\n');
} finally {
    fs.rmSync(root, {recursive: true, force: true});
}
