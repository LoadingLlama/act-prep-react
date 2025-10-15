import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

// Fixes needed
const fixes = [
  {
    lessonKey: 'geometry-angles',
    newTitle: 'Geometry Part 1 — Angles'
  },
  {
    lessonKey: 'geometry-shapes',
    newTitle: 'Geometry Part 2 — Shapes'
  },
  {
    lessonKey: 'permutations-combinations',
    newTitle: 'Factorial, Permutations, Combinations, and Organized Counting'
  }
];

async function fixTitles() {
  console.log('\n' + '='.repeat(60));
  console.log('FIXING CHAPTER TITLES');
  console.log('='.repeat(60) + '\n');

  for (const fix of fixes) {
    console.log(`Updating ${fix.lessonKey}...`);
    console.log(`  New title: "${fix.newTitle}"`);

    const { error } = await supabase
      .from('lessons')
      .update({ title: fix.newTitle })
      .eq('lesson_key', fix.lessonKey);

    if (error) {
      console.log(`  ❌ Error: ${error.message}`);
    } else {
      console.log(`  ✅ Updated successfully`);
    }
    console.log('');
  }

  console.log('='.repeat(60));
  console.log('COMPLETE - All titles fixed');
  console.log('='.repeat(60) + '\n');
}

fixTitles();
