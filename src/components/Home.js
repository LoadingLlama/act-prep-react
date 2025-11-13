/**
 * Home Component
 * Simplified, compact dashboard
 */

import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useHomeStyles } from '../styles/app/home.styles';

const Home = () => {
  const classes = useHomeStyles();
  const {
    lessonProgress = {},
    lessonStructure = [],
    onNavigate,
    onLessonOpen
  } = useOutletContext();

  const totalLessons = lessonStructure.length;
  const completedLessons = Object.values(lessonProgress).filter(status => status === 'completed').length;

  return (
    <div className={classes.container}>
      {/* Header */}
      <div className={classes.header}>
        <h1 className={classes.title}>Dashboard</h1>
      </div>

      {/* Main Content - Single Column */}
      <div className={classes.content}>
        {/* Today Section */}
        <div className={classes.section}>
          <div className={classes.sectionHeader}>
            <h2 className={classes.sectionTitle}>Today</h2>
          </div>
          <div className={classes.list}>
            <div className={classes.listItem} onClick={() => onLessonOpen && onLessonOpen('english-1-1', 'review')}>
              <span className={classes.listText}>Building Complete Sentences</span>
              <button className={classes.listButton}>Continue</button>
            </div>
            <div className={classes.listItem} onClick={() => onLessonOpen && onLessonOpen('english-1-1', 'practice')}>
              <span className={classes.listText}>Practice: Sentence Structure</span>
              <button className={classes.listButton}>Start</button>
            </div>
            <div className={classes.listItem} onClick={() => onLessonOpen && onLessonOpen('english-1-2', 'review')}>
              <span className={classes.listText}>Essential Comma Rules</span>
              <button className={classes.listButton}>Start</button>
            </div>
          </div>
        </div>

        {/* Upcoming Section */}
        <div className={classes.section}>
          <div className={classes.sectionHeader}>
            <h2 className={classes.sectionTitle}>Upcoming</h2>
          </div>
          <div className={classes.list}>
            <div className={classes.listItem} onClick={() => onNavigate && onNavigate('tests')}>
              <span className={classes.listText}>Full Practice Test 1</span>
              <button className={classes.listButton}>Start</button>
            </div>
            <div className={classes.listItem} onClick={() => onLessonOpen && onLessonOpen('math-1-1', 'review')}>
              <span className={classes.listText}>Review: Weak Areas</span>
              <button className={classes.listButton}>Review</button>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className={classes.section}>
          <div className={classes.sectionHeader}>
            <h2 className={classes.sectionTitle}>Progress</h2>
          </div>
          <div className={classes.list}>
            <div className={classes.listItem}>
              <span className={classes.listText}>Lessons Completed</span>
              <span className={classes.listValue}>{completedLessons} / {totalLessons}</span>
            </div>
            <div className={classes.listItem}>
              <span className={classes.listText}>Current Score</span>
              <span className={classes.listValue}>--</span>
            </div>
            <div className={classes.listItem}>
              <span className={classes.listText}>Target Score</span>
              <span className={classes.listValue}>36</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={classes.section}>
          <div className={classes.sectionHeader}>
            <h2 className={classes.sectionTitle}>Quick Actions</h2>
          </div>
          <div className={classes.list}>
            <div className={classes.listItem} onClick={() => onNavigate && onNavigate('lessons')}>
              <span className={classes.listText}>Browse All Lessons</span>
              <button className={classes.listButton}>View</button>
            </div>
            <div className={classes.listItem} onClick={() => onNavigate && onNavigate('tests')}>
              <span className={classes.listText}>Take Practice Test</span>
              <button className={classes.listButton}>Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
