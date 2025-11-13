/**
 * Check for mismatches between lesson IDs and lesson_examples
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function main() {
  console.log('🔍 Checking lesson_examples references...\n');

  // Get all lessons
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, title, section');

  if (lessonsError) {
    console.error('❌ Error fetching lessons:', lessonsError.message);
    return;
  }

  const lessonIds = new Set(lessons.map(l => l.id));
  console.log(`📚 Total lessons: ${lessons.length}`);
  console.log(`📋 Lesson IDs: ${Array.from(lessonIds).slice(0, 10).join(', ')}...\n`);

  // Get all lesson_examples
  const { data: examples, error: examplesError } = await supabase
    .from('lesson_examples')
    .select('*');

  if (examplesError) {
    console.error('❌ Error fetching lesson_examples:', examplesError.message);
    return;
  }

  console.log(`📝 Total lesson_examples: ${examples.length}\n`);

  // Check for mismatches
  const mismatches = examples.filter(ex => !lessonIds.has(ex.lesson_id));

  if (mismatches.length > 0) {
    console.log(`❌ Found ${mismatches.length} examples with invalid lesson_id references\n`);

    // Group by lesson_id
    const grouped = {};
    mismatches.forEach(ex => {
      if (!grouped[ex.lesson_id]) {
        grouped[ex.lesson_id] = [];
      }
      grouped[ex.lesson_id].push(ex);
    });

    console.log('Invalid lesson_id values and their counts:');
    Object.entries(grouped).forEach(([badId, exs]) => {
      console.log(`   "${badId}": ${exs.length} examples`);
    });

    console.log('\n📋 Sample mismatched examples:');
    mismatches.slice(0, 10).forEach(ex => {
      console.log(`   - lesson_id: "${ex.lesson_id}" | example: ${ex.question_text ? ex.question_text.substring(0, 60) + '...' : 'N/A'}`);
    });

    // Try to find potential matches
    console.log('\n💡 Potential fixes needed:');
    const uniqueBadIds = Object.keys(grouped);
    uniqueBadIds.slice(0, 10).forEach(badId => {
      // Look for similar lesson IDs
      const similar = lessons.filter(l =>
        l.id.includes(badId) ||
        badId.includes(l.id) ||
        l.title.toLowerCase().includes(badId.toLowerCase())
      );

      if (similar.length > 0) {
        console.log(`   "${badId}" might map to:`);
        similar.forEach(s => console.log(`      → "${s.id}" (${s.title})`));
      } else {
        console.log(`   "${badId}" → No obvious match found`);
      }
    });

  } else {
    console.log('✅ All lesson_examples have valid lesson_id references!\n');
  }

  // Show valid examples
  const valid = examples.filter(ex => lessonIds.has(ex.lesson_id));
  console.log(`\n✅ ${valid.length} examples have valid references`);
}

main();
