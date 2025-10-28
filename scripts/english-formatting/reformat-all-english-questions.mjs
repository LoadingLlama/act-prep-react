import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 REFORMATTING ALL 75 ENGLISH QUESTIONS WITH PROPER ACT FORMAT\n');
console.log('='.repeat(80));
console.log('\nThis script will:');
console.log('1. Add underlined portions with subscript numbers to passage_text');
console.log('2. Update question_text to reference those numbers');
console.log('3. Ensure "NO CHANGE" is always first choice (A or F)');
console.log('\n' + '='.repeat(80));

// Get all passages and questions for Test 1
const { data: passages } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

const { data: questions } = await sb
  .from('practice_test_english_questions')
  .select('*')
  .eq('test_number', 1)
  .order('question_number');

console.log(`\nFound ${passages.length} passages and ${questions.length} questions\n`);

// For now, let's show what we're working with
console.log('PASSAGE 1 - Urban Farming:');
console.log('First 500 chars:', passages[0].passage_text.substring(0, 500));
console.log('\nFirst 5 questions:');
questions.slice(0, 5).forEach(q => {
  console.log(`\nQ${q.question_number}: ${q.question_text}`);
  console.log(`  Choices: ${JSON.stringify(q.choices)}`);
  console.log(`  Correct: ${q.correct_answer}`);
});

console.log('\n' + '='.repeat(80));
console.log('\n⚠️  MANUAL WORK REQUIRED:');
console.log('This task requires reading the original PDF to identify:');
console.log('- Which portions of text should be underlined');
console.log('- Where subscript numbers should be placed');
console.log('\nWould you like me to:');
console.log('A) Read Practice ACT 1.pdf to extract the underlined portions');
console.log('B) Create a template for manual entry of underlined portions');
console.log('C) Process a sample passage first to show the approach');
