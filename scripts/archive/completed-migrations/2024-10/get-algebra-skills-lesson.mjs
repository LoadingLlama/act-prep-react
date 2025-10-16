import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function getAlgebraSkillsLesson() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'algebra-skills')
    .single();

  if (lesson) {
    console.log('Full Algebra Skills Lesson Content:');
    console.log('=====================================\n');
    console.log(lesson.content);

    // Save to file for easier editing
    fs.writeFileSync('/tmp/algebra-skills-current.txt', lesson.content);
    console.log('\n\nSaved to /tmp/algebra-skills-current.txt');
  }
}

getAlgebraSkillsLesson();
