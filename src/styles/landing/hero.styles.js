/**
 * Hero Section Styles
 */

export const heroStyles = {
  hero: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: '#000000',
    position: 'relative',
    padding: '2rem',
    opacity: 1,
    transform: 'translateY(0)'
  },

  heroBadge: {
    background: 'transparent',
    border: '1px solid #007aff',
    color: '#007aff',
    padding: '0.5rem 1.2rem',
    borderRadius: '24px',
    fontWeight: 400,
    fontSize: '0.8rem',
    marginBottom: '2rem',
    animation: 'fadeInUp 0.8s ease 0.2s both'
  },

  spinningLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden'
  },

  spinningLightInner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '200%',
    height: '200%',
    background: `conic-gradient(
      from 0deg,
      transparent 0deg,
      transparent 30deg,
      rgba(255, 165, 0, 0.05) 40deg,
      rgba(255, 180, 30, 0.12) 50deg,
      rgba(255, 195, 60, 0.18) 60deg,
      rgba(255, 210, 90, 0.22) 70deg,
      rgba(255, 220, 100, 0.25) 80deg,
      rgba(255, 210, 90, 0.22) 90deg,
      rgba(255, 195, 60, 0.18) 100deg,
      rgba(255, 180, 30, 0.12) 110deg,
      rgba(255, 165, 0, 0.05) 120deg,
      transparent 130deg,
      transparent 360deg
    )`,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    filter: 'blur(2px)',
    animation: 'spinLight 20s linear infinite'
  },

  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.04em',
    zIndex: 2,
    animation: 'fadeInUp 1s ease 0.4s both'
  },

  dynamicText: {
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.8)',
    display: 'inline-block',
    animation: 'fadeInOut 2.8s ease-in-out'
  },

  heroDescription: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '2.5rem',
    lineHeight: 1.5,
    maxWidth: '600px',
    zIndex: 2,
    animation: 'fadeInUp 1s ease 0.6s both'
  },

  signupCount: {
    color: '#007aff',
    fontWeight: 600
  },

  heroButtons: {
    display: 'flex',
    gap: '1rem',
    zIndex: 2,
    animation: 'fadeInUp 1s ease 0.8s both'
  },

  ctaButton: {
    background: '#007aff',
    color: 'white',
    padding: '0.8rem 2rem',
    borderRadius: '26px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      background: '#0056cc',
      transform: 'scale(1.02)',
      boxShadow: '0 10px 30px rgba(0, 122, 255, 0.3)'
    }
  },

  demoButton: {
    background: 'transparent',
    color: '#007aff',
    padding: '0.8rem 2rem',
    borderRadius: '26px',
    border: '1px solid #007aff',
    fontSize: '1rem',
    fontWeight: 500,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    ':hover': {
      background: 'rgba(0, 122, 255, 0.1)',
      transform: 'scale(1.02)'
    }
  },

  gradientOrbs: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden'
  },

  orb1: {
    position: 'absolute',
    top: '-200px',
    right: '-200px',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(0, 122, 255, 0.15) 0%, transparent 70%)',
    filter: 'blur(100px)',
    animation: 'floatOrb 20s ease-in-out infinite'
  },

  orb2: {
    position: 'absolute',
    bottom: '-300px',
    left: '-300px',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(255, 45, 85, 0.1) 0%, transparent 70%)',
    filter: 'blur(100px)',
    animation: 'floatOrb 25s ease-in-out infinite 2s'
  },

  orb3: {
    position: 'absolute',
    top: '30%',
    left: '60%',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(50, 215, 75, 0.08) 0%, transparent 70%)',
    filter: 'blur(80px)',
    animation: 'floatOrb 30s ease-in-out infinite 4s'
  },

  heroAuras: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden'
  },

  aura1: {
    position: 'absolute',
    top: '-500px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '1000px',
    height: '1000px',
    background: 'radial-gradient(ellipse at center, rgba(0, 122, 255, 0.08) 0%, transparent 50%)',
    filter: 'blur(100px)',
    animation: 'pulse 10s ease-in-out infinite'
  },

  aura2: {
    position: 'absolute',
    bottom: '-400px',
    right: '-400px',
    width: '800px',
    height: '800px',
    background: 'radial-gradient(circle, rgba(255, 165, 0, 0.06) 0%, transparent 60%)',
    filter: 'blur(100px)',
    animation: 'pulse 15s ease-in-out infinite 2s'
  }
};