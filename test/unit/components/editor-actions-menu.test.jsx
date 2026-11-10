/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';

import EditorActionsMenu from '../../../src/components/menu-bar/editor-actions-menu.jsx';

describe('EditorActionsMenu', () => {
    let wrapper;
    let host;
    let onCapture;
    let onFirmware;

    beforeEach(() => {
        host = document.createElement('div');
        document.body.appendChild(host);
        onCapture = jest.fn();
        onFirmware = jest.fn();
        wrapper = mount(
            <EditorActionsMenu label="Mais">
                <div
                    aria-label="Projeto"
                    role="group"
                >
                    <button
                        role="menuitem"
                        type="button"
                        onClick={onCapture}
                    >Capturar tela</button>
                    <button
                        aria-disabled="true"
                        role="menuitem"
                        title="Conecte um dispositivo para enviar o firmware"
                        type="button"
                        onClick={onFirmware}
                    >
                        Enviar firmware
                    </button>
                    <button
                        aria-checked="false"
                        role="menuitemcheckbox"
                        type="button"
                    >Programação</button>
                </div>
            </EditorActionsMenu>,
            {attachTo: host}
        );
    });

    afterEach(() => {
        wrapper.unmount();
        host.parentNode.removeChild(host);
    });

    const trigger = () => wrapper.find('button[aria-haspopup="menu"]');
    const menu = () => wrapper.find('[role="menu"]');
    const items = () => wrapper.find('button[role]');
    const itemNode = index => items().at(index)
        .getDOMNode();

    test('opens with an accessible trigger and focuses the first enabled action', () => {
        expect(trigger().prop('aria-expanded')).toBe(false);
        trigger().simulate('click');

        expect(trigger().prop('aria-expanded')).toBe(true);
        expect(trigger().prop('aria-controls')).toBe(menu().prop('id'));
        expect(document.activeElement).toBe(itemNode(0));
    });

    test('supports arrows, Home and End, including discovering a disabled action', () => {
        trigger().simulate('keyDown', {key: 'ArrowUp', preventDefault: jest.fn()});
        expect(document.activeElement).toBe(itemNode(2));

        menu().simulate('keyDown', {key: 'Home', preventDefault: jest.fn()});
        expect(document.activeElement).toBe(itemNode(0));
        menu().simulate('keyDown', {key: 'ArrowDown', preventDefault: jest.fn()});
        expect(document.activeElement).toBe(itemNode(1));
        menu().simulate('keyDown', {key: 'End', preventDefault: jest.fn()});
        menu().simulate('keyDown', {key: 'ArrowDown', preventDefault: jest.fn()});
        expect(document.activeElement).toBe(itemNode(0));
    });

    test('Escape dismisses the menu and restores focus to its trigger', () => {
        trigger().simulate('click');
        menu().simulate('keyDown', {key: 'Escape', preventDefault: jest.fn(), stopPropagation: jest.fn()});

        expect(menu().exists()).toBe(false);
        expect(document.activeElement).toBe(trigger().getDOMNode());
    });

    test('Tab dismisses without preventing native keyboard navigation', () => {
        const preventDefault = jest.fn();
        trigger().simulate('click');
        menu().simulate('keyDown', {key: 'Tab', preventDefault});

        expect(menu().exists()).toBe(false);
        expect(preventDefault).not.toHaveBeenCalled();
    });

    test('outside interaction dismisses without stealing focus', () => {
        const outside = document.createElement('button');
        document.body.appendChild(outside);
        trigger().simulate('click');
        outside.focus();
        outside.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
        wrapper.update();

        expect(menu().exists()).toBe(false);
        expect(document.activeElement).toBe(outside);
        outside.parentNode.removeChild(outside);
    });

    test('disabled actions explain their reason but cannot run or dismiss the menu', () => {
        trigger().simulate('click');
        itemNode(1).click();
        wrapper.update();

        expect(onFirmware).not.toHaveBeenCalled();
        expect(menu().exists()).toBe(true);
        expect(items().at(1)
            .prop('title')).toBe('Conecte um dispositivo para enviar o firmware');
    });

    test('an enabled action runs and returns keyboard focus to its trigger', () => {
        trigger().simulate('click');
        itemNode(0).click();
        wrapper.update();

        expect(onCapture).toHaveBeenCalledTimes(1);
        expect(menu().exists()).toBe(false);
        expect(document.activeElement).toBe(trigger().getDOMNode());
    });

    test('an action that opens a dialog keeps focus on the dialog', () => {
        const dialogInput = document.createElement('input');
        document.body.appendChild(dialogInput);
        onCapture.mockImplementation(() => dialogInput.focus());
        trigger().simulate('click');
        itemNode(0).click();
        wrapper.update();

        expect(menu().exists()).toBe(false);
        expect(document.activeElement).toBe(dialogInput);
        dialogInput.parentNode.removeChild(dialogInput);
    });

    test('a disabled trigger cannot open its menu', () => {
        wrapper.setProps({disabled: true});
        trigger().simulate('click');
        trigger().simulate('keyDown', {key: 'ArrowDown', preventDefault: jest.fn()});

        expect(trigger().prop('disabled')).toBe(true);
        expect(menu().exists()).toBe(false);
    });

    test('native language selection keeps its own arrow key behavior', () => {
        wrapper.setProps({children: (
            <select
                aria-label="Idioma"
                defaultValue="pt-br"
            >
                <option value="pt-br">Português</option>
                <option value="en">English</option>
            </select>
        )});
        trigger().simulate('click');
        const select = wrapper.find('select');
        const preventDefault = jest.fn();
        select.simulate('keyDown', {key: 'ArrowDown', preventDefault});

        expect(document.activeElement).toBe(select.getDOMNode());
        expect(preventDefault).not.toHaveBeenCalled();
        expect(menu().exists()).toBe(true);
    });
});
