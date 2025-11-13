const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkPassage4() {
  const { data } = await supabase
    .from('practice_test_science_passages')
    .select('passage_text')
    .eq('test_number', 1)
    .eq('passage_number', 4)
    .single();

  console.log('=== RAW TEXT ===');
  console.log(data.passage_text);
  console.log('\n=== SHOWING BREAKS ===');
  console.log(data.passage_text.replace(/\n/g, '⏎\n'));
  console.log('\n=== SPLIT BY \\n\\n ===');
  const paragraphs = data.passage_text.split('\n\n');
  console.log('Number of paragraphs:', paragraphs.length);
  paragraphs.forEach((p, i) => {
    console.log(`\nParagraph ${i + 1}:`);
    console.log(p.substring(0, 100) + (p.length > 100 ? '...' : ''));
  });
}

checkPassage4();
