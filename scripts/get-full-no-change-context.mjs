/**
 * Get full context for all NO CHANGE examples to write specific explanations
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getFullContext() {
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*');

  const noChangeExamples = examples.filter(ex =>
    ex.choices?.some(c => c.text.toUpperCase().includes('NO CHANGE'))
  );

  console.log(`Found ${noChangeExamples.length} NO CHANGE examples\n`);

  let output = '';

  for (const ex of noChangeExamples) {
    const noChangeChoice = ex.choices.find(c => c.text.toUpperCase().includes('NO CHANGE'));
    const isCorrect = noChangeChoice.letter === ex.correct_answer;

    // Clean HTML from problem text
    const cleanText = ex.problem_text?.replace(/<[^>]*>/g, '') || '';

    output += `\n${'='.repeat(80)}\n`;
    output += `TITLE: ${ex.title}\n`;
    output += `ID: ${ex.id}\n`;
    output += `NO CHANGE LETTER: ${noChangeChoice.letter}\n`;
    output += `CORRECT ANSWER: ${ex.correct_answer}\n`;
    output += `STATUS: ${isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}\n`;
    output += `\nFULL PROBLEM TEXT:\n${cleanText}\n`;
    output += `\nALL CHOICES:\n`;
    ex.choices.forEach(c => output += `  ${c.letter}. ${c.text}\n`);
    output += '\n';
  }

  fs.writeFileSync('/tmp/no-change-full-context.txt', output);
  console.log('✅ Written to /tmp/no-change-full-context.txt');
}

getFullContext().then(() => process.exit(0));
