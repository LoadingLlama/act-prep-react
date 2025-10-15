/**
 * Find test questions for Lesson 2.1
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findTests() {
  console.log('🔍 Searching for test questions...\n');

  // Check possible test tables
  const possibleTables = ['tests', 'test_questions', 'questions', 'quizzes', 'lesson_tests', 'practice_questions'];

  for (const table of possibleTables) {
    console.log(`Checking table: ${table}`);
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(2);

    if (!error && data) {
      console.log(`✅ Found table: ${table}`);
      console.log(`   Rows: ${data.length}`);
      if (data.length > 0) {
        console.log('   Columns:', Object.keys(data[0]));
        console.log('   Sample:', JSON.stringify(data[0], null, 2).substring(0, 300));
      }
      console.log('');
    }
  }

  // Also check if the lesson content itself contains test HTML that wasn't visible
  console.log('\n📖 Checking lesson content for test section...');
  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (lesson) {
    const content = lesson.content;
    const hasTest = content.toLowerCase().includes('test') && content.toLowerCase().includes('question');
    const hasPractice = content.toLowerCase().includes('practice');

    console.log(`  Contains "test": ${content.toLowerCase().includes('test')}`);
    console.log(`  Contains "practice": ${hasPractice}`);
    console.log(`  Contains "quiz": ${content.toLowerCase().includes('quiz')}`);
    console.log(`  Total length: ${content.length} chars`);

    // Check if there's content after the last example
    const lastExampleIndex = content.lastIndexOf('Example 3');
    const afterExample = content.substring(lastExampleIndex + 2000); // Get text after Example 3
    console.log('\n  Content after Example 3 (preview):');
    console.log(afterExample.substring(0, 500));
  }
}

findTests();
