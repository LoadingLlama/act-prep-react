/**
 * Comprehensive Lesson Revamp Script
 * Revamps all lessons to match the gold standard format of geometry-angles (Topic 2.1)
 *
 * Gold Standard Features:
 * - Blue bold underlines for key terms
 * - Multiple levels of nested bullet points
 * - Red-bordered examples with solutions
 * - Comprehensive, detailed content
 * - Key takeaways section (green themed)
 * - Inline styles (no CSS classes)
 * - ACT-style multiple choice questions with detailed solutions
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Formatting constants from gold standard
const STYLES = {
  blueUnderline: 'color: #2563eb; font-weight: 600; text-decoration: underline;',
  paragraph: 'font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;',
  h3: 'margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;',
  h4Section: 'margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;',
  exampleHeader: 'margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;',
  ul: 'margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;',
  li: 'margin: 0.15rem 0;',
  nested_ul: 'margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;',
  keyTakeawaysH3: 'color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;',
  keyTakeawayLi: 'margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;',
  checkmark: 'color: #4caf50; font-weight: bold; margin-right: 0.5rem;',
  choiceText: 'font-family: \'Times New Roman\', Times, Georgia, serif;',
};

/**
 * Create a blue underlined term
 */
function blueUnderline(text) {
  return `<strong style="${STYLES.blueUnderline}">${text}</strong>`;
}

/**
 * Create an example section header
 */
function exampleHeader(number) {
  return `<h4 style="${STYLES.exampleHeader}">Example ${number}</h4>`;
}

/**
 * Create a comprehensive lesson structure
 */
function createLessonHTML(lessonData) {
  const { sections, examples, keyTakeaways } = lessonData;

  let html = '';

  // Introduction
  if (lessonData.introduction) {
    html += `<p style="${STYLES.paragraph}">${lessonData.introduction}</p>\n\n`;
  }

  // Main sections
  sections.forEach((section, idx) => {
    html += `<h3 style="${STYLES.h3}">${section.title}</h3>\n\n`;
    html += `<p style="${STYLES.paragraph}">${section.intro}</p>\n\n`;

    // Subsections
    if (section.subsections) {
      section.subsections.forEach(subsection => {
        html += `<h4 style="${STYLES.h4Section}">${blueUnderline(subsection.title)}</h4>\n\n`;
        html += `<ul style="${STYLES.ul}">\n`;
        html += `  <li style="${STYLES.li}">${subsection.description}\n`;

        if (subsection.points) {
          html += `    <ul style="${STYLES.nested_ul}">\n`;
          subsection.points.forEach(point => {
            html += `      <li>${point}</li>\n`;
          });
          html += `    </ul>\n`;
        }

        html += `  </li>\n`;
        html += `</ul>\n\n`;
      });
    }

    // Add examples after relevant sections
    if (section.exampleIndex !== undefined && examples[section.exampleIndex]) {
      const example = examples[section.exampleIndex];
      html += exampleHeader(section.exampleIndex + 1) + '\n\n';
      html += `<p style="${STYLES.paragraph}">${example.question}</p>\n\n`;

      if (example.choices) {
        html += `<p style="margin: 0.3rem 0 0.5rem 0;">\n`;
        example.choices.forEach((choice, i) => {
          html += `<span style="${STYLES.choiceText}">${String.fromCharCode(65 + i)}. ${choice}</span><br>\n`;
        });
        html += `</p>\n\n`;
      }

      html += `<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>\n\n`;
      html += `<ul style="${STYLES.ul}">\n`;
      example.solution.forEach(step => {
        html += `  <li style="${STYLES.li}">${step}</li>\n`;
      });
      html += `</ul>\n\n`;
      html += `<p style="${STYLES.paragraph}">\nAnswer: ${example.answer}\n</p>\n\n`;
    }
  });

  // Key Takeaways section
  if (keyTakeaways && keyTakeaways.length > 0) {
    html += `<p style="height: 1px; margin: 0; padding: 0;"></p>\n\n`;
    html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>\n\n`;
    html += `<h3 style="${STYLES.keyTakeawaysH3}">Key Takeaways</h3>\n\n`;
    html += `<ul style="list-style: none; padding: 0; margin: 0;">\n`;
    keyTakeaways.forEach(takeaway => {
      html += `  <li style="${STYLES.keyTakeawayLi}">\n`;
      html += `    <span style="${STYLES.checkmark}">✓</span>${takeaway}\n`;
      html += `  </li>\n`;
    });
    html += `</ul>`;
  }

  return html;
}

/**
 * Log changes to console and file
 */
const logChanges = [];

function log(level, lessonKey, message, metadata = {}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    lessonKey,
    message,
    ...metadata
  };

  logChanges.push(logEntry);
  console.log(`[${timestamp}] [${level}] [${lessonKey}] ${message}`, metadata);
}

/**
 * Update a lesson in Supabase
 */
async function updateLesson(lessonKey, newContent) {
  try {
    log('INFO', lessonKey, 'Updating lesson in Supabase', { contentLength: newContent.length });

    const { data, error } = await supabase
      .from('lessons')
      .update({
        content: newContent,
        updated_at: new Date().toISOString()
      })
      .eq('lesson_key', lessonKey)
      .select();

    if (error) {
      log('ERROR', lessonKey, 'Failed to update lesson', { error: error.message });
      throw error;
    }

    log('SUCCESS', lessonKey, 'Lesson updated successfully', { updatedRecords: data?.length });
    return data;
  } catch (error) {
    log('ERROR', lessonKey, 'Exception during update', { error: error.message, stack: error.stack });
    throw error;
  }
}

/**
 * Fetch a lesson from Supabase
 */
async function fetchLesson(lessonKey) {
  try {
    log('INFO', lessonKey, 'Fetching lesson from Supabase');

    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('lesson_key', lessonKey)
      .single();

    if (error) {
      log('ERROR', lessonKey, 'Failed to fetch lesson', { error: error.message });
      throw error;
    }

    log('SUCCESS', lessonKey, 'Lesson fetched successfully', {
      title: data.title,
      subject: data.subject,
      currentLength: data.content?.length || 0
    });

    return data;
  } catch (error) {
    log('ERROR', lessonKey, 'Exception during fetch', { error: error.message });
    throw error;
  }
}

/**
 * Process all lessons for a subject
 */
async function processSubject(subject) {
  try {
    log('INFO', 'SYSTEM', `Starting to process ${subject} lessons`);

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('lesson_key, title, subject')
      .eq('subject', subject)
      .order('order_index', { ascending: true });

    if (error) {
      log('ERROR', 'SYSTEM', `Failed to fetch ${subject} lessons`, { error: error.message });
      throw error;
    }

    log('INFO', 'SYSTEM', `Found ${lessons.length} ${subject} lessons to process`);

    return lessons;
  } catch (error) {
    log('ERROR', 'SYSTEM', `Exception processing ${subject}`, { error: error.message });
    throw error;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(80));
  console.log('COMPREHENSIVE LESSON REVAMP SCRIPT');
  console.log('Gold Standard: geometry-angles (Topic 2.1 - Understanding Angles & Lines)');
  console.log('='.repeat(80));
  console.log();

  const subjects = ['math', 'english', 'reading', 'science'];

  for (const subject of subjects) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Processing Subject: ${subject.toUpperCase()}`);
    console.log('='.repeat(80));

    try {
      const lessons = await processSubject(subject);
      console.log(`Total lessons to revamp: ${lessons.length}\n`);

      // This will be implemented lesson-by-lesson manually
      console.log(`Lessons in ${subject}:`);
      lessons.forEach((lesson, idx) => {
        console.log(`  ${idx + 1}. ${lesson.lesson_key}: ${lesson.title}`);
      });

    } catch (error) {
      console.error(`Failed to process ${subject}:`, error);
    }
  }

  // Write log file
  const fs = require('fs');
  fs.writeFileSync(
    './lesson-revamp-log.json',
    JSON.stringify(logChanges, null, 2)
  );

  console.log(`\n${'='.repeat(80)}`);
  console.log('Script completed. Log saved to lesson-revamp-log.json');
  console.log('='.repeat(80));
}

// Export for use in other scripts
module.exports = {
  STYLES,
  blueUnderline,
  exampleHeader,
  createLessonHTML,
  updateLesson,
  fetchLesson,
  log,
};

// Run if executed directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}
