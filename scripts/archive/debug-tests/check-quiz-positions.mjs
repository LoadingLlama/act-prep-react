import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkQuizzes() {
  console.log('\n🎯 CHECKING MASTERY CHECK QUIZZES');
  console.log('='.repeat(80));

  const lessonKeys = ['3.4', '3.5', '3.6'];

  for (const lessonKey of lessonKeys) {
    // Get lesson ID
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key')
      .eq('lesson_key', lessonKey)
      .single();

    if (lessonError || !lesson) {
      console.log(`\n❌ Lesson ${lessonKey} not found`);
      continue;
    }

    console.log(`\n📚 Lesson ${lessonKey} (ID: ${lesson.id})`);

    // Get quizzes for this lesson
    const { data: quizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('id, title, position, is_required')
      .eq('lesson_id', lesson.id);

    if (quizzesError) {
      console.error(`  ❌ Error fetching quizzes:`, quizzesError.message);
      continue;
    }

    if (!quizzes || quizzes.length === 0) {
      console.log(`  ⚠️  NO QUIZZES FOUND`);
    } else {
      console.log(`  ✓ Found ${quizzes.length} quiz(es):`);
      quizzes.forEach((quiz, idx) => {
        console.log(`    ${idx + 1}. ${quiz.title}`);
        console.log(`       - Position: ${quiz.position === null ? 'NULL (not set!)' : quiz.position}`);
        console.log(`       - Required: ${quiz.is_required || false}`);
        console.log(`       - ID: ${quiz.id}`);
      });
    }
  }

  console.log('\n' + '='.repeat(80));
}

checkQuizzes();
