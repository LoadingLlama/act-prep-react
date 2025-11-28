/**
 * Results Page Styles
 * Extracted from ResultsPage.jsx
 */

import { createUseStyles } from 'react-jss';

export const useResultsStyles = createUseStyles({
  resultsContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem',
    margin: '0',
    minHeight: '100vh',
    background: '#fafafa',
    maxWidth: '1400px',
    '@media (max-width: 768px)': {
      padding: '1rem'
    },
    '@media (max-width: 640px)': {
      padding: '0.75rem'
    }
  },
  pageHeader: {
    padding: '0',
    marginBottom: '2rem',
    '@media (max-width: 640px)': {
      marginBottom: '1.5rem'
    }
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#000000',
    margin: '0 0 0.5rem 0',
    letterSpacing: '-0.04em',
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    },
    '@media (max-width: 640px)': {
      fontSize: '1.75rem'
    }
  },
  pageSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
    '@media (max-width: 640px)': {
      fontSize: '0.875rem'
    }
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    marginBottom: '2rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    }
  },
  statCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'all 0.2s ease',
    '@media (max-width: 640px)': {
      padding: '1rem',
      gap: '0.5rem'
    },
    '&:hover': {
      borderColor: '#08245b',
      boxShadow: '0 4px 12px rgba(8, 36, 91, 0.08)',
      transform: 'translateY(-2px)'
    }
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 640px)': {
      width: '36px',
      height: '36px'
    },
    '& svg': {
      width: '20px',
      height: '20px',
      '@media (max-width: 640px)': {
        width: '18px',
        height: '18px'
      }
    },
    '&.score': {
      background: '#eff6ff',
      color: '#08245b'
    },
    '&.progress': {
      background: '#f0fdf4',
      color: '#16a34a'
    },
    '&.tests': {
      background: '#fef2f2',
      color: '#dc2626'
    },
    '&.trend': {
      background: '#fefce8',
      color: '#ca8a04'
    }
  },
  statLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    '@media (max-width: 640px)': {
      fontSize: '0.75rem'
    }
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: '1',
    '@media (max-width: 768px)': {
      fontSize: '2rem'
    },
    '@media (max-width: 640px)': {
      fontSize: '1.75rem'
    }
  },
  statChange: {
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    '@media (max-width: 640px)': {
      fontSize: '0.75rem'
    },
    '&.positive': {
      color: '#16a34a'
    },
    '&.negative': {
      color: '#dc2626'
    },
    '&.neutral': {
      color: '#64748b'
    }
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1rem',
    marginBottom: '2rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr'
    },
    '@media (max-width: 640px)': {
      gap: '0.75rem',
      marginBottom: '1.5rem'
    }
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.5rem',
    '@media (max-width: 640px)': {
      padding: '1rem',
      borderRadius: '6px'
    }
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '@media (max-width: 640px)': {
      fontSize: '1.1rem',
      marginBottom: '1rem'
    }
  },
  scoreHistory: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media (max-width: 640px)': {
      gap: '0.75rem'
    }
  },
  scoreEntry: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: '#08245b',
      background: '#ffffff'
    },
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '0.875rem',
      gap: '0.75rem'
    }
  },
  scoreInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  scoreTestName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1a1a1a',
    '@media (max-width: 640px)': {
      fontSize: '0.875rem'
    }
  },
  scoreDate: {
    fontSize: '0.8rem',
    color: '#64748b',
    '@media (max-width: 640px)': {
      fontSize: '0.75rem'
    }
  },
  scoreValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#08245b',
    '@media (max-width: 640px)': {
      fontSize: '1.5rem'
    }
  },
  scoreBreakdown: {
    display: 'flex',
    gap: '0.5rem',
    '@media (max-width: 640px)': {
      width: '100%',
      flexWrap: 'wrap',
      gap: '0.4rem'
    }
  },
  sectionScore: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.5rem',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    minWidth: '60px',
    '@media (max-width: 640px)': {
      padding: '0.4rem',
      minWidth: '52px',
      flex: '1 1 calc(25% - 0.3rem)'
    }
  },
  sectionLabel: {
    fontSize: '0.7rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    '@media (max-width: 640px)': {
      fontSize: '0.65rem'
    }
  },
  sectionValue: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1a1a1a',
    '@media (max-width: 640px)': {
      fontSize: '0.9rem'
    }
  },
  weakAreasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    '@media (max-width: 640px)': {
      gap: '0.6rem'
    }
  },
  weakAreaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: '0.75rem',
      gap: '0.5rem'
    }
  },
  weakAreaInfo: {
    flex: 1
  },
  weakAreaTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#991b1b',
    marginBottom: '0.25rem',
    '@media (max-width: 640px)': {
      fontSize: '0.85rem'
    }
  },
  weakAreaStats: {
    fontSize: '0.75rem',
    color: '#64748b',
    '@media (max-width: 640px)': {
      fontSize: '0.7rem'
    }
  },
  weakAreaButton: {
    background: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.25rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 640px)': {
      width: '100%',
      fontSize: '0.875rem',
      padding: '0.75rem 1rem'
    },
    '&:hover': {
      background: '#b91c1c',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(220, 38, 38, 0.2)'
    },
    '&:active': {
      transform: 'scale(0.97)',
      boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)'
    }
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#64748b',
    '@media (max-width: 640px)': {
      padding: '2rem 0.75rem'
    }
  },
  emptyStateIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    opacity: 0.5,
    '@media (max-width: 640px)': {
      fontSize: '2.5rem'
    }
  },
  emptyStateTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
    '@media (max-width: 640px)': {
      fontSize: '1.1rem'
    }
  },
  emptyStateText: {
    fontSize: '0.95rem',
    marginBottom: '1.5rem',
    '@media (max-width: 640px)': {
      fontSize: '0.875rem',
      marginBottom: '1.25rem'
    }
  },
  ctaButton: {
    background: '#08245b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.875rem 1.75rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '48px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 640px)': {
      fontSize: '0.875rem',
      padding: '0.875rem 1.5rem',
      minHeight: '44px'
    },
    '&:hover': {
      background: '#0a2f73',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(8, 36, 91, 0.2)'
    },
    '&:active': {
      transform: 'scale(0.98)',
      boxShadow: '0 2px 6px rgba(8, 36, 91, 0.2)'
    }
  }
});
