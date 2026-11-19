import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    getIsRemixing,
    LoadingStates
} from '../reducers/project-state';
import {
    setProjectDetails,
    setLike,
    setFavorite,
    setComments,
    addComment,
    removeComment,
    setLoading
} from '../reducers/project-interactions';
import {
    getProjectDetails,
    likeProject,
    unlikeProject,
    favoriteProject,
    unfavoriteProject,
    recordProjectView,
    getComments,
    postComment,
    deleteComment,
    updateProjectVisibility,
    updateProjectDetails,
    uploadProjectCover
} from '../lib/dogoblock-api';
import ProjectPage from '../components/project-page/project-page.jsx';

class ProjectPageContainer extends React.Component {
    constructor (props) {
        super(props);
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.handleUnfavorite = this.handleUnfavorite.bind(this);
        this.handleRemix = this.handleRemix.bind(this);
        this.handlePostComment = this.handlePostComment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleLoadComments = this.handleLoadComments.bind(this);
        this.handleUpdateVisibility = this.handleUpdateVisibility.bind(this);
        this.handleUpdateDetails = this.handleUpdateDetails.bind(this);
        this.handleUpdateCover = this.handleUpdateCover.bind(this);
    }

    componentDidMount () {
        const {projectId} = this.props;
        if (projectId) {
            this.loadDetails(projectId);
            // Record a view (fire and forget)
            recordProjectView(projectId).catch(() => {});
        }
    }

    componentDidUpdate (prevProps) {
        if (this.props.projectId && this.props.projectId !== prevProps.projectId) {
            this.loadDetails(this.props.projectId);
        }
    }

    loadDetails (projectId) {
        this.props.onSetLoading(true);
        this.props.onSetComments([], 0, 1);
        getProjectDetails(projectId)
            .then(details => {
                if (this.props.projectId !== projectId) return;
                this.props.onSetDetails(details);
                this.handleLoadComments(1);
            })
            .catch(err => {
                console.error('Failed to load project details', err);
            })
            .finally(() => {
                if (this.props.projectId === projectId) {
                    this.props.onSetLoading(false);
                }
            });
    }

    handleLike () {
        likeProject(this.props.projectId)
            .then(res => this.props.onSetLike(res.isLiked, res.likeCount))
            .catch(console.error);
    }

    handleUnlike () {
        unlikeProject(this.props.projectId)
            .then(res => this.props.onSetLike(res.isLiked, res.likeCount))
            .catch(console.error);
    }

    handleFavorite () {
        favoriteProject(this.props.projectId)
            .then(res => this.props.onSetFavorite(res.isFavorited, res.favoriteCount))
            .catch(console.error);
    }

    handleUnfavorite () {
        unfavoriteProject(this.props.projectId)
            .then(res => this.props.onSetFavorite(res.isFavorited, res.favoriteCount))
            .catch(console.error);
    }

    handleRemix () {
        if (this.props.onRemix) {
            this.props.onRemix(this.props.projectId);
        }
    }

    handlePostComment (content, parentId) {
        return postComment(this.props.projectId, content, parentId)
            .then(comment => this.props.onAddComment(comment));
    }

    handleDeleteComment (commentId) {
        deleteComment(this.props.projectId, commentId)
            .then(res => this.props.onRemoveComment(commentId, res && res.deletedCount))
            .catch(console.error);
    }

    handleLoadComments (page) {
        const {projectId} = this.props;
        getComments(projectId, page)
            .then(res => {
                if (this.props.projectId !== projectId) return;
                this.props.onSetComments(res.comments, res.total, res.page);
            })
            .catch(console.error);
    }

    handleUpdateVisibility (visibility) {
        updateProjectVisibility(this.props.projectId, visibility)
            .then(res => {
                this.props.onSetDetails(
                    Object.assign({}, this.props, {visibility: res.visibility})
                );
            })
            .catch(console.error);
    }

    handleUpdateDetails (patch) {
        return updateProjectDetails(this.props.projectId, patch)
            .then(res => {
                this.props.onSetDetails(
                    Object.assign({}, this.props, res)
                );
            });
    }

    handleUpdateCover (coverFile) {
        return uploadProjectCover(this.props.projectId, coverFile)
            .then(res => {
                this.props.onSetDetails(
                    Object.assign({}, this.props, res)
                );
                return res;
            });
    }

    render () {
        if (!this.props.projectId) return null;

        return (
            <ProjectPage
                {...this.props}
                onLike={this.handleLike}
                onUnlike={this.handleUnlike}
                onFavorite={this.handleFavorite}
                onUnfavorite={this.handleUnfavorite}
                onRemix={this.handleRemix}
                onPostComment={this.handlePostComment}
                onDeleteComment={this.handleDeleteComment}
                onLoadComments={this.handleLoadComments}
                onUpdateVisibility={this.handleUpdateVisibility}
                onUpdateDetails={this.handleUpdateDetails}
                onUpdateCover={this.handleUpdateCover}
                onDeleteProject={this.props.onDeleteProject}
            />
        );
    }
}

ProjectPageContainer.propTypes = {
    projectId: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    isOwner: PropTypes.bool,
    currentUserId: PropTypes.string,
    ownerId: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    instructions: PropTypes.string,
    credits: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    visibility: PropTypes.string,
    owner: PropTypes.object,
    remixedFromId: PropTypes.string,
    likeCount: PropTypes.number,
    favoriteCount: PropTypes.number,
    viewCount: PropTypes.number,
    commentCount: PropTypes.number,
    isLiked: PropTypes.bool,
    isFavorited: PropTypes.bool,
    comments: PropTypes.array,
    commentsTotal: PropTypes.number,
    commentsPage: PropTypes.number,
    onClose: PropTypes.func,
    onDeleteProject: PropTypes.func,
    onRemix: PropTypes.func,
    renderPlayer: PropTypes.func,
    onSetLoading: PropTypes.func,
    onSetDetails: PropTypes.func,
    onSetLike: PropTypes.func,
    onSetFavorite: PropTypes.func,
    onSetComments: PropTypes.func,
    onAddComment: PropTypes.func,
    onRemoveComment: PropTypes.func
};

const mapStateToProps = state => {
    const ix = state.scratchGui.projectInteractions;
    const session = state.scratchGui.session || state.session || {};
    const user = session.session && session.session.user;
    const userId = user && user.id;
    const isLoggedIn = !!user;

    return {
        loading: ix.loading,
        title: ix.title,
        description: ix.description,
        instructions: ix.instructions,
        credits: ix.credits,
        thumbnailUrl: ix.thumbnailUrl,
        visibility: ix.visibility,
        owner: ix.owner,
        ownerId: ix.owner && ix.owner.id,
        remixedFromId: ix.remixedFromId,
        likeCount: ix.likeCount,
        favoriteCount: ix.favoriteCount,
        viewCount: ix.viewCount,
        commentCount: ix.commentCount,
        isLiked: ix.isLiked,
        isFavorited: ix.isFavorited,
        comments: ix.comments,
        commentsTotal: ix.commentsTotal,
        commentsPage: ix.commentsPage,
        commentsLoading: ix.commentsLoading,
        createdAt: ix.createdAt,
        isLoggedIn,
        currentUserId: userId,
        isOwner: isLoggedIn && ix.owner && ix.owner.id === userId
    };
};

const mapDispatchToProps = dispatch => ({
    onSetLoading: loading => dispatch(setLoading(loading)),
    onSetDetails: details => dispatch(setProjectDetails(details)),
    onSetLike: (isLiked, likeCount) => dispatch(setLike(isLiked, likeCount)),
    onSetFavorite: (isFavorited, favoriteCount) => dispatch(setFavorite(isFavorited, favoriteCount)),
    onSetComments: (comments, total, page) => dispatch(setComments(comments, total, page)),
    onAddComment: comment => dispatch(addComment(comment)),
    onRemoveComment: (commentId, deletedCount) => dispatch(removeComment(commentId, deletedCount))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPageContainer);
