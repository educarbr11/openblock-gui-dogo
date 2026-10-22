const fs = require('fs');
const {spawnSync} = require('child_process');

module.exports = (patchFile, args, cwd) => spawnSync('git', ['apply'].concat(args, '-'), {
    cwd,
    encoding: 'utf8',
    // Windows checkouts can contain CRLF patches, while npm packages use LF.
    input: fs.readFileSync(patchFile, 'utf8').replace(/\r\n/g, '\n')
});
