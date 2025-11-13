const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error:', error);
      return;
    }

    if (data && data.length > 0) {
      console.log('Lessons table columns:');
      console.log(Object.keys(data[0]));
      console.log('\nSample lesson:');
      console.log(JSON.stringify(data[0], null, 2));
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkColumns();
