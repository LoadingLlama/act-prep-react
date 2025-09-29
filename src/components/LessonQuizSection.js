import React, { useState, useEffect } from 'react';
import CompactQuizSection from './CompactQuizSection';

const LessonQuizSection = ({
  title,
  description,
  questions,
  sectionIndex,
  onComplete
}) => {
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [answers, setAnswers] = useState({});

  // Track when all questions are answered
  useEffect(() => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    const isComplete = answeredQuestions === totalQuestions;

    setAllQuestionsAnswered(isComplete);

    // Notify parent of completion status
    if (onComplete) {
      onComplete(sectionIndex, isComplete);
    }
  }, [answers, questions.length, sectionIndex, onComplete]);

  // Compact quiz section that tracks answers
  return (
    <CompactQuizSection
      title={title}
      description={description}
      questions={questions}
      sectionIndex={sectionIndex}
      onComplete={onComplete}
    />
  );
};

export default LessonQuizSection;