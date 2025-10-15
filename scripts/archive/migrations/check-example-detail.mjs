/**
 * Check detailed format of one example
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
  .select('lesson_key, content')
  .eq('lesson_key', 'geometry-angles')
  .single();

// Extract first example
const exampleMatch = data.content.match(/<h4[^>]*>Example 1<\/h4>[\s\S]*?(?=<h[34]|<h4[^>]*>Example 2)/i);

console.log('FULL EXAMPLE 1:');
console.log(exampleMatch[0]);
