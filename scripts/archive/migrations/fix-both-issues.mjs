/**
 * Fix quiz position and check example choices
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     FIXING QUIZ POSITION & CHECKING EXAMPLES             ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'geometry-angles')
  .single();

// 1. Fix quiz position
console.log('1️⃣  FIXING QUIZ POSITION\n');

const { data: quiz } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id)
  .single();

console.log('Current position:', quiz.position);
console.log('Updating to: 9 (bottom of lesson)\n');

const { error: updateError } = await supabase
  .from('quizzes')
  .update({ position: 9 })
  .eq('id', quiz.id);

if (updateError) {
  console.error('❌ Error:', updateError);
} else {
  console.log('✅ Quiz position updated to 9\n');
}

// 2. Check example choices
console.log('2️⃣  CHECKING EXAMPLE ANSWER CHOICES\n');

const content = lessonData.content;

// Find Example 1
const example1Match = content.match(/<h4[^>]*>Example 1<\/h4>([\s\S]{0,2000})/i);

if (example1Match) {
  const example1Content = example1Match[1];

  // Check for answer choices (looking for <span> with A-E)
  const choicesMatch = example1Content.match(/<span[^>]*>[A-E]\./g);

  if (choicesMatch && choicesMatch.length > 0) {
    console.log(`✅ Example 1 has ${choicesMatch.length} answer choices`);

    // Show a preview
    const preview = example1Content.substring(0, 500);
    console.log('\nPreview of Example 1:');
    console.log(preview.replace(/<[^>]+>/g, '').substring(0, 200) + '...\n');
  } else {
    console.log('❌ Example 1 does NOT have answer choices\n');
    console.log('This is likely because the content was rewritten without them.\n');
  }
} else {
  console.log('❌ Could not find Example 1 in lesson content\n');
}

console.log('✅ Done!');
