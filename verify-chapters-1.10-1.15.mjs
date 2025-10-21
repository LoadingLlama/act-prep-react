import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function verifyChapters() {
  const lessonKeys = [
    { key: 'redundancy', chapter: '1.10' },
    { key: 'word-choice', chapter: '1.11' },
    { key: 'transitions', chapter: '1.12' },
    { key: 'which-choice', chapter: '1.13' },
    { key: 'adding-deleting', chapter: '1.14' },
    { key: 'logical-placement', chapter: '1.15' }
  ];

  console.log('='.repeat(80));
  console.log('VERIFICATION REPORT: Chapters 1.10 - 1.15');
  console.log('='.repeat(80));
  console.log('');

  for (const lesson of lessonKeys) {
    console.log(`\nChapter ${lesson.chapter} (${lesson.key}):`);
    console.log('-'.repeat(60));

    // Get lesson data
    const { data: lessonData, error: lessonError } = await supabase
      .from('lessons')
      .select('id, content, content_json, migrated_to_json')
      .eq('lesson_key', lesson.key)
      .single();

    if (lessonError || !lessonData) {
      console.log(`❌ ERROR: Could not fetch lesson - ${lessonError?.message}`);
      continue;
    }

    // Check for old HTML wrapper
    const hasOldWrapper = lessonData.content?.includes('<html>') ||
                         lessonData.content?.includes('<body>');

    // Check for new template comment
    const hasNewTemplate = lessonData.content?.includes('LESSON TEMPLATE v4.0');

    // Check content_json
    const hasContentJson = lessonData.content_json !== null;

    // Get example count
    const { count: exampleCount, error: exampleError } = await supabase
      .from('lesson_examples')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', lessonData.id);

    if (exampleError) {
      console.log(`⚠️  Warning: Could not count examples - ${exampleError.message}`);
    }

    // Display results
    console.log(`Content length: ${lessonData.content?.length || 0} chars`);
    console.log(`Old HTML wrapper: ${hasOldWrapper ? '❌ YES (BAD)' : '✓ NO (GOOD)'}`);
    console.log(`New template comment: ${hasNewTemplate ? '✓ YES (GOOD)' : '❌ NO (BAD)'}`);
    console.log(`content_json: ${hasContentJson ? '❌ NOT NULL (BAD)' : '✓ NULL (GOOD)'}`);
    console.log(`migrated_to_json: ${lessonData.migrated_to_json ? '❌ TRUE (BAD)' : '✓ FALSE (GOOD)'}`);
    console.log(`Example count: ${exampleCount || 0} examples`);

    // Overall status
    const isGood = !hasOldWrapper && hasNewTemplate && !hasContentJson &&
                   !lessonData.migrated_to_json && (exampleCount >= 4);

    console.log(`\nOverall Status: ${isGood ? '✓✓✓ GOOD' : '❌❌❌ NEEDS ATTENTION'}`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('END OF VERIFICATION REPORT');
  console.log('='.repeat(80));
}

verifyChapters();
