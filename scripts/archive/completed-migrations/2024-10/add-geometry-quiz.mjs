/**
 * Add Quiz for Geometry Lesson (2.1)
 * Creates a practice quiz in Supabase
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addQuiz() {
  console.log('📝 Creating quiz for Geometry lesson...\\n');

  // First, get the lesson ID
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (lessonError || !lesson) {
    console.error('❌ Error finding lesson:', lessonError);
    process.exit(1);
  }

  console.log(`✅ Found lesson: ${lesson.title}`);
  console.log(`   Lesson ID: ${lesson.id}\\n`);

  // Check if quiz already exists
  const { data: existingQuizzes, error: checkError } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id);

  if (checkError) {
    console.error('❌ Error checking existing quizzes:', checkError);
    process.exit(1);
  }

  if (existingQuizzes && existingQuizzes.length > 0) {
    console.log(`⚠️  Found ${existingQuizzes.length} existing quiz(zes). Deleting...`);
    const { error: deleteError } = await supabase
      .from('quizzes')
      .delete()
      .eq('lesson_id', lesson.id);

    if (deleteError) {
      console.error('❌ Error deleting existing quizzes:', deleteError);
      process.exit(1);
    }
    console.log('✅ Deleted existing quizzes\\n');
  }

  // Create quiz questions
  const questions = [
    {
      text: 'An angle measures 42°. What is the measure of its complement?',
      options: [
        '48°',
        '138°',
        '42°',
        '90°',
        '318°'
      ],
      correct_answer: 0, // 48° (90° - 42°)
      explanation: 'Complementary angles add up to 90°. So the complement is 90° - 42° = 48°.'
    },
    {
      text: 'Two lines intersect. If one of the angles formed is 72°, what is the measure of its vertical angle?',
      options: [
        '18°',
        '108°',
        '72°',
        '90°',
        '288°'
      ],
      correct_answer: 2, // 72° (vertical angles are equal)
      explanation: 'Vertical angles are always equal. So the vertical angle is also 72°.'
    },
    {
      text: 'Two angles are supplementary. One angle is 125°. What is the measure of the other angle?',
      options: [
        '35°',
        '55°',
        '65°',
        '125°',
        '235°'
      ],
      correct_answer: 1, // 55° (180° - 125°)
      explanation: 'Supplementary angles add up to 180°. So the other angle is 180° - 125° = 55°.'
    },
    {
      text: 'Which of the following is an obtuse angle?',
      options: [
        '45°',
        '90°',
        '135°',
        '180°',
        '270°'
      ],
      correct_answer: 2, // 135° (between 90° and 180°)
      explanation: 'An obtuse angle is between 90° and 180°. Only 135° fits this range.'
    },
    {
      text: 'Parallel lines are cut by a transversal. If one of the angles measures 65°, what is the measure of its corresponding angle?',
      options: [
        '25°',
        '65°',
        '90°',
        '115°',
        '180°'
      ],
      correct_answer: 1, // 65° (corresponding angles are equal)
      explanation: 'When parallel lines are cut by a transversal, corresponding angles are equal. So the corresponding angle is also 65°.'
    },
    {
      text: 'Two adjacent angles on a straight line measure x° and (2x + 15)°. What is the value of x?',
      options: [
        '45',
        '50',
        '55',
        '60',
        '65'
      ],
      correct_answer: 2, // 55 (x + 2x + 15 = 180, so 3x = 165, x = 55)
      explanation: 'Adjacent angles on a straight line are supplementary (add to 180°). So x + (2x + 15) = 180. Solving: 3x + 15 = 180, 3x = 165, x = 55.'
    },
    {
      text: 'Two lines intersect creating four angles. If one angle is 3 times another, what are the measures of all four angles?',
      options: [
        '30°, 90°, 30°, 90°',
        '45°, 135°, 45°, 135°',
        '60°, 120°, 60°, 120°',
        '40°, 140°, 40°, 140°',
        '50°, 130°, 50°, 130°'
      ],
      correct_answer: 1, // 45°, 135°, 45°, 135°
      explanation: 'Let one angle be x. Then the other is 3x. Adjacent angles are supplementary: x + 3x = 180, so 4x = 180, x = 45°. The four angles are 45°, 135°, 45°, 135° (vertical angles are equal).'
    }
  ];

  // Create the quiz (main entry)
  const quiz = {
    lesson_id: lesson.id,
    title: 'Angles & Lines Practice',
    intro: 'Test your understanding of angles and lines.',
    quiz_type: 'practice',
    position: 999, // At the end of the lesson
    is_required: false
  };

  const { data: quizData, error: quizError } = await supabase
    .from('quizzes')
    .insert([quiz])
    .select()
    .single();

  if (quizError) {
    console.error('❌ Error creating quiz:', quizError);
    process.exit(1);
  }

  console.log(`✅ Successfully created quiz: ${quizData.title}`);
  console.log(`   Quiz ID: ${quizData.id}\\n`);

  // Create quiz questions
  const quizQuestions = questions.map((q, idx) => ({
    quiz_id: quizData.id,
    question_text: q.text,
    question_order: idx
  }));

  const { data: questionsData, error: questionsError } = await supabase
    .from('quiz_questions')
    .insert(quizQuestions)
    .select();

  if (questionsError) {
    console.error('❌ Error creating questions:', questionsError);
    process.exit(1);
  }

  console.log(`✅ Successfully created ${questionsData.length} questions\\n`);

  // Create quiz options for each question
  const quizOptions = [];
  questionsData.forEach((dbQuestion, qIdx) => {
    const originalQuestion = questions[qIdx];
    originalQuestion.options.forEach((optionText, optIdx) => {
      quizOptions.push({
        question_id: dbQuestion.id,
        option_text: optionText,
        option_order: optIdx,
        is_correct: optIdx === originalQuestion.correct_answer,
        explanation: optIdx === originalQuestion.correct_answer ? originalQuestion.explanation : null
      });
    });
  });

  const { data: optionsData, error: optionsError } = await supabase
    .from('quiz_options')
    .insert(quizOptions)
    .select();

  if (optionsError) {
    console.error('❌ Error creating options:', optionsError);
    process.exit(1);
  }

  console.log(`✅ Successfully created ${optionsData.length} options\\n`);

  console.log('📋 QUIZ DETAILS:');
  console.log('─'.repeat(80));
  console.log(`  Title: ${quiz.title}`);
  console.log(`  Questions: ${questions.length}`);
  console.log(`  Position: ${quiz.position} (at end of lesson)`);
  console.log(`  Required: ${quiz.is_required ? 'Yes' : 'No'}`);
  console.log(`  Type: ${quiz.quiz_type}`);
  console.log();

  console.log('QUESTIONS:');
  console.log('─'.repeat(80));
  questions.forEach((q, i) => {
    console.log(`${i + 1}. ${q.text}`);
    console.log(`   Answer: ${q.options[q.correct_answer]}`);
    console.log();
  });

  console.log('✅ Gold standard lesson is now complete with:');
  console.log('   ✓ 10 blue underlined terms with definitions');
  console.log('   ✓ 3 interactive examples embedded in content');
  console.log('   ✓ 7-question practice quiz');
  console.log();
}

addQuiz();
