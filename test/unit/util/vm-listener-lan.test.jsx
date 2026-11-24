/* eslint-env jest */
import React from 'react';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import VM from 'openblock-vm';

import vmListenerHOC from '../../../src/lib/vm-listener-hoc.jsx';
import alertsReducer, {alertsInitialState} from '../../../src/reducers/alerts';

describe('LAN feedback in the editor', () => {
    let vm;
    let store;
    let wrapper;
    const Component = () => <div />;
    const WrappedComponent = vmListenerHOC(Component);
    const alerts = () => store.getActions().filter(action => action.alertId === 'lanUnavailable');
    const shownAlerts = () => store.getActions().filter(action => action.type === 'scratch-gui/alerts/SHOW_ALERT');
    const visibleAlerts = () => store.getActions().reduce(alertsReducer, alertsInitialState).alertsList;

    beforeEach(() => {
        jest.useFakeTimers();
        vm = new VM();
        vm.emitTargetsUpdate = jest.fn();
        vm.extensionManager.getDeviceList = jest.fn(() => Promise.resolve([]));
        store = configureStore()({scratchGui: {
            mode: {}, modals: {}, deviceData: {deviceData: []}, projectChanged: false, vm
        }});
        wrapper = mount(<WrappedComponent
            attachKeyboardEvents={false}
            store={store}
        />);
    });

    afterEach(() => {
        if (wrapper) wrapper.unmount();
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    test('shows one actionable alert through repeated reconnect attempts', () => {
        vm.emit('LAN_STATUS', {status: 'error'});
        vm.emit('LAN_STATUS', {status: 'connecting'});
        vm.emit('LAN_STATUS', {status: 'error'});
        expect(alerts()).toHaveLength(1);
        expect(alerts()[0].type).toBe('scratch-gui/alerts/SHOW_ALERT');
    });

    test('a manual connection immediately shows progress and then confirms success', () => {
        vm.runtime.emit('LAN_CONNECT_REQUEST', {manual: true});
        expect(visibleAlerts()).toHaveLength(1);
        expect(visibleAlerts()[0].alertId).toBe('lanConnecting');
        expect(visibleAlerts()[0].iconSpinner).toBe(true);

        vm.emit('LAN_STATUS', {status: 'connected', channel: 6});
        // The client and extension may both report the successful connection.
        vm.emit('LAN_STATUS', {status: 'connected', channel: 6});
        expect(visibleAlerts()).toHaveLength(1);
        expect(visibleAlerts()[0].alertId).toBe('lanConnected');
        expect(visibleAlerts()[0].level).toBe('success');
        jest.runAllTimers();
        expect(visibleAlerts()).toHaveLength(0);
    });

    test('a manual retry reports the same failure again after its earlier warning expired', () => {
        vm.emit('LAN_STATUS', {status: 'error', error: 'LAN bridge unavailable'});
        jest.runAllTimers();
        expect(visibleAlerts()).toHaveLength(0);

        vm.runtime.emit('LAN_CONNECT_REQUEST', {manual: true});
        expect(visibleAlerts()[0].alertId).toBe('lanConnecting');
        vm.emit('LAN_STATUS', {status: 'error', error: 'LAN bridge unavailable'});
        expect(visibleAlerts()).toHaveLength(1);
        expect(visibleAlerts()[0].alertId).toBe('lanUnavailable');
        expect(shownAlerts().map(action => action.alertId)).toEqual([
            'lanUnavailable', 'lanConnecting', 'lanUnavailable'
        ]);
        vm.emit('LAN_STATUS', {status: 'connecting'});
        vm.emit('LAN_STATUS', {status: 'error', error: 'LAN bridge unavailable'});
        expect(shownAlerts()).toHaveLength(3);
    });

    test('automatic activation stays quiet and suspension clears manual connection progress', () => {
        vm.runtime.emit('LAN_CONNECT_REQUEST');
        vm.emit('LAN_STATUS', {status: 'connecting'});
        vm.emit('LAN_STATUS', {status: 'connected'});
        expect(shownAlerts()).toHaveLength(0);

        vm.runtime.emit('LAN_CONNECT_REQUEST', {manual: true});
        vm.emit('LAN_STATUS', {status: 'disconnected'});
        expect(visibleAlerts()).toHaveLength(0);
        vm.emit('LAN_STATUS', {status: 'connected'});
        expect(shownAlerts().map(action => action.alertId)).toEqual(['lanConnecting']);
    });

    test('clears the warning after recovery and reports a new outage', () => {
        vm.emit('LAN_STATUS', {status: 'error'});
        vm.emit('LAN_STATUS', {status: 'connected'});
        expect(alerts()[1].type).toBe('scratch-gui/alerts/CLOSE_ALERT_WITH_ID');
        vm.emit('LAN_STATUS', {status: 'error'});
        expect(alerts()).toHaveLength(3);
    });

    test('removes LAN listeners when leaving the editor', () => {
        wrapper.unmount();
        wrapper = null;
        store.clearActions();
        vm.emit('LAN_STATUS', {status: 'error'});
        expect(alerts()).toHaveLength(0);
        expect(vm.listenerCount('LAN_STATUS')).toBe(0);
        expect(vm.runtime.listenerCount('LAN_CONNECT_REQUEST')).toBe(0);
        vm.runtime.emit('LAN_CONNECT_REQUEST', {manual: true});
        expect(shownAlerts()).toHaveLength(0);
    });

    test('invalid block arguments show guidance instead of suggesting a Link update', () => {
        vm.emit('LAN_STATUS', {status: 'error', error: 'invalid_message'});
        vm.emit('LAN_STATUS', {status: 'error', error: 'invalid_message'});
        expect(shownAlerts()).toHaveLength(1);
        expect(shownAlerts()[0].alertId).toBe('lanInvalidMessage');
        expect(visibleAlerts()[0].content.props.defaultMessage).toContain('1-128');
        expect(visibleAlerts()[0].content.props.defaultMessage).toContain('1024');
        expect(visibleAlerts()[0].content.props.defaultMessage).not.toContain('Link');

        vm.emit('LAN_STATUS', {status: 'error', error: 'invalid_channel'});
        expect(shownAlerts()[1].alertId).toBe('lanInvalidChannel');
        expect(visibleAlerts()).toHaveLength(1);
        expect(visibleAlerts()[0].content.props.defaultMessage).toContain('1 to 16');
        expect(alerts()).toHaveLength(0);
    });

    test('replaces an earlier warning when the error category changes', () => {
        vm.emit('LAN_STATUS', {status: 'error', error: 'invalid_channel'});
        vm.emit('LAN_STATUS', {status: 'error', error: 'LAN bridge unavailable'});
        vm.emit('LAN_STATUS', {status: 'connecting'});
        vm.emit('LAN_STATUS', {status: 'error', error: 'LAN bridge unavailable'});
        expect(shownAlerts().map(action => action.alertId)).toEqual(['lanInvalidChannel', 'lanUnavailable']);
        expect(visibleAlerts()).toHaveLength(1);
        expect(visibleAlerts()[0].alertId).toBe('lanUnavailable');
    });

    test('explains receive queue overflow and pacing broadcasts', () => {
        vm.emit('LAN_STATUS', {status: 'error', error: 'message_queue_full'});
        vm.emit('LAN_STATUS', {status: 'error', error: 'message_queue_full'});
        expect(shownAlerts()).toHaveLength(1);
        expect(visibleAlerts()[0].alertId).toBe('lanMessageQueueFull');
        expect(visibleAlerts()[0].content.props.defaultMessage).toContain('Older messages were discarded');
        expect(visibleAlerts()[0].content.props.defaultMessage).toContain('wait between broadcasts');
        expect(alerts()).toHaveLength(0);
    });

    test('reports send throttling without misdiagnosing a missing bridge', () => {
        const errors = ['LAN message rate limit exceeded.', 'Too many pending LAN messages', 'LAN request failed'];
        for (const error of errors) {
            vm.emit('LAN_STATUS', {status: 'error', error});
        }
        expect(shownAlerts()).toHaveLength(1);
        expect(shownAlerts()[0].alertId).toBe('lanActionFailed');
        expect(alerts()).toHaveLength(0);
    });

    ['connected', 'disconnected'].forEach(status => {
        test(`${status} clears the specific warning and allows it to be shown again`, () => {
            vm.emit('LAN_STATUS', {status: 'error', error: 'invalid_message'});
            vm.emit('LAN_STATUS', {status});
            expect(visibleAlerts()).toHaveLength(0);
            const closedAlert = store.getActions().find(action =>
                action.type === 'scratch-gui/alerts/CLOSE_ALERT_WITH_ID');
            expect(closedAlert).toEqual(expect.objectContaining({
                type: 'scratch-gui/alerts/CLOSE_ALERT_WITH_ID', alertId: 'lanInvalidMessage'
            }));
            vm.emit('LAN_STATUS', {status: 'error', error: 'invalid_message'});
            expect(shownAlerts()).toHaveLength(2);
            expect(alerts()).toHaveLength(0);
        });
    });
});
