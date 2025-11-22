/**
 * Refactored Interactive Quiz Component
 * This component fetches quiz data from Supabase instead of using hardcoded data
 * File is under 300 lines for better maintainability
 */

import React, { useState, useEffect } from 'react';
import QuizzesService from '../../services/api/quizzes.service';
import { quizStyles } from '../../styles/quiz.styles';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import logger from '../../services/logging/logger';

const InteractiveQuizRefactored = ({
  quizId,
  lessonId,
  onComplete,
  userId
}) => {
  // State management
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load quiz data from Supabase
  useEffect(() => {
    loadQuizData();
  }, [quizId, lessonId]);

  const loadQuizData = async () => {
    setLoading(true);
    setError(null);

    try {
      let data;

      if (quizId) {
        // Load specific quiz by ID
        data = await QuizzesService.getQuizById(quizId);
      } else if (lessonId) {
        // Load all quizzes for a lesson
        const quizzes = await QuizzesService.getQuizzesByLessonId(lessonId);
        data = quizzes?.[0]; // Get the first quiz for now
      }

      if (!data) {
        throw new Error('Quiz not found');
      }

      setQuizData(data);
      logger.info('InteractiveQuiz', 'Quiz loaded', {
        quizId: data.id,
        questionCount: data.questions?.length
      });
    } catch (err) {
      logger.error('InteractiveQuiz', 'Failed to load quiz', err);
      setError('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswerClick = (answerIndex) => {
    if (showResult) return; // Don't allow changing answer after showing result

    // Safety check: ensure question and option exist
    if (!quizData?.questions?.[currentQuestion]?.options?.[answerIndex]) {
      logger.error('InteractiveQuiz', 'Invalid question or option', {
        currentQuestion,
        answerIndex
      });
      return;
    }

    setSelectedAnswer(answerIndex);
    const isCorrect = quizData.questions[currentQuestion].options[answerIndex].isCorrect;

    if (isCorrect) {
      setScore(score + 1);
    }

    // Record the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionIndex: currentQuestion,
      selectedOption: answerIndex,
      isCorrect
    };
    setAnswers(newAnswers);

    setShowResult(true);
  };

  // Move to next question
  const handleNextQuestion = () => {
    // Safety check: ensure questions array exists
    if (!quizData?.questions || !Array.isArray(quizData.questions)) {
      logger.error('InteractiveQuiz', 'Invalid quiz data in handleNextQuestion');
      return;
    }

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      completeQuiz();
    }
  };

  // Complete the quiz and save progress
  const completeQuiz = async () => {
    setQuizCompleted(true);

    // Safety check: ensure questions array exists and has items
    if (!quizData?.questions || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
      logger.error('InteractiveQuiz', 'Cannot complete quiz - invalid questions data');
      return;
    }

    const totalQuestions = quizData.questions.length;

    if (userId) {
      // Save progress to Supabase
      await QuizzesService.saveQuizProgress(
        userId,
        quizData.id,
        score,
        totalQuestions,
        answers,
        true
      );

      logger.info('InteractiveQuiz', 'Quiz completed', {
        quizId: quizData.id,
        score,
        total: totalQuestions
      });
    }

    if (onComplete) {
      onComplete({
        quizId: quizData.id,
        score,
        total: totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100)
      });
    }
  };

  // Retry the quiz
  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setAnswers([]);
  };

  // Loading state
  if (loading) {
    return (
      <div style={quizStyles.container}>
        <div style={quizStyles.loading}>Loading quiz...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={quizStyles.container}>
        <div style={quizStyles.error}>
          <p>{error}</p>
          <button onClick={loadQuizData} style={quizStyles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No quiz data
  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div style={quizStyles.container}>
        <div style={quizStyles.error}>No quiz available</div>
      </div>
    );
  }

  // Quiz completed state
  if (quizCompleted) {
    return (
      <QuizResults
        score={score}
        total={quizData.questions.length}
        title={quizData.title}
        onRetry={handleRetry}
      />
    );
  }

  // Render current question
  const question = quizData.questions[currentQuestion];

  // Safety check: ensure current question exists
  if (!question) {
    logger.error('InteractiveQuiz', 'Current question not found', { currentQuestion });
    return (
      <div style={quizStyles.container}>
        <div style={quizStyles.error}>
          <p>Question not found. Please try restarting the quiz.</p>
          <button onClick={handleRetry} style={quizStyles.retryButton}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={quizStyles.container}>
      <div style={quizStyles.header}>
        <h2 style={quizStyles.title}>{quizData.title}</h2>
        {quizData.intro && (
          <p style={quizStyles.intro}>{quizData.intro}</p>
        )}
      </div>

      <div style={quizStyles.progress}>
        <div style={quizStyles.progressText}>
          Question {currentQuestion + 1} of {quizData.questions.length}
        </div>
        <div style={quizStyles.progressBar}>
          <div
            style={{
              ...quizStyles.progressFill,
              width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%`
            }}
          />
        </div>
      </div>

      <QuizQuestion
        question={question}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        onAnswerClick={handleAnswerClick}
      />

      {showResult && (
        <div style={quizStyles.footer}>
          <button
            onClick={handleNextQuestion}
            style={quizStyles.nextButton}
          >
            {currentQuestion < quizData.questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveQuizRefactored;