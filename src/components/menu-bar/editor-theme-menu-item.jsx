import {Moon} from 'lucide-react';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import {useEditorTheme} from '../../lib/editor-theme.jsx';
import EditorHeaderAction from './editor-header-action.jsx';
import headerMessages from './editor-header-messages';

const messages = defineMessages({
    darkTheme: {
        id: 'gui.menuBar.header.darkTheme',
        defaultMessage: 'Dark theme',
        description: 'Editor appearance toggle in the More menu'
    },
    darkThemeHint: {
        id: 'gui.menuBar.header.darkThemeHint',
        defaultMessage: 'Switch the editor between light and dark appearance.',
        description: 'Explanation of the editor appearance toggle'
    }
});

const EditorThemeMenuItem = ({intl}) => {
    const {theme, toggleTheme} = useEditorTheme();
    const isDark = theme === 'dark';
    return (
        <EditorHeaderAction
            checked={isDark}
            hint={intl.formatMessage(messages.darkThemeHint)}
            icon={Moon}
            label={intl.formatMessage(messages.darkTheme)}
            stateLabel={intl.formatMessage(isDark ? headerMessages.enabled : headerMessages.disabled)}
            onClick={toggleTheme}
        />
    );
};

EditorThemeMenuItem.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(EditorThemeMenuItem);
