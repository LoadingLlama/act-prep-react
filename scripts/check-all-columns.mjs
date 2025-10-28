import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📋 CHECKING ALL COLUMNS IN PRACTICE_ TABLES\n');
console.log('='.repeat(80));

// Check practice_test_english_passages - ALL COLUMNS
console.log('\n📝 PRACTICE_TEST_ENGLISH_PASSAGES - Sample Passage 1:\n');
const { data: engPassages } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .eq('passage_number', 1)
  .single();

if (engPassages) {
  console.log('ALL COLUMNS:');
  for (const [key, value] of Object.entries(engPassages)) {
    if (typeof value === 'string' && value.length > 200) {
      console.log(`  ${key}: ${value.substring(0, 200)}... (${value.length} chars)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }
} else {
  console.log('❌ No passage found');
}

// Check practice_test_english_questions - ALL COLUMNS
console.log('\n\n📝 PRACTICE_TEST_ENGLISH_QUESTIONS - Sample Question 1:\n');
const { data: engQuestion } = await sb
  .from('practice_test_english_questions')
  .select('*')
  .eq('test_number', 1)
  .eq('question_number', 1)
  .single();

if (engQuestion) {
  console.log('ALL COLUMNS:');
  for (const [key, value] of Object.entries(engQuestion)) {
    if (typeof value === 'string' && value.length > 200) {
      console.log(`  ${key}: ${value.substring(0, 200)}... (${value.length} chars)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }
} else {
  console.log('❌ No question found');
}

// Check practice_test_reading_passages - ALL COLUMNS
console.log('\n\n📖 PRACTICE_TEST_READING_PASSAGES - Sample Passage 1:\n');
const { data: readPassage } = await sb
  .from('practice_test_reading_passages')
  .select('*')
  .eq('test_number', 1)
  .eq('passage_number', 1)
  .single();

if (readPassage) {
  console.log('ALL COLUMNS:');
  for (const [key, value] of Object.entries(readPassage)) {
    if (typeof value === 'string' && value.length > 200) {
      console.log(`  ${key}: ${value.substring(0, 200)}... (${value.length} chars)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }
} else {
  console.log('❌ No passage found');
}

// Check practice_test_science_passages - ALL COLUMNS
console.log('\n\n🔬 PRACTICE_TEST_SCIENCE_PASSAGES - Sample Passage 1:\n');
const { data: sciPassage } = await sb
  .from('practice_test_science_passages')
  .select('*')
  .eq('test_number', 1)
  .eq('passage_number', 1)
  .single();

if (sciPassage) {
  console.log('ALL COLUMNS:');
  for (const [key, value] of Object.entries(sciPassage)) {
    if (typeof value === 'string' && value.length > 200) {
      console.log(`  ${key}: ${value.substring(0, 200)}... (${value.length} chars)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }
} else {
  console.log('❌ No passage found');
}

// Check practice_test_reading_questions - ALL COLUMNS
console.log('\n\n📖 PRACTICE_TEST_READING_QUESTIONS - Sample Question 1:\n');
const { data: readQuestion } = await sb
  .from('practice_test_reading_questions')
  .select('*')
  .eq('test_number', 1)
  .eq('question_number', 1)
  .single();

if (readQuestion) {
  console.log('ALL COLUMNS:');
  for (const [key, value] of Object.entries(readQuestion)) {
    if (typeof value === 'string' && value.length > 200) {
      console.log(`  ${key}: ${value.substring(0, 200)}... (${value.length} chars)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }
} else {
  console.log('❌ No question found');
}

// Check practice_test_science_questions - ALL COLUMNS
console.log('\n\n🔬 PRACTICE_TEST_SCIENCE_QUESTIONS - Sample Question 1:\n');
const { data: sciQuestion } = await sb
  .from('practice_test_science_questions')
  .select('*')
  .eq('test_number', 1)
  .eq('question_number', 1)
  .single();

if (sciQuestion) {
  console.log('ALL COLUMNS:');
  for (const [key, value] of Object.entries(sciQuestion)) {
    if (typeof value === 'string' && value.length > 200) {
      console.log(`  ${key}: ${value.substring(0, 200)}... (${value.length} chars)`);
    } else {
      console.log(`  ${key}: ${value}`);
    }
  }
} else {
  console.log('❌ No question found');
}
