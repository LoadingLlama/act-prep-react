const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

async function deleteGenericQuestions() {
  console.log('='.repeat(80));
  console.log('DELETING QUESTIONS WITH GENERIC PLACEHOLDER TEXT');
  console.log('='.repeat(80));

  const questionsToDelete = [
    { lesson: 'adding-deleting', position: 46, reason: 'Contains generic placeholder text in underlined portion' },
    { lesson: 'adding-deleting', position: 47, reason: 'Entire first paragraph is placeholder text' },
    { lesson: 'logical-placement', position: 20, reason: 'Contains duplicate placeholder text, incomplete passage' }
  ];

  let deleted = 0;

  for (const { lesson, position, reason } of questionsToDelete) {
    console.log(`\nDeleting ${lesson} Position ${position}`);
    console.log(`Reason: ${reason}`);

    const { data: lessonData } = await supabase.from('lessons').select('id').eq('lesson_key', lesson).single();
    const { data: q } = await supabase.from('lesson_examples').select('id, title').eq('lesson_id', lessonData.id).eq('position', position).single();

    if (q) {
      const { error } = await supabase.from('lesson_examples').delete().eq('id', q.id);
      if (error) {
        console.log(`  ✗ Failed: ${error.message}`);
      } else {
        console.log(`  ✓ Deleted: ${q.title}`);
        deleted++;
      }
    } else {
      console.log(`  ⚠️  Not found`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`✓ Successfully deleted ${deleted}/${questionsToDelete.length} questions`);
  console.log('='.repeat(80));
}

deleteGenericQuestions();
