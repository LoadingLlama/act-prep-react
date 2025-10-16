import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = {
  'finding-correct-answer': {
    title: '3 Strategies for Finding the Correct Answer',
    definitions: [
      { term: 'process of elimination', definition: 'Cross out wrong answers to narrow choices. Eliminate obviously incorrect first.' },
      { term: 'textual evidence', definition: 'Specific words/sentences from passage supporting answer. Can you point to it?' },
      { term: 'extreme language', definition: 'Words like "always," "never," "all," "none" - usually make answer wrong (too absolute)' },
      { term: 'trap answer', definition: 'Looks right but wrong. May use passage words but misstate relationship.' },
      { term: 'best answer', definition: 'On ACT, choose BEST answer, not just one that "could" work' },
      { term: 'answer in passage', definition: 'Correct answers supported by passage text, not outside knowledge' }
    ],
    questions: [
      { text: 'Answer says "The author ALWAYS agrees with..." Is this likely correct?', options: ['Yes - strong claim', 'No - extreme language', 'Maybe', 'Cannot tell', 'Yes - sounds good'], correct: 1, exp: '"ALWAYS" is extreme language - ACT answers rarely use absolutes' },
      { text: 'What is process of elimination?', options: ['Pick first answer', 'Cross out wrong answers', 'Skip question', 'Guess', 'Read faster'], correct: 1, exp: 'Process of elimination: systematically cross out wrong answers' },
      { text: 'How do you verify an answer?', options: ['It sounds good', 'Find textual evidence', 'Your opinion', 'Outside knowledge', 'Guess'], correct: 1, exp: 'Find specific evidence in passage supporting answer' },
      { text: 'An answer uses exact words from passage. Is it automatically correct?', options: ['Yes - uses passage words', 'No - could be trap answer', 'Always correct', 'Never correct', 'Doesn\'t matter'], correct: 1, exp: 'Trap answers often use passage words but twist meaning' },
      { text: 'Two answers seem right. What should you do?', options: ['Guess', 'Pick shorter one', 'Choose BEST answer with most support', 'Skip it', 'Pick first one'], correct: 2, exp: 'Choose answer with strongest textual support - the BEST answer' },
      { text: 'You know a fact not in the passage. Should you use it?', options: ['Yes - shows knowledge', 'No - answer must be in passage', 'Sometimes', 'Always', 'Never'], correct: 1, exp: 'ACT Reading tests passage comprehension, not outside knowledge' },
      { text: 'What makes an answer a "trap"?', options: ['It\'s short', 'Uses passage words incorrectly', 'It\'s long', 'First choice', 'Last choice'], correct: 1, exp: 'Trap answers use familiar passage words but misstate ideas' }
    ]
  },
  'reading-approaches': {
    title: 'How to Approach the Reading Test',
    definitions: [
      { term: 'four passages', definition: 'Prose Fiction, Social Science, Humanities, Natural Science - 10 questions each' },
      { term: 'passage order', definition: 'Do passages in ANY order. Start with your strongest passage type.' },
      { term: 'timing strategy', definition: '35 minutes for 4 passages = about 8-9 minutes per passage' },
      { term: 'skim vs read', definition: 'Light read for main idea, then refer back for questions (don\'t memorize!)' },
      { term: 'questions first method', definition: 'Some prefer reading questions before passage to know what to look for' },
      { term: 'passage structure', definition: 'Note introduction, body paragraphs, conclusion - helps locate info' }
    ],
    questions: [
      { text: 'How many passages on ACT Reading?', options: ['2', '3', '4', '5', '6'], correct: 2, exp: '4 passages total' },
      { text: 'How much time per passage?', options: ['5 min', '7 min', '8-9 min', '12 min', '15 min'], correct: 2, exp: '35 minutes ÷ 4 passages ≈ 8-9 minutes each' },
      { text: 'Must you do passages in order?', options: ['Yes - required', 'No - any order', 'Must do fiction first', 'Must do science first', 'Yes - for scoring'], correct: 1, exp: 'Do passages in ANY order - start with your strongest!' },
      { text: 'Should you memorize the passage?', options: ['Yes - memorize all', 'No - skim and refer back', 'Yes - every detail', 'No - skip reading', 'Yes - take notes'], correct: 1, exp: 'Skim for main idea, then refer back for specific questions' },
      { text: 'What are the passage types?', options: ['All fiction', 'All science', 'Fiction, Social Sci, Humanities, Natural Sci', 'Only history', 'Random'], correct: 2, exp: 'Four types: Prose Fiction, Social Science, Humanities, Natural Science' },
      { text: 'Should you read questions before the passage?', options: ['Never', 'It\'s optional - personal preference', 'Always required', 'Only for fiction', 'Only for science'], correct: 1, exp: 'Both methods work - choose what works best for you' },
      { text: 'Why note passage structure?', options: ['Looks good', 'Helps locate information', 'Required', 'For fun', 'Wastes time'], correct: 1, exp: 'Understanding structure helps you quickly find info when answering questions' }
    ]
  },
  'pacing-time-management': {
    title: 'Pacing and Time Management',
    definitions: [
      { term: 'pacing', definition: 'Managing time to complete all questions. Don\'t spend too long on one question.' },
      { term: '35 minutes total', definition: 'Total time for ACT Reading section. 40 questions.' },
      { term: 'skip and return', definition: 'If stuck, skip question and return if time permits' },
      { term: 'no penalty guessing', definition: 'No points off for wrong answers - always fill in an answer!' },
      { term: 'practice pacing', definition: 'Time yourself during practice to build speed and accuracy' },
      { term: 'easier questions first', definition: 'Answer quick questions first, save harder ones for later' }
    ],
    questions: [
      { text: 'Total time for ACT Reading?', options: ['25 min', '30 min', '35 min', '40 min', '45 min'], correct: 2, exp: '35 minutes total' },
      { text: 'Total questions on ACT Reading?', options: ['30', '35', '40', '45', '50'], correct: 2, exp: '40 questions (10 per passage)' },
      { text: 'Should you leave questions blank?', options: ['Yes - better score', 'No - no penalty', 'Only if unsure', 'Yes - required', 'Sometimes'], correct: 1, exp: 'No penalty for wrong answers - always guess if needed!' },
      { text: 'What if you\'re stuck on a question?', options: ['Spend 10 minutes on it', 'Skip and return later', 'Give up', 'Leave blank', 'Panic'], correct: 1, exp: 'Skip difficult questions, return if time permits' },
      { text: 'Best pacing strategy?', options: ['Spend all time on first passage', 'Equal time per passage', 'Rush through all', 'Random', 'Skip passages'], correct: 1, exp: 'Aim for about equal time per passage (8-9 min each)' },
      { text: 'Why practice with a timer?', options: ['No reason', 'Builds speed and accuracy', 'Required by ACT', 'For fun', 'To stress out'], correct: 1, exp: 'Timed practice helps you learn to work efficiently' },
      { text: 'What is "skip and return"?', options: ['Skip the test', 'Skip hard questions, return later', 'Return test to teacher', 'Skip easy questions', 'Never skip'], correct: 1, exp: 'Skip questions that take too long, answer easier ones first' }
    ]
  }
};

async function addAll() {
  console.log('📚 Fixing 3 Reading lessons with correct keys...\n');

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

  console.log('✅ Fixed! Now at 54/82 lessons (66%).');
}

addAll();
