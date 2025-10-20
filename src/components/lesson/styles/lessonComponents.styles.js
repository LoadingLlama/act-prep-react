/**
 * Lesson Components - Shared Styles
 *
 * All lesson components use these consistent styles.
 * Modify once, updates everywhere!
 *
 * Usage:
 * import { lessonStyles } from './styles/lessonComponents.styles';
 */

export const lessonStyles = {
  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================

  paragraph: {
    fontSize: '17px',
    lineHeight: '1.8',
    margin: '0 0 1.25rem 0',
    color: '#1f2937',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  headingH3: {
    marginTop: '4rem',
    marginBottom: '1.5rem',
    fontWeight: 700,
    fontSize: '1.75rem',
    color: '#111827',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    letterSpacing: '-0.02em',
  },

  headingH4: {
    marginTop: '2.5rem',
    marginBottom: '1rem',
    fontWeight: 600,
    fontSize: '1.25rem',
    color: '#374151',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // ============================================================================
  // KEY TERMS
  // ============================================================================

  keyTerm: {
    color: '#2563eb', // blue-600
    fontWeight: 600,
    textDecoration: 'underline',
    cursor: 'pointer',
  },

  // ============================================================================
  // LISTS
  // ============================================================================

  list: {
    margin: '0 0 1.5rem 0',
    paddingLeft: '2rem',
    lineHeight: 1.7,
    fontSize: '17px',
    listStyleType: 'disc',
  },

  listItem: {
    margin: '0.5rem 0',
    color: '#1f2937',
    display: 'list-item',
  },

  nestedList: {
    margin: '0.5rem 0',
    paddingLeft: '2rem',
    listStyleType: 'circle',
  },

  // ============================================================================
  // EXAMPLES & PROBLEMS
  // ============================================================================

  example: {
    margin: '2rem 0',
  },

  exampleTitle: {
    marginTop: '2rem',
    marginBottom: '0.3rem',
    fontWeight: 400,
  },

  problemText: {
    fontSize: '16px',
    lineHeight: 1.7,
    margin: '0.5rem 0 1rem 0',
  },

  // ============================================================================
  // MULTIPLE CHOICE
  // ============================================================================

  multipleChoice: {
    margin: '0.5rem 0 1rem 0',
    lineHeight: 1.8,
  },

  choice: {
    margin: '0.2rem 0',
    '& strong': {
      marginRight: '0.5rem',
    },
  },

  // ============================================================================
  // COLLAPSIBLE SOLUTION
  // ============================================================================

  solutionContainer: {
    margin: '1rem 0',
    border: '1px solid #e5e7eb', // gray-200
    borderRadius: '6px',
    overflow: 'hidden',
  },

  solutionSummary: {
    cursor: 'pointer',
    padding: '0.75rem 1rem',
    fontWeight: 600,
    background: '#f9fafb', // gray-50
    userSelect: 'none',
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '&::-webkit-details-marker': {
      display: 'none',
    },
    '&:hover': {
      background: '#f3f4f6', // gray-100
    },
  },

  solutionArrow: {
    transition: 'transform 0.2s',
    fontSize: '0.875rem',
  },

  solutionArrowOpen: {
    transform: 'rotate(90deg)',
  },

  solutionContent: {
    padding: '1rem',
    borderTop: '1px solid #e5e7eb', // gray-200
  },

  // ============================================================================
  // SOLUTION STEPS
  // ============================================================================

  solutionStep: {
    marginBottom: '1rem',
    '&:last-child': {
      marginBottom: 0,
    },
  },

  stepAttempt: {
    fontWeight: 600,
    marginBottom: '0.5rem',
  },

  stepWork: {
    lineHeight: 1.8,
    marginLeft: '1rem',
    '& > div': {
      margin: '0.1rem 0',
    },
  },

  stepResult: {
    marginLeft: '1rem',
    marginTop: '0.25rem',
    color: '#6b7280', // gray-500
  },

  stepResultCorrect: {
    color: '#059669', // green-600
  },

  stepResultIncorrect: {
    color: '#dc2626', // red-600
  },

  // ============================================================================
  // KEY TAKEAWAYS
  // ============================================================================

  keyTakeaways: {
    margin: '3rem 0 1.5rem 0',
  },

  keyTakeawaysHeading: {
    color: '#059669',
    fontSize: '1.5rem',
    fontWeight: 700,
    margin: '4rem 0 2rem 0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  takeawaysList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },

  takeawayItem: {
    marginBottom: '1rem',
    color: '#065f46',
    fontSize: '17px',
    lineHeight: 1.7,
    display: 'flex',
    alignItems: 'flex-start',
    padding: '0.5rem 0',
  },

  takeawayCheckmark: {
    color: '#10b981',
    fontWeight: 'bold',
    marginRight: '0.75rem',
    flexShrink: 0,
    fontSize: '1.2rem',
  },

  // ============================================================================
  // ANSWER
  // ============================================================================

  answer: {
    margin: '1rem 0 0 0',
    fontWeight: 600,
  },
};

/**
 * Color Palette Reference
 *
 * Use these colors for consistency across all components.
 * Import from here instead of hardcoding values.
 */
export const lessonColors = {
  // Primary text
  textPrimary: '#1f2937', // gray-800
  textSecondary: '#6b7280', // gray-500
  textHeading: '#111827', // gray-900

  // Key terms & links
  keyTermBlue: '#2563eb', // blue-600
  keyTermBlueHover: '#1d4ed8', // blue-700

  // Borders & backgrounds
  borderGray: '#e5e7eb', // gray-200
  backgroundGray: '#f9fafb', // gray-50
  backgroundGrayHover: '#f3f4f6', // gray-100

  // Status colors
  correct: '#059669', // green-600
  incorrect: '#dc2626', // red-600
  neutral: '#6b7280', // gray-500

  // Key takeaways
  takeawayGreen: '#2e7d32', // green-700
  takeawayCheckmark: '#4caf50', // green-500
};

/**
 * Spacing Constants
 *
 * Use these for consistent spacing throughout components.
 */
export const lessonSpacing = {
  // Margins
  marginSmall: '0.5rem',
  marginMedium: '1rem',
  marginLarge: '2rem',
  marginXLarge: '3rem',

  // Padding
  paddingSmall: '0.5rem',
  paddingMedium: '1rem',
  paddingLarge: '1.5rem',

  // Gaps
  gapSmall: '0.25rem',
  gapMedium: '0.5rem',
  gapLarge: '1rem',
};

console.log('✅ Lesson component styles loaded');
