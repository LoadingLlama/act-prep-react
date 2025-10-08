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

// Put all quizzes at the very end
const updates = [
  { title: 'Interactive Quiz: Clause Identification', newPosition: 100 },
  { title: 'Final Assessment: FANBOYS & Compound Sentences', newPosition: 101 },
  { title: 'Practice Quiz: Comma Splices & Fragments', newPosition: 102 },
  { title: 'Final Mastery Test: Sentence Structure', newPosition: 103 }
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
    console.log(`Updated "${update.title}" to position ${update.newPosition}`);
  }
}

console.log('Done - all quizzes moved to end of lesson');
