import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function finalPolish(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Fix "Key Takeaway" paragraphs to be h3 headings
  $('p').each(function() {
    const $p = $(this);
    const text = $p.text().trim();

    if (text === 'Key Takeaway' || text.match(/^\s*Key Takeaway\s*$/i)) {
      $p.replaceWith('<h3>Key Takeaway</h3>');
    }
  });

  // Fix paragraphs that start with "Key Takeaway" as content
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    if (html.match(/^\s*Key Takeaway/i) && !$p.find('strong').length) {
      const content = html.replace(/^\s*Key Takeaway:?\s*/i, '').trim();
      if (content.length > 0) {
        $p.before('<h3>Key Takeaway</h3>');
        $p.html(content);
      } else {
        $p.replaceWith('<h3>Key Takeaway</h3>');
      }
    }
  });

  // Fix answer/solution order - move "Answer: X" to after solution work
  $('p').each(function() {
    const $p = $(this);
    const nextP = $p.next('p');

    if (nextP.length > 0) {
      const thisText = $p.html();
      const nextText = nextP.html();

      // Pattern: "<strong>Answer: C</strong>" followed by formula work
      if (thisText.match(/<strong>Answer:\s*[A-D]<\/strong>/) &&
          nextText.match(/[×÷=<>≥≤]|A =|P =/)) {
        // Swap them
        $p.after(nextP.clone());
        nextP.remove();
      }

      // Pattern: "Answer: C" (plain) followed by formula work
      if (thisText.match(/^Answer:\s*[A-D]\s*$/) &&
          nextText.match(/[×÷=<>≥≤]|A =|P =/)) {
        // Swap them, and make answer bold
        $p.html('<strong>' + thisText + '</strong>');
        $p.after(nextP.clone());
        nextP.remove();
      }
    }
  });

  // Clean up formulas that got combined with labels
  // Pattern: "formula: Label" -> split into formula paragraph and heading
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // Pattern: ends with ": <strong>Example:</strong>"
    if (html.match(/:\s*<strong>Example:<\/strong>\s*$/)) {
      const cleanFormula = html.replace(/:\s*<strong>Example:<\/strong>\s*$/, '');
      $p.html(cleanFormula);
      $p.after('<p><strong>Example:</strong></p>');
    }
  });

  // Fix Step headers that lost their content
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html().trim();

    // If this is just a step header with no content, try to merge with next paragraph
    if (html.match(/<strong>Step \d+:[^<]*<\/strong>\s*$/) && !html.includes('<br>')) {
      const nextP = $p.next('p');
      if (nextP.length > 0 && !nextP.html().match(/<strong>Step \d+:/)) {
        // Merge them
        $p.html(html + ' ' + nextP.html());
        nextP.remove();
      }
    }
  });

  // Clean up empty elements
  $('p:empty').remove();

  // Get clean HTML
  let cleanHtml = $.html('.lesson-content');

  // Final whitespace cleanup
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');

  return cleanHtml;
}

async function finalPolishAll() {
  console.log('✨ Final polish of all math lessons...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`Found ${lessons.length} math lessons\n`);

  let successCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title}`);

    try {
      const polished = finalPolish(lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: polished,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Polished`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully polished: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

finalPolishAll();
