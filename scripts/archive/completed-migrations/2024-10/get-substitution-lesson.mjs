import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function getLesson() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'substitution')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Lesson Title:', data.title);
  console.log('Lesson Key:', data.lesson_key);
  console.log('Content length:', data.content.length);
  console.log('\n--- Content Preview ---\n');
  console.log(data.content.substring(0, 2000));

  // Save to file for easier viewing
  fs.writeFileSync('/tmp/substitution-current.html', data.content);
  console.log('\n✅ Full content saved to /tmp/substitution-current.html');
}

getLesson();
