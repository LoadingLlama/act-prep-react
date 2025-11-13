const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkPassages() {
  const { data } = await supabase
    .from('practice_test_science_passages')
    .select('passage_number, passage_text')
    .eq('test_number', 1)
    .order('passage_number');

  data.forEach(p => {
    console.log('\n=== Passage', p.passage_number, '===');
    console.log('First 200 chars:', p.passage_text.substring(0, 200));
    const paragraphs = p.passage_text.split('\n\n');
    console.log('Paragraph count:', paragraphs.length);

    if (p.passage_text.includes('Water Electrolysis') || p.passage_text.includes('Electrolysis')) {
      console.log('\n*** FOUND WATER ELECTROLYSIS PASSAGE ***');
      console.log('First 800 chars:');
      console.log(p.passage_text.substring(0, 800));
    }
  });
}

checkPassages();
