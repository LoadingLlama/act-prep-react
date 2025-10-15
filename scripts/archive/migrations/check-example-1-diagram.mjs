/**
 * Check Example 1 Diagram - Is it there?
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkExample1() {
  console.log('🔍 Checking Example 1 for diagram...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  // Find Example 1
  const ex1Match = content.match(/<h4[^>]*>Example 1<\/h4>([\s\S]*?)(?=<h4|$)/);

  if (!ex1Match) {
    console.log('❌ Could not find Example 1');
    return;
  }

  const ex1Content = ex1Match[1];
  console.log('📊 Example 1 Analysis:\n');
  console.log(`Length: ${ex1Content.length} characters`);
  console.log(`Has <svg>: ${ex1Content.includes('<svg') ? '✅ YES' : '❌ NO'}`);
  console.log(`Has "Problem:": ${ex1Content.includes('Problem:') ? '✅' : '❌'}`);
  console.log(`Has "Solution:": ${ex1Content.includes('Solution:') ? '✅' : '❌'}`);
  console.log(`Has "Answer:": ${ex1Content.includes('Answer:') ? '✅' : '❌'}`);

  // Show the structure
  console.log('\n📝 Example 1 Content Structure:\n');

  // Show first 1000 chars
  console.log(ex1Content.substring(0, 1500));
  console.log('\n...\n');
}

checkExample1();
