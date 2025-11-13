const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function findTables() {
  try {
    // Try different possible table names
    const possibleTables = [
      'lesson_examples',
      'examples',
      'practice_test_questions',
      'questions',
      'lesson_practice_questions'
    ];

    for (const tableName of possibleTables) {
      console.log(`\nTrying table: ${tableName}`);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (!error && data && data.length > 0) {
        console.log(`✓ Found ${tableName}!`);
        console.log('Sample record:');
        console.log(JSON.stringify(data[0], null, 2));
        console.log('\n\nColumns:', Object.keys(data[0]));

        // Check choices structure if it exists
        if (data[0].choices) {
          console.log('\nChoices structure:');
          console.log(JSON.stringify(data[0].choices, null, 2));
        }
        break;
      }
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

findTables();
