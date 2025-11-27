import React from 'react';
import { HiArrowLeft, HiFlag } from 'react-icons/hi2';
import { createUseStyles } from 'react-jss';
import Logo from './common/Logo';
import soundEffects from '../services/soundEffects';

const useStyles = createUseStyles({
  navigator: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '240px',
    height: '100vh',
    background: '#08245b',
    padding: '0',
    overflowY: 'auto',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      width: '2px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#08245b'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '2px',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.3)'
      }
    }
  },
  logoSection: {
    padding: '0.75rem 1rem',
    '@media (max-width: 1024px)': {
      padding: '0.5rem 1rem',
      paddingRight: '3.5rem'
    }
  },
  navSection: {
    flex: 1,
    padding: '0.5rem 0',
    overflowY: 'auto'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    margin: '0 1rem 0.5rem 1rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateX(-2px)'
    },
    '& svg': {
      width: '16px',
      height: '16px'
    }
  }
});

const AllLessonsNavigator = ({
  onBackClick,
  onClose,
  practiceMode = false,
  questions = [],
  currentQuestionIndex = 0,
  results = [],
  flaggedQuestions = new Set(),
  onQuestionClick,
  onFlagToggle
}) => {
  const classes = useStyles();

  const handleBackClick = () => {
    soundEffects.playClick();
    // Use onClose if available, otherwise fall back to onBackClick
    if (onClose) {
      onClose();
    } else if (onBackClick) {
      onBackClick();
    }
  };

  return (
    <div className={classes.navigator}>
      {/* Logo */}
      <div className={classes.logoSection}>
        <Logo size="small" style={{ color: '#ffffff', textTransform: 'lowercase' }} />
      </div>

      {/* Back Button */}
      <div className={classes.navSection}>
        <button className={classes.backButton} onClick={handleBackClick}>
          <HiArrowLeft />
          <span>Back to Lessons</span>
        </button>

        {/* Practice Questions Navigator */}
        {practiceMode && questions.length > 0 && (
          <div style={{ padding: '0.75rem', marginTop: '0.5rem' }}>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '0.5rem',
              paddingLeft: '0.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{questions.length} Questions</span>
              {flaggedQuestions.size > 0 && (
                <span style={{ color: '#fca5a5', fontSize: '0.6rem' }}>
                  {flaggedQuestions.size} flagged
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              {questions.map((question, index) => {
                const isAnswered = results.some(r => r.questionId === question.id);
                const isCorrect = results.find(r => r.questionId === question.id)?.correct;
                const isCurrent = index === currentQuestionIndex;
                const isFlagged = flaggedQuestions.has(index);

                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: isCurrent ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      borderLeft: isCurrent ? '2px solid #60a5fa' : '2px solid transparent',
                      borderRadius: '4px',
                      padding: '0.3rem 0.35rem 0.3rem 0.2rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <button
                      onClick={() => onQuestionClick && onQuestionClick(index)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.15rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.parentElement.style.background = 'rgba(255, 255, 255, 0.08)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCurrent) {
                          e.currentTarget.parentElement.style.background = 'transparent';
                        }
                      }}
                    >
                      <div style={{
                        width: '22px',
                        height: '22px',
                        minWidth: '22px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        background: isAnswered
                          ? (isCorrect ? '#059669' : '#dc2626')
                          : (isCurrent ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'),
                        color: '#ffffff'
                      }}>
                        {isAnswered
                          ? (isCorrect ? '✓' : '✗')
                          : (index + 1)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '0.75rem',
                          fontWeight: isCurrent ? '600' : '400',
                          color: isCurrent ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          Q{index + 1}
                        </div>
                      </div>
                    </button>
                    {/* Flag icon - only show if flagged */}
                    {isFlagged && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onFlagToggle && onFlagToggle(index);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.15rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fca5a5',
                          transition: 'color 0.2s ease'
                        }}
                        title="Remove flag"
                      >
                        <HiFlag size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLessonsNavigator;
