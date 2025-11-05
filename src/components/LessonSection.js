import React, { useRef, useState } from 'react';
import TypewriterText from './TypewriterText';
import InteractiveQuiz from './InteractiveQuiz';
import InteractiveExample from './InteractiveExample';
import ExampleModal from './ExampleModal';
import { useTermTooltips } from '../hooks/useTermTooltips';
import { sanitizeHTML } from '../utils/security';

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

  // Modal state for examples
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false);

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
            <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(section.content) }} />
          ) : null}
        </>
      ) : section.type === 'example' ? (
        <>
          {/* Always show button for current or past sections */}
          {index <= currentSection && section.data ? (
            <>
              {/* Compact button that stays even after completion */}
              <div style={{
                margin: '1.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExampleModalOpen(true);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: exampleCompletionStatus[index] ? '#059669' : '#6b7280',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    borderRadius: '4px',
                    border: exampleCompletionStatus[index] ? '1px solid #d1fae5' : '1px solid #d1d5db',
                    cursor: 'pointer',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = exampleCompletionStatus[index] ? 'rgba(5, 150, 105, 0.05)' : 'rgba(0, 0, 0, 0.02)';
                    e.target.style.borderColor = exampleCompletionStatus[index] ? '#059669' : '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = exampleCompletionStatus[index] ? '#d1fae5' : '#d1d5db';
                  }}
                >
                  <span style={{ fontSize: '0.875rem' }}>
                    {exampleCompletionStatus[index] ? '✓' : '📝'}
                  </span>
                  {exampleCompletionStatus[index] ? 'Review Example' : 'Try an Example'}
                </button>

                {/* Inline hint for incomplete examples */}
                {!exampleCompletionStatus[index] && index === currentSection && (
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#9ca3af',
                    fontStyle: 'italic'
                  }}>
                    Required to continue
                  </span>
                )}
              </div>

              {/* Example Modal */}
              <ExampleModal
                example={section.data}
                position={section.data.position}
                isOpen={isExampleModalOpen}
                typingSpeed={typingSpeed}
                onComplete={() => {
                  setIsExampleModalOpen(false);
                  onExampleComplete(index);
                }}
              />
            </>
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
