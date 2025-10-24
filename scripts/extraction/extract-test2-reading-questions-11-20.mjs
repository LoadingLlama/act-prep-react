#!/usr/bin/env node

/**
 * EXTRACT TEST 2 READING QUESTIONS 11-20
 * Extract questions from Social Science passage about ice industry
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

console.log('🔧 EXTRACTING TEST 2 READING QUESTIONS 11-20 (SOCIAL SCIENCE)\n');
console.log('='.repeat(70));

// Reading questions 11-20 from Social Science passage about ice industry
const questions = [
  {
    number: 11,
    stem: "Which of the following events referred to in the passage occurred last chronologically?",
    choices: {
      A: "The first comprehensive report on the ice industry of the United States was commissioned.",
      B: "Divers emerged from lakes and rivers clutching ice industry implements.",
      C: "Two thousand cargoes of ice were sold for around $1.5 million.",
      D: "The price of ice rose from $4 to $5 a ton."
    }
  },
  {
    number: 12,
    stem: "The passage states that, in terms of the natural-ice industry, the decade from 1869 to 1879 was characterized by:",
    choices: {
      F: "significant growth.",
      G: "damaging publicity.",
      H: "high shipping prices.",
      J: "mildly declining demand."
    }
  },
  {
    number: 13,
    stem: "As it is used in lines 19-20, the phrase 'the metropolis' most likely refers to:",
    choices: {
      A: "Albany.",
      B: "New York City.",
      C: "Philadelphia.",
      D: "the average US city of the 1870s."
    }
  },
  {
    number: 14,
    stem: "Based on the passage, the 1879 Maine ice that was fifteen to twenty inches thick can best be described as:",
    choices: {
      F: "a top-quality crop that was shipped to New York City, Philadelphia, and destinations further south.",
      G: "sufficient for local demand but not a solution to the problem of the ice 'famine' in the South.",
      H: "typical of Maine crops of ice until the ice 'famine' struck.",
      J: "remarkable but surpassed in size and quality by crops the following year."
    }
  },
  {
    number: 15,
    stem: "The main idea of the fourth paragraph (lines 55-67) is that:",
    choices: {
      A: "the natural-ice industry declined over several decades, leaving few traces of its magnitude.",
      B: "the arrival of the steam train signaled the demise of ice harvesting.",
      C: "icehouses were extremely flammable and therefore few remain.",
      D: "in the 1950s, the natural-ice industry experienced a short-lived revival."
    }
  },
  {
    number: 16,
    stem: "The author most clearly indicates that the contents of the manufacturers' catalogs referred to in the fifth paragraph (lines 68-80) typify the natural-ice industry's:",
    choices: {
      F: "rapid response to market changes.",
      G: "ability to erect icehouses quickly.",
      H: "wide array of tools.",
      J: "simple work."
    }
  },
  {
    number: 17,
    stem: "On which of the following points does the author contradict himself elsewhere in the passage?",
    choices: {
      A: "\"Of the eight million tons of ice harvested, about five million reached the consumer\" (lines 10-11).",
      B: "\"The New York suppliers did not explore the use of artificial refrigeration\" (lines 34-36).",
      C: "\"There was no alternative use for the great icehouses\" (lines 61-62).",
      D: "\"All that is left in America of this once-great industry is the water itself\" (lines 83-84)."
    }
  },
  {
    number: 18,
    stem: "According to the passage, in the time period referred to in the first paragraph, how much of New York City's ice was made artificially?",
    choices: {
      F: "The vast majority",
      G: "About half",
      H: "About ten percent",
      J: "None"
    }
  },
  {
    number: 19,
    stem: "The passage states that for shipping purposes, natural ice was sometimes packed in:",
    choices: {
      A: "refrigerated boxcars.",
      B: "waterproof tarps.",
      C: "sawdust and hay.",
      D: "paper and cloth."
    }
  },
  {
    number: 20,
    stem: "The passage indicates that the first real crisis in the natural-ice industry can be attributed to:",
    choices: {
      F: "the Great Depression.",
      G: "weather pattern changes.",
      H: "the advent of refrigeration.",
      J: "polluted water."
    }
  }
];

console.log('\n📝 Extracting Reading questions 11-20 (Social Science):');

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
console.log('✅ Reading questions 11-20 (Social Science) now have real content!');
console.log('\n📋 PROGRESS: 20/40 Reading questions complete');
console.log('    Continue with Humanities passage (questions 21-30)');
console.log('    Then Natural Science passage (questions 31-40)\n');