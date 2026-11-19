import PropTypes from 'prop-types';
import React from 'react';

import '../css/editor-theme.css';
import '../css/editor-blockly-theme.css';

const EDITOR_THEME_STORAGE_KEY = 'dogoblock.editor-theme';
const EDITOR_THEME_ATTRIBUTE = 'data-editor-theme';

const readEditorTheme = () => {
    if (typeof window === 'undefined') return 'light';
    try {
        const stored = window.localStorage.getItem(EDITOR_THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
    } catch (error) {
        // Restricted storage must not prevent the editor from opening.
    }
    try {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
        return 'light';
    }
};

const saveEditorTheme = theme => {
    try {
        window.localStorage.setItem(EDITOR_THEME_STORAGE_KEY, theme);
    } catch (error) {
        // The selected theme still works for this editor session.
    }
};

const EditorThemeContext = React.createContext({theme: 'light', toggleTheme: () => {}});
const useEditorTheme = () => React.useContext(EditorThemeContext);

const EditorThemeProvider = ({children, enabled}) => {
    const [theme, setTheme] = React.useState(readEditorTheme);
    const toggleTheme = React.useCallback(() => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        saveEditorTheme(nextTheme);
    }, [theme]);
    const value = React.useMemo(() => ({theme, toggleTheme}), [theme, toggleTheme]);

    React.useLayoutEffect(() => {
        if (!enabled || typeof document === 'undefined') return;
        // Modals and Blockly popovers render outside the editor's DOM subtree.
        const root = document.documentElement;
        const previousTheme = root.getAttribute(EDITOR_THEME_ATTRIBUTE);
        root.setAttribute(EDITOR_THEME_ATTRIBUTE, theme);
        return () => {
            if (previousTheme === null) root.removeAttribute(EDITOR_THEME_ATTRIBUTE);
            else root.setAttribute(EDITOR_THEME_ATTRIBUTE, previousTheme);
        };
    }, [enabled, theme]);

    return <EditorThemeContext.Provider value={value}>{children}</EditorThemeContext.Provider>;
};

EditorThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
    enabled: PropTypes.bool
};
EditorThemeProvider.defaultProps = {enabled: true};

export {
    EDITOR_THEME_ATTRIBUTE,
    EDITOR_THEME_STORAGE_KEY,
    EditorThemeContext,
    EditorThemeProvider,
    readEditorTheme,
    useEditorTheme
};
