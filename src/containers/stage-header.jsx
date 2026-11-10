import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import VM from 'openblock-vm';
import {STAGE_SIZE_MODES} from '../lib/layout-constants';
import {setStageSize} from '../reducers/stage-size';
import {setFullScreen} from '../reducers/mode';

import {connect} from 'react-redux';

import StageHeaderComponent from '../components/stage-header/stage-header.jsx';
import {getHandPoseDetectionSession} from '../lib/hand-pose-detection/session';

// eslint-disable-next-line react/prefer-stateless-function
class StageHeader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleHandDetectorState',
            'handleKeyPress',
            'handleOpenHandDetector',
            'handleStopHandDetector'
        ]);
        this.state = {handDetectorRunning: false};
    }
    componentDidMount () {
        document.addEventListener('keydown', this.handleKeyPress);
        this.props.vm.addListener('HAND_POSE_DETECTION_STATE_CHANGED', this.handleHandDetectorState);
        this.handDetectionSession = getHandPoseDetectionSession(this.props.vm);
        this.handleHandDetectorState(this.handDetectionSession.state);
    }
    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleKeyPress);
        this.props.vm.removeListener('HAND_POSE_DETECTION_STATE_CHANGED', this.handleHandDetectorState);
    }
    handleKeyPress (event) {
        if (event.key === 'Escape' && this.props.isFullScreen) {
            this.props.onSetStageUnFull(false);
        }
    }
    handleHandDetectorState (state) {
        this.setState({handDetectorRunning: Boolean(state && state.running)});
    }
    handleOpenHandDetector () {
        this.props.vm.openHandPoseDetectionResult();
    }
    handleStopHandDetector () {
        this.handDetectionSession.stop();
    }
    render () {
        const {
            ...props
        } = this.props;
        return (
            <StageHeaderComponent
                {...props}
                handDetectorRunning={this.state.handDetectorRunning}
                onKeyPress={this.handleKeyPress}
                onOpenHandDetector={this.handleOpenHandDetector}
                onStopHandDetector={this.handleStopHandDetector}
            />
        );
    }
}

StageHeader.propTypes = {
    isFullScreen: PropTypes.bool,
    isPlayerOnly: PropTypes.bool,
    onSetStageUnFull: PropTypes.func.isRequired,
    showBranding: PropTypes.bool,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    showBranding: state.scratchGui.mode.showBranding,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
});

const mapDispatchToProps = dispatch => ({
    onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZE_MODES.large)),
    onSetStageSmall: () => dispatch(setStageSize(STAGE_SIZE_MODES.small)),
    onSetStageFull: () => dispatch(setFullScreen(true)),
    onSetStageUnFull: () => dispatch(setFullScreen(false))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StageHeader);
