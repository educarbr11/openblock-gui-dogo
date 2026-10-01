/* eslint-disable react/jsx-no-bind */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {AlertTriangle, Bug, Camera, ImagePlus, Lightbulb, MessageSquareWarning, Send, Trash2} from 'lucide-react';

import Modal from '../modal/modal.jsx';
import {
    MAX_SCREENSHOT_BYTES,
    captureScreen,
    isSupportedScreenshotFile
} from '../../lib/feedback-screenshot';

import styles from './feedback-modal.css';

const CATEGORY_ERROR = 'error';
const CATEGORY_BUG = 'bug';
const CATEGORY_SUGGESTION = 'suggestion';
const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 4000;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;

const messages = defineMessages({
    title: {
        id: 'gui.feedback.title',
        defaultMessage: 'Send feedback',
        description: 'Feedback modal title'
    },
    intro: {
        id: 'gui.feedback.intro',
        defaultMessage: 'Tell us about an error, a bug, or an idea to improve DoGoBlock.',
        description: 'Feedback modal introductory text'
    },
    categoryLabel: {
        id: 'gui.feedback.categoryLabel',
        defaultMessage: 'Feedback type',
        description: 'Feedback category field label'
    },
    categoryError: {
        id: 'gui.feedback.categoryError',
        defaultMessage: 'Error',
        description: 'Feedback error category'
    },
    categoryBug: {
        id: 'gui.feedback.categoryBug',
        defaultMessage: 'Bug',
        description: 'Feedback bug category'
    },
    categorySuggestion: {
        id: 'gui.feedback.categorySuggestion',
        defaultMessage: 'Suggestion',
        description: 'Feedback suggestion category'
    },
    subjectLabel: {
        id: 'gui.feedback.subjectLabel',
        defaultMessage: 'Title',
        description: 'Feedback subject field label'
    },
    subjectPlaceholder: {
        id: 'gui.feedback.subjectPlaceholder',
        defaultMessage: 'Briefly summarize what happened',
        description: 'Feedback subject field placeholder'
    },
    descriptionLabel: {
        id: 'gui.feedback.descriptionLabel',
        defaultMessage: 'Description',
        description: 'Feedback description field label'
    },
    descriptionPlaceholder: {
        id: 'gui.feedback.descriptionPlaceholder',
        defaultMessage: 'Describe what happened, what you expected, or your suggestion.',
        description: 'Feedback description field placeholder'
    },
    nameLabel: {
        id: 'gui.feedback.nameLabel',
        defaultMessage: 'Name (optional)',
        description: 'Feedback name field label'
    },
    emailLabel: {
        id: 'gui.feedback.emailLabel',
        defaultMessage: 'Email (optional)',
        description: 'Feedback email field label'
    },
    emailInvalid: {
        id: 'gui.feedback.emailInvalid',
        defaultMessage: 'Enter a valid email address.',
        description: 'Invalid feedback email error'
    },
    screenshotLabel: {
        id: 'gui.feedback.screenshotLabel',
        defaultMessage: 'Screenshot (optional)',
        description: 'Feedback screenshot section label'
    },
    screenshotHelp: {
        id: 'gui.feedback.screenshotHelp',
        defaultMessage: 'Capture the current screen or select an image. Review it before sending.',
        description: 'Feedback screenshot help text'
    },
    captureScreenshot: {
        id: 'gui.feedback.captureScreenshot',
        defaultMessage: 'Capture screen',
        description: 'Capture feedback screenshot button'
    },
    capturingScreenshot: {
        id: 'gui.feedback.capturingScreenshot',
        defaultMessage: 'Capturing...',
        description: 'Feedback screenshot capture in progress'
    },
    selectScreenshot: {
        id: 'gui.feedback.selectScreenshot',
        defaultMessage: 'Select image',
        description: 'Select feedback screenshot button'
    },
    removeScreenshot: {
        id: 'gui.feedback.removeScreenshot',
        defaultMessage: 'Remove screenshot',
        description: 'Remove feedback screenshot button'
    },
    screenshotAlt: {
        id: 'gui.feedback.screenshotAlt',
        defaultMessage: 'Screenshot that will be sent with the feedback',
        description: 'Feedback screenshot preview alternative text'
    },
    screenshotError: {
        id: 'gui.feedback.screenshotError',
        defaultMessage: 'The screenshot could not be captured. You can select an image instead.',
        description: 'Feedback screenshot capture error'
    },
    screenshotInvalid: {
        id: 'gui.feedback.screenshotInvalid',
        defaultMessage: 'Select a PNG, JPG, or WebP image up to 8 MB.',
        description: 'Invalid feedback screenshot error'
    },
    required: {
        id: 'gui.feedback.required',
        defaultMessage: 'This field is required.',
        description: 'Required feedback field error'
    },
    privacy: {
        id: 'gui.feedback.privacy',
        defaultMessage: 'DoGoBlock sends only this message and safe technical metadata. Your project, code, ' +
            'credentials, and serial logs are not included. An image is sent only when you attach it above.',
        description: 'Feedback privacy notice'
    },
    cancel: {
        id: 'gui.feedback.cancel',
        defaultMessage: 'Cancel',
        description: 'Cancel feedback button'
    },
    submit: {
        id: 'gui.feedback.submit',
        defaultMessage: 'Send feedback',
        description: 'Submit feedback button'
    },
    submitting: {
        id: 'gui.feedback.submitting',
        defaultMessage: 'Sending...',
        description: 'Feedback submission in progress'
    },
    successTitle: {
        id: 'gui.feedback.successTitle',
        defaultMessage: 'Feedback sent',
        description: 'Feedback success title'
    },
    successMessage: {
        id: 'gui.feedback.successMessage',
        defaultMessage: 'Thank you. Your feedback will help us improve DoGoBlock.',
        description: 'Feedback success message'
    },
    close: {
        id: 'gui.feedback.close',
        defaultMessage: 'Close',
        description: 'Close feedback modal button'
    },
    submitError: {
        id: 'gui.feedback.submitError',
        defaultMessage: 'We could not send your feedback. Check your connection and try again.',
        description: 'Feedback submission error'
    }
});

const categories = [
    {id: CATEGORY_ERROR, label: messages.categoryError, Icon: AlertTriangle},
    {id: CATEGORY_BUG, label: messages.categoryBug, Icon: Bug},
    {id: CATEGORY_SUGGESTION, label: messages.categorySuggestion, Icon: Lightbulb}
];

const isValidEmail = email => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const FeedbackModal = props => {
    const formRef = useRef(null);
    const fileInputRef = useRef(null);
    const hiddenPortalRef = useRef(null);
    const hiddenPortalVisibilityRef = useRef('');
    const [category, setCategory] = useState(props.initialCategory || CATEGORY_BUG);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState(props.initialName || '');
    const [email, setEmail] = useState(props.initialEmail || '');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [capturingScreenshot, setCapturingScreenshot] = useState(false);
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotError, setScreenshotError] = useState(false);

    const titleInvalid = submitted && !title.trim();
    const descriptionInvalid = submitted && !description.trim();
    const emailInvalid = submitted && !isValidEmail(email.trim());

    useEffect(() => () => {
        if (screenshot && screenshot.previewUrl) URL.revokeObjectURL(screenshot.previewUrl);
    }, [screenshot]);

    const isBusy = submitting || capturingScreenshot;

    const handleClose = () => {
        if (!isBusy) props.onRequestClose();
    };

    const restoreFeedbackPortal = () => {
        if (!hiddenPortalRef.current) return;
        hiddenPortalRef.current.style.visibility = hiddenPortalVisibilityRef.current;
        hiddenPortalRef.current = null;
    };

    const hideFeedbackPortal = () => {
        const portal = formRef.current && formRef.current.closest('.ReactModalPortal');
        if (!portal) return;
        hiddenPortalRef.current = portal;
        hiddenPortalVisibilityRef.current = portal.style.visibility;
        portal.style.visibility = 'hidden';
    };

    const setScreenshotBlob = (blob, filename) => {
        setScreenshot({
            blob,
            contentType: blob.type || 'image/png',
            filename,
            previewUrl: URL.createObjectURL(blob)
        });
    };

    const handleCaptureScreenshot = () => {
        if (capturingScreenshot || submitting) return;
        setCapturingScreenshot(true);
        setScreenshotError(false);
        captureScreen({
            onAfterCapture: restoreFeedbackPortal,
            onBeforeCapture: hideFeedbackPortal
        }).then(blob => {
            setScreenshotBlob(blob, blob.type === 'image/jpeg' ? 'screenshot.jpg' : 'screenshot.png');
            setCapturingScreenshot(false);
        })
            .catch(() => {
                setCapturingScreenshot(false);
                setScreenshotError(true);
            });
    };

    const handleSelectScreenshot = event => {
        const file = event.target.files && event.target.files[0];
        event.target.value = '';
        setScreenshotError(false);
        if (!isSupportedScreenshotFile(file)) {
            setScreenshotError('invalid');
            return;
        }
        setScreenshotBlob(file, file.name || 'screenshot.png');
    };

    const handleRemoveScreenshot = () => {
        setScreenshot(null);
        setScreenshotError(false);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (submitting) return;
        setSubmitted(true);
        setSubmitError(false);
        if (!title.trim() || !description.trim() || !isValidEmail(email.trim())) return;

        setSubmitting(true);
        props.onSubmit({
            category,
            title,
            description,
            name,
            email,
            screenshot: screenshot ? {
                contentType: screenshot.contentType,
                data: screenshot.blob,
                filename: screenshot.filename
            } : null,
            associatedEventId: props.associatedEventId,
            context: props.context
        })
            .then(() => {
                setSubmitting(false);
                props.onSuccess();
            })
            .catch(() => {
                setSubmitting(false);
                setSubmitError(true);
            });
    };

    return (
        <Modal
            className={styles.modalContent}
            contentLabel={props.intl.formatMessage(messages.title)}
            headerClassName={styles.modalHeader}
            isRtl={props.isRtl}
            shouldCloseOnOverlayClick={!isBusy}
            onRequestClose={handleClose}
        >
            {props.success ? (
                <div className={styles.successBody}>
                    <div className={styles.successIcon}>
                        <MessageSquareWarning size={30} />
                    </div>
                    <h2><FormattedMessage {...messages.successTitle} /></h2>
                    <p><FormattedMessage {...messages.successMessage} /></p>
                    <button
                        className={styles.primaryButton}
                        type="button"
                        onClick={handleClose}
                    >
                        <FormattedMessage {...messages.close} />
                    </button>
                </div>
            ) : (
                <form
                    className={styles.form}
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.formBody}>
                        <p className={styles.intro}><FormattedMessage {...messages.intro} /></p>

                        <fieldset className={styles.categoryFieldset}>
                            <legend><FormattedMessage {...messages.categoryLabel} /></legend>
                            <div className={styles.categoryOptions}>
                                {categories.map(item => (
                                    <button
                                        aria-pressed={category === item.id}
                                        className={classNames(styles.categoryButton, {
                                            [styles.categoryButtonSelected]: category === item.id
                                        })}
                                        key={item.id}
                                        type="button"
                                        onClick={() => setCategory(item.id)}
                                    >
                                        <item.Icon size={20} />
                                        <FormattedMessage {...item.label} />
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <label className={styles.field}>
                            <span><FormattedMessage {...messages.subjectLabel} /></span>
                            <input
                                aria-invalid={titleInvalid}
                                maxLength={MAX_TITLE_LENGTH}
                                placeholder={props.intl.formatMessage(messages.subjectPlaceholder)}
                                type="text"
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                            />
                            {titleInvalid ? <small className={styles.fieldError}>
                                <FormattedMessage {...messages.required} />
                            </small> : null}
                        </label>

                        <label className={styles.field}>
                            <span><FormattedMessage {...messages.descriptionLabel} /></span>
                            <textarea
                                aria-invalid={descriptionInvalid}
                                maxLength={MAX_DESCRIPTION_LENGTH}
                                placeholder={props.intl.formatMessage(messages.descriptionPlaceholder)}
                                rows={6}
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                            <small className={styles.characterCount}>
                                {`${description.length}/${MAX_DESCRIPTION_LENGTH}`}
                            </small>
                            {descriptionInvalid ? <small className={styles.fieldError}>
                                <FormattedMessage {...messages.required} />
                            </small> : null}
                        </label>

                        <div className={styles.identityFields}>
                            <label className={styles.field}>
                                <span><FormattedMessage {...messages.nameLabel} /></span>
                                <input
                                    maxLength={MAX_NAME_LENGTH}
                                    type="text"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                            </label>
                            <label className={styles.field}>
                                <span><FormattedMessage {...messages.emailLabel} /></span>
                                <input
                                    aria-invalid={emailInvalid}
                                    maxLength={MAX_EMAIL_LENGTH}
                                    type="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                                {emailInvalid ? <small className={styles.fieldError}>
                                    <FormattedMessage {...messages.emailInvalid} />
                                </small> : null}
                            </label>
                        </div>

                        <section
                            aria-labelledby="feedback-screenshot-label"
                            className={styles.screenshotSection}
                        >
                            <div className={styles.screenshotHeader}>
                                <div>
                                    <strong id="feedback-screenshot-label">
                                        <FormattedMessage {...messages.screenshotLabel} />
                                    </strong>
                                    <p><FormattedMessage {...messages.screenshotHelp} /></p>
                                </div>
                                <div className={styles.screenshotActions}>
                                    <button
                                        className={styles.attachmentButton}
                                        disabled={isBusy}
                                        type="button"
                                        onClick={handleCaptureScreenshot}
                                    >
                                        <Camera size={17} />
                                        <FormattedMessage
                                            {...(capturingScreenshot ?
                                                messages.capturingScreenshot : messages.captureScreenshot)}
                                        />
                                    </button>
                                    <button
                                        className={styles.attachmentButton}
                                        disabled={isBusy}
                                        type="button"
                                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                    >
                                        <ImagePlus size={17} />
                                        <FormattedMessage {...messages.selectScreenshot} />
                                    </button>
                                    <input
                                        accept="image/png,image/jpeg,image/webp"
                                        className={styles.fileInput}
                                        ref={fileInputRef}
                                        type="file"
                                        onChange={handleSelectScreenshot}
                                    />
                                </div>
                            </div>
                            {screenshot ? (
                                <div className={styles.screenshotPreview}>
                                    <img
                                        alt={props.intl.formatMessage(messages.screenshotAlt)}
                                        src={screenshot.previewUrl}
                                    />
                                    <div className={styles.screenshotDetails}>
                                        <span>{screenshot.filename}</span>
                                        <button
                                            aria-label={props.intl.formatMessage(messages.removeScreenshot)}
                                            disabled={isBusy}
                                            title={props.intl.formatMessage(messages.removeScreenshot)}
                                            type="button"
                                            onClick={handleRemoveScreenshot}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                            {screenshotError ? (
                                <small
                                    className={styles.screenshotError}
                                    role="alert"
                                >
                                    <FormattedMessage
                                        {...(screenshotError === 'invalid' ?
                                            messages.screenshotInvalid : messages.screenshotError)}
                                    />
                                </small>
                            ) : null}
                            <span className={styles.screenshotLimit}>
                                {`${Math.round(MAX_SCREENSHOT_BYTES / (1024 * 1024))} MB`}
                            </span>
                        </section>

                        <div className={styles.privacyNotice}>
                            <MessageSquareWarning size={18} />
                            <FormattedMessage {...messages.privacy} />
                        </div>

                        {submitError ? (
                            <div
                                className={styles.submitError}
                                role="alert"
                            >
                                <FormattedMessage {...messages.submitError} />
                            </div>
                        ) : null}
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={styles.secondaryButton}
                            disabled={isBusy}
                            type="button"
                            onClick={handleClose}
                        >
                            <FormattedMessage {...messages.cancel} />
                        </button>
                        <button
                            className={styles.primaryButton}
                            disabled={isBusy}
                            type="submit"
                        >
                            <Send size={17} />
                            <FormattedMessage {...(submitting ? messages.submitting : messages.submit)} />
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};

FeedbackModal.propTypes = {
    associatedEventId: PropTypes.string,
    context: PropTypes.shape({
        deviceId: PropTypes.string,
        locale: PropTypes.string,
        programMode: PropTypes.string
    }),
    initialCategory: PropTypes.oneOf([CATEGORY_ERROR, CATEGORY_BUG, CATEGORY_SUGGESTION]),
    initialEmail: PropTypes.string,
    initialName: PropTypes.string,
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    success: PropTypes.bool
};

export {
    CATEGORY_BUG,
    CATEGORY_ERROR,
    CATEGORY_SUGGESTION,
    FeedbackModal as FeedbackModalComponent
};

export default injectIntl(FeedbackModal);
