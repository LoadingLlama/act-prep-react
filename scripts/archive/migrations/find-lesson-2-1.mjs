/**
 * Find Lesson 2.1 in the database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findLesson21() {
  console.log('🔍 Searching for Lesson 2.1...\n');

  // Search for math lessons
  const { data: mathLessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`✅ Found ${mathLessons.length} math lessons\n`);

  // Look for lesson 2.1 specifically
  const lesson21 = mathLessons.find(l =>
    l.lesson_key.includes('2-1') ||
    l.lesson_key.includes('2.1') ||
    l.title.includes('2.1') ||
    l.title.toLowerCase().includes('angles') && l.title.toLowerCase().includes('lines')
  );

  if (lesson21) {
    console.log('🎯 Found Lesson 2.1:');
    console.log('ID:', lesson21.id);
    console.log('Lesson Key:', lesson21.lesson_key);
    console.log('Title:', lesson21.title);
    console.log('Topic:', lesson21.topic_title);
    console.log('Order Index:', lesson21.order_index);
    console.log('\n📄 Content preview:');
    console.log(lesson21.content.substring(0, 500) + '...\n');
  } else {
    console.log('❌ Lesson 2.1 not found. Here are all math lessons:');
    mathLessons.forEach(l => {
      console.log(`  - ${l.order_index}: ${l.lesson_key} - ${l.title}`);
    });
  }
}

findLesson21();
