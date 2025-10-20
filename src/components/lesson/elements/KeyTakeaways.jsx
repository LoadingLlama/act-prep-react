/**
 * KeyTakeaways Component
 *
 * Renders the "Key Takeaways" summary section at the end of lessons
 * with green checkmarks and green text
 *
 * Props:
 * - items (array): Array of takeaway strings
 *
 * Example:
 * <KeyTakeaways items={[
 *   "Backsolving means using answer choices to solve instead of traditional algebra",
 *   "Always start with choice B or C since answers are ordered by value",
 *   "Use backsolving when answer choices are concrete numbers and algebra looks messy"
 * ]} />
 *
 * Renders as:
 * Key Takeaways (green heading)
 * ✓ Backsolving means... (green text with checkmark)
 * ✓ Always start with... (green text with checkmark)
 * etc.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { lessonStyles } from '../styles/lessonComponents.styles';

export const KeyTakeaways = ({ items }) => {
  const classes = lessonStyles;

  console.log('✅ Rendering KeyTakeaways:', {
    itemsCount: items.length
  });

  return (
    <div style={classes.keyTakeaways}>
      <h3 style={classes.keyTakeawaysHeading}>Key Takeaways</h3>
      <ul style={classes.takeawaysList}>
        {items.map((item, index) => (
          <li key={index} style={classes.takeawayItem}>
            <span style={classes.takeawayCheckmark}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

KeyTakeaways.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};

console.log('✅ KeyTakeaways component loaded');
