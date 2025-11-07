/**
 * Discussion Section Styles
 * Styles for lesson comments and voting system
 */

import { createUseStyles } from 'react-jss';

export const useDiscussionStyles = createUseStyles({
  discussionContainer: {
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb'
  },
  discussionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #f1f5f9'
  },
  discussionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0
  },
  sortOptions: {
    display: 'flex',
    gap: '0.5rem'
  },
  sortButton: {
    background: 'transparent',
    border: 'none',
    padding: '0.4rem 0.75rem',
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#64748b',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f8fafc',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#08245b',
      color: '#ffffff',
      fontWeight: '600'
    }
  },
  commentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  commentItem: {
    padding: '1rem 0',
    borderBottom: '1px solid #f1f5f9',
    '&.reply': {
      marginLeft: '2.5rem',
      paddingLeft: '1rem',
      borderLeft: '2px solid #f1f5f9'
    }
  },
  voteGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  voteButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.15rem',
    '&:hover': {
      color: '#1a1a1a'
    },
    '&.active': {
      color: '#08245b !important'
    }
  },
  voteScore: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#64748b',
    minWidth: '20px',
    textAlign: 'center'
  },
  commentContent: {
    flex: 1,
    minWidth: 0
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem'
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#64748b',
    flexShrink: 0
  },
  userName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  commentMeta: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  commentText: {
    fontSize: '0.9rem',
    color: '#1a1a1a',
    lineHeight: '1.6',
    marginBottom: '0.5rem',
    wordWrap: 'break-word'
  },
  commentActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
    alignItems: 'center'
  },
  actionButton: {
    background: 'transparent',
    border: 'none',
    padding: '0',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    '&:hover': {
      color: '#08245b'
    }
  },
  commentForm: {
    marginTop: '1.5rem',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e5e7eb'
  },
  commentFormHeader: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.75rem'
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '0.75rem',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    resize: 'vertical',
    background: '#ffffff',
    color: '#1a1a1a',
    lineHeight: '1.6',
    '&:focus': {
      outline: 'none',
      borderColor: '#08245b',
      boxShadow: '0 0 0 3px rgba(8, 36, 91, 0.1)'
    }
  },
  formActions: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.75rem',
    justifyContent: 'flex-end'
  },
  submitButton: {
    background: '#08245b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#0a2f73'
    },
    '&:disabled': {
      background: '#cbd5e1',
      cursor: 'not-allowed'
    }
  },
  cancelButton: {
    background: 'transparent',
    color: '#64748b',
    border: '1px solid #e5e7eb',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f8fafc',
      color: '#1a1a1a'
    }
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#94a3b8'
  },
  emptyStateIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  emptyStateText: {
    fontSize: '0.95rem',
    marginBottom: '0.5rem'
  },
  emptyStateSubtext: {
    fontSize: '0.85rem',
    color: '#cbd5e1'
  },
  repliesContainer: {
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  replyForm: {
    marginTop: '0.75rem',
    marginLeft: '2.5rem',
    padding: '0.75rem',
    background: '#f8fafc',
    borderRadius: '4px',
    border: '1px solid #e5e7eb'
  },
  editedBadge: {
    fontSize: '0.7rem',
    color: '#94a3b8',
    fontStyle: 'italic'
  }
});
