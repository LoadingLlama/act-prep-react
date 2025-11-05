/**
 * Course Content Styles
 * Extracted from CourseContent.jsx
 */

import { createUseStyles } from 'react-jss';

export const useCourseStyles = createUseStyles({
  courseContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#fafafa',
    maxWidth: '1200px'
  },
  pageHeader: {
    padding: '0',
    marginBottom: '1.5rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#000000',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.04em'
  },
  pageSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: '0 0 0.5rem 0'
  },
  testCountdown: {
    color: '#1a1a1a',
    background: '#f8fafc',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
    minWidth: '160px'
  },
  nextAssignmentBanner: {
    background: 'transparent',
    color: '#1a1a1a',
    padding: '1rem 0',
    borderRadius: '0',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    borderBottom: '1px solid #e5e7eb'
  },
  nextAssignmentContent: {
    flex: 1
  },
  nextAssignmentLabel: {
    fontSize: '0.65rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#64748b',
    marginBottom: '0.25rem'
  },
  nextAssignmentTitle: {
    fontSize: '0.95rem',
    fontWeight: '700',
    marginBottom: '0.2rem'
  },
  nextAssignmentDue: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '500'
  },
  nextAssignmentIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '0',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '1rem',
    color: '#64748b'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
    marginBottom: '1.5rem'
  },
  statCard: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem'
  },
  statLabel: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: '1'
  },
  statDetail: {
    fontSize: '0.7rem',
    color: '#64748b'
  },
  strengthsSection: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0',
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #e5e7eb'
  },
  strengthsHeader: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  strengthsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem'
  },
  strengthItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 0',
    background: 'transparent',
    borderRadius: '0',
    borderBottom: '1px solid #f1f5f9',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  strengthLabel: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#1a1a1a'
  },
  strengthBar: {
    height: '6px',
    background: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
    flex: 1,
    marginLeft: '0.75rem',
    marginRight: '0.5rem'
  },
  strengthFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  strengthValue: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#64748b',
    minWidth: '35px',
    textAlign: 'right'
  },
  pathContainer: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0'
  },
  pathHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #f3f4f6'
  },
  pathTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  pathProgress: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '600'
  },
  weekSection: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    position: 'relative',
    '&:last-child': {
      '& $timelineBar': {
        display: 'none'
      }
    }
  },
  timelineColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    width: '32px',
    flexShrink: 0
  },
  weekDot: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: '#08245b',
    border: '3px solid #dbeafe',
    flexShrink: 0,
    position: 'relative',
    zIndex: 2
  },
  timelineBar: {
    position: 'absolute',
    top: '16px',
    bottom: '-24px',
    left: '50%',
    width: '3px',
    background: '#e5e7eb',
    transform: 'translateX(-50%)'
  },
  weekContent: {
    flex: 1
  },
  weekHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.65rem'
  },
  weekTitle: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  weekDateRange: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '600'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  courseItem: {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #f1f5f9',
    borderRadius: '0',
    padding: '1rem 0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    minHeight: '48px',
    '&:hover': {
      borderBottomColor: '#08245b',
      transform: 'translateX(4px)',
      '& $itemTitle': {
        color: '#08245b'
      }
    },
    '&:active': {
      transform: 'translateX(2px)'
    },
    '&.completed': {
      background: 'transparent',
      '& $itemTitle': {
        color: '#3b82f6'
      }
    },
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  itemIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '0',
    flexShrink: 0,
    '&.strategy': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.grammar': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.punctuation': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.problem-solving': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.algebra': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.numbers': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.geometry': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.reading': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.comprehension': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.science': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.data-analysis': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.interpretation': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.test': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.lesson': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.practice': {
      background: 'transparent',
      color: '#64748b'
    },
    '&.review': {
      background: 'transparent',
      color: '#64748b'
    }
  },
  itemInfo: {
    flex: 1,
    minWidth: 0
  },
  itemTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.15rem'
  },
  itemMeta: {
    fontSize: '0.7rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  itemSkills: {
    fontSize: '0.7rem',
    color: '#64748b',
    background: 'transparent',
    padding: '0',
    borderRadius: '0',
    fontWeight: '500'
  },
  itemDueDate: {
    fontSize: '0.7rem',
    color: '#64748b',
    background: 'transparent',
    padding: '0',
    borderRadius: '0',
    fontWeight: '500',
    border: 'none'
  },
  itemStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontSize: '0.7rem',
    fontWeight: '600',
    flexShrink: 0,
    '&.completed': {
      color: '#10b981'
    },
    '&.pending': {
      color: '#64748b'
    }
  }
});
