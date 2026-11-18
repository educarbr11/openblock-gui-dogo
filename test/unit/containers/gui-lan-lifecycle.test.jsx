/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';
import VM from 'openblock-vm';
import {GUI} from '../../../src/containers/gui.jsx';

jest.mock('../../../src/components/gui/gui.jsx', () => () => null);
jest.mock('../../../src/lib/hand-pose-detection/session', () => ({getHandPoseDetectionSession: jest.fn()}));

describe('LAN editor lifecycle', () => {
    let wrapper;
    let vm;
    let connect;
    let disconnect;

    beforeEach(() => {
        vm = new VM();
        connect = jest.fn();
        disconnect = jest.fn();
        vm.runtime.on('LAN_CONNECT_REQUEST', connect);
        vm.runtime.on('LAN_DISCONNECT_REQUEST', disconnect);
    });
    afterEach(() => {
        if (wrapper) wrapper.unmount();
        vm.runtime.removeListener('LAN_CONNECT_REQUEST', connect);
        vm.runtime.removeListener('LAN_DISCONNECT_REQUEST', disconnect);
    });

    const render = props => {
        wrapper = mount(<GUI
            isRealtimeMode
            onActivateBlocksTab={jest.fn()}
            onOpenMachineLearningTrainer={jest.fn()}
            onOpenMachineLearningResult={jest.fn()}
            onOpenHandPoseDetectionResult={jest.fn()}
            onOpenHandPoseGestureTrainer={jest.fn()}
            onStorageInit={jest.fn()}
            onVmInit={jest.fn()}
            vm={vm}
            {...props}
        />);
    };

    test('connects when entering the editor and suspends when leaving it', () => {
        render();
        expect(connect).toHaveBeenCalledTimes(1);
        expect(vm.runtime.lanEditorActive).toBe(true);
        wrapper.unmount();
        wrapper = null;
        expect(disconnect).toHaveBeenCalledTimes(1);
        expect(vm.runtime.lanEditorActive).toBe(false);
    });

    test('suspends in player-only mode and resumes the same VM on return', () => {
        render({isPlayerOnly: true});
        expect(connect).not.toHaveBeenCalled();
        expect(disconnect).toHaveBeenCalledTimes(1);
        wrapper.setProps({isPlayerOnly: false});
        expect(connect).toHaveBeenCalledTimes(1);
        expect(wrapper.prop('vm')).toBe(vm);
        wrapper.setProps({isPlayerOnly: true});
        expect(disconnect).toHaveBeenCalledTimes(2);
    });

    test('allows LAN only in stage mode and blocks background project commands after leaving', () => {
        render();
        wrapper.setProps({isRealtimeMode: false});
        expect(vm.runtime.lanEditorActive).toBe(false);
        expect(disconnect).toHaveBeenCalledTimes(1);
        wrapper.setProps({isRealtimeMode: true});
        expect(vm.runtime.lanEditorActive).toBe(true);
        expect(connect).toHaveBeenCalledTimes(2);
        wrapper.unmount();
        wrapper = null;
        expect(vm.runtime.lanEditorActive).toBe(false);
    });
});
