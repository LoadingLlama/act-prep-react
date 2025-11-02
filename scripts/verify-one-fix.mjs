/**
 * Verify one example was actually updated
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function verifyFix() {
  const { data, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('id', '599f8651-8e2d-4793-bb97-382a4a429f8a')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Title:', data.title);
  console.log('\nAnswer Explanation:');
  console.log(data.answer_explanation);
  console.log('\nLength:', data.answer_explanation.length, 'characters');
}

verifyFix();
