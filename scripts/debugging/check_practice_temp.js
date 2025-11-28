const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkPracticeQuestions() {
  console.log('Checking which English lessons have practice questions...\n');

  const { data: lessons, error: lessonError } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .eq('subject', 'english')
    .order('order_index');

  if (lessonError) {
    console.error('Error:', lessonError);
    return;
  }

  console.log('Found ' + lessons.length + ' English lessons\n');

  for (const lesson of lessons) {
    const { data: examples, error: exError } = await supabase
      .from('lesson_examples')
      .select('id, title, position')
      .eq('lesson_id', lesson.id)
      .order('position');

    if (exError) {
      console.error('Error fetching examples for ' + lesson.lesson_key + ':', exError);
      continue;
    }

    const status = examples.length > 0 ? 'YES' : 'NO ';
    console.log('[' + status + '] ' + lesson.lesson_key + ' - ' + lesson.title);
    console.log('      ' + examples.length + ' practice questions');
    if (examples.length > 0) {
      examples.forEach(ex => {
        console.log('      - Position ' + ex.position + ': ' + ex.title);
      });
    }
    console.log('');
  }
}

checkPracticeQuestions();
