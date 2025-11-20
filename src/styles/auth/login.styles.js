/**
 * Login and Authentication Styles
 * Clean professional design matching landing page navy theme
 */

export const loginStyles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100vh',
    maxHeight: '100vh',
    width: '100vw',
    maxWidth: '100vw',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
    padding: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
  },

  card: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(226, 232, 240, 0.6)',
    borderRadius: '16px',
    padding: '24px 32px',
    maxWidth: '380px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    position: 'relative',
    margin: '0 auto',
  },

  title: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
    fontSize: '26px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '4px',
    textAlign: 'center',
    letterSpacing: '-0.02em',
  },

  subtitle: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
    fontSize: '13px',
    color: '#6B7280',
    marginBottom: '16px',
    textAlign: 'center',
    lineHeight: '1.4',
    fontWeight: '400',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },

  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    letterSpacing: '0',
    marginBottom: '2px',
  },

  input: {
    padding: '8px 10px',
    fontSize: '13px',
    border: '1px solid rgba(209, 213, 219, 0.6)',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: '#111827',
    '&:focus': {
      borderColor: '#1e3a8a',
      boxShadow: '0 0 0 3px rgba(30, 58, 138, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      background: 'rgba(255, 255, 255, 1)',
    },
    '&::placeholder': {
      color: '#9CA3AF',
    },
  },

  inputFocus: {
    borderColor: '#1e3a8a',
    boxShadow: '0 0 0 3px rgba(30, 58, 138, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
    background: 'rgba(255, 255, 255, 1)',
  },

  hint: {
    fontSize: '11px',
    color: '#6B7280',
  },

  submitButton: {
    padding: '11px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    marginTop: '2px',
    minHeight: '44px',
    width: '100%',
    boxShadow: '0 2px 4px rgba(30, 58, 138, 0.3)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 12px rgba(30, 58, 138, 0.4)',
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(30, 58, 138, 0.3)',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    },
  },

  submitButtonDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 0',
    position: 'relative',
  },

  dividerText: {
    padding: '0 12px',
    fontSize: '12px',
    color: '#9CA3AF',
    fontWeight: '500',
    background: '#ffffff',
    margin: '0 auto',
  },

  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '11px 16px',
    fontSize: '13px',
    fontWeight: '500',
    width: '100%',
    minHeight: '44px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(209, 213, 219, 0.6)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
    textAlign: 'center',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
    },
  },

  googleButton: {
    color: '#374151',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(209, 213, 219, 0.6)',
    '&:hover': {
      background: '#ffffff',
      borderColor: '#9CA3AF',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
    },
    '&:active': {
      background: '#f9fafb',
    },
  },

  facebookButton: {
    background: '#1877F2',
    color: '#ffffff',
    border: '1px solid #1877F2',
    '&:hover': {
      background: '#0c66d8',
      borderColor: '#0c66d8',
      boxShadow: '0 6px 12px rgba(24, 119, 242, 0.4)',
    },
    '&:active': {
      background: '#0a5bc4',
    },
  },

  appleButton: {
    background: '#000000',
    color: '#ffffff',
    border: '1px solid #000000',
    '&:hover': {
      background: '#2a2a2a',
      borderColor: '#2a2a2a',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
    },
    '&:active': {
      background: '#0a0a0a',
    },
  },

  socialButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  },

  googleIcon: {
    width: '18px',
    height: '18px',
    flexShrink: 0,
  },

  footer: {
    marginTop: '12px',
    textAlign: 'center',
  },

  footerText: {
    fontSize: '12px',
    color: '#6B7280',
  },

  linkButton: {
    color: '#1e3a8a',
    fontWeight: '600',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '0',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#1e40af',
      textDecoration: 'underline',
    },
  },

  errorMessage: {
    padding: '12px 14px',
    background: '#FEF2F2',
    border: '1px solid #FCA5A5',
    borderRadius: '8px',
    color: '#DC2626',
    fontSize: '14px',
    marginBottom: '20px',
  },

  successMessage: {
    padding: '32px',
    textAlign: 'center',
    color: '#111827',
  },

  logo: {
    position: 'absolute',
    top: '32px',
    left: '32px',
    fontSize: '24px',
    fontWeight: '400',
    fontFamily: '"Times New Roman", Times, serif',
    color: '#1e3a8a',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    letterSpacing: '-0.01em',
    '@media (max-width: 768px)': {
      fontSize: '20px',
      top: '24px',
      left: '24px',
    },
  },

  logoNomi: {
    color: '#1e3a8a',
    fontWeight: '400',
  },

  logoAcademy: {
    color: '#1e3a8a',
    fontWeight: '400',
  },
};
