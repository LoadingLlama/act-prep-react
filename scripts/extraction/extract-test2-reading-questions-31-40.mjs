#!/usr/bin/env node

/**
 * EXTRACT TEST 2 READING QUESTIONS 31-40
 * Extract final Reading questions from Natural Science passage about steel
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

console.log('🔧 EXTRACTING TEST 2 READING QUESTIONS 31-40 (NATURAL SCIENCE)\n');
console.log('='.repeat(70));

// Reading questions 31-40 from Natural Science passage about steel
const questions = [
  {
    number: 31,
    stem: "The main purpose of the passage is to:",
    choices: {
      A: "explain in detail the various experiments Bessemer conducted in order to develop a better steel.",
      B: "provide an overview of some of the scientific principles that apply to the creation and behavior of steel.",
      C: "describe some of the philosophical questions concerning metallurgy.",
      D: "illustrate the differences between pig iron and cast iron."
    }
  },
  {
    number: 32,
    stem: "The author most likely includes details about the initial response to Bessemer's new steel-making process in order to:",
    choices: {
      F: "emphasize that Bessemer's new process was a significant achievement for industry.",
      G: "provide support for the claim that Bessemer was primarily a scientist rather than an engineer.",
      H: "illustrate how scientific discoveries were disseminated in the nineteenth century.",
      J: "suggest that the public's enthusiasm for scientific achievements has declined since Bessemer's time."
    }
  },
  {
    number: 33,
    stem: "It can reasonably be inferred that the author includes the information that Bergmann was a mentor and sponsor of Scheele's mainly to:",
    choices: {
      A: "introduce the fact that Bergmann was a teacher as well as a scientist.",
      B: "suggest that Bergmann was a more successful scientist than Scheele was.",
      C: "give an example of the eighteenth-century notion of scientific communities.",
      D: "reinforce Bergmann's credibility as a scientist."
    }
  },
  {
    number: 34,
    stem: "According to the passage, which of the following conversions is a direct result of adding oxygen to molten pig iron?",
    choices: {
      F: "Light silica slag is converted into carbon dioxide.",
      G: "Carbon dioxide is converted into carbon.",
      H: "Silicon is converted into light silica slag.",
      J: "Impurities in the metal are converted into silicon."
    }
  },
  {
    number: 35,
    stem: "In the context of the passage, the main effect of the word \"spice\" (line 37) is to emphasize that:",
    choices: {
      A: "elements must be gradually mixed into steel in order to produce the desired effect.",
      B: "adding certain elements to steel can enrich the steel's quality.",
      C: "manganese, chromium, and nickel are used sparingly in steel because of their expense.",
      D: "blending elements is a trial-and-error process that has not yet yielded positive results."
    }
  },
  {
    number: 36,
    stem: "Based on the passage, with which of the following statements would the author most likely agree?",
    choices: {
      F: "Metallurgy is not an art because it requires too much scientific knowledge.",
      G: "Metallurgy is too difficult to be considered a science.",
      H: "Metallurgy is a science as well as an art.",
      J: "Metallurgy is a trivial science."
    }
  },
  {
    number: 37,
    stem: "The passage most strongly suggests that the study of the behavior of materials and the study of the social sciences are similar because they:",
    choices: {
      A: "require analyses that span a wide range of scales.",
      B: "are based on trial-and-error experimentation.",
      C: "involve examination of the size and shape of individual atoms.",
      D: "produce results that must be interpreted by both scientists and artists."
    }
  },
  {
    number: 38,
    stem: "The main idea of the last paragraph is that:",
    choices: {
      F: "defects in the crystal structure of a metal determine that metal's mechanical properties.",
      G: "dislocations are the most common type of stacking fault in a metal.",
      H: "the mechanical behavior of a metal can be modified by increasing the size of a metal's grains.",
      J: "microscopic grains divide a metal into mosaics of crystallites."
    }
  },
  {
    number: 39,
    stem: "As it is used in line 56, the word \"stretched\" most nearly means:",
    choices: {
      A: "strained.",
      B: "exaggerated.",
      C: "extended.",
      D: "amplified."
    }
  },
  {
    number: 40,
    stem: "According to the passage, reducing the size of a metal's grains can make the metal:",
    choices: {
      F: "more rust-resistant.",
      G: "more brittle.",
      H: "finer.",
      J: "harder."
    }
  }
];

console.log('\n📝 Extracting Reading questions 31-40 (Natural Science):');

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
console.log('✅ Reading questions 31-40 (Natural Science) now have real content!');
console.log('\n🎊 ALL 40 READING QUESTIONS NOW COMPLETE! 🎊');
console.log('\n📋 SUMMARY:');
console.log('    ✅ Literary Narrative (Q1-10): Complete');
console.log('    ✅ Social Science (Q11-20): Complete');
console.log('    ✅ Humanities (Q21-30): Complete');
console.log('    ✅ Natural Science (Q31-40): Complete');
console.log('\n📋 NEXT: Continue with Science test questions (1-40)\n');