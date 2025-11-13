/**
 * All Lessons Navigator Styles
 * Extracted from AllLessonsNavigator.js
 */

import { createUseStyles } from 'react-jss';

export const useAllLessonsNavigatorStyles = createUseStyles({
  navigator: {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '320px',
    height: '100vh',
    overflowY: 'auto',
    background: '#ffffff',
    padding: '0',
    zIndex: 1100,
    borderRight: '1px solid #e0e0e0',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.collapsed': {
      width: '60px',
      overflowY: 'hidden'
    },
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'transparent',
      borderRadius: '3px'
    },
    '&:hover::-webkit-scrollbar-thumb': {
      background: '#d1d5db',
      '&:hover': {
        background: '#9ca3af'
      }
    }
  },
  headerSection: {
    background: '#f8f9fa',
    borderBottom: '1px solid #e0e0e0',
    padding: '1rem 0.75rem 0.75rem 0.75rem'
  },
  contentSection: {
    padding: '0.75rem 0.75rem',
    background: '#ffffff'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.5rem 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#5f6368',
    fontSize: '0.8rem',
    fontWeight: '500',
    marginBottom: '1rem',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#202124'
    }
  },
  courseTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#5f6368',
    marginBottom: '0.75rem',
    paddingLeft: '0.25rem'
  },
  modeToggle: {
    display: 'flex',
    background: '#e0e3e7',
    borderRadius: '4px',
    padding: '2px',
    gap: '2px',
    marginBottom: '1rem'
  },
  modeButton: {
    flex: 1,
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    background: 'transparent',
    color: '#5f6368',
    '&:hover': {
      color: '#202124'
    },
    '&.active': {
      background: '#ffffff',
      color: '#1a73e8',
      fontWeight: '600',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }
  },
  unitGroup: {
    marginBottom: '0.35rem'
  },
  unitHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.6rem',
    cursor: 'pointer',
    background: '#e8eaed',
    borderRadius: '6px',
    transition: 'background 0.2s',
    '&:hover': {
      background: '#dadce0'
    }
  },
  unitToggle: {
    fontSize: '0.6rem',
    color: '#5f6368',
    transition: 'transform 0.2s',
    '&.expanded': {
      transform: 'rotate(90deg)'
    }
  },
  unitTitle: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#3c4043',
    flex: 1
  },
  lessonsList: {
    marginTop: '0.35rem',
    paddingLeft: '0.75rem'
  },
  allTopicsLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    marginBottom: '0.35rem',
    cursor: 'pointer',
    fontSize: '0.75rem',
    color: '#5f6368',
    fontWeight: '500',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#1a73e8'
    }
  },
  lessonItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    marginBottom: '0.2rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.75rem',
    color: '#5f6368',
    '&:hover': {
      color: '#202124'
    }
  },
  lessonItemActive: {
    color: '#1a73e8 !important',
    fontWeight: '500'
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    flexShrink: 0
  },
  statusCompleted: {
    background: '#34a853'
  },
  statusInProgress: {
    background: '#fbbc04'
  },
  statusNotStarted: {
    background: '#80868b'
  },
  lessonText: {
    flex: 1
  },
  lessonNumber: {
    color: '#5f6368',
    marginRight: '0.2rem',
    fontSize: '0.75rem'
  },
  progressSection: {
    padding: '0.75rem 0.5rem 0 0.5rem',
    marginBottom: '0'
  },
  progressText: {
    fontSize: '0.7rem',
    color: '#80868b',
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressBarContainer: {
    width: '100%',
    height: '4px',
    background: '#e0e0e0',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    background: '#34a853',
    borderRadius: '2px',
    transition: 'width 0.3s ease'
  },
  toggleButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1200,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#e8eaed'
    },
    '$navigator.collapsed &': {
      right: '16px'
    }
  },
  toggleIcon: {
    fontSize: '0.65rem',
    color: '#5f6368',
    transition: 'transform 0.2s ease',
    display: 'inline-block',
    '&.collapsed': {
      transform: 'rotate(180deg)'
    }
  },
  contentWrapper: {
    opacity: 1,
    transition: 'opacity 0.2s ease',
    '$navigator.collapsed &': {
      opacity: 0,
      pointerEvents: 'none'
    }
  },
  collapsedView: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    paddingTop: '1rem',
    width: '100%',
    '$navigator.collapsed &': {
      display: 'flex'
    }
  },
  collapsedIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#1a73e8',
      transform: 'translateY(-2px)'
    }
  },
  collapsedIconActive: {
    background: '#e8f0fe',
    borderColor: '#1a73e8'
  }
});
