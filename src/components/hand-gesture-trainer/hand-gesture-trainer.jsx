/* eslint-disable react/no-multi-comp */
import classNames from 'classnames';
import {Check, ChevronLeft, ChevronRight, Plus, RotateCcw, Trash2} from 'lucide-react';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './hand-gesture-trainer.css';

const messages = defineMessages({
    title: {id: 'gui.handGestureTrainer.title', defaultMessage: 'Custom hand gestures'},
    stepClasses: {id: 'gui.handGestureTrainer.stepClasses', defaultMessage: 'Create gestures'},
    stepCapture: {id: 'gui.handGestureTrainer.stepCapture', defaultMessage: 'Collect examples'},
    stepTest: {id: 'gui.handGestureTrainer.stepTest', defaultMessage: 'Test and use'},
    classIntro: {
        id: 'gui.handGestureTrainer.classIntro',
        defaultMessage: 'Name the static poses you want to recognize. “Other” reduces false positives.'
    },
    addGesture: {id: 'gui.handGestureTrainer.addGesture', defaultMessage: 'Add gesture'},
    protectedClass: {id: 'gui.handGestureTrainer.protectedClass', defaultMessage: 'Required class'},
    examples: {id: 'gui.handGestureTrainer.examples', defaultMessage: '{count}/20 examples'},
    back: {id: 'gui.handGestureTrainer.back', defaultMessage: 'Back'},
    continue: {id: 'gui.handGestureTrainer.continue', defaultMessage: 'Continue'},
    capture: {id: 'gui.handGestureTrainer.capture', defaultMessage: 'Hold to capture'},
    capturing: {id: 'gui.handGestureTrainer.capturing', defaultMessage: 'Capturing examples...'},
    captureHint: {
        id: 'gui.handGestureTrainer.captureHint',
        defaultMessage: 'Hold the button, Space or Enter. Slightly vary position and distance.'
    },
    loading: {id: 'gui.handGestureTrainer.loading', defaultMessage: 'Starting camera and hand detector...'},
    result: {id: 'gui.handGestureTrainer.result', defaultMessage: 'Recognized result'},
    noResult: {id: 'gui.handGestureTrainer.noResult', defaultMessage: 'No trained gesture'},
    lowConfidence: {
        id: 'gui.handGestureTrainer.lowConfidence',
        defaultMessage: 'Show the pose more clearly or add more examples.'
    },
    addExamples: {id: 'gui.handGestureTrainer.addExamples', defaultMessage: 'Add more examples'},
    reset: {id: 'gui.handGestureTrainer.reset', defaultMessage: 'Redo training'},
    useModel: {id: 'gui.handGestureTrainer.useModel', defaultMessage: 'Use model'},
    ready: {id: 'gui.handGestureTrainer.ready', defaultMessage: 'Model ready to use'},
    notReady: {
        id: 'gui.handGestureTrainer.notReady',
        defaultMessage: 'Collect at least 20 examples for every gesture, including Other.'
    },
    cameraPrivacy: {
        id: 'gui.handGestureTrainer.cameraPrivacy',
        defaultMessage: 'Processing happens on this device. No camera image is saved.'
    }
});

const StepHeader = ({intl, step}) => {
    const steps = [messages.stepClasses, messages.stepCapture, messages.stepTest];
    return (
        <div className={styles.stepper}>
            {steps.map((message, index) => (
                <div
                    className={classNames(styles.step, {
                        [styles.stepActive]: step === index + 1,
                        [styles.stepComplete]: step > index + 1
                    })}
                    key={message.id}
                >
                    <span>{step > index + 1 ? <Check size={14} /> : index + 1}</span>
                    <strong>{intl.formatMessage(message)}</strong>
                </div>
            ))}
        </div>
    );
};

StepHeader.propTypes = {
    intl: intlShape.isRequired,
    step: PropTypes.number.isRequired
};

class ClassProgress extends React.Component {
    constructor (props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect () {
        this.props.onSelect(this.props.item.id);
    }
    render () {
        return (
            <button
                className={classNames(styles.progressRow, {
                    [styles.progressRowActive]: this.props.active
                })}
                onClick={this.handleSelect}
            >
                <span className={styles.progressName}>{this.props.item.name}</span>
                <span className={styles.progressTrack}>
                    <span style={{width: `${Math.min(100, (this.props.item.count / 20) * 100)}%`}} />
                </span>
                <span className={styles.progressCount}>{`${this.props.item.count}/20`}</span>
            </button>
        );
    }
}

ClassProgress.propTypes = {
    active: PropTypes.bool,
    item: PropTypes.shape({id: PropTypes.string, name: PropTypes.string, count: PropTypes.number}).isRequired,
    onSelect: PropTypes.func.isRequired
};

class GestureClassRow extends React.Component {
    constructor (props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleBlur (event) {
        this.props.onRenameGesture(this.props.item.id, event.target.value);
    }
    handleRemove () {
        this.props.onRemoveGesture(this.props.item.id);
    }
    render () {
        const {intl, item} = this.props;
        return (
            <div className={styles.classRow}>
                <input
                    aria-label={item.name}
                    defaultValue={item.name}
                    disabled={item.protected}
                    maxLength={40}
                    onBlur={this.handleBlur}
                />
                <span className={styles.exampleBadge}>
                    {intl.formatMessage(messages.examples, {count: item.count})}
                </span>
                {item.protected ? (
                    <span className={styles.requiredBadge}>
                        {intl.formatMessage(messages.protectedClass)}
                    </span>
                ) : (
                    <button
                        className={styles.iconButton}
                        title="Remover gesto"
                        onClick={this.handleRemove}
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>
        );
    }
}

GestureClassRow.propTypes = {
    intl: intlShape.isRequired,
    item: PropTypes.shape({
        count: PropTypes.number,
        id: PropTypes.string,
        name: PropTypes.string,
        protected: PropTypes.bool
    }).isRequired,
    onRemoveGesture: PropTypes.func.isRequired,
    onRenameGesture: PropTypes.func.isRequired
};

const CameraView = props => (
    <Box className={styles.cameraWrap}>
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
        {props.loading ? <div className={styles.cameraOverlay}>{props.loadingText}</div> : null}
        {props.error ? <div className={styles.cameraError}>{props.error}</div> : null}
        <div className={styles.cameraStatus}>{props.feedback}</div>
    </Box>
);

CameraView.propTypes = {
    error: PropTypes.string,
    feedback: PropTypes.string,
    loading: PropTypes.bool,
    loadingText: PropTypes.string,
    onCanvasRef: PropTypes.func.isRequired,
    onVideoRef: PropTypes.func.isRequired
};

class HandGestureTrainer extends React.Component {
    constructor (props) {
        super(props);
        this.handleCaptureKeyDown = this.handleCaptureKeyDown.bind(this);
        this.handleCaptureKeyUp = this.handleCaptureKeyUp.bind(this);
    }

    handleCaptureKeyDown (event) {
        if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
            event.preventDefault();
            this.props.onStartCapture();
        }
    }

    handleCaptureKeyUp (event) {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this.props.onStopCapture();
        }
    }

    renderClasses () {
        const {intl} = this.props;
        return (
            <div className={styles.classesStep}>
                <p className={styles.intro}>{intl.formatMessage(messages.classIntro)}</p>
                <div className={styles.classList}>
                    {this.props.classes.map(item => (
                        <GestureClassRow
                            intl={intl}
                            item={item}
                            key={item.id}
                            onRemoveGesture={this.props.onRemoveGesture}
                            onRenameGesture={this.props.onRenameGesture}
                        />
                    ))}
                </div>
                <button
                    className={styles.secondaryButton}
                    disabled={!this.props.canAddGesture}
                    onClick={this.props.onAddGesture}
                >
                    <Plus size={18} />
                    {intl.formatMessage(messages.addGesture)}
                </button>
            </div>
        );
    }

    renderCapture () {
        const {intl} = this.props;
        return (
            <div className={styles.captureLayout}>
                <div className={styles.cameraColumn}>
                    <CameraView
                        error={this.props.error}
                        feedback={this.props.feedback}
                        loading={this.props.loading}
                        loadingText={intl.formatMessage(messages.loading)}
                        onCanvasRef={this.props.onCanvasRef}
                        onVideoRef={this.props.onVideoRef}
                    />
                    <button
                        className={classNames(styles.captureButton, {
                            [styles.captureButtonActive]: this.props.capturing
                        })}
                        disabled={this.props.loading || Boolean(this.props.error)}
                        onKeyDown={this.handleCaptureKeyDown}
                        onKeyUp={this.handleCaptureKeyUp}
                        onPointerCancel={this.props.onStopCapture}
                        onPointerDown={this.props.onStartCapture}
                        onPointerLeave={this.props.onStopCapture}
                        onPointerUp={this.props.onStopCapture}
                    >
                        {intl.formatMessage(this.props.capturing ? messages.capturing : messages.capture)}
                    </button>
                    <p className={styles.hint}>{intl.formatMessage(messages.captureHint)}</p>
                </div>
                <div className={styles.progressList}>
                    {this.props.classes.map(item => (
                        <ClassProgress
                            active={item.id === this.props.activeClassId}
                            item={item}
                            key={item.id}
                            onSelect={this.props.onSelectClass}
                        />
                    ))}
                    <div className={styles.privacy}>{intl.formatMessage(messages.cameraPrivacy)}</div>
                </div>
            </div>
        );
    }

    renderTest () {
        const {intl, prediction} = this.props;
        const topConfidence = prediction.classId ? prediction.confidences[prediction.classId] || 0 : 0;
        const uncertain = prediction.classId === 'other' || topConfidence < 80;
        return (
            <div className={styles.testLayout}>
                <CameraView
                    error={this.props.error}
                    feedback={this.props.feedback}
                    loading={this.props.loading}
                    loadingText={intl.formatMessage(messages.loading)}
                    onCanvasRef={this.props.onCanvasRef}
                    onVideoRef={this.props.onVideoRef}
                />
                <div className={styles.testPanel}>
                    <span className={styles.eyebrow}>{intl.formatMessage(messages.result)}</span>
                    <strong className={styles.recognizedResult}>
                        {prediction.label || intl.formatMessage(messages.noResult)}
                    </strong>
                    <span className={classNames(styles.confidenceValue, {[styles.confidenceLow]: uncertain})}>
                        {`${topConfidence}%`}
                    </span>
                    {uncertain ? <p className={styles.warning}>{intl.formatMessage(messages.lowConfidence)}</p> : null}
                    <div className={styles.confidenceList}>
                        {this.props.classes.map(item => {
                            const confidence = prediction.confidences[item.id] || 0;
                            return (
                                <div
                                    className={styles.confidenceRow}
                                    key={item.id}
                                >
                                    <span>{item.name}</span>
                                    <div><span style={{width: `${confidence}%`}} /></div>
                                    <strong>{`${confidence}%`}</strong>
                                </div>
                            );
                        })}
                    </div>
                    <div className={classNames(styles.readiness, {[styles.readinessOk]: this.props.modelReady})}>
                        {intl.formatMessage(this.props.modelReady ? messages.ready : messages.notReady)}
                    </div>
                </div>
            </div>
        );
    }

    render () {
        const {intl, step} = this.props;
        return (
            <Modal
                className={styles.modalContent}
                contentLabel={intl.formatMessage(messages.title)}
                id="hand-gesture-trainer"
                onRequestClose={this.props.onCancel}
            >
                <StepHeader
                    intl={intl}
                    step={step}
                />
                <div className={styles.body}>
                    {step === 1 ? this.renderClasses() : null}
                    {step === 2 ? this.renderCapture() : null}
                    {step === 3 ? this.renderTest() : null}
                </div>
                <div className={styles.footer}>
                    {step > 1 ? (
                        <button
                            className={styles.secondaryButton}
                            onClick={this.props.onBack}
                        >
                            <ChevronLeft size={18} />
                            {step === 3 ? intl.formatMessage(messages.addExamples) : intl.formatMessage(messages.back)}
                        </button>
                    ) : <span />}
                    {step === 3 ? (
                        <button
                            className={styles.secondaryButton}
                            onClick={this.props.onResetTraining}
                        >
                            <RotateCcw size={18} />
                            {intl.formatMessage(messages.reset)}
                        </button>
                    ) : null}
                    <button
                        className={styles.primaryButton}
                        disabled={step === 3 && !this.props.modelReady}
                        onClick={step === 3 ? this.props.onUseModel : this.props.onNext}
                    >
                        {intl.formatMessage(step === 3 ? messages.useModel : messages.continue)}
                        {step < 3 ? <ChevronRight size={18} /> : <Check size={18} />}
                    </button>
                </div>
            </Modal>
        );
    }
}

HandGestureTrainer.propTypes = {
    activeClassId: PropTypes.string,
    canAddGesture: PropTypes.bool,
    capturing: PropTypes.bool,
    classes: PropTypes.arrayOf(PropTypes.shape({
        count: PropTypes.number,
        id: PropTypes.string,
        name: PropTypes.string,
        protected: PropTypes.bool
    })).isRequired,
    error: PropTypes.string,
    feedback: PropTypes.string,
    intl: intlShape.isRequired,
    loading: PropTypes.bool,
    modelReady: PropTypes.bool,
    onAddGesture: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCanvasRef: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onRemoveGesture: PropTypes.func.isRequired,
    onRenameGesture: PropTypes.func.isRequired,
    onResetTraining: PropTypes.func.isRequired,
    onSelectClass: PropTypes.func.isRequired,
    onStartCapture: PropTypes.func.isRequired,
    onStopCapture: PropTypes.func.isRequired,
    onUseModel: PropTypes.func.isRequired,
    onVideoRef: PropTypes.func.isRequired,
    prediction: PropTypes.shape({
        classId: PropTypes.string,
        confidences: PropTypes.objectOf(PropTypes.number),
        label: PropTypes.string
    }).isRequired,
    step: PropTypes.number.isRequired
};

export default injectIntl(HandGestureTrainer);
