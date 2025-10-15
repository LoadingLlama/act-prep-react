/**
 * Add Definitions and Quiz for Exponential Functions
 * Fixed: Using correct lesson key 'exponential-growth'
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
  { term: 'exponential function', definition: 'Function in form f(x) = a·bˣ where b > 0, b ≠ 1. Example: f(x) = 2ˣ', lesson_key: 'exponential-growth' },
  { term: 'exponential growth', definition: 'When b > 1, function increases rapidly. Example: population growth, compound interest', lesson_key: 'exponential-growth' },
  { term: 'exponential decay', definition: 'When 0 < b < 1, function decreases rapidly. Example: radioactive decay, depreciation', lesson_key: 'exponential-growth' },
  { term: 'base', definition: 'The constant b in f(x) = a·bˣ. Determines growth (b>1) or decay (0<b<1)', lesson_key: 'exponential-growth' },
  { term: 'initial value', definition: 'The constant a in f(x) = a·bˣ. The value when x = 0: f(0) = a', lesson_key: 'exponential-growth' },
  { term: 'growth factor', definition: 'The base b when b > 1. Often written as (1 + r) where r is growth rate', lesson_key: 'exponential-growth' },
  { term: 'decay factor', definition: 'The base b when 0 < b < 1. Often written as (1 - r) where r is decay rate', lesson_key: 'exponential-growth' },
  { term: 'compound interest formula', definition: 'A = P(1 + r)ᵗ where P is principal, r is rate, t is time', lesson_key: 'exponential-growth' },
  { term: 'half-life', definition: 'Time it takes for a quantity to reduce to half its initial value in exponential decay', lesson_key: 'exponential-growth' }
];

const questions = [
  { text: 'If f(x) = 3·2ˣ, what is f(4)?', options: ['12', '24', '48', '64', '81'], correct: 2, exp: 'f(4) = 3·2⁴ = 3·16 = 48' },
  { text: 'Does f(x) = 5·(1.2)ˣ represent growth or decay?', options: ['Growth', 'Decay', 'Neither', 'Both', 'Cannot determine'], correct: 0, exp: 'Base 1.2 > 1, so exponential growth' },
  { text: 'What is the initial value of f(x) = 100·(0.9)ˣ?', options: ['0', '0.9', '10', '90', '100'], correct: 4, exp: 'Initial value is the coefficient a. When x = 0: f(0) = 100·(0.9)⁰ = 100·1 = 100' },
  { text: 'If a population doubles every year starting at 50, what is the population after 3 years?', options: ['100', '150', '200', '300', '400'], correct: 4, exp: 'P(t) = 50·2ᵗ. After 3 years: P(3) = 50·2³ = 50·8 = 400' },
  { text: 'A car worth $20,000 depreciates 15% per year. What is its value after 1 year?', options: ['$3,000', '$17,000', '$18,500', '$19,000', '$19,850'], correct: 1, exp: 'Value = 20000(1 - 0.15)¹ = 20000(0.85) = $17,000' },
  { text: 'What is the decay factor if something loses 30% of its value each period?', options: ['0.3', '0.7', '1.3', '1.7', '3.0'], correct: 1, exp: 'Decay factor = 1 - r = 1 - 0.30 = 0.70' },
  { text: 'If f(x) = a·bˣ and f(0) = 12, what is a?', options: ['0', 'b', '12', '12b', 'Cannot determine'], correct: 2, exp: 'f(0) = a·b⁰ = a·1 = a. Since f(0) = 12, then a = 12' }
];

async function add() {
  console.log('📚 Adding Exponential Functions (FIXED)...\n');

  const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', 'exponential-growth').single();
  console.log(`✅ ${lesson.title}`);

  await supabase.from('term_definitions').delete().eq('lesson_key', 'exponential-growth');
  await supabase.from('term_definitions').insert(definitions);
  console.log(`  ✓ ${definitions.length} definitions`);

  await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
  const { data: quiz } = await supabase.from('quizzes').insert([{
    lesson_id: lesson.id, title: 'Exponential Functions Practice', intro: 'Test your understanding.',
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
  console.log('✅ Exponential complete! Now at 18/82 lessons.');
}

add();
