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

fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/lesson-1-current.html', lesson.content);
console.log('Saved to lesson-1-current.html');
console.log('Content length:', lesson.content.length);
