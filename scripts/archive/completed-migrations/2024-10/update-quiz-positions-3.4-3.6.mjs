import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updateQuizPositions() {
  console.log('\n🎯 UPDATING MASTERY CHECK QUIZ POSITIONS');
  console.log('='.repeat(80));

  const lessonKeys = ['3.4', '3.5', '3.6'];
  const targetPosition = 11; // After all 11 text/example sections

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

    console.log(`\n📚 Lesson ${lessonKey}`);

    // Get quiz for this lesson
    const { data: quizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('id, title, position')
      .eq('lesson_id', lesson.id);

    if (quizzesError || !quizzes || quizzes.length === 0) {
      console.log(`  ❌ No quizzes found`);
      continue;
    }

    const quiz = quizzes[0];
    console.log(`  Quiz: ${quiz.title}`);
    console.log(`  Current position: ${quiz.position}`);

    // Update position
    const { error: updateError } = await supabase
      .from('quizzes')
      .update({ position: targetPosition })
      .eq('id', quiz.id);

    if (updateError) {
      console.error(`  ✗ Error updating position:`, updateError.message);
    } else {
      console.log(`  ✓ Updated position to: ${targetPosition} (end of lesson)`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ All quiz positions updated!\n');
}

updateQuizPositions();
