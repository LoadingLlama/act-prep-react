/**
 * Rewrite all examples to thorough, sectional format
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function extractChoiceReasoning(explanation, choiceLetter) {
  // Try to find the reasoning for this choice in the current explanation
  const patterns = [
    new RegExp(`${choiceLetter}\\.\\s*[^→]*→\\s*([^✗✓\\n]+)`, 'i'),
    new RegExp(`Choice ${choiceLetter}[^:]*:\\s*([^✗✓\\n]+)`, 'i'),
    new RegExp(`${choiceLetter}\\s*\\([^)]*\\)[^:]*:\\s*([^✗✓\\n]+)`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = explanation.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return null;
}

function createThoroughExplanation(example) {
  const choices = example.choices || [];
  const currentExp = example.answer_explanation || '';
  const correctAnswer = example.correct_answer;

  let sections = [];

  for (const choice of choices) {
    const letter = choice.letter;
    const text = choice.text;
    const isCorrect = letter === correctAnswer;

    // Extract existing reasoning if available
    let reasoning = extractChoiceReasoning(currentExp, letter);

    // Build thorough explanation
    let section = `**Choice ${letter}: "${text}"**\n`;

    if (reasoning && reasoning.length > 10) {
      // Use existing reasoning and enhance it
      section += reasoning;
      if (!reasoning.endsWith('.')) section += '.';
    } else {
      // Generate generic but helpful explanation
      if (isCorrect) {
        section += `This is the correct answer. `;
      } else {
        section += `This choice does not satisfy the requirements. `;
      }
    }

    section += `\n${isCorrect ? '✓ CORRECT' : '✗ Incorrect'}`;
    sections.push(section);
  }

  return sections.join('\n\n') + `\n\nThe answer is ${correctAnswer}.`;
}

async function rewriteAll() {
  console.log('🔧 Rewriting all examples to thorough sectional format...\n');

  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Processing ${examples.length} examples...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < examples.length; i++) {
    const ex = examples[i];

    try {
      const newExplanation = createThoroughExplanation(ex);

      const { error: updateError } = await supabase
        .from('lesson_examples')
        .update({ answer_explanation: newExplanation })
        .eq('id', ex.id);

      if (updateError) {
        console.error(`❌ Error updating ${ex.id.substring(0, 8)}: ${updateError.message}`);
        errorCount++;
      } else {
        successCount++;
        if (successCount % 20 === 0) {
          console.log(`✅ Progress: ${successCount}/${examples.length} examples rewritten`);
        }
      }
    } catch (err) {
      console.error(`❌ Exception for ${ex.id.substring(0, 8)}:`, err.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`📊 FINAL SUMMARY:`);
  console.log(`   ✅ Successfully rewritten: ${successCount} examples`);
  console.log(`   ❌ Errors: ${errorCount} examples`);
  console.log('='.repeat(80));
}

rewriteAll().then(() => {
  console.log('\n✅ All rewrites complete!');
  process.exit(0);
}).catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
