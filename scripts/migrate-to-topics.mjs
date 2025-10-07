import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateToTopics() {
  console.log('🔄 Starting topic migration...\n');

  // Update the existing sentence-structure lesson
  console.log('Updating sentence-structure lesson to Topic 1.1...');

  const { data: existingLesson, error: fetchError } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'sentence-structure')
    .single();

  if (fetchError) {
    console.error('Error fetching lesson:', fetchError);
    return;
  }

  if (!existingLesson) {
    console.log('No sentence-structure lesson found');
    return;
  }

  // Update the lesson with topic information
  const { data, error } = await supabase
    .from('lessons')
    .update({
      title: 'Topic 1.1 - Sentence Structure',
      topic_number: 1,
      topic_lesson_number: 1,
      topic_title: 'Sentence Structure & Grammar Fundamentals',
      full_topic_code: '1.1'
    })
    .eq('lesson_key', 'sentence-structure')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
    return;
  }

  console.log('✅ Successfully updated lesson to Topic 1.1');
  console.log('\nUpdated lesson details:');
  console.log('- Title:', data[0].title);
  console.log('- Topic:', data[0].topic_number);
  console.log('- Topic Lesson:', data[0].topic_lesson_number);
  console.log('- Topic Title:', data[0].topic_title);
  console.log('- Full Code:', data[0].full_topic_code);

  console.log('\n📋 Next steps:');
  console.log('1. Add columns to Supabase lessons table:');
  console.log('   - topic_number (integer)');
  console.log('   - topic_lesson_number (integer)');
  console.log('   - topic_title (text)');
  console.log('   - full_topic_code (text, e.g., "1.1")');
  console.log('2. Create additional lessons for Topics 1.2, 1.3, 1.4, etc.');
  console.log('3. Update UI to display topic information');
}

migrateToTopics();
