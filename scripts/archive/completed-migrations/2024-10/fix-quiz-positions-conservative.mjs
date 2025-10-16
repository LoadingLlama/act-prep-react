import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function fixQuizPositions() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'commas')
    .single();

  // Based on section analysis:
  // Section 1 (text 2-5): 4 types overview + crossing-out trick
  // Section 2 (text 6): Unnecessary info
  // Section 3 (text 7): Unnecessary vs necessary
  // Section 4 (text 8-9): Names rule
  // Section 5 (text 10): That/Which
  // Section 6 (text 11-12): ing/ed detailed
  // Section 7 (text 13-14): Prepositional
  // Section 8 (text 15-16): Transitional
  // Section 9 (text 17): Listing intro
  // Section 10 (text 18): Lists
  // Section 11 (text 19-22): Adjectives

  console.log('=== CONSERVATIVE QUIZ POSITIONING ===\n');

  const newPositions = [
    {
      position: 7,
      title: 'Quiz: Basic Unnecessary Information',
      reason: 'After sections 1-3 (intro, crossing-out, unnecessary vs necessary)',
      teaches: 'Crossing-out trick, basic unnecessary information'
    },
    {
      position: 10,
      title: 'Quiz: Names and That/Which',
      reason: 'After sections 4-5 (names rule, that/which)',
      teaches: 'Names rule, that/which phrases'
    },
    {
      position: 16,
      title: 'Quiz: Prepositional & Transitional',
      reason: 'After sections 7-8 (prepositional, transitional)',
      teaches: 'Prepositional phrases, transitional words'
    },
    {
      position: 22,
      title: 'Quiz: Listing & Adjectives',
      reason: 'After sections 9-11 (all listing content)',
      teaches: 'Listing commas, switching trick'
    },
    {
      position: 999,
      title: 'Final Mastery: All Comma Types',
      reason: 'End of lesson',
      teaches: 'Everything'
    }
  ];

  console.log('New conservative positions:\n');
  newPositions.forEach(p => {
    console.log(`Position ${p.position}: ${p.title}`);
    console.log(`  Reason: ${p.reason}`);
    console.log(`  Tests: ${p.teaches}\n`);
  });

  console.log('\n✅ This ensures students learn concepts BEFORE being tested');
  console.log('Each quiz appears well after the relevant content is taught.\n');

  // Update existing quizzes to new positions
  const { data: existingQuizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('position');

  if (existingQuizzes && existingQuizzes.length > 0) {
    console.log(`Updating ${existingQuizzes.length} existing quizzes...\n`);

    for (let i = 0; i < existingQuizzes.length && i < newPositions.length; i++) {
      const quiz = existingQuizzes[i];
      const newPos = newPositions[i];

      const { error } = await supabase
        .from('quizzes')
        .update({
          position: newPos.position,
          title: newPos.title
        })
        .eq('id', quiz.id);

      if (error) {
        console.error(`Error updating ${quiz.title}:`, error);
      } else {
        console.log(`✓ Updated: ${quiz.title} → position ${newPos.position}`);
      }
    }

    console.log('\n✅ All quiz positions updated!');
  } else {
    console.log('No existing quizzes found to update.');
  }
}

fixQuizPositions();
