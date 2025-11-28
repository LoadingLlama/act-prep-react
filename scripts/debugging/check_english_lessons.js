const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

const LESSON_KEYS = [
  'sentence-structure', 'commas', 'punctuation', 'verbs', 'pronouns',
  'modifiers', 'parallel-structure', 'misc-topics', 'grammar-review',
  'redundancy', 'word-choice', 'transitions', 'which-choice',
  'adding-deleting', 'logical-placement'
];

async function checkLessons() {
  console.log('Checking English Lessons:');
  console.log('========================\n');

  const lessonsNeedingQuestions = [];

  for (const key of LESSON_KEYS) {
    const { data: lessons } = await supabase
      .from('lessons')
      .select('id, lesson_key, title')
      .eq('lesson_key', key)
      .single();

    if (!lessons) continue;

    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('id')
      .eq('lesson_id', lessons.id);

    const count = examples?.length || 0;
    const status = count > 0 ? '✓ ' + count : '✗ 0';
    console.log(key.padEnd(25) + ' | ' + status + ' questions');

    if (count === 0) {
      lessonsNeedingQuestions.push({ key, id: lessons.id, title: lessons.title });
    }
  }

  console.log('\n\nNEED QUESTIONS (' + lessonsNeedingQuestions.length + '):');
  lessonsNeedingQuestions.forEach(l => console.log('  - ' + l.key + ' (' + l.id + ')'));
}

checkLessons();
