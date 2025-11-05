/**
 * Lessons Content Component
 * Displays the lessons grid with filtering and compact professional design
 */

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLessonsContentStyles } from '../../styles/app/lessons-content.styles';
import StatusIcon from '../StatusIcon';
import { HiStar } from 'react-icons/hi2';

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

  const handleSectionFilter = (section) => {
    setActiveSection(section);
  };

  const getFilteredLessons = () => {
    // Merge durations from database into lesson structure
    return lessonStructure.filter(lesson => lesson.section === activeSection).map(lesson => ({
      ...lesson,
      duration: lessonContent[lesson.id]?.duration || lesson.duration
    }));
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

    return (
      <div
        key={lesson.id}
        className={`${isGridView ? classes.lessonCard : classes.lessonCardListView} ${status}`}
        onClick={() => openLesson(lesson.id, 'review')}
        onMouseLeave={() => setHoveredMoreTag(null)}
      >
        <div className={classes.lessonStatus}>
          <StatusIcon status={status} />
        </div>
        <div className={classes.lessonInfo}>
          {lesson.chapterNum && (
            <div className={classes.lessonChapter}>Topic {lesson.chapterNum}</div>
          )}
          <div className={classes.lessonTitle}>{lesson.title}</div>
          {lesson.keyTerms && lesson.keyTerms.length > 0 && (
            <div className={classes.keyTermsTags}>
              {lesson.keyTerms.slice(0, 2).join(' • ')}
              {lesson.keyTerms.length > 2 && ` • +${lesson.keyTerms.length - 2} more`}
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
              Reading Time: {lesson.duration}
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

    return (
      <div
        key={lesson.id}
        className={`${isGridView ? classes.lessonCard : classes.lessonCardListView} ${isGolden ? 'golden' : ''}`}
        onClick={() => openLesson(lesson.id, 'practice')}
        onMouseLeave={() => setHoveredMoreTag(null)}
      >
        <div className={classes.lessonStatus}>
          {/* Star Rating instead of status icon */}
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = rating >= star;
              const isHalf = rating >= star - 0.5 && rating < star;
              const starColor = isGolden ? '#f59e0b' : '#1a1a1a';

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
          {lesson.chapterNum && (
            <div className={classes.lessonChapter}>Topic {lesson.chapterNum}</div>
          )}
          <div className={classes.lessonTitle}>{lesson.title}</div>
          {lesson.keyTerms && lesson.keyTerms.length > 0 && (
            <div className={classes.keyTermsTags}>
              {lesson.keyTerms.slice(0, 2).join(' • ')}
              {lesson.keyTerms.length > 2 && ` • +${lesson.keyTerms.length - 2} more`}
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
              Reading Time: {lesson.duration}
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
          <div key={category}>
            <div className={classes.unitHeader}>
              <h3 className={classes.unitTitle}>{category}</h3>
              <div className={classes.unitDivider}></div>
            </div>
            <div className={viewMode === 'grid' ? classes.lessonsList : classes.lessonsListView}>
              {lessons.map(lesson => renderPracticeCard(lesson))}
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
              onClick={() => setMode('lessons')}
            >
              Lessons
            </button>
            <button
              className={`${classes.modeButton} ${mode === 'practice' ? 'active' : ''}`}
              onClick={() => setMode('practice')}
            >
              Practice
            </button>
          </div>
        </div>
      </div>
      <div className={classes.contentSection}>
        <div className={classes.controlsBar}>
          <div className={classes.filterButtons}>
            <button
              className={`${classes.filterButton} getting-started ${activeSection === 'getting-started' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('getting-started')}
            >
              Getting Started
            </button>
            <button
              className={`${classes.filterButton} english ${activeSection === 'english' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('english')}
            >
              English
            </button>
            <button
              className={`${classes.filterButton} math ${activeSection === 'math' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('math')}
            >
              Math
            </button>
            <button
              className={`${classes.filterButton} reading ${activeSection === 'reading' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('reading')}
            >
              Reading
            </button>
            <button
              className={`${classes.filterButton} science ${activeSection === 'science' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('science')}
            >
              Science
            </button>
          </div>

          <div className={classes.viewToggle}>
            <button
              className={`${classes.viewButton} ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
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
              onClick={() => setViewMode('list')}
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
            <div key={category}>
              <div className={classes.unitHeader}>
                <h3 className={classes.unitTitle}>{category}</h3>
                <div className={classes.unitDivider}></div>
              </div>
              <div className={viewMode === 'grid' ? classes.lessonsList : classes.lessonsListView}>
                {lessons.map(lesson => renderLessonCard(lesson))}
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
