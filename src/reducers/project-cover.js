const SET_PENDING_PROJECT_COVER = 'scratch-gui/project-cover/SET_PENDING_PROJECT_COVER';
const CLEAR_PENDING_PROJECT_COVER = 'scratch-gui/project-cover/CLEAR_PENDING_PROJECT_COVER';

const initialState = {
    file: null,
    previewUrl: null
};

const reducer = (state, action) => {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_PENDING_PROJECT_COVER:
        return {
            file: action.file,
            previewUrl: action.previewUrl
        };
    case CLEAR_PENDING_PROJECT_COVER:
        return initialState;
    default:
        return state;
    }
};

const setPendingProjectCover = (file, previewUrl) => ({
    type: SET_PENDING_PROJECT_COVER,
    file,
    previewUrl
});

const clearPendingProjectCover = () => ({
    type: CLEAR_PENDING_PROJECT_COVER
});

export {
    reducer as default,
    initialState as projectCoverInitialState,
    setPendingProjectCover,
    clearPendingProjectCover
};
