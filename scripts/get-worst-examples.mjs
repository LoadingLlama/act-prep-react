/**
 * Get samples of the worst formatted examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const worstIds = [
  '995b8159', // Unnecessary Information (Crossing-Out Trick) - 2229 chars, 31 lines
  '9d0d69c7', // Dependent Clauses Creating Fragments - 1102 chars, 21 lines
  '8939f5bb', // Middle/End Modifier with "which" - 1610 chars, 28 lines
  '6eedb76a', // Modifier without Commas - 35 lines
  '2dd97a59', // Identifying Sentence Fragments - the one user mentioned
  'ef7c906b', // Variable Expression with Percents - poor choice formatting
  'a254aef0', // Divisibility by 3 - poor choice formatting
  '6342a9d8', // Chaining Data Across Two Figures - 1547 chars, 5 steps
];

async function getWorstExamples() {
  const { data: allExamples } = await supabase
    .from('lesson_examples')
    .select('*');

  const examples = allExamples.filter(ex =>
    worstIds.some(id => ex.id.startsWith(id))
  );

  for (const ex of examples) {
    console.log('\n' + '='.repeat(80));
    console.log(`📝 ${ex.title}`);
    console.log(`ID: ${ex.id}`);
    console.log(`Length: ${ex.answer_explanation.length} chars`);
    console.log(`Lines: ${ex.answer_explanation.split('\n').length}`);
    console.log('='.repeat(80));
    console.log(ex.answer_explanation);
    console.log('\n');
  }
}

getWorstExamples().then(() => process.exit(0));
