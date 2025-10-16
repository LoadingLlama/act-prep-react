import { supabaseUrl, supabaseServiceKey } from './config.mjs';
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// supabaseUrl imported from config.mjs
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to count h3 tags
function countH3Tags(content) {
  const matches = content.match(/<h3/g);
  return matches ? matches.length : 0;
}

// Extract lesson title
function extractLessonTitle(title) {
  return title.replace(/^Chapter \d+:\s*/i, '').trim();
}

// Comprehensive reformatting function
function reformatLesson(lesson) {
  const { title, content } = lesson;
  const lessonTitle = extractLessonTitle(title);

  let html = content;

  // Step 1: Extract and preserve images
  const images = [];
  html = html.replace(/<div class="diagram-box"[^>]*>([\s\S]*?)<\/div>/g, (match) => {
    images.push(match);
    return '<<<IMAGE_PLACEHOLDER>>>';
  });

  // Step 2: Remove all wrapper divs temporarily
  html = html.replace(/<div class="lesson-content">/g, '');
  html = html.replace(/<div class="example-box"[^>]*>/g, '<<<EXAMPLE_START>>>');
  html = html.replace(/<\/div>/g, '');

  // Step 3: Remove all existing headings (h2, h3, h4)
  html = html.replace(/<h2[^>]*>.*?<\/h2>/g, '');
  html = html.replace(/<h4[^>]*>/g, '<p><strong>');
  html = html.replace(/<\/h4>/g, '</strong></p>');

  // Step 4: Parse content into sections
  const sections = [];
  let currentSection = { heading: null, content: [] };

  // Split by h3 tags but keep the text
  const parts = html.split(/<h3[^>]*>/);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const closingMatch = part.match(/(.*?)<\/h3>([\s\S]*)/);

    if (closingMatch && i > 0) {
      const headingText = closingMatch[1].trim();
      const restContent = closingMatch[2];

      // Check if this is a real heading or just a number/answer choice
      const isRealHeading = headingText.length > 3 &&
                            !headingText.match(/^[0-9]+\.?$/) &&
                            !headingText.match(/^[A-D]\.?$/) &&
                            !headingText.match(/^-?\s*\d{1,3}\s*$/) &&
                            !headingText.match(/^©/) &&
                            !headingText.includes('Lesson:');

      if (isRealHeading) {
        // Save previous section
        if (currentSection.heading || currentSection.content.length > 0) {
          sections.push({...currentSection});
        }
        // Start new section
        currentSection = { heading: headingText, content: [restContent] };
      } else {
        // Not a real heading, keep as content
        currentSection.content.push(headingText);
        currentSection.content.push(restContent);
      }
    } else {
      // First part or no h3 closing tag
      currentSection.content.push(part);
    }
  }

  // Don't forget the last section
  if (currentSection.heading || currentSection.content.length > 0) {
    sections.push(currentSection);
  }

  // Step 5: Clean up content
  function cleanContent(text) {
    return text
      .replace(/ class="[^"]*"/g, '') // Remove class attributes
      .replace(/<p[^>]*>\s*<\/p>/g, '') // Remove empty paragraphs
      .replace(/<p[^>]*>-\s*\d{3}\s*<\/p>/g, '') // Remove page numbers
      .replace(/<p[^>]*>©.*?<\/p>/g, '') // Remove copyright
      .replace(/<p[^>]*>\s*math\s*<\/p>/g, '') // Remove "math" artifacts
      .replace(/<p[^>]*>\s*[A-D]\.\s*<\/p>/g, '') // Remove lone answer choices
      .replace(/<p[^>]*>\s*\d+\.?\s*<\/p>/g, '') // Remove lone numbers
      .replace(/\n\s*\n\s*\n+/g, '\n\n') // Clean excess whitespace
      .trim();
  }

  // Step 6: Rebuild with proper structure
  let reformatted = '<div class="lesson-content">\n';

  // Add title (only ONE h2)
  reformatted += `  <h2>${lessonTitle}</h2>\n\n`;

  // Add images right after title
  if (images.length > 0) {
    for (const img of images) {
      reformatted += `${img}\n\n`;
    }
  }

  // Add sections with proper h3 headings (limit to important sections)
  for (const section of sections) {
    const contentText = cleanContent(section.content.join('\n'));

    if (!contentText) continue;

    if (section.heading) {
      // Add h3 for real section headings
      reformatted += `  <h3>${section.heading}</h3>\n\n`;
    }

    // Add content
    const paragraphs = contentText.split(/<p[^>]*>/).filter(p => p.trim());

    for (let p of paragraphs) {
      p = p.replace(/<\/p>[\s\S]*?$/, '').trim();

      if (!p || p.length < 2) continue;

      // Check if it's an example start
      if (p.includes('<<<EXAMPLE_START>>>')) {
        p = p.replace(/<<<EXAMPLE_START>>>/g, '');
        reformatted += `  <div class="example-box" style="margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-left: 4px solid #4CAF50;">\n    <p>${p}</p>\n`;
      } else if (p.includes('Solution:') || p.includes('Answer:')) {
        reformatted += `    <p><strong>${p}</strong></p>\n`;
      } else {
        reformatted += `  <p>${p}</p>\n\n`;
      }
    }
  }

  reformatted += '</div>';

  // Restore image placeholders
  reformatted = reformatted.replace(/<<<IMAGE_PLACEHOLDER>>>/g, (match) => images.shift() || '');

  return reformatted;
}

// Main execution
(async () => {
  try {
    console.log('Fetching all 35 math lessons from Supabase...\n');

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, content, subject')
      .eq('subject', 'math')
      .order('id');

    if (error) throw error;

    console.log(`✓ Found ${lessons.length} math lessons\n`);
    console.log('='.repeat(80));
    console.log('CURRENT STATE ANALYSIS');
    console.log('='.repeat(80));

    const analysis = [];
    for (const lesson of lessons) {
      const h3Count = countH3Tags(lesson.content);
      analysis.push({ title: lesson.title, h3Count });
      console.log(`${lesson.title.padEnd(60)} ${h3Count} h3 tags`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('REFORMATTING ALL LESSONS');
    console.log('='.repeat(80) + '\n');

    const reformattedLessons = [];

    for (const lesson of lessons) {
      const originalH3 = countH3Tags(lesson.content);

      try {
        const reformattedContent = reformatLesson(lesson);
        const newH3 = countH3Tags(reformattedContent);

        reformattedLessons.push({
          id: lesson.id,
          title: lesson.title,
          content: reformattedContent,
          subject: lesson.subject,
          originalH3,
          newH3
        });

        console.log(`✓ ${lesson.title}`);
        console.log(`  ${originalH3} → ${newH3} h3 tags`);
      } catch (err) {
        console.error(`✗ ERROR reformatting ${lesson.title}:`, err.message);
      }
    }

    // Save to file for review
    fs.writeFileSync(
      '/Users/cadenchiang/Desktop/act-prep-react/reformatted-lessons-final.json',
      JSON.stringify(reformattedLessons, null, 2)
    );

    console.log('\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total lessons reformatted: ${reformattedLessons.length}`);
    console.log(`\nResults saved to: reformatted-lessons-final.json`);
    console.log('\nTo update Supabase, run: node update-supabase.js');

  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
})();
