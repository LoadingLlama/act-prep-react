import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import StatusIcon from './components/StatusIcon';
import ProgressiveLessonRenderer from './components/ProgressiveLessonRenderer';
import AIChat from './components/AIChat';
import DiagnosticTest from './components/DiagnosticTest';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import { buttonStyles } from './utils/sharedStyles';
import { storage, lessonUtils, domUtils } from './utils/helpers';
import { getAllLessons } from './utils/lessonsDb';
import { lessonStructure } from './data/lessonStructure';

const useStyles = createUseStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    'html': {
      scrollBehavior: 'smooth'
    },
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      backgroundColor: '#fafbfc',
      color: '#1a1a1a',
      lineHeight: 1.6,
      overflowX: 'hidden',
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
      backgroundAttachment: 'fixed'
    }
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    background: '#fafbfc'
  },
  mainContent: {
    marginLeft: '260px',
    flex: 1,
    minHeight: '100vh',
    background: '#fafbfc'
  },
  header: {
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.5rem 1.5rem',
    position: 'sticky',
    top: 0,
    zIndex: 30
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    gap: '1rem'
  },
  logo: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1a1a1a',
    textDecoration: 'none',
    margin: 0
  },
  subtitle: {
    color: '#9ca3af',
    fontSize: '0.7rem',
    fontWeight: 400,
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  navContainer: {
    padding: '0',
    marginBottom: '0',
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb'
  },
  navTabs: {
    display: 'flex',
    borderBottom: 'none',
    justifyContent: 'flex-start',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  tab: {
    background: 'transparent',
    border: 'none',
    padding: '0.6rem 1.25rem',
    fontSize: '0.9rem',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    fontWeight: 500,
    borderBottom: '2px solid transparent',
    '&:hover': {
      color: '#1a1a1a',
      background: '#f9fafb'
    },
    '&.active': {
      color: '#1a1a1a',
      borderBottom: '2px solid #1a1a1a'
    }
  },
  tabIndicator: {
    display: 'none'
  },
  content: {
    flex: 1,
    padding: '2rem 4rem',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: 1.7,
    color: '#1a202c',
    fontSize: '16px'
  },
  tabContent: {
    display: 'none',
    '&.active': {
      display: 'block'
    }
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(10px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  '@keyframes fadeSlideDown': {
    from: {
      opacity: 0,
      transform: 'translateY(-8px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  contentSection: {
    margin: '0'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 900,
    color: '#000000',
    marginBottom: '2rem',
    marginTop: '0',
    textAlign: 'left',
    lineHeight: '1.2',
    letterSpacing: '-0.04em'
  },
  testGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '0'
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '1.75rem 1.5rem',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    '& h3': {
      fontSize: '1.125rem',
      fontWeight: 700,
      marginBottom: '0.5rem',
      color: '#000000',
      letterSpacing: '-0.01em'
    },
    '& p': {
      color: '#6b7280',
      marginBottom: '0',
      fontSize: '0.95rem',
      lineHeight: '1.5',
      display: 'none'
    }
  },
  btn: {
    ...buttonStyles.base,
    ...buttonStyles.sizes.md,
    background: '#f8f9fa',
    color: '#666',
    '&:hover': {
      background: '#e9ecef',
      borderColor: '#adb5bd',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#333'
    }
  },
  sectionFilters: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  filterButtons: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  sectionFilter: {
    background: 'transparent',
    border: '1px solid #e5e7eb',
    color: '#6b7280',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      color: '#000000'
    },
    '&.active': {
      background: '#000000',
      color: 'white',
      borderColor: '#000000',
      fontWeight: 600
    }
  },
  viewToggle: {
    display: 'flex',
    gap: '0.25rem',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '0.25rem'
  },
  viewToggleButton: {
    background: 'transparent',
    border: 'none',
    padding: '0.4rem 0.6rem',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      color: '#000000',
      background: '#e5e7eb'
    },
    '&.active': {
      background: '#ffffff',
      color: '#000000',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }
  },
  lessonsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    marginTop: '0',
    maxWidth: '1400px'
  },
  unitCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    transition: 'all 0.2s ease',
    marginTop: '0.75rem',
    '&:first-of-type': {
      marginTop: '0.75rem'
    }
  },
  unitHeader: {
    marginBottom: '0.75rem'
  },
  unitLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem'
  },
  unitTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#000000',
    marginBottom: '0.75rem',
    letterSpacing: '-0.01em'
  },
  unitProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '0.75rem'
  },
  unitProgressText: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  unitProgressBar: {
    flex: 1,
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  unitProgressFill: {
    height: '100%',
    background: '#3b82f6',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  lessonsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem'
  },
  lessonsListView: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  lessonItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    background: '#ffffff',
    minHeight: '130px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      borderColor: '#3b82f6',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
      transform: 'translateY(-2px)',
      background: '#fafbff',
      '& $lessonInfo h4': {
        color: '#000000'
      }
    },
    '&.completed': {
      borderLeft: '3px solid #10b981',
      '& h4': {
        color: '#000000',
        textDecoration: 'line-through'
      }
    },
    '&.in-progress': {
      borderLeft: '3px solid #fbbf24',
      '&:hover': {
        background: '#fafbff'
      }
    },
    '&.hidden': {
      display: 'none'
    }
  },
  lessonItemListView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    background: '#ffffff',
    minHeight: 'auto',
    cursor: 'pointer',
    position: 'relative',
    gap: '1rem',
    '&:hover': {
      borderColor: '#3b82f6',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)',
      background: '#fafbff'
    },
    '&.completed': {
      borderLeft: '3px solid #10b981',
      '& h4': {
        textDecoration: 'line-through'
      }
    },
    '&.in-progress': {
      borderLeft: '3px solid #fbbf24'
    }
  },
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
  // Lesson Modal Styles
  lessonModal: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 1000,
    overflow: 'hidden',
    '&.active': {
      display: 'flex'
    }
  },
  lessonContent: {
    background: '#ffffff',
    width: '100%',
    height: '100vh',
    display: 'flex',
    lineHeight: '1.6',
    fontSize: '15px',
    color: '#6d6e75',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif'
  },
  lessonSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderRight: '1px solid #e9ecef',
    padding: '1.5rem',
    overflowY: 'auto',
    flexShrink: 0
  },
  lessonMain: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  lessonHeader: {
    padding: '1.5rem 2.5rem 1rem',
    background: 'white',
    borderBottom: '1px solid #e9ecef',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lessonTitle: {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0',
    letterSpacing: '-0.01em',
    lineHeight: '1.3',
    flex: 1
  },
  lessonModeToggle: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    marginRight: '3rem'
  },
  modeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    background: 'white',
    color: '#6b7280',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#1a1a1a',
      color: 'white',
      borderColor: '#1a1a1a'
    }
  },
  lessonClose: {
    position: 'absolute',
    top: '1.25rem',
    right: '1.5rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#999',
    padding: '0.25rem',
    '&:hover': {
      color: '#333'
    }
  },
  lessonRightSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderLeft: '1px solid #e9ecef',
    padding: '1.5rem',
    overflowY: 'auto',
    flexShrink: 0
  },
  lessonBody: {
    padding: '2rem 2.5rem 4rem',
    maxWidth: '900px',
    lineHeight: 1.6,
    fontSize: '15px',
    color: '#6d6e75',
    '& h1, & h2, & h3, & h4': {
      color: '#000000 !important',
      fontWeight: '800 !important',
      marginTop: '2rem',
      marginBottom: '0.75rem',
      lineHeight: '1.3'
    },
    '& h1': {
      fontSize: '1.875rem',
      borderBottom: '2px solid #e9ecef',
      paddingBottom: '0.5rem',
      fontWeight: '900 !important'
    },
    '& h2': {
      fontSize: '1.5rem',
      color: '#000000 !important',
      fontWeight: '900 !important'
    },
    '& h3': {
      fontSize: '1.25rem',
      color: '#000000 !important',
      fontWeight: '800 !important'
    },
    '& p': {
      marginBottom: '1rem',
      lineHeight: '1.6'
    },
    '& ul, & ol': {
      margin: '1rem 0',
      paddingLeft: '1.5rem'
    },
    '& li': {
      marginBottom: '0.5rem',
      lineHeight: '1.6'
    },
    '& blockquote': {
      borderLeft: '3px solid #cbd5e0',
      paddingLeft: '1rem',
      margin: '1.5rem 0',
      fontStyle: 'italic',
      color: '#4a5568',
      background: '#f7fafc',
      padding: '1rem 1rem',
      borderRadius: '0 4px 4px 0'
    },
    '& code': {
      backgroundColor: '#f0f0f0',
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '0.9em',
      fontFamily: 'Monaco, Consolas, monospace',
      color: '#1a1a1a'
    },
    '& .lesson-intro': {
      fontSize: '1rem',
      color: '#718096',
      fontStyle: 'italic',
      marginBottom: '2rem',
      marginTop: '0rem',
      padding: '1rem 1.25rem 1rem 2rem',
      background: '#f8f9fa',
      borderLeft: '4px solid #1a1a1a',
      borderRadius: '0 4px 4px 0'
    },
    '& .concept-box, & .tip-box, & .example-box, & .rules-box, & .key-takeaway': {
      background: 'transparent',
      border: 'none',
      borderRadius: '0',
      padding: '0',
      margin: '1.5rem 0',
      '& h4': {
        color: '#000000 !important',
        marginBottom: '1rem',
        fontSize: '1.3rem !important',
        fontWeight: '800 !important',
        borderBottom: '1px solid #d1d5db',
        paddingBottom: '0.5rem'
      }
    }
  },
  floatingControls: {
    display: 'none'
  },
  sidebarBackButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0',
    marginBottom: '1.5rem',
    color: '#6b7280',
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    '&:hover': {
      color: '#1a1a1a'
    }
  },
  sidebarNav: {
    '& h3': {
      fontSize: '0.9rem',
      fontWeight: 600,
      color: '#1a1a1a',
      marginBottom: '1rem'
    }
  },
  sidebarNavItem: {
    padding: '0.5rem 0.75rem',
    marginBottom: '0.25rem',
    borderRadius: '4px',
    fontSize: '0.85rem',
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.15s',
    '&:hover': {
      background: '#f3f4f6',
      color: '#1a1a1a'
    },
    '&.active': {
      background: '#e0e7ff',
      color: '#4f46e5',
      fontWeight: 500
    }
  },
  sidebarSection: {
    marginBottom: '2rem',
    '& h4': {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#9ca3af',
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  },
  sidebarProgressBox: {
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1rem'
  },
  keyTerms: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    '& .term': {
      padding: '0.35rem 0.5rem',
      background: 'white',
      borderRadius: '4px',
      fontSize: '0.8rem',
      color: '#374151',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.15s',
      '&:hover': {
        background: '#f9fafb',
        borderColor: '#d1d5db'
      }
    }
  },
  progressBar: {
    width: '100%',
    height: '4px',
    background: '#e5e7eb',
    borderRadius: '2px',
    overflow: 'hidden',
    '& .fill': {
      height: '100%',
      background: 'linear-gradient(90deg, #22c55e, #16a34a)',
      borderRadius: '2px',
      transition: 'width 0.3s ease'
    }
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
  }
});


function App() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('home');
  const [activeSection, setActiveSection] = useState('all');
  const [lessonContent, setLessonContent] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [diagnosticTestOpen, setDiagnosticTestOpen] = useState(false);
  const [hoveredMoreTag, setHoveredMoreTag] = useState(null);
  const [moreTagPosition, setMoreTagPosition] = useState({ top: 0, left: 0 });
  const [lessonProgress, setLessonProgress] = useState(() => {
    return storage.get('actPrepProgress', {});
  });
  const [expandedSections, setExpandedSections] = useState(() => {
    return storage.get('expandedSections', { english: true, math: false, reading: false, science: false });
  });
  const [lessonMode, setLessonMode] = useState('review'); // 'review' or 'practice'
  const [viewMode, setViewMode] = useState(() => {
    return storage.get('lessonsViewMode', 'grid'); // 'grid' or 'list'
  });

  // Save view mode to localStorage when it changes
  useEffect(() => {
    storage.set('lessonsViewMode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    // Load lessons from Supabase
    const loadLessonsFromSupabase = async () => {
      const data = await getAllLessons();
      if (data) {
        // Convert to object keyed by lesson_key
        const lessonsObj = {};
        data.forEach(lesson => {
          lessonsObj[lesson.lesson_key] = {
            title: lesson.title,
            content: lesson.content,
            duration: lesson.duration,
            interactiveData: { practiceSections: [] }
          };
        });
        setLessonContent(lessonsObj);
      }
    };

    loadLessonsFromSupabase();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSectionFilter = (section) => {
    setActiveSection(section);
  };

  const toggleSection = (section) => {
    const newExpandedSections = { ...expandedSections, [section]: !expandedSections[section] };
    setExpandedSections(newExpandedSections);
    storage.set('expandedSections', newExpandedSections);
  };

  const openLesson = (lessonId, mode = 'review') => {
    setCurrentLesson(lessonId);
    setLessonModalOpen(true);
    setLessonMode(mode);
    setHoveredMoreTag(null); // Clear hover popup
    domUtils.preventBodyScroll();
  };

  const updateLessonProgress = (lessonId, status) => {
    const newProgress = { ...lessonProgress, [lessonId]: status };
    setLessonProgress(newProgress);
    storage.set('actPrepProgress', newProgress);
  };


  const getLessonStatus = (lessonId) => {
    return lessonProgress[lessonId] || 'not-started';
  };

  const closeLessonModal = () => {
    setLessonModalOpen(false);
    setCurrentLesson(null);
    domUtils.restoreBodyScroll();
  };

  const TestsContent = () => (
    <div className={`${classes.tabContent} ${activeTab === 'tests' ? 'active' : ''}`}>
      <div className={classes.contentSection}>
        <h2 className={classes.sectionTitle}>Practice Tests</h2>
        <div className={classes.testGrid}>
          <div className={classes.card} onClick={() => setDiagnosticTestOpen(true)}>
            <h3>Diagnostic Test</h3>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 1</h3>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 2</h3>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 3</h3>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 4</h3>
          </div>
          <div className={classes.card}>
            <h3>English Practice</h3>
          </div>
          <div className={classes.card}>
            <h3>Math Practice</h3>
          </div>
          <div className={classes.card}>
            <h3>Reading Practice</h3>
          </div>
          <div className={classes.card}>
            <h3>Science Practice</h3>
          </div>
        </div>
      </div>
    </div>
  );

  const LessonsContent = () => {
    // When a specific section is selected, show all lessons from that section
    if (activeSection !== 'all') {
      const filteredLessons = lessonStructure.filter(lesson => lesson.section === activeSection);

      return (
        <div className={`${classes.tabContent} ${activeTab === 'lessons' ? 'active' : ''}`}>
          <div className={classes.contentSection}>
            <h2 className={classes.sectionTitle}>Study Lessons</h2>

            <div className={classes.sectionFilters}>
              <div className={classes.filterButtons}>
                <button
                  className={`${classes.sectionFilter} ${activeSection === 'all' ? 'active' : ''}`}
                  onClick={() => handleSectionFilter('all')}
                >
                  All Sections
                </button>
                <button
                  className={`${classes.sectionFilter} ${activeSection === 'english' ? 'active' : ''}`}
                  onClick={() => handleSectionFilter('english')}
                >
                  English
                </button>
                <button
                  className={`${classes.sectionFilter} ${activeSection === 'math' ? 'active' : ''}`}
                  onClick={() => handleSectionFilter('math')}
                >
                  Math
                </button>
                <button
                  className={`${classes.sectionFilter} ${activeSection === 'reading' ? 'active' : ''}`}
                  onClick={() => handleSectionFilter('reading')}
                >
                  Reading
                </button>
                <button
                  className={`${classes.sectionFilter} ${activeSection === 'science' ? 'active' : ''}`}
                  onClick={() => handleSectionFilter('science')}
                >
                  Science
                </button>
              </div>

              <div className={classes.viewToggle}>
                <button
                  className={`${classes.viewToggleButton} ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button
                  className={`${classes.viewToggleButton} ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className={classes.lessonsGrid}>
              {(() => {
                // Group lessons by category
                const groupedLessons = filteredLessons.reduce((acc, lesson) => {
                  const category = lesson.category || 'Other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(lesson);
                  return acc;
                }, {});

                let unitNumber = 0;
                return Object.entries(groupedLessons).map(([category, lessons]) => {
                  if (category === 'Introduction' || category === 'Practice Test') return null;

                  unitNumber++;

                  // Calculate progress for this unit
                  const completedLessons = lessons.filter(l => getLessonStatus(l.id) === 'completed').length;
                  const totalLessons = lessons.length;
                  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

                  return (
                    <div key={category} className={classes.unitCard}>
                      <div className={classes.unitHeader}>
                        <div className={classes.unitLabel}>UNIT {unitNumber}</div>
                        <div className={classes.unitTitle}>{category}</div>
                        <div className={classes.unitProgress}>
                          <span className={classes.unitProgressText}>
                            {completedLessons} / {totalLessons} lessons
                          </span>
                          <div className={classes.unitProgressBar}>
                            <div className={classes.unitProgressFill} style={{ width: `${progressPercent}%` }} />
                          </div>
                        </div>
                      </div>
                      <div className={viewMode === 'grid' ? classes.lessonsList : classes.lessonsListView}>
                        {lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`${viewMode === 'grid' ? classes.lessonItem : classes.lessonItemListView} ${getLessonStatus(lesson.id)}`}
                            onClick={() => openLesson(lesson.id, 'review')}
                            onMouseLeave={() => setHoveredMoreTag(null)}
                          >
                            <div className={classes.lessonStatus}>
                              <StatusIcon status={getLessonStatus(lesson.id)} />
                            </div>
                            <div className={viewMode === 'grid' ? classes.lessonInfo : classes.lessonInfoListView}>
                              <h4>
                                {lesson.chapterNum && (
                                  <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                                    Topic {lesson.chapterNum}
                                  </div>
                                )}
                                <div style={{ color: '#000000', fontWeight: '500', fontSize: '0.9rem', lineHeight: '1.3' }}>
                                  {lesson.title}
                                </div>
                              </h4>
                              {lesson.keyTerms && lesson.keyTerms.length > 0 && (
                                <div className={classes.keyTermsTags}>
                                  {lesson.keyTerms.slice(0, 2).map((term, index) => (
                                    <div
                                      key={index}
                                      className={classes.keyTermTag}
                                    >
                                      {term}
                                    </div>
                                  ))}
                                  {lesson.keyTerms.length > 2 && (
                                    <div
                                      className={classes.keyTermTag}
                                      onMouseEnter={(e) => {
                                        e.stopPropagation();
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setMoreTagPosition({
                                          top: rect.top - 8,
                                          left: rect.left + rect.width / 2
                                        });
                                        setHoveredMoreTag(lesson);
                                      }}
                                      onMouseLeave={(e) => {
                                        e.stopPropagation();
                                        setHoveredMoreTag(null);
                                      }}
                                    >
                                      +{lesson.keyTerms.length - 2} more
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className={viewMode === 'grid' ? classes.lessonActions : classes.lessonActionsListView}>
                              <button
                                className={classes.lessonPracticeButton}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openLesson(lesson.id, 'practice');
                                }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 20h9"></path>
                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                                Practice
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      );
    }

    // When "All Sections" is selected, show collapsible sections
    const sections = [
      { key: 'english', title: 'English Section', lessons: lessonStructure.filter(l => l.section === 'english') },
      { key: 'math', title: 'Math Section', lessons: lessonStructure.filter(l => l.section === 'math') },
      { key: 'reading', title: 'Reading Section', lessons: lessonStructure.filter(l => l.section === 'reading') },
      { key: 'science', title: 'Science Section', lessons: lessonStructure.filter(l => l.section === 'science') }
    ];

    return (
      <div className={`${classes.tabContent} ${activeTab === 'lessons' ? 'active' : ''}`}>
        <div className={classes.contentSection}>
          <h2 className={classes.sectionTitle}>Study Lessons</h2>

          <div className={classes.sectionFilters}>
            <div className={classes.filterButtons}>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'all' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('all')}
              >
                All Sections
              </button>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'english' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('english')}
              >
                English
              </button>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'math' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('math')}
              >
                Math
              </button>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'reading' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('reading')}
              >
                Reading
              </button>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'science' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('science')}
              >
                Science
              </button>
            </div>

            <div className={classes.viewToggle}>
              <button
                className={`${classes.viewToggleButton} ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                className={`${classes.viewToggleButton} ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className={classes.lessonsGrid}>
            {sections.map(section => {
              // Group lessons by category within each section
              const groupedLessons = section.lessons.reduce((acc, lesson) => {
                const category = lesson.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(lesson);
                return acc;
              }, {});

              return (
                <React.Fragment key={section.key}>
                  <div className={classes.sectionHeader} onClick={() => toggleSection(section.key)}>
                    <h3>{section.title} ({section.lessons.length} lessons)</h3>
                    <span className={`${classes.sectionHeaderIcon} ${expandedSections[section.key] ? 'expanded' : ''}`}>
                      ▶
                    </span>
                  </div>
                  {expandedSections[section.key] && (
                    <div className={classes.expandedSectionContent}>
                      {(() => {
                        let unitNumber = 0;
                        return Object.entries(groupedLessons).map(([category, lessons]) => {
                      if (category === 'Introduction' || category === 'Practice Test') return null;

                      unitNumber++;

                      // Calculate progress for this unit
                      const completedLessons = lessons.filter(l => getLessonStatus(l.id) === 'completed').length;
                      const totalLessons = lessons.length;
                      const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

                      return (
                        <div key={`${section.key}-${category}`} className={classes.unitCard} style={{ gridColumn: '1 / -1' }}>
                          <div className={classes.unitHeader}>
                            <div className={classes.unitLabel}>UNIT {unitNumber}</div>
                            <div className={classes.unitTitle}>{category}</div>
                            <div className={classes.unitProgress}>
                              <span className={classes.unitProgressText}>
                                {completedLessons} / {totalLessons} lessons
                              </span>
                              <div className={classes.unitProgressBar}>
                                <div className={classes.unitProgressFill} style={{ width: `${progressPercent}%` }} />
                              </div>
                            </div>
                          </div>
                          <div className={viewMode === 'grid' ? classes.lessonsList : classes.lessonsListView}>
                            {lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className={`${viewMode === 'grid' ? classes.lessonItem : classes.lessonItemListView} ${getLessonStatus(lesson.id)}`}
                                onClick={() => openLesson(lesson.id, 'review')}
                                onMouseLeave={() => setHoveredMoreTag(null)}
                              >
                                <div className={classes.lessonStatus}>
                                  <StatusIcon status={getLessonStatus(lesson.id)} />
                                </div>
                                <div className={viewMode === 'grid' ? classes.lessonInfo : classes.lessonInfoListView}>
                                  <h4>
                                    {lesson.chapterNum && (
                                      <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                                        Topic {lesson.chapterNum}
                                      </div>
                                    )}
                                    <div style={{ color: '#000000', fontWeight: '500', fontSize: '0.9rem', lineHeight: '1.3' }}>
                                      {lesson.title}
                                    </div>
                                  </h4>
                                  {lesson.keyTerms && lesson.keyTerms.length > 0 && (
                                    <div className={classes.keyTermsTags}>
                                      {lesson.keyTerms.slice(0, 2).map((term, index) => (
                                        <div
                                          key={index}
                                          className={classes.keyTermTag}
                                        >
                                          {term}
                                        </div>
                                      ))}
                                      {lesson.keyTerms.length > 2 && (
                                        <div
                                          className={classes.keyTermTag}
                                          onMouseEnter={(e) => {
                                            e.stopPropagation();
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            setMoreTagPosition({
                                              top: rect.top - 8,
                                              left: rect.left + rect.width / 2
                                            });
                                            setHoveredMoreTag(lesson);
                                          }}
                                          onMouseLeave={(e) => {
                                            e.stopPropagation();
                                            setHoveredMoreTag(null);
                                          }}
                                        >
                                          +{lesson.keyTerms.length - 2} more
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div className={viewMode === 'grid' ? classes.lessonActions : classes.lessonActionsListView}>
                                  <button
                                    className={classes.lessonPracticeButton}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openLesson(lesson.id, 'practice');
                                    }}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 20h9"></path>
                                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                    Practice
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    });
                      })()}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const LessonModal = () => {
    const lesson = lessonContent[currentLesson];
    const currentLessonData = lessonStructure.find(item => item.id === currentLesson);
    const currentSection = currentLessonData?.section;

    return (
      <div className={`${classes.lessonModal} ${lessonModalOpen ? 'active' : ''}`}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: '320px',
          right: 0,
          height: '60px',
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          zIndex: 200
        }}>
          <h1 style={{
            fontSize: '1.1rem',
            fontWeight: 500,
            color: '#1a1a1a',
            margin: 0
          }}>
            {currentSection ? `${currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Lessons` : 'Lessons'}
          </h1>

          <div style={{
            display: 'inline-flex',
            background: '#f3f4f6',
            borderRadius: '6px',
            padding: '3px',
            gap: '2px'
          }}>
            <button
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: lessonMode === 'review' ? 'white' : 'transparent',
                color: lessonMode === 'review' ? '#1a1a1a' : '#6b7280',
                boxShadow: lessonMode === 'review' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
              onClick={() => setLessonMode('review')}
            >
              Review
            </button>
            <button
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: lessonMode === 'practice' ? 'white' : 'transparent',
                color: lessonMode === 'practice' ? '#1a1a1a' : '#6b7280',
                boxShadow: lessonMode === 'practice' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
              onClick={() => setLessonMode('practice')}
            >
              Practice
            </button>
          </div>
        </div>

        <div style={{
          position: 'fixed',
          top: '60px',
          left: '0',
          right: '0',
          bottom: '0',
          overflowY: 'auto',
          background: '#ffffff'
        }}>
          {lessonMode === 'review' ? (
            lesson && currentLessonData ? (
              <ProgressiveLessonRenderer
                lesson={{...lesson, id: currentLessonData.id}}
                lessonProgress={lessonProgress}
                onNavigate={(type, lessonId) => {
                  if (type === 'home') {
                    closeLessonModal();
                  } else if (type === 'lesson' && lessonId) {
                    openLesson(lessonId);
                  } else if (type === 'next') {
                    const currentIndex = lessonStructure.findIndex(l => l.id === currentLessonData.id);
                    if (currentIndex >= 0 && currentIndex < lessonStructure.length - 1) {
                      openLesson(lessonStructure[currentIndex + 1].id);
                    }
                  } else if (type === 'previous') {
                    const currentIndex = lessonStructure.findIndex(l => l.id === currentLessonData.id);
                    if (currentIndex > 0) {
                      openLesson(lessonStructure[currentIndex - 1].id);
                    }
                  }
                }}
                onStatusChange={(status) => updateLessonProgress(currentLesson, status)}
              />
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: '#999',
                fontSize: '1rem'
              }}>
                <p>This lesson content is being prepared. Check back soon!</p>
              </div>
            )
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#999',
              fontSize: '1rem'
            }}>
              <p>Practice exercises coming soon!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <Sidebar activeView={activeTab} onNavigate={handleTabClick} />

      <div className={classes.mainContent}>
        <div className={classes.content}>
          {activeTab === 'home' && (
            <Home
              lessonProgress={lessonProgress}
              lessonStructure={lessonStructure}
            />
          )}
          <TestsContent />
          <LessonsContent />
        </div>
      </div>

      <LessonModal />

      {/* Diagnostic Test Modal */}
      {diagnosticTestOpen && (
        <DiagnosticTest onClose={() => setDiagnosticTestOpen(false)} />
      )}

      {/* Key Terms Popup */}
      {hoveredMoreTag && (
        <div
          className={classes.keyTermsPopup}
          style={{
            top: `${moreTagPosition.top}px`,
            left: `${moreTagPosition.left}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className={classes.keyTermsPopupTitle}>Key Terms</div>
          <div className={classes.keyTermsPopupList}>
            {hoveredMoreTag.keyTerms?.map((term, index) => (
              <div key={index} className={classes.keyTermsPopupItem}>
                {term}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Chat Component */}
      <AIChat
        currentLesson={currentLesson}
        lessonContent={lessonContent[currentLesson]}
      />
    </div>
  );
}

export default App;