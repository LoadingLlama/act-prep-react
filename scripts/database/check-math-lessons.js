const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  console.log('Checking math lessons...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${lessons.length} math lessons:\n`);

  for (const lesson of lessons) {
    // Check if it has questions
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('id')
      .eq('lesson_id', lesson.id);

    console.log(`${lesson.order_index}. ${lesson.title}`);
    console.log(`   ID: ${lesson.id}`);
    console.log(`   Description: ${lesson.description ? lesson.description.substring(0, 100) : 'N/A'}`);
    console.log(`   Current Questions: ${examples?.length || 0}`);
    console.log('');
  }
})();
