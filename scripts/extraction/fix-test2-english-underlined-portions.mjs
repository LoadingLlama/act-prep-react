#!/usr/bin/env node

/**
 * FIX TEST 2 ENGLISH QUESTIONS - ADD PROPER UNDERLINED PORTIONS
 * Update English questions to include <u>underlined portions</u> like Test 1
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

console.log('🔧 FIXING TEST 2 ENGLISH QUESTIONS - ADDING UNDERLINED PORTIONS\n');
console.log('='.repeat(70));

// Fixed English questions with proper underlined portions in passage context
const fixedQuestions = [
  {
    number: 1,
    stem: "Mouth music is the name given in English to the many ways <u>by imitating</u> the sounds of musical instruments with the human voice.",
    choices: {
      A: "NO CHANGE",
      B: "with",
      C: "of",
      D: "at"
    }
  },
  {
    number: 2,
    stem: "Forms of mouth music are performed around the world, but the genre <u>being</u> particularly popular in England, Ireland, and Scotland.",
    choices: {
      A: "NO CHANGE",
      B: "was being",
      C: "is",
      D: "DELETE the underlined portion."
    }
  },
  {
    number: 3,
    stem: "Celtic mouth music exists to accompany dancing, so the rhythms and sounds are <u>first-class and the words take a back seat</u>.",
    choices: {
      A: "NO CHANGE",
      B: "more important than the lyrics.",
      C: "a bigger deal than the words.",
      D: "way more vital than verse."
    }
  },
  {
    number: 4,
    stem: "Instead of using traditional lyrics, singers often produce nonsense <u>syllables called vocables</u> to represent specific instrumental sounds, such as those of bagpipes or violins.",
    choices: {
      A: "NO CHANGE",
      B: "syllables, called vocables,",
      C: "syllables, called vocables,",
      D: "syllables called, vocables,"
    }
  },
  {
    number: 5,
    stem: "The results are songs that rarely make literal sense but nevertheless flow in a way <u>easier to dance to</u>.",
    choices: {
      A: "NO CHANGE",
      B: "easily",
      C: "that is easy",
      D: "DELETE the underlined portion."
    }
  },
  {
    number: 6,
    stem: "If the writer were to delete the underlined portion, the sentence would primarily lose: One Scottish form of mouth music, puirt-a-beul, is performed entirely in the Gaelic language and accompanies traditional dance steps. <u>The often tongue-twisting lyrics</u> require much practice to perfect.",
    choices: {
      F: "a description that emphasizes the difficulty of puirt-a-beul.",
      G: "information about writing lyrics for puirt-a-beul music.",
      H: "an indication of how often puirt-a-beul is performed in the Celtic culture.",
      J: "an example of a training exercise puirt-a-beul singers use to practice lyrics."
    }
  },
  {
    number: 7,
    stem: "The greater challenge for many puirt-a-beul singers, though, is learning when to <u>breathe</u>.",
    choices: {
      A: "NO CHANGE",
      B: "at the same time,",
      C: "this time,",
      D: "still,"
    }
  },
  {
    number: 8,
    stem: "A poorly timed breath might break a song's flow, interrupting the steady beat it relies on to help <u>dancers rely</u> on to time their steps.",
    choices: {
      F: "NO CHANGE",
      G: "they rely",
      H: "dancers rely",
      J: "relied"
    }
  },
  {
    number: 16,
    stem: "More than two thousand years ago, a people <u>the Romans, called the Garamantes,</u> created a complex civilization in one of the world's driest places—the Sahara Desert.",
    choices: {
      F: "NO CHANGE",
      G: "Romans called the Garamantes,",
      H: "Romans called: the Garamantes",
      J: "Romans called the Garamantes"
    }
  },
  {
    number: 17,
    stem: "Beginning around 500 BCE, they built towns and villages, <u>cloth was manufactured there and jewelry</u>, and traded throughout North Africa and the Mediterranean.",
    choices: {
      A: "NO CHANGE",
      B: "the manufacture of cloth took place",
      C: "manufactured cloth",
      D: "cloth"
    }
  }
];

console.log('\n📝 Fixing English questions with proper underlined portions:');

let successCount = 0;

for (const q of fixedQuestions) {
  console.log(`\nQ${q.number}: Updating with underlined portion...`);
  console.log(`Stem preview: ${q.stem.substring(0, 100)}...`);

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
    console.error(`❌ Error updating English Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Q${q.number} with proper underlined portions`);
  }
}

console.log(`\n🎉 Successfully fixed ${successCount}/10 English questions!`);
console.log('✅ English questions now include proper <u>underlined portions</u>');
console.log('\n📋 NEXT: Continue fixing remaining English questions with underlined portions');
console.log('    Then continue with Math, Reading, and Science questions\n');