import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    marginTop: '1rem',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
    background: '#ffffff'
  },
  answerStatus: {
    padding: '0.875rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    '&.not-answered': {
      background: '#fef3c7',
      borderBottom: '1px solid #fde68a'
    },
    '&.incorrect': {
      background: '#fee2e2',
      borderBottom: '1px solid #fecaca'
    },
    '&.correct': {
      background: '#d1fae5',
      borderBottom: '1px solid #a7f3d0'
    }
  },
  statusIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '600',
    '&.not-answered': {
      background: '#f59e0b',
      color: '#fff'
    },
    '&.incorrect': {
      background: '#ef4444',
      color: '#fff'
    },
    '&.correct': {
      background: '#10b981',
      color: '#fff'
    }
  },
  statusText: {
    flex: 1,
    color: '#1f2937',
    '& strong': {
      fontWeight: '600'
    }
  },
  explanationSection: {
    padding: '1rem'
  },
  explanationHeader: {
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#6b7280',
    marginBottom: '0.75rem'
  },
  mainExplanation: {
    fontSize: '0.9375rem',
    lineHeight: '1.6',
    color: '#374151',
    marginBottom: '1.25rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  wrongAnswersHeader: {
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '0.625rem'
  },
  wrongAnswer: {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    color: '#4b5563',
    marginBottom: '0.5rem',
    paddingLeft: '1rem',
    position: 'relative',
    '&:last-child': {
      marginBottom: 0
    },
    '&::before': {
      content: '"•"',
      position: 'absolute',
      left: '0',
      color: '#9ca3af',
      fontWeight: '600'
    },
    '& strong': {
      color: '#1f2937',
      fontWeight: '600'
    }
  }
});

/**
 * QuestionExplanation Component
 * Displays the answer status and explanation for a diagnostic test question
 *
 * @param {Object} props
 * @param {string} props.userAnswer - The user's selected answer (e.g., "A", "B", null)
 * @param {string} props.correctAnswer - The correct answer letter
 * @param {string} props.explanation - HTML explanation string from database
 */
const QuestionExplanation = ({ userAnswer, correctAnswer, explanation }) => {
  const classes = useStyles();

  // Determine status
  const isCorrect = userAnswer === correctAnswer;
  const isAnswered = userAnswer !== null && userAnswer !== undefined;
  const status = !isAnswered ? 'not-answered' : isCorrect ? 'correct' : 'incorrect';

  // Parse explanation HTML
  const parseExplanation = (htmlString) => {
    if (!htmlString) return { main: '', wrongAnswers: [] };

    // Extract main explanation
    const mainMatch = htmlString.match(/<div[^>]*>([^<]+(?:<[^>]+>[^<]*<\/[^>]+>)*[^<]*)<\/div>/);
    const main = mainMatch ? mainMatch[1].trim() : '';

    // Extract wrong answers
    const wrongAnswersSection = htmlString.split('Why Other Answers Are Wrong:')[1] || '';
    const wrongAnswerMatches = wrongAnswersSection.matchAll(/<strong>Choice ([A-K]):<\/strong>\s*([^<]+)/g);
    const wrongAnswers = Array.from(wrongAnswerMatches).map(match => ({
      choice: match[1],
      reason: match[2].trim()
    }));

    return { main, wrongAnswers };
  };

  const { main, wrongAnswers } = parseExplanation(explanation);

  // Status messages
  const getStatusMessage = () => {
    if (!isAnswered) {
      return <><strong>Not Answered</strong> · Correct answer: <strong>{correctAnswer}</strong></>;
    }
    if (isCorrect) {
      return <><strong>Correct!</strong> · Your answer: <strong>{userAnswer}</strong></>;
    }
    return <>
      <strong>Incorrect</strong> · Your answer: <strong style={{ textDecoration: 'line-through' }}>{userAnswer}</strong> · Correct: <strong>{correctAnswer}</strong>
    </>;
  };

  const getStatusIcon = () => {
    if (!isAnswered) return '?';
    if (isCorrect) return '✓';
    return '✗';
  };

  return (
    <div className={classes.container}>
      {/* Answer Status */}
      <div className={`${classes.answerStatus} ${status}`}>
        <div className={`${classes.statusIcon} ${status}`}>
          {getStatusIcon()}
        </div>
        <div className={classes.statusText}>
          {getStatusMessage()}
        </div>
      </div>

      {/* Explanation */}
      {explanation && (
        <div className={classes.explanationSection}>
          <div className={classes.explanationHeader}>Explanation</div>

          {main && (
            <div className={classes.mainExplanation}>
              {main}
            </div>
          )}

          {wrongAnswers.length > 0 && (
            <>
              <div className={classes.wrongAnswersHeader}>
                Why Other Answers Are Wrong:
              </div>
              {wrongAnswers.map((wa, idx) => (
                <div key={idx} className={classes.wrongAnswer}>
                  <strong>Choice {wa.choice}:</strong> {wa.reason}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionExplanation;
