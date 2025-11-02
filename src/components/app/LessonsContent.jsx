/**
 * Lessons Content Component
 * Displays the lessons grid with filtering and compact professional design
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import StatusIcon from '../StatusIcon';

const useStyles = createUseStyles({
  lessonsContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#fafafa',
    maxWidth: '1200px'
  },
  pageHeader: {
    padding: '0',
    marginBottom: '2rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#000000',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.04em'
  },
  pageSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0
  },
  contentSection: {
    padding: '0'
  },
  controlsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '1rem',
    background: '#ffffff',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  filterButtons: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap'
  },
  filterButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    padding: '0.4rem 0.85rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f8fafc',
      color: '#1a1a1a'
    },
    '&.active': {
      color: '#ffffff',
      '&.english': {
        background: '#08245b'
      },
      '&.math': {
        background: '#dc2626'
      },
      '&.reading': {
        background: '#08245b'
      },
      '&.science': {
        background: '#16a34a'
      }
    }
  },
  viewToggle: {
    display: 'flex',
    gap: '0.25rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.25rem'
  },
  viewButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: '#f8fafc'
    },
    '&.active': {
      background: '#08245b',
      color: '#ffffff'
    }
  },
  lessonsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  lessonsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem'
  },
  lessonsListView: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  lessonCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    minHeight: '95px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    '&:hover': {
      borderColor: '#08245b',
      boxShadow: '0 2px 8px rgba(0, 24, 69, 0.08)',
      transform: 'translateY(-1px)'
    },
    '&.completed': {
      borderColor: '#3b82f6',
      background: '#f0f9ff'
    }
  },
  lessonCardListView: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1rem 1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    '&:hover': {
      borderColor: '#08245b',
      transform: 'translateX(4px)'
    }
  },
  lessonStatus: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem'
  },
  lessonInfo: {
    flex: 1
  },
  lessonChapter: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '0.3rem'
  },
  lessonTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: '1.25',
    marginBottom: '0.3rem'
  },
  keyTermsTags: {
    marginTop: '0.35rem',
    fontSize: '0.65rem',
    color: '#94a3b8',
    fontWeight: '400',
    lineHeight: '1.3',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  lessonActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: 'auto'
  },
  practiceButton: {
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.35rem 0.75rem',
    fontSize: '0.7rem',
    fontWeight: '500',
    color: '#64748b',
    background: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    '&:hover': {
      background: '#f8fafc',
      borderColor: '#cbd5e1',
      color: '#1a1a1a'
    }
  },
  unitHeader: {
    padding: '1.5rem 1rem 0.75rem',
    marginTop: '1.5rem',
    '&:first-child': {
      marginTop: 0
    }
  },
  unitTitle: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    margin: 0
  },
  unitDivider: {
    height: '1px',
    background: '#e2e8f0',
    marginTop: '0.75rem'
  }
});

const LessonsContent = ({
  activeSection,
  handleSectionFilter,
  viewMode,
  setViewMode,
  lessonStructure,
  lessonContent,
  expandedSections,
  toggleSection,
  getLessonStatus,
  openLesson,
  setHoveredMoreTag,
  setMoreTagPosition
}) => {
  const classes = useStyles();

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
