import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkGeometryShapes() {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-shapes')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== GEOMETRY SHAPES LESSON ===');
  console.log('Title:', lesson.title);
  console.log('Updated at:', lesson.updated_at);
  console.log('Length:', lesson.content.length);
  console.log('\n=== CONTENT ===\n');
  console.log(lesson.content);
}

checkGeometryShapes();
