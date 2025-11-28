require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAllPracticeTests() {
  console.log('\n🔍 Checking ALL Practice Tests in Database\n');

  const sections = ['english', 'math', 'reading', 'science'];

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;
    console.log(`\n📚 ${section.toUpperCase()}:`);

    // Get all unique test numbers
    const { data: tests, error } = await supabase
      .from(tableName)
      .select('test_number, id')
      .order('test_number', { ascending: true });

    if (error) {
      console.error(`  ❌ Error:`, error.message);
      continue;
    }

    // Group by test_number
    const testGroups = {};
    tests.forEach(q => {
      if (!testGroups[q.test_number]) {
        testGroups[q.test_number] = [];
      }
      testGroups[q.test_number].push(q.id);
    });

    Object.keys(testGroups).sort((a, b) => parseInt(a) - parseInt(b)).forEach(testNum => {
      const ids = testGroups[testNum].sort((a, b) => a - b);
      console.log(`  Test ${testNum}:`);
      console.log(`    Count: ${ids.length}`);
      console.log(`    ID Range: ${Math.min(...ids)} - ${Math.max(...ids)}`);
      console.log(`    First 3: ${ids.slice(0, 3).join(', ')}`);
      console.log(`    Last 3: ${ids.slice(-3).join(', ')}`);
    });
  }

  // Check for ID collisions across ALL tests
  console.log('\n\n🚨 CHECKING FOR ID COLLISIONS ACROSS ALL TESTS:\n');

  const allIds = new Map(); // id -> { section, test_number }

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;
    const { data } = await supabase
      .from(tableName)
      .select('id, test_number, question_number');

    if (data) {
      data.forEach(q => {
        const key = q.id;
        if (allIds.has(key)) {
          const existing = allIds.get(key);
          console.log(`❌ COLLISION: ID ${key}`);
          console.log(`   ${existing.section} Test ${existing.test_number} Q${existing.question_number}`);
          console.log(`   ${section} Test ${q.test_number} Q${q.question_number}`);
        } else {
          allIds.set(key, { section, test_number: q.test_number, question_number: q.question_number });
        }
      });
    }
  }

  if (allIds.size === [...allIds.keys()].length) {
    console.log('✅ No collisions detected (after checking all loaded questions)');
  }

  console.log(`\n📊 TOTAL UNIQUE IDS: ${allIds.size}`);
}

checkAllPracticeTests()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
