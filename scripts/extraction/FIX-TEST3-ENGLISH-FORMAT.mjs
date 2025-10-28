#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING TEST 3 ENGLISH FORMAT\n');
console.log('Converting question_stem from "question only" to "full sentence with <u>underlined</u>"\n');
console.log('='.repeat(100));

// Get all Test 3 English questions
const {data: questions, error} = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 3)
  .order('question_number');

if (error) {
  console.error('Error fetching questions:', error);
  process.exit(1);
}

console.log(`\nFound ${questions.length} Test 3 English questions to fix\n`);

let fixed = 0;
let skipped = 0;

for (const q of questions) {
  // Reconstruct the proper question_stem format
  // Format: context_before + <u>underlined_text</u> + context_after

  const contextBefore = q.context_before || '';
  const underlined = q.underlined_text || '';
  const contextAfter = q.context_after || '';

  // Construct the new question_stem with the sentence containing underlined portion
  let newQuestionStem = '';

  if (contextBefore || underlined || contextAfter) {
    newQuestionStem = contextBefore.trim();
    if (newQuestionStem && underlined) newQuestionStem += ' ';
    if (underlined) newQuestionStem += `<u>${underlined}</u>`;
    if (contextAfter) {
      if (newQuestionStem) newQuestionStem += ' ';
      newQuestionStem += contextAfter.trim();
    }
  }

  // If we couldn't construct a sentence, keep original
  if (!newQuestionStem || newQuestionStem.length < 10) {
    console.log(`  ⚠️  Q${q.question_number}: Could not reconstruct - keeping original`);
    skipped++;
    continue;
  }

  // Update the question
  const {error: updateError} = await supabase
    .from('act_english_questions')
    .update({question_stem: newQuestionStem})
    .eq('id', q.id);

  if (updateError) {
    console.log(`  ❌ Q${q.question_number}: Error - ${updateError.message}`);
  } else {
    fixed++;
    if (q.question_number <= 5 || q.question_number % 15 === 0) {
      console.log(`  ✅ Q${q.question_number}:`);
      console.log(`      OLD: "${q.question_stem.substring(0, 60)}..."`);
      console.log(`      NEW: "${newQuestionStem.substring(0, 80)}..."`);
    }
  }
}

console.log('\n' + '='.repeat(100));
console.log(`\n📊 SUMMARY:`);
console.log(`  Fixed: ${fixed}/75`);
console.log(`  Skipped: ${skipped}/75`);

if (fixed === 75) {
  console.log('\n✅✅✅ ALL TEST 3 ENGLISH QUESTIONS FIXED! ✅✅✅\n');
} else {
  console.log(`\n⚠️  Only ${fixed} questions were fixed - manual review needed\n`);
}

console.log('='.repeat(100) + '\n');
