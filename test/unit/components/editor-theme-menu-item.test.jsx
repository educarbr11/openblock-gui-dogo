/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';
import {IntlProvider} from 'react-intl';

import {
    EDITOR_THEME_ATTRIBUTE,
    EDITOR_THEME_STORAGE_KEY,
    EditorThemeContext,
    EditorThemeProvider
} from '../../../src/lib/editor-theme.jsx';
import EditorActionsMenu from '../../../src/components/menu-bar/editor-actions-menu.jsx';
import EditorThemeMenuItem from '../../../src/components/menu-bar/editor-theme-menu-item.jsx';

describe('Editor theme menu item', () => {
    let wrapper;
    let toggleTheme;
    let host;
    const originalStorage = Object.getOwnPropertyDescriptor(window, 'localStorage');

    beforeEach(() => {
        host = document.createElement('div');
        document.body.appendChild(host);
    });

    const render = (theme = 'light', withMenu = false) => {
        toggleTheme = jest.fn();
        const item = <EditorThemeMenuItem />;
        wrapper = mount(
            <IntlProvider locale="en">
                <EditorThemeContext.Provider value={{theme, toggleTheme}}>
                    {withMenu ? <EditorActionsMenu label="More">{item}</EditorActionsMenu> : item}
                </EditorThemeContext.Provider>
            </IntlProvider>,
            {attachTo: host}
        );
    };

    afterEach(() => {
        if (wrapper) wrapper.unmount();
        host.parentNode.removeChild(host);
        if (originalStorage) Object.defineProperty(window, 'localStorage', originalStorage);
        else delete window.localStorage;
    });

    test('exposes the current light appearance as an unchecked menu checkbox', () => {
        render();
        const button = wrapper.find('button[role="menuitemcheckbox"]');
        expect(button.prop('aria-checked')).toBe(false);
        expect(button.text()).toContain('Dark theme');
        expect(button.text()).toContain('Off');
        expect(button.prop('title')).toContain('light and dark');
    });

    test('exposes the current dark appearance as a checked menu checkbox', () => {
        render('dark');
        const button = wrapper.find('button[role="menuitemcheckbox"]');
        expect(button.prop('aria-checked')).toBe(true);
        expect(button.text()).toContain('On');
    });

    test('requests a theme change without invoking it during render', () => {
        render();
        expect(toggleTheme).not.toHaveBeenCalled();
        wrapper.find('button[role="menuitemcheckbox"]').simulate('click');
        expect(toggleTheme).toHaveBeenCalledTimes(1);
    });

    test('is keyboard reachable through More and returns focus after changing appearance', () => {
        render('light', true);
        const trigger = wrapper.find('button[aria-haspopup="menu"]');
        trigger.simulate('keyDown', {key: 'ArrowDown'});
        const item = wrapper.find('button[role="menuitemcheckbox"]');
        expect(document.activeElement).toBe(item.getDOMNode());
        item.simulate('click');
        expect(toggleTheme).toHaveBeenCalledTimes(1);
        expect(wrapper.find('[role="menu"]').exists()).toBe(false);
        expect(document.activeElement).toBe(trigger.getDOMNode());
    });

    test('changes and remembers the appearance with the real provider while keeping More usable', () => {
        const storage = {getItem: () => 'light', setItem: jest.fn()};
        Object.defineProperty(window, 'localStorage', {configurable: true, value: storage});
        wrapper = mount(
            <IntlProvider locale="en">
                <EditorThemeProvider>
                    <EditorActionsMenu label="More"><EditorThemeMenuItem /></EditorActionsMenu>
                </EditorThemeProvider>
            </IntlProvider>,
            {attachTo: host}
        );

        wrapper.find('button[aria-haspopup="menu"]').simulate('click');
        wrapper.find('button[role="menuitemcheckbox"]').simulate('click');
        expect(document.documentElement.getAttribute(EDITOR_THEME_ATTRIBUTE)).toBe('dark');
        expect(storage.setItem).toHaveBeenLastCalledWith(EDITOR_THEME_STORAGE_KEY, 'dark');
        expect(wrapper.find('[role="menu"]').exists()).toBe(false);

        wrapper.find('button[aria-haspopup="menu"]').simulate('click');
        expect(wrapper.find('button[role="menuitemcheckbox"]').prop('aria-checked')).toBe(true);
        wrapper.find('button[role="menuitemcheckbox"]').simulate('click');
        expect(document.documentElement.getAttribute(EDITOR_THEME_ATTRIBUTE)).toBe('light');
        expect(storage.setItem).toHaveBeenLastCalledWith(EDITOR_THEME_STORAGE_KEY, 'light');
    });
});
