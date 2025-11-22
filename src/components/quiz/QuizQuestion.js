/**
 * Quiz Question Component
 * Displays a single quiz question with options
 */

import React from 'react';
import { questionStyles } from '../../styles/quiz.styles';
import { sanitizeHTML } from '../../utils/security';

const QuizQuestion = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerClick
}) => {
  // Safety check: ensure question and options exist
  if (!question || !question.options || !Array.isArray(question.options)) {
    console.error('QuizQuestion: Invalid question data', question);
    return (
      <div style={questionStyles.container}>
        <p style={{ color: '#ef4444', padding: '1rem' }}>
          Error: Question data is invalid or missing.
        </p>
      </div>
    );
  }

  return (
    <div style={questionStyles.container}>
      <h3
        style={questionStyles.questionText}
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(question.text || 'Question text missing') }}
      />

      <div style={questionStyles.optionsContainer}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = option.isCorrect;
          const showCorrect = showResult && isCorrect;
          const showIncorrect = showResult && isSelected && !isCorrect;

          return (
            <div
              key={index}
              style={{
                ...questionStyles.option,
                ...(isSelected && !showResult && questionStyles.optionSelected),
                ...(showCorrect && questionStyles.optionCorrect),
                ...(showIncorrect && questionStyles.optionIncorrect),
                cursor: showResult ? 'default' : 'pointer'
              }}
              onClick={() => !showResult && onAnswerClick(index)}
            >
              <div style={questionStyles.optionContent}>
                <span style={questionStyles.optionLabel}>
                  {String.fromCharCode(65 + index)}.
                </span>
                <span
                  style={questionStyles.optionText}
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(option.text) }}
                />
              </div>

              {showResult && (
                <div style={questionStyles.feedback}>
                  {isCorrect && (
                    <span style={questionStyles.correctIcon}>✓</span>
                  )}
                  {isSelected && !isCorrect && (
                    <span style={questionStyles.incorrectIcon}>✗</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showResult && selectedAnswer !== null && question.options[selectedAnswer] && (
        <div style={questionStyles.explanation}>
          {question.options[selectedAnswer].explanation || 'No explanation available.'}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;