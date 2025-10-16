import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function fixAllTitles() {
  console.log('Fetching all math lessons...\\n');

  const { data: lessons, error: fetchError } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, subject')
    .eq('subject', 'math')
    .order('lesson_key');

  if (fetchError) {
    console.error('❌ Error fetching lessons:', fetchError);
    return;
  }

  console.log(`Found ${lessons.length} math lessons\\n`);

  let updated = 0;
  for (const lesson of lessons) {
    // Remove "Chapter X: " or "Chapter X — " prefix
    const cleanTitle = lesson.title.replace(/^Chapter \d+[:\u2014]\s*/i, '');

    if (cleanTitle !== lesson.title) {
      console.log(`Updating: "${lesson.title}" → "${cleanTitle}"`);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({ title: cleanTitle })
        .eq('id', lesson.id);

      if (updateError) {
        console.error(`  ❌ Error: ${updateError.message}`);
      } else {
        console.log(`  ✅ Updated`);
        updated++;
      }
    }
  }

  console.log(`\\n✅ Updated ${updated} lesson titles`);
}

fixAllTitles();
