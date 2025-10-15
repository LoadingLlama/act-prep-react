import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkLesson() {
  const lessonId = '4998d0fa-2f94-44ef-82c7-089a1a9b6419';

  console.log('Checking lesson ID: ' + lessonId + '\n');

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id, title, quiz_type')
    .eq('lesson_id', lessonId);

  console.log('Quizzes for this lesson: ' + (quizzes?.length || 0));

  for (const quiz of quizzes || []) {
    const { data: qs } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);
    
    console.log('  - ' + quiz.title + ' (' + quiz.quiz_type + '): ' + (qs?.length || 0) + ' questions');
  }

  const { data: inLessons } = await supabase.from('lessons').select('id').eq('id', lessonId).single();
  const { data: inMetadata } = await supabase.from('lesson_metadata').select('id').eq('id', lessonId).single();

  console.log('\nLesson found in lessons table: ' + (inLessons ? 'yes' : 'no'));
  console.log('Lesson found in lesson_metadata table: ' + (inMetadata ? 'yes' : 'no'));
}

checkLesson().catch(console.error);
