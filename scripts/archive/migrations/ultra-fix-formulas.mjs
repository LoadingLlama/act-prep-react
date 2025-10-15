import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function ultraFixLesson(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // AGGRESSIVE FIX 1: Completely remove and rebuild broken square root formulas
  $('.lesson-content').find('*').contents().each(function() {
    if (this.type === 'tag' && this.name === 'span') {
      const $span = $(this);
      const text = $span.text();

      // If span starts with √, this is a square root formula
      if (text.startsWith('√')) {
        // Replace the entire nested structure with clean text
        $span.replaceWith(text);
      }
    }
  });

  // Remove ALL remaining empty spans
  $('span').each(function() {
    const $span = $(this);
    if ($span.text().trim() === '' || $span.children().length === 0) {
      $span.remove();
    }
  });

  // AGGRESSIVE FIX 2: Fix "Answer Answer: B" and similar duplications
  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();

    // Remove duplicate "Answer"
    html = html.replace(/Answer\s+<strong>Answer:/g, '<strong>Answer:');
    html = html.replace(/Answer\s+Answer:/g, 'Answer:');

    // Remove trailing ": <strong>Problem:</strong>"
    html = html.replace(/:\s*<strong>Problem:<\/strong>/g, '');
    html = html.replace(/<strong>Answer:\s*([A-D])<\/strong><br><strong>Problem:<\/strong>/g, '<strong>Answer: $1</strong>');

    // Fix standalone "Answer:" followed by letter
    html = html.replace(/Answer:\s*([A-D])\s*$/g, '<strong>Answer: $1</strong>');
    html = html.replace(/^Answer:\s*([A-D])/g, '<strong>Answer: $1</strong>');

    $p.html(html);
  });

  // AGGRESSIVE FIX 3: Merge formula fragments back together
  let previousWasFormula = false;
  let formulaBuffer = '';

  $('.lesson-content > *').each(function() {
    const $el = $(this);

    if ($el.is('p')) {
      const text = $el.text().trim();

      // Check if this is a formula line (has =, +, -, ×, ÷, numbers)
      const isFormula = text.match(/^[0-9\s\-+×÷=()√.]+$/) && text.length < 40;

      if (isFormula) {
        if (previousWasFormula) {
          // Append to buffer with line break
          formulaBuffer += '<br>' + text;
        } else {
          formulaBuffer = text;
        }
        previousWasFormula = true;
        // Mark for removal
        $el.attr('data-remove', 'true');
      } else if (previousWasFormula && formulaBuffer) {
        // Previous was formula, this is not - insert the buffered formula before this element
        $el.before('<p style="margin: 0.75rem 0;">' + formulaBuffer + '</p>');
        formulaBuffer = '';
        previousWasFormula = false;
      } else {
        previousWasFormula = false;
        formulaBuffer = '';
      }
    } else {
      // If we hit a non-paragraph and have buffered formula, insert it
      if (formulaBuffer) {
        $el.before('<p style="margin: 0.75rem 0;">' + formulaBuffer + '</p>');
        formulaBuffer = '';
      }
      previousWasFormula = false;
    }
  });

  // Remove marked formula fragments
  $('[data-remove="true"]').remove();

  // AGGRESSIVE FIX 4: Clean up Problem and Solution labels
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html().trim();

    // If paragraph is ONLY "<strong>Problem:</strong>" or "<strong>Solution:</strong>"
    if (html === '<strong>Problem:</strong>' || html === '<strong>Solution:</strong>') {
      // Check if next element should be merged
      const $next = $p.next('p');
      if ($next.length && !$next.html().includes('<strong>')) {
        // Merge them
        $p.html($p.html() + ' ' + $next.html());
        $next.remove();
      }
    }
  });

  // AGGRESSIVE FIX 5: Remove duplicate paragraphs (exact matches)
  const seen = new Map();
  $('p').each(function() {
    const $p = $(this);
    const text = $p.text().trim();
    const key = text.substring(0, 150).toLowerCase();

    if (key.length === 0) {
      $p.remove();
      return;
    }

    if (seen.has(key)) {
      // Check if this is an answer - keep the one with <strong>
      if (text.match(/Answer:\s*[A-D]/)) {
        if ($p.html().includes('<strong>') && !seen.get(key).html().includes('<strong>')) {
          // This one is better, remove the old one
          seen.get(key).remove();
          seen.set(key, $p);
        } else {
          // Keep the old one
          $p.remove();
        }
      } else {
        $p.remove();
      }
    } else {
      seen.set(key, $p);
    }
  });

  // AGGRESSIVE FIX 6: Final formatting pass

  // Remove ALL styles first
  $('*').removeAttr('style');

  // Apply perfect styles
  $('.lesson-intro').attr('style', 'margin: 0.75rem 0;');
  $('h3').attr('style', 'margin-top: 2rem;');
  $('h4').attr('style', 'margin-top: 1.5rem;');

  $('p').not('.lesson-intro').each(function() {
    const $p = $(this);
    const html = $p.html().toLowerCase();

    if (html.includes('remember') || html.includes('important') ||
        $p.prev().text().toLowerCase().includes('remember')) {
      $p.attr('style', 'background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;');
    } else {
      $p.attr('style', 'margin: 0.75rem 0;');
    }
  });

  $('ul, ol').attr('style', 'margin: 1rem 0; padding-left: 2rem;');
  $('table').attr('style', 'width: 100%; border-collapse: collapse; margin: 1.5rem 0;');
  $('svg').attr('style', 'display: block; margin: 1.5rem auto;');

  // Remove h2
  $('h2').each(function() {
    $(this).replaceWith('<h3>' + $(this).html() + '</h3>');
  });

  // Remove empty elements
  $('p:empty, h3:empty, h4:empty, li:empty, ul:empty, ol:empty, span:empty').remove();

  return $.html('.lesson-content');
}

async function ultraFixAll() {
  console.log('⚡ ULTRA FIX - Aggressively fixing ALL formulas and examples...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  let successCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title}`);

    try {
      const fixed = ultraFixLesson(lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: fixed,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Ultra fixed!`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`✅ Successfully ultra-fixed: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(70));
}

ultraFixAll();
