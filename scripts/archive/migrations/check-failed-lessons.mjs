import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkFailedLessons() {
  const lessons = ['geometry-shapes', 'lines'];

  for (const lessonKey of lessons) {
    const { data, error } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    console.log(`\nLesson: ${lessonKey}`);
    console.log('='.repeat(60));

    if (error) {
      console.log('Error fetching:', error.message);
      continue;
    }

    if (!data) {
      console.log('No data found');
      continue;
    }

    console.log('Content length:', data.content.length);
    console.log('Has content:', !!data.content);
    console.log('\nFirst 500 characters:');
    console.log(data.content.substring(0, 500));

    // Check for problematic characters
    const hasNullBytes = data.content.includes('\0');
    const hasBackslashes = data.content.includes('\\');
    const hasQuotes = data.content.includes('"');

    console.log('\nCharacter checks:');
    console.log('  Null bytes:', hasNullBytes);
    console.log('  Backslashes:', hasBackslashes);
    console.log('  Double quotes:', hasQuotes);
  }
}

checkFailedLessons();
