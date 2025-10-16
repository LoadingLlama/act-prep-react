import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessonKeys = ['2.2', '2.3', '2.4', '2.5', '3.1', '3.2', '3.3'];

async function addLockToQuizTitles() {
  console.log('\n🔒 ADDING LOCK SYMBOL TO QUIZ TITLES');
  console.log('='.repeat(80));

  for (const lessonKey of lessonKeys) {
    try {
      // Get lesson ID
      const { data: lessonData, error: lessonError } = await supabase
        .from('lesson_metadata')
        .select('id')
        .eq('lesson_key', lessonKey)
        .single();

      if (lessonError || !lessonData) {
        console.error(`✗ Lesson ${lessonKey} not found:`, lessonError);
        continue;
      }

      const lessonId = lessonData.id;

      // Get quiz for this lesson
      const { data: quizzes, error: quizzesError } = await supabase
        .from('quizzes')
        .select('id, title')
        .eq('lesson_id', lessonId);

      if (quizzesError || !quizzes || quizzes.length === 0) {
        console.error(`✗ No quiz found for lesson ${lessonKey}:`, quizzesError);
        continue;
      }

      // Update each quiz title to include lock symbol
      for (const quiz of quizzes) {
        let newTitle = quiz.title;

        // Only add lock if it doesn't already have one
        if (!newTitle.includes('🔒')) {
          // Replace "Mastery Quiz:" with "🔒 Mastery Quiz:"
          newTitle = newTitle.replace('Mastery Quiz:', '🔒 Mastery Quiz:');
        }

        const { error: updateError } = await supabase
          .from('quizzes')
          .update({ title: newTitle })
          .eq('id', quiz.id);

        if (updateError) {
          console.error(`✗ Error updating quiz for lesson ${lessonKey}:`, updateError);
        } else {
          console.log(`✓ ${lessonKey}: "${quiz.title}" → "${newTitle}"`);
        }
      }

    } catch (error) {
      console.error(`✗ Error processing lesson ${lessonKey}:`, error.message);
    }
  }

  console.log('\n✅ All quiz titles updated with lock symbol!');
  console.log('='.repeat(80) + '\n');
}

addLockToQuizTitles();
