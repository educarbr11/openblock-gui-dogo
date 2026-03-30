import {addLocaleData} from 'react-intl';

import {localeData, isRtl} from 'openblock-l10n';
import editorMessages from 'openblock-l10n/locales/editor-msgs';
import ptBrMessages from '../../translations/pt.json';

addLocaleData(localeData);

const UPDATE_LOCALES = 'scratch-gui/locales/UPDATE_LOCALES';
const SELECT_LOCALE = 'scratch-gui/locales/SELECT_LOCALE';

const normalizeLocale = locale => (locale || '').replace('_', '-').toLowerCase();

const englishMessages = editorMessages.en || {};
const portugueseMessages = Object.assign({}, englishMessages, ptBrMessages);

const messagesByLocale = Object.assign({}, editorMessages, {
    'pt': portugueseMessages,
    'pt-br': portugueseMessages
});

const resolveMessages = locale => messagesByLocale[normalizeLocale(locale)];

const initialState = {
    isRtl: false,
    locale: 'pt-br',
    messagesByLocale: messagesByLocale,
    messages: messagesByLocale['pt-br']
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SELECT_LOCALE:
    {
        const locale = normalizeLocale(action.locale);
        return Object.assign({}, state, {
            isRtl: isRtl(locale),
            locale: locale,
            messagesByLocale: state.messagesByLocale,
            messages: resolveMessages(locale)
        });
    }
    case UPDATE_LOCALES:
        return Object.assign({}, state, {
            isRtl: state.isRtl,
            locale: state.locale,
            messagesByLocale: action.messagesByLocale,
            messages: action.messagesByLocale[state.locale]
        });
    default:
        return state;
    }
};

const selectLocale = function (locale) {
    return {
        type: SELECT_LOCALE,
        locale: locale
    };
};

const setLocales = function (localesMessages) {
    return {
        type: UPDATE_LOCALES,
        messagesByLocale: localesMessages
    };
};
const initLocale = function (currentState, locale) {
    const normalizedLocale = normalizeLocale(locale);
    if (currentState.messagesByLocale.hasOwnProperty(normalizedLocale)) {
        return Object.assign(
            {},
            currentState,
            {
                isRtl: isRtl(normalizedLocale),
                locale: normalizedLocale,
                messagesByLocale: currentState.messagesByLocale,
                messages: currentState.messagesByLocale[normalizedLocale]
            }
        );
    }
    // don't change locale if it's not in the current messages
    return currentState;
};
export {
    reducer as default,
    initialState as localesInitialState,
    initLocale,
    selectLocale,
    setLocales
};
