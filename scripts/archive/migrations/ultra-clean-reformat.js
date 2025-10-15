const { createClient } = require('@supabase/supabase-js');
const cheerio = require('cheerio');
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

// Be very strict about what qualifies as a section heading
function isValidSectionHeading(text) {
  const t = text.trim();

  // Must be reasonable length
  if (t.length < 10 || t.length > 100) return false;

  // Definitely not valid
  if (t.includes('Lesson:')) return false;
  if (t.match(/^-?\s*\d+\.?\s*$/)) return false; // Just numbers
  if (t.match(/^[A-D]\s*[).]?\s*.*/)) return false; // Answer choices
  if (t.match(/^For answer choice/i)) return false;
  if (t.match(/^[=><!+\-*/^()]+/)) return false; // Math operators
  if (t.match(/^x\s*=/)) return false;
  if (t.match(/^f\(/)) return false;
  if (t === 'math' || t.match(/^©/)) return false;

  // Must have at least 2 words
  if (t.split(/\s+/).length < 2) return false;

  // Whitelist ONLY clear section headings
  const validPatterns = [
    /backsolving.*done.*steps/i,
    /backsolving.*points/i,
    /substitution.*works/i,
    /when.*use/i,
    /how.*works/i,
    /step.*step.*process/i,
    /key.*concept/i,
    /important.*formula/i,
    /practice.*tip/i,
    /common.*mistake/i,
    /example.*problem/i,
    /summary/i,
    /^introduction/i,
    /^definition/i,
    /^properties of/i,
    /special case/i,
    /remember/i,
    /^rules for/i,
    /^solving/i,
  ];

  return validPatterns.some(p => p.test(t));
}

function cleanupHTML(html) {
  const $ = cheerio.load(html);

  // Remove all page numbers
  $('p').each((i, el) => {
    const text = $(el).text().trim();
    if (text.match(/^-\s*\d{3}$/) || text === 'math' || text.match(/^©/)) {
      $(el).remove();
    }
  });

  // Convert ALL h3 to paragraphs (we'll re-add valid ones)
  $('h3').each((i, el) => {
    const text = $(el).text().trim();
    if (text) {
      $(el).replaceWith(`<p>${text}</p>`);
    } else {
      $(el).remove();
    }
  });

  // Convert h4 to strong paragraphs
  $('h4').each((i, el) => {
    const text = $(el).text().trim();
    if (text) {
      $(el).replaceWith(`<p><strong>${text}</strong></p>`);
    }
  });

  return $;
}

function reformatLesson(lesson) {
  const { title, content } = lesson;
  const lessonTitle = extractLessonTitle(title);

  let $ = cheerio.load(content);

  // Extract images first
  const images = [];
  $('.diagram-box').each((i, el) => {
    images.push($.html(el));
    $(el).remove();
  });

  // Extract and clean examples
  const examples = [];
  $('.example-box').each((i, el) => {
    examples.push(cleanupExample($, el));
    $(el).remove();
  });

  // Get all remaining content
  const allContent = [];
  $('.lesson-content').children().each((i, el) => {
    const tagName = el.tagName;

    if (tagName === 'h2') return; // Skip, we'll add our own
    if (tagName === 'h3') {
      const text = $(el).text().trim();
      if (isValidSectionHeading(text)) {
        allContent.push({ type: 'section', text });
      } else if (text && text.length >= 10) {
        // Not a section but has content - keep as text
        allContent.push({ type: 'text', html: `<p>${text}</p>` });
      }
    } else if (tagName === 'p') {
      const text = $(el).text().trim();
      if (text && text !== 'math' && !text.match(/^-\s*\d{3}$/)) {
        allContent.push({ type: 'text', html: $.html(el) });
      }
    } else if (tagName === 'ol' || tagName === 'ul') {
      allContent.push({ type: 'list', html: $.html(el) });
    }
  });

  // Build clean HTML
  let output = '<div class="lesson-content">\n';
  output += `  <h2>${lessonTitle}</h2>\n\n`;

  // Add images
  for (const img of images) {
    output += `${img}\n\n`;
  }

  // Add introduction (first few paragraphs before any section)
  let sectionCount = 0;
  for (let i = 0; i < allContent.length; i++) {
    const item = allContent[i];

    if (item.type === 'section') {
      sectionCount++;
      // Limit sections to 8
      if (sectionCount <= 8) {
        output += `  <h3>${item.text}</h3>\n\n`;
      } else {
        output += `  <p><strong>${item.text}</strong></p>\n\n`;
      }
    } else if (item.type === 'text') {
      output += `  ${item.html}\n\n`;
    } else if (item.type === 'list') {
      output += `  ${item.html}\n\n`;
    }
  }

  // Add examples at the end or interspersed
  for (const example of examples) {
    output += `${example}\n\n`;
  }

  output += '</div>';

  return output;
}

function cleanupExample($ex, exampleEl) {
  const $example = $ex(exampleEl).clone();

  // Get title
  let title = $example.find('h4').first().text().trim() || 'Example';
  if (!title.match(/^Example/i)) {
    title = 'Example: ' + title;
  }

  // Remove all h3 and h4 tags, convert to paragraphs/text
  $example.find('h3, h4').each((i, el) => {
    const text = $ex(el).text().trim();
    if (text) {
      $ex(el).replaceWith(`<p>${text}</p>`);
    } else {
      $ex(el).remove();
    }
  });

  // Format answer choices nicely
  $example.find('p').each((i, el) => {
    const text = $ex(el).text().trim();

    // If it's an answer choice, style it
    if (text.match(/^[A-D][).]?\s+/)) {
      const styled = text.replace(/^([A-D])[).]?\s+/, '$1. ');
      $ex(el).html(styled);
      $ex(el).attr('style', 'margin: 0.25rem 0;');
    }

    // If it contains "Solution:" or "Answer:", make it bold
    if (text.match(/^(Solution|Answer):/i)) {
      $ex(el).html(`<strong>${text}</strong>`);
    }
  });

  const exampleContent = $example.html();

  // Build formatted example box
  let formatted = '<div class="example-box" style="margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-left: 4px solid #4CAF50;">\n';
  formatted += `  <h4 style="margin: 0 0 1rem 0; color: #2c3e50;">${title}</h4>\n`;
  formatted += exampleContent.split('\n').map(line => `  ${line}`).join('\n') + '\n';
  formatted += '</div>';

  return formatted;
}

// Main execution
(async () => {
  try {
    console.log('\n' + '█'.repeat(70));
    console.log('█  ACT MATH LESSON ULTRA-CLEAN REFORMATTER');
    console.log('█'.repeat(70) + '\n');

    console.log('Fetching all 35 math lessons from Supabase...\n');

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, content, subject')
      .eq('subject', 'math')
      .order('id');

    if (error) throw error;

    console.log(`✓ Found ${lessons.length} math lessons\n`);

    console.log('─'.repeat(70));
    console.log('BEFORE REFORMATTING');
    console.log('─'.repeat(70));

    for (const lesson of lessons) {
      const h3 = countH3Tags(lesson.content);
      const status = h3 > 50 ? '⚠' : h3 > 20 ? '△' : '○';
      console.log(`${status} ${lesson.title.padEnd(60)} ${String(h3).padStart(4)} h3`);
    }

    console.log('\n' + '─'.repeat(70));
    console.log('REFORMATTING...');
    console.log('─'.repeat(70) + '\n');

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

        const icon = newH3 <= 8 ? '✓' : newH3 <= 15 ? '△' : '✗';
        console.log(`${icon} [${String(i+1).padStart(2)}/35] ${lesson.title.padEnd(42)} ${String(origH3).padStart(4)} → ${String(newH3).padStart(2)} h3`);

      } catch (err) {
        console.log(`✗ [${String(i+1).padStart(2)}/35] ${lesson.title.padEnd(42)} ERROR: ${err.message}`);
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
      '/Users/cadenchiang/Desktop/act-prep-react/ultra-clean-lessons.json',
      JSON.stringify(results, null, 2)
    );

    console.log('\n' + '─'.repeat(70));
    console.log('AFTER REFORMATTING');
    console.log('─'.repeat(70));

    for (const result of results) {
      const icon = result.newH3 <= 8 ? '✓' : result.newH3 <= 15 ? '△' : '✗';
      console.log(`${icon} ${result.title.padEnd(60)} ${String(result.newH3).padStart(4)} h3`);
    }

    const totalOrig = results.reduce((sum, r) => sum + r.originalH3, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newH3, 0);
    const perfect = results.filter(r => r.newH3 >= 4 && r.newH3 <= 8).length;
    const good = results.filter(r => r.newH3 <= 15).length;

    console.log('\n' + '█'.repeat(70));
    console.log('FINAL STATISTICS');
    console.log('█'.repeat(70));
    console.log(`  Lessons processed:        ${results.length}`);
    console.log(`  Total h3 BEFORE:          ${totalOrig} (avg: ${Math.round(totalOrig/results.length)})`);
    console.log(`  Total h3 AFTER:           ${totalNew} (avg: ${Math.round(totalNew/results.length)})`);
    console.log(`  Reduction:                ${totalOrig - totalNew} h3 tags (${Math.round((1 - totalNew/totalOrig)*100)}%)`);
    console.log(`  Perfect (4-8 h3):         ${perfect}/35 lessons`);
    console.log(`  Good (0-15 h3):           ${good}/35 lessons`);
    console.log(`  Needs improvement (>15):  ${35-good}/35 lessons`);
    console.log('█'.repeat(70));

    console.log('\n✓ Results saved to: ultra-clean-lessons.json\n');

  } catch (err) {
    console.error('\n✗ Fatal error:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();
