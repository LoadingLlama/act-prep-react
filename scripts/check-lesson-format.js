const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

(async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', '3e8f0696-1bf7-4b5c-880d-fb5359923b7d')
    .single();

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log('═'.repeat(80));
  console.log('Lesson Format Check');
  console.log('═'.repeat(80));
  console.log();
  console.log('Lesson Details:');
  console.log('  Title:', data.title);
  console.log('  Migrated:', data.migrated_to_json);
  console.log('  Has content_json:', data.content_json !== null);
  console.log('  Has old content:', data.content !== null);
  console.log();

  if (data.content_json) {
    console.log('✅ JSON format exists with', data.content_json.content.length, 'blocks');
    console.log();
  }

  if (data.content) {
    console.log('⚠️  Old HTML format still exists (' + data.content.length + ' chars)');
    console.log();
    console.log('First 300 chars of old content:');
    console.log(data.content.substring(0, 300));
    console.log();
  }

  console.log('═'.repeat(80));
  console.log('Question: Is your app using LessonRenderer component?');
  console.log('═'.repeat(80));
  console.log();
  console.log('The app needs to:');
  console.log('1. Check if lesson.content_json exists');
  console.log('2. If yes, use: <LessonRenderer data={lesson.content_json} />');
  console.log('3. If no, fall back to old HTML rendering');
  console.log();
})();
