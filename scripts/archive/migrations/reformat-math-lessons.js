import { supabaseUrl, supabaseServiceKey } from './config.mjs';
const { createClient } = require('@supabase/supabase-js');

// supabaseUrl imported from config.mjs
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to count h3 tags
function countH3Tags(content) {
  const matches = content.match(/<h3/g);
  return matches ? matches.length : 0;
}

// Helper function to extract lesson title from content
function extractLessonTitle(title, content) {
  // Try to extract from the title or first h2
  const h2Match = content.match(/<h2[^>]*>(?:Lesson:\s*)?([^<]+)<\/h2>/i);
  if (h2Match) {
    return h2Match[1].trim().replace(/^Lesson:\s*/i, '');
  }

  // Fall back to title
  return title.replace(/^Chapter \d+:\s*/i, '').trim();
}

// Comprehensive reformatting function
function reformatLesson(lesson) {
  const { title, content } = lesson;
  const lessonTitle = extractLessonTitle(title, content);

  // Parse the content to extract components
  let htmlContent = content;

  // Extract images first (preserve them)
  const images = [];
  const imageRegex = /<div class="diagram-box"[^>]*>[\s\S]*?<\/div>/g;
  htmlContent.replace(imageRegex, (match) => {
    images.push(match);
    return '';
  });

  // Remove all existing h2 and h3 tags to start fresh
  htmlContent = htmlContent.replace(/<h2[^>]*>[\s\S]*?<\/h2>/g, '');
  htmlContent = htmlContent.replace(/<h3[^>]*>[\s\S]*?<\/h3>/g, '');

  // Clean up excessive markup
  htmlContent = htmlContent.replace(/<div class="lesson-content">/g, '');
  htmlContent = htmlContent.replace(/<div class="example-box">/g, '');
  htmlContent = htmlContent.replace(/<\/div>/g, '');
  htmlContent = htmlContent.replace(/<h4>/g, '<p><strong>');
  htmlContent = htmlContent.replace(/<\/h4>/g, '</strong></p>');

  // Clean up class attributes we don't need
  htmlContent = htmlContent.replace(/ class="[^"]*"/g, '');

  // Clean up excessive whitespace and empty paragraphs
  htmlContent = htmlContent.replace(/<p[^>]*>\s*<\/p>/g, '');
  htmlContent = htmlContent.replace(/\n\s*\n\s*\n/g, '\n\n');

  // Remove page numbers and artifacts
  htmlContent = htmlContent.replace(/<p[^>]*>-\s*\d{3}\s*<\/p>/g, '');
  htmlContent = htmlContent.replace(/<p[^>]*>©.*?<\/p>/g, '');
  htmlContent = htmlContent.replace(/<p[^>]*>math<\/p>/g, '');

  // Now reconstruct with proper structure
  let reformattedContent = '<div class="lesson-content">\n';

  // Add single h2 title
  reformattedContent += `  <h2>${lessonTitle}</h2>\n\n`;

  // Add images if they exist
  if (images.length > 0) {
    reformattedContent += images.join('\n') + '\n\n';
  }

  // Add content - this will vary by lesson type
  // For now, clean up the remaining content
  const paragraphs = htmlContent.split(/<p[^>]*>/).filter(p => {
    const cleaned = p.replace(/<\/p>.*$/, '').trim();
    return cleaned.length > 0 &&
           !cleaned.match(/^-?\s*\d{1,3}\s*$/) && // Skip lone numbers
           !cleaned.match(/^[A-D]\.\s*$/) && // Skip lone answer choices
           cleaned !== 'Solution:' &&
           cleaned !== 'Answer:';
  });

  // Add paragraphs
  for (const p of paragraphs) {
    const cleaned = p.replace(/<\/p>.*$/, '').trim();
    if (cleaned) {
      reformattedContent += `  <p>${cleaned}</p>\n\n`;
    }
  }

  reformattedContent += '</div>';

  return reformattedContent;
}

// Main execution
(async () => {
  try {
    console.log('Fetching all math lessons...\n');

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, content')
      .eq('subject', 'math')
      .order('id');

    if (error) {
      console.error('Error fetching lessons:', error);
      process.exit(1);
    }

    console.log(`Found ${lessons.length} math lessons\n`);

    // Analyze current state
    console.log('=== CURRENT STATE ANALYSIS ===\n');
    for (const lesson of lessons) {
      const h3Count = countH3Tags(lesson.content);
      console.log(`${lesson.title}: ${h3Count} h3 tags`);
    }

    console.log('\n=== REFORMATTING LESSONS ===\n');

    // Store results for verification
    const results = [];

    for (const lesson of lessons) {
      console.log(`Processing: ${lesson.title}...`);

      const originalH3Count = countH3Tags(lesson.content);
      const reformattedContent = reformatLesson(lesson);
      const newH3Count = countH3Tags(reformattedContent);

      results.push({
        id: lesson.id,
        title: lesson.title,
        originalH3: originalH3Count,
        newH3: newH3Count,
        reformattedContent
      });

      console.log(`  Before: ${originalH3Count} h3 tags -> After: ${newH3Count} h3 tags`);
    }

    console.log('\n=== SUMMARY ===\n');
    console.log('Title | Original h3 | New h3');
    console.log('-'.repeat(80));
    for (const result of results) {
      console.log(`${result.title} | ${result.originalH3} | ${result.newH3}`);
    }

    // Save results to file for review
    const fs = require('fs');
    fs.writeFileSync(
      '/Users/cadenchiang/Desktop/act-prep-react/reformatted-lessons.json',
      JSON.stringify(results, null, 2)
    );

    console.log('\n\nReformatted lessons saved to reformatted-lessons.json for review');
    console.log('\nTo update Supabase, run: node update-lessons.js');

  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
