const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function listMathLessons() {
  const { data, error } = await supabase
    .from('lessons')
    .select('lesson_key, title, topic_title')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Math lessons in database:');
    console.log('Total:', data.length);
    data.forEach((lesson, idx) => {
      console.log(`${idx + 1}. ${lesson.lesson_key} - ${lesson.title} (${lesson.topic_title})`);
    });
  }
}

listMathLessons().catch(console.error);
