import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function completelyRebuildLesson(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // STEP 1: Remove ALL inline styles and start fresh
  $('*').removeAttr('style');

  // STEP 2: Apply the gold standard formatting

  // lesson-intro gets specific margin
  $('.lesson-intro').css('margin', '0.75rem 0');

  // h3 (main sections) get top margin
  $('h3').css('margin-top', '2rem');

  // h4 (subsections) get smaller top margin
  $('h4').css('margin-top', '1.5rem');

  // All paragraphs get consistent margin
  $('p').not('.lesson-intro').each(function() {
    const $p = $(this);
    // Check if it has the yellow highlight box
    if ($p.html().includes('background:') || $p.attr('style')?.includes('background')) {
      $p.css({
        'background': '#FFF3CD',
        'padding': '1rem',
        'border-left': '4px solid #FFA500',
        'margin': '1rem 0'
      });
    } else {
      $p.css('margin', '0.75rem 0');
    }
  });

  // Lists get proper spacing
  $('ul, ol').css({
    'margin': '1rem 0',
    'padding-left': '2rem'
  });

  // Tables get proper styling
  $('table').css({
    'width': '100%',
    'border-collapse': 'collapse',
    'margin': '1.5rem 0'
  });

  // SVGs get proper centering
  $('svg').css({
    'display': 'block',
    'margin': '1.5rem auto'
  });

  // STEP 3: Remove duplicates systematically
  const seenContent = new Set();
  const seenListItems = new Set();

  // Collect list items first
  $('li').each(function() {
    seenListItems.add($(this).text().trim().toLowerCase());
  });

  // Remove duplicate paragraphs
  $('p').each(function() {
    const $p = $(this);
    const text = $p.text().trim().toLowerCase();

    if (text.length === 0) {
      $p.remove();
      return;
    }

    // If paragraph duplicates a list item, remove it
    if (seenListItems.has(text)) {
      $p.remove();
      return;
    }

    // If exact duplicate paragraph
    if (seenContent.has(text)) {
      $p.remove();
      return;
    }

    seenContent.add(text);
  });

  // STEP 4: Fix structural issues

  // Remove any h2 tags (convert to h3)
  $('h2').each(function() {
    $(this).replaceWith('<h3>' + $(this).html() + '</h3>');
  });

  // Clean up broken formulas and spans
  $('span:empty').remove();

  // Fix "Answer: X: Problem:" patterns (clear mistakes)
  $('*').contents().each(function() {
    if (this.type === 'text') {
      this.data = this.data.replace(/Answer:\s*[A-D]:\s*<strong>Problem:<\/strong>/g, 'Answer: $1');
    }
  });

  // Remove trailing colons after answers
  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();
    if (html.match(/Answer:\s*[A-D]:\s*$/)) {
      $p.html(html.replace(/:\s*$/, ''));
    }
  });

  // STEP 5: Ensure Key Takeaway is always h4, not h3
  $('h3').each(function() {
    const $h3 = $(this);
    if ($h3.text().trim().toLowerCase() === 'key takeaway') {
      $h3.replaceWith('<h4>' + $h3.html() + '</h4>');
    }
  });

  // STEP 6: Clean up whitespace
  let cleanHtml = $.html('.lesson-content');
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n');
  cleanHtml = cleanHtml.replace(/>\s+</g, '><');

  return cleanHtml;
}

async function rebuildAllLessons() {
  console.log('🔨 COMPLETELY REBUILDING ALL MATH LESSONS FROM SCRATCH...\n');
  console.log('Using lesson 1.1 structure as the gold standard\n');

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
      const rebuilt = completelyRebuildLesson(lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: rebuilt,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Rebuilt to perfection`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully rebuilt: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
  console.log('\nAll lessons now match the gold standard structure!');
}

rebuildAllLessons();
