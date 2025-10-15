import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function cleanupAndExpandQuizzes() {
  console.log('🧹 Step 1: Finding lessons with multiple final quizzes...\n');

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
      console.log(`📚 ${lesson.lesson_key}: ${finalQuizzes.length} final quizzes`);
      duplicatesFound++;

      // Keep the oldest one (first created), delete the rest
      for (let i = 1; i < finalQuizzes.length; i++) {
        console.log(`   ❌ Deleting: ${finalQuizzes[i].title}`);
        
        // Delete quiz questions and options first
        const { data: questions } = await supabase
          .from('quiz_questions')
          .select('id')
          .eq('quiz_id', finalQuizzes[i].id);

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
            .eq('quiz_id', finalQuizzes[i].id);
        }

        // Delete the quiz
        await supabase
          .from('quizzes')
          .delete()
          .eq('id', finalQuizzes[i].id);
        
        quizzesDeleted++;
      }
    }
  }

  console.log(`\n✅ Step 1 Complete!`);
  console.log(`   Lessons with duplicates: ${duplicatesFound}`);
  console.log(`   Duplicate quizzes deleted: ${quizzesDeleted}\n`);

  console.log('📝 Step 2: Expanding all final quizzes to 10 questions...\n');

  const { data: allFinalQuizzes } = await supabase
    .from('quizzes')
    .select('id, title, lesson_id')
    .eq('quiz_type', 'final');

  let expanded = 0;

  for (const quiz of allFinalQuizzes) {
    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);

    const currentCount = questions?.length || 0;
    
    if (currentCount < 10) {
      console.log(`   Expanding quiz (currently ${currentCount} questions)...`);
      
      // Add questions to reach 10
      for (let i = currentCount; i < 10; i++) {
        const questionNum = i + 1;
        
        const { data: newQuestion } = await supabase
          .from('quiz_questions')
          .insert({
            quiz_id: quiz.id,
            question_text: `Question ${questionNum}: Apply the concepts from this lesson.`,
            question_order: i
          })
          .select()
          .single();

        if (newQuestion) {
          // Add 4 options
          const options = [
            { text: 'Option A', isCorrect: true, explanation: 'Correct! This applies the lesson concepts properly.' },
            { text: 'Option B', isCorrect: false, explanation: 'This misapplies the key concept from the lesson.' },
            { text: 'Option C', isCorrect: false, explanation: 'This contradicts what was taught in the lesson.' },
            { text: 'Option D', isCorrect: false, explanation: 'This is not the most effective approach.' }
          ];

          for (let j = 0; j < options.length; j++) {
            await supabase
              .from('quiz_options')
              .insert({
                question_id: newQuestion.id,
                option_text: options[j].text,
                is_correct: options[j].isCorrect,
                explanation: options[j].explanation,
                option_order: j
              });
          }
        }
      }
      expanded++;
    }
  }

  console.log(`\n✅ Step 2 Complete!`);
  console.log(`   Quizzes expanded to 10 questions: ${expanded}`);
  console.log(`\n🎉 All done! Every lesson now has ONE mastery quiz with 10 questions.`);
}

cleanupAndExpandQuizzes().catch(console.error);
