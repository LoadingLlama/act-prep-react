import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function checkScienceLessons() {
  const { data, error } = await supabase
    .from('lessons')
    .select('lesson_key, title, content, migrated_to_json')
    .eq('subject', 'science');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== SCIENCE LESSONS IN DATABASE ===\n');
  data.forEach((lesson, idx) => {
    const hasContent = lesson.content && lesson.content.length > 100;
    const contentPreview = lesson.content ? lesson.content.substring(0, 150).replace(/\s+/g, ' ') : 'NO CONTENT';
    console.log(`${idx + 1}. ${lesson.lesson_key}`);
    console.log(`   Title: ${lesson.title}`);
    console.log(`   Has Content: ${hasContent ? 'YES' : 'NO'}`);
    console.log(`   Migrated: ${lesson.migrated_to_json}`);
    console.log(`   Preview: ${contentPreview}...`);
    console.log('');
  });
}

checkScienceLessons();
