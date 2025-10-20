import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getAllLessonsOrdered() {
  console.log('📚 COMPLETE LESSON LIST - IN ORDER\n');
  console.log('='.repeat(80));

  const subjects = ['english', 'math', 'reading', 'science'];
  let totalCount = 0;

  for (const subject of subjects) {
    const { data: lessons } = await supabase
      .from('lesson_metadata')
      .select('lesson_key, title')
      .eq('subject', subject)
      .order('order_index');

    console.log(`\n${subject.toUpperCase()} (${lessons?.length || 0} lessons):`);
    console.log('-'.repeat(80));

    if (lessons) {
      lessons.forEach((lesson, index) => {
        console.log(`  ${index + 1}. ${lesson.lesson_key} - ${lesson.title}`);
      });
      totalCount += lessons.length;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`TOTAL: ${totalCount} lessons to revamp\n`);
}

getAllLessonsOrdered().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
