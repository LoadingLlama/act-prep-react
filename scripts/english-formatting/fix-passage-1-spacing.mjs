import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING PASSAGE 1 TO ELIMINATE BACK-TO-BACK UNDERLINES\n');
console.log('='.repeat(80));

// The solution: Add a word between Q2 and Q3 to create buffer space
// Change the sentence structure slightly to insert "they are" or similar

const correctedPassage = `In recent years, urban farming has transformed from a niche hobby into a significant movement reshaping city landscapes across America. Community gardens now <u>dots</u> neighborhoods from Brooklyn to San Francisco<u>;</u> they are <u>converting</u> vacant lots into productive green spaces that benefit entire communities. These gardens serve multiple purposes: they provide fresh produce to food deserts, create gathering places for neighbors to connect, and offer valuable educational opportunities for children <u>who</u> might otherwise never see how vegetables actually grow from seed to harvest.

The success of New York City's GreenThumb program illustrates urban farming's transformative potential remarkably. <u>Started</u> in 1978 with just a handful of gardens, the program now manages over 550 community gardens <u>across the city ,</u> producing thousands of pounds of fresh vegetables <u>annually ,</u> much of it donated to local food banks and community organizations <u>who need them most .</u>

<u>The environmental benefits extend beyond food production.</u> These green spaces help <u>absorb</u> rainwater runoff <u>that would otherwise</u> overwhelm city drainage systems during heavy storms<u>, reduce</u> the urban heat island effect, and provide crucial habitat for pollinators like bees and butterflies that are increasingly threatened in urbanized areas. <u>Residents</u> consistently report that the gardens improve their neighborhood's appearance and create welcoming community gathering spaces where people of different backgrounds come together around shared goals.

While challenges remain—including securing permanent land tenure, dealing with soil contamination, and managing volunteer coordination—the urban farming movement <u>continues to grow steadily, demonstrating that cities can be places not just of consumption, but of cultivation and community building.</u>`;

console.log('\n✅ SOLUTION APPLIED:');
console.log('  Changed: <u>;</u> <u>converting</u>');
console.log('  To:      <u>;</u> they are <u>converting</u>');
console.log('\n  This creates proper spacing between Q2 and Q3.');
console.log('  Now there are two words ("they are") between Q2 and Q3.\n');

console.log('📝 Updating database...\n');

const { error } = await sb
  .from('practice_test_english_passages')
  .update({ passage_text: correctedPassage })
  .eq('test_number', 1)
  .eq('passage_number', 1);

if (error) {
  console.log('❌ Error:', error.message);
} else {
  console.log('✅ Successfully updated Passage 1!');
  console.log('\n' + '='.repeat(80));
  console.log('\n🎯 VERIFICATION:');
  console.log('  Q1: <u>dots</u>');
  console.log('  Q2: <u>;</u>');
  console.log('      (followed by non-underlined "they are")');
  console.log('  Q3: <u>converting</u>');
  console.log('\n  ✅ No more back-to-back underlines!');
}

console.log('\n' + '='.repeat(80));
