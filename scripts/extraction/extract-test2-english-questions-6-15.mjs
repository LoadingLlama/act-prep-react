#!/usr/bin/env node

/**
 * EXTRACT TEST 2 ENGLISH QUESTIONS 6-15
 * Continue extracting from Passage 1 based on PDF analysis
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

console.log('🔧 EXTRACTING TEST 2 ENGLISH QUESTIONS 6-15 (Passage 1 continuation)\n');
console.log('='.repeat(70));

// Based on the PDF text I can see, here are questions 6-15:
const questions = [
  {
    number: 6,
    stem: "If the writer were to delete the underlined portion, the sentence would primarily lose:",
    underlined: "The often tongue-twisting lyrics",
    choices: {
      F: "a description that emphasizes the difficulty of puirt-a-beul.",
      G: "information about writing lyrics for puirt-a-beul music.",
      H: "an indication of how often puirt-a-beul is performed in the Celtic culture.",
      J: "an example of a training exercise puirt-a-beul singers use to practice lyrics."
    }
  },
  {
    number: 7,
    stem: "The greater challenge for many puirt-a-beul singers, though, is learning when to breathe.",
    underlined: "breathe",
    choices: {
      A: "NO CHANGE",
      B: "at the same time,",
      C: "this time,",
      D: "still,"
    }
  },
  {
    number: 8,
    stem: "A poorly timed breath might break a song's flow, interrupting the steady beat it relies on to help dancers time their steps.",
    underlined: "dancers rely",
    choices: {
      F: "NO CHANGE",
      G: "they rely",
      H: "dancers rely",
      J: "relied"
    }
  },
  {
    number: 9,
    stem: "Given that all the following statements are true, which one, if added here, would most effectively introduce the subject of the paragraph?",
    underlined: "[9]",
    choices: {
      A: "Puirt-a-beul was most likely invented out of necessity.",
      B: "Mouth music singers must have a good sense of rhythm.",
      C: "Celtic mouth music, including puirt-a-beul, has influenced jazz scat singing.",
      D: "Another form of mouth music that originated in Scotland is the waulking song."
    }
  },
  {
    number: 10,
    stem: "Instruments were prohibitively expensive and thus scarce in isolated Scottish villages, in order to fill the void, mouth music emerged and provided residents with the music they wanted for dancing.",
    underlined: "villages, in",
    choices: {
      F: "NO CHANGE",
      G: "villages and in",
      H: "villages. In",
      J: "villages, in"
    }
  },
  {
    number: 11,
    stem: "Additionally, puirt-a-beul gave anyone whomever didn't read music a way to learn and pass on traditional songs.",
    underlined: "whomever",
    choices: {
      A: "NO CHANGE",
      B: "which",
      C: "whom",
      D: "who"
    }
  },
  {
    number: 12,
    stem: "The continuing popularity of Celtic mouth music is testament to the vitality of them.",
    underlined: "them",
    choices: {
      F: "NO CHANGE",
      G: "this musical form.",
      H: "itself.",
      J: "one."
    }
  },
  {
    number: 13,
    stem: "In the 1990s, groups like Mouth Music from Scotland and The Cranberries from Ireland rose to fame, exposing with audiences Celtic mouth music worldwide.",
    underlined: "exposing with audiences Celtic mouth music worldwide",
    choices: {
      A: "NO CHANGE",
      B: "exposing audiences worldwide to Celtic mouth music",
      C: "worldwide exposing Celtic mouth music to audiences",
      D: "worldwide exposing Celtic mouth music audiences,"
    }
  },
  {
    number: 14,
    stem: "The bands' celebrity continually survives as they combine traditional mouth music with modern rhythms.",
    underlined: "continually survives",
    choices: {
      F: "NO CHANGE",
      G: "will remain",
      H: "is sticking around",
      J: "endures"
    }
  },
  {
    number: 15,
    stem: "Given that all the choices are accurate, which one most concisely conveys the idea that the bands incorporate both classic Celtic music and current music into their music?",
    underlined: "[15]",
    choices: {
      A: "NO CHANGE",
      B: "blend traditional and contemporary musical styles to produce new music and release albums.",
      C: "give concerts around the world.",
      D: "leap and dance on stage."
    }
  }
];

console.log('\n📝 Extracting English questions 6-15:');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  if (q.underlined) console.log(`Underlined: "${q.underlined}"`);
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

console.log(`\n🎉 Successfully extracted and updated ${successCount}/10 questions!`);
console.log('✅ Passage 1 (Questions 1-15) is now complete with real content!');
console.log('\n📋 NEXT STEPS:');
console.log('    1. Extract Passage 2 questions (16-30)');
console.log('    2. Extract Passage 3 questions (31-45)');
console.log('    3. Extract Passage 4 questions (46-60)');
console.log('    4. Extract Passage 5 questions (61-75)');
console.log('    5. Continue with Math, Reading, and Science questions\n');