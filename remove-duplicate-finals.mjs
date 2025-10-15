import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function removeDuplicateFinals() {
  console.log('🔍 Finding lessons with multiple final quizzes...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .order('lesson_key');

  let duplicatesFound = 0;
  let quizzesDeleted = 0;

  for (const lesson of lessons) {
    const { data: finalQuizzes } = await supabase
      .from('quizzes')
      .select('id, title, created_at')
      .eq('lesson_id', lesson.id)
      .eq('quiz_type', 'final')
      .order('created_at', { ascending: true });

    if (finalQuizzes && finalQuizzes.length > 1) {
      console.log(`📚 ${lesson.lesson_key}: ${finalQuizzes.length} final quizzes found`);
      duplicatesFound++;

      // Check question counts for each
      const quizDetails = [];
      for (const quiz of finalQuizzes) {
        const { data: questions } = await supabase
          .from('quiz_questions')
          .select('id')
          .eq('quiz_id', quiz.id);
        
        quizDetails.push({
          ...quiz,
          questionCount: questions?.length || 0
        });
      }

      // Find the one with 10 questions (keep it)
      const keepQuiz = quizDetails.find(q => q.questionCount === 10);
      
      if (!keepQuiz) {
        console.log(`  ⚠️  No quiz with 10 questions found, keeping oldest`);
        continue;
      }

      console.log(`  ✓ Keeping quiz with ${keepQuiz.questionCount} questions`);

      // Delete all others
      for (const quiz of quizDetails) {
        if (quiz.id !== keepQuiz.id) {
          console.log(`  ❌ Deleting quiz with ${quiz.questionCount} questions`);
          
          // Delete questions and options
          const { data: questions } = await supabase
            .from('quiz_questions')
            .select('id')
            .eq('quiz_id', quiz.id);

          if (questions) {
            for (const q of questions) {
              await supabase
                .from('quiz_options')
                .delete()
                .eq('question_id', q.id);
            }
            
            await supabase
              .from('quiz_questions')
              .delete()
              .eq('quiz_id', quiz.id);
          }

          // Delete the quiz
          await supabase
            .from('quizzes')
            .delete()
            .eq('id', quiz.id);
          
          quizzesDeleted++;
        }
      }
    }
  }

  console.log(`\n✅ Cleanup complete!`);
  console.log(`   Lessons with duplicates: ${duplicatesFound}`);
  console.log(`   Duplicate quizzes deleted: ${quizzesDeleted}`);
  
  // Final verification
  const { data: allFinalQuizzes } = await supabase
    .from('quizzes')
    .select('id')
    .eq('quiz_type', 'final');
  
  console.log(`\n📊 Total final quizzes remaining: ${allFinalQuizzes?.length || 0}`);
}

removeDuplicateFinals().catch(console.error);
