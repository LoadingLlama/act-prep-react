/**
 * Header Component Styles
 */

export const headerStyles = {
  header: {
    position: 'fixed',
    top: 0,
    width: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'saturate(180%) blur(30px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
    padding: '0.6rem 0',
    transition: 'all 0.3s ease'
  },

  nav: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logo: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#f5f5f7',
    letterSpacing: '-0.01em'
  },

  navLinks: {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  navLink: {
    color: '#f5f5f7',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 400,
    transition: 'all 0.3s ease',
    position: 'relative',
    ':hover': {
      color: '#007aff',
      transform: 'translateY(-1px)'
    }
  },

  ctaNav: {
    background: '#007aff',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#0056cc',
      transform: 'scale(1.05)'
    }
  }
};