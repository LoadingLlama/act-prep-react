import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  homeContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '2rem 4rem',
    maxWidth: '1400px',
    margin: '0 auto',
    lineHeight: 1.7,
    color: '#1a202c',
    fontSize: '16px'
  },
  header: {
    marginBottom: '3rem',
    '& h1': {
      fontSize: '2.5rem',
      fontWeight: '900',
      color: '#000000',
      marginBottom: '0.5rem',
      lineHeight: '1.2',
      letterSpacing: '-0.04em'
    },
    '& p': {
      fontSize: '1rem',
      color: '#6b7280',
      margin: 0,
      lineHeight: '1.6'
    }
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  },
  statCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '2rem',
    '& h3': {
      fontSize: '1.3rem',
      fontWeight: '800',
      color: '#000000',
      marginBottom: '1.5rem',
      letterSpacing: '-0.02em'
    }
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.875rem 0',
    borderBottom: '1px solid #f3f4f6',
    '&:last-child': {
      borderBottom: 'none'
    },
    '& span': {
      fontSize: '1rem',
      color: '#4b5563',
      fontWeight: '400'
    },
    '& strong': {
      fontSize: '1.125rem',
      color: '#000000',
      fontWeight: '700'
    }
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: '#f3f4f6',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '0.625rem'
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#000000',
    marginBottom: '1.5rem',
    letterSpacing: '-0.025em',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '0.75rem'
  },
  upcomingCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '2.5rem',
    textAlign: 'center',
    '& p': {
      color: '#6b7280',
      fontSize: '1rem',
      margin: 0,
      lineHeight: '1.6'
    }
  }
});

const Home = ({ lessonProgress = {}, lessonStructure = [] }) => {
  const classes = useStyles();

  // Calculate statistics
  const totalLessons = lessonStructure.length;
  const completedLessons = Object.values(lessonProgress).filter(status => status === 'completed').length;
  const inProgressLessons = Object.values(lessonProgress).filter(status => status === 'in-progress').length;
  const notStartedLessons = totalLessons - completedLessons - inProgressLessons;

  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Group lessons by section
  const sections = {
    english: lessonStructure.filter(l => l.section === 'english'),
    math: lessonStructure.filter(l => l.section === 'math'),
    reading: lessonStructure.filter(l => l.section === 'reading'),
    science: lessonStructure.filter(l => l.section === 'science')
  };

  return (
    <div className={classes.homeContainer}>
      <div className={classes.header}>
        <h1>Home</h1>
        <p>View everything in one place.</p>
      </div>

      <div className={classes.statsGrid}>
        {/* Overall Progress Card */}
        <div className={classes.statCard}>
          <h3>{totalLessons} Lessons</h3>
          <div className={classes.statRow}>
            <span>Not Started</span>
            <strong>{notStartedLessons}</strong>
          </div>
          <div className={classes.progressBar}>
            <div className={classes.progressFill} style={{ width: '0%', background: '#fbbf24' }} />
          </div>
          <div className={classes.statRow}>
            <span>In Progress</span>
            <strong>{inProgressLessons}</strong>
          </div>
          <div className={classes.progressBar}>
            <div className={classes.progressFill} style={{ width: `${(inProgressLessons / totalLessons) * 100}%`, background: '#3b82f6' }} />
          </div>
          <div className={classes.statRow}>
            <span>Completed</span>
            <strong>{completedLessons}</strong>
          </div>
          <div className={classes.progressBar}>
            <div className={classes.progressFill} style={{ width: `${progressPercentage}%`, background: '#10b981' }} />
          </div>
        </div>

        {/* Tests Card */}
        <div className={classes.statCard}>
          <h3>Practice Tests</h3>
          <div className={classes.statRow}>
            <span>Not Started</span>
            <strong>5</strong>
          </div>
          <div className={classes.progressBar}>
            <div className={classes.progressFill} style={{ width: '0%', background: '#fbbf24' }} />
          </div>
          <div className={classes.statRow}>
            <span>In Progress</span>
            <strong>0</strong>
          </div>
          <div className={classes.progressBar}>
            <div className={classes.progressFill} style={{ width: '0%', background: '#3b82f6' }} />
          </div>
          <div className={classes.statRow}>
            <span>Completed</span>
            <strong>0</strong>
          </div>
          <div className={classes.progressBar}>
            <div className={classes.progressFill} style={{ width: '0%', background: '#10b981' }} />
          </div>
        </div>
      </div>

      <h2 className={classes.sectionTitle}>Next Steps</h2>
      <div className={classes.upcomingCard}>
        <p>Start your first lesson to begin tracking your progress.</p>
      </div>
    </div>
  );
};

export default Home;
