import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function countQuestions() {
  console.log('\n📊 COUNTING QUIZ QUESTIONS');
  console.log('='.repeat(80));

  const lessonKeys = ['3.4', '3.5', '3.6'];

  for (const lessonKey of lessonKeys) {
    const { data: lesson } = await supabase
      .from('lesson_metadata')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    if (!lesson) continue;

    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id, title')
      .eq('lesson_id', lesson.id);

    if (!quizzes || quizzes.length === 0) continue;

    const quiz = quizzes[0];
    console.log(`\n📚 ${quiz.title}`);
    console.log(`   Quiz ID: ${quiz.id}`);

    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);

    console.log(`   Current questions: ${questions?.length || 0}`);
    console.log(`   Need to add: ${10 - (questions?.length || 0)} more questions`);
  }

  console.log('\n' + '='.repeat(80));
}

countQuestions();
