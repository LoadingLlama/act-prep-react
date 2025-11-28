/**
 * Test script to verify practice_questions table data
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lesson IDs for the three migrated lessons
const FRACTIONS_ID = 'a8cd8513-f0a8-4bb1-9890-f21dc053939a';
const EXPONENTS_ID = 'b8c03bf0-99df-460d-be21-0015eebe7920';
const NUMBER_THEORY_ID = '74013e77-3111-4dc6-beca-ff15948e4351';

async function testPracticeQuestions() {
  console.log('🧪 Testing practice_questions table with ANON key (same as frontend)...\n');

  // Test Fractions lesson
  console.log('📊 Testing Fractions lesson:', FRACTIONS_ID);
  const { data: fractionsData, error: fractionsError } = await supabase
    .from('practice_questions')
    .select('*')
    .eq('lesson_id', FRACTIONS_ID)
    .order('position', { ascending: true });

  if (fractionsError) {
    console.error('❌ Error fetching Fractions questions:', fractionsError);
  } else {
    console.log(`✅ Found ${fractionsData.length} Fractions questions`);

    // Check first question
    if (fractionsData.length > 0) {
      const firstQ = fractionsData[0];
      console.log('🔍 First question details:');
      console.log('  - Position:', firstQ.position);
      console.log('  - Difficulty:', firstQ.difficulty);
      console.log('  - Subject:', firstQ.subject);
      console.log('  - Problem text:', firstQ.problem_text.substring(0, 60) + '...');
      console.log('  - Choices type:', typeof firstQ.choices);

      // Test parsing choices (this is what frontend will do)
      let parsedChoices = firstQ.choices;
      if (typeof parsedChoices === 'string') {
        console.log('  - Choices is STRING, parsing...');
        parsedChoices = JSON.parse(parsedChoices);
      } else {
        console.log('  - Choices is already OBJECT/ARRAY');
      }

      console.log('  - Parsed choices:', parsedChoices.map(c => `${c.letter}: ${c.text}`).join(', '));
      console.log('  - Correct answer:', firstQ.correct_answer);
    }
  }

  console.log('\n📊 Testing Exponents and Roots lesson:', EXPONENTS_ID);
  const { data: exponentsData, error: exponentsError } = await supabase
    .from('practice_questions')
    .select('*')
    .eq('lesson_id', EXPONENTS_ID)
    .order('position', { ascending: true });

  if (exponentsError) {
    console.error('❌ Error fetching Exponents questions:', exponentsError);
  } else {
    console.log(`✅ Found ${exponentsData.length} Exponents questions`);
  }

  console.log('\n📊 Testing Number Theory lesson:', NUMBER_THEORY_ID);
  const { data: numberTheoryData, error: numberTheoryError } = await supabase
    .from('practice_questions')
    .select('*')
    .eq('lesson_id', NUMBER_THEORY_ID)
    .order('position', { ascending: true });

  if (numberTheoryError) {
    console.error('❌ Error fetching Number Theory questions:', numberTheoryError);
  } else {
    console.log(`✅ Found ${numberTheoryData.length} Number Theory questions`);
  }

  // Check difficulty distribution
  console.log('\n📊 Checking difficulty distribution for all migrated questions...');
  const { data: allData, error: allError } = await supabase
    .from('practice_questions')
    .select('difficulty, lesson_id')
    .in('lesson_id', [FRACTIONS_ID, EXPONENTS_ID, NUMBER_THEORY_ID]);

  if (!allError && allData) {
    const easyCount = allData.filter(q => q.difficulty === 'easy').length;
    const mediumCount = allData.filter(q => q.difficulty === 'medium').length;
    const hardCount = allData.filter(q => q.difficulty === 'hard').length;

    console.log(`  - Easy: ${easyCount} questions`);
    console.log(`  - Medium: ${mediumCount} questions`);
    console.log(`  - Hard: ${hardCount} questions`);
    console.log(`  - Total: ${allData.length} questions`);
  }

  console.log('\n✅ Test complete!');
}

testPracticeQuestions();
