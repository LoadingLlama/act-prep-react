import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { lessonStructure } from '../src/data/lessonStructure.js';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function applyTopicUnitStructure() {
  console.log('📚 Applying Topic/Unit structure to all lessons...\n');

  const { data: dbLessons, error: fetchError } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, subject')
    .order('lesson_key');

  if (fetchError) {
    console.error('❌ Error fetching lessons:', fetchError);
    return;
  }

  console.log(`Found ${dbLessons.length} lessons in database`);
  console.log(`Found ${lessonStructure.length} lessons in lessonStructure.js\n`);

  let updated = 0;
  let skipped = 0;

  for (const dbLesson of dbLessons) {
    // Find matching lesson in structure
    const structLesson = lessonStructure.find(l => l.id === dbLesson.lesson_key);

    if (!structLesson) {
      console.log(`⚠️  No match found for: ${dbLesson.lesson_key}`);
      skipped++;
      continue;
    }

    // Prepare updates
    const updates = {};
    let titleUpdate = dbLesson.title;

    if (structLesson.chapterNum) {
      // Has a topic number
      const unitNum = structLesson.chapterNum.split('.')[0];

      updates.topic_number = parseInt(unitNum);
      // Skip topic_lesson_number - it's an integer column but we need decimal values
      // The frontend uses chapterNum from lessonStructure.js instead
      updates.topic_title = structLesson.category;
      updates.full_topic_code = `Topic ${structLesson.chapterNum}`;

      // Update title format: "Topic X.X - [Clean Title]"
      // Remove old chapter prefixes
      let cleanTitle = structLesson.title
        .replace(/^Chapter\s+\d+:\s*/i, '')
        .replace(/^Topic\s+[\d.]+\s*-\s*/i, '');

      titleUpdate = `Topic ${structLesson.chapterNum} - ${cleanTitle}`;
      updates.title = titleUpdate;
    } else {
      // No topic number (intro or practice)
      updates.topic_number = null;
      // Skip topic_lesson_number field
      updates.topic_title = structLesson.category;
      updates.full_topic_code = null;

      // Keep title as-is for intro/practice lessons
      let cleanTitle = structLesson.title
        .replace(/^Chapter\s+\d+:\s*/i, '');
      updates.title = cleanTitle;
      titleUpdate = cleanTitle;
    }

    // Apply update
    const { error: updateError } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', dbLesson.id);

    if (updateError) {
      console.error(`❌ Error updating ${dbLesson.lesson_key}:`, updateError.message);
    } else {
      const displayTitle = titleUpdate.length > 60 ? titleUpdate.substring(0, 60) + '...' : titleUpdate;
      console.log(`✅ ${dbLesson.lesson_key}: "${displayTitle}"`);
      updated++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Updated: ${updated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   📝 Total: ${dbLessons.length}`);
}

applyTopicUnitStructure();
