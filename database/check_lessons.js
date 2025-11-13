const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkLessons() {
  try {
    // Get all lessons
    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching lessons:', error);
      return;
    }

    if (!lessons || lessons.length === 0) {
      console.log('No lessons found');
      return;
    }

    console.log('Found', lessons.length, 'lessons:\n');

    // For each lesson, count practice questions
    for (const lesson of lessons) {
      const { count } = await supabase
        .from('lesson_examples')
        .select('*', { count: 'exact', head: true })
        .eq('lesson_id', lesson.id);

      console.log(`${lesson.title}`);
      console.log(`  ID: ${lesson.id}`);
      console.log(`  Practice questions: ${count || 0}`);
      console.log('');
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

checkLessons();
