/**
 * Layout Styles
 * Core layout styles for container, main content, header, and navigation
 */

export const layoutStyles = {
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
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      lineHeight: 1.6,
      overflowX: 'hidden',
      background: '#f8fafc',
      margin: 0,
      padding: 0
    }
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    background: '#f8fafc'
  },
  mainContent: {
    marginLeft: '240px',
    flex: 1,
    minHeight: '100vh',
    background: '#f8fafc',
    transition: 'margin-left 0.3s ease',
    '@media (max-width: 1024px)': {
      marginLeft: 0
    }
  },
  hamburgerButton: {
    display: 'none',
    '@media (max-width: 1024px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      width: '44px',
      height: '44px',
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      cursor: 'pointer',
      zIndex: 900,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease',
      '&:hover': {
        background: '#f9fafb',
        borderColor: '#d1d5db'
      },
      '&:active': {
        transform: 'scale(0.95)'
      },
      '& svg': {
        width: '24px',
        height: '24px',
        color: '#1a1a1a'
      }
    }
  },
  content: {
    padding: '1.5rem',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    '@media (max-width: 768px)': {
      padding: '1rem'
    }
  }
};
