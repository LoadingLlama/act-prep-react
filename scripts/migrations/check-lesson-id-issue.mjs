import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkLessonIdIssue() {
  // Check the sentence-structure lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, title, lesson_key')
    .eq('lesson_key', 'sentence-structure')
    .single();

  console.log('Sentence Structure Lesson:');
  console.log('  ID:', lesson.id);
  console.log('  Title:', lesson.title);
  console.log('  Key:', lesson.lesson_key);

  // Check quizzes for this exact ID
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id, title, quiz_type, position')
    .eq('lesson_id', lesson.id);

  console.log('\nQuizzes for this ID:', quizzes?.length || 0);
  quizzes?.forEach(q => console.log('  -', q.title, `(pos: ${q.position})`));

  // Also check lesson_metadata table
  const { data: metadata } = await supabase
    .from('lesson_metadata')
    .select('id, title, lesson_key')
    .eq('lesson_key', 'sentence-structure')
    .single();

  if (metadata) {
    console.log('\nAlso found in lesson_metadata:');
    console.log('  ID:', metadata.id);
    console.log('  Title:', metadata.title);
    
    // Check if this ID has quizzes
    const { data: metaQuizzes } = await supabase
      .from('quizzes')
      .select('id, title')
      .eq('lesson_id', metadata.id);
    
    console.log('  Quizzes:', metaQuizzes?.length || 0);
  }
}

checkLessonIdIssue().catch(console.error);
