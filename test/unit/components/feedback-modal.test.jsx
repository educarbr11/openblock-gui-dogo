/* eslint-env jest */
import React from 'react';
import ReactModal from 'react-modal';
import {act} from 'react-dom/test-utils';

import FeedbackModal, {CATEGORY_BUG} from '../../../src/components/feedback-modal/feedback-modal.jsx';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';

ReactModal.setAppElement(document.body);

const createProps = overrides => Object.assign({
    context: {
        deviceId: 'arduinoUno',
        locale: 'pt-br',
        programMode: 'upload'
    },
    initialCategory: CATEGORY_BUG,
    initialEmail: 'usuario@example.com',
    initialName: 'Usuário',
    onRequestClose: jest.fn(),
    onSubmit: jest.fn(() => Promise.resolve('feedback-id')),
    onSuccess: jest.fn(),
    success: false
}, overrides);

test('prefills optional identity fields', () => {
    const wrapper = mountWithIntl(<FeedbackModal {...createProps()} />);
    const textInputs = wrapper.find('input');

    expect(textInputs.at(1).prop('value')).toBe('Usuário');
    expect(textInputs.at(2).prop('value')).toBe('usuario@example.com');
    wrapper.unmount();
});

test('does not submit when required fields are empty', () => {
    const props = createProps();
    const wrapper = mountWithIntl(<FeedbackModal {...props} />);

    wrapper.find('form').simulate('submit', {preventDefault: jest.fn()});

    expect(props.onSubmit).not.toHaveBeenCalled();
    expect(wrapper.find('input').at(0)
        .prop('aria-invalid')).toBe(true);
    expect(wrapper.find('textarea').prop('aria-invalid')).toBe(true);
    wrapper.unmount();
});

test('keeps the entered fields after a delivery error', async () => {
    const props = createProps({
        onSubmit: jest.fn(() => Promise.reject(new Error('offline')))
    });
    const wrapper = mountWithIntl(<FeedbackModal {...props} />);

    wrapper.find('input').at(0)
        .simulate('change', {target: {value: 'Problema ao enviar'}});
    wrapper.find('textarea').simulate('change', {target: {value: 'A conexão caiu durante o envio.'}});
    await act(async () => {
        wrapper.find('form').simulate('submit', {preventDefault: jest.fn()});
        await Promise.resolve();
    });
    wrapper.update();

    expect(wrapper.find('input').at(0)
        .prop('value')).toBe('Problema ao enviar');
    expect(wrapper.find('textarea').prop('value')).toBe('A conexão caiu durante o envio.');
    expect(wrapper.find('[role="alert"]')).toHaveLength(1);
    wrapper.unmount();
});

test('includes a selected screenshot only after explicit user selection', async () => {
    const props = createProps();
    const screenshot = new File(['image'], 'captura.png', {type: 'image/png'});
    const originalCreateObjectURL = URL.createObjectURL;
    const originalRevokeObjectURL = URL.revokeObjectURL;
    URL.createObjectURL = jest.fn(() => 'blob:preview');
    URL.revokeObjectURL = jest.fn();
    const wrapper = mountWithIntl(<FeedbackModal {...props} />);

    wrapper.find('input[type="file"]').simulate('change', {
        target: {files: [screenshot], value: 'captura.png'}
    });
    wrapper.find('input[type="text"]').at(0)
        .simulate('change', {target: {value: 'Problema visual'}});
    wrapper.find('textarea').simulate('change', {target: {value: 'O rodapé estava cortado.'}});
    await act(async () => {
        wrapper.find('form').simulate('submit', {preventDefault: jest.fn()});
        await Promise.resolve();
    });

    expect(props.onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        screenshot: {
            contentType: 'image/png',
            data: screenshot,
            filename: 'captura.png'
        }
    }));
    wrapper.unmount();
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
});
