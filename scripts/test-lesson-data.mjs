import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLessonData() {
  console.log('🔍 Fetching sentence-structure lesson...\n');

  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'sentence-structure')
    .single();

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  if (!data) {
    console.log('❌ No lesson found with key "sentence-structure"');
    return;
  }

  console.log('✅ Lesson found!\n');
  console.log('Lesson data:');
  console.log('- lesson_key:', data.lesson_key);
  console.log('- title:', data.title);
  console.log('- subject:', data.subject);
  console.log('- topic_number:', data.topic_number || '(not set)');
  console.log('- topic_lesson_number:', data.topic_lesson_number || '(not set)');
  console.log('- topic_title:', data.topic_title || '(not set)');
  console.log('- full_topic_code:', data.full_topic_code || '(not set)');

  console.log('\n📊 All available columns:');
  console.log(Object.keys(data).join(', '));

  if (!data.topic_number) {
    console.log('\n⚠️  Topic columns are NOT set yet!');
    console.log('You need to run the SQL migration in Supabase.');
  } else {
    console.log('\n✅ Topic columns ARE set correctly!');
  }
}

testLessonData();
