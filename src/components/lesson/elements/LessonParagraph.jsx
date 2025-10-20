/**
 * LessonParagraph Component
 *
 * Renders text paragraphs with support for key terms (blue underlined words)
 *
 * Props:
 * - text (string): The paragraph text. Use {term} syntax for key terms
 * - keyTerms (array): Array of terms to highlight (optional)
 *
 * Example:
 * <LessonParagraph
 *   text="The {backsolving} strategy is powerful."
 *   keyTerms={["backsolving"]}
 * />
 *
 * Key terms will be:
 * - Blue and underlined
 * - Clickable (shows definition on hover via TermDefinition component)
 * - Automatically detected from {curly braces} in text
 */

import React from 'react';
import PropTypes from 'prop-types';
import { lessonStyles } from '../styles/lessonComponents.styles';
import TermDefinition from '../../TermDefinition';

export const LessonParagraph = ({ text, keyTerms = [] }) => {
  const classes = lessonStyles;

  console.log('📝 Rendering LessonParagraph:', {
    textLength: text.length,
    keyTermsCount: keyTerms.length,
    preview: text.substring(0, 50) + '...'
  });

  // Parse text and replace {term} with TermDefinition components
  const parseText = () => {
    // If no key terms, return plain text
    if (!keyTerms || keyTerms.length === 0) {
      return text;
    }

    const parts = [];
    let remaining = text;
    let key = 0;

    // Find all {term} patterns
    const regex = /\{([^}]+)\}/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      const term = match[1];

      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${key++}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Add the key term with TermDefinition wrapper
      parts.push(
        <TermDefinition key={`term-${key++}`} term={term}>
          <strong style={classes.keyTerm}>{term}</strong>
        </TermDefinition>
      );

      lastIndex = regex.lastIndex;
    }

    // Add remaining text after last match
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${key++}`}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  return (
    <p style={classes.paragraph}>
      {parseText()}
    </p>
  );
};

LessonParagraph.propTypes = {
  text: PropTypes.string.isRequired,
  keyTerms: PropTypes.arrayOf(PropTypes.string)
};

LessonParagraph.defaultProps = {
  keyTerms: []
};

console.log('✅ LessonParagraph component loaded');
