/**
 * Test NO CHANGE parsing
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const parseChoiceExplanations = (text) => {
  if (!text) return {};

  const explanations = {};

  // Extract each choice section
  text.match(/\*\*Choice ([A-E]):(.*?)(?=\*\*Choice [A-E]:|The answer is|$)/gs)?.forEach(match => {
    const letterMatch = match.match(/\*\*Choice ([A-E]):/);
    const letter = letterMatch ? letterMatch[1] : '';

    // Extract explanation (everything between the choice text and the correct/incorrect marker)
    const contentMatch = match.match(/:\s*"([^"]+)"\*\*\s*(.*?)(?=✓ CORRECT|✗ Incorrect)/s);
    const explanation = contentMatch ? contentMatch[2].trim() : '';

    console.log(`\nLetter: ${letter}`);
    console.log(`Content match found: ${!!contentMatch}`);
    if (contentMatch) {
      console.log(`Choice text: "${contentMatch[1]}"`);
      console.log(`Explanation preview: ${explanation.substring(0, 100)}...`);
    }

    if (letter && explanation) {
      explanations[letter] = explanation;
    }
  });

  return explanations;
};

async function test() {
  // Get one example with NO CHANGE
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('id', '60bc14d2-a169-4705-a697-01da657af929')
    .single();

  console.log('Testing example:', examples.title);
  console.log('\nChoices:');
  examples.choices.forEach(c => console.log(`  ${c.letter}. ${c.text}`));

  console.log('\n' + '='.repeat(80));
  console.log('PARSING TEST:');
  console.log('='.repeat(80));

  const result = parseChoiceExplanations(examples.answer_explanation);

  console.log('\n' + '='.repeat(80));
  console.log('RESULTS:');
  console.log('='.repeat(80));
  console.log('Parsed explanations:', Object.keys(result));
  console.log('\nChoice A (NO CHANGE) explanation:');
  console.log(result['A'] || 'NOT FOUND');
}

test().then(() => process.exit(0));
