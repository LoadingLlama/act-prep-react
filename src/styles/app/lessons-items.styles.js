/**
 * Lesson Items & Actions Styles
 * Styles for individual lesson items, info, actions, and status
 */

export const lessonsItemsStyles = {
  lessonInfo: {
    flex: 1,
    marginBottom: '0.75rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'opacity 0.2s ease',
    '& h4': {
      fontSize: '0.95rem',
      fontWeight: 600,
      marginBottom: '0',
      color: '#000000',
      letterSpacing: '-0.01em',
      lineHeight: '1.4',
      width: '100%',
      textAlign: 'left'
    },
    '& p': {
      display: 'none'
    },
    '$lessonItem.completed &': {
      opacity: 0.5
    },
    '$lessonItem.completed:hover &': {
      opacity: 0.7
    }
  },
  lessonInfoListView: {
    flex: 1,
    marginBottom: '0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    transition: 'opacity 0.2s ease',
    '& h4': {
      fontSize: '0.9rem',
      fontWeight: 600,
      marginBottom: '0',
      color: '#000000',
      letterSpacing: '-0.01em',
      lineHeight: '1.3'
    },
    '$lessonItemListView.completed &': {
      opacity: 0.5
    },
    '$lessonItemListView.completed:hover &': {
      opacity: 0.7
    }
  },
  lessonActionsListView: {
    display: 'flex',
    gap: '0.5rem',
    flexShrink: 0,
    borderLeft: '1px solid #f0f0f0',
    marginLeft: '1rem',
    paddingLeft: '1rem',
    marginRight: '-1rem',
    paddingRight: '1rem',
    marginTop: '-0.75rem',
    marginBottom: '-0.75rem',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem'
  },
  keyTermsTags: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '0.35rem',
    marginTop: '0.5rem',
    width: '100%',
    overflow: 'hidden'
  },
  keyTermTag: {
    fontSize: '0.55rem',
    padding: '0.08rem 0.35rem',
    background: '#f9fafb',
    color: '#9ca3af',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontWeight: '400',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    position: 'relative',
    '&:hover': {
      background: '#eff6ff',
      color: '#6b7280',
      borderColor: '#dbeafe'
    }
  },
  learnIndicator: {
    fontSize: '1.1rem',
    color: '#2563eb',
    fontWeight: 700,
    marginTop: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    '$lessonItem:hover &': {
      opacity: 1
    }
  },
  lessonStatus: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 10
  },
  lessonActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: 'auto',
    paddingTop: '0.5rem',
    borderTop: '1px solid #f0f0f0',
    marginLeft: '-1rem',
    marginRight: '-1rem',
    marginBottom: '-1rem',
    padding: '0.5rem 1rem'
  },
  lessonPracticeButton: {
    width: '100%',
    padding: '0.4rem 0.6rem',
    border: 'none',
    borderRadius: '0',
    fontSize: '0.75rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'transparent',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.35rem',
    '&:hover': {
      background: '#f9fafb',
      color: '#374151'
    }
  },
  sectionHeader: {
    gridColumn: '1 / -1',
    margin: '1.5rem 0 0',
    padding: '0.85rem 1.25rem',
    background: '#fafbfc',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      background: '#f3f4f6',
      borderColor: '#d1d5db',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    },
    '&:first-child': {
      marginTop: '0'
    },
    '& h3': {
      fontSize: '1.125rem',
      fontWeight: 700,
      color: '#000000',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      letterSpacing: '-0.01em'
    }
  },
  sectionHeaderIcon: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    transition: 'transform 0.25s ease',
    '&.expanded': {
      transform: 'rotate(90deg)'
    }
  },
  expandedSectionContent: {
    animation: 'fadeSlideDown 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    gridColumn: '1 / -1',
    display: 'contents'
  },
  keyTermsPopup: {
    position: 'fixed',
    background: 'white',
    borderRadius: '6px',
    padding: '0.5rem 0.65rem',
    zIndex: 2000,
    pointerEvents: 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.04)',
    minWidth: '160px',
    maxWidth: '220px',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid white'
    }
  },
  keyTermsPopupTitle: {
    fontSize: '0.6rem',
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: '0.4rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  keyTermsPopupList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  keyTermsPopupItem: {
    fontSize: '0.7rem',
    color: '#374151',
    padding: '0.2rem 0',
    lineHeight: '1.3',
    borderBottom: '1px solid #f3f4f6',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
};
