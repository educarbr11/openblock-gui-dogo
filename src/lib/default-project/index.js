import projectData from './project-data';

/* eslint-disable import/no-unresolved */
import popWav from '!arraybuffer-loader!./83a9787d4cb6f3b7632b4ddfebf74367.wav';
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg';
import blueBitWalking1 from '!raw-loader!./04688b82900df9364793b3e21fdbbaf5.svg';
import blueBitWalking2 from '!raw-loader!./c0f9236edcef66bc28253b40857c335b.svg';
import blueBitWalking3 from '!raw-loader!./da4bb572e80cc08141b2f9d0a156d8fa.svg';
import blueBitWalking4 from '!raw-loader!./8cf2889132c6c536c2960e951fac17a8.svg';
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
        id: '04688b82900df9364793b3e21fdbbaf5',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(blueBitWalking1)
    }, {
        id: 'c0f9236edcef66bc28253b40857c335b',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(blueBitWalking2)
    }, {
        id: 'da4bb572e80cc08141b2f9d0a156d8fa',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(blueBitWalking3)
    }, {
        id: '8cf2889132c6c536c2960e951fac17a8',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(blueBitWalking4)
    }];
};

export default defaultProject;
