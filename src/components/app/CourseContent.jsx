/**
 * Course Content Component
 * Shows recommended learning path with stats, lessons, and tests in order
 */

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useCourseStyles } from '../../styles/app/course.styles';
import {
  HiCheckCircle,
  HiClock,
  HiBookOpen,
  HiPencilSquare,
  HiCalculator,
  HiBeaker,
  HiClipboardDocumentCheck,
  HiAcademicCap,
  HiChartBar
} from 'react-icons/hi2';

const CourseContent = () => {
  const classes = useCourseStyles();
  const {
    lessonProgress = {},
    lessonStructure = [],
    onLessonOpen,
    onTestOpen
  } = useOutletContext();

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

  // Skill icon mapping - returns React Icon component
  const getSkillIcon = (skill, size = 16) => {
    const iconMap = {
      'Strategy': <HiAcademicCap size={size} />,
      'All Sections': <HiClipboardDocumentCheck size={size} />,
      'Grammar': <HiPencilSquare size={size} />,
      'Punctuation': <HiPencilSquare size={size} />,
      'Problem Solving': <HiCalculator size={size} />,
      'Algebra': <HiCalculator size={size} />,
      'Numbers': <HiCalculator size={size} />,
      'Geometry': <HiCalculator size={size} />,
      'Reading': <HiBookOpen size={size} />,
      'Comprehension': <HiBookOpen size={size} />,
      'Science': <HiBeaker size={size} />,
      'Data Analysis': <HiChartBar size={size} />,
      'Interpretation': <HiBeaker size={size} />
    };
    return iconMap[skill] || <HiBookOpen size={size} />;
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
        { id: 'practice-test-1', type: 'test', title: 'Test 1', skills: 'All Sections', duration: '180 min', dueDate: getDateFromToday(27) }
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
        { id: 'practice-test-2', type: 'test', title: 'Test 2', skills: 'All Sections', duration: '180 min', dueDate: getDateFromToday(41) }
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h1 className={classes.pageTitle}>Learning Path</h1>
            <p className={classes.pageSubtitle}>Your personalized ACT prep journey</p>
          </div>
          <div className={classes.testCountdown}>
            <div style={{ fontSize: '0.7rem', fontWeight: '600', opacity: 0.8, marginBottom: '0.25rem' }}>TEST DATE</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>{testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{daysUntilTest} days left</div>
          </div>
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
            {getSkillIcon(nextAssignment.skills, 20)}
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
                        {getSkillIcon(item.skills, 16)}
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
