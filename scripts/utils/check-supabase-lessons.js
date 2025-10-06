// Check what lessons are in Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkLessons() {
  try {
    // Get all lessons
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('*')
      .order('subject', { ascending: true })
      .order('chapter_number', { ascending: true });

    if (error) throw error;

    console.log(`\n✅ Found ${lessons.length} lessons in Supabase\n`);

    // Group by subject
    const bySubject = {};
    lessons.forEach(lesson => {
      if (!bySubject[lesson.subject]) {
        bySubject[lesson.subject] = [];
      }
      bySubject[lesson.subject].push(lesson);
    });

    // Display summary
    Object.keys(bySubject).sort().forEach(subject => {
      console.log(`${subject.toUpperCase()}: ${bySubject[subject].length} lessons`);
      bySubject[subject].forEach(lesson => {
        console.log(`  - ${lesson.chapter_number}. ${lesson.title}`);
      });
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkLessons();
