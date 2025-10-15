import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function comprehensiveReformat(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Remove ALL inline styles first
  $('[style]').removeAttr('style');

  // Remove all emojis
  $('*').each(function() {
    $(this).contents().each(function() {
      if (this.type === 'text') {
        this.data = this.data.replace(/[\u{1F300}-\u{1F9FF}⚠️💡]/gu, '');
      }
    });
  });

  // Find standalone text nodes (formulas/equations not wrapped in tags)
  $('.lesson-content').contents().each(function() {
    if (this.type === 'text') {
      const text = $(this).text().trim();
      if (text.length > 0) {
        // Wrap standalone text in a paragraph
        $(this).replaceWith('<p>' + text + '</p>');
      }
    }
  });

  // Convert symbol definition paragraphs into a proper list
  // Look for patterns like ">: Greater than" or "x > 5 means..."
  let inSymbolSection = false;
  let symbolItems = [];

  $('.lesson-content > *').each(function(index) {
    const $el = $(this);

    // Check if this is the "Inequality Symbols" or similar heading
    if ($el.is('h3') && $el.text().toLowerCase().includes('symbol')) {
      inSymbolSection = true;
      return;
    }

    // If we're in symbol section and hit next h3, end it
    if (inSymbolSection && $el.is('h3') && !$el.text().toLowerCase().includes('symbol')) {
      // Insert collected symbols as a list before this h3
      if (symbolItems.length > 0) {
        const listHtml = '<ul>' + symbolItems.map(item => '<li>' + item + '</li>').join('') + '</ul>';
        $el.before(listHtml);
        symbolItems = [];
      }
      inSymbolSection = false;
      return;
    }

    // Collect symbol definitions
    if (inSymbolSection && $el.is('p')) {
      const text = $el.html().trim();
      if (text.length > 0) {
        symbolItems.push(text);
        $el.remove();
      }
    }
  });

  // Convert patterns like "Step 1:" and "Step 2:" into proper ordered lists
  let inStepSection = false;
  let stepItems = [];

  $('.lesson-content > *').each(function() {
    const $el = $(this);
    const text = $el.text().trim();

    // Check for step pattern
    if ($el.is('p') && text.match(/^Step \d+:/i)) {
      inStepSection = true;
      stepItems.push($el.html());
      $el.remove();
    } else if (inStepSection) {
      // Check if next element continues the step
      if ($el.is('p') && !text.match(/^Step \d+:/i) && !$el.is('h3, h4')) {
        // This is continuation of previous step
        if (stepItems.length > 0) {
          stepItems[stepItems.length - 1] += '<br>' + $el.html();
          $el.remove();
        }
      } else {
        // End of steps, insert list
        if (stepItems.length > 0) {
          const listHtml = '<ol>' + stepItems.map(item => '<li>' + item + '</li>').join('') + '</ol>';
          $el.before(listHtml);
          stepItems = [];
        }
        inStepSection = false;
      }
    }
  });

  // Wrap multi-line formulas/equations in a code block style div
  $('.lesson-content').contents().each(function() {
    if (this.type === 'text') {
      const text = $(this).text().trim();

      // Check if this looks like a formula (contains mathematical symbols)
      if (text.match(/[×÷=<>≥≤±√²³]/)) {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        if (lines.length > 1) {
          // Multi-line formula - wrap in a div
          const formulaHtml = '<div class="formula-block">' +
            lines.map(line => '<div>' + line + '</div>').join('') +
            '</div>';
          $(this).replaceWith(formulaHtml);
        } else if (text.length > 0) {
          // Single line formula
          $(this).replaceWith('<p><strong>' + text + '</strong></p>');
        }
      }
    }
  });

  // Clean up combined text like "Answer: B: Key Takeaway"
  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();

    // Split if contains ": Key Takeaway" or similar
    if (html.match(/Answer: [A-Z]: .+Takeaway/i)) {
      const parts = html.split(/:(?=\s+Key Takeaway)/i);
      if (parts.length > 1) {
        $p.html(parts[0]);
        $p.after('<h4>' + parts[1].trim() + '</h4>');
      }
    }

    // Split if has "Problem:" embedded with other content
    html = $p.html();
    if (html.includes('Solve for x:') && html.includes('A. ')) {
      const problemText = html.substring(0, html.indexOf('A. '));
      const choicesText = html.substring(html.indexOf('A. '));
      $p.html(problemText);
      $p.after('<p>' + choicesText + '</p>');
    }
  });

  // Final cleanup: remove empty elements
  $('p:empty, div:empty').remove();

  let cleanHtml = $.html('.lesson-content');

  // Remove excessive whitespace
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');

  return cleanHtml;
}

async function reformatAllMath() {
  console.log('🎨 Comprehensively reformatting all math lessons...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${lessons.length} lessons\n`);

  let successCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title}`);

    try {
      const reformatted = comprehensiveReformat(lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: reformatted,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Reformatted`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully reformatted: ${successCount}/${lessons.length}`);
  console.log('='.repeat(60));
}

reformatAllMath();
