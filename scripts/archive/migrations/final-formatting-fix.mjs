import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Load the corrected geometry angles lesson
const improvedGeometryAngles = fs.readFileSync('./improved-geometry-angles-final.html', 'utf8');

function finalFormatCleanup(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // 1. Add spacing between major sections (after h3)
  $('h3').each(function() {
    const $h3 = $(this);
    $h3.css('margin-top', '2rem');
  });

  // 2. Add spacing for h4 (subsections)
  $('h4').each(function() {
    const $h4 = $(this);
    $h4.css('margin-top', '1.5rem');
  });

  // 3. Ensure paragraphs have proper spacing
  $('p').each(function() {
    const $p = $(this);
    if (!$p.attr('style')) {
      $p.css('margin', '0.75rem 0');
    }
  });

  // 4. Fix any remaining content on same line issues
  // Convert any h4 followed immediately by text into proper structure
  $('h4').each(function() {
    const $h4 = $(this);
    const next = $h4.next();

    // If h4 has text content mixed with next element, separate them
    if (next.length && next.get(0).type === 'text') {
      const text = next.text().trim();
      if (text.length > 0) {
        next.replaceWith('<p>' + text + '</p>');
      }
    }
  });

  // 5. Ensure lists have proper spacing
  $('ul, ol').each(function() {
    const $list = $(this);
    $list.css('margin', '1rem 0');
    $list.css('padding-left', '2rem');
  });

  // 6. Ensure tables have proper spacing
  $('table').each(function() {
    const $table = $(this);
    if (!$table.attr('style')) {
      $table.attr('style', 'width: 100%; border-collapse: collapse; margin: 1.5rem 0;');
    }
  });

  // 7. Make sure SVGs have proper spacing
  $('svg').each(function() {
    const $svg = $(this);
    const currentStyle = $svg.attr('style') || '';
    if (!currentStyle.includes('margin')) {
      $svg.attr('style', currentStyle + ' margin: 1.5rem auto;');
    }
  });

  // 8. Clean up any inline text between elements
  $('.lesson-content').contents().each(function() {
    if (this.type === 'text') {
      const text = $(this).text().trim();
      // If text node has substantial content, wrap it
      if (text.length > 10 && !text.match(/^\s*$/)) {
        $(this).replaceWith('<p>' + text + '</p>');
      } else if (text.match(/^\s*$/)) {
        // Remove whitespace-only text nodes
        $(this).remove();
      }
    }
  });

  return $.html('.lesson-content');
}

async function applyFinalFormatting() {
  console.log('✨ Applying final formatting fixes to all lessons...\n');

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
      let formatted;

      // Use improved version for geometry-angles
      if (lesson.lesson_key === 'geometry-angles') {
        formatted = improvedGeometryAngles;
      } else {
        // Apply final formatting to all other lessons
        formatted = finalFormatCleanup(lesson.content);
      }

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: formatted,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Formatted`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully formatted: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

applyFinalFormatting();
