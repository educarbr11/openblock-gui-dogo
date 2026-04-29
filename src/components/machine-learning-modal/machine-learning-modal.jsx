import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './machine-learning-modal.css';

const messages = defineMessages({
    title: {
        defaultMessage: 'Machine Learning',
        description: 'Machine learning trainer modal title',
        id: 'gui.machineLearning.title'
    },
    loading: {
        defaultMessage: 'Loading model...',
        description: 'Machine learning model loading message',
        id: 'gui.machineLearning.loading'
    },
    captureExample: {
        defaultMessage: 'Capture example',
        description: 'Button to capture one training example',
        id: 'gui.machineLearning.captureExample'
    },
    addClass: {
        defaultMessage: 'Add class',
        description: 'Button to add a machine learning class',
        id: 'gui.machineLearning.addClass'
    },
    useModel: {
        defaultMessage: 'Use model',
        description: 'Button to confirm a trained machine learning model',
        id: 'gui.machineLearning.useModel'
    }
});

class MachineLearningClassRow extends React.Component {
    constructor (props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleBlur (event) {
        this.props.onClassNameChange(this.props.label, event.target.value);
    }
    handleClick () {
        this.props.onSelectClass(this.props.label);
    }
    handleInputClick (event) {
        event.stopPropagation();
    }
    handleRemove (event) {
        event.stopPropagation();
        this.props.onRemoveClass(this.props.label);
    }
    render () {
        return (
            <Box
                className={classNames(styles.classRow, {
                    [styles.activeClass]: this.props.label === this.props.activeClass
                })}
                onClick={this.handleClick}
            >
                <input
                    className={styles.classInput}
                    defaultValue={this.props.label}
                    onBlur={this.handleBlur}
                    onClick={this.handleInputClick}
                />
                <span className={styles.count}>{this.props.count}</span>
                <span
                    className={classNames(styles.ready, {
                        [styles.readyOn]: this.props.ready
                    })}
                >
                    {this.props.ready ? '80%' : '-'}
                </span>
                <button
                    className={styles.removeButton}
                    disabled={this.props.removeDisabled}
                    onClick={this.handleRemove}
                >
                    {'x'}
                </button>
            </Box>
        );
    }
}

MachineLearningClassRow.propTypes = {
    activeClass: PropTypes.string,
    count: PropTypes.number,
    label: PropTypes.string,
    onClassNameChange: PropTypes.func.isRequired,
    onRemoveClass: PropTypes.func.isRequired,
    onSelectClass: PropTypes.func.isRequired,
    ready: PropTypes.bool,
    removeDisabled: PropTypes.bool
};

const MachineLearningModal = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.intl.formatMessage(messages.title)}
        onRequestClose={props.onCancel}
    >
        <Box className={styles.header}>
            <h2>{props.intl.formatMessage(messages.title)}</h2>
            <button
                className={styles.closeButton}
                onClick={props.onCancel}
            >
                {'x'}
            </button>
        </Box>
        <Box className={styles.body}>
            <Box className={styles.videoPanel}>
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
                    <Box className={styles.error}>{props.error}</Box>
                ) : null}
                <Box className={styles.prediction}>
                    <span>{props.prediction.label || '-'}</span>
                    <small>
                        {props.prediction.label ?
                            `${props.prediction.confidences[props.prediction.label] || 0}%` :
                            '0%'}
                    </small>
                </Box>
            </Box>
            <Box className={styles.trainingPanel}>
                <Box className={styles.toolbar}>
                    <button
                        className={styles.primaryButton}
                        disabled={props.loading || Boolean(props.error)}
                        onClick={props.onCaptureExample}
                    >
                        {props.intl.formatMessage(messages.captureExample)}
                    </button>
                    <button
                        className={styles.secondaryButton}
                        onClick={props.onAddClass}
                    >
                        {props.intl.formatMessage(messages.addClass)}
                    </button>
                    <button
                        className={styles.useButton}
                        disabled={!props.useModelEnabled}
                        onClick={props.onUseModel}
                    >
                        {props.intl.formatMessage(messages.useModel)}
                    </button>
                </Box>
                <Box className={styles.classList}>
                    {props.classes.map(item => (
                        <MachineLearningClassRow
                            activeClass={props.activeClass}
                            count={item.count}
                            key={item.label}
                            label={item.label}
                            ready={item.ready}
                            removeDisabled={props.classes.length <= 1}
                            onClassNameChange={props.onClassNameChange}
                            onRemoveClass={props.onRemoveClass}
                            onSelectClass={props.onSelectClass}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    </Modal>
);

MachineLearningModal.propTypes = {
    activeClass: PropTypes.string,
    classes: PropTypes.arrayOf(PropTypes.shape({
        count: PropTypes.number,
        label: PropTypes.string,
        ready: PropTypes.bool
    })),
    error: PropTypes.string,
    intl: intlShape.isRequired,
    loading: PropTypes.bool,
    onAddClass: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCaptureExample: PropTypes.func.isRequired,
    onClassNameChange: PropTypes.func.isRequired,
    onRemoveClass: PropTypes.func.isRequired,
    onSelectClass: PropTypes.func.isRequired,
    onUseModel: PropTypes.func.isRequired,
    onVideoRef: PropTypes.func.isRequired,
    prediction: PropTypes.shape({
        confidences: PropTypes.objectOf(PropTypes.number),
        label: PropTypes.string
    }),
    useModelEnabled: PropTypes.bool
};

export default injectIntl(MachineLearningModal);
