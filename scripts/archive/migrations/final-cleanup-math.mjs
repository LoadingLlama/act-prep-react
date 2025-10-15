import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function finalCleanup(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Remove ALL inline styles that were added during restructuring
  $('[style]').removeAttr('style');

  // Split paragraphs that were incorrectly combined
  $('p').each(function() {
    const $p = $(this);
    let text = $p.html();

    // If a paragraph contains multiple concepts separated by " - " or starts with Area/Perimeter
    if (text.includes(' - The <strong>') || text.match(/Perimeter.*Area/)) {
      // This is an incorrectly combined paragraph, split it back
      const parts = text.split(/\s*-\s*(?=The <strong>)/);
      if (parts.length > 1) {
        $p.html(parts[0]);
        // Add remaining parts as new paragraphs after this one
        for (let i = 1; i < parts.length; i++) {
          $p.after('<p>' + parts[i] + '</p>');
        }
      }
    }

    // If paragraph contains "Answer: " with formula before it
    text = $p.html();
    if (text.includes(': Answer: ')) {
      const [formula, answer] = text.split(': Answer: ');
      $p.html(formula);
      $p.after('<p><strong>Answer: ' + answer + '</strong></p>');
    }
  });

  // Clean up empty paragraphs
  $('p:empty').remove();

  // Get clean HTML
  let cleanHtml = $.html('.lesson-content');

  // Remove excessive whitespace
  cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n+/g, '\n\n');

  return cleanHtml;
}

async function finalCleanupAllMath() {
  console.log('🧹 Final cleanup of all math lessons...\n');

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
      const cleaned = finalCleanup(lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: cleaned,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Cleaned`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully cleaned: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

finalCleanupAllMath();
