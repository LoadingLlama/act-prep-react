import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const { data: lesson } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'sentence-structure')
  .single();

// Set quiz positions strategically through the lesson
// Lesson structure: Intro → Section 1 (Building Blocks) → Section 2 (Fixing Sentences)
//                 → Section 3 (5 Golden Rules/FANBOYS) → Section 4 (Comma Splice) → Section 5 (Game Plan)
const updates = [
  {
    title: 'Interactive Quiz: Clause Identification',
    newPosition: 5,
    note: 'After Section 1: Understanding the Building Blocks (clauses)'
  },
  {
    title: 'Final Assessment: FANBOYS & Compound Sentences',
    newPosition: 9,
    note: 'After Section 3: The 5 Golden Rules (FANBOYS)'
  },
  {
    title: 'Practice Quiz: Comma Splices & Fragments',
    newPosition: 13,
    note: 'After Section 4: The Dreaded Comma Splice'
  },
  {
    title: 'Final Mastery Test: Sentence Structure',
    newPosition: 999,
    note: 'At the very end after Section 5'
  }
];

for (const update of updates) {
  const { error } = await supabase
    .from('quizzes')
    .update({ position: update.newPosition })
    .eq('lesson_id', lesson.id)
    .eq('title', update.title);
  
  if (error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.log(`✓ "${update.title}"`);
    console.log(`  Position: ${update.newPosition} - ${update.note}`);
  }
}

console.log('\n✅ Quiz positions updated strategically!');
console.log('\nRefresh your browser and check console for "Total text sections" to verify.');
