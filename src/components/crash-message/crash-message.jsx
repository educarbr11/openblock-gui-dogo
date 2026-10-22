import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import {FormattedMessage} from 'react-intl';

import styles from './crash-message.css';
import reloadIcon from './reload.svg';

const CrashMessage = props => (
    <div className={styles.crashWrapper}>
        <Box className={styles.body}>
            <img
                className={styles.reloadIcon}
                src={reloadIcon}
            />
            <h2>
                <FormattedMessage
                    defaultMessage="Oops! Something went wrong."
                    description="Crash Message title"
                    id="gui.crashMessage.label"
                />
            </h2>
            <p>
                {props.feedbackEnabled ? (
                    <FormattedMessage
                        defaultMessage={'We are so sorry, but it looks like DoGoBlock has crashed. This bug has been' +
                            ' automatically reported to the DoGoBlock Team. Please refresh your page to try' +
                            ' again.'}
                        description="Message to inform the user that page has crashed and was reported."
                        id="gui.crashMessage.description"
                    />
                ) : (
                    <FormattedMessage
                        defaultMessage={'We are so sorry, but it looks like DoGoBlock has crashed. Please refresh' +
                            ' your page to try again.'}
                        description="Message to inform the user that page has crashed without diagnostics enabled."
                        id="gui.crashMessage.descriptionNotReported"
                    />
                )}
            </p>
            {props.eventId && (
                <p>
                    <FormattedMessage
                        defaultMessage="Your error was logged with id {errorId}"
                        description="Message to inform the user that page has crashed."
                        id="gui.crashMessage.errorNumber"
                        values={{
                            errorId: props.eventId
                        }}
                    />
                </p>
            )}
            <button
                className={styles.reloadButton}
                onClick={props.onReload}
            >
                <FormattedMessage
                    defaultMessage="Reload"
                    description="Button to reload the page when page crashes"
                    id="gui.crashMessage.reload"
                />
            </button>
            {props.feedbackEnabled ? (
                <button
                    className={styles.feedbackButton}
                    onClick={props.onSendFeedback}
                >
                    <FormattedMessage
                        defaultMessage="Send error details"
                        description="Button to open feedback after a crash"
                        id="gui.crashMessage.sendFeedback"
                    />
                </button>
            ) : null}
        </Box>
    </div>
);

CrashMessage.propTypes = {
    eventId: PropTypes.string,
    feedbackEnabled: PropTypes.bool,
    onReload: PropTypes.func.isRequired,
    onSendFeedback: PropTypes.func
};

export default CrashMessage;
