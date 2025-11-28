const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchAll() {
  const tables = [
    { name: 'practice_test_english_questions', subject: 'English' },
    { name: 'practice_test_math_questions', subject: 'Math' },
    { name: 'practice_test_reading_questions', subject: 'Reading' },
    { name: 'practice_test_science_questions', subject: 'Science' },
  ];

  const allQuestions = {};

  for (const table of tables) {
    console.log(`Fetching ${table.subject}...`);
    const { data, error } = await supabase
      .from(table.name)
      .select('*')
      .eq('test_number', 1)
      .order('id');

    if (error) {
      console.error(`Error fetching ${table.subject}:`, error);
      continue;
    }

    allQuestions[table.subject] = data;
    console.log(`${table.subject}: ${data.length} questions`);
  }

  fs.writeFileSync('all_215_questions.json', JSON.stringify(allQuestions, null, 2));
  console.log('\nSaved to all_215_questions.json');

  const total = Object.values(allQuestions).reduce((sum, q) => sum + q.length, 0);
  console.log(`\nTotal: ${total} questions`);
}

fetchAll().catch(console.error);
