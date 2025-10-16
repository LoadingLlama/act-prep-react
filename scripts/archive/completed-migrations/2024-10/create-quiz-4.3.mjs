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
    question_text: 'If f(x) = 2x² + 3x − 1, what is f(−2)?',
    correct_answer: 'B',
    explanation: 'Substitute −2 for x: f(−2) = 2(−2)² + 3(−2) − 1 = 2(4) − 6 − 1 = 8 − 6 − 1 = 1.',
    options: [
      { letter: 'A', text: '−7' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '15' },
      { letter: 'E', text: '−1' }
    ]
  },
  {
    question_text: 'The function g(x) = f(x − 4) + 2 shifts f(x) in which way?',
    correct_answer: 'D',
    explanation: 'f(x − 4) shifts right 4 units (opposite sign), and +2 shifts up 2 units.',
    options: [
      { letter: 'A', text: 'Left 4, up 2' },
      { letter: 'B', text: 'Left 4, down 2' },
      { letter: 'C', text: 'Right 4, down 2' },
      { letter: 'D', text: 'Right 4, up 2' },
      { letter: 'E', text: 'Up 4, right 2' }
    ]
  },
  {
    question_text: 'If f(x) = x + 5 and g(x) = x², what is f(g(3))?',
    correct_answer: 'C',
    explanation: 'First find g(3) = 3² = 9. Then f(9) = 9 + 5 = 14.',
    options: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '11' },
      { letter: 'C', text: '14' },
      { letter: 'D', text: '64' },
      { letter: 'E', text: '19' }
    ]
  },
  {
    question_text: 'If f(x) = (4x + 7)/3, what is f⁻¹(x)?',
    correct_answer: 'E',
    explanation: 'Set y = (4x + 7)/3. Swap: x = (4y + 7)/3. Solve: 3x = 4y + 7, so 4y = 3x − 7, giving y = (3x − 7)/4.',
    options: [
      { letter: 'A', text: '(3x + 7)/4' },
      { letter: 'B', text: '3/(4x + 7)' },
      { letter: 'C', text: '(4x − 7)/3' },
      { letter: 'D', text: '(3x + 4)/7' },
      { letter: 'E', text: '(3x − 7)/4' }
    ]
  },
  {
    question_text: 'Which transformation reflects f(x) = x³ across the x-axis?',
    correct_answer: 'A',
    explanation: 'To reflect across the x-axis, multiply the entire function by −1: −f(x) = −x³.',
    options: [
      { letter: 'A', text: 'g(x) = −x³' },
      { letter: 'B', text: 'g(x) = (−x)³' },
      { letter: 'C', text: 'g(x) = x³ − 1' },
      { letter: 'D', text: 'g(x) = x³ + 1' },
      { letter: 'E', text: 'g(x) = 3x³' }
    ]
  },
  {
    question_text: 'If f(x) = x − 3 and g(x) = 2x + 1, what is g(f(x))?',
    correct_answer: 'B',
    explanation: 'First apply f: f(x) = x − 3. Then apply g to that result: g(x − 3) = 2(x − 3) + 1 = 2x − 6 + 1 = 2x − 5.',
    options: [
      { letter: 'A', text: '2x − 2' },
      { letter: 'B', text: '2x − 5' },
      { letter: 'C', text: '2x + 4' },
      { letter: 'D', text: 'x − 2' },
      { letter: 'E', text: '3x − 2' }
    ]
  },
  {
    question_text: 'What is the domain of f(x) = √(x − 5)?',
    correct_answer: 'D',
    explanation: 'For a square root, the radicand must be non-negative: x − 5 ≥ 0, so x ≥ 5.',
    options: [
      { letter: 'A', text: 'x > 5' },
      { letter: 'B', text: 'x ≤ 5' },
      { letter: 'C', text: 'All real numbers' },
      { letter: 'D', text: 'x ≥ 5' },
      { letter: 'E', text: 'x ≠ 5' }
    ]
  },
  {
    question_text: 'If f(x) = x² + 1, what is f(a + 2)?',
    correct_answer: 'C',
    explanation: 'Substitute (a + 2) for x: f(a + 2) = (a + 2)² + 1 = a² + 4a + 4 + 1 = a² + 4a + 5.',
    options: [
      { letter: 'A', text: 'a² + 3' },
      { letter: 'B', text: 'a² + 2a + 5' },
      { letter: 'C', text: 'a² + 4a + 5' },
      { letter: 'D', text: 'a² + 4' },
      { letter: 'E', text: 'a² + 4a + 1' }
    ]
  },
  {
    question_text: 'The graph of y = 3f(x) compared to y = f(x) is:',
    correct_answer: 'E',
    explanation: 'Multiplying by 3 multiplies all y-values by 3, creating a vertical stretch by factor 3.',
    options: [
      { letter: 'A', text: 'Shifted up 3 units' },
      { letter: 'B', text: 'Shifted right 3 units' },
      { letter: 'C', text: 'Horizontally stretched by factor 3' },
      { letter: 'D', text: 'Vertically compressed by factor 1/3' },
      { letter: 'E', text: 'Vertically stretched by factor 3' }
    ]
  },
  {
    question_text: 'If h(x) = f(g(x)), where f(x) = 2x and g(x) = x + 3, what is h(5)?',
    correct_answer: 'C',
    explanation: 'First find g(5) = 5 + 3 = 8. Then f(8) = 2(8) = 16.',
    options: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '13' },
      { letter: 'C', text: '16' },
      { letter: 'D', text: '11' },
      { letter: 'E', text: '8' }
    ]
  }
];

async function createQuiz() {
  console.log('\n📝 CREATING MASTERY QUIZ FOR LESSON 4.3');
  console.log('='.repeat(80));

  // Step 1: Get lesson ID
  console.log('\n1️⃣ Getting lesson ID...');
  const { data: lesson, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', '4.3')
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
      title: 'Functions Mastery Check',
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
