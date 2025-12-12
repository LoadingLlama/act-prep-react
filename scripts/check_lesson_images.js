const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkLessonImages() {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .limit(5);

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('\n📚 Sample Lesson Data:\n');
    if (data && data.length > 0) {
      console.log('Columns:', Object.keys(data[0]));
      console.log('\nSample lesson:');
      console.log(JSON.stringify(data[0], null, 2));
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

checkLessonImages();
