/**
 * Fix Miscellaneous Topics - had typo in questions array
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const questions = [
  { text: 'Which is correct?', options: ['She is different than me.', 'She is different from me.', 'She is different to me.', 'She is different of me.', 'She is different at me.'], correct: 1, exp: 'Idiom: "different from" is standard' },
  { text: 'Comparing two people, which is correct?', options: ['She is the tallest.', 'She is the most tall.', 'She is taller.', 'She is more taller.', 'She is most tall.'], correct: 2, exp: 'Comparative (two): use -er form: taller' },
  { text: 'Of three students, who scored highest?', options: ['The taller one', 'The most tall', 'The tallest', 'The more tall', 'The most tallest'], correct: 2, exp: 'Superlative (three+): use -est form: tallest' },
  { text: 'Which is most concise?', options: ['In my opinion, I think that...', 'I think that...', 'It is my opinion that I think...', 'In my thinking, I believe...', 'I am of the opinion that...'], correct: 1, exp: '"I think that..." is clearest and most concise' },
  { text: 'Which is correct?', options: ['She is interested about art.', 'She is interested at art.', 'She is interested in art.', 'She is interested for art.', 'She is interested to art.'], correct: 2, exp: 'Idiom: "interested in"' },
  { text: 'Fix: "between you and I"', options: ['between you and me', 'between you and myself', 'between yourself and I', 'among you and I', 'between we'], correct: 0, exp: 'Object pronoun after preposition: between you and me' },
  { text: 'Which is better?', options: ['He is more smarter than her.', 'He is smarter than her.', 'He is more smart than her.', 'He is most smart than her.', 'He is more smartest than her.'], correct: 1, exp: 'Use -er OR more, not both. "Smarter" is correct.' }
];

async function fix() {
  console.log('📚 Fixing Miscellaneous Topics quiz...\n');

  const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', 'misc-topics').single();
  console.log(`✅ ${lesson.title}`);

  // Delete old quiz
  await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);

  // Create new quiz
  const { data: quiz } = await supabase.from('quizzes').insert([{
    lesson_id: lesson.id, title: 'Miscellaneous Topics Practice', intro: 'Test your understanding.',
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
  console.log('✅ Fixed!');
}

fix();
