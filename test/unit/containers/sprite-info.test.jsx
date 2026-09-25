import React from 'react';

import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import SpriteInfo from '../../../src/containers/sprite-info.jsx';
import {STAGE_DISPLAY_SIZES} from '../../../src/lib/layout-constants';

describe('SpriteInfo container', () => {
    const defaultProps = () => ({
        direction: 90,
        disabled: false,
        draggable: false,
        name: 'Sprite',
        onChangeDirection: jest.fn(),
        onChangeDraggable: jest.fn(),
        onChangeName: jest.fn(),
        onChangeRotationStyle: jest.fn(),
        onChangeSize: jest.fn(),
        onChangeVisibility: jest.fn(),
        onChangeX: jest.fn(),
        onChangeY: jest.fn(),
        rotationStyle: 'all around',
        size: 100,
        stageSize: STAGE_DISPLAY_SIZES.large,
        visible: true,
        x: 0,
        y: 0
    });

    test('changes whether the sprite can be dragged', () => {
        const props = defaultProps();
        const component = mountWithIntl(<SpriteInfo {...props} />);

        component.find('[data-testid="sprite-draggable-on"]').simulate('click');
        component.find('[data-testid="sprite-draggable-off"]').simulate('click');

        expect(props.onChangeDraggable.mock.calls).toEqual([[true], [false]]);
    });

    test('shows disabled as the default visual state', () => {
        const component = mountWithIntl(<SpriteInfo {...defaultProps()} />);

        expect(component.find('[data-testid="sprite-draggable-on"]').prop('aria-pressed')).toBe(false);
        expect(component.find('[data-testid="sprite-draggable-off"]').prop('aria-pressed')).toBe(true);
        expect(component.find('[data-testid="sprite-draggable-status"]').text()).toBe('Disabled');
    });

    test('shows clear feedback when dragging is enabled', () => {
        const component = mountWithIntl(
            <SpriteInfo
                {...defaultProps()}
                draggable
            />
        );

        expect(component.find('[data-testid="sprite-draggable-on"]').prop('aria-pressed')).toBe(true);
        expect(component.find('[data-testid="sprite-draggable-off"]').prop('aria-pressed')).toBe(false);
        expect(component.find('[data-testid="sprite-draggable-status"]').text()).toBe('Enabled');
    });

    test('supports keyboard selection', () => {
        const props = defaultProps();
        const component = mountWithIntl(<SpriteInfo {...props} />);

        component.find('[data-testid="sprite-draggable-on"]').simulate('keypress', {key: 'Enter'});
        component.find('[data-testid="sprite-draggable-off"]').simulate('keypress', {key: ' '});

        expect(props.onChangeDraggable.mock.calls).toEqual([[true], [false]]);
    });

    test('does not change draggable state when disabled', () => {
        const props = {...defaultProps(), disabled: true};
        const component = mountWithIntl(<SpriteInfo {...props} />);

        component.find('[data-testid="sprite-draggable-on"]').simulate('click');
        component.find('[data-testid="sprite-draggable-off"]').simulate('keypress', {key: 'Enter'});

        expect(props.onChangeDraggable).not.toHaveBeenCalled();
    });
});
