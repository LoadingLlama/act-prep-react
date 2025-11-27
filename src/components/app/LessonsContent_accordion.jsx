/**
 * Lessons Content Component - Accordion Style
 * All sections visible with collapsible units
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLessonsContentStyles } from '../../styles/app/lessons-content.styles';
import { HiCheckCircle, HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import soundEffects from '../../services/soundEffects';

const LessonsContent = () => {
  const classes = useLessonsContentStyles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    lessonStructure = [],
    getLessonStatus,
    onLessonOpen: openLesson
  } = useOutletContext();

  // Track which units are expanded
  const [expandedUnits, setExpandedUnits] = useState({});

  // Toggle unit expansion
  const toggleUnit = (unitKey) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitKey]: !prev[unitKey]
    }));
  };

  // Group lessons by section and category
  const groupedLessons = {
    'Math': {},
    'Reading & Writing': {},
    'Science': {}
  };

  lessonStructure.forEach(lesson => {
    let sectionName;
    if (lesson.section === 'math') sectionName = 'Math';
    else if (lesson.section === 'english' || lesson.section === 'reading') sectionName = 'Reading & Writing';
    else if (lesson.section === 'science') sectionName = 'Science';
    else return;

    if (!groupedLessons[sectionName][lesson.category]) {
      groupedLessons[sectionName][lesson.category] = [];
    }
    groupedLessons[sectionName][lesson.category].push(lesson);
  });

  // Calculate unit stats
  const getUnitStats = (lessons) => {
    const completed = lessons.filter(l => getLessonStatus(l.id) === 'completed').length;
    const inProgress = lessons.filter(l => getLessonStatus(l.id) === 'in-progress').length;
    return { completed, inProgress, total: lessons.length };
  };

  return (
    <div className={classes.lessonsContainer}>
      <div className={classes.lessonsMainContent}>
        <div className={classes.pageHeader}>
          <h1 className={classes.pageTitle}>Lessons</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {Object.entries(groupedLessons).map(([sectionName, categories]) => (
            <div key={sectionName}>
              {/* Section Header */}
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '1rem'
              }}>
                {sectionName}
              </h2>

              {/* Categories (Units) */}
              {Object.entries(categories).map(([category, lessons]) => {
                const unitKey = `${sectionName}-${category}`;
                const isExpanded = expandedUnits[unitKey];
                const stats = getUnitStats(lessons);
                const totalQuestions = lessons.reduce((sum, l) => sum + (l.questionCount || 0), 0);

                return (
                  <div key={unitKey} style={{
                    marginBottom: '0.5rem',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    {/* Unit Header */}
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        toggleUnit(unitKey);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        textAlign: 'left'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    >
                      <div>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#1a1a1a',
                          marginBottom: '0.25rem'
                        }}>
                          {category}
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#6b7280'
                        }}>
                          {totalQuestions} questions
                        </div>
                      </div>
                      <div style={{
                        fontSize: '1.25rem',
                        color: '#6b7280'
                      }}>
                        {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
                      </div>
                    </button>

                    {/* Expanded Lessons */}
                    {isExpanded && (
                      <div style={{
                        padding: '0.5rem 1.25rem 1rem',
                        background: '#fafbfc'
                      }}>
                        {lessons.map(lesson => {
                          const status = getLessonStatus(lesson.id);
                          const isCompleted = status === 'completed';
                          const isInProgress = status === 'in-progress';
                          const showCheckmark = isCompleted || isInProgress;

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => {
                                soundEffects.playClick();
                                openLesson(lesson.id);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.625rem 0.75rem',
                                margin: '0.25rem 0',
                                cursor: 'pointer',
                                borderRadius: '6px',
                                transition: 'background 0.15s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              {/* Checkbox */}
                              <div style={{
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                {showCheckmark ? (
                                  <HiCheckCircle style={{
                                    fontSize: '1.25rem',
                                    color: '#3b82f6'
                                  }} />
                                ) : (
                                  <div style={{
                                    width: '18px',
                                    height: '18px',
                                    border: '2px solid #d1d5db',
                                    borderRadius: '4px'
                                  }} />
                                )}
                              </div>

                              {/* Lesson Title */}
                              <div style={{
                                flex: 1,
                                fontSize: '0.9rem',
                                color: '#374151',
                                fontWeight: '500'
                              }}>
                                {lesson.title}
                              </div>

                              {/* Progress Count */}
                              <div style={{
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                fontWeight: '500'
                              }}>
                                0/{lesson.questionCount || 0}
                              </div>
                            </div>
                          );
                        })}

                        {/* Start Practice Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundEffects.playClick();
                            // Open first lesson in practice mode
                            if (lessons.length > 0) {
                              openLesson(lessons[0].id, 'practice');
                            }
                          }}
                          style={{
                            marginTop: '1rem',
                            padding: '0.625rem 1.25rem',
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                            e.currentTarget.style.borderColor = '#d1d5db';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.borderColor = '#e5e7eb';
                          }}
                        >
                          Start practice
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Sidebar */}
      <div className={classes.progressSidebar}>
        <div className={classes.progressCard}>
          <h3 className={classes.progressTitle}>Progress</h3>

          <div className={classes.progressCircleContainer}>
            <div className={classes.progressCircle}>
              <svg className={classes.progressCircleSvg} width="180" height="180">
                <circle
                  className={classes.progressCircleBackground}
                  cx="90"
                  cy="90"
                  r="80"
                />
                <circle
                  className={classes.progressCircleProgress}
                  cx="90"
                  cy="90"
                  r="80"
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={2 * Math.PI * 80 * (1 - 12 / 100)}
                />
              </svg>
              <div className={classes.progressText}>
                <div className={classes.progressPercentage}>12%</div>
                <div className={classes.progressFraction}>126/1050</div>
              </div>
            </div>
          </div>

          <div className={classes.progressStats}>
            <div className={classes.progressStat}>
              <div className={classes.progressStatLabel}>Correct</div>
              <div className={classes.progressStatValue} style={{ color: '#22c55e' }}>97</div>
            </div>
            <div className={classes.progressStat}>
              <div className={classes.progressStatLabel}>Incorrect</div>
              <div className={classes.progressStatValue} style={{ color: '#ef4444' }}>29</div>
            </div>
          </div>

          <button className={classes.viewHistoryButton}>
            <span>View session history</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonsContent;
