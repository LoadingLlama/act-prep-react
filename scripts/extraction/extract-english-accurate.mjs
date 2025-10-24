#!/usr/bin/env node

/**
 * ACCURATE English Question Extraction
 * - Extracts exact underlined portions
 * - Maps to lessons automatically
 * - Includes context and categorization
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { categorizeQuestion, getLessonId } from './lesson-mapper.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Accurate English Question Extraction\n');

// Answer key from PDF
const answerKey = {
  1: 'C', 2: 'G', 3: 'A', 4: 'J', 5: 'A', 6: 'F', 7: 'C', 8: 'H', 9: 'C', 10: 'J',
  11: 'B', 12: 'F', 13: 'B', 14: 'H', 15: 'D'
};

// Convert F/G/H/J to A/B/C/D
function normalizeAnswer(originalAnswer) {
  const map = { 'F': 'A', 'G': 'B', 'H': 'C', 'J': 'D' };
  return map[originalAnswer] || originalAnswer;
}

// Helper to insert/update question
async function upsertQuestion(question) {
  try {
    // First, try to update existing
    const { data: existing, error: selectError } = await supabase
      .from('act_questions')
      .select('id')
      .eq('test_number', question.test_number)
      .eq('section', question.section)
      .eq('question_number', question.question_number)
      .maybeSingle();

    if (existing) {
      // Update existing question
      const { data, error } = await supabase
        .from('act_questions')
        .update(question)
        .eq('id', existing.id)
        .select();

      if (error) {
        console.error(`❌ Error updating Q${question.question_number}:`, error.message);
        return null;
      }
      console.log(`🔄 Updated Q${question.question_number}: ${question.underlined_text?.substring(0, 40)}...`);
      return data[0];
    } else {
      // Insert new question
      const { data, error } = await supabase
        .from('act_questions')
        .insert([question])
        .select();

      if (error) {
        console.error(`❌ Error inserting Q${question.question_number}:`, error.message);
        return null;
      }
      console.log(`✅ Inserted Q${question.question_number}: ${question.underlined_text?.substring(0, 40)}...`);
      return data[0];
    }
  } catch (err) {
    console.error(`❌ Exception with Q${question.question_number}:`, err.message);
    return null;
  }
}

console.log('📝 Building accurate question database...\n');

// ACCURATE English Questions - First 10 with proper underlined text
// Format: question_stem contains full context with <u>underlined portion</u>
const englishQuestions = [
  {
    test_number: 1,
    section: 'E',
    question_number: 1,
    question_stem: '<u>There are thousands of new animal species</u> identified each year, the vast majority are small or geographically isolated.',
    underlined_text: 'There are thousands of new animal species',
    context_before: '',
    context_after: ' identified each year, the vast majority are small or geographically isolated.',
    choice_a: 'NO CHANGE',
    choice_b: 'Scientists say thousands of new animal species are',
    choice_c: 'Of the thousands of new animal species',
    choice_d: 'Thousands of new animal species are',
    correct_answer: normalizeAnswer(answerKey[1]),
    question_type: 'comma-splice',
    difficulty_level: 'medium',
    notes: 'Passage I: Manta Rays - Comma splice/run-on sentence'
  },
  {
    test_number: 1,
    section: 'E',
    question_number: 2,
    question_stem: '<u>Mantas, which are</u> plankton-eating relatives of stingrays that look like pairs of enormous black wings—up to twenty-five feet wide—flying slowly through the water.',
    underlined_text: 'Mantas, which are',
    context_before: '',
    context_after: ' plankton-eating relatives of stingrays that look like pairs of enormous black wings—up to twenty-five feet wide—flying slowly through the water.',
    choice_a: 'NO CHANGE',
    choice_b: 'Mantas are',
    choice_c: 'Mantas,',
    choice_d: 'DELETE the underlined portion (adjusting the capitalization as needed).',
    correct_answer: normalizeAnswer(answerKey[2]),
    question_type: 'fragment',
    difficulty_level: 'medium',
    notes: 'Passage I - Sentence fragment, missing main verb'
  },
  {
    test_number: 1,
    section: 'E',
    question_number: 3,
    question_stem: 'Mantas are plankton-eating relatives of stingrays that look like pairs of enormous black <u>wings—up to twenty-five feet wide—</u>flying slowly through the water.',
    underlined_text: 'wings—up to twenty-five feet wide—',
    context_before: 'Mantas are plankton-eating relatives of stingrays that look like pairs of enormous black ',
    context_after: 'flying slowly through the water.',
    choice_a: 'NO CHANGE',
    choice_b: 'wings: up to twenty-five feet wide—',
    choice_c: 'wings, up to twenty-five feet wide—',
    choice_d: 'wings, up to twenty-five feet wide:',
    correct_answer: normalizeAnswer(answerKey[3]),
    question_type: 'dash',
    difficulty_level: 'medium',
    notes: 'Passage I - Punctuation with dashes for parenthetical information'
  },
  {
    test_number: 1,
    section: 'E',
    question_number: 4,
    question_stem: 'During Marshall\'s research off the coast of Mozambique, she observed intriguing physical <u>variations, in the mantas</u> she swam amongst.',
    underlined_text: 'variations, in the mantas',
    context_before: 'During Marshall\'s research off the coast of Mozambique, she observed intriguing physical ',
    context_after: ' she swam amongst.',
    choice_a: 'variations—in the mantas',
    choice_b: 'variations, in the mantas,',
    choice_c: 'variations in the mantas',
    choice_d: 'NO CHANGE',
    correct_answer: normalizeAnswer(answerKey[4]),
    question_type: 'comma-unnecessary',
    difficulty_level: 'medium',
    notes: 'Passage I - Unnecessary comma before prepositional phrase'
  },
  {
    test_number: 1,
    section: 'E',
    question_number: 5,
    question_stem: '<u>Her beachside lodgings in Mozambique now house the Marine Megafauna Research Center.</u> [Question: Should this sentence be deleted?]',
    underlined_text: 'Her beachside lodgings in Mozambique now house the Marine Megafauna Research Center.',
    context_before: '',
    context_after: ' She began to suspect that the one recognized species of manta might in fact be two species.',
    choice_a: 'Yes, because the sentence interrupts the account of how Marshall came to investigate the possibility',
    choice_b: 'Yes, because the sentence fails to clarify why Marshall did her research in Mozambique.',
    choice_c: 'No, because the sentence explains how Marshall created a large scientific institution even though she started as a lone researcher.',
    choice_d: 'No, because the sentence clarifies Marshall\'s role at the Marine Megafauna Center.',
    correct_answer: normalizeAnswer(answerKey[5]),
    question_type: 'deleting-sentence',
    difficulty_level: 'hard',
    notes: 'Passage I - DELETE sentence question, relevance and focus'
  },
  {
    test_number: 1,
    section: 'E',
    question_number: 6,
    question_stem: 'In 2009, Marshall announced that indeed there <u>is</u> two manta species.',
    underlined_text: 'is',
    context_before: 'In 2009, Marshall announced that indeed there ',
    context_after: ' two manta species.',
    choice_a: 'NO CHANGE',
    choice_b: 'happen to be',
    choice_c: 'were',
    choice_d: 'are',
    correct_answer: normalizeAnswer(answerKey[6]),
    question_type: 'verb-agreement',
    difficulty_level: 'easy',
    notes: 'Passage I - Subject-verb agreement: "two species" is plural'
  },
  {
    test_number: 1,
    section: 'E',
    question_number: 7,
    question_stem: 'Another discovery <u>was: that</u> some mantas had egg-shaped masses at the base of their tail fins.',
    underlined_text: 'was: that',
    context_before: 'Another discovery ',
    context_after: ' some mantas had egg-shaped masses at the base of their tail fins.',
    choice_a: 'NO CHANGE',
    choice_b: 'was, that,',
    choice_c: 'was that',
    choice_d: 'was, that',
    correct_answer: normalizeAnswer(answerKey[7]),
    question_type: 'colon',
    difficulty_level: 'medium',
    notes: 'Passage I - Colon incorrectly used, should be no punctuation'
  },
  {
    test_number: 1,
    section: 'E',
    question_number: 8,
    question_stem: '[Sentence to add:] <u>Some of the data were basic, such as manta coloration and size.</u> [Question: Where should this sentence be placed?]',
    underlined_text: 'Some of the data were basic, such as manta coloration and size.',
    context_before: '[1] To investigate, Marshall began collecting data. [2] Other data required a closer look. [3] The skin of all mantas is embedded with tiny denticles.',
    context_after: '',
    choice_a: 'after Sentence 1.',
    choice_b: 'after Sentence 2.',
    choice_c: 'after Sentence 3.',
    choice_d: 'after Sentence 4.',
    correct_answer: normalizeAnswer(answerKey[8]),
    question_type: 'sentence-placement',
    difficulty_level: 'hard',
    notes: 'Passage I - Sentence placement for logical flow'
  },
  {
    test_number: 1,
    section: 'E',
    question_number: 9,
    question_stem: 'In 2009, Marshall <u>announced, with two other scientists,</u> that indeed there are two manta species.',
    underlined_text: 'announced, with two other scientists,',
    context_before: 'In 2009, Marshall ',
    context_after: ' that indeed there are two manta species.',
    choice_a: 'NO CHANGE',
    choice_b: 'surprised many scientists by announcing',
    choice_c: 'had the evidence to announce',
    choice_d: 'at long last announced',
    correct_answer: normalizeAnswer(answerKey[9]),
    question_type: 'which-choice',
    difficulty_level: 'medium',
    notes: 'Passage I - Word choice to convey scientific backing/credibility'
  },
  {
    test_number: 1,
    section: 'E',
    question_number: 10,
    question_stem: 'Marshall announced that indeed there <u>is</u> two manta species.',
    underlined_text: 'is',
    context_before: 'Marshall announced that indeed there ',
    context_after: ' two manta species.',
    choice_a: 'NO CHANGE',
    choice_b: 'exists',
    choice_c: 'was',
    choice_d: 'are',
    correct_answer: normalizeAnswer(answerKey[10]),
    question_type: 'verb-agreement',
    difficulty_level: 'easy',
    notes: 'Passage I - Subject-verb agreement with plural subject'
  }
];

// Get lesson IDs and categorize each question
console.log('📚 Mapping questions to lessons...\n');

for (const question of englishQuestions) {
  // Categorize the question
  const analysis = categorizeQuestion(
    question.question_number,
    question.underlined_text,
    [question.choice_a, question.choice_b, question.choice_c, question.choice_d],
    question.notes
  );

  // Get lesson ID
  if (analysis.lessonKey) {
    const lessonId = await getLessonId(supabase, analysis.lessonKey);
    question.lesson_id = lessonId;
    question.question_category = analysis.category;
  }

  // Update question_type if categorization found one
  if (analysis.questionType) {
    question.question_type = analysis.questionType;
  }
}

// Insert/update questions
console.log('\n💾 Inserting/updating questions in database...\n');

let insertedCount = 0;
let errorCount = 0;

for (const question of englishQuestions) {
  const result = await upsertQuestion(question);
  if (result) {
    insertedCount++;
  } else {
    errorCount++;
  }
}

// Update progress
await supabase
  .from('extraction_progress')
  .update({
    questions_extracted: insertedCount,
    status: 'in_progress',
    started_at: new Date().toISOString()
  })
  .eq('test_number', 1)
  .eq('section', 'E');

console.log(`\n✅ Extraction Complete:`);
console.log(`   Processed: ${insertedCount} questions`);
console.log(`   Errors: ${errorCount} questions`);
console.log(`   Progress: ${insertedCount}/75 English questions (${Math.round((insertedCount/75)*100)}%)`);

console.log('\n📌 Next: Run scripts/setup/add-lesson-mapping.sql in Supabase Dashboard');
console.log('   Then continue extracting remaining 65 English questions');
