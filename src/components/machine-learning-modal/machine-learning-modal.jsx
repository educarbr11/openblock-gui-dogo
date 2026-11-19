import classNames from 'classnames';
import {Camera, Check, Plus, Trash2} from 'lucide-react';
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
    },
    camera: {
        defaultMessage: 'Camera',
        description: 'Camera panel title in the machine learning trainer',
        id: 'gui.machineLearning.camera'
    },
    trainings: {
        defaultMessage: 'My trainings',
        description: 'Training list title in the machine learning trainer',
        id: 'gui.machineLearning.trainings'
    },
    trainingCount: {
        defaultMessage: '{count, plural, one {# training} other {# trainings}}',
        description: 'Number of machine learning trainings',
        id: 'gui.machineLearning.trainingCount'
    },
    selectedTraining: {
        defaultMessage: 'Selected training',
        description: 'Label for the selected machine learning training',
        id: 'gui.machineLearning.selectedTraining'
    },
    selected: {
        defaultMessage: 'Selected',
        description: 'Selected machine learning training badge',
        id: 'gui.machineLearning.selected'
    },
    examples: {
        defaultMessage: '{count, plural, one {# example} other {# examples}}',
        description: 'Number of examples in a machine learning training',
        id: 'gui.machineLearning.examples'
    },
    ready: {
        defaultMessage: 'Ready',
        description: 'Ready machine learning training status',
        id: 'gui.machineLearning.ready'
    },
    collectExamples: {
        defaultMessage: 'Add examples',
        description: 'Incomplete machine learning training status',
        id: 'gui.machineLearning.collectExamples'
    },
    precision: {
        defaultMessage: 'Precision',
        description: 'Machine learning prediction precision label',
        id: 'gui.machineLearning.precision'
    },
    recognizedTraining: {
        defaultMessage: 'Recognized training',
        description: 'Recognized machine learning training label',
        id: 'gui.machineLearning.recognizedTraining'
    },
    noPrediction: {
        defaultMessage: 'No training recognized',
        description: 'Empty machine learning prediction',
        id: 'gui.machineLearning.noPrediction'
    },
    removeTraining: {
        defaultMessage: 'Remove training {name}',
        description: 'Accessible label for removing a machine learning training',
        id: 'gui.machineLearning.removeTraining'
    },
    modelReady: {
        defaultMessage: 'Model ready to use',
        description: 'Ready machine learning model status',
        id: 'gui.machineLearning.modelReady'
    },
    modelIncomplete: {
        defaultMessage: 'Add examples and test every training to use the model.',
        description: 'Incomplete machine learning model status',
        id: 'gui.machineLearning.modelIncomplete'
    }
});

class MachineLearningClassRow extends React.Component {
    constructor (props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
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
        this.handleClick();
    }
    handleKeyDown (event) {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleClick();
        }
    }
    handleRemove (event) {
        event.stopPropagation();
        this.props.onRemoveClass(this.props.label);
    }
    render () {
        const selected = this.props.label === this.props.activeClass;
        const precision = Math.max(0, Math.min(100, this.props.precision || 0));
        return (
            <Box
                className={classNames(styles.classRow, {
                    [styles.activeClass]: selected
                })}
                data-active-training={selected ? 'true' : 'false'}
                role="button"
                tabIndex={0}
                aria-pressed={selected}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
            >
                <Box className={styles.classMainRow}>
                    <span className={styles.selectionIndicator}>
                        {selected ? <Check size={15} /> : null}
                    </span>
                    <input
                        aria-label={this.props.label}
                        className={styles.classInput}
                        defaultValue={this.props.label}
                        maxLength={40}
                        onBlur={this.handleBlur}
                        onClick={this.handleInputClick}
                    />
                    {selected ? (
                        <span className={styles.selectedBadge}>
                            {this.props.intl.formatMessage(messages.selected)}
                        </span>
                    ) : null}
                    <button
                        aria-label={this.props.intl.formatMessage(messages.removeTraining, {
                            name: this.props.label
                        })}
                        className={styles.removeButton}
                        disabled={this.props.removeDisabled}
                        title={this.props.intl.formatMessage(messages.removeTraining, {name: this.props.label})}
                        type="button"
                        onClick={this.handleRemove}
                    >
                        <Trash2 size={17} />
                    </button>
                </Box>
                <Box className={styles.classMeta}>
                    <span>{this.props.intl.formatMessage(messages.examples, {count: this.props.count})}</span>
                    <span className={classNames(styles.ready, {[styles.readyOn]: this.props.ready})}>
                        {this.props.ready ? <Check size={13} /> : null}
                        {this.props.intl.formatMessage(this.props.ready ? messages.ready : messages.collectExamples)}
                    </span>
                </Box>
                <Box className={styles.precisionRow}>
                    <span>{this.props.intl.formatMessage(messages.precision)}</span>
                    <span className={styles.precisionTrack}>
                        <span style={{width: `${precision}%`}} />
                    </span>
                    <strong>{`${precision}%`}</strong>
                </Box>
            </Box>
        );
    }
}

MachineLearningClassRow.propTypes = {
    activeClass: PropTypes.string,
    count: PropTypes.number,
    label: PropTypes.string,
    intl: intlShape.isRequired,
    onClassNameChange: PropTypes.func.isRequired,
    onRemoveClass: PropTypes.func.isRequired,
    onSelectClass: PropTypes.func.isRequired,
    ready: PropTypes.bool,
    removeDisabled: PropTypes.bool,
    precision: PropTypes.number
};

const MachineLearningModal = props => {
    const classListRef = React.useRef(null);
    const setClassListRef = React.useCallback(element => {
        classListRef.current = element;
    }, []);
    const prediction = props.prediction || {label: '', confidences: {}};
    const predictionPrecision = prediction.label ? prediction.confidences[prediction.label] || 0 : 0;

    React.useEffect(() => {
        if (!classListRef.current) return;
        const selectedTraining = classListRef.current.querySelector('[data-active-training="true"]');
        if (selectedTraining) {
            selectedTraining.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [props.activeClass]);

    return (
        <Modal
            className={styles.modalContent}
            contentLabel={props.intl.formatMessage(messages.title)}
            headerClassName={styles.modalHeader}
            onRequestClose={props.onCancel}
        >
            <Box className={styles.body}>
                <Box className={styles.cameraColumn}>
                    <Box className={styles.sectionHeading}>
                        <span className={styles.sectionIcon}><Camera size={19} /></span>
                        <Box>
                            <h3>{props.intl.formatMessage(messages.camera)}</h3>
                            <span>
                                {props.intl.formatMessage(messages.selectedTraining)}
                                {': '}
                                <strong>{props.activeClass}</strong>
                            </span>
                        </Box>
                    </Box>
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
                            <small>{props.intl.formatMessage(messages.recognizedTraining)}</small>
                            <strong>
                                {prediction.label || props.intl.formatMessage(messages.noPrediction)}
                            </strong>
                            <span>
                                {`${props.intl.formatMessage(messages.precision)}: ${predictionPrecision}%`}
                            </span>
                        </Box>
                    </Box>
                    <button
                        className={styles.captureButton}
                        disabled={props.loading || Boolean(props.error)}
                        type="button"
                        onClick={props.onCaptureExample}
                    >
                        <Camera size={18} />
                        {props.intl.formatMessage(messages.captureExample)}
                    </button>
                </Box>
                <Box className={styles.trainingPanel}>
                    <Box className={styles.trainingHeader}>
                        <Box>
                            <h3>{props.intl.formatMessage(messages.trainings)}</h3>
                            <span>{props.intl.formatMessage(messages.trainingCount, {
                                count: props.classes.length
                            })}</span>
                        </Box>
                        <button
                            className={styles.addButton}
                            type="button"
                            onClick={props.onAddClass}
                        >
                            <Plus size={17} />
                            {props.intl.formatMessage(messages.addClass)}
                        </button>
                    </Box>
                    <Box
                        className={styles.classList}
                        componentRef={setClassListRef}
                    >
                        {props.classes.map(item => (
                            <MachineLearningClassRow
                                activeClass={props.activeClass}
                                count={item.count}
                                intl={props.intl}
                                key={item.label}
                                label={item.label}
                                precision={prediction.confidences[item.label] || 0}
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
            <Box className={styles.footer}>
                <Box
                    className={classNames(styles.modelStatus, {
                        [styles.modelStatusReady]: props.useModelEnabled
                    })}
                >
                    {props.useModelEnabled ? <Check size={17} /> : null}
                    <span>{props.intl.formatMessage(
                        props.useModelEnabled ? messages.modelReady : messages.modelIncomplete
                    )}</span>
                </Box>
                <button
                    className={styles.useButton}
                    disabled={!props.useModelEnabled}
                    type="button"
                    onClick={props.onUseModel}
                >
                    <Check size={18} />
                    {props.intl.formatMessage(messages.useModel)}
                </button>
            </Box>
        </Modal>
    );
};

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
