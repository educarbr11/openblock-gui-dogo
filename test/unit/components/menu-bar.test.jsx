/* eslint-env jest */
import React from 'react';
import VM from 'openblock-vm';

import {shallowWithIntl} from '../../helpers/intl-helpers';
import {MenuBar} from '../../../src/components/menu-bar/menu-bar';
import EditorActionsMenu from '../../../src/components/menu-bar/editor-actions-menu.jsx';
import EditorHeaderAction from '../../../src/components/menu-bar/editor-header-action.jsx';
import ProjectTitleInput from '../../../src/components/menu-bar/project-title-input.jsx';
import uploadArduinoRealtimeFirmware from '../../../src/lib/upload-arduino-realtime-firmware';

jest.mock('../../../src/lib/upload-arduino-realtime-firmware', () => jest.fn(() => false));
jest.mock('../../../src/lib/sentry', () => ({isFeedbackEnabled: () => false}));

describe('MenuBar Component', () => {
    let wrapper;
    let props;
    const vm = new VM();

    const createProps = overrides => Object.assign({
        canEditTitle: true,
        canManageFiles: true,
        canPromptLoginToSave: false,
        canSave: true,
        deviceId: null,
        hasSaveError: false,
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
    const moreMenu = () => wrapper.find(EditorActionsMenu).filterWhere(menu => menu.prop('label') === 'More');
    const action = label => moreMenu().find(EditorHeaderAction)
        .filterWhere(item => item.prop('label') === label);
    const resizeHeader = width => {
        wrapper.find('Box').prop('componentRef')({clientWidth: width});
        window.dispatchEvent(new Event('resize'));
        wrapper.update();
    };

    afterEach(() => {
        if (wrapper) wrapper.unmount();
        uploadArduinoRealtimeFirmware.mockClear();
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
            const onSwitch = jest.fn();
            const mode = shallowWithIntl(<EditorHeaderAction
                {...action('Programming mode').props()}
                onClick={onSwitch}
            />);
            mode.simulate('click');
            expect(mode.prop('aria-disabled')).toBe(true);
            expect(mode.prop('title')).toBe(hint);
            expect(mode.prop('aria-checked')).toBe(false);
            expect(onSwitch).not.toHaveBeenCalled();
        });
    });

    test('programming mode exposes its current state when the device supports it', () => {
        render({deviceId: 'arduinoUno', isSupportSwitchMode: true, isRealtimeMode: false});
        const mode = action('Programming mode').shallow();
        expect(mode.prop('aria-disabled')).not.toBe(true);
        expect(mode.prop('aria-checked')).toBe(true);
        expect(mode.text()).toContain('On');
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

    test('compacts secondary navigation before moving device actions to More', () => {
        render();
        resizeHeader(1120);
        expect(wrapper.find(EditorActionsMenu).filterWhere(menu => menu.prop('label') === 'File')
            .prop('compact')).toBe(false);

        resizeHeader(1119);
        expect(wrapper.find(EditorActionsMenu).filterWhere(menu => menu.prop('label') === 'File')
            .prop('compact')).toBe(true);
        expect(moreMenu().prop('compact')).toBe(false);
        expect(action('Choose a device').exists()).toBe(false);

        resizeHeader(720);
        expect(moreMenu().prop('compact')).toBe(false);
        resizeHeader(719);
        expect(moreMenu().prop('compact')).toBe(true);
        expect(action('Choose a device').exists()).toBe(true);
        expect(action('Connect').exists()).toBe(true);
        expect(saveButton().exists()).toBe(true);
        expect(wrapper.find(ProjectTitleInput).exists()).toBe(true);
    });
});
