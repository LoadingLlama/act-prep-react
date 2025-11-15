/**
 * Lessons Content Component
 * Displays the lessons grid with filtering and compact professional design
 */

import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLessonsContentStyles } from '../../styles/app/lessons-content.styles';
import { getFeatureAccess } from '../../services/subscription.service';
import StatusIcon from '../StatusIcon';
import {
  HiStar,
  HiBookOpen,
  HiAcademicCap,
  HiBeaker,
  HiChartBar,
  HiCalculator,
  HiDocumentText,
  HiLightBulb,
  HiSparkles,
  HiPencilSquare,
  HiChatBubbleLeftRight,
  HiCube,
  HiArrowTrendingUp,
  HiHashtag,
  HiChartPie,
  HiCpuChip,
  HiQuestionMarkCircle,
  HiRocketLaunch,
  HiPuzzlePiece,
  HiLockClosed
} from 'react-icons/hi2';
import soundEffects from '../../services/soundEffects';

const LessonsContent = () => {
  const classes = useLessonsContentStyles();
  const { user } = useAuth();
  const navigate = useNavigate();
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
  const [featureAccess, setFeatureAccess] = useState(null);
  const [previewLesson, setPreviewLesson] = useState(null);

  // Refs for filter buttons
  const filterButtonsRef = useRef({});
  const filterContainerRef = useRef(null);

  // Check feature access
  useEffect(() => {
    if (user) {
      checkFeatureAccess();
    }
  }, [user]);

  const checkFeatureAccess = async () => {
    try {
      const access = await getFeatureAccess(user.id);
      setFeatureAccess(access);
    } catch (error) {
      console.error('Error checking feature access:', error);
    }
  };

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
    const sectionLessons = lessonStructure
      .filter(lesson => lesson.section === activeSection)
      .map((lesson, index) => {
        const isLocked = featureAccess && !featureAccess.isPro && index >= featureAccess.lessonsPerSection;
        return {
          ...lesson,
          duration: lessonContent[lesson.id]?.duration || lesson.duration,
          isLocked
        };
      });
    return sectionLessons;
  };

  const getCategoryIcon = (category, section) => {
    const iconMap = {
      'Introduction': HiSparkles,
      'Grammar Fundamentals': HiPencilSquare,
      'Rhetorical Skills': HiChatBubbleLeftRight,
      'Test-Taking Strategies': HiLightBulb,
      'Geometry': HiCube,
      'Algebra Fundamentals': HiCalculator,
      'Advanced Algebra': HiArrowTrendingUp,
      'Numbers & Operations': HiHashtag,
      'Statistics & Probability': HiChartPie,
      'Advanced Topics': HiCpuChip,
      'Fundamentals': HiAcademicCap,
      'Question Types': HiQuestionMarkCircle,
      'Advanced Strategies': HiRocketLaunch,
      'Data Interpretation': HiChartBar,
      'Advanced Question Types': HiPuzzlePiece,
      'Background Knowledge': HiBookOpen,
      'Other': HiDocumentText
    };
    const IconComponent = iconMap[category] || HiDocumentText;

    // Determine icon color based on section
    let iconColor = '#08245b';
    let bgColor = '#dbeafe';

    if (section === 'science') {
      iconColor = '#10b981';
      bgColor = '#d1fae5';
    } else if (section === 'math') {
      iconColor = '#b91c1c';
      bgColor = '#fecaca';
    } else if (section === 'reading') {
      iconColor = '#713f12';
      bgColor = '#fef3c7';
    }

    return (
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '6px',
        background: bgColor,
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
          if (lesson.isLocked) {
            navigate('/app/upgrade');
          } else {
            setPreviewLesson({ ...lesson, status });
          }
        }}
        onMouseLeave={() => setHoveredMoreTag(null)}
        style={lesson.isLocked ? { opacity: 0.6, cursor: 'pointer' } : {}}
      >
        <div className={classes.lessonStatus} style={!isGridView ? { position: 'relative', top: 'auto', right: 'auto' } : {}}>
          {lesson.isLocked ? <HiLockClosed style={{ fontSize: '1.125rem', color: '#3b82f6' }} /> : <StatusIcon status={status} />}
        </div>
        <div className={classes.lessonInfo} style={!isGridView ? { paddingRight: 0 } : {}}>
          <div className={classes.lessonTitle} style={!isGridView ? { fontSize: '0.8rem', marginBottom: '0.15rem', lineHeight: '1.2' } : {}}>
            {lesson.title}
            {lesson.isLocked && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#3b82f6', fontWeight: '600' }}>Pro</span>}
          </div>
          {lesson.chapterNum && isGridView && (
            <div className={classes.lessonChapter}>{lesson.chapterNum}</div>
          )}
          {lesson.keyTerms && lesson.keyTerms.length > 0 && isGridView && (
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
          {lesson.duration && isGridView && (
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
          {lesson.chapterNum && !isGridView && (
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '500' }}>{lesson.chapterNum}</div>
          )}
        </div>
        {lesson.duration && !isGridView && (
          <div style={{
            fontSize: '0.7rem',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flexShrink: 0
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {formatDuration(lesson.duration)}
          </div>
        )}
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
        <div className={classes.lessonInfo} style={!isGridView ? { paddingRight: 0 } : {}}>
          <div className={classes.lessonTitle} style={!isGridView ? { fontSize: '0.8rem', marginBottom: '0.15rem', lineHeight: '1.2' } : { overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{lesson.title}</div>
          {lesson.chapterNum && isGridView && (
            <div className={classes.lessonChapter}>{lesson.chapterNum}</div>
          )}
          {lesson.chapterNum && !isGridView && (
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '500' }}>{lesson.chapterNum}</div>
          )}
        </div>
        {/* Star Rating - positioned inline on the right for list view, absolute for grid view */}
        <div style={!isGridView ? {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          flexShrink: 0
        } : {
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          gap: '1px',
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = rating >= star;
            const isHalf = rating >= star - 0.5 && rating < star;
            const starColor = '#fbbf24'; // Golden color for all filled stars
            const starSize = !isGridView ? '0.7rem' : '0.875rem';

            return (
              <div key={star} style={{ position: 'relative', display: 'inline-block', fontSize: starSize, lineHeight: 1 }}>
                {isHalf ? (
                  <>
                    <HiStar style={{ display: 'block', color: '#e5e7eb' }} />
                    <div style={{ position: 'absolute', width: '50%', overflow: 'hidden', left: 0, top: 0, height: '100%' }}>
                      <HiStar style={{ display: 'block', color: starColor }} />
                    </div>
                  </>
                ) : (
                  <HiStar
                    style={{
                      display: 'block',
                      color: isFilled ? starColor : '#e5e7eb'
                    }}
                  />
                )}
              </div>
            );
          })}
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
                color: activeSection === 'science' ? '#10b981' : activeSection === 'math' ? '#b91c1c' : activeSection === 'reading' ? '#713f12' : '#08245b',
                background: activeSection === 'science' ? '#d1fae5' : activeSection === 'math' ? '#fecaca' : activeSection === 'reading' ? '#fef3c7' : '#f0f9ff',
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
            <div className={`${classes.filterSlider} ${activeSection}`} style={sliderStyle} />
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
              style={viewMode === 'grid' ? {
                background: activeSection === 'science' ? '#10b981' : activeSection === 'math' ? '#b91c1c' : activeSection === 'reading' ? '#713f12' : '#08245b',
                color: '#ffffff',
                boxShadow: activeSection === 'science' ? '0 2px 4px rgba(16, 185, 129, 0.25), 0 1px 2px rgba(16, 185, 129, 0.15)' :
                           activeSection === 'math' ? '0 2px 4px rgba(185, 28, 28, 0.25), 0 1px 2px rgba(185, 28, 28, 0.15)' :
                           activeSection === 'reading' ? '0 2px 4px rgba(113, 63, 18, 0.25), 0 1px 2px rgba(113, 63, 18, 0.15)' :
                           '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)'
              } : {}}
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
              style={viewMode === 'list' ? {
                background: activeSection === 'science' ? '#10b981' : activeSection === 'math' ? '#b91c1c' : activeSection === 'reading' ? '#713f12' : '#08245b',
                color: '#ffffff',
                boxShadow: activeSection === 'science' ? '0 2px 4px rgba(16, 185, 129, 0.25), 0 1px 2px rgba(16, 185, 129, 0.15)' :
                           activeSection === 'math' ? '0 2px 4px rgba(185, 28, 28, 0.25), 0 1px 2px rgba(185, 28, 28, 0.15)' :
                           activeSection === 'reading' ? '0 2px 4px rgba(113, 63, 18, 0.25), 0 1px 2px rgba(113, 63, 18, 0.15)' :
                           '0 2px 4px rgba(8, 36, 91, 0.25), 0 1px 2px rgba(8, 36, 91, 0.15)'
              } : {}}
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
                  color: activeSection === 'science' ? '#10b981' : activeSection === 'math' ? '#b91c1c' : activeSection === 'reading' ? '#713f12' : '#08245b',
                  background: activeSection === 'science' ? '#d1fae5' : activeSection === 'math' ? '#fecaca' : activeSection === 'reading' ? '#fef3c7' : '#f0f9ff',
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

      {/* Lesson Preview Modal */}
      {previewLesson && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}
        onClick={() => setPreviewLesson(null)}
        >
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewLesson(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: '#6b7280',
                cursor: 'pointer',
                padding: '0.25rem',
                lineHeight: 1
              }}
            >
              ×
            </button>

            <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', paddingRight: '2rem' }}>
              {previewLesson.title}
            </h2>

            {previewLesson.section && (
              <div style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                marginBottom: '1rem',
                background: previewLesson.section === 'english' ? '#f0f9ff' :
                           previewLesson.section === 'math' ? '#fef2f2' :
                           previewLesson.section === 'reading' ? '#fefce8' :
                           previewLesson.section === 'science' ? '#f0fdf4' : '#f3f4f6',
                color: previewLesson.section === 'english' ? '#0369a1' :
                       previewLesson.section === 'math' ? '#dc2626' :
                       previewLesson.section === 'reading' ? '#ca8a04' :
                       previewLesson.section === 'science' ? '#15803d' : '#6b7280'
              }}>
                {previewLesson.section?.toUpperCase()}
              </div>
            )}

            {previewLesson.status && (
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: previewLesson.status === 'completed' ? '#16a34a' : previewLesson.status === 'in-progress' ? '#f59e0b' : '#94a3b8'
                }} />
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {previewLesson.status === 'completed' ? 'Completed' : previewLesson.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                </span>
              </div>
            )}

            {previewLesson.chapterNum && (
              <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <strong>Chapter:</strong> {previewLesson.chapterNum}
              </p>
            )}

            {previewLesson.duration && (
              <p style={{ margin: '0 0 1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <strong>Duration:</strong> {previewLesson.duration}
              </p>
            )}

            {previewLesson.keyTerms && previewLesson.keyTerms.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Key Concepts:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {previewLesson.keyTerms.map((term, idx) => (
                    <span key={idx} style={{
                      padding: '0.25rem 0.625rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      background: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
              <button
                onClick={() => setPreviewLesson(null)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  background: 'white',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPreviewLesson(null);
                  openLesson(previewLesson.id, 'review');
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Start Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsContent;
