const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkFields() {
  console.log('Checking user_goals table...\n');

  const { data } = await supabase
    .from('user_goals')
    .select('*')
    .limit(1)
    .single();

  if (data) {
    console.log('Fields in user_goals:\n');
    console.log(JSON.stringify(data, null, 2));
  }
}

checkFields().catch(console.error);
