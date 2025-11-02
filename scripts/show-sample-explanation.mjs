/**
 * Show a complete sample explanation
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function showSample() {
  // Get one example to show the full explanation
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(1);

  const ex = examples[0];

  console.log('Example Title:', ex.title);
  console.log('Correct Answer:', ex.correct_answer);
  console.log('\nFull Explanation:');
  console.log('='.repeat(80));
  console.log(ex.answer_explanation);
  console.log('='.repeat(80));
}

showSample().then(() => process.exit(0));
