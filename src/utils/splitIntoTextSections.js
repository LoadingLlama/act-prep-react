/**
 * Content parsing utilities for splitting lesson content into sections
 */

import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';

const isExampleSection = (content) => {
  // Check if content contains h4 with "Example" and has Problem/Solution structure
  return content.includes('<h4') &&
         /Example \d+/i.test(content) &&
         /Problem:/i.test(content) &&
         /Solution:/i.test(content);
};

const extractExamples = (content) => {
  // Split by h4 headers that contain "Example"
  const exampleParts = content.split(/(?=<h4[^>]*>Example)/i);
  const examples = [];

  for (const part of exampleParts) {
    if (part.trim() && /Example \d+/i.test(part)) {
      examples.push({
        type: 'example',
        content: part.trim()
      });
    }
  }

  return examples;
};

export const splitIntoTextSections = (content) => {
  try {
    if (!content || !content.trim()) {
      logger.debug('ContentParser', 'splitIntoTextSections', {
        result: 'empty content',
      });
      return [];
    }

    // Remove h2 tags from content since they're displayed separately
    let cleanContent = content.trim();
    cleanContent = cleanContent.replace(/<h2[^>]*>.*?<\/h2>/gi, '');

    const sections = [];

    // Strategy: Create readable chunks by splitting on logical boundaries
    if (cleanContent.includes('<h3')) {
      // Split by H3 headers first
      const h3Parts = cleanContent.split(/(?=<h3[^>]*>)/);

      for (let part of h3Parts) {
        part = part.trim();
        if (!part || part.length < 50) continue;

        // Check if this section contains examples
        if (isExampleSection(part)) {
          // Extract examples as separate interactive sections
          const examples = extractExamples(part);

          // Get the intro text before first example
          const firstExampleIndex = part.search(/<h4[^>]*>Example/i);
          if (firstExampleIndex > 0) {
            const introText = part.substring(0, firstExampleIndex).trim();
            if (introText.length > 50) {
              sections.push({
                type: 'text',
                content: introText
              });
            }
          }

          sections.push(...examples);
        } else {
          // Check if this H3 section is very long and needs further splitting
          const wordCount = (part.match(/\b\w+\b/g) || []).length;

          if (wordCount > 200) {
            // Long section - split by major elements
            const subSections = splitByElements(part);
            sections.push(...subSections);
          } else {
            // Normal sized H3 section - keep as one
            sections.push({
              type: 'text',
              content: part,
            });
          }
        }
      }
    } else {
      // No H3 headers - split by other elements
      const subSections = splitByElements(cleanContent);
      sections.push(...subSections);
    }

    const result =
      sections.length > 0
        ? sections
        : [
            {
              type: 'text',
              content: cleanContent,
            },
          ];

    logger.debug('ContentParser', 'splitIntoTextSections', {
      contentLength: cleanContent.length,
      sectionsCount: result.length,
    });

    return result;
  } catch (error) {
    errorTracker.trackError(
      'ContentParser',
      'splitIntoTextSections',
      { contentLength: content?.length },
      error
    );
    return [];
  }
};

const splitByElements = (content) => {
  const sections = [];

  try {
    // Split by concept boxes and major divs
    if (
      content.includes('<div class="concept-box') ||
      content.includes('<div class="section')
    ) {
      const parts = content.split(
        /(<div class="(?:concept-box|section)[^"]*"[^>]*>[\s\S]*?<\/div>)/
      );
      let currentSection = '';

      for (let part of parts) {
        part = part.trim();
        if (!part) continue;

        if (
          part.startsWith('<div class="concept-box') ||
          part.startsWith('<div class="section')
        ) {
          // Concept box or section div - save any accumulated content first
          if (currentSection.trim() && currentSection.trim().length > 50) {
            sections.push({
              type: 'text',
              content: currentSection.trim(),
            });
          }

          // Add concept box as its own section
          sections.push({
            type: 'text',
            content: part,
          });

          currentSection = '';
        } else {
          // Regular content - accumulate
          currentSection += part;

          // If getting long, create a section
          const wordCount = (currentSection.match(/\b\w+\b/g) || []).length;
          if (wordCount > 150) {
            sections.push({
              type: 'text',
              content: currentSection.trim(),
            });
            currentSection = '';
          }
        }
      }

      // Add any remaining content
      if (currentSection.trim() && currentSection.trim().length > 50) {
        sections.push({
          type: 'text',
          content: currentSection.trim(),
        });
      }
    } else {
      // No special divs - split by paragraphs if content is long
      const wordCount = (content.match(/\b\w+\b/g) || []).length;

      if (wordCount > 150) {
        const paragraphs = content.split(/(<\/p>\s*)/);
        let currentSection = '';
        let sectionWords = 0;

        for (let i = 0; i < paragraphs.length; i++) {
          const para = paragraphs[i];
          const paraWords = (para.match(/\b\w+\b/g) || []).length;

          currentSection += para;
          sectionWords += paraWords;

          // Create section when we have enough content
          if (sectionWords >= 100 && para.includes('</p>')) {
            if (currentSection.trim()) {
              sections.push({
                type: 'text',
                content: currentSection.trim(),
              });
            }
            currentSection = '';
            sectionWords = 0;
          }
        }

        // Add remaining content
        if (currentSection.trim()) {
          sections.push({
            type: 'text',
            content: currentSection.trim(),
          });
        }
      } else {
        // Short content - keep as one section
        sections.push({
          type: 'text',
          content: content,
        });
      }
    }

    const filteredSections = sections.filter(
      (section) => section.content && section.content.trim().length > 30
    );

    return filteredSections;
  } catch (error) {
    errorTracker.trackError(
      'ContentParser',
      'splitByElements',
      { contentLength: content?.length },
      error
    );
    return [{ type: 'text', content }];
  }
};
