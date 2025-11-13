const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function viewPassage() {
  const { data } = await supabase
    .from('practice_test_science_passages')
    .select('passage_number, passage_text')
    .eq('test_number', 1)
    .in('passage_number', [5, 6]);

  data.forEach(p => {
    console.log('\n\n=== PASSAGE', p.passage_number, '===');
    console.log(p.passage_text);
    console.log('\n=== END PASSAGE', p.passage_number, '===\n');
  });
}

viewPassage();
