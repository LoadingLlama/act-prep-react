/**
 * Check lessons table schema and sample data
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkLessonsSchema() {
  console.log('🔍 Checking lessons table schema...\n');

  try {
    // Get sample lessons
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, section, title')
      .limit(10);

    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }

    console.log('✅ Sample lessons from database:');
    console.log(JSON.stringify(lessons, null, 2));

    console.log('\n📊 ID types:');
    lessons.forEach(lesson => {
      console.log(`  ${lesson.id}: ${typeof lesson.id} (${lesson.title})`);
    });

    // Check if lessons have TEXT ids like "reading-1.1" or UUID
    const hasTextIds = lessons.some(l => typeof l.id === 'string' && l.id.includes('-') && !l.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i));
    const hasUuidIds = lessons.some(l => typeof l.id === 'string' && l.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i));

    console.log('\n📋 ID format analysis:');
    console.log(`  Has TEXT IDs (like "reading-1.1"): ${hasTextIds}`);
    console.log(`  Has UUID IDs: ${hasUuidIds}`);

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

checkLessonsSchema();
