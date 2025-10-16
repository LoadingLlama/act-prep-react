/**
 * Add ACT Test Basics
 * Fixed: lesson key is 'getting-started'
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
  { term: 'ACT English', definition: '75 questions in 45 minutes. Tests grammar, punctuation, rhetoric, organization.', lesson_key: 'getting-started' },
  { term: 'passage-based', definition: 'Questions embedded in 5 passages. Read, then answer questions in context.', lesson_key: 'getting-started' },
  { term: 'no penalty', definition: 'No points deducted for wrong answers. Always guess if unsure!', lesson_key: 'getting-started' },
  { term: 'pacing', definition: 'About 36 seconds per question. Budget ~9 minutes per passage.', lesson_key: 'getting-started' },
  { term: 'question types', definition: 'Usage/Mechanics (40 qs): grammar, punctuation. Rhetorical Skills (35 qs): strategy, organization.', lesson_key: 'getting-started' },
  { term: 'scoring', definition: 'Scored 1-36. Based only on number correct (raw score).', lesson_key: 'getting-started' }
];

const questions = [
  { text: 'How many passages are on ACT English?', options: ['3', '4', '5', '6', '7'], correct: 2, exp: '5 passages total' },
  { text: 'Should you leave questions blank?', options: ['Yes - penalty for wrong', 'No - no penalty', 'Only if unsure', 'Yes - looks better', 'Depends'], correct: 1, exp: 'No penalty for wrong answers - always guess!' },
  { text: 'How much time for ACT English section?', options: ['35 minutes', '40 minutes', '45 minutes', '50 minutes', '60 minutes'], correct: 2, exp: '45 minutes total' },
  { text: 'What is tested on ACT English?', options: ['Vocabulary only', 'Grammar and rhetoric', 'Math skills', 'Reading comprehension', 'Creative writing'], correct: 1, exp: 'Grammar, punctuation, rhetoric, organization' },
  { text: 'Best time per passage?', options: ['5 minutes', '7 minutes', '9 minutes', '12 minutes', '15 minutes'], correct: 2, exp: '45 min ÷ 5 passages ≈ 9 minutes each' },
  { text: 'How is ACT English scored?', options: ['Out of 100', 'Letter grades', '1-36 scale', 'Percentiles only', '200-800'], correct: 2, exp: 'ACT uses 1-36 scale' },
  { text: 'What counts toward your score?', options: ['Number correct', 'Number attempted', 'Number wrong', 'Time taken', 'Difficulty level'], correct: 0, exp: 'Score based only on number of correct answers' }
];

async function add() {
  console.log('📚 Adding ACT Test Basics (FIXED)...\n');

  const { data: lesson } = await supabase.from('lessons').select('id, title').eq('lesson_key', 'getting-started').single();
  console.log(`✅ ${lesson.title}`);

  await supabase.from('term_definitions').delete().eq('lesson_key', 'getting-started');
  await supabase.from('term_definitions').insert(definitions);
  console.log(`  ✓ ${definitions.length} definitions`);

  await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
  const { data: quiz } = await supabase.from('quizzes').insert([{
    lesson_id: lesson.id, title: 'ACT Basics Practice', intro: 'Test your understanding.',
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
  console.log('✅ ACT Basics complete! Now at 51/82 lessons.');
}

add();
