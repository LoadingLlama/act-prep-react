import React from 'react';
import PracticeSection from './PracticeSection';
import InteractiveQuiz from './InteractiveQuiz';
import { sentenceStructureQuizzes } from '../data/sentenceStructureQuizzes';

// Function to render content with quizzes
const renderContentWithQuizzes = (content) => {
  const parts = [];
  let remainingContent = content;

  // Quiz markers mapping
  const quizMarkers = {
    '<!-- QUIZ_1 -->': { data: sentenceStructureQuizzes.quiz1, id: 'quiz1' },
    '<!-- QUIZ_2 -->': { data: sentenceStructureQuizzes.quiz2, id: 'quiz2' },
    '<!-- QUIZ_3 -->': { data: sentenceStructureQuizzes.quiz3, id: 'quiz3' },
    '<!-- QUIZ_4 -->': { data: sentenceStructureQuizzes.quiz4, id: 'quiz4', isFinal: true }
  };

  let partIndex = 0;

  Object.entries(quizMarkers).forEach(([marker, quizInfo]) => {
    if (remainingContent.includes(marker)) {
      const [before, after] = remainingContent.split(marker);

      // Add content before quiz
      if (before.trim()) {
        parts.push(
          <div
            key={`content-${partIndex}`}
            dangerouslySetInnerHTML={{ __html: before }}
          />
        );
      }

      // Add quiz component
      parts.push(
        <InteractiveQuiz
          key={`quiz-${partIndex}`}
          quizData={quizInfo.data}
          quizId={quizInfo.id}
          isFinal={quizInfo.isFinal || false}
        />
      );

      remainingContent = after;
      partIndex++;
    }
  });

  // Add any remaining content
  if (remainingContent.trim()) {
    parts.push(
      <div
        key={`content-final`}
        dangerouslySetInnerHTML={{ __html: remainingContent }}
      />
    );
  }

  return <div>{parts}</div>;
};

// Parse lesson content and render interactive elements
const LessonRenderer = ({ content, interactiveData }) => {
  // If there's no interactive data, render as regular HTML
  if (!interactiveData) {
    // Check for quiz markers in content
    if (content.includes('<!-- QUIZ_')) {
      return renderContentWithQuizzes(content);
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // Split content by interactive sections
  const renderContent = () => {
    const parts = [];
    let remainingContent = content;

    // Find and replace practice sections with interactive components
    interactiveData.practiceSections?.forEach((section, index) => {
      const sectionMarker = `<!-- INTERACTIVE_PRACTICE_${index} -->`;

      if (remainingContent.includes(sectionMarker)) {
        const [before, after] = remainingContent.split(sectionMarker);

        // Add the content before the marker
        if (before.trim()) {
          parts.push(
            <div
              key={`content-${index}`}
              dangerouslySetInnerHTML={{ __html: before }}
            />
          );
        }

        // Add the interactive practice section
        parts.push(
          <PracticeSection
            key={`practice-${index}`}
            title={section.title}
            description={section.description}
            questions={section.questions}
            isTest={section.isTest || false}
            duration={section.duration}
          />
        );

        remainingContent = after;
      }
    });

    // Add any remaining content
    if (remainingContent.trim()) {
      parts.push(
        <div
          key="content-final"
          dangerouslySetInnerHTML={{ __html: remainingContent }}
        />
      );
    }

    return parts;
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default LessonRenderer;