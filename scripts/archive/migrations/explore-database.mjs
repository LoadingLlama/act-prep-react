/**
 * Explore Supabase Database Schema
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function exploreTables() {
  console.log('🔍 Exploring database schema...\n');

  // Try to query the lessons table
  console.log('📋 Querying lessons table...');
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('*')
    .limit(3);

  if (lessonsError) {
    console.error('❌ Error querying lessons:', lessonsError);
  } else {
    console.log('✅ Lessons table structure:');
    if (lessons && lessons.length > 0) {
      console.log('Columns:', Object.keys(lessons[0]));
      console.log('Sample row:', JSON.stringify(lessons[0], null, 2));
    }
  }

  console.log('\n---\n');

  // Try to find lesson 2.1 specifically
  console.log('🔍 Looking for Lesson 2.1...');
  const { data: lesson21, error: lesson21Error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', '2.1');

  if (lesson21Error) {
    console.error('❌ Error:', lesson21Error);
  } else if (lesson21 && lesson21.length > 0) {
    console.log('✅ Found Lesson 2.1:');
    console.log(JSON.stringify(lesson21[0], null, 2));
  } else {
    // Try different ID formats
    const { data: altSearch } = await supabase
      .from('lessons')
      .select('*')
      .like('id', '%2.1%');

    console.log('🔍 Alternative search results:', altSearch);
  }

  console.log('\n---\n');

  // Check if there's a separate content table
  console.log('🔍 Checking for other content tables...');
  const possibleTables = ['lesson_examples', 'examples', 'problems', 'questions', 'lesson_problems'];

  for (const table of possibleTables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);

    if (!error && data) {
      console.log(`✅ Found table: ${table}`);
      if (data.length > 0) {
        console.log('Columns:', Object.keys(data[0]));
      }
    }
  }
}

exploreTables();
