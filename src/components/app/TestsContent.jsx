/**
 * Tests Content Component
 * Displays the practice tests grid
 * Extracted from App.js to reduce file size
 */

import React from 'react';

/**
 * TestsContent - Renders the tests tab content
 * @param {Object} props - Component props
 * @param {Object} props.classes - JSS style classes
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.setDiagnosticTestOpen - Function to open diagnostic test
 * @param {Function} props.setPracticeTestOpen - Function to open practice test with test number
 * @returns {JSX.Element} Tests content component
 */
const TestsContent = ({ classes, activeTab, setDiagnosticTestOpen, setPracticeTestOpen }) => (
  <div className={`${classes.tabContent} ${activeTab === 'tests' ? 'active' : ''}`}>
    <div className={classes.contentSection}>
      <h2 className={classes.sectionTitle}>Practice Tests</h2>
      <div className={classes.testGrid}>
        <div className={classes.card} onClick={() => setDiagnosticTestOpen(true)}>
          <h3>Diagnostic Test</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Identify your strengths and weaknesses
          </p>
        </div>
        <div className={classes.card} onClick={() => setPracticeTestOpen(1)}>
          <h3>Full Practice Test 1</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            215 questions • 175 minutes
          </p>
        </div>
        <div className={classes.card} onClick={() => setPracticeTestOpen(2)}>
          <h3>Full Practice Test 2</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            215 questions • 175 minutes
          </p>
        </div>
        <div className={classes.card} onClick={() => setPracticeTestOpen(3)}>
          <h3>Full Practice Test 3</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            215 questions • 175 minutes
          </p>
        </div>
        <div className={classes.card} onClick={() => setPracticeTestOpen(4)}>
          <h3>Full Practice Test 4</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            215 questions • 175 minutes
          </p>
        </div>
        <div className={classes.card} onClick={() => setPracticeTestOpen(5)}>
          <h3>Full Practice Test 5</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            215 questions • 175 minutes
          </p>
        </div>
        <div className={classes.card} onClick={() => setPracticeTestOpen(6)}>
          <h3>Full Practice Test 6</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            215 questions • 175 minutes
          </p>
        </div>
        <div className={classes.card} onClick={() => setPracticeTestOpen(7)}>
          <h3>Full Practice Test 7</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            215 questions • 175 minutes
          </p>
        </div>
        <div className={classes.card} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
          <h3>English Practice</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Coming soon
          </p>
        </div>
        <div className={classes.card} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
          <h3>Math Practice</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Coming soon
          </p>
        </div>
        <div className={classes.card} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
          <h3>Reading Practice</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Coming soon
          </p>
        </div>
        <div className={classes.card} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
          <h3>Science Practice</h3>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Coming soon
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default TestsContent;
