import React, { useState, useEffect } from 'react';
import TypewriterText from './TypewriterText';
import InteractiveQuiz from './InteractiveQuiz';
import LessonSection from './LessonSection';
import { splitIntoTextSections } from '../utils/splitIntoTextSections';
import { useProgressiveLessonStyles } from './ProgressiveLessonRenderer.styles';
import { getQuizData } from '../utils/lessonQuizData';

const ProgressiveLessonRenderer = ({ lesson, initialStatus, onComplete, onStatusChange }) => {
  const classes = useProgressiveLessonStyles();
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState(1);
  const [currentSectionComplete, setCurrentSectionComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [quizCompletionStatus, setQuizCompletionStatus] = useState({});
  const [textCompletionStatus, setTextCompletionStatus] = useState({});
  const [sectionStatusOverride, setSectionStatusOverride] = useState({});
  const [typingSpeed, setTypingSpeed] = useState(25);
  const [isCompleting, setIsCompleting] = useState(false);
  const typewriterRef = React.useRef(null);
  const sectionRefs = React.useRef([]);

  useEffect(() => {
    if (!lesson || !lesson.content) {
      setSections([]);
      return;
    }

    setCurrentSection(0);
    setVisibleSections(1);
    setCurrentSectionComplete(false);
    setIsComplete(false);
    setQuizCompletionStatus({});
    setTextCompletionStatus({});
    setSectionStatusOverride({});

    const processedSections = [];
    const contentWithQuizzes = lesson.content;
    const allParts = contentWithQuizzes.split(/(<!-- QUIZ_\d+ -->)/);

    allParts.forEach((part, index) => {
      if (!part.trim()) return;

      const quizMatch = part.match(/<!-- QUIZ_(\d+) -->/);
      if (quizMatch) {
        const quizId = parseInt(quizMatch[1]);
        const quizData = getQuizData(quizId);

        if (quizData) {
          processedSections.push({
            type: 'quiz',
            data: quizData,
            isFinal: quizId === 4
          });
        }
      } else {
        const textSections = splitIntoTextSections(part);
        processedSections.push(...textSections);
      }
    });

    setSections(processedSections);
    sectionRefs.current = processedSections.map((_, i) => sectionRefs.current[i] || React.createRef());
  }, [lesson]);

  useEffect(() => {
    const handleScroll = () => {
      if (visibleSections < sections.length) {
        const lastVisibleSection = sectionRefs.current[visibleSections - 1];
        if (lastVisibleSection) {
          const rect = lastVisibleSection.getBoundingClientRect();

          if (rect.bottom < 0) {
            lastVisibleSection.scrollIntoView({
              behavior: 'smooth',
              block: 'end'
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections, sections.length]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        // Check if current text section is still typing
        const isCurrentlyTyping = typewriterRef.current &&
                                  typewriterRef.current.isTypingActive &&
                                  typewriterRef.current.isTypingActive();

        // If typing, complete the animation instantly
        if (isCurrentlyTyping && typewriterRef.current) {
          typewriterRef.current.completeInstantly();
          return; // Don't advance section yet, let the animation complete
        }

        // If not typing and section is complete, advance to next section
        if (currentSection < sections.length - 1) {
          const currentIsQuiz = sections[currentSection]?.type === 'quiz';
          const quizIsComplete = currentIsQuiz && quizCompletionStatus[currentSection];
          const textIsComplete = !currentIsQuiz && textCompletionStatus[currentSection];

          if (quizIsComplete || textIsComplete) {
            setCurrentSection(prev => prev + 1);
            setVisibleSections(prev => prev + 1);
            setCurrentSectionComplete(false);
          }
        }
      }

      if (e.ctrlKey && e.key === 'ArrowRight') {
        e.preventDefault();
        setTypingSpeed(1);

        if (typewriterRef.current && typewriterRef.current.completeInstantly) {
          typewriterRef.current.completeInstantly();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, sections, quizCompletionStatus, textCompletionStatus]);

  useEffect(() => {
    const currentIsText = sections[currentSection]?.type === 'text';
    const currentIsQuiz = sections[currentSection]?.type === 'quiz';
    
    if (currentIsText) {
      const textComplete = textCompletionStatus[currentSection];
      if (textComplete && !currentSectionComplete) {
        setCurrentSectionComplete(true);
      }
    } else if (currentIsQuiz) {
      const quizComplete = quizCompletionStatus[currentSection];
      if (quizComplete && !currentSectionComplete) {
        setCurrentSectionComplete(true);
      }
    }
  }, [sections, currentSection, textCompletionStatus, quizCompletionStatus, currentSectionComplete]);

  useEffect(() => {
    if (currentSection === sections.length - 1 && currentSectionComplete) {
      setIsComplete(true);
    }
  }, [currentSection, sections.length, currentSectionComplete]);

  const handleSectionClick = (index) => {
    if (index < currentSection) {
      setCurrentSection(index);
      setVisibleSections(index + 1);
    }
  };

  const handleTextComplete = (index) => {
    if (index === currentSection) {
      setCurrentSectionComplete(true);
      setTextCompletionStatus(prev => ({ ...prev, [index]: true }));
    }
  };

  const handleQuizComplete = (index, isFinal) => {
    setQuizCompletionStatus(prev => ({ ...prev, [index]: true }));
    setSectionStatusOverride(prev => ({ ...prev, [index]: { completed: true } }));
    setCurrentSectionComplete(true);

    if (isFinal) {
      setIsComplete(true);
    }
  };

  const handleLessonComplete = () => {
    setIsCompleting(true);

    if (onStatusChange) {
      onStatusChange('completed');
    }

    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 600);
  };

  if (sections.length === 0) {
    return <div>Loading lesson...</div>;
  }

  const progressPercentage = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className={classes.progressiveContainer}>
      <div className={classes.progressBar}>
        <div className={classes.progressFill} style={{ width: `${progressPercentage}%` }} />
      </div>

      {sections.map((section, index) => (
        <div key={index} ref={el => sectionRefs.current[index] = el}>
          <LessonSection
            section={section}
            index={index}
            currentSection={currentSection}
            visibleSections={visibleSections}
            typingSpeed={typingSpeed}
            textCompletionStatus={textCompletionStatus}
            quizCompletionStatus={quizCompletionStatus}
            sectionStatusOverride={sectionStatusOverride}
            classes={classes}
            typewriterRef={index === currentSection ? typewriterRef : null}
            onTextComplete={handleTextComplete}
            onQuizComplete={handleQuizComplete}
            onSectionClick={handleSectionClick}
          />
        </div>
      ))}

      {isComplete && !isCompleting && (
        <button onClick={handleLessonComplete} className={classes.completeButton}>
          ✓ Complete Lesson
        </button>
      )}

      {isCompleting && (
        <button className={`${classes.completeButton} completing`} disabled>
          ✓ Lesson Completed!
        </button>
      )}

      {currentSectionComplete && currentSection < sections.length - 1 && (
        <div className={classes.continuePrompt + ' continue-prompt continuePrompt'}>
          <span className={classes.promptText}>
            Press <span className={classes.enterKey}>Enter</span> to continue
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressiveLessonRenderer;
