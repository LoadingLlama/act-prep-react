/**
 * CommentForm Component
 * Form for posting new comments or editing existing ones
 */

import React, { useState } from 'react';
import { useDiscussionStyles } from '../../styles/components/discussion.styles';

const CommentForm = ({
  onSubmit,
  onCancel,
  initialValue = '',
  placeholder = 'Add a comment...',
  submitLabel = 'Comment'
}) => {
  const classes = useDiscussionStyles();
  const [content, setContent] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      await onSubmit(content.trim());
      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setContent(initialValue);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className={classes.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        disabled={isSubmitting}
        rows={3}
      />
      <div className={classes.formActions}>
        {onCancel && (
          <button
            type="button"
            className={classes.cancelButton}
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={classes.submitButton}
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? 'Posting...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
