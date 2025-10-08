import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { getQuizData } from '../src/utils/lessonQuizData.js';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function migrateQuizzes() {
  console.log('Starting quiz migration to Supabase...\n');

  // Get the sentence structure lesson (assuming it's the first English lesson)
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id, title, lesson_key')
    .eq('lesson_key', 'sentence-structure')
    .single();

  if (lessonError || !lesson) {
    console.error('Could not find sentence-structure lesson:', lessonError);
    console.log('Available lessons:');
    const { data: allLessons } = await supabase
      .from('lessons')
      .select('id, title, lesson_key')
      .limit(10);
    console.table(allLessons);
    return;
  }

  console.log(`Found lesson: ${lesson.title} (ID: ${lesson.id})\n`);

  // Quiz mapping: quizId -> { position, type }
  const quizMapping = {
    1: { position: 1, type: 'practice', title: 'Clause Identification Quiz' },
    2: { position: 2, type: 'checkpoint', title: 'FANBOYS & Compound Sentences' },
    3: { position: 3, type: 'practice', title: 'Comma Splices & Fragments' },
    4: { position: 4, type: 'final', title: 'Final Mastery Test' }
  };

  for (const [quizId, config] of Object.entries(quizMapping)) {
    const quizData = getQuizData(parseInt(quizId));

    if (!quizData) {
      console.log(`⚠️  Quiz ${quizId} not found, skipping...`);
      continue;
    }

    console.log(`Migrating Quiz ${quizId}: ${quizData.title}`);

    // Insert quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        lesson_id: lesson.id,
        title: quizData.title,
        intro: quizData.intro,
        quiz_type: config.type,
        position: config.position,
        is_required: true
      })
      .select()
      .single();

    if (quizError) {
      console.error(`  ❌ Error creating quiz:`, quizError);
      continue;
    }

    console.log(`  ✓ Created quiz (ID: ${quiz.id})`);

    // Insert questions and options
    for (let qIndex = 0; qIndex < quizData.questions.length; qIndex++) {
      const questionData = quizData.questions[qIndex];

      const { data: question, error: questionError } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quiz.id,
          question_text: questionData.text,
          question_order: qIndex
        })
        .select()
        .single();

      if (questionError) {
        console.error(`    ❌ Error creating question ${qIndex}:`, questionError);
        continue;
      }

      // Insert options
      for (let oIndex = 0; oIndex < questionData.options.length; oIndex++) {
        const optionData = questionData.options[oIndex];

        const { error: optionError } = await supabase
          .from('quiz_options')
          .insert({
            question_id: question.id,
            option_text: optionData.text,
            is_correct: optionData.isCorrect,
            explanation: optionData.explanation,
            option_order: oIndex
          });

        if (optionError) {
          console.error(`      ❌ Error creating option ${oIndex}:`, optionError);
        }
      }
    }

    console.log(`  ✓ Added ${quizData.questions.length} questions\n`);
  }

  console.log('✅ Quiz migration complete!');
}

migrateQuizzes().catch(console.error);
