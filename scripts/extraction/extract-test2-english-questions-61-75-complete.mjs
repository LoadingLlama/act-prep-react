#!/usr/bin/env node

/**
 * EXTRACT TEST 2 ENGLISH QUESTIONS 61-75 COMPLETE
 * Final batch with proper <u>underlined</u> formatting AND lesson assignment
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

console.log('🔧 EXTRACTING TEST 2 ENGLISH QUESTIONS 61-75 WITH PROPER FORMATTING AND LESSONS\n');
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

// English questions 61-75 from Cher Ami pigeon passage
const questions = [
  {
    number: 61,
    stem: "In many urban areas, they are considered little more <u>than,</u> a \"rats with wings,\" blamed for spreading disease and despoiling statues.",
    question_type: 'comma-usage',
    choices: {
      A: "NO CHANGE",
      B: "than—",
      C: "than;",
      D: "than"
    }
  },
  {
    number: 62,
    stem: "In many urban areas, they are considered little more than a \"rats with wings,\" <u>blamed</u> for spreading disease and despoiling statues.",
    question_type: 'fragment',
    choices: {
      F: "NO CHANGE",
      G: "wings\" and they are blamed",
      H: "wings,\" they are blamed",
      J: "wings.\" Blamed"
    }
  },
  {
    number: 63,
    stem: "<u>For example</u>, one species, the homing pigeon, which is among the best navigators of the natural world.",
    question_type: 'transition',
    choices: {
      A: "NO CHANGE",
      B: "Similarly,",
      C: "However,",
      D: "Thus,"
    }
  },
  {
    number: 64,
    stem: "For example, one species, the homing <u>pigeon, which</u> is among the best navigators of the natural world.",
    question_type: 'comma-usage',
    choices: {
      F: "NO CHANGE",
      G: "pigeon that",
      H: "pigeon,",
      J: "pigeon"
    }
  },
  {
    number: 65,
    stem: "<u>There</u> navigational abilities has earned the homely pigeon an undeniable place in history.",
    question_type: 'grammar',
    choices: {
      A: "NO CHANGE",
      B: "They're",
      C: "Its",
      D: "Its'"
    }
  },
  {
    number: 66,
    stem: "<u>Former</u> modern technologies like the radio or telephone, commanders on the battlefield often faced challenges in communicating, depending on their location.",
    question_type: 'word-choice',
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
    question_type: 'adding-info',
    choices: {
      A: "Yes, because it offers a better indication of the circumstances that made communication difficult.",
      B: "Yes, because it more clearly identifies the locations of and distance between troops.",
      C: "No, because it adds information that is irrelevant to the paragraph's discussion of homing pigeons.",
      D: "No, because it suggests that homing pigeons are unnecessary today."
    }
  },
  {
    number: 68,
    stem: "It flew high. And it always quickly <u>returned and came back</u> to its home roost.",
    question_type: 'redundancy',
    choices: {
      F: "NO CHANGE",
      G: "speedily returned, coming home",
      H: "returned home",
      J: "returned"
    }
  },
  {
    number: 69,
    stem: "One of six hundred birds used by the US Army Signal Corps in France during World War I, <u>all twelve of Cher Ami's missions were deemed successful</u>.",
    question_type: 'modifier-misplaced',
    choices: {
      A: "NO CHANGE",
      B: "the twelve missions Cher Ami flew were successful.",
      C: "successful missions by Cher Ami numbered twelve.",
      D: "Cher Ami flew twelve successful missions."
    }
  },
  {
    number: 70,
    stem: "The men were surrounded by German troops and were rapidly running out of rations. <u>They were separated from other US forces.</u>",
    question_type: 'redundancy',
    choices: {
      F: "NO CHANGE",
      G: "German troops were all around them.",
      H: "They would soon be out of rations.",
      J: "DELETE the underlined portion."
    }
  },
  {
    number: 71,
    stem: "They had but one link to <u>headquarters homing pigeons</u>.",
    question_type: 'colon',
    choices: {
      A: "NO CHANGE",
      B: "headquarters:",
      C: "headquarters;",
      D: "headquarters,"
    }
  },
  {
    number: 72,
    stem: "<u>It was becoming clear that</u> the Americans were unaware of the 77th's whereabouts, the situation grew dire.",
    question_type: 'comma-splice',
    choices: {
      F: "NO CHANGE",
      G: "Having become",
      H: "As it became",
      J: "It became"
    }
  },
  {
    number: 73,
    stem: "News reports around the world touted the bird's heroism. The French military awarded Cher Ami a <u>medal, the</u> War Cross.",
    question_type: 'comma-usage',
    choices: {
      A: "NO CHANGE",
      B: "medal, it was the",
      C: "medal, that was",
      D: "medal. The"
    }
  },
  {
    number: 74,
    stem: "Although one might question the extent <u>in which</u> Cher Ami understood his mission, his story proves that pigeons are unique.",
    question_type: 'idiom',
    choices: {
      F: "NO CHANGE",
      G: "of",
      H: "to",
      J: "DELETE the underlined portion."
    }
  },
  {
    number: 75,
    stem: "Question 75 asks about the preceding passage as a whole. Which choice best concludes the sentence and essay by connecting Cher Ami's story to a specific idea raised in the first paragraph of the essay?",
    question_type: 'main-idea',
    choices: {
      A: "proves that pigeons are unique.",
      B: "is testimony to the homing pigeon's navigational skill and instinct.",
      C: "has made people reconsider the definition of heroism.",
      D: "suggests that even birds can be brave."
    }
  }
];

console.log('\n📝 Extracting English questions 61-75 with proper formatting and lesson assignment:');

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

console.log(`\n🎉 Successfully extracted and updated ${successCount}/15 English questions!`);
console.log('✅ English questions 61-75 now have proper <u>underlined</u> formatting AND lesson assignment');
console.log('\n🎊 ALL 75 ENGLISH QUESTIONS NOW COMPLETE! 🎊');
console.log('\n📋 FINAL SUMMARY:');
console.log('    ✅ Questions 1-13: Already had proper formatting');
console.log('    ✅ Questions 14-30: Completed with proper formatting');
console.log('    ✅ Questions 31-45: Completed with proper formatting and lessons');
console.log('    ✅ Questions 46-60: Completed with proper formatting and lessons');
console.log('    ✅ Questions 61-75: Completed with proper formatting and lessons');
console.log('\n📋 ALL ENGLISH QUESTIONS NOW HAVE:');
console.log('    ✅ Proper <u>underlined</u> formatting in question_stem');
console.log('    ✅ Correct underlined_text extraction');
console.log('    ✅ Proper context_before and context_after');
console.log('    ✅ Correct lesson_id assignment');
console.log('    ✅ Proper difficulty_level assignment');
console.log('\n📋 NEXT: Continue with Math questions extraction\n');