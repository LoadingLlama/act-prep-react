#!/usr/bin/env node

/**
 * EXTRACT TEST 2 ENGLISH QUESTIONS 16-30 (PASSAGE II)
 * Extract questions from "Making the Desert Bloom" passage about Garamantes
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

console.log('🔧 EXTRACTING TEST 2 ENGLISH QUESTIONS 16-30 (PASSAGE II)\n');
console.log('='.repeat(70));

// Questions 16-30 from Passage II: Making the Desert Bloom
const questions = [
  {
    number: 16,
    stem: "More than two thousand years ago, a people the Romans, called the Garamantes, created a complex civilization in one of the world's driest places—the Sahara Desert.",
    underlined: "the Romans, called the Garamantes,",
    choices: {
      F: "NO CHANGE",
      G: "Romans called the Garamantes,",
      H: "Romans called: the Garamantes",
      J: "Romans called the Garamantes"
    }
  },
  {
    number: 17,
    stem: "Beginning around 500 BCE, they built towns and villages, cloth was manufactured there and jewelry, and traded throughout North Africa and the Mediterranean.",
    underlined: "cloth was manufactured there and jewelry",
    choices: {
      A: "NO CHANGE",
      B: "the manufacture of cloth took place",
      C: "manufactured cloth",
      D: "cloth"
    }
  },
  {
    number: 18,
    stem: "If the writer were to delete the preceding sentence, the paragraph would primarily lose a concluding statement that:",
    underlined: "They also grew a variety of crops, including wheat.",
    choices: {
      F: "indicates that the Garamantes were successful farmers in that they grew a variety of crops.",
      G: "summarizes the information provided about the Garamantes.",
      H: "indicates the products that the Garamantes exported to Rome.",
      J: "takes the focus off the Garamantes and places it on the products they imported."
    }
  },
  {
    number: 19,
    stem: "The survival of their civilization depended on hundreds of miles of underground tunnels. Which choice provides new information to the essay?",
    underlined: "hundreds of miles of underground tunnels",
    choices: {
      A: "NO CHANGE",
      B: "upon which they depended.",
      C: "used by the Garamantes,",
      D: "a key to their survival."
    }
  },
  {
    number: 20,
    stem: "These tunnels carried water to desert settlements from an aquifer, an underground reservoir of water. Which choice best indicates the method used to build the tunnels?",
    underlined: "These tunnels",
    choices: {
      F: "NO CHANGE",
      G: "Hand-dug tunnels",
      H: "These carefully constructed tunnels",
      J: "Tunnels built in the desert"
    }
  },
  {
    number: 21,
    stem: "When the tunnels reached a town or field, the water flowed into more easy accessible surface canals or reservoirs.",
    underlined: "more easy accessible",
    choices: {
      A: "NO CHANGE",
      B: "more easily",
      C: "easier and",
      D: "easy and"
    }
  },
  {
    number: 22,
    stem: "Having left no clues, archaeologists don't know how the Garamantes learned to build foggaras.",
    underlined: "Having left no clues, archaeologists",
    choices: {
      F: "NO CHANGE",
      G: "A genuine puzzle to scientists, archaeologists",
      H: "Giving no indication, archaeologists",
      J: "Archaeologists"
    }
  },
  {
    number: 23,
    stem: "And because the water came from an aquifer rather then from its rainfall, the supply was unaffected by drought.",
    underlined: "then from its",
    choices: {
      A: "NO CHANGE",
      B: "than from",
      C: "then by",
      D: "than by"
    }
  },
  {
    number: 24,
    stem: "The Garamantes could of relied on a constant supply of water for drinking, washing, and irrigation.",
    underlined: "could of relied",
    choices: {
      F: "NO CHANGE",
      G: "had to of relied",
      H: "could rely",
      J: "relies"
    }
  },
  {
    number: 25,
    stem: "Moreover, the cold, damp air of the foggaras lowered the temperature inside the homes that were built over them, resulting in an ancient form of air-conditioning.",
    underlined: "Moreover,",
    choices: {
      A: "NO CHANGE",
      B: "Nevertheless,",
      C: "In contrast,",
      D: "Even so,"
    }
  },
  {
    number: 26,
    stem: "The Garamantes who thrived until about 500 CE, when some archaeologists believe they began to deplete the aquifer.",
    underlined: "who thrived",
    choices: {
      F: "NO CHANGE",
      G: "many of whom",
      H: "having",
      J: "DELETE the underlined portion."
    }
  },
  {
    number: 27,
    stem: "As the foggaras supplied less and less water, the Garamantes' population declined, their civilization eventually collapsed.",
    underlined: "As",
    choices: {
      A: "NO CHANGE",
      B: "As to when",
      C: "Whereas",
      D: "Though"
    }
  },
  {
    number: 28,
    stem: "As the foggaras supplied less and less water, the Garamantes' population declined, their civilization eventually collapsed.",
    underlined: "declined, their",
    choices: {
      F: "NO CHANGE",
      G: "declined the Garamantes'",
      H: "declined. Their",
      J: "declined their"
    }
  },
  {
    number: 29,
    stem: "The stone mounds that mark their ventilation shafts are still visible in what is now southwestern Libya, where they can be seen even now.",
    underlined: "where they can be seen even now",
    choices: {
      A: "NO CHANGE",
      B: "a place where visitors can see these amazing signs of an ancient civilization.",
      C: "the location that continues to present visitors with a view of these remnants of a time gone by.",
      D: "DELETE the underlined portion and end the sentence with a period."
    }
  },
  {
    number: 30,
    stem: "Suppose the writer's primary purpose had been to provide information about a civilization's efforts to overcome a natural obstacle in order to survive. Would this essay accomplish that purpose?",
    underlined: "[Question 30 asks about the preceding passage as a whole.]",
    choices: {
      F: "Yes, because it explains that the Garamantes traded throughout North Africa and the Mediterranean.",
      G: "Yes, because it describes the Garamantes' method of bringing water to an otherwise dry area, allowing the Garamantes to thrive there.",
      H: "No, because the foggaras were not naturally occurring tunnels.",
      J: "No, because the foggaras ultimately led to the downfall of the Garamantes' civilization."
    }
  }
];

console.log('\n📝 Extracting English questions 16-30 (Passage II):');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  if (q.underlined) console.log(`Underlined: "${q.underlined.substring(0, 50)}..."`);
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
    .from('act_english_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.number);

  if (error) {
    console.error(`❌ Error updating Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Q${q.number} in database`);
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/15 questions!`);
console.log('✅ Passage 2 (Questions 16-30) is now complete with real content!');
console.log('\n📋 NEXT STEPS:');
console.log('    1. Extract Passage 3 questions (31-45) - Neutrinos on Ice');
console.log('    2. Extract Passage 4 questions (46-60)');
console.log('    3. Extract Passage 5 questions (61-75)');
console.log('    4. Continue with Math, Reading, and Science questions\n');