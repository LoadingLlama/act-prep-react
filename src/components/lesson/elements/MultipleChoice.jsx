/**
 * MultipleChoice Component
 *
 * Renders answer choices A-E for example problems
 *
 * Props:
 * - choices (array): Array of choice objects
 *   Each choice: { letter: string, value: string }
 *
 * Example:
 * <MultipleChoice choices={[
 *   { letter: "A", value: "2" },
 *   { letter: "B", value: "6" },
 *   { letter: "C", value: "14" },
 *   { letter: "D", value: "18" },
 *   { letter: "E", value: "22" }
 * ]} />
 *
 * Renders as:
 * A. 2
 * B. 6
 * C. 14
 * etc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { lessonStyles } from '../styles/lessonComponents.styles';

export const MultipleChoice = ({ choices }) => {
  const classes = lessonStyles;

  console.log('🔤 Rendering MultipleChoice:', {
    choicesCount: choices.length,
    letters: choices.map(c => c.letter).join(', ')
  });

  return (
    <div style={classes.multipleChoice}>
      {choices.map((choice, index) => (
        <div key={index} style={classes.choice}>
          <strong>{choice.letter}.</strong> {choice.value}
        </div>
      ))}
    </div>
  );
};

MultipleChoice.propTypes = {
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

console.log('✅ MultipleChoice component loaded');
