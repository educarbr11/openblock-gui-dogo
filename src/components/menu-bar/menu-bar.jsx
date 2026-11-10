import classNames from 'classnames';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import bowser from 'bowser';
import React from 'react';
import {
    AlertCircle, Camera, Check, ChevronDown, Circle, Code, Download, File, FilePlus,
    Image, Info, Link, Loader, MessageSquareWarning, Pencil, RotateCcw, Save,
    Settings, Upload, Zap
} from 'lucide-react';

import VM from 'openblock-vm';

import Box from '../box/box.jsx';
import CommunityButton from './community-button.jsx'; // eslint-disable-line no-unused-vars
import ShareButton from './share-button.jsx'; // eslint-disable-line no-unused-vars
import InstallAppButton from '../install-app-button/install-app-button.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import SaveStatus from './save-status.jsx'; // eslint-disable-line no-unused-vars
import ProjectWatcher from '../../containers/project-watcher.jsx'; // eslint-disable-line no-unused-vars
import {MenuItem} from '../menu/menu.jsx';
import ProjectTitleInput from './project-title-input.jsx';
import AuthorInfo from './author-info.jsx';
import AccountNav from '../../containers/account-nav.jsx'; // eslint-disable-line no-unused-vars
import LoginDropdown from './login-dropdown.jsx'; // eslint-disable-line no-unused-vars
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import DeletionRestorer from '../../containers/deletion-restorer.jsx';
import TurboMode from '../../containers/turbo-mode.jsx';
import MenuBarHOC from '../../containers/menu-bar-hoc.jsx';
import {isScratchDesktop} from '../../lib/isScratchDesktop';
import uploadArduinoRealtimeFirmware from '../../lib/upload-arduino-realtime-firmware';
import {UPDATE_MODAL_STATE} from '../../lib/update-state.js';

import {
    openTipsLibrary,
    openUploadProgress,
    openUpdateModal,
    openConnectionModal,
    openDeviceLibrary,
    openFeedbackModal
} from '../../reducers/modals';
import {setPlayer} from '../../reducers/mode';
import {
    autoUpdateProject,
    getIsUpdating,
    getIsCreatingNew,
    getIsCreatingCopy,
    getIsRemixing,
    getIsShowingProject,
    manualUpdateProject,
    requestNewProject,
    remixProject,
    saveProjectAsCopy
} from '../../reducers/project-state';
import {
    openAboutMenu,
    closeAboutMenu,
    aboutMenuOpen,
    openAccountMenu,
    closeAccountMenu,
    accountMenuOpen,
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openSettingMenu,
    closeSettingMenu,
    settingMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    openLoginMenu,
    closeLoginMenu,
    loginMenuOpen
} from '../../reducers/menus';
import {setStageSize} from '../../reducers/stage-size';
import {setUploadMode, setRealtimeMode} from '../../reducers/program-mode';
import {setRealtimeConnection, clearConnectionModalPeripheralName} from '../../reducers/connection-modal';
import {setUpdate} from '../../reducers/update';
import {STAGE_SIZE_MODES} from '../../lib/layout-constants';

import collectMetadata from '../../lib/collect-metadata';

import styles from './menu-bar.css';
import EditorActionsMenu from './editor-actions-menu.jsx';
import EditorHeaderAction from './editor-header-action.jsx';
import headerMessages from './editor-header-messages';

// import mystuffIcon from './icon--mystuff.png';
// import profileIcon from './icon--profile.png';
import dropdownCaret from './dropdown-caret.svg';
import languageIcon from '../language-selector/language-icon.svg';
// import linkSocketIcon from './icon--link-socket.svg';
// import communityIcon from './icon--community.svg';

import openblockLogo from '../../../static/dogoblock_logo_full.svg';
import openblockLogoSmall from '../../../static/dogoblock_logo_icon.svg';

import sharedMessages from '../../lib/shared-messages';


import deviceIcon from './icon--device.svg';
import unconnectedIcon from './icon--unconnected.svg';
import connectedIcon from './icon--connected.svg';

import saveSvgAsPng from 'openblock-save-svg-as-png';
import {showAlertWithTimeout} from '../../reducers/alerts';
import {setProjectChanged} from '../../reducers/project-changed';
import {setPendingProjectCover} from '../../reducers/project-cover';
import {isFeedbackEnabled} from '../../lib/sentry';

const HEADER_COMPACT_WIDTH = 1120;
const HEADER_NARROW_WIDTH = 720;

const ariaMessages = defineMessages({
    language: {
        id: 'gui.menuBar.LanguageSelector',
        defaultMessage: 'language selector',
        description: 'accessibility text for the language selection menu'
    },
    tutorials: {
        id: 'gui.menuBar.tutorialsLibrary',
        defaultMessage: 'Tutorials',
        description: 'accessibility text for the tutorials button'
    },
    community: {
        id: 'gui.menuBar.community',
        defaultMessage: 'Open Community',
        description: 'accessibility text for the community button'
    },
    wiki: {
        id: 'gui.menuBar.wiki',
        defaultMessage: 'Wiki',
        description: 'accessibility text for the wiki button'
    },
    feedback: {
        id: 'gui.menuBar.feedback',
        defaultMessage: 'Send feedback',
        description: 'accessibility text for the feedback button'
    }
});

const AboutButton = props => (
    <button
        aria-label={props.label}
        className={classNames(styles.menuBarItem, styles.headerButton)}
        title={props.label}
        type="button"
        onClick={props.onClick}
    >
        <Info
            aria-hidden="true"
            size={20}
        />
    </button>
);

AboutButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export class MenuBar extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'checkOverflow',
            'containerRef',
            'handleClickNew',
            'handleClickRemix',
            'handleClickOpenCommunity',
            'handleClickOpenWiki',
            'handleClickSave',
            'handleClickSaveAsCopy',
            'handleClickSeeCommunity',
            'handleClickShare',
            'handleKeyPress',
            'handleLanguageMouseUp',
            'handleRestoreOption',
            'getSaveToComputerHandler',
            'restoreOptionMessage',
            'handleConnectionMouseUp',
            'handleUploadFirmware',
            'handleWindowsResize',
            'handleSelectDeviceMouseUp',
            'handleProgramModeSwitchOnChange',
            'handleProgramModeUpdate',
            'handleScreenshot',
            'handleCheckUpdate',
            'handleClearCache',
            'handleOpenProjectPage',
            'handleClickProjectCover',
            'handleProjectCoverSelected'
        ]);
        this.state = {
            isOverflow: false,
            isNarrow: false
        };
        this.projectCoverInput = React.createRef();
    }
    componentDidMount () {
        document.addEventListener('keydown', this.handleKeyPress);
        this.props.vm.on('PERIPHERAL_DISCONNECTED', this.props.onDisconnect);
        this.props.vm.on('PROGRAM_MODE_UPDATE', this.handleProgramModeUpdate);
        window.addEventListener('resize', this.handleWindowsResize);
        if (typeof ResizeObserver !== 'undefined') {
            this.headerResizeObserver = new ResizeObserver(this.checkOverflow);
            this.headerResizeObserver.observe(this.containerElement);
        }
        this.checkOverflow();
    }
    componentDidUpdate (prevProps) {
        if (prevProps.locale !== this.props.locale) this.checkOverflow();
    }
    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleKeyPress);
        this.props.vm.removeListener('PERIPHERAL_DISCONNECTED', this.props.onDisconnect);
        this.props.vm.removeListener('PROGRAM_MODE_UPDATE', this.handleProgramModeUpdate);
        window.removeEventListener('resize', this.handleWindowsResize);
        if (this.headerResizeObserver) this.headerResizeObserver.disconnect();
        if (this.programModeSwitchFrame) {
            window.cancelAnimationFrame(this.programModeSwitchFrame);
            this.programModeSwitchFrame = null;
        }
        if (this.programModeSwitchTimeout) {
            window.clearTimeout(this.programModeSwitchTimeout);
            this.programModeSwitchTimeout = null;
        }
    }
    handleWindowsResize () {
        this.checkOverflow();
    }
    containerRef (el) {
        this.containerElement = el;
    }
    checkOverflow () {
        if (!this.containerElement || !this.containerElement.clientWidth) return;
        const width = this.containerElement.clientWidth;
        const isOverflow = width < HEADER_COMPACT_WIDTH;
        const isNarrow = width < HEADER_NARROW_WIDTH;
        if (isOverflow !== this.state.isOverflow || isNarrow !== this.state.isNarrow) {
            this.setState({isOverflow, isNarrow});
        }
    }
    handleClickNew () {
        // if the project is dirty, and user owns the project, we will autosave.
        // but if they are not logged in and can't save, user should consider
        // downloading or logging in first.
        // Note that if user is logged in and editing someone else's project,
        // they'll lose their work.
        const readyToReplaceProject = this.props.confirmReadyToReplaceProject(
            this.props.intl.formatMessage(sharedMessages.replaceProjectWarning)
        );
        this.props.onRequestCloseFile();
        if (readyToReplaceProject) {
            this.props.onClickNew(this.props.canSave && this.props.canCreateNew);
        }
        this.props.onRequestCloseFile();
    }
    handleClickRemix () {
        this.props.onClickRemix();
        this.props.onRequestCloseFile();
    }
    handleClickSave () {
        if (this.props.isUpdating) return;
        if (this.props.canSave) {
            this.props.onClickSave();
        } else if (this.props.canPromptLoginToSave) {
            this.props.onRequestLoginToSave();
        }
        this.props.onRequestCloseFile();
    }
    handleClickSaveAsCopy () {
        this.props.onClickSaveAsCopy();
        this.props.onRequestCloseFile();
    }
    handleClickProjectCover () {
        if (this.projectCoverInput.current) {
            this.projectCoverInput.current.click();
        }
    }
    handleProjectCoverSelected (event) {
        const file = event.target.files && event.target.files[0];
        event.target.value = '';
        if (!file) return;
        if (!file.type || !/^image\/(png|jpe?g|webp|gif)$/.test(file.type)) {
            // eslint-disable-next-line no-alert
            window.alert('Selecione uma imagem PNG, JPG, WEBP ou GIF para a capa.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            // eslint-disable-next-line no-alert
            window.alert('A capa deve ter no máximo 5MB.');
            return;
        }
        this.props.onSetPendingProjectCover(file, URL.createObjectURL(file));
        this.props.onProjectChanged();
    }
    handleClickSeeCommunity (waitForUpdate) {
        if (this.props.shouldSaveBeforeTransition()) {
            this.props.autoUpdateProject(); // save before transitioning to project page
            waitForUpdate(true); // queue the transition to project page
        } else {
            waitForUpdate(false); // immediately transition to project page
        }
    }
    handleClickShare (waitForUpdate) {
        if (!this.props.isShared) {
            if (this.props.canShare) { // save before transitioning to project page
                this.props.onShare();
            }
            if (this.props.canSave) { // save before transitioning to project page
                this.props.autoUpdateProject();
                waitForUpdate(true); // queue the transition to project page
            } else {
                waitForUpdate(false); // immediately transition to project page
            }
        }
    }
    handleRestoreOption (restoreFun) {
        return () => {
            restoreFun();
            this.props.onRequestCloseEdit();
        };
    }
    handleKeyPress (event) {
        const modifier = bowser.mac ? event.metaKey : event.ctrlKey;
        if (modifier && event.key.toLowerCase() === 's') {
            this.handleClickSave();
            event.preventDefault();
        }
    }

    getSaveToComputerHandler (downloadProjectCallback) {
        return () => {
            this.props.onRequestCloseFile();
            downloadProjectCallback();
            if (this.props.onProjectTelemetryEvent) {
                const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale);
                this.props.onProjectTelemetryEvent('projectDidSave', metadata);
            }
        };
    }
    handleLanguageMouseUp (e) {
        if (!this.props.languageMenuOpen) {
            this.props.onClickLanguage(e);
        }
    }
    handleClickOpenCommunity () {
        window.open('https://community.openblock.cc');
    }
    handleClickOpenWiki () {
        window.open('https://wiki.openblock.cc');
    }
    restoreOptionMessage (deletedItem) {
        switch (deletedItem) {
        case 'Sprite':
            return (<FormattedMessage
                defaultMessage="Restore Sprite"
                description="Menu bar item for restoring the last deleted sprite."
                id="gui.menuBar.restoreSprite"
            />);
        case 'Sound':
            return (<FormattedMessage
                defaultMessage="Restore Sound"
                description="Menu bar item for restoring the last deleted sound."
                id="gui.menuBar.restoreSound"
            />);
        case 'Costume':
            return (<FormattedMessage
                defaultMessage="Restore Costume"
                description="Menu bar item for restoring the last deleted costume."
                id="gui.menuBar.restoreCostume"
            />);
        default: {
            return (<FormattedMessage
                defaultMessage="Restore"
                description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
                id="gui.menuBar.restore"
            />);
        }
        }
    }
    handleConnectionMouseUp () {
        if (this.props.deviceId) {
            this.props.onOpenConnectionModal();
        } else {
            this.props.onOpenDeviceLibrary();
        }
    }
    handleSelectDeviceMouseUp () {
        this.props.onOpenDeviceLibrary();
    }
    handleProgramModeSwitchOnChange () {
        if (this.programModeSwitchPending) {
            return;
        }

        const nextRealtimeMode = !this.props.isRealtimeMode;
        this.programModeSwitchPending = true;

        if (nextRealtimeMode) {
            /**
             * The realtime stage framwork didn't support STAGE_SIZE_MODES.hide,
             * so if the mode is hide switch to large mode.
             *  */
            if (this.props.stageSizeMode === STAGE_SIZE_MODES.hide) {
                this.props.onSetStageLarge();
            }
        }

        const applyModeSwitch = () => {
            this.programModeSwitchFrame = null;
            this.programModeSwitchTimeout = window.setTimeout(() => {
                this.programModeSwitchTimeout = null;
                try {
                    this.props.vm.runtime.setRealtimeMode(nextRealtimeMode);
                } finally {
                    this.programModeSwitchPending = false;
                }
            }, 0);
        };

        if (window.requestAnimationFrame) {
            this.programModeSwitchFrame = window.requestAnimationFrame(applyModeSwitch);
        } else {
            applyModeSwitch();
        }
    }
    handleProgramModeUpdate (data) {
        if (data.isRealtimeMode) {
            this.props.onSetRealtimeMode();
        } else {
            this.props.onSetUploadMode();
        }
    }
    handleUploadFirmware () {
        if (this.props.deviceId) {
            if (uploadArduinoRealtimeFirmware({
                vm: this.props.vm,
                deviceId: this.props.deviceId,
                connectionType: this.props.connectionType,
                onOpenUploadProgress: this.props.onOpenUploadProgress,
                onSetRealtimeConnection: this.props.onSetRealtimeConnection
            })) {
                return;
            }
            this.props.vm.uploadFirmwareToPeripheral(this.props.deviceId);
            this.props.onSetRealtimeConnection(false);
            this.props.onOpenUploadProgress();
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }
    handleScreenshot () {
        const blocklyBlockCanvas = document.querySelector('.blocklyWorkspace .blocklyBlockCanvas');
        if (!blocklyBlockCanvas || blocklyBlockCanvas.childNodes.length === 0) {
            this.props.onWorkspaceIsEmpty();
        } else {
            const transform = blocklyBlockCanvas.getAttribute('transform');
            const scale = parseFloat(transform.substring(transform.indexOf('scale') + 6, transform.length - 1));
            const data = new Date();

            saveSvgAsPng.saveSvgAsPng(blocklyBlockCanvas, `${this.props.projectTitle}-${data.getTime()}.png`, {
                left: blocklyBlockCanvas.getBBox().x * scale,
                top: blocklyBlockCanvas.getBBox().y * scale,
                height: blocklyBlockCanvas.getBBox().height * scale,
                width: blocklyBlockCanvas.getBBox().width * scale,
                scale: 2 / scale,
                encoderOptions: 1
            });
        }
    }
    handleCheckUpdate () {
        this.props.onSetUpdate({phase: UPDATE_MODAL_STATE.checkingApplication});
        this.props.onClickCheckUpdate();
    }
    handleClearCache () {
        const readyClearCache = this.props.confirmClearCache(
            this.props.intl.formatMessage(sharedMessages.clearCacheWarning)
        );
        if (readyClearCache) {
            this.props.onClickClearCache();
        }
    }
    handleOpenProjectPage () {
        if (this.props.projectId && this.props.projectId !== '0') {
            window.location.hash = `/projects/${this.props.projectId}`;
        }
    }
    buildAboutMenu (onClickAbout) {
        if (!onClickAbout) {
            // hide the button
            return null;
        }
        if (typeof onClickAbout === 'function') {
            // make a button which calls a function
            return (<AboutButton
                label={this.formatHeaderMessage('about')}
                onClick={onClickAbout}
            />);
        }
        // assume it's an array of objects
        // each item must have a 'title' FormattedMessage and a 'handleClick' function
        // generate a menu with items for each object in the array
        return (
            onClickAbout.map(itemProps => (
                <MenuItem
                    key={itemProps.title}
                    isRtl={this.props.isRtl}
                    onClick={this.wrapAboutMenuCallback(itemProps.onClick)}
                >
                    {itemProps.title}
                </MenuItem>
            ))
        );
    }
    wrapAboutMenuCallback (callback) {
        return () => {
            callback();
            this.props.onRequestCloseAbout();
        };
    }
    formatHeaderMessage (name) {
        return this.props.intl.formatMessage(headerMessages[name]);
    }
    renderFileActions () {
        const message = descriptor => this.props.intl.formatMessage(descriptor);
        return (
            <React.Fragment>
                <EditorHeaderAction
                    icon={FilePlus}
                    label={message({id: 'gui.menuBar.new', defaultMessage: 'New'})}
                    onClick={this.handleClickNew}
                />
                {(this.props.canSave || this.props.canPromptLoginToSave) && (
                    <EditorHeaderAction
                        disabled={this.props.isUpdating}
                        icon={Save}
                        label={this.formatHeaderMessage('saveProject')}
                        onClick={this.handleClickSave}
                    />
                )}
                {this.props.canCreateCopy && (
                    <EditorHeaderAction
                        icon={File}
                        label={message({id: 'gui.menuBar.saveAsCopy', defaultMessage: 'Save as a copy'})}
                        onClick={this.handleClickSaveAsCopy}
                    />
                )}
                {this.props.canRemix && (
                    <EditorHeaderAction
                        icon={RotateCcw}
                        label={message({id: 'gui.menuBar.remix', defaultMessage: 'Remix'})}
                        onClick={this.handleClickRemix}
                    />
                )}
                <EditorHeaderAction
                    icon={Upload}
                    label={message(sharedMessages.loadFromComputerTitle)}
                    onClick={this.props.onStartSelectingFileUpload}
                />
                {this.renderDownloadAction()}
            </React.Fragment>
        );
    }
    renderDownloadAction () {
        if (!this.props.canManageFiles) return null;
        return (
            <SB3Downloader>{(className, downloadProjectCallback) => (
                <EditorHeaderAction
                    icon={Download}
                    label={this.formatHeaderMessage('download')}
                    onClick={this.getSaveToComputerHandler(downloadProjectCallback)}
                />
            )}</SB3Downloader>
        );
    }
    renderEditActions () {
        return (
            <React.Fragment>
                <DeletionRestorer>{(handleRestore, {restorable, deletedItem}) => (
                    <EditorHeaderAction
                        disabled={!restorable || !this.props.isRealtimeMode}
                        icon={RotateCcw}
                        label={this.restoreOptionMessage(deletedItem)}
                        onClick={this.handleRestoreOption(handleRestore)}
                    />
                )}</DeletionRestorer>
                <TurboMode>{(toggleTurboMode, {turboMode}) => (
                    <EditorHeaderAction
                        disabled={!this.props.isRealtimeMode}
                        icon={Zap}
                        label={this.props.intl.formatMessage({
                            id: turboMode ? 'gui.menuBar.turboModeOff' : 'gui.menuBar.turboModeOn',
                            defaultMessage: turboMode ? 'Turn off Turbo Mode' : 'Turn on Turbo Mode'
                        })}
                        onClick={toggleTurboMode}
                    />
                )}</TurboMode>
            </React.Fragment>
        );
    }
    renderDeviceControls (inMenu = false) {
        const deviceLabel = this.props.deviceName || this.formatHeaderMessage('noDevice');
        const connected = Boolean(this.props.peripheralName);
        const connectionLabel = this.formatHeaderMessage(connected ? 'manageConnection' : 'connect');
        const connectionStatus = this.formatHeaderMessage(connected ? 'connected' : 'disconnected');
        if (inMenu) {
            return (
                <div className={styles.menuDeviceGroup}>
                    <EditorHeaderAction
                        hint={deviceLabel}
                        icon={Code}
                        label={this.formatHeaderMessage('chooseDevice')}
                        onClick={this.handleSelectDeviceMouseUp}
                    />
                    <EditorHeaderAction
                        hint={connected ? `${connectionStatus}: ${this.props.peripheralName}` : connectionStatus}
                        icon={Link}
                        label={connectionLabel}
                        onClick={this.handleConnectionMouseUp}
                    />
                </div>
            );
        }
        return (
            <div
                aria-label={this.formatHeaderMessage('deviceGroup')}
                className={styles.deviceGroup}
                role="group"
            >
                <button
                    aria-label={`${this.formatHeaderMessage('chooseDevice')}: ${deviceLabel}`}
                    className={classNames(styles.menuBarItem, styles.headerButton, styles.deviceSelect)}
                    title={`${deviceLabel} · ${connectionStatus}`}
                    type="button"
                    onClick={this.handleSelectDeviceMouseUp}
                >
                    <img
                        alt=""
                        className={styles.deviceIcon}
                        src={deviceIcon}
                    />
                    <span className={styles.actionCopy}>
                        <span className={styles.deviceLabel}>{deviceLabel}</span>
                        <span className={styles.connectionState}>{connectionStatus}</span>
                    </span>
                    <ChevronDown
                        aria-hidden="true"
                        size={14}
                    />
                </button>
                <button
                    aria-label={connected ? `${connectionLabel}: ${this.props.peripheralName}` : connectionLabel}
                    className={classNames(styles.menuBarItem, styles.headerButton, styles.connectionButton, {
                        [styles.connectionButtonConnected]: connected
                    })}
                    title={connected ? `${connectionStatus}: ${this.props.peripheralName}` : connectionLabel}
                    type="button"
                    onClick={this.handleConnectionMouseUp}
                >
                    <img
                        alt=""
                        className={styles.connectedIcon}
                        src={connected ? connectedIcon : unconnectedIcon}
                    />
                    <span className={styles.connectionLabel}>
                        {this.formatHeaderMessage(connected ? 'connected' : 'connect')}
                    </span>
                </button>
            </div>
        );
    }
    renderMoreActions (isTauriLight) {
        const canUploadFirmware = Boolean(this.props.deviceId && this.props.peripheralName);
        let modeHint;
        if (this.props.isToolboxUpdating) modeHint = 'updatingToolbox';
        else if (!this.props.deviceId) modeHint = 'chooseDeviceForMode';
        else if (!this.props.isSupportSwitchMode) modeHint = 'unsupportedMode';
        return (
            <React.Fragment>
                {this.state.isNarrow && this.props.canManageFiles && (
                    <div
                        aria-label={this.formatHeaderMessage('projectActions')}
                        className={styles.actionSection}
                        role="group"
                    >
                        <div
                            aria-hidden="true"
                            className={styles.actionSectionTitle}
                        >
                            {this.formatHeaderMessage('projectActions')}
                        </div>
                        {this.renderFileActions()}
                    </div>
                )}
                {this.state.isNarrow && (
                    <div
                        aria-label={this.formatHeaderMessage('editActions')}
                        className={styles.actionSection}
                        role="group"
                    >
                        <div
                            aria-hidden="true"
                            className={styles.actionSectionTitle}
                        >
                            {this.formatHeaderMessage('editActions')}
                        </div>
                        {this.renderEditActions()}
                    </div>
                )}
                {this.state.isNarrow && !isTauriLight && (
                    <div
                        aria-label={this.formatHeaderMessage('deviceGroup')}
                        className={styles.actionSection}
                        role="group"
                    >
                        <div
                            aria-hidden="true"
                            className={styles.actionSectionTitle}
                        >
                            {this.formatHeaderMessage('deviceGroup')}
                        </div>
                        {this.renderDeviceControls(true)}
                    </div>
                )}
                <div
                    className={styles.actionSection}
                    role="group"
                >
                    {!this.state.isNarrow && this.renderDownloadAction()}
                    <EditorHeaderAction
                        icon={Camera}
                        label={this.formatHeaderMessage('screenshot')}
                        onClick={this.handleScreenshot}
                    />
                    {this.props.canSave && (
                        <EditorHeaderAction
                            hint={this.props.pendingProjectCoverPreview ?
                                this.formatHeaderMessage('coverPending') : null}
                            icon={Image}
                            label={this.formatHeaderMessage('cover')}
                            onClick={this.handleClickProjectCover}
                        />
                    )}
                    {this.props.projectId && this.props.projectId !== '0' && (
                        <EditorHeaderAction
                            icon={Info}
                            label={this.formatHeaderMessage('projectPage')}
                            onClick={this.handleOpenProjectPage}
                        />
                    )}
                    {isFeedbackEnabled() && (
                        <EditorHeaderAction
                            icon={MessageSquareWarning}
                            label={this.props.intl.formatMessage(ariaMessages.feedback)}
                            onClick={this.props.onOpenFeedbackModal}
                        />
                    )}
                    <InstallAppButton
                        className={styles.actionItem}
                        iconSize={18}
                        role="menuitem"
                    />
                </div>
                {!isTauriLight && (
                    <div
                        aria-label={this.formatHeaderMessage('deviceGroup')}
                        className={styles.actionSection}
                        role="group"
                    >
                        <EditorHeaderAction
                            disabled={!canUploadFirmware}
                            hint={canUploadFirmware ? null : this.formatHeaderMessage(
                                this.props.deviceId ? 'connectForFirmware' : 'chooseDeviceForFirmware'
                            )}
                            icon={Upload}
                            label={this.formatHeaderMessage('firmware')}
                            onClick={this.handleUploadFirmware}
                        />
                        <EditorHeaderAction
                            checked={!this.props.isRealtimeMode}
                            disabled={Boolean(modeHint)}
                            hint={modeHint ? this.formatHeaderMessage(modeHint) : null}
                            icon={Code}
                            label={this.formatHeaderMessage('programMode')}
                            stateLabel={this.formatHeaderMessage(this.props.isRealtimeMode ? 'disabled' : 'enabled')}
                            onClick={this.handleProgramModeSwitchOnChange}
                        />
                    </div>
                )}
                {this.state.isNarrow && this.props.canChangeLanguage && (
                    <div className={styles.actionsLanguage}>
                        <img
                            alt=""
                            className={styles.languageIcon}
                            src={languageIcon}
                        />
                        <span>{this.formatHeaderMessage('language')}</span>
                        <LanguageSelector label={this.formatHeaderMessage('language')} />
                    </div>
                )}
                {isScratchDesktop() && (
                    <div
                        aria-label={this.formatHeaderMessage('settings')}
                        className={styles.actionSection}
                        role="group"
                    >
                        <div
                            aria-hidden="true"
                            className={styles.actionSectionTitle}
                        >
                            {this.formatHeaderMessage('settings')}
                        </div>
                        <EditorHeaderAction
                            icon={Settings}
                            label={this.props.intl.formatMessage({
                                id: 'gui.menuBar.checkUpdate', defaultMessage: 'Check update'
                            })}
                            onClick={this.handleCheckUpdate}
                        />
                        <EditorHeaderAction
                            icon={RotateCcw}
                            label={this.props.intl.formatMessage({
                                id: 'gui.menuBar.clearCacheAndRestart', defaultMessage: 'Clear cache and restart'
                            })}
                            onClick={this.handleClearCache}
                        />
                        <EditorHeaderAction
                            icon={Download}
                            label={this.props.intl.formatMessage({
                                id: 'gui.menuBar.installDriver', defaultMessage: 'Install driver'
                            })}
                            onClick={this.props.onClickInstallDriver}
                        />
                        {Array.isArray(this.props.onClickAbout) && this.props.onClickAbout.map(item => (
                            <EditorHeaderAction
                                key={item.title}
                                icon={Info}
                                label={item.title}
                                onClick={this.wrapAboutMenuCallback(item.onClick)}
                            />
                        ))}
                    </div>
                )}
            </React.Fragment>
        );
    }
    render () {
        const isTauriLight = process.env.OPENBLOCK_TAURI_LIGHT === 'true';
        const hasSavedProject = this.props.projectId && this.props.projectId !== '0';
        let saveState = hasSavedProject ? 'saved' : 'localProject';
        if (this.props.projectChanged) saveState = 'unsaved';
        if (this.props.hasSaveError) saveState = 'saveError';
        if (this.props.isUpdating) saveState = 'saving';
        const saveStatus = this.formatHeaderMessage(saveState);
        const SaveStateIcon = this.props.isUpdating ? Loader :
            this.props.hasSaveError ? AlertCircle : saveState === 'saved' ? Check : Circle;
        const saveTitle = this.formatHeaderMessage(this.props.canSave ? 'saveProject' : 'loginToSave');
        const fileLabel = this.props.intl.formatMessage({id: 'gui.menuBar.file', defaultMessage: 'File'});
        const editLabel = this.props.intl.formatMessage({id: 'gui.menuBar.edit', defaultMessage: 'Edit'});
        return (
            <Box
                className={classNames(this.props.className, styles.menuBar, {
                    [styles.compactHeader]: this.state.isOverflow,
                    [styles.narrowHeader]: this.state.isNarrow,
                    [styles.mobileLandscape]: this.props.mobileLandscape
                })}
                componentRef={this.containerRef}
            >
                <div className={styles.mainMenu}>
                    <button
                        aria-label="DoGoBlock"
                        className={classNames(styles.menuBarItem, styles.headerButton, styles.brandButton)}
                        disabled={!this.props.onClickLogo}
                        title="DoGoBlock"
                        type="button"
                        onClick={this.props.onClickLogo}
                    >
                        <img
                            alt=""
                            className={styles.openblockLogo}
                            draggable={false}
                            src={this.state.isOverflow ? this.props.logoSmall : this.props.logo}
                        />
                    </button>
                    <div className={styles.navigationMenus}>
                        {this.props.canChangeLanguage && (
                            <div
                                className={classNames(styles.menuBarItem, styles.languageMenu)}
                                title={this.formatHeaderMessage('language')}
                            >
                                <img
                                    alt=""
                                    className={styles.languageIcon}
                                    src={languageIcon}
                                />
                                <img
                                    alt=""
                                    className={styles.languageCaret}
                                    src={dropdownCaret}
                                />
                                <LanguageSelector label={this.formatHeaderMessage('language')} />
                            </div>
                        )}
                        {this.props.canManageFiles && (
                            <EditorActionsMenu
                                className={styles.navigationItem}
                                compact={this.state.isOverflow}
                                icon={<File
                                    aria-hidden="true"
                                    size={18}
                                />}
                                label={fileLabel}
                                menuClassName={styles.navigationDropdown}
                                triggerClassName={classNames(styles.headerButton, styles.menuBarItem)}
                            >
                                {this.renderFileActions()}
                            </EditorActionsMenu>
                        )}
                        <EditorActionsMenu
                            className={styles.navigationItem}
                            compact={this.state.isOverflow}
                            disabled={!this.props.isRealtimeMode}
                            icon={<Pencil
                                aria-hidden="true"
                                size={18}
                            />}
                            label={editLabel}
                            menuClassName={styles.navigationDropdown}
                            triggerClassName={classNames(styles.headerButton, styles.menuBarItem)}
                            triggerTitle={this.props.isRealtimeMode ? editLabel :
                                this.formatHeaderMessage('editInStageMode')}
                        >
                            {this.renderEditActions()}
                        </EditorActionsMenu>
                    </div>
                    {!isTauriLight && this.renderDeviceControls()}
                </div>
                <div className={styles.fileMenu}>
                    <div className={styles.projectIdentity}>
                        {this.props.canEditTitle ? (
                            <div className={styles.titleMenuItem}>
                                <ProjectTitleInput className={styles.titleFieldGrowable} />
                            </div>
                        ) : this.props.authorUsername && this.props.authorUsername !== this.props.username ? (
                            <AuthorInfo
                                className={styles.authorInfo}
                                imageUrl={this.props.authorThumbnailUrl}
                                projectTitle={this.props.projectTitle}
                                userId={this.props.authorId}
                                username={this.props.authorUsername}
                            />
                        ) : <span className={styles.deviceLabel}>{this.props.projectTitle}</span>}
                        <span
                            aria-live="polite"
                            className={classNames(styles.saveStatus, {
                                [styles.saveStatusDirty]: this.props.projectChanged,
                                [styles.saveStatusError]: this.props.hasSaveError
                            })}
                            role="status"
                            title={saveStatus}
                        >
                            <SaveStateIcon
                                aria-hidden="true"
                                size={14}
                            />
                            <span>{saveStatus}</span>
                        </span>
                    </div>
                    {(this.props.canSave || this.props.canPromptLoginToSave) && (
                        <button
                            aria-busy={this.props.isUpdating}
                            aria-label={`${saveTitle} · ${saveStatus}`}
                            className={classNames(styles.menuBarItem, styles.headerButton, styles.saveProjectButton)}
                            disabled={this.props.isUpdating}
                            title={`${saveTitle} (${bowser.mac ? '⌘' : 'Ctrl'}+S) · ${saveStatus}`}
                            type="button"
                            onClick={this.handleClickSave}
                        >
                            <Save
                                aria-hidden="true"
                                size={18}
                            />
                            <span className={styles.saveButtonLabel}>
                                {this.props.isUpdating ? saveStatus : this.formatHeaderMessage('saveProject')}
                            </span>
                        </button>
                    )}
                </div>
                <div className={styles.tailMenu}>
                    <EditorActionsMenu
                        compact={this.state.isNarrow}
                        label={this.formatHeaderMessage('more')}
                        triggerClassName={classNames(styles.headerButton, styles.moreMenuTrigger)}
                    >
                        {this.renderMoreActions(isTauriLight)}
                    </EditorActionsMenu>
                    {typeof this.props.onClickAbout === 'function' ?
                        this.buildAboutMenu(this.props.onClickAbout) : null}
                </div>
                {this.props.canSave && (
                    <input
                        ref={this.projectCoverInput}
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        className={styles.coverInput}
                        type="file"
                        onChange={this.handleProjectCoverSelected}
                    />
                )}
            </Box>
        );
    }

}

MenuBar.propTypes = {
    authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    authorThumbnailUrl: PropTypes.string,
    authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoUpdateProject: PropTypes.func,
    canChangeLanguage: PropTypes.bool,
    canCreateCopy: PropTypes.bool,
    canCreateNew: PropTypes.bool,
    canEditTitle: PropTypes.bool,
    canManageFiles: PropTypes.bool,
    canPromptLoginToSave: PropTypes.bool,
    canRemix: PropTypes.bool,
    canSave: PropTypes.bool,
    canShare: PropTypes.bool,
    className: PropTypes.string,
    confirmReadyToReplaceProject: PropTypes.func,
    confirmClearCache: PropTypes.func,
    intl: intlShape,
    isUpdating: PropTypes.bool,
    hasSaveError: PropTypes.bool,
    projectChanged: PropTypes.bool,
    isRealtimeMode: PropTypes.bool.isRequired,
    isRtl: PropTypes.bool,
    isShared: PropTypes.bool,
    isSupportSwitchMode: PropTypes.bool,
    isToolboxUpdating: PropTypes.bool.isRequired,
    languageMenuOpen: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    logo: PropTypes.string,
    logoSmall: PropTypes.string,
    mobileLandscape: PropTypes.bool,
    onClickAbout: PropTypes.oneOfType([
        PropTypes.func, // button mode: call this callback when the About button is clicked
        PropTypes.arrayOf( // menu mode: list of items in the About menu
            PropTypes.shape({
                title: PropTypes.string, // text for the menu item
                onClick: PropTypes.func // call this callback when the menu item is clicked
            })
        )
    ]),
    onClickLanguage: PropTypes.func,
    onClickLogo: PropTypes.func,
    onClickNew: PropTypes.func,
    onClickRemix: PropTypes.func,
    onClickSave: PropTypes.func,
    onClickSaveAsCopy: PropTypes.func,
    onClickCheckUpdate: PropTypes.func,
    onClickClearCache: PropTypes.func,
    onClickInstallDriver: PropTypes.func,
    onNoPeripheralIsConnected: PropTypes.func.isRequired,
    onOpenFeedbackModal: PropTypes.func,
    onProjectTelemetryEvent: PropTypes.func,
    onRequestCloseAbout: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestLoginToSave: PropTypes.func,
    onShare: PropTypes.func,
    onStartSelectingFileUpload: PropTypes.func,
    projectTitle: PropTypes.string,
    shouldSaveBeforeTransition: PropTypes.func,
    username: PropTypes.string,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired,
    onSetUploadMode: PropTypes.func,
    onSetRealtimeConnection: PropTypes.func.isRequired,
    onSetRealtimeMode: PropTypes.func,
    onSetUpdate: PropTypes.func.isRequired,
    onOpenConnectionModal: PropTypes.func,
    onOpenUploadProgress: PropTypes.func,
    peripheralName: PropTypes.string,
    onDisconnect: PropTypes.func.isRequired,
    onWorkspaceIsEmpty: PropTypes.func.isRequired,
    onOpenDeviceLibrary: PropTypes.func,
    onProjectChanged: PropTypes.func,
    onSetPendingProjectCover: PropTypes.func,
    onSetStageLarge: PropTypes.func.isRequired,
    deviceId: PropTypes.string,
    deviceName: PropTypes.string,
    connectionType: PropTypes.string,
    pendingProjectCoverPreview: PropTypes.string
};

MenuBar.defaultProps = {
    logo: openblockLogo,
    logoSmall: openblockLogoSmall,
    onRequestLoginToSave: () => {},
    onShare: () => {}
};

const mapStateToProps = (state, ownProps) => {
    const loadingState = state.scratchGui.projectState.loadingState;
    const user = state.session && state.session.session && state.session.session.user;
    return {
        projectId: state.scratchGui.projectState.projectId,
        aboutMenuOpen: aboutMenuOpen(state),
        accountMenuOpen: accountMenuOpen(state),
        fileMenuOpen: fileMenuOpen(state),
        settingMenuOpen: settingMenuOpen(state),
        editMenuOpen: editMenuOpen(state),
        isUpdating: getIsUpdating(loadingState) || getIsCreatingNew(loadingState) ||
            getIsCreatingCopy(loadingState) || getIsRemixing(loadingState),
        projectChanged: state.scratchGui.projectChanged,
        hasSaveError: state.scratchGui.alerts.alertsList.some(alert =>
            alert.alertId === 'savingError' || alert.alertId === 'creatingError'),
        isRealtimeMode: state.scratchGui.programMode.isRealtimeMode,
        isRtl: state.locales.isRtl,
        isShowingProject: getIsShowingProject(loadingState),
        isSupportSwitchMode: state.scratchGui.programMode.isSupportSwitchMode,
        isToolboxUpdating: state.scratchGui.toolbox.isToolboxUpdating,
        languageMenuOpen: languageMenuOpen(state),
        locale: state.locales.locale,
        loginMenuOpen: loginMenuOpen(state),
        projectTitle: state.scratchGui.projectTitle,
        realtimeConnection: state.scratchGui.connectionModal.realtimeConnection,
        sessionExists: state.session && typeof state.session.session !== 'undefined',
        username: user ? user.username : null,
        userOwnsProject: ownProps.authorUsername && user &&
            (ownProps.authorUsername === user.username),
        stageSizeMode: state.scratchGui.stageSize.stageSize,
        vm: state.scratchGui.vm,
        peripheralName: state.scratchGui.connectionModal.peripheralName,
        connectionType: state.scratchGui.connectionModal.connectionType,
        deviceId: state.scratchGui.device.deviceId,
        deviceName: state.scratchGui.device.deviceName,
        pendingProjectCoverPreview: state.scratchGui.projectCover.previewUrl
    };
};

const mapDispatchToProps = dispatch => ({
    autoUpdateProject: () => dispatch(autoUpdateProject()),
    onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onOpenFeedbackModal: () => dispatch(openFeedbackModal()),
    onClickAccount: () => dispatch(openAccountMenu()),
    onRequestCloseAccount: () => dispatch(closeAccountMenu()),
    onClickFile: () => dispatch(openFileMenu()),
    onRequestCloseFile: () => dispatch(closeFileMenu()),
    onClickSetting: () => dispatch(openSettingMenu()),
    onRequestCloseSetting: () => dispatch(closeSettingMenu()),
    onClickEdit: () => dispatch(openEditMenu()),
    onRequestCloseEdit: () => dispatch(closeEditMenu()),
    onClickLanguage: () => dispatch(openLanguageMenu()),
    onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
    onClickLogin: () => dispatch(openLoginMenu()),
    onRequestCloseLogin: () => dispatch(closeLoginMenu()),
    onRequestOpenAbout: () => dispatch(openAboutMenu()),
    onRequestCloseAbout: () => dispatch(closeAboutMenu()),
    onClickNew: needSave => dispatch(requestNewProject(needSave)),
    onClickRemix: () => dispatch(remixProject()),
    onClickSave: () => dispatch(manualUpdateProject()),
    onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
    onProjectChanged: () => dispatch(setProjectChanged()),
    onSetPendingProjectCover: (file, previewUrl) => dispatch(setPendingProjectCover(file, previewUrl)),
    onSeeCommunity: () => dispatch(setPlayer(true)),
    onSetUploadMode: () => {
        dispatch(setUploadMode());
        dispatch(setRealtimeConnection(false));
    },
    onSetRealtimeConnection: state => dispatch(setRealtimeConnection(state)),
    onSetRealtimeMode: () => dispatch(setRealtimeMode()),
    onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZE_MODES.large)),
    onOpenConnectionModal: () => dispatch(openConnectionModal()),
    onOpenUploadProgress: () => dispatch(openUploadProgress()),
    onDisconnect: () => {
        dispatch(clearConnectionModalPeripheralName());
        dispatch(setRealtimeConnection(false));
    },
    onSetUpdate: message => {
        dispatch(setUpdate(message));
        dispatch(openUpdateModal());
    },
    onNoPeripheralIsConnected: () => showAlertWithTimeout(dispatch, 'connectAPeripheralFirst'),
    onWorkspaceIsEmpty: () => showAlertWithTimeout(dispatch, 'workspaceIsEmpty'),
    onOpenDeviceLibrary: () => dispatch(openDeviceLibrary()),
    onDeviceIsEmpty: () => showAlertWithTimeout(dispatch, 'selectADeviceFirst')
});

export default compose(
    injectIntl,
    MenuBarHOC,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MenuBar);
