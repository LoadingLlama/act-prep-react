#!/usr/bin/env node

/**
 * EXTRACT TEST 2 READING QUESTIONS 1-10
 * Extract first 10 Reading questions from Literary Narrative passage
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔧 EXTRACTING TEST 2 READING QUESTIONS 1-10\n');
console.log('='.repeat(70));

// Reading questions 1-10 from the PDF (Literary Narrative - dual passages)
const questions = [
  {
    number: 1,
    stem: "In Passage A, the narrator directly compares her mother to a:",
    choices: {
      A: "Picasso painting.",
      B: "shadow and witness.",
      C: "story behind someone's eyes.",
      D: "skyscraper against the sun."
    }
  },
  {
    number: 2,
    stem: "The narrator of Passage A most strongly suggests that the reason she began to believe Chicago belongs to her is that she:",
    choices: {
      F: "could eventually take several different routes to travel from one end of the city to the other without getting lost.",
      G: "had watched her mother directly influence the politics of the city.",
      H: "felt she could move about the city almost unseen, like a small shadow.",
      J: "initially explored the city with her mother as her affirming guide, so her connection to the city seemed familial."
    }
  },
  {
    number: 3,
    stem: "It can most reasonably be inferred from Passage A that the narrator doesn't bother to verify that her mother's ideas about Picasso and his work are accurate primarily because the narrator:",
    choices: {
      A: "doesn't know which references would be best for her to consult.",
      B: "is confident that what her mother says about the artist is accurate and feels that checking references would be a waste of time.",
      C: "doesn't care whether her mother is accurate given how much the narrator likes what her mother says about the artist.",
      D: "wants to hold to her own ideas about the artist, regardless of what her mother says about him."
    }
  },
  {
    number: 4,
    stem: "In Passage B, the narrator most strongly suggests that she believes her answer to which of the following questions does not provide significant information about her background?",
    choices: {
      F: "How is your mother like your other ancestors?",
      G: "Where did your ancestors live?",
      H: "Where were your parents born?",
      J: "Why does water call to you?"
    }
  },
  {
    number: 5,
    stem: "As they are used in Passage B, the word 'blinding' (line 68) and the word 'overwhelm' (line 69) both have a connotation that most strongly suggests a feeling of:",
    choices: {
      A: "fright.",
      B: "awe.",
      C: "regret.",
      D: "quietness."
    }
  },
  {
    number: 6,
    stem: "In line 79, the word 'dead' is most nearly used to describe water that is:",
    choices: {
      F: "colorless.",
      G: "obsolete.",
      H: "stagnant.",
      J: "frozen."
    }
  },
  {
    number: 7,
    stem: "The last sentence of Passage B can best be described as a:",
    choices: {
      A: "metaphor for the narrator's feelings as her mother goes away from her.",
      B: "memory of childhood and of her mother that the narrator holds dear.",
      C: "literal explanation of the way the narrator reacts to her mother's actions.",
      D: "reference to a set of objects that the narrator as a child often found on the shore."
    }
  },
  {
    number: 8,
    stem: "Which of the following actions do the narrators of both passages closely connect with their mothers?",
    choices: {
      F: "Traveling and moving",
      G: "Exploring Chicago streets",
      H: "Speaking openly and boldly",
      J: "Staying at hotels in cities"
    }
  },
  {
    number: 9,
    stem: "The narrator of Passage B would be more likely than the narrator of Passage A to describe her relationship with her mother as being marked by:",
    choices: {
      A: "moments of lively conversation and pure joy.",
      B: "years of fierce competition and debate.",
      C: "displays of physical affection and warmth.",
      D: "feelings of distance and tension."
    }
  },
  {
    number: 10,
    stem: "In both Passage A and Passage B, the narrator of the passage shares information about her mother's:",
    choices: {
      F: "personal history.",
      G: "physical appearance.",
      H: "academic interests.",
      J: "relationship to the narrator's father."
    }
  }
];

console.log('\n📝 Extracting Reading questions 1-10:');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  console.log(`Choices: ${Object.keys(q.choices).join(', ')}`);

  // Update in database
  const updateData = {
    question_stem: q.stem,
    choice_a: q.choices.A || q.choices.F,
    choice_b: q.choices.B || q.choices.G,
    choice_c: q.choices.C || q.choices.H,
    choice_d: q.choices.D || q.choices.J
  };

  const { error } = await supabase
    .from('act_reading_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.number);

  if (error) {
    console.error(`❌ Error updating Reading Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Reading Q${q.number} in database`);
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/10 Reading questions!`);
console.log('✅ Reading questions 1-10 now have real content!');
console.log('\n📋 PROGRESS: 10/40 Reading questions complete');
console.log('    Continue with Social Science passage (questions 11-20)');
console.log('    Then Humanities passage (questions 21-30)');
console.log('    Finally Natural Science passage (questions 31-40)\n');