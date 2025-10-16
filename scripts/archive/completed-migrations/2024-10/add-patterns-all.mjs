/**
 * Add Definitions and Quiz for Patterns and Sequences
 * Fixed: Using correct lesson key 'repeating-patterns'
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const definitions = [
  { term: 'pattern', definition: 'A repeating or predictable arrangement of numbers, shapes, or objects', lesson_key: 'repeating-patterns' },
  { term: 'sequence', definition: 'An ordered list following a rule. Example: 2, 4, 6, 8...', lesson_key: 'repeating-patterns' },
  { term: 'term', definition: 'An individual element in a sequence', lesson_key: 'repeating-patterns' },
  { term: 'common pattern types', definition: 'Adding/subtracting (arithmetic), multiplying/dividing (geometric), squaring, etc.', lesson_key: 'repeating-patterns' },
  { term: 'position', definition: 'The location of a term in a sequence. First term is position 1 (or n=1)', lesson_key: 'repeating-patterns' },
  { term: 'rule', definition: 'The relationship or formula that generates the sequence', lesson_key: 'repeating-patterns' },
  { term: 'extending a pattern', definition: 'Finding the next terms by identifying and applying the rule', lesson_key: 'repeating-patterns' },
  { term: 'visual pattern', definition: 'Pattern using shapes, colors, or spatial arrangements rather than numbers', lesson_key: 'repeating-patterns' }
];

const questions = [
  { text: 'What is the next term in: 2, 5, 8, 11, __?', options: ['12', '13', '14', '15', '16'], correct: 2, exp: 'Pattern: add 3 each time. 11 + 3 = 14' },
  { text: 'What is the pattern rule for: 1, 4, 9, 16, 25?', options: ['Add 3, then 5, then 7...', 'Multiply by 4', 'Square numbers', 'Add consecutive numbers', 'Multiply by n'], correct: 2, exp: '1²=1, 2²=4, 3²=9, 4²=16, 5²=25. These are perfect squares.' },
  { text: 'What is the 10th term of: 3, 6, 9, 12, ...?', options: ['27', '30', '33', '36', '39'], correct: 1, exp: 'Pattern: multiples of 3. 10th term = 3×10 = 30' },
  { text: 'Find the missing term: 5, 10, __, 40, 80', options: ['15', '20', '25', '30', '35'], correct: 1, exp: 'Pattern: multiply by 2. 10×2 = 20, 20×2 = 40' },
  { text: 'What comes next: 100, 50, 25, __?', options: ['12.5', '15', '20', '0', '5'], correct: 0, exp: 'Pattern: divide by 2. 25÷2 = 12.5' },
  { text: 'What is the pattern: 1, 1, 2, 3, 5, 8, 13, ...?', options: ['Add 2', 'Multiply by 2', 'Add previous two terms', 'Square numbers', 'Prime numbers'], correct: 2, exp: 'Fibonacci: each term = sum of previous two. 5+8=13, 8+13=21' },
  { text: 'Complete: 64, 32, 16, 8, __', options: ['2', '4', '6', '0', '1'], correct: 1, exp: 'Pattern: divide by 2. 8÷2 = 4' }
];

async function add() {
  console.log('📚 Adding Patterns and Sequences (FIXED)...\n');

  const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', 'repeating-patterns').single();
  console.log(`✅ ${lesson.title}`);

  await supabase.from('term_definitions').delete().eq('lesson_key', 'repeating-patterns');
  await supabase.from('term_definitions').insert(definitions);
  console.log(`  ✓ ${definitions.length} definitions`);

  await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
  const { data: quiz } = await supabase.from('quizzes').insert([{
    lesson_id: lesson.id, title: 'Patterns and Sequences Practice', intro: 'Test your understanding.',
    quiz_type: 'practice', position: 999, is_required: false
  }]).select().single();

  const qData = await supabase.from('quiz_questions').insert(
    questions.map((q, i) => ({ quiz_id: quiz.id, question_text: q.text, question_order: i }))
  ).select();

  const opts = [];
  qData.data.forEach((dbQ, i) => {
    questions[i].options.forEach((opt, j) => {
      opts.push({
        question_id: dbQ.id, option_text: opt, option_order: j,
        is_correct: j === questions[i].correct,
        explanation: j === questions[i].correct ? questions[i].exp : null
      });
    });
  });
  await supabase.from('quiz_options').insert(opts);
  console.log(`  ✓ ${questions.length} questions\n`);
  console.log('✅ Patterns complete! Now at 26/82 lessons.');
}

add();
