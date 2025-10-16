import { supabaseUrl, supabaseServiceKey } from './config.mjs';
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// supabaseUrl imported from config.mjs
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Count h3 tags
function countH3Tags(content) {
  const matches = content.match(/<h3/g);
  return matches ? matches.length : 0;
}

// Extract clean lesson title
function extractLessonTitle(title) {
  return title.replace(/^Chapter \d+:\s*/i, '').trim();
}

// Check if text is a garbage h3 (number, answer choice, equation, etc.)
function isGarbageH3(text) {
  const trimmed = text.trim();

  return (
    trimmed.length === 0 || // Empty
    trimmed.match(/^-?\s*\d{1,4}\s*\.?$/) || // Just a number like "1" or "285"
    trimmed.match(/^[A-D]\s*[).]?\s*$/) || // Answer choice like "A." or "B)"
    trimmed.match(/^[A-D]\s*[).]?\s*-?\d+$/) || // "A. 2" or "B) 6"
    trimmed.match(/^©/) || // Copyright symbols
    trimmed === 'math' || // Artifact
    trimmed.match(/^-+$/) || // Dashes
    trimmed.match(/^[\/\\|]+$/) || // Slashes
    trimmed.includes('Lesson:') || // Duplicate "Lesson:"
    trimmed.match(/^[=+\-*/^()]+$/) || // Math operators only
    trimmed.match(/^G\)?\s*$/) || // Just "G"
    trimmed.match(/^\d+\s*[+\-*/]\s*\d+/) || // Simple arithmetic
    trimmed.match(/^x\s*=/) || // Equations starting with x =
    trimmed.match(/^f\(/) || // Function notation
    trimmed.match(/^[=><!]+$/) // Comparison operators
  );
}

// Check if this is a legitimate section heading
function isValidSectionHeading(text) {
  const trimmed = text.trim();

  if (trimmed.length < 4) return false;
  if (isGarbageH3(trimmed)) return false;

  // Whitelist common section headings
  const validPatterns = [
    /how.*works/i,
    /step.*process/i,
    /example/i,
    /practice/i,
    /tip/i,
    /trick/i,
    /rule/i,
    /formula/i,
    /equation/i,
    /method/i,
    /strategy/i,
    /approach/i,
    /technique/i,
    /concept/i,
    /definition/i,
    /what is/i,
    /when to/i,
    /key point/i,
    /important/i,
    /common mistake/i,
    /summary/i,
  ];

  return validPatterns.some(pattern => pattern.test(trimmed));
}

// Main reformatting function
function reformatLesson(lesson) {
  const { title, content } = lesson;
  const lessonTitle = extractLessonTitle(title);

  let html = content;

  // Step 1: Extract and preserve images
  const images = [];
  html = html.replace(/<div class="diagram-box"[^>]*>([\s\S]*?)<\/div>/g, (match) => {
    images.push(match);
    return '___IMAGE_PLACEHOLDER___';
  });

  // Step 2: Extract examples
  const examples = [];
  let exampleCounter = 0;
  html = html.replace(/<div class="example-box"[^>]*>([\s\S]*?)<\/div>/g, (match) => {
    exampleCounter++;
    examples.push({ id: exampleCounter, content: match });
    return `___EXAMPLE_${exampleCounter}___`;
  });

  // Step 3: Parse all elements
  const tokens = [];
  let currentPos = 0;

  // Match h2, h3, h4, p tags
  const tagRegex = /<(h2|h3|h4|p)([^>]*)>([\s\S]*?)<\/\1>/g;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const [fullMatch, tag, attrs, innerText] = match;
    const cleanText = innerText.trim();

    if (!cleanText) continue;

    if (tag === 'h3') {
      if (isValidSectionHeading(cleanText)) {
        tokens.push({ type: 'section-heading', text: cleanText });
      } else if (!isGarbageH3(cleanText)) {
        // Not garbage but not a valid heading - keep as paragraph
        tokens.push({ type: 'paragraph', text: cleanText });
      }
      // If it's garbage, skip it entirely
    } else if (tag === 'p') {
      // Clean up paragraph text
      let pText = cleanText
        .replace(/___IMAGE_PLACEHOLDER___/, () => images.shift() || '')
        .replace(/___EXAMPLE_(\d+)___/, (m, id) => {
          const ex = examples.find(e => e.id === parseInt(id));
          return ex ? `___EXAMPLE_${id}___` : '';
        });

      if (pText && pText.length > 1) {
        // Skip page numbers and artifacts
        if (pText.match(/^-\s*\d{3}$/)) continue;
        if (pText === 'math') continue;
        if (pText.match(/^©/)) continue;

        tokens.push({ type: 'paragraph', text: pText });
      }
    }
  }

  // Step 4: Rebuild with clean structure
  let output = '<div class="lesson-content">\n';

  // Add ONE h2 title
  output += `  <h2>${lessonTitle}</h2>\n\n`;

  // Add images at the beginning if any
  if (images.length > 0) {
    output += images.join('\n\n') + '\n\n';
  }

  // Add introduction (first few paragraphs before first section heading)
  let foundFirstSection = false;
  let sectionCount = 0;

  for (const token of tokens) {
    if (token.type === 'section-heading') {
      foundFirstSection = true;
      sectionCount++;

      // Limit total sections to keep things organized
      if (sectionCount <= 8) {
        output += `  <h3>${token.text}</h3>\n\n`;
      } else {
        // Too many sections, demote to strong paragraph
        output += `  <p><strong>${token.text}</strong></p>\n\n`;
      }
    } else if (token.type === 'paragraph') {
      // Handle example placeholders
      const exampleMatch = token.text.match(/___EXAMPLE_(\d+)___/);
      if (exampleMatch) {
        const exId = parseInt(exampleMatch[1]);
        const example = examples.find(e => e.id === exId);
        if (example) {
          output += formatExample(example.content) + '\n\n';
        }
      } else if (token.text.includes('___IMAGE_PLACEHOLDER___')) {
        // Image already added
        continue;
      } else {
        output += `  <p>${token.text}</p>\n\n`;
      }
    }
  }

  output += '</div>';

  return output;
}

// Format example with proper styling
function formatExample(exampleHtml) {
  // Extract the content, removing the outer div
  let content = exampleHtml.replace(/<div class="example-box"[^>]*>/, '').replace(/<\/div>$/, '');

  // Extract example title if it exists
  const titleMatch = content.match(/<h4[^>]*>(.*?)<\/h4>/);
  let title = titleMatch ? titleMatch[1].trim() : 'Example';

  // Clean up title
  if (title.startsWith('Example')) {
    title = title;
  } else {
    title = 'Example: ' + title;
  }

  // Remove h3 garbage tags from example content
  content = content.replace(/<h3[^>]*>.*?<\/h3>/g, (match) => {
    const innerText = match.replace(/<[^>]+>/g, '').trim();
    if (isGarbageH3(innerText)) {
      return `<p>${innerText}</p>`;
    }
    return match;
  });

  // Remove the h4 title since we'll add it back
  content = content.replace(/<h4[^>]*>.*?<\/h4>/, '');

  // Format answer choices as a clean list
  content = content.replace(/<p[^>]*>([A-D])[).]?\s*([^<]+)<\/p>/g, (match, letter, text) => {
    return `    <p style="margin: 0.25rem 0;">${letter}. ${text.trim()}</p>`;
  });

  // Build the formatted example
  let formatted = '<div class="example-box" style="margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-left: 4px solid #4CAF50;">\n';
  formatted += `  <h4 style="margin: 0 0 1rem 0; color: #2c3e50;">${title}</h4>\n`;
  formatted += content.trim() + '\n';
  formatted += '</div>';

  return formatted;
}

// Main execution
(async () => {
  try {
    console.log('========================================');
    console.log('ACT MATH LESSON REFORMATTER');
    console.log('========================================\n');

    console.log('Fetching all 35 math lessons from Supabase...\n');

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, content, subject')
      .eq('subject', 'math')
      .order('id');

    if (error) throw error;

    console.log(`✓ Found ${lessons.length} math lessons\n`);
    console.log('========================================');
    console.log('CURRENT STATE (BEFORE)');
    console.log('========================================\n');

    for (const lesson of lessons) {
      const h3Count = countH3Tags(lesson.content);
      console.log(`${lesson.title.padEnd(65)} ${String(h3Count).padStart(3)} h3 tags`);
    }

    console.log('\n========================================');
    console.log('REFORMATTING ALL LESSONS');
    console.log('========================================\n');

    const results = [];

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const originalH3 = countH3Tags(lesson.content);

      process.stdout.write(`[${i + 1}/${lessons.length}] ${lesson.title}... `);

      try {
        const reformattedContent = reformatLesson(lesson);
        const newH3 = countH3Tags(reformattedContent);

        results.push({
          id: lesson.id,
          title: lesson.title,
          originalContent: lesson.content,
          reformattedContent: reformattedContent,
          subject: lesson.subject,
          originalH3,
          newH3
        });

        console.log(`✓ (${originalH3} → ${newH3} h3)`);
      } catch (err) {
        console.log(`✗ ERROR: ${err.message}`);
        // Keep original if reformatting fails
        results.push({
          id: lesson.id,
          title: lesson.title,
          originalContent: lesson.content,
          reformattedContent: lesson.content,
          subject: lesson.subject,
          originalH3,
          newH3: originalH3,
          error: err.message
        });
      }
    }

    // Save results
    fs.writeFileSync(
      '/Users/cadenchiang/Desktop/act-prep-react/reformatted-lessons-final.json',
      JSON.stringify(results, null, 2)
    );

    console.log('\n========================================');
    console.log('SUMMARY (AFTER)');
    console.log('========================================\n');

    for (const result of results) {
      const status = result.error ? '✗ FAILED' : '✓';
      console.log(`${status} ${result.title.padEnd(65)} ${String(result.newH3).padStart(3)} h3 tags`);
    }

    const totalOriginalH3 = results.reduce((sum, r) => sum + r.originalH3, 0);
    const totalNewH3 = results.reduce((sum, r) => sum + r.newH3, 0);
    const avgOriginal = Math.round(totalOriginalH3 / results.length);
    const avgNew = Math.round(totalNewH3 / results.length);

    console.log('\n========================================');
    console.log('STATISTICS');
    console.log('========================================');
    console.log(`Total lessons processed: ${results.length}`);
    console.log(`Total h3 tags BEFORE: ${totalOriginalH3} (avg: ${avgOriginal} per lesson)`);
    console.log(`Total h3 tags AFTER: ${totalNewH3} (avg: ${avgNew} per lesson)`);
    console.log(`Reduction: ${totalOriginalH3 - totalNewH3} h3 tags (${Math.round((1 - totalNewH3/totalOriginalH3) * 100)}%)`);

    console.log('\n✓ Results saved to: reformatted-lessons-final.json');
    console.log('\nNext step: Review the results, then run: node update-supabase.js');

  } catch (err) {
    console.error('\n✗ Fatal error:', err);
    process.exit(1);
  }
})();
