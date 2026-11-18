import React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import MenuBarHOC from '../../../src/containers/menu-bar-hoc.jsx';
import MessageBoxType from '../../../src/lib/message-box.js';

describe('Menu Bar HOC', () => {
    const mockStore = configureStore();
    let store;
    let onShowMessageBox;

    beforeEach(() => {
        onShowMessageBox = jest.fn(() => false);
        store = mockStore({
            scratchGui: {
                projectChanged: true
            }
        });
    });

    test('Logged in user who IS owner and HAS changed project will NOT be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canCreateNew
                canSave
                projectChanged
                onShowMessageBox={onShowMessageBox}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(true);
        expect(onShowMessageBox).not.toHaveBeenCalled();
    });

    test('Logged in user who IS owner and has NOT changed project will NOT be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canCreateNew
                canSave
                onShowMessageBox={onShowMessageBox}
                projectChanged={false}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(true);
        expect(onShowMessageBox).not.toHaveBeenCalled();
    });

    test('Logged in user who is NOT owner and HAS changed project will NOT be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canCreateNew
                projectChanged
                canSave={false}
                onShowMessageBox={onShowMessageBox}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(true);
        expect(onShowMessageBox).not.toHaveBeenCalled();
    });

    test('Logged OUT user who HAS changed project WILL be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                projectChanged
                canCreateNew={false}
                canSave={false}
                onShowMessageBox={onShowMessageBox}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(false);
        expect(onShowMessageBox).toHaveBeenCalledTimes(1);
        expect(onShowMessageBox).toHaveBeenCalledWith(MessageBoxType.confirm, 'message');
    });

    test('accepting the confirmation allows replacing an unsaved project', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        onShowMessageBox.mockReturnValueOnce(true);
        const wrapper = mount(
            <WrappedComponent
                projectChanged
                canCreateNew={false}
                canSave={false}
                onShowMessageBox={onShowMessageBox}
                store={store}
            />
        );

        expect(wrapper.find(Component).prop('confirmReadyToReplaceProject')('Replace this project?')).toBe(true);
        expect(onShowMessageBox).toHaveBeenCalledWith(MessageBoxType.confirm, 'Replace this project?');
        wrapper.unmount();
    });

    test('Logged OUT user who has NOT changed project WILL NOT be prompted to save', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canCreateNew={false}
                canSave={false}
                onShowMessageBox={onShowMessageBox}
                projectChanged={false}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().confirmReadyToReplaceProject('message')).toBe(true);
        expect(onShowMessageBox).not.toHaveBeenCalled();
    });

    test('Logged in user who IS owner and HAS changed project SHOULD save before transition to project page', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canSave
                projectChanged
                onShowMessageBox={onShowMessageBox}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().shouldSaveBeforeTransition()).toBe(true);
    });

    test('Logged in user who IS owner and has NOT changed project should NOT save before transition', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canSave
                projectChanged={false}
                onShowMessageBox={onShowMessageBox}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().shouldSaveBeforeTransition()).toBe(false);
    });

    test('Logged in user who is NOT owner and HAS changed project should NOT save before transition', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                projectChanged
                canSave={false}
                onShowMessageBox={onShowMessageBox}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().shouldSaveBeforeTransition()).toBe(false);
    });

    test('Logged in user who is NOT owner and has NOT changed project should NOT save before transition', () => {
        const Component = () => (<div />);
        const WrappedComponent = MenuBarHOC(Component);
        const wrapper = mount(
            <WrappedComponent
                canSave={false}
                projectChanged={false}
                onShowMessageBox={onShowMessageBox}
                store={store}
            />
        );
        const child = wrapper.find(Component);
        expect(child.props().projectChanged).toBeUndefined();
        expect(child.props().shouldSaveBeforeTransition()).toBe(false);
    });

});
