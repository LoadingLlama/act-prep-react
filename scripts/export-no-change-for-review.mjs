/**
 * Export all NO CHANGE examples for manual review
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function exportForReview() {
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*');

  const noChangeExamples = examples.filter(ex =>
    ex.choices?.some(c => c.text.toUpperCase().includes('NO CHANGE'))
  );

  console.log(`Found ${noChangeExamples.length} examples with NO CHANGE\n`);

  // Create a review file
  let output = '# NO CHANGE Examples for Manual Review\n\n';

  noChangeExamples.forEach((ex, idx) => {
    const noChangeChoice = ex.choices.find(c => c.text.toUpperCase().includes('NO CHANGE'));
    const isCorrect = noChangeChoice.letter === ex.correct_answer;

    output += `## ${idx + 1}. ${ex.title}\n`;
    output += `**ID:** ${ex.id}\n`;
    output += `**Correct Answer:** ${ex.correct_answer}\n`;
    output += `**NO CHANGE is:** ${isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}\n\n`;

    output += `**Problem (first 200 chars):**\n`;
    const cleanText = ex.problem_text?.replace(/<[^>]*>/g, '').substring(0, 200) || '';
    output += `${cleanText}...\n\n`;

    output += `**Choices:**\n`;
    ex.choices.forEach(c => {
      output += `  ${c.letter}. ${c.text}\n`;
    });
    output += '\n';

    output += `**Current NO CHANGE Explanation:**\n`;
    const currentExp = ex.answer_explanation || '';
    const pattern = new RegExp(`\\*\\*Choice ${noChangeChoice.letter}:[^✓✗]+(✓ CORRECT|✗ Incorrect)`, 's');
    const match = currentExp.match(pattern);
    if (match) {
      output += `${match[0]}\n`;
    }
    output += '\n---\n\n';
  });

  fs.writeFileSync('/tmp/no-change-review.md', output);
  console.log('✅ Exported to /tmp/no-change-review.md');
  console.log(`\nFirst 5 examples:\n`);

  noChangeExamples.slice(0, 5).forEach((ex, idx) => {
    console.log(`${idx + 1}. ${ex.title}`);
    console.log(`   Correct: ${ex.correct_answer}`);
    const noChangeChoice = ex.choices.find(c => c.text.toUpperCase().includes('NO CHANGE'));
    console.log(`   NO CHANGE (${noChangeChoice.letter}): ${noChangeChoice.letter === ex.correct_answer ? 'CORRECT' : 'INCORRECT'}\n`);
  });
}

exportForReview().then(() => process.exit(0));
