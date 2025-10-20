/**
 * LessonList Component
 *
 * Renders bullet point lists with support for nested lists
 *
 * Props:
 * - items (array): Array of list items
 *   Each item can be:
 *   - String (simple item)
 *   - Object { text: string, nested: array } (item with nested list)
 *
 * Examples:
 * // Simple list
 * <LessonList items={[
 *   "Faster than traditional algebra",
 *   "Less chance of mistakes"
 * ]} />
 *
 * // List with nesting
 * <LessonList items={[
 *   {
 *     text: "Key advantages:",
 *     nested: [
 *       "Faster than traditional algebra",
 *       "Less chance of mistakes"
 *     ]
 *   }
 * ]} />
 */

import React from 'react';
import PropTypes from 'prop-types';
import { lessonStyles } from '../styles/lessonComponents.styles';

export const LessonList = ({ items }) => {
  const classes = lessonStyles;

  console.log('📋 Rendering LessonList:', {
    itemsCount: items.length,
    hasNested: items.some(item => typeof item === 'object' && item.nested)
  });

  const renderListItem = (item, index) => {
    // Simple string item
    if (typeof item === 'string') {
      return (
        <li key={index} style={classes.listItem}>
          {item}
        </li>
      );
    }

    // Item with nested list
    return (
      <li key={index} style={classes.listItem}>
        {item.text}
        {item.nested && item.nested.length > 0 && (
          <ul style={classes.nestedList}>
            {item.nested.map((nestedItem, nestedIndex) => (
              <li key={nestedIndex} style={classes.listItem}>
                {nestedItem}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul style={classes.list}>
      {items.map(renderListItem)}
    </ul>
  );
};

LessonList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        nested: PropTypes.arrayOf(PropTypes.string)
      })
    ])
  ).isRequired
};

console.log('✅ LessonList component loaded');
