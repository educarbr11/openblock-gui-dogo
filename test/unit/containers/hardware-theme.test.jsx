/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';

import {Hardware} from '../../../src/containers/hardware.jsx';
import HardwareComponent from '../../../src/components/hardware/hardware.jsx';
import {EditorThemeContext} from '../../../src/lib/editor-theme.jsx';

jest.mock('../../../src/components/hardware/hardware.jsx', () => () => null);

describe('hardware editor theme', () => {
    let wrapper;
    const props = {
        codeEditorValue: 'void setup() {}',
        deviceType: 'arduino',
        isCodeEditorLocked: true,
        onCodeEditorIsLocked: jest.fn(),
        onSetCodeEditorValue: jest.fn(),
        onToggleCodeEditorLock: jest.fn(),
        stageSize: 'large'
    };

    const render = (theme = 'light', locked = true) => {
        wrapper = mount(
            <EditorThemeContext.Provider value={{theme}}>
                <Hardware
                    {...props}
                    isCodeEditorLocked={locked}
                />
            </EditorThemeContext.Provider>
        );
        return wrapper.find(HardwareComponent);
    };

    afterEach(() => {
        if (wrapper) wrapper.unmount();
    });

    test('selects a light Monaco theme for both editable and locked code', () => {
        expect(render('light').prop('codeEditorTheme')).toBe('readOnlyTheme');
        wrapper.unmount();
        expect(render('light', false).prop('codeEditorTheme')).toBe('vs');
    });

    test('selects a dark Monaco theme while preserving the lock', () => {
        const code = render('dark');
        expect(code.prop('codeEditorTheme')).toBe('readOnlyDarkTheme');
        expect(code.prop('codeEditorOptions').readOnly).toBe(true);
        wrapper.unmount();
        expect(render('dark', false).prop('codeEditorTheme')).toBe('vs-dark');
    });

    test('updates an existing editor without replacing it or changing its code', () => {
        render('light');
        const hardware = wrapper.find(Hardware).instance();
        wrapper.setProps({value: {theme: 'dark'}});

        expect(wrapper.find(Hardware).instance()).toBe(hardware);
        expect(wrapper.find(HardwareComponent).prop('codeEditorTheme')).toBe('readOnlyDarkTheme');
        expect(wrapper.find(HardwareComponent).prop('codeEditorValue')).toBe(props.codeEditorValue);
        expect(wrapper.find(HardwareComponent).prop('codeEditorOptions').readOnly).toBe(true);
    });

    test('registers locked themes with matching Monaco bases and surfaces', () => {
        const code = render();
        const defineTheme = jest.fn();
        code.prop('onCodeEditorWillMount')({editor: {defineTheme}});

        expect(defineTheme).toHaveBeenCalledWith('readOnlyTheme', expect.objectContaining({base: 'vs'}));
        expect(defineTheme).toHaveBeenCalledWith('readOnlyDarkTheme', expect.objectContaining({
            base: 'vs-dark',
            inherit: true,
            colors: {'editor.background': '#151D2B'}
        }));
    });
});
