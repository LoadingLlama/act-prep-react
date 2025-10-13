/**
 * Lessons Content Component
 * Displays the lessons grid with filtering and view modes
 * Extracted from App.js to reduce file size
 */

import React from 'react';
import StatusIcon from '../StatusIcon';

/**
 * LessonsContent - Renders the lessons tab with filtering and view switching
 * @param {Object} props - Component props
 * @param {Object} props.classes - JSS style classes
 * @param {string} props.activeTab - Currently active tab
 * @param {string} props.activeSection - Currently active section filter
 * @param {Function} props.handleSectionFilter - Handler for section filtering
 * @param {string} props.viewMode - Current view mode ('grid' or 'list')
 * @param {Function} props.setViewMode - Function to set view mode
 * @param {Array} props.lessonStructure - Array of lesson data
 * @param {Object} props.expandedSections - Object tracking which sections are expanded
 * @param {Function} props.toggleSection - Function to toggle section expansion
 * @param {Function} props.getLessonStatus - Function to get lesson completion status
 * @param {Function} props.openLesson - Function to open a lesson modal
 * @param {Object|null} props.hoveredMoreTag - Currently hovered "more" tag lesson
 * @param {Function} props.setHoveredMoreTag - Function to set hovered more tag
 * @param {Function} props.setMoreTagPosition - Function to set more tag popup position
 * @returns {JSX.Element} Lessons content component
 */
const LessonsContent = ({
  classes,
  activeTab,
  activeSection,
  handleSectionFilter,
  viewMode,
  setViewMode,
  lessonStructure,
  expandedSections,
  toggleSection,
  getLessonStatus,
  openLesson,
  hoveredMoreTag,
  setHoveredMoreTag,
  setMoreTagPosition
}) => {
  // When a specific section is selected, show all lessons from that section
  if (activeSection !== 'all') {
    const filteredLessons = lessonStructure.filter(lesson => lesson.section === activeSection);

    return (
      <div className={`${classes.tabContent} ${activeTab === 'lessons' ? 'active' : ''}`}>
        <div className={classes.contentSection}>
          <h2 className={classes.sectionTitle}>Study Lessons</h2>

          <div className={classes.sectionFilters}>
            <div className={classes.filterButtons}>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'all' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('all')}
              >
                All Sections
              </button>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'english' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('english')}
              >
                English
              </button>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'math' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('math')}
              >
                Math
              </button>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'reading' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('reading')}
              >
                Reading
              </button>
              <button
                className={`${classes.sectionFilter} ${activeSection === 'science' ? 'active' : ''}`}
                onClick={() => handleSectionFilter('science')}
              >
                Science
              </button>
            </div>

            <div className={classes.viewToggle}>
              <button
                className={`${classes.viewToggleButton} ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                className={`${classes.viewToggleButton} ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

          <div className={classes.lessonsGrid}>
            {(() => {
              // Group lessons by category
              const groupedLessons = filteredLessons.reduce((acc, lesson) => {
                const category = lesson.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(lesson);
                return acc;
              }, {});

              let unitNumber = 0;
              return Object.entries(groupedLessons).map(([category, lessons]) => {
                if (category === 'Introduction' || category === 'Practice Test') return null;

                unitNumber++;

                // Calculate progress for this unit
                const completedLessons = lessons.filter(l => getLessonStatus(l.id) === 'completed').length;
                const totalLessons = lessons.length;
                const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

                return (
                  <div key={category} className={classes.unitCard}>
                    <div className={classes.unitHeader}>
                      <div className={classes.unitLabel}>UNIT {unitNumber}</div>
                      <div className={classes.unitTitle}>{category}</div>
                      <div className={classes.unitProgress}>
                        <span className={classes.unitProgressText}>
                          {completedLessons} / {totalLessons} lessons
                        </span>
                        <div className={classes.unitProgressBar}>
                          <div className={classes.unitProgressFill} style={{ width: `${progressPercent}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className={viewMode === 'grid' ? classes.lessonsList : classes.lessonsListView}>
                      {lessons.map((lesson) => (
                        <LessonCard
                          key={lesson.id}
                          lesson={lesson}
                          classes={classes}
                          viewMode={viewMode}
                          getLessonStatus={getLessonStatus}
                          openLesson={openLesson}
                          setHoveredMoreTag={setHoveredMoreTag}
                          setMoreTagPosition={setMoreTagPosition}
                        />
                      ))}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    );
  }

  // When "All Sections" is selected, show collapsible sections
  const sections = [
    { key: 'english', title: 'English Section', lessons: lessonStructure.filter(l => l.section === 'english') },
    { key: 'math', title: 'Math Section', lessons: lessonStructure.filter(l => l.section === 'math') },
    { key: 'reading', title: 'Reading Section', lessons: lessonStructure.filter(l => l.section === 'reading') },
    { key: 'science', title: 'Science Section', lessons: lessonStructure.filter(l => l.section === 'science') }
  ];

  return (
    <div className={`${classes.tabContent} ${activeTab === 'lessons' ? 'active' : ''}`}>
      <div className={classes.contentSection}>
        <h2 className={classes.sectionTitle}>Study Lessons</h2>

        <div className={classes.sectionFilters}>
          <div className={classes.filterButtons}>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'all' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('all')}
            >
              All Sections
            </button>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'english' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('english')}
            >
              English
            </button>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'math' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('math')}
            >
              Math
            </button>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'reading' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('reading')}
            >
              Reading
            </button>
            <button
              className={`${classes.sectionFilter} ${activeSection === 'science' ? 'active' : ''}`}
              onClick={() => handleSectionFilter('science')}
            >
              Science
            </button>
          </div>

          <div className={classes.viewToggle}>
            <button
              className={`${classes.viewToggleButton} ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              className={`${classes.viewToggleButton} ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        <div className={classes.lessonsGrid}>
          {sections.map(section => {
            // Group lessons by category within each section
            const groupedLessons = section.lessons.reduce((acc, lesson) => {
              const category = lesson.category || 'Other';
              if (!acc[category]) acc[category] = [];
              acc[category].push(lesson);
              return acc;
            }, {});

            return (
              <React.Fragment key={section.key}>
                <div className={classes.sectionHeader} onClick={() => toggleSection(section.key)}>
                  <h3>{section.title} ({section.lessons.length} lessons)</h3>
                  <span className={`${classes.sectionHeaderIcon} ${expandedSections[section.key] ? 'expanded' : ''}`}>
                    ▶
                  </span>
                </div>
                {expandedSections[section.key] && (
                  <div className={classes.expandedSectionContent}>
                    {(() => {
                      let unitNumber = 0;
                      return Object.entries(groupedLessons).map(([category, lessons]) => {
                        if (category === 'Introduction' || category === 'Practice Test') return null;

                        unitNumber++;

                        // Calculate progress for this unit
                        const completedLessons = lessons.filter(l => getLessonStatus(l.id) === 'completed').length;
                        const totalLessons = lessons.length;
                        const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

                        return (
                          <div key={`${section.key}-${category}`} className={classes.unitCard} style={{ gridColumn: '1 / -1' }}>
                            <div className={classes.unitHeader}>
                              <div className={classes.unitLabel}>UNIT {unitNumber}</div>
                              <div className={classes.unitTitle}>{category}</div>
                              <div className={classes.unitProgress}>
                                <span className={classes.unitProgressText}>
                                  {completedLessons} / {totalLessons} lessons
                                </span>
                                <div className={classes.unitProgressBar}>
                                  <div className={classes.unitProgressFill} style={{ width: `${progressPercent}%` }} />
                                </div>
                              </div>
                            </div>
                            <div className={viewMode === 'grid' ? classes.lessonsList : classes.lessonsListView}>
                              {lessons.map((lesson) => (
                                <LessonCard
                                  key={lesson.id}
                                  lesson={lesson}
                                  classes={classes}
                                  viewMode={viewMode}
                                  getLessonStatus={getLessonStatus}
                                  openLesson={openLesson}
                                  setHoveredMoreTag={setHoveredMoreTag}
                                  setMoreTagPosition={setMoreTagPosition}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * LessonCard - Individual lesson card component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Lesson card
 */
const LessonCard = ({
  lesson,
  classes,
  viewMode,
  getLessonStatus,
  openLesson,
  setHoveredMoreTag,
  setMoreTagPosition
}) => (
  <div
    className={`${viewMode === 'grid' ? classes.lessonItem : classes.lessonItemListView} ${getLessonStatus(lesson.id)}`}
    onClick={() => openLesson(lesson.id, 'review')}
    onMouseLeave={() => setHoveredMoreTag(null)}
  >
    <div className={classes.lessonStatus}>
      <StatusIcon status={getLessonStatus(lesson.id)} />
    </div>
    <div className={viewMode === 'grid' ? classes.lessonInfo : classes.lessonInfoListView}>
      <h4>
        {lesson.chapterNum && (
          <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
            Topic {lesson.chapterNum}
          </div>
        )}
        <div style={{ color: '#000000', fontWeight: '500', fontSize: '0.9rem', lineHeight: '1.3' }}>
          {lesson.title}
        </div>
      </h4>
      {lesson.keyTerms && lesson.keyTerms.length > 0 && (
        <div className={classes.keyTermsTags}>
          {lesson.keyTerms.slice(0, 2).map((term, index) => (
            <div
              key={index}
              className={classes.keyTermTag}
            >
              {term}
            </div>
          ))}
          {lesson.keyTerms.length > 2 && (
            <div
              className={classes.keyTermTag}
              onMouseEnter={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                setMoreTagPosition({
                  top: rect.top - 8,
                  left: rect.left + rect.width / 2
                });
                setHoveredMoreTag(lesson);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setHoveredMoreTag(null);
              }}
            >
              +{lesson.keyTerms.length - 2} more
            </div>
          )}
        </div>
      )}
    </div>
    <div className={viewMode === 'grid' ? classes.lessonActions : classes.lessonActionsListView}>
      <button
        className={classes.lessonPracticeButton}
        onClick={(e) => {
          e.stopPropagation();
          openLesson(lesson.id, 'practice');
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
        Practice
      </button>
    </div>
  </div>
);

export default LessonsContent;
