import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Header from './components/Header';

const useStyles = createUseStyles({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      lineHeight: 1.6,
      overflowX: 'hidden'
    }
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#fafbfc'
  },
  main: {
    flex: 1,
    padding: '3rem 2rem',
    textAlign: 'center'
  },
  hero: {
    marginBottom: '3rem'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '1rem',
    lineHeight: 1.2
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#6b7280',
    marginBottom: '2rem',
    maxWidth: '600px',
    margin: '0 auto 2rem'
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  button: {
    background: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '2rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      borderColor: '#1a1a1a',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }
  },
  buttonTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#1a1a1a'
  },
  buttonDescription: {
    color: '#6b7280',
    fontSize: '1rem'
  }
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header title="ACT Prep Course" />

      <main className={classes.main}>
        <div className={classes.hero}>
          <h1 className={classes.title}>ACT Prep Course</h1>
          <p className={classes.subtitle}>
            Comprehensive preparation for the ACT exam with diagnostic tests,
            practice questions, and detailed analytics.
          </p>
        </div>

        <div className={classes.buttonGrid}>
          <a href="/diagnostic-test.html" className={classes.button}>
            <h2 className={classes.buttonTitle}>📝 Diagnostic Test</h2>
            <p className={classes.buttonDescription}>
              Take a full-length diagnostic test to identify your strengths and areas for improvement
            </p>
          </a>

          <div className={classes.button} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
            <h2 className={classes.buttonTitle}>📚 Practice Tests</h2>
            <p className={classes.buttonDescription}>
              Additional practice tests and section-specific drills (Coming Soon)
            </p>
          </div>

          <div className={classes.button} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
            <h2 className={classes.buttonTitle}>📊 Analytics</h2>
            <p className={classes.buttonDescription}>
              Detailed performance analytics and personalized study recommendations (Coming Soon)
            </p>
          </div>

          <div className={classes.button} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
            <h2 className={classes.buttonTitle}>🎯 Study Plans</h2>
            <p className={classes.buttonDescription}>
              Customized study schedules based on your goals and timeline (Coming Soon)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;