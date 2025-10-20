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
    .select('content')
    .eq('id', '06685249-874d-431f-9b7f-1c711d64a9cf')
    .single();

  if (error) {
    console.error('Error:', error);
  } else {
    const content = data.content;
    const startIdx = content.indexOf('<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Example 1: Basic Backsolving</h4>');
    const endIdx = content.indexOf('<h3 style="margin-top: 5rem', startIdx + 1);

    if (startIdx !== -1 && endIdx !== -1) {
      const example1 = content.substring(startIdx, endIdx).trim();
      fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/docs/CURRENT_EXAMPLE_1.txt', example1);
      console.log('Saved current Example 1 to docs/CURRENT_EXAMPLE_1.txt');
      console.log('Length:', example1.length);
    } else {
      console.log('Could not find Example 1');
    }
  }
})();
