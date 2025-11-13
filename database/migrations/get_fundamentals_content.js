const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function getFundamentalsContent() {
  const lessonIds = ['reading-intro', 'science-introduction'];

  for (const id of lessonIds) {
    const { data } = await supabase
      .from('lessons')
      .select('lesson_key, title, content')
      .eq('lesson_key', id)
      .single();

    if (data?.content) {
      console.log(`\n=== ${id} ===`);
      console.log('First 2000 chars:\n');
      console.log(data.content.substring(0, 2000));
      console.log('\n\n...\n');
    }
  }
}

getFundamentalsContent();
