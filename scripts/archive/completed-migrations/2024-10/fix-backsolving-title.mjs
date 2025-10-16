import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function fixTitle() {
  console.log('Removing "Chapter 1:" from Backsolving lesson title...\\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ title: 'Backsolving' })
    .eq('lesson_key', 'backsolving')
    .select();

  if (error) {
    console.error('❌ Error updating title:', error);
  } else {
    console.log('✅ Successfully updated lesson title!');
    console.log(`   Old title: Chapter 1: Backsolving`);
    console.log(`   New title: ${data[0].title}`);
  }
}

fixTitle();
