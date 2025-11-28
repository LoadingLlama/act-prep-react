require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

async function migrateQuizQuestions() {
  console.log('Starting migration of quiz_questions to practice_questions...\n');

  // Step 1: Get all quizzes with their lesson_id
  const { data: quizzes, error: quizzesError } = await supabase
    .from('quizzes')
    .select('id, lesson_id, title');

  if (quizzesError) {
    console.error('Error fetching quizzes:', quizzesError);
    return;
  }

  console.log(`Found ${quizzes.length} quizzes\n`);

  let totalMigrated = 0;
  let totalErrors = 0;

  // Step 2: For each quiz, get questions and migrate
  for (const quiz of quizzes) {
    console.log(`\n📋 Processing: ${quiz.title}`);
    console.log(`   Quiz ID: ${quiz.id}`);
    console.log(`   Lesson ID: ${quiz.lesson_id}`);

    // Get all questions for this quiz
    const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('id, question_text, question_order')
      .eq('quiz_id', quiz.id)
      .order('question_order');

    if (questionsError) {
      console.error(`   ❌ Error fetching questions: ${questionsError.message}`);
      continue;
    }

    console.log(`   Found ${questions.length} questions`);

    // Get current max position for this lesson in practice_questions
    const { data: maxPosData } = await supabase
      .from('practice_questions')
      .select('position')
      .eq('lesson_id', quiz.lesson_id)
      .order('position', { ascending: false })
      .limit(1);

    let nextPosition = maxPosData && maxPosData.length > 0 ? maxPosData[0].position + 1 : 1;

    // Process each question
    for (const question of questions) {
      // Get options for this question
      const { data: options, error: optionsError } = await supabase
        .from('quiz_options')
        .select('option_text, is_correct, explanation, option_order')
        .eq('question_id', question.id)
        .order('option_order');

      if (optionsError) {
        console.error(`   ❌ Error fetching options for question ${question.id}: ${optionsError.message}`);
        totalErrors++;
        continue;
      }

      if (!options || options.length === 0) {
        console.error(`   ❌ No options found for question: "${question.question_text.substring(0, 50)}..."`);
        totalErrors++;
        continue;
      }

      // Convert to practice_questions format
      const choices = options.map((opt, idx) => ({
        letter: LETTERS[idx],
        text: opt.option_text
      }));

      const correctOption = options.find(opt => opt.is_correct);
      if (!correctOption) {
        console.error(`   ❌ No correct answer for question: "${question.question_text.substring(0, 50)}..."`);
        totalErrors++;
        continue;
      }

      const correctIndex = options.indexOf(correctOption);
      const correctAnswer = LETTERS[correctIndex];
      const explanation = correctOption.explanation || 'No explanation provided.';

      // Determine subject from lesson
      const { data: lesson } = await supabase
        .from('lessons')
        .select('subject')
        .eq('id', quiz.lesson_id)
        .single();

      const subject = lesson ? lesson.subject : 'math';

      // Insert into practice_questions
      const { error: insertError } = await supabase
        .from('practice_questions')
        .insert({
          lesson_id: quiz.lesson_id,
          subject: subject,
          position: nextPosition,
          difficulty: 'hard',
          title: `Quiz Question ${nextPosition}`,
          problem_text: question.question_text,
          choices: choices,
          correct_answer: correctAnswer,
          answer_explanation: explanation
        });

      if (insertError) {
        console.error(`   ❌ Error inserting question ${nextPosition}: ${insertError.message}`);
        totalErrors++;
      } else {
        totalMigrated++;
        nextPosition++;
      }
    }

    console.log(`   ✅ Migrated ${questions.length} questions from this quiz`);
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ MIGRATION COMPLETE!`);
  console.log(`   Total migrated: ${totalMigrated}`);
  console.log(`   Total errors: ${totalErrors}`);
}

migrateQuizQuestions();
