#!/usr/bin/env node

/**
 * CHECK TEST 1 SCIENCE PASSAGES
 * Verify what Science passage text is currently in the database
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 1;

console.log('🔍 CHECKING TEST 1 SCIENCE PASSAGES IN DATABASE\n');
console.log('='.repeat(70));

async function checkSciencePassages() {
  const { data: passages, error } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .order('passage_number');

  if (error) {
    console.error('❌ Error fetching Science passages:', error.message);
    return;
  }

  console.log(`Found ${passages.length} Science passages for Test 1:\n`);

  for (const passage of passages) {
    console.log(`📄 PASSAGE ${passage.passage_number}:`);
    console.log(`   Type: ${passage.passage_type || 'Not set'}`);
    console.log(`   Title: ${passage.title || 'Not set'}`);
    console.log(`   Introduction: ${passage.introduction || 'Not set'}`);
    console.log(`   Passage text length: ${passage.passage_text ? passage.passage_text.length : 0} characters`);

    if (passage.passage_text) {
      const preview = passage.passage_text.substring(0, 150);
      console.log(`   Preview: "${preview}${passage.passage_text.length > 150 ? '...' : ''}"`);

      // Check if it looks like placeholder text
      if (passage.passage_text.includes('[Science Passage') ||
          passage.passage_text.includes('to be filled') ||
          passage.passage_text.length < 100) {
        console.log(`   ⚠️  ISSUE: Appears to be placeholder text`);
      }
    } else {
      console.log(`   ❌ ISSUE: No passage text found`);
    }

    console.log(`   Figures: ${passage.figures ? JSON.stringify(passage.figures, null, 2) : 'None'}`);
    console.log('');
  }

  // Summary
  const emptyPassages = passages.filter(p => !p.passage_text || p.passage_text.length < 100);
  const placeholderPassages = passages.filter(p =>
    p.passage_text && (
      p.passage_text.includes('[Science Passage') ||
      p.passage_text.includes('to be filled')
    )
  );

  console.log('📊 SUMMARY:');
  console.log(`Total passages: ${passages.length}`);
  console.log(`Empty or very short passages: ${emptyPassages.length}`);
  console.log(`Placeholder passages: ${placeholderPassages.length}`);
  console.log(`Fully extracted passages: ${passages.length - emptyPassages.length - placeholderPassages.length}`);

  if (emptyPassages.length > 0 || placeholderPassages.length > 0) {
    console.log('\n⚠️  ACTION NEEDED: Some Science passages need proper extraction');
    console.log('Passages that need work:',
      [...emptyPassages, ...placeholderPassages]
        .map(p => p.passage_number)
        .join(', ')
    );
  } else {
    console.log('\n✅ All Science passages appear to be properly extracted');
  }
}

await checkSciencePassages();
console.log('\n✅ Science passages check complete!\n');