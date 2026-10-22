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
    },
    trainedGesture: {
        defaultMessage: 'Trained gesture',
        description: 'Label for a trained hand gesture prediction',
        id: 'gui.handPoseDetection.trainedGesture'
    },
    noTrainedGesture: {
        defaultMessage: 'No trained gesture',
        description: 'Empty trained hand gesture prediction',
        id: 'gui.handPoseDetection.noTrainedGesture'
    },
    stop: {
        defaultMessage: 'Stop camera',
        description: 'Button that stops hand detection',
        id: 'gui.handPoseDetection.stop'
    },
    leftHand: {
        defaultMessage: 'left hand',
        description: 'Label for a detected left hand',
        id: 'gui.handPoseDetection.leftHand'
    },
    rightHand: {
        defaultMessage: 'right hand',
        description: 'Label for a detected right hand',
        id: 'gui.handPoseDetection.rightHand'
    }
});

const HandPoseDetectionResult = props => {
    const result = props.result || {};
    const primaryHand = result.primaryHand || (result.hands && result.hands[0]);
    const trainedGesture = result.trainedGesture || {};
    const gesture = trainedGesture.label || props.intl.formatMessage(messages.noTrainedGesture);
    const confidence = trainedGesture.classId ? trainedGesture.confidences[trainedGesture.classId] || 0 : 0;
    const handSide = primaryHand && primaryHand.handedness === 'left' ? messages.leftHand : messages.rightHand;
    const handedness = primaryHand && primaryHand.handedness ?
        ` - ${props.intl.formatMessage(handSide)}` : '';
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
                    <Box className={styles.resultLabel}>{props.intl.formatMessage(messages.trainedGesture)}</Box>
                    <Box className={styles.gesture}>{gesture}</Box>
                    <Box className={styles.confidence}>{`${confidence}%`}</Box>
                    <Box className={styles.meta}>
                        {`${props.intl.formatMessage(messages.handCount, {count: handCount})}${handedness}`}
                    </Box>
                    <button
                        className={styles.stopButton}
                        onClick={props.onStop}
                    >
                        {props.intl.formatMessage(messages.stop)}
                    </button>
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
    onStop: PropTypes.func.isRequired,
    onVideoRef: PropTypes.func.isRequired,
    result: PropTypes.shape({
        gesture: PropTypes.string,
        handCount: PropTypes.number,
        hands: PropTypes.arrayOf(PropTypes.shape({
            handedness: PropTypes.string
        })),
        primaryHand: PropTypes.shape({
            handedness: PropTypes.string
        }),
        trainedGesture: PropTypes.shape({
            classId: PropTypes.string,
            confidences: PropTypes.objectOf(PropTypes.number),
            label: PropTypes.string
        })
    })
};

export default injectIntl(HandPoseDetectionResult);
