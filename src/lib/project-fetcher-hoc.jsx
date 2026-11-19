import React from 'react';
import PropTypes from 'prop-types';
import {intlShape, injectIntl} from 'react-intl';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {setProjectUnchanged} from '../reducers/project-changed';
import {
    LoadingState,
    LoadingStates,
    getIsCreatingNew,
    getIsFetchingWithId,
    getIsLoading,
    getIsShowingProject,
    onFetchedProjectData,
    projectError,
    setProjectId,
    defaultProjectId
} from '../reducers/project-state';
import {
    activateTab,
    BLOCKS_TAB_INDEX
} from '../reducers/editor-tab';

import log from './log';
import storage from './storage';
import defaultProjectData from './default-project/project-data';

const normalizeProjectId = projectId => {
    if (projectId === '' || projectId === null || typeof projectId === 'undefined') {
        return defaultProjectId;
    }
    return projectId.toString();
};

const getRouteProjectId = props => normalizeProjectId(props.routeProjectId || props.projectId);

const normalizeTarget = target => {
    const normalized = Object.assign({}, target, {
        variables: target.variables || {},
        lists: target.lists || {},
        broadcasts: target.broadcasts || {},
        blocks: target.blocks || {},
        comments: target.comments || {},
        costumes: Array.isArray(target.costumes) ? target.costumes : [],
        sounds: Array.isArray(target.sounds) ? target.sounds : [],
        currentCostume: typeof target.currentCostume === 'number' ? target.currentCostume : 0,
        volume: typeof target.volume === 'number' ? target.volume : 100
    });
    if (!normalized.isStage) {
        Object.assign(normalized, {
            visible: typeof normalized.visible === 'boolean' ? normalized.visible : true,
            x: typeof normalized.x === 'number' ? normalized.x : 0,
            y: typeof normalized.y === 'number' ? normalized.y : 0,
            size: typeof normalized.size === 'number' ? normalized.size : 100,
            direction: typeof normalized.direction === 'number' ? normalized.direction : 90,
            draggable: typeof normalized.draggable === 'boolean' ? normalized.draggable : false,
            rotationStyle: normalized.rotationStyle || 'all around'
        });
    }
    return normalized;
};

const parseProjectData = projectData => {
    if (typeof projectData === 'string') {
        return JSON.parse(projectData);
    }
    if (typeof ArrayBuffer !== 'undefined' && projectData instanceof ArrayBuffer) {
        return JSON.parse(new TextDecoder().decode(projectData));
    }
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(projectData)) {
        return JSON.parse(new TextDecoder().decode(projectData));
    }
    return projectData;
};

const normalizeProjectData = (projectData, translateFunction, allowDefaultFallback) => {
    const data = parseProjectData(projectData);
    if (data && data.message) {
        throw new Error(Array.isArray(data.message) ? data.message.join(', ') : data.message);
    }
    if (!data || !Array.isArray(data.targets) || data.targets.length === 0 ||
        !data.targets.some(target => target && target.isStage)) {
        if (allowDefaultFallback) {
            return defaultProjectData(translateFunction);
        }
        throw new Error('Invalid OpenBlock project data received from server');
    }
    return Object.assign({}, data, {
        targets: data.targets
            .filter(Boolean)
            .map(normalizeTarget),
        monitors: Array.isArray(data.monitors) ? data.monitors : [],
        extensions: Array.isArray(data.extensions) ? data.extensions : [],
        meta: data.meta || {}
    });
};

/* Higher Order Component to provide behavior for loading projects by id. If
 * there's no id, the default project is loaded.
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectFetcherHOC = function (WrappedComponent) {
    class ProjectFetcherComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'fetchProject'
            ]);
            storage.setProjectHost(props.projectHost);
            storage.setAssetHost(props.assetHost);
            storage.setTranslatorFunction(props.intl.formatMessage);
            // props.projectId might be unset, in which case we use our default;
            // or it may be set by an even higher HOC, and passed to us.
            // Either way, we now know what the initial projectId should be, so
            // set it in the redux store.
            this.props.setProjectId(getRouteProjectId(props));
        }
        componentDidMount () {
            const initialProjectId = getRouteProjectId(this.props);
            if (initialProjectId !== defaultProjectId) {
                this.fetchProject(initialProjectId, LoadingState.FETCHING_WITH_ID);
            } else if (this.props.isFetchingWithId) {
                this.fetchProject(this.props.reduxProjectId, this.props.loadingState);
            }
        }
        componentDidUpdate (prevProps) {
            if (prevProps.projectHost !== this.props.projectHost) {
                storage.setProjectHost(this.props.projectHost);
            }
            if (prevProps.assetHost !== this.props.assetHost) {
                storage.setAssetHost(this.props.assetHost);
            }
            const nextProjectId = getRouteProjectId(this.props);
            if (nextProjectId !== getRouteProjectId(prevProps)) {
                this.props.setProjectId(nextProjectId);
            }
            if (this.props.isFetchingWithId && (
                !prevProps.isFetchingWithId ||
                this.props.reduxProjectId !== prevProps.reduxProjectId
            )) {
                this.fetchProject(this.props.reduxProjectId, this.props.loadingState);
            }
            if (this.props.isShowingProject && !prevProps.isShowingProject) {
                this.props.onProjectUnchanged();
            }
            if (this.props.isShowingProject && (prevProps.isLoadingProject || prevProps.isCreatingNew)) {
                this.props.onActivateTab(BLOCKS_TAB_INDEX);
            }
        }
        fetchProject (projectId, loadingState) {
            const loader = projectId === defaultProjectId ?
                storage.builtinHelper.load(storage.AssetType.Project, projectId, storage.DataFormat.JSON) :
                storage.load(storage.AssetType.Project, projectId, storage.DataFormat.JSON);

            return Promise.resolve(loader)
                .then(projectAsset => {
                    if (getRouteProjectId(this.props) !== normalizeProjectId(projectId)) {
                        return;
                    }
                    if (projectAsset) {
                        const normalizedProjectId = normalizeProjectId(projectId);
                        this.props.onFetchedProjectData(
                            normalizeProjectData(
                                projectAsset.data,
                                this.props.intl.formatMessage,
                                normalizedProjectId === defaultProjectId
                            ),
                            loadingState,
                            normalizedProjectId
                        );
                    } else {
                        // Treat failure to load as an error
                        // Throw to be caught by catch later on
                        throw new Error('Could not find project');
                    }
                })
                .catch(err => {
                    if (getRouteProjectId(this.props) !== normalizeProjectId(projectId)) {
                        return;
                    }
                    this.props.onError(err);
                    log.error(err);
                });
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                assetHost,
                intl,
                isLoadingProject: isLoadingProjectProp,
                loadingState,
                onActivateTab,
                onError: onErrorProp,
                onFetchedProjectData: onFetchedProjectDataProp,
                onProjectUnchanged,
                projectHost,
                projectId,
                reduxProjectId,
                routeProjectId,
                setProjectId: setProjectIdProp,
                /* eslint-enable no-unused-vars */
                isFetchingWithId: isFetchingWithIdProp,
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    fetchingProject={isFetchingWithIdProp}
                    routeProjectId={getRouteProjectId({routeProjectId, projectId})}
                    {...componentProps}
                />
            );
        }
    }
    ProjectFetcherComponent.propTypes = {
        assetHost: PropTypes.string,
        canSave: PropTypes.bool,
        intl: intlShape.isRequired,
        isCreatingNew: PropTypes.bool,
        isFetchingWithId: PropTypes.bool,
        isLoadingProject: PropTypes.bool,
        isShowingProject: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onActivateTab: PropTypes.func,
        onError: PropTypes.func,
        onFetchedProjectData: PropTypes.func,
        onProjectUnchanged: PropTypes.func,
        projectHost: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        routeProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setProjectId: PropTypes.func
    };
    ProjectFetcherComponent.defaultProps = {
        assetHost: 'https://dogoblockcdn.dogomaker.com',
        projectHost: 'https://projects.scratch.mit.edu'
    };

    const mapStateToProps = state => ({
        isCreatingNew: getIsCreatingNew(state.scratchGui.projectState.loadingState),
        isFetchingWithId: getIsFetchingWithId(state.scratchGui.projectState.loadingState),
        isLoadingProject: getIsLoading(state.scratchGui.projectState.loadingState),
        isShowingProject: getIsShowingProject(state.scratchGui.projectState.loadingState),
        loadingState: state.scratchGui.projectState.loadingState,
        reduxProjectId: state.scratchGui.projectState.projectId
    });
    const mapDispatchToProps = dispatch => ({
        onActivateTab: tab => dispatch(activateTab(tab)),
        onError: error => dispatch(projectError(error)),
        onFetchedProjectData: (projectData, loadingState, projectId) =>
            dispatch(onFetchedProjectData(projectData, loadingState, projectId)),
        setProjectId: projectId => dispatch(setProjectId(projectId)),
        onProjectUnchanged: () => dispatch(setProjectUnchanged())
    });
    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );
    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(ProjectFetcherComponent));
};

export {
    ProjectFetcherHOC as default
};
