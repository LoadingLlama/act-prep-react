/**
 * Settings Page Styles
 * Matches app theme with clean, professional design
 */

export const settingsStyles = {
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

  section: {
    padding: '2rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
  },

  dangerSection: {
    borderColor: '#fecaca',
    background: '#fef2f2',
  },

  sectionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1.5rem',
    color: '#0f172a',
  },

  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 0.25rem 0',
    letterSpacing: '-0.01em',
  },

  sectionDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0,
  },

  settingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
  },

  settingInfo: {
    flex: 1,
  },

  settingLabel: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 0.25rem 0',
  },

  settingDescription: {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: 0,
  },

  toggle: {
    position: 'relative',
    display: 'inline-block',
    width: '52px',
    height: '28px',
    flexShrink: 0,
    marginLeft: '1rem',
    '& input': {
      opacity: 0,
      width: 0,
      height: 0,
    },
  },

  toggleSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#cbd5e1',
    borderRadius: '28px',
    transition: 'all 0.3s',
    '&::before': {
      content: '""',
      position: 'absolute',
      height: '20px',
      width: '20px',
      left: '4px',
      bottom: '4px',
      background: '#ffffff',
      borderRadius: '50%',
      transition: 'all 0.3s',
    },
    'input:checked + &': {
      background: '#08245b',
    },
    'input:checked + &::before': {
      transform: 'translateX(24px)',
    },
    'input:disabled + &': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },

  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '10px 20px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#0f172a',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    '&:hover': {
      background: '#f8fafc',
      borderColor: '#cbd5e1',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },

  dangerButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '10px 20px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#ffffff',
    background: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    '&:hover': {
      background: '#b91c1c',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
    },
  },
};
