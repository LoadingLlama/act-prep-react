import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const quizQuestions = [
  {
    question_text: 'Which of the following is the vertex form of f(x) = x² − 6x + 5?',
    correct_answer: 'C',
    explanation: 'Complete the square: f(x) = (x² − 6x + 9) + 5 − 9 = (x − 3)² − 4. The vertex is (3, −4).',
    options: [
      { letter: 'A', text: 'f(x) = (x + 3)² − 4' },
      { letter: 'B', text: 'f(x) = (x − 6)² + 5' },
      { letter: 'C', text: 'f(x) = (x − 3)² − 4' },
      { letter: 'D', text: 'f(x) = (x − 3)² + 5' },
      { letter: 'E', text: 'f(x) = (x + 6)² − 4' }
    ]
  },
  {
    question_text: 'Solve for x: x² − 7x + 12 = 0',
    correct_answer: 'E',
    explanation: 'Factor: (x − 3)(x − 4) = 0. Using the Zero Product Property: x = 3 or x = 4.',
    options: [
      { letter: 'A', text: 'x = 2 or x = 6' },
      { letter: 'B', text: 'x = 1 or x = 12' },
      { letter: 'C', text: 'x = −3 or x = −4' },
      { letter: 'D', text: 'x = 7 or x = 12' },
      { letter: 'E', text: 'x = 3 or x = 4' }
    ]
  },
  {
    question_text: 'How many real solutions does the equation 2x² + 3x + 5 = 0 have?',
    correct_answer: 'A',
    explanation: 'Calculate the discriminant: b² − 4ac = 3² − 4(2)(5) = 9 − 40 = −31. Since the discriminant is negative, there are no real solutions.',
    options: [
      { letter: 'A', text: '0' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '3' },
      { letter: 'E', text: 'Infinitely many' }
    ]
  },
  {
    question_text: 'What is the axis of symmetry for f(x) = 3x² + 12x − 7?',
    correct_answer: 'B',
    explanation: 'Use x = −b/2a: x = −12/(2·3) = −12/6 = −2.',
    options: [
      { letter: 'A', text: 'x = 2' },
      { letter: 'B', text: 'x = −2' },
      { letter: 'C', text: 'x = 4' },
      { letter: 'D', text: 'x = −4' },
      { letter: 'E', text: 'x = −6' }
    ]
  },
  {
    question_text: 'Solve using the quadratic formula: 2x² − 5x − 3 = 0',
    correct_answer: 'D',
    explanation: 'x = (5 ± √(25 + 24))/4 = (5 ± √49)/4 = (5 ± 7)/4. This gives x = 12/4 = 3 or x = −2/4 = −1/2.',
    options: [
      { letter: 'A', text: 'x = 2 or x = −3' },
      { letter: 'B', text: 'x = 5 or x = −1' },
      { letter: 'C', text: 'x = −3 or x = 1/2' },
      { letter: 'D', text: 'x = 3 or x = −1/2' },
      { letter: 'E', text: 'x = 1 or x = −3/2' }
    ]
  },
  {
    question_text: 'If the parabola y = ax² + 4x + 3 has exactly one x-intercept, what is the value of a?',
    correct_answer: 'C',
    explanation: 'For one x-intercept, discriminant = 0: 4² − 4(a)(3) = 0, so 16 − 12a = 0, giving a = 4/3.',
    options: [
      { letter: 'A', text: 'a = 1' },
      { letter: 'B', text: 'a = 3/4' },
      { letter: 'C', text: 'a = 4/3' },
      { letter: 'D', text: 'a = 2' },
      { letter: 'E', text: 'a = 3' }
    ]
  },
  {
    question_text: 'The function f(x) = −x² + 8x − 12 has a maximum value of:',
    correct_answer: 'E',
    explanation: 'Vertex x-coordinate: x = −8/(2·(−1)) = 4. Substitute: f(4) = −16 + 32 − 12 = 4. Since a < 0, this is a maximum.',
    options: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '−12' },
      { letter: 'D', text: '2' },
      { letter: 'E', text: '4' }
    ]
  },
  {
    question_text: 'Which function has x-intercepts at x = 2 and x = −5?',
    correct_answer: 'A',
    explanation: 'Factored form: f(x) = a(x − 2)(x + 5). With a = 1, this is f(x) = (x − 2)(x + 5) = x² + 3x − 10.',
    options: [
      { letter: 'A', text: 'f(x) = x² + 3x − 10' },
      { letter: 'B', text: 'f(x) = x² − 3x − 10' },
      { letter: 'C', text: 'f(x) = x² + 7x + 10' },
      { letter: 'D', text: 'f(x) = x² − 7x + 10' },
      { letter: 'E', text: 'f(x) = x² + 3x + 10' }
    ]
  },
  {
    question_text: 'Complete the square: x² + 10x + 7 = 0',
    correct_answer: 'B',
    explanation: 'x² + 10x = −7. Add (10/2)² = 25 to both sides: x² + 10x + 25 = 18, so (x + 5)² = 18, giving x = −5 ± √18 = −5 ± 3√2.',
    options: [
      { letter: 'A', text: 'x = −5 ± √7' },
      { letter: 'B', text: 'x = −5 ± 3√2' },
      { letter: 'C', text: 'x = 5 ± 3√2' },
      { letter: 'D', text: 'x = −10 ± √18' },
      { letter: 'E', text: 'x = −5 ± √32' }
    ]
  },
  {
    question_text: 'Which parabola is narrower than y = x²?',
    correct_answer: 'D',
    explanation: 'A parabola is narrower when |a| > 1. In y = 3x², |a| = 3 > 1, so it\'s narrower than y = x².',
    options: [
      { letter: 'A', text: 'y = 0.5x²' },
      { letter: 'B', text: 'y = (1/2)x²' },
      { letter: 'C', text: 'y = x² + 5' },
      { letter: 'D', text: 'y = 3x²' },
      { letter: 'E', text: 'y = −0.8x²' }
    ]
  }
];

async function createQuiz() {
  console.log('\n📝 CREATING MASTERY QUIZ FOR LESSON 4.2');
  console.log('='.repeat(80));

  // Step 1: Get lesson ID
  console.log('\n1️⃣ Getting lesson ID...');
  const { data: lesson, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', '4.2')
    .single();

  if (lessonError) {
    console.error('❌ Lesson not found:', lessonError.message);
    return;
  }

  console.log(`✓ Lesson ID: ${lesson.id}`);

  // Step 2: Create quiz
  console.log('\n2️⃣ Creating quiz...');
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .insert({
      title: 'Quadratics Mastery Check',
      lesson_id: lesson.id,
      position: 11
    })
    .select('id')
    .single();

  if (quizError) {
    console.error('❌ Error creating quiz:', quizError.message);
    return;
  }

  console.log(`✓ Quiz created with ID: ${quiz.id}`);

  // Step 3: Add questions
  console.log('\n3️⃣ Adding questions...');
  for (let i = 0; i < quizQuestions.length; i++) {
    const q = quizQuestions[i];

    // Insert question
    const { data: question, error: questionError } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: quiz.id,
        question_text: q.question_text,
        question_order: i
      })
      .select('id')
      .single();

    if (questionError) {
      console.error(`  ✗ Error adding question ${i + 1}:`, questionError.message);
      continue;
    }

    console.log(`  ✓ Question ${i + 1} added`);

    // Add options
    for (let j = 0; j < q.options.length; j++) {
      const opt = q.options[j];
      const isCorrect = opt.letter === q.correct_answer;

      await supabase
        .from('quiz_options')
        .insert({
          question_id: question.id,
          option_text: opt.text,
          is_correct: isCorrect,
          explanation: isCorrect ? q.explanation : null,
          option_order: j
        });
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ QUIZ CREATED SUCCESSFULLY WITH 10 QUESTIONS!\n');
}

createQuiz();
