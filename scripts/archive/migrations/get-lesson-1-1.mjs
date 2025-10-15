import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: lesson } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'math-1-1')
  .single();

if (lesson) {
  console.log('Found lesson:', lesson.title);
  fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/lesson-1-1-content.html', lesson.content);
  console.log('Content saved to lesson-1-1-content.html');
}
