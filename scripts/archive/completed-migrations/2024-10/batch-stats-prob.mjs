import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'probability': {
    title: 'Probability',
    definitions: [
      { term: 'probability', definition: 'Measure of likelihood an event occurs. P(event) = favorable outcomes / total outcomes' },
      { term: 'outcome', definition: 'A possible result of an experiment or event' },
      { term: 'sample space', definition: 'Set of all possible outcomes. Example: rolling a die = {1,2,3,4,5,6}' },
      { term: 'event', definition: 'A set of outcomes. Example: rolling an even number = {2,4,6}' },
      { term: 'independent events', definition: 'Events where one does not affect the other. P(A and B) = P(A) × P(B)' },
      { term: 'dependent events', definition: 'Events where one affects the other. Example: drawing cards without replacement' },
      { term: 'complementary events', definition: 'Event and its opposite. P(A) + P(not A) = 1' },
      { term: 'mutually exclusive', definition: 'Events that cannot both occur. P(A or B) = P(A) + P(B)' },
      { term: 'compound probability', definition: 'Probability of two or more events occurring together or separately' }
    ],
    questions: [
      { text: 'What is the probability of rolling a 4 on a standard die?', options: ['1/2', '1/3', '1/4', '1/6', '1/12'], correct: 3, exp: 'One favorable outcome (4) out of 6 total: P = 1/6' },
      { text: 'A bag has 3 red and 7 blue marbles. What is P(red)?', options: ['3/7', '3/10', '7/10', '1/3', '1/2'], correct: 1, exp: '3 red out of 10 total: P(red) = 3/10' },
      { text: 'If P(rain) = 0.3, what is P(no rain)?', options: ['0.3', '0.5', '0.6', '0.7', '1.0'], correct: 3, exp: 'Complementary: P(not rain) = 1 - 0.3 = 0.7' },
      { text: 'You flip a coin twice. What is P(heads both times)?', options: ['1/8', '1/4', '1/3', '1/2', '3/4'], correct: 1, exp: 'Independent events: P(H and H) = 1/2 × 1/2 = 1/4' },
      { text: 'Rolling a die, what is P(even number)?', options: ['1/6', '1/3', '1/2', '2/3', '5/6'], correct: 2, exp: 'Even numbers {2,4,6} = 3 outcomes out of 6: P = 3/6 = 1/2' },
      { text: 'A deck has 52 cards. What is P(drawing an ace)?', options: ['1/13', '1/26', '1/52', '4/13', '4/52'], correct: 0, exp: '4 aces in 52 cards: P = 4/52 = 1/13' },
      { text: 'What is P(rolling 1 OR 2 on a die)?', options: ['1/6', '1/3', '1/2', '2/3', '5/6'], correct: 1, exp: 'Mutually exclusive: P(1 or 2) = 1/6 + 1/6 = 2/6 = 1/3' }
    ]
  },
  'statistics-basics': {
    title: 'Statistics Basics',
    definitions: [
      { term: 'mean', definition: 'Average. Sum of values divided by count. Example: mean of {2,4,6} = (2+4+6)/3 = 4' },
      { term: 'median', definition: 'Middle value when data is ordered. For even count, average the two middle values.' },
      { term: 'mode', definition: 'Most frequent value(s) in a dataset' },
      { term: 'range', definition: 'Difference between maximum and minimum values' },
      { term: 'outlier', definition: 'A value significantly different from others in the dataset' },
      { term: 'frequency', definition: 'How many times a value appears in a dataset' },
      { term: 'data set', definition: 'Collection of data values or observations' },
      { term: 'measures of center', definition: 'Statistics describing the middle of data: mean, median, mode' },
      { term: 'measures of spread', definition: 'Statistics describing variability: range, standard deviation' }
    ],
    questions: [
      { text: 'Find the mean of: 10, 20, 30, 40', options: ['20', '25', '30', '35', '100'], correct: 1, exp: 'Mean = (10+20+30+40)/4 = 100/4 = 25' },
      { text: 'Find the median of: 3, 7, 2, 9, 5', options: ['3', '5', '7', '5.2', '26'], correct: 1, exp: 'Order: 2,3,5,7,9. Middle value = 5' },
      { text: 'Find the mode of: 4, 2, 4, 7, 4, 3', options: ['2', '3', '4', '7', 'No mode'], correct: 2, exp: '4 appears most frequently (3 times)' },
      { text: 'Find the range of: 15, 8, 23, 12, 19', options: ['8', '15', '23', '15.4', '77'], correct: 1, exp: 'Range = max - min = 23 - 8 = 15' },
      { text: 'Find the median of: 2, 4, 6, 8', options: ['4', '5', '6', '4.5', '5.5'], correct: 1, exp: 'Order: 2,4,6,8. Middle two: 4 and 6. Median = (4+6)/2 = 5' },
      { text: 'Which measure is most affected by outliers?', options: ['Mean', 'Median', 'Mode', 'Range', 'All equally'], correct: 0, exp: 'Mean uses all values, so outliers change it significantly. Median is more resistant.' },
      { text: 'Data: 5, 5, 5, 10, 20. What are the mean and median?', options: ['Mean=9, Median=5', 'Mean=5, Median=9', 'Mean=10, Median=5', 'Mean=5, Median=10', 'Mean=9, Median=9'], correct: 0, exp: 'Mean = (5+5+5+10+20)/5 = 45/5 = 9. Median = middle value = 5' }
    ]
  },
  'patterns-sequences': {
    title: 'Patterns and Sequences',
    definitions: [
      { term: 'pattern', definition: 'A repeating or predictable arrangement of numbers, shapes, or objects' },
      { term: 'sequence', definition: 'An ordered list following a rule. Example: 2, 4, 6, 8...' },
      { term: 'term', definition: 'An individual element in a sequence' },
      { term: 'common pattern types', definition: 'Adding/subtracting (arithmetic), multiplying/dividing (geometric), squaring, etc.' },
      { term: 'position', definition: 'The location of a term in a sequence. First term is position 1 (or n=1)' },
      { term: 'rule', definition: 'The relationship or formula that generates the sequence' },
      { term: 'extending a pattern', definition: 'Finding the next terms by identifying and applying the rule' },
      { term: 'visual pattern', definition: 'Pattern using shapes, colors, or spatial arrangements rather than numbers' }
    ],
    questions: [
      { text: 'What is the next term in: 2, 5, 8, 11, __?', options: ['12', '13', '14', '15', '16'], correct: 2, exp: 'Pattern: add 3 each time. 11 + 3 = 14' },
      { text: 'What is the pattern rule for: 1, 4, 9, 16, 25?', options: ['Add 3, then 5, then 7...', 'Multiply by 4', 'Square numbers', 'Add consecutive numbers', 'Multiply by n'], correct: 2, exp: '1²=1, 2²=4, 3²=9, 4²=16, 5²=25. These are perfect squares.' },
      { text: 'What is the 10th term of: 3, 6, 9, 12, ...?', options: ['27', '30', '33', '36', '39'], correct: 1, exp: 'Pattern: multiples of 3. 10th term = 3×10 = 30' },
      { text: 'Find the missing term: 5, 10, __, 40, 80', options: ['15', '20', '25', '30', '35'], correct: 1, exp: 'Pattern: multiply by 2. 10×2 = 20, 20×2 = 40' },
      { text: 'What comes next: 100, 50, 25, __?', options: ['12.5', '15', '20', '0', '5'], correct: 0, exp: 'Pattern: divide by 2. 25÷2 = 12.5' },
      { text: 'What is the pattern: 1, 1, 2, 3, 5, 8, 13, ...?', options: ['Add 2', 'Multiply by 2', 'Add previous two terms', 'Square numbers', 'Prime numbers'], correct: 2, exp: 'Fibonacci: each term = sum of previous two. 5+8=13, 8+13=21' },
      { text: 'Complete: 64, 32, 16, 8, __', options: ['2', '4', '6', '0', '1'], correct: 1, exp: 'Pattern: divide by 2. 8÷2 = 4' }
    ]
  },
  'permutations-combinations': {
    title: 'Permutations and Combinations',
    definitions: [
      { term: 'permutation', definition: 'An arrangement where order matters. Symbol: nPr = n!/(n-r)!' },
      { term: 'combination', definition: 'A selection where order does not matter. Symbol: nCr = n!/(r!(n-r)!)' },
      { term: 'factorial', definition: 'Product of all positive integers up to n. Symbol: n! Example: 5! = 5×4×3×2×1 = 120' },
      { term: 'counting principle', definition: 'If event A has m outcomes and event B has n outcomes, together they have m×n outcomes' },
      { term: 'with replacement', definition: 'Items can be selected more than once. Total outcomes = nʳ' },
      { term: 'without replacement', definition: 'Each item can only be selected once. Use permutations or combinations.' },
      { term: 'order matters', definition: 'ABC is different from BAC. Use permutations.' },
      { term: 'order does not matter', definition: 'ABC is same as BAC. Use combinations.' }
    ],
    questions: [
      { text: 'How many ways can you arrange 3 books on a shelf?', options: ['3', '6', '9', '12', '27'], correct: 1, exp: '3! = 3×2×1 = 6 ways (order matters = permutation)' },
      { text: 'What is 4!?', options: ['4', '8', '16', '24', '120'], correct: 3, exp: '4! = 4×3×2×1 = 24' },
      { text: 'How many 2-letter codes can be made from {A,B,C,D} if order matters and no repeats?', options: ['4', '8', '12', '16', '24'], correct: 2, exp: '4P2 = 4×3 = 12 (first letter: 4 choices, second: 3 remaining)' },
      { text: 'Choose 2 people from a group of 5 for a team. How many ways?', options: ['5', '10', '20', '25', '120'], correct: 1, exp: '5C2 = 5!/(2!×3!) = (5×4)/(2×1) = 10 (order doesn\'t matter)' },
      { text: 'How many 3-digit codes using {1,2,3} with replacement?', options: ['3', '6', '9', '27', '81'], correct: 3, exp: 'With replacement: 3×3×3 = 27 (each digit has 3 choices)' },
      { text: 'What is 0!?', options: ['0', '1', 'undefined', 'infinity', 'Cannot compute'], correct: 1, exp: 'By definition, 0! = 1' },
      { text: 'A restaurant offers 4 appetizers and 6 entrees. How many meal combinations?', options: ['10', '18', '24', '30', '4096'], correct: 2, exp: 'Counting principle: 4×6 = 24 combinations' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding 4 Statistics & Probability lessons...\n');

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

  console.log('🎉 Statistics & Probability batch complete! Now at 26/82 lessons.');
}

addAll();
