import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  calendarContainer: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '0.75rem'
  },
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.65rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #f3f4f6'
  },
  monthYear: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  navButtons: {
    display: 'flex',
    gap: '0.35rem'
  },
  navButton: {
    background: 'transparent',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    color: '#64748b',
    fontSize: '0.75rem',
    '&:hover': {
      background: '#f8fafc',
      borderColor: '#cbd5e1'
    }
  },
  weekDays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.25rem',
    marginBottom: '0.5rem'
  },
  weekDay: {
    fontSize: '0.65rem',
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
    padding: '0.25rem 0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.2rem'
  },
  dayCell: {
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    position: 'relative',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#1a1a1a',
    '&:hover': {
      background: '#f8fafc'
    },
    '&.otherMonth': {
      color: '#cbd5e1'
    },
    '&.past': {
      color: '#cbd5e1',
      opacity: 0.5,
      '&:hover': {
        opacity: 0.7
      }
    },
    '&.today': {
      background: '#08245b',
      color: '#ffffff',
      fontWeight: '600',
      '&:hover': {
        background: '#0a2f73'
      }
    },
    '&.hasAssignment': {
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '3px',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: '#dc2626'
      },
      '&.today::after': {
        background: '#ffffff'
      }
    }
  },
  assignmentsList: {
    marginTop: '0.75rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid #f3f4f6'
  },
  assignmentsTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.5rem'
  },
  assignmentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.5rem',
    borderRadius: '5px',
    marginBottom: '0.3rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    '&:hover': {
      background: '#f8fafc'
    }
  },
  assignmentDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    flexShrink: 0,
    '&.lesson': {
      background: '#08245b'
    },
    '&.test': {
      background: '#dc2626'
    },
    '&.practice': {
      background: '#16a34a'
    }
  },
  assignmentText: {
    fontSize: '0.7rem',
    color: '#1a1a1a',
    flex: 1
  },
  noAssignments: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    fontStyle: 'italic',
    padding: '0.4rem',
    textAlign: 'center'
  }
});

const Calendar = ({ onNavigate }) => {
  const classes = useStyles();
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
