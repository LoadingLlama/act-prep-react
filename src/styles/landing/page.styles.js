/**
 * Page-level Styles
 * Common styles for the landing page
 */

export const pageStyles = {
  root: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
    background: '#000000',
    color: '#ffffff',
    lineHeight: 1.4,
    fontWeight: 400,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    scrollBehavior: 'smooth',
    overflowX: 'hidden',
    maxWidth: '100vw'
  },

  successMessage: {
    position: 'fixed',
    top: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3000,
    animation: 'slideDown 0.3s ease'
  },

  successContent: {
    background: 'linear-gradient(135deg, #00c851 0%, #00a846 100%)',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 200, 81, 0.3)',
    fontSize: '1rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },

  socialProof: {
    position: 'fixed',
    bottom: '2rem',
    left: '2rem',
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '0.8rem 1.2rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    animation: 'fadeInUp 0.5s ease',
    zIndex: 100,
    maxWidth: '300px'
  },

  footer: {
    padding: '3rem 2rem',
    background: '#000000',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },

  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '2rem'
  },

  footerLinks: {
    display: 'flex',
    gap: '2rem'
  },

  footerLink: {
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#007aff'
    }
  }
};