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
  onSectionClick
}) => {
  const sectionClasses = [
    classes.section,
    index < visibleSections ? 'visible' : '',
    index === currentSection ? 'current' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={sectionClasses} onClick={() => onSectionClick(index)}>
      {section.type === 'text' ? (
        <>
          {index === currentSection ? (
            <div>
              <TypewriterText
                text={section.content || ''}
                startDelay={0}
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
              <InteractiveQuiz
                quiz={section.data}
                onComplete={() => onQuizComplete(index, section.isFinal)}
                initialCompleted={quizCompletionStatus[index] || sectionStatusOverride[index]?.completed}
                disableInteraction={index < currentSection}
                isFinalQuiz={section.isFinal}
              />
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
