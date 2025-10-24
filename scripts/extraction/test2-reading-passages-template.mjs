#!/usr/bin/env node

/**
 * TEST 2 - READING PASSAGES TEMPLATE
 * Manual curation template for Test 2 Reading passages
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

console.log('📝 MANUALLY CURATING TEST 2 READING PASSAGES\n');
console.log('='.repeat(70));

// =====================================================
// READING PASSAGES (4) - Manually Fill In
// =====================================================

const readingPassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'LITERARY NARRATIVE',
    title: '[FILL IN - Dual passage about mothers]',
    author: 'Susan Power (Passage A) and Leslie Chang (Passage B)',
    source: 'Various sources',
    introduction: 'Passage A adapted from essay by Susan Power. Passage B adapted from memoir by Leslie Chang.',
    passage_text: `[MANUALLY EXTRACT FROM PDF - This is a dual passage about narrators' relationships with their mothers]`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'SOCIAL SCIENCE',
    title: '[FILL IN - About the ice industry]',
    author: 'Gavin Weightman',
    source: 'The Frozen-Water Trade: A True Story',
    introduction: 'Adapted from The Frozen-Water Trade by Gavin Weightman',
    passage_text: `[MANUALLY EXTRACT FROM PDF - About the natural ice industry in the United States]`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'HUMANITIES',
    title: '[FILL IN - About film dubbing]',
    author: 'Chiara Barzini',
    source: 'Harper\'s Magazine article "Read My Lips"',
    introduction: 'Adapted from article by Chiara Barzini about film dubbing',
    passage_text: `[MANUALLY EXTRACT FROM PDF - About dubbing in Italian cinema]`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'NATURAL SCIENCE',
    title: '[FILL IN - Science passage]',
    author: null,
    source: null,
    introduction: '',
    passage_text: `[MANUALLY EXTRACT FROM PDF - Natural science passage]`
  }
];

// =====================================================
// UPDATE DATABASE
// =====================================================

console.log('💾 Updating Reading passages in database...\n');

for (const passage of readingPassages) {
  const { error } = await supabase
    .from('act_reading_passages')
    .update({
      passage_type: passage.passage_type,
      title: passage.title,
      author: passage.author,
      source: passage.source,
      introduction: passage.introduction,
      passage_text: passage.passage_text
    })
    .eq('test_number', TEST_NUMBER)
    .eq('passage_number', passage.passage_number);

  if (error) {
    console.error(`❌ Error updating Reading Passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`✅ Updated Reading Passage ${passage.passage_number}: ${passage.title}`);
  }
}

console.log('\n✅ Reading passages updated!');
console.log('\n📝 Next: Extract Science passages and answer keys\n');
