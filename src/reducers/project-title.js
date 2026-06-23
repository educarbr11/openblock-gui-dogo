const SET_PROJECT_TITLE = 'projectTitle/SET_PROJECT_TITLE';
const DEFAULT_PROJECT_TITLE = 'Projeto DoGo Block';
const LEGACY_DEFAULT_PROJECT_TITLES = [
    'Projeto Scratch',
    'Scratch Project',
    'DoGoBlock Project',
    'OpenBlock Project',
    'Untitled Project'
];

// we are initializing to a blank string instead of an actual title,
// because it would be hard to localize here
const initialState = '';

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_PROJECT_TITLE:
        return normalizeProjectTitle(action.title);
    default:
        return state;
    }
};

const normalizeProjectTitle = title => {
    const normalizedTitle = typeof title === 'string' ? title.trim() : title;
    if (LEGACY_DEFAULT_PROJECT_TITLES.indexOf(normalizedTitle) !== -1) {
        return DEFAULT_PROJECT_TITLE;
    }
    return title;
};

const setProjectTitle = title => ({
    type: SET_PROJECT_TITLE,
    title: title
});

export {
    reducer as default,
    DEFAULT_PROJECT_TITLE,
    initialState as projectTitleInitialState,
    setProjectTitle
};
