/**
 * Get batch 3 - remaining long + complex examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function getBatch3() {
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('id, title, answer_explanation');

  // Find examples that are both >900 chars AND >22 lines
  const batch3 = examples
    .filter(ex => {
      const exp = ex.answer_explanation || '';
      return exp.length > 900 && exp.split('\n').length > 22;
    })
    .sort((a, b) => b.answer_explanation.length - a.answer_explanation.length);

  console.log(`Found ${batch3.length} examples that are >900 chars and >22 lines\n`);

  batch3.slice(0, 10).forEach((ex, idx) => {
    console.log(`${idx + 1}. ${ex.title}`);
    console.log(`   ID: ${ex.id.substring(0, 8)}...`);
    console.log(`   Length: ${ex.answer_explanation.length} chars, Lines: ${ex.answer_explanation.split('\n').length}`);
    console.log('');
  });
}

getBatch3().then(() => process.exit(0));
