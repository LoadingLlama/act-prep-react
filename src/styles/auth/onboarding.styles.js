/**
 * Onboarding Questionnaire Styles
 * Extracted from OnboardingQuestionnaire.jsx
 */

import { createUseStyles } from 'react-jss';

export const useOnboardingStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #08245b 0%, #0a2f73 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.03,
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 100px,
        rgba(255, 255, 255, 0.1) 100px,
        rgba(255, 255, 255, 0.1) 101px
      )`,
      pointerEvents: 'none'
    }
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translate(0, 0) rotate(0deg)'
    },
    '33%': {
      transform: 'translate(30px, -30px) rotate(5deg)'
    },
    '66%': {
      transform: 'translate(-20px, 20px) rotate(-5deg)'
    }
  },
  card: {
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '20px',
    padding: '3rem',
    maxWidth: '600px',
    width: '100%',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1000
  },
  progressFill: {
    height: '100%',
    background: 'rgba(255, 255, 255, 0.6)',
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  question: {
    opacity: 0,
    animation: '$fadeIn 0.15s ease-in-out forwards',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column'
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(3px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  '@keyframes fadeOut': {
    '0%': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    '100%': {
      opacity: 0,
      transform: 'translateY(-3px)'
    }
  },
  questionNumber: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '0.75rem'
  },
  questionTitle: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '2rem',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '1rem',
    lineHeight: '1.3',
    letterSpacing: '-0.01em'
  },
  questionSubtitle: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '2.5rem',
    lineHeight: '1.5'
  },
  inputGroup: {
    marginBottom: '2rem',
    flex: 1
  },
  input: {
    width: '100%',
    padding: '1rem 1.25rem',
    fontSize: '1.1rem',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    '&:focus': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
      boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.12)'
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.4)'
    },
    '&::-webkit-calendar-picker-indicator': {
      filter: 'invert(1) brightness(1.2)',
      cursor: 'pointer',
      opacity: 0.8,
      transition: 'opacity 0.2s ease',
      '&:hover': {
        opacity: 1
      }
    },
    '&[type="date"]::-webkit-datetime-edit': {
      color: '#ffffff'
    },
    '&[type="date"]::-webkit-datetime-edit-fields-wrapper': {
      color: '#ffffff'
    }
  },
  select: {
    width: '100%',
    padding: '1rem 1.25rem',
    fontSize: '1.1rem',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    cursor: 'pointer',
    '&:focus': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
      boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.12)'
    },
    '& option': {
      background: '#08245b',
      color: '#ffffff'
    }
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '2rem'
  },
  optionCard: {
    padding: '1.25rem',
    border: '2px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.04)',
    color: '#ffffff',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.08)',
      transform: 'translateY(-2px)'
    },
    '&.selected': {
      borderColor: 'rgba(255, 255, 255, 0.6)',
      background: 'rgba(255, 255, 255, 0.12)',
      boxShadow: '0 4px 16px rgba(255, 255, 255, 0.08)'
    }
  },
  optionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.25rem'
  },
  optionSubtitle: {
    fontSize: '0.85rem',
    opacity: 0.8
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: 'auto'
  },
  button: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    flex: 1,
    padding: '0.875rem 2rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    letterSpacing: '-0.01em',
    '&.primary': {
      background: '#ffffff',
      color: '#08245b',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)'
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none'
      }
    },
    '&.secondary': {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.9)',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.15)'
      }
    }
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '2rem'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    border: '2px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'rgba(255, 255, 255, 0.04)',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
      background: 'rgba(255, 255, 255, 0.08)',
      transform: 'translateY(-2px)'
    },
    '&.selected': {
      borderColor: 'rgba(255, 255, 255, 0.6)',
      background: 'rgba(255, 255, 255, 0.12)',
      boxShadow: '0 4px 16px rgba(255, 255, 255, 0.08)'
    }
  },
  checkboxInput: {
    width: '20px',
    height: '20px',
    accentColor: '#ffffff'
  },
  checkboxLabel: {
    fontSize: '1rem',
    color: '#ffffff',
    flex: 1
  },
  completionScreen: {
    textAlign: 'center',
    padding: '2rem 0',
    opacity: 0,
    animation: '$fadeIn 0.15s ease-in-out forwards'
  },
  completionIcon: {
    fontSize: '4rem',
    marginBottom: '1.5rem'
  },
  completionTitle: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '2.2rem',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '1rem',
    letterSpacing: '-0.01em'
  },
  completionSubtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: '2.5rem'
  }
});
