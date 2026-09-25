import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import VM from 'openblock-vm';

import HandGestureTrainerComponent from '../components/hand-gesture-trainer/hand-gesture-trainer.jsx';
import {getHandPoseDetectionSession, MAX_CUSTOM_CLASSES} from '../lib/hand-pose-detection/session';
import {closeHandPoseGestureTrainer} from '../reducers/modals';

class HandGestureTrainer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSessionUpdate',
            'handleVideoRef',
            'handleCanvasRef',
            'handleAddGesture',
            'handleBack',
            'handleNext',
            'handleRemoveGesture',
            'handleRenameGesture',
            'handleResetTraining',
            'handleSelectClass',
            'handleStartCapture',
            'handleStopCapture',
            'handleUseModel'
        ]);
        this.session = getHandPoseDetectionSession(props.vm);
        this.video = null;
        this.canvas = null;
        this.state = Object.assign({step: 1}, this.session.state);
    }

    componentDidMount () {
        this.unsubscribe = this.session.subscribe(this.handleSessionUpdate, false);
    }

    componentWillUnmount () {
        if (this.unsubscribe) this.unsubscribe();
        this.session.stopHoldCapture();
        this.session.removeVideo(this.video);
        this.session.removeCanvas(this.canvas);
    }

    handleSessionUpdate (state) {
        this.setState(state);
    }

    handleVideoRef (video) {
        if (this.video && this.video !== video) this.session.removeVideo(this.video);
        this.video = video;
        this.session.setVideo(video);
    }

    handleCanvasRef (canvas) {
        if (this.canvas && this.canvas !== canvas) this.session.removeCanvas(this.canvas);
        this.canvas = canvas;
        this.session.setCanvas(canvas);
    }

    handleAddGesture () {
        const customCount = this.state.classes.filter(item => !item.protected).length;
        this.session.createGesture(`Gesto ${customCount + 1}`);
    }

    handleBack () {
        this.session.stopHoldCapture();
        this.setState({step: Math.max(1, this.state.step - 1)});
    }

    handleNext () {
        const nextStep = Math.min(3, this.state.step + 1);
        if (nextStep >= 2) this.session.start();
        this.setState({step: nextStep});
    }

    handleUseModel () {
        if (this.session.useModel()) this.props.onCancel();
    }

    handleRemoveGesture (classId) {
        this.session.removeGesture(classId);
    }

    handleRenameGesture (classId, name) {
        this.session.renameGesture(classId, name);
    }

    handleResetTraining () {
        this.session.resetTraining();
    }

    handleSelectClass (classId) {
        this.session.selectClass(classId);
    }

    handleStartCapture () {
        this.session.startHoldCapture(this.state.activeClassId);
    }

    handleStopCapture () {
        this.session.stopHoldCapture();
    }

    render () {
        const customCount = this.state.classes.filter(item => !item.protected).length;
        return (
            <HandGestureTrainerComponent
                activeClassId={this.state.activeClassId}
                canAddGesture={customCount < MAX_CUSTOM_CLASSES}
                capturing={this.state.capturing}
                classes={this.state.classes}
                error={this.state.error}
                feedback={this.state.feedback}
                loading={this.state.loading}
                modelReady={this.state.modelReady}
                prediction={this.state.prediction}
                step={this.state.step}
                onAddGesture={this.handleAddGesture}
                onBack={this.handleBack}
                onCancel={this.props.onCancel}
                onCanvasRef={this.handleCanvasRef}
                onNext={this.handleNext}
                onRemoveGesture={this.handleRemoveGesture}
                onRenameGesture={this.handleRenameGesture}
                onResetTraining={this.handleResetTraining}
                onSelectClass={this.handleSelectClass}
                onStartCapture={this.handleStartCapture}
                onStopCapture={this.handleStopCapture}
                onUseModel={this.handleUseModel}
                onVideoRef={this.handleVideoRef}
            />
        );
    }
}

HandGestureTrainer.propTypes = {
    onCancel: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({vm: state.scratchGui.vm});
const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(closeHandPoseGestureTrainer())
});

export default connect(mapStateToProps, mapDispatchToProps)(HandGestureTrainer);
