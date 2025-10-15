/**
 * Check final quiz for diagrams
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get geometry-angles lesson UUID
const { data: lessonData } = await supabase
  .from('lessons')
  .select('id, lesson_key')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('Lesson ID:', lessonData.id);

// Get quizzes for this lesson
const { data: quizzes } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id)
  .order('position');

console.log('\nTotal quizzes:', quizzes.length);

for (const quiz of quizzes) {
  console.log(`\n${'='.repeat(60)}`);
  console.log('Quiz object:', JSON.stringify(quiz, null, 2));
}
