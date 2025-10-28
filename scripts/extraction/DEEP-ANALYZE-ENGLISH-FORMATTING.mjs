#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 DEEP ENGLISH FORMATTING ANALYSIS\n');
console.log('Investigating underlined_text field vs <u> tag consistency...\n');
console.log('='.repeat(80));

for (let testNum = 1; testNum <= 7; testNum++) {
  console.log(`\n📝 TEST ${testNum}\n`);

  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('test_number, question_number, question_stem, underlined_text, question_type')
    .eq('test_number', testNum)
    .order('question_number');

  if (!englishQ) {
    console.log('  ⚠️  No data found');
    continue;
  }

  let withTag = 0;
  let withField = 0;
  let bothMatch = 0;
  let tagButNoField = [];
  let fieldButNoTag = [];
  let mismatch = [];

  for (const q of englishQ) {
    const hasTag = q.question_stem?.includes('<u>') && q.question_stem?.includes('</u>');
    const hasField = q.underlined_text && q.underlined_text.trim() !== '';

    if (hasTag) withTag++;
    if (hasField) withField++;

    if (hasTag && hasField) {
      const tagMatch = q.question_stem.match(/<u>(.*?)<\/u>/);
      if (tagMatch && tagMatch[1] === q.underlined_text) {
        bothMatch++;
      } else if (tagMatch) {
        mismatch.push({
          q: q.question_number,
          tag: tagMatch[1],
          field: q.underlined_text
        });
      }
    } else if (hasTag && !hasField) {
      const tagMatch = q.question_stem.match(/<u>(.*?)<\/u>/);
      tagButNoField.push({
        q: q.question_number,
        tag: tagMatch ? tagMatch[1] : 'unknown',
        type: q.question_type
      });
    } else if (!hasTag && hasField) {
      fieldButNoTag.push({
        q: q.question_number,
        field: q.underlined_text,
        type: q.question_type
      });
    }
  }

  console.log(`  Questions with <u> tags:     ${withTag}/75`);
  console.log(`  Questions with field:        ${withField}/75`);
  console.log(`  Both present and matching:   ${bothMatch}/75`);

  if (tagButNoField.length > 0) {
    console.log(`\n  ⚠️  ${tagButNoField.length} questions have <u> tag but NO underlined_text field:`);
    tagButNoField.forEach(item => {
      console.log(`      Q${item.q} (${item.type}): tag="${item.tag}"`);
    });
  }

  if (fieldButNoTag.length > 0) {
    console.log(`\n  ⚠️  ${fieldButNoTag.length} questions have underlined_text field but NO <u> tag:`);
    fieldButNoTag.forEach(item => {
      console.log(`      Q${item.q} (${item.type}): field="${item.field}"`);
    });
  }

  if (mismatch.length > 0) {
    console.log(`\n  ⚠️  ${mismatch.length} questions have mismatched tag vs field:`);
    mismatch.forEach(item => {
      console.log(`      Q${item.q}:`);
      console.log(`        Tag:   "${item.tag}"`);
      console.log(`        Field: "${item.field}"`);
    });
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n📊 SUMMARY\n');

// Get global stats
const totalIssues = [];

for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('test_number, question_number, question_stem, underlined_text')
    .eq('test_number', testNum);

  if (!englishQ) continue;

  for (const q of englishQ) {
    const hasTag = q.question_stem?.includes('<u>') && q.question_stem?.includes('</u>');
    const hasField = q.underlined_text && q.underlined_text.trim() !== '';

    if (hasTag && !hasField) {
      const tagMatch = q.question_stem.match(/<u>(.*?)<\/u>/);
      totalIssues.push({
        test: testNum,
        q: q.question_number,
        issue: 'TAG_WITHOUT_FIELD',
        tag: tagMatch ? tagMatch[1] : null
      });
    } else if (!hasTag && hasField) {
      totalIssues.push({
        test: testNum,
        q: q.question_number,
        issue: 'FIELD_WITHOUT_TAG',
        field: q.underlined_text
      });
    } else if (hasTag && hasField) {
      const tagMatch = q.question_stem.match(/<u>(.*?)<\/u>/);
      if (tagMatch && tagMatch[1] !== q.underlined_text) {
        totalIssues.push({
          test: testNum,
          q: q.question_number,
          issue: 'MISMATCH',
          tag: tagMatch[1],
          field: q.underlined_text
        });
      }
    }
  }
}

console.log(`Total formatting issues found: ${totalIssues.length}\n`);

if (totalIssues.length > 0) {
  const byType = {};
  for (const issue of totalIssues) {
    if (!byType[issue.issue]) byType[issue.issue] = [];
    byType[issue.issue].push(issue);
  }

  for (const [type, issues] of Object.entries(byType)) {
    console.log(`${type}: ${issues.length} issues`);
  }

  console.log('\n🔧 RECOMMENDED FIX:\n');
  console.log('Run comprehensive fix script to:');
  console.log('  1. Populate underlined_text field from <u> tags where missing');
  console.log('  2. Update mismatched fields to match tags');
  console.log('  3. Add <u> tags to question_stem where field exists but tag missing\n');
} else {
  console.log('✅ NO ISSUES FOUND - All tests have consistent formatting!\n');
}

console.log('='.repeat(80));
