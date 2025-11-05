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
    fontSize: '1.1rem',
    color: '#1a1a1a',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    background: '#fef3c7',
    padding: '0.5rem 0.85rem',
    borderRadius: '6px',
    display: 'inline-block',
    border: '2px solid #f59e0b'
  },
  nextAssignmentBanner: {
    background: 'linear-gradient(135deg, #08245b 0%, #1e40af 100%)',
    color: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '2px solid #1e40af'
  },
  nextAssignmentContent: {
    flex: 1
  },
  nextAssignmentLabel: {
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    opacity: 0.9,
    marginBottom: '0.35rem'
  },
  nextAssignmentTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.25rem'
  },
  nextAssignmentDue: {
    fontSize: '0.85rem',
    opacity: 0.9,
    fontWeight: '500'
  },
  nextAssignmentIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginLeft: '1rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.75rem',
    marginBottom: '1.5rem'
  },
  statCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem'
  },
  statLabel: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: '1'
  },
  statDetail: {
    fontSize: '0.75rem',
    color: '#64748b'
  },
  strengthsSection: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1.5rem'
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
    padding: '0.5rem 0.75rem',
    background: '#f8fafc',
    borderRadius: '4px'
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
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '1rem'
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
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    minHeight: '60px',
    '&:hover': {
      borderColor: '#08245b',
      transform: 'translateX(4px)'
    },
    '&:active': {
      transform: 'translateX(2px)',
      background: '#f8fafc'
    },
    '&.completed': {
      background: '#f0f9ff',
      borderColor: '#3b82f6'
    }
  },
  itemIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    flexShrink: 0,
    fontSize: '16px',
    '&.grammar': {
      background: '#eff6ff',
      color: '#1d4ed8'
    },
    '&.punctuation': {
      background: '#dbeafe',
      color: '#1e40af'
    },
    '&.algebra': {
      background: '#fee2e2',
      color: '#dc2626'
    },
    '&.numbers': {
      background: '#fecaca',
      color: '#b91c1c'
    },
    '&.geometry': {
      background: '#fce7f3',
      color: '#be123c'
    },
    '&.reading': {
      background: '#f3e8ff',
      color: '#7c3aed'
    },
    '&.comprehension': {
      background: '#e9d5ff',
      color: '#6b21a8'
    },
    '&.science': {
      background: '#d1fae5',
      color: '#059669'
    },
    '&.data-analysis': {
      background: '#a7f3d0',
      color: '#047857'
    },
    '&.interpretation': {
      background: '#6ee7b7',
      color: '#065f46'
    },
    '&.strategy': {
      background: '#fed7aa',
      color: '#ea580c'
    },
    '&.problem-solving': {
      background: '#fdba74',
      color: '#c2410c'
    },
    '&.test': {
      background: '#fef3c7',
      color: '#d97706'
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
    color: '#6366f1',
    background: '#f5f3ff',
    padding: '0.15rem 0.4rem',
    borderRadius: '3px',
    fontWeight: '500'
  },
  itemDueDate: {
    fontSize: '0.7rem',
    color: '#f59e0b',
    background: '#fef3c7',
    padding: '0.15rem 0.4rem',
    borderRadius: '3px',
    fontWeight: '600',
    border: '1px solid #fde68a'
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
