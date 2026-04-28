import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Box from '../box/box.jsx';
import styles from './hand-pose-detection-result.css';

const messages = defineMessages({
    title: {
        defaultMessage: 'Hand Pose Detection',
        description: 'Hand pose detection result panel title',
        id: 'gui.handPoseDetection.resultTitle'
    },
    loading: {
        defaultMessage: 'Loading detector...',
        description: 'Hand pose detection result panel loading message',
        id: 'gui.handPoseDetection.loading'
    },
    empty: {
        defaultMessage: 'No hand detected',
        description: 'Hand pose detection result panel empty message',
        id: 'gui.handPoseDetection.empty'
    },
    handCount: {
        defaultMessage: '{count, plural, one {# hand} other {# hands}}',
        description: 'Hand pose detection result panel hand count text',
        id: 'gui.handPoseDetection.handCount'
    }
});

const HandPoseDetectionResult = props => {
    const result = props.result || {};
    const primaryHand = result.primaryHand || (result.hands && result.hands[0]);
    const gesture = result.gesture || props.intl.formatMessage(messages.empty);
    const handedness = primaryHand && primaryHand.handedness ? ` - ${primaryHand.handedness}` : '';
    const handCount = result.handCount || 0;

    return (
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
                    <canvas
                        className={styles.canvas}
                        ref={props.onCanvasRef}
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
                    <Box className={styles.gesture}>{gesture}</Box>
                    <Box className={styles.meta}>
                        {`${props.intl.formatMessage(messages.handCount, {count: handCount})}${handedness}`}
                    </Box>
                </Box>
            </Box>
        </Draggable>
    );
};

HandPoseDetectionResult.propTypes = {
    error: PropTypes.string,
    intl: intlShape.isRequired,
    loading: PropTypes.bool,
    onCanvasRef: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onVideoRef: PropTypes.func.isRequired,
    result: PropTypes.shape({
        gesture: PropTypes.string,
        handCount: PropTypes.number,
        hands: PropTypes.arrayOf(PropTypes.shape({
            handedness: PropTypes.string
        })),
        primaryHand: PropTypes.shape({
            handedness: PropTypes.string
        })
    })
};

export default injectIntl(HandPoseDetectionResult);
