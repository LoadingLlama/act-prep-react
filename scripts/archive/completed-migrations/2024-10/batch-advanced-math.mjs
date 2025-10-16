import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'sequences': {
    title: 'Sequences: Arithmetic & Geometric',
    definitions: [
      { term: 'sequence', definition: 'An ordered list of numbers following a pattern. Each number is called a term.' },
      { term: 'arithmetic sequence', definition: 'Sequence where each term differs from the previous by a constant (common difference). Example: 2, 5, 8, 11...' },
      { term: 'common difference', definition: 'The constant amount added between consecutive terms in an arithmetic sequence. Symbol: d' },
      { term: 'arithmetic formula', definition: 'nth term: aₙ = a₁ + (n-1)d, where a₁ is first term, n is position, d is common difference' },
      { term: 'geometric sequence', definition: 'Sequence where each term is multiplied by a constant (common ratio). Example: 3, 6, 12, 24...' },
      { term: 'common ratio', definition: 'The constant multiplier between consecutive terms in a geometric sequence. Symbol: r' },
      { term: 'geometric formula', definition: 'nth term: aₙ = a₁ · r^(n-1), where a₁ is first term, r is common ratio' },
      { term: 'explicit formula', definition: 'Formula that directly calculates the nth term without finding previous terms' },
      { term: 'recursive formula', definition: 'Formula that defines each term based on the previous term(s)' }
    ],
    questions: [
      { text: 'What is the 5th term of the arithmetic sequence 3, 7, 11, 15, ...?', options: ['17', '19', '21', '23', '25'], correct: 1, exp: 'Common difference d = 4. a₅ = 3 + (5-1)×4 = 3 + 16 = 19' },
      { text: 'Find the common difference: 20, 14, 8, 2, ...', options: ['-6', '-8', '6', '-2', '-4'], correct: 0, exp: 'd = 14 - 20 = -6' },
      { text: 'What is the 4th term of the geometric sequence 2, 6, 18, ...?', options: ['24', '36', '54', '72', '108'], correct: 2, exp: 'Common ratio r = 6÷2 = 3. a₄ = 2 × 3³ = 2 × 27 = 54' },
      { text: 'Find the common ratio: 80, 40, 20, 10, ...', options: ['1/2', '2', '-40', '1/4', '-1/2'], correct: 0, exp: 'r = 40÷80 = 1/2' },
      { text: 'If aₙ = 5 + 3n, what is a₁₀?', options: ['30', '35', '38', '50', '53'], correct: 1, exp: 'Substitute n = 10: a₁₀ = 5 + 3(10) = 5 + 30 = 35' },
      { text: 'What type of sequence is 1, 4, 9, 16, 25, ...?', options: ['Arithmetic', 'Geometric', 'Neither', 'Both', 'Quadratic'], correct: 2, exp: 'Differences are 3, 5, 7, 9 (not constant). Ratios are not constant. Neither arithmetic nor geometric. (These are perfect squares)' },
      { text: 'An arithmetic sequence has a₁ = 7 and d = -2. What is a₆?', options: ['-3', '-1', '1', '3', '5'], correct: 0, exp: 'a₆ = 7 + (6-1)(-2) = 7 + 5(-2) = 7 - 10 = -3' }
    ]
  },
  'exponential-functions': {
    title: 'Exponential Functions',
    definitions: [
      { term: 'exponential function', definition: 'Function in form f(x) = a·bˣ where b > 0, b ≠ 1. Example: f(x) = 2ˣ' },
      { term: 'exponential growth', definition: 'When b > 1, function increases rapidly. Example: population growth, compound interest' },
      { term: 'exponential decay', definition: 'When 0 < b < 1, function decreases rapidly. Example: radioactive decay, depreciation' },
      { term: 'base', definition: 'The constant b in f(x) = a·bˣ. Determines growth (b>1) or decay (0<b<1)' },
      { term: 'initial value', definition: 'The constant a in f(x) = a·bˣ. The value when x = 0: f(0) = a' },
      { term: 'growth factor', definition: 'The base b when b > 1. Often written as (1 + r) where r is growth rate' },
      { term: 'decay factor', definition: 'The base b when 0 < b < 1. Often written as (1 - r) where r is decay rate' },
      { term: 'compound interest formula', definition: 'A = P(1 + r)ᵗ where P is principal, r is rate, t is time' },
      { term: 'half-life', definition: 'Time it takes for a quantity to reduce to half its initial value in exponential decay' }
    ],
    questions: [
      { text: 'If f(x) = 3·2ˣ, what is f(4)?', options: ['12', '24', '48', '64', '81'], correct: 2, exp: 'f(4) = 3·2⁴ = 3·16 = 48' },
      { text: 'Does f(x) = 5·(1.2)ˣ represent growth or decay?', options: ['Growth', 'Decay', 'Neither', 'Both', 'Cannot determine'], correct: 0, exp: 'Base 1.2 > 1, so exponential growth' },
      { text: 'What is the initial value of f(x) = 100·(0.9)ˣ?', options: ['0', '0.9', '10', '90', '100'], correct: 4, exp: 'Initial value is the coefficient a. When x = 0: f(0) = 100·(0.9)⁰ = 100·1 = 100' },
      { text: 'If a population doubles every year starting at 50, what is the population after 3 years?', options: ['100', '150', '200', '300', '400'], correct: 4, exp: 'P(t) = 50·2ᵗ. After 3 years: P(3) = 50·2³ = 50·8 = 400' },
      { text: 'A car worth $20,000 depreciates 15% per year. What is its value after 1 year?', options: ['$3,000', '$17,000', '$18,500', '$19,000', '$19,850'], correct: 1, exp: 'Value = 20000(1 - 0.15)¹ = 20000(0.85) = $17,000' },
      { text: 'What is the decay factor if something loses 30% of its value each period?', options: ['0.3', '0.7', '1.3', '1.7', '3.0'], correct: 1, exp: 'Decay factor = 1 - r = 1 - 0.30 = 0.70' },
      { text: 'If f(x) = a·bˣ and f(0) = 12, what is a?', options: ['0', 'b', '12', '12b', 'Cannot determine'], correct: 2, exp: 'f(0) = a·b⁰ = a·1 = a. Since f(0) = 12, then a = 12' }
    ]
  },
  'transforming-functions': {
    title: 'Transforming Functions',
    definitions: [
      { term: 'transformation', definition: 'A change to a function that shifts, stretches, or reflects its graph' },
      { term: 'vertical shift', definition: 'f(x) + k shifts graph up k units (or down if k < 0)' },
      { term: 'horizontal shift', definition: 'f(x - h) shifts graph right h units (left if h < 0). Note the sign reversal!' },
      { term: 'vertical stretch', definition: 'a·f(x) where |a| > 1 stretches graph vertically by factor a' },
      { term: 'vertical compression', definition: 'a·f(x) where 0 < |a| < 1 compresses graph vertically' },
      { term: 'horizontal stretch', definition: 'f(bx) where 0 < |b| < 1 stretches graph horizontally' },
      { term: 'horizontal compression', definition: 'f(bx) where |b| > 1 compresses graph horizontally' },
      { term: 'reflection over x-axis', definition: '-f(x) flips graph upside down' },
      { term: 'reflection over y-axis', definition: 'f(-x) flips graph left to right' },
      { term: 'combined transformations', definition: 'a·f(b(x - h)) + k applies multiple transformations in order' }
    ],
    questions: [
      { text: 'How does g(x) = f(x) + 3 transform the graph of f(x)?', options: ['Up 3', 'Down 3', 'Right 3', 'Left 3', 'Stretch by 3'], correct: 0, exp: 'Adding 3 shifts the graph up 3 units' },
      { text: 'How does g(x) = f(x - 5) transform the graph of f(x)?', options: ['Up 5', 'Down 5', 'Right 5', 'Left 5', 'No change'], correct: 2, exp: 'f(x - h) shifts right h units. So f(x - 5) shifts right 5 units' },
      { text: 'How does g(x) = -f(x) transform the graph of f(x)?', options: ['Shift up', 'Shift down', 'Reflect over x-axis', 'Reflect over y-axis', 'Rotate 180°'], correct: 2, exp: 'Negative sign reflects graph over x-axis (flips upside down)' },
      { text: 'How does g(x) = 2f(x) transform the graph of f(x)?', options: ['Vertical stretch by 2', 'Horizontal stretch by 2', 'Shift right 2', 'Shift up 2', 'No change'], correct: 0, exp: 'Multiplying by 2 stretches graph vertically by factor of 2' },
      { text: 'How does g(x) = f(x + 4) transform the graph of f(x)?', options: ['Right 4', 'Left 4', 'Up 4', 'Down 4', 'Stretch by 4'], correct: 1, exp: 'f(x + 4) = f(x - (-4)) shifts left 4 units. (Sign reversal!)' },
      { text: 'If f(2) = 5, what is the value of g(2) if g(x) = f(x) - 3?', options: ['2', '3', '5', '7', '8'], correct: 0, exp: 'g(2) = f(2) - 3 = 5 - 3 = 2' },
      { text: 'How does g(x) = (1/2)f(x) transform the graph of f(x)?', options: ['Vertical compression by 1/2', 'Horizontal compression by 1/2', 'Shift up 1/2', 'Shift right 1/2', 'Reflect'], correct: 0, exp: 'Multiplying by 1/2 (where 0 < 1/2 < 1) compresses graph vertically' }
    ]
  },
  'number-theory': {
    title: 'Number Theory',
    definitions: [
      { term: 'prime number', definition: 'A number greater than 1 with exactly two factors: 1 and itself. Examples: 2, 3, 5, 7, 11' },
      { term: 'composite number', definition: 'A number greater than 1 with more than two factors. Examples: 4, 6, 8, 9' },
      { term: 'factor', definition: 'A number that divides evenly into another. Example: 3 is a factor of 12' },
      { term: 'multiple', definition: 'The product of a number and an integer. Example: 12 is a multiple of 3' },
      { term: 'greatest common factor (GCF)', definition: 'The largest factor shared by two or more numbers. GCF of 12 and 18 is 6' },
      { term: 'least common multiple (LCM)', definition: 'The smallest multiple shared by two or more numbers. LCM of 4 and 6 is 12' },
      { term: 'divisibility', definition: 'A number is divisible by another if division results in no remainder' },
      { term: 'even number', definition: 'Integer divisible by 2. Ends in 0, 2, 4, 6, or 8' },
      { term: 'odd number', definition: 'Integer not divisible by 2. Ends in 1, 3, 5, 7, or 9' },
      { term: 'consecutive integers', definition: 'Integers in order with no gaps. Example: 5, 6, 7, 8' }
    ],
    questions: [
      { text: 'Which of the following is a prime number?', options: ['15', '21', '23', '27', '33'], correct: 2, exp: '23 is only divisible by 1 and 23. All others have additional factors.' },
      { text: 'What is the GCF of 24 and 36?', options: ['4', '6', '8', '12', '18'], correct: 3, exp: 'Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. Greatest common: 12' },
      { text: 'What is the LCM of 6 and 8?', options: ['2', '6', '14', '24', '48'], correct: 3, exp: 'Multiples of 6: 6,12,18,24,30... Multiples of 8: 8,16,24,32... Least common: 24' },
      { text: 'How many prime numbers are between 10 and 20?', options: ['2', '3', '4', '5', '6'], correct: 2, exp: 'Primes between 10 and 20: 11, 13, 17, 19. That\'s 4 primes.' },
      { text: 'If n is an even number, which is always odd?', options: ['n + 2', '2n', 'n/2', 'n + 1', 'n - 2'], correct: 3, exp: 'Even + 1 = Odd. Example: 6 + 1 = 7' },
      { text: 'What is the smallest prime number?', options: ['0', '1', '2', '3', '5'], correct: 2, exp: '2 is the smallest (and only even) prime number' },
      { text: 'Three consecutive integers sum to 63. What is the largest?', options: ['20', '21', '22', '23', '24'], correct: 2, exp: 'Let x, x+1, x+2 be the integers. x + (x+1) + (x+2) = 63. So 3x + 3 = 63, 3x = 60, x = 20. Largest is x+2 = 22' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding 4 more Math lessons...\n');

  for (const [key, data] of Object.entries(lessons)) {
    try {
      const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', key).single();
      console.log(`✅ ${lesson.title}`);

      await supabase.from('term_definitions').delete().eq('lesson_key', key);
      const defs = data.definitions.map(d => ({ ...d, lesson_key: key }));
      await supabase.from('term_definitions').insert(defs);
      console.log(`  ✓ ${defs.length} definitions`);

      await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
      const { data: quiz } = await supabase.from('quizzes').insert([{
        lesson_id: lesson.id, title: `${data.title} Practice`, intro: 'Test your understanding.',
        quiz_type: 'practice', position: 999, is_required: false
      }]).select().single();

      const qData = await supabase.from('quiz_questions').insert(
        data.questions.map((q, i) => ({ quiz_id: quiz.id, question_text: q.text, question_order: i }))
      ).select();

      const opts = [];
      qData.data.forEach((dbQ, i) => {
        data.questions[i].options.forEach((opt, j) => {
          opts.push({
            question_id: dbQ.id, option_text: opt, option_order: j,
            is_correct: j === data.questions[i].correct,
            explanation: j === data.questions[i].correct ? data.questions[i].exp : null
          });
        });
      });
      await supabase.from('quiz_options').insert(opts);
      console.log(`  ✓ ${data.questions.length} questions\n`);
    } catch (e) {
      console.error(`❌ Error with ${key}:`, e.message);
    }
  }

  console.log('🎉 Advanced Math batch complete! Now at 18/82 lessons.');
}

addAll();
