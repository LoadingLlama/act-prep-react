const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function getAllLessonsBySubject() {
  console.log('=== ALL LESSONS BY SUBJECT ===\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, subject, lesson_key, title, order_index')
    .order('subject', { ascending: true })
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Group by subject
  const bySubject = {};
  lessons.forEach(lesson => {
    const subject = lesson.subject || 'null';
    if (!bySubject[subject]) {
      bySubject[subject] = [];
    }
    bySubject[subject].push(lesson);
  });

  Object.keys(bySubject).sort().forEach(subject => {
    console.log(`\n${subject.toUpperCase()} (${bySubject[subject].length} lessons):`);
    bySubject[subject].forEach((lesson, idx) => {
      console.log(`  ${idx + 1}. ${lesson.title || lesson.lesson_key}`);
    });
  });

  console.log(`\n\nTotal lessons: ${lessons.length}`);
}

getAllLessonsBySubject().then(() => process.exit(0));
