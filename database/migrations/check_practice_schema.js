const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  try {
    // Get a sample practice question to see the structure
    const { data, error } = await supabase
      .from('practice_questions')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error:', error);
      return;
    }

    if (data && data.length > 0) {
      console.log('Sample practice question structure:');
      console.log(JSON.stringify(data[0], null, 2));

      console.log('\n\nColumn names:');
      console.log(Object.keys(data[0]));

      // Check if choices field exists and its structure
      if (data[0].choices) {
        console.log('\n\nChoices structure:');
        console.log(JSON.stringify(data[0].choices, null, 2));
      }
    } else {
      console.log('No practice questions found');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkSchema();
