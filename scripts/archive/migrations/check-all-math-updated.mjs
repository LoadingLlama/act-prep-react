import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAllMathLessons() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('lesson_key, title, updated_at, content')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Checking ${lessons.length} math lessons:\n`);

  lessons.forEach((lesson, index) => {
    const hasSVG = lesson.content.toLowerCase().includes('<svg');
    const hasVisual = lesson.content.includes('Visual:');
    const hasInlineStyle = lesson.content.includes('style="');
    const hasColorHex = lesson.content.match(/#[0-9a-f]{6}/gi);

    console.log(`[${index + 1}] ${lesson.lesson_key}`);
    console.log(`  Updated: ${lesson.updated_at}`);
    console.log(`  Has SVG: ${hasSVG ? 'YES ⚠️' : 'NO ✓'}`);
    console.log(`  Has "Visual:": ${hasVisual ? 'YES ⚠️' : 'NO ✓'}`);
    console.log(`  Has inline styles: ${hasInlineStyle ? 'YES ⚠️' : 'NO ✓'}`);
    console.log(`  Has color codes: ${hasColorHex ? `YES (${hasColorHex.length}) ⚠️` : 'NO ✓'}`);
    console.log('');
  });
}

checkAllMathLessons();
