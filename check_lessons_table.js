const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkLessonsTable() {
  console.log('=== CHECKING LESSONS TABLE ===\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (lessons && lessons.length > 0) {
    console.log('Available columns in lessons table:');
    console.log(Object.keys(lessons[0]).join(', '));
    console.log('\nSample lesson:');
    console.log(JSON.stringify(lessons[0], null, 2));
  } else {
    console.log('No lessons found in database');
  }

  // Count total lessons
  const { count } = await supabase
    .from('lessons')
    .select('*', { count: 'exact', head: true });

  console.log(`\nTotal lessons in database: ${count}`);
}

checkLessonsTable().then(() => process.exit(0));
