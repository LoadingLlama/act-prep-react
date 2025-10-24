#!/usr/bin/env node

/**
 * FIX TEST 2 ENGLISH QUESTIONS - PROPER SENTENCE CONTEXT
 * Update English questions to include full sentences with <u>underlined portions</u> like Test 1
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

console.log('🔧 FIXING TEST 2 ENGLISH QUESTIONS - PROPER SENTENCE CONTEXT\n');
console.log('='.repeat(70));

// Fixed English questions with proper full sentence context and underlined portions
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
    number: 11,
    stem: "Additionally, puirt-a-beul gave anyone <u>whomever</u> didn't read music a way to learn and pass on traditional songs.",
    choices: {
      A: "NO CHANGE",
      B: "which",
      C: "whom",
      D: "who"
    }
  },
  {
    number: 12,
    stem: "The continuing popularity of Celtic mouth music is testament to the vitality of <u>them</u>.",
    choices: {
      F: "NO CHANGE",
      G: "this musical form.",
      H: "itself.",
      J: "one."
    }
  },
  {
    number: 13,
    stem: "In the 1990s, groups like Mouth Music from Scotland and The Cranberries from Ireland rose to fame, <u>exposing with audiences Celtic mouth music worldwide</u>.",
    choices: {
      A: "NO CHANGE",
      B: "exposing audiences worldwide to Celtic mouth music",
      C: "worldwide exposing Celtic mouth music to audiences",
      D: "worldwide exposing Celtic mouth music audiences,"
    }
  }
];

console.log('\n📝 Fixing English questions with proper sentence context:');

let successCount = 0;

for (const q of fixedQuestions) {
  console.log(`\nQ${q.number}: Updating with full sentence context...`);
  console.log(`Context: ${q.stem.substring(0, 80)}...`);

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
    console.log(`✅ Updated Q${q.number} with proper sentence context`);
  }
}

console.log(`\n🎉 Successfully fixed ${successCount}/10 English questions!`);
console.log('✅ English questions now have proper sentence context with <u>underlined portions</u>');
console.log('📝 Format matches Test 1: Full sentence with embedded underlined portion');
console.log('\n📋 NEXT: Continue with remaining question extractions\n');