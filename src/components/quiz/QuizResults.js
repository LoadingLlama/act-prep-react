/**
 * Quiz Results Component
 * Displays the quiz completion results
 */

import React from 'react';
import { resultsStyles } from '../../styles/quiz.styles';

const QuizResults = ({
  score,
  total,
  title,
  onRetry
}) => {
  const percentage = Math.round((score / total) * 100);

  // Determine performance level
  let performanceLevel;
  let performanceMessage;
  let performanceColor;

  if (percentage >= 90) {
    performanceLevel = 'Excellent!';
    performanceMessage = 'Outstanding performance! You have mastered this material.';
    performanceColor = '#00c851';
  } else if (percentage >= 70) {
    performanceLevel = 'Good Job!';
    performanceMessage = 'Nice work! You have a solid understanding.';
    performanceColor = '#007aff';
  } else if (percentage >= 50) {
    performanceLevel = 'Keep Practicing';
    performanceMessage = 'You\'re getting there! Review the material and try again.';
    performanceColor = '#ff9500';
  } else {
    performanceLevel = 'Review Needed';
    performanceMessage = 'Take some time to review the lesson before trying again.';
    performanceColor = '#ff3b30';
  }

  return (
    <div style={resultsStyles.container}>
      <div style={resultsStyles.card}>
        <h2 style={resultsStyles.title}>Quiz Complete!</h2>

        {title && (
          <p style={resultsStyles.quizTitle}>{title}</p>
        )}

        <div style={resultsStyles.scoreContainer}>
          <div
            style={{
              ...resultsStyles.scoreCircle,
              borderColor: performanceColor
            }}
          >
            <div style={resultsStyles.scoreText}>
              <span style={{ ...resultsStyles.scoreNumber, color: performanceColor }}>
                {score}
              </span>
              <span style={resultsStyles.scoreDivider}>/</span>
              <span style={resultsStyles.scoreTotal}>{total}</span>
            </div>
            <div style={{ ...resultsStyles.percentage, color: performanceColor }}>
              {percentage}%
            </div>
          </div>
        </div>

        <div style={{ ...resultsStyles.performanceLevel, color: performanceColor }}>
          {performanceLevel}
        </div>

        <p style={resultsStyles.message}>
          {performanceMessage}
        </p>

        <div style={resultsStyles.summary}>
          <div style={resultsStyles.summaryItem}>
            <span style={resultsStyles.summaryLabel}>Questions Answered:</span>
            <span style={resultsStyles.summaryValue}>{total}</span>
          </div>
          <div style={resultsStyles.summaryItem}>
            <span style={resultsStyles.summaryLabel}>Correct Answers:</span>
            <span style={resultsStyles.summaryValue}>{score}</span>
          </div>
          <div style={resultsStyles.summaryItem}>
            <span style={resultsStyles.summaryLabel}>Incorrect Answers:</span>
            <span style={resultsStyles.summaryValue}>{total - score}</span>
          </div>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            style={resultsStyles.retryButton}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizResults;