/**
 * Simplify ALL examples to just choice-by-choice format
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function simplifyToChoices(explanation, correctAnswer) {
  // This is a heuristic approach - extract key info and reformat
  // For now, just clean up the format and remove step-by-step

  let simplified = explanation;

  // Remove all "Step X:" sections
  simplified = simplified.replace(/Step \d+:.*?\n/g, '');

  // Remove verbose introductions
  simplified = simplified.replace(/^.*?Test the choices?:/is, '');
  simplified = simplified.replace(/^.*?Looking at.*?\n/gm, '');
  simplified = simplified.replace(/^.*?First.*?\n/gm, '');

  // Remove ending explanations after "The answer is"
  const answerIndex = simplified.indexOf('The answer is');
  if (answerIndex > 0) {
    // Keep everything before and the answer statement
    const beforeAnswer = simplified.substring(0, answerIndex);
    simplified = beforeAnswer.trim() + '\n\nThe answer is ' + correctAnswer + '.';
  }

  // Clean up excessive whitespace
  simplified = simplified.replace(/\n{3,}/g, '\n\n');
  simplified = simplified.trim();

  return simplified;
}

async function simplifyAll() {
  console.log('🔧 Simplifying ALL examples to choice-by-choice format...\n');

  const { data: examples, error: fetchError } = await supabase
    .from('lesson_examples')
    .select('id, answer_explanation, correct_answer, title');

  if (fetchError) {
    console.error('Error fetching examples:', fetchError);
    return;
  }

  console.log(`Processing ${examples.length} examples...\n`);

  let successCount = 0;
  let errorCount = 0;
  let unchangedCount = 0;

  for (const example of examples) {
    const original = example.answer_explanation || '';
    const simplified = simplifyToChoices(original, example.correct_answer);

    // Only update if something changed significantly (more than 10% reduction)
    if (simplified.length < original.length * 0.9 && simplified !== original) {
      try {
        const { error } = await supabase
          .from('lesson_examples')
          .update({ answer_explanation: simplified })
          .eq('id', example.id);

        if (error) {
          console.error(`❌ Error updating ${example.id.substring(0, 8)}:`, error);
          errorCount++;
        } else {
          console.log(`✅ Simplified ${example.id.substring(0, 8)}... ${example.title.substring(0, 40)} (${original.length} → ${simplified.length} chars)`);
          successCount++;
        }
      } catch (err) {
        console.error(`❌ Exception updating ${example.id}:`, err);
        errorCount++;
      }
    } else {
      unchangedCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`📊 SUMMARY:`);
  console.log(`   ✅ Simplified: ${successCount} examples`);
  console.log(`   ⏭️  No significant change: ${unchangedCount} examples`);
  console.log(`   ❌ Errors: ${errorCount} examples`);
  console.log('='.repeat(80));
}

simplifyAll().then(() => {
  console.log('\n✅ Simplification complete!');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
