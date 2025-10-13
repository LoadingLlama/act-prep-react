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
 * @returns {JSX.Element} Tests content component
 */
const TestsContent = ({ classes, activeTab, setDiagnosticTestOpen }) => (
  <div className={`${classes.tabContent} ${activeTab === 'tests' ? 'active' : ''}`}>
    <div className={classes.contentSection}>
      <h2 className={classes.sectionTitle}>Practice Tests</h2>
      <div className={classes.testGrid}>
        <div className={classes.card} onClick={() => setDiagnosticTestOpen(true)}>
          <h3>Diagnostic Test</h3>
        </div>
        <div className={classes.card}>
          <h3>Full Practice Test 1</h3>
        </div>
        <div className={classes.card}>
          <h3>Full Practice Test 2</h3>
        </div>
        <div className={classes.card}>
          <h3>Full Practice Test 3</h3>
        </div>
        <div className={classes.card}>
          <h3>Full Practice Test 4</h3>
        </div>
        <div className={classes.card}>
          <h3>English Practice</h3>
        </div>
        <div className={classes.card}>
          <h3>Math Practice</h3>
        </div>
        <div className={classes.card}>
          <h3>Reading Practice</h3>
        </div>
        <div className={classes.card}>
          <h3>Science Practice</h3>
        </div>
      </div>
    </div>
  </div>
);

export default TestsContent;
