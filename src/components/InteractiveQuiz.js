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
        <h3>{quizData.title} - Results</h3>

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
      {/* Clean compact title */}
      <div style={{
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#1a73e8',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {quizData.title}
      </div>

      <div className={classes.quizContainer}>
        <div className={classes.quizQuestion}>
          {/* Compact question number */}
          <div style={{
            fontSize: '0.85rem',
            fontWeight: '500',
            color: '#666',
            marginBottom: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{currentQuestion + 1}.</span>
            <span style={{ fontSize: '0.75rem' }}>Score: {score}/{quizData.questions.length}</span>
          </div>

          <p className={classes.questionText} dangerouslySetInnerHTML={{ __html: question.text }} />

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
                    gap: '1rem',
                    padding: '0.75rem 0',
                    cursor: hasAnswered ? 'default' : 'pointer',
                    alignItems: 'flex-start',
                    borderLeft: showFeedback && isSelected && isCorrectAnswer ? '3px solid #48bb78' :
                                showFeedback && isSelected && !isCorrectAnswer ? '3px solid #f56565' :
                                showFeedback && !isSelected && isCorrectAnswer ? '3px solid #48bb78' : 'none',
                    paddingLeft: showFeedback ? '0.75rem' : '0',
                    backgroundColor: showFeedback && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.05)' :
                                     showFeedback && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.05)' :
                                     showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.05)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Radio button / letter circle */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    borderRadius: '50%',
                    border: isSelected && !showFeedback ? '2px solid #1a73e8' :
                            showFeedback && isSelected && isCorrectAnswer ? '2px solid #48bb78' :
                            showFeedback && isSelected && !isCorrectAnswer ? '2px solid #f56565' :
                            showFeedback && !isSelected && isCorrectAnswer ? '2px solid #48bb78' : '2px solid #cbd5e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    color: isSelected && !showFeedback ? '#1a73e8' :
                            showFeedback && isSelected && isCorrectAnswer ? '#48bb78' :
                            showFeedback && isSelected && !isCorrectAnswer ? '#f56565' :
                            showFeedback && !isSelected && isCorrectAnswer ? '#48bb78' : '#718096',
                    backgroundColor: isSelected && !showFeedback ? 'rgba(26, 115, 232, 0.1)' :
                                     showFeedback && isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.1)' :
                                     showFeedback && isSelected && !isCorrectAnswer ? 'rgba(245, 101, 101, 0.1)' :
                                     showFeedback && !isSelected && isCorrectAnswer ? 'rgba(72, 187, 120, 0.1)' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}>
                    {showFeedback && isSelected && isCorrectAnswer ? '✓' :
                     showFeedback && isSelected && !isCorrectAnswer ? '✗' :
                     showFeedback && !isSelected && isCorrectAnswer ? '✓' : letter}
                  </div>

                  {/* Option text and explanation */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '1.05rem',
                      color: '#2d3748',
                      lineHeight: '1.6',
                      marginBottom: showFeedback ? '0.5rem' : '0'
                    }}>
                      {option.text}
                    </div>
                    {showFeedback && (
                      <div style={{
                        fontSize: '0.85rem',
                        color: isSelected && isCorrectAnswer ? '#2f855a' :
                               isSelected && !isCorrectAnswer ? '#c53030' :
                               !isSelected && isCorrectAnswer ? '#2f855a' : '#666',
                        lineHeight: '1.4',
                        fontStyle: 'italic'
                      }}>
                        {option.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
            opacity: !hasAnswered ? 0.5 : 1,
            fontWeight: '600'
          }}
        >
          {currentQuestion === quizData.questions.length - 1 ? 'Finish →' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default InteractiveQuiz;