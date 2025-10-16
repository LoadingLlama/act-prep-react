import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const quizzes = [
  {
    lesson_key: '3.4',
    title: '🔒 Mastery Quiz: Logarithms',
    questions: [
      {
        question_text: 'If log₅(x) = 3, what is the value of x?',
        correct_answer: 'C',
        explanation: 'Convert logarithmic form to exponential form: log₅(x) = 3 means 5³ = x. Calculate: 5³ = 5 × 5 × 5 = 125.',
        options: [
          { letter: 'A', text: '8' },
          { letter: 'B', text: '15' },
          { letter: 'C', text: '125' },
          { letter: 'D', text: '243' },
          { letter: 'E', text: '625' }
        ]
      },
      {
        question_text: 'Which expression is equivalent to log₂(8x⁴)?',
        correct_answer: 'B',
        explanation: 'Use Product Rule: log₂(8x⁴) = log₂(8) + log₂(x⁴). Then use Power Rule: log₂(x⁴) = 4log₂(x). Since 2³ = 8, log₂(8) = 3. Final answer: 3 + 4log₂(x).',
        options: [
          { letter: 'A', text: 'log₂(12x)' },
          { letter: 'B', text: '3 + 4log₂(x)' },
          { letter: 'C', text: '8log₂(x⁴)' },
          { letter: 'D', text: 'log₂(8) + log₂(4x)' },
          { letter: 'E', text: '32log₂(x)' }
        ]
      },
      {
        question_text: 'If ln(x) = 4, which of the following is closest to the value of x?',
        correct_answer: 'D',
        explanation: 'ln(x) = 4 means logₑ(x) = 4, which converts to e⁴ = x. Using a calculator: e⁴ ≈ 54.6. We know e ≈ 2.718, so e⁴ should be between 16 (2⁴) and 81 (3⁴).',
        options: [
          { letter: 'A', text: '16' },
          { letter: 'B', text: '24' },
          { letter: 'C', text: '40' },
          { letter: 'D', text: '55' },
          { letter: 'E', text: '64' }
        ]
      },
      {
        question_text: 'If log₃(x + 2) + log₃(x − 2) = 2, what is the value of x?',
        correct_answer: 'C',
        explanation: 'Use Product Rule: log₃[(x + 2)(x − 2)] = 2. Convert to exponential: (x + 2)(x − 2) = 3² = 9. Using difference of squares: x² − 4 = 9, so x² = 13. Therefore x = √13 ≈ 3.6 (reject negative solution as it makes log₃(x − 2) undefined).',
        options: [
          { letter: 'A', text: '2' },
          { letter: 'B', text: '3' },
          { letter: 'C', text: '√13' },
          { letter: 'D', text: '4' },
          { letter: 'E', text: '5' }
        ]
      },
      {
        question_text: 'Using the change of base formula, log₇(50) is equivalent to which of the following?',
        correct_answer: 'E',
        explanation: 'The change of base formula states: log₇(50) = log(50)/log(7) = ln(50)/ln(7). Either form with log (base 10) or ln (base e) is correct.',
        options: [
          { letter: 'A', text: 'log(7)/log(50)' },
          { letter: 'B', text: '50 × log(7)' },
          { letter: 'C', text: '7/log(50)' },
          { letter: 'D', text: 'log(7) − log(50)' },
          { letter: 'E', text: 'log(50)/log(7)' }
        ]
      }
    ]
  },
  {
    lesson_key: '3.5',
    title: '🔒 Mastery Quiz: Inequalities',
    questions: [
      {
        question_text: 'If −4x + 9 > 25, what is the solution for x?',
        correct_answer: 'B',
        explanation: 'Subtract 9: −4x > 16. Divide by −4 and flip the sign: x < −4. Remember to flip when dividing by a negative!',
        options: [
          { letter: 'A', text: 'x > −4' },
          { letter: 'B', text: 'x < −4' },
          { letter: 'C', text: 'x > 4' },
          { letter: 'D', text: 'x < 4' },
          { letter: 'E', text: 'x < −8.5' }
        ]
      },
      {
        question_text: 'Solve for x: −1 < 2x − 5 ≤ 7',
        correct_answer: 'C',
        explanation: 'Add 5 to all three parts: 4 < 2x ≤ 12. Divide all parts by 2: 2 < x ≤ 6.',
        options: [
          { letter: 'A', text: '−3 < x ≤ 1' },
          { letter: 'B', text: '−1 < x ≤ 7' },
          { letter: 'C', text: '2 < x ≤ 6' },
          { letter: 'D', text: '4 < x ≤ 12' },
          { letter: 'E', text: '2 ≤ x < 6' }
        ]
      },
      {
        question_text: 'Which of the following best describes the graph of y < 3x − 2?',
        correct_answer: 'B',
        explanation: 'The boundary line is y = 3x − 2 (slope = 3, y-intercept = −2). Since we have < (not ≤), use a dashed line. Since y < (less than), shade below the line.',
        options: [
          { letter: 'A', text: 'Solid line with slope 3, shading above' },
          { letter: 'B', text: 'Dashed line with slope 3, shading below' },
          { letter: 'C', text: 'Dashed line with slope 3, shading above' },
          { letter: 'D', text: 'Solid line with slope −2, shading below' },
          { letter: 'E', text: 'Dashed line with slope −3, shading below' }
        ]
      },
      {
        question_text: 'Which point satisfies both inequalities: y ≥ x − 1 AND y < −x + 5?',
        correct_answer: 'C',
        explanation: 'Test each point: (2, 2) → Check first: 2 ≥ 2 − 1 = 1 ✓. Check second: 2 < −2 + 5 = 3 ✓. Both conditions satisfied.',
        options: [
          { letter: 'A', text: '(0, −2)' },
          { letter: 'B', text: '(1, −1)' },
          { letter: 'C', text: '(2, 2)' },
          { letter: 'D', text: '(4, 4)' },
          { letter: 'E', text: '(6, 0)' }
        ]
      },
      {
        question_text: 'Which inequality represents all points inside the circle with center (0, 0) and radius 5?',
        correct_answer: 'A',
        explanation: 'Circle equation: x² + y² = r². For radius 5: x² + y² = 25. Inside the circle means less than or equal to: x² + y² ≤ 25.',
        options: [
          { letter: 'A', text: 'x² + y² ≤ 25' },
          { letter: 'B', text: 'x² + y² ≥ 25' },
          { letter: 'C', text: 'x² + y² < 5' },
          { letter: 'D', text: 'x + y ≤ 25' },
          { letter: 'E', text: '√(x² + y²) ≤ 5' }
        ]
      }
    ]
  },
  {
    lesson_key: '3.6',
    title: '🔒 Mastery Quiz: Absolute Value',
    questions: [
      {
        question_text: 'What is the value of 3|−8| − 2|5| + |−3|?',
        correct_answer: 'B',
        explanation: 'Evaluate each absolute value: |−8| = 8, |5| = 5, |−3| = 3. Calculate: 3(8) − 2(5) + 3 = 24 − 10 + 3 = 17.',
        options: [
          { letter: 'A', text: '11' },
          { letter: 'B', text: '17' },
          { letter: 'C', text: '21' },
          { letter: 'D', text: '27' },
          { letter: 'E', text: '37' }
        ]
      },
      {
        question_text: 'If |2x − 7| = 11, what are all possible values of x?',
        correct_answer: 'D',
        explanation: 'Set up two cases: Case 1: 2x − 7 = 11 → 2x = 18 → x = 9. Case 2: 2x − 7 = −11 → 2x = −4 → x = −2.',
        options: [
          { letter: 'A', text: 'x = 9 only' },
          { letter: 'B', text: 'x = −2 only' },
          { letter: 'C', text: 'x = 9 or x = −9' },
          { letter: 'D', text: 'x = 9 or x = −2' },
          { letter: 'E', text: 'x = 18 or x = −4' }
        ]
      },
      {
        question_text: 'Which of the following represents all solutions to |x − 4| < 3?',
        correct_answer: 'B',
        explanation: '|x − 4| < 3 means "between" → −3 < x − 4 < 3. Add 4 to all parts: 1 < x < 7.',
        options: [
          { letter: 'A', text: 'x < 1 or x > 7' },
          { letter: 'B', text: '1 < x < 7' },
          { letter: 'C', text: 'x < −3 or x > 3' },
          { letter: 'D', text: '−3 < x < 3' },
          { letter: 'E', text: 'x < 7' }
        ]
      },
      {
        question_text: 'What is the vertex of the function y = −3|x + 2| + 5?',
        correct_answer: 'A',
        explanation: 'The general form is y = a|x − h| + k with vertex at (h, k). Rewrite: y = −3|x − (−2)| + 5. So h = −2, k = 5. Vertex: (−2, 5).',
        options: [
          { letter: 'A', text: '(−2, 5)' },
          { letter: 'B', text: '(2, 5)' },
          { letter: 'C', text: '(−2, −5)' },
          { letter: 'D', text: '(3, 2)' },
          { letter: 'E', text: '(0, 5)' }
        ]
      },
      {
        question_text: 'Which of the following represents all solutions to |3x + 1| ≥ 8?',
        correct_answer: 'E',
        explanation: '|3x + 1| ≥ 8 means "outside" → 3x + 1 ≤ −8 OR 3x + 1 ≥ 8. Solve: 3x ≤ −9 → x ≤ −3 OR 3x ≥ 7 → x ≥ 7/3.',
        options: [
          { letter: 'A', text: '−3 ≤ x ≤ 7/3' },
          { letter: 'B', text: 'x ≤ 3 or x ≥ 7' },
          { letter: 'C', text: 'x ≤ −9 or x ≥ 7' },
          { letter: 'D', text: '−8 ≤ x ≤ 8' },
          { letter: 'E', text: 'x ≤ −3 or x ≥ 7/3' }
        ]
      }
    ]
  }
];

async function createQuizzes() {
  console.log('\n🎯 CREATING MASTERY CHECK QUIZZES');
  console.log('='.repeat(80));

  for (const quizData of quizzes) {
    try {
      console.log(`\n📝 Creating quiz for lesson ${quizData.lesson_key}...`);

      // Get lesson ID from lesson_key
      const { data: lesson, error: lessonError } = await supabase
        .from('lesson_metadata')
        .select('id')
        .eq('lesson_key', quizData.lesson_key)
        .single();

      if (lessonError || !lesson) {
        console.error(`  ✗ Lesson ${quizData.lesson_key} not found`);
        continue;
      }

      // Insert quiz
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title: quizData.title,
          lesson_id: lesson.id
        })
        .select('id')
        .single();

      if (quizError) {
        console.error(`  ✗ Error creating quiz:`, quizError.message);
        continue;
      }

      console.log(`  ✓ Quiz created: "${quizData.title}"`);

      // Insert questions
      for (let i = 0; i < quizData.questions.length; i++) {
        const q = quizData.questions[i];

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
          console.error(`    ✗ Error creating question ${i + 1}:`, questionError.message);
          continue;
        }

        console.log(`    ✓ Question ${i + 1} created`);

        // Insert options
        for (let j = 0; j < q.options.length; j++) {
          const opt = q.options[j];
          const isCorrect = opt.letter === q.correct_answer;

          const { error: optionError } = await supabase
            .from('quiz_options')
            .insert({
              question_id: question.id,
              option_text: opt.text,
              is_correct: isCorrect,
              explanation: isCorrect ? q.explanation : null,
              option_order: j
            });

          if (optionError) {
            console.error(`      ✗ Error creating option ${opt.letter}:`, optionError.message);
          }
        }

        console.log(`      ✓ 5 options created`);
      }

    } catch (error) {
      console.error(`✗ Error processing quiz for ${quizData.lesson_key}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ All quizzes created!\n');
}

createQuizzes();
