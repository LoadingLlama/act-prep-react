import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function deleteContentJson() {
  // Update ALL lessons to set content_json to NULL and migrated_to_json to false
  const { data, error } = await supabase
    .from('lessons')
    .update({
      content_json: null,
      migrated_to_json: false
    })
    .eq('subject', 'english');

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  console.log('✓ Successfully deleted content_json for all English lessons');
  console.log('✓ Set migrated_to_json to false for all English lessons');
}

deleteContentJson();
