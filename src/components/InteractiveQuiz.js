import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { useInteractiveQuizStyles } from './InteractiveQuiz.styles';

const InteractiveQuiz = ({ quizData, quizId, isFinal = false, onComplete }) => {
  const classes = useInteractiveQuizStyles();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showMastery, setShowMastery] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

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
      if (isFinal) {
        setShowMastery(true);
      }
      if (onComplete) {
        setTimeout(() => onComplete(), 500);
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
      <h3>{quizData.title}</h3>
      <p className={classes.quizIntro}>{quizData.intro}</p>

      {/* Progress indicator */}
      <div className={classes.quizProgress}>
        <div className={classes.progressBar}>
          <div
            className={classes.progressFill}
            style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
          />
        </div>
        <p className={classes.progressText}>
          Question {currentQuestion + 1} of {quizData.questions.length}
        </p>
      </div>

      <div className={classes.quizContainer}>
        <div className={classes.quizQuestion}>
          <p className={classes.questionText} dangerouslySetInnerHTML={{ __html: question.text }} />

          <div className={classes.quizOptions}>
            {question.options.map((option, optionIndex) => {
              let optionClass = classes.quizOption;

              if (hasAnswered) {
                if (currentAnswer === option.text) {
                  // This is the user's selected answer
                  optionClass += option.isCorrect ? ' correct' : ' incorrect';
                } else if (option.isCorrect) {
                  // This is the correct answer (not selected by user)
                  optionClass += ' not-selected-correct';
                }
              } else if (currentAnswer === option.text) {
                // User selected but hasn't submitted yet
                optionClass += ' selected';
              }

              return (
                <div key={optionIndex} style={{ marginBottom: '0.5rem' }}>
                  <button
                    className={optionClass}
                    disabled={hasAnswered && currentAnswer === option.text}
                    onClick={() => {
                      if (!hasAnswered) {
                        handleAnswer(option.text, option.isCorrect, option.explanation);
                      }
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontWeight: '500' }}>{option.text}</span>
                    {hasAnswered && (
                      <span style={{
                        fontSize: '0.8rem',
                        opacity: 0.8,
                        lineHeight: '1.3'
                      }}>
                        {option.explanation}
                      </span>
                    )}
                  </button>
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
        >
          ← Previous
        </button>

        <div className={classes.quizScoreInline}>
          Score: {score}/{quizData.questions.length}
        </div>

        <button
          className={`${classes.navButton} next`}
          onClick={nextQuestion}
          disabled={!hasAnswered}
        >
          {currentQuestion === quizData.questions.length - 1 ? 'Finish Quiz →' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default InteractiveQuiz;