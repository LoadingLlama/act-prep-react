/**
 * Check if manual rewrites were applied correctly
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkManual() {
  // Check the Variable Expression with Percents example
  const { data } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('id', 'ef7c906b-3e78-4775-b964-366a27f61a55')
    .single();

  console.log('Example Title:', data.title);
  console.log('Correct Answer:', data.correct_answer);
  console.log('\nExplanation length:', data.answer_explanation.length, 'characters');
  console.log('\nFirst 500 characters:');
  console.log('='.repeat(80));
  console.log(data.answer_explanation.substring(0, 500));
  console.log('...');
  console.log('='.repeat(80));
}

checkManual().then(() => process.exit(0));
