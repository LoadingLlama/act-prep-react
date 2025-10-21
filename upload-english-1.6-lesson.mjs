import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

const htmlContent = fs.readFileSync('restructured-english-1.6-v1.html', 'utf-8');

const { error } = await supabase
  .from('lessons')
  .update({ content: htmlContent, content_json: null, migrated_to_json: false })
  .eq('lesson_key', 'misplaced-modifiers');

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log('✅ Topic 1.6 - Misplaced Modifiers uploaded!');
