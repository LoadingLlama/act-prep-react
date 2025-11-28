const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = [
  'sentence-structure', 'commas', 'punctuation', 'verbs', 'pronouns',
  'modifiers', 'parallel-structure', 'misc-topics', 'redundancy',
  'word-choice', 'transitions', 'which-choice', 'adding-deleting', 'logical-placement'
];

async function analyzeMissingPositions() {
  console.log('Analyzing missing positions for each lesson:\n');
  console.log('='.repeat(70));

  for (const key of lessons) {
    const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', key).single();
    if (!lesson) continue;

    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('position')
      .eq('lesson_id', lesson.id)
      .order('position');

    const positions = examples.map(e => e.position);
    const missing = [];

    for (let i = 1; i <= 50; i++) {
      if (!positions.includes(i)) {
        missing.push(i);
      }
    }

    const total = examples.length;
    const needed = 50 - total;

    console.log(`\n${key}:`);
    console.log(`  Current: ${total}/50`);
    console.log(`  Missing positions: ${missing.join(', ')}`);
    console.log(`  Need: ${needed} questions`);
  }
}

analyzeMissingPositions();
