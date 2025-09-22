import React from 'react';
import PracticeSection from './PracticeSection';

// Parse lesson content and render interactive elements
const LessonRenderer = ({ content, interactiveData }) => {
  // If there's no interactive data, render as regular HTML
  if (!interactiveData) {
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