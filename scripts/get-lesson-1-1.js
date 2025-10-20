const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

(async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'backsolving')
    .single();

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Lesson 1.1 Title:', data.title);
    console.log('Has content_json:', data.content_json !== null);
    console.log('\n=== CONTENT HTML ===\n');
    console.log(data.content.substring(0, 3000));

    fs.writeFileSync('docs/LESSON_1_1_HTML.txt', data.content);
    console.log('\n✓ Saved to docs/LESSON_1_1_HTML.txt');
  }
})();
