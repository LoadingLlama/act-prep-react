/**
 * Quiz Question Component
 * Displays a single quiz question with options
 */

import React from 'react';
import { questionStyles } from '../../styles/quiz.styles';

const QuizQuestion = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerClick
}) => {
  return (
    <div style={questionStyles.container}>
      <h3
        style={questionStyles.questionText}
        dangerouslySetInnerHTML={{ __html: question.text }}
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
                  dangerouslySetInnerHTML={{ __html: option.text }}
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

      {showResult && selectedAnswer !== null && (
        <div style={questionStyles.explanation}>
          {question.options[selectedAnswer].explanation}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;