/**
 * List View Content Component
 * Displays learning path as collapsible weekly sections
 */

import React from 'react';
import { HiChevronUp, HiChevronDown, HiCheckCircle } from 'react-icons/hi2';
import soundEffects from '../../services/soundEffects';

/**
 * List View Content
 * @param {Array} learningPath - Array of week objects with items
 * @param {Object} expandedWeeks - Object tracking which weeks are expanded
 * @param {Function} toggleWeek - Function to toggle week expansion
 * @param {Function} getLessonStatus - Function to get lesson status by ID
 * @param {Function} handleItemClick - Function to handle item click
 */
const ListViewContent = ({
  learningPath,
  expandedWeeks,
  toggleWeek,
  getLessonStatus,
  handleItemClick
}) => {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      width: '100%'
    }}>
      {learningPath.map((week, weekIndex) => {
        const weekKey = `week-${weekIndex}`;
        const isExpanded = expandedWeeks[weekKey];
        const now = new Date();
        const isCurrentWeek = now >= week.startDate && now <= week.endDate;

        // Calculate completed items for this week
        const completedCount = week.items.filter(item => {
          const status = getLessonStatus(item.id);
          return status === 'completed';
        }).length;
        const totalCount = week.items.length;

        // Calculate total duration
        const totalMinutes = week.items.reduce((sum, item) => {
          const minutes = parseInt(item.duration) || 0;
          return sum + minutes;
        }, 0);
        const totalHours = (totalMinutes / 60).toFixed(1);

        return (
          <div key={weekKey} style={{
            marginBottom: '0.5rem',
            border: isExpanded ? '1px solid #e5e7eb' : 'none',
            borderRadius: '8px',
            overflow: 'hidden',
            background: isCurrentWeek ? '#f0f9ff' : 'transparent'
          }}>
            {/* Week Header (clickable) */}
            <button
              onClick={() => toggleWeek(weekKey)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: 'white',
                border: 'none',
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
                  {week.week}
                  {isCurrentWeek && (
                    <span style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#1e3a8a',
                      background: '#dbeafe',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '999px'
                    }}>
                      Current Week
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  {totalCount} item{totalCount !== 1 ? 's' : ''} • {totalHours}h total
                </div>
              </div>
              <div style={{
                fontSize: '1.25rem',
                color: '#6b7280'
              }}>
                {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
              </div>
            </button>

            {/* Expanded Week Items */}
            {isExpanded && (
              <div style={{
                padding: '0.5rem 1.25rem 1rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                {week.items.map((item, itemIndex) => {
                  const status = getLessonStatus(item.id);
                  const isCompleted = status === 'completed';
                  const isInProgress = status === 'in-progress';
                  const showCheckmark = isCompleted || isInProgress;
                  const isExamDay = item.type === 'exam_day';
                  const isDiagnostic = item.isDiagnostic;
                  const isPracticeTest = item.type === 'practice_test';
                  const isPractice = item.type === 'practice';
                  const isReview = item.type === 'review';
                  const isMockExam = item.type === 'mock_exam';

                  // Exam day gets special treatment
                  if (isExamDay) {
                    return (
                      <div
                        key={itemIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          margin: '0.25rem 0',
                          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                          border: '2px solid #fca5a5',
                          borderRadius: '6px',
                          cursor: 'default',
                          boxShadow: '0 2px 8px rgba(220, 38, 38, 0.2)'
                        }}
                      >
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#ffffff',
                          fontWeight: '600',
                          flex: 1
                        }}>
                          {item.title}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={itemIndex}
                      onClick={() => {
                        if (!item.isLocked) {
                          soundEffects.playClick();
                          handleItemClick(item);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.625rem 0.75rem',
                        margin: '0.25rem 0',
                        cursor: item.isLocked ? 'not-allowed' : 'pointer',
                        opacity: item.isLocked ? 0.5 : 1,
                        borderRadius: '6px',
                        transition: 'background 0.15s'
                      }}
                      onMouseOver={(e) => {
                        if (!item.isLocked) e.currentTarget.style.background = '#f3f4f6';
                      }}
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

                      {/* Item Title */}
                      <div style={{
                        flex: 1,
                        fontSize: '0.9rem',
                        color: isPracticeTest || isMockExam ? '#dc2626' : isReview ? '#10b981' : '#374151',
                        fontWeight: isPracticeTest || isMockExam || isReview ? '600' : '500'
                      }}>
                        {item.title}
                      </div>

                      {/* Duration */}
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        {item.duration}
                      </div>
                    </div>
                  );
                })}

                {/* Start Button at Bottom */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEffects.playClick();
                    const firstItem = week.items.find(item => !item.isLocked);
                    if (firstItem) {
                      handleItemClick(firstItem);
                    }
                  }}
                  style={{
                    display: 'block',
                    marginTop: '1rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '0.625rem 1.25rem',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Start week
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListViewContent;
