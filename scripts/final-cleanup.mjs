import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function finalCleanup() {
  console.log('\n' + '='.repeat(60));
  console.log('FINAL CLEANUP - Remaining Chapter References');
  console.log('='.repeat(60) + '\n');

  // Get all math lessons
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content')
    .eq('subject', 'math');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${lessons.length} math lessons\n`);

  let updatedCount = 0;

  for (const lesson of lessons) {
    let content = lesson.content;
    let changed = false;

    // Additional replacements
    const replacements = [
      ['first two chapters', 'first two lessons'],
      ['next chapter', 'next lesson'],
      ['previous chapter', 'previous lesson'],
      ['later chapters', 'upcoming lessons'],
      ['earlier chapters', 'previous lessons'],
      ['other chapters', 'other lessons'],
      ['in this chapter', 'in this lesson'],
      ['Chapter ', 'Lesson '], // For standalone "Chapter" references
    ];

    for (const [oldText, newText] of replacements) {
      if (content.includes(oldText)) {
        content = content.replace(new RegExp(oldText, 'g'), newText);
        changed = true;
        console.log(`  ${lesson.lesson_key}: "${oldText}" → "${newText}"`);
      }
    }

    if (changed) {
      const { error: updateError } = await supabase
        .from('lessons')
        .update({ content })
        .eq('id', lesson.id);

      if (updateError) {
        console.error(`  ❌ Error updating ${lesson.lesson_key}:`, updateError);
      } else {
        updatedCount++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`COMPLETE - Updated ${updatedCount} lessons`);
  console.log('='.repeat(60) + '\n');
}

finalCleanup();
