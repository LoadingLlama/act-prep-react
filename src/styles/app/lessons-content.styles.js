/**
 * Lessons Content Styles
 * Extracted from LessonsContent.jsx
 */

import { createUseStyles } from 'react-jss';

export const useLessonsContentStyles = createUseStyles({
  lessonsContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '0.5rem 0',
    margin: '0',
    background: '#ffffff',
    maxWidth: '100%',
    width: '100%',
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'flex-start',
    '@media (max-width: 768px)': {
      padding: '0.375rem 0',
      flexDirection: 'column'
    },
    '@media (max-width: 480px)': {
      padding: '0.25rem 0'
    }
  },
  lessonsMainContent: {
    flex: 1,
    maxWidth: '900px',
    minWidth: 0,
    padding: '1.5rem 1.5rem 0 1.5rem'
  },
  progressSidebar: {
    width: '280px',
    flexShrink: 0,
    marginLeft: 'auto',
    padding: '1.5rem 2rem 0 0',
    position: 'sticky',
    top: '1.5rem',
    alignSelf: 'flex-start',
    height: 'fit-content',
    '@media (max-width: 768px)': {
      width: '100%',
      padding: '0',
      position: 'relative'
    }
  },
  progressCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '1.5rem 1.5rem 1rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  progressTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1.25rem',
    textAlign: 'center'
  },
  progressCircleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  progressCircle: {
    position: 'relative',
    width: '180px',
    height: '180px'
  },
  progressCircleSvg: {
    transform: 'rotate(-90deg)'
  },
  progressCircleBackground: {
    fill: 'none',
    stroke: '#e5e7eb',
    strokeWidth: '8'
  },
  progressCircleProgress: {
    fill: 'none',
    stroke: '#08245b',
    strokeWidth: '8',
    strokeLinecap: 'round',
    transition: 'stroke-dashoffset 0.5s ease'
  },
  progressText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  },
  progressPercentage: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#08245b',
    lineHeight: '1',
    textAlign: 'center'
  },
  progressFraction: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.25rem',
    textAlign: 'center'
  },
  progressStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    marginBottom: '0',
    width: '100%'
  },
  progressStat: {
    textAlign: 'center'
  },
  progressStatLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  progressStatValue: {
    fontSize: '1.25rem',
    fontWeight: '700'
  },
  viewHistoryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.75rem',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1a1a1a',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.15)'
    }
  },
  pageHeader: {
    padding: '0',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      marginBottom: '0.75rem'
    },
    '@media (max-width: 480px)': {
      marginBottom: '0.5rem'
    }
  },
  modeToggle: {
    display: 'inline-flex',
    background: '#ffffff',
    borderRadius: '100px',
    padding: '0.25rem',
    gap: '0.25rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)'
  },
  modeButton: {
    padding: '0.625rem 1.5rem',
    fontSize: '0.8125rem',
    fontWeight: '500',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'transparent',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap',
    '&:hover': {
      color: '#1a1a1a',
      background: '#e2e8f0'
    },
    '&.active': {
      background: '#b91c1c',
      color: '#ffffff',
      fontWeight: '500',
      boxShadow: '0 2px 4px rgba(185, 28, 28, 0.25), 0 1px 2px rgba(185, 28, 28, 0.15)'
    }
  },
  pageTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.02em',
    '@media (max-width: 768px)': {
      fontSize: '1.5rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '1.25rem'
    }
  },
  pageSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0
  },
  contentSection: {
    padding: '0'
  },
  controlsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '1rem',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '0.75rem'
    }
  },
  filterButtons: {
    display: 'flex',
    position: 'relative',
    background: '#ffffff',
    borderRadius: '100px',
    padding: '0.25rem',
    gap: '0.25rem',
    width: 'fit-content',
    border: '1px solid #e5e7eb'
  },
  filterButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '100px',
    padding: '0.625rem 1.25rem',
    fontSize: '0.8125rem',
    fontWeight: '500',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'color 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    whiteSpace: 'nowrap',
    '&:hover:not(.active)': {
      color: '#1a1a1a'
    },
    '&.active': {
      color: '#ffffff',
      fontWeight: '500'
    }
  },
  filterSlider: {
    position: 'absolute',
    top: '0.25rem',
    height: 'calc(100% - 0.5rem)',
    borderRadius: '100px',
    background: '#08245b',
    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 0,
    boxShadow: '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)',
    willChange: 'left, width',
    '&.science': {
      background: '#10b981',
      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.25), 0 1px 2px rgba(16, 185, 129, 0.15)'
    },
    '&.math': {
      background: '#b91c1c',
      boxShadow: '0 2px 4px rgba(185, 28, 28, 0.25), 0 1px 2px rgba(185, 28, 28, 0.15)'
    },
    '&.reading': {
      background: '#713f12',
      boxShadow: '0 2px 4px rgba(113, 63, 18, 0.25), 0 1px 2px rgba(113, 63, 18, 0.15)'
    }
  },
  viewToggle: {
    display: 'flex',
    gap: '0.25rem',
    background: '#ffffff',
    borderRadius: '100px',
    padding: '0.25rem',
    border: '1px solid #e5e7eb'
  },
  viewButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '100px',
    padding: '0.6rem',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    minHeight: '36px',
    fontWeight: '500',
    '&:hover': {
      color: '#1a1a1a',
      background: '#e2e8f0'
    },
    '&.active': {
      background: '#b91c1c',
      color: '#ffffff',
      fontWeight: '500',
      boxShadow: '0 2px 4px rgba(185, 28, 28, 0.25), 0 1px 2px rgba(185, 28, 28, 0.15)'
    }
  },
  lessonsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    '@media (max-width: 900px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr'
    }
  },
  lessonsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    padding: '0',
    '@media (max-width: 1024px)': {
      gap: '0'
    },
    '@media (max-width: 640px)': {
      gap: '0'
    }
  },
  lessonsListView: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    padding: '0'
  },
  lessonCard: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    position: 'relative',
    minHeight: '50px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    '&:hover': {
      background: '#f9fafb'
    },
    '&.completed': {
      '&:hover': {
        background: '#f9fafb'
      }
    },
    '&.in-progress': {
      '&:hover': {
        background: '#f9fafb'
      }
    },
    '&.golden': {
      '&:hover': {
        background: '#f9fafb'
      }
    }
  },
  lessonCardListView: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    minHeight: '50px',
    position: 'relative',
    '&:hover': {
      background: '#f9fafb'
    },
    '&.completed': {
      '&:hover': {
        background: '#f9fafb'
      }
    },
    '&.in-progress': {
      '&:hover': {
        background: '#f9fafb'
      }
    },
    '&.golden': {
      '&:hover': {
        background: '#f9fafb'
      }
    }
  },
  lessonStatus: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    zIndex: 1,
    pointerEvents: 'none',
    flexShrink: 0
  },
  lessonInfo: {
    flex: 1,
    paddingRight: '2.5rem',
    minWidth: 0,
    overflow: 'hidden'
  },
  lessonChapter: {
    fontSize: '0.65rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '0.3rem'
  },
  lessonTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: '1.25',
    marginBottom: '0.3rem'
  },
  keyTermsTags: {
    marginTop: '0.35rem',
    fontSize: '0.65rem',
    color: '#94a3b8',
    fontWeight: '400',
    lineHeight: '1.3',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  unitHeader: {
    padding: '0.75rem 1rem',
    background: 'transparent',
    borderRadius: '0',
    borderBottom: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  unitTitle: {
    fontSize: '0.8125rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.01em',
    margin: 0
  },
  unitBox: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0',
    marginBottom: '2rem',
    overflow: 'visible',
    transition: 'none',
    '&:first-child': {
      marginTop: 0
    }
  },
  unitContent: {
    padding: '0'
  },
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '200% 0'
    },
    '100%': {
      backgroundPosition: '-200% 0'
    }
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '0.75rem'
    }
  },
  categoryCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 3px 0 0 rgba(0, 0, 0, 0.1)',
    '&:hover': {
      borderColor: '#d1d5db',
      boxShadow: '0 5px 0 0 rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-2px)'
    }
  },
  categoryCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1.25rem',
    position: 'relative',
    minHeight: '140px'
  },
  categoryIcon: {
    fontSize: '3.5rem',
    flexShrink: 0,
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))'
  },
  categoryInfo: {
    padding: '1rem 1.25rem 1.25rem',
    background: '#ffffff',
    textAlign: 'center'
  },
  categoryTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.25rem',
    lineHeight: '1.3'
  },
  categorySubtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  sectionHeader: {
    marginBottom: '1rem',
    marginTop: '2rem',
    '&:first-child': {
      marginTop: 0
    }
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0
  }
});
