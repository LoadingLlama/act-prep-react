import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function findCrossingOut() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'commas')
    .single();

  const content = lesson.content;
  const sections = content.split('<h3>');

  console.log('=== CHECKING WHAT\'S TAUGHT BEFORE QUIZ 1 (Position 5) ===\n');

  // Count H3 sections to find position 5
  console.log('H3 Section breakdown:');
  sections.forEach((section, index) => {
    if (index === 0) {
      console.log(`\nSection 0 (Intro): ${section.length} chars`);
    } else {
      const title = section.split('</h3>')[0];
      console.log(`\nSection ${index}: ${title}`);
      console.log(`  Length: ${section.length} chars`);
    }
  });

  // Find crossing-out trick
  const crossingOutIndex = content.indexOf('Crossing-Out');
  if (crossingOutIndex === -1) {
    console.log('\n❌ PROBLEM: "Crossing-Out" trick NOT FOUND in lesson!');
  } else {
    console.log(`\n✓ "Crossing-Out" trick found at character position ${crossingOutIndex}`);

    // Determine which section it's in
    let charCount = 0;
    let foundInSection = -1;
    for (let i = 0; i < sections.length; i++) {
      charCount += sections[i].length;
      if (crossingOutIndex < charCount) {
        foundInSection = i;
        break;
      }
    }

    console.log(`  → This is in Section ${foundInSection}`);
    console.log(`  → Quiz 1 is at position 5 (appears after ~5 H3 sections)`);

    if (foundInSection < 5) {
      console.log(`  ✅ GOOD: Taught BEFORE quiz`);
    } else {
      console.log(`  ❌ BAD: Taught AFTER quiz!`);
    }
  }

  // Check what quiz 1 actually tests
  const { data: quiz } = await supabase
    .from('quizzes')
    .select(`
      *,
      quiz_questions (
        question_text,
        quiz_options (
          option_text,
          is_correct,
          explanation
        )
      )
    `)
    .eq('lesson_id', lesson.id)
    .eq('position', 5)
    .single();

  console.log('\n=== QUIZ 1 QUESTIONS ===\n');
  quiz.quiz_questions.forEach((q, i) => {
    console.log(`Q${i + 1}: ${q.question_text.substring(0, 100)}...`);
    if (q.question_text.toLowerCase().includes('crossing')) {
      console.log('  ⚠️  This question mentions crossing-out trick!');
    }
  });
}

findCrossingOut();
