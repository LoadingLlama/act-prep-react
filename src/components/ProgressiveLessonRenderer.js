import React, { useState, useEffect } from 'react';
import LessonSection from './LessonSection';
import { splitIntoTextSections } from '../utils/splitIntoTextSections';
import { useProgressiveLessonStyles } from './ProgressiveLessonRenderer.styles';
import QuizzesService from '../services/api/quizzes.service';
import LessonsService from '../services/api/lessons.service';
import ExamplesService from '../services/api/examples.service';
import AllLessonsNavigator from './AllLessonsNavigator';
import LessonTableOfContents from './LessonTableOfContents';
import { lessonStructure } from '../data/lessonStructure';
import { LessonRenderer } from './lesson/LessonRenderer';

const ProgressiveLessonRenderer = ({ lesson, initialStatus, onComplete, onStatusChange, onNavigate, lessonProgress = {}, lessonMode, setLessonMode, hideNavigator = false }) => {
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
  const [typingSpeed, setTypingSpeed] = useState(20); // Slower, more readable typing speed
  const [isCompleting, setIsCompleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const typewriterRef = React.useRef(null);
  const sectionRefs = React.useRef([]);

  useEffect(() => {
    if (!lesson || (!lesson.content && !lesson.content_json)) {
      setSections([]);
      return;
    }

    const loadLessonContent = async () => {
      // Check if this lesson is already completed
      const isLessonCompleted = lessonProgress[lesson.id] === 'completed';

      // Only restore progress if lesson is not completed
      let restoredState = null;
      if (!isLessonCompleted) {
        const savedProgressKey = `lesson_progress_${lesson.id}`;
        const savedProgress = localStorage.getItem(savedProgressKey);

        if (savedProgress) {
          try {
            restoredState = JSON.parse(savedProgress);
            console.log('📊 Progress Tracking: Restored progress for lesson', lesson.id, restoredState);
          } catch (e) {
            console.error('❌ Progress Tracking: Failed to parse saved progress:', e);
          }
        } else {
          console.log('📊 Progress Tracking: No saved progress found for lesson', lesson.id);
        }
      } else {
        console.log('📊 Progress Tracking: Lesson already completed, starting fresh');
      }

      // Use restored state if available, otherwise start fresh
      setCurrentSection(restoredState?.currentSection || 0);
      setVisibleSections(restoredState?.visibleSections || 1);
      setCurrentSectionComplete(false);
      // Only reset isComplete if lesson is not already completed
      if (!isLessonCompleted) {
        setIsComplete(false);
      }
      setQuizCompletionStatus(restoredState?.quizCompletionStatus || {});
      setTextCompletionStatus(restoredState?.textCompletionStatus || {});
      setExampleCompletionStatus(restoredState?.exampleCompletionStatus || {});
      setSectionStatusOverride({});
      setHasStarted(restoredState?.hasStarted || isLessonCompleted); // Auto-start if completed or was started before

      if (restoredState) {
        console.log('📊 Progress Tracking: Lesson state initialized from saved progress');
      } else {
        console.log('📊 Progress Tracking: Lesson state initialized fresh');
      }

      const processedSections = [];

      // Get the actual lesson UUID from Supabase using lesson_key or id
      let lessonUUID = lesson.id;

      // If lesson.id looks like a key (not a UUID), fetch the real UUID
      if (!lesson.id || !lesson.id.includes('-') || lesson.id.length < 30) {
        const lessonData = await LessonsService.getLessonByKey(lesson.id);
        lessonUUID = lessonData?.id;
      }

      // Fetch quizzes and examples from Supabase
      console.log('🔍 About to fetch examples for lessonUUID:', lessonUUID);
      console.log('🔍 lessonUUID is truthy?', !!lessonUUID);
      const quizzes = lessonUUID ? await QuizzesService.getQuizzesByLessonId(lessonUUID) : [];
      console.log('🔍 Calling ExamplesService.getExamplesByLessonId now...');
      const examples = lessonUUID ? await ExamplesService.getExamplesByLessonId(lessonUUID) : [];
      console.log('🔍 ExamplesService returned:', examples);

      console.log('📚 Loaded quizzes for lesson:', lessonUUID);
      console.log('📝 Number of quizzes:', quizzes?.length || 0);
      console.log('🎯 Number of examples:', examples?.length || 0);
      if (quizzes && quizzes.length > 0) {
        quizzes.forEach((quiz, idx) => {
          console.log(`   Quiz ${idx + 1}:`, quiz.title);
          console.log(`   - Questions: ${quiz.questions?.length || 0}`);
          console.log(`   - Position: ${quiz.position}`);
          if (quiz.questions && quiz.questions.length > 0) {
            console.log(`   - Sample question: ${quiz.questions[0].text?.substring(0, 50)}...`);
            console.log(`   - Options for Q1: ${quiz.questions[0].options?.length || 0}`);
          }
        });
      }

      // If lesson has JSON format, skip old HTML processing
      if (lesson.content_json) {
        console.log('✅ Lesson has content_json - skipping old HTML processing');
        setSections([]);
        return;
      }

      // Split content into text sections (only for old HTML format)
      const textSections = splitIntoTextSections(lesson.content);

      // Build quizzes by position map
      const quizzesByPosition = {};
      quizzes?.forEach(quiz => {
        if (!quizzesByPosition[quiz.position]) {
          quizzesByPosition[quiz.position] = [];
        }
        quizzesByPosition[quiz.position].push(quiz);
      });

      // Interleave text sections, examples, and quizzes
      // Strategy: Examples are positioned by their `position` field
      // position 1 = after first H3 section, position 2 = after second H3, etc.

      let h3Count = 0; // Track which H3 section we're on
      let examplesByH3Position = {};

      // Group examples by their position (which H3 they belong after)
      examples.forEach(example => {
        if (!examplesByH3Position[example.position]) {
          examplesByH3Position[example.position] = [];
        }
        examplesByH3Position[example.position].push(example);
      });

      for (let textIndex = 0; textIndex < textSections.length; textIndex++) {
        const section = textSections[textIndex];
        processedSections.push(section);

        // Check if this text section contains an H3 header
        if (section.content && section.content.includes('<h3')) {
          h3Count++;
          console.log(`📍 H3 section ${h3Count} detected`);

          // Add examples that belong after this H3
          if (examplesByH3Position[h3Count]) {
            examplesByH3Position[h3Count].forEach(example => {
              console.log(`📊 Adding example ${example.position}: ${example.title} after H3 #${h3Count}`);
              processedSections.push({
                type: 'example',
                data: example,
                exampleId: example.id
              });
            });
          }
        }

        // Check if any quizzes should appear at this position
        const nextPosition = textIndex + 1;
        if (quizzesByPosition[nextPosition]) {
          quizzesByPosition[nextPosition].forEach(quiz => {
            console.log(`🎯 Adding quiz section at position ${nextPosition}:`, quiz.title);
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

      // Log each section for debugging
      console.log('\n=== ALL SECTIONS ===');
      processedSections.forEach((section, idx) => {
        if (section.type === 'text') {
          const preview = section.content.substring(0, 100).replace(/<[^>]*>/g, '');
          console.log(`Section ${idx}: TEXT - ${preview}`);
        } else if (section.type === 'quiz') {
          console.log(`Section ${idx}: QUIZ - ${section.data?.title}`);
        } else if (section.type === 'example') {
          console.log(`Section ${idx}: EXAMPLE`);
        }
      });

      setSections(processedSections);
      sectionRefs.current = processedSections.map((_, i) => sectionRefs.current[i] || React.createRef());

      // Safety: Reset currentSection if it's beyond bounds
      if (restoredState && restoredState.currentSection >= processedSections.length) {
        console.warn('⚠️ Restored currentSection', restoredState.currentSection, 'exceeds total sections', processedSections.length, '- resetting to last section');
        setCurrentSection(processedSections.length - 1);
        setVisibleSections(processedSections.length);
      }

      // If lesson is completed, unlock all sections
      if (isLessonCompleted && processedSections.length > 0) {
        setVisibleSections(processedSections.length);
        setCurrentSection(processedSections.length - 1);
        setIsComplete(true);

        // Mark all sections as complete
        const allTextComplete = {};
        const allQuizComplete = {};
        const allExampleComplete = {};
        processedSections.forEach((section, index) => {
          if (section.type === 'text') {
            allTextComplete[index] = true;
          } else if (section.type === 'quiz') {
            allQuizComplete[index] = true;
          } else if (section.type === 'example') {
            allExampleComplete[index] = true;
          }
        });
        setTextCompletionStatus(allTextComplete);
        setQuizCompletionStatus(allQuizComplete);
        setExampleCompletionStatus(allExampleComplete);
      }
    };

    loadLessonContent();
  }, [lesson?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  // Note: Only re-run when lesson ID changes, not on every lessonProgress update to avoid re-rendering glitches

  useEffect(() => {
    const handleScroll = () => {
      // Mark as in-progress if user scrolls past first section
      if (onStatusChange && initialStatus === 'not-started' && sections.length > 0) {
        const firstSection = sectionRefs.current[0];
        if (firstSection) {
          const rect = firstSection.getBoundingClientRect();
          // If first section is scrolled past (top is above viewport)
          if (rect.bottom < window.innerHeight / 2) {
            console.log('📊 Progress Tracking: User scrolled past first section, marking as in-progress');
            onStatusChange('in-progress');
          }
        }
      }

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
  }, [visibleSections, sections.length, onStatusChange, initialStatus]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        // If lesson hasn't started, start it
        if (!hasStarted) {
          setHasStarted(true);
          return;
        }

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
          console.log('⏭️ Advancing from section', currentSection, 'to', currentSection + 1);
          setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
          setVisibleSections(prev => Math.min(prev + 1, sections.length));
          setCurrentSectionComplete(false);
        } else if (currentSection >= sections.length - 1) {
          console.log('⚠️ Already at last section, not advancing');
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
  }, [currentSection, sections, quizCompletionStatus, textCompletionStatus, exampleCompletionStatus, hasStarted]);

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

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    if (!lesson?.id || sections.length === 0) return;

    const progressState = {
      currentSection,
      visibleSections,
      quizCompletionStatus,
      textCompletionStatus,
      exampleCompletionStatus,
      hasStarted,
      timestamp: Date.now()
    };

    const savedProgressKey = `lesson_progress_${lesson.id}`;
    console.log('💾 Progress Tracking: Saving progress for lesson', lesson.id, {
      currentSection,
      visibleSections,
      hasStarted,
      totalSections: sections.length
    });
    localStorage.setItem(savedProgressKey, JSON.stringify(progressState));
  }, [currentSection, visibleSections, quizCompletionStatus, textCompletionStatus, exampleCompletionStatus, hasStarted, lesson?.id, sections.length]);

  // Save progress on component unmount (when user exits lesson)
  useEffect(() => {
    return () => {
      if (!lesson?.id || sections.length === 0) return;

      const progressState = {
        currentSection,
        visibleSections,
        quizCompletionStatus,
        textCompletionStatus,
        exampleCompletionStatus,
        hasStarted,
        timestamp: Date.now()
      };

      const savedProgressKey = `lesson_progress_${lesson.id}`;
      console.log('💾 Progress Tracking: Saving progress on unmount for lesson', lesson.id);
      localStorage.setItem(savedProgressKey, JSON.stringify(progressState));
    };
  }, [currentSection, visibleSections, quizCompletionStatus, textCompletionStatus, exampleCompletionStatus, hasStarted, lesson?.id, sections.length]);

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
    console.log('📊 Progress Tracking: Text section completed at index', index, '/', sections.length - 1);
    if (index === currentSection) {
      setCurrentSectionComplete(true);
      setTextCompletionStatus(prev => ({ ...prev, [index]: true }));

      // If this is the last section, mark lesson as complete
      if (index === sections.length - 1) {
        console.log('📊 Progress Tracking: Last text section completed, marking lesson as complete');
        setIsComplete(true);
      }
    }
  };

  const handleExampleComplete = (index) => {
    console.log('📊 Progress Tracking: Example completed at index', index);
    if (index === currentSection) {
      setCurrentSectionComplete(true);
      setExampleCompletionStatus(prev => ({ ...prev, [index]: true }));

      // Auto-mark lesson as "in-progress" after completing first example
      if (onStatusChange && initialStatus === 'not-started') {
        console.log('📊 Progress Tracking: First example completed, marking lesson as in-progress');
        onStatusChange('in-progress');
      }

      // If this is the last section, mark lesson as complete
      if (index === sections.length - 1) {
        console.log('📊 Progress Tracking: Last section completed, marking lesson as complete');
        setIsComplete(true);
      }
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

  // Only show loading if we don't have JSON format
  if (sections.length === 0 && !lesson?.content_json) {
    return <div>Loading lesson...</div>;
  }

  const progressPercentage = sections.length > 0 ? ((currentSection + 1) / sections.length) * 100 : 0;

  return (
    <div className={classes.progressiveContainer}>
      {!hideNavigator && (
        <AllLessonsNavigator
          lessonStructure={lessonStructure}
          currentLessonId={lesson?.id}
          lessonProgress={lessonProgress}
          lessonMode={lessonMode}
          setLessonMode={setLessonMode}
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
      )}

      <LessonTableOfContents
        sections={sections}
        currentSection={currentSection}
      />

      <div className={classes.progressBar}>
        <div className={classes.progressFill} style={{ width: `${progressPercentage}%` }} />
      </div>

      {/* Lesson Title Section */}
      <div className={classes.lessonTitleSection} style={{
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
          {(() => {
            const currentLessonData = lessonStructure.find(l => l.id === lesson?.id);
            return currentLessonData?.chapterNum ? (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#b91c1c'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                {currentLessonData.chapterNum}
              </div>
            ) : null;
          })()}
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
            <span style={{ fontWeight: '500' }}>Reading Time: {lesson?.duration || '5 min'}</span>
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
          {(() => {
            const title = lesson?.title || 'Lesson';
            // Remove "Topic X.X - " prefix if present
            return title.replace(/^Topic\s+[\d.]+\s*-\s*/i, '');
          })()}
        </h2>
      </div>

      {/* Use new JSON-based renderer if available */}
      {(() => {
        console.log('🔍 ProgressiveLessonRenderer: Checking lesson format');
        console.log('   lesson.content_json exists?', !!lesson.content_json);
        console.log('   lesson.content exists?', !!lesson.content);
        if (lesson.content_json) {
          console.log('   ✅ Using NEW JSON format with', lesson.content_json.content?.length, 'blocks');
        } else {
          console.log('   ⚠️  Using OLD HTML format');
        }
        return null;
      })()}
      {lesson.content_json ? (
        <div style={{ marginTop: '2rem' }}>
          <LessonRenderer data={lesson.content_json} />
        </div>
      ) : !hasStarted ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          padding: '4rem 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <div style={{
              fontSize: '0.95rem',
              color: '#9ca3af',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              Press <kbd style={{
                background: '#f3f4f6',
                padding: '0.35rem 0.75rem',
                borderRadius: '4px',
                border: '1px solid #e5e7eb',
                fontWeight: '500',
                fontSize: '0.9rem',
                color: '#1a1a1a',
                fontFamily: 'monospace',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>Enter</kbd> to begin
            </div>
          </div>
        </div>
      ) : (
        <>
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
            lessonKey={lesson?.lesson_key}
            typewriterRef={index === currentSection ? typewriterRef : null}
            onTextComplete={handleTextComplete}
            onExampleComplete={handleExampleComplete}
            onQuizComplete={handleQuizComplete}
            onSectionClick={handleSectionClick}
          />
        </div>
      ))}
        </>
      )}

      {hasStarted && isComplete && (
        <>
          {/* End of Lesson Marker */}
          <div style={{
            marginTop: '4rem',
            marginBottom: '2rem',
            padding: '2rem 0',
            borderTop: '2px solid #e5e7eb',
            borderBottom: '1px solid #f3f4f6'
          }}>
            <div style={{
              textAlign: 'center',
              color: '#9ca3af',
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '2rem'
            }}>
              End of Lesson
            </div>

            {/* Three-button navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}>
              {/* Previous Lesson */}
              {(() => {
                const currentIndex = lessonStructure.findIndex(l => l.id === lesson?.id);
                const previousLesson = currentIndex > 0 ? lessonStructure[currentIndex - 1] : null;

                return (
                  <div style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        if (previousLesson && onNavigate) {
                          onNavigate('lesson', previousLesson.id);
                        } else if (onNavigate) {
                          onNavigate('home');
                        }
                      }}
                      disabled={!previousLesson}
                      style={{
                        backgroundColor: '#ffffff',
                        color: previousLesson ? '#4b5563' : '#d1d5db',
                        padding: '0.625rem 1.25rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        cursor: previousLesson ? 'pointer' : 'not-allowed',
                        transition: 'all 0.15s ease',
                        minWidth: '130px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        if (previousLesson) {
                          e.target.style.backgroundColor = '#f9fafb';
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.color = '#1f2937';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (previousLesson) {
                          e.target.style.backgroundColor = '#ffffff';
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.color = '#4b5563';
                        }
                      }}
                    >
                      ← Previous Lesson
                    </button>
                    {previousLesson && (
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#9ca3af',
                        marginTop: '0.5rem',
                        maxWidth: '150px'
                      }}>
                        {previousLesson.title}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Practice */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => {
                    // TODO: Navigate to practice quiz for this lesson
                    console.log('Practice clicked for lesson:', lesson?.lesson_key);
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#2563eb',
                    padding: '0.625rem 1.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    minWidth: '130px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#eff6ff';
                    e.target.style.borderColor = '#bfdbfe';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#ffffff';
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                >
                  Practice
                </button>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginTop: '0.5rem',
                  maxWidth: '150px'
                }}>
                  Test your knowledge
                </div>
              </div>

              {/* Next Lesson */}
              {(() => {
                const currentIndex = lessonStructure.findIndex(l => l.id === lesson?.id);
                const nextLesson = currentIndex >= 0 && currentIndex < lessonStructure.length - 1
                  ? lessonStructure[currentIndex + 1]
                  : null;

                return (
                  <div style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        if (onStatusChange) onStatusChange('completed');
                        if (nextLesson && onNavigate) {
                          onNavigate('lesson', nextLesson.id);
                        } else if (onNavigate) {
                          onNavigate('home');
                        }
                      }}
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#059669',
                        padding: '0.625rem 1.25rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        minWidth: '130px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f0fdf4';
                        e.target.style.borderColor = '#bbf7d0';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#ffffff';
                        e.target.style.borderColor = '#e5e7eb';
                      }}
                    >
                      Next Lesson →
                    </button>
                    {nextLesson && (
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#9ca3af',
                        marginTop: '0.5rem',
                        maxWidth: '150px'
                      }}>
                        {nextLesson.title}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </>
      )}

      {hasStarted && currentSectionComplete && currentSection < sections.length - 1 && (
        <div className={classes.continuePrompt + ' continue-prompt continuePrompt'}>
          <span className={classes.promptText}>
            Press <span className={classes.enterKey}>Enter</span> to continue
          </span>
        </div>
      )}

      {/* Show finishing message for last section if not yet complete */}
      {(() => {
        const isLastSection = currentSection === sections.length - 1;
        const isTextSection = sections[currentSection]?.type === 'text';
        const isNotCompleted = !textCompletionStatus[currentSection];

        console.log('🔍 Debug bar check:', {
          hasStarted,
          isComplete,
          currentSection,
          totalSections: sections.length,
          isLastSection,
          isTextSection,
          isNotCompleted,
          textCompletionStatus
        });

        return null;
      })()}
      {hasStarted && !isComplete && currentSection === sections.length - 1 && sections[currentSection]?.type === 'text' && !textCompletionStatus[currentSection] && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(37, 99, 235, 0.95)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          Reading final section... Press <kbd style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}>Ctrl+→</kbd> to speed up
        </div>
      )}

    </div>
  );
};

export default ProgressiveLessonRenderer;
