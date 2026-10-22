import GoogleAnalytics from 'react-ga4';

import log from './log';

const PLACEHOLDER_GA_IDS = ['G-XXXXXXXXXX', 'UA-000000-01'];

const getConfiguredGaId = () => {
    const id = (process.env.GA_ID || window.GA_ID || '')
        .trim()
        .replace(/^:+/, '');
    if (!id || PLACEHOLDER_GA_IDS.includes(id)) return '';
    return id;
};

const GA_ID = getConfiguredGaId();
const GA_DEBUG = process.env.GA_DEBUG === 'true' || window.GA_DEBUG === true;
const GA_TEST_MODE = process.env.GA_TEST_MODE === 'true' || window.GA_TEST_MODE === true;

const initialAnalytics = (clientId = null) => {
    if (GA_ID) {
        const gaOptions = {
            forceSSL: true
        };
        if (clientId) {
            gaOptions.clientId = clientId;
        }

        const gtagOptions = {};
        if (GA_DEBUG) {
            gtagOptions.debug_mode = true;
        }

        GoogleAnalytics.initialize(GA_ID, {
            testMode: GA_TEST_MODE,
            gaOptions,
            gtagOptions
        });

        window.__DOGOBLOCK_ANALYTICS__ = {
            enabled: true,
            gaId: GA_ID,
            debug: GA_DEBUG,
            testMode: GA_TEST_MODE,
            nodeEnv: process.env.NODE_ENV
        };
    } else {
        log.info('Disabling GA because GA_ID is not set.');
        window.__DOGOBLOCK_ANALYTICS__ = {
            enabled: false,
            gaId: '',
            debug: GA_DEBUG,
            testMode: GA_TEST_MODE,
            nodeEnv: process.env.NODE_ENV
        };
        window.ga = () => {
            // The `react-ga` module calls this function to implement all Google Analytics calls. Providing an empty
            // function effectively disables `react-ga`. This is similar to the `testModeAPI` feature of `react-ga`
            // except that `testModeAPI` logs the arguments of every call into an array. That's nice for testing
            // purposes but would look like a memory leak in a live program.
        };
    }
};

export {
    GoogleAnalytics as default,
    initialAnalytics
};
