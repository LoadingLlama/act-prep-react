import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function verifyLessonUpdates() {
  console.log('\n' + '='.repeat(60));
  console.log('VERIFYING LESSON UPDATES');
  console.log('='.repeat(60) + '\n');

  // Check a few sample lessons
  const sampleKeys = ['backsolving', 'geometry-angles', 'trigonometry'];

  for (const key of sampleKeys) {
    const { data, error } = await supabase
      .from('lessons')
      .select('lesson_key, title, content')
      .eq('lesson_key', key)
      .single();

    if (error) {
      console.error(`Error getting ${key}:`, error);
      continue;
    }

    console.log(`\nLesson: ${data.title}`);
    console.log('-'.repeat(60));

    // Check for book references
    const bookReferences = [
      'this book',
      'the book',
      'throughout the book',
      'work through the rest of the book'
    ];

    let hasBookRefs = false;
    for (const ref of bookReferences) {
      if (data.content.toLowerCase().includes(ref)) {
        console.log(`  ❌ Still contains: "${ref}"`);
        hasBookRefs = true;
      }
    }

    if (!hasBookRefs) {
      console.log(`  ✅ No book references found`);
    }

    // Check for images
    const imageCount = (data.content.match(/<img/g) || []).length;
    console.log(`  📷 Images found: ${imageCount}`);

    // Show first 500 chars
    console.log('\n  First 500 chars:');
    console.log('  ' + data.content.substring(0, 500).replace(/\n/g, '\n  '));
  }

  console.log('\n' + '='.repeat(60));
  console.log('VERIFICATION COMPLETE');
  console.log('='.repeat(60) + '\n');
}

verifyLessonUpdates();
