/**
 * MonthCalendarView Component
 *
 * Displays a monthly calendar grid view showing scheduled learning items (lessons, tests, reviews, etc.)
 * with an Apple Calendar-inspired design. Supports interactive features like adding events and previewing items.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.generateAppleCalendarView - Function that generates the calendar grid with weeks and items
 * @param {string|null} props.hoveredDayCell - Date string of the currently hovered day cell (for showing "Add Event" placeholder)
 * @param {Function} props.setHoveredDayCell - Setter function to update the hovered day cell state
 * @param {Object} props.customEventForm - Form state for creating custom events
 * @param {Function} props.setCustomEventForm - Setter function to update custom event form state
 * @param {Function} props.setAddEventModalOpen - Function to open the add event modal
 * @param {Function} props.setPreviewItem - Function to set the item to preview in the preview modal
 * @param {Function} props.getHolidays - Function to get holidays for a given year
 * @param {Object} props.soundEffects - Sound effects service with playClick method
 *
 * @returns {JSX.Element} Monthly calendar grid view
 *
 * @description
 * This component renders a full month calendar in a grid layout with:
 * - Previous/next month days (grayed out)
 * - Current month days with full color
 * - Today's date highlighted
 * - Holiday indicators (emoji)
 * - Scheduled items (lessons, tests, reviews, etc.) with color coding:
 *   - Exam Day: Red gradient with special styling
 *   - Diagnostic: Dark red (#b91c1c)
 *   - Practice Test: Red (#dc2626)
 *   - Mock Exam: Red (#dc2626)
 *   - Practice: Amber (#f59e0b)
 *   - Review: Green (#10b981)
 *   - Lesson: Blue (#3b82f6)
 * - Interactive hover states for adding new events
 * - Click handlers for viewing item details
 * - Overflow indicators ("+N more") when too many items
 *
 * @example
 * <MonthCalendarView
 *   generateAppleCalendarView={generateAppleCalendarView}
 *   hoveredDayCell={hoveredDayCell}
 *   setHoveredDayCell={setHoveredDayCell}
 *   customEventForm={customEventForm}
 *   setCustomEventForm={setCustomEventForm}
 *   setAddEventModalOpen={setAddEventModalOpen}
 *   setPreviewItem={setPreviewItem}
 *   getHolidays={getHolidays}
 *   soundEffects={soundEffects}
 * />
 *
 * @edge-cases
 * - Handles months with varying numbers of weeks (4-6 weeks)
 * - Adjusts line clamping based on number of items (2 lines for <=2 items, 1 line for >2 items)
 * - Limits displayed items to 3 (<=2 items) or 4 (>2 items) with overflow indicator
 * - Prevents event bubbling when clicking on items vs empty space
 * - Gracefully handles missing holiday data
 * - Distinguishes between current month and adjacent month days
 */

import React from 'react';
import soundEffects from '../../services/soundEffects';
import { getHolidays } from '../../utils/calendar/holidays';

const MonthCalendarView = ({
  generateAppleCalendarView,
  hoveredDayCell,
  setHoveredDayCell,
  customEventForm,
  setCustomEventForm,
  setAddEventModalOpen,
  setPreviewItem,
  getHolidays: getHolidaysProp,
  soundEffects: soundEffectsProp
}) => {
  // Use provided props or fall back to imported defaults
  const holidays = getHolidaysProp || getHolidays;
  const sounds = soundEffectsProp || soundEffects;

  const { weeks } = generateAppleCalendarView();
  const totalWeeks = weeks.length;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      flex: 1,
      gridTemplateRows: `repeat(${totalWeeks}, 1fr)`,
      overflow: 'hidden'
    }}>
      {weeks.map((week, weekIdx) => (
        week.map((day, dayIdx) => (
          <div
            key={`${weekIdx}-${dayIdx}`}
            style={{
              padding: '0.25rem',
              borderRight: dayIdx < 6 ? '1px solid #d1d5db' : 'none',
              borderBottom: weekIdx < totalWeeks - 1 ? '1px solid #d1d5db' : 'none',
              background: day.isCurrentMonth ? '#ffffff' : '#fafafa',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              overflow: 'hidden'
            }}
          >
            {/* Date Number with Holiday */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: '0.15rem',
              flexShrink: 0,
              gap: '0.2rem'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: '700',
                color: day.isToday ? '#ffffff' : day.isCurrentMonth ? '#1a1a1a' : '#9ca3af',
                background: day.isToday ? '#ef4444' : 'transparent',
                borderRadius: '50%'
              }}>
                {day.dayNumber}
              </div>
              {(() => {
                const holidayData = holidays(new Date(day.dateString).getFullYear());
                const holiday = holidayData[day.dateString];
                if (holiday) {
                  return (
                    <span style={{
                      fontSize: '0.55rem',
                      opacity: 0.6
                    }} title={holiday.name}>
                      {holiday.emoji}
                    </span>
                  );
                }
                return null;
              })()}
            </div>

            {/* Event Items */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: day.items.length <= 2 ? '0.1rem' : '0.075rem',
                flex: 1,
                minHeight: 0,
                overflow: 'auto',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredDayCell(day.dateString)}
              onMouseLeave={() => setHoveredDayCell(null)}
              onClick={(e) => {
                // Only trigger if clicking on empty space
                if (e.target === e.currentTarget || e.target.closest('[data-placeholder]')) {
                  e.stopPropagation();
                  sounds.playClick();
                  setCustomEventForm({
                    ...customEventForm,
                    date: day.dateString
                  });
                  setAddEventModalOpen(true);
                  setHoveredDayCell(null);
                }
              }}
            >
              {day.items.slice(0, day.items.length <= 2 ? 3 : 4).map((item, itemIdx) => {
                const isDiagnostic = item.isDiagnostic;
                const isPracticeTest = item.type === 'practice_test';
                const isPractice = item.type === 'practice';
                const isExamDay = item.type === 'exam_day';
                const isReview = item.type === 'review';
                const isMockExam = item.type === 'mock_exam';

                // Adjust line clamp based on number of items
                const lineClamp = day.items.length <= 2 ? 2 : 1;

                const dotColor = isExamDay ? '#ffffff'
                  : isDiagnostic ? '#b91c1c'
                  : isPracticeTest ? '#dc2626'
                  : isMockExam ? '#dc2626'
                  : isPractice ? '#f59e0b'
                  : isReview ? '#10b981'
                  : '#3b82f6';

                const textColor = isExamDay ? '#ffffff'
                  : isDiagnostic ? '#b91c1c'
                  : isPracticeTest ? '#dc2626'
                  : isMockExam ? '#dc2626'
                  : isPractice ? '#f59e0b'
                  : isReview ? '#10b981'
                  : '#3b82f6';

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
                        display: 'block',
                        padding: day.items.length <= 2 ? '0.15rem 0.25rem' : '0.1rem 0.2rem',
                        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        border: '1px solid #fca5a5',
                        borderRadius: '3px',
                        cursor: 'default',
                        fontSize: '0.55rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        boxShadow: '0 1px 3px rgba(220, 38, 38, 0.3)',
                        lineHeight: day.items.length <= 2 ? '1.2' : '1.15'
                      }}
                      title={item.title}
                    >
                      <span style={{
                        display: '-webkit-box',
                        WebkitLineClamp: lineClamp,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word'
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
                      sounds.playClick();
                      setPreviewItem({ ...item, date: day.date });
                    }}
                    style={{
                      display: 'block',
                      padding: day.items.length <= 2 ? '0.125rem 0.2rem' : '0.1rem 0.2rem',
                      background: bgColor,
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontSize: '0.55rem',
                      fontWeight: '700',
                      color: textColorMatch,
                      transition: 'all 0.15s ease',
                      border: 'none',
                      lineHeight: day.items.length <= 2 ? '1.2' : '1.15'
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setHoveredDayCell(null);
                      e.currentTarget.style.background = hoverBgColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = bgColor;
                    }}
                    title={item.title}
                  >
                    <span style={{
                      display: '-webkit-box',
                      WebkitLineClamp: lineClamp,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textDecoration: item.status === 'completed' ? 'line-through' : 'none',
                      wordBreak: 'break-word'
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
                    padding: '0.125rem 0.2rem',
                    background: 'rgba(59, 130, 246, 0.05)',
                    border: '1px dashed rgba(59, 130, 246, 0.3)',
                    borderRadius: '2px',
                    fontSize: '0.55rem',
                    fontWeight: '700',
                    color: '#9ca3af',
                    textAlign: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  + Add Event
                </div>
              )}

              {day.items.length > (day.items.length <= 2 ? 3 : 4) && (
                <div style={{
                  padding: '0.15rem 0.25rem',
                  fontSize: '0.55rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  textAlign: 'center'
                }}>
                  +{day.items.length - (day.items.length <= 2 ? 3 : 4)} more
                </div>
              )}
            </div>
          </div>
        ))
      )).flat()}
    </div>
  );
};

export default MonthCalendarView;
