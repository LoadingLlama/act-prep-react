import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function copyQuizzesToMetadata() {
  console.log('🔄 Copying quizzes from lessons table to lesson_metadata table...\n');

  // Get all lessons from both tables
  const { data: oldLessons } = await supabase
    .from('lessons')
    .select('id, lesson_key')
    .order('lesson_key');

  const { data: newLessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key')
    .order('lesson_key');

  let copied = 0;
  let skipped = 0;

  for (const oldLesson of oldLessons) {
    // Find matching lesson in lesson_metadata
    const newLesson = newLessons.find(l => l.lesson_key === oldLesson.lesson_key);
    
    if (!newLesson) {
      console.log(`⚠️  No match in lesson_metadata for: ${oldLesson.lesson_key}`);
      skipped++;
      continue;
    }

    // Get all quizzes for old lesson
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_questions (
          *,
          quiz_options (*)
        )
      `)
      .eq('lesson_id', oldLesson.id);

    if (!quizzes || quizzes.length === 0) {
      continue;
    }

    console.log(`📚 ${oldLesson.lesson_key}: ${quizzes.length} quizzes`);

    // Copy each quiz to new lesson ID
    for (const quiz of quizzes) {
      // Check if quiz already exists for new lesson
      const { data: existing } = await supabase
        .from('quizzes')
        .select('id')
        .eq('lesson_id', newLesson.id)
        .eq('title', quiz.title)
        .single();

      if (existing) {
        console.log(`  ✓ Already exists: ${quiz.title}`);
        continue;
      }

      // Create new quiz
      const { data: newQuiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          lesson_id: newLesson.id,
          title: quiz.title,
          intro: quiz.intro,
          quiz_type: quiz.quiz_type,
          position: quiz.position,
          is_required: quiz.is_required
        })
        .select()
        .single();

      if (quizError) {
        console.log(`  ❌ Error creating quiz: ${quizError.message}`);
        continue;
      }

      console.log(`  ✓ Created: ${quiz.title}`);
      copied++;

      // Copy questions
      for (const question of quiz.quiz_questions) {
        const { data: newQuestion, error: qError } = await supabase
          .from('quiz_questions')
          .insert({
            quiz_id: newQuiz.id,
            question_text: question.question_text,
            question_order: question.question_order
          })
          .select()
          .single();

        if (qError) continue;

        // Copy options
        for (const option of question.quiz_options) {
          await supabase
            .from('quiz_options')
            .insert({
              question_id: newQuestion.id,
              option_text: option.option_text,
              is_correct: option.is_correct,
              explanation: option.explanation,
              option_order: option.option_order
            });
        }
      }
    }
  }

  console.log(`\n✅ Done! Copied ${copied} quizzes, skipped ${skipped}`);
}

copyQuizzesToMetadata().catch(console.error);
