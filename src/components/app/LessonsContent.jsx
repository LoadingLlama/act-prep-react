/**
 * Lessons Content Component
 * Displays the lessons grid with filtering and compact professional design
 */

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLessonsContentStyles } from '../../styles/app/lessons-content.styles';
import StatusIcon from '../StatusIcon';

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
  const [activeSection, setActiveSection] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

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
        <div className={classes.lessonActions}>
          <button
            className={classes.practiceButton}
            onClick={(e) => {
              e.stopPropagation();
              openLesson(lesson.id, 'practice');
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Practice
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.lessonsContainer}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Lessons</h1>
        <p className={classes.pageSubtitle}>Master every concept with structured lessons and practice</p>
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
      </div>
    </div>
  );
};

export default LessonsContent;
