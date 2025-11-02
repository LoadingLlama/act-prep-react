/**
 * Show batch 3 full content
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const ids = [
  '7bbc7cba', // Approximating Values in Complex Tables
  '909a2c6e', // Ambiguous Pronouns
  '128d0807', // Possessive vs. Plural Nouns
  '4e109097', // Who vs. Whom in Descriptive Phrases
  '64a813f8', // Puzzle - Optimization
  '75e146c8'  // System of Equations Word Problem
  // Skipping 4a2bec04 - Testing Equations (already fixed)
];

async function showBatch3() {
  const { data: allExamples } = await supabase
    .from('lesson_examples')
    .select('*');

  const examples = allExamples.filter(ex =>
    ids.some(id => ex.id.startsWith(id))
  );

  for (const ex of examples) {
    console.log('\n' + '='.repeat(80));
    console.log(`📝 ${ex.title}`);
    console.log(`ID: ${ex.id}`);
    console.log(`Length: ${ex.answer_explanation.length} chars, Lines: ${ex.answer_explanation.split('\n').length}`);
    console.log('='.repeat(80));
    console.log(ex.answer_explanation.substring(0, 800)); // First 800 chars to see the pattern
    console.log('\n[...truncated...]');
  }
}

showBatch3().then(() => process.exit(0));
