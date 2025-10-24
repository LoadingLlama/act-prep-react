#!/usr/bin/env node

/**
 * EMERGENCY CHECK - TEST 2 DATABASE STATUS (FIXED)
 * Check what's currently in Test 2 database after reported data loss
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

console.log('🚨 EMERGENCY CHECK - TEST 2 DATABASE STATUS\n');
console.log('='.repeat(70));

async function checkTable(tableName, sectionName, expectedCount, isPassageTable = false) {
  console.log(`\n📊 ${sectionName.toUpperCase()}:`);

  const { count, error: countError } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true })
    .eq('test_number', TEST_NUMBER);

  if (countError) {
    console.error(`❌ Error counting ${sectionName}:`, countError.message);
    return false;
  }

  console.log(`Count: ${count}/${expectedCount} records`);

  if (count === 0) {
    console.log(`❌ NO ${sectionName.toUpperCase()} DATA FOUND!`);
    return false;
  }

  // Check first few records
  const orderBy = isPassageTable ? 'passage_number' : 'question_number';
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .order(orderBy)
    .limit(3);

  if (error) {
    console.error(`❌ Error fetching ${sectionName}:`, error.message);
    return false;
  }

  if (data && data.length > 0) {
    console.log(`✅ Found ${data.length} sample records`);

    // Show structure of first record
    const first = data[0];
    const keys = Object.keys(first);
    console.log(`Columns: ${keys.join(', ')}`);

    // Check for content quality
    if (first.question_stem !== undefined) {
      const hasContent = first.question_stem &&
                        !first.question_stem.includes('[Question') &&
                        first.question_stem.length > 20;
      console.log(`Content quality: ${hasContent ? '✅ Good' : '❌ Poor/Missing'}`);
      if (!hasContent) {
        console.log(`Sample question_stem: "${first.question_stem}"`);
      }
    }

    if (first.passage_text !== undefined) {
      const hasContent = first.passage_text &&
                        !first.passage_text.includes('[') &&
                        first.passage_text.length > 100;
      console.log(`Content quality: ${hasContent ? '✅ Good' : '❌ Poor/Missing'}`);
      if (!hasContent) {
        console.log(`Sample passage_text: "${first.passage_text?.substring(0, 100)}..."`);
      }
    }

    return count === expectedCount;
  }

  return false;
}

// Check all Test 2 tables
const englishOK = await checkTable('act_english_questions', 'English Questions', 75);
const mathOK = await checkTable('act_math_questions', 'Math Questions', 60);
const readingOK = await checkTable('act_reading_questions', 'Reading Questions', 40);
const scienceOK = await checkTable('act_science_questions', 'Science Questions', 40);

const englishPassagesOK = await checkTable('act_english_passages', 'English Passages', 5, true);
const readingPassagesOK = await checkTable('act_reading_passages', 'Reading Passages', 4, true);
const sciencePassagesOK = await checkTable('act_science_passages', 'Science Passages', 6, true);

console.log('\n' + '='.repeat(50));
console.log('🚨 EMERGENCY ASSESSMENT:');
console.log('='.repeat(50));

console.log('\n📊 QUESTIONS:');
console.log(`English: ${englishOK ? '✅' : '❌'} (75 questions)`);
console.log(`Math: ${mathOK ? '✅' : '❌'} (60 questions)`);
console.log(`Reading: ${readingOK ? '✅' : '❌'} (40 questions)`);
console.log(`Science: ${scienceOK ? '✅' : '❌'} (40 questions)`);

console.log('\n📚 PASSAGES:');
console.log(`English: ${englishPassagesOK ? '✅' : '❌'} (5 passages)`);
console.log(`Reading: ${readingPassagesOK ? '✅' : '❌'} (4 passages)`);
console.log(`Science: ${sciencePassagesOK ? '✅' : '❌'} (6 passages)`);

const allOK = englishOK && mathOK && readingOK && scienceOK &&
              englishPassagesOK && readingPassagesOK && sciencePassagesOK;

if (allOK) {
  console.log('\n✅ Test 2 appears to be complete');
} else {
  console.log('\n🚨 TEST 2 DATA IS MISSING OR CORRUPTED!');
  console.log('🔧 IMMEDIATE ACTION REQUIRED: Complete Test 2 restoration needed');
}

console.log('\n='.repeat(70));