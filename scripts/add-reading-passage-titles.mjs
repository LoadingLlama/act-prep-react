import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📖 ADDING TITLES TO PRACTICE TEST 1 READING PASSAGES\n');
console.log('='.repeat(80));

const { data: passages } = await sb
  .from('practice_test_reading_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

if (!passages || passages.length === 0) {
  console.log('❌ No Reading passages found');
  process.exit(1);
}

console.log(`Found ${passages.length} Reading passages\n`);

// Analyze each passage to determine appropriate title
passages.forEach((p, i) => {
  console.log(`\nPASSAGE ${p.passage_number} (${p.passage_type}):`);
  console.log(`Current title: ${p.passage_title || 'NULL'}`);
  console.log(`First 400 chars: ${p.passage_text?.substring(0, 400)}...`);
  console.log('');
});

// Based on the content shown earlier:
// Passage 1: About learning quilting from grandmother - literary narrative
// Need to see the other passages to determine titles

console.log('\n' + '='.repeat(80));
console.log('📝 Generating appropriate titles based on passage content...\n');

const titles = [
  "The Art of Quilting: A Grandmother's Legacy",  // Passage 1 - quilting narrative
  "Passage 2 Title",  // Placeholder - need to analyze
  "Passage 3 Title",  // Placeholder - need to analyze
  "Passage 4 Title",  // Placeholder - need to analyze
];

// For now, show what we found
console.log('Ready to update titles. Here are suggested titles based on content:');
console.log('\nPlease review and confirm these are appropriate.\n');
