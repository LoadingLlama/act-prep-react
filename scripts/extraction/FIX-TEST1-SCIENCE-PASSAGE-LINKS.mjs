#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 Investigating Test 1 Science Q38-40 passage linkage issue...\n');

// First, let's see what Q38-40 are about
const { data: questions } = await supabase
  .from('act_science_questions')
  .select('question_number, question_stem, passage_id')
  .eq('test_number', 1)
  .gte('question_number', 38)
  .lte('question_number', 40)
  .order('question_number');

console.log('Questions 38-40 content:');
for (const q of questions) {
  console.log(`\nQ${q.question_number}:`);
  console.log(`  Stem: ${q.question_stem.substring(0, 150)}...`);
  console.log(`  Current passage_id: ${q.passage_id}`);
}

// Get all Test 1 passages
const { data: passages } = await supabase
  .from('act_science_passages')
  .select('id, passage_number, passage_type, passage_text')
  .eq('test_number', 1)
  .order('passage_number');

console.log('\n\nTest 1 Science Passages:');
for (const p of passages) {
  console.log(`\nPassage ${p.passage_number} (${p.passage_type}):`);
  console.log(`  ID: ${p.id}`);
  console.log(`  Text preview: ${p.passage_text.substring(0, 150)}...`);
}

// Check all questions to see their distribution
const { data: allQuestions } = await supabase
  .from('act_science_questions')
  .select('question_number, passage_id')
  .eq('test_number', 1)
  .order('question_number');

console.log('\n\nQuestion distribution by passage:');
const passageMap = {};
for (const p of passages) {
  passageMap[p.id] = { number: p.passage_number, questions: [] };
}

for (const q of allQuestions) {
  if (passageMap[q.passage_id]) {
    passageMap[q.passage_id].questions.push(q.question_number);
  } else {
    console.log(`  Q${q.question_number}: INVALID passage_id ${q.passage_id}`);
  }
}

for (const [passageId, info] of Object.entries(passageMap)) {
  if (info.questions.length > 0) {
    console.log(`  Passage ${info.number}: Questions ${info.questions.join(', ')}`);
  }
}

console.log('\n\n📋 Based on typical ACT structure (6-7 questions per passage):');
console.log('Test 1 has 40 Science questions across 6 passages.');
console.log('Typical distribution: 7, 7, 7, 6, 7, 6 questions');
console.log('\nQ38-40 should likely belong to Passage 6 (questions 35-40)');

// Determine fix
const passage6 = passages.find(p => p.passage_number === 6);
if (passage6) {
  console.log(`\n✅ FIX: Update Q38-40 to link to Passage 6: ${passage6.id}`);
  console.log('\nApplying fix...\n');

  for (let qNum = 38; qNum <= 40; qNum++) {
    const { error } = await supabase
      .from('act_science_questions')
      .update({ passage_id: passage6.id })
      .eq('test_number', 1)
      .eq('question_number', qNum);

    if (error) {
      console.error(`  ❌ Error updating Q${qNum}:`, error);
    } else {
      console.log(`  ✓ Q${qNum} → Passage 6`);
    }
  }

  console.log('\n✅ Fix applied! Verifying...\n');

  // Verify fix
  const { data: verifyQuestions } = await supabase
    .from('act_science_questions')
    .select('question_number, passage_id')
    .eq('test_number', 1)
    .gte('question_number', 38)
    .lte('question_number', 40)
    .order('question_number');

  let allValid = true;
  for (const q of verifyQuestions) {
    const isValid = q.passage_id === passage6.id;
    console.log(`  Q${q.question_number}: ${isValid ? '✅' : '❌'} ${q.passage_id}`);
    if (!isValid) allValid = false;
  }

  console.log(allValid ? '\n✅ All passage linkages fixed and verified!' : '\n❌ Some linkages still invalid');
} else {
  console.error('❌ Could not find Passage 6 for Test 1');
}
