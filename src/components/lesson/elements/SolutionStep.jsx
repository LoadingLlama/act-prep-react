/**
 * SolutionStep Component
 *
 * Renders a single solution attempt step (correct or incorrect)
 *
 * Props:
 * - attempt (string): Description of the attempt (e.g., "Start with C (14)")
 * - work (array): Array of work lines showing the calculation
 * - result ("correct" | "incorrect"): Whether this attempt worked
 *
 * Example:
 * <SolutionStep
 *   attempt="Start with C (14)"
 *   work={[
 *     "√14 + 10 − 2√14 − 2",
 *     "= √24 − 2√12",
 *     "≈ 4.9 − 6.9",
 *     "≠ 0"
 *   ]}
 *   result="incorrect"
 * />
 *
 * Renders as:
 * Start with C (14):
 *   √14 + 10 − 2√14 − 2
 *   = √24 − 2√12
 *   ≈ 4.9 − 6.9
 *   ≠ 0
 * ❌ Doesn't work
 */

import React from 'react';
import PropTypes from 'prop-types';
import { lessonStyles } from '../styles/lessonComponents.styles';

export const SolutionStep = ({ attempt, work, result }) => {
  const classes = lessonStyles;

  console.log('🔢 Rendering SolutionStep:', {
    attempt: attempt.substring(0, 30) + '...',
    workLines: work.length,
    result
  });

  const resultIcon = result === 'correct' ? '✓ Works!' : '❌ Doesn\'t work';
  const resultClass = result === 'correct'
    ? classes.stepResultCorrect
    : classes.stepResultIncorrect;

  return (
    <div style={classes.solutionStep}>
      <div style={classes.stepAttempt}>{attempt}:</div>
      <div style={classes.stepWork}>
        {work.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className={`${classes.stepResult} ${resultClass}`}>
        {resultIcon}
      </div>
    </div>
  );
};

SolutionStep.propTypes = {
  attempt: PropTypes.string.isRequired,
  work: PropTypes.arrayOf(PropTypes.string).isRequired,
  result: PropTypes.oneOf(['correct', 'incorrect']).isRequired
};

console.log('✅ SolutionStep component loaded');
