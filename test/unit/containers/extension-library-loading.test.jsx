import React from 'react';
import {shallow} from 'enzyme';
import {IntlProvider, FormattedMessage} from 'react-intl';
import VM from 'openblock-vm';

import {LibraryItem} from '../../../src/containers/library-item.jsx';
import {LibraryComponent} from '../../../src/components/library/library.jsx';
import {ExtensionLibrary} from '../../../src/containers/extension-library.jsx';
import LibraryItemComponent from '../../../src/components/library-item/library-item.jsx';
import portuguese from '../../../translations/pt.json';

jest.mock('openblock-vm', () => class MockVM {});
jest.mock('../../../src/lib/analytics', () => ({event: jest.fn()}));
jest.mock('../../../src/lib/libraries/extensions/index.jsx', () => []);

const intl = new IntlProvider({locale: 'en'}, {}).getChildContext().intl;
const extension = {extensionId: 'fingerprint', name: 'Fingerprint', supportDevice: ['arduinoUno']};
const event = key => ({key, preventDefault: jest.fn()});
const deferred = () => {
    let resolve;
    let reject;
    const promise = new Promise((resolvePromise, rejectPromise) => {
        resolve = resolvePromise;
        reject = rejectPromise;
    });
    return {promise, resolve, reject};
};
const flushPromises = async () => {
    await Promise.resolve();
    await Promise.resolve();
};

describe('extension library selection lifecycle', () => {
    let wrappers;
    beforeEach(() => {
        wrappers = [];
    });
    afterEach(() => wrappers.reverse().forEach(wrapper => {
        if (wrapper.length) wrapper.unmount();
    }));
    const track = wrapper => {
        wrappers.push(wrapper);
        return wrapper;
    };
    const itemWrapper = (onSelect, extra = {}) => track(shallow(
        <LibraryItem
            featured
            id={0}
            icons={{uri: 'fingerprint.svg'}}
            intl={intl}
            isLoaded={false}
            isUnloadble
            name="Fingerprint"
            onMouseEnter={jest.fn()}
            onMouseLeave={jest.fn()}
            onSelect={onSelect}
            {...extra}
        />
    ));
    const selectionChain = manager => {
        const vm = new VM();
        vm.extensionManager = manager;
        const extensions = track(shallow(
            <ExtensionLibrary
                deviceData={[{deviceId: 'arduinoUno'}]}
                deviceId="arduinoUno"
                intl={intl}
                isRealtimeMode={false}
                vm={vm}
                onRequestClose={jest.fn()}
            />
        ));
        const library = track(shallow(
            <LibraryComponent
                autoClose={false}
                data={[extension]}
                id="extensionLibrary"
                intl={intl}
                title="Extensions"
                onItemSelected={extensions.instance().handleItemSelect}
                onRequestClose={jest.fn()}
            />, {disableLifecycleMethods: true}
        ));
        return {extensions, item: itemWrapper(library.instance().handleSelect)};
    };
    const manager = load => ({
        getDeviceExtensionsList: jest.fn(() => Promise.resolve([extension])),
        isDeviceExtensionLoaded: jest.fn(() => false),
        loadDeviceExtension: load
    });

    test('stays processing until both the VM load and catalog refresh resolve', async () => {
        const loading = deferred();
        const refreshing = deferred();
        const vmManager = manager(jest.fn(() => loading.promise));
        vmManager.getDeviceExtensionsList
            .mockImplementationOnce(() => Promise.resolve([extension]))
            .mockImplementationOnce(() => refreshing.promise);
        const {extensions, item} = selectionChain(vmManager);
        const selected = item.instance().handleClick(event());
        expect(item.state('isProcessing')).toBe(true);
        loading.resolve();
        await flushPromises();
        expect(item.state('isProcessing')).toBe(true);
        refreshing.resolve([{...extension, isLoaded: true}]);
        await selected;
        expect(item.state('isProcessing')).toBe(false);
        expect(item.state('selectionError')).toBe(false);
        expect(extensions.state('deviceExtensions')[0].isLoaded).toBe(true);
    });

    test('a rejected VM load clears processing, shows a recoverable error, and permits retry', async () => {
        const loading = deferred();
        const load = jest.fn()
            .mockImplementationOnce(() => loading.promise)
            .mockImplementationOnce(() => Promise.resolve());
        const {item} = selectionChain(manager(load));
        const first = item.instance().handleClick(event());
        loading.reject(new Error('registration failed'));
        await first;
        expect(item.state('isProcessing')).toBe(false);
        expect(item.state('selectionError')).toBe(true);
        const view = item.find(LibraryItemComponent).dive();
        const errorMessage = view.find('[role="alert"]').find(FormattedMessage);
        expect(errorMessage.prop('id')).toBe('gui.extensionLibrary.loadFailed');
        expect(portuguese[errorMessage.prop('id')]).toContain('tentar novamente');

        const second = item.instance().handleClick(event());
        expect(item.state('selectionError')).toBe(false);
        await second;
        expect(load.mock.calls.length).toBe(2);
        expect(item.state('isProcessing')).toBe(false);
        expect(item.state('selectionError')).toBe(false);
    });

    test('a synchronous selection exception also permits a retry', async () => {
        const onSelect = jest.fn(() => {
            throw new Error('synchronous registration failure');
        });
        const item = itemWrapper(onSelect);
        await item.instance().handleClick(event());
        expect(item.state('isProcessing')).toBe(false);
        expect(item.state('selectionError')).toBe(true);
        onSelect.mockImplementation(() => Promise.resolve());
        await item.instance().handleClick(event());
        expect(item.state('selectionError')).toBe(false);
    });

    test('keyboard selection shares processing and duplicate-click protection', async () => {
        const loading = deferred();
        const onSelect = jest.fn(() => loading.promise);
        const item = itemWrapper(onSelect);
        const selected = item.instance().handleKeyPress(event('Enter'));
        item.instance().handleClick(event());
        item.instance().handleKeyPress(event(' '));
        expect(onSelect.mock.calls.length).toBe(1);
        expect(item.state('isProcessing')).toBe(true);
        loading.resolve();
        await selected;
        await item.instance().handleKeyPress(event(' '));
        expect(onSelect.mock.calls.length).toBe(2);
    });

    test('disabled cards and key events from nested controls do not select extensions', () => {
        const onSelect = jest.fn();
        const item = itemWrapper(onSelect, {disabled: true});
        item.instance().handleClick(event());
        item.instance().handleKeyPress(event('Enter'));
        item.setProps({disabled: false});
        item.instance().handleKeyPress({...event('Enter'), target: {}, currentTarget: {}});
        expect(onSelect).not.toHaveBeenCalled();
    });

    test('settling after unmount does not update the card or library state', async () => {
        const loading = deferred();
        const {extensions, item} = selectionChain(manager(jest.fn(() => loading.promise)));
        await flushPromises();
        const selected = item.instance().handleClick(event());
        const itemState = jest.spyOn(item.instance(), 'setState');
        const extensionState = jest.spyOn(extensions.instance(), 'setState');
        item.unmount();
        extensions.unmount();
        loading.resolve();
        await selected;
        expect(itemState).not.toHaveBeenCalled();
        expect(extensionState).not.toHaveBeenCalled();
    });

    test('synchronous asset selection retains its return value and never uses processing', () => {
        const onSelect = jest.fn(() => 'selected-asset');
        const item = itemWrapper(onSelect, {isUnloadble: false});
        expect(item.instance().handleClick(event())).toBe('selected-asset');
        expect(item.state('isProcessing')).toBe(false);
        expect(item.state('selectionError')).toBe(false);
    });
});
