const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const supabase = createClient(supabaseUrl, supabaseKey);

function countH3Tags(content) {
  return (content.match(/<h3/g) || []).length;
}

function extractLessonTitle(title) {
  return title.replace(/^Chapter \d+:\s*/i, '').trim();
}

// Check if text looks like garbage (numbers, answer choices, equations)
function isGarbageHeading(text) {
  const t = text.trim();
  return (
    !t ||
    t.length < 3 ||
    t.match(/^-?\s*\d{1,4}\s*\.?$/) || // "1", "2", "285"
    t.match(/^[A-D]\s*[).]?\s*$/) || // "A.", "B)"
    t.match(/^[A-D]\s*[).]?\s*-?\d+\s*$/) || // "A. 2"
    t.match(/^©/) ||
    t === 'math' ||
    t.match(/^[=><!+\-*/^()]+$/) || // Math operators
    t.match(/^x\s*=/) || // Equations
    t.match(/^f\(/) || // Functions
    t.includes('Lesson:') // Duplicate
  );
}

// Check if heading should be kept as h3
function shouldKeepAsH3(text) {
  const t = text.trim();

  if (isGarbageHeading(t)) return false;
  if (t.length < 10) return false; // Too short to be a real heading

  // Keep common educational section headings
  const goodPatterns = [
    /how.*works/i,
    /step.*step/i,
    /steps:/i,
    /example/i,
    /practice/i,
    /tips/i,
    /tricks/i,
    /rules/i,
    /formulas?/i,
    /equations?/i,
    /methods?/i,
    /strateg/i,
    /approach/i,
    /technique/i,
    /concepts?/i,
    /definition/i,
    /what is/i,
    /when to/i,
    /why/i,
    /key points?/i,
    /important/i,
    /common mistake/i,
    /summary/i,
    /introduction/i,
    /overview/i,
    /remember/i,
    /properties/i,
    /special case/i,
  ];

  return goodPatterns.some(p => p.test(t));
}

function reformatLesson(lesson) {
  const { title, content } = lesson;
  const lessonTitle = extractLessonTitle(title);

  // Extract images
  const images = [];
  let html = content.replace(/<div class="diagram-box"[^>]*>([\s\S]*?)<\/div>/g, (match) => {
    images.push(match);
    return '___IMG___';
  });

  // Parse HTML into structured tokens
  const tokens = [];
  const tagRegex = /<(h2|h3|h4|p|div)([^>]*)>([\s\S]*?)<\/\1>/g;
  let match;
  let inExample = false;
  let exampleContent = [];

  while ((match = tagRegex.exec(html)) !== null) {
    const [fullMatch, tag, attrs, content] = match;
    const text = content.trim();

    if (!text) continue;

    // Handle example boxes
    if (tag === 'div' && attrs.includes('example-box')) {
      inExample = true;
      continue;
    }

    if (tag === 'h4' && !isGarbageHeading(text)) {
      tokens.push({ type: 'example-title', text });
      continue;
    }

    if (tag === 'h3') {
      if (shouldKeepAsH3(text)) {
        tokens.push({ type: 'section-heading', text });
      } else if (!isGarbageHeading(text)) {
        tokens.push({ type: 'text', text });
      }
      continue;
    }

    if (tag === 'p') {
      // Skip artifacts
      if (text === 'math' || text.match(/^-\s*\d{3}$/) || text.match(/^©/)) continue;

      // Check for image placeholder
      if (text.includes('___IMG___')) {
        if (images.length > 0) {
          tokens.push({ type: 'image', text: images.shift() });
        }
        continue;
      }

      tokens.push({ type: 'text', text });
    }
  }

  // Rebuild with proper structure
  let output = '<div class="lesson-content">\n';
  output += `  <h2>${lessonTitle}</h2>\n\n`;

  // Add remaining images at the top
  while (images.length > 0) {
    output += images.shift() + '\n\n';
  }

  // Process tokens
  let h3Count = 0;
  let inExampleBlock = false;
  let currentExample = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'section-heading') {
      h3Count++;
      // Limit to reasonable number of sections (8 max)
      if (h3Count <= 8) {
        output += `  <h3>${token.text}</h3>\n\n`;
      } else {
        output += `  <p><strong>${token.text}</strong></p>\n\n`;
      }
    } else if (token.type === 'example-title') {
      // Start example box
      inExampleBlock = true;
      currentExample = [];
      currentExample.push(`<div class="example-box" style="margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-left: 4px solid #4CAF50;">`);
      currentExample.push(`  <h4 style="margin: 0 0 1rem 0; color: #2c3e50;">${token.text}</h4>`);
    } else if (token.type === 'image') {
      output += token.text + '\n\n';
    } else if (token.type === 'text') {
      // Check if this looks like it should be a list item
      const startsWithNumber = token.text.match(/^(\d+)\.\s+(.+)/);

      if (startsWithNumber && i > 0 && tokens[i-1].text && tokens[i-1].text.includes('steps')) {
        // Start ordered list
        output += `  <ol>\n`;
        output += `    <li>${startsWithNumber[2]}</li>\n`;

        // Look ahead for more list items
        let j = i + 1;
        while (j < tokens.length && tokens[j].type === 'text') {
          const nextMatch = tokens[j].text.match(/^(\d+)\.\s+(.+)/);
          if (nextMatch && parseInt(nextMatch[1]) === parseInt(startsWithNumber[1]) + (j - i)) {
            output += `    <li>${nextMatch[2]}</li>\n`;
            j++;
          } else if (!nextMatch && tokens[j].text.length < 100) {
            // Continuation of previous list item
            output += `      ${tokens[j].text}\n`;
            j++;
          } else {
            break;
          }
        }
        output += `  </ol>\n\n`;
        i = j - 1; // Skip processed items
      } else if (inExampleBlock) {
        // Check if this is an answer choice
        if (token.text.match(/^[A-D][).]?\s+.+/)) {
          currentExample.push(`  <p style="margin: 0.25rem 0;">${token.text}</p>`);
        } else if (token.text.toLowerCase().includes('solution:') || token.text.toLowerCase().includes('answer:')) {
          currentExample.push(`  <p><strong>${token.text}</strong></p>`);
        } else {
          currentExample.push(`  <p>${token.text}</p>`);
        }

        // Check if example is ending (next token is section or another example)
        if (i === tokens.length - 1 || tokens[i + 1].type === 'section-heading' || tokens[i + 1].type === 'example-title') {
          currentExample.push('</div>');
          output += currentExample.join('\n') + '\n\n';
          inExampleBlock = false;
          currentExample = [];
        }
      } else {
        output += `  <p>${token.text}</p>\n\n`;
      }
    }
  }

  // Close any open example
  if (inExampleBlock && currentExample.length > 0) {
    currentExample.push('</div>');
    output += currentExample.join('\n') + '\n\n';
  }

  output += '</div>';

  return output;
}

// Main execution
(async () => {
  try {
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║         ACT MATH LESSON COMPREHENSIVE REFORMATTER              ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log('→ Fetching all math lessons from Supabase...\n');

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, content, subject')
      .eq('subject', 'math')
      .order('id');

    if (error) throw error;

    console.log(`✓ Found ${lessons.length} math lessons\n`);

    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║                    CURRENT STATE (BEFORE)                      ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    for (const lesson of lessons) {
      const h3 = countH3Tags(lesson.content);
      console.log(`  ${lesson.title.padEnd(62)} ${String(h3).padStart(3)} h3`);
    }

    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                     REFORMATTING PROCESS                       ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    const results = [];

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const origH3 = countH3Tags(lesson.content);

      try {
        const reformatted = reformatLesson(lesson);
        const newH3 = countH3Tags(reformatted);

        results.push({
          id: lesson.id,
          title: lesson.title,
          originalContent: lesson.content,
          reformattedContent: reformatted,
          subject: lesson.subject,
          originalH3: origH3,
          newH3: newH3
        });

        const pct = origH3 > 0 ? Math.round((1 - newH3/origH3) * 100) : 0;
        console.log(`  [${String(i+1).padStart(2)}/${lessons.length}] ${lesson.title.padEnd(50)} ${String(origH3).padStart(3)} → ${String(newH3).padStart(2)} h3 (-${pct}%)`);

      } catch (err) {
        console.log(`  [${String(i+1).padStart(2)}/${lessons.length}] ${lesson.title.padEnd(50)} ERROR: ${err.message}`);
        results.push({
          id: lesson.id,
          title: lesson.title,
          originalContent: lesson.content,
          reformattedContent: lesson.content,
          subject: lesson.subject,
          originalH3: origH3,
          newH3: origH3,
          error: err.message
        });
      }
    }

    // Save results
    fs.writeFileSync(
      '/Users/cadenchiang/Desktop/act-prep-react/reformatted-lessons.json',
      JSON.stringify(results, null, 2)
    );

    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                       FINAL SUMMARY                            ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    const totalOrig = results.reduce((sum, r) => sum + r.originalH3, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newH3, 0);
    const reduction = totalOrig - totalNew;
    const reductionPct = totalOrig > 0 ? Math.round((reduction / totalOrig) * 100) : 0;

    console.log(`  Total lessons processed:  ${results.length}`);
    console.log(`  Total h3 tags BEFORE:     ${totalOrig} (avg: ${Math.round(totalOrig/results.length)} per lesson)`);
    console.log(`  Total h3 tags AFTER:      ${totalNew} (avg: ${Math.round(totalNew/results.length)} per lesson)`);
    console.log(`  Total reduction:          ${reduction} h3 tags (${reductionPct}%)`);
    console.log(`  Lessons with 0-8 h3:      ${results.filter(r => r.newH3 >= 0 && r.newH3 <= 8).length}/${results.length}`);
    console.log(`  Lessons with errors:      ${results.filter(r => r.error).length}`);

    console.log('\n✓ Results saved to: reformatted-lessons.json');
    console.log('✓ Ready to upload to Supabase!\n');
    console.log('Next step: node upload-to-supabase.js\n');

  } catch (err) {
    console.error('\n✗ Fatal error:', err.message);
    process.exit(1);
  }
})();
