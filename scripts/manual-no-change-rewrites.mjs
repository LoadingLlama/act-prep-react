/**
 * Manual context-specific NO CHANGE explanations
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Map of example ID -> NO CHANGE specific explanation
const specificExplanations = {
  // Countable vs. Non-countable
  '149cd22b-70d5-448e-83a6-9f94f0cbeb35': {
    letter: 'A',
    explanation: `"Amount" is incorrect here because students are countable individuals, not a mass quantity. We use "amount" only for non-countable nouns like water or money. Since students can be counted one by one, we need "number" instead of "amount" to be grammatically correct.`
  },

  // Testing Semicolons Between Clauses
  '2269fa9d-eaab-4a64-b0ce-edacd9b2dd78': {
    letter: 'A',
    explanation: `The semicolon before "however" is correct because we're joining two independent clauses that could stand alone as complete sentences. The word "however" is a conjunctive adverb showing contrast, and it requires a semicolon before it (not just a comma) when connecting two independent clauses. The comma after "however" is also correct.`
  },

  // Using Known Words
  '3893c3d2-6523-4805-8413-09c4b15631cb': {
    letter: 'A',
    explanation: `"Tune it out" is the most natural and commonly understood phrase for ignoring background noise. It's clear, conversational, and precisely conveys the idea of mentally blocking out the sound of the train. The alternatives use overly formal or inappropriate words that would sound awkward in this context.`
  },

  // Identifying Subject-Verb Agreement vs. Tense Questions
  '60bc14d2-a169-4705-a697-01da657af929': {
    letter: 'A',
    explanation: `"Has" is correct because the subject is "row" (singular), not "townhouses." Although "townhouses" appears right before the verb, it's part of a prepositional phrase ("of the townhouses"). The verb must agree with "row," which is singular, so we use "has" rather than "have."`
  },

  // Unnecessary Information with Names
  '7a292371-2130-450b-aa0b-33ec3502b2ba': {
    letter: 'A',
    explanation: `Without commas around "a very popular teacher," the sentence runs together incorrectly. This descriptive phrase is non-essential information that should be set off with commas on both sides. The missing punctuation makes it unclear where the name ends and the description begins, creating a confusing sentence structure.`
  },

  // Front Modifier with Multiple Nouns
  'e9a4fca6-ad50-48df-8bd4-9f416895e32a': {
    letter: 'A',
    explanation: `This creates a dangling modifier error. The opening phrase "A brand new approach to automobile manufacturing" should describe what comes right after it, but instead it's followed by "Henry Ford and Ford Motor Company," making it sound like the people themselves were an approach. The assembly line was the approach, not the people, so the sentence needs to be restructured.`
  },

  // Possessive vs. Plural Nouns
  '128d0807-8b9a-47c3-8bdc-91053f113257': {
    letter: 'A',
    explanation: `The apostrophe in "player's" is incorrect because we're not showing possession—we're simply referring to multiple players. The sentence means Raheem was interested in the players themselves and their moves (two separate things connected by "and"), not something belonging to one player. We need the simple plural "players" without an apostrophe.`
  },

  // Dependent Clauses Creating Fragments
  '9d0d69c7-b3bd-4aba-b5c5-a58a36e29cdd': {
    letter: 'A',
    explanation: `Starting with "While" creates a dependent clause that never connects to an independent clause. The entire sentence is just one long dependent clause without a main verb, making it a fragment. We need to remove "While" or restructure the sentence so there's a complete independent clause that can stand on its own.`
  },

  // Testing Each Word
  '7faec793-cbd2-4e65-81a9-940c4a1ee2d5': {
    letter: 'A',
    explanation: `"Adamant" is the precise word choice here because it means the teacher was firmly insistent and unwavering about the need to cite sources properly. The other options either express the wrong emotion (ecstatic means extremely happy), describe a different quality (eminent means famous or distinguished), or convey the opposite meaning (trivial means unimportant).`
  },
};

async function updateSpecificExplanations() {
  console.log('🔧 Applying specific NO CHANGE explanations...\n');

  let updated = 0;

  for (const [id, data] of Object.entries(specificExplanations)) {
    // Fetch the example
    const { data: example } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('id', id)
      .single();

    if (!example) {
      console.log(`❌ Example not found: ${id}`);
      continue;
    }

    // Get current explanation
    let explanation = example.answer_explanation || '';

    // Find the NO CHANGE section
    const pattern = new RegExp(`\\*\\*Choice ${data.letter}:[^✓✗]+(✓ CORRECT|✗ Incorrect)`, 's');
    const match = explanation.match(pattern);

    if (!match) {
      console.log(`❌ Could not find Choice ${data.letter} in ${example.title}`);
      continue;
    }

    // Determine if correct or incorrect
    const isCorrect = example.correct_answer === data.letter;
    const marker = isCorrect ? '✓ CORRECT' : '✗ Incorrect';

    // Build new explanation
    const noChangeChoice = example.choices.find(c => c.letter === data.letter);
    const newExplanation = `**Choice ${data.letter}: "${noChangeChoice.text}"**
${data.explanation}
${marker}`;

    // Replace old with new
    explanation = explanation.replace(match[0], newExplanation);

    // Update database
    const { error } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: explanation })
      .eq('id', id);

    if (error) {
      console.log(`❌ Error updating ${example.title}:`, error.message);
    } else {
      updated++;
      console.log(`✅ ${updated}. ${example.title}`);
    }
  }

  console.log(`\n✅ Updated ${updated} NO CHANGE explanations`);
}

updateSpecificExplanations().then(() => process.exit(0));
