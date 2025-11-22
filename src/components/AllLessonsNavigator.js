import React, { useState, useEffect } from 'react';
import { useAllLessonsNavigatorStyles } from './AllLessonsNavigator.styles';
import { HiStar } from 'react-icons/hi2';
import Logo from './common/Logo';

const AllLessonsNavigator = ({ lessonStructure, currentLessonId, onLessonChange, onBackClick, lessonProgress = {}, lessonMode, setLessonMode, practiceQuestions = [], currentQuestionIndex = 0, onQuestionChange, questionResults = [] }) => {
  const classes = useAllLessonsNavigatorStyles();

  // Collapse state with localStorage persistence
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  // Find current lesson's unit to auto-expand it
  const currentLesson = lessonStructure.find(l => l.id === currentLessonId);
  const currentSection = currentLesson?.section || 'english';
  const currentCategory = currentLesson?.category || '';
  const currentUnitKey = `${currentSection}-${currentCategory}`;

  const [expandedUnits, setExpandedUnits] = useState({
    [currentUnitKey]: true
  });

  // Save collapse state to localStorage and add body class
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    return () => {
      document.body.classList.remove('sidebar-collapsed');
    };
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Update expanded units when current lesson changes
  useEffect(() => {
    setExpandedUnits({
      [currentUnitKey]: true
    });
  }, [currentLessonId, currentUnitKey]);

  // Group lessons by section and then by category (unit)
  const groupedLessons = lessonStructure.reduce((acc, lesson) => {
    // In practice mode, completely skip Introduction lessons
    if (lessonMode === 'practice' && lesson.category === 'Introduction') {
      return acc;
    }

    const section = lesson.section === 'all' ? 'Introduction' : lesson.section;
    const category = lesson.category || 'Other';

    if (!acc[section]) {
      acc[section] = {};
    }
    if (!acc[section][category]) {
      acc[section][category] = [];
    }
    acc[section][category].push(lesson);
    return acc;
  }, {});

  const toggleUnit = (key) => {
    setExpandedUnits(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getSectionTitle = (section) => {
    const titles = {
      'Introduction': 'Getting Started',
      'english': 'ACT English',
      'math': 'ACT Math',
      'reading': 'ACT Reading',
      'science': 'ACT Science'
    };
    return titles[section] || section;
  };

  const getStatusDotClass = (status) => {
    if (status === 'completed') return classes.statusCompleted;
    if (status === 'in-progress') return classes.statusInProgress;
    return classes.statusNotStarted;
  };

  // Get first section's name for course title
  const currentLessonData = lessonStructure.find(l => l.id === currentLessonId);
  const currentSectionName = currentLessonData?.section || 'english';
  const courseTitle = getSectionTitle(currentSectionName);

  // Calculate progress for current section
  const sectionLessons = lessonStructure.filter(l => {
    if (l.section !== currentSectionName) return false;
    // In practice mode, exclude Introduction lessons from progress calculation
    if (lessonMode === 'practice' && l.category === 'Introduction') return false;
    return true;
  });
  const completedLessons = sectionLessons.filter(l => lessonProgress[l.id] === 'completed').length;
  const totalLessons = sectionLessons.length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className={`${classes.navigator} ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Collapsed View */}
      <div className={classes.collapsedView}>
        {/* Toggle Button for collapsed state */}
        <button
          className={classes.toggleButton}
          onClick={toggleCollapse}
          style={{ position: 'relative', top: 'auto', right: 'auto', marginBottom: '1rem' }}
        >
          <span className={`${classes.toggleIcon} ${isCollapsed ? 'collapsed' : ''}`}>
            ◀
          </span>
        </button>

        {/* Simple back arrow icon */}
        <div
          onClick={onBackClick}
          title="Back to Subjects"
          style={{
            cursor: 'pointer',
            padding: '0.75rem',
            color: '#5f6368',
            transition: 'color 0.2s ease',
            fontSize: '1.2rem'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#202124'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#5f6368'}
        >
          ←
        </div>
      </div>

      {/* Full Content View */}
      <div className={classes.contentWrapper}>
        {/* Header Section with darker background */}
        <div className={classes.headerSection} style={{ position: 'relative' }}>
          {/* Toggle Button in top right */}
          <button className={classes.toggleButton} onClick={toggleCollapse}>
            <span className={`${classes.toggleIcon} ${isCollapsed ? 'collapsed' : ''}`}>
              ◀
            </span>
          </button>

          <div style={{
            padding: '0 0.5rem',
            marginBottom: '0.75rem'
          }}>
            <Logo size="large" />
          </div>

          <button className={classes.backButton} onClick={onBackClick}>
            ← Back to Subjects
          </button>

          <div className={classes.courseTitle}>{courseTitle}</div>

          {/* Mode Toggle */}
          {setLessonMode && (
            <div className={classes.modeToggle}>
              <button
                className={`${classes.modeButton} ${lessonMode === 'review' ? 'active' : ''}`}
                onClick={() => setLessonMode('review')}
              >
                Review
              </button>
              <button
                className={`${classes.modeButton} ${lessonMode === 'practice' ? 'active' : ''}`}
                onClick={() => {
                  // Check if current lesson is an introduction lesson (no practice available)
                  const isIntroLesson = currentLesson?.category === 'Introduction';
                  if (!isIntroLesson) {
                    setLessonMode('practice');
                  }
                }}
                disabled={currentLesson?.category === 'Introduction'}
                style={{
                  opacity: currentLesson?.category === 'Introduction' ? 0.4 : 1,
                  cursor: currentLesson?.category === 'Introduction' ? 'not-allowed' : 'pointer',
                  position: 'relative'
                }}
                title={currentLesson?.category === 'Introduction' ? 'Practice unavailable for introduction lessons' : ''}
              >
                Practice
                {currentLesson?.category === 'Introduction' && (
                  <div style={{
                    fontSize: '0.6rem',
                    fontWeight: '400',
                    marginTop: '0.125rem',
                    opacity: 0.7,
                    lineHeight: 1
                  }}>
                    Unavailable
                  </div>
                )}
              </button>
            </div>
          )}

          {/* Progress Bar */}
          <div className={classes.progressSection}>
            <div className={classes.progressText}>
              <span>Progress</span>
              <span>{completedLessons}/{totalLessons}</span>
            </div>
            <div className={classes.progressBarContainer}>
              <div className={classes.progressBarFill} style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>
        </div>

        {/* Content Section with white background */}
        <div className={classes.contentSection}>
          {/* Practice Questions List (when in practice mode) */}
          {lessonMode === 'practice' && practiceQuestions.length > 0 && (
            <div style={{ padding: '0' }}>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#64748b',
                marginBottom: '0.5rem',
                paddingLeft: '0.5rem'
              }}>
                {practiceQuestions.length} Questions
              </div>
              <div>
                {practiceQuestions.map((question, index) => {
              const isAnswered = questionResults.some(r => r.questionId === question.id);
              const isCorrect = questionResults.find(r => r.questionId === question.id)?.correct;
              const isCurrent = index === currentQuestionIndex;

              return (
                <div
                  key={index}
                  onClick={() => onQuestionChange && onQuestionChange(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    cursor: 'pointer',
                    background: isCurrent ? '#e3f2fd' : 'transparent',
                    borderLeft: isCurrent ? '3px solid #2196f3' : '3px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) e.currentTarget.style.background = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    minWidth: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    background: isAnswered
                      ? (isCorrect ? '#c8e6c9' : '#ffcdd2')
                      : (isCurrent ? '#bbdefb' : '#f5f5f5'),
                    color: isAnswered
                      ? (isCorrect ? '#2e7d32' : '#c62828')
                      : (isCurrent ? '#1976d2' : '#757575')
                  }}>
                    {isAnswered ? (isCorrect ? '✓' : '✗') : (index + 1)}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: isCurrent ? '600' : '400',
                    color: isCurrent ? '#1a1a1a' : '#5f6368'
                  }}>
                    Question {index + 1}
                  </div>
                  </div>
                );
              })}
              </div>
            </div>
          )}

          {/* Lesson Units List (when in review mode) */}
          {lessonMode === 'review' && Object.entries(groupedLessons).map(([section, units]) => {
        // Only show current section
        if (section !== currentSectionName && section !== 'Introduction') return null;

        // Filter out Introduction category first
        const filteredUnits = Object.entries(units).filter(([category]) => category !== 'Introduction');

        return filteredUnits.map(([category, lessons], categoryIndex) => {
          const unitKey = `${section}-${category}`;
          const isExpanded = expandedUnits[unitKey] === true; // only expand if explicitly true
          const unitNumber = categoryIndex + 1;

          return (
            <div key={unitKey} className={classes.unitGroup}>
              <div className={classes.unitHeader} onClick={() => toggleUnit(unitKey)}>
                <span className={`${classes.unitToggle} ${isExpanded ? 'expanded' : ''}`}>
                  ▶
                </span>
                <span className={classes.unitTitle}>
                  Unit {unitNumber} - {category}
                </span>
              </div>

              {isExpanded && (
                <div className={classes.lessonsList}>
                  <div className={classes.allTopicsLink}>
                    Unit {unitNumber}: All Topics
                  </div>

                  {lessons.map(lesson => {
                    const isActive = lesson.id === currentLessonId;
                    const isIntroLesson = lesson.category === 'Introduction';
                    const isPracticeMode = lessonMode === 'practice';
                    const isDisabled = isPracticeMode && isIntroLesson;

                    return (
                      <div
                        key={lesson.id}
                        className={`${classes.lessonItem} ${isActive ? classes.lessonItemActive : ''}`}
                        onClick={() => !isDisabled && onLessonChange && onLessonChange(lesson.id)}
                        style={{
                          opacity: isDisabled ? 0.5 : 1,
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                          pointerEvents: isDisabled ? 'none' : 'auto'
                        }}
                        title={isDisabled ? 'Practice unavailable for introduction lessons' : ''}
                      >
                        <div className={`${classes.statusDot} ${getStatusDotClass(lessonProgress[lesson.id] || 'not-started')}`} />
                        <div className={classes.lessonText}>
                          {lesson.chapterNum && (
                            <span className={classes.lessonNumber}>{lesson.chapterNum}:</span>
                          )}
                          {lesson.title}
                          {isDisabled && (
                            <span style={{
                              fontSize: '0.65rem',
                              fontWeight: '500',
                              marginLeft: '0.5rem',
                              color: '#94a3b8',
                              fontStyle: 'italic'
                            }}>
                              (No practice)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              </div>
            );
          });
        })}
        </div>
      </div>
    </div>
  );
};

export default AllLessonsNavigator;
