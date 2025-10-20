const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

(async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title, migrated_to_json, migration_date, content_json')
    .eq('id', '3e8f0696-1bf7-4b5c-880d-fb5359923b7d')
    .single();

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('✓ Lesson from database:');
    console.log('  Title:', data.title);
    console.log('  Migrated:', data.migrated_to_json);
    console.log('  Migration Date:', data.migration_date);
    console.log('  Has content_json:', data.content_json !== null);
    console.log('  Content blocks:', data.content_json?.content?.length);
    console.log('');
    console.log('First 3 blocks:');
    data.content_json.content.slice(0, 3).forEach((block, i) => {
      console.log(`  ${i + 1}. Type: ${block.type}, Text: ${block.text?.substring(0, 50)}...`);
    });
  }
})();
