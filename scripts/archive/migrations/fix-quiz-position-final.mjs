/**
 * Move quiz to the VERY END - after Key Takeaways
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Moving quiz to the very end...\n');

// Get lesson
const { data: lesson } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('Lesson ID:', lesson.id);

// Update quiz position to 100 (way after all text sections)
const { error } = await supabase
  .from('quizzes')
  .update({ position: 100 })
  .eq('lesson_id', lesson.id);

if (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}

console.log('✅ Quiz moved to position 100 (at the very end)');
console.log('✓ Quiz will now appear AFTER Key Takeaways');
