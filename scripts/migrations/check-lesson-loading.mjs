import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkLesson() {
  // Check sentence-structure lesson
  const lessonKey = 'sentence-structure';
  
  console.log(`Looking for lesson with key: ${lessonKey}`);
  
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('id, title, lesson_key')
    .eq('lesson_key', lessonKey)
    .single();
  
  if (error) {
    console.log('Error:', error);
    return;
  }
  
  console.log('\nLesson found:', lesson);
  
  // Now check for quizzes
  const { data: quizzes, error: quizError } = await supabase
    .from('quizzes')
    .select('id, title, quiz_type, position, is_required')
    .eq('lesson_id', lesson.id)
    .order('position');
  
  console.log('\nQuizzes for this lesson:');
  console.log(`Found ${quizzes?.length || 0} quizzes`);
  quizzes?.forEach((q, idx) => {
    console.log(`  ${idx + 1}. ${q.title} (${q.quiz_type}) at position ${q.position}`);
  });
}

checkLesson().catch(console.error);
