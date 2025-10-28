import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 ADDING TITLES TO PRACTICE TEST 1 ENGLISH PASSAGES\n');
console.log('='.repeat(80));

// Based on Practice ACT 2 format, English passages should have descriptive titles
// Let me first check what the passages are about by reading their text

const { data: passages } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

if (!passages || passages.length === 0) {
  console.log('❌ No English passages found');
  process.exit(1);
}

console.log(`Found ${passages.length} English passages\n`);

// Analyze each passage and suggest titles
passages.forEach((p, i) => {
  console.log(`\nPASSAGE ${p.passage_number}:`);
  console.log(`First 300 chars: ${p.passage_text?.substring(0, 300)}...`);
  console.log('');
});

// Suggested titles based on passage content
const titles = [
  "Urban Farming: Growing Communities",  // Passage 1 - about community gardens
  "The Digital Divide",                   // Passage 2 - placeholder, need to check content
  "Climate Change and Coastal Cities",    // Passage 3 - placeholder
  "The Evolution of Jazz",                // Passage 4 - placeholder
  "Space Exploration",                    // Passage 5 - placeholder
];

console.log('\n' + '='.repeat(80));
console.log('SUGGESTED TITLES:\n');

for (let i = 0; i < passages.length; i++) {
  console.log(`Passage ${i + 1}: "${titles[i]}"`);
}

console.log('\n' + '='.repeat(80));
console.log('\nProceed with updating titles? (Check the passage content above first)');
console.log('Edit this script with proper titles based on actual passage content.\n');

// For now, let's just add the first one as an example
console.log('\nAdding title to Passage 1 as example...\n');

const { data: updated, error } = await sb
  .from('practice_test_english_passages')
  .update({ passage_title: titles[0] })
  .eq('test_number', 1)
  .eq('passage_number', 1)
  .select();

if (error) {
  console.error('❌ Error updating passage 1:', error);
} else {
  console.log('✅ Updated Passage 1 with title:', titles[0]);
  console.log('Updated data:', updated);
}

console.log('\n⚠️  MANUAL REVIEW NEEDED:');
console.log('Please review the passage content above and update the titles array');
console.log('with appropriate titles for passages 2-5, then run this script again.');
