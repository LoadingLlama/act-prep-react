/**
 * CollapsibleSolution Component
 *
 * Renders an expandable/collapsible solution section
 *
 * Props:
 * - steps (array): Array of solution step objects
 *   Each step: { attempt: string, work: array, result: string }
 * - answer (string): The final answer (e.g., "B")
 *
 * Example:
 * <CollapsibleSolution
 *   steps={[
 *     {
 *       attempt: "Start with C (14)",
 *       work: ["√14 + 10 − 2√14 − 2", "= √24 − 2√12", "≈ 4.9 − 6.9", "≠ 0"],
 *       result: "incorrect"
 *     },
 *     {
 *       attempt: "Try B (6)",
 *       work: ["√6 + 10 − 2√6 − 2", "= √16 − 2√4", "= 4 − 2(2)", "= 4 − 4", "= 0"],
 *       result: "correct"
 *     }
 *   ]}
 *   answer="B"
 * />
 *
 * Features:
 * - Collapsed by default
 * - Arrow rotates when expanded
 * - Clean border and subtle background
 * - All solution steps inside
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { lessonStyles } from '../styles/lessonComponents.styles';
import { SolutionStep } from './SolutionStep';

export const CollapsibleSolution = ({ steps, answer }) => {
  const classes = lessonStyles;
  const [isOpen, setIsOpen] = useState(false);

  console.log('📖 Rendering CollapsibleSolution:', {
    stepsCount: steps.length,
    answer,
    isOpen
  });

  const toggleSolution = () => {
    console.log(`📖 Solution ${isOpen ? 'collapsed' : 'expanded'}`);
    setIsOpen(!isOpen);
  };

  return (
    <details
      style={classes.solutionContainer}
      open={isOpen}
      onToggle={toggleSolution}
    >
      <summary style={classes.solutionSummary}>
        <span className={`${classes.solutionArrow} ${isOpen ? classes.solutionArrowOpen : ''}`}>
          ▶
        </span>
        Solution
      </summary>
      <div style={classes.solutionContent}>
        {steps.map((step, index) => (
          <SolutionStep
            key={index}
            attempt={step.attempt}
            work={step.work}
            result={step.result}
          />
        ))}
        <div style={classes.answer}>
          <strong>Answer: {answer}</strong>
        </div>
      </div>
    </details>
  );
};

CollapsibleSolution.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      attempt: PropTypes.string.isRequired,
      work: PropTypes.arrayOf(PropTypes.string).isRequired,
      result: PropTypes.oneOf(['correct', 'incorrect']).isRequired
    })
  ).isRequired,
  answer: PropTypes.string.isRequired
};

console.log('✅ CollapsibleSolution component loaded');
