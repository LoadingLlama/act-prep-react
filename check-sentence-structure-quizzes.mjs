import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function check() {
  console.log('Looking for sentence-structure lesson...\n');
  
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('id, title, lesson_key')
    .eq('lesson_key', 'sentence-structure')
    .single();

  if (error) {
    console.log('Error finding lesson:', error);
    return;
  }

  console.log('Lesson found:');
  console.log('  ID:', lesson.id);
  console.log('  Title:', lesson.title);
  console.log('  Key:', lesson.lesson_key);

  // Now check for quizzes
  const { data: quizzes, error: quizError } = await supabase
    .from('quizzes')
    .select('id, title, quiz_type, position, is_required')
    .eq('lesson_id', lesson.id)
    .order('position');

  console.log('\n--- QUIZZES FOR THIS LESSON ---');
  console.log('Total quizzes:', quizzes?.length || 0);
  
  if (quizzes && quizzes.length > 0) {
    quizzes.forEach((q, idx) => {
      console.log(`\n${idx + 1}. ${q.title}`);
      console.log(`   Type: ${q.quiz_type}`);
      console.log(`   Position: ${q.position}`);
      console.log(`   Required: ${q.is_required}`);
      console.log(`   ID: ${q.id}`);
    });
  } else {
    console.log('❌ NO QUIZZES FOUND!');
  }
}

check().catch(console.error);
