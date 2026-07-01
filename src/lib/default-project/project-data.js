import {defineMessages} from 'react-intl';
import sharedMessages from '../shared-messages';

let messages = defineMessages({
    chirp: {
        defaultMessage: 'Chirp',
        description: 'Name for the chirp sound',
        id: 'gui.defaultProject.chirp'
    },
    variable: {
        defaultMessage: 'my variable',
        description: 'Name for the default variable',
        id: 'gui.defaultProject.variable'
    }
});

messages = {...messages, ...sharedMessages};

// use the default message if a translation function is not passed
const defaultTranslator = msgObj => msgObj.defaultMessage;

/**
 * Generate a localized version of the default project
 * @param {function} translateFunction a function to use for translating the default names
 * @return {object} the project data json for the default project
 */
const projectData = translateFunction => {
    const translator = translateFunction || defaultTranslator;
    return ({
        targets: [
            {
                isStage: true,
                name: 'Stage',
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: 'cd21514d0531fdffb22204e0ec5ed84a',
                        name: translator(messages.backdrop, {index: 1}),
                        md5ext: 'cd21514d0531fdffb22204e0ec5ed84a.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 240,
                        rotationCenterY: 180
                    }
                ],
                sounds: [
                    {
                        assetId: '83a9787d4cb6f3b7632b4ddfebf74367',
                        name: translator(messages.pop),
                        dataFormat: 'wav',
                        format: '',
                        rate: 11025,
                        sampleCount: 258,
                        md5ext: '83a9787d4cb6f3b7632b4ddfebf74367.wav'
                    }
                ],
                volume: 100
            },
            {
                isStage: false,
                name: 'Blue Bit',
                variables: {},
                lists: {},
                broadcasts: {},
                blocks: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: '1a921caa44b897aa7d23880e5980e431',
                        name: 'bluebitfalando-01',
                        bitmapResolution: 1,
                        md5ext: '1a921caa44b897aa7d23880e5980e431.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 56,
                        rotationCenterY: 121
                    },
                    {
                        assetId: '71c07db8b6b7cff4ed64d30572194583',
                        name: 'bluebitfalando-02',
                        bitmapResolution: 1,
                        md5ext: '71c07db8b6b7cff4ed64d30572194583.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 56,
                        rotationCenterY: 120
                    },
                    {
                        assetId: '44cd70c54f1484a6fb8497c7f4336edc',
                        name: 'bluebitfalando-03',
                        bitmapResolution: 1,
                        md5ext: '44cd70c54f1484a6fb8497c7f4336edc.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 56,
                        rotationCenterY: 121
                    }
                ],
                sounds: [],
                volume: 100,
                visible: true,
                x: 0,
                y: 0,
                size: 100,
                direction: 90,
                draggable: false,
                rotationStyle: 'all around'
            }
        ],
        meta: {
            semver: '3.0.0',
            vm: '0.1.0',
            agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36' // eslint-disable-line max-len
        }
    });
};


export default projectData;
