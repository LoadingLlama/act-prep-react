/**
 * Check current database state - verify what data exists
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Checking current database state...\n');

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function checkDatabase() {
  try {
    // Get total count
    const { count, error: countError } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error counting lessons:', countError.message);
      return;
    }

    console.log(`📊 Total lessons in database: ${count}\n`);

    // Get first few lessons with their content status
    const { data, error } = await supabase
      .from('lessons')
      .select('id, title, section, content')
      .order('order_index')
      .limit(10);

    if (error) {
      console.error('❌ Error fetching lessons:', error.message);
      return;
    }

    console.log('📋 First 10 lessons:\n');
    data.forEach((lesson, i) => {
      const hasContent = lesson.content && lesson.content.length > 0;
      const contentSize = hasContent ? `${(lesson.content.length / 1024).toFixed(1)}KB` : 'EMPTY';
      const status = hasContent ? '✅' : '❌';

      console.log(`${i + 1}. ${status} [${lesson.section}] ${lesson.title}`);
      console.log(`   ID: ${lesson.id}`);
      console.log(`   Content: ${contentSize}`);
      console.log('');
    });

    // Check for lessons with no content
    const { data: emptyLessons, error: emptyError } = await supabase
      .from('lessons')
      .select('id, title')
      .or('content.is.null,content.eq.');

    if (!emptyError && emptyLessons) {
      console.log(`\n⚠️  Lessons with empty content: ${emptyLessons.length}`);
      if (emptyLessons.length > 0) {
        console.log('Empty lessons:');
        emptyLessons.forEach(l => console.log(`   - ${l.id}: ${l.title}`));
      }
    }

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
  }
}

checkDatabase();
