/* eslint-env jest */
import React from 'react';
import VM from 'openblock-vm';

import {shallowWithIntl} from '../../helpers/intl-helpers';
import {MenuBar} from '../../../src/components/menu-bar/menu-bar';
import EditorActionsMenu from '../../../src/components/menu-bar/editor-actions-menu.jsx';
import EditorHeaderAction from '../../../src/components/menu-bar/editor-header-action.jsx';
import ProjectTitleInput from '../../../src/components/menu-bar/project-title-input.jsx';
import LanguageSelector from '../../../src/containers/language-selector.jsx';
import uploadArduinoRealtimeFirmware from '../../../src/lib/upload-arduino-realtime-firmware';
import {STAGE_SIZE_MODES} from '../../../src/lib/layout-constants';

jest.mock('../../../src/lib/upload-arduino-realtime-firmware', () => jest.fn(() => false));
jest.mock('../../../src/lib/sentry', () => ({isFeedbackEnabled: () => false}));

describe('MenuBar Component', () => {
    let wrapper;
    let props;
    let modeFrameSpy;
    let runtimeModeSpy;
    const vm = new VM();
    const initialTauriLight = process.env.OPENBLOCK_TAURI_LIGHT;

    const createProps = overrides => Object.assign({
        canEditTitle: true,
        canManageFiles: true,
        canPromptLoginToSave: false,
        canSave: true,
        deviceId: null,
        hasSaveError: false,
        isLoggedIn: false,
        isRealtimeMode: true,
        isSupportSwitchMode: false,
        isToolboxUpdating: false,
        isUpdating: false,
        locale: 'en',
        onClickSave: jest.fn(),
        onDisconnect: jest.fn(),
        onNoPeripheralIsConnected: jest.fn(),
        onOpenConnectionModal: jest.fn(),
        onOpenDeviceLibrary: jest.fn(),
        onOpenAccount: jest.fn(),
        onOpenUploadProgress: jest.fn(),
        onRequestCloseFile: jest.fn(),
        onRequestLoginToSave: jest.fn(),
        onSetRealtimeConnection: jest.fn(),
        onSetStageLarge: jest.fn(),
        onSetUpdate: jest.fn(),
        onWorkspaceIsEmpty: jest.fn(),
        peripheralName: null,
        projectChanged: false,
        projectId: '0',
        projectTitle: 'DoGoBlock project',
        realtimeConnection: false,
        vm: vm
    }, overrides);
    const render = overrides => {
        props = createProps(overrides);
        wrapper = shallowWithIntl(<MenuBar {...props} />);
        return wrapper;
    };
    const saveButton = () => wrapper.find('button[aria-busy]');
    const programMode = () => wrapper.find('[data-testid="program-mode-toggle"]');
    const accountButton = () => wrapper.find('[data-testid="header-account"]');
    const moreMenu = () => wrapper.find(EditorActionsMenu).filterWhere(menu => menu.prop('label') === 'More');
    const action = label => moreMenu().find(EditorHeaderAction)
        .filterWhere(item => item.prop('label') === label);
    const resizeHeader = width => {
        wrapper.find('Box').prop('componentRef')({clientWidth: width});
        window.dispatchEvent(new Event('resize'));
        wrapper.update();
    };
    const controlModeUpdates = () => {
        const frames = [];
        jest.useFakeTimers();
        modeFrameSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
            frames.push(callback);
            return frames.length;
        });
        runtimeModeSpy = jest.spyOn(vm.runtime, 'setRealtimeMode').mockImplementation(() => {});
        return () => {
            frames.shift()();
            jest.runOnlyPendingTimers();
        };
    };

    afterEach(() => {
        if (wrapper) wrapper.unmount();
        if (modeFrameSpy) modeFrameSpy.mockRestore();
        if (runtimeModeSpy) runtimeModeSpy.mockRestore();
        modeFrameSpy = null;
        runtimeModeSpy = null;
        jest.useRealTimers();
        uploadArduinoRealtimeFirmware.mockClear();
        if (typeof initialTauriLight === 'undefined') delete process.env.OPENBLOCK_TAURI_LIGHT;
        else process.env.OPENBLOCK_TAURI_LIGHT = initialTauriLight;
    });

    test('menu bar with no About handler has no About button', () => {
        render();
        expect(wrapper.find('AboutButton').exists()).toBe(false);
    });

    test('menu bar with an About handler has an About button', () => {
        render({onClickAbout: jest.fn()});
        expect(wrapper.find('AboutButton').exists()).toBe(true);
    });

    test('clicking on About button calls the handler', () => {
        const onClickAbout = jest.fn();
        render({onClickAbout});
        wrapper.find('AboutButton').simulate('click');
        expect(onClickAbout).toHaveBeenCalledTimes(1);
    });

    test('the primary save button saves the project when allowed', () => {
        render();
        saveButton().simulate('click');
        expect(props.onClickSave).toHaveBeenCalledTimes(1);
        expect(props.onRequestLoginToSave).not.toHaveBeenCalled();
    });

    test('the primary save button requests sign-in for anonymous users', () => {
        render({canSave: false, canPromptLoginToSave: true});
        saveButton().simulate('click');
        expect(props.onClickSave).not.toHaveBeenCalled();
        expect(props.onRequestLoginToSave).toHaveBeenCalledTimes(1);
        expect(saveButton().prop('aria-label')).toContain('Sign in to save');
    });

    test('the account control opens sign-in for an anonymous web user', () => {
        render({canSave: false, canPromptLoginToSave: true});
        accountButton().simulate('click');
        expect(props.onRequestLoginToSave).toHaveBeenCalledTimes(1);
        expect(props.onOpenAccount).not.toHaveBeenCalled();
        expect(props.onClickSave).not.toHaveBeenCalled();
    });

    test('the account control opens the signed-in user profile', () => {
        render({isLoggedIn: true, username: 'teacher'});
        accountButton().simulate('click');
        expect(props.onOpenAccount).toHaveBeenCalledTimes(1);
        expect(props.onRequestLoginToSave).not.toHaveBeenCalled();
        expect(accountButton().prop('aria-label')).toBeTruthy();
    });

    test('standalone editors without account support omit the account control', () => {
        render({canPromptLoginToSave: false, isLoggedIn: false});
        expect(accountButton().exists()).toBe(false);
    });

    test('saving disables the button and ignores repeated save shortcuts', () => {
        render({isUpdating: true});
        saveButton().simulate('click');
        const event = new KeyboardEvent('keydown', {key: 's', ctrlKey: true, metaKey: true, cancelable: true});
        document.dispatchEvent(event);
        expect(saveButton().prop('disabled')).toBe(true);
        expect(saveButton().prop('aria-busy')).toBe(true);
        expect(props.onClickSave).not.toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(true);
    });

    test('Ctrl/Cmd+S uses the same save flow as the button', () => {
        render();
        const event = new KeyboardEvent('keydown', {key: 'S', ctrlKey: true, metaKey: true, cancelable: true});
        document.dispatchEvent(event);
        expect(props.onClickSave).toHaveBeenCalledTimes(1);
        expect(event.defaultPrevented).toBe(true);
    });

    [
        {name: 'a local project', values: {}, status: 'Local project'},
        {name: 'a stored project', values: {projectId: '42'}, status: 'Saved'},
        {name: 'unsaved edits', values: {projectId: '42', projectChanged: true}, status: 'Unsaved changes'},
        {name: 'a failed save', values: {projectChanged: true, hasSaveError: true}, status: 'Could not save'},
        {name: 'an active retry', values: {hasSaveError: true, isUpdating: true}, status: 'Saving…'},
        {name: 'a read-only stored project', values: {projectId: '42', canSave: false}, status: 'Saved'}
    ].forEach(({name, values, status}) => {
        test(`announces the correct save status for ${name}`, () => {
            render(values);
            const statusElement = wrapper.find('[role="status"]');
            expect(statusElement.text()).toContain(status);
            expect(statusElement.prop('aria-live')).toBe('polite');
        });
    });

    test('firmware explains that a device must first be selected and connected', () => {
        render();
        const firmware = action('Upload firmware').shallow();
        firmware.simulate('click');
        expect(firmware.prop('aria-disabled')).toBe(true);
        expect(firmware.prop('title')).toBe('Choose and connect a device to upload its firmware.');
        expect(uploadArduinoRealtimeFirmware).not.toHaveBeenCalled();
        expect(props.onOpenUploadProgress).not.toHaveBeenCalled();
    });

    test('firmware explains when a selected device still needs a connection', () => {
        render({deviceId: 'arduinoUno', deviceName: 'Arduino Uno'});
        expect(action('Upload firmware').prop('disabled')).toBe(true);
        expect(action('Upload firmware').prop('hint')).toBe('Connect a device to upload its firmware.');
    });

    test('firmware becomes available once a selected device is connected', () => {
        render({deviceId: 'arduinoUno', peripheralName: 'COM3'});
        expect(action('Upload firmware').prop('disabled')).toBe(false);
    });

    [
        {values: {}, hint: 'Choose a device to use programming mode.'},
        {values: {deviceId: 'unsupported'}, hint: 'This device does not support switching modes.'},
        {
            values: {deviceId: 'arduinoUno', isSupportSwitchMode: true, isToolboxUpdating: true},
            hint: 'Wait for the blocks to finish updating.'
        }
    ].forEach(({values, hint}) => {
        test(`programming mode is unavailable with the explanation: ${hint}`, () => {
            render(values);
            controlModeUpdates();
            programMode().simulate('click');
            expect(programMode().prop('role')).toBe('switch');
            expect(programMode().prop('aria-disabled')).toBe(true);
            expect(programMode().prop('disabled')).not.toBe(true);
            expect(programMode().prop('title')).toContain(hint);
            expect(programMode().prop('aria-checked')).toBe(false);
            expect(modeFrameSpy).not.toHaveBeenCalled();
            expect(runtimeModeSpy).not.toHaveBeenCalled();
        });
    });

    test('programming mode exposes its current state when the device supports it', () => {
        render({deviceId: 'arduinoUno', isSupportSwitchMode: true, isRealtimeMode: false});
        expect(programMode().prop('aria-disabled')).not.toBe(true);
        expect(programMode().prop('aria-checked')).toBe(true);
        expect(programMode().prop('aria-label')).toContain('Programming mode');
        expect(programMode().prop('aria-label')).toContain('On');
        expect(programMode().text()).toContain('Programming');
        expect(action('Programming mode').exists()).toBe(false);
    });

    test('programming mode changes the runtime once while a switch is pending', () => {
        render({deviceId: 'arduinoUno', isSupportSwitchMode: true});
        const flushModeUpdate = controlModeUpdates();
        programMode().simulate('click');
        programMode().simulate('click');
        expect(modeFrameSpy).toHaveBeenCalledTimes(1);
        expect(runtimeModeSpy).not.toHaveBeenCalled();

        flushModeUpdate();
        expect(runtimeModeSpy.mock.calls).toEqual([[false]]);

        wrapper.setProps({isRealtimeMode: false});
        programMode().simulate('click');
        flushModeUpdate();
        expect(runtimeModeSpy.mock.calls).toEqual([[false], [true]]);
    });

    test('returning to stage mode restores a hidden stage before switching', () => {
        render({
            deviceId: 'arduinoUno',
            isSupportSwitchMode: true,
            isRealtimeMode: false,
            stageSizeMode: STAGE_SIZE_MODES.hide
        });
        const flushModeUpdate = controlModeUpdates();
        programMode().simulate('click');
        expect(props.onSetStageLarge).toHaveBeenCalledTimes(1);
        flushModeUpdate();
        expect(runtimeModeSpy).toHaveBeenCalledWith(true);
    });

    test('the lightweight mobile editor omits hardware programming controls', () => {
        process.env.OPENBLOCK_TAURI_LIGHT = 'true';
        render();
        expect(programMode().exists()).toBe(false);
        expect(action('Upload firmware').exists()).toBe(false);
    });

    test('connecting without a selected device first opens the device library', () => {
        render();
        wrapper.find('button[aria-label="Connect"]').simulate('click');
        expect(props.onOpenDeviceLibrary).toHaveBeenCalledTimes(1);
        expect(props.onOpenConnectionModal).not.toHaveBeenCalled();
    });

    test('connecting a selected device opens its connection controls', () => {
        render({deviceId: 'arduinoUno'});
        wrapper.find('button[aria-label="Connect"]').simulate('click');
        expect(props.onOpenConnectionModal).toHaveBeenCalledTimes(1);
        expect(props.onOpenDeviceLibrary).not.toHaveBeenCalled();
    });

    [1120, 720, 320].forEach(width => {
        test(`keeps project, save, programming and sign-in directly accessible at ${width}px`, () => {
            render({canSave: false, canPromptLoginToSave: true});
            resizeHeader(width);
            expect(moreMenu().prop('compact')).toBe(true);
            expect(saveButton().exists()).toBe(true);
            expect(wrapper.find(ProjectTitleInput).exists()).toBe(true);
            expect(programMode().exists()).toBe(true);
            expect(accountButton().exists()).toBe(true);
            expect(moreMenu().find('[data-testid="program-mode-toggle"]')
                .exists()).toBe(false);
            expect(moreMenu().find('[data-testid="header-account"]')
                .exists()).toBe(false);
        });
    });

    test('moves device selection and connection into More only below 720px', () => {
        render();
        resizeHeader(720);
        expect(action('Choose a device').exists()).toBe(false);
        expect(action('Connect').exists()).toBe(false);
        resizeHeader(719);
        expect(action('Choose a device').exists()).toBe(true);
        expect(action('Connect').exists()).toBe(true);
        resizeHeader(1120);
        expect(action('Choose a device').exists()).toBe(false);
        expect(action('Connect').exists()).toBe(false);
    });

    test('keeps language and editing actions in More even on a wide header', () => {
        render({canChangeLanguage: true});
        resizeHeader(1440);
        expect(wrapper.find(EditorActionsMenu).filterWhere(menu => menu.prop('label') === 'File')
            .exists()).toBe(true);
        expect(wrapper.find(EditorActionsMenu).filterWhere(menu => menu.prop('label') === 'Edit')
            .exists()).toBe(false);
        expect(moreMenu().find('[role="group"][aria-label="Edit"]')
            .exists()).toBe(true);
        expect(moreMenu().find(LanguageSelector)
            .exists()).toBe(true);
        expect(wrapper.find(LanguageSelector)).toHaveLength(1);
    });
});
