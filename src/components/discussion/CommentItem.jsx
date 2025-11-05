/**
 * CommentItem Component
 * Displays an individual comment with voting, replies, and actions
 */

import React, { useState } from 'react';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi2';
import { useDiscussionStyles } from '../../styles/components/discussion.styles';
import CommentForm from './CommentForm';

const CommentItem = ({
  comment,
  currentUser,
  onVote,
  onReply,
  onEdit,
  onDelete,
  depth = 0
}) => {
  const classes = useDiscussionStyles();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userVote, setUserVote] = useState(
    comment.votes?.find(v => v.user_id === currentUser?.id)?.vote_type || null
  );

  // Format time ago
  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
    return `${Math.floor(seconds / 31536000)}y ago`;
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    const name = comment.user?.user_metadata?.full_name || comment.user?.email || 'U';
    return name.charAt(0).toUpperCase();
  };

  // Get user display name
  const getUserName = () => {
    return comment.user?.user_metadata?.full_name || comment.user?.email?.split('@')[0] || 'Anonymous';
  };

  // Handle vote
  const handleVote = async (voteType) => {
    const newVote = userVote === voteType ? null : voteType;
    setUserVote(newVote);
    await onVote(comment.id, voteType);
  };

  // Handle reply submission
  const handleReplySubmit = async (content) => {
    await onReply(comment.id, content);
    setShowReplyForm(false);
  };

  // Handle edit submission
  const handleEditSubmit = async (content) => {
    await onEdit(comment.id, content);
    setIsEditing(false);
  };

  const isOwner = currentUser && comment.user_id === currentUser.id;

  return (
    <>
      <div className={`${classes.commentItem} ${depth > 0 ? 'reply' : ''}`}>
        {/* Vote Column */}
        <div className={classes.voteColumn}>
          <button
            className={`${classes.voteButton} upvote ${userVote === 1 ? 'active' : ''}`}
            onClick={() => handleVote(1)}
            disabled={!currentUser}
          >
            <HiArrowUp size={18} />
          </button>
          <div
            className={`${classes.voteCount} ${
              comment.score > 0 ? 'positive' : comment.score < 0 ? 'negative' : ''
            }`}
          >
            {comment.score}
          </div>
          <button
            className={`${classes.voteButton} downvote ${userVote === -1 ? 'active' : ''}`}
            onClick={() => handleVote(-1)}
            disabled={!currentUser}
          >
            <HiArrowDown size={18} />
          </button>
        </div>

        {/* Comment Content */}
        <div className={classes.commentContent}>
          <div className={classes.commentHeader}>
            <div className={classes.userAvatar}>{getUserInitials()}</div>
            <span className={classes.userName}>{getUserName()}</span>
            <div className={classes.commentMeta}>
              <span>•</span>
              <span>{getTimeAgo(comment.created_at)}</span>
              {comment.is_edited && (
                <>
                  <span>•</span>
                  <span className={classes.editedBadge}>edited</span>
                </>
              )}
            </div>
          </div>

          {isEditing ? (
            <CommentForm
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditing(false)}
              initialValue={comment.content}
              submitLabel="Save"
            />
          ) : (
            <>
              <div className={classes.commentText}>{comment.content}</div>
              <div className={classes.commentActions}>
                {currentUser && (
                  <button
                    className={classes.actionButton}
                    onClick={() => setShowReplyForm(!showReplyForm)}
                  >
                    Reply
                  </button>
                )}
                {isOwner && (
                  <>
                    <button
                      className={classes.actionButton}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                    <button
                      className={classes.actionButton}
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this comment?')) {
                          onDelete(comment.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          {/* Reply Form */}
          {showReplyForm && (
            <div className={classes.replyForm}>
              <CommentForm
                onSubmit={handleReplySubmit}
                onCancel={() => setShowReplyForm(false)}
                placeholder={`Reply to ${getUserName()}...`}
                submitLabel="Reply"
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className={classes.repliesContainer}>
          {comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onVote={onVote}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentItem;
