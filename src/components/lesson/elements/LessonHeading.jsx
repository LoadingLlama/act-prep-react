/**
 * LessonHeading Component
 *
 * Renders section headings (H3 or H4) with consistent styling
 *
 * Props:
 * - level (number): Heading level (3 or 4)
 * - text (string): Heading text
 *
 * Examples:
 * <LessonHeading level={3} text="1. What Is Backsolving?" />
 * <LessonHeading level={4} text="Step 1: Strategic Starting" />
 *
 * Styling:
 * - H3: Larger, bold, more top margin (section headers)
 * - H4: Smaller, normal weight, less margin (subsections)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { lessonStyles } from '../styles/lessonComponents.styles';

export const LessonHeading = ({ level, text }) => {
  const classes = lessonStyles;

  console.log('📚 Rendering LessonHeading:', {
    level,
    text: text.substring(0, 50) + (text.length > 50 ? '...' : '')
  });

  const HeadingTag = `h${level}`;
  const style = level === 3 ? classes.headingH3 : classes.headingH4;

  return React.createElement(
    HeadingTag,
    { style },
    text
  );
};

LessonHeading.propTypes = {
  level: PropTypes.oneOf([3, 4]).isRequired,
  text: PropTypes.string.isRequired
};

console.log('✅ LessonHeading component loaded');
