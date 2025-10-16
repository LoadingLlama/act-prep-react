import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function getBacksolvingLesson() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'backsolving')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Current Backsolving Lesson:');
  console.log('='.repeat(70));
  console.log(`Title: ${data.title}`);
  console.log(`Content length: ${data.content.length} chars`);
  console.log('='.repeat(70));
  console.log('\nFull Content:\n');
  console.log(data.content);

  // Save to file for easier viewing
  writeFileSync('/tmp/backsolving-current.html', data.content);
  console.log('\n\nSaved to /tmp/backsolving-current.html');
}

getBacksolvingLesson();
