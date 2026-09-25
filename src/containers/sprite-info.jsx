import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import SpriteInfoComponent from '../components/sprite-info/sprite-info.jsx';

class SpriteInfo extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickDraggable',
            'handleClickNotDraggable',
            'handleClickVisible',
            'handleClickNotVisible',
            'handlePressDraggable',
            'handlePressNotDraggable',
            'handlePressVisible',
            'handlePressNotVisible'
        ]);
    }
    handleClickDraggable (e) {
        e.preventDefault();
        if (!this.props.disabled) this.props.onChangeDraggable(true);
    }
    handleClickNotDraggable (e) {
        e.preventDefault();
        if (!this.props.disabled) this.props.onChangeDraggable(false);
    }
    handleClickVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(true);
    }
    handleClickNotVisible (e) {
        e.preventDefault();
        this.props.onChangeVisibility(false);
    }
    handlePressVisible (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onChangeVisibility(true);
        }
    }
    handlePressNotVisible (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onChangeVisibility(false);
        }
    }
    handlePressDraggable (e) {
        if ((e.key === ' ' || e.key === 'Enter') && !this.props.disabled) {
            e.preventDefault();
            this.props.onChangeDraggable(true);
        }
    }
    handlePressNotDraggable (e) {
        if ((e.key === ' ' || e.key === 'Enter') && !this.props.disabled) {
            e.preventDefault();
            this.props.onChangeDraggable(false);
        }
    }
    render () {
        return (
            <SpriteInfoComponent
                {...this.props}
                onClickDraggable={this.handleClickDraggable}
                onClickNotDraggable={this.handleClickNotDraggable}
                onClickNotVisible={this.handleClickNotVisible}
                onClickVisible={this.handleClickVisible}
                onPressDraggable={this.handlePressDraggable}
                onPressNotDraggable={this.handlePressNotDraggable}
                onPressNotVisible={this.handlePressNotVisible}
                onPressVisible={this.handlePressVisible}
            />
        );
    }
}

SpriteInfo.propTypes = {
    ...SpriteInfoComponent.propTypes,
    onChangeDirection: PropTypes.func,
    onChangeDraggable: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeSize: PropTypes.func,
    onChangeVisibility: PropTypes.func,
    onChangeX: PropTypes.func,
    onChangeY: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

export default SpriteInfo;
