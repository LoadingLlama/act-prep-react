#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 REPLACING PRACTICE TEST 1 WITH NEW GENERATED CONTENT\n');

// Load Test 8 data (to be converted to Test 1)
const test8 = JSON.parse(fs.readFileSync('test-8-complete-auto.json', 'utf8'));

// Convert to Test 1
const test1 = {
  ...test8,
  test_number: 1
};

// Save as Test 1
fs.writeFileSync('practice-test-1-new.json', JSON.stringify(test1, null, 2));
console.log('✅ Created practice-test-1-new.json\n');

console.log('⚠️  IMPORTANT: This will DELETE all existing Practice Test 1 data');
console.log('   and replace it with the newly generated content.\n');
console.log('📊 Data to be replaced:');
console.log(`   • English: ${test1.english.questions.length} questions (${test1.english.passages.length} passages)`);
console.log(`   • Math: ${test1.math.questions.length} questions`);
console.log(`   • Reading: ${test1.reading.questions.length} questions (${test1.reading.passages.length} passages)`);
console.log(`   • Science: ${test1.science.questions.length} questions (${test1.science.passages.length} passages)`);
console.log(`   • TOTAL: 215 questions\n`);

console.log('✅ Ready to replace Practice Test 1');
console.log('   Run: node transform-and-replace-test-1.mjs');
