import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function analyzeCommasStructure() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'commas')
    .single();

  console.log('=== COMMAS LESSON STRUCTURE ===\n');

  const sections = lesson.content.split('<h3>');

  sections.forEach((section, index) => {
    if (index === 0) {
      console.log(`Section ${index} (INTRO)`);
    } else {
      const title = section.split('</h3>')[0];
      console.log(`Section ${index}: ${title}`);
    }
  });

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('position', { ascending: true });

  console.log('\n=== QUIZ POSITIONS ===\n');
  quizzes.forEach(quiz => {
    console.log(`Position ${quiz.position}: ${quiz.title}`);
  });

  console.log('\n=== ALIGNMENT ISSUES ===\n');

  console.log('Position 5: Quiz on "Unnecessary Information Commas"');
  console.log('  → Section 3 teaches: Unnecessary Information');
  console.log('  → Position 5 comes AFTER section 3? Need to verify...\n');

  console.log('Position 8: Quiz on "Names and That/Which Rules"');
  console.log('  → Section 4: The Names Rule');
  console.log('  → Section 5: "That" vs. "Which" Phrases');
  console.log('  → Position 8 comes AFTER sections 4-5? Need to verify...\n');

  console.log('Position 12: Quiz on "Prepositional Phrases & Transitional Words"');
  console.log('  → Section 7: Prepositional Phrases');
  console.log('  → Section 8: Transitional Words and Phrases Like "However"');
  console.log('  → Position 12 comes AFTER sections 7-8? Need to verify...\n');

  console.log('Position 16: Quiz on "Listing Commas & Adjectives"');
  console.log('  → Section 9: Listing Commas');
  console.log('  → Section 10: Commas and Lists');
  console.log('  → Section 11: Adjective Lists with and without Commas');
  console.log('  → Position 16 comes AFTER sections 9-11? Need to verify...\n');
}

analyzeCommasStructure();
