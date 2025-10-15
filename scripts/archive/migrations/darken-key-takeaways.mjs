/**
 * Make Key Takeaways text even darker green (#047857)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Making Key Takeaways darker green...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Change all #059669 to #047857 (darker green)
const oldColor = '#059669';
const newColor = '#047857';

content = content.replace(new RegExp(oldColor, 'g'), newColor);

console.log(`✅ Changed all instances of ${oldColor} to ${newColor}`);

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
  console.log('\n💾 Key Takeaways darkened successfully!');
}
