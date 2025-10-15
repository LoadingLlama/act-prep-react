/**
 * Features Section Styles
 */

export const featuresStyles = {
  featuresSection: {
    padding: '5rem 2rem',
    background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
    position: 'relative'
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },

  header: {
    textAlign: 'center',
    marginBottom: '4rem'
  },

  badge: {
    display: 'inline-block',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.6)',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 400,
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },

  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #999999 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em'
  },

  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: '600px',
    margin: '0 auto'
  },

  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  },

  featureCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '2rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 40px rgba(0, 122, 255, 0.1)'
    }
  },

  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    display: 'inline-block',
    animation: 'floatIcon 3s ease-in-out infinite'
  },

  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: 600,
    marginBottom: '0.8rem',
    color: '#f5f5f7'
  },

  featureDescription: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.5
  }
};