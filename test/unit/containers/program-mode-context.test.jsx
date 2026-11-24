/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';
import {Provider, connect} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {IntlProvider} from 'react-intl';
import VM from 'openblock-vm';
import {TextDecoder} from 'text-encoding';

import Hardware, {Hardware as HardwareController} from '../../../src/containers/hardware.jsx';
import HardwareComponent from '../../../src/components/hardware/hardware.jsx';
import HardwareConsole from '../../../src/containers/hardware-console.jsx';
import {EditorThemeContext} from '../../../src/lib/editor-theme.jsx';
import code, {setCodeEditorValue} from '../../../src/reducers/code';
import hardwareConsole from '../../../src/reducers/hardware-console';
import menus from '../../../src/reducers/menus';
import programMode, {setUploadMode, setRealtimeMode} from '../../../src/reducers/program-mode';

// Monaco needs a real browser; retain the actual Redux/Intl containers and serial console.
jest.mock('../../../src/components/code-editor/code-editor.jsx', () => () => null);

const Panel = connect(state => ({realtime: state.scratchGui.programMode.isRealtimeMode}))(
    ({realtime, vm}) => {
        if (realtime) return <div />;
        return (<Hardware
            stageSize="large"
            vm={vm}
        />);
    }
);

describe('programming mode context integration', () => {
    let wrapper;
    let store;
    let vm;
    const previousDecoder = global.TextDecoder;
    beforeAll(() => {
        global.TextDecoder = TextDecoder;
    });
    afterAll(() => {
        if (typeof previousDecoder === 'undefined') delete global.TextDecoder;
        else global.TextDecoder = previousDecoder;
    });
    beforeEach(() => {
        vm = new VM();
        store = createStore(combineReducers({
            scratchGui: combineReducers({
                code,
                hardwareConsole,
                menus,
                programMode,
                device: () => ({deviceId: 'arduinoUno', deviceType: 'arduino'}),
                connectionModal: () => ({peripheralName: null})
            }),
            locales: () => ({isRtl: false})
        }));
        store.dispatch(setCodeEditorValue('void setup() { /* unsaved code */ }'));
    });
    afterEach(() => {
        if (wrapper) wrapper.unmount();
        wrapper = null;
    });

    const content = theme => (
        <IntlProvider locale="en">
            <EditorThemeContext.Provider value={{theme}}>
                <Panel vm={vm} />
            </EditorThemeContext.Provider>
        </IntlProvider>
    );

    ['light', 'dark'].forEach(theme => {
        test(`switches stage → programming → stage with the same Redux store in ${theme} mode`, () => {
            wrapper = mount(
                <Provider store={store}>{content(theme)}</Provider>
            );
            expect(wrapper.find(HardwareComponent).exists()).toBe(false);
            store.dispatch(setUploadMode());
            wrapper.update();
            expect(wrapper.find(HardwareComponent).prop('codeEditorValue')).toContain('unsaved code');
            expect(wrapper.find(HardwareComponent).prop('codeEditorTheme'))
                .toBe(theme === 'dark' ? 'readOnlyDarkTheme' : 'readOnlyTheme');
            expect(wrapper.find(HardwareConsole).exists()).toBe(true);
            wrapper.find(HardwareComponent).prop('onClickCodeEditorLock')();
            wrapper.update();
            expect(wrapper.find(HardwareComponent).prop('codeEditorOptions').readOnly).toBe(false);
            store.dispatch(setRealtimeMode());
            wrapper.update();
            expect(wrapper.find(HardwareComponent).exists()).toBe(false);
            store.dispatch(setUploadMode());
            wrapper.update();
            expect(wrapper.find(HardwareComponent).prop('codeEditorValue')).toContain('unsaved code');
            expect(vm.listenerCount('PERIPHERAL_RECIVE_DATA')).toBe(1);
        });
    });

    test('changes theme while programming without replacing the panel or its Redux connection', () => {
        store.dispatch(setUploadMode());
        wrapper = mount(<Provider store={store}>{content('light')}</Provider>);
        const controller = wrapper.find(HardwareController).instance();
        wrapper.setProps({children: content('dark')});
        expect(wrapper.find(HardwareController).instance()).toBe(controller);
        expect(wrapper.find(HardwareComponent).prop('codeEditorTheme')).toBe('readOnlyDarkTheme');
        wrapper.find(HardwareComponent).prop('onClickCodeEditorLock')();
        wrapper.update();
        expect(wrapper.find(HardwareComponent).prop('codeEditorTheme')).toBe('vs-dark');
        expect(wrapper.find(HardwareComponent).prop('codeEditorValue')).toContain('unsaved code');
        expect(vm.listenerCount('PERIPHERAL_RECIVE_DATA')).toBe(1);
    });
});
