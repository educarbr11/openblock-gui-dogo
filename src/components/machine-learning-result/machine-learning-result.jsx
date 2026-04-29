import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Box from '../box/box.jsx';
import styles from './machine-learning-result.css';

const messages = defineMessages({
    title: {
        defaultMessage: 'Machine Learning',
        description: 'Machine learning result panel title',
        id: 'gui.machineLearning.resultTitle'
    },
    loading: {
        defaultMessage: 'Loading...',
        description: 'Machine learning result panel loading message',
        id: 'gui.machineLearning.resultLoading'
    },
    empty: {
        defaultMessage: 'No class recognized',
        description: 'Machine learning result panel empty class message',
        id: 'gui.machineLearning.resultEmpty'
    }
});

const MachineLearningResult = props => (
    <Draggable
        bounds="body"
        cancel={`.${styles.closeButton}`}
        handle={`.${styles.header}`}
    >
        <Box className={styles.panel}>
            <Box className={styles.header}>
                <span>{props.intl.formatMessage(messages.title)}</span>
                <button
                    className={styles.closeButton}
                    onClick={props.onClose}
                >
                    {'x'}
                </button>
            </Box>
            <Box className={styles.videoWrap}>
                <video
                    muted
                    playsInline
                    className={styles.video}
                    ref={props.onVideoRef}
                />
                {props.loading ? (
                    <Box className={styles.overlay}>
                        {props.intl.formatMessage(messages.loading)}
                    </Box>
                ) : null}
                {props.error ? (
                    <Box className={styles.error}>
                        {props.error}
                    </Box>
                ) : null}
            </Box>
            <Box className={styles.label}>
                {props.prediction.label || props.intl.formatMessage(messages.empty)}
            </Box>
        </Box>
    </Draggable>
);

MachineLearningResult.propTypes = {
    error: PropTypes.string,
    intl: intlShape.isRequired,
    loading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onVideoRef: PropTypes.func.isRequired,
    prediction: PropTypes.shape({
        confidences: PropTypes.objectOf(PropTypes.number),
        label: PropTypes.string
    })
};

export default injectIntl(MachineLearningResult);
