/**
 * DiscussionSection Component
 * Main container for lesson discussions with sorting options
 */

import React, { useState, useEffect } from 'react';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { useDiscussionStyles } from '../../styles/components/discussion.styles';
import { useAuth } from '../../contexts/AuthContext';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import {
  getCommentsByLesson,
  createComment,
  updateComment,
  deleteComment,
  voteOnComment
} from '../../services/api/comments.service';

const DiscussionSection = ({ lessonId }) => {
  const classes = useDiscussionStyles();
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState('top'); // 'top', 'trending', 'recent'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load comments
  useEffect(() => {
    loadComments();
  }, [lessonId, sortBy]);

  const loadComments = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCommentsByLesson(lessonId, sortBy);
      setComments(data);
    } catch (err) {
      console.error('Error loading comments:', err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  // Handle new comment
  const handleNewComment = async (content) => {
    try {
      const newComment = await createComment({
        lessonId,
        content
      });

      // Add new comment to the list
      setComments(prevComments => [newComment, ...prevComments]);
    } catch (err) {
      console.error('Error creating comment:', err);
      throw err;
    }
  };

  // Handle reply
  const handleReply = async (parentCommentId, content) => {
    try {
      const reply = await createComment({
        lessonId,
        content,
        parentCommentId
      });

      // Add reply to parent comment
      const updateCommentsWithReply = (commentsList) => {
        return commentsList.map(comment => {
          if (comment.id === parentCommentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply]
            };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateCommentsWithReply(comment.replies)
            };
          }
          return comment;
        });
      };

      setComments(prevComments => updateCommentsWithReply(prevComments));
    } catch (err) {
      console.error('Error creating reply:', err);
      throw err;
    }
  };

  // Handle edit
  const handleEdit = async (commentId, content) => {
    try {
      await updateComment(commentId, content);

      // Update comment in the list
      const updateCommentsWithEdit = (commentsList) => {
        return commentsList.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              content,
              is_edited: true
            };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateCommentsWithEdit(comment.replies)
            };
          }
          return comment;
        });
      };

      setComments(prevComments => updateCommentsWithEdit(prevComments));
    } catch (err) {
      console.error('Error editing comment:', err);
      throw err;
    }
  };

  // Handle delete
  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);

      // Remove comment from the list
      const removeComment = (commentsList) => {
        return commentsList.filter(comment => {
          if (comment.id === commentId) {
            return false;
          }
          if (comment.replies && comment.replies.length > 0) {
            comment.replies = removeComment(comment.replies);
          }
          return true;
        });
      };

      setComments(prevComments => removeComment(prevComments));
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment');
    }
  };

  // Handle vote
  const handleVote = async (commentId, voteType) => {
    try {
      await voteOnComment(commentId, voteType);

      // Reload comments to get updated vote counts
      // In a production app, you'd want to update the state optimistically
      await loadComments();
    } catch (err) {
      console.error('Error voting:', err);
      alert('Failed to vote. Please try again.');
    }
  };

  return (
    <div className={classes.discussionContainer}>
      {/* Header with sorting */}
      <div className={classes.discussionHeader}>
        <h3 className={classes.discussionTitle}>
          Discussion ({comments.length})
        </h3>
        <div className={classes.sortOptions}>
          <button
            className={`${classes.sortButton} ${sortBy === 'top' ? 'active' : ''}`}
            onClick={() => setSortBy('top')}
          >
            Top
          </button>
          <button
            className={`${classes.sortButton} ${sortBy === 'trending' ? 'active' : ''}`}
            onClick={() => setSortBy('trending')}
          >
            Trending
          </button>
          <button
            className={`${classes.sortButton} ${sortBy === 'recent' ? 'active' : ''}`}
            onClick={() => setSortBy('recent')}
          >
            Recent
          </button>
        </div>
      </div>

      {/* New comment form */}
      {user ? (
        <div className={classes.commentForm}>
          <div className={classes.commentFormHeader}>Add a comment</div>
          <CommentForm onSubmit={handleNewComment} />
        </div>
      ) : (
        <div className={classes.commentForm}>
          <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
            Please sign in to join the discussion
          </div>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
          Loading comments...
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
          {error}
        </div>
      ) : comments.length === 0 ? (
        <div className={classes.emptyState}>
          <div className={classes.emptyStateIcon}>
            <HiChatBubbleLeftRight />
          </div>
          <div className={classes.emptyStateText}>No comments yet</div>
          <div className={classes.emptyStateSubtext}>
            Be the first to start the discussion!
          </div>
        </div>
      ) : (
        <div className={classes.commentsList}>
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={user}
              onVote={handleVote}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscussionSection;
