/**
 * Profile Page Styles
 * Matches app theme with clean, professional design
 */

export const profileStyles = {
  container: {
    maxWidth: '700px',
    margin: '0',
    padding: '1.5rem 1.5rem 0 1.5rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: '100%',
    '@media (max-width: 768px)': {
      padding: '1.25rem 1rem 0 1rem'
    },
    '@media (max-width: 640px)': {
      padding: '1rem 0.75rem 0 0.75rem'
    }
  },

  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    fontSize: '0.875rem',
    color: '#64748b',
    '@media (max-width: 640px)': {
      height: '300px',
      fontSize: '0.8rem'
    }
  },

  header: {
    marginBottom: '1rem',
  },

  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #08245b 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.02em',
  },

  subtitle: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  message: {
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    fontSize: '0.8125rem',
    marginBottom: '1rem',
  },

  successMessage: {
    background: '#d1fae5',
    color: '#065f46',
    border: '1px solid #6ee7b7',
  },

  errorMessage: {
    background: '#fee',
    color: '#c33',
    border: '1px solid #fcc',
  },

  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.5rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  },

  avatarContainer: {
    position: 'relative',
  },

  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e2e8f0',
  },

  avatarPlaceholder: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: '#f1f5f9',
    border: '2px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarUpload: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#08245b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    border: '3px solid #ffffff',
    transition: 'all 0.2s',
    '&:hover': {
      background: '#0a2f73',
      transform: 'scale(1.1)',
    },
  },

  avatarInput: {
    display: 'none',
  },

  avatarInfo: {
    flex: 1,
  },

  userName: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 0.25rem 0',
    letterSpacing: '-0.01em',
  },

  userEmail: {
    fontSize: '0.8125rem',
    color: '#64748b',
    margin: 0,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  formSection: {
    padding: '1.5rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  },

  sectionTitle: {
    fontSize: '0.9375rem',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 1rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    letterSpacing: '-0.01em',
  },

  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '0.75rem',
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    marginBottom: '0.75rem',
  },

  label: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },

  input: {
    padding: '0.625rem 0.875rem',
    fontSize: '0.8125rem',
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

  inputDisabled: {
    background: '#f8fafc',
    color: '#94a3b8',
    cursor: 'not-allowed',
  },

  select: {
    padding: '0.625rem 0.875rem',
    fontSize: '0.8125rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    background: '#ffffff',
    color: '#0f172a',
    cursor: 'pointer',
    '&:focus': {
      borderColor: '#08245b',
      boxShadow: '0 0 0 3px rgba(8, 36, 91, 0.1)',
    },
  },

  helpText: {
    fontSize: '0.6875rem',
    color: '#94a3b8',
    marginTop: '-0.25rem',
  },

  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1.5rem 2rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  },

  submitButton: {
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #08245b 0%, #0a2f73 100%)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(8, 36, 91, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },

  // Subscription Management Styles
  subscriptionCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  subscriptionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  },

  proBadge: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
    color: '#64748b',
    border: 'none',
    boxShadow: '0 2px 12px rgba(100, 116, 139, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(148, 163, 184, 0.2)',
    fontWeight: '700',
    letterSpacing: '0.05em',
  },

  trialBadge: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    color: '#1e40af',
    border: '1px solid #93c5fd',
  },

  accountDate: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: '0.5rem 0 0 0',
  },

  trialWarning: {
    fontSize: '0.875rem',
    color: '#ea580c',
    background: '#ffedd5',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    border: '1px solid #fed7aa',
    fontWeight: '500',
  },

  trialExpired: {
    fontSize: '0.875rem',
    color: '#dc2626',
    background: '#fee2e2',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    border: '1px solid #fecaca',
    fontWeight: '600',
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '0.75rem',
  },

  featureCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '0.75rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f8fafc',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    },
  },

  featureIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  featureContent: {
    flex: 1,
    minWidth: 0,
  },

  featureLabel: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.15rem',
  },

  featureValue: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#0f172a',
    lineHeight: '1.3',
  },

  upgradeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #08245b 0%, #0a2f73 100%)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(8, 36, 91, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },

  manageButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '14px 32px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#475569',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    '&:hover': {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderColor: '#94a3b8',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(100, 116, 139, 0.2)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
};
