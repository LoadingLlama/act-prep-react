#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING ENGLISH FORMATTING CONSISTENCY ACROSS ALL TESTS\n');
console.log('Standardizing underlined_text field usage...\n');
console.log('='.repeat(80));

const fixes = {
  removedPlaceholders: [],
  populatedFromTags: [],
  updatedMismatches: []
};

for (let testNum = 1; testNum <= 7; testNum++) {
  console.log(`\n📝 Processing Test ${testNum}...`);

  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('test_number, question_number, question_stem, underlined_text')
    .eq('test_number', testNum)
    .order('question_number');

  if (!englishQ) {
    console.log('  ⚠️  No data found');
    continue;
  }

  for (const q of englishQ) {
    const hasTag = q.question_stem?.includes('<u>') && q.question_stem?.includes('</u>');
    const hasField = q.underlined_text && q.underlined_text.trim() !== '';

    // Case 1: Has underlined_text field but NO <u> tag
    // This means it's an organizational question with placeholder text - remove it
    if (!hasTag && hasField) {
      console.log(`  Q${q.question_number}: Removing placeholder "${q.underlined_text.substring(0, 50)}${q.underlined_text.length > 50 ? '...' : ''}"`);

      const { error } = await supabase
        .from('act_english_questions')
        .update({ underlined_text: null })
        .eq('test_number', testNum)
        .eq('question_number', q.question_number);

      if (error) {
        console.error(`    ❌ Error:`, error);
      } else {
        console.log(`    ✅ Removed`);
        fixes.removedPlaceholders.push({ test: testNum, q: q.question_number });
      }
    }

    // Case 2: Has <u> tag but NO underlined_text field
    // Populate the field from the tag
    else if (hasTag && !hasField) {
      const tagMatch = q.question_stem.match(/<u>(.*?)<\/u>/);
      if (tagMatch) {
        console.log(`  Q${q.question_number}: Populating field from tag "${tagMatch[1].substring(0, 50)}${tagMatch[1].length > 50 ? '...' : ''}"`);

        const { error } = await supabase
          .from('act_english_questions')
          .update({ underlined_text: tagMatch[1] })
          .eq('test_number', testNum)
          .eq('question_number', q.question_number);

        if (error) {
          console.error(`    ❌ Error:`, error);
        } else {
          console.log(`    ✅ Populated`);
          fixes.populatedFromTags.push({ test: testNum, q: q.question_number });
        }
      }
    }

    // Case 3: Has both but they don't match
    // Update field to match tag
    else if (hasTag && hasField) {
      const tagMatch = q.question_stem.match(/<u>(.*?)<\/u>/);
      if (tagMatch && tagMatch[1] !== q.underlined_text) {
        console.log(`  Q${q.question_number}: Updating field to match tag`);
        console.log(`    Tag:   "${tagMatch[1].substring(0, 50)}${tagMatch[1].length > 50 ? '...' : ''}"`);
        console.log(`    Field: "${q.underlined_text.substring(0, 50)}${q.underlined_text.length > 50 ? '...' : ''}"`);

        const { error } = await supabase
          .from('act_english_questions')
          .update({ underlined_text: tagMatch[1] })
          .eq('test_number', testNum)
          .eq('question_number', q.question_number);

        if (error) {
          console.error(`    ❌ Error:`, error);
        } else {
          console.log(`    ✅ Updated`);
          fixes.updatedMismatches.push({ test: testNum, q: q.question_number });
        }
      }
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n📊 FIX SUMMARY\n');

console.log(`Placeholder text removed: ${fixes.removedPlaceholders.length}`);
if (fixes.removedPlaceholders.length > 0) {
  const byTest = {};
  for (const fix of fixes.removedPlaceholders) {
    if (!byTest[fix.test]) byTest[fix.test] = [];
    byTest[fix.test].push(fix.q);
  }
  for (const [test, questions] of Object.entries(byTest)) {
    console.log(`  Test ${test}: ${questions.length} questions (Q${questions.join(', Q')})`);
  }
}

console.log(`\nFields populated from tags: ${fixes.populatedFromTags.length}`);
if (fixes.populatedFromTags.length > 0) {
  const byTest = {};
  for (const fix of fixes.populatedFromTags) {
    if (!byTest[fix.test]) byTest[fix.test] = [];
    byTest[fix.test].push(fix.q);
  }
  for (const [test, questions] of Object.entries(byTest)) {
    console.log(`  Test ${test}: ${questions.length} questions`);
  }
}

console.log(`\nMismatches corrected: ${fixes.updatedMismatches.length}`);
if (fixes.updatedMismatches.length > 0) {
  const byTest = {};
  for (const fix of fixes.updatedMismatches) {
    if (!byTest[fix.test]) byTest[fix.test] = [];
    byTest[fix.test].push(fix.q);
  }
  for (const [test, questions] of Object.entries(byTest)) {
    console.log(`  Test ${test}: ${questions.length} questions`);
  }
}

const totalFixes = fixes.removedPlaceholders.length + fixes.populatedFromTags.length + fixes.updatedMismatches.length;
console.log(`\n✅ TOTAL FIXES APPLIED: ${totalFixes}\n`);

console.log('🎯 STANDARDIZATION RULES APPLIED:');
console.log('  1. underlined_text field ONLY populated when <u> tag exists in question_stem');
console.log('  2. underlined_text content MUST match <u> tag content exactly');
console.log('  3. Organizational questions have NO underlined_text (no placeholders)');
console.log('  4. All tests now follow same formatting pattern\n');

console.log('='.repeat(80));
