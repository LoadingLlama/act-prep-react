import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function fixFormulaAlignment(html) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });

  // Fix multi-line formulas - convert to proper display
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // Check if this is a multi-line formula (has = and line breaks)
    if (html.includes('=') && html.match(/\n\s*=/)) {
      // This is a multi-line formula - clean it up but preserve structure
      const lines = html.split('\n').map(line => line.trim()).filter(line => line.length > 0);

      if (lines.length > 1) {
        // Create a clean multi-line formula display
        const formulaHtml = lines.join('<br>\n');
        $p.html(formulaHtml);
      }
    }
  });

  return $.html('.lesson-content');
}

async function fixAllFormulas() {
  console.log('📐 Fixing formula alignment in all lessons...\n');

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
      const fixed = fixFormulaAlignment(lesson.content);

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

fixAllFormulas();
