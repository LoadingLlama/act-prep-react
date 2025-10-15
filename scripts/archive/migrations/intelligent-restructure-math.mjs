import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function intelligentlyRestructure(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Combine consecutive short paragraphs (less than 50 chars) into one paragraph
  $('.lesson-content > p, .lesson-content p').each(function(index) {
    const $p = $(this);
    const text = $p.text().trim();

    // Skip if this paragraph is part of a list or has children elements
    if ($p.find('br, strong, em').length > 0 || text.length > 100) {
      return;
    }

    // Check next paragraph
    let $next = $p.next('p');
    if ($next.length === 0) {
      $next = $p.next().next('p'); // Skip one element
    }

    // If both paragraphs are short, combine them
    if ($next.length > 0) {
      const nextText = $next.text().trim();

      // Combine short fragments
      if (text.length < 50 && nextText.length < 100) {
        // Add connecting word if needed
        let connector = ' ';
        if (!text.endsWith('.') && !text.endsWith(':') && !text.endsWith('?')) {
          if (nextText.toLowerCase().startsWith('the ') ||
              nextText.toLowerCase().startsWith('how ') ||
              nextText.toLowerCase().startsWith('total ')) {
            connector = ' - ';
          } else {
            connector = ': ';
          }
        }

        $p.html($p.html() + connector + $next.html());
        $next.remove();
      }
    }
  });

  // Combine h4 headings that are followed by short explanation paragraphs
  $('h4').each(function() {
    const $h4 = $(this);
    const $nextP = $h4.next('p');

    if ($nextP.length > 0) {
      const nextText = $nextP.text().trim();

      // If next paragraph is very short (likely a continuation), integrate it better
      if (nextText.length < 80 && !nextText.includes('Example:') && !nextText.includes('Step ')) {
        // Keep as is, but ensure proper spacing
        $nextP.css('margin-top', '0.5rem');
      }
    }
  });

  // Convert standalone formula paragraphs into better formatted content
  $('p').each(function() {
    const $p = $(this);
    const text = $p.text().trim();

    // If paragraph is just a formula (contains =, ×, ÷, etc.)
    if (text.match(/^[a-z0-9\s\+\-×÷\=\(\)\/²³]+$/i) && text.includes('=')) {
      // Check if previous paragraph explains this formula
      const $prev = $p.prev('p');
      if ($prev.length > 0) {
        const prevText = $prev.text().trim();

        // If previous text doesn't end with colon or period, it might be explaining this formula
        if (!prevText.endsWith(':') && !prevText.endsWith('.')) {
          $prev.html($prev.html() + ': <strong>' + $p.html() + '</strong>');
          $p.remove();
        }
      }
    }
  });

  // Clean up excessive whitespace
  let cleanHtml = $.html('.lesson-content');
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');

  return cleanHtml;
}

async function restructureAllMathLessons() {
  console.log('🔄 Intelligently restructuring all math lessons...\n');

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
  let errorCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title}`);

    try {
      const restructured = intelligentlyRestructure(lesson.content);
      const oldLength = lesson.content.length;
      const newLength = restructured.length;

      console.log(`  📏 ${oldLength} → ${newLength} chars`);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: restructured,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Update failed:`, updateError.message);
        errorCount++;
      } else {
        console.log(`  ✅ Updated`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
      errorCount++;
    }

    console.log('');
  }

  console.log('='.repeat(60));
  console.log(`✅ Successfully updated: ${successCount} lessons`);
  console.log(`❌ Failed: ${errorCount} lessons`);
  console.log('='.repeat(60));
}

restructureAllMathLessons();
