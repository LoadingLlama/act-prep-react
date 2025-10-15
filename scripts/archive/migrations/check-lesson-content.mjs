/**
 * Check lesson content for bold text
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

// Find all <strong> tags
const strongMatches = lessonData.content.match(/<strong>.*?<\/strong>/g);

console.log('Found', strongMatches ? strongMatches.length : 0, 'bold text instances\n');

if (strongMatches && strongMatches.length > 0) {
  console.log('Sample bold text instances:');
  strongMatches.slice(0, 10).forEach((match, idx) => {
    console.log(`${idx + 1}. ${match}`);
  });
}
