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
  topHeader: {
    position: 'absolute',
    top: '1.5rem',
    right: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    zIndex: 100,
    '@media (max-width: 1024px)': {
      top: '1rem',
      right: '4.5rem'
    }
  },
  profilePicture: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #08245b 0%, #3b82f6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '600',
    border: '2px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    '&:hover': {
      transform: 'scale(1.05)',
      borderColor: '#3b82f6',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
    }
  },
  statusBadge: {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '0.35rem 0.65rem',
    borderRadius: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  },
  proBadge: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
    color: '#64748b',
    border: 'none',
    boxShadow: '0 2px 12px rgba(100, 116, 139, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(148, 163, 184, 0.2)',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  trialBadge: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    color: '#1e40af',
    border: '1px solid #93c5fd'
  }
};
