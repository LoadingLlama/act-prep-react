import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { useCompactQuizStyles } from './CompactQuizSection.styles';


  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getAnswerClassName = (answerKey) => {
    let className = classes.answerOption;

    if (selectedAnswer === answerKey) {
      className += ` ${classes.answerOptionSelected}`;
    }

    if (currentQuestionSubmitted && currentQuestion) {
      if (answerKey === currentQuestion.correct) {
        className += ` ${classes.answerOptionCorrect}`;
      } else if (selectedAnswer === answerKey && answerKey !== currentQuestion.correct) {
        className += ` ${classes.answerOptionIncorrect}`;
      }
    }

    return className;
  };

  if (allCompleted) {
    const correctCount = Array.from(submittedQuestions).filter(index => {
      const question = questions[index];
      const answer = selectedAnswers[index];
      return answer === question.correct;
    }).length;

    return (
      <div className={classes.quizContainer}>
        <div className={classes.completionMessage}>
          🎉 Quiz Complete! You answered {correctCount} out of {totalQuestions} questions correctly.
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  const isCorrect = selectedAnswer === currentQuestion.correct;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className={classes.quizContainer}>
      <div className={classes.header}>
        <div className={classes.title}>{title}</div>
        <div className={classes.progressBadge}>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
      </div>

      <div className={classes.questionCard}>
        <div
          className={classes.questionText}
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        />

        <div className={classes.answersGrid}>
          {currentQuestion.choices.map((choice, index) => {
            const answerKey = index;
            return (
              <div
                key={answerKey}
                className={getAnswerClassName(answerKey)}
                onClick={() => handleAnswerSelect(answerKey)}
              >
                <span className={classes.answerLabel}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={classes.answerText}>
                  {choice}
                </span>
              </div>
            );
          })}
        </div>

        {currentQuestionSubmitted && (
          <div className={`${classes.feedback} ${isCorrect ? classes.feedbackCorrect : classes.feedbackIncorrect}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect.'} {currentQuestion.explanation}
          </div>
        )}

        <div className={classes.actionButtons}>
          <div>
            {currentQuestionIndex > 0 && (
              <button
                className={classes.navigationButton}
                onClick={handlePrevious}
              >
                ← Previous
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!currentQuestionSubmitted ? (
              <button
                className={classes.submitButton}
                onClick={handleSubmit}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </button>
            ) : (
              currentQuestionIndex < totalQuestions - 1 && (
                <button
                  className={classes.submitButton}
                  onClick={handleNext}
                >
                  Next Question →
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactQuizSection;