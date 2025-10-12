import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { useInteractiveQuizStyles } from './InteractiveQuiz.styles';

const InteractiveQuiz = ({ quizData, quizId, isFinal = false, onComplete, initialCompleted = false }) => {
  const classes = useInteractiveQuizStyles();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(initialCompleted);
  const [showMastery, setShowMastery] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialCompleted);

  // Reset hasAnswered when question changes
  useEffect(() => {
    setHasAnswered(!!answers[currentQuestion]);
  }, [currentQuestion, answers]);

  const handleAnswer = (selectedAnswer, isCorrect, explanation) => {
    const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
    const newFeedback = { ...feedback, [currentQuestion]: explanation };

    setAnswers(newAnswers);
    setFeedback(newFeedback);
    setHasAnswered(true);

    // Calculate score
    let newScore = 0;
    Object.keys(newAnswers).forEach(qIndex => {
      const question = quizData.questions[qIndex];
      const answer = newAnswers[qIndex];
      const option = question.options.find(opt => opt.text === answer);
      if (option && option.isCorrect) {
        newScore++;
      }
    });

    setScore(newScore);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz completed
      setShowResults(true);
      setIsCompleted(true);
      if (isFinal) {
        setShowMastery(true);
      }
      if (onComplete) {
        onComplete();
      }
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setFeedback({});
    setScore(0);
    setShowResults(false);
    setShowMastery(false);
    setHasAnswered(false);
  };


  const getMasteryMessage = () => {
    const total = quizData.questions.length;
    const percentage = score / total;

    if (percentage === 1) {
      return { message: 'Perfect! You are a Sentence Structure Master!', level: 'master' };
    } else if (percentage >= 0.7) {
      return { message: 'Great job! You are proficient in sentence structure!', level: 'proficient' };
    } else if (percentage >= 0.4) {
      return { message: 'Good progress! Review the 5 Golden Rules and try again.', level: 'developing' };
    } else {
      return { message: 'Keep practicing! Review the lesson and retake the quiz.', level: 'needs-work' };
    }
  };

  // Results view
  if (showResults) {
    return (
      <div className={`${classes.interactiveQuiz} ${isFinal ? 'final-quiz' : ''}`}>
        {/* Header - same format as quiz */}
        <div style={{
          paddingBottom: '0.75rem',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {quizData.title.replace('Practice:', 'Checkpoint:')} - Results
            {quizData.title.startsWith('Practice') && (
              <span style={{
                fontSize: '0.65rem',
                fontWeight: '400',
                color: '#6b7280',
                backgroundColor: 'transparent',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <span style={{ color: '#10b981' }}>✓</span> ACT VERIFIED
              </span>
            )}
          </div>
        </div>

        <div className={classes.quizResults}>
          <div className={`${classes.quizScore} ${isFinal ? 'final-score' : ''}`}>
            <h4>Quiz Complete!</h4>
            <p className={classes.finalScoreText}>Final Score: <span>{score}</span>/{quizData.questions.length}</p>

            {isFinal && showMastery && (
              <div className={`${classes.scoreMessage} ${getMasteryMessage().level}`}>
                {getMasteryMessage().message}
              </div>
            )}

            <div className={classes.quizActions}>
              <button className={classes.resetQuiz} onClick={resetQuiz}>
                {isFinal ? 'Retake Test' : 'Try Again'}
              </button>
            </div>
          </div>

          {isFinal && (
            <div className={classes.masteryLevels}>
              <h4>Mastery Levels:</h4>
              <ul>
                <li><strong>7/7:</strong> <em>Master!</em> You've conquered sentence structure!</li>
                <li><strong>5-6/7:</strong> <em>Proficient!</em> Review missed concepts and you're ready!</li>
                <li><strong>3-4/7:</strong> <em>Developing!</em> Focus on the 5 Golden Rules</li>
                <li><strong>0-2/7:</strong> <em>Needs Work!</em> Review the lesson and try again</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  return (
    <div className={`${classes.interactiveQuiz} ${isFinal ? 'final-quiz' : ''}`}>
      {/* Header with title, badge, question number, and score all on one line */}
      <div style={{
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Left: Question number */}
        <div style={{
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#666'
        }}>
          {currentQuestion + 1}.
        </div>

        {/* Center: Title and badge */}
        <div style={{
          fontSize: '0.95rem',
          fontWeight: '600',
          color: '#9ca3af',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          flex: 1
        }}>
          {quizData.title.replace('Practice:', 'Checkpoint:')}
          {quizData.title.startsWith('Practice') && (
            <span style={{
              fontSize: '0.65rem',
              fontWeight: '400',
              color: '#6b7280',
              backgroundColor: 'transparent',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <span style={{ color: '#10b981' }}>✓</span> ACT VERIFIED
            </span>
          )}
        </div>

        {/* Right: Score */}
        <div style={{
          fontSize: '0.75rem',
          fontWeight: '500',
          color: '#666'
        }}>
          Score: {score}/{quizData.questions.length}
        </div>
      </div>

      <div className={classes.quizContainer}>
        <div className={classes.quizQuestion}>

          <p
            className={classes.questionText}
            style={{
              fontSize: '16px',
              fontFamily: '"Times New Roman", Times, Georgia, serif',
              lineHeight: '1.7',
              marginBottom: '2.5rem',
              letterSpacing: '0.01em'
            }}
            dangerouslySetInnerHTML={{ __html: question.text }}
          />

          {/* Vertical answer choices - compact format matching examples */}
          <div className={classes.quizOptions}>
            {question.options.map((option, optionIndex) => {
              const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
              const letter = letters[optionIndex];

              const isSelected = currentAnswer === option.text;
              const isCorrectAnswer = option.isCorrect;
              const showFeedback = hasAnswered;

              return (
                <div
                  key={optionIndex}
                  onClick={() => {
                    if (!hasAnswered) {
                      handleAnswer(option.text, option.isCorrect, option.explanation);
                    }
                  }}
                  style={{
                    display: 'flex',
                    gap: '0.8rem',
                    padding: '0.35rem 0',
                    cursor: hasAnswered ? 'default' : 'pointer',
                    alignItems: 'center',
                    borderLeft: showFeedback && isSelected && isCorrectAnswer ? '3px solid #48bb78' :
                                showFeedback && isSelected && !isCorrectAnswer ? '3px solid #f56565' :
                                showFeedback && !isSelected && isCorrectAnswer ? '3px solid #48bb78' : 'none',
                    paddingLeft: showFeedback && (isSelected || isCorrectAnswer) ? '0.6rem' : '0',
                    backgroundColor: showFeedback && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.05)' :
                                     showFeedback && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.05)' :
                                     showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.05)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Circular letter indicator */}
                  <div style={{
                    width: '22px',
                    height: '22px',
                    minWidth: '22px',
                    borderRadius: '50%',
                    border: isSelected && !showFeedback ? '2px solid #10b981' :
                            showFeedback && isSelected && isCorrectAnswer ? '2px solid #48bb78' :
                            showFeedback && isSelected && !isCorrectAnswer ? '2px solid #f56565' :
                            showFeedback && !isSelected && isCorrectAnswer ? '2px solid #48bb78' : '2px solid #cbd5e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '0.65rem',
                    color: isSelected && !showFeedback ? '#10b981' :
                            showFeedback && isSelected && isCorrectAnswer ? '#48bb78' :
                            showFeedback && isSelected && !isCorrectAnswer ? '#f56565' :
                            showFeedback && !isSelected && isCorrectAnswer ? '#48bb78' : '#718096',
                    backgroundColor: isSelected && !showFeedback ? 'rgba(16, 185, 129, 0.1)' :
                                     showFeedback && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.1)' :
                                     showFeedback && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.1)' :
                                     showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.1)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}>
                    {showFeedback && isSelected && isCorrectAnswer ? '✓' :
                     showFeedback && isSelected && !isCorrectAnswer ? '✗' :
                     showFeedback && !isSelected && isCorrectAnswer ? '✓' : letter}
                  </div>

                  {/* Option text */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.95rem',
                      color: '#2d3748',
                      lineHeight: '1.5',
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      letterSpacing: '0.01em'
                    }}>
                      {option.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show explanation after answering - Photomath style */}
          {hasAnswered && feedback[currentQuestion] && (
            <div style={{
              marginTop: '2rem',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              <p style={{
                margin: '0 0 0.8rem 0',
                fontSize: '0.85rem',
                color: '#6b7280',
                fontWeight: '500',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Explanation
              </p>
              <div style={{
                background: '#f9fafb',
                borderRadius: '8px',
                padding: '1.25rem',
                borderLeft: '3px solid #3b82f6',
                fontSize: '0.95rem',
                lineHeight: '1.7',
                color: '#374151'
              }}
              dangerouslySetInnerHTML={{ __html: feedback[currentQuestion] }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className={classes.quizNavigation}>
        <button
          className={`${classes.navButton} prev`}
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          style={{ opacity: currentQuestion === 0 ? 0.3 : 1 }}
        >
          ← Previous
        </button>

        <button
          className={`${classes.navButton} next`}
          onClick={nextQuestion}
          disabled={!hasAnswered}
          style={{
            opacity: !hasAnswered ? 0.5 : 1
          }}
        >
          {currentQuestion === quizData.questions.length - 1 ? 'Finish →' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default InteractiveQuiz;