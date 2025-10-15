/**
 * Fix degree symbols that are displaying as \(°\) instead of just °
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing degree symbols...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Count before
const before = (content.match(/\\\(°\\\)/g) || []).length;
console.log(`Found ${before} instances of \\(°\\)`);

// Replace all \(°\) with just °
content = content.replace(/\\\(°\\\)/g, '°');

// Count after
const after = (content.match(/\\\(°\\\)/g) || []).length;
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
  console.log('\n💾 Degree symbols fixed successfully!');
}
