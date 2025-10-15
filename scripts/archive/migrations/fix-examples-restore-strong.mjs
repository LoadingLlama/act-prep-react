/**
 * Restore <strong> tags for Problem: and Solution: in examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing examples by restoring strong tags...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Restore <strong> tags around "Problem:" and "Solution:" in examples
content = content.replace(/Problem:/g, '<strong>Problem:</strong>');
content = content.replace(/Solution:/g, '<strong>Solution:</strong>');

console.log('✅ Restored <strong> tags for Problem: and Solution:');

// Update in database
const { error } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-angles');

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log('💾 Examples should work now!');
}
