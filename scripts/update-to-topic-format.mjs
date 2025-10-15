import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function updateToTopicFormat() {
  console.log('Fetching all lessons...\n');

  const { data: lessons, error: fetchError } = await supabase
    .from('lessons')
    .select('*')
    .order('lesson_key')
    .limit(5);

  if (fetchError) {
    console.error('❌ Error fetching lessons:', fetchError);
    return;
  }

  console.log(`Found ${lessons.length} lessons\n`);

  // Check lesson structure
  console.log('Sample lesson structure:');
  console.log(JSON.stringify(lessons[0], null, 2));

  console.log('\n✅ Preview complete.');
}

updateToTopicFormat();
