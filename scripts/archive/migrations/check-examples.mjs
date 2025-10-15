/**
 * Check current example format in lessons
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

for (const lesson of data) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`LESSON: ${lesson.lesson_key}`);
  console.log('='.repeat(60));

  // Extract all example sections
  const exampleMatches = lesson.content.match(/<h4[^>]*>Example \d+<\/h4>[\s\S]*?(?=<h[34]|$)/gi);

  if (exampleMatches) {
    exampleMatches.forEach((example, idx) => {
      console.log(`\n--- Example ${idx + 1} ---`);
      console.log(example.substring(0, 500));
      console.log('...\n');
    });
  } else {
    console.log('NO EXAMPLES FOUND!');
  }
}
