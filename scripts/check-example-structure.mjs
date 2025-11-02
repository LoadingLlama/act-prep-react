/**
 * Check the actual structure of one example
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkStructure() {
  const { data, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Example structure:');
  console.log(JSON.stringify(data, null, 2));
}

checkStructure();
