import React, { useState } from 'react';
import { useCalendarStyles } from './Calendar.styles';

const Calendar = ({ onNavigate }) => {
  const classes = useCalendarStyles();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock assignments data - in real app, this would come from props or API
  const assignments = {
    [new Date().toDateString()]: [
      { id: 1, type: 'lesson', title: 'Grammar Fundamentals', lessonId: 'english-1-1' },
      { id: 2, type: 'practice', title: 'Practice 10 questions', lessonId: 'english-1-1' }
    ],
    [new Date(Date.now() + 86400000).toDateString()]: [
      { id: 3, type: 'test', title: 'Complete Practice Test 1', testId: 1 }
    ]
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i)
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i)
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const hasAssignment = (date) => {
    return !!assignments[date.toDateString()];
  };

  const getSelectedDateAssignments = () => {
    return assignments[selectedDate.toDateString()] || [];
  };

  const handleAssignmentClick = (assignment) => {
    if (assignment.type === 'lesson' && assignment.lessonId) {
      onNavigate && onNavigate('lessons', assignment.lessonId);
    } else if (assignment.type === 'test' && assignment.testId) {
      onNavigate && onNavigate('tests', assignment.testId);
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className={classes.calendarContainer}>
      <div className={classes.calendarHeader}>
        <div className={classes.monthYear}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <div className={classes.navButtons}>
          <button className={classes.navButton} onClick={handlePrevMonth}>
            ‹
          </button>
          <button className={classes.navButton} onClick={handleNextMonth}>
            ›
          </button>
        </div>
      </div>

      <div className={classes.weekDays}>
        {weekDays.map(day => (
          <div key={day} className={classes.weekDay}>{day}</div>
        ))}
      </div>

      <div className={classes.daysGrid}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${classes.dayCell} ${
              !day.isCurrentMonth ? 'otherMonth' : ''
            } ${isToday(day.fullDate) ? 'today' : ''} ${
              isPast(day.fullDate) && !isToday(day.fullDate) ? 'past' : ''
            } ${
              hasAssignment(day.fullDate) ? 'hasAssignment' : ''
            }`}
            onClick={() => setSelectedDate(day.fullDate)}
          >
            {day.date}
          </div>
        ))}
      </div>

      <div className={classes.assignmentsList}>
        <div className={classes.assignmentsTitle}>
          {selectedDate.toDateString() === new Date().toDateString()
            ? "Today's Assignments"
            : `Assignments for ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
        </div>
        {getSelectedDateAssignments().length > 0 ? (
          getSelectedDateAssignments().map(assignment => (
            <div
              key={assignment.id}
              className={classes.assignmentItem}
              onClick={() => handleAssignmentClick(assignment)}
            >
              <div className={`${classes.assignmentDot} ${assignment.type}`} />
              <div className={classes.assignmentText}>{assignment.title}</div>
            </div>
          ))
        ) : (
          <div className={classes.noAssignments}>No assignments for this day</div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
