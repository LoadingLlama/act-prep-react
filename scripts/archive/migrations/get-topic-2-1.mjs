import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getTopic21() {
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  console.log('Math lessons:');
  lessons.forEach((lesson, index) => {
    console.log(`${index + 1}. ${lesson.title} (ID: ${lesson.id})`);
  });

  const topic21 = lessons.find(l => l.title.includes('2.1'));

  if (topic21) {
    console.log('\n\nTopic 2.1 found:');
    console.log('ID:', topic21.id);
    console.log('Title:', topic21.title);
    console.log('Content length:', topic21.content?.length || 0);
    console.log('\nContent preview (first 1000 chars):');
    console.log(topic21.content?.substring(0, 1000) || 'No content');
  }
}

getTopic21();
