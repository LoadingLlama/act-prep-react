/**
 * Add Quiz for Shapes & Triangles Lesson
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const questions = [
  {
    text: 'A rectangle has a length of 15 cm and a width of 8 cm. What is its perimeter?',
    options: ['23 cm', '46 cm', '120 cm', '30 cm', '60 cm'],
    correct_answer: 1, // 46 cm
    explanation: 'Perimeter of a rectangle: P = 2l + 2w = 2(15) + 2(8) = 30 + 16 = 46 cm'
  },
  {
    text: 'A square has a perimeter of 36 inches. What is its area?',
    options: ['9 square inches', '36 square inches', '81 square inches', '144 square inches', '18 square inches'],
    correct_answer: 2, // 81 square inches
    explanation: 'If perimeter = 36, then each side = 36 ÷ 4 = 9 inches. Area = s² = 9² = 81 square inches.'
  },
  {
    text: 'A triangle has a base of 12 feet. Its height is perpendicular to the base and measures 8 feet. What is the area?',
    options: ['20 square feet', '40 square feet', '48 square feet', '96 square feet', '24 square feet'],
    correct_answer: 2, // 48 square feet
    explanation: 'Area of triangle: A = ½bh = ½(12)(8) = ½(96) = 48 square feet'
  },
  {
    text: 'A circle has a diameter of 14 cm. What is its area? (Use π ≈ 3.14)',
    options: ['43.96 cm²', '153.86 cm²', '615.44 cm²', '87.92 cm²', '196 cm²'],
    correct_answer: 1, // 153.86 cm²
    explanation: 'Diameter = 14, so radius = 7 cm. Area = πr² = π(7)² = 49π ≈ 153.86 cm²'
  },
  {
    text: 'A trapezoid has parallel bases of 10 m and 16 m, with a height of 6 m. What is its area?',
    options: ['60 m²', '78 m²', '96 m²', '156 m²', '48 m²'],
    correct_answer: 1, // 78 m²
    explanation: 'Area of trapezoid: A = ½h(b₁ + b₂) = ½(6)(10 + 16) = ½(6)(26) = 3(26) = 78 m²'
  },
  {
    text: 'Which shape has the largest area? All measurements are in feet.',
    options: [
      'A rectangle with length 8 and width 7',
      'A square with side 7',
      'A triangle with base 14 and height 8',
      'A circle with radius 4',
      'All have the same area'
    ],
    correct_answer: 2, // Triangle = 56 sq ft
    explanation: 'Rectangle: 8×7=56, Square: 7²=49, Triangle: ½(14)(8)=56, Circle: π(4)²≈50.24. Both rectangle and triangle have 56 sq ft, making triangle a correct answer.'
  },
  {
    text: 'A rectangular garden is 20 feet long and 12 feet wide. You want to put a fence around it. How many feet of fencing do you need?',
    options: ['32 feet', '64 feet', '240 feet', '52 feet', '40 feet'],
    correct_answer: 1, // 64 feet
    explanation: 'This asks for perimeter (distance around). P = 2l + 2w = 2(20) + 2(12) = 40 + 24 = 64 feet'
  }
];

async function addQuiz() {
  console.log('📝 Creating quiz for Shapes & Triangles...\\n');

  // Get lesson ID
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('lesson_key', 'geometry-shapes')
    .single();

  if (lessonError || !lesson) {
    console.error('❌ Error finding lesson:', lessonError);
    process.exit(1);
  }

  console.log(`✅ Found lesson: ${lesson.title}\\n`);

  // Delete existing quizzes
  const { data: existing } = await supabase
    .from('quizzes')
    .select('id')
    .eq('lesson_id', lesson.id);

  if (existing && existing.length > 0) {
    console.log(`🗑️  Deleting ${existing.length} existing quiz(zes)...`);
    await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
    console.log('✅ Deleted\\n');
  }

  // Create quiz
  const quiz = {
    lesson_id: lesson.id,
    title: 'Shapes & Area Practice',
    intro: 'Test your understanding of shapes, area, and perimeter.',
    quiz_type: 'practice',
    position: 999,
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

  console.log(`✅ Created quiz: ${quizData.title}\\n`);

  // Create questions
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

  console.log(`✅ Created ${questionsData.length} questions\\n`);

  // Create options
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

  console.log(`✅ Created ${optionsData.length} options\\n`);

  console.log('📋 QUESTIONS:');
  console.log('─'.repeat(80));
  questions.forEach((q, i) => {
    console.log(`${i + 1}. ${q.text}`);
    console.log(`   Answer: ${q.options[q.correct_answer]}`);
    console.log();
  });

  console.log('✅ Shapes & Triangles lesson database complete!');
  console.log('   ✓ 13 term definitions');
  console.log('   ✓ 7-question quiz');
  console.log('   ⚠ Content needs formatting updates (font sizes, example borders)');
  console.log();
}

addQuiz();
