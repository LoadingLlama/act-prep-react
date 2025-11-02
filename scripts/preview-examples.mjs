/**
 * Preview a few examples before rewriting
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function previewExamples() {
  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(3);

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log(`Found ${examples.length} examples\n`);

  examples.forEach((ex, idx) => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Example ${idx + 1}: ${ex.title}`);
    console.log('='.repeat(80));
    console.log('\nID:', ex.id);
    console.log('Correct Answer:', ex.correct_answer);
    console.log('\nChoices:');
    const choices = typeof ex.choices === 'string' ? JSON.parse(ex.choices) : ex.choices;
    Object.entries(choices).forEach(([letter, text]) => {
      console.log(`  ${letter}. ${text}`);
    });
    console.log('\nCurrent Explanation:');
    console.log(ex.answer_explanation);
    console.log('\n');
  });
}

previewExamples().then(() => process.exit(0));
