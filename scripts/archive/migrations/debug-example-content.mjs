/**
 * Debug: Show exact content around Example 1
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

// Find Example 1 and show 800 characters
const ex1Index = data.content.indexOf('Example 1');
if (ex1Index >= 0) {
  const snippet = data.content.substring(ex1Index, ex1Index + 800);
  console.log('RAW CONTENT AROUND EXAMPLE 1:\n');
  console.log(snippet);
  console.log('\n\n');

  // Show with escaped characters visible
  console.log('WITH ESCAPED CHARS:\n');
  console.log(JSON.stringify(snippet, null, 2));
}
