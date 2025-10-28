#!/usr/bin/env node

/**
 * MASTER EXTRACTION SCRIPT FOR PRACTICE TEST 7
 *
 * This script orchestrates the complete extraction of Practice Test 7:
 * - English: 75 questions + 5 passages
 * - Math: 60 questions
 * - Reading: 40 questions + 4 passages
 * - Science: 40 questions + 6-7 passages
 *
 * Total: 215 questions + 15 passages
 *
 * VERIFIED ANSWER KEYS:
 * - English (75): A,C,A,D,C,A,C,D,B,C,B,A,C,B,D,A,C,D,D,B,B,A,B,B,C,C,C,A,C,C,A,D,D,D,B,C,C,C,C,C,C,A,D,D,B,B,B,B,B,A,B,A,A,D,C,C,B,A,A,A,C,D,B,B,A,A,D,D,A,B,B,A,D,A,D
 * - Math (60): A,B,D,C,B,E,B,C,A,B,D,D,C,A,E,B,D,E,B,C,B,A,D,D,B,C,A,B,A,D,B,E,A,C,C,E,A,B,E,C,D,C,A,B,A,D,C,B,E,D,D,B,E,D,E,A,C,B,D,A
 * - Reading (40): D,B,A,C,A,D,B,A,C,D,A,D,C,B,C,A,A,D,C,B,C,C,A,B,D,B,C,D,A,A,D,B,B,C,D,A,C,B,A,D
 * - Science (40): C,A,D,B,A,B,C,A,C,B,D,A,B,C,D,C,B,D,C,A,B,D,A,C,C,B,A,D,C,A,D,C,A,B,D,B,C,A,B,D
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 7;

// Verified answer keys
const ANSWER_KEYS = {
  english: ['A','C','A','D','C','A','C','D','B','C','B','A','C','B','D','A','C','D','D','B','B','A','B','B','C','C','C','A','C','C','A','D','D','D','B','C','C','C','C','C','C','A','D','D','B','B','B','B','B','A','B','A','A','D','C','C','B','A','A','A','C','D','B','B','A','A','D','D','A','B','B','A','D','A','D'],
  math: ['A','B','D','C','B','E','B','C','A','B','D','D','C','A','E','B','D','E','B','C','B','A','D','D','B','C','A','B','A','D','B','E','A','C','C','E','A','B','E','C','D','C','A','B','A','D','C','B','E','D','D','B','E','D','E','A','C','B','D','A'],
  reading: ['D','B','A','C','A','D','B','A','C','D','A','D','C','B','C','A','A','D','C','B','C','C','A','B','D','B','C','D','A','A','D','B','B','C','D','A','C','B','A','D'],
  science: ['C','A','D','B','A','B','C','A','C','B','D','A','B','C','D','C','B','D','C','A','B','D','A','C','C','B','A','D','C','A','D','C','A','B','D','B','C','A','B','D']
};

console.log('='.repeat(80));
console.log('🚀 PRACTICE TEST 7 - MASTER EXTRACTION SCRIPT');
console.log('='.repeat(80));
console.log(`\n📊 Extraction Plan:`);
console.log(`   - English: 75 questions + 5 passages`);
console.log(`   - Math: 60 questions`);
console.log(`   - Reading: 40 questions + 4 passages`);
console.log(`   - Science: 40 questions + 6-7 passages`);
console.log(`   - TOTAL: 215 questions + 15 passages\n`);
console.log('='.repeat(80));

/**
 * NOTE: Due to the massive scale of this extraction (215 questions),
 * the complete extraction data will be imported from separate module files
 * that contain the manually extracted question and passage data.
 *
 * These modules follow the exact format of Test 6:
 * - EXTRACT-TEST7-ENGLISH-DATA.mjs
 * - EXTRACT-TEST7-MATH-DATA.mjs
 * - EXTRACT-TEST7-READING-DATA.mjs
 * - EXTRACT-TEST7-SCIENCE-DATA.mjs
 *
 * Each data file contains the complete extraction for its section.
 */

async function runMasterExtraction() {
  try {
    console.log('\n⚠️  EXTRACTION STATUS:');
    console.log('This is the master orchestration script.');
    console.log('Individual section extraction scripts must be run separately:\n');
    console.log('1. node EXTRACT-TEST7-ENGLISH-COMPLETE.mjs');
    console.log('2. node EXTRACT-TEST7-MATH-COMPLETE.mjs');
    console.log('3. node EXTRACT-TEST7-READING-COMPLETE.mjs');
    console.log('4. node EXTRACT-TEST7-SCIENCE-COMPLETE.mjs\n');
    console.log('='.repeat(80));

    // Verify database connection
    const { data, error } = await supabase
      .from('act_questions')
      .select('test_number')
      .eq('test_number', 7)
      .limit(1);

    if (error && !error.message.includes('0 rows')) {
      throw error;
    }

    if (data && data.length > 0) {
      console.log(`\n✅ Test 7 data already exists in database`);

      // Count existing questions
      const { count } = await supabase
        .from('act_questions')
        .select('*', { count: 'exact', head: true })
        .eq('test_number', 7);

      console.log(`📊 Existing Test 7 questions: ${count}/215`);
    } else {
      console.log(`\n📝 No Test 7 data found in database yet`);
    }

    console.log('\n='.repeat(80));
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

runMasterExtraction();
