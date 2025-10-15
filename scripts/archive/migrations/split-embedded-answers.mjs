import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function splitEmbeddedAnswers(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Split paragraphs that have "Answer: X" embedded in them
  $('p').each(function() {
    const $p = $(this);
    let html = $p.html();

    // Pattern 1: "formula: Answer: X" or "text. Answer: X"
    if (html.match(/[.:]\s*<strong>Answer:\s*[A-D]<\/strong>/)) {
      const parts = html.split(/:\s*(<strong>Answer:\s*[A-D]<\/strong>)/);
      if (parts.length >= 2) {
        $p.html(parts[0]);
        $p.after('<p>' + parts[1] + '</p>');
      }
    } else if (html.match(/[.:]\s*Answer:\s*[A-D]/)) {
      const parts = html.split(/([.:]\s*)(Answer:\s*[A-D])/);
      if (parts.length >= 3) {
        $p.html(parts[0] + parts[1].trim());
        $p.after('<p><strong>' + parts[2] + '</strong></p>');
      }
    }

    // Pattern 2: "text. Answer: C" (with period and space)
    html = $p.html();
    if (html.match(/\.\s+Answer:\s*[A-D]\s*$/)) {
      const parts = html.split(/(\.\s+)(Answer:\s*[A-D]\s*)$/);
      if (parts.length >= 3) {
        $p.html(parts[0] + '.');
        $p.after('<p><strong>' + parts[2].trim() + '</strong></p>');
      }
    }

    // Pattern 3: Combined formulas/examples with colons
    html = $p.html();
    // "formula: formula2" where both contain math symbols
    if (html.match(/[=÷×]\s*:\s*[^<]*[=÷×]/)) {
      const parts = html.split(/\s*:\s*(?=[^<]*[=÷×])/);
      if (parts.length > 1 && parts[0].match(/[=÷×]/)) {
        $p.html(parts[0]);
        for (let i = 1; i < parts.length; i++) {
          $p.after('<p>' + parts[i] + '</p>');
        }
      }
    }
  });

  // Get clean HTML
  let cleanHtml = $.html('.lesson-content');

  return cleanHtml;
}

async function splitEmbeddedAnswersAll() {
  console.log('✂️  Splitting embedded answers in all math lessons...\n');

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
      const split = splitEmbeddedAnswers(lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: split,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Split`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully processed: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

splitEmbeddedAnswersAll();
