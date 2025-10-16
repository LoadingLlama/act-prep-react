import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function analyzeLessonStructure() {
  // Get Sentence Structure lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'sentence-structure')
    .single();

  console.log('=== SENTENCE STRUCTURE LESSON ANALYSIS ===\n');

  // Extract H3 sections
  const sections = lesson.content.split('<h3>');

  sections.forEach((section, index) => {
    if (index === 0) {
      console.log(`Section ${index} (INTRO):`);
      console.log(section.substring(0, 150).replace(/<[^>]*>/g, ' ').trim() + '...\n');
    } else {
      const title = section.split('</h3>')[0];
      console.log(`Section ${index}: ${title}`);
      const content = section.split('</h3>')[1];
      console.log(content.substring(0, 150).replace(/<[^>]*>/g, ' ').trim() + '...\n');
    }
  });

  // Get quizzes
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('position', { ascending: true });

  console.log('\n=== QUIZ POSITIONS ===\n');
  quizzes.forEach(quiz => {
    console.log(`Position ${quiz.position}: ${quiz.title}`);
  });

  console.log('\n=== ALIGNMENT CHECK ===\n');
  console.log('Quiz 1 at position 5 tests: Clause Identification');
  console.log('  → Should come AFTER Section 1 (Understanding the Building Blocks)');
  console.log('  → Section 1 teaches about clauses? Checking...\n');

  console.log('Quiz 2 at position 9 tests: FANBOYS & Compound Sentences');
  console.log('  → Should come AFTER Section 3 (The 5 Golden Rules / FANBOYS)');
  console.log('  → Section 3 teaches FANBOYS? Checking...\n');

  console.log('Quiz 3 at position 13 tests: Comma Splices & Fragments');
  console.log('  → Should come AFTER Section 4 (The Dreaded Comma Splice)');
  console.log('  → Section 4 teaches comma splices? Checking...\n');
}

analyzeLessonStructure();
