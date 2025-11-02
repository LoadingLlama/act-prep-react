/**
 * Check the actual structure of examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkStructure() {
  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log('Raw example data:');
  console.log(JSON.stringify(examples[0], null, 2));
}

checkStructure().then(() => process.exit(0));
