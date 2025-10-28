#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING TEST 4 ENGLISH FORMAT\n');
console.log('Adding <u> tags around underlined portions in question_stem\n');
console.log('='.repeat(100));

// Get all Test 4 English questions
const {data: questions, error} = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 4)
  .order('question_number');

if (error) {
  console.error('Error fetching questions:', error);
  process.exit(1);
}

console.log(`\nFound ${questions.length} Test 4 English questions to fix\n`);

let fixed = 0;
let alreadyOK = 0;
let skipped = 0;

for (const q of questions) {
  // Check if already has <u> tags
  if (q.question_stem.includes('<u>') && q.question_stem.includes('</u>')) {
    alreadyOK++;
    continue;
  }

  const underlined = q.underlined_text || '';

  // Skip if no underlined text
  if (!underlined) {
    skipped++;
    console.log(`  ⚠️  Q${q.question_number}: No underlined_text - skipping`);
    continue;
  }

  // Add <u> tags around the underlined portion
  // We need to find the exact match in the question_stem
  const newQuestionStem = q.question_stem.replace(underlined, `<u>${underlined}</u>`);

  // Verify we made a change
  if (newQuestionStem === q.question_stem) {
    console.log(`  ⚠️  Q${q.question_number}: Could not find "${underlined.substring(0, 30)}..." in stem - skipping`);
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
      console.log(`  ✅ Q${q.question_number}: Added <u> tags around "${underlined.substring(0, 20)}..."`);
    }
  }
}

console.log('\n' + '='.repeat(100));
console.log(`\n📊 SUMMARY:`);
console.log(`  Fixed: ${fixed}`);
console.log(`  Already OK: ${alreadyOK}`);
console.log(`  Skipped: ${skipped}`);
console.log(`  Total: ${fixed + alreadyOK + skipped}/75`);

if (fixed + alreadyOK >= 73) {  // Allow for passage-level questions
  console.log('\n✅✅✅ TEST 4 ENGLISH FORMAT FIXED! ✅✅✅\n');
} else {
  console.log(`\n⚠️  Only ${fixed + alreadyOK} questions OK - manual review needed\n`);
}

console.log('='.repeat(100) + '\n');
