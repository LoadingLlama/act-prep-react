require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAllQuestionIds() {
  console.log('\n🔍 Checking ALL Practice Test Question IDs\n');

  const sections = ['english', 'math', 'reading', 'science'];

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;
    console.log(`\n📚 ${section.toUpperCase()}:`);

    const { data, error } = await supabase
      .from(tableName)
      .select('id, question_number')
      .eq('test_number', 1)
      .order('question_number', { ascending: true });

    if (error) {
      console.error(`  ❌ Error:`, error.message);
      continue;
    }

    if (data.length > 0) {
      const ids = data.map(q => q.id);
      console.log(`  Count: ${data.length}`);
      console.log(`  ID Range: ${Math.min(...ids)} - ${Math.max(...ids)}`);
      console.log(`  First 5: ${ids.slice(0, 5).join(', ')}`);
      console.log(`  Last 5: ${ids.slice(-5).join(', ')}`);

      // Show question number to ID mapping for first few
      console.log(`  Q1 -> ID ${data[0].id}`);
      if (data.length > 16) {
        console.log(`  Q16 -> ID ${data[15].id}`);
        console.log(`  Q17 -> ID ${data[16].id}`);
      }
    }
  }
}

checkAllQuestionIds()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
