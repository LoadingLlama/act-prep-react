/**
 * Remove "Topic X.X - " prefix from all lesson titles in the database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function removePrefixFromLessons() {
  console.log('🔍 Fetching all lessons...');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, lesson_key')
    .order('title');

  if (error) {
    console.error('❌ Error fetching lessons:', error);
    return;
  }

  console.log(`📚 Found ${lessons.length} lessons\n`);

  let updatedCount = 0;

  for (const lesson of lessons) {
    const originalTitle = lesson.title;

    // Remove "Topic X.X - " prefix using regex
    const newTitle = originalTitle.replace(/^Topic\s+[\d.]+\s*-\s*/i, '');

    if (newTitle !== originalTitle) {
      console.log(`✏️  Updating: "${originalTitle}"`);
      console.log(`   → "${newTitle}"`);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({ title: newTitle })
        .eq('id', lesson.id);

      if (updateError) {
        console.error(`   ❌ Error updating lesson ${lesson.lesson_key}:`, updateError);
      } else {
        console.log(`   ✅ Updated successfully\n`);
        updatedCount++;
      }
    } else {
      console.log(`✓ No change needed: "${originalTitle}"`);
    }
  }

  console.log(`\n✨ Complete! Updated ${updatedCount} out of ${lessons.length} lessons`);
}

removePrefixFromLessons();
