/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';

import {
    EDITOR_THEME_ATTRIBUTE,
    EDITOR_THEME_STORAGE_KEY,
    EditorThemeProvider,
    readEditorTheme,
    useEditorTheme
} from '../../../src/lib/editor-theme.jsx';

const ThemeControl = () => {
    const {theme, toggleTheme} = useEditorTheme();
    return <button onClick={toggleTheme}>{theme}</button>;
};

describe('Editor theme preference and lifecycle', () => {
    let wrapper;
    let storage;
    let storedValues;
    const originalStorage = Object.getOwnPropertyDescriptor(window, 'localStorage');
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
        storedValues = {};
        storage = {
            getItem: jest.fn(key => storedValues[key] || null),
            setItem: jest.fn((key, value) => {
                storedValues[key] = value;
            })
        };
        Object.defineProperty(window, 'localStorage', {configurable: true, value: storage});
        window.matchMedia = jest.fn(() => ({matches: false}));
        document.documentElement.removeAttribute(EDITOR_THEME_ATTRIBUTE);
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
        wrapper = null;
        document.documentElement.removeAttribute(EDITOR_THEME_ATTRIBUTE);
        if (originalStorage) Object.defineProperty(window, 'localStorage', originalStorage);
        else delete window.localStorage;
        window.matchMedia = originalMatchMedia;
    });

    const render = (enabled = true) => {
        wrapper = mount(<EditorThemeProvider enabled={enabled}><ThemeControl /></EditorThemeProvider>);
        return wrapper;
    };

    test('uses the system preference on the first visit without persisting it', () => {
        window.matchMedia = jest.fn(() => ({matches: true}));
        render();
        expect(wrapper.find('button').text()).toBe('dark');
        expect(document.documentElement.getAttribute(EDITOR_THEME_ATTRIBUTE)).toBe('dark');
        expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
        expect(storage.setItem).not.toHaveBeenCalled();
    });

    ['light', 'dark'].forEach(theme => {
        test(`restores an explicit ${theme} preference before consulting the system`, () => {
            storedValues[EDITOR_THEME_STORAGE_KEY] = theme;
            window.matchMedia = jest.fn(() => ({matches: theme === 'light'}));
            render();
            expect(wrapper.find('button').text()).toBe(theme);
            expect(document.documentElement.getAttribute(EDITOR_THEME_ATTRIBUTE)).toBe(theme);
            expect(window.matchMedia).not.toHaveBeenCalled();
        });
    });

    test('ignores invalid stored values and falls back to the system', () => {
        storedValues[EDITOR_THEME_STORAGE_KEY] = 'unexpected-value';
        window.matchMedia = jest.fn(() => ({matches: true}));
        expect(readEditorTheme()).toBe('dark');
    });

    test('uses light when system appearance detection is unavailable', () => {
        delete window.matchMedia;
        expect(readEditorTheme()).toBe('light');
        window.matchMedia = () => {
            throw new Error('Unavailable');
        };
        expect(readEditorTheme()).toBe('light');
    });

    test('switches both ways and remembers the selection after remounting', () => {
        render();
        wrapper.find('button').simulate('click');
        expect(document.documentElement.getAttribute(EDITOR_THEME_ATTRIBUTE)).toBe('dark');
        expect(storage.setItem).toHaveBeenLastCalledWith(EDITOR_THEME_STORAGE_KEY, 'dark');
        wrapper.unmount();
        render();
        expect(wrapper.find('button').text()).toBe('dark');
        wrapper.find('button').simulate('click');
        expect(document.documentElement.getAttribute(EDITOR_THEME_ATTRIBUTE)).toBe('light');
        expect(storage.setItem).toHaveBeenLastCalledWith(EDITOR_THEME_STORAGE_KEY, 'light');
    });

    test('continues to switch when reading and writing storage are blocked', () => {
        Object.defineProperty(window, 'localStorage', {
            configurable: true,
            get: () => {
                throw new Error('Storage blocked');
            }
        });
        render();
        wrapper.find('button').simulate('click');
        expect(wrapper.find('button').text()).toBe('dark');
        expect(document.documentElement.getAttribute(EDITOR_THEME_ATTRIBUTE)).toBe('dark');
    });

    test('does not remount editor children or erase their input when switching', () => {
        const didMount = jest.fn();
        class EditorState extends React.Component {
            componentDidMount () {
                didMount();
            }
            render () {
                return <input defaultValue="project contents" />;
            }
        }
        wrapper = mount(
            <EditorThemeProvider>
                <EditorState />
                <ThemeControl />
            </EditorThemeProvider>
        );
        const input = wrapper.find('input').getDOMNode();
        input.value = 'unsaved project contents';
        wrapper.find('button').simulate('click');
        expect(didMount).toHaveBeenCalledTimes(1);
        expect(wrapper.find('input').getDOMNode()).toBe(input);
        expect(input.value).toBe('unsaved project contents');
    });

    test('removes editor appearance when leaving the editor', () => {
        render();
        wrapper.find('button').simulate('click');
        wrapper.unmount();
        wrapper = null;
        expect(document.documentElement.hasAttribute(EDITOR_THEME_ATTRIBUTE)).toBe(false);
    });

    test('restores an existing appearance marker on unmount', () => {
        document.documentElement.setAttribute(EDITOR_THEME_ATTRIBUTE, 'host-appearance');
        render();
        wrapper.find('button').simulate('click');
        wrapper.unmount();
        wrapper = null;
        expect(document.documentElement.getAttribute(EDITOR_THEME_ATTRIBUTE)).toBe('host-appearance');
    });

    test('keeps standalone player and custom children outside editor appearance', () => {
        render(false);
        expect(document.documentElement.hasAttribute(EDITOR_THEME_ATTRIBUTE)).toBe(false);
        wrapper.setProps({enabled: true});
        expect(document.documentElement.getAttribute(EDITOR_THEME_ATTRIBUTE)).toBe('light');
        wrapper.setProps({enabled: false});
        expect(document.documentElement.hasAttribute(EDITOR_THEME_ATTRIBUTE)).toBe(false);
    });
});
