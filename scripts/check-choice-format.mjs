/**
 * Check how NO CHANGE is formatted in choices array vs explanation
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data: example } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('id', '60bc14d2-a169-4705-a697-01da657af929')
    .single();

  console.log('Example:', example.title);
  console.log('\nChoices array structure:');
  console.log(JSON.stringify(example.choices, null, 2));

  console.log('\n' + '='.repeat(80));
  console.log('Explanation text (first 500 chars):');
  console.log('='.repeat(80));
  console.log(example.answer_explanation.substring(0, 500));
}

check().then(() => process.exit(0));
