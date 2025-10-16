import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const quizData = {
  '4.4': {
    title: 'Transforming Functions Mastery Check',
    questions: [
      {
        question_text: 'The graph of g(x) = f(x − 5) + 2 shifts f(x) in which way?',
        correct_answer: 'C',
        explanation: 'f(x − 5) shifts RIGHT 5 units (opposite sign), and +2 shifts UP 2 units.',
        options: [
          { letter: 'A', text: 'Left 5, up 2' },
          { letter: 'B', text: 'Left 5, down 2' },
          { letter: 'C', text: 'Right 5, up 2' },
          { letter: 'D', text: 'Right 5, down 2' },
          { letter: 'E', text: 'Up 5, right 2' }
        ]
      },
      {
        question_text: 'If the point (3, 8) is on y = f(x), what point is on y = 2f(x)?',
        correct_answer: 'B',
        explanation: 'Vertical stretch multiplies y-values only: x stays 3, y becomes 2 × 8 = 16.',
        options: [
          { letter: 'A', text: '(6, 8)' },
          { letter: 'B', text: '(3, 16)' },
          { letter: 'C', text: '(6, 16)' },
          { letter: 'D', text: '(1.5, 8)' },
          { letter: 'E', text: '(3, 4)' }
        ]
      },
      {
        question_text: 'Which transformation reflects f(x) = x² across the x-axis?',
        correct_answer: 'A',
        explanation: 'To reflect across the x-axis, negate the entire function: −f(x) = −x².',
        options: [
          { letter: 'A', text: 'g(x) = −x²' },
          { letter: 'B', text: 'g(x) = (−x)²' },
          { letter: 'C', text: 'g(x) = x² − 1' },
          { letter: 'D', text: 'g(x) = x² + 1' },
          { letter: 'E', text: 'g(x) = 2x²' }
        ]
      },
      {
        question_text: 'The function h(x) = −3f(x + 2) − 1 includes which transformations?',
        correct_answer: 'D',
        explanation: '−3 creates reflection over x-axis and vertical stretch by 3. (x + 2) shifts LEFT 2. −1 shifts DOWN 1.',
        options: [
          { letter: 'A', text: 'Vertical stretch by 3, right 2, down 1' },
          { letter: 'B', text: 'Reflect over y-axis, vertical stretch by 3, left 2, down 1' },
          { letter: 'C', text: 'Vertical compression by 1/3, left 2, up 1' },
          { letter: 'D', text: 'Reflect over x-axis, vertical stretch by 3, left 2, down 1' },
          { letter: 'E', text: 'Reflect over x-axis, left 2, up 3' }
        ]
      },
      {
        question_text: 'If f(x) = √x has its starting point at (0, 0), where is the starting point of g(x) = √(x + 4) − 3?',
        correct_answer: 'B',
        explanation: '(x + 4) shifts LEFT 4 to x = −4. −3 shifts DOWN 3 to y = −3. New starting point: (−4, −3).',
        options: [
          { letter: 'A', text: '(4, 3)' },
          { letter: 'B', text: '(−4, −3)' },
          { letter: 'C', text: '(4, −3)' },
          { letter: 'D', text: '(−4, 3)' },
          { letter: 'E', text: '(0, −3)' }
        ]
      },
      {
        question_text: 'Which is wider: y = x² or y = 0.5x²?',
        correct_answer: 'B',
        explanation: 'When 0 < |a| < 1, the parabola is wider (vertically compressed). Since 0.5 < 1, y = 0.5x² is wider.',
        options: [
          { letter: 'A', text: 'y = x²' },
          { letter: 'B', text: 'y = 0.5x²' },
          { letter: 'C', text: 'Same width' },
          { letter: 'D', text: 'Cannot be determined' },
          { letter: 'E', text: 'Neither has width' }
        ]
      },
      {
        question_text: 'What transformation takes y = |x| to y = |−x|?',
        correct_answer: 'C',
        explanation: 'f(−x) reflects across the y-axis. However, |x| is symmetric, so |−x| = |x| produces the same graph.',
        options: [
          { letter: 'A', text: 'Reflection over x-axis' },
          { letter: 'B', text: 'Shift right' },
          { letter: 'C', text: 'No change (same graph)' },
          { letter: 'D', text: 'Vertical stretch' },
          { letter: 'E', text: 'Shift up' }
        ]
      },
      {
        question_text: 'If (2, 5) is on f(x), what point is on y = f(2x)?',
        correct_answer: 'A',
        explanation: 'f(2x) compresses horizontally by 1/2. To get the same output (y = 5), we need 2x = 2, so x = 1. Point: (1, 5).',
        options: [
          { letter: 'A', text: '(1, 5)' },
          { letter: 'B', text: '(4, 5)' },
          { letter: 'C', text: '(2, 10)' },
          { letter: 'D', text: '(2, 2.5)' },
          { letter: 'E', text: '(1, 10)' }
        ]
      },
      {
        question_text: 'The vertex of f(x) = x² is at (0, 0). What is the vertex of g(x) = (x − 3)² + 7?',
        correct_answer: 'E',
        explanation: '(x − 3) shifts RIGHT 3 to x = 3. +7 shifts UP 7 to y = 7. Vertex: (3, 7).',
        options: [
          { letter: 'A', text: '(−3, 7)' },
          { letter: 'B', text: '(3, −7)' },
          { letter: 'C', text: '(−3, −7)' },
          { letter: 'D', text: '(0, 7)' },
          { letter: 'E', text: '(3, 7)' }
        ]
      },
      {
        question_text: 'Which transformation makes a graph narrower?',
        correct_answer: 'B',
        explanation: 'Vertical stretch by factor > 1 makes graphs narrower. |3| > 1, so multiplying by 3 creates a narrower graph.',
        options: [
          { letter: 'A', text: 'Multiply by 0.5' },
          { letter: 'B', text: 'Multiply by 3' },
          { letter: 'C', text: 'Add 3' },
          { letter: 'D', text: 'Subtract 3' },
          { letter: 'E', text: 'Replace x with 0.5x' }
        ]
      }
    ]
  },
  '4.5': {
    title: 'Exponential Growth and Decay Mastery Check',
    questions: [
      {
        question_text: 'A population of 500 bacteria triples every hour. How many bacteria are there after 4 hours?',
        correct_answer: 'D',
        explanation: 'Use P(t) = P₀·r^t with P₀ = 500, r = 3, t = 4: P(4) = 500·3⁴ = 500·81 = 40,500.',
        options: [
          { letter: 'A', text: '6,000' },
          { letter: 'B', text: '20,000' },
          { letter: 'C', text: '30,000' },
          { letter: 'D', text: '40,500' },
          { letter: 'E', text: '60,750' }
        ]
      },
      {
        question_text: 'If $5,000 is invested at 8% annual interest compounded annually, what is the value after 3 years?',
        correct_answer: 'C',
        explanation: 'A = P(1 + r)^t = 5000(1.08)³ = 5000(1.259712) = $6,298.56.',
        options: [
          { letter: 'A', text: '$6,000.00' },
          { letter: 'B', text: '$6,200.00' },
          { letter: 'C', text: '$6,298.56' },
          { letter: 'D', text: '$6,500.00' },
          { letter: 'E', text: '$6,400.00' }
        ]
      },
      {
        question_text: 'A substance has a half-life of 10 years. If you start with 200 grams, how much remains after 30 years?',
        correct_answer: 'B',
        explanation: '30 years = 3 half-lives. A(t) = A₀·(1/2)^(t/h) = 200·(1/2)³ = 200·(1/8) = 25 grams.',
        options: [
          { letter: 'A', text: '50 grams' },
          { letter: 'B', text: '25 grams' },
          { letter: 'C', text: '12.5 grams' },
          { letter: 'D', text: '6.25 grams' },
          { letter: 'E', text: '100 grams' }
        ]
      },
      {
        question_text: 'Solve for x: 3^(x+2) = 81',
        correct_answer: 'B',
        explanation: 'Rewrite 81 as 3⁴: 3^(x+2) = 3⁴. Set exponents equal: x + 2 = 4, so x = 2.',
        options: [
          { letter: 'A', text: 'x = 1' },
          { letter: 'B', text: 'x = 2' },
          { letter: 'C', text: 'x = 3' },
          { letter: 'D', text: 'x = 4' },
          { letter: 'E', text: 'x = 6' }
        ]
      },
      {
        question_text: 'Which represents 12% decay per year?',
        correct_answer: 'A',
        explanation: 'Decay by r% means multiply by (1 − r/100). For 12% decay: 1 − 0.12 = 0.88.',
        options: [
          { letter: 'A', text: 'y = a(0.88)^t' },
          { letter: 'B', text: 'y = a(1.12)^t' },
          { letter: 'C', text: 'y = a(0.12)^t' },
          { letter: 'D', text: 'y = a(1.88)^t' },
          { letter: 'E', text: 'y = a − 0.12t' }
        ]
      },
      {
        question_text: 'An exponential growth function has what domain and range (for a > 0)?',
        correct_answer: 'C',
        explanation: 'Exponential functions f(x) = a·b^x with a > 0 have domain: all real numbers, range: (0, ∞).',
        options: [
          { letter: 'A', text: 'Domain: (0, ∞), Range: all reals' },
          { letter: 'B', text: 'Domain: all reals, Range: all reals' },
          { letter: 'C', text: 'Domain: all reals, Range: (0, ∞)' },
          { letter: 'D', text: 'Domain: (0, ∞), Range: (0, ∞)' },
          { letter: 'E', text: 'Domain: [0, ∞), Range: [0, ∞)' }
        ]
      },
      {
        question_text: 'Which grows faster: f(x) = 200(1.03)^x or g(x) = 100(1.06)^x?',
        correct_answer: 'E',
        explanation: 'Growth rate depends on the base. Since 1.06 > 1.03, g(x) grows faster. Eventually g(x) surpasses f(x).',
        options: [
          { letter: 'A', text: 'f(x) always' },
          { letter: 'B', text: 'g(x) always' },
          { letter: 'C', text: 'Same rate' },
          { letter: 'D', text: 'f(x) initially and forever' },
          { letter: 'E', text: 'f(x) initially, then g(x)' }
        ]
      },
      {
        question_text: 'Solve: 2^(3x) = 32',
        correct_answer: 'C',
        explanation: 'Rewrite 32 as 2⁵: 2^(3x) = 2⁵. Set exponents equal: 3x = 5, so x = 5/3.',
        options: [
          { letter: 'A', text: 'x = 3' },
          { letter: 'B', text: 'x = 5' },
          { letter: 'C', text: 'x = 5/3' },
          { letter: 'D', text: 'x = 3/5' },
          { letter: 'E', text: 'x = 15' }
        ]
      },
      {
        question_text: 'A car depreciates 20% per year. If it costs $30,000 new, what is its value after 2 years?',
        correct_answer: 'B',
        explanation: '20% depreciation means b = 0.80. V(2) = 30000(0.80)² = 30000(0.64) = $19,200.',
        options: [
          { letter: 'A', text: '$18,000' },
          { letter: 'B', text: '$19,200' },
          { letter: 'C', text: '$20,000' },
          { letter: 'D', text: '$24,000' },
          { letter: 'E', text: '$21,600' }
        ]
      },
      {
        question_text: 'All exponential functions f(x) = a·b^x (with a ≠ 0) pass through which point?',
        correct_answer: 'A',
        explanation: 'When x = 0, f(0) = a·b⁰ = a·1 = a. So all pass through (0, a), the y-intercept.',
        options: [
          { letter: 'A', text: '(0, a)' },
          { letter: 'B', text: '(1, b)' },
          { letter: 'C', text: '(a, 0)' },
          { letter: 'D', text: '(1, a)' },
          { letter: 'E', text: '(b, 1)' }
        ]
      }
    ]
  },
  '4.6': {
    title: 'Sequences Mastery Check',
    questions: [
      {
        question_text: 'Find the 15th term of the arithmetic sequence: 7, 12, 17, 22, ...',
        correct_answer: 'D',
        explanation: 'a₁ = 7, d = 5. Use aₙ = a₁ + (n−1)d: a₁₅ = 7 + (15−1)(5) = 7 + 70 = 77.',
        options: [
          { letter: 'A', text: '67' },
          { letter: 'B', text: '72' },
          { letter: 'C', text: '75' },
          { letter: 'D', text: '77' },
          { letter: 'E', text: '82' }
        ]
      },
      {
        question_text: 'What is the 6th term of the geometric sequence: 3, 6, 12, 24, ...?',
        correct_answer: 'C',
        explanation: 'a₁ = 3, r = 2. Use aₙ = a₁·r^(n−1): a₆ = 3·2⁵ = 3·32 = 96.',
        options: [
          { letter: 'A', text: '48' },
          { letter: 'B', text: '72' },
          { letter: 'C', text: '96' },
          { letter: 'D', text: '144' },
          { letter: 'E', text: '192' }
        ]
      },
      {
        question_text: 'What is the sum of the first 10 terms of the sequence 5, 8, 11, 14, ...?',
        correct_answer: 'E',
        explanation: 'Arithmetic: a₁ = 5, d = 3. Find a₁₀ = 5 + 9(3) = 32. Sum: S₁₀ = 10(5 + 32)/2 = 10(37)/2 = 185.',
        options: [
          { letter: 'A', text: '140' },
          { letter: 'B', text: '155' },
          { letter: 'C', text: '170' },
          { letter: 'D', text: '175' },
          { letter: 'E', text: '185' }
        ]
      },
      {
        question_text: 'Is the sequence 64, 32, 16, 8, ... arithmetic or geometric?',
        correct_answer: 'B',
        explanation: 'Check ratios: 32/64 = 1/2, 16/32 = 1/2, 8/16 = 1/2. Constant ratio means geometric with r = 1/2.',
        options: [
          { letter: 'A', text: 'Arithmetic' },
          { letter: 'B', text: 'Geometric' },
          { letter: 'C', text: 'Neither' },
          { letter: 'D', text: 'Both' },
          { letter: 'E', text: 'Cannot be determined' }
        ]
      },
      {
        question_text: 'An auditorium has 20 rows. The first row has 30 seats, and each row has 3 more than the previous. How many total seats?',
        correct_answer: 'C',
        explanation: 'Arithmetic: a₁ = 30, d = 3, n = 20. Last row: a₂₀ = 30 + 19(3) = 87. Sum: S₂₀ = 20(30 + 87)/2 = 1,170.',
        options: [
          { letter: 'A', text: '1,050' },
          { letter: 'B', text: '1,110' },
          { letter: 'C', text: '1,170' },
          { letter: 'D', text: '1,200' },
          { letter: 'E', text: '1,260' }
        ]
      },
      {
        question_text: 'What is the common ratio of 5, 15, 45, 135, ...?',
        correct_answer: 'C',
        explanation: 'Divide consecutive terms: 15/5 = 3, 45/15 = 3, 135/45 = 3. Common ratio r = 3.',
        options: [
          { letter: 'A', text: '2' },
          { letter: 'B', text: '2.5' },
          { letter: 'C', text: '3' },
          { letter: 'D', text: '10' },
          { letter: 'E', text: '5' }
        ]
      },
      {
        question_text: 'Find the 8th term: 100, 90, 80, 70, ...',
        correct_answer: 'B',
        explanation: 'Arithmetic: a₁ = 100, d = −10. Use aₙ = a₁ + (n−1)d: a₈ = 100 + 7(−10) = 100 − 70 = 30.',
        options: [
          { letter: 'A', text: '20' },
          { letter: 'B', text: '30' },
          { letter: 'C', text: '40' },
          { letter: 'D', text: '10' },
          { letter: 'E', text: '0' }
        ]
      },
      {
        question_text: 'What is the 5th term of the geometric sequence with a₁ = 2 and r = 3?',
        correct_answer: 'D',
        explanation: 'Use aₙ = a₁·r^(n−1): a₅ = 2·3⁴ = 2·81 = 162.',
        options: [
          { letter: 'A', text: '54' },
          { letter: 'B', text: '81' },
          { letter: 'C', text: '108' },
          { letter: 'D', text: '162' },
          { letter: 'E', text: '243' }
        ]
      },
      {
        question_text: 'In an arithmetic sequence, if a₃ = 14 and a₇ = 30, what is the common difference?',
        correct_answer: 'E',
        explanation: 'From term 3 to term 7 is 4 steps. 30 = 14 + 4d, so 4d = 16, giving d = 4.',
        options: [
          { letter: 'A', text: '2' },
          { letter: 'B', text: '3' },
          { letter: 'C', text: '3.5' },
          { letter: 'D', text: '8' },
          { letter: 'E', text: '4' }
        ]
      },
      {
        question_text: 'Sum of first 5 terms of geometric sequence 2, 6, 18, 54, ...?',
        correct_answer: 'C',
        explanation: 'a₁ = 2, r = 3. Use Sₙ = a₁(1 − r^n)/(1 − r): S₅ = 2(1 − 3⁵)/(1 − 3) = 2(−242)/(−2) = 242.',
        options: [
          { letter: 'A', text: '160' },
          { letter: 'B', text: '200' },
          { letter: 'C', text: '242' },
          { letter: 'D', text: '280' },
          { letter: 'E', text: '320' }
        ]
      }
    ]
  }
};

async function createQuizForLesson(lessonKey, quizInfo) {
  console.log(`\n📝 Creating quiz for ${lessonKey}`);
  console.log('-'.repeat(80));

  // Get lesson ID
  const { data: lesson, error: lessonError } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', lessonKey)
    .single();

  if (lessonError) {
    console.error(`❌ Lesson ${lessonKey} not found`);
    return;
  }

  console.log(`✓ Lesson ID: ${lesson.id}`);

  // Create quiz
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .insert({
      title: quizInfo.title,
      lesson_id: lesson.id,
      position: 11
    })
    .select('id')
    .single();

  if (quizError) {
    console.error(`❌ Error creating quiz:`, quizError.message);
    return;
  }

  console.log(`✓ Quiz created with ID: ${quiz.id}`);

  // Add questions
  for (let i = 0; i < quizInfo.questions.length; i++) {
    const q = quizInfo.questions[i];

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
      console.error(`  ✗ Error adding question ${i + 1}`);
      continue;
    }

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

  console.log(`✓ Added ${quizInfo.questions.length} questions`);
}

async function main() {
  console.log('\n📝 BATCH CREATING QUIZZES FOR LESSONS 4.4-4.6');
  console.log('='.repeat(80));

  for (const [lessonKey, quizInfo] of Object.entries(quizData)) {
    await createQuizForLesson(lessonKey, quizInfo);
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL QUIZZES CREATED SUCCESSFULLY!\n');
}

main();
