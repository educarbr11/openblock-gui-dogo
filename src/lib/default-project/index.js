import projectData from './project-data';

/* eslint-disable import/no-unresolved */
import popWav from '!arraybuffer-loader!./83a9787d4cb6f3b7632b4ddfebf74367.wav';
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg';
import blueBitTalking1 from '!raw-loader!./1a921caa44b897aa7d23880e5980e431.svg';
import blueBitTalking2 from '!raw-loader!./71c07db8b6b7cff4ed64d30572194583.svg';
import blueBitTalking3 from '!raw-loader!./44cd70c54f1484a6fb8497c7f4336edc.svg';
/* eslint-enable import/no-unresolved */

const defaultProject = translator => {
    let _TextEncoder;
    if (typeof TextEncoder === 'undefined') {
        _TextEncoder = require('text-encoding').TextEncoder;
    } else {
        /* global TextEncoder */
        _TextEncoder = TextEncoder;
    }
    const encoder = new _TextEncoder();

    const projectJson = projectData(translator);
    return [{
        id: 0,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    }, {
        id: '83a9787d4cb6f3b7632b4ddfebf74367',
        assetType: 'Sound',
        dataFormat: 'WAV',
        data: new Uint8Array(popWav)
    }, {
        id: 'cd21514d0531fdffb22204e0ec5ed84a',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }, {
        id: '1a921caa44b897aa7d23880e5980e431',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(blueBitTalking1)
    }, {
        id: '71c07db8b6b7cff4ed64d30572194583',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(blueBitTalking2)
    }, {
        id: '44cd70c54f1484a6fb8497c7f4336edc',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(blueBitTalking3)
    }];
};

export default defaultProject;
