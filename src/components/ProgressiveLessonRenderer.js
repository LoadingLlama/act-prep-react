import React, { useState, useEffect } from 'react';
import LessonSection from './LessonSection';
import { splitIntoTextSections } from '../utils/splitIntoTextSections';
import { useProgressiveLessonStyles } from './ProgressiveLessonRenderer.styles';
import QuizzesService from '../services/api/quizzes.service';
import LessonsService from '../services/api/lessons.service';

const ProgressiveLessonRenderer = ({ lesson, initialStatus, onComplete, onStatusChange, onNavigate }) => {
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

    const loadLessonContent = async () => {
      setCurrentSection(0);
      setVisibleSections(1);
      setCurrentSectionComplete(false);
      setIsComplete(false);
      setQuizCompletionStatus({});
      setTextCompletionStatus({});
      setSectionStatusOverride({});

      const processedSections = [];

      // Get the actual lesson UUID from Supabase using lesson_key or id
      let lessonUUID = lesson.id;

      // If lesson.id looks like a key (not a UUID), fetch the real UUID
      if (!lesson.id || !lesson.id.includes('-') || lesson.id.length < 30) {
        const lessonData = await LessonsService.getLessonByKey(lesson.id);
        lessonUUID = lessonData?.id;
      }

      // Fetch quizzes from Supabase
      const quizzes = lessonUUID ? await QuizzesService.getQuizzesByLessonId(lessonUUID) : [];

      // Split content into text sections
      const textSections = splitIntoTextSections(lesson.content);

      // Build quizzes by position map
      const quizzesByPosition = {};
      quizzes?.forEach(quiz => {
        if (!quizzesByPosition[quiz.position]) {
          quizzesByPosition[quiz.position] = [];
        }
        quizzesByPosition[quiz.position].push(quiz);
      });

      // Interleave text sections and quizzes based on position
      let textIndex = 0;

      while (textIndex < textSections.length) {
        // Add text section
        processedSections.push(textSections[textIndex]);
        textIndex++;

        // After adding this text section, check if any quizzes should appear
        if (quizzesByPosition[textIndex]) {
          quizzesByPosition[textIndex].forEach(quiz => {
            processedSections.push({
              type: 'quiz',
              data: quiz,
              isFinal: quiz.isFinal,
              isRequired: quiz.isRequired,
              quizId: quiz.id
            });
          });
        }
      }

      // Add any quizzes positioned beyond the last text section (at the very end)
      const maxPosition = Math.max(...Object.keys(quizzesByPosition).map(Number), textSections.length);
      for (let pos = textSections.length; pos <= maxPosition; pos++) {
        if (quizzesByPosition[pos]) {
          quizzesByPosition[pos].forEach(quiz => {
            processedSections.push({
              type: 'quiz',
              data: quiz,
              isFinal: quiz.isFinal,
              isRequired: quiz.isRequired,
              quizId: quiz.id
            });
          });
        }
      }

      console.log('Total text sections:', textSections.length);
      console.log('Total sections (text + quizzes):', processedSections.length);

      setSections(processedSections);
      sectionRefs.current = processedSections.map((_, i) => sectionRefs.current[i] || React.createRef());
    };

    loadLessonContent();
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

        // Check if current section is complete
        const currentIsQuiz = sections[currentSection]?.type === 'quiz';
        const quizIsComplete = currentIsQuiz && quizCompletionStatus[currentSection];
        const textIsComplete = !currentIsQuiz && textCompletionStatus[currentSection];

        // Check if current text section is still typing
        const isCurrentlyTyping = !currentIsQuiz &&
                                  typewriterRef.current &&
                                  typewriterRef.current.isTypingActive &&
                                  typewriterRef.current.isTypingActive();

        // If typing, complete the animation instantly
        if (isCurrentlyTyping && typewriterRef.current) {
          typewriterRef.current.completeInstantly();
          // After completing, wait for the onComplete callback to set textCompletionStatus
          return;
        }

        // Advance to next section if current is complete
        if ((quizIsComplete || textIsComplete) && currentSection < sections.length - 1) {
          setCurrentSection(prev => prev + 1);
          setVisibleSections(prev => prev + 1);
          setCurrentSectionComplete(false);
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
    console.log('Quiz completed:', index, 'isFinal:', isFinal);
    setQuizCompletionStatus(prev => {
      const newStatus = { ...prev, [index]: true };
      console.log('New quiz completion status:', newStatus);
      return newStatus;
    });
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
            sections={sections}
            classes={classes}
            typewriterRef={index === currentSection ? typewriterRef : null}
            onTextComplete={handleTextComplete}
            onQuizComplete={handleQuizComplete}
            onSectionClick={handleSectionClick}
          />
        </div>
      ))}

      {isComplete && (
        <>
          <div className={classes.navigationButtons}>
            <button
              className={classes.navButton}
              onClick={() => onNavigate && onNavigate('previous')}
              disabled={!onNavigate}
            >
              ← Previous Lesson
            </button>
            <button
              className={`${classes.navButton} ${classes.nextButton}`}
              onClick={() => {
                if (onStatusChange) onStatusChange('completed');
                if (onNavigate) onNavigate('next');
              }}
            >
              Next Lesson →
            </button>
          </div>
        </>
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
