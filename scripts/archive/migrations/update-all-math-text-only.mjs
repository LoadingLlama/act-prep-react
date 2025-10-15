import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function makeTextOnly(html) {
  const $ = cheerio.load(html, {
    xmlMode: false,
    decodeEntities: false
  });

  // Remove SVGs and artifacts
  $('svg, defs, marker').remove();

  // Remove emojis
  $('*').each(function() {
    $(this).contents().each(function() {
      if (this.type === 'text') {
        this.data = this.data.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
      }
    });
  });

  // Remove ALL styles and classes (except lesson-content)
  $('[style]').removeAttr('style');
  $('*').not('.lesson-content').removeAttr('class');

  // Recursively unwrap ALL divs (except lesson-content)
  let foundDivs = true;
  let maxIterations = 100; // Safety limit
  let iterations = 0;

  while (foundDivs && iterations < maxIterations) {
    const $divs = $('div').not('.lesson-content');
    if ($divs.length === 0) {
      foundDivs = false;
    } else {
      $divs.first().replaceWith(function() {
        return $(this).contents();
      });
    }
    iterations++;
  }

  // Clean up empty elements
  $('p:empty, h4:empty').remove();

  // Get the cleaned HTML
  let cleanHtml = $('.lesson-content').html();

  // Remove excessive whitespace
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n').trim();

  return `<div class="lesson-content">\n${cleanHtml}\n</div>`;
}

async function updateAllMathLessons() {
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
      const textOnlyContent = makeTextOnly(lesson.content);
      const newLength = textOnlyContent.length;

      console.log(`  📏 ${originalLength} → ${newLength} chars (${Math.round((1 - newLength/originalLength) * 100)}% reduction)`);

      // Update in database
      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: textOnlyContent,
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

    console.log('');
  }

  console.log('='.repeat(60));
  console.log(`✅ Successfully updated: ${successCount} lessons`);
  console.log(`❌ Failed: ${errorCount} lessons`);
  console.log('='.repeat(60));
}

updateAllMathLessons();
