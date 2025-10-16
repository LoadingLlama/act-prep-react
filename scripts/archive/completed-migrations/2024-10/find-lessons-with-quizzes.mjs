import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function findQuizzes() {
  console.log('\n🔍 FINDING ALL LESSONS WITH QUIZZES');
  console.log('='.repeat(80));

  // Get all quizzes
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id, title, lesson_key')
    .order('lesson_key');

  console.log(`\n📝 Found ${quizzes.length} quizzes:\n`);

  for (const quiz of quizzes) {
    // Count questions
    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);

    console.log(`  ${quiz.lesson_key}: "${quiz.title}" (${questions.length} questions)`);
  }

  console.log('\n' + '='.repeat(80));
}

findQuizzes();
