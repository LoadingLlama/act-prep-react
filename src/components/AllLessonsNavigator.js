import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navigator: {
    position: 'fixed',
    left: '0',
    top: '60px',
    width: '320px',
    height: 'calc(100vh - 60px)',
    overflowY: 'auto',
    background: '#f5f5f5',
    padding: '1rem 0.75rem',
    zIndex: 100,
    borderRight: '1px solid #e0e0e0',
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#d1d5db',
      borderRadius: '3px',
      '&:hover': {
        background: '#9ca3af'
      }
    }
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.5rem 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#5f6368',
    fontSize: '0.8rem',
    fontWeight: '500',
    marginBottom: '1rem',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#202124'
    }
  },
  courseTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#5f6368',
    marginBottom: '1rem',
    paddingLeft: '0.25rem'
  },
  unitGroup: {
    marginBottom: '0.35rem'
  },
  unitHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.6rem',
    cursor: 'pointer',
    background: '#e8eaed',
    borderRadius: '6px',
    transition: 'background 0.2s',
    '&:hover': {
      background: '#dadce0'
    }
  },
  unitToggle: {
    fontSize: '0.6rem',
    color: '#5f6368',
    transition: 'transform 0.2s',
    '&.expanded': {
      transform: 'rotate(90deg)'
    }
  },
  unitTitle: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#3c4043',
    flex: 1
  },
  lessonsList: {
    marginTop: '0.35rem',
    paddingLeft: '0.75rem'
  },
  allTopicsLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    marginBottom: '0.35rem',
    cursor: 'pointer',
    fontSize: '0.75rem',
    color: '#5f6368',
    fontWeight: '500',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#1a73e8'
    }
  },
  lessonItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    marginBottom: '0.2rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.75rem',
    color: '#5f6368',
    '&:hover': {
      color: '#202124'
    }
  },
  lessonItemActive: {
    color: '#1a73e8 !important',
    fontWeight: '500'
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    flexShrink: 0
  },
  statusCompleted: {
    background: '#34a853'
  },
  statusInProgress: {
    background: '#fbbc04'
  },
  statusNotStarted: {
    background: '#80868b'
  },
  lessonText: {
    flex: 1
  },
  lessonNumber: {
    color: '#5f6368',
    marginRight: '0.2rem',
    fontSize: '0.75rem'
  },
  progressSection: {
    padding: '0.75rem 0.5rem',
    marginBottom: '0.75rem',
    borderBottom: '1px solid #e0e0e0'
  },
  progressText: {
    fontSize: '0.7rem',
    color: '#80868b',
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressBarContainer: {
    width: '100%',
    height: '4px',
    background: '#e0e0e0',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    background: '#34a853',
    borderRadius: '2px',
    transition: 'width 0.3s ease'
  }
});

const AllLessonsNavigator = ({ lessonStructure, currentLessonId, onLessonChange, onBackClick, lessonProgress = {} }) => {
  const classes = useStyles();

  // Find current lesson's unit to auto-expand it
  const currentLesson = lessonStructure.find(l => l.id === currentLessonId);
  const currentSection = currentLesson?.section || 'english';
  const currentCategory = currentLesson?.category || '';
  const currentUnitKey = `${currentSection}-${currentCategory}`;

  const [expandedUnits, setExpandedUnits] = useState({
    [currentUnitKey]: true
  });

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
    <div className={classes.navigator}>
      <button className={classes.backButton} onClick={onBackClick}>
        ← Back to Subjects
      </button>

      <div className={classes.courseTitle}>{courseTitle}</div>

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
                        <div className={`${classes.statusDot} ${getStatusDotClass(lesson.status)}`} />
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
  );
};

export default AllLessonsNavigator;
