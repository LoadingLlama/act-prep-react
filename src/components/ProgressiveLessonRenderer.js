import React, { useState, useEffect } from 'react';
import LessonSection from './LessonSection';
import { splitIntoTextSections } from '../utils/splitIntoTextSections';
import { useProgressiveLessonStyles } from './ProgressiveLessonRenderer.styles';
import QuizzesService from '../services/api/quizzes.service';
import LessonsService from '../services/api/lessons.service';
import AllLessonsNavigator from './AllLessonsNavigator';
import LessonTableOfContents from './LessonTableOfContents';
import { lessonStructure } from '../data/lessonStructure';

const ProgressiveLessonRenderer = ({ lesson, initialStatus, onComplete, onStatusChange, onNavigate, lessonProgress = {} }) => {
  const classes = useProgressiveLessonStyles();
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState(1);
  const [currentSectionComplete, setCurrentSectionComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [quizCompletionStatus, setQuizCompletionStatus] = useState({});
  const [textCompletionStatus, setTextCompletionStatus] = useState({});
  const [exampleCompletionStatus, setExampleCompletionStatus] = useState({});
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
      setExampleCompletionStatus({});
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
        const currentIsExample = sections[currentSection]?.type === 'example';
        const currentIsText = sections[currentSection]?.type === 'text';

        const quizIsComplete = currentIsQuiz && quizCompletionStatus[currentSection];
        const exampleIsComplete = currentIsExample && exampleCompletionStatus[currentSection];
        const textIsComplete = currentIsText && textCompletionStatus[currentSection];

        // Check if current text section is still typing
        const isCurrentlyTyping = currentIsText &&
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
        if ((quizIsComplete || exampleIsComplete || textIsComplete) && currentSection < sections.length - 1) {
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
  }, [currentSection, sections, quizCompletionStatus, textCompletionStatus, exampleCompletionStatus]);

  useEffect(() => {
    const currentIsText = sections[currentSection]?.type === 'text';
    const currentIsQuiz = sections[currentSection]?.type === 'quiz';
    const currentIsExample = sections[currentSection]?.type === 'example';

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
    } else if (currentIsExample) {
      const exampleComplete = exampleCompletionStatus[currentSection];
      if (exampleComplete && !currentSectionComplete) {
        setCurrentSectionComplete(true);
      }
    }
  }, [sections, currentSection, textCompletionStatus, quizCompletionStatus, exampleCompletionStatus, currentSectionComplete]);

  useEffect(() => {
    if (currentSection === sections.length - 1 && currentSectionComplete) {
      setIsComplete(true);
    }
  }, [currentSection, sections.length, currentSectionComplete]);

  const handleSectionClick = (index) => {
    // Just scroll to the section without resetting anything
    if (index <= currentSection && sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleTextComplete = (index) => {
    if (index === currentSection) {
      setCurrentSectionComplete(true);
      setTextCompletionStatus(prev => ({ ...prev, [index]: true }));
    }
  };

  const handleExampleComplete = (index) => {
    if (index === currentSection) {
      setCurrentSectionComplete(true);
      setExampleCompletionStatus(prev => ({ ...prev, [index]: true }));
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
      <AllLessonsNavigator
        lessonStructure={lessonStructure}
        currentLessonId={lesson?.id}
        lessonProgress={lessonProgress}
        onLessonChange={(lessonId) => {
          // Find lesson in structure and navigate to it
          const targetLesson = lessonStructure.find(l => l.id === lessonId);
          if (targetLesson && onNavigate) {
            onNavigate('lesson', lessonId);
          }
        }}
        onBackClick={() => {
          // Navigate back to home
          if (onNavigate) {
            onNavigate('home');
          }
        }}
      />

      <LessonTableOfContents
        sections={sections}
        currentSection={currentSection}
      />

      <div className={classes.progressBar}>
        <div className={classes.progressFill} style={{ width: `${progressPercentage}%` }} />
      </div>

      {/* Lesson Title Section */}
      <div style={{
        padding: '0',
        marginBottom: '2rem'
      }}>
        {/* Metadata bar */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '1.25rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid #e5e7eb',
          flexWrap: 'wrap',
          justifyContent: 'flex-start'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#2563eb',
            fontSize: '0.875rem'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span style={{ fontWeight: '500' }}>Reading Time: 5 min</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#059669',
            fontSize: '0.875rem'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
            <span style={{ fontWeight: '500' }}>Verified for 2025 ACT® Exam</span>
          </div>
        </div>

        {/* Lesson Title */}
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 700,
          color: '#111827',
          marginBottom: '0.5rem',
          lineHeight: '1.3'
        }}>
          {lesson?.title || 'Lesson'}
        </h2>
      </div>

      {sections.map((section, index) => (
        <div key={index} ref={el => sectionRefs.current[index] = el} data-section-index={index}>
          <LessonSection
            section={section}
            index={index}
            currentSection={currentSection}
            visibleSections={visibleSections}
            typingSpeed={typingSpeed}
            textCompletionStatus={textCompletionStatus}
            quizCompletionStatus={quizCompletionStatus}
            exampleCompletionStatus={exampleCompletionStatus}
            sectionStatusOverride={sectionStatusOverride}
            sections={sections}
            classes={classes}
            typewriterRef={index === currentSection ? typewriterRef : null}
            onTextComplete={handleTextComplete}
            onExampleComplete={handleExampleComplete}
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
