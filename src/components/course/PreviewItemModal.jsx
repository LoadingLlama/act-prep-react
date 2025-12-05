/**
 * Preview Item Modal Component
 * Shows detailed preview of calendar items (lessons, practice, tests, reviews)
 * with type-specific styling and information
 */

import React from 'react';
import soundEffects from '../../services/soundEffects';

/**
 * Preview Item Modal
 * @param {object|null} previewItem - Item to preview (null to hide modal)
 * @param {function} onClose - Close modal callback
 * @param {function} handleItemClick - Click handler to start the item
 * @param {array} lessonStructure - Full lesson structure for lookups
 * @param {array} learningPath - Learning path data for practice session details
 */
const PreviewItemModal = ({
  previewItem,
  onClose,
  handleItemClick,
  lessonStructure,
  learningPath
}) => {
  if (!previewItem) return null;

  // Determine colors based on item type
  const isPracticeTest = previewItem.type === 'practice_test' || previewItem.type === 'test';
  const isPractice = previewItem.type === 'practice';
  const isReview = previewItem.type === 'review';
  const isMockExam = previewItem.type === 'mock_exam';

  const headerBg = isPracticeTest ? '#fee2e2' : // Red for practice tests
                   isPractice ? '#fef3c7' :      // Yellow for practice
                   isReview ? '#dcfce7' :         // Green for review
                   isMockExam ? '#fef3c7' :       // Yellow for mock exams
                   '#dbeafe';                      // Blue for lessons

  const headerBorder = isPracticeTest ? '#fecaca' :
                      isPractice ? '#fde68a' :
                      isReview ? '#bbf7d0' :
                      isMockExam ? '#fde68a' :
                      '#bfdbfe';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '2rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: '0',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 1001,
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.25rem',
            color: '#6b7280',
            transition: 'all 0.15s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.color = '#1a1a1a';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#6b7280';
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{
          background: headerBg,
          borderBottom: `1px solid ${headerBorder}`,
          padding: '1.5rem 2.5rem 1rem',
          color: '#1a1a1a',
          flexShrink: 0
        }}>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            opacity: 0.9,
            marginBottom: '0.5rem'
          }}>
            {previewItem.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <h2 style={{
            margin: 0,
            fontSize: '1.75rem',
            fontWeight: '700',
            lineHeight: '1.2',
            color: '#b91c1c'
          }}>
            {previewItem.title}
          </h2>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem 2.5rem 2.5rem', overflowY: 'auto', flex: 1 }}>
          {false && previewItem.type === 'mock_exam' ? (
            <div>
              <div style={{
                background: '#fef3c7',
                border: '2px solid #f59e0b',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: '#92400e',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🎯</span>
                  Final Mock Exam
                </div>
                <div style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: '1.5' }}>
                  This is your final full-length practice exam before test day. Take it seriously and simulate real testing conditions.
                </div>
              </div>

              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#374151' }}>Important:</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li>Find a quiet space with no distractions</li>
                  <li>Use a timer to enforce strict time limits</li>
                  <li>Review your performance thoroughly after</li>
                  <li>Identify last-minute areas to focus on</li>
                </ul>
              </div>
            </div>
          ) : previewItem.type === 'review' ? (
            <div>
              <div style={{
                background: '#d1fae5',
                border: '1px solid #6ee7b7',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#065f46',
                  marginBottom: '0.5rem'
                }}>
                  Weekly Review Session
                </div>
                <div style={{ fontSize: '0.875rem', color: '#047857', lineHeight: '1.5' }}>
                  {previewItem.description || 'Review and practice problems from this week to reinforce what you learned.'}
                </div>
              </div>

              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#374151' }}>Review activities:</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li>Review notes from this week's lessons</li>
                  <li>Redo practice problems you got wrong</li>
                  <li>Practice applying strategies you learned</li>
                  <li>Identify areas that need more focus</li>
                </ul>
              </div>
            </div>
          ) : isPracticeTest ? (
            <div>
              <div style={{
                background: '#fee2e2',
                border: '2px solid #fca5a5',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: '#991b1b',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>📝</span>
                  Practice Test
                </div>
                <div style={{ fontSize: '0.875rem', color: '#7f1d1d', lineHeight: '1.5' }}>
                  {previewItem.section === 'full'
                    ? 'This is a full-length practice test covering all four sections: English, Math, Reading, and Science. Simulate real test conditions for the best practice.'
                    : `This practice test focuses on the ${previewItem.section?.charAt(0).toUpperCase() + previewItem.section?.slice(1)} section. Master this section with realistic practice questions.`
                  }
                </div>
              </div>

              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#374151' }}>What to expect:</strong>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li>Timed test simulation</li>
                  <li>Real ACT question format</li>
                  <li>Detailed score report after completion</li>
                  <li>Personalized recommendations</li>
                </ul>
              </div>
            </div>
          ) : previewItem.type === 'practice' ? (
            (() => {
              // For practice items, show what lessons they'll be practicing
              const practiceDate = previewItem.date;
              // Find all lessons scheduled on the same day
              const lessonsOnSameDay = learningPath
                .flatMap(week => week.days)
                .find(day => day.date === practiceDate)
                ?.items.filter(item => item.type === 'lesson') || [];

              const lessonTitles = lessonsOnSameDay.map(lesson => {
                const lessonData = lessonStructure.find(l => l.id === (lesson.id || lesson.lessonKey));
                return lessonData?.title || lesson.title || 'Lesson';
              });

              return (
                <div>
                  <div style={{
                    background: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#92400e',
                      marginBottom: '0.5rem'
                    }}>
                      Practice Session
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: '1.5' }}>
                      {lessonTitles.length > 0
                        ? `Reinforce what you learned today with practice problems covering: ${lessonTitles.join(', ')}`
                        : 'Practice problems to reinforce concepts you\'ve learned recently.'}
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#374151' }}>What you'll do:</strong>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      <li>Apply concepts from today's lessons</li>
                      <li>Work through practice problems</li>
                      <li>Get immediate feedback</li>
                      <li>Strengthen your understanding</li>
                    </ul>
                  </div>
                </div>
              );
            })()
          ) : (
            (() => {
              // Look up lesson details from lessonStructure
              const lessonId = previewItem.id || previewItem.lessonKey;
              const lessonData = lessonStructure.find(l => l.id === lessonId);
              const lessonDesc = lessonData?.desc || 'This lesson will help you master key concepts and strategies for the ACT.';
              const lessonCategory = lessonData?.category || 'ACT Preparation';
              const keyTerms = lessonData?.keyTerms || [];

              return (
                <div>
                  <div style={{
                    background: '#f5f3ff',
                    border: '1px solid #ddd6fe',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#6d28d9',
                      marginBottom: '0.5rem'
                    }}>
                      {lessonCategory}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.5' }}>
                      {lessonDesc}
                    </div>
                  </div>

                  {keyTerms.length > 0 && (
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#374151' }}>Key concepts covered:</strong>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        {keyTerms.slice(0, 4).map((term, idx) => (
                          <li key={idx}>{term}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {keyTerms.length === 0 && (
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#374151' }}>What you'll learn:</strong>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        <li>Core concepts and strategies</li>
                        <li>Step-by-step examples</li>
                        <li>Practice problems</li>
                        <li>Expert tips and tricks</li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })()
          )}

          {/* Description - Show if available */}
          {previewItem.description && (
            <div style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Description
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap'
              }}>
                {previewItem.description}
              </div>
            </div>
          )}

          {/* Status badge */}
          {previewItem.status && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              background: previewItem.status === 'completed' ? '#dcfce7' :
                         previewItem.status === 'in-progress' ? '#fef3c7' :
                         '#f3f4f6',
              color: previewItem.status === 'completed' ? '#166534' :
                     previewItem.status === 'in-progress' ? '#92400e' :
                     '#6b7280',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: previewItem.status === 'completed' ? '#16a34a' :
                           previewItem.status === 'in-progress' ? '#f59e0b' :
                           '#9ca3af'
              }} />
              {previewItem.status === 'completed' ? 'Completed' : previewItem.status === 'in-progress' ? 'In Progress' : 'Not Started'}
            </div>
          )}

          {/* Action buttons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            padding: '1.5rem 2.5rem',
            borderTop: '1px solid #e9ecef',
            background: '#fafbfc',
            flexShrink: 0
          }}>
            <button
              onClick={() => {
                soundEffects.playSuccess();
                handleItemClick(previewItem);
                onClose();
              }}
              style={{
                flex: 1,
                padding: '0.875rem 1.5rem',
                border: 'none',
                borderRadius: '8px',
                background: isPracticeTest
                  ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                  : previewItem.type === 'mock_exam'
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : previewItem.type === 'review'
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : isPractice
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : 'linear-gradient(135deg, #08245b 0%, #b91c1c 100%)',
                color: 'white',
                fontSize: '0.9375rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              {previewItem.type === 'review' ? 'Start Review' : previewItem.type === 'mock_exam' ? 'Start Mock Exam' : isPracticeTest ? 'Start Test' : isPractice ? 'Start Practice' : 'Start Lesson'} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewItemModal;
