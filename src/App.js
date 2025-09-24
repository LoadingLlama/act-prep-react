import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Button from './components/Button';
import StatusIcon from './components/StatusIcon';
import ProgressiveLessonRenderer from './components/ProgressiveLessonRenderer';
import AIChat from './components/AIChat';
import { gradients, spacing, borderRadius, buttonStyles } from './utils/sharedStyles';
import { storage, scriptLoader, statusUtils, lessonUtils, domUtils } from './utils/helpers';
import { interactiveLessons } from './data/interactiveLessons';
import { allLessons, lessonStructure } from './data/allLessons';

const useStyles = createUseStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    'html': {
      scrollBehavior: 'smooth'
    },
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      backgroundColor: '#fafbfc',
      color: '#1a1a1a',
      lineHeight: 1.6,
      overflowX: 'hidden',
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
      backgroundAttachment: 'fixed'
    }
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#fafbfc'
  },
  header: {
    background: 'rgba(248, 249, 250, 0.7)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(233, 236, 239, 0.3)',
    padding: '0.75rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 30,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '1rem',
    position: 'relative'
  },
  logo: {
    fontSize: '1.3rem',
    fontWeight: 500,
    color: '#1a1a1a',
    textDecoration: 'none',
    margin: 0,
    '&:hover': {
      color: '#333'
    }
  },
  subtitle: {
    color: '#666',
    fontSize: '0.85rem',
    fontWeight: 400,
    margin: 0,
    flex: 1,
    textAlign: 'center'
  },
  navContainer: {
    padding: '0',
    marginBottom: '1.5rem',
    background: 'transparent'
  },
  navTabs: {
    display: 'flex',
    borderBottom: '1px solid rgba(229, 229, 229, 0.5)',
    justifyContent: 'center',
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  tab: {
    background: 'transparent',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1rem',
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    fontWeight: 400,
    '&:hover': {
      color: '#1a1a1a'
    },
    '&.active': {
      color: '#1a1a1a',
      fontWeight: 500
    }
  },
  tabIndicator: {
    position: 'absolute',
    bottom: '-1px',
    height: '3px',
    background: 'linear-gradient(90deg, #1a1a1a, #4a5568, #1a1a1a)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '2px',
    boxShadow: '0 2px 8px rgba(26, 26, 26, 0.3)'
  },
  content: {
    flex: 1,
    padding: '0 2rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    position: 'relative',
    zIndex: 10
  },
  tabContent: {
    display: 'none',
    '&.active': {
      display: 'block'
    }
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(10px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  contentSection: {
    margin: '0'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 500,
    color: '#1a1a1a',
    marginBottom: '1.5rem',
    textAlign: 'center',
    letterSpacing: '-0.01em',
    position: 'relative',
    paddingTop: '1rem',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-0.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #1a1a1a, transparent)',
      borderRadius: '1px'
    }
  },
  testGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    marginTop: '1rem',
    padding: '1rem 0'
  },
  card: {
    background: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    marginBottom: 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    '&:hover': {
      background: '#f8f9fa',
      borderColor: '#adb5bd',
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
    },
    '& h3': {
      fontSize: '1.3rem',
      fontWeight: 500,
      marginBottom: '0.75rem',
      color: '#1a1a1a'
    },
    '& p': {
      color: '#666',
      marginBottom: '1rem',
      fontSize: '1rem'
    }
  },
  btn: {
    ...buttonStyles.base,
    ...buttonStyles.sizes.md,
    background: '#f8f9fa',
    color: '#666',
    '&:hover': {
      background: '#e9ecef',
      borderColor: '#adb5bd',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#333'
    }
  },
  sectionFilters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.25rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    padding: '1rem 0'
  },
  sectionFilter: {
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    color: '#666',
    padding: `${spacing.sm} ${spacing.lg}`,
    borderRadius: borderRadius.pill,
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    '&:hover': {
      background: '#e9ecef',
      borderColor: '#adb5bd',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#333'
    },
    '&.active': {
      background: '#1a1a1a',
      color: 'white',
      borderColor: '#1a1a1a',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    }
  },
  lessonsGrid: {
    display: 'grid',
    gap: '1rem',
    marginTop: '1rem',
    padding: '0.5rem 0'
  },
  lessonItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    cursor: 'pointer',
    marginBottom: 0,
    position: 'relative',
    borderLeft: '4px solid #e5e7eb',
    '&:hover': {
      background: '#f8f9fa',
      borderColor: '#d1d5db',
      transform: 'translateX(4px)'
    },
    '&.completed': {
      background: '#f0fdf4',
      borderLeftColor: '#16a34a',
      opacity: 0.8,
      '& h4': {
        textDecoration: 'line-through',
        color: '#666'
      },
      '& p': {
        color: '#999'
      }
    },
    '&.in-progress': {
      borderLeftColor: '#ffc107',
      background: '#fffbf0'
    },
    '&.hidden': {
      display: 'none'
    }
  },
  lessonInfo: {
    '& h4': {
      fontSize: '1.1rem',
      fontWeight: 500,
      marginBottom: '0.25rem',
      color: '#1a1a1a'
    },
    '& p': {
      color: '#666',
      fontSize: '0.9rem'
    }
  },
  lessonStatus: {
    fontSize: '0.85rem',
    color: '#666',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    background: '#f5f5f5',
    '&.completed': {
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      color: '#065f46',
      border: '1px solid #10b981'
    },
    '&.in-progress': {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      color: '#92400e',
      border: '1px solid #f59e0b'
    }
  },
  sectionHeader: {
    gridColumn: '1 / -1',
    margin: '2rem 0 1rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid rgba(229, 229, 229, 0.5)',
    position: 'relative',
    '&.hidden': {
      display: 'none'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(229, 229, 229, 0.8), transparent)'
    },
    '& h3': {
      fontSize: '1.3rem',
      fontWeight: 500,
      color: '#1a1a1a',
      margin: 0,
      textAlign: 'center',
      letterSpacing: '-0.01em'
    }
  },
  // Lesson Modal Styles
  lessonModal: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 1000,
    overflow: 'auto',
    '&.active': {
      display: 'flex'
    }
  },
  lessonContent: {
    background: 'white',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    lineHeight: '1.6',
    fontSize: '15px',
    color: '#2d3748'
  },
  lessonSidebar: {
    width: '280px',
    background: '#fafbfc',
    borderRight: '1px solid #e2e8f0',
    padding: '2rem 1.5rem',
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  lessonMain: {
    flex: 1,
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0'
  },
  lessonHeader: {
    padding: '2rem 3rem 1.5rem',
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    textAlign: 'left'
  },
  lessonTitle: {
    fontSize: '2.2rem',
    fontWeight: 700,
    color: '#1a202c',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.01em'
  },
  lessonClose: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#666',
    padding: '0.5rem',
    '&:hover': {
      color: '#1a1a1a'
    }
  },
  lessonBody: {
    padding: '0 1rem 4rem',
    lineHeight: 1.65,
    fontSize: '15px',
    maxWidth: '2000px',
    '& h1, & h2, & h3, & h4': {
      color: '#1a202c',
      fontWeight: '600',
      marginTop: '2rem',
      marginBottom: '0.75rem',
      lineHeight: '1.3'
    },
    '& h1': {
      fontSize: '1.75rem',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '0.5rem'
    },
    '& h2': {
      fontSize: '1.5rem',
      color: '#2d3748'
    },
    '& h3': {
      fontSize: '1.25rem',
      color: '#4a5568'
    },
    '& p': {
      marginBottom: '1rem',
      lineHeight: '1.65'
    },
    '& ul, & ol': {
      margin: '1rem 0',
      paddingLeft: '1.5rem'
    },
    '& li': {
      marginBottom: '0.5rem',
      lineHeight: '1.6'
    },
    '& blockquote': {
      borderLeft: '3px solid #cbd5e0',
      paddingLeft: '1rem',
      margin: '1.25rem 0',
      fontStyle: 'italic',
      color: '#4a5568',
      background: '#f7fafc',
      padding: '0.75rem 1rem',
      borderRadius: '0 6px 6px 0'
    },
    '& code': {
      backgroundColor: '#edf2f7',
      padding: '2px 4px',
      borderRadius: '3px',
      fontSize: '0.9em',
      fontFamily: 'Monaco, Consolas, monospace'
    },
    '& .lesson-intro': {
      fontSize: '1rem',
      color: '#718096',
      fontStyle: 'italic',
      marginBottom: '2rem',
      padding: '1rem',
      background: '#f8f9fa',
      borderLeft: '4px solid #1a1a1a',
      borderRadius: '0 4px 4px 0'
    },
    '& .concept-box': {
      background: '#f8f9fa',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '0.8rem',
        fontSize: '1.1rem'
      }
    },
    '& .tip-box': {
      background: '#fff3cd',
      border: '1px solid #ffc107',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& h4': {
        color: '#856404',
        marginBottom: '0.8rem',
        fontSize: '1.1rem'
      }
    },
    '& .example-box': {
      background: '#e8f5e8',
      border: '1px solid #28a745',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0'
    },
    '& .rules-box': {
      background: '#fff',
      border: '2px solid #1a1a1a',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      '& h4': {
        color: '#1a1a1a',
        marginBottom: '0.8rem',
        fontSize: '1.2rem'
      }
    }
  },
  floatingControls: {
    position: 'fixed',
    bottom: '35vh',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
    padding: '0.75rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(200, 200, 200, 0.3)',
    opacity: 0.6,
    transition: 'all 0.3s ease',
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
    },
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: '180px',
    marginTop: '40px'
  },
  sidebarSection: {
    '& h4': {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  },
  keyTerms: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '& .term': {
      padding: '0.5rem 0.75rem',
      background: 'white',
      borderRadius: '6px',
      fontSize: '0.85rem',
      color: '#2d3748',
      border: '1px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        background: '#f7fafc',
        borderColor: '#cbd5e0'
      }
    }
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
    '& .fill': {
      height: '100%',
      background: 'linear-gradient(90deg, #48bb78, #38a169)',
      borderRadius: '3px',
      transition: 'width 0.3s ease'
    }
  }
});

// lessonStructure is now imported from allLessons.js

function App() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('tests');
  const [activeSection, setActiveSection] = useState('all');
  const [lessonContent, setLessonContent] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [lessonProgress, setLessonProgress] = useState(() => {
    return storage.get('actPrepProgress', {});
  });

  useEffect(() => {
    const sources = [
      '/english-lessons.js',
      '/math-lessons.js',
      '/reading-lessons.js',
      '/science-lessons.js'
    ];

    // Load all lesson scripts using utility
    Promise.all(sources.map(src => scriptLoader.load(src)))
      .then(() => {
        // Combine all lesson content from different files
        const combinedContent = {
          ...window.englishLessons,
          ...window.mathLessons,
          ...window.readingLessons,
          ...window.scienceLessons
        };
        setLessonContent(combinedContent);
      })
      .catch(err => {
        // Error loading lesson scripts - fail silently in production
        setLessonContent({});
      });

    // Cleanup function
    return () => {
      scriptLoader.cleanup(sources);
    };
  }, []);

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
                      <p style={{ margin: 0 }}>{item.desc}</p>
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

    const keyTerms = lessonUtils.extractKeyTerms(lesson?.content);
    const progress = lessonUtils.calculateProgress(lessonStructure, lessonProgress);

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
                  onComplete={() => updateLessonProgress(currentLesson, 'completed')}
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

        {/* Floating Controls */}
        <div className={classes.floatingControls}>
          <button
            onClick={() => updateLessonProgress(currentLesson, 'not-started')}
            style={{
              background: 'rgba(248, 250, 252, 0.8)',
              border: '1px solid rgba(203, 213, 224, 0.4)',
              borderRadius: '6px',
              padding: '0.4rem 0.7rem',
              color: '#64748b',
              fontWeight: '400',
              cursor: 'pointer',
              fontSize: '0.7rem',
              transition: 'all 0.2s ease',
              boxShadow: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(248, 250, 252, 1)';
              e.target.style.color = '#475569';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(248, 250, 252, 0.8)';
              e.target.style.color = '#64748b';
            }}
          >
            Reset
          </button>
          <button
            onClick={() => updateLessonProgress(currentLesson, 'in-progress')}
            style={{
              background: 'rgba(254, 243, 199, 0.8)',
              border: '1px solid rgba(251, 191, 36, 0.4)',
              borderRadius: '6px',
              padding: '0.4rem 0.7rem',
              color: '#92400e',
              fontWeight: '400',
              cursor: 'pointer',
              fontSize: '0.7rem',
              transition: 'all 0.2s ease',
              boxShadow: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(254, 243, 199, 1)';
              e.target.style.color = '#78350f';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(254, 243, 199, 0.8)';
              e.target.style.color = '#92400e';
            }}
          >
            In Progress
          </button>
          <button
            onClick={() => updateLessonProgress(currentLesson, 'completed')}
            style={{
              background: 'rgba(240, 253, 244, 0.8)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              borderRadius: '6px',
              padding: '0.4rem 0.7rem',
              color: '#15803d',
              fontWeight: '400',
              cursor: 'pointer',
              fontSize: '0.7rem',
              transition: 'all 0.2s ease',
              boxShadow: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(240, 253, 244, 1)';
              e.target.style.color = '#166534';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(240, 253, 244, 0.8)';
              e.target.style.color = '#15803d';
            }}
          >
            Complete ✓
          </button>
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