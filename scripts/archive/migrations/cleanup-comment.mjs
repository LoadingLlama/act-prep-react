/**
 * Remove the comment marker left behind
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

let content = data.content;

// Remove the comment marker
content = content.replace('<!-- KEY_TAKEAWAYS_MOVED -->', '');

const { error: updateError } = await supabase
  .from('lessons')
  .update({ content: content })
  .eq('lesson_key', 'geometry-angles');

if (updateError) {
  console.error('Error updating:', updateError);
  process.exit(1);
}

console.log('✅ Cleaned up comment marker');
