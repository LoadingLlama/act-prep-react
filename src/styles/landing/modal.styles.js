/**
 * Modal Styles
 */

export const modalStyles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '2rem'
  },

  modal: {
    background: '#1a1a1a',
    borderRadius: '20px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    animation: 'modalSlideIn 0.3s ease'
  },

  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '2rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white'
    }
  },

  modalTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#f5f5f7',
    textAlign: 'center'
  },

  modalSubtitle: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '2rem',
    textAlign: 'center'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },

  input: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    ':focus': {
      outline: 'none',
      border: '1px solid #007aff',
      background: 'rgba(255, 255, 255, 0.08)'
    },
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.4)'
    }
  },

  select: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    cursor: 'pointer',
    ':focus': {
      outline: 'none',
      border: '1px solid #007aff',
      background: 'rgba(255, 255, 255, 0.08)'
    }
  },

  submitButton: {
    background: 'linear-gradient(135deg, #007aff 0%, #0056cc 100%)',
    color: 'white',
    padding: '0.9rem 2rem',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    ':hover': {
      background: 'linear-gradient(135deg, #0088ff 0%, #0066dd 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 30px rgba(0, 122, 255, 0.3)'
    }
  }
};