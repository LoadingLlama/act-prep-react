/**
 * Practice Page
 * Shows all lessons with their 5-star mastery ratings for practice
 */

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { usePracticePageStyles } from '../styles/pages/practice-page.styles';
import { HiStar } from 'react-icons/hi2';

const PracticePage = () => {
  const classes = usePracticePageStyles();
  const {
    lessonStructure = [],
    onLessonOpen
  } = useOutletContext();

  const [activeSection, setActiveSection] = useState('english');

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

  const getFilteredLessons = () => {
    return lessonStructure.filter(lesson => lesson.section === activeSection);
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
    if (rating <= 4) return '#8b5cf6';
    return '#10b981';
  };

  return (
    <div className={classes.practiceContainer}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Practice</h1>
        <p className={classes.pageSubtitle}>Test your knowledge and track your mastery</p>
      </div>

      {/* Filter Bar */}
      <div className={classes.filterBar}>
        <button
          className={`${classes.filterButton} getting-started ${activeSection === 'getting-started' ? 'active' : ''}`}
          onClick={() => setActiveSection('getting-started')}
        >
          Getting Started
        </button>
        <button
          className={`${classes.filterButton} english ${activeSection === 'english' ? 'active' : ''}`}
          onClick={() => setActiveSection('english')}
        >
          English
        </button>
        <button
          className={`${classes.filterButton} math ${activeSection === 'math' ? 'active' : ''}`}
          onClick={() => setActiveSection('math')}
        >
          Math
        </button>
        <button
          className={`${classes.filterButton} reading ${activeSection === 'reading' ? 'active' : ''}`}
          onClick={() => setActiveSection('reading')}
        >
          Reading
        </button>
        <button
          className={`${classes.filterButton} science ${activeSection === 'science' ? 'active' : ''}`}
          onClick={() => setActiveSection('science')}
        >
          Science
        </button>
      </div>

      {/* Lessons Grid */}
      <div className={classes.lessonsGrid}>
        {getFilteredLessons().map((lesson, index) => {
          const rating = getMasteryRating(lesson.id);
          const ratingLabel = getRatingLabel(rating);
          const ratingColor = getRatingColor(rating);

          return (
            <div
              key={lesson.id}
              className={classes.lessonCard}
              onClick={() => onLessonOpen(lesson.id, 'practice')}
            >
              <div className={classes.lessonNumber}>
                Lesson {index + 1}
              </div>
              <div className={classes.lessonTitle}>
                {lesson.title}
              </div>

              {/* Star Rating Display */}
              <div className={classes.ratingSection}>
                <div className={classes.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <HiStar
                      key={star}
                      className={`${classes.star} ${rating >= star ? 'filled' : ''}`}
                      style={{ color: rating >= star ? '#fbbf24' : '#e2e8f0' }}
                    />
                  ))}
                </div>
                <div className={classes.ratingLabel} style={{ color: ratingColor }}>
                  {ratingLabel}
                </div>
              </div>

              {/* Practice Button */}
              <button
                className={classes.practiceButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onLessonOpen(lesson.id, 'practice');
                }}
              >
                {rating === 0 ? 'Start Practice' : 'Practice Again'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticePage;
