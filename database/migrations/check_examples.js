/**
 * Check examples and their lesson_id references
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function main() {
  console.log('🔍 Checking lesson IDs and examples...\n');

  // Get all lesson IDs
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, title, section')
    .order('order_index');

  if (lessonsError) {
    console.error('❌ Error fetching lessons:', lessonsError.message);
    return;
  }

  console.log(`📚 Total lessons: ${lessons.length}\n`);
  console.log('First 20 lesson IDs:');
  lessons.slice(0, 20).forEach((lesson, i) => {
    console.log(`   ${(i + 1).toString().padStart(2)}) ${lesson.id.padEnd(30)} [${lesson.section}] ${lesson.title}`);
  });

  // Check if examples table exists
  const { data: examples, error: examplesError } = await supabase
    .from('examples')
    .select('id, lesson_id, title')
    .limit(10);

  if (examplesError) {
    console.log('\n⚠️  Examples table error:', examplesError.message);
    return;
  }

  console.log(`\n📝 Total examples found: checking references...\n`);

  // Get all examples with their lesson references
  const { data: allExamples, error: allExError } = await supabase
    .from('examples')
    .select('id, lesson_id, title');

  if (!allExError && allExamples) {
    console.log(`📊 Total examples: ${allExamples.length}\n`);

    // Find mismatched lesson_ids
    const lessonIds = new Set(lessons.map(l => l.id));
    const mismatches = allExamples.filter(ex => !lessonIds.has(ex.lesson_id));

    if (mismatches.length > 0) {
      console.log(`❌ Found ${mismatches.length} examples with invalid lesson_id references:\n`);

      // Group by lesson_id to see patterns
      const grouped = {};
      mismatches.forEach(ex => {
        if (!grouped[ex.lesson_id]) {
          grouped[ex.lesson_id] = [];
        }
        grouped[ex.lesson_id].push(ex);
      });

      Object.keys(grouped).slice(0, 10).forEach(badId => {
        console.log(`   Invalid lesson_id: "${badId}" (${grouped[badId].length} examples)`);
        console.log(`      Examples: ${grouped[badId].slice(0, 3).map(e => e.title).join(', ')}`);
      });

      console.log('\n💡 These examples reference lessons that don\'t exist.');
      console.log('   We need to either update the lesson IDs or fix the examples.\n');
    } else {
      console.log('✅ All examples have valid lesson_id references!\n');
    }
  }
}

main();
