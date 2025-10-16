import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function deleteQuizzes() {
  console.log('\n🗑️  DELETING INCOMPLETE QUIZZES');
  console.log('='.repeat(80));

  const lessonKeys = ['3.4', '3.5', '3.6'];

  for (const lessonKey of lessonKeys) {
    // Get lesson ID
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    if (lessonError || !lesson) {
      console.log(`  ✗ Lesson ${lessonKey} not found`);
      continue;
    }

    // Delete quizzes for this lesson
    const { error: deleteError } = await supabase
      .from('quizzes')
      .delete()
      .eq('lesson_id', lesson.id);

    if (deleteError) {
      console.error(`  ✗ Error deleting quizzes for ${lessonKey}:`, deleteError.message);
    } else {
      console.log(`  ✓ Deleted quizzes for lesson ${lessonKey}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ Cleanup complete!\n');
}

deleteQuizzes();
