import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 REMOVING ALL SUBSCRIPTS FROM ENGLISH PASSAGES\n');
console.log('='.repeat(80));

// Get all English passages for test 1
const { data: passages } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

console.log(`\nFound ${passages.length} passages to update\n`);

let successCount = 0;

for (const passage of passages) {
  // Remove all <sub>number</sub> tags but keep <u></u> tags
  const updatedText = passage.passage_text.replace(/<sub>\d+<\/sub>/g, '');

  console.log(`Passage ${passage.passage_number}: Removing subscripts...`);

  const { error } = await sb
    .from('practice_test_english_passages')
    .update({ passage_text: updatedText })
    .eq('id', passage.id);

  if (error) {
    console.log(`  ❌ Error: ${error.message}`);
  } else {
    console.log(`  ✅ Successfully removed subscripts from Passage ${passage.passage_number}`);
    successCount++;
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n✅ COMPLETE! Removed subscripts from ${successCount}/${passages.length} passages`);
console.log('\nUnderlined portions remain intact, subscripts removed.');
console.log('='.repeat(80));
