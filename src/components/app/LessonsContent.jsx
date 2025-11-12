/**
 * Lessons Content Component
 * Displays the lessons grid with filtering and compact professional design
 */

import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLessonsContentStyles } from '../../styles/app/lessons-content.styles';
import StatusIcon from '../StatusIcon';
import { HiStar, HiBookOpen, HiAcademicCap, HiPencil, HiBeaker, HiChartBar, HiCalculator, HiScale, HiDocumentText, HiLightBulb } from 'react-icons/hi2';
import soundEffects from '../../services/soundEffects';

const LessonsContent = () => {
  const classes = useLessonsContentStyles();
  const {
    lessonStructure = [],
    lessonContent = {},
    expandedSections = {},
    toggleSection,
    getLessonStatus,
    onLessonOpen: openLesson,
    setHoveredMoreTag,
    setMoreTagPosition
  } = useOutletContext();

  // Local state for filtering
  const [activeSection, setActiveSection] = useState('english');
  const [viewMode, setViewMode] = useState('grid');
  const [mode, setMode] = useState('lessons'); // 'lessons' or 'practice'
  const [sliderStyle, setSliderStyle] = useState({});

  // Refs for filter buttons
  const filterButtonsRef = useRef({});
  const filterContainerRef = useRef(null);

  // Get mastery rating for a lesson from localStorage
  const getMasteryRating = (lessonId) => {
    const masteryKey = `lesson_mastery_${lessonId}`;
    const saved = localStorage.getItem(masteryKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.rating || 0;
      } catch (e) {
        return 0;
      }
    }
    return 0;
  };

  const getRatingLabel = (rating) => {
    if (rating === 0) return 'Not Started';
    if (rating === 1) return 'Beginner';
    if (rating === 2) return 'Learning';
    if (rating === 3) return 'Competent';
    if (rating === 4) return 'Advanced';
    if (rating === 5) return 'Expert';
    return 'Not Started';
  };

  const getRatingColor = (rating) => {
    if (rating === 0) return '#94a3b8';
    if (rating <= 2) return '#f59e0b';
    if (rating <= 3) return '#3b82f6';
    if (rating <= 4) return '#6366f1';
    return '#10b981';
  };

  // Update slider position when active section changes
  useEffect(() => {
    const updateSliderPosition = () => {
      // Use requestAnimationFrame to ensure DOM is fully updated
      requestAnimationFrame(() => {
        const activeButton = filterButtonsRef.current[activeSection];
        const container = filterContainerRef.current;
        if (activeButton && container) {
          // Get computed styles
          const containerStyles = window.getComputedStyle(container);
          const buttonStyles = window.getComputedStyle(activeButton);

          // Get container padding and gap
          const containerPadding = parseFloat(containerStyles.paddingLeft);
          const gap = parseFloat(containerStyles.gap) || 4;

          // Calculate position by counting buttons before the active one
          const buttons = Object.keys(filterButtonsRef.current);
          const activeIndex = buttons.indexOf(activeSection);

          // Calculate offset by summing widths of previous buttons
          let offsetLeft = containerPadding;
          for (let i = 0; i < activeIndex; i++) {
            const btn = filterButtonsRef.current[buttons[i]];
            if (btn) {
              offsetLeft += btn.offsetWidth + gap;
            }
          }

          setSliderStyle({
            width: `${activeButton.offsetWidth}px`,
            left: `${offsetLeft}px`
          });
        }
      });
    };

    updateSliderPosition();

    // Add a small delay for initial render
    const timeout = setTimeout(updateSliderPosition, 50);

    window.addEventListener('resize', updateSliderPosition);
    return () => {
      window.removeEventListener('resize', updateSliderPosition);
      clearTimeout(timeout);
    };
  }, [activeSection]);

  const handleSectionFilter = (section) => {
    soundEffects.playToggle();
    setActiveSection(section);
  };

  const getFilteredLessons = () => {
    // Merge durations from database into lesson structure
    return lessonStructure.filter(lesson => lesson.section === activeSection).map(lesson => ({
      ...lesson,
      duration: lessonContent[lesson.id]?.duration || lesson.duration
    }));
  };

  const getCategoryIcon = (category, section) => {
    const iconMap = {
      'Introduction': HiLightBulb,
      'Grammar Fundamentals': HiBookOpen,
      'Rhetorical Skills': HiPencil,
      'Advanced Grammar': HiAcademicCap,
      'Math Strategies': HiLightBulb,
      'Algebra': HiCalculator,
      'Geometry': HiScale,
      'Reading Strategies': HiBookOpen,
      'Passage Types': HiDocumentText,
      'Science Basics': HiBeaker,
      'Data Analysis': HiChartBar,
      'Other': HiDocumentText
    };
    const IconComponent = iconMap[category] || HiDocumentText;

    // Determine icon color based on section
    const iconColor = section === 'science' ? '#10b981' : '#08245b';
    const bgColor = section === 'science' ? '#d1fae5' : '#dbeafe';
    const borderColor = section === 'science' ? '#10b981' : '#08245b';

    return (
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '6px',
        background: bgColor,
        border: `2px solid ${borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: iconColor,
        fontSize: '1.125rem'
      }}>
        <IconComponent />
      </div>
    );
  };

  const getLessonsByCategory = () => {
    const filtered = getFilteredLessons();
    const grouped = {};

    filtered.forEach(lesson => {
      const category = lesson.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(lesson);
    });

    return grouped;
  };

  const renderLessonCard = (lesson) => {
    const status = getLessonStatus(lesson.id);
    const isGridView = viewMode === 'grid';

    // Format duration to "X min" format
    const formatDuration = (duration) => {
      if (!duration) return '';
      // If it's like "25 minutes", convert to "25 min"
      return duration.replace(/\s*minutes?$/i, ' min');
    };

    const handleMoreTagHover = (e, lesson) => {
      e.stopPropagation();
      const rect = e.target.getBoundingClientRect();
      setMoreTagPosition({
        top: rect.top,
        left: rect.left + rect.width / 2
      });
      setHoveredMoreTag(lesson);
    };

    return (
      <div
        key={lesson.id}
        className={`${isGridView ? classes.lessonCard : classes.lessonCardListView} ${status}`}
        onClick={() => {
          soundEffects.playClick();
          openLesson(lesson.id, 'review');
        }}
        onMouseLeave={() => setHoveredMoreTag(null)}
      >
        <div className={classes.lessonStatus}>
          <StatusIcon status={status} />
        </div>
        <div className={classes.lessonInfo}>
          <div className={classes.lessonTitle}>{lesson.title}</div>
          {lesson.chapterNum && (
            <div className={classes.lessonChapter}>{lesson.chapterNum}</div>
          )}
          {lesson.keyTerms && lesson.keyTerms.length > 0 && (
            <div className={classes.keyTermsTags}>
              {lesson.keyTerms.slice(0, 2).join(' • ')}
              {lesson.keyTerms.length > 2 && (
                <span
                  onMouseEnter={(e) => handleMoreTagHover(e, lesson)}
                  style={{ cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted' }}
                >
                  {` • +${lesson.keyTerms.length - 2} more`}
                </span>
              )}
            </div>
          )}
          {lesson.duration && (
            <div style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {formatDuration(lesson.duration)}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Practice view render - same as lessons but with star ratings
  const renderPracticeCard = (lesson) => {
    const rating = getMasteryRating(lesson.id);
    const ratingColor = getRatingColor(rating);
    const isGridView = viewMode === 'grid';
    const isGolden = rating === 5;

    // Format duration to "X min" format
    const formatDuration = (duration) => {
      if (!duration) return '';
      // If it's like "25 minutes", convert to "25 min"
      return duration.replace(/\s*minutes?$/i, ' min');
    };

    const handleMoreTagHover = (e, lesson) => {
      e.stopPropagation();
      const rect = e.target.getBoundingClientRect();
      setMoreTagPosition({
        top: rect.top,
        left: rect.left + rect.width / 2
      });
      setHoveredMoreTag(lesson);
    };

    return (
      <div
        key={lesson.id}
        className={`${isGridView ? classes.lessonCard : classes.lessonCardListView} ${isGolden ? 'golden' : ''}`}
        onClick={() => {
          soundEffects.playClick();
          openLesson(lesson.id, 'practice');
        }}
        onMouseLeave={() => setHoveredMoreTag(null)}
      >
        <div className={classes.lessonStatus}>
          {/* Star Rating instead of status icon */}
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = rating >= star;
              const isHalf = rating >= star - 0.5 && rating < star;
              const starColor = '#fbbf24'; // Golden color for all filled stars

              return (
                <div key={star} style={{ position: 'relative', width: '0.875rem', height: '0.875rem' }}>
                  {isHalf ? (
                    <>
                      <HiStar style={{ position: 'absolute', color: '#e5e7eb', fontSize: '0.875rem' }} />
                      <div style={{ position: 'absolute', width: '50%', overflow: 'hidden' }}>
                        <HiStar style={{ color: starColor, fontSize: '0.875rem' }} />
                      </div>
                    </>
                  ) : (
                    <HiStar
                      style={{
                        color: isFilled ? starColor : '#e5e7eb',
                        fontSize: '0.875rem'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.lessonInfo}>
          <div className={classes.lessonTitle}>{lesson.title}</div>
          {lesson.chapterNum && (
            <div className={classes.lessonChapter}>{lesson.chapterNum}</div>
          )}
          {lesson.keyTerms && lesson.keyTerms.length > 0 && (
            <div className={classes.keyTermsTags}>
              {lesson.keyTerms.slice(0, 2).join(' • ')}
              {lesson.keyTerms.length > 2 && (
                <span
                  onMouseEnter={(e) => handleMoreTagHover(e, lesson)}
                  style={{ cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted' }}
                >
                  {` • +${lesson.keyTerms.length - 2} more`}
                </span>
              )}
            </div>
          )}
          {lesson.duration && (
            <div style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {formatDuration(lesson.duration)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPracticeView = () => {
    const grouped = getLessonsByCategory();
    return (
      <div>
        {Object.entries(grouped).map(([category, lessons], idx) => (
          <div key={category} className={classes.unitBox}>
            <div className={classes.unitHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {getCategoryIcon(category, activeSection)}
                <h3 className={classes.unitTitle}>{category}</h3>
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: activeSection === 'science' ? '#10b981' : '#08245b',
                background: activeSection === 'science' ? '#d1fae5' : '#f0f9ff',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px'
              }}>
                Unit {idx + 1}
              </span>
            </div>
            <div className={classes.unitContent}>
              <div className={classes.lessonsList}>
                {lessons.map(lesson => renderPracticeCard(lesson))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={classes.lessonsContainer}>
      <div className={classes.pageHeader}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h1 className={classes.pageTitle}>Lessons</h1>
            <p className={classes.pageSubtitle}>Master every concept with structured lessons and practice</p>
          </div>

          {/* Mode Toggle */}
          <div className={classes.modeToggle}>
            <button
              className={`${classes.modeButton} ${mode === 'lessons' ? 'active' : ''}`}
              onClick={() => {
                soundEffects.playToggle();
                setMode('lessons');
              }}
            >
              Lessons
            </button>
            <button
              className={`${classes.modeButton} ${mode === 'practice' ? 'active' : ''}`}
              onClick={() => {
                soundEffects.playToggle();
                setMode('practice');
              }}
            >
              Practice
            </button>
          </div>
        </div>
      </div>
      <div className={classes.contentSection}>
        <div className={classes.controlsBar}>
          <div className={classes.filterButtons} ref={filterContainerRef}>
            <div className={`${classes.filterSlider} ${activeSection === 'science' ? 'science' : ''}`} style={sliderStyle} />
            <button
              ref={el => filterButtonsRef.current['getting-started'] = el}
              className={`${classes.filterButton} getting-started ${activeSection === 'getting-started' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('getting-started')}
            >
              Getting Started
            </button>
            <button
              ref={el => filterButtonsRef.current['english'] = el}
              className={`${classes.filterButton} english ${activeSection === 'english' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('english')}
            >
              English
            </button>
            <button
              ref={el => filterButtonsRef.current['math'] = el}
              className={`${classes.filterButton} math ${activeSection === 'math' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('math')}
            >
              Math
            </button>
            <button
              ref={el => filterButtonsRef.current['reading'] = el}
              className={`${classes.filterButton} reading ${activeSection === 'reading' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('reading')}
            >
              Reading
            </button>
            <button
              ref={el => filterButtonsRef.current['science'] = el}
              className={`${classes.filterButton} science ${activeSection === 'science' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('science')}
            >
              Science
            </button>
          </div>

          <div className={classes.viewToggle}>
            <button
              className={`${classes.viewButton} ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => {
                soundEffects.playToggle();
                setViewMode('grid');
              }}
              title="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              className={`${classes.viewButton} ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => {
                soundEffects.playToggle();
                setViewMode('list');
              }}
              title="List view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {mode === 'practice' ? (
          renderPracticeView()
        ) : (
          <div>
            {Object.entries(getLessonsByCategory()).map(([category, lessons], idx) => (
            <div key={category} className={classes.unitBox}>
              <div className={classes.unitHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {getCategoryIcon(category, activeSection)}
                  <h3 className={classes.unitTitle}>{category}</h3>
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: activeSection === 'science' ? '#10b981' : '#08245b',
                  background: activeSection === 'science' ? '#d1fae5' : '#f0f9ff',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  Unit {idx + 1}
                </span>
              </div>
              <div className={classes.unitContent}>
                <div className={viewMode === 'grid' ? classes.lessonsList : classes.lessonsListView}>
                  {lessons.map(lesson => renderLessonCard(lesson))}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsContent;
