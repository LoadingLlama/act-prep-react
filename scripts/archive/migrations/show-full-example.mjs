/**
 * Show full HTML of first example
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

// Extract first example
const match = data.content.match(/###EXAMPLE###([\s\S]*?)(?=###EXAMPLE###|###SECTION###|$)/);

if (match) {
  console.log('========== FULL FIRST EXAMPLE HTML ==========\n');
  console.log(match[1]);
  console.log('\n========== END ==========');
}
