/**
 * Get the next batch of worst examples (long + complex)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function getWorstBatch() {
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*');

  // Find examples that are both long (>1000 chars) AND complex (>25 lines)
  const worst = examples
    .filter(ex => {
      const exp = ex.answer_explanation || '';
      return exp.length > 1000 && exp.split('\n').length > 25;
    })
    .sort((a, b) => b.answer_explanation.length - a.answer_explanation.length)
    .slice(0, 10);

  for (const ex of worst) {
    console.log('\n' + '='.repeat(80));
    console.log(`📝 ${ex.title}`);
    console.log(`ID: ${ex.id}`);
    console.log(`Length: ${ex.answer_explanation.length} chars`);
    console.log(`Lines: ${ex.answer_explanation.split('\n').length}`);
    console.log('='.repeat(80));
    console.log(ex.answer_explanation);
  }

  console.log('\n\nFOUND', worst.length, 'examples that are both >1000 chars and >25 lines');
}

getWorstBatch().then(() => process.exit(0));
