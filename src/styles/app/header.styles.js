/**
 * Header & Navigation Styles  
 * Styles for header, logo, navigation tabs
 */

export const headerStyles = {
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
    padding: '0.25rem 4rem 2rem 4rem',
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
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#000000',
    marginBottom: '1.5rem',
    marginTop: '0',
    textAlign: 'left',
    lineHeight: '1.2',
    letterSpacing: '-0.02em'
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
  topHeader: {
    width: '100%',
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.625rem 0',
    zIndex: 100
  },
  topHeaderContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 4rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      padding: '0 2rem'
    },
    '@media (max-width: 480px)': {
      padding: '0 1rem'
    }
  },
  profilePicture: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 20%, #f67280 40%, #ffa07a 60%, #fa8072 80%, #ff6b9d 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '1.375rem',
    fontWeight: '600',
    border: '2px solid #ffd6e0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(255, 107, 157, 0.25)',
    '@media (max-width: 768px)': {
      width: '36px',
      height: '36px',
      fontSize: '1.25rem'
    },
    '@media (max-width: 480px)': {
      width: '32px',
      height: '32px',
      fontSize: '1.1rem'
    },
    '&:hover': {
      transform: 'scale(1.05)',
      borderColor: '#ffb3d0',
      boxShadow: '0 4px 12px rgba(255, 107, 157, 0.35)'
    }
  },
  proBadge: {
    background: 'rgba(16, 185, 129, 0.15)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: '#059669',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    boxShadow: '0 1px 3px rgba(16, 185, 129, 0.1)',
    fontWeight: '600',
    letterSpacing: '0.02em',
    fontSize: '0.7rem',
    padding: '0.3rem 0.6rem',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
