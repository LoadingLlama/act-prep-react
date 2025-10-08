import React from 'react';
import TypewriterText from './TypewriterText';
import InteractiveQuiz from './InteractiveQuiz';

const LessonSection = ({
  section,
  index,
  currentSection,
  visibleSections,
  typingSpeed,
  textCompletionStatus,
  quizCompletionStatus,
  sectionStatusOverride,
  classes,
  typewriterRef,
  onTextComplete,
  onQuizComplete,
  onSectionClick,
  sections
}) => {
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

  return (
    <div className={sectionClasses} onClick={() => onSectionClick(index)}>
      {section.type === 'text' ? (
        <>
          {index === currentSection ? (
            <div>
              <TypewriterText
                text={section.content || ''}
                startDelay={50}
                typingSpeed={typingSpeed}
                skipAnimation={textCompletionStatus[index] === true}
                onComplete={() => onTextComplete(index)}
                ref={typewriterRef}
              />
            </div>
          ) : index < currentSection ? (
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
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
                    padding: '1.5rem',
                    background: '#fef3c7',
                    borderRadius: '12px',
                    border: '2px solid #f59e0b'
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔒</div>
                    <div style={{
                      fontSize: '1rem',
                      color: '#92400e',
                      fontWeight: '600'
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
