/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';

import FeedbackModalComponent from '../components/feedback-modal/feedback-modal.jsx';
import {closeFeedbackModal} from '../reducers/modals';
import {submitFeedback} from '../lib/sentry';

const FeedbackModal = props => {
    const [success, setSuccess] = useState(false);
    const handleClose = props.onRequestClose || props.onCloseFeedbackModal;

    return (
        <FeedbackModalComponent
            associatedEventId={props.associatedEventId}
            context={props.context}
            initialCategory={props.initialCategory}
            initialEmail={props.initialEmail}
            initialName={props.initialName}
            isRtl={props.isRtl}
            success={success}
            onRequestClose={handleClose}
            onSubmit={submitFeedback}
            onSuccess={() => setSuccess(true)}
        />
    );
};

FeedbackModal.propTypes = {
    associatedEventId: PropTypes.string,
    context: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    initialCategory: PropTypes.string,
    initialEmail: PropTypes.string,
    initialName: PropTypes.string,
    isRtl: PropTypes.bool,
    onCloseFeedbackModal: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func
};

const mapStateToProps = state => {
    const session = state.session && state.session.session;
    const user = session && session.user;
    return {
        context: {
            deviceId: state.scratchGui.device.deviceId || '',
            locale: state.locales.locale || '',
            programMode: state.scratchGui.programMode.isRealtimeMode ? 'realtime' : 'upload'
        },
        initialEmail: user && user.email ? user.email : '',
        initialName: user ? (user.name || user.username || '') : '',
        isRtl: state.locales.isRtl
    };
};

const mapDispatchToProps = dispatch => ({
    onCloseFeedbackModal: () => dispatch(closeFeedbackModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackModal);
