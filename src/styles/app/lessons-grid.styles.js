/**
 * Lessons Grid & Layout Styles
 * Styles for lessons grid, units, filters, and view toggles
 */

export const lessonsGridStyles = {
  sectionFilters: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  filterButtons: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  sectionFilter: {
    background: 'transparent',
    border: '1px solid #e5e7eb',
    color: '#6b7280',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
      color: '#000000'
    },
    '&.active': {
      background: '#000000',
      color: 'white',
      borderColor: '#000000',
      fontWeight: 600
    }
  },
  viewToggle: {
    display: 'flex',
    gap: '0.25rem',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '0.25rem'
  },
  viewToggleButton: {
    background: 'transparent',
    border: 'none',
    padding: '0.4rem 0.6rem',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      color: '#000000',
      background: '#e5e7eb'
    },
    '&.active': {
      background: '#ffffff',
      color: '#000000',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }
  },
  lessonsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    marginTop: '0',
    maxWidth: '1400px'
  },
  unitCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    transition: 'all 0.2s ease',
    marginTop: '0.75rem',
    '&:first-of-type': {
      marginTop: '0.75rem'
    }
  },
  unitHeader: {
    marginBottom: '0.75rem'
  },
  unitLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem'
  },
  unitTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#000000',
    marginBottom: '0.75rem',
    letterSpacing: '-0.01em'
  },
  unitProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '0.75rem'
  },
  unitProgressText: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  unitProgressBar: {
    flex: 1,
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  unitProgressFill: {
    height: '100%',
    background: '#3b82f6',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  lessonsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem'
  },
  lessonsListView: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  lessonItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    background: '#ffffff',
    minHeight: '130px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      borderColor: '#3b82f6',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
      transform: 'translateY(-2px)',
      background: '#fafbff',
      '& $lessonInfo h4': {
        color: '#000000'
      }
    },
    '&.completed': {
      borderLeft: '3px solid #10b981',
      '& h4': {
        color: '#000000',
        textDecoration: 'line-through'
      }
    },
    '&.in-progress': {
      borderLeft: '3px solid #fbbf24',
      '&:hover': {
        background: '#fafbff'
      }
    },
    '&.hidden': {
      display: 'none'
    }
  },
  lessonItemListView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    background: '#ffffff',
    minHeight: 'auto',
    cursor: 'pointer',
    position: 'relative',
    gap: '1rem',
    '&:hover': {
      borderColor: '#3b82f6',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)',
      background: '#fafbff'
    },
    '&.completed': {
      borderLeft: '3px solid #10b981',
      '& h4': {
        textDecoration: 'line-through'
      }
    },
    '&.in-progress': {
      borderLeft: '3px solid #fbbf24'
    }
  },
};
