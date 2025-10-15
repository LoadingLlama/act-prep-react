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

// Check if text is garbage
function isGarbageText(text) {
  const t = text.trim();
  return (
    !t ||
    t.length < 2 ||
    t.match(/^-?\s*\d{1,4}\s*\.?$/) || // Numbers
    t.match(/^[A-D]\s*[).]?\s*$/) || // Answer choices alone
    t === 'math' ||
    t.match(/^-+$/) ||
    t.match(/^©/) ||
    t.match(/^G\)?\s*$/)
  );
}

// Check if h3 is actually a valid section heading
function isValidH3(text) {
  const t = text.trim();

  // Definitely garbage
  if (isGarbageText(t)) return false;
  if (t.length < 8) return false;
  if (t.includes('Lesson:')) return false;

  // Whitelist common section patterns
  return t.match(/^[A-Z]/) && (
    t.match(/how.*work/i) ||
    t.match(/step/i) ||
    t.match(/example/i) ||
    t.match(/practice/i) ||
    t.match(/tip/i) ||
    t.match(/rule/i) ||
    t.match(/formula/i) ||
    t.match(/method/i) ||
    t.match(/technique/i) ||
    t.match(/what is/i) ||
    t.match(/when to/i) ||
    t.match(/key/i) ||
    t.match(/important/i) ||
    t.match(/summary/i) ||
    t.match(/properties/i) ||
    t.match(/introduction/i) ||
    t.match(/definition/i) ||
    t.match(/^[A-Z][a-z]+.*:$/) || // "Title:"
    (t.length > 15 && t.split(' ').length >= 3)
  );
}

function reformatLesson(lesson) {
  const { title, content } = lesson;
  const lessonTitle = extractLessonTitle(title);

  const $ = cheerio.load(content);

  // Build new HTML
  let newHTML = '<div class="lesson-content">\n';

  // Add title (only ONE h2)
  newHTML += `  <h2>${lessonTitle}</h2>\n\n`;

  // Extract images (diagram-box divs)
  const images = [];
  $('.diagram-box').each((i, el) => {
    images.push($.html(el));
  });

  // Add images after title
  if (images.length > 0) {
    for (const img of images) {
      newHTML += `${img}\n\n`;
    }
  }

  // Process content
  const paragraphs = [];
  const sections = [];
  let currentSection = { heading: null, content: [] };

  // Walk through all elements
  $('.lesson-content').children().each((i, el) => {
    const tagName = el.tagName;
    const text = $(el).text().trim();

    // Skip empty, images (already added), and duplicate titles
    if (!text || $(el).hasClass('diagram-box')) return;
    if (tagName === 'h2') return;

    if (tagName === 'h3') {
      if (isValidH3(text)) {
        // Save previous section
        if (currentSection.heading || currentSection.content.length > 0) {
          sections.push({...currentSection});
        }
        // Start new section
        currentSection = { heading: text, content: [] };
      } else {
        // Not a valid h3, keep as paragraph
        if (!isGarbageText(text)) {
          currentSection.content.push(`<p>${text}</p>`);
        }
      }
    } else if (tagName === 'p') {
      if (!isGarbageText(text)) {
        currentSection.content.push($.html(el));
      }
    } else if (tagName === 'div' && $(el).hasClass('example-box')) {
      currentSection.content.push(reformatExample($, el));
    } else {
      // Other content
      const html = $.html(el);
      if (html && !html.includes('diagram-box')) {
        currentSection.content.push(html);
      }
    }
  });

  // Don't forget last section
  if (currentSection.heading || currentSection.content.length > 0) {
    sections.push(currentSection);
  }

  // Add sections to output
  let h3Count = 0;
  for (const section of sections) {
    if (section.heading) {
      h3Count++;
      // Limit to 8 h3 headings
      if (h3Count <= 8) {
        newHTML += `  <h3>${section.heading}</h3>\n\n`;
      } else {
        newHTML += `  <p><strong>${section.heading}</strong></p>\n\n`;
      }
    }

    // Add content
    for (const contentItem of section.content) {
      newHTML += `  ${contentItem}\n\n`;
    }
  }

  newHTML += '</div>';

  return newHTML;
}

function reformatExample($, exampleEl) {
  const $ex = $(exampleEl);

  // Extract example title
  let title = $ex.find('h4').first().text().trim() || 'Example';
  $ex.find('h4').remove(); // Remove it so we don't duplicate

  // Clean up all garbage h3 tags inside example
  $ex.find('h3').each((i, h3) => {
    const text = $(h3).text().trim();
    if (isGarbageText(text) || text.match(/^[A-D]\.?$/) || text.match(/^\d+\.?$/)) {
      // Convert to paragraph
      $(h3).replaceWith(`<p>${text}</p>`);
    }
  });

  const content = $ex.html();

  // Build formatted example
  let formatted = '<div class="example-box" style="margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-left: 4px solid #4CAF50;">\n';
  formatted += `  <h4 style="margin: 0 0 1rem 0; color: #2c3e50;">${title}</h4>\n`;
  formatted += `  ${content}\n`;
  formatted += '</div>';

  return formatted;
}

// Main execution
(async () => {
  try {
    console.log('\n' + '='.repeat(70));
    console.log('  ACT MATH LESSON REFORMATTER - FINAL VERSION');
    console.log('='.repeat(70) + '\n');

    console.log('→ Fetching all 35 math lessons from Supabase...\n');

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, content, subject')
      .eq('subject', 'math')
      .order('id');

    if (error) throw error;

    console.log(`✓ Found ${lessons.length} math lessons\n`);

    console.log('='.repeat(70));
    console.log('BEFORE REFORMATTING');
    console.log('='.repeat(70) + '\n');

    for (const lesson of lessons) {
      const h3 = countH3Tags(lesson.content);
      console.log(`  ${lesson.title.padEnd(60)} ${String(h3).padStart(4)} h3`);
    }

    console.log('\n' + '='.repeat(70));
    console.log('REFORMATTING IN PROGRESS...');
    console.log('='.repeat(70) + '\n');

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

        console.log(`  [${String(i+1).padStart(2)}/35] ${lesson.title.padEnd(45)} ${String(origH3).padStart(4)} → ${String(newH3).padStart(2)} h3`);

      } catch (err) {
        console.log(`  [${String(i+1).padStart(2)}/35] ${lesson.title.padEnd(45)} ERROR: ${err.message}`);
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

    // Save to file
    fs.writeFileSync(
      '/Users/cadenchiang/Desktop/act-prep-react/final-reformatted-lessons.json',
      JSON.stringify(results, null, 2)
    );

    console.log('\n' + '='.repeat(70));
    console.log('AFTER REFORMATTING');
    console.log('='.repeat(70) + '\n');

    for (const result of results) {
      console.log(`  ${result.title.padEnd(60)} ${String(result.newH3).padStart(4)} h3`);
    }

    const totalOrig = results.reduce((sum, r) => sum + r.originalH3, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newH3, 0);

    console.log('\n' + '='.repeat(70));
    console.log('FINAL STATISTICS');
    console.log('='.repeat(70));
    console.log(`  Lessons processed:        ${results.length}`);
    console.log(`  Total h3 BEFORE:          ${totalOrig} (avg: ${Math.round(totalOrig/results.length)})`);
    console.log(`  Total h3 AFTER:           ${totalNew} (avg: ${Math.round(totalNew/results.length)})`);
    console.log(`  Reduction:                ${totalOrig - totalNew} h3 tags (${Math.round((1 - totalNew/totalOrig)*100)}%)`);
    console.log(`  Target range (4-8 h3):    ${results.filter(r => r.newH3 >= 4 && r.newH3 <= 8).length}/35`);
    console.log(`  Acceptable (0-10 h3):     ${results.filter(r => r.newH3 <= 10).length}/35`);
    console.log('='.repeat(70));

    console.log('\n✓ Results saved to: final-reformatted-lessons.json\n');
    console.log('Next: Review samples, then run upload script\n');

  } catch (err) {
    console.error('\n✗ Fatal error:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();
