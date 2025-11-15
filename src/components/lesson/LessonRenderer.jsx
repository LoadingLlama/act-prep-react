/**
 * LessonRenderer Component
 *
 * Main component that renders structured lesson content from JSON
 *
 * This component:
 * - Takes JSON lesson data as input
 * - Validates the structure
 * - Renders appropriate components for each content block
 * - Logs detailed information for debugging
 *
 * Props:
 * - data (object): Lesson content in JSON format
 *   {
 *     version: "1.0.0",
 *     lessonId: "uuid",
 *     content: [ ...content blocks... ]
 *   }
 *
 * Content Block Types:
 * - paragraph: Text with optional key terms
 * - heading: H3 or H4 heading
 * - list: Bullet list (supports nesting)
 * - example: Complete example problem with solution
 * - key_takeaways: Summary section
 *
 * Example Usage:
 * const lessonData = {
 *   version: "1.0.0",
 *   lessonId: "06685249-874d-431f-9b7f-1c711d64a9cf",
 *   content: [
 *     { type: "paragraph", text: "..." },
 *     { type: "heading", level: 3, text: "..." },
 *     { type: "example", title: "...", ... }
 *   ]
 * };
 *
 * <LessonRenderer data={lessonData} />
 *
 * For Future AIs:
 * To add a new component type:
 * 1. Create the component in elements/YourComponent.jsx
 * 2. Import it at the top of this file
 * 3. Add a case in the switch statement below
 * 4. Update the schema in schemas/lessonContent.schema.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import { LessonParagraph } from './elements/LessonParagraph';
import { LessonHeading } from './elements/LessonHeading';
import { LessonList } from './elements/LessonList';
import { LessonExample } from './elements/LessonExample';
import { KeyTakeaways } from './elements/KeyTakeaways';

export const LessonRenderer = ({ data, onKeyTakeawaysRendered }) => {
  console.log('📘 LessonRenderer: Starting render');
  console.log('📘 Lesson version:', data.version);
  console.log('📘 Lesson ID:', data.lessonId);
  console.log('📘 Content blocks:', data.content.length);

  // Validate data structure
  if (!data || !data.content || !Array.isArray(data.content)) {
    console.error('❌ Invalid lesson data structure:', data);
    return (
      <div style={{ padding: '2rem', border: '2px solid red', borderRadius: '8px' }}>
        <h2 style={{ color: 'red' }}>Error: Invalid Lesson Data</h2>
        <p>The lesson data structure is invalid. Please check the console for details.</p>
      </div>
    );
  }

  console.log('✅✅✅ LessonRenderer IS RENDERING - NEW JSON FORMAT ✅✅✅');

  /**
   * Render a single content block
   *
   * This function takes a content block and returns the appropriate React component.
   * All rendering logic is centralized here.
   *
   * @param {object} block - Content block from lesson data
   * @param {number} index - Index in content array (for React keys)
   * @returns {JSX.Element} - Rendered component
   */
  const renderBlock = (block, index) => {
    const { type } = block;

    console.log(`📘 Rendering block ${index + 1}/${data.content.length}:`, type);

    switch (type) {
      // ============================================================================
      // PARAGRAPH
      // ============================================================================
      case 'paragraph':
        return (
          <LessonParagraph
            key={index}
            text={block.text}
            keyTerms={block.keyTerms}
          />
        );

      // ============================================================================
      // HEADING (H3 or H4)
      // ============================================================================
      case 'heading':
        return (
          <LessonHeading
            key={index}
            level={block.level}
            text={block.text}
          />
        );

      // ============================================================================
      // LIST (Bullet Points)
      // ============================================================================
      case 'list':
        return (
          <LessonList
            key={index}
            items={block.items}
          />
        );

      // ============================================================================
      // EXAMPLE (Problem + Multiple Choice + Solution)
      // ============================================================================
      case 'example':
        return (
          <LessonExample
            key={index}
            title={block.title}
            problem={block.problem}
            choices={block.choices}
            solution={block.solution}
          />
        );

      // ============================================================================
      // KEY TAKEAWAYS (Summary Section)
      // ============================================================================
      case 'key_takeaways':
        return (
          <KeyTakeaways
            key={index}
            items={block.items}
            onRendered={onKeyTakeawaysRendered}
          />
        );

      // ============================================================================
      // UNKNOWN TYPE
      // ============================================================================
      default:
        console.error(`❌ Unknown content type: ${type}`, block);
        return (
          <div
            key={index}
            style={{
              padding: '1rem',
              border: '2px dashed orange',
              borderRadius: '4px',
              margin: '1rem 0'
            }}
          >
            <strong>⚠️ Unknown content type:</strong> {type}
            <pre style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {JSON.stringify(block, null, 2)}
            </pre>
          </div>
        );
    }
  };

  // Render all content blocks
  console.log('📘 Rendering all content blocks...');
  const renderedContent = data.content.map(renderBlock);
  console.log('✅ LessonRenderer: Render complete');

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {renderedContent}
    </div>
  );
};

LessonRenderer.propTypes = {
  data: PropTypes.shape({
    version: PropTypes.string.isRequired,
    lessonId: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

console.log('✅ LessonRenderer component loaded');
