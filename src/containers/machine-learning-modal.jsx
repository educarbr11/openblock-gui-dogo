import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'openblock-vm';
import {connect} from 'react-redux';

import MachineLearningModalComponent from '../components/machine-learning-modal/machine-learning-modal.jsx';
import {getMachineLearningSession} from '../lib/machine-learning/session';
import {closeMachineLearningTrainer} from '../reducers/modals';

class MachineLearningModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAddClass',
            'handleCaptureExample',
            'handleClassNameChange',
            'handleRemoveClass',
            'handleSelectClass',
            'handleUseModel',
            'handleVideoRef',
            'handleSessionUpdate'
        ]);

        this.session = getMachineLearningSession(props.vm);
        this.video = null;
        this.state = this.session.state;
    }

    componentDidMount () {
        this.unsubscribe = this.session.subscribe(this.handleSessionUpdate);
    }

    componentWillUnmount () {
        if (this.unsubscribe) this.unsubscribe();
        this.session.removeVideo(this.video);
    }

    handleSessionUpdate (state) {
        this.setState(state);
    }

    handleVideoRef (video) {
        this.video = video;
        this.session.setVideo(video);
    }

    handleSelectClass (label) {
        this.session.selectClass(label);
    }

    handleClassNameChange (oldLabel, newLabel) {
        this.session.renameClass(oldLabel, newLabel);
    }

    handleAddClass () {
        this.session.addClass();
    }

    handleRemoveClass (label) {
        this.session.removeClass(label);
    }

    handleCaptureExample () {
        this.session.captureExample();
    }

    handleUseModel () {
        this.session.useModel();
        this.props.onClose();
    }

    render () {
        return (
            <MachineLearningModalComponent
                activeClass={this.state.activeClass}
                classes={this.state.classes}
                error={this.state.error}
                loading={this.state.loading}
                prediction={this.state.prediction}
                useModelEnabled={this.state.useModelEnabled}
                onAddClass={this.handleAddClass}
                onCancel={this.props.onClose}
                onCaptureExample={this.handleCaptureExample}
                onClassNameChange={this.handleClassNameChange}
                onRemoveClass={this.handleRemoveClass}
                onSelectClass={this.handleSelectClass}
                onUseModel={this.handleUseModel}
                onVideoRef={this.handleVideoRef}
            />
        );
    }
}

MachineLearningModal.propTypes = {
    onClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeMachineLearningTrainer())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MachineLearningModal);
