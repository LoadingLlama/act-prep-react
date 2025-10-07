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
  }
});
