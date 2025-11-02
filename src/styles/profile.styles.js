/**
 * Profile Page Styles
 * Matches app theme with clean, professional design
 */

export const profileStyles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    fontSize: '16px',
    color: '#64748b',
  },

  header: {
    marginBottom: '2rem',
  },

  title: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#000000',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.04em',
  },

  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  message: {
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '1.5rem',
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
    gap: '2rem',
    padding: '2rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  },

  avatarContainer: {
    position: 'relative',
  },

  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #e2e8f0',
  },

  avatarPlaceholder: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: '#f1f5f9',
    border: '3px solid #e2e8f0',
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
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 0.25rem 0',
    letterSpacing: '-0.02em',
  },

  userEmail: {
    fontSize: '0.95rem',
    color: '#64748b',
    margin: 0,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  formSection: {
    padding: '2rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  },

  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 1.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    letterSpacing: '-0.01em',
  },

  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1rem',
  },

  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
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

  inputDisabled: {
    background: '#f8fafc',
    color: '#94a3b8',
    cursor: 'not-allowed',
  },

  select: {
    padding: '12px 16px',
    fontSize: '15px',
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
    fontSize: '0.75rem',
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
};
