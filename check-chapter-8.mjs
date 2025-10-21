import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function checkChapter8() {
  const { data, error } = await supabase
    .from('lessons')
    .select('lesson_key, title, content, content_json, migrated_to_json')
    .eq('lesson_key', 'misc-topics')
    .single();

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log('Lesson Key:', data.lesson_key);
  console.log('Title:', data.title);
  console.log('Content (HTML) length:', data.content ? data.content.length : 'NULL');
  console.log('Content_json:', data.content_json === null ? 'NULL' : 'HAS VALUE');
  console.log('Migrated_to_json:', data.migrated_to_json);

  if (data.content) {
    console.log('\nFirst 200 chars of content:');
    console.log(data.content.substring(0, 200));
  }
}

checkChapter8();
