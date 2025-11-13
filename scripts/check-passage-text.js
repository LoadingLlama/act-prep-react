const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkPassage() {
  const { data } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1)
    .eq('passage_number', 2)
    .single();

  console.log('Passage 2 full text:');
  console.log(data.passage_text);
  console.log('\n\nImage URLs:');
  for (let i = 1; i <= 5; i++) {
    if (data[`image_url_${i}`]) {
      console.log(`image_url_${i}:`, data[`image_url_${i}`]);
    }
  }
}

checkPassage();
