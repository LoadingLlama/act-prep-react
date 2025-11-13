const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = process.argv[2];

async function fetchExamples() {
  if (!LESSON_ID) {
    console.error('Please provide a lesson ID as an argument');
    process.exit(1);
  }

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', LESSON_ID)
    .order('position');

  console.log(JSON.stringify(examples, null, 2));
}

fetchExamples();
