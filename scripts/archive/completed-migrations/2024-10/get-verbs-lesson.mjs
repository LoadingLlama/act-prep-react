import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function getVerbsLesson() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'verbs')
    .single();

  console.log('=== VERBS LESSON ===\n');
  console.log('Title:', lesson.title);
  console.log('Content length:', lesson.content.length, 'chars\n');

  // Extract H3 sections
  const h3Matches = lesson.content.match(/<h3[^>]*>([^<]+)<\/h3>/g) || [];
  console.log(`Found ${h3Matches.length} H3 sections:\n`);

  h3Matches.forEach((h3, i) => {
    const title = h3.replace(/<[^>]*>/g, '');
    console.log(`${i + 1}. ${title}`);
  });
}

getVerbsLesson();
