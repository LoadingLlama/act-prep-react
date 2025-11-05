/**
 * Login and Authentication Styles
 * Redesigned to match app theme (#08245b blue, clean minimal design)
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
  },

  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '48px',
    maxWidth: '480px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    border: '1px solid #e2e8f0',
  },

  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '8px',
    textAlign: 'center',
    letterSpacing: '-0.02em',
  },

  subtitle: {
    fontSize: '15px',
    color: '#64748b',
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
    color: '#2d3748',
  },

  input: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    background: '#ffffff',
    color: '#0f172a',
    '&:focus': {
      borderColor: '#08245b',
      boxShadow: '0 0 0 3px rgba(8, 36, 91, 0.1)',
    },
  },

  inputFocus: {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
  },

  hint: {
    fontSize: '12px',
    color: '#718096',
  },

  submitButton: {
    padding: '14px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #08245b 0%, #0a2f73 100%)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '8px',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(8, 36, 91, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },

  submitButtonDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    color: '#cbd5e0',
  },

  dividerText: {
    padding: '0 12px',
    fontSize: '13px',
    color: '#9ca3af',
    fontWeight: '500',
  },

  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '11px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
    background: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
    '&:hover': {
      background: '#ffffff',
      borderColor: '#9ca3af',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.08)',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
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
    color: '#718096',
  },

  linkButton: {
    color: '#08245b',
    fontWeight: '600',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '0',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  errorMessage: {
    padding: '12px 16px',
    background: '#fee',
    border: '1px solid #fcc',
    borderRadius: '8px',
    color: '#c33',
    fontSize: '14px',
    marginBottom: '16px',
  },

  successMessage: {
    padding: '32px',
    textAlign: 'center',
  },

  logo: {
    position: 'absolute',
    top: '32px',
    left: '32px',
    color: '#ffffff',
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '28px',
    fontWeight: '600',
    letterSpacing: '0.02em',
    zIndex: 10,
  },
};
