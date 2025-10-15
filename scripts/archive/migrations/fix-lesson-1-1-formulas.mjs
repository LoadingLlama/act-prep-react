import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixLesson1_1() {
  console.log('🔧 Fixing broken square root formulas in Lesson 1.1...\n');

  // Get lesson 1.1
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  const lesson = lessons[0]; // First lesson
  console.log('Lesson:', lesson.title);

  const $ = cheerio.load(lesson.content, { xmlMode: false, decodeEntities: false });

  // Find Example 1 heading
  let example1Found = false;
  $('h4').each(function() {
    if ($(this).text().trim() === 'Example 1') {
      example1Found = true;

      // Navigate to find the broken spans
      let $current = $(this).next();
      let brokenSpansFound = false;

      while ($current.length && !$current.is('h3, h4')) {
        // Look for the isolated span elements
        if ($current.is('span') && $current.text().trim() === '√') {
          if (!brokenSpansFound) {
            brokenSpansFound = true;

            // Count consecutive broken spans
            let spanCount = 0;
            let $span = $current;
            const spansToRemove = [];

            while ($span.length && $span.is('span') && $span.text().trim() === '√') {
              spansToRemove.push($span);
              spanCount++;
              $span = $span.next();
            }

            console.log(`Found ${spanCount} broken square root spans`);

            // Create the correct formula HTML
            const correctFormula = `<p style="margin: 0.75rem 0;">√(6 + 10) − 2√(6 − 2) = 0<br>√16 − 2√4 = 0</p>`;

            // Insert the correct formula before the broken spans
            $current.before(correctFormula);

            // Remove all broken spans
            spansToRemove.forEach($span => $span.remove());

            console.log('✅ Replaced broken spans with correct formula');
          }
        }

        $current = $current.next();
      }
    }
  });

  if (!example1Found) {
    console.log('❌ Example 1 not found');
    return;
  }

  // Get the updated HTML
  const updatedContent = $.html('.lesson-content');

  // Update the database
  const { error } = await supabase
    .from('lessons')
    .update({
      content: updatedContent,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (error) {
    console.log('❌ Error updating lesson:', error.message);
  } else {
    console.log('\n✅ Successfully fixed lesson 1.1!');
    console.log('\nVerifying the fix...');

    // Verify the fix
    const { data: updatedLesson } = await supabase
      .from('lessons')
      .select('content')
      .eq('id', lesson.id)
      .single();

    const $verify = cheerio.load(updatedLesson.content, { xmlMode: false, decodeEntities: false });
    const brokenSpans = $verify('span').filter(function() {
      return $(this).text().trim() === '√';
    }).length;

    if (brokenSpans === 0) {
      console.log('✅ Verification passed - no broken square root spans found');
    } else {
      console.log(`⚠️  Still found ${brokenSpans} broken spans`);
    }
  }
}

fixLesson1_1();
