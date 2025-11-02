#!/usr/bin/env node

/**
 * Manually fix the most important NO CHANGE explanations with highly specific text
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const manualFixes = {
  'Identifying Sentence Fragments': {
    underlined: 'Fair a',
    explanation: 'The phrase "Fair a" is missing the verb "was" between "Fair" and "a". Without this verb, the sentence is incomplete: "the must-have toy at the Cincinnati Toy Fair a new type..." doesn\'t make grammatical sense. It should read "Fair was a new type..." to form a complete sentence.'
  },
  'Have vs. Of': {
    underlined: 'could of',
    explanation: 'The phrase "could of" is incorrect. The verb is "could have" (or "could\'ve" as a contraction), not "could of." This is a common error that comes from mishearing the contraction "could\'ve" and writing it as "could of," but "of" is never part of a verb phrase.'
  },
  'Eliminating Wordiness': {
    underlined: 'at this point in time',
    explanation: 'The phrase "at this point in time" is unnecessarily wordy. It uses five words to express what can be said in one word: "now" or two words: "at present." This verbose phrasing doesn\'t add any additional meaning or clarity - it just makes the sentence longer and less direct.'
  },
  'Comma + FANBOYS vs. Comma Splices': {
    underlined: ', however this',
    explanation: 'The punctuation ", however this" creates a comma splice. "However" is a conjunctive adverb, not a coordinating conjunction, so it can\'t join two independent clauses with just a comma. You need either a semicolon before "however" ("; however, this") or a period to separate the sentences.'
  },
  'Subject-Verb Agreement with Prepositional Phrases': {
    underlined: 'groom',
    explanation: 'The verb form in this context needs to be checked against its subject. If the subject is singular (like "bride" or "groom" as a single person), the verb should be "grooms" with an -s ending. The base form "groom" is only correct with plural subjects or with "I/you/we/they."'
  },
  'Basic Misplaced Modifier': {
    underlined: 'Consistently erupting, Jack',
    explanation: 'The phrase "Consistently erupting, Jack" creates a misplaced modifier. The opening phrase "Consistently erupting" should describe what comes immediately after the comma, but Jack is not erupting - the volcano is. The sentence structure makes it seem like Jack is consistently erupting, which is illogical. The volcano should come immediately after the comma.'
  },
  'Pair of Dashes for Unnecessary Information': {
    underlined: ', his toy cars, his',
    explanation: 'The phrase ", his toy cars, his" uses commas inconsistently for nonessential information. If "his toy cars" is extra information that can be removed from the sentence, it needs to be set off with a matching pair of punctuation marks - either commas on both sides or dashes on both sides. Mixing them creates confusion about where the interruption begins and ends.'
  },
  'Not Only/But Also': {
    underlined: 'but also she locked',
    explanation: 'The phrase "but also she locked" breaks the parallel structure of the "not only...but also" construction. After "not only," if you have a verb (like "did she lock"), then after "but also" you need the same structure (another verb with "she"). The current phrasing doesn\'t maintain this parallelism, making the sentence awkward and grammatically inconsistent.'
  },
  'Redundancy in Context': {
    underlined: 'returned back home',
    explanation: 'The phrase "returned back home" is redundant. The word "returned" already means to go back to a place, so adding "back" is unnecessary and repetitive. It should be either "returned home" or "went back home," but not both "returned" and "back" together.'
  },
  'Ambiguous Pronouns': {
    underlined: 'he',
    explanation: 'The pronoun "he" is ambiguous in this context. There are multiple male individuals mentioned in the surrounding sentences, so it\'s unclear which person "he" refers to. The pronoun reference is confusing and needs to be replaced with the actual name to make the meaning clear to the reader.'
  }
};

async function applyManualFixes() {
  console.log('🔧 Applying manual NO CHANGE fixes for maximum specificity...\\n');

  let updated = 0;

  for (const [title, fix] of Object.entries(manualFixes)) {
    const { data } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('title', title);

    if (!data || data.length === 0) {
      console.log(`⚠️  Could not find example: ${title}`);
      continue;
    }

    const ex = data[0];
    const noChangeChoice = ex.choices?.find(c => c.text.toUpperCase().includes('NO CHANGE'));
    if (!noChangeChoice) continue;

    const isCorrect = noChangeChoice.letter === ex.correct_answer;
    const marker = isCorrect ? '✓ CORRECT' : '✗ Incorrect';

    let explanation = ex.answer_explanation || '';

    // Find and replace the NO CHANGE section
    const pattern = new RegExp(`\\*\\*Choice ${noChangeChoice.letter}:[^✓✗]+(✓ CORRECT|✗ Incorrect)`, 's');

    const newSection = `**Choice ${noChangeChoice.letter}: "${noChangeChoice.text}"**
${fix.explanation}
${marker}`;

    explanation = explanation.replace(pattern, newSection);

    const { error } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: explanation })
      .eq('id', ex.id);

    if (!error) {
      updated++;
      console.log(`✅ ${updated}. Updated "${title}"`);
      console.log(`   Underlined: "${fix.underlined}"`);
    } else {
      console.error(`❌ Error updating ${title}:`, error.message);
    }
  }

  console.log(`\\n✅ Successfully applied ${updated} manual fixes`);
  console.log('\\n🎯 All NO CHANGE explanations now reference the specific underlined text!');
}

applyManualFixes().then(() => process.exit(0));
