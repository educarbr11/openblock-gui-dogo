const SET_PROJECT_STATS = 'scratch-gui/project-interactions/SET_PROJECT_STATS';
const SET_LIKE = 'scratch-gui/project-interactions/SET_LIKE';
const SET_FAVORITE = 'scratch-gui/project-interactions/SET_FAVORITE';
const SET_COMMENTS = 'scratch-gui/project-interactions/SET_COMMENTS';
const ADD_COMMENT = 'scratch-gui/project-interactions/ADD_COMMENT';
const REMOVE_COMMENT = 'scratch-gui/project-interactions/REMOVE_COMMENT';
const SET_LOADING = 'scratch-gui/project-interactions/SET_LOADING';
const SET_DETAILS = 'scratch-gui/project-interactions/SET_DETAILS';

const initialState = {
    projectId: null,
    title: '',
    description: '',
    instructions: '',
    credits: '',
    remixedFromId: null,
    owner: null,
    thumbnailUrl: null,
    visibility: 'PRIVATE',
    likeCount: 0,
    favoriteCount: 0,
    viewCount: 0,
    commentCount: 0,
    isLiked: false,
    isFavorited: false,
    comments: [],
    commentsTotal: 0,
    commentsPage: 1,
    loading: false,
    commentsLoading: false
};

const reducer = (state, action) => {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_LOADING:
        return Object.assign({}, state, {loading: action.loading});

    case SET_DETAILS:
        return Object.assign({}, state, {
            projectId: action.details.id,
            title: action.details.title || '',
            description: action.details.description || '',
            instructions: action.details.instructions || '',
            credits: action.details.credits || '',
            remixedFromId: action.details.remixedFromId || null,
            owner: action.details.owner || null,
            thumbnailUrl: action.details.thumbnailUrl || null,
            visibility: action.details.visibility || 'PRIVATE',
            likeCount: action.details.likeCount || 0,
            favoriteCount: action.details.favoriteCount || 0,
            viewCount: action.details.viewCount || 0,
            commentCount: action.details.commentCount || 0,
            isLiked: action.details.isLiked || false,
            isFavorited: action.details.isFavorited || false
        });

    case SET_PROJECT_STATS:
        return Object.assign({}, state, {
            likeCount: action.likeCount !== undefined ? action.likeCount : state.likeCount,
            favoriteCount: action.favoriteCount !== undefined ? action.favoriteCount : state.favoriteCount,
            viewCount: action.viewCount !== undefined ? action.viewCount : state.viewCount,
            commentCount: action.commentCount !== undefined ? action.commentCount : state.commentCount
        });

    case SET_LIKE:
        return Object.assign({}, state, {
            isLiked: action.isLiked,
            likeCount: action.likeCount
        });

    case SET_FAVORITE:
        return Object.assign({}, state, {
            isFavorited: action.isFavorited,
            favoriteCount: action.favoriteCount
        });

    case SET_COMMENTS:
        return Object.assign({}, state, {
            comments: action.comments,
            commentsTotal: action.total,
            commentsPage: action.page,
            commentsLoading: false
        });

    case ADD_COMMENT:
        return Object.assign({}, state, {
            comments: [action.comment, ...state.comments],
            commentCount: state.commentCount + 1,
            commentsTotal: state.commentsTotal + 1
        });

    case REMOVE_COMMENT:
        return Object.assign({}, state, {
            comments: state.comments.filter(c => c.id !== action.commentId),
            commentCount: Math.max(0, state.commentCount - 1),
            commentsTotal: Math.max(0, state.commentsTotal - 1)
        });

    default:
        return state;
    }
};

// ─── Action Creators ─────────────────────────────────────────────────────────

const setLoading = loading => ({type: SET_LOADING, loading});

const setProjectDetails = details => ({type: SET_DETAILS, details});

const setProjectStats = stats => ({type: SET_PROJECT_STATS, ...stats});

const setLike = (isLiked, likeCount) => ({type: SET_LIKE, isLiked, likeCount});

const setFavorite = (isFavorited, favoriteCount) => ({type: SET_FAVORITE, isFavorited, favoriteCount});

const setComments = (comments, total, page) => ({type: SET_COMMENTS, comments, total, page});

const addComment = comment => ({type: ADD_COMMENT, comment});

const removeComment = commentId => ({type: REMOVE_COMMENT, commentId});

export {
    reducer as default,
    initialState as projectInteractionsInitialState,
    setLoading,
    setProjectDetails,
    setProjectStats,
    setLike,
    setFavorite,
    setComments,
    addComment,
    removeComment
};
