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

// Detect if paragraph looks like a section heading
function looksLikeSectionHeading(text) {
  const t = text.trim();

  // Must end with colon or be a statement
  if (t.length < 12 || t.length > 120) return false;

  // Skip garbage
  if (t.match(/^[A-D][).]?\s/)) return false;
  if (t.match(/^-?\d+\.?\s*$/)) return false;
  if (t.includes('Lesson:')) return false;

  // Good indicators
  return (
    t.match(/.*:\s*$/) || // Ends with colon
    t.match(/^(How|What|When|Why|Where|Rules|Steps|Tips|Examples|Practice|Important|Remember|Definition|Properties|Special|Common|Key)/i) ||
    t.match(/(steps|rules|methods|techniques|formulas|equations|properties|examples|tips|practice):\s*$/i)
  );
}

function reformatLesson(lesson) {
  const { title, content } = lesson;
  const lessonTitle = extractLessonTitle(title);

  const $ = cheerio.load(content);

  // Extract images
  const images = [];
  $('.diagram-box').each((i, el) => {
    images.push($.html(el));
    $(el).remove();
  });

  // Process all content, identifying patterns
  const items = [];
  let pendingListItems = [];

  $('.lesson-content').children().each((i, el) => {
    const tagName = el.tagName;
    const text = $(el).text().trim();

    if (!text || tagName === 'h2') return;

    // Skip garbage
    if (text === 'math' || text.match(/^-\s*\d{3}$/) || text.match(/^©/)) return;

    if (tagName === 'div' && $(el).hasClass('example-box')) {
      // Flush any pending list
      if (pendingListItems.length > 0) {
        items.push({ type: 'list', items: [...pendingListItems] });
        pendingListItems = [];
      }
      items.push({ type: 'example', html: $.html(el) });
    } else if (tagName === 'div' && $(el).hasClass('diagram-box')) {
      // Already extracted
      return;
    } else if (tagName === 'h3') {
      // Check if it's garbage
      const isGarbage = text.match(/^[A-D][).]?\s*$/) ||
                       text.match(/^-?\d+\.?\s*$/) ||
                       text.length < 3;

      if (!isGarbage) {
        if (pendingListItems.length > 0) {
          items.push({ type: 'list', items: [...pendingListItems] });
          pendingListItems = [];
        }

        if (looksLikeSectionHeading(text)) {
          items.push({ type: 'heading', text });
        } else {
          items.push({ type: 'text', html: `<p>${text}</p>` });
        }
      }
    } else if (tagName === 'p') {
      // Check if it's a numbered list item
      const listMatch = text.match(/^(\d+)\.\s+(.+)/);

      if (listMatch && parseInt(listMatch[1]) === pendingListItems.length + 1) {
        // It's a continuation of the list
        pendingListItems.push(listMatch[2]);
      } else {
        // Not a list item
        if (pendingListItems.length > 0) {
          items.push({ type: 'list', items: [...pendingListItems] });
          pendingListItems = [];
        }

        // Check if this looks like a section heading
        if (looksLikeSectionHeading(text)) {
          items.push({ type: 'heading', text: text.replace(/:$/, '') });
        } else {
          items.push({ type: 'text', html: $.html(el) });
        }
      }
    } else if (tagName === 'ol' || tagName === 'ul') {
      if (pendingListItems.length > 0) {
        items.push({ type: 'list', items: [...pendingListItems] });
        pendingListItems = [];
      }
      items.push({ type: 'list-html', html: $.html(el) });
    }
  });

  // Flush remaining list
  if (pendingListItems.length > 0) {
    items.push({ type: 'list', items: pendingListItems });
  }

  // Build output
  let output = '<div class="lesson-content">\n';
  output += `  <h2>${lessonTitle}</h2>\n\n`;

  // Add images
  for (const img of images) {
    output += `${img}\n\n`;
  }

  // Add content with smart h3 limits
  let h3Count = 0;
  const maxH3 = 8;

  for (const item of items) {
    if (item.type === 'heading') {
      h3Count++;
      if (h3Count <= maxH3) {
        output += `  <h3>${item.text}</h3>\n\n`;
      } else {
        output += `  <p><strong>${item.text}</strong></p>\n\n`;
      }
    } else if (item.type === 'text') {
      output += `  ${item.html}\n\n`;
    } else if (item.type === 'list') {
      output += `  <ol>\n`;
      for (const listItem of item.items) {
        output += `    <li>${listItem}</li>\n`;
      }
      output += `  </ol>\n\n`;
    } else if (item.type === 'list-html') {
      output += `  ${item.html}\n\n`;
    } else if (item.type === 'example') {
      output += formatExample($, item.html) + '\n\n';
    }
  }

  output += '</div>';

  return output;
}

function formatExample($, exampleHTML) {
  const $ex = cheerio.load(exampleHTML);
  const $box = $ex('.example-box').first();

  // Get title
  let title = $box.find('h4').first().text().trim();
  if (!title) title = 'Example';
  if (!title.match(/^Example/i)) title = 'Example: ' + title;

  // Remove title so we don't duplicate
  $box.find('h4').remove();

  // Clean all h3 tags - convert to paragraphs
  $box.find('h3').each((i, el) => {
    const text = $ex(el).text().trim();
    if (text && !text.match(/^[A-D]\.?$/) && !text.match(/^-?\d+\.?$/)) {
      $ex(el).replaceWith(`<p>${text}</p>`);
    } else {
      $ex(el).remove();
    }
  });

  // Format answer choices
  $box.find('p').each((i, el) => {
    const text = $ex(el).text().trim();

    if (text.match(/^[A-D][).]?\s+/)) {
      $ex(el).attr('style', 'margin: 0.25rem 0;');
    }

    if (text.match(/^(Solution|Answer):/i)) {
      $ex(el).html(`<strong>${text}</strong>`);
    }
  });

  let formatted = '<div class="example-box" style="margin: 1.5rem 0; padding: 1.5rem; background: #f8f9fa; border-left: 4px solid #4CAF50;">\n';
  formatted += `  <h4 style="margin: 0 0 1rem 0; color: #2c3e50;">${title}</h4>\n`;

  $box.children().each((i, el) => {
    formatted += '  ' + $ex(el).toString() + '\n';
  });

  formatted += '</div>';

  return formatted;
}

// Main execution
(async () => {
  try {
    console.log('\n╔══════════════════════════════════════════════════════════════════╗');
    console.log('║      ACT MATH LESSON PERFECT REFORMATTER - FINAL VERSION        ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝\n');

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, content, subject')
      .eq('subject', 'math')
      .order('id');

    if (error) throw error;

    console.log(`✓ Fetched ${lessons.length} math lessons from Supabase\n`);

    console.log('─'.repeat(70));
    console.log(' BEFORE | LESSON TITLE' + ' '.repeat(45) + '|  H3');
    console.log('─'.repeat(70));

    lessons.forEach(l => {
      const h3 = countH3Tags(l.content);
      const icon = h3 > 100 ? '❌' : h3 > 50 ? '⚠️ ' : h3 > 20 ? '△' : '○';
      console.log(` ${icon}  | ${l.title.padEnd(55)} | ${String(h3).padStart(3)}`);
    });

    console.log('\n' + '─'.repeat(70));
    console.log('REFORMATTING ALL 35 LESSONS...');
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

        const icon = newH3 <= 8 ? '✅' : newH3 <= 15 ? '⚠️ ' : '❌';
        console.log(`${icon} [${String(i+1).padStart(2)}/35] ${lesson.title.padEnd(40)} ${String(origH3).padStart(4)} → ${String(newH3).padStart(2)}`);

      } catch (err) {
        console.log(`❌ [${String(i+1).padStart(2)}/35] ${lesson.title.padEnd(40)} ERROR`);
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

    fs.writeFileSync(
      '/Users/cadenchiang/Desktop/act-prep-react/perfect-lessons.json',
      JSON.stringify(results, null, 2)
    );

    const totalOrig = results.reduce((sum, r) => sum + r.originalH3, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newH3, 0);

    console.log('\n╔══════════════════════════════════════════════════════════════════╗');
    console.log('║                        FINAL RESULTS                             ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝\n');

    console.log(` Total lessons:         ${results.length}`);
    console.log(` Total h3 BEFORE:       ${totalOrig} (avg: ${Math.round(totalOrig/35)} per lesson)`);
    console.log(` Total h3 AFTER:        ${totalNew} (avg: ${Math.round(totalNew/35)} per lesson)`);
    console.log(` Reduction:             ${totalOrig - totalNew} h3 tags (${Math.round((1-totalNew/totalOrig)*100)}%)`);
    console.log(` Perfect (4-8 h3):      ${results.filter(r => r.newH3 >= 4 && r.newH3 <= 8).length}/35`);
    console.log(` Good (0-15 h3):        ${results.filter(r => r.newH3 <= 15).length}/35`);
    console.log(` Needs work (>15 h3):   ${results.filter(r => r.newH3 > 15).length}/35`);

    console.log('\n✅ Results saved to: perfect-lessons.json\n');

  } catch (err) {
    console.error('\n❌ Fatal error:', err.message);
    process.exit(1);
  }
})();
