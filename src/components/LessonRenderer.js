import React, { useEffect } from 'react';
import PracticeSection from './PracticeSection';
import QuickPractice from './QuickPractice';
import { enhanceLessonInteractivity } from '../utils/lessonEnhancer';

// Parse lesson content and render interactive elements
const LessonRenderer = ({ content, interactiveData }) => {
  // Enhanced content parser that handles practice questions
  const parseContent = (htmlContent) => {
    // Split content into sections and render with React components
    const contentSections = [];

    // For now, render as HTML but with enhanced parsing for future practice questions
    const enhancedContent = htmlContent.replace(
      /<div class="practice-moment">([\s\S]*?)<\/div>/g,
      (match, content) => {
        // Extract practice question data from HTML
        const questionMatch = content.match(/<p>(.*?)<\/p>/);
        const optionsMatch = content.match(/<div class="quick-options">([\s\S]*?)<\/div>/);

        if (questionMatch && optionsMatch) {
          // This would be where we'd inject React components
          return match; // For now, keep original HTML
        }
        return match;
      }
    );

    return enhancedContent;
  };

  // If there's no interactive data, render enhanced HTML
  if (!interactiveData) {
    return <div dangerouslySetInnerHTML={{ __html: parseContent(content) }} />;
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

  // Enhance interactivity after content renders
  useEffect(() => {
    const timer = setTimeout(() => {
      enhanceLessonInteractivity();
    }, 100);

    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default LessonRenderer;