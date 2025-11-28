const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySamples() {
  const tables = {
    'English': { table: 'practice_test_english_questions', sampleIds: [1, 2, 3] },
    'Math': { table: 'practice_test_math_questions', sampleIds: [76, 77, 78] },
    'Reading': { table: 'practice_test_reading_questions', sampleIds: [136, 137, 138] },
    'Science': { table: 'practice_test_science_questions', sampleIds: [176, 177, 178] }
  };

  console.log('=== VERIFICATION REPORT ===\n');

  let allGood = true;

  for (const [subject, config] of Object.entries(tables)) {
    console.log(`\n${subject}:`);

    for (const id of config.sampleIds) {
      const { data, error } = await supabase
        .from(config.table)
        .select('id, question_number, explanation')
        .eq('id', id)
        .single();

      if (error) {
        console.log(`  ✗ ID ${id}: Error fetching - ${error.message}`);
        allGood = false;
        continue;
      }

      // Check if it has both parts
      const hasMainExp = data.explanation.includes('margin-bottom: 0.75rem');
      const hasWrongExp = data.explanation.includes('Why Other Answers Are Wrong');

      if (hasMainExp && hasWrongExp) {
        console.log(`  ✓ ID ${id} (Q${data.question_number}): Complete`);
      } else {
        console.log(`  ✗ ID ${id} (Q${data.question_number}): Missing ${!hasMainExp ? 'main explanation' : ''} ${!hasWrongExp ? 'wrong answers section' : ''}`);
        allGood = false;
      }
    }
  }

  // Check overall stats
  console.log('\n\n=== OVERALL STATS ===');

  for (const [subject, config] of Object.entries(tables)) {
    const { data, error } = await supabase
      .from(config.table)
      .select('id, explanation')
      .eq('test_number', 1);

    if (error) {
      console.log(`${subject}: Error - ${error.message}`);
      continue;
    }

    let complete = 0;
    let incomplete = 0;

    data.forEach(q => {
      const hasMain = q.explanation && q.explanation.includes('margin-bottom: 0.75rem');
      const hasWrong = q.explanation && q.explanation.includes('Why Other Answers Are Wrong');

      if (hasMain && hasWrong) {
        complete++;
      } else {
        incomplete++;
      }
    });

    console.log(`${subject}: ${complete}/${data.length} complete, ${incomplete} incomplete`);
  }

  console.log('\n' + '='.repeat(40));
  if (allGood) {
    console.log('✓ All sampled explanations are in correct format!');
  } else {
    console.log('✗ Some explanations need attention');
  }
}

verifySamples().catch(console.error);
