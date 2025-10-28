import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📊 ANALYZING MATH QUESTIONS - PRACTICE TEST 1\n');
console.log('='.repeat(80));

// Get all math questions for Test 1
const { data: questions, error } = await sb
  .from('practice_test_math_questions')
  .select('*')
  .eq('test_number', 1)
  .order('question_number');

if (error) {
  console.log('❌ Error fetching questions:', error.message);
  process.exit(1);
}

console.log(`\nFound ${questions.length} Math questions\n`);

// Analyze question length distribution
const lengths = questions.map(q => q.question_text.length);
const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
const minLength = Math.min(...lengths);
const maxLength = Math.max(...lengths);

console.log('📏 QUESTION LENGTH DISTRIBUTION:');
console.log(`   Average length: ${avgLength.toFixed(0)} characters`);
console.log(`   Min length: ${minLength} characters`);
console.log(`   Max length: ${maxLength} characters`);

// Group by length ranges
const lengthRanges = {
  'Very Short (< 50 chars)': lengths.filter(l => l < 50).length,
  'Short (50-100 chars)': lengths.filter(l => l >= 50 && l < 100).length,
  'Medium (100-200 chars)': lengths.filter(l => l >= 100 && l < 200).length,
  'Long (200-400 chars)': lengths.filter(l => l >= 200 && l < 400).length,
  'Very Long (> 400 chars)': lengths.filter(l => l >= 400).length
};

console.log('\n📊 LENGTH DISTRIBUTION:');
Object.entries(lengthRanges).forEach(([range, count]) => {
  const percentage = ((count / questions.length) * 100).toFixed(1);
  console.log(`   ${range}: ${count} (${percentage}%)`);
});

// Sample questions from each category
console.log('\n\n' + '='.repeat(80));
console.log('📝 SAMPLE QUESTIONS FROM EACH CATEGORY:\n');

// Very Short
const veryShort = questions.find(q => q.question_text.length < 50);
if (veryShort) {
  console.log('VERY SHORT EXAMPLE (Q' + veryShort.question_number + '):');
  console.log(veryShort.question_text);
  console.log(`Length: ${veryShort.question_text.length} chars\n`);
}

// Short
const shortQ = questions.find(q => q.question_text.length >= 50 && q.question_text.length < 100);
if (shortQ) {
  console.log('SHORT EXAMPLE (Q' + shortQ.question_number + '):');
  console.log(shortQ.question_text);
  console.log(`Length: ${shortQ.question_text.length} chars\n`);
}

// Medium
const mediumQ = questions.find(q => q.question_text.length >= 100 && q.question_text.length < 200);
if (mediumQ) {
  console.log('MEDIUM EXAMPLE (Q' + mediumQ.question_number + '):');
  console.log(mediumQ.question_text);
  console.log(`Length: ${mediumQ.question_text.length} chars\n`);
}

// Long
const longQ = questions.find(q => q.question_text.length >= 200 && q.question_text.length < 400);
if (longQ) {
  console.log('LONG EXAMPLE (Q' + longQ.question_number + '):');
  console.log(longQ.question_text);
  console.log(`Length: ${longQ.question_text.length} chars\n`);
}

// Very Long
const veryLongQ = questions.find(q => q.question_text.length >= 400);
if (veryLongQ) {
  console.log('VERY LONG EXAMPLE (Q' + veryLongQ.question_number + '):');
  console.log(veryLongQ.question_text);
  console.log(`Length: ${veryLongQ.question_text.length} chars\n`);
}

console.log('\n' + '='.repeat(80));
console.log('🔍 FIRST 10 QUESTIONS PREVIEW:\n');

questions.slice(0, 10).forEach(q => {
  console.log(`Q${q.question_number} (${q.question_text.length} chars):`);
  console.log(q.question_text.substring(0, 150) + (q.question_text.length > 150 ? '...' : ''));
  console.log('');
});

console.log('='.repeat(80));
console.log('✅ ANALYSIS COMPLETE');
console.log('='.repeat(80));
