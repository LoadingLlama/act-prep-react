/**
 * OnboardingQuestionnaire Component
 * Interactive questionnaire for new users to complete before accessing the course
 */

import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { onboardingUtils } from '../../utils/helpers';

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    background: '#ffffff',
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
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle at 20% 50%, rgba(30, 64, 175, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.04) 0%, transparent 50%)',
      animation: '$float 20s ease-in-out infinite',
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
    background: '#ffffff',
    padding: '3rem',
    maxWidth: '600px',
    width: '100%',
    position: 'relative',
    zIndex: 1
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: '#f3f4f6',
    zIndex: 1000
  },
  progressFill: {
    height: '100%',
    background: '#1e40af',
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
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1e40af',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.5rem'
  },
  questionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1rem',
    lineHeight: '1.2'
  },
  questionSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
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
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    '&:focus': {
      borderColor: '#1e40af',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)'
    }
  },
  select: {
    width: '100%',
    padding: '1rem 1.25rem',
    fontSize: '1.1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    background: '#ffffff',
    cursor: 'pointer',
    '&:focus': {
      borderColor: '#1e40af',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)'
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
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
    background: '#ffffff',
    '&:hover': {
      borderColor: '#1e40af'
    },
    '&.selected': {
      borderColor: '#1e40af',
      background: '#1e40af',
      color: '#ffffff'
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
    flex: 1,
    padding: '0.875rem 2rem',
    fontSize: '0.95rem',
    fontWeight: '500',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    '&.primary': {
      background: '#1e40af',
      color: '#ffffff',
      borderColor: '#1e40af',
      '&:hover': {
        background: '#5568d3'
      },
      '&:disabled': {
        opacity: 0.4,
        cursor: 'not-allowed'
      }
    },
    '&.secondary': {
      background: '#ffffff',
      color: '#6b7280',
      '&:hover': {
        background: '#f9fafb'
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
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#1e40af'
    },
    '&.selected': {
      borderColor: '#1e40af',
      background: '#f9fafb'
    }
  },
  checkboxInput: {
    width: '20px',
    height: '20px',
    accentColor: '#1e40af'
  },
  checkboxLabel: {
    fontSize: '1rem',
    color: '#1a1a1a',
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
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1rem'
  },
  completionSubtitle: {
    fontSize: '1.1rem',
    color: '#64748b',
    marginBottom: '2.5rem'
  }
});

const OnboardingQuestionnaire = ({ userId, onComplete, showDiagnosticScreen = false }) => {
  const classes = useStyles();
  // If showDiagnosticScreen is true, skip to completion screen (step 6)
  const [currentStep, setCurrentStep] = useState(showDiagnosticScreen ? 6 : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answers, setAnswers] = useState({
    testDate: '',
    grade: '',
    targetScore: '',
    studyTimePerWeek: '',
    concernedSections: [],
    studyExperience: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedAnswers = onboardingUtils.getAnswers();
    if (savedAnswers) {
      setAnswers(savedAnswers);
      console.log('📋 Loaded onboarding answers from localStorage');
    }
  }, []);

  // Save to localStorage whenever answers change
  useEffect(() => {
    if (Object.values(answers).some(v => v && v.length > 0)) {
      onboardingUtils.saveAnswers(answers);
      console.log('💾 Saved answers to localStorage');
    }
  }, [answers]);

  const questions = [
    {
      id: 'testDate',
      type: 'date',
      title: "When is your ACT test?",
      subtitle: "This helps us create a personalized study schedule for you.",
      placeholder: "Select your test date",
      allowSkip: true,
      skipValue: 'not-scheduled'
    },
    {
      id: 'grade',
      type: 'select',
      title: "What grade are you in?",
      subtitle: "Understanding your grade level helps us tailor the content.",
      options: [
        { value: '9', label: '9th Grade', subtitle: 'Freshman' },
        { value: '10', label: '10th Grade', subtitle: 'Sophomore' },
        { value: '11', label: '11th Grade', subtitle: 'Junior' },
        { value: '12', label: '12th Grade', subtitle: 'Senior' }
      ]
    },
    {
      id: 'targetScore',
      type: 'select',
      title: "What's your target ACT score?",
      subtitle: "We'll help you reach your goal with a customized plan.",
      options: [
        { value: '20-24', label: '20-24', subtitle: 'Good' },
        { value: '25-29', label: '25-29', subtitle: 'Great' },
        { value: '30-33', label: '30-33', subtitle: 'Excellent' },
        { value: '34-36', label: '34-36', subtitle: 'Perfect' }
      ]
    },
    {
      id: 'studyTimePerWeek',
      type: 'select',
      title: "How much time can you study per week?",
      subtitle: "Be realistic - consistency matters more than quantity.",
      options: [
        { value: '2-4', label: '2-4 hours', subtitle: 'Light prep' },
        { value: '5-7', label: '5-7 hours', subtitle: 'Moderate prep' },
        { value: '8-10', label: '8-10 hours', subtitle: 'Intensive prep' },
        { value: '10+', label: '10+ hours', subtitle: 'Maximum prep' }
      ]
    },
    {
      id: 'concernedSections',
      type: 'checkbox',
      title: "Which sections concern you most?",
      subtitle: "Select all that apply. We'll focus extra attention here.",
      options: [
        { value: 'english', label: 'English' },
        { value: 'math', label: 'Math' },
        { value: 'reading', label: 'Reading' },
        { value: 'science', label: 'Science' }
      ]
    },
    {
      id: 'studyExperience',
      type: 'select',
      title: "Have you studied for the ACT before?",
      subtitle: "Your experience level helps us pace the content.",
      options: [
        { value: 'never', label: 'First time', subtitle: 'New to ACT prep' },
        { value: 'some', label: 'Some prep', subtitle: 'Studied a little' },
        { value: 'extensive', label: 'Extensive prep', subtitle: 'Studied a lot' }
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isComplete = currentStep >= questions.length;

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxToggle = (questionId, value) => {
    setAnswers(prev => {
      const current = prev[questionId] || [];
      const newValue = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [questionId]: newValue };
    });
  };

  const canProceed = () => {
    const answer = answers[currentQuestion?.id];
    if (currentQuestion?.type === 'checkbox') {
      // Checkbox: at least one option must be selected
      return answer && Array.isArray(answer) && answer.length > 0;
    }
    if (currentQuestion?.type === 'select') {
      // Select: a valid option must be chosen
      return answer && typeof answer === 'string' && answer.length > 0;
    }
    if (currentQuestion?.type === 'date') {
      // Date: either a valid date or can be skipped
      if (currentQuestion.allowSkip && answer === currentQuestion.skipValue) {
        return true;
      }
      return answer && typeof answer === 'string' && answer.length > 0;
    }
    return false;
  };

  const handleSkip = () => {
    if (currentQuestion?.allowSkip) {
      handleAnswer(currentQuestion.id, currentQuestion.skipValue);
      // Auto-advance after skipping
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleSkipAll = () => {
    // Skip entire onboarding and diagnostic
    onComplete({}, false);
  };

  const handleNext = () => {
    if (!canProceed()) return;

    // Transition to next question or completion screen
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsTransitioning(false);
    }, 150);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsTransitioning(false);
    }, 150);
  };

  const renderInput = () => {
    switch (currentQuestion.type) {
      case 'date':
        return (
          <div className={classes.inputGroup}>
            <input
              type="date"
              className={classes.input}
              value={answers[currentQuestion.id] === 'not-scheduled' ? '' : (answers[currentQuestion.id] || '')}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            {currentQuestion.allowSkip && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={handleSkip}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: '0.5rem'
                  }}
                >
                  Not planning on taking yet
                </button>
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <div className={classes.optionsGrid}>
            {currentQuestion.options.map((option) => (
              <div
                key={option.value}
                className={`${classes.optionCard} ${answers[currentQuestion.id] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
              >
                <div className={classes.optionTitle}>{option.label}</div>
                <div className={classes.optionSubtitle}>{option.subtitle}</div>
              </div>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className={classes.checkboxGroup}>
            {currentQuestion.options.map((option) => {
              const isSelected = (answers[currentQuestion.id] || []).includes(option.value);
              return (
                <div
                  key={option.value}
                  className={`${classes.checkbox} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCheckboxToggle(currentQuestion.id, option.value)}
                >
                  <input
                    type="checkbox"
                    className={classes.checkboxInput}
                    checked={isSelected}
                    onChange={() => {}}
                  />
                  <label className={classes.checkboxLabel}>{option.label}</label>
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  const handleStartDiagnostic = () => {
    // If no userId, trigger signup flow first
    if (!userId) {
      onComplete(answers, 'signup'); // Trigger signup, will show diagnostic after
    } else {
      onComplete(answers, true); // Pass true to indicate diagnostic should start
    }
  };

  const handleSkipDiagnostic = () => {
    onComplete(answers, false); // Pass false to skip diagnostic
  };

  if (isComplete) {
    // Show diagnostic screen for both authenticated and non-authenticated users
    // For non-authenticated users, clicking "Begin Test" will trigger signup

    // If userId exists, show diagnostic screen (authenticated flow)
    return (
      <div className={classes.container}>
        <div className={classes.progressBar}>
          <div className={classes.progressFill} style={{ width: '100%' }} />
        </div>
        <div className={classes.card}>
          <div className={classes.completionScreen}>
            <div className={classes.completionIcon}>🎯</div>
            <div className={classes.completionTitle}>Your Diagnostic Assessment</div>
            <div className={classes.completionSubtitle}>
              Now that we know your goals, let's measure your current skill level. Your diagnostic assessment will:
            </div>
            <div style={{
              textAlign: 'left',
              maxWidth: '500px',
              margin: '1.5rem auto',
              padding: '0 1rem'
            }}>
              <div style={{
                marginBottom: '0.75rem',
                fontSize: '0.95rem',
                color: '#374151',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#1e40af', fontWeight: '600' }}>•</span>
                <span>Evaluate your proficiency across all four ACT sections</span>
              </div>
              <div style={{
                marginBottom: '0.75rem',
                fontSize: '0.95rem',
                color: '#374151',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#1e40af', fontWeight: '600' }}>•</span>
                <span>Identify your strengths and areas for improvement</span>
              </div>
              <div style={{
                marginBottom: '0.75rem',
                fontSize: '0.95rem',
                color: '#374151',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#1e40af', fontWeight: '600' }}>•</span>
                <span>Generate your personalized study plan and curriculum</span>
              </div>
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#64748b',
              marginBottom: '2rem',
              fontStyle: 'italic'
            }}>
              Estimated time: 30 minutes
            </div>
            <div className={classes.buttonGroup} style={{ marginTop: '0' }}>
              <button
                className={`${classes.button} primary`}
                onClick={handleStartDiagnostic}
              >
                Begin Diagnostic Assessment
              </button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={handleSkipDiagnostic}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: '0.5rem'
                }}
              >
                I'll do this later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.progressBar}>
          <div className={classes.progressFill} style={{ width: `${progress}%` }} />
        </div>

        <div className={classes.question} style={{ animation: isTransitioning ? 'fadeOut 0.15s ease-in-out forwards' : undefined }}>
          <div className={classes.questionNumber}>
            Question {currentStep + 1} of {questions.length}
          </div>
          <div className={classes.questionTitle}>{currentQuestion.title}</div>
          <div className={classes.questionSubtitle}>{currentQuestion.subtitle}</div>

          {renderInput()}

          <div className={classes.buttonGroup}>
            {currentStep > 0 && (
              <button
                className={`${classes.button} secondary`}
                onClick={handleBack}
              >
                Back
              </button>
            )}
            <button
              className={`${classes.button} primary`}
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* Global Skip Button */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 10
      }}>
        <button
          type="button"
          onClick={handleSkipAll}
          style={{
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            fontSize: '0.85rem',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: '0.5rem',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#6b7280'}
          onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
        >
          I'll do this later
        </button>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
