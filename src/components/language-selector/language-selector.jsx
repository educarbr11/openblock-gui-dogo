import PropTypes from 'prop-types';
import React from 'react';

import locales from 'openblock-l10n';
import styles from './language-selector.css';

// supported languages to exclude from the menu, but allow as a URL option
const ignore = [];
const selectableLocales = Object.assign({
    'pt-br': {
        name: 'Português (Brasil)'
    }
}, locales);

const LanguageSelector = ({currentLocale, label, onChange}) => (
    <select
        aria-label={label}
        className={styles.languageSelect}
        value={currentLocale}
        onChange={onChange}
    >
        {
            Object.keys(selectableLocales)
                .filter(l => !ignore.includes(l))
                .map(locale => (
                    <option
                        key={locale}
                        value={locale}
                    >
                        {selectableLocales[locale].name}
                    </option>
                ))
        }
    </select>
);

LanguageSelector.propTypes = {
    currentLocale: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default LanguageSelector;
