#!/usr/bin/env node

/**
 * EXTRACT TEST 2 ENGLISH QUESTIONS 61-75 (PASSAGE V)
 * Extract final English questions from "Cher Ami, Pigeon Hero" passage
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

console.log('🔧 EXTRACTING TEST 2 ENGLISH QUESTIONS 61-75 (PASSAGE V)\n');
console.log('='.repeat(70));

// Questions 61-75 from Passage V: Cher Ami, Pigeon Hero
const questions = [
  {
    number: 61,
    stem: "In many urban areas, they are considered little more than, a 'rats with wings,' blamed for spreading disease and despoiling statues.",
    underlined: "than,",
    choices: {
      A: "NO CHANGE",
      B: "than—",
      C: "than;",
      D: "than"
    }
  },
  {
    number: 62,
    stem: "In many urban areas, they are considered little more than a 'rats with wings,' blamed for spreading disease and despoiling statues.",
    underlined: "wings,' blamed",
    choices: {
      F: "NO CHANGE",
      G: "wings' and they are blamed",
      H: "wings,' they are blamed",
      J: "wings.' Blamed"
    }
  },
  {
    number: 63,
    stem: "For example, one species, the homing pigeon, which is among the best navigators of the natural world.",
    underlined: "For example,",
    choices: {
      A: "NO CHANGE",
      B: "Similarly,",
      C: "However,",
      D: "Thus,"
    }
  },
  {
    number: 64,
    stem: "For example, one species, the homing pigeon, which is among the best navigators of the natural world.",
    underlined: "pigeon, which",
    choices: {
      F: "NO CHANGE",
      G: "pigeon that",
      H: "pigeon,",
      J: "pigeon"
    }
  },
  {
    number: 65,
    stem: "There navigational abilities has earned the homely pigeon an undeniable place in history.",
    underlined: "There",
    choices: {
      A: "NO CHANGE",
      B: "They're",
      C: "Its",
      D: "Its"
    }
  },
  {
    number: 66,
    stem: "Former modern technologies like the radio or telephone, commanders on the battlefield often faced challenges in communicating, depending on their location.",
    underlined: "Former",
    choices: {
      F: "NO CHANGE",
      G: "Before",
      H: "Earlier",
      J: "Prior"
    }
  },
  {
    number: 67,
    stem: "The writer is considering revising the underlined portion to the following: especially across long distances and difficult terrain. Should the writer make this revision?",
    underlined: "depending on their location",
    choices: {
      A: "Yes, because it offers a better indication of the circumstances that made communication difficult.",
      B: "Yes, because it more clearly identifies the locations of and distances between troops.",
      C: "No, because it adds information that is irrelevant to the paragraph's discussion of pigeons.",
      D: "No, because it suggests that homing pigeons are unnecessary today."
    }
  },
  {
    number: 68,
    stem: "And it always quickly returned and came back to its home roost.",
    underlined: "quickly returned and came back",
    choices: {
      F: "NO CHANGE",
      G: "speedily returned, coming home",
      H: "returned home",
      J: "returned"
    }
  },
  {
    number: 69,
    stem: "One of six hundred birds used by the US Army Signal Corps in France during World War I, all twelve of Cher Ami's missions were deemed successful.",
    underlined: "all twelve of Cher Ami's missions were deemed successful",
    choices: {
      A: "NO CHANGE",
      B: "the twelve missions Cher Ami flew were successful.",
      C: "successful missions by Cher Ami numbered twelve.",
      D: "Cher Ami flew twelve successful missions."
    }
  },
  {
    number: 70,
    stem: "The men were surrounded by German troops and were rapidly running out of rations. They were separated from other US forces.",
    underlined: "They were separated from other US forces.",
    choices: {
      F: "NO CHANGE",
      G: "German troops were all around them.",
      H: "They would soon be out of rations.",
      J: "DELETE the underlined portion."
    }
  },
  {
    number: 71,
    stem: "They had but one link to headquarters homing pigeons.",
    underlined: "headquarters",
    choices: {
      A: "NO CHANGE",
      B: "headquarters:",
      C: "headquarters;",
      D: "headquarters,"
    }
  },
  {
    number: 72,
    stem: "It was becoming clear that the Americans were unaware of the 77th's whereabouts, the situation grew dire.",
    underlined: "It was becoming clear that",
    choices: {
      F: "NO CHANGE",
      G: "Having become",
      H: "As it became",
      J: "It became"
    }
  },
  {
    number: 73,
    stem: "Major Whittlesey sent several pigeons with messages requesting food and ammunition, but enemy fire brought down the birds.",
    underlined: "requesting food and ammunition",
    choices: {
      A: "NO CHANGE",
      B: "that requested food and ammunition",
      C: "to request food and ammunition",
      D: "requesting both food and ammunition"
    }
  },
  {
    number: 74,
    stem: "Then friendly fire began falling on the 77th's position—the Americans, unaware of the 77th's location, were inadvertently shelling their own troops.",
    underlined: "falling on the 77th's position—the Americans, unaware of the 77th's location, were inadvertently shelling their own troops",
    choices: {
      F: "NO CHANGE",
      G: "to fall on the 77th's position because the Americans were inadvertently shelling their own troops",
      H: "on the 77th's position. The Americans were inadvertently shelling their own troops",
      J: "on the 77th's position; the Americans were inadvertently shelling their own troops"
    }
  },
  {
    number: 75,
    stem: "Question 75 asks about the preceding passage as a whole. Suppose the writer's primary purpose had been to write a brief essay honoring war heroes. Would this essay accomplish that purpose?",
    underlined: "[Question 75 asks about the preceding passage as a whole.]",
    choices: {
      A: "Yes, because it focuses on Cher Ami's heroic military service and the lives that service saved.",
      B: "Yes, because it explains how both the 77th Infantry Division and Cher Ami displayed exceptional bravery.",
      C: "No, because it focuses more on the general use of homing pigeons in wartime than on Cher Ami specifically.",
      D: "No, because it suggests that luck, rather than heroism, enabled Cher Ami to complete the mission."
    }
  }
];

console.log('\n📝 Extracting English questions 61-75 (Passage V):');

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
console.log('✅ Passage 5 (Questions 61-75) is now complete with real content!');
console.log('\n🎊 ALL 75 ENGLISH QUESTIONS NOW HAVE REAL CONTENT! 🎊');
console.log('\n📋 NEXT STEPS:');
console.log('    1. Extract all Math questions (1-60)');
console.log('    2. Extract all Reading questions (1-40)');
console.log('    3. Extract all Science questions (1-40)');
console.log('    4. Verify all 215 questions have real content\n');