import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function fixTopicLessonNumberColumn() {
  console.log('🔧 Fixing topic_lesson_number column type...\n');

  try {
    // Use raw SQL to alter the column type from integer to text
    const { data, error } = await supabase.rpc('exec_sql', {
      query: `
        ALTER TABLE lessons
        ALTER COLUMN topic_lesson_number TYPE TEXT
        USING topic_lesson_number::TEXT;
      `
    });

    if (error) {
      console.error('❌ Error:', error);
      console.log('\n⚠️  The RPC function may not exist. Trying alternative approach...\n');

      // Alternative: try direct query if available
      console.log('ℹ️  Please run this SQL in Supabase SQL Editor:');
      console.log('');
      console.log('ALTER TABLE lessons');
      console.log('ALTER COLUMN topic_lesson_number TYPE TEXT');
      console.log('USING topic_lesson_number::TEXT;');
      console.log('');

      return;
    }

    console.log('✅ Column type updated successfully!');
    console.log('   topic_lesson_number is now TEXT type\n');

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    console.log('\n⚠️  Manual SQL required. Please run this in Supabase SQL Editor:');
    console.log('');
    console.log('ALTER TABLE lessons');
    console.log('ALTER COLUMN topic_lesson_number TYPE TEXT');
    console.log('USING topic_lesson_number::TEXT;');
    console.log('');
  }
}

fixTopicLessonNumberColumn();
