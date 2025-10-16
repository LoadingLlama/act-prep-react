import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkLessonStyles() {
  // Get the sentence-structure lesson
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'sentence-structure')
    .single();

  if (error) {
    console.error('Error fetching lesson:', error);
    return;
  }

  if (!data) {
    console.log('No lesson found');
    return;
  }

  console.log('Lesson title:', data.title);
  console.log('\n=== CHECKING FOR INLINE STYLES ===\n');

  // Check if content has inline styles
  const content = data.content;

  // Look for style attributes
  const styleMatches = content.match(/style="[^"]*"/g) || [];
  console.log(`Found ${styleMatches.length} inline style attributes`);

  if (styleMatches.length > 0) {
    console.log('\nFirst 5 inline styles:');
    styleMatches.slice(0, 5).forEach((match, i) => {
      console.log(`${i + 1}. ${match}`);
    });
  }

  // Check for styled divs/boxes
  const boxMatches = content.match(/<div[^>]*class="(concept-box|tip-box|example-box|rules-box)"[^>]*>/g) || [];
  console.log(`\nFound ${boxMatches.length} special box elements`);

  if (boxMatches.length > 0) {
    console.log('\nFirst 3 box elements:');
    boxMatches.slice(0, 3).forEach((match, i) => {
      console.log(`${i + 1}. ${match}`);
    });
  }

  // Show first 500 characters of content
  console.log('\n=== FIRST 500 CHARS OF CONTENT ===\n');
  console.log(content.substring(0, 500));

  console.log('\n\n=== LAST 500 CHARS OF CONTENT ===\n');
  console.log(content.substring(content.length - 500));
}

checkLessonStyles();
