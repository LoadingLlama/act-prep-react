/**
 * DayCalendarView Component
 *
 * Displays a single day view of scheduled learning items (lessons, tests, reviews, etc.)
 * in a vertically stacked list format with day header and add event functionality.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.generateDayView - Function that generates day data with scheduled items
 * @param {Function} props.getHolidays - Function to retrieve holidays for a specific year
 * @param {Function} props.getLessonStatus - Function to get the completion status of a lesson/item by ID
 * @param {Function} props.handleItemClick - Function to handle clicks on scheduled items
 * @param {Function} props.setHoveredDayCell - Setter function to update the hovered day cell state
 * @param {Object} props.customEventForm - Form state for creating custom events
 * @param {Function} props.setCustomEventForm - Setter function to update custom event form state
 * @param {Function} props.setAddEventModalOpen - Function to open the add event modal
 * @param {Object} props.soundEffects - Sound effects service with playClick method
 *
 * @returns {JSX.Element|null} Day calendar view with items list, or null if no day data available
 *
 * @description
 * This component renders a single day calendar view with:
 * - Day header showing full date (e.g., "Monday, January 1, 2025")
 * - Holiday indicator if applicable (emoji and name)
 * - List of scheduled items with color coding by type:
 *   - Exam Day: Red gradient background (#dc2626 to #b91c1c) with white text and special styling
 *   - Diagnostic: Dark red background (#b91c1c) with red text
 *   - Practice Test: Red background (#dc2626) with red text
 *   - Mock Exam: Red background (#dc2626) with red text
 *   - Practice: Amber background (#f59e0b) with amber text
 *   - Review: Green background (#10b981) with green text
 *   - Lesson: Blue background (#3b82f6) with blue text
 * - Each item displays title and optional duration
 * - Completed items shown with line-through text decoration
 * - Interactive hover states for better UX
 * - "Add Event" card for creating custom events on the selected day
 * - Centered layout with max-width of 750px
 * - Responsive padding and spacing
 *
 * @example
 * <DayCalendarView
 *   generateDayView={generateDayView}
 *   getHolidays={getHolidays}
 *   getLessonStatus={getLessonStatus}
 *   handleItemClick={handleItemClick}
 *   setHoveredDayCell={setHoveredDayCell}
 *   customEventForm={customEventForm}
 *   setCustomEventForm={setCustomEventForm}
 *   setAddEventModalOpen={setAddEventModalOpen}
 *   soundEffects={soundEffects}
 * />
 *
 * @edge-cases
 * - Returns null if generateDayView() returns null/undefined (no day data available)
 * - Holiday lookup gracefully handles missing holidays (returns null, no display)
 * - Items without duration don't display duration badge
 * - Empty items list still shows "Add Event" card
 * - Hover effects properly clear other hover states (setHoveredDayCell(null))
 * - Exam day items have no click handler (non-interactive display only)
 */

import React from 'react';
import soundEffects from '../../services/soundEffects';

const DayCalendarView = ({
  generateDayView,
  getHolidays,
  getLessonStatus,
  handleItemClick,
  setHoveredDayCell,
  customEventForm,
  setCustomEventForm,
  setAddEventModalOpen
}) => {
  const dayData = generateDayView();
  if (!dayData) return null;

  return (
    <div style={{
      background: '#ffffff',
      padding: '2.5rem',
      overflowY: 'auto',
      flex: 1
    }}>
      <div style={{
        maxWidth: '750px',
        margin: '0 auto'
      }}>
        {/* Day header with holiday */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0
          }}>
            {dayData.fullDayName}, {dayData.monthName} {dayData.dayNumber}, {dayData.year}
          </h2>
          {(() => {
            const holidays = getHolidays(dayData.year);
            const holiday = holidays[dayData.dateString];
            if (holiday) {
              return (
                <span style={{
                  fontSize: '0.875rem',
                  opacity: 0.5,
                  fontWeight: '400',
                  color: '#6b7280'
                }} title={holiday.name}>
                  {holiday.emoji} {holiday.name}
                </span>
              );
            }
            return null;
          })()}
        </div>

        {/* Items list */}
        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {dayData.items.map((item, idx) => {
            const status = getLessonStatus(item.id);
            const isCompleted = status === 'completed';
            const isExamDay = item.type === 'exam_day';
            const isDiagnostic = item.isDiagnostic;
            const isPracticeTest = item.type === 'practice_test';
            const isPractice = item.type === 'practice';
            const isReview = item.type === 'review';
            const isMockExam = item.type === 'mock_exam';

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

            if (isExamDay) {
              return (
                <div
                  key={idx}
                  style={{
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    border: '1px solid #fca5a5',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontWeight: '700'
                  }}
                >
                  {item.title}
                </div>
              );
            }

            return (
              <div
                key={idx}
                onClick={() => handleItemClick(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: bgColor,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setHoveredDayCell(null);
                  e.currentTarget.style.background = hoverBgColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = bgColor;
                }}
              >
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  color: textColorMatch,
                  flex: 1,
                  textDecoration: item.status === 'completed' ? 'line-through' : 'none'
                }}>
                  {item.title}
                </span>
                {item.duration && (
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}>
                    {item.duration} min
                  </span>
                )}
              </div>
            );
          })}

          {/* Add Event Card */}
          <div
            onClick={() => {
              soundEffects.playClick();
              setCustomEventForm({
                ...customEventForm,
                date: dayData.dateString
              });
              setAddEventModalOpen(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem',
              background: '#f9fafb',
              border: '2px dashed #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              marginTop: dayData.items.length > 0 ? '0.5rem' : '0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            <span style={{
              fontSize: '1.25rem',
              color: '#6b7280'
            }}>+</span>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#6b7280'
            }}>
              Add Event
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCalendarView;
