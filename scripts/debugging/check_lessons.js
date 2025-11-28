/**
 * Check what lessons exist in the database
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkLessons() {
  console.log('📚 Checking lessons in database...\n');

  // Get all lessons
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .order('lesson_key');

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`Total lessons: ${lessons.length}\n`);

  // Group by prefix
  const byPrefix = {};
  lessons.forEach(lesson => {
    const prefix = lesson.lesson_key.split('_')[0];
    if (!byPrefix[prefix]) byPrefix[prefix] = [];
    byPrefix[prefix].push(lesson);
  });

  console.log('📊 Lessons by section:');
  Object.entries(byPrefix).forEach(([prefix, lessonList]) => {
    console.log(`\n${prefix}: ${lessonList.length} lessons`);
    lessonList.slice(0, 3).forEach(l => {
      console.log(`  - ${l.lesson_key}: ${l.title}`);
    });
    if (lessonList.length > 3) {
      console.log(`  ... and ${lessonList.length - 3} more`);
    }
  });

  // Check for specific patterns
  console.log('\n\n🔍 Checking specific patterns:');

  const patterns = [
    "lesson_key LIKE 'english%'",
    "lesson_key LIKE 'math%'",
    "lesson_key LIKE 'reading%'",
    "lesson_key LIKE 'science%'",
    "lesson_key ~ '^english'",
    "lesson_key ~ '^math'",
  ];

  for (const pattern of patterns) {
    const matches = lessons.filter(l => {
      if (pattern.includes('LIKE')) {
        const term = pattern.match(/'([^']+)'/)[1].replace('%', '');
        return l.lesson_key.startsWith(term);
      } else if (pattern.includes('~')) {
        const term = pattern.match(/\'^([^']+)'/)[1];
        return l.lesson_key.startsWith(term);
      }
      return false;
    });
    console.log(`  ${pattern}: ${matches.length} matches`);
  }
}

checkLessons().catch(console.error);
