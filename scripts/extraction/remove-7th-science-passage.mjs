#!/usr/bin/env node

/**
 * REMOVE 7TH SCIENCE PASSAGE - ACT ONLY HAS 6 SCIENCE PASSAGES
 * Delete the incorrect 7th science passage from both Test 1 and Test 2
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🗑️  REMOVING INCORRECT 7TH SCIENCE PASSAGES\n');
console.log('='.repeat(70));
console.log('Note: ACT Science tests only have 6 passages, not 7\n');

// Remove 7th passage from Test 1
console.log('🔧 Removing Test 1 Science Passage 7...');
const { error: test1Error } = await supabase
  .from('act_science_passages')
  .delete()
  .eq('test_number', 1)
  .eq('passage_number', 7);

if (test1Error) {
  console.error('❌ Error removing Test 1 Passage 7:', test1Error.message);
} else {
  console.log('✅ Test 1 Science Passage 7 removed');
}

// Remove 7th passage from Test 2
console.log('🔧 Removing Test 2 Science Passage 7...');
const { error: test2Error } = await supabase
  .from('act_science_passages')
  .delete()
  .eq('test_number', 2)
  .eq('passage_number', 7);

if (test2Error) {
  console.error('❌ Error removing Test 2 Passage 7:', test2Error.message);
} else {
  console.log('✅ Test 2 Science Passage 7 removed');
}

// Verify the corrections
console.log('\n🔍 VERIFICATION - Checking Science passage counts...\n');

for (const testNum of [1, 2]) {
  const { data: passages, error: fetchError } = await supabase
    .from('act_science_passages')
    .select('passage_number, title')
    .eq('test_number', testNum)
    .order('passage_number');

  if (fetchError) {
    console.error(`❌ Error fetching Test ${testNum} passages:`, fetchError.message);
  } else {
    console.log(`📊 Test ${testNum} Science Passages: ${passages.length}/6`);
    for (const passage of passages) {
      console.log(`   Passage ${passage.passage_number}: ${passage.title}`);
    }

    if (passages.length === 6) {
      console.log(`✅ Test ${testNum} has correct number of Science passages`);
    } else {
      console.log(`⚠️  Test ${testNum} has ${passages.length} passages (should be 6)`);
    }
    console.log('');
  }
}

console.log('🎉 7th Science passage cleanup complete!\n');