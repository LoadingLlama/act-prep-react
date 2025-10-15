import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixTwoLessonsManual() {
  const lessons = ['geometry-shapes', 'lines'];

  for (const lessonKey of lessons) {
    const { data } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    if (!data) {
      console.log(`❌ ${lessonKey} - not found`);
      continue;
    }

    let content = data.content;

    // Make very conservative changes to avoid "empty or invalid json" error
    // 1. Remove emojis only
    content = content.replace(/🔑/g, '');
    content = content.replace(/📋/g, '');
    content = content.replace(/💡/g, '');
    content = content.replace(/⚠️/g, '');
    content = content.replace(/✓/g, '');
    content = content.replace(/❌/g, '');

    // 2. Reduce large font sizes
    content = content.replace(/font-size: 2rem;/g, 'font-size: 1.2rem;');
    content = content.replace(/font-size: 1.6rem;/g, 'font-size: 1.1rem;');

    // 3. Fix malformed SVG attributes if any
    content = content.replace(/ y1="/g, ' y="');
    content = content.replace(/ x1="/g, ' x="');

    const { error } = await supabase
      .from('lessons')
      .update({ content: content })
      .eq('lesson_key', lessonKey);

    if (error) {
      console.log(`❌ ${lessonKey} - error: ${error.message}`);
    } else {
      console.log(`✓ ${lessonKey} - fixed`);
    }
  }
}

fixTwoLessonsManual();
