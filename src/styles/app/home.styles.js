/**
 * Home Component Styles
 * Dashboard styles extracted from Home.js
 */

import { createUseStyles } from 'react-jss';

export const useHomeStyles = createUseStyles({
  homeContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0',
    minHeight: '100vh',
    background: '#fafafa',
    color: '#0f172a',
    maxWidth: '1400px',
    '@media (max-width: 768px)': {
      padding: '1rem'
    }
  },
  pageHeader: {
    padding: '0',
    marginBottom: '2rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#000000',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.04em',
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    }
  },
  pageSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0
  },
  contentContainer: {
    padding: '0'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem'
    }
  },
  upcomingSection: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  upcomingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e5e7eb'
  },
  upcomingActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  upcomingActionBtn: {
    background: 'transparent',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    padding: '0.35rem 0.65rem',
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f8fafc',
      borderColor: '#cbd5e1',
      color: '#1a1a1a'
    }
  },
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  timelineDay: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  timelineDayHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.25rem'
  },
  timelineDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#08245b',
    flexShrink: 0,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '12px',
      left: '5px',
      width: '2px',
      height: '60px',
      background: '#e2e8f0'
    },
    '&.last::after': {
      display: 'none'
    }
  },
  timelineDayTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  timelineDayDate: {
    fontSize: '0.7rem',
    color: '#64748b',
    marginLeft: 'auto'
  },
  timelineItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginLeft: '1.75rem'
  },
  calendarSection: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0'
  },
  upcomingCard: {
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
    '&:hover': {
      borderBottomColor: '#08245b',
      transform: 'translateX(4px)',
      '& $upcomingCardTitle': {
        color: '#08245b'
      }
    },
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  upcomingCardIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '&.lesson': {
      background: '#dbeafe',
      color: '#3b82f6'
    },
    '&.test': {
      background: '#fee2e2',
      color: '#ef4444'
    },
    '&.practice': {
      background: '#d1fae5',
      color: '#10b981'
    },
    '&.review': {
      background: '#ede9fe',
      color: '#8b5cf6'
    }
  },
  upcomingCardContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    minWidth: 0
  },
  upcomingCardTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: '1.2'
  },
  upcomingCardMeta: {
    fontSize: '0.7rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem'
  },
  upcomingCardBtn: {
    background: '#08245b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.4rem 0.85rem',
    fontSize: '0.7rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0,
    '&:hover': {
      background: '#0a2f73'
    }
  },
  upcomingCardStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.65rem',
    fontWeight: '600',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    flexShrink: 0,
    '&.completed': {
      background: '#d1fae5',
      color: '#10b981'
    },
    '&.in-progress': {
      background: '#dbeafe',
      color: '#3b82f6'
    }
  },
  progressSection: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e5e7eb'
  },
  sectionTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.5rem'
  },
  upcomingItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.6rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    marginBottom: '0.5rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#08245b',
      boxShadow: '0 2px 6px rgba(8, 36, 91, 0.06)'
    },
    '&:last-child': {
      marginBottom: 0
    }
  },
  upcomingIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '&.lesson': {
      background: '#dbeafe',
      color: '#3b82f6'
    },
    '&.test': {
      background: '#fee2e2',
      color: '#ef4444'
    },
    '&.practice': {
      background: '#d1fae5',
      color: '#10b981'
    },
    '&.review': {
      background: '#ede9fe',
      color: '#8b5cf6'
    }
  },
  upcomingContent: {
    flex: 1,
    minWidth: 0
  },
  upcomingTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.1rem'
  },
  upcomingMeta: {
    fontSize: '0.7rem',
    color: '#64748b'
  },
  upcomingButton: {
    background: '#08245b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.4rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0,
    '&:hover': {
      background: '#0a2f73'
    }
  },
  quickActionsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  actionCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '0.5rem 0.65rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',
    textAlign: 'left',
    '&:hover': {
      borderColor: '#d1d5db',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      transform: 'translateY(-1px)'
    }
  },
  actionIcon: {
    width: '28px',
    height: '28px',
    borderRadius: '5px',
    background: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#374151',
    transition: 'all 0.15s ease',
    '& svg': {
      width: '14px',
      height: '14px'
    },
    '&.diagnostic': {
      background: '#fee2e2',
      color: '#ef4444'
    },
    '&.lessons': {
      background: '#dbeafe',
      color: '#3b82f6'
    },
    '&.practice': {
      background: '#d1fae5',
      color: '#10b981'
    },
    '&.progress': {
      background: '#ede9fe',
      color: '#8b5cf6'
    }
  },
  actionTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: '1.3'
  },
  progressItem: {
    marginBottom: '0.65rem',
    '&:last-child': {
      marginBottom: 0
    }
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.35rem'
  },
  progressLabel: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#1a1a1a'
  },
  progressValue: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#16a34a'
  },
  progressBarContainer: {
    width: '100%',
    height: '5px',
    background: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    background: '#16a34a',
    borderRadius: '3px',
    transition: 'width 0.8s ease',
    '&.inProgress': {
      background: '#08245b'
    }
  },
  infoCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    height: '100%'
  },
  infoCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #f3f4f6'
  },
  infoCardTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  infoCardBadge: {
    fontSize: '0.65rem',
    fontWeight: '600',
    padding: '0.2rem 0.4rem',
    borderRadius: '3px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    '&.urgent': {
      background: '#fef2f2',
      color: '#dc2626'
    },
    '&.upcoming': {
      background: '#eff6ff',
      color: '#08245b'
    }
  },
  assignmentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  assignmentTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  assignmentMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontSize: '0.7rem',
    color: '#64748b'
  },
  assignmentMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
  },
  actionButton: {
    background: '#08245b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    width: '100%',
    '&:hover': {
      background: '#0a2f73',
      transform: 'translateY(-1px)'
    },
    '&.secondary': {
      background: 'transparent',
      color: '#08245b',
      border: '1px solid #e2e8f0',
      '&:hover': {
        background: '#f8fafc',
        borderColor: '#cbd5e1'
      }
    }
  },
  scoreCard: {
    background: 'linear-gradient(135deg, #08245b 0%, #0a2f73 100%)',
    border: 'none',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden'
  },
  scoreGraphContainer: {
    position: 'relative',
    height: '70px',
    marginTop: '0.4rem',
    paddingTop: '0.4rem'
  },
  scoreTimeline: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: '2rem'
  },
  timelinePoint: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    cursor: 'pointer',
    position: 'relative'
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: '100%',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: '30px',
      left: 0,
      right: 0,
      height: '2px',
      background: 'rgba(255, 255, 255, 0.2)'
    }
  },
  scoreCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.6rem',
    fontWeight: '600',
    color: '#08245b',
    marginBottom: '0.25rem',
    transition: 'all 0.2s ease',
    zIndex: 2,
    position: 'relative',
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
    },
    '&.goal': {
      background: '#16a34a',
      color: '#ffffff',
      border: '2px solid rgba(255, 255, 255, 0.4)'
    },
    '&.current': {
      background: '#ffffff',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)'
    }
  },
  timelineLabel: {
    fontSize: '0.55rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    whiteSpace: 'nowrap'
  },
  scoreTooltip: {
    position: 'absolute',
    bottom: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.85)',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: 10
  },
  currentScoreHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '0.4rem'
  },
  scoreValue: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: '1'
  },
  scoreLabel: {
    fontSize: '0.7rem',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  scoreTrend: {
    fontSize: '0.75rem',
    color: '#16a34a',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  }
});
