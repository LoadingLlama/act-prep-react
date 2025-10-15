import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_ID = '32cbf6f8-bf7e-4dd8-955e-449814417fff';

async function checkLesson() {
  const { data, error } = await supabase
    .from('lessons')
    .select('content')
    .eq('id', LESSON_ID)
    .single();

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  // Save to file for inspection
  fs.writeFileSync('topic-2-1-current.html', data.content);
  console.log('Content saved to topic-2-1-current.html');

  // Also extract just the parallel lines section
  const parallelSection = data.content.match(/Parallel Lines Cut by a Transversal[\s\S]*?<h4>Example 3/);
  if (parallelSection) {
    console.log('\n=== PARALLEL LINES SECTION ===\n');
    console.log(parallelSection[0].substring(0, 2000));
  }
}

checkLesson();
