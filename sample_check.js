/**
 * Sample actual explanation content to verify quality
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function sampleCheck() {
  console.log('🔬 SAMPLING EXPLANATION CONTENT\n');
  console.log('='.repeat(70));

  // Sample one question from each test
  for (let testNum = 1; testNum <= 7; testNum++) {
    const { data } = await supabase
      .from('practice_test_english_questions')
      .select('test_number, question_number, explanation')
      .eq('test_number', testNum)
      .eq('question_number', 1)
      .single();

    if (data) {
      const exp = data.explanation || '';
      console.log(`\n📝 Test ${testNum}, Q1:`);
      console.log(`  Length: ${exp.length} characters`);
      console.log(`  Has HTML: ${exp.includes('<div') ? 'Yes' : 'No'}`);
      console.log(`  Has "Why Other Answers": ${exp.includes('Why Other Answers Are Wrong') ? 'Yes' : 'No'}`);
      console.log(`  Has correct answer: ${exp.includes('The correct answer is') ? 'Yes' : 'No'}`);
      console.log(`  Preview: ${exp.substring(0, 100)}...`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n✅ SAMPLE CHECK COMPLETE\n');
}

sampleCheck()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
