import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('📦 Creating Supabase backup...\n');

// Backup lessons
const { data: lessons, error: lessonsError } = await supabase
  .from('lessons')
  .select('*')
  .like('lesson_key', '%');

if (lessonsError) {
  console.error('Error backing up lessons:', lessonsError);
} else {
  fs.writeFileSync('backup-lessons.json', JSON.stringify(lessons, null, 2));
  console.log(`✓ Backed up ${lessons.length} lessons`);
}

// Backup lesson examples
const { data: examples, error: examplesError } = await supabase
  .from('lesson_examples')
  .select('*');

if (examplesError) {
  console.error('Error backing up examples:', examplesError);
} else {
  fs.writeFileSync('backup-examples.json', JSON.stringify(examples, null, 2));
  console.log(`✓ Backed up ${examples.length} examples`);
}

console.log('\n✅ Backup complete!');
console.log('Files created:');
console.log('  - backup-lessons.json');
console.log('  - backup-examples.json');
