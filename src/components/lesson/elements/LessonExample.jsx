/**
 * LessonExample Component
 *
 * Renders a complete example problem with:
 * - Title
 * - Problem statement
 * - Multiple choice answers (A-E)
 * - Collapsible solution
 *
 * Props:
 * - title (string): Example title (e.g., "Example 1: Basic Backsolving")
 * - problem (string): The problem statement/question
 * - choices (array): Answer choices A-E
 * - solution (object): Solution steps and final answer
 *
 * Example:
 * <LessonExample
 *   title="Example 1: Basic Backsolving"
 *   problem="If √x + 10 − 2√x − 2 = 0, what is the value of x?"
 *   choices={[
 *     { letter: "A", value: "2" },
 *     { letter: "B", value: "6" },
 *     { letter: "C", value: "14" },
 *     { letter: "D", value: "18" },
 *     { letter: "E", value: "22" }
 *   ]}
 *   solution={{
 *     steps: [
 *       {
 *         attempt: "Start with C (14)",
 *         work: ["√14 + 10 − 2√14 − 2", "= √24 − 2√12", "≈ 4.9 − 6.9", "≠ 0"],
 *         result: "incorrect"
 *       },
 *       {
 *         attempt: "Try B (6)",
 *         work: ["√6 + 10 − 2√6 − 2", "= √16 − 2√4", "= 4 − 2(2)", "= 4 − 4", "= 0"],
 *         result: "correct"
 *       }
 *     ],
 *     answer: "B"
 *   }}
 * />
 */

import React from 'react';
import PropTypes from 'prop-types';
import { lessonStyles } from '../styles/lessonComponents.styles';
import { MultipleChoice } from './MultipleChoice';
import { CollapsibleSolution } from './CollapsibleSolution';

export const LessonExample = ({ title, problem, choices, solution }) => {
  const classes = lessonStyles;

  console.log('🎯 Rendering LessonExample:', {
    title,
    choicesCount: choices.length,
    solutionSteps: solution.steps.length,
    answer: solution.answer
  });

  return (
    <div style={classes.example}>
      <h4 style={classes.exampleTitle}>{title}</h4>

      <p style={classes.problemText}>{problem}</p>

      <MultipleChoice choices={choices} />

      <CollapsibleSolution
        steps={solution.steps}
        answer={solution.answer}
      />
    </div>
  );
};

LessonExample.propTypes = {
  title: PropTypes.string.isRequired,
  problem: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  solution: PropTypes.shape({
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        attempt: PropTypes.string.isRequired,
        work: PropTypes.arrayOf(PropTypes.string).isRequired,
        result: PropTypes.oneOf(['correct', 'incorrect']).isRequired
      })
    ).isRequired,
    answer: PropTypes.string.isRequired
  }).isRequired
};

console.log('✅ LessonExample component loaded');
