import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BrowserModalComponent from '../components/browser-modal/browser-modal.jsx';
import CrashMessageComponent from '../components/crash-message/crash-message.jsx';
import FeedbackModal from './feedback-modal.jsx';
import log from '../lib/log.js';
import {recommendedBrowser} from '../lib/supported-browser';
import {captureAppException, isFeedbackEnabled} from '../lib/sentry';
import {CATEGORY_ERROR} from '../components/feedback-modal/feedback-modal.jsx';

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false,
            errorId: null,
            feedbackVisible: false
        };
        this.handleCloseFeedback = this.handleCloseFeedback.bind(this);
        this.handleOpenFeedback = this.handleOpenFeedback.bind(this);
    }

    componentDidCatch (error, info) {
        // Error object may be undefined (IE?)
        error = error || {
            stack: 'Unknown stack',
            message: 'Unknown error'
        };

        // Capture diagnostics only for browsers supported by the editor.
        const errorId = recommendedBrowser() ? captureAppException(error, {
            action: this.props.action,
            componentStack: info && info.componentStack ? info.componentStack : '',
            deviceId: this.props.feedbackContext.deviceId,
            locale: this.props.feedbackContext.locale,
            programMode: this.props.feedbackContext.programMode
        }) : null;

        // Display fallback UI
        this.setState({
            hasError: true,
            errorId
        });

        // Log error locally for debugging as well.
        const componentStack = (info && info.componentStack) || '';
        log.error(`Unhandled Error: ${error.stack}\nComponent stack: ${componentStack}`);
    }

    handleBack () {
        window.history.back();
    }

    handleReload () {
        window.location.replace(window.location.origin + window.location.pathname);
    }

    handleOpenFeedback () {
        this.setState({feedbackVisible: true});
    }

    handleCloseFeedback () {
        this.setState({feedbackVisible: false});
    }

    render () {
        if (this.state.hasError) {
            if (recommendedBrowser()) {
                return (
                    <React.Fragment>
                        <CrashMessageComponent
                            eventId={this.state.errorId}
                            feedbackEnabled={isFeedbackEnabled()}
                            onReload={this.handleReload}
                            onSendFeedback={this.handleOpenFeedback}
                        />
                        {this.state.feedbackVisible ? (
                            <FeedbackModal
                                associatedEventId={this.state.errorId}
                                initialCategory={CATEGORY_ERROR}
                                onRequestClose={this.handleCloseFeedback}
                            />
                        ) : null}
                    </React.Fragment>
                );
            }
            return (<BrowserModalComponent
                error
                isRtl={this.props.isRtl}
                onBack={this.handleBack}
            />);
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    action: PropTypes.string.isRequired, // Used for defining tracking action
    children: PropTypes.node,
    feedbackContext: PropTypes.shape({
        deviceId: PropTypes.string,
        locale: PropTypes.string,
        programMode: PropTypes.string
    }).isRequired,
    isRtl: PropTypes.bool
};

const mapStateToProps = state => ({
    feedbackContext: {
        deviceId: state.scratchGui.device.deviceId || '',
        locale: state.locales.locale || '',
        programMode: state.scratchGui.programMode.isRealtimeMode ? 'realtime' : 'upload'
    },
    isRtl: state.locales.isRtl
});

// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
