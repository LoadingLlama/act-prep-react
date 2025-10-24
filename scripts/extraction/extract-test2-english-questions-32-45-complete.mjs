#!/usr/bin/env node

/**
 * EXTRACT TEST 2 ENGLISH QUESTIONS 32-45 COMPLETE
 * Re-extract with proper <u>underlined</u> formatting AND lesson assignment
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

console.log('🔧 EXTRACTING TEST 2 ENGLISH QUESTIONS 32-45 WITH PROPER FORMATTING AND LESSONS\n');
console.log('='.repeat(70));

// Question type to lesson mapping from Test 1
const lessonMapping = {
  'comma-splice': { lesson_id: 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac', difficulty_level: 'medium' },
  'fragment': { lesson_id: 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac', difficulty_level: 'medium' },
  'dash': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'comma-usage': { lesson_id: '3e8f0696-1bf7-4b5c-880d-fb5359923b7d', difficulty_level: 'medium' },
  'deleting-sentence': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'verb-agreement': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'easy' },
  'colon': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'sentence-placement': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' },
  'word-choice': { lesson_id: '04df2a09-a910-4456-8fe5-2f8e7f62c50f', difficulty_level: 'medium' },
  'modifier-misplaced': { lesson_id: 'f7ac1d6c-6416-47fd-9720-807224100517', difficulty_level: 'hard' },
  'which-choice': { lesson_id: '29b59c9d-ef2e-4f7f-aae2-464222884d3a', difficulty_level: 'hard' },
  'main-idea': { lesson_id: '29b59c9d-ef2e-4f7f-aae2-464222884d3a', difficulty_level: 'hard' },
  'verb-form': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'medium' },
  'redundancy': { lesson_id: '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734', difficulty_level: 'easy' },
  'transition': { lesson_id: '7aae3763-017b-4762-ad5a-346aac1f027b', difficulty_level: 'hard' },
  'verb-tense': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'easy' },
  'idiom': { lesson_id: '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16', difficulty_level: 'easy' },
  'logical-placement': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' },
  'parallel-structure': { lesson_id: 'e6153221-e330-4db4-8cc7-9c5a1d51a301', difficulty_level: 'hard' },
  'pronoun-ambiguous': { lesson_id: '3c3585a1-f137-4331-8390-29ef1f5e889f', difficulty_level: 'medium' },
  'adding-info': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'wordiness': { lesson_id: '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734', difficulty_level: 'medium' },
  'adding-sentence': { lesson_id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', difficulty_level: 'hard' },
  'modifier-dangling': { lesson_id: 'f7ac1d6c-6416-47fd-9720-807224100517', difficulty_level: 'hard' },
  'grammar': { lesson_id: '10fff941-59e1-4d3a-84b7-d0fe8f9985ef', difficulty_level: 'medium' },
  'punctuation': { lesson_id: '66776383-9334-4efb-bd72-74b1bbeab8ac', difficulty_level: 'medium' },
  'style': { lesson_id: '04df2a09-a910-4456-8fe5-2f8e7f62c50f', difficulty_level: 'medium' },
  'organization': { lesson_id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', difficulty_level: 'hard' }
};

// English questions 32-45 with proper <u>underlined</u> formatting and question types
const questions = [
  {
    number: 32,
    stem: "Each cable is equipped with sixty digital optical modules (DOMs)<u>, which, are programmed, to</u> detect a faint blue flash known as Cherenkov radiation.",
    question_type: 'comma-usage',
    choices: {
      F: "NO CHANGE",
      G: ", which are programmed",
      H: ": which are programmed",
      J: "; which are programmed"
    }
  },
  {
    number: 33,
    stem: "This radiation<u>: a veritable shock wave of photonic energy—</u>is emitted when subatomic particles called neutrinos collide with electrons in the molecules of ice.",
    question_type: 'dash',
    choices: {
      A: "NO CHANGE",
      B: "—a veritable shock wave of photonic energy—",
      C: "; a veritable shock wave of photonic energy;",
      D: ", a veritable shock wave of photonic energy,"
    }
  },
  {
    number: 34,
    stem: "If the writer were to delete the underlined portion <u>(fifty trillion neutrinos pass through your body every second)</u> (adjusting the punctuation as needed), the essay would primarily lose information that:",
    question_type: 'deleting-sentence',
    choices: {
      F: "indicates why there are so many neutrinos.",
      G: "specifies why neutrinos are practically weightless.",
      H: "explains how neutrinos pass through matter.",
      J: "emphasizes how numerous neutrinos are."
    }
  },
  {
    number: 35,
    stem: "Neutrinos are rarely affected by matter or electromagnetic fields. <u>For this purpose</u>, many neutrinos have been traveling through space unimpeded for billions of years.",
    question_type: 'transition',
    choices: {
      A: "NO CHANGE",
      B: "In contrast,",
      C: "For this reason,",
      D: "DELETE the underlined portion."
    }
  },
  {
    number: 36,
    stem: "On some <u>occasions however;</u> neutrinos do collide with other particles.",
    question_type: 'comma-usage',
    choices: {
      F: "NO CHANGE",
      G: "occasions, however,",
      H: "occasions however,",
      J: "occasions, however"
    }
  },
  {
    number: 37,
    stem: "At this point, the writer is considering adding the following true sentence: In 1956, during the Cowan-Reines neutrino experiment, a neutrino was detected for the first time. Should the writer make this addition?",
    question_type: 'adding-sentence',
    choices: {
      A: "Yes, because the information is relevant to the history of neutrino detection outlined in the paragraph.",
      B: "Yes, because the information indicates that subzero altitude is essential to the detection of neutrinos.",
      C: "No, because the information is unrelated to the discussion of why scientists selected the location of the IceCube Neutrino Observatory.",
      D: "No, because the information is unrelated to why the detection of neutrinos is facilitated by zero-gravity conditions."
    }
  },
  {
    number: 38,
    stem: "Scientists specifically selected the site of the IceCube Neutrino Observatory <u>to facilitate</u> the detection of such a collision.",
    question_type: 'punctuation',
    choices: {
      F: "NO CHANGE",
      G: ", and to facilitate",
      H: ". To facilitate",
      J: "; to facilitate"
    }
  },
  {
    number: 39,
    stem: "Not only is the Antarctic subterranean ice exceptionally clear, it is also less pressurized due to <u>it's</u> subzero altitude.",
    question_type: 'grammar',
    choices: {
      A: "NO CHANGE",
      B: "their",
      C: "its",
      D: "its'"
    }
  },
  {
    number: 40,
    stem: "Once this detection occurs, data <u>is gathered</u> and transferred to laboratories at the University of Wisconsin.",
    question_type: 'verb-agreement',
    choices: {
      F: "NO CHANGE",
      G: "are gathered",
      H: "have been gathered",
      J: "are being gathered"
    }
  },
  {
    number: 41,
    stem: "Which of the following true sentences best introduces the main idea of the paragraph?",
    question_type: 'which-choice',
    choices: {
      A: "Determining neutrinos' origins could provide scientists with new insights into the universe.",
      B: "For decades, scientists have been trying to learn more about gamma rays through the study of supernovae.",
      C: "Recently, at IceCube, scientists discovered two neutrinos, which they now refer to as Bert and Ernie.",
      D: "Neutrinos can now be created in laboratories, using a particle accelerator called a Super Proton Synchrotron."
    }
  },
  {
    number: 42,
    stem: "For instance, some neutrinos are produced during supernovae <u>(the collapsing of stars)</u>.",
    question_type: 'punctuation',
    choices: {
      F: "NO CHANGE",
      G: "(the collapsing of stars) and the",
      H: "(the collapsing of stars), the",
      J: "(the collapsing of stars) the"
    }
  },
  {
    number: 43,
    stem: "The origins of these neutrinos could give us <u>opulent</u> information about how, when, and why stars collapse.",
    question_type: 'word-choice',
    choices: {
      A: "NO CHANGE",
      B: "invaluable",
      C: "lavish",
      D: "upscale"
    }
  },
  {
    number: 44,
    stem: "The writer wants to emphasize that information gathered from the detected neutrinos at IceCube could have dramatic effects on how scientists study the universe. Which choice best accomplishes that goal?",
    question_type: 'which-choice',
    choices: {
      F: "at our galaxy—and galaxies beyond.",
      G: "phenomena that have puzzled scientists over the last decade.",
      H: "common occurrences in space.",
      J: "the world around us."
    }
  },
  {
    number: 45,
    stem: "Question 45 asks about the preceding passage as a whole. Suppose the writer's primary purpose had been to outline a scientific theory concerning the origins of a particle in nature. Would this essay accomplish that goal?",
    question_type: 'main-idea',
    choices: {
      A: "Yes, because it explains how scientists are discovering new reasons why neutrinos emit a blue flash known as Cherenkov radiation.",
      B: "Yes, because it summarizes how DOMs at the IceCube Neutrino Observatory track neutrinos to their origins despite neutrinos' numerous collisions with matter and electromagnetic forces.",
      C: "No, because it describes instead how neutrinos are detected at an observatory and how these detections could benefit future scientific research.",
      D: "No, because it details instead how new research on neutrinos could potentially contradict a commonly held theory about supernovae."
    }
  }
];

console.log('\n📝 Extracting English questions 32-45 with proper formatting and lesson assignment:');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  console.log(`Question Type: ${q.question_type}`);
  console.log(`Choices: ${Object.keys(q.choices).join(', ')}`);

  // Parse underlined text
  const match = q.stem.match(/^(.*?)<u>(.*?)<\/u>(.*)$/);
  let underlined_text = '';
  let context_before = '';
  let context_after = '';

  if (match) {
    underlined_text = match[2];
    context_before = match[1];
    context_after = match[3];
  } else {
    context_before = q.stem;
  }

  // Get lesson info
  const lessonInfo = lessonMapping[q.question_type] || { lesson_id: null, difficulty_level: null };

  // Update in database
  const updateData = {
    question_stem: q.stem,
    underlined_text: underlined_text,
    context_before: context_before,
    context_after: context_after,
    choice_a: q.choices.A || q.choices.F,
    choice_b: q.choices.B || q.choices.G,
    choice_c: q.choices.C || q.choices.H,
    choice_d: q.choices.D || q.choices.J,
    question_type: q.question_type,
    lesson_id: lessonInfo.lesson_id,
    difficulty_level: lessonInfo.difficulty_level
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
    console.log(`✅ Updated Q${q.number} with formatting and lesson assignment`);
    if (underlined_text) {
      console.log(`  Underlined: "${underlined_text}"`);
    }
    console.log(`  Lesson: ${lessonInfo.lesson_id} (${lessonInfo.difficulty_level})`);
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/14 English questions!`);
console.log('✅ English questions 32-45 now have proper <u>underlined</u> formatting AND lesson assignment');
console.log('\n📋 PROGRESS: 45/75 English questions complete with proper formatting and lessons');
console.log('    Continue with questions 46-60\n');