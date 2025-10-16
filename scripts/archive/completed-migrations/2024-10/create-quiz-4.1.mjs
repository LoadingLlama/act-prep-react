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
    question_text: 'Solve the system using substitution: y = 2x + 1 and 3x + y = 11',
    correct_answer: 'C',
    explanation: 'Substitute y = 2x + 1 into the second equation: 3x + (2x + 1) = 11. Simplify: 5x + 1 = 11, so 5x = 10, x = 2. Substitute back: y = 2(2) + 1 = 5.',
    options: [
      { letter: 'A', text: '(1, 3)' },
      { letter: 'B', text: '(3, 7)' },
      { letter: 'C', text: '(2, 5)' },
      { letter: 'D', text: '(4, 9)' },
      { letter: 'E', text: '(5, 11)' }
    ]
  },
  {
    question_text: 'Solve using elimination: 2x + 3y = 13 and 4x − 3y = 5',
    correct_answer: 'B',
    explanation: 'The y-terms have opposite coefficients. Add the equations: (2x + 3y) + (4x − 3y) = 13 + 5, which gives 6x = 18, so x = 3. Substitute: 2(3) + 3y = 13, so 6 + 3y = 13, 3y = 7, y = 7/3.',
    options: [
      { letter: 'A', text: '(2, 3)' },
      { letter: 'B', text: '(3, 7/3)' },
      { letter: 'C', text: '(4, 5/3)' },
      { letter: 'D', text: '(3, 2)' },
      { letter: 'E', text: '(5, 1)' }
    ]
  },
  {
    question_text: 'Two numbers have a sum of 50 and a difference of 10. What is the larger number?',
    correct_answer: 'D',
    explanation: 'Let x = larger number, y = smaller number. Set up: x + y = 50 and x − y = 10. Add equations: 2x = 60, so x = 30.',
    options: [
      { letter: 'A', text: '20' },
      { letter: 'B', text: '25' },
      { letter: 'C', text: '28' },
      { letter: 'D', text: '30' },
      { letter: 'E', text: '35' }
    ]
  },
  {
    question_text: 'Which system has NO solution?',
    correct_answer: 'A',
    explanation: 'Two lines with the same slope but different y-intercepts are parallel and never intersect (no solution). Option A: y = 2x + 3 and y = 2x − 1 both have slope 2 but different intercepts.',
    options: [
      { letter: 'A', text: 'y = 2x + 3 and y = 2x − 1' },
      { letter: 'B', text: 'y = 2x + 3 and y = −2x + 1' },
      { letter: 'C', text: 'y = x + 5 and y = x + 5' },
      { letter: 'D', text: 'y = 3x and y = x + 2' },
      { letter: 'E', text: 'x + y = 4 and x − y = 2' }
    ]
  },
  {
    question_text: 'Solve using elimination: 3x + 2y = 16 and x + y = 6',
    correct_answer: 'E',
    explanation: 'Multiply the second equation by −2: −2x − 2y = −12. Add to first: (3x + 2y) + (−2x − 2y) = 16 + (−12), which gives x = 4. Substitute: 4 + y = 6, so y = 2.',
    options: [
      { letter: 'A', text: '(2, 4)' },
      { letter: 'B', text: '(3, 3)' },
      { letter: 'C', text: '(5, 1)' },
      { letter: 'D', text: '(6, 0)' },
      { letter: 'E', text: '(4, 2)' }
    ]
  },
  {
    question_text: 'A theater sells adult tickets for $12 and child tickets for $8. If 40 tickets were sold for a total of $400, how many adult tickets were sold?',
    correct_answer: 'B',
    explanation: 'Let a = adult tickets, c = child tickets. Set up: a + c = 40 and 12a + 8c = 400. From first: c = 40 − a. Substitute: 12a + 8(40 − a) = 400. Simplify: 12a + 320 − 8a = 400, so 4a = 80, a = 20.',
    options: [
      { letter: 'A', text: '15' },
      { letter: 'B', text: '20' },
      { letter: 'C', text: '25' },
      { letter: 'D', text: '30' },
      { letter: 'E', text: '32' }
    ]
  },
  {
    question_text: 'Which system has INFINITELY MANY solutions?',
    correct_answer: 'C',
    explanation: 'Infinitely many solutions occur when both equations represent the same line. In option C: 2x + y = 5 and 4x + 2y = 10. The second equation is exactly 2 times the first, so they are the same line.',
    options: [
      { letter: 'A', text: 'x + y = 3 and x − y = 1' },
      { letter: 'B', text: 'y = x + 2 and y = x − 2' },
      { letter: 'C', text: '2x + y = 5 and 4x + 2y = 10' },
      { letter: 'D', text: 'x + 2y = 6 and 2x + y = 6' },
      { letter: 'E', text: '3x − y = 7 and 3x − y = 8' }
    ]
  },
  {
    question_text: 'Solve using substitution: x = y + 3 and 2x + 3y = 19',
    correct_answer: 'A',
    explanation: 'Substitute x = y + 3 into second equation: 2(y + 3) + 3y = 19. Simplify: 2y + 6 + 3y = 19, so 5y = 13, y = 13/5. Then x = 13/5 + 3 = 28/5.',
    options: [
      { letter: 'A', text: '(28/5, 13/5)' },
      { letter: 'B', text: '(5, 2)' },
      { letter: 'C', text: '(4, 1)' },
      { letter: 'D', text: '(7, 4)' },
      { letter: 'E', text: '(6, 3)' }
    ]
  },
  {
    question_text: 'The sum of two numbers is 15. Three times the first number minus the second number equals 9. What is the first number?',
    correct_answer: 'D',
    explanation: 'Let x = first number, y = second number. Set up: x + y = 15 and 3x − y = 9. Add equations: 4x = 24, so x = 6.',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '6' },
      { letter: 'E', text: '9' }
    ]
  },
  {
    question_text: 'Solve using elimination: 5x − 2y = 11 and 3x + 4y = 7',
    correct_answer: 'E',
    explanation: 'Multiply first equation by 2: 10x − 4y = 22. Add to second: (10x − 4y) + (3x + 4y) = 22 + 7, which gives 13x = 29, so x = 29/13. Substitute into 5x − 2y = 11: 5(29/13) − 2y = 11, so 145/13 − 2y = 11. Solve: 2y = 145/13 − 143/13 = 2/13, so y = 1/13.',
    options: [
      { letter: 'A', text: '(1, 2)' },
      { letter: 'B', text: '(2, −1/2)' },
      { letter: 'C', text: '(3, 2)' },
      { letter: 'D', text: '(13/5, 1/5)' },
      { letter: 'E', text: '(29/13, 1/13)' }
    ]
  }
];

async function createQuiz() {
  console.log('\n📝 CREATING MASTERY QUIZ FOR LESSON 4.1');
  console.log('='.repeat(80));

  // Step 1: Get lesson ID
  console.log('\n1️⃣ Getting lesson ID...');
  const { data: lesson, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', '4.1')
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
      title: 'Systems of Equations Mastery Check',
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
