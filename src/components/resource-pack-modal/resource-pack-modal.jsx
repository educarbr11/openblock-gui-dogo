import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import Modal from '../../containers/modal.jsx';

import styles from './resource-pack-modal.css';

const formatBytes = bytes => {
    const value = Number(bytes) || 0;
    if (value <= 0) return '-';
    const units = ['B', 'KB', 'MB', 'GB'];
    const unitIndex = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
    const scaled = value / Math.pow(1024, unitIndex);
    return `${scaled >= 10 || unitIndex === 0 ? scaled.toFixed(0) : scaled.toFixed(1)} ${units[unitIndex]}`;
};

const phaseMessage = phase => {
    switch (phase) {
    case 'downloading':
        return (
            <FormattedMessage
                defaultMessage="Downloading ESP32 support..."
                description="ESP32 resource pack download status"
                id="gui.resourcePack.downloading"
            />
        );
    case 'extracting':
        return (
            <FormattedMessage
                defaultMessage="Extracting files..."
                description="ESP32 resource pack extraction status"
                id="gui.resourcePack.extracting"
            />
        );
    case 'validating':
        return (
            <FormattedMessage
                defaultMessage="Validating the installation..."
                description="ESP32 resource pack validation status"
                id="gui.resourcePack.validating"
            />
        );
    default:
        return null;
    }
};

const ResourcePackModal = props => {
    const status = props.status || {};
    const isWorking = ['downloading', 'extracting', 'validating'].indexOf(status.phase) !== -1;
    const isError = status.phase === 'error';
    const isUnsupported = status.phase === 'unsupported';
    const isUpdate = status.phase === 'updateAvailable';
    const percentage = status.phase === 'downloading' ? Math.round((status.progress || 0) * 100) : 100;

    return (
        <Modal
            className={styles.modalContent}
            contentLabel={(
                <FormattedMessage
                    defaultMessage="ESP32 support"
                    description="ESP32 resource pack modal title"
                    id="gui.resourcePack.title"
                />
            )}
            id="resourcePack"
            shouldCloseOnOverlayClick={!isWorking}
            closeButtonVisible={!isWorking}
            onRequestClose={props.onCancel}
        >
            <div className={styles.body}>
                <div className={styles.intro}>
                    <div className={styles.packMark}>{'ESP32'}</div>
                    <div>
                        <h3 className={styles.title}>
                            {isUpdate ? (
                                <FormattedMessage
                                    defaultMessage="Update ESP32 support"
                                    description="ESP32 resource pack update heading"
                                    id="gui.resourcePack.updateTitle"
                                />
                            ) : (
                                <FormattedMessage
                                    defaultMessage="Install ESP32 support"
                                    description="ESP32 resource pack install heading"
                                    id="gui.resourcePack.installTitle"
                                />
                            )}
                        </h3>
                        <p className={styles.description}>
                            <FormattedMessage
                                defaultMessage={'This optional package adds the tools required to compile and upload ' +
                                    'programs to ESP32 and ESP32-S3 boards. After installation, it works offline.'}
                                description="Description of the optional ESP32 resource pack"
                                id="gui.resourcePack.description"
                            />
                        </p>
                    </div>
                </div>

                {!isWorking && !isError && !isUnsupported ? (
                    <div className={styles.details}>
                        <div>
                            <span className={styles.detailLabel}>
                                <FormattedMessage
                                    defaultMessage="Download"
                                    description="Resource pack download size label"
                                    id="gui.resourcePack.downloadSize"
                                />
                            </span>
                            <strong>{formatBytes(status.downloadBytes)}</strong>
                        </div>
                        <div>
                            <span className={styles.detailLabel}>
                                <FormattedMessage
                                    defaultMessage="Disk space"
                                    description="Resource pack installed size label"
                                    id="gui.resourcePack.installedSize"
                                />
                            </span>
                            <strong>{formatBytes(status.installedBytes)}</strong>
                        </div>
                        <div>
                            <span className={styles.detailLabel}>
                                <FormattedMessage
                                    defaultMessage="Version"
                                    description="Resource pack version label"
                                    id="gui.resourcePack.version"
                                />
                            </span>
                            <strong>{status.version || '-'}</strong>
                        </div>
                    </div>
                ) : null}

                {isWorking ? (
                    <div className={styles.progressSection}>
                        <div className={styles.progressHeader}>
                            <strong>{phaseMessage(status.phase)}</strong>
                            {status.phase === 'downloading' ? <span>{`${percentage}%`}</span> : null}
                        </div>
                        <div
                            aria-valuemax="100"
                            aria-valuemin="0"
                            aria-valuenow={percentage}
                            className={styles.progressTrack}
                            role="progressbar"
                        >
                            <div
                                className={classNames(styles.progressValue, {
                                    [styles.progressIndeterminate]: status.phase !== 'downloading'
                                })}
                                style={status.phase === 'downloading' ? {width: `${percentage}%`} : null}
                            />
                        </div>
                        <p className={styles.progressHint}>
                            <FormattedMessage
                                defaultMessage="Keep DoGoBlock open until the installation is complete."
                                description="Resource pack installation progress hint"
                                id="gui.resourcePack.progressHint"
                            />
                        </p>
                    </div>
                ) : null}

                {isError || isUnsupported ? (
                    <div
                        className={styles.errorMessage}
                        role="alert"
                    >
                        {status.message || (
                            <FormattedMessage
                                defaultMessage="ESP32 support is not available for this system."
                                description="Unsupported resource pack message"
                                id="gui.resourcePack.unsupported"
                            />
                        )}
                    </div>
                ) : null}

                <div className={styles.actions}>
                    {isWorking ? (
                        <button
                            className={styles.secondaryButton}
                            type="button"
                            onClick={props.onCancel}
                        >
                            <FormattedMessage
                                defaultMessage="Cancel"
                                description="Cancel resource pack installation button"
                                id="gui.resourcePack.cancel"
                            />
                        </button>
                    ) : (
                        <React.Fragment>
                            <button
                                className={styles.secondaryButton}
                                type="button"
                                onClick={props.onCancel}
                            >
                                <FormattedMessage
                                    defaultMessage="Not now"
                                    description="Dismiss resource pack installation button"
                                    id="gui.resourcePack.notNow"
                                />
                            </button>
                            {isUpdate && status.canUse ? (
                                <button
                                    className={styles.secondaryButton}
                                    type="button"
                                    onClick={props.onUseInstalled}
                                >
                                    <FormattedMessage
                                        defaultMessage="Use installed version"
                                        description="Use compatible installed resource pack button"
                                        id="gui.resourcePack.useInstalled"
                                    />
                                </button>
                            ) : null}
                            {isUnsupported ? null : (
                                <button
                                    className={styles.primaryButton}
                                    type="button"
                                    onClick={props.onInstall}
                                >
                                    {isError ? (
                                        <FormattedMessage
                                            defaultMessage="Try again"
                                            description="Retry resource pack installation button"
                                            id="gui.resourcePack.retry"
                                        />
                                    ) : isUpdate ? (
                                        <FormattedMessage
                                            defaultMessage="Update"
                                            description="Update resource pack button"
                                            id="gui.resourcePack.update"
                                        />
                                    ) : (
                                        <FormattedMessage
                                            defaultMessage="Install"
                                            description="Install resource pack button"
                                            id="gui.resourcePack.install"
                                        />
                                    )}
                                </button>
                            )}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </Modal>
    );
};

ResourcePackModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onInstall: PropTypes.func.isRequired,
    onUseInstalled: PropTypes.func.isRequired,
    status: PropTypes.shape({
        canUse: PropTypes.bool,
        downloadBytes: PropTypes.number,
        installedBytes: PropTypes.number,
        message: PropTypes.string,
        phase: PropTypes.string,
        progress: PropTypes.number,
        version: PropTypes.string
    })
};

export default ResourcePackModal;
