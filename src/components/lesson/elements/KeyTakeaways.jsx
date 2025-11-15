/**
 * KeyTakeaways Component
 *
 * Renders the "Key Takeaways" summary section at the end of lessons
 * with green checkmarks and green text
 *
 * Props:
 * - items (array): Array of takeaway strings
 * - onRendered (function): Optional callback when key takeaways are rendered
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

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { lessonStyles } from '../styles/lessonComponents.styles';

export const KeyTakeaways = ({ items, onRendered }) => {
  const classes = lessonStyles;
  const hasCalledCallback = useRef(false);

  console.log('✅ Rendering KeyTakeaways:', {
    itemsCount: items.length
  });

  // Call onRendered callback when key takeaways are displayed (only once)
  useEffect(() => {
    if (onRendered && typeof onRendered === 'function' && !hasCalledCallback.current) {
      console.log('✅ Key Takeaways loaded - marking lesson as completed');
      hasCalledCallback.current = true;
      onRendered();
    }
  }, [onRendered]);

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
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRendered: PropTypes.func
};

console.log('✅ KeyTakeaways component loaded');
