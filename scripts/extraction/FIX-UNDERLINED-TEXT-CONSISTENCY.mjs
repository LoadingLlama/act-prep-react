#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING UNDERLINED TEXT CONSISTENCY\n');
console.log('Standardizing underlined_text field to match <u> tag content...\n');

const fixes = [];

for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('test_number, question_number, question_stem, underlined_text')
    .eq('test_number', testNum)
    .order('question_number');

  if (!englishQ) continue;

  for (const q of englishQ) {
    if (!q.question_stem || !q.underlined_text) continue;

    // Extract text from <u> tag
    const tagMatch = q.question_stem.match(/<u>(.*?)<\/u>/);
    if (!tagMatch) continue;

    const textInTag = tagMatch[1];
    const textInField = q.underlined_text;

    // If they don't match, update the field to match the tag
    if (textInTag !== textInField) {
      console.log(`Test ${testNum} Q${q.question_number}:`);
      console.log(`  Tag:   "${textInTag}"`);
      console.log(`  Field: "${textInField}"`);
      console.log(`  → Updating field to match tag`);

      const { error } = await supabase
        .from('act_english_questions')
        .update({ underlined_text: textInTag })
        .eq('test_number', testNum)
        .eq('question_number', q.question_number);

      if (error) {
        console.error(`  ❌ Error:`, error);
      } else {
        console.log(`  ✅ Fixed\n`);
        fixes.push({ test: testNum, question: q.question_number });
      }
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n✅ CONSISTENCY FIX COMPLETE\n`);
console.log(`Total fixes applied: ${fixes.length}`);

if (fixes.length > 0) {
  console.log('\nFixed questions:');
  const byTest = {};
  for (const fix of fixes) {
    if (!byTest[fix.test]) byTest[fix.test] = [];
    byTest[fix.test].push(fix.question);
  }
  for (const [test, questions] of Object.entries(byTest)) {
    console.log(`  Test ${test}: Q${questions.join(', Q')}`);
  }
}

console.log('\n' + '='.repeat(80));
