const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

(async () => {
  console.log('═'.repeat(80));
  console.log('Updating Lesson 1.2 with Final JSON Structure');
  console.log('═'.repeat(80));
  console.log();

  // Load the properly structured JSON
  const jsonPath = '/Users/cadenchiang/Desktop/act-prep-react/docs/LESSON_1_2_READY_FOR_MIGRATION.json';
  const lessonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log('✓ Loaded JSON with', lessonData.content.length, 'content blocks');
  console.log();

  // Update the lesson in Supabase
  const { data, error } = await supabase
    .from('lessons')
    .update({
      content_json: lessonData,
      migrated_to_json: true,
      migration_date: new Date().toISOString()
    })
    .eq('id', '3e8f0696-1bf7-4b5c-880d-fb5359923b7d')
    .select();

  if (error) {
    console.error('✗ Error updating lesson:', error.message);
    process.exit(1);
  }

  console.log('✓ Successfully updated Lesson 1.2 in database');
  console.log();
  console.log('Lesson Details:');
  console.log('  - Title:', data[0].title);
  console.log('  - Migrated:', data[0].migrated_to_json);
  console.log('  - Migration Date:', data[0].migration_date);
  console.log('  - Content Blocks:', data[0].content_json.content.length);
  console.log();
  console.log('═'.repeat(80));
  console.log('Next: Refresh your browser to see the updated lesson');
  console.log('═'.repeat(80));
})();
