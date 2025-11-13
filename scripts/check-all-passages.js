const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkAllPassages() {
  const { data } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  data.forEach(p => {
    console.log('\n=== PASSAGE', p.passage_number, '===');
    console.log('Title:', p.passage_title || '(no title)');
    const lines = p.passage_text.split('\n');
    const paragraphs = p.passage_text.split('\n\n');
    console.log('Total characters:', p.passage_text.length);
    console.log('Single line breaks (\\n):', lines.length - 1);
    console.log('Double line breaks (\\n\\n):', paragraphs.length - 1);
    console.log('\nFirst 300 chars:');
    console.log(p.passage_text.substring(0, 300));
  });
}

checkAllPassages();
