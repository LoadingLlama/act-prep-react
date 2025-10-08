import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function cleanDuplicateQuizzes() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'commas')
    .single();

  // Delete old-style quizzes by their titles
  const oldStyleTitles = [
    'Quiz: Basic Unnecessary Information',
    'Quiz: Names and That/Which',
    'Quiz: Prepositional & Transitional',
    'Quiz: Listing & Adjectives',
    'Final Mastery: All Comma Types'
  ];

  console.log('Deleting old-style quizzes...\n');

  for (const title of oldStyleTitles) {
    const { data, error } = await supabase
      .from('quizzes')
      .delete()
      .eq('lesson_id', lesson.id)
      .eq('title', title)
      .select();

    if (error) {
      console.error(`Error deleting "${title}":`, error);
    } else if (data && data.length > 0) {
      console.log(`✓ Deleted: ${title}`);
    }
  }

  console.log('\n✅ Cleanup complete! Only ACT-style quizzes remain.');
}

cleanDuplicateQuizzes();
