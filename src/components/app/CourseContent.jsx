/**
 * Course Content Component
 * Shows recommended learning path with stats, lessons, and tests in order
 */

import React from 'react';
import { createUseStyles } from 'react-jss';
import { HiCheckCircle, HiClock } from 'react-icons/hi2';

const useStyles = createUseStyles({
  courseContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0 auto',
    minHeight: '100vh',
    background: '#fafafa',
    maxWidth: '1200px'
  },
  pageHeader: {
    padding: '0',
    marginBottom: '1.5rem'
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
    margin: '0 0 0.5rem 0'
  },
  testCountdown: {
    fontSize: '1.1rem',
    color: '#1a1a1a',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    background: '#fef3c7',
    padding: '0.5rem 0.85rem',
    borderRadius: '6px',
    display: 'inline-block',
    border: '2px solid #f59e0b'
  },
  nextAssignmentBanner: {
    background: 'linear-gradient(135deg, #08245b 0%, #1e40af 100%)',
    color: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '2px solid #1e40af'
  },
  nextAssignmentContent: {
    flex: 1
  },
  nextAssignmentLabel: {
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    opacity: 0.9,
    marginBottom: '0.35rem'
  },
  nextAssignmentTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.25rem'
  },
  nextAssignmentDue: {
    fontSize: '0.85rem',
    opacity: 0.9,
    fontWeight: '500'
  },
  nextAssignmentIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginLeft: '1rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.75rem',
    marginBottom: '1.5rem'
  },
  statCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.85rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem'
  },
  statLabel: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: '1'
  },
  statDetail: {
    fontSize: '0.75rem',
    color: '#64748b'
  },
  strengthsSection: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1.5rem'
  },
  strengthsHeader: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  strengthsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem'
  },
  strengthItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    background: '#f8fafc',
    borderRadius: '4px'
  },
  strengthLabel: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#1a1a1a'
  },
  strengthBar: {
    height: '6px',
    background: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
    flex: 1,
    marginLeft: '0.75rem',
    marginRight: '0.5rem'
  },
  strengthFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  strengthValue: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#64748b',
    minWidth: '35px',
    textAlign: 'right'
  },
  pathContainer: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '1rem'
  },
  pathHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #f3f4f6'
  },
  pathTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  pathProgress: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '600'
  },
  weekSection: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    position: 'relative',
    '&:last-child': {
      '& $timelineBar': {
        display: 'none'
      }
    }
  },
  timelineColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    width: '32px',
    flexShrink: 0
  },
  weekDot: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: '#08245b',
    border: '3px solid #dbeafe',
    flexShrink: 0,
    position: 'relative',
    zIndex: 2
  },
  timelineBar: {
    position: 'absolute',
    top: '16px',
    bottom: '-24px',
    left: '50%',
    width: '3px',
    background: '#e5e7eb',
    transform: 'translateX(-50%)'
  },
  weekContent: {
    flex: 1
  },
  weekHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.65rem'
  },
  weekTitle: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  weekDateRange: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '600'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  courseItem: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.65rem 0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#08245b',
      transform: 'translateX(4px)'
    },
    '&.completed': {
      background: '#f0f9ff',
      borderColor: '#3b82f6'
    }
  },
  itemIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    flexShrink: 0,
    fontSize: '16px',
    '&.grammar': {
      background: '#eff6ff',
      color: '#1d4ed8'
    },
    '&.punctuation': {
      background: '#dbeafe',
      color: '#1e40af'
    },
    '&.algebra': {
      background: '#fee2e2',
      color: '#dc2626'
    },
    '&.numbers': {
      background: '#fecaca',
      color: '#b91c1c'
    },
    '&.geometry': {
      background: '#fce7f3',
      color: '#be123c'
    },
    '&.reading': {
      background: '#f3e8ff',
      color: '#7c3aed'
    },
    '&.comprehension': {
      background: '#e9d5ff',
      color: '#6b21a8'
    },
    '&.science': {
      background: '#d1fae5',
      color: '#059669'
    },
    '&.data-analysis': {
      background: '#a7f3d0',
      color: '#047857'
    },
    '&.interpretation': {
      background: '#6ee7b7',
      color: '#065f46'
    },
    '&.strategy': {
      background: '#fed7aa',
      color: '#ea580c'
    },
    '&.problem-solving': {
      background: '#fdba74',
      color: '#c2410c'
    },
    '&.test': {
      background: '#fef3c7',
      color: '#d97706'
    }
  },
  itemInfo: {
    flex: 1,
    minWidth: 0
  },
  itemTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.15rem'
  },
  itemMeta: {
    fontSize: '0.7rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  itemSkills: {
    fontSize: '0.7rem',
    color: '#6366f1',
    background: '#f5f3ff',
    padding: '0.15rem 0.4rem',
    borderRadius: '3px',
    fontWeight: '500'
  },
  itemDueDate: {
    fontSize: '0.7rem',
    color: '#f59e0b',
    background: '#fef3c7',
    padding: '0.15rem 0.4rem',
    borderRadius: '3px',
    fontWeight: '600',
    border: '1px solid #fde68a'
  },
  itemStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontSize: '0.7rem',
    fontWeight: '600',
    flexShrink: 0,
    '&.completed': {
      color: '#10b981'
    },
    '&.pending': {
      color: '#64748b'
    }
  }
});

const CourseContent = ({
  lessonProgress,
  lessonStructure,
  onLessonOpen,
  onTestOpen
}) => {
  const classes = useStyles();

  // Calculate statistics
  const totalLessons = lessonStructure.length;
  const completedLessons = Object.values(lessonProgress).filter(s => s === 'completed').length;
  const inProgressLessons = Object.values(lessonProgress).filter(s => s === 'in-progress').length;

  // Calculate section strengths (example data - would come from test results in real app)
  const sectionStrengths = {
    'English': 75,
    'Math': 62,
    'Reading': 88,
    'Science': 70
  };

  // Calculate test date (example: 60 days from now)
  const testDate = new Date();
  testDate.setDate(testDate.getDate() + 60);
  const daysUntilTest = 60;

  // Helper to format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Helper to calculate days until due
  const getDaysUntil = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Skill emoji mapping
  const getSkillEmoji = (skill) => {
    const emojiMap = {
      'Strategy': '🎯',
      'All Sections': '📝',
      'Grammar': '📘',
      'Punctuation': '✏️',
      'Problem Solving': '🧮',
      'Algebra': '🔢',
      'Numbers': '➗',
      'Geometry': '📐',
      'Reading': '📖',
      'Comprehension': '🤔',
      'Science': '🔬',
      'Data Analysis': '📊',
      'Interpretation': '🧪'
    };
    return emojiMap[skill] || '📚';
  };

  // Get skill category for color coding
  const getSkillCategory = (skill) => {
    const categoryMap = {
      'Strategy': 'strategy',
      'All Sections': 'test',
      'Grammar': 'grammar',
      'Punctuation': 'punctuation',
      'Problem Solving': 'problem-solving',
      'Algebra': 'algebra',
      'Numbers': 'numbers',
      'Geometry': 'geometry',
      'Reading': 'reading',
      'Comprehension': 'comprehension',
      'Science': 'science',
      'Data Analysis': 'data-analysis',
      'Interpretation': 'interpretation'
    };
    return categoryMap[skill] || 'strategy';
  };

  const getLessonStatus = (itemId) => {
    return lessonProgress[itemId] || 'not-started';
  };

  // Calculate specific due dates for learning path
  const today = new Date();
  const getDateFromToday = (days) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date;
  };

  // Recommended learning path with specific due dates
  const learningPath = [
    {
      week: 'Week 1',
      startDate: getDateFromToday(0),
      endDate: getDateFromToday(6),
      items: [
        { id: 'getting-started', type: 'lesson', title: 'ACT Test Basics & Overview', skills: 'Strategy', duration: '20 min', dueDate: getDateFromToday(1) },
        { id: 'diagnostic', type: 'test', title: 'Diagnostic Test', skills: 'All Sections', duration: '60 min', dueDate: getDateFromToday(3) }
      ]
    },
    {
      week: 'Week 2',
      startDate: getDateFromToday(7),
      endDate: getDateFromToday(13),
      items: [
        { id: 'english-intro', type: 'lesson', title: 'English Section Fundamentals', skills: 'Grammar', duration: '15 min', dueDate: getDateFromToday(8) },
        { id: 'sentence-structure', type: 'lesson', title: 'Building Complete Sentences', skills: 'Grammar', duration: '15 min', dueDate: getDateFromToday(9) },
        { id: 'commas', type: 'lesson', title: 'Essential Comma Rules', skills: 'Punctuation', duration: '25 min', dueDate: getDateFromToday(11) },
        { id: 'punctuation', type: 'lesson', title: 'Advanced Punctuation', skills: 'Punctuation', duration: '30 min', dueDate: getDateFromToday(13) }
      ]
    },
    {
      week: 'Week 3',
      startDate: getDateFromToday(14),
      endDate: getDateFromToday(20),
      items: [
        { id: 'backsolving', type: 'lesson', title: 'Working Backwards Strategy', skills: 'Problem Solving', duration: '15 min', dueDate: getDateFromToday(15) },
        { id: 'substitution', type: 'lesson', title: 'Number Substitution', skills: 'Algebra', duration: '15 min', dueDate: getDateFromToday(16) },
        { id: '3.1', type: 'lesson', title: 'Algebra Skills', skills: 'Algebra', duration: '20 min', dueDate: getDateFromToday(18) },
        { id: '3.2', type: 'lesson', title: 'Fractions', skills: 'Numbers', duration: '15 min', dueDate: getDateFromToday(20) }
      ]
    },
    {
      week: 'Week 4',
      startDate: getDateFromToday(21),
      endDate: getDateFromToday(27),
      items: [
        { id: 'reading-intro', type: 'lesson', title: 'Reading Section Fundamentals', skills: 'Reading', duration: '40 min', dueDate: getDateFromToday(22) },
        { id: 'passage-approach', type: 'lesson', title: 'How to Approach Passages', skills: 'Strategy', duration: '15 min', dueDate: getDateFromToday(24) },
        { id: 'core-principles', type: 'lesson', title: '7 Core Principles', skills: 'Comprehension', duration: '15 min', dueDate: getDateFromToday(25) },
        { id: 'practice-test-1', type: 'test', title: 'Practice Test 1', skills: 'All Sections', duration: '180 min', dueDate: getDateFromToday(27) }
      ]
    },
    {
      week: 'Week 5',
      startDate: getDateFromToday(28),
      endDate: getDateFromToday(34),
      items: [
        { id: 'science-introduction', type: 'lesson', title: 'Science Section Basics', skills: 'Science', duration: '40 min', dueDate: getDateFromToday(29) },
        { id: 'specific-data-point', type: 'lesson', title: 'Data Point Questions', skills: 'Data Analysis', duration: '15 min', dueDate: getDateFromToday(31) },
        { id: 'trends', type: 'lesson', title: 'Trends Questions', skills: 'Interpretation', duration: '15 min', dueDate: getDateFromToday(34) }
      ]
    },
    {
      week: 'Week 6',
      startDate: getDateFromToday(35),
      endDate: getDateFromToday(41),
      items: [
        { id: 'verbs', type: 'lesson', title: 'Verb Agreement & Tenses', skills: 'Grammar', duration: '25 min', dueDate: getDateFromToday(36) },
        { id: 'pronouns', type: 'lesson', title: 'Pronoun Usage', skills: 'Grammar', duration: '30 min', dueDate: getDateFromToday(38) },
        { id: 'systems-equations', type: 'lesson', title: 'Systems of Equations', skills: 'Algebra', duration: '15 min', dueDate: getDateFromToday(39) },
        { id: 'practice-test-2', type: 'test', title: 'Practice Test 2', skills: 'All Sections', duration: '180 min', dueDate: getDateFromToday(41) }
      ]
    }
  ];

  // Find next upcoming assignment (not completed)
  let nextAssignment = null;
  for (const week of learningPath) {
    for (const item of week.items) {
      const status = getLessonStatus(item.id);
      if (status !== 'completed') {
        nextAssignment = item;
        break;
      }
    }
    if (nextAssignment) break;
  }

  const handleItemClick = (item) => {
    if (item.type === 'lesson') {
      onLessonOpen(item.id, 'review');
    } else if (item.type === 'test') {
      if (item.id === 'diagnostic') {
        // Open diagnostic test
      } else {
        const testNumber = parseInt(item.id.split('-').pop());
        onTestOpen(testNumber);
      }
    }
  };

  const getStrengthColor = (percentage) => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#3b82f6';
    return '#f59e0b';
  };

  return (
    <div className={classes.courseContainer}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Learning Path</h1>
        <p className={classes.pageSubtitle}>Your personalized ACT prep journey</p>
        <div className={classes.testCountdown}>
          🎯 Test Date: {testDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {daysUntilTest} days remaining
        </div>
      </div>

      {/* Next Assignment Banner */}
      {nextAssignment && (
        <div className={classes.nextAssignmentBanner}>
          <div className={classes.nextAssignmentContent}>
            <div className={classes.nextAssignmentLabel}>Next Assignment</div>
            <div className={classes.nextAssignmentTitle}>{nextAssignment.title}</div>
            <div className={classes.nextAssignmentDue}>
              Due {formatDate(nextAssignment.dueDate)} • {getDaysUntil(nextAssignment.dueDate)} days remaining • {nextAssignment.duration}
            </div>
          </div>
          <div className={classes.nextAssignmentIcon}>
            {getSkillEmoji(nextAssignment.skills)}
          </div>
        </div>
      )}

      {/* Statistics Grid */}
      <div className={classes.statsGrid}>
        <div className={classes.statCard}>
          <div className={classes.statLabel}>Completed</div>
          <div className={classes.statValue}>{completedLessons}</div>
          <div className={classes.statDetail}>of {totalLessons} lessons</div>
        </div>
        <div className={classes.statCard}>
          <div className={classes.statLabel}>In Progress</div>
          <div className={classes.statValue}>{inProgressLessons}</div>
          <div className={classes.statDetail}>lessons started</div>
        </div>
        <div className={classes.statCard}>
          <div className={classes.statLabel}>Study Time</div>
          <div className={classes.statValue}>{Math.round(completedLessons * 20)}</div>
          <div className={classes.statDetail}>minutes logged</div>
        </div>
        <div className={classes.statCard}>
          <div className={classes.statLabel}>Progress</div>
          <div className={classes.statValue}>{Math.round((completedLessons / totalLessons) * 100)}%</div>
          <div className={classes.statDetail}>overall completion</div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className={classes.strengthsSection}>
        <div className={classes.strengthsHeader}>Section Performance</div>
        <div className={classes.strengthsGrid}>
          {Object.entries(sectionStrengths).map(([section, percentage]) => (
            <div key={section} className={classes.strengthItem}>
              <div className={classes.strengthLabel}>{section}</div>
              <div className={classes.strengthBar}>
                <div
                  className={classes.strengthFill}
                  style={{
                    width: `${percentage}%`,
                    background: getStrengthColor(percentage)
                  }}
                />
              </div>
              <div className={classes.strengthValue}>{percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className={classes.pathContainer}>
        <div className={classes.pathHeader}>
          <div className={classes.pathTitle}>Recommended Learning Path</div>
          <div className={classes.pathProgress}>
            {completedLessons} of {totalLessons} completed
          </div>
        </div>

        {learningPath.map((week, weekIndex) => (
          <div key={weekIndex} className={classes.weekSection}>
            {/* Timeline column with dot and connecting bar */}
            <div className={classes.timelineColumn}>
              <div className={classes.weekDot} />
              <div className={classes.timelineBar} />
            </div>

            {/* Week content */}
            <div className={classes.weekContent}>
              <div className={classes.weekHeader}>
                <div className={classes.weekTitle}>{week.week}</div>
                <div className={classes.weekDateRange}>
                  {formatDate(week.startDate)} - {formatDate(week.endDate)}
                </div>
              </div>
              <div className={classes.itemsList}>
                {week.items.map((item, itemIndex) => {
                  const status = getLessonStatus(item.id);
                  const isCompleted = status === 'completed';
                  const daysUntilDue = getDaysUntil(item.dueDate);

                  return (
                    <div
                      key={itemIndex}
                      className={`${classes.courseItem} ${isCompleted ? 'completed' : ''}`}
                      onClick={() => handleItemClick(item)}
                    >
                      <div className={`${classes.itemIcon} ${getSkillCategory(item.skills)}`}>
                        {getSkillEmoji(item.skills)}
                      </div>
                      <div className={classes.itemInfo}>
                        <div className={classes.itemTitle}>{item.title}</div>
                        <div className={classes.itemMeta}>
                          <span className={classes.itemSkills}>{item.skills}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                          <span>•</span>
                          <span className={classes.itemDueDate}>
                            Due {formatDate(item.dueDate)}
                          </span>
                        </div>
                      </div>
                      <div className={`${classes.itemStatus} ${isCompleted ? 'completed' : 'pending'}`}>
                        {isCompleted ? (
                          <>
                            <HiCheckCircle size={16} />
                            <span>Done</span>
                          </>
                        ) : (
                          <>
                            <HiClock size={16} />
                            <span>{status === 'in-progress' ? 'In Progress' : 'Start'}</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
