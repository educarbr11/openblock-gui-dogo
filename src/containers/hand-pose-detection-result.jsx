import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'openblock-vm';
import {connect} from 'react-redux';

import HandPoseDetectionResultComponent from '../components/hand-pose-detection-result/hand-pose-detection-result.jsx';
import {getHandPoseDetectionSession} from '../lib/hand-pose-detection/session';
import {closeHandPoseDetectionResult} from '../reducers/modals';

class HandPoseDetectionResult extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSessionUpdate',
            'handleVideoRef',
            'handleCanvasRef'
        ]);
        this.session = getHandPoseDetectionSession(props.vm);
        this.video = null;
        this.canvas = null;
        this.state = this.session.state;
    }

    componentDidMount () {
        this.unsubscribe = this.session.subscribe(this.handleSessionUpdate);
    }

    componentWillUnmount () {
        if (this.unsubscribe) this.unsubscribe();
        this.session.removeVideo(this.video);
        this.session.removeCanvas(this.canvas);
    }

    handleSessionUpdate (state) {
        this.setState(state);
    }

    handleVideoRef (video) {
        this.video = video;
        this.session.setVideo(video);
    }

    handleCanvasRef (canvas) {
        this.canvas = canvas;
        this.session.setCanvas(canvas);
    }

    render () {
        return (
            <HandPoseDetectionResultComponent
                error={this.state.error}
                loading={this.state.loading}
                result={this.state.result}
                onCanvasRef={this.handleCanvasRef}
                onClose={this.props.onClose}
                onVideoRef={this.handleVideoRef}
            />
        );
    }
}

HandPoseDetectionResult.propTypes = {
    onClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeHandPoseDetectionResult())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HandPoseDetectionResult);
