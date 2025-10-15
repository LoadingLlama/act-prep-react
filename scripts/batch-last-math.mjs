import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'backsolving': {
    title: 'Working Backwards Strategy',
    definitions: [
      { term: 'backsolving', definition: 'Strategy of plugging answer choices back into the question to find which works' },
      { term: 'working backwards', definition: 'Starting from the answer and reversing steps to check if it matches the given information' },
      { term: 'answer choice testing', definition: 'Systematically checking each answer option by substitution' },
      { term: 'strategic starting', definition: 'Begin with middle answer choice (C) since ACT answers are usually ordered' },
      { term: 'elimination', definition: 'After testing one choice, eliminate answers that are too high or too low' },
      { term: 'when to backsolve', definition: 'Use when: answers are numbers, algebra is complex, or direct solution is unclear' }
    ],
    questions: [
      { text: 'If 2x + 5 = 17, which answer choice for x is correct?', options: ['4', '6', '9', '11', '12'], correct: 1, exp: 'Test C first: 2(9)+5=23 (too big). Try B: 2(6)+5=17 ✓. Answer: 6' },
      { text: 'A number increased by 20% equals 60. What is the number?', options: ['40', '48', '50', '55', '72'], correct: 2, exp: 'Test C: 50×1.20=60 ✓. Answer: 50' },
      { text: 'When is backsolving most useful?', options: ['Equations with one variable', 'Geometry proofs', 'Word problems with numeric answers', 'Graphing questions', 'Probability'], correct: 2, exp: 'Backsolving works best with word problems that have numeric answer choices' },
      { text: 'If x² - 3x - 10 = 0, which is a solution?', options: ['-5', '-2', '2', '5', '10'], correct: 3, exp: 'Test D: (5)²-3(5)-10 = 25-15-10 = 0 ✓. Answer: 5' },
      { text: 'What is the advantage of testing answer choice C first?', options: ['Always correct', 'Easiest calculation', 'Can eliminate multiple', 'Required by ACT', 'Fastest option'], correct: 2, exp: 'If C is too big/small, you can eliminate other choices in same direction' },
      { text: 'A store marks up items 50%. An item costs $30 after markup. What was original price?', options: ['$15', '$20', '$25', '$35', '$45'], correct: 1, exp: 'Test B: $20×1.50=$30 ✓. Answer: $20' },
      { text: 'When should you NOT use backsolving?', options: ['Complex equations', 'Variable answer choices', 'Large numbers', 'Time pressure', 'Word problems'], correct: 1, exp: 'Cannot backsolve if answers contain variables - need algebraic solution' }
    ]
  },
  'substitution': {
    title: 'Number Substitution Technique',
    definitions: [
      { term: 'number substitution', definition: 'Strategy of replacing variables with specific numbers to simplify a problem' },
      { term: 'choosing smart numbers', definition: 'Pick simple values that make calculation easy (often 1, 2, 10, or 100)' },
      { term: 'testing with values', definition: 'Substitute the same numbers into each answer choice to find which matches' },
      { term: 'variable expressions', definition: 'Problems with expressions containing variables but no equation to solve' },
      { term: 'percent problems', definition: 'Use 100 as base value to make percent calculations easy' },
      { term: 'consistency', definition: 'Use the same substituted values throughout the entire problem' }
    ],
    questions: [
      { text: 'If x = 2, what is 3x + 5?', options: ['8', '10', '11', '13', '16'], correct: 2, exp: 'Substitute: 3(2) + 5 = 6 + 5 = 11' },
      { text: 'For percent problems, what is often the best number to use?', options: ['1', '10', '50', '100', 'Any number'], correct: 3, exp: '100 makes percent calculations simple: 20% of 100 = 20' },
      { text: 'Which expression equals 2x when x = 5?', options: ['x + 5', '3x - 5', '15 - x', 'x/5', '5x'], correct: 1, exp: 'Test: 2x = 2(5) = 10. Check B: 3(5)-5 = 10 ✓' },
      { text: 'When is substitution most useful?', options: ['Finding equation', 'Comparing expressions', 'Graphing', 'Geometry proofs', 'Factoring'], correct: 1, exp: 'Substitution excels at comparing multiple algebraic expressions' },
      { text: 'If n = 3, what is n² + 2n?', options: ['9', '11', '12', '15', '18'], correct: 3, exp: 'Substitute: (3)² + 2(3) = 9 + 6 = 15' },
      { text: 'A number increased by 25%. Which expression represents the new value if x is the original?', options: ['x + 25', '1.25x', '25x', 'x/1.25', '0.25x'], correct: 1, exp: 'Test x=100: new=125. Check B: 1.25(100)=125 ✓' },
      { text: 'What is risky about substitution?', options: ['Too slow', 'Might work for one answer only', 'Not allowed on ACT', 'Requires calculator', 'Too complicated'], correct: 1, exp: 'Some special numbers might make multiple answers work. Verify with second number if unsure.' }
    ]
  },
  'word-problems': {
    title: 'Word Problems',
    definitions: [
      { term: 'word problem', definition: 'Math problem presented in words/story form rather than equations' },
      { term: 'translating', definition: 'Converting words to mathematical expressions. "Sum"→+, "product"→×, "is"→=' },
      { term: 'key words', definition: 'Words indicating operations: total, difference, times, per, increased by, etc.' },
      { term: 'defining variables', definition: 'Let x represent the unknown quantity you want to find' },
      { term: 'setting up equation', definition: 'Write mathematical relationship based on the problem description' },
      { term: 'checking answer', definition: 'Verify solution makes sense in context (positive distance, whole people, etc.)' },
      { term: 'rate problems', definition: 'Problems involving speed, work rate, or unit rates. Formula: distance = rate × time' },
      { term: 'mixture problems', definition: 'Combining two or more items with different properties (concentrations, prices, etc.)' }
    ],
    questions: [
      { text: 'John has 5 more apples than Sarah. Together they have 17 apples. How many does John have?', options: ['6', '11', '12', '17', '22'], correct: 1, exp: 'Let s=Sarah. Then John=s+5. Equation: s+(s+5)=17. So 2s=12, s=6. John=6+5=11' },
      { text: 'A car travels 240 miles in 4 hours. What is its average speed?', options: ['40 mph', '50 mph', '60 mph', '80 mph', '240 mph'], correct: 2, exp: 'Rate = distance/time = 240/4 = 60 mph' },
      { text: 'What does "the product of x and 7" mean?', options: ['x + 7', 'x - 7', '7x', 'x/7', '7^x'], correct: 2, exp: 'Product means multiplication: 7x' },
      { text: 'Tickets cost $8 each. What is the cost of t tickets?', options: ['8 + t', '8t', 't/8', '8 - t', '8^t'], correct: 1, exp: 'Cost per ticket × number of tickets = 8t' },
      { text: 'A rectangle\'s length is 3 times its width. Perimeter is 48. What is the width?', options: ['4', '6', '8', '12', '16'], correct: 1, exp: 'Let w=width, length=3w. Perimeter: 2(w+3w)=48. So 8w=48, w=6' },
      { text: 'Amy is twice as old as Ben. Their ages sum to 36. How old is Amy?', options: ['12', '18', '24', '30', '36'], correct: 2, exp: 'Let b=Ben, Amy=2b. Equation: b+2b=36. So 3b=36, b=12. Amy=2(12)=24' },
      { text: 'Which words indicate addition?', options: ['Quotient, per', 'Difference, less', 'Sum, total', 'Product, times', 'Is, equals'], correct: 2, exp: 'Sum, total, increased by, more than all indicate addition' }
    ]
  },
  'miscellaneous-topics': {
    title: 'Miscellaneous Topics',
    definitions: [
      { term: 'absolute value inequalities', definition: '|x| < a means -a < x < a; |x| > a means x < -a or x > a' },
      { term: 'floor function', definition: '⌊x⌋ rounds down to nearest integer. ⌊3.7⌋ = 3' },
      { term: 'ceiling function', definition: '⌈x⌉ rounds up to nearest integer. ⌈3.2⌉ = 4' },
      { term: 'piecewise function', definition: 'Function with different rules for different input ranges' },
      { term: 'arithmetic series', definition: 'Sum of arithmetic sequence. Formula: S = n(a₁+aₙ)/2' },
      { term: 'geometric series', definition: 'Sum of geometric sequence. Formula: S = a₁(1-rⁿ)/(1-r)' },
      { term: 'sigma notation', definition: 'Σ symbol represents sum. ∑ᵢ₌₁ⁿ i means 1+2+3+...+n' },
      { term: 'recursive sequence', definition: 'Each term defined using previous term(s). Example: aₙ = aₙ₋₁ + 3' }
    ],
    questions: [
      { text: 'What is ⌊5.9⌋?', options: ['5', '5.9', '6', '6.0', '5.5'], correct: 0, exp: 'Floor function rounds down: ⌊5.9⌋ = 5' },
      { text: 'Solve |x| < 3', options: ['x < 3', 'x > -3', '-3 < x < 3', 'x < -3 or x > 3', 'x = 3'], correct: 2, exp: 'Absolute value less than: -3 < x < 3' },
      { text: 'What is ⌈4.1⌉?', options: ['4', '4.1', '4.5', '5', '6'], correct: 3, exp: 'Ceiling function rounds up: ⌈4.1⌉ = 5' },
      { text: 'Sum of first 5 positive integers: 1+2+3+4+5 = ?', options: ['10', '12', '15', '20', '25'], correct: 2, exp: 'Sum = 5(1+5)/2 = 5(6)/2 = 15. Or just add: 1+2+3+4+5=15' },
      { text: 'If f(x) = {2x if x<0; x² if x≥0}, what is f(-3)?', options: ['-6', '-3', '0', '6', '9'], correct: 0, exp: 'Since -3<0, use first rule: f(-3) = 2(-3) = -6' },
      { text: 'Solve |x| ≥ 5', options: ['x ≥ 5', '-5 ≤ x ≤ 5', 'x ≤ -5 or x ≥ 5', 'x = 5', 'x ≥ 0'], correct: 2, exp: 'Absolute value greater than: x ≤ -5 or x ≥ 5' },
      { text: 'A sequence is defined aₙ = aₙ₋₁ + 2 with a₁ = 5. What is a₃?', options: ['5', '7', '9', '10', '11'], correct: 2, exp: 'a₁=5, a₂=5+2=7, a₃=7+2=9' }
    ]
  },
  'statistics-advanced': {
    title: 'Advanced Statistics',
    definitions: [
      { term: 'standard deviation', definition: 'Measure of spread. How far values typically are from the mean. Symbol: σ' },
      { term: 'variance', definition: 'Square of standard deviation. σ² measures average squared distance from mean.' },
      { term: 'quartiles', definition: 'Values dividing data into four equal parts. Q1 (25%), Q2 (median), Q3 (75%)' },
      { term: 'interquartile range (IQR)', definition: 'IQR = Q3 - Q1. Middle 50% of data. Less affected by outliers.' },
      { term: 'box plot', definition: 'Visual showing min, Q1, median, Q3, max of dataset' },
      { term: 'normal distribution', definition: 'Bell-shaped curve. Most data near mean, symmetric spread' },
      { term: 'correlation', definition: 'Relationship between two variables. Positive, negative, or no correlation.' },
      { term: 'scatter plot', definition: 'Graph showing relationship between two variables as points' }
    ],
    questions: [
      { text: 'Data: 2, 4, 6, 8, 10. What is Q1 (first quartile)?', options: ['2', '3', '4', '6', '8'], correct: 2, exp: 'Q1 is median of lower half. Lower half: 2,4,6. Median of that is 4.' },
      { text: 'Data: 1, 3, 5, 7, 9. Find IQR (Q3 - Q1)', options: ['2', '4', '5', '8', '9'], correct: 1, exp: 'Q1=3 (median of 1,3,5), Q3=7 (median of 5,7,9). IQR = 7-3 = 4' },
      { text: 'Which is most resistant to outliers?', options: ['Mean', 'Range', 'Standard deviation', 'Median', 'Variance'], correct: 3, exp: 'Median is not affected by extreme values. Mean and range are sensitive to outliers.' },
      { text: 'If all values in a dataset are the same, what is the standard deviation?', options: ['0', '1', 'The value', 'Undefined', 'Infinity'], correct: 0, exp: 'No spread means standard deviation = 0' },
      { text: 'A scatter plot shows points rising from left to right. This indicates:', options: ['Negative correlation', 'No correlation', 'Positive correlation', 'Causation', 'Outliers'], correct: 2, exp: 'Rising pattern = positive correlation (as x increases, y increases)' },
      { text: 'In a box plot, the box represents:', options: ['All data', 'Middle 25%', 'Middle 50%', 'Upper 25%', 'Outliers'], correct: 2, exp: 'Box spans from Q1 to Q3, containing middle 50% of data (IQR)' },
      { text: 'Data has mean 50, standard deviation 10. About 68% of data falls within:', options: ['40-60', '30-70', '20-80', '50-60', '45-55'], correct: 0, exp: 'In normal distribution, ~68% within 1 standard deviation: mean±σ = 50±10 = 40-60' }
    ]
  }
};

async function addAll() {
  console.log('📚 Batch adding final 5 Math lessons...\n');

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

  console.log('🎉🎉🎉 ALL 35 MATH LESSONS COMPLETE! 🎉🎉🎉');
  console.log('📊 Progress: 35/82 lessons (43%)');
  console.log('📚 Next up: English lessons!');
}

addAll();
