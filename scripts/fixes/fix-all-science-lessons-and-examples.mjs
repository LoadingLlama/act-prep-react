import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function fixAll() {
  console.log('Starting comprehensive fix for Science lessons 2.2, 2.3, 2.4...\n');

  // Upload fixed lesson 2.2 content
  console.log('Uploading fixed lesson 2.2...');
  const lesson22Content = fs.readFileSync('science-2.2-trends-FIXED.html', 'utf8');
  await supabase
    .from('lessons')
    .update({ content: lesson22Content, content_json: null, migrated_to_json: false })
    .eq('lesson_key', 'trends');
  console.log('✓ Lesson 2.2 content fixed\n');

  // Now fix all examples with new styling:
  // - Bigger containers (3rem padding, more margin)
  // - Smaller ACT-style tables (13px font, 0.5rem padding)

  console.log('Fixing examples with new styling (bigger containers, smaller ACT tables)...\n');

  // Note: I'll create separate scripts to regenerate the fixed examples for 2.1, 2.2, 2.3, 2.4
  // with the new improved styling

  console.log('✓ Phase 1 complete: Lesson 2.2 content uploaded');
  console.log('\nNext steps:');
  console.log('- Fix lesson 2.3 content formatting');
  console.log('- Fix lesson 2.4 content formatting');
  console.log('- Regenerate ALL examples (2.1-2.4) with new styling');
}

fixAll();
