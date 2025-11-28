/**
 * YearCalendarView Component
 *
 * Displays a year view of the calendar with all 12 months in a grid layout.
 * Each month shows a mini calendar with days that can be clicked to navigate to day view.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.generateYearView - Function that generates the year view data structure
 *   Returns an array of month objects, each containing:
 *   - monthDate: Date object for the first day of the month
 *   - days: Array of day objects with dayNumber, date, dateString, isToday, hasItems
 * @param {Function} props.getHolidays - Function to get holidays for a given year
 *   @param {number} year - The year to get holidays for
 *   @returns {Object} Object mapping date strings to holiday objects with name and emoji
 * @param {Function} props.setCurrentDay - Function to set the current day in the parent component
 * @param {Function} props.setCalendarViewType - Function to change the calendar view type
 * @param {Object} props.soundEffects - Sound effects object with playClick method
 *
 * @returns {JSX.Element} Year calendar view component
 *
 * @example
 * <YearCalendarView
 *   generateYearView={generateYearView}
 *   getHolidays={getHolidays}
 *   setCurrentDay={setCurrentDay}
 *   setCalendarViewType={setCalendarViewType}
 *   soundEffects={soundEffects}
 * />
 *
 * Edge cases:
 * - Handles months with different numbers of days (28-31)
 * - Properly aligns days with correct day of week
 * - Shows empty cells for days before the month starts
 * - Highlights current day across all months
 * - Shows indicator dot for days with scheduled items
 * - Displays holiday emojis on relevant dates
 */

import React from 'react';

const YearCalendarView = ({
  generateYearView,
  getHolidays,
  setCurrentDay,
  setCalendarViewType,
  soundEffects
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
      padding: '2.5rem',
      background: '#ffffff',
      overflowY: 'auto',
      flex: 1
    }}>
      {generateYearView().map((month, idx) => (
        <div
          key={idx}
          style={{
            background: '#ffffff',
            padding: '0',
            transition: 'all 0.2s ease'
          }}
        >
          {/* Month name - left aligned and full name */}
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            textAlign: 'left'
          }}>
            {month.monthDate.toLocaleDateString('en-US', { month: 'long' })}
          </div>

          {/* Day headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            marginBottom: '0.25rem'
          }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div
                key={i}
                style={{
                  fontSize: '0.625rem',
                  fontWeight: '600',
                  color: '#9ca3af',
                  textAlign: 'center',
                  padding: '0.125rem'
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0.125rem'
          }}>
            {month.days.map((day, dayIdx) => {
              if (!day) {
                return <div key={dayIdx} style={{ padding: '0.375rem' }} />;
              }

              return (
                <div
                  key={dayIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEffects.playClick();
                    setCurrentDay(day.date);
                    setCalendarViewType('day');
                  }}
                  style={{
                    position: 'relative',
                    padding: '0.375rem',
                    fontSize: '0.7rem',
                    fontWeight: day.isToday ? '700' : '500',
                    color: day.isToday ? '#ffffff' : '#1a1a1a',
                    background: day.isToday ? '#3b82f6' : 'transparent',
                    borderRadius: '4px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!day.isToday) {
                      e.currentTarget.style.background = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!day.isToday) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.15rem',
                    justifyContent: 'center'
                  }}>
                    <span>{day.dayNumber}</span>
                    {(() => {
                      const dateStr = day.date.toISOString().split('T')[0];
                      const holidays = getHolidays(day.date.getFullYear());
                      const holiday = holidays[dateStr];
                      if (holiday) {
                        return (
                          <span style={{
                            fontSize: '0.45rem',
                            opacity: 0.6,
                            lineHeight: '1'
                          }} title={holiday.name}>
                            {holiday.emoji}
                          </span>
                        );
                      }
                      return null;
                    })()}
                  </div>
                  {day.hasItems && (
                    <div style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '3px',
                      height: '3px',
                      borderRadius: '50%',
                      background: day.isToday ? '#ffffff' : '#3b82f6'
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default YearCalendarView;
