const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getSentenceStructureQuestions() {
  try {
    // Get sentence structure lesson
    const { data: lessons, error: lessonError } = await supabase
      .from('lessons')
      .select('id, title')
      .ilike('title', '%sentence%structure%');

    if (lessonError) {
      console.error('Error fetching lessons:', lessonError);
      return;
    }

    console.log('Found lessons:', lessons);

    if (lessons.length === 0) {
      console.log('No sentence structure lessons found');
      return;
    }

    const lessonIds = lessons.map(l => l.id);

    // Get all examples for sentence structure lessons
    const { data, error } = await supabase
      .from('lesson_examples')
      .select('*')
      .in('lesson_id', lessonIds)
      .order('position', { ascending: true });

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log(`\nFound ${data.length} sentence structure questions\n`);

    // Output as JSON for easy processing
    console.log(JSON.stringify(data, null, 2));

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

getSentenceStructureQuestions();
