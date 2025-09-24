import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  interactiveQuiz: {
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    padding: '1.5rem',
    margin: '2rem 0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '&.final-quiz': {
      border: '2px solid #1a73e8',
      backgroundColor: '#f8faff'
    }
  },
  quizProgress: {
    marginBottom: '1.5rem'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1a73e8',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '0.9rem',
    color: '#4a5568',
    textAlign: 'center',
    fontWeight: '500'
  },
  quizContainer: {
    marginBottom: '2rem'
  },
  quizQuestion: {
    marginBottom: '1.5rem'
  },
  questionText: {
    fontSize: '1.1rem',
    color: '#2d3748',
    marginBottom: '1rem',
    lineHeight: '1.6',
    fontWeight: '500'
  },
  quizOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    marginBottom: '1rem'
  },
  quizOption: {
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#2d3748',
    cursor: 'pointer',
    fontSize: '1rem',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#1a73e8',
      backgroundColor: '#f8faff'
    },
    '&.selected': {
      borderColor: '#1a73e8',
      backgroundColor: '#f0f8ff'
    },
    '&.correct': {
      borderColor: '#48bb78',
      backgroundColor: '#f0fff4',
      color: '#2f855a'
    },
    '&.incorrect': {
      borderColor: '#f56565',
      backgroundColor: '#fffafa',
      color: '#c53030'
    },
    '&:disabled': {
      cursor: 'not-allowed'
    }
  },
  quizFeedback: {
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1rem',
    marginTop: '1rem'
  },
  feedbackText: {
    color: '#4a5568',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    margin: 0
  },
  quizNavigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '1rem'
  },
  navButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&.prev': {
      backgroundColor: '#f7fafc',
      color: '#4a5568',
      border: '1px solid #e2e8f0',
      '&:hover': {
        backgroundColor: '#edf2f7'
      }
    },
    '&.next': {
      backgroundColor: '#1a73e8',
      color: 'white',
      '&:hover': {
        backgroundColor: '#2c5aa0'
      }
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  quizScoreInline: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a73e8'
  },
  quizResults: {
    textAlign: 'center'
  },
  quizScore: {
    backgroundColor: '#f8faff',
    border: '2px solid #1a73e8',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '1.5rem',
    '&.final-score': {
      backgroundColor: '#f0f8ff'
    }
  },
  finalScoreText: {
    fontSize: '1.5rem',
    color: '#2d3748',
    marginBottom: '1rem',
    '& span': {
      color: '#1a73e8',
      fontWeight: '700',
      fontSize: '1.8rem'
    }
  },
  scoreMessage: {
    padding: '1rem',
    borderRadius: '8px',
    margin: '1rem 0',
    fontWeight: '600',
    '&.master': {
      backgroundColor: '#f0fff4',
      color: '#2f855a',
      border: '2px solid #48bb78'
    },
    '&.proficient': {
      backgroundColor: '#f0f8ff',
      color: '#1a73e8',
      border: '2px solid #1a73e8'
    },
    '&.developing': {
      backgroundColor: '#fffbf0',
      color: '#d69e2e',
      border: '2px solid #ed8936'
    },
    '&.needs-work': {
      backgroundColor: '#fffafa',
      color: '#c53030',
      border: '2px solid #f56565'
    }
  },
  quizActions: {
    marginTop: '1.5rem'
  },
  resetQuiz: {
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#2c5aa0'
    }
  },
  masteryLevels: {
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem',
    textAlign: 'left',
    '& h4': {
      color: '#2d3748',
      marginBottom: '1rem'
    },
    '& ul': {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    '& li': {
      padding: '0.5rem 0',
      color: '#4a5568',
      '& strong': {
        color: '#1a73e8'
      },
      '& em': {
        color: '#2d3748',
        fontWeight: '600'
      }
    }
  },
  quizIntro: {
    color: '#4a5568',
    fontSize: '1rem',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  }
});

const InteractiveQuiz = ({ quizData, quizId, isFinal = false, onComplete }) => {
  const classes = useStyles();
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
  const currentFeedback = feedback[currentQuestion];

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
            {question.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className={`${classes.quizOption} ${currentAnswer === option.text ? 'selected' : ''} ${
                  currentAnswer === option.text ? (option.isCorrect ? 'correct' : 'incorrect') : ''
                }`}
                disabled={hasAnswered}
                onClick={() => handleAnswer(option.text, option.isCorrect, option.explanation)}
              >
                {option.text}
              </button>
            ))}
          </div>

          {currentFeedback && (
            <div className={classes.quizFeedback}>
              <p className={classes.feedbackText}>{currentFeedback}</p>
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