/**
 * Login and Authentication Styles
 * Claude-inspired elegant, modern, and playful design with navy glassmorphism
 */

export const loginStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #08245b 0%, #0a2f73 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },

  card: {
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '20px',
    padding: '48px',
    maxWidth: '480px',
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '32px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '8px',
    textAlign: 'center',
    letterSpacing: '-0.01em',
  },

  subtitle: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '32px',
    textAlign: 'center',
    lineHeight: '1.5',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },

  input: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    '&:focus': {
      borderColor: 'rgba(255, 255, 255, 0.4)',
      background: 'rgba(255, 255, 255, 0.12)',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.4)',
    },
  },

  inputFocus: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
    background: 'rgba(255, 255, 255, 0.12)',
  },

  hint: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
  },

  submitButton: {
    padding: '14px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#08245b',
    background: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginTop: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },

  submitButtonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    color: 'rgba(255, 255, 255, 0.2)',
  },

  dividerText: {
    padding: '0 12px',
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '500',
  },

  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },

  googleIcon: {
    width: '18px',
    height: '18px',
    flexShrink: 0,
  },

  footer: {
    marginTop: '32px',
    textAlign: 'center',
  },

  footerText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
  },

  linkButton: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    textDecorationColor: 'rgba(255, 255, 255, 0.4)',
    fontSize: '14px',
    padding: '0',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#ffffff',
      textDecorationColor: 'rgba(255, 255, 255, 0.8)',
    },
  },

  errorMessage: {
    padding: '12px 16px',
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '10px',
    color: '#fca5a5',
    fontSize: '14px',
    marginBottom: '16px',
    backdropFilter: 'blur(10px)',
  },

  successMessage: {
    padding: '32px',
    textAlign: 'center',
    color: '#ffffff',
  },

  logo: {
    position: 'absolute',
    top: '32px',
    left: '32px',
    height: '60px',
    width: 'auto',
    objectFit: 'contain',
    zIndex: 10,
    '@media (max-width: 768px)': {
      height: '50px',
      top: '24px',
      left: '24px',
    },
  },
};
