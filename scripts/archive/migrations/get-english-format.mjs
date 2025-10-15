import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getEnglishFormat() {
  const { data } = await supabase
    .from('lessons')
    .select('lesson_key, content')
    .eq('section', 'english')
    .limit(1)
    .single();

  if (data) {
    console.log('English Lesson Format:\n');
    console.log('Lesson Key:', data.lesson_key);
    console.log('\nContent preview (first 2000 chars):\n');
    console.log(data.content.substring(0, 2000));
  }
}

getEnglishFormat();
