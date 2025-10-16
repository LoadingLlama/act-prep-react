import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function getLesson() {
  const { data } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  console.log('Current geometry-angles content:');
  console.log('=================================\n');
  console.log(data.content);
}

getLesson();
