/**
 * Home Component
 * Main dashboard displaying progress, stats, and recommendations
 */

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useHomeStyles } from '../styles/app/home.styles';
import { HiClipboardDocumentCheck, HiBookOpen, HiAcademicCap, HiChartBar } from 'react-icons/hi2';
import Calendar from './Calendar';

const Home = () => {
  const classes = useHomeStyles();
  const {
    lessonProgress = {},
    lessonStructure = [],
    onNavigate,
    onLessonOpen
  } = useOutletContext();

  const [hoveredDataPoint, setHoveredDataPoint] = React.useState(null);

  const handleCalendarNavigate = (type, id) => {
    if (type === 'lessons' && id) {
      onLessonOpen && onLessonOpen(id, 'review');
    } else if (type === 'tests' && id) {
      onNavigate && onNavigate('tests');
    }
  };

  const totalLessons = lessonStructure.length;
  const completedLessons = Object.values(lessonProgress).filter(status => status === 'completed').length;
  const inProgressLessons = Object.values(lessonProgress).filter(status => status === 'in-progress').length;
  const notStartedLessons = totalLessons - completedLessons - inProgressLessons;

  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const inProgressPercentage = totalLessons > 0 ? (inProgressLessons / totalLessons) * 100 : 0;

  // Mock score timeline data
  const scoreTimeline = [
    { week: 'Week 1', score: 22, date: 'Jan 1' },
    { week: 'Week 2', score: 24, date: 'Jan 8' },
    { week: 'Week 3', score: 26, date: 'Jan 15' },
    { week: 'Week 4', score: 28, date: 'Jan 22' },
    { week: 'Goal', score: 32, date: 'Feb 1', isGoal: true }
  ];

  return (
    <div className={classes.homeContainer}>
      {/* Page Header */}
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Dashboard</h1>
        <p className={classes.pageSubtitle}>Track your progress and study goals</p>
      </div>

      {/* Main Content */}
      <div className={classes.contentContainer}>
        {/* Main Grid: 2 columns */}
        <div className={classes.mainGrid}>
          {/* Left: What to Do Next */}
          <div className={classes.upcomingSection}>
            <div className={classes.upcomingHeader}>
              <h2 className={classes.sectionTitle}>What to Do Next</h2>
              <div className={classes.upcomingActions}>
                <button className={classes.upcomingActionBtn} onClick={() => onNavigate && onNavigate('lessons')}>
                  View All
                </button>
              </div>
            </div>

            <div className={classes.timelineContainer}>
              {/* TODAY */}
              <div className={classes.timelineDay}>
                <div className={classes.timelineDayHeader}>
                  <div className={classes.timelineDot}></div>
                  <div className={classes.timelineDayTitle}>Today</div>
                  <div className={classes.timelineDayDate}>
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className={classes.timelineItems}>
                  {/* Today's Lesson */}
                  <div
                    className={classes.upcomingCard}
                    onClick={() => onLessonOpen && onLessonOpen('english-1-1', 'review')}
                  >
                    <div className={`${classes.upcomingCardIcon} lesson`}>
                      <HiBookOpen style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div className={classes.upcomingCardContent}>
                      <div className={classes.upcomingCardTitle}>Grammar Fundamentals</div>
                      <div className={classes.upcomingCardMeta}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        15 min • Lesson
                      </div>
                    </div>
                    <button className={classes.upcomingCardBtn} onClick={(e) => e.stopPropagation()}>
                      Start
                    </button>
                  </div>

                  {/* Practice Session */}
                  <div
                    className={classes.upcomingCard}
                    onClick={() => onLessonOpen && onLessonOpen('english-1-1', 'practice')}
                  >
                    <div className={`${classes.upcomingCardIcon} practice`}>
                      <HiAcademicCap style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div className={classes.upcomingCardContent}>
                      <div className={classes.upcomingCardTitle}>Practice Questions</div>
                      <div className={classes.upcomingCardMeta}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 11l3 3L22 4"></path>
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                        </svg>
                        10 questions
                      </div>
                    </div>
                    <button className={classes.upcomingCardBtn} onClick={(e) => e.stopPropagation()}>
                      Practice
                    </button>
                  </div>
                </div>
              </div>

              {/* TOMORROW */}
              <div className={classes.timelineDay}>
                <div className={classes.timelineDayHeader}>
                  <div className={`${classes.timelineDot} last`}></div>
                  <div className={classes.timelineDayTitle}>Tomorrow</div>
                  <div className={classes.timelineDayDate}>
                    {new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className={classes.timelineItems}>
                  {/* Practice Test */}
                  <div
                    className={classes.upcomingCard}
                    onClick={() => onNavigate && onNavigate('tests')}
                  >
                    <div className={`${classes.upcomingCardIcon} test`}>
                      <HiClipboardDocumentCheck style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div className={classes.upcomingCardContent}>
                      <div className={classes.upcomingCardTitle}>Practice Test 1</div>
                      <div className={classes.upcomingCardMeta}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        175 min • Full Test
                      </div>
                    </div>
                    <button className={classes.upcomingCardBtn} onClick={(e) => e.stopPropagation()}>
                      View
                    </button>
                  </div>

                  {/* Review Weak Areas */}
                  <div
                    className={classes.upcomingCard}
                    onClick={() => onLessonOpen && onLessonOpen('math-1-1', 'review')}
                  >
                    <div className={`${classes.upcomingCardIcon} lesson`}>
                      <HiChartBar style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div className={classes.upcomingCardContent}>
                      <div className={classes.upcomingCardTitle}>Review Weak Areas</div>
                      <div className={classes.upcomingCardMeta}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        Math • Recommended
                      </div>
                    </div>
                    <button className={classes.upcomingCardBtn} onClick={(e) => e.stopPropagation()}>
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Calendar */}
          <div className={classes.calendarSection}>
            <Calendar onNavigate={handleCalendarNavigate} />
          </div>
        </div>

        {/* Progress Section */}
        <div className={classes.progressSection}>
          <h2 className={classes.sectionTitle}>Learning Progress</h2>
          <div className={classes.progressItem}>
            <div className={classes.progressHeader}>
              <span className={classes.progressLabel}>Lessons Completed</span>
              <span className={classes.progressValue}>{completedLessons} / {totalLessons}</span>
            </div>
            <div className={classes.progressBarContainer}>
              <div
                className={classes.progressBarFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <div className={classes.progressItem}>
            <div className={classes.progressHeader}>
              <span className={classes.progressLabel}>In Progress</span>
              <span className={classes.progressValue}>{inProgressLessons} lessons</span>
            </div>
            <div className={classes.progressBarContainer}>
              <div
                className={`${classes.progressBarFill} inProgress`}
                style={{ width: `${inProgressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
