/**
 * Lesson Editor Styles
 * Styles for the admin lesson editor interface
 */

export const editorStyles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    background: '#0a0a0a',
    minHeight: '100vh'
  },

  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.6)'
  },

  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    fontSize: '1.1rem',
    color: '#ff3b30'
  },

  header: {
    marginBottom: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '1rem'
  },

  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#f5f5f7',
    marginBottom: '0.5rem'
  },

  subtitle: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)'
  },

  message: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    background: 'rgba(0, 200, 81, 0.1)',
    border: '1px solid rgba(0, 200, 81, 0.3)',
    borderRadius: '6px',
    color: '#00c851',
    fontSize: '0.9rem'
  },

  tabs: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '0'
  },

  tab: {
    padding: '0.8rem 1.5rem',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '-1px'
  },

  tabActive: {
    color: '#007aff',
    borderBottomColor: '#007aff'
  },

  content: {
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '12px',
    padding: '2rem'
  },

  section: {
    marginBottom: '2rem'
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    color: '#f5f5f7',
    fontSize: '0.95rem',
    fontWeight: 500
  },

  input: {
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    ':focus': {
      outline: 'none',
      border: '1px solid #007aff',
      background: 'rgba(255, 255, 255, 0.08)'
    }
  },

  select: {
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer'
  },

  range: {
    width: '100%',
    cursor: 'pointer'
  },

  textarea: {
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '0.95rem',
    fontFamily: 'monospace',
    resize: 'vertical',
    width: '100%',
    ':focus': {
      outline: 'none',
      border: '1px solid #007aff'
    }
  },

  item: {
    padding: '1.5rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    marginBottom: '1rem'
  },

  itemMeta: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: '1rem'
  },

  contentBlock: {
    marginTop: '1rem',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '6px'
  },

  contentPreview: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    cursor: 'pointer',
    position: 'relative',
    padding: '0.5rem',
    borderRadius: '4px',
    transition: 'background 0.2s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.05)'
    }
  },

  editHint: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#007aff',
    marginTop: '0.5rem',
    fontStyle: 'italic'
  },

  exampleContent: {
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    marginBottom: '1rem'
  },

  formula: {
    display: 'block',
    padding: '0.5rem',
    background: 'rgba(0, 122, 255, 0.1)',
    border: '1px solid rgba(0, 122, 255, 0.2)',
    borderRadius: '4px',
    color: '#007aff',
    fontFamily: 'monospace',
    marginTop: '0.5rem'
  },

  tipType: {
    display: 'inline-block',
    padding: '0.2rem 0.6rem',
    background: 'rgba(255, 165, 0, 0.2)',
    border: '1px solid rgba(255, 165, 0, 0.3)',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#ff9500',
    textTransform: 'uppercase',
    marginBottom: '0.5rem'
  },

  addButton: {
    padding: '0.6rem 1.2rem',
    background: 'linear-gradient(135deg, #007aff 0%, #0056cc 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(0, 122, 255, 0.3)'
    }
  },

  editButton: {
    padding: '0.5rem 1rem',
    background: 'transparent',
    color: '#007aff',
    border: '1px solid #007aff',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '0.5rem',
    ':hover': {
      background: 'rgba(0, 122, 255, 0.1)'
    }
  },

  cancelButton: {
    padding: '0.5rem 1rem',
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
    marginLeft: '0.5rem'
  }
};