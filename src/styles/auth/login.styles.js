/**
 * Login and Authentication Styles
 * Clean professional design matching landing page navy theme
 */

export const loginStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
    position: 'relative',
  },

  card: {
    background: '#ffffff',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    padding: '48px 40px',
    maxWidth: '440px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    position: 'relative',
  },

  title: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
    textAlign: 'center',
    letterSpacing: '-0.02em',
  },

  subtitle: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif',
    fontSize: '15px',
    color: '#6B7280',
    marginBottom: '32px',
    textAlign: 'center',
    lineHeight: '1.5',
    fontWeight: '400',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },

  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    letterSpacing: '0',
    marginBottom: '2px',
  },

  input: {
    padding: '12px 14px',
    fontSize: '15px',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    background: '#ffffff',
    color: '#111827',
    '&:focus': {
      borderColor: '#1e3a8a',
      boxShadow: '0 0 0 3px rgba(30, 58, 138, 0.1)',
    },
    '&::placeholder': {
      color: '#9CA3AF',
    },
  },

  inputFocus: {
    borderColor: '#1e3a8a',
    boxShadow: '0 0 0 3px rgba(30, 58, 138, 0.1)',
  },

  hint: {
    fontSize: '12px',
    color: '#6B7280',
  },

  submitButton: {
    padding: '13px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: '#1e3a8a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '8px',
    boxShadow: '0 2px 8px rgba(30, 58, 138, 0.2)',
    '&:hover': {
      background: '#1e40af',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
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
    position: 'relative',
  },

  dividerText: {
    padding: '0 16px',
    fontSize: '13px',
    color: '#9CA3AF',
    fontWeight: '500',
    background: '#ffffff',
    margin: '0 auto',
  },

  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px 16px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#374151',
    background: '#ffffff',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#F9FAFB',
      borderColor: '#9CA3AF',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
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
    marginTop: '28px',
    textAlign: 'center',
  },

  footerText: {
    fontSize: '14px',
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
    fontWeight: '700',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      fontSize: '20px',
      top: '24px',
      left: '24px',
    },
  },

  logoNomi: {
    color: '#1e3a8a',
    fontWeight: '700',
  },

  logoAcademy: {
    color: '#000000',
    fontWeight: '400',
  },
};
