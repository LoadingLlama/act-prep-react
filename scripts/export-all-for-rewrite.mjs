/**
 * Export all examples to review and rewrite
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function exportAll() {
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .order('created_at');

  const output = examples.map((ex, idx) => ({
    index: idx + 1,
    id: ex.id,
    title: ex.title,
    problem_text: ex.problem_text?.substring(0, 200) + '...',
    choices: ex.choices,
    correct_answer: ex.correct_answer,
    current_explanation: ex.answer_explanation,
    length: ex.answer_explanation?.length || 0
  }));

  fs.writeFileSync(
    '/tmp/all_examples.json',
    JSON.stringify(output, null, 2)
  );

  console.log(`Exported ${examples.length} examples to /tmp/all_examples.json`);
  console.log('\nSample (first 3):');
  output.slice(0, 3).forEach(ex => {
    console.log(`\n${ex.index}. ${ex.title} (${ex.length} chars)`);
    console.log(`Correct: ${ex.correct_answer}`);
  });
}

exportAll().then(() => process.exit(0));
