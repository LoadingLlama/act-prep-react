import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING EXTRA SPACES IN UNDERLINED PORTIONS\n');
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
  let updatedText = passage.passage_text;

  // Fix common spacing issues:
  // 1. Remove space before closing </u>
  updatedText = updatedText.replace(/ <\/u>/g, '</u>');

  // 2. Remove space after opening <u>
  updatedText = updatedText.replace(/<u> /g, '<u>');

  // 3. Fix cases where there's space before <u> and the underlined text starts with space
  updatedText = updatedText.replace(/ <u> /g, ' <u>');

  console.log(`Passage ${passage.passage_number}: Fixing spacing...`);

  const { error } = await sb
    .from('practice_test_english_passages')
    .update({ passage_text: updatedText })
    .eq('id', passage.id);

  if (error) {
    console.log(`  ❌ Error: ${error.message}`);
  } else {
    console.log(`  ✅ Successfully fixed spacing in Passage ${passage.passage_number}`);
    successCount++;
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n✅ COMPLETE! Fixed spacing in ${successCount}/${passages.length} passages`);
console.log('='.repeat(80));
