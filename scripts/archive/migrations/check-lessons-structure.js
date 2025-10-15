const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStructure() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Sample lesson structure:');
    console.log(JSON.stringify(data[0], null, 2));

    if (data[0]) {
      console.log('\nColumns:');
      Object.keys(data[0]).forEach(key => console.log(`  - ${key}`));
    }
  }
}

checkStructure().catch(console.error);
