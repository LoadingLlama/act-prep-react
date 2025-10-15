/**
 * Find the structure of mini sections like Acute Angles Definition/Examples
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

const content = data.content;

// Find Acute Angles section
const index = content.indexOf('Acute Angles');
if (index !== -1) {
  const context = content.substring(index, index + 800);
  console.log('Acute Angles section structure:');
  console.log('---');
  console.log(context);
  console.log('---');
}
