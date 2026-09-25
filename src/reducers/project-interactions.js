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

const normalizeComment = comment => Object.assign({}, comment, {
    replies: (comment.replies || []).map(reply => Object.assign({}, reply, {replies: []}))
});

const mergeComments = (currentComments, nextComments) => {
    const seen = {};
    const merged = currentComments.map(normalizeComment);
    merged.forEach(comment => {
        seen[comment.id] = true;
    });
    nextComments.map(normalizeComment).forEach(comment => {
        if (!seen[comment.id]) {
            merged.push(comment);
        }
    });
    return merged;
};

const addCommentToTree = (comments, comment) => {
    const normalizedComment = normalizeComment(comment);
    if (!comment.parentId) {
        return [normalizedComment, ...comments];
    }
    return comments.map(parent => {
        if (parent.id !== comment.parentId) return parent;
        return Object.assign({}, parent, {
            replies: [...(parent.replies || []), normalizedComment]
        });
    });
};

const removeCommentFromTree = (comments, commentId) => {
    let removedCount = 0;
    let removedTopLevel = false;
    const nextComments = comments
        .map(comment => {
            if (comment.id === commentId) {
                removedCount = 1 + (comment.replies || []).length;
                removedTopLevel = true;
                return null;
            }
            const replies = comment.replies || [];
            const nextReplies = replies.filter(reply => {
                if (reply.id === commentId) {
                    removedCount = 1;
                    return false;
                }
                return true;
            });
            if (nextReplies.length === replies.length) return comment;
            return Object.assign({}, comment, {replies: nextReplies});
        })
        .filter(Boolean);
    return {comments: nextComments, removedCount, removedTopLevel};
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
            comments: action.page > 1 ?
                mergeComments(state.comments, action.comments) :
                action.comments.map(normalizeComment),
            commentsTotal: action.total,
            commentsPage: action.page,
            commentsLoading: false
        });

    case ADD_COMMENT:
        return Object.assign({}, state, {
            comments: addCommentToTree(state.comments, action.comment),
            commentCount: state.commentCount + 1,
            commentsTotal: action.comment.parentId ? state.commentsTotal : state.commentsTotal + 1
        });

    case REMOVE_COMMENT: {
        const removed = removeCommentFromTree(state.comments, action.commentId);
        const removedCount = action.deletedCount || removed.removedCount || 1;
        return Object.assign({}, state, {
            comments: removed.comments,
            commentCount: Math.max(0, state.commentCount - removedCount),
            commentsTotal: removed.removedTopLevel ?
                Math.max(0, state.commentsTotal - 1) :
                state.commentsTotal
        });
    }

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

const removeComment = (commentId, deletedCount) => ({type: REMOVE_COMMENT, commentId, deletedCount});

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
