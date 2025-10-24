#!/usr/bin/env node

/**
 * MANUAL EXTRACTION - Test 1 English Questions 16-30
 * Passage II: Origins of Aspirin
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { categorizeQuestion, getLessonId } from './lesson-mapper.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const answerKey = {
  16: 'G', 17: 'A', 18: 'G', 19: 'D', 20: 'G', 21: 'A', 22: 'J', 23: 'C', 24: 'F', 25: 'D',
  26: 'H', 27: 'C', 28: 'G', 29: 'D', 30: 'G'
};

function normalizeAnswer(original) {
  const map = { 'F': 'A', 'G': 'B', 'H': 'C', 'J': 'D' };
  return map[original] || original;
}

async function upsertQuestion(question) {
  const { data: existing } = await supabase
    .from('act_questions')
    .select('id')
    .eq('test_number', question.test_number)
    .eq('section', question.section)
    .eq('question_number', question.question_number)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from('act_questions')
      .update(question)
      .eq('id', existing.id)
      .select();
    if (!error) console.log(`🔄 Updated Q${question.question_number}`);
    return data?.[0];
  } else {
    const { data, error } = await supabase
      .from('act_questions')
      .insert([question])
      .select();
    if (!error) console.log(`✅ Inserted Q${question.question_number}`);
    return data?.[0];
  }
}

console.log('🚀 Manual Extraction: Questions 16-30 (Passage II)\n');

// PASSAGE II: Origins of Aspirin (Questions 16-30)
const questions = [
  // Q16: Line 356 - comma usage
  {
    test_number: 1, section: 'E', question_number: 16,
    question_stem: 'Salicylates may also play a role in the plant\'s ability to regulate its temperature<u>; in effect, helping</u> the plant tolerate heat and cold.',
    underlined_text: '; in effect, helping',
    context_before: 'Salicylates may also play a role in the plant\'s ability to regulate its temperature',
    context_after: ' the plant tolerate heat and cold.',
    choice_a: 'NO CHANGE',
    choice_b: 'temperature, helping',
    choice_c: 'temperature, this helps',
    choice_d: 'temperature. As a result, helping',
    correct_answer: normalizeAnswer(answerKey[16]),
    question_type: 'fragment',
    difficulty_level: 'medium',
    notes: 'Passage II - Semicolon creates fragment, needs comma'
  },

  // Q17: Line 367-369 - punctuation with modifying phrase
  {
    test_number: 1, section: 'E', question_number: 17,
    question_stem: 'Humans have used the salicylic acids found in <u>plants, particularly in the bark</u> of the willow tree, to fight disease.',
    underlined_text: 'plants, particularly in the bark',
    context_before: 'Humans have used the salicylic acids found in ',
    context_after: ' of the willow tree, to fight disease.',
    choice_a: 'NO CHANGE',
    choice_b: 'plants—particularly in the bark—of the willow tree,',
    choice_c: 'plants; particularly in the bark of the willow tree,',
    choice_d: 'plants particularly, in the bark of the willow tree.',
    correct_answer: normalizeAnswer(answerKey[17]),
    question_type: 'comma-usage',
    difficulty_level: 'medium',
    notes: 'Passage II - Commas correctly set off non-essential phrase'
  },

  // Q18: Line 399 - verb form
  {
    test_number: 1, section: 'E', question_number: 18,
    question_stem: 'On a Sumerian stone tablet from 3000 BCE, <u>lists willow</u> among dozens of plants used to treat illnesses.',
    underlined_text: 'lists willow',
    context_before: 'On a Sumerian stone tablet from 3000 BCE, ',
    context_after: ' among dozens of plants used to treat illnesses.',
    choice_a: 'NO CHANGE',
    choice_b: 'willow is listed among',
    choice_c: 'willow is listed on',
    choice_d: 'lists willow on',
    correct_answer: normalizeAnswer(answerKey[18]),
    question_type: 'verb-form',
    difficulty_level: 'medium',
    notes: 'Passage II - Needs subject, passive voice correct here'
  },

  // Q19: Line 410 - redundancy
  {
    test_number: 1, section: 'E', question_number: 19,
    question_stem: 'An Egyptian papyrus from <u>approximately about</u> 1534 BCE refers to willow\'s use as an all-purpose medicine.',
    underlined_text: 'approximately about',
    context_before: 'An Egyptian papyrus from ',
    context_after: ' 1534 BCE refers to willow\'s use as an all-purpose medicine.',
    choice_a: 'NO CHANGE',
    choice_b: 'an estimation of',
    choice_c: 'in the region of',
    choice_d: 'about',
    correct_answer: normalizeAnswer(answerKey[19]),
    question_type: 'redundancy',
    difficulty_level: 'easy',
    notes: 'Passage II - "Approximately about" is redundant'
  },

  // Q20: Lines 415-420 - transition sentence
  {
    test_number: 1, section: 'E', question_number: 20,
    question_stem: '<u>Though willow trees are often found near water and have become religious symbols in many cultures,</u> its medicinal use gradually fell out of favor in Europe.',
    underlined_text: 'Though willow trees are often found near water and have become religious symbols in many cultures,',
    context_before: '',
    context_after: ' its medicinal use gradually fell out of favor in Europe.',
    choice_a: 'NO CHANGE',
    choice_b: 'While the use of willow bark remained a commonplace method to reduce aches, pains, and fevers around the world,',
    choice_c: 'Though the ancient Egyptian physician Imhotep was worshipped as a god of healing and thought to have used willow bark,',
    choice_d: 'Despite the fact that possible side effects to using willow bark could sometimes include stomach aches and dizziness,',
    correct_answer: normalizeAnswer(answerKey[20]),
    question_type: 'transition',
    difficulty_level: 'hard',
    notes: 'Passage II - Logical transition, choice B contrasts with "fell out of favor"'
  },

  // Q21: Line 438-442 - verb form (idiom)
  {
    test_number: 1, section: 'E', question_number: 21,
    question_stem: 'Apothecaries increasingly <u>preferred</u> the imported bark of South American cinchona trees as a fever reducer.',
    underlined_text: 'preferred',
    context_before: 'Apothecaries increasingly ',
    context_after: ' the imported bark of South American cinchona trees as a fever reducer.',
    choice_a: 'NO CHANGE',
    choice_b: 'would of preferred',
    choice_c: 'will prefer',
    choice_d: 'prefer',
    correct_answer: normalizeAnswer(answerKey[21]),
    question_type: 'verb-tense',
    difficulty_level: 'easy',
    notes: 'Passage II - Past tense correct; "would of" is wrong (should be "would have")'
  },

  // Q22: Line 447 - comma with however
  {
    test_number: 1, section: 'E', question_number: 22,
    question_stem: 'The high cost of importing cinchona <u>bark however, was</u> expensive.',
    underlined_text: 'bark however, was',
    context_before: 'The high cost of importing cinchona ',
    context_after: ' expensive.',
    choice_a: 'NO CHANGE',
    choice_b: 'bark; however, was',
    choice_c: 'bark, however, was',
    choice_d: 'bark, however was',
    correct_answer: normalizeAnswer(answerKey[22]),
    question_type: 'comma-usage',
    difficulty_level: 'medium',
    notes: 'Passage II - "However" needs commas on both sides when interrupting'
  },

  // Q23: Line 453 - transition word
  {
    test_number: 1, section: 'E', question_number: 23,
    question_stem: 'The high cost was expensive. <u>Consequently,</u> in the mid-1700s, English minister Edward Stone began to seek a substitute.',
    underlined_text: 'Consequently,',
    context_before: '[Previous sentence about cost] ',
    context_after: ' in the mid-1700s, English minister Edward Stone began to seek a substitute.',
    choice_a: 'NO CHANGE',
    choice_b: 'Nevertheless,',
    choice_c: 'Furthermore,',
    choice_d: 'Likewise,',
    correct_answer: normalizeAnswer(answerKey[23]),
    question_type: 'transition',
    difficulty_level: 'medium',
    notes: 'Passage II - "Consequently" shows cause-effect relationship'
  },

  // Q24: Line 459 - verb form
  {
    test_number: 1, section: 'E', question_number: 24,
    question_stem: 'Consequently, in the mid-1700s, English minister Edward Stone <u>had began</u> to seek a substitute.',
    underlined_text: 'had began',
    context_before: 'Consequently, in the mid-1700s, English minister Edward Stone ',
    context_after: ' to seek a substitute.',
    choice_a: 'NO CHANGE',
    choice_b: 'would have began',
    choice_c: 'begun',
    choice_d: 'began',
    correct_answer: normalizeAnswer(answerKey[24]),
    question_type: 'verb-form',
    difficulty_level: 'easy',
    notes: 'Passage II - "Had began" is wrong, should be "began" (simple past) or "had begun"'
  },

  // Q25: Line 460-463 - verb tense
  {
    test_number: 1, section: 'E', question_number: 25,
    question_stem: 'Edward Stone began to seek a substitute. He <u>noted</u> that the bitter taste of willow bark was reminiscent of the bitter taste of cinchona bark.',
    underlined_text: 'noted',
    context_before: 'Edward Stone began to seek a substitute. He ',
    context_after: ' that the bitter taste of willow bark was reminiscent of the bitter taste of cinchona bark.',
    choice_a: 'NO CHANGE',
    choice_b: 'notes',
    choice_c: 'will note',
    choice_d: 'had noted',
    correct_answer: normalizeAnswer(answerKey[25]),
    question_type: 'verb-tense',
    difficulty_level: 'medium',
    notes: 'Passage II - Past perfect "had noted" shows action before "began"'
  },

  // Q26: Line 532-545 - transition/which choice
  {
    test_number: 1, section: 'E', question_number: 26,
    question_stem: '<u>Known also for his interest in astronomy, Stone</u> pulverized some willow bark.',
    underlined_text: 'Known also for his interest in astronomy, Stone',
    context_before: '',
    context_after: ' pulverized some willow bark.',
    choice_a: 'NO CHANGE',
    choice_b: 'Assuming diseases and their cures derive from the same environments,',
    choice_c: 'Believing that the two plants must share similar qualities,',
    choice_d: 'Living on the outskirts of the town of Chipping Norton,',
    correct_answer: normalizeAnswer(answerKey[26]),
    question_type: 'which-choice',
    difficulty_level: 'hard',
    notes: 'Passage II - Logical transition from previous sentence about bitter taste'
  },

  // Q27: Line 547 - verb tense and parallelism
  {
    test_number: 1, section: 'E', question_number: 27,
    question_stem: 'Stone pulverized some willow bark and <u>adds its</u> powder to a liquid.',
    underlined_text: 'adds its',
    context_before: 'Stone pulverized some willow bark and ',
    context_after: ' powder to a liquid.',
    choice_a: 'NO CHANGE',
    choice_b: 'then added it\'s',
    choice_c: 'added its',
    choice_d: 'adds it\'s',
    correct_answer: normalizeAnswer(answerKey[27]),
    question_type: 'verb-tense',
    difficulty_level: 'medium',
    notes: 'Passage II - Parallel structure with "pulverized"; "its" not "it\'s"'
  },

  // Q28: Line 550-551 - word choice
  {
    test_number: 1, section: 'E', question_number: 28,
    question_stem: 'He <u>administered the medicine to</u> people suffering from fevers.',
    underlined_text: 'administered the medicine to',
    context_before: 'He ',
    context_after: ' people suffering from fevers.',
    choice_a: 'NO CHANGE',
    choice_b: 'tested his new concoction on',
    choice_c: 'The liquid was given to benefit',
    choice_d: 'He decided to give the drink to',
    correct_answer: normalizeAnswer(answerKey[28]),
    question_type: 'which-choice',
    difficulty_level: 'medium',
    notes: 'Passage II - "Tested...on" emphasizes experimental nature'
  },

  // Q29: Line 553 - comma splice
  {
    test_number: 1, section: 'E', question_number: 29,
    question_stem: 'He administered the medicine to people suffering from <u>fevers, he then noted</u> that it worked.',
    underlined_text: 'fevers, he then noted',
    context_before: 'He administered the medicine to people suffering from ',
    context_after: ' that it worked.',
    choice_a: 'NO CHANGE',
    choice_b: 'fevers, he was elated to find',
    choice_c: 'fevers which',
    choice_d: 'fevers. It',
    correct_answer: normalizeAnswer(answerKey[29]),
    question_type: 'comma-splice',
    difficulty_level: 'medium',
    notes: 'Passage II - Comma splice, needs period or semicolon'
  },

  // Q30: Passage question
  {
    test_number: 1, section: 'E', question_number: 30,
    question_stem: '[Passage question] Suppose the writer\'s primary purpose had been to outline the development of a common medicine. Would this essay accomplish that purpose?',
    underlined_text: 'PASSAGE QUESTION',
    context_before: '',
    context_after: '',
    choice_a: 'Yes, because the essay describes how Egyptians used to administer willow bark and how this process evolved from ancient Sumerian practices.',
    choice_b: 'Yes, because the essay documents the historical use of willow bark as a medicine and traces its gradual refinement into modern aspirin.',
    choice_c: 'No, because the essay primarily explains the function of salicylates in willow bark and how aspirin affects the human body.',
    choice_d: 'No, because the essay primarily compares the use of willow bark to the use of cinchona bark in eighteenth-century European medicine.',
    correct_answer: normalizeAnswer(answerKey[30]),
    question_type: 'main-idea',
    difficulty_level: 'hard',
    notes: 'Passage II - Purpose question, essay traces development from willow bark to aspirin'
  }
];

// Process and insert questions
console.log('📚 Mapping to lessons and inserting...\n');

let count = 0;
for (const question of questions) {
  const analysis = categorizeQuestion(
    question.question_number,
    question.underlined_text,
    [question.choice_a, question.choice_b, question.choice_c, question.choice_d],
    question.notes
  );

  if (analysis.lessonKey) {
    question.lesson_id = await getLessonId(supabase, analysis.lessonKey);
    question.question_category = analysis.category;
  }
  if (analysis.questionType) {
    question.question_type = analysis.questionType;
  }

  await upsertQuestion(question);
  count++;
}

console.log(`\n✅ Completed: ${count}/15 questions extracted`);
console.log('📌 Next: Extract questions 31-45 (Passage III)');
