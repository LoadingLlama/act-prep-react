/**
 * Fix quiz position to appear after lesson content
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing quiz position for geometry-angles...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'geometry-angles')
  .single();

// Get the quiz
const { data: quiz } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id)
  .single();

console.log('Current quiz position:', quiz.position);
console.log('Updating to position: 1 (to appear after first text section)\n');

// Update quiz position to 1
const { error } = await supabase
  .from('quizzes')
  .update({ position: 1 })
  .eq('id', quiz.id);

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log('✅ Quiz position updated successfully!');
}
