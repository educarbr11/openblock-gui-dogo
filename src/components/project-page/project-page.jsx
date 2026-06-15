import React from 'react';
import PropTypes from 'prop-types';
import {
    Code2,
    Edit3,
    Eye,
    Heart,
    Lock,
    MessageCircle,
    MoreHorizontal,
    Send,
    Share2,
    Star,
    Trash2,
    Unlock,
    Upload,
    Users
} from 'lucide-react';
import styles from './project-page.css';

const formatDate = iso => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'});
};

const VisibilityBadge = ({visibility}) => {
    const map = {
        PUBLIC:   {label: 'Público',     cls: styles.badgePublic, IconComponent: Unlock},
        UNLISTED: {label: 'Não-listado', cls: styles.badgeUnlisted, IconComponent: Share2},
        PRIVATE:  {label: 'Privado',     cls: styles.badgePrivate, IconComponent: Lock}
    };
    const v = map[visibility] || map.PRIVATE;
    const BadgeIcon = v.IconComponent;
    return (
        <span className={`${styles.visibilityBadge} ${v.cls}`}>
            <BadgeIcon
                aria-hidden="true"
                className={styles.badgeIcon}
            />
            {v.label}
        </span>
    );
};
VisibilityBadge.propTypes = {visibility: PropTypes.string};

const CommentItem = ({comment, canDelete, onDelete}) => {
    const initials = (comment.user?.name || comment.user?.username || '?')
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <div className={styles.comment}>
            <div className={styles.commentAvatar}>
                {comment.user?.avatarUrl
                    ? <img src={comment.user.avatarUrl} alt={comment.user.username} />
                    : initials}
            </div>
            <div className={styles.commentBubble}>
                <div className={styles.commentHeader}>
                    <span className={styles.commentAuthor}>
                        {comment.user?.name || comment.user?.username}
                    </span>
                    <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
                    {canDelete && (
                        <button
                            className={styles.commentDeleteBtn}
                            onClick={() => onDelete(comment.id)}
                            title="Apagar comentário"
                            aria-label="Apagar comentário"
                        >
                            <Trash2
                                aria-hidden="true"
                                size={14}
                            />
                        </button>
                    )}
                </div>
                <div className={styles.commentContent}>{comment.content}</div>
            </div>
        </div>
    );
};
CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    canDelete: PropTypes.bool,
    onDelete: PropTypes.func
};

class ProjectPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            activeTab: 'about',
            editingSection: null, // 'description' | 'instructions' | 'credits'
            editValue: '',
            commentText: '',
            submittingComment: false,
            savingDetails: false,
            editingTitle: false,
            titleValue: props.title || '',
            coverPreview: null,
            uploadingCover: false
        };
        this.coverInput = React.createRef();
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.handleRemix = this.handleRemix.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleEditStart = this.handleEditStart.bind(this);
        this.handleEditSave = this.handleEditSave.bind(this);
        this.handleTitleSave = this.handleTitleSave.bind(this);
        this.handleCoverClick = this.handleCoverClick.bind(this);
        this.handleCoverSelected = this.handleCoverSelected.bind(this);
    }

    componentDidUpdate (prevProps) {
        if (prevProps.title !== this.props.title && !this.state.editingTitle) {
            this.setState({titleValue: this.props.title || ''});
        }
        if (prevProps.thumbnailUrl !== this.props.thumbnailUrl && this.state.coverPreview) {
            this.setState({coverPreview: null});
        }
    }

    handleTabChange (tab) {
        this.setState({activeTab: tab});
        if (tab === 'comments' && this.props.onLoadComments) {
            this.props.onLoadComments(1);
        }
    }

    handleLike () {
        if (!this.props.isLoggedIn) return;
        if (this.props.isLiked) {
            this.props.onUnlike();
        } else {
            this.props.onLike();
        }
    }

    handleFavorite () {
        if (!this.props.isLoggedIn) return;
        if (this.props.isFavorited) {
            this.props.onUnfavorite();
        } else {
            this.props.onFavorite();
        }
    }

    handleRemix () {
        if (!this.props.isLoggedIn || !this.props.onRemix) return;
        this.props.onRemix();
    }

    handleCommentSubmit () {
        const content = this.state.commentText.trim();
        if (!content || this.state.submittingComment) return;
        this.setState({submittingComment: true});
        this.props.onPostComment(content)
            .then(() => {
                this.setState({commentText: ''});
            })
            .finally(() => {
                this.setState({submittingComment: false});
            });
    }

    handleCommentDelete (commentId) {
        if (!window.confirm('Apagar este comentário?')) return;
        this.props.onDeleteComment(commentId);
    }

    handleVisibilityChange (e) {
        this.props.onUpdateVisibility(e.target.value);
    }

    handleEditStart (section) {
        const value = this.props[section] || '';
        this.setState({editingSection: section, editValue: value});
    }

    handleEditSave () {
        const {editingSection, editValue} = this.state;
        this.setState({savingDetails: true});
        this.props.onUpdateDetails({[editingSection]: editValue})
            .then(() => {
                this.setState({editingSection: null});
            })
            .finally(() => {
                this.setState({savingDetails: false});
            });
    }

    handleTitleSave () {
        const title = this.state.titleValue.trim();
        if (!title || this.state.savingDetails) return;
        this.setState({savingDetails: true});
        this.props.onUpdateDetails({title})
            .then(() => this.setState({editingTitle: false}))
            .catch(err => {
                // eslint-disable-next-line no-console
                console.error(err);
                window.alert('Não foi possível salvar o título. Tente novamente.');
            })
            .finally(() => this.setState({savingDetails: false}));
    }

    handleCoverClick () {
        if (this.coverInput.current) {
            this.coverInput.current.click();
        }
    }

    handleCoverSelected (event) {
        const file = event.target.files && event.target.files[0];
        event.target.value = '';
        if (!file) return;
        if (!file.type || !/^image\/(png|jpe?g|webp|gif)$/.test(file.type)) {
            window.alert('Selecione uma imagem PNG, JPG, WEBP ou GIF para a capa.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            window.alert('A capa deve ter no máximo 5MB.');
            return;
        }
        this.setState({
            coverPreview: URL.createObjectURL(file),
            uploadingCover: true
        });
        this.props.onUpdateCover(file)
            .catch(err => {
                // Keep the preview visible so the user can retry without losing context.
                // eslint-disable-next-line no-console
                console.error(err);
                window.alert('Não foi possível enviar a capa. Tente novamente.');
            })
            .finally(() => this.setState({uploadingCover: false}));
    }

    renderEditableSection (section, label, placeholder) {
        const isEditing = this.state.editingSection === section;
        const value = this.props[section];
        const {isOwner} = this.props;

        return (
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{label}</h3>
                {isEditing ? (
                    <>
                        <textarea
                            className={styles.editArea}
                            rows={5}
                            value={this.state.editValue}
                            placeholder={placeholder}
                            onChange={e => this.setState({editValue: e.target.value})}
                            autoFocus
                        />
                        <div className={styles.saveRow}>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => this.setState({editingSection: null})}
                            >
                                Cancelar
                            </button>
                            <button
                                className={styles.saveBtn}
                                disabled={this.state.savingDetails}
                                onClick={this.handleEditSave}
                            >
                                {this.state.savingDetails ? 'Salvando…' : 'Salvar'}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {value
                            ? <p className={styles.sectionText}>{value}</p>
                            : <p className={styles.emptyText}>{placeholder}</p>}
                        {isOwner && (
                            <button
                                className={styles.editBtn}
                                onClick={() => this.handleEditStart(section)}
                            >
                                <Edit3
                                    aria-hidden="true"
                                    className={styles.buttonIcon}
                                />
                                Editar {label.toLowerCase()}
                            </button>
                        )}
                    </>
                )}
            </div>
        );
    }

    renderAboutTab () {
        const {remixedFromId, isOwner, visibility, onUpdateVisibility} = this.props;
        return (
            <>
                {isOwner && (
                    <div className={styles.editBar}>
                        <span style={{color: '#6e6e8e', fontSize: '13px'}}>Visibilidade:</span>
                        <select
                            className={styles.visibilitySelect}
                            value={visibility}
                            onChange={this.handleVisibilityChange}
                        >
                            <option value="PRIVATE">Privado</option>
                            <option value="UNLISTED">Não-listado</option>
                            <option value="PUBLIC">Público</option>
                        </select>
                    </div>
                )}
                {/* {this.renderEditableSection('description', 'Descrição', 'Descreva seu projeto…')} */}
                {this.renderEditableSection('instructions', 'Instruções', 'Como usar este projeto…')}
                {this.renderEditableSection('credits', 'Créditos', 'Créditos e agradecimentos…')}
                {remixedFromId && (
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Remix</h3>
                        <a className={styles.remixBadge} href={`#${remixedFromId}`}>
                            <Share2
                                aria-hidden="true"
                                className={styles.buttonIcon}
                            />
                            Baseado no projeto {remixedFromId}
                        </a>
                    </div>
                )}
            </>
        );
    }

    renderCommentsTab () {
        const {
            isLoggedIn, comments, commentsTotal, commentsPage, commentsLoading,
            currentUserId, ownerId
        } = this.props;

        const {commentText, submittingComment} = this.state;

        return (
            <>
                {isLoggedIn ? (
                    <div className={styles.commentInput}>
                        <textarea
                            className={styles.commentInputField}
                            placeholder="Escreva um comentário…"
                            value={commentText}
                            rows={2}
                            maxLength={500}
                            onChange={e => this.setState({commentText: e.target.value})}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    this.handleCommentSubmit();
                                }
                            }}
                        />
                        <button
                            className={styles.commentSubmitBtn}
                            disabled={!commentText.trim() || submittingComment}
                            onClick={this.handleCommentSubmit}
                        >
                            {submittingComment ? (
                                <MoreHorizontal
                                    aria-hidden="true"
                                    size={16}
                                />
                            ) : (
                                <Send
                                    aria-hidden="true"
                                    size={16}
                                />
                            )}
                        </button>
                    </div>
                ) : (
                    <div className={styles.loginPrompt}>
                        Faça login para comentar.
                    </div>
                )}

                {commentsLoading ? (
                    <div className={styles.noComments}>Carregando…</div>
                ) : comments.length === 0 ? (
                    <div className={styles.noComments}>Nenhum comentário ainda. Seja o primeiro!</div>
                ) : (
                    <div className={styles.commentList}>
                        {comments.map(c => (
                            <CommentItem
                                key={c.id}
                                comment={c}
                                canDelete={
                                    isLoggedIn && (c.user?.id === currentUserId || ownerId === currentUserId)
                                }
                                onDelete={this.handleCommentDelete}
                            />
                        ))}
                    </div>
                )}

                {commentsTotal > comments.length && (
                    <button
                        className={styles.loadMoreBtn}
                        onClick={() => this.props.onLoadComments(commentsPage + 1)}
                    >
                        Carregar mais ({commentsTotal - comments.length} restantes)
                    </button>
                )}
            </>
        );
    }

    renderDetailsSections () {
        const {remixedFromId, isOwner, visibility} = this.props;
        return (
            <React.Fragment>
                {isOwner && (
                    <div className={styles.editBar}>
                        <span>Visibilidade:</span>
                        <select
                            className={styles.visibilitySelect}
                            value={visibility}
                            onChange={this.handleVisibilityChange}
                        >
                            <option value="PRIVATE">Privado</option>
                            <option value="UNLISTED">Não-listado</option>
                            <option value="PUBLIC">Público</option>
                        </select>
                    </div>
                )}
                {this.renderEditableSection('instructions', 'Instruções', 'Como usar este projeto…')}
                {this.renderEditableSection('credits', 'Notas e Créditos', 'Créditos e agradecimentos…')}
                {/* {this.renderEditableSection('description', 'Descrição', 'Descreva seu projeto…')} */}
                {remixedFromId && (
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Remix</h3>
                        <a className={styles.remixBadge} href={`#${remixedFromId}`}>
                            Baseado no projeto {remixedFromId}
                        </a>
                    </div>
                )}
            </React.Fragment>
        );
    }

    render () {
        const {
            loading, title, owner, thumbnailUrl, visibility,
            likeCount, favoriteCount, viewCount, commentCount,
            isLiked, isFavorited, isLoggedIn, isOwner, createdAt,
            projectId, renderPlayer
        } = this.props;
        const currentThumbnail = this.state.coverPreview || thumbnailUrl;

        if (!projectId) return null;

        return (
            <div className={styles.page}>
                <div className={styles.panel}>
                    {loading ? (
                        <div className={styles.loadingWrap}>
                            <div className={styles.spinner} />
                            <span>Carregando projeto…</span>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className={styles.header}>
                                <div className={styles.thumbnailWrap}>
                                    {currentThumbnail
                                        ? <img className={styles.thumbnail} src={currentThumbnail} alt={title} />
                                        : (
                                            <div className={styles.thumbnailPlaceholder}>
                                                <Code2
                                                    aria-hidden="true"
                                                    size={28}
                                                />
                                            </div>
                                        )}
                                    {isOwner && (
                                        <React.Fragment>
                                            <input
                                                ref={this.coverInput}
                                                accept="image/png,image/jpeg,image/webp,image/gif"
                                                className={styles.coverInput}
                                                type="file"
                                                onChange={this.handleCoverSelected}
                                            />
                                            <button
                                                className={styles.coverButton}
                                                disabled={this.state.uploadingCover}
                                                onClick={this.handleCoverClick}
                                            >
                                                <Upload
                                                    aria-hidden="true"
                                                    className={styles.buttonIcon}
                                                />
                                                {this.state.uploadingCover ? 'Enviando…' : 'Alterar capa'}
                                            </button>
                                        </React.Fragment>
                                    )}
                                </div>

                                <div className={styles.meta}>
                                    {this.state.editingTitle ? (
                                        <div className={styles.titleEditRow}>
                                            <input
                                                className={styles.titleInput}
                                                value={this.state.titleValue}
                                                maxLength={120}
                                                onChange={e => this.setState({titleValue: e.target.value})}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter') this.handleTitleSave();
                                                    if (e.key === 'Escape') {
                                                        this.setState({
                                                            editingTitle: false,
                                                            titleValue: title || ''
                                                        });
                                                    }
                                                }}
                                                autoFocus
                                            />
                                            <button
                                                className={styles.saveBtn}
                                                disabled={!this.state.titleValue.trim() || this.state.savingDetails}
                                                onClick={this.handleTitleSave}
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                className={styles.cancelBtn}
                                                onClick={() => this.setState({
                                                    editingTitle: false,
                                                    titleValue: title || ''
                                                })}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={styles.titleRow}>
                                            <h1 className={styles.title}>{title || 'Sem título'}</h1>
                                            {isOwner && (
                                                <button
                                                    className={styles.titleEditButton}
                                                    onClick={() => this.setState({
                                                        editingTitle: true,
                                                        titleValue: title || ''
                                                    })}
                                                >
                                                    <Edit3
                                                        aria-hidden="true"
                                                        className={styles.buttonIcon}
                                                    />
                                                    Editar título
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    <div className={styles.authorRow}>
                                        <div className={styles.avatar}>
                                            {owner?.avatarUrl
                                                ? <img src={owner.avatarUrl} alt={owner.username} style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover'}} />
                                                : (owner?.name || '?')[0].toUpperCase()}
                                        </div>
                                        <span className={styles.authorName}>
                                            por <strong>{owner?.name || owner?.username || '…'}</strong>
                                        </span>
                                    </div>
                                    <div className={styles.dateLine}>
                                        Criado em {formatDate(createdAt)}
                                    </div>
                                    <VisibilityBadge visibility={visibility} />
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className={styles.actionBar}>
                                <a
                                    className={`${styles.statBtn} ${styles.editorLink}`}
                                    href={`#/editor/${projectId}`}
                                >
                                    <Code2
                                        aria-hidden="true"
                                        className={styles.buttonIcon}
                                    />
                                    Ver por dentro
                                </a>

                                <button
                                    className={`${styles.statBtn} ${isLiked ? styles.statBtnLiked : ''}`}
                                    onClick={this.handleLike}
                                    disabled={!isLoggedIn}
                                    title={isLoggedIn ? (isLiked ? 'Descurtir' : 'Curtir') : 'Faça login para curtir'}
                                >
                                    <Heart
                                        aria-hidden="true"
                                        className={styles.buttonIcon}
                                        fill={isLiked ? 'currentColor' : 'none'}
                                    />
                                    {likeCount}
                                </button>

                                <button
                                    className={`${styles.statBtn} ${isFavorited ? styles.statBtnFavorited : ''}`}
                                    onClick={this.handleFavorite}
                                    disabled={!isLoggedIn}
                                    title={isLoggedIn ? (isFavorited ? 'Desfavoritar' : 'Favoritar') : 'Faça login para favoritar'}
                                >
                                    <Star
                                        aria-hidden="true"
                                        className={styles.buttonIcon}
                                        fill={isFavorited ? 'currentColor' : 'none'}
                                    />
                                    {favoriteCount}
                                </button>

                                <span className={styles.viewStat}>
                                    <Eye
                                        aria-hidden="true"
                                        className={styles.metricIcon}
                                    />
                                    {viewCount}
                                </span>
                                <span className={styles.viewStat}>
                                    <MessageCircle
                                        aria-hidden="true"
                                        className={styles.metricIcon}
                                    />
                                    {commentCount}
                                </span>

                                {isLoggedIn && !isOwner && this.props.onRemix && (
                                    <button
                                        className={`${styles.statBtn} ${styles.remixBtn}`}
                                        onClick={this.handleRemix}
                                    >
                                        <Share2
                                            aria-hidden="true"
                                            className={styles.buttonIcon}
                                        />
                                        Remixar
                                    </button>
                                )}
                            </div>

                            <div className={styles.mainGrid}>
                                <section className={styles.playerColumn}>
                                    <div className={styles.playerFrame}>
                                        {renderPlayer ? renderPlayer() : (
                                            thumbnailUrl
                                                ? <img src={thumbnailUrl} alt={title} />
                                                : <div className={styles.playerFallback}>DOGOBLOCK</div>
                                        )}
                                    </div>
                                </section>
                                <aside className={styles.infoColumn}>
                                    {this.renderDetailsSections()}
                                </aside>
                            </div>

                            <div className={styles.lowerBand}>
                                <section>
                                    <div className={styles.lowerHeader}>
                                        <h2>Comentários</h2>
                                        <span>
                                            <MessageCircle
                                                aria-hidden="true"
                                                className={styles.lowerHeaderIcon}
                                            />
                                            {commentCount}
                                        </span>
                                    </div>
                                    {this.renderCommentsTab()}
                                </section>
                                {/* <section>
                                    <div className={styles.lowerHeader}>
                                        <h2>Remisturas</h2>
                                        <span>
                                            <Users
                                                aria-hidden="true"
                                                className={styles.lowerHeaderIcon}
                                            />
                                            Em breve
                                        </span>
                                    </div>
                                    <div className={styles.remixPlaceholder}>
                                        {thumbnailUrl
                                            ? <img src={thumbnailUrl} alt={title} />
                                            : <div>DOGOBLOCK</div>}
                                    </div>
                                </section> */}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

ProjectPage.propTypes = {
    projectId: PropTypes.string,
    loading: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    instructions: PropTypes.string,
    credits: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    visibility: PropTypes.string,
    owner: PropTypes.object,
    ownerId: PropTypes.string,
    remixedFromId: PropTypes.string,
    likeCount: PropTypes.number,
    favoriteCount: PropTypes.number,
    viewCount: PropTypes.number,
    commentCount: PropTypes.number,
    isLiked: PropTypes.bool,
    isFavorited: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isOwner: PropTypes.bool,
    currentUserId: PropTypes.string,
    comments: PropTypes.array,
    commentsTotal: PropTypes.number,
    commentsPage: PropTypes.number,
    commentsLoading: PropTypes.bool,
    createdAt: PropTypes.string,
    onClose: PropTypes.func,
    onLike: PropTypes.func,
    onUnlike: PropTypes.func,
    onFavorite: PropTypes.func,
    onUnfavorite: PropTypes.func,
    onRemix: PropTypes.func,
    onPostComment: PropTypes.func,
    onDeleteComment: PropTypes.func,
    onLoadComments: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
    onUpdateDetails: PropTypes.func,
    onUpdateCover: PropTypes.func,
    renderPlayer: PropTypes.func
};

ProjectPage.defaultProps = {
    loading: false,
    likeCount: 0,
    favoriteCount: 0,
    viewCount: 0,
    commentCount: 0,
    isLiked: false,
    isFavorited: false,
    isLoggedIn: false,
    isOwner: false,
    comments: [],
    commentsTotal: 0,
    commentsPage: 1,
    commentsLoading: false,
    onLike: () => {},
    onUnlike: () => {},
    onFavorite: () => {},
    onUnfavorite: () => {},
    onRemix: null,
    onPostComment: () => Promise.resolve(),
    onDeleteComment: () => {},
    onLoadComments: () => {},
    onUpdateVisibility: () => {},
    onUpdateDetails: () => Promise.resolve(),
    onUpdateCover: () => Promise.resolve()
};

export default ProjectPage;
