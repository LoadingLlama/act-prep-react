/**
 * Quiz Component Styles
 * Styles for all quiz-related components
 */

export const quizStyles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },

  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '1.1rem'
  },

  error: {
    textAlign: 'center',
    padding: '2rem',
    color: '#ff3b30',
    fontSize: '1rem'
  },

  retryButton: {
    marginTop: '1rem',
    padding: '0.8rem 2rem',
    background: '#007aff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },

  header: {
    marginBottom: '2rem'
  },

  title: {
    fontSize: '1.8rem',
    fontWeight: 600,
    color: '#f5f5f7',
    marginBottom: '0.5rem'
  },

  intro: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.5
  },

  progress: {
    marginBottom: '2rem'
  },

  progressText: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '0.5rem'
  },

  progressBar: {
    height: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden'
  },

  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #007aff 0%, #0056cc 100%)',
    transition: 'width 0.3s ease'
  },

  footer: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  nextButton: {
    padding: '0.8rem 2rem',
    background: 'linear-gradient(135deg, #007aff 0%, #0056cc 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 30px rgba(0, 122, 255, 0.3)'
    }
  }
};

export const questionStyles = {
  container: {
    marginBottom: '2rem'
  },

  questionText: {
    fontSize: '1.2rem',
    fontWeight: 500,
    color: '#f5f5f7',
    marginBottom: '1.5rem',
    lineHeight: 1.6
  },

  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },

  option: {
    padding: '1rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }
  },

  optionSelected: {
    background: 'rgba(0, 122, 255, 0.1)',
    border: '1px solid rgba(0, 122, 255, 0.3)'
  },

  optionCorrect: {
    background: 'rgba(0, 200, 81, 0.1)',
    border: '1px solid rgba(0, 200, 81, 0.3)'
  },

  optionIncorrect: {
    background: 'rgba(255, 59, 48, 0.1)',
    border: '1px solid rgba(255, 59, 48, 0.3)'
  },

  optionContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem'
  },

  optionLabel: {
    fontWeight: 600,
    color: '#007aff',
    minWidth: '28px'
  },

  optionText: {
    flex: 1,
    color: '#f5f5f7',
    lineHeight: 1.5
  },

  feedback: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },

  correctIcon: {
    color: '#00c851',
    fontSize: '1.5rem',
    fontWeight: 700
  },

  incorrectIcon: {
    color: '#ff3b30',
    fontSize: '1.5rem',
    fontWeight: 700
  },

  explanation: {
    marginTop: '1rem',
    padding: '1rem',
    background: 'rgba(0, 122, 255, 0.05)',
    border: '1px solid rgba(0, 122, 255, 0.1)',
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.95rem',
    lineHeight: 1.5
  }
};

export const resultsStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px'
  },

  card: {
    maxWidth: '500px',
    width: '100%',
    padding: '3rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    textAlign: 'center'
  },

  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#f5f5f7',
    marginBottom: '0.5rem'
  },

  quizTitle: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '2rem'
  },

  scoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  },

  scoreCircle: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    border: '4px solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.02)'
  },

  scoreText: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.3rem'
  },

  scoreNumber: {
    fontSize: '3rem',
    fontWeight: 700
  },

  scoreDivider: {
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.4)'
  },

  scoreTotal: {
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.6)'
  },

  percentage: {
    fontSize: '1.8rem',
    fontWeight: 600,
    marginTop: '0.5rem'
  },

  performanceLevel: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1rem'
  },

  message: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 1.5,
    marginBottom: '2rem'
  },

  summary: {
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem'
  },

  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    ':last-child': {
      borderBottom: 'none'
    }
  },

  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.95rem'
  },

  summaryValue: {
    color: '#f5f5f7',
    fontWeight: 600,
    fontSize: '0.95rem'
  },

  retryButton: {
    padding: '0.8rem 3rem',
    background: 'linear-gradient(135deg, #007aff 0%, #0056cc 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 30px rgba(0, 122, 255, 0.3)'
    }
  }
};