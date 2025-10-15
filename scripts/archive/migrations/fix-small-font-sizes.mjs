/**
 * Fix all paragraphs with smaller font-size (0.9rem) to use 16px
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing small font sizes...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Count before
const before = (content.match(/font-size: 0\.9rem/g) || []).length;
console.log(`Found ${before} instances of font-size: 0.9rem`);

// Replace all font-size: 0.9rem with font-size: 16px
// Also update line-height from 1.6 to 1.7
content = content.replace(
  /font-size: 0\.9rem; line-height: 1\.6;/g,
  'font-size: 16px; line-height: 1.7;'
);

// Count after
const after = (content.match(/font-size: 0\.9rem/g) || []).length;
console.log(`After fix: ${after} instances remaining`);
console.log(`✅ Fixed ${before - after} instances`);

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
  console.log('\n💾 Font sizes updated successfully!');
}
