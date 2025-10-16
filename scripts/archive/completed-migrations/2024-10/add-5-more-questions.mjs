import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const additionalQuestions = {
  '3.4': [ // Logarithms
    {
      question_text: 'Simplify: log₄(64)',
      correct_answer: 'C',
      explanation: 'Ask yourself: 4 raised to what power equals 64? 4¹ = 4, 4² = 16, 4³ = 64. Therefore log₄(64) = 3.',
      options: [
        { letter: 'A', text: '2' },
        { letter: 'B', text: '2.5' },
        { letter: 'C', text: '3' },
        { letter: 'D', text: '4' },
        { letter: 'E', text: '16' }
      ]
    },
    {
      question_text: 'Which of the following is equivalent to log(x) − log(y) + 2log(z)?',
      correct_answer: 'D',
      explanation: 'Use Quotient Rule: log(x) − log(y) = log(x/y). Use Power Rule: 2log(z) = log(z²). Combine: log(x/y) + log(z²) = log(xz²/y).',
      options: [
        { letter: 'A', text: 'log(xyz)' },
        { letter: 'B', text: 'log(x − y + 2z)' },
        { letter: 'C', text: 'log(2xz/y)' },
        { letter: 'D', text: 'log(xz²/y)' },
        { letter: 'E', text: 'log(x/yz²)' }
      ]
    },
    {
      question_text: 'If log₂(x) = 5, what is the value of log₂(4x)?',
      correct_answer: 'E',
      explanation: 'Use Product Rule: log₂(4x) = log₂(4) + log₂(x). Since 2² = 4, log₂(4) = 2. Therefore: 2 + 5 = 7.',
      options: [
        { letter: 'A', text: '9' },
        { letter: 'B', text: '10' },
        { letter: 'C', text: '20' },
        { letter: 'D', text: '6' },
        { letter: 'E', text: '7' }
      ]
    },
    {
      question_text: 'Solve for x: log₅(x − 3) = 2',
      correct_answer: 'D',
      explanation: 'Convert to exponential form: x − 3 = 5². Calculate: x − 3 = 25, so x = 28.',
      options: [
        { letter: 'A', text: '7' },
        { letter: 'B', text: '10' },
        { letter: 'C', text: '22' },
        { letter: 'D', text: '28' },
        { letter: 'E', text: '32' }
      ]
    },
    {
      question_text: 'If log(x) = 3, what is the value of log(100x)?',
      correct_answer: 'E',
      explanation: 'Use Product Rule: log(100x) = log(100) + log(x). Since 10² = 100, log(100) = 2. Therefore: 2 + 3 = 5.',
      options: [
        { letter: 'A', text: '6' },
        { letter: 'B', text: '103' },
        { letter: 'C', text: '300' },
        { letter: 'D', text: '30' },
        { letter: 'E', text: '5' }
      ]
    }
  ],
  '3.5': [ // Inequalities
    {
      question_text: 'Solve: 5 − 3x ≥ 17',
      correct_answer: 'B',
      explanation: 'Subtract 5: −3x ≥ 12. Divide by −3 and flip the sign: x ≤ −4.',
      options: [
        { letter: 'A', text: 'x ≥ −4' },
        { letter: 'B', text: 'x ≤ −4' },
        { letter: 'C', text: 'x ≤ 4' },
        { letter: 'D', text: 'x ≥ 4' },
        { letter: 'E', text: 'x ≤ −22/3' }
      ]
    },
    {
      question_text: 'Which graph represents x ≥ 2 on a number line?',
      correct_answer: 'C',
      explanation: 'x ≥ 2 means x is greater than or equal to 2. Use a closed circle at 2 (because of ≥) and shade to the right.',
      options: [
        { letter: 'A', text: 'Open circle at 2, shading left' },
        { letter: 'B', text: 'Open circle at 2, shading right' },
        { letter: 'C', text: 'Closed circle at 2, shading right' },
        { letter: 'D', text: 'Closed circle at 2, shading left' },
        { letter: 'E', text: 'Closed circle at −2, shading right' }
      ]
    },
    {
      question_text: 'Solve: −3 ≤ 5x + 2 < 12',
      correct_answer: 'A',
      explanation: 'Subtract 2 from all parts: −5 ≤ 5x < 10. Divide all parts by 5: −1 ≤ x < 2.',
      options: [
        { letter: 'A', text: '−1 ≤ x < 2' },
        { letter: 'B', text: '−5 ≤ x < 10' },
        { letter: 'C', text: '−1 < x ≤ 2' },
        { letter: 'D', text: '1 ≤ x < 2' },
        { letter: 'E', text: '−2 ≤ x < 1' }
      ]
    },
    {
      question_text: 'Which of the following describes the graph of y ≥ −x + 1?',
      correct_answer: 'D',
      explanation: 'Boundary line: y = −x + 1 (slope = −1, y-intercept = 1). Since y ≥ (greater than or equal), use a solid line and shade above.',
      options: [
        { letter: 'A', text: 'Dashed line, slope 1, shading below' },
        { letter: 'B', text: 'Solid line, slope 1, shading above' },
        { letter: 'C', text: 'Dashed line, slope −1, shading above' },
        { letter: 'D', text: 'Solid line, slope −1, shading above' },
        { letter: 'E', text: 'Solid line, slope −1, shading below' }
      ]
    },
    {
      question_text: 'Which values of x satisfy |x| > 3?',
      correct_answer: 'E',
      explanation: '|x| > 3 means x is more than 3 units from zero. This gives x > 3 OR x < −3.',
      options: [
        { letter: 'A', text: '−3 < x < 3' },
        { letter: 'B', text: 'x > 3 only' },
        { letter: 'C', text: 'x < −3 only' },
        { letter: 'D', text: '−3 ≤ x ≤ 3' },
        { letter: 'E', text: 'x < −3 or x > 3' }
      ]
    }
  ],
  '3.6': [ // Absolute Value
    {
      question_text: 'Solve: |x + 5| = 8',
      correct_answer: 'C',
      explanation: 'Set up two cases: Case 1: x + 5 = 8 → x = 3. Case 2: x + 5 = −8 → x = −13.',
      options: [
        { letter: 'A', text: 'x = 3 only' },
        { letter: 'B', text: 'x = −13 only' },
        { letter: 'C', text: 'x = 3 or x = −13' },
        { letter: 'D', text: 'x = 13 or x = −3' },
        { letter: 'E', text: 'x = 8 or x = −5' }
      ]
    },
    {
      question_text: 'Simplify: |−12| − |5| + |−7|',
      correct_answer: 'D',
      explanation: 'Evaluate each: |−12| = 12, |5| = 5, |−7| = 7. Calculate: 12 − 5 + 7 = 14.',
      options: [
        { letter: 'A', text: '0' },
        { letter: 'B', text: '10' },
        { letter: 'C', text: '24' },
        { letter: 'D', text: '14' },
        { letter: 'E', text: '−10' }
      ]
    },
    {
      question_text: 'Solve: |2x + 3| ≤ 9',
      correct_answer: 'B',
      explanation: '|2x + 3| ≤ 9 means "between" → −9 ≤ 2x + 3 ≤ 9. Subtract 3: −12 ≤ 2x ≤ 6. Divide by 2: −6 ≤ x ≤ 3.',
      options: [
        { letter: 'A', text: '−3 ≤ x ≤ 6' },
        { letter: 'B', text: '−6 ≤ x ≤ 3' },
        { letter: 'C', text: 'x ≤ −6 or x ≥ 3' },
        { letter: 'D', text: '−9 ≤ x ≤ 9' },
        { letter: 'E', text: '−12 ≤ x ≤ 6' }
      ]
    },
    {
      question_text: 'The function y = 2|x − 3| − 1 has a vertex at which point?',
      correct_answer: 'C',
      explanation: 'General form: y = a|x − h| + k with vertex (h, k). Here: h = 3, k = −1. Vertex: (3, −1).',
      options: [
        { letter: 'A', text: '(2, 3)' },
        { letter: 'B', text: '(−3, −1)' },
        { letter: 'C', text: '(3, −1)' },
        { letter: 'D', text: '(−3, 1)' },
        { letter: 'E', text: '(1, −3)' }
      ]
    },
    {
      question_text: 'Solve: |4x − 1| > 7',
      correct_answer: 'E',
      explanation: '|4x − 1| > 7 means "outside" → 4x − 1 < −7 OR 4x − 1 > 7. Solve: 4x < −6 → x < −1.5 OR 4x > 8 → x > 2.',
      options: [
        { letter: 'A', text: '−1.5 < x < 2' },
        { letter: 'B', text: 'x < −7 or x > 7' },
        { letter: 'C', text: 'x < −2 or x > 1.5' },
        { letter: 'D', text: '−2 < x < 1.5' },
        { letter: 'E', text: 'x < −1.5 or x > 2' }
      ]
    }
  ]
};

async function addQuestions() {
  console.log('\n➕ ADDING 5 MORE QUESTIONS TO EACH QUIZ');
  console.log('='.repeat(80));

  for (const [lessonKey, newQuestions] of Object.entries(additionalQuestions)) {
    console.log(`\n📚 Lesson ${lessonKey}`);

    // Get lesson ID
    const { data: lesson } = await supabase
      .from('lesson_metadata')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    if (!lesson) {
      console.log(`  ✗ Lesson not found`);
      continue;
    }

    // Get quiz
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id, title')
      .eq('lesson_id', lesson.id);

    if (!quizzes || quizzes.length === 0) {
      console.log(`  ✗ No quiz found`);
      continue;
    }

    const quiz = quizzes[0];
    console.log(`  Quiz: ${quiz.title}`);

    // Get current question count
    const { data: existingQuestions } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);

    const startIndex = existingQuestions?.length || 0;
    console.log(`  Starting at question index: ${startIndex}`);

    // Add new questions
    for (let i = 0; i < newQuestions.length; i++) {
      const q = newQuestions[i];
      const questionOrder = startIndex + i;

      const { data: question, error: questionError } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quiz.id,
          question_text: q.question_text,
          question_order: questionOrder
        })
        .select('id')
        .single();

      if (questionError) {
        console.error(`    ✗ Error adding question ${questionOrder + 1}:`, questionError.message);
        continue;
      }

      console.log(`    ✓ Question ${questionOrder + 1} added`);

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

    // Verify final count
    const { data: finalQuestions } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);

    console.log(`  ✓ Total questions now: ${finalQuestions?.length || 0}`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ All questions added!\n');
}

addQuestions();
