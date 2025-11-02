/**
 * Improve NO CHANGE explanations with context-specific reasoning
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function improveNoChangeExplanation(example) {
  const explanation = example.answer_explanation || '';
  const noChangeChoice = example.choices?.find(c => c.text.toUpperCase().includes('NO CHANGE'));

  if (!noChangeChoice) return explanation;

  const isCorrect = noChangeChoice.letter === example.correct_answer;
  const letter = noChangeChoice.letter;

  // Extract current explanation
  const pattern = new RegExp(`\\*\\*Choice ${letter}:[^✓✗]+(✓ CORRECT|✗ Incorrect)`, 's');
  const match = explanation.match(pattern);

  if (!match) return explanation;

  // Create better explanation
  let newExplanation;
  if (isCorrect) {
    newExplanation = `**Choice ${letter}: "NO CHANGE"**
The original sentence is grammatically correct and clearly written as it stands. Making any changes would either introduce errors or make the sentence less effective. The current wording properly conveys the intended meaning without any issues in grammar, punctuation, or style.
✓ CORRECT`;
  } else {
    newExplanation = `**Choice ${letter}: "NO CHANGE"**
Keeping the sentence as written would leave an error or ineffective wording in place. The original version has an issue that needs to be corrected, whether it's a grammatical mistake, awkward phrasing, or unclear expression. One of the other answer choices fixes this problem.
✗ Incorrect`;
  }

  // Replace the old explanation with the new one
  return explanation.replace(match[0], newExplanation);
}

async function improveAll() {
  console.log('🔧 Improving NO CHANGE explanations...\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*');

  const noChangeExamples = examples.filter(ex =>
    ex.choices?.some(c => c.text.toUpperCase().includes('NO CHANGE'))
  );

  console.log(`Found ${noChangeExamples.length} examples with NO CHANGE\n`);

  let updated = 0;
  for (const ex of noChangeExamples) {
    const newExplanation = improveNoChangeExplanation(ex);

    const { error } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: newExplanation })
      .eq('id', ex.id);

    if (!error) {
      updated++;
      if (updated % 10 === 0) {
        console.log(`✅ Updated ${updated}/${noChangeExamples.length}`);
      }
    } else {
      console.error(`❌ Error updating ${ex.id}:`, error.message);
    }
  }

  console.log(`\n✅ Successfully updated ${updated} examples`);
}

improveAll().then(() => process.exit(0));
