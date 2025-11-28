/**
 * Calendar Header Component
 *
 * Displays the calendar navigation header with month/week/day/year navigation,
 * days until exam indicator, today button, add event button, and calendar view type dropdown.
 *
 * @param {Object} props - Component props
 * @param {'day' | 'week' | 'month' | 'year'} props.calendarViewType - Current calendar view type
 * @param {Function} props.setCalendarViewType - Function to set the calendar view type
 * @param {Date} props.currentMonth - Current month for month view
 * @param {Date} props.currentWeekStart - Current week start date for week view
 * @param {Date} props.currentDay - Current day for day view
 * @param {number} props.currentYear - Current year for year view
 * @param {number} props.daysUntilTest - Number of days remaining until the exam
 * @param {Function} props.navigateCalendar - Function to navigate calendar (accepts -1 for previous, 1 for next)
 * @param {Function} props.goToToday - Function to navigate calendar to today's date
 * @param {Function} props.setAddEventModalOpen - Function to open the add event modal
 * @param {Function} props.setCustomEventForm - Function to set custom event form state
 * @param {boolean} props.calendarDropdownOpen - Whether the calendar view dropdown is open
 * @param {Function} props.setCalendarDropdownOpen - Function to toggle calendar dropdown state
 * @param {Object} props.soundEffects - Sound effects service for UI interactions
 *
 * @returns {JSX.Element} Calendar header component with navigation and controls
 *
 * @description
 * This component provides the following functionality:
 * - Navigation arrows to move between time periods (day/week/month/year)
 * - Display of current time period based on calendar view type
 * - Days until exam countdown indicator
 * - Add Event button to create new calendar events
 * - Calendar view type dropdown (Day/Week/Month/Year)
 * - Day of week headers for Week and Month views
 *
 * @example
 * <CalendarHeader
 *   calendarViewType="month"
 *   setCalendarViewType={setCalendarViewType}
 *   currentMonth={new Date()}
 *   currentWeekStart={new Date()}
 *   currentDay={new Date()}
 *   currentYear={2024}
 *   daysUntilTest={30}
 *   navigateCalendar={(direction) => handleNavigation(direction)}
 *   goToToday={() => handleGoToToday()}
 *   setAddEventModalOpen={setAddEventModalOpen}
 *   setCustomEventForm={setCustomEventForm}
 *   calendarDropdownOpen={false}
 *   setCalendarDropdownOpen={setCalendarDropdownOpen}
 *   soundEffects={soundEffects}
 * />
 *
 * Edge Cases:
 * - When daysUntilTest is negative, shows negative days (exam has passed)
 * - When daysUntilTest is 0, shows "0 days until exam" (exam is today)
 * - Dropdown menu closes when clicking outside via invisible backdrop
 * - Navigation buttons work correctly across month/year boundaries
 * - Date formatting handles different locales via toLocaleDateString
 * - View type changes preserve current date context when switching between views
 */

import React from 'react';
import { HiChevronDown } from 'react-icons/hi2';

const CalendarHeader = ({
  calendarViewType,
  setCalendarViewType,
  currentMonth,
  currentWeekStart,
  currentDay,
  currentYear,
  daysUntilTest,
  navigateCalendar,
  goToToday,
  setAddEventModalOpen,
  setCustomEventForm,
  calendarDropdownOpen,
  setCalendarDropdownOpen,
  soundEffects
}) => {
  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.4rem 1.5rem',
        borderBottom: '1px solid #e5e7eb',
        background: '#ffffff',
        flexShrink: 0
      }}>
        {/* Left: Days until exam */}
        <div style={{
          fontSize: '0.75rem',
          color: '#9ca3af',
          fontWeight: '500'
        }}>
          {daysUntilTest} days until exam
        </div>

        {/* Center: Month/Week title with arrows */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              soundEffects.playClick();
              navigateCalendar(-1);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#6b7280',
              fontSize: '1.25rem',
              transition: 'all 0.15s ease',
              borderRadius: '6px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            ‹
          </button>
          <h2 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1a1a1a',
            margin: 0
          }}>
            {calendarViewType === 'day'
              ? currentDay.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
              : calendarViewType === 'week'
              ? `Week of ${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
              : calendarViewType === 'month'
              ? currentMonth.toLocaleDateString('en-US', { month: 'long' })
              : currentYear}
          </h2>
          <button
            onClick={() => {
              soundEffects.playClick();
              navigateCalendar(1);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#6b7280',
              fontSize: '1.25rem',
              transition: 'all 0.15s ease',
              borderRadius: '6px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            ›
          </button>
        </div>

        {/* Right: Add Event Button and Month/Week Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Add Event Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              setAddEventModalOpen(true);
            }}
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '20px',
              padding: '0.5rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: '500',
              color: '#1a1a1a',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              height: '32px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.backdropFilter = 'blur(10px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.backdropFilter = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '1rem', lineHeight: '1' }}>+</span>
            Add Event
          </button>

          {/* Month/Week Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                soundEffects.playClick();
                setCalendarDropdownOpen(!calendarDropdownOpen);
              }}
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                padding: '0.5rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#1a1a1a',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.backdropFilter = 'blur(10px)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.backdropFilter = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {calendarViewType === 'day' ? 'Day' : calendarViewType === 'week' ? 'Week' : calendarViewType === 'month' ? 'Month' : 'Year'}
              <HiChevronDown style={{
                width: '14px',
                height: '14px',
                transition: 'transform 0.2s ease',
                transform: calendarDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </button>

            {calendarDropdownOpen && (
              <>
                {/* Invisible backdrop to close dropdown */}
                <div
                  onClick={() => setCalendarDropdownOpen(false)}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999
                  }}
                />
                {/* Dropdown menu */}
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  right: 0,
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 1000,
                  minWidth: '120px',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setCalendarViewType('day');
                      setCalendarDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      background: calendarViewType === 'day' ? '#f9fafb' : 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      color: calendarViewType === 'day' ? '#08245b' : '#1a1a1a',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = calendarViewType === 'day' ? '#f9fafb' : 'transparent';
                    }}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setCalendarViewType('week');
                      setCalendarDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      background: calendarViewType === 'week' ? '#f9fafb' : 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      color: calendarViewType === 'week' ? '#08245b' : '#1a1a1a',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = calendarViewType === 'week' ? '#f9fafb' : 'transparent';
                    }}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setCalendarViewType('month');
                      setCalendarDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      background: calendarViewType === 'month' ? '#f9fafb' : 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      color: calendarViewType === 'month' ? '#08245b' : '#1a1a1a',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = calendarViewType === 'month' ? '#f9fafb' : 'transparent';
                    }}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setCalendarViewType('year');
                      setCalendarDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      background: calendarViewType === 'year' ? '#f9fafb' : 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      color: calendarViewType === 'year' ? '#08245b' : '#1a1a1a',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = calendarViewType === 'year' ? '#f9fafb' : 'transparent';
                    }}
                  >
                    Year
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Day of Week Headers - Only for Week and Month views */}
      {(calendarViewType === 'week' || calendarViewType === 'month') && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          borderBottom: '1px solid #d1d5db',
          background: '#fafafa',
          flexShrink: 0
        }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
            <div
              key={idx}
              style={{
                padding: '0.25rem',
                fontSize: '0.6rem',
                fontWeight: '700',
                color: '#6b7280',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRight: idx < 6 ? '1px solid #d1d5db' : 'none'
              }}
            >
              {day}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CalendarHeader;
