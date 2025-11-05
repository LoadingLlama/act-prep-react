import { createUseStyles } from 'react-jss';

export const useCalendarStyles = createUseStyles({
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
