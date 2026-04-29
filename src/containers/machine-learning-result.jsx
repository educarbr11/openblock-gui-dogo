import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'openblock-vm';
import {connect} from 'react-redux';

import MachineLearningResultComponent from '../components/machine-learning-result/machine-learning-result.jsx';
import {getMachineLearningSession} from '../lib/machine-learning/session';
import {closeMachineLearningResult} from '../reducers/modals';

class MachineLearningResult extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSessionUpdate',
            'handleVideoRef'
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

    render () {
        return (
            <MachineLearningResultComponent
                error={this.state.error}
                loading={this.state.loading}
                prediction={this.state.prediction}
                onClose={this.props.onClose}
                onVideoRef={this.handleVideoRef}
            />
        );
    }
}

MachineLearningResult.propTypes = {
    onClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeMachineLearningResult())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MachineLearningResult);
