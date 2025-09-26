import { createUseStyles } from 'react-jss';
import { spacing, borderRadius, buttonStyles } from '../utils/sharedStyles';

export const useAppStyles = createUseStyles({
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
      backgroundColor: '#f0f4f8',
      color: '#1a1a1a',
      lineHeight: 1.6,
      overflowX: 'hidden',
      backgroundImage: 'linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 100%)',
      backgroundAttachment: 'fixed',
      backgroundSize: '100% 100vh',
      backgroundRepeat: 'no-repeat'
    }
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#fafbfc'
  },
  header: {
    background: 'rgba(248, 249, 250, 0.7)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(233, 236, 239, 0.3)',
    padding: '0.75rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 30,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '1rem',
    position: 'relative'
  },
  logo: {
    fontSize: '1.3rem',
    fontWeight: 500,
    color: '#1a1a1a',
    textDecoration: 'none',
    margin: 0,
    '&:hover': {
      color: '#333'
    }
  },
  subtitle: {
    color: '#666',
    fontSize: '0.85rem',
    fontWeight: 400,
    margin: 0,
    flex: 1,
    textAlign: 'center'
  },
  navContainer: {
    padding: '0',
    marginBottom: '1.5rem',
    background: 'transparent'
  },
  navTabs: {
    display: 'flex',
    borderBottom: '1px solid rgba(229, 229, 229, 0.5)',
    justifyContent: 'center',
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  tab: {
    background: 'transparent',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1rem',
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    fontWeight: 400,
    '&:hover': {
      color: '#1a1a1a'
    },
    '&.active': {
      color: '#1a1a1a',
      fontWeight: 500
    }
  },
  tabIndicator: {
    position: 'absolute',
    bottom: '-1px',
    height: '3px',
    background: 'linear-gradient(90deg, #1a1a1a, #4a5568, #1a1a1a)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(26, 26, 26, 0.3)'
  },
  content: {
    flex: 1,
    padding: '0 2rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    position: 'relative',
    zIndex: 10
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
  contentSection: {
    margin: '0'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 500,
    color: '#1a1a1a',
    marginBottom: '1.5rem',
    textAlign: 'center',
    letterSpacing: '-0.01em',
    position: 'relative',
    paddingTop: '1rem',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-0.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #1a1a1a, transparent)',
      borderRadius: '1px'
    }
  },
  testGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    marginTop: '1rem',
    padding: '1rem 0'
  },
  card: {
    background: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    marginBottom: 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    '&:hover': {
      background: '#f8f9fa',
      borderColor: '#adb5bd',
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
    },
    '& h3': {
      fontSize: '1.3rem',
      fontWeight: 500,
      marginBottom: '0.75rem',
      color: '#1a1a1a'
    },
    '& p': {
      color: '#666',
      marginBottom: '1rem',
      fontSize: '1rem'
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
    justifyContent: 'center',
    gap: '1.25rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    padding: '1rem 0'
  },
  sectionFilter: {
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    color: '#666',
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.pill,
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    '&:hover': {
      background: '#e9ecef',
      borderColor: '#adb5bd',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#333'
    },
    '&.active': {
      background: '#1a1a1a',
      color: 'white',
      borderColor: '#1a1a1a',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    }
  },
  lessonsGrid: {
    display: 'grid',
    gap: '1rem',
    marginTop: '1rem',
    padding: '0.5rem 0'
  },
  lessonItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    cursor: 'pointer',
    marginBottom: 0,
    position: 'relative',
    borderLeft: '4px solid #e5e7eb',
    '&:hover': {
      background: '#f8f9fa',
      borderColor: '#d1d5db',
      transform: 'translateX(4px)'
    },
    '&.completed': {
      background: '#f0fdf4',
      borderLeftColor: '#16a34a',
      opacity: 0.8,
      '& h4': {
        textDecoration: 'line-through',
        color: '#666'
      },
      '& p': {
        color: '#999'
      }
    },
    '&.in-progress': {
      borderLeftColor: '#ffc107',
      background: '#fffbf0'
    },
    '&.hidden': {
      display: 'none'
    }
  },
  lessonInfo: {
    '& h4': {
      fontSize: '1.1rem',
      fontWeight: 500,
      marginBottom: '0.25rem',
      color: '#1a1a1a'
    },
    '& p': {
      color: '#666',
      fontSize: '0.9rem'
    }
  },
  lessonStatus: {
    fontSize: '0.85rem',
    color: '#666',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    background: '#f5f5f5',
    '&.completed': {
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      color: '#065f46',
      border: '1px solid #10b981'
    },
    '&.in-progress': {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      color: '#92400e',
      border: '1px solid #f59e0b'
    }
  },
  sectionHeader: {
    gridColumn: '1 / -1',
    margin: '2rem 0 1rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid rgba(229, 229, 229, 0.5)',
    position: 'relative',
    '&.hidden': {
      display: 'none'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(229, 229, 229, 0.8), transparent)'
    },
    '& h3': {
      fontSize: '1.3rem',
      fontWeight: 500,
      color: '#1a1a1a',
      margin: 0,
      textAlign: 'center',
      letterSpacing: '-0.01em'
    }
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
    overflow: 'auto',
    '&.active': {
      display: 'flex'
    }
  },
  lessonContent: {
    background: 'white',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    lineHeight: '1.6',
    fontSize: '15px',
    color: '#2d3748'
  },
  lessonSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderRight: '1px solid #e2e8f0',
    padding: '2rem 1.5rem',
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  lessonMain: {
    flex: 1,
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0'
  },
  lessonHeader: {
    padding: '2rem 3rem 1.5rem',
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    textAlign: 'left'
  },
  lessonTitle: {
    fontSize: '2.2rem',
    fontWeight: 700,
    color: '#1a202c',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.01em'
  },
  lessonClose: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#666',
    padding: '0.5rem',
    '&:hover': {
      color: '#1a1a1a'
    }
  },
  lessonBody: {
    padding: '0 1rem 4rem',
    lineHeight: 1.65,
    fontSize: '15px',
    maxWidth: '2000px',
    '& h1, & h2, & h3, & h4': {
      color: '#1a1a1a',
      fontWeight: '600',
      marginTop: '2rem',
      marginBottom: '0.75rem',
      lineHeight: '1.3'
    },
    '& h1': {
      fontSize: '1.75rem',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '0.5rem'
    },
    '& h2': {
      fontSize: '1.5rem'
    },
    '& h3': {
      fontSize: '1.25rem'
    },
    '& p': {
      marginBottom: '1rem',
      lineHeight: '1.65',
      '& .emphasis': {
        background: 'rgba(255, 235, 59, 0.3)',
        padding: '1px 2px',
        borderRadius: '2px'
      },
      '& .highlight': {
        background: 'rgba(34, 197, 94, 0.25)',
        padding: '1px 2px',
        borderRadius: '2px'
      }
    },
    '& ul, & ol': {
      margin: '1rem 0',
      paddingLeft: '1.5rem'
    },
    '& li': {
      marginBottom: '0.5rem',
      lineHeight: '1.6',
      '& .definition, & .key-term': {
        fontStyle: 'italic',
        fontWeight: '500'
      }
    },
    '& blockquote': {
      borderLeft: '3px solid #cbd5e0',
      paddingLeft: '1rem',
      margin: '1.25rem 0',
      fontStyle: 'italic',
      color: '#4a5568',
      background: '#f7fafc',
      padding: '0.75rem 1rem',
      borderRadius: '0 6px 6px 0'
    },
    '& code': {
      backgroundColor: '#edf2f7',
      padding: '2px 4px',
      borderRadius: '3px',
      fontSize: '0.9em',
      fontFamily: 'Monaco, Consolas, monospace'
    },
    '& .definition, & .key-term': {
      fontStyle: 'italic',
      fontWeight: '500',
      background: 'rgba(59, 130, 246, 0.2)',
      padding: '1px 3px',
      borderRadius: '2px'
    },
    '& .clause-highlight': {
      background: 'rgba(59, 130, 246, 0.25)',
      padding: '1px 3px',
      borderRadius: '2px',
      fontWeight: '500'
    },
    '& .phrase-highlight': {
      background: 'rgba(251, 191, 36, 0.3)',
      padding: '1px 3px',
      borderRadius: '2px',
      fontWeight: '500'
    },
    '& .independent-highlight': {
      background: 'rgba(34, 197, 94, 0.25)',
      padding: '1px 3px',
      borderRadius: '2px',
      fontWeight: '500'
    },
    '& .dependent-highlight': {
      background: 'rgba(239, 68, 68, 0.25)',
      padding: '1px 3px',
      borderRadius: '2px',
      fontWeight: '500'
    },
    '& .lesson-intro': {
      fontSize: '1rem',
      color: '#d73502',
      fontStyle: 'italic',
      marginBottom: '2rem',
      padding: '1rem',
      background: '#f8f9fa',
      borderLeft: '4px solid #d73502',
      borderRadius: '0 4px 4px 0'
    },
    '& .concept-box': {
      background: '#fafbfc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '0.8rem',
        fontSize: '1.1rem'
      }
    },
    '& .tip-box': {
      background: '#f7fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '0.8rem',
        fontSize: '1.1rem',
        fontWeight: '600'
      },
      '& strong, & .highlight': {
        background: 'rgba(255, 235, 59, 0.4)',
        padding: '1px 3px',
        borderRadius: '2px'
      }
    },
    '& .example-box': {
      background: '#f8f9fa',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& em, & .definition': {
        fontStyle: 'italic',
        fontWeight: '500'
      },
      '& .highlight': {
        background: 'rgba(16, 185, 129, 0.3)',
        padding: '1px 3px',
        borderRadius: '2px'
      }
    },
    '& .rules-box': {
      background: '#fff',
      border: '2px solid #1a1a1a',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '0.8rem',
        fontSize: '1.2rem'
      }
    }
  },
  floatingControlsRemoved: {
    position: 'fixed',
    bottom: '35vh',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
    padding: '0.75rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(200, 200, 200, 0.3)',
    opacity: 0.6,
    transition: 'all 0.3s ease',
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: '180px',
    marginTop: '40px'
  },
  sidebarSection: {
    '& h4': {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  },
  keyTerms: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '& .term': {
      padding: '0.5rem 0.75rem',
      background: 'white',
      borderRadius: '6px',
      fontSize: '0.85rem',
      color: '#2d3748',
      border: '1px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        background: '#f7fafc',
        borderColor: '#cbd5e0'
      }
    }
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
    '& .fill': {
      height: '100%',
      background: 'linear-gradient(90deg, #48bb78, #38a169)',
      borderRadius: '3px',
      transition: 'width 0.3s ease'
    }
  }
});