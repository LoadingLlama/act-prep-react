import React, { useState, useEffect } from 'react';
import { useAllLessonsNavigatorStyles } from './AllLessonsNavigator.styles';

const AllLessonsNavigator = ({ lessonStructure, currentLessonId, onLessonChange, onBackClick, lessonProgress = {}, lessonMode, setLessonMode }) => {
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
  const sectionLessons = lessonStructure.filter(l => l.section === currentSectionName);
  const completedLessons = sectionLessons.filter(l => lessonProgress[l.id] === 'completed').length;
  const totalLessons = sectionLessons.length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className={`${classes.navigator} ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button */}
      <button className={classes.toggleButton} onClick={toggleCollapse}>
        <span className={`${classes.toggleIcon} ${isCollapsed ? 'collapsed' : ''}`}>
          ◀
        </span>
      </button>

      {/* Collapsed View */}
      <div className={classes.collapsedView}>
        <div
          className={classes.collapsedIcon}
          onClick={onBackClick}
          title="Back to Subjects"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </div>
      </div>

      {/* Full Content View */}
      <div className={classes.contentWrapper}>
        <div style={{
          padding: '0.5rem 0.5rem',
          marginBottom: '0.75rem',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <img
            src="/images/nomi-academy-logo.png"
            alt="Nomi Academy"
            style={{
              height: '48px',
              objectFit: 'contain'
            }}
          />
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
              onClick={() => setLessonMode('practice')}
            >
              Practice
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

      {Object.entries(groupedLessons).map(([section, units]) => {
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

                    return (
                      <div
                        key={lesson.id}
                        className={`${classes.lessonItem} ${isActive ? classes.lessonItemActive : ''}`}
                        onClick={() => onLessonChange && onLessonChange(lesson.id)}
                      >
                        <div className={`${classes.statusDot} ${getStatusDotClass(lessonProgress[lesson.id] || 'not-started')}`} />
                        <div className={classes.lessonText}>
                          {lesson.chapterNum && (
                            <span className={classes.lessonNumber}>Topic {lesson.chapterNum}:</span>
                          )}
                          {lesson.title}
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
  );
};

export default AllLessonsNavigator;
