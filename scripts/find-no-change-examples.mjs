/**
 * Find examples with NO CHANGE choices
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findNoChange() {
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*');

  const noChangeExamples = examples.filter(ex =>
    ex.choices?.some(c => c.text.toUpperCase().includes('NO CHANGE'))
  );

  console.log(`Found ${noChangeExamples.length} examples with NO CHANGE choices\n`);

  for (const ex of noChangeExamples.slice(0, 5)) {
    console.log('='.repeat(80));
    console.log(`Title: ${ex.title}`);
    console.log(`ID: ${ex.id}`);
    console.log('\nChoices:');
    ex.choices.forEach(c => {
      console.log(`  ${c.letter}. ${c.text}`);
    });

    console.log('\nExplanation preview:');
    const explanation = ex.answer_explanation || '';

    // Check if NO CHANGE has explanation
    const noChangeChoice = ex.choices.find(c => c.text.toUpperCase().includes('NO CHANGE'));
    if (noChangeChoice) {
      const hasExplanation = explanation.includes(`**Choice ${noChangeChoice.letter}:`);
      console.log(`NO CHANGE is choice ${noChangeChoice.letter}: ${hasExplanation ? 'HAS explanation' : 'MISSING explanation'}`);

      // Show the explanation for NO CHANGE if it exists
      const match = explanation.match(new RegExp(`\\*\\*Choice ${noChangeChoice.letter}:.*?(?=\\*\\*Choice [A-E]:|The answer is|$)`, 's'));
      if (match) {
        console.log('\nNO CHANGE explanation:');
        console.log(match[0].substring(0, 200) + '...');
      }
    }
    console.log('\n');
  }
}

findNoChange().then(() => process.exit(0));
