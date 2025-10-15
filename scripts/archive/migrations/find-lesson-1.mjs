import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: lessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'math')
  .order('order_index')
  .limit(1);

if (lessons && lessons.length > 0) {
  const lesson = lessons[0];
  console.log('LESSON 1 INFO:');
  console.log('ID:', lesson.id);
  console.log('Title:', lesson.title);
  console.log('Lesson Key:', lesson.lesson_key);
  console.log('Content length:', lesson.content ? lesson.content.length : 'NULL');

  if (lesson.content) {
    fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/lesson-1-actual.html', lesson.content);
    console.log('\nSaved to lesson-1-actual.html');

    // Check for examples
    console.log('\nContains Example 1:', lesson.content.includes('Example 1'));
    console.log('Contains Example 2:', lesson.content.includes('Example 2'));
    console.log('Contains Example 3:', lesson.content.includes('Example 3'));
  }
} else {
  console.log('No lessons found!');
}
