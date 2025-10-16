import React, { useRef } from 'react';
import TypewriterText from './TypewriterText';
import InteractiveQuiz from './InteractiveQuiz';
import InteractiveExample from './InteractiveExample';
import ExampleCard from './ExampleCard';
import { useTermTooltips } from '../hooks/useTermTooltips';

const LessonSection = ({
  section,
  index,
  currentSection,
  visibleSections,
  typingSpeed,
  textCompletionStatus,
  quizCompletionStatus,
  exampleCompletionStatus,
  sectionStatusOverride,
  classes,
  typewriterRef,
  onTextComplete,
  onQuizComplete,
  onExampleComplete,
  onSectionClick,
  sections,
  lessonKey
}) => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, lessonKey);

  // Check if this is a past section or already completed
  const isPastSection = index < currentSection;
  const isAlreadyComplete = textCompletionStatus[index] || quizCompletionStatus[index] || exampleCompletionStatus[index];

  const sectionClasses = [
    classes.section,
    index < visibleSections ? 'visible' : '',
    index === currentSection ? 'current' : ''
  ].filter(Boolean).join(' ');

  // Check if this is the current quiz and it's incomplete
  const isCurrentIncompleteQuiz = index === currentSection &&
                                   section.type === 'quiz' &&
                                   !quizCompletionStatus[index] &&
                                   !sectionStatusOverride[index]?.completed;

  // Handle section click - only navigate if user isn't selecting text
  const handleSectionClick = (e) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      // User is selecting text, don't navigate
      return;
    }
    onSectionClick(index);
  };

  return (
    <div className={sectionClasses} onClick={handleSectionClick} ref={contentRef}>
      {section.type === 'text' ? (
        <>
          {index === currentSection ? (
            <div>
              <TypewriterText
                text={section.content || ''}
                startDelay={0}
                typingSpeed={typingSpeed}
                skipAnimation={isPastSection || isAlreadyComplete}
                onComplete={() => onTextComplete(index)}
                ref={typewriterRef}
              />
            </div>
          ) : index < currentSection ? (
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          ) : null}
        </>
      ) : section.type === 'example' ? (
        <>
          {index === currentSection || index < currentSection ? (
            section.data ? (
              // New database-driven example
              <ExampleCard
                example={section.data}
                position={section.data.position}
                isCurrentSection={index === currentSection}
                typingSpeed={typingSpeed}
                onComplete={() => onExampleComplete(index)}
              />
            ) : (
              // Old HTML-based example (fallback)
              <InteractiveExample
                content={section.content}
                onComplete={() => onExampleComplete(index)}
                currentSection={currentSection}
                index={index}
                typingSpeed={typingSpeed}
                typewriterRef={index === currentSection ? typewriterRef : null}
              />
            )
          ) : null}
        </>
      ) : section.type === 'quiz' ? (
        section.data ? (
          <>
            {index === currentSection || index < currentSection ? (
              <>
                <InteractiveQuiz
                  quizData={section.data}
                  isFinal={section.isFinal}
                  onComplete={() => onQuizComplete(index, section.isFinal)}
                  initialCompleted={quizCompletionStatus[index] || sectionStatusOverride[index]?.completed}
                  disableInteraction={index < currentSection}
                />
                {isCurrentIncompleteQuiz && (
                  <div style={{
                    textAlign: 'center',
                    margin: '2rem 0',
                    padding: '1rem 0',
                    background: 'transparent',
                    borderRadius: '0',
                    border: 'none'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', opacity: 0.4 }}>🔒</div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#9ca3af',
                      fontWeight: '400',
                      opacity: 0.6
                    }}>
                      Complete this quiz to continue
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={classes.quizLockNotice}>
                <span className={classes.lockIcon}>🔒</span>
                <div className={classes.lockText}>
                  <strong>Quiz Locked</strong>
                  <p>Complete the previous section to unlock this quiz</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>Quiz data not available</div>
        )
      ) : null}
    </div>
  );
};

export default LessonSection;
