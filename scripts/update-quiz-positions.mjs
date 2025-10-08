import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Get the lesson
const { data: lesson } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'sentence-structure')
  .single();

console.log('Lesson content has', lesson.content.split('</h3>').length - 1, 'h3 sections');
console.log('Lesson content has', lesson.content.split('</h4>').length - 1, 'h4 sections');
console.log('Total approximate sections:', lesson.content.split(/<\/(h3|h4|div class="[^"]*-box")>/).length / 3);

// Update quiz positions to appear later in the lesson
const updates = [
  { title: 'Interactive Quiz: Clause Identification', newPosition: 3 }, // After clauses section
  { title: 'Final Assessment: FANBOYS & Compound Sentences', newPosition: 6 }, // After FANBOYS section
  { title: 'Practice Quiz: Comma Splices & Fragments', newPosition: 9 }, // After comma splices section
  { title: 'Final Mastery Test: Sentence Structure', newPosition: 12 } // At the very end
];

for (const update of updates) {
  const { error } = await supabase
    .from('quizzes')
    .update({ position: update.newPosition })
    .eq('lesson_id', lesson.id)
    .eq('title', update.title);
  
  if (error) {
    console.error(`Error updating ${update.title}:`, error);
  } else {
    console.log(`✓ Updated "${update.title}" to position ${update.newPosition}`);
  }
}

console.log('\n✅ Quiz positions updated!');
