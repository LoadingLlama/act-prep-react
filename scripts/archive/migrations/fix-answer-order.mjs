import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function fixAnswerOrder(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Find all "Answer: X" paragraphs
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html().trim();

    // Check if this is an answer paragraph
    if (html.match(/^<strong>Answer:\s*[A-D]<\/strong>$/) || html.match(/^Answer:\s*[A-D]\s*$/)) {
      const nextP = $p.next('p');

      // If next paragraph has formula work (mathematical symbols)
      if (nextP.length > 0 && nextP.html().match(/[=×÷]|A =|P =|\d+\s*[×÷]/)) {
        // Move answer after the formula paragraph
        const answerHtml = html.includes('<strong>') ? html : '<strong>' + html + '</strong>';
        nextP.after('<p>' + answerHtml + '</p>');
        $p.remove();
      }
    }
  });

  // Get clean HTML
  let cleanHtml = $.html('.lesson-content');

  return cleanHtml;
}

async function fixAnswerOrderAll() {
  console.log('🔄 Fixing answer/solution order in all math lessons...\n');

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
      const fixed = fixAnswerOrder(lesson.content);

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
        console.log(`  ✅ Fixed`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully fixed: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

fixAnswerOrderAll();
