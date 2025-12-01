/**
 * Diagnostic Signup Modal
 * Shows Typeform when user clicks "Free Diagnostic Test"
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import { HiXMark } from 'react-icons/hi2';

const useStyles = createUseStyles({
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  '@keyframes slideUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px) scale(0.95)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
    animation: '$fadeIn 0.3s ease-out',
    '@media (max-width: 768px)': {
      padding: '16px',
    },
  },

  modal: {
    background: '#ffffff',
    borderRadius: '24px',
    maxWidth: '1000px',
    width: '100%',
    height: '700px',
    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    animation: '$slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 768px)': {
      maxWidth: '100%',
      height: '90vh',
      borderRadius: '16px',
    },
  },

  modalHeader: {
    padding: '32px 32px 20px 32px',
    borderBottom: '1px solid #e5e7eb',
    '@media (max-width: 768px)': {
      padding: '24px 20px 16px 20px',
    },
  },

  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#000000',
    margin: 0,
    textAlign: 'center',
    lineHeight: '1.3',
    '@media (max-width: 768px)': {
      fontSize: '20px',
      paddingRight: '40px',
    },
  },

  freeText: {
    color: '#b91c1c',
    textDecoration: 'underline',
    textDecorationColor: '#b91c1c',
    textDecorationThickness: '2px',
    textUnderlineOffset: '3px',
  },

  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: '#f3f4f6',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    fontSize: '24px',
    color: '#6b7280',
    transition: 'all 0.2s ease',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    '&:hover': {
      background: '#e5e7eb',
      color: '#1e3a8a',
      transform: 'scale(1.05)',
    },
    '@media (max-width: 768px)': {
      top: '16px',
      right: '16px',
    },
  },

  typeformContainer: {
    width: '100%',
    flex: 1,
    borderRadius: '0 0 24px 24px',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      borderRadius: '0 0 16px 16px',
    },
  },
});

const DiagnosticSignupModal = ({ isOpen, onClose }) => {
  const classes = useStyles();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modal}>
        <button className={classes.closeButton} onClick={onClose}>
          <HiXMark />
        </button>
        <div className={classes.modalHeader}>
          <h2 className={classes.modalTitle}>
            Just a few quick questions to unlock your 34+ <span className={classes.freeText}>free</span> training!
          </h2>
        </div>
        <div className={classes.typeformContainer}>
          <iframe
            src="https://form.typeform.com/to/okRIME6U"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Free Diagnostic Test Signup"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiagnosticSignupModal;
