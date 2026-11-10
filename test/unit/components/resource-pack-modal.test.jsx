/* eslint-env jest */
import {shallow} from 'enzyme';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import Modal from '../../../src/containers/modal.jsx';
import ResourcePackModal from '../../../src/components/resource-pack-modal/resource-pack-modal.jsx';

const callbacks = {
    onCancel: jest.fn(),
    onInstall: jest.fn(),
    onUseInstalled: jest.fn()
};

[
    ['arduino-r4', 'Suporte ao Arduino R4', 'Ferramentas para o Arduino R4.'],
    ['microbit-python', 'Python para programar o micro:bit', 'Python para o micro:bit.']
].forEach(([id, displayName, description]) => test(`uses the ${id} pack details in the modal`, () => {
    const wrapper = shallow(
        <ResourcePackModal
            {...callbacks}
            status={{id, displayName, description, phase: 'missing'}}
        />
    );

    expect(wrapper.find(Modal).prop('contentLabel')).toBe(displayName);
    expect(wrapper.find('h3').find(FormattedMessage)
        .prop('values')).toEqual({packName: displayName});
    expect(wrapper.find('p').first()
        .text()).toBe(description);
}));
