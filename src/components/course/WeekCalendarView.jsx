/**
 * WeekCalendarView Component
 *
 * Displays a weekly calendar grid view showing scheduled learning items (lessons, tests, reviews, etc.)
 * in a 7-column layout representing each day of the week. Supports interactive features like adding events
 * and previewing items.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.generateWeekView - Function that generates an array of 7 day objects with items
 * @param {string|null} props.hoveredDayCell - Date string of the currently hovered day cell (for showing "Add Event" placeholder)
 * @param {Function} props.setHoveredDayCell - Setter function to update the hovered day cell state
 * @param {Object} props.customEventForm - Form state for creating custom events
 * @param {Function} props.setCustomEventForm - Setter function to update custom event form state
 * @param {Function} props.setAddEventModalOpen - Function to open the add event modal
 * @param {Function} props.setPreviewItem - Function to set the item to preview in the preview modal
 * @param {Function} props.getLessonStatus - Function to get the completion status of a lesson/item
 * @param {Object} props.soundEffects - Sound effects service with playClick method
 *
 * @returns {JSX.Element} Weekly calendar grid view with 7 columns
 *
 * @description
 * This component renders a week calendar in a 7-column grid layout with:
 * - Each column represents one day of the week
 * - Today's date highlighted with blue background
 * - Day headers showing just the date number
 * - Scheduled items (lessons, tests, reviews, etc.) with color coding:
 *   - Exam Day: Red gradient (#dc2626 to #b91c1c) with white text and special styling
 *   - Diagnostic: Dark red (#b91c1c)
 *   - Practice Test: Red (#dc2626)
 *   - Mock Exam: Red (#dc2626)
 *   - Practice: Amber (#f59e0b)
 *   - Review: Green (#10b981)
 *   - Lesson: Blue (#3b82f6)
 * - Interactive hover states for adding new events
 * - Click handlers for viewing item details
 * - Fixed height (500px) with scrollable content area
 * - Compact design optimized for week-at-a-glance view
 *
 * @example
 * <WeekCalendarView
 *   generateWeekView={generateWeekView}
 *   hoveredDayCell={hoveredDayCell}
 *   setHoveredDayCell={setHoveredDayCell}
 *   customEventForm={customEventForm}
 *   setCustomEventForm={setCustomEventForm}
 *   setAddEventModalOpen={setAddEventModalOpen}
 *   setPreviewItem={setPreviewItem}
 *   getLessonStatus={getLessonStatus}
 *   soundEffects={soundEffects}
 * />
 *
 * @notes
 * - Each day column has a fixed height of 500px with overflow handling
 * - Items are displayed in a scrollable container (max-height: 400px)
 * - Exam days receive special visual treatment with gradient backgrounds
 * - Empty space clicks trigger the add event modal
 * - Item clicks trigger the preview modal with full item details
 *
 * @edge-cases
 * - If generateWeekView returns empty array, component renders empty grid
 * - Handles items with missing or incomplete data gracefully
 * - Today highlighting works across week boundaries
 * - Hover state clears when hovering over items vs empty space
 */

import React from 'react';

const WeekCalendarView = ({
  generateWeekView,
  hoveredDayCell,
  setHoveredDayCell,
  customEventForm,
  setCustomEventForm,
  setAddEventModalOpen,
  setPreviewItem,
  getLessonStatus,
  soundEffects
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
      gap: '0',
      background: '#d1d5db'
    }}>
      {generateWeekView().map((day, idx) => (
        <div
          key={idx}
          style={{
            background: day.isToday ? '#eff6ff' : '#ffffff',
            padding: '1rem 0.125rem',
            height: '500px',
            minHeight: '500px',
            maxHeight: '500px',
            width: '100%',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRight: idx < 6 ? '1px solid #d1d5db' : 'none'
          }}
        >
          {/* Day Header - Just the date number */}
          <div style={{ marginBottom: '1rem', flexShrink: 0, textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              fontSize: '1.125rem',
              fontWeight: day.isToday ? '700' : '600',
              color: day.isToday ? '#ffffff' : '#1a1a1a',
              background: day.isToday ? '#3b82f6' : 'transparent',
              borderRadius: '50%'
            }}>
              {day.dayNumber}
            </div>
          </div>

          {/* Day Items */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.125rem',
              minHeight: '400px',
              maxHeight: '400px',
              minWidth: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '0 0.125rem',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setHoveredDayCell(day.dateString)}
            onMouseLeave={() => setHoveredDayCell(null)}
            onClick={(e) => {
              // Only trigger if clicking on empty space
              if (e.target === e.currentTarget || e.target.closest('[data-placeholder]')) {
                e.stopPropagation();
                soundEffects.playClick();
                setCustomEventForm({
                  ...customEventForm,
                  date: day.dateString
                });
                setAddEventModalOpen(true);
                setHoveredDayCell(null);
              }
            }}
          >
            {day.items.map((item, itemIdx) => {
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
                    key={itemIdx}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setHoveredDayCell(null);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.5rem',
                      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                      border: '1px solid #fca5a5',
                      borderRadius: '6px',
                      cursor: 'default',
                      margin: '0.125rem 0',
                      boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
                    }}
                  >
                    {/* White Dot */}
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        flexShrink: 0,
                        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.3)'
                      }}
                    />

                    {/* Content */}
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      lineHeight: '1.3',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1
                    }}>
                      {item.title}
                    </span>
                  </div>
                );
              }

              // Determine background color based on item type
              const bgColor = isPracticeTest ? 'rgba(220, 38, 38, 0.1)'
                : isMockExam ? 'rgba(220, 38, 38, 0.1)'
                : isDiagnostic ? 'rgba(185, 28, 28, 0.1)'
                : isPractice ? 'rgba(245, 158, 11, 0.1)'
                : isReview ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(59, 130, 246, 0.1)';

              const hoverBgColor = isPracticeTest ? 'rgba(220, 38, 38, 0.15)'
                : isMockExam ? 'rgba(220, 38, 38, 0.15)'
                : isDiagnostic ? 'rgba(185, 28, 28, 0.15)'
                : isPractice ? 'rgba(245, 158, 11, 0.15)'
                : isReview ? 'rgba(16, 185, 129, 0.15)'
                : 'rgba(59, 130, 246, 0.15)';

              const textColorMatch = isPracticeTest ? '#dc2626'
                : isMockExam ? '#dc2626'
                : isDiagnostic ? '#b91c1c'
                : isPractice ? '#f59e0b'
                : isReview ? '#10b981'
                : '#3b82f6';

              return (
                <div
                  key={itemIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEffects.playClick();
                    setPreviewItem({ ...item, date: day.date });
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '0.5rem 0.75rem',
                    background: bgColor,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                    minWidth: 0,
                    marginBottom: '0.25rem',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = hoverBgColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = bgColor;
                  }}
                >
                  {/* Content */}
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: textColorMatch,
                    lineHeight: '1.4',
                    textAlign: 'left',
                    textDecoration: item.status === 'completed' ? 'line-through' : 'none'
                  }}>
                    {item.title}
                  </span>
                </div>
              );
            })}

            {/* Placeholder for adding new event on hover */}
            {hoveredDayCell === day.dateString && (
              <div
                data-placeholder="true"
                style={{
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(59, 130, 246, 0.05)',
                  border: '1px dashed rgba(59, 130, 246, 0.3)',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#9ca3af',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                + Add Event
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekCalendarView;
