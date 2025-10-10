import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navigator: {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '320px',
    height: '100vh',
    overflowY: 'auto',
    background: '#f5f5f5',
    padding: '0.5rem 0.75rem',
    zIndex: 50,
    borderRight: '1px solid #e0e0e0',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.collapsed': {
      width: '60px',
      padding: '0.5rem 0.5rem',
      overflowY: 'hidden'
    },
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
  },
  toggleButton: {
    position: 'fixed',
    top: '50%',
    left: '300px',
    width: '24px',
    height: '48px',
    borderRadius: '0 8px 8px 0',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #e5e7eb',
    borderLeft: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 100,
    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease',
    backdropFilter: 'blur(10px)',
    boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
    transform: 'translateY(-50%)',
    '$navigator.collapsed &': {
      left: '40px'
    },
    '&:hover': {
      background: 'rgba(249, 250, 251, 0.95)',
      boxShadow: '2px 0 12px rgba(0,0,0,0.08)'
    }
  },
  toggleIcon: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.collapsed': {
      transform: 'rotate(180deg)'
    }
  },
  contentWrapper: {
    opacity: 1,
    transition: 'opacity 0.2s ease',
    '$navigator.collapsed &': {
      opacity: 0,
      pointerEvents: 'none'
    }
  },
  collapsedView: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    paddingTop: '1rem',
    width: '100%',
    '$navigator.collapsed &': {
      display: 'flex'
    }
  },
  collapsedIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#1a73e8',
      transform: 'translateY(-2px)'
    }
  },
  collapsedIconActive: {
    background: '#e8f0fe',
    borderColor: '#1a73e8'
  }
});

const AllLessonsNavigator = ({ lessonStructure, currentLessonId, onLessonChange, onBackClick, lessonProgress = {} }) => {
  const classes = useStyles();

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
          <div style={{
            fontSize: '1.15rem',
            fontWeight: '600',
            color: '#1a73e8',
            letterSpacing: '-0.02em'
          }}>
            Launch Prep
          </div>
        </div>

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
