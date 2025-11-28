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
      backgroundColor: '#ffffff',
      color: '#0f172a',
      lineHeight: 1.6,
      overflowX: 'hidden',
      background: '#ffffff',
      margin: 0,
      padding: 0
    },
    '.practice-question-container': {
      '@media (max-width: 1024px)': {
        padding: '0 2rem !important'
      },
      '@media (max-width: 640px)': {
        padding: '0 1rem !important',
        minHeight: 'auto !important'
      }
    },
    '.passage-content': {
      '@media (max-width: 640px)': {
        fontSize: '15px !important',
        lineHeight: '1.6 !important',
        marginBottom: '1.5rem !important'
      }
    },
    /* Mobile-friendly form inputs */
    'input, textarea, select': {
      '@media (max-width: 640px)': {
        fontSize: '16px !important' // Prevents zoom on iOS
      }
    },
    /* Mobile-friendly headings */
    'h1': {
      '@media (max-width: 640px)': {
        fontSize: '1.75rem !important'
      }
    },
    'h2': {
      '@media (max-width: 640px)': {
        fontSize: '1.5rem !important'
      }
    },
    'h3': {
      '@media (max-width: 640px)': {
        fontSize: '1.25rem !important'
      }
    },
    /* Mobile-optimized buttons */
    'button': {
      '@media (max-width: 640px)': {
        minHeight: '44px',
        touchAction: 'manipulation' // Removes 300ms tap delay
      }
    }
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    background: '#ffffff'
  },
  mainContent: {
    marginLeft: '240px',
    flex: 1,
    height: '100vh',
    background: '#ffffff',
    transition: 'margin-left 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
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
    padding: '0 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 768px)': {
      padding: '0 1rem'
    },
    '@media (max-width: 480px)': {
      padding: '0 0.75rem'
    }
  }
};
