require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyIdCollision() {
  console.log('\n🔍 Verifying ID Collision\n');

  // Get Reading Q1
  const { data: readingQ1 } = await supabase
    .from('practice_test_reading_questions')
    .select('id, question_number, question_text')
    .eq('test_number', 1)
    .eq('question_number', 1)
    .single();

  // Get Science Q17
  const { data: scienceQ17 } = await supabase
    .from('practice_test_science_questions')
    .select('id, question_number, question_text')
    .eq('test_number', 1)
    .eq('question_number', 17)
    .single();

  console.log('📖 Reading Q1:');
  console.log(`  ID: ${readingQ1.id}`);
  console.log(`  Text: ${readingQ1.question_text.substring(0, 60)}...`);

  console.log('\n🔬 Science Q17:');
  console.log(`  ID: ${scienceQ17.id}`);
  console.log(`  Text: ${scienceQ17.question_text.substring(0, 60)}...`);

  if (readingQ1.id === scienceQ17.id) {
    console.log('\n🚨 COLLISION CONFIRMED! Both have ID:', readingQ1.id);
    console.log('\nThis means when the code tries to save Science Q17,');
    console.log('it uses ID 417, but Reading Q1 was already saved with ID 417,');
    console.log('violating the unique constraint (diagnostic_session_id, question_id).');
  } else {
    console.log('\n✅ No collision - different IDs');
  }

  // Check saved results
  console.log('\n📊 Checking saved results for session...\n');

  const sessionId = '07fa2904-82c9-44bb-9779-faaad6adcefd';
  const { data: results } = await supabase
    .from('diagnostic_test_results')
    .select('question_id')
    .eq('diagnostic_session_id', sessionId)
    .eq('question_id', 417);

  if (results && results.length > 0) {
    console.log(`✅ ID 417 is already saved in this session (${results.length} times)`);
    console.log('This is why Science Q17 fails - duplicate question_id!');
  }
}

verifyIdCollision()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
