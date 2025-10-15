/**
 * CTA Section Styles
 */

export const ctaStyles = {
  ctaSection: {
    padding: '6rem 2rem',
    background: 'linear-gradient(180deg, #000000 0%, #111111 100%)',
    position: 'relative',
    textAlign: 'center'
  },

  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },

  title: {
    fontSize: '2.8rem',
    fontWeight: 700,
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #007aff 0%, #0056cc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em'
  },

  subtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '2.5rem',
    lineHeight: 1.5
  },

  ctaButton: {
    background: 'linear-gradient(135deg, #007aff 0%, #0056cc 100%)',
    color: 'white',
    padding: '1rem 3rem',
    borderRadius: '30px',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: 600,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(0, 122, 255, 0.3)',
    ':hover': {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 15px 40px rgba(0, 122, 255, 0.4)'
    }
  },

  disclaimer: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: '1.5rem'
  }
};