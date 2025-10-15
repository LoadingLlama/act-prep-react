import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function cleanMathLesson(html) {
  const $ = cheerio.load(html, {
    xmlMode: false,
    decodeEntities: false
  });

  // Remove all SVG elements
  $('svg').remove();

  // Remove defs, markers (SVG artifacts)
  $('defs, marker').remove();

  // Remove emojis from all text nodes
  $('*').each(function() {
    const el = $(this);
    el.contents().each(function() {
      if (this.type === 'text') {
        this.data = this.data.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
      }
    });
  });

  // Remove ALL inline styles
  $('[style]').removeAttr('style');

  // Find and classify divs - but only top-level concept divs, not nested ones
  $('div').not('.lesson-content').each(function() {
    const $div = $(this);
    const $h4 = $div.find('> h4').first(); // Only direct h4 children
    const hasDirectP = $div.find('> p').length > 0;

    // Skip if this div is already processed or is nested inside another classified div
    if ($div.attr('class') && $div.attr('class') !== '') {
      return;
    }

    if ($h4.length > 0) {
      const h4Text = $h4.text().toLowerCase().trim();

      if (h4Text.includes('perimeter') || h4Text.includes('area')) {
        $div.attr('class', 'concept-box');
      } else if (h4Text.includes('rectangle') || h4Text.includes('square') || h4Text.includes('triangle') || h4Text.includes('circle') || h4Text.includes('trapezoid')) {
        $div.attr('class', 'concept-box');
      } else if (h4Text.includes('remember') || h4Text.includes('tip')) {
        $div.attr('class', 'tip-box');
      } else if (h4Text.includes('example')) {
        $div.attr('class', 'example-box');
      } else if (h4Text.includes('takeaway') || h4Text.includes('key') || h4Text.includes('bottom line')) {
        $div.attr('class', 'key-takeaway');
      } else {
        // Generic concept box for h4 + content
        $div.attr('class', 'concept-box');
      }
    } else {
      const divText = $div.text().toLowerCase().trim();

      if (divText.includes('solution:')) {
        $div.attr('class', 'example-box');
      } else if (divText.includes('problem:')) {
        $div.attr('class', 'example-box');
      }
      // Otherwise, remove the div class attribute (let it be unstyled)
    }
  });

  // Clean up empty divs (except lesson-content)
  $('div:empty').not('.lesson-content').remove();

  // Remove nested concept-box divs (flatten them)
  $('.concept-box .concept-box').each(function() {
    const $inner = $(this);
    $inner.removeClass('concept-box');
  });

  // Get only the lesson-content div's HTML
  const cleanHtml = $('.lesson-content').html();

  // Wrap it back in the lesson-content div
  const finalHtml = `<div class="lesson-content">\n${cleanHtml}\n</div>`;

  // Remove excessive whitespace
  return finalHtml.replace(/\n\s*\n\s*\n/g, '\n\n');
}

async function cleanAllMathLessons() {
  console.log('🔍 Fetching all math lessons...');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error fetching lessons:', error);
    return;
  }

  console.log(`✅ Found ${lessons.length} math lessons\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title}`);

    try {
      const originalLength = lesson.content.length;
      const cleanedContent = cleanMathLesson(lesson.content);
      const cleanedLength = cleanedContent.length;

      console.log(`  📏 ${originalLength} → ${cleanedLength} chars (${Math.round((1 - cleanedLength/originalLength) * 100)}% reduction)`);

      // Update in database
      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: cleanedContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Update failed:`, updateError.message);
        errorCount++;
      } else {
        console.log(`  ✅ Updated successfully`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Processing error:`, err.message);
      errorCount++;
    }

    console.log(''); // blank line
  }

  console.log('='.repeat(50));
  console.log(`✅ Successfully updated: ${successCount} lessons`);
  console.log(`❌ Failed: ${errorCount} lessons`);
  console.log('='.repeat(50));
}

cleanAllMathLessons();
