import React, { useState } from 'react';
import Button from './components/Button';
import StatusIcon from './components/StatusIcon';
import ProgressiveLessonRenderer from './components/ProgressiveLessonRenderer';
import AIChat from './components/AIChat';
import { storage, statusUtils, domUtils } from './utils/helpers';
import { allLessons, lessonStructure } from './data/allLessons';
import { useAppStyles } from './styles/AppStyles';


// lessonStructure is now imported from allLessons.js

function App() {
  const classes = useAppStyles();
  const [activeTab, setActiveTab] = useState('tests');
  const [activeSection, setActiveSection] = useState('all');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [lessonProgress, setLessonProgress] = useState(() => {
    return storage.get('actPrepProgress', {});
  });


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSectionFilter = (section) => {
    setActiveSection(section);
  };

  const openLesson = (lessonId) => {
    setCurrentLesson(lessonId);
    setLessonModalOpen(true);
    domUtils.preventBodyScroll();
  };

  const updateLessonProgress = (lessonId, status) => {
    const newProgress = { ...lessonProgress, [lessonId]: status };
    setLessonProgress(newProgress);
    storage.set('actPrepProgress', newProgress);
  };

  const getLessonStatus = (lessonId) => {
    return lessonProgress[lessonId] || 'not-started';
  };

  const closeLessonModal = () => {
    setLessonModalOpen(false);
    setCurrentLesson(null);
    domUtils.restoreBodyScroll();
  };

  const TestsContent = () => (
    <div className={`${classes.tabContent} ${activeTab === 'tests' ? 'active' : ''}`}>
      <div className={classes.contentSection}>
        <h2 className={classes.sectionTitle}>Practice Tests</h2>
        <div className={classes.testGrid}>
          <div className={classes.card}>
            <h3>Diagnostic Test</h3>
            <p>Take this first to understand your current level and identify areas for improvement.</p>
            <Button href="/diagnostic-test.html">Start Diagnostic</Button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 1</h3>
            <p>Complete 4-section ACT practice test with detailed explanations and scoring.</p>
            <Button>Start Test</Button>
          </div>
          <div className={classes.card}>
            <h3>English Section Practice</h3>
            <p>Focus on grammar, punctuation, and rhetorical skills with targeted questions.</p>
            <Button>Start Practice</Button>
          </div>
          <div className={classes.card}>
            <h3>Math Section Practice</h3>
            <p>Algebra, geometry, and trigonometry problems with step-by-step solutions.</p>
            <Button>Start Practice</Button>
          </div>
          <div className={classes.card}>
            <h3>Reading Section Practice</h3>
            <p>Improve comprehension and analysis skills with timed reading passages.</p>
            <Button>Start Practice</Button>
          </div>
          <div className={classes.card}>
            <h3>Science Section Practice</h3>
            <p>Data interpretation and scientific reasoning practice questions.</p>
            <Button>Start Practice</Button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 2</h3>
            <p>Additional complete practice test to track your improvement over time.</p>
            <Button>Start Test</Button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 3</h3>
            <p>Continue building test-taking stamina and refining your strategies.</p>
            <Button>Start Test</Button>
          </div>
          <div className={classes.card}>
            <h3>Full Practice Test 4</h3>
            <p>Final practice test to ensure you're ready for test day.</p>
            <Button>Start Test</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const LessonsContent = () => {
    const filteredLessons = activeSection === 'all' ? lessonStructure : lessonStructure.filter(lesson => lesson.section === activeSection);

    // Keep original lesson order - no sorting by status
    const sortedLessons = filteredLessons;

    // Group lessons by section for headers
    const groupedLessons = [];
    let currentSection = '';

    sortedLessons.forEach(lesson => {
      if (lesson.section !== 'all' && lesson.section !== currentSection) {
        currentSection = lesson.section;
        const sectionTitle =
          lesson.section === 'english' ? 'English Section' :
          lesson.section === 'math' ? 'Math Section' :
          lesson.section === 'reading' ? 'Reading Section' :
          lesson.section === 'science' ? 'Science Section' : '';

        if (sectionTitle && activeSection === 'all') {
          groupedLessons.push({ type: 'header', title: sectionTitle, section: lesson.section });
        }
      }
      groupedLessons.push({ type: 'lesson', ...lesson });
    });

    return (
      <div className={`${classes.tabContent} ${activeTab === 'lessons' ? 'active' : ''}`}>
        <div className={classes.contentSection}>
          <h2 className={classes.sectionTitle}>Study Lessons</h2>

          <div style={{
            backgroundColor: '#f8faff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            fontSize: '0.85rem',
            color: '#4a5568'
          }}>
            <strong>📋 Key Terms Guide:</strong> Each lesson shows the specific concepts and terms you'll master.
            These tags help you identify which diagnostic test questions connect to each lesson chapter.
          </div>

          <div className={classes.sectionFilters}>
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

          <div className={classes.lessonsGrid}>
            {groupedLessons.map((item, index) => {
              if (item.type === 'header') {
                return (
                  <div key={`header-${index}`} className={classes.sectionHeader}>
                    <h3>{item.title}</h3>
                  </div>
                );
              } else {
                return (
                  <div key={item.id} className={`${classes.lessonItem} ${getLessonStatus(item.id)}`} onClick={() => openLesson(item.id)}>
                    <div className={classes.lessonInfo}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h4 style={{ margin: 0 }}>{item.title}</h4>
                        {allLessons[item.id] && allLessons[item.id].duration && (
                          <span style={{
                            color: '#9ca3af',
                            fontSize: '0.75rem',
                            fontWeight: '400',
                            whiteSpace: 'nowrap',
                            opacity: '0.7'
                          }}>
                            {allLessons[item.id].duration}m
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <p style={{ margin: 0, flex: 1 }}>{item.desc}</p>
                        {item.tags && (
                          <div
                            style={{ position: 'relative', display: 'inline-block' }}
                            onMouseEnter={(e) => {
                              const tooltip = e.currentTarget.querySelector('.tags-tooltip');
                              const button = e.currentTarget.querySelector('.tags-button');
                              const rect = button.getBoundingClientRect();
                              const viewportHeight = window.innerHeight;

                              if (tooltip) {
                                // Check if tooltip would go below viewport
                                const tooltipHeight = 120; // approximate height
                                const spaceBelow = viewportHeight - rect.bottom;

                                if (spaceBelow < tooltipHeight + 20) {
                                  // Position above the button
                                  tooltip.style.top = 'auto';
                                  tooltip.style.bottom = '100%';
                                  tooltip.style.marginTop = '0';
                                  tooltip.style.marginBottom = '0.5rem';
                                } else {
                                  // Position below the button (default)
                                  tooltip.style.top = '100%';
                                  tooltip.style.bottom = 'auto';
                                  tooltip.style.marginTop = '0.5rem';
                                  tooltip.style.marginBottom = '0';
                                }
                                tooltip.style.display = 'block';
                              }
                            }}
                            onMouseLeave={(e) => {
                              const tooltip = e.currentTarget.querySelector('.tags-tooltip');
                              if (tooltip) tooltip.style.display = 'none';
                            }}
                          >
                            <button
                              className="tags-button"
                              style={{
                                backgroundColor: 'rgba(26, 115, 232, 0.08)',
                                color: '#666',
                                fontSize: '0.65rem',
                                fontWeight: '500',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '6px',
                                border: '1px solid rgba(26, 115, 232, 0.15)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                opacity: '0.7'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.backgroundColor = 'rgba(26, 115, 232, 0.12)';
                                e.target.style.color = '#1a73e8';
                                e.target.style.opacity = '1';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'rgba(26, 115, 232, 0.08)';
                                e.target.style.color = '#666';
                                e.target.style.opacity = '0.7';
                              }}
                            >
                              {item.tags.length} topics
                            </button>
                            <div
                              className="tags-tooltip"
                              style={{
                                display: 'none',
                                position: 'absolute',
                                right: '0',
                                backgroundColor: 'white',
                                border: '1px solid rgba(26, 115, 232, 0.15)',
                                borderRadius: '6px',
                                padding: '0.6rem',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                zIndex: 9999,
                                minWidth: '240px',
                                maxWidth: '280px',
                                backdropFilter: 'blur(8px)'
                              }}
                            >
                              <div style={{
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                color: '#4a5568',
                                marginBottom: '0.4rem'
                              }}>
                                Key Topics:
                              </div>
                              <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.2rem'
                              }}>
                                {item.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    style={{
                                      backgroundColor: 'rgba(26, 115, 232, 0.1)',
                                      color: '#4a5568',
                                      fontSize: '0.6rem',
                                      fontWeight: '500',
                                      padding: '0.15rem 0.35rem',
                                      borderRadius: '3px',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 3, position: 'relative' }}>
                      <StatusIcon status={getLessonStatus(item.id)} />
                      <span className={`${classes.lessonStatus} ${getLessonStatus(item.id) === 'completed' ? 'completed' : getLessonStatus(item.id) === 'in-progress' ? 'in-progress' : ''}`}>
                        {statusUtils.getDisplayText(getLessonStatus(item.id))}
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  };

  const LessonModal = () => {
    // Use allLessons instead of lessonContent for the lesson data
    const lesson = allLessons[currentLesson];
    const currentLessonData = lessonStructure.find(item => item.id === currentLesson);


    return (
      <div className={`${classes.lessonModal} ${lessonModalOpen ? 'active' : ''}`}>
        <div className={classes.lessonContent}>
          {/* Exit Button - Top Left (Moderately Prominent) */}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to leave this lesson? Your progress will be saved, but you\'ll lose your current position in the content.')) {
                closeLessonModal();
              }
            }}
            style={{
              position: 'fixed',
              top: '1rem',
              left: '1rem',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(226, 232, 240, 0.6)',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              color: '#718096',
              transition: 'all 0.3s ease',
              zIndex: 1000,
              opacity: 0.7,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(254, 202, 202, 0.9)';
              e.target.style.color = '#c53030';
              e.target.style.opacity = '1';
              e.target.style.transform = 'scale(1.08)';
              e.target.style.borderColor = '#feb2b2';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.6)';
              e.target.style.color = '#718096';
              e.target.style.opacity = '0.7';
              e.target.style.transform = 'scale(1)';
              e.target.style.borderColor = 'rgba(226, 232, 240, 0.6)';
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}
          >
            ✕
          </button>

          {/* Main Content */}
          <div className={classes.lessonMain}>
            <div className={classes.lessonHeader}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h1 className={classes.lessonTitle} style={{ fontSize: '1.75rem', margin: 0 }}>
                    {lesson ? lesson.title : 'Lesson Coming Soon'}
                  </h1>
                  {lesson && lesson.duration && (
                    <span style={{
                      color: '#9ca3af',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      whiteSpace: 'nowrap',
                      opacity: '0.7'
                    }}>
                      • {lesson.duration} min
                    </span>
                  )}
                </div>
                {currentLessonData && (
                  <p style={{
                    color: '#718096',
                    fontSize: '0.95rem',
                    margin: 0,
                    fontWeight: '400'
                  }}>
                    {currentLessonData.desc}
                  </p>
                )}
              </div>
            </div>
            <div className={classes.lessonBody}>
              {lesson ? (
                <ProgressiveLessonRenderer
                  lesson={lesson}
                  initialStatus={getLessonStatus(currentLesson)}
                  onComplete={() => {
                    updateLessonProgress(currentLesson, 'completed');
                    closeLessonModal();
                  }}
                  onStatusChange={(status) => {
                    updateLessonProgress(currentLesson, status);
                  }}
                />
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  color: '#a0aec0',
                  fontSize: '1rem'
                }}>
                  <p>This lesson content is being prepared. Check back soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <h1 className={classes.logo}>actclass.org</h1>
          <div style={{
            color: 'rgba(102, 102, 102, 0.7)',
            fontSize: '0.75rem',
            fontWeight: '400',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            Diagnostic Test & Lessons
          </div>
        </div>
      </header>

      <div className={classes.navContainer}>
        <div className={classes.navTabs}>
          <button
            className={`${classes.tab} ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => handleTabClick('tests')}
          >
            Tests
          </button>
          <button
            className={`${classes.tab} ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => handleTabClick('lessons')}
          >
            Lessons
          </button>
          <div
            className={classes.tabIndicator}
            style={{
              left: activeTab === 'tests' ? '0%' : '50%',
              width: '50%'
            }}
          />
        </div>
      </div>

      <div className={classes.content}>
        <TestsContent />
        <LessonsContent />
      </div>

      <LessonModal />

      {/* AI Chat Component */}
      <AIChat
        currentLesson={currentLesson}
        lessonContent={allLessons[currentLesson]}
      />
    </div>
  );
}

export default App;