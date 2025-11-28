/**
 * Verify lesson_examples vs practice_questions separation
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lesson IDs
const FRACTIONS_ID = 'a8cd8513-f0a8-4bb1-9890-f21dc053939a';
const EXPONENTS_ID = 'b8c03bf0-99df-460d-be21-0015eebe7920';
const NUMBER_THEORY_ID = '74013e77-3111-4dc6-beca-ff15948e4351';

async function verifySeparation() {
  console.log('🔍 VERIFYING LESSON_EXAMPLES vs PRACTICE_QUESTIONS SEPARATION\n');

  // Check lesson_examples for the 3 migrated math lessons
  console.log('📊 Checking lesson_examples table:');
  const { data: fractionsExamples, error: e1 } = await supabase
    .from('lesson_examples')
    .select('id, lesson_id, position, problem_text')
    .eq('lesson_id', FRACTIONS_ID);

  const { data: exponentsExamples, error: e2 } = await supabase
    .from('lesson_examples')
    .select('id, lesson_id, position, problem_text')
    .eq('lesson_id', EXPONENTS_ID);

  const { data: numberTheoryExamples, error: e3 } = await supabase
    .from('lesson_examples')
    .select('id, lesson_id, position, problem_text')
    .eq('lesson_id', NUMBER_THEORY_ID);

  console.log(`  - Fractions lesson_examples: ${fractionsExamples?.length || 0} rows`);
  console.log(`  - Exponents lesson_examples: ${exponentsExamples?.length || 0} rows`);
  console.log(`  - Number Theory lesson_examples: ${numberTheoryExamples?.length || 0} rows`);

  if ((fractionsExamples?.length || 0) > 0) {
    console.log('    ⚠️  WARNING: Fractions still has lesson_examples (should be empty for practice)');
  }

  // Check practice_questions
  console.log('\n📊 Checking practice_questions table:');
  const { data: fractionsPractice } = await supabase
    .from('practice_questions')
    .select('id, lesson_id, position, problem_text')
    .eq('lesson_id', FRACTIONS_ID);

  const { data: exponentsPractice } = await supabase
    .from('practice_questions')
    .select('id, lesson_id, position, problem_text')
    .eq('lesson_id', EXPONENTS_ID);

  const { data: numberTheoryPractice } = await supabase
    .from('practice_questions')
    .select('id, lesson_id, position, problem_text')
    .eq('lesson_id', NUMBER_THEORY_ID);

  console.log(`  - Fractions practice_questions: ${fractionsPractice?.length || 0} rows`);
  console.log(`  - Exponents practice_questions: ${exponentsPractice?.length || 0} rows`);
  console.log(`  - Number Theory practice_questions: ${numberTheoryPractice?.length || 0} rows`);

  // Get all lessons to identify English lessons
  console.log('\n📊 Finding English lessons:');
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, subject')
    .order('lesson_key');

  const englishLessons = allLessons?.filter(l => l.subject === 'english') || [];
  console.log(`  - Found ${englishLessons.length} English lessons`);

  // Check which English lessons have examples
  let totalEnglishExamples = 0;
  const englishLessonsWithExamples = [];

  for (const lesson of englishLessons.slice(0, 5)) { // Check first 5
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('id, position')
      .eq('lesson_id', lesson.id);

    if (examples && examples.length > 0) {
      englishLessonsWithExamples.push({
        id: lesson.id,
        key: lesson.lesson_key,
        title: lesson.title,
        exampleCount: examples.length
      });
      totalEnglishExamples += examples.length;
    }
  }

  console.log('\n📊 English lessons with examples (first 5):');
  englishLessonsWithExamples.forEach(l => {
    console.log(`  - ${l.key}: "${l.title}" - ${l.exampleCount} examples`);
  });
  console.log(`  - Total examples in first 5 lessons: ${totalEnglishExamples}`);

  // Check total counts
  console.log('\n📊 TOTAL COUNTS:');
  const { data: allExamples, count: examplesCount } = await supabase
    .from('lesson_examples')
    .select('*', { count: 'exact', head: true });

  const { data: allPractice, count: practiceCount } = await supabase
    .from('practice_questions')
    .select('*', { count: 'exact', head: true });

  console.log(`  - Total lesson_examples: ${examplesCount}`);
  console.log(`  - Total practice_questions: ${practiceCount}`);

  console.log('\n✅ Verification complete!');
}

verifySeparation();
