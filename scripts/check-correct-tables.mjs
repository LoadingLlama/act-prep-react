import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📋 CHECKING CORRECT TABLE NAMES\n');
console.log('='.repeat(80));

// Check act_english_passages
console.log('\n📝 ACT_ENGLISH_PASSAGES:\n');
const { data: engPassages } = await sb
  .from('act_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

if (engPassages && engPassages.length > 0) {
  engPassages.forEach(p => {
    console.log(`Passage ${p.passage_number}:`);
    console.log(`  Title: ${p.title || 'NO TITLE'}`);
    console.log(`  Content length: ${p.content?.length || 0} chars`);
    console.log(`  First 200 chars: ${p.content?.substring(0, 200) || 'NO CONTENT'}...`);
    console.log('');
  });
} else {
  console.log('❌ No English passages found');
}

// Check act_english_questions
console.log('\n📝 ACT_ENGLISH_QUESTIONS (First 10):\n');
const { data: engQuestions } = await sb
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 1)
  .order('question_number')
  .limit(10);

if (engQuestions && engQuestions.length > 0) {
  engQuestions.forEach(q => {
    console.log(`Question ${q.question_number}:`);
    console.log(`  Question Text: ${q.question_text || 'NO TEXT'}`);
    console.log(`  Question Prompt: ${q.question_prompt || 'NO PROMPT'}`);
    console.log(`  Choice A: ${q.choice_a}`);
    console.log(`  Choice B: ${q.choice_b}`);
    console.log(`  Choice C: ${q.choice_c}`);
    console.log(`  Choice D: ${q.choice_d}`);
    console.log(`  Correct Answer: ${q.correct_answer}`);
    console.log('');
  });
} else {
  console.log('❌ No English questions found');
}

// Check act_reading_passages
console.log('\n📖 ACT_READING_PASSAGES:\n');
const { data: readPassages } = await sb
  .from('act_reading_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

if (readPassages && readPassages.length > 0) {
  readPassages.forEach(p => {
    console.log(`Passage ${p.passage_number}:`);
    console.log(`  Title: ${p.title || 'NO TITLE'}`);
    console.log(`  Content length: ${p.content?.length || 0} chars`);
    console.log('');
  });
} else {
  console.log('❌ No Reading passages found');
}

// Check act_science_passages
console.log('\n🔬 ACT_SCIENCE_PASSAGES:\n');
const { data: sciPassages } = await sb
  .from('act_science_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

if (sciPassages && sciPassages.length > 0) {
  sciPassages.forEach(p => {
    console.log(`Passage ${p.passage_number}:`);
    console.log(`  Title: ${p.title || 'NO TITLE'}`);
    console.log(`  Content length: ${p.content?.length || 0} chars`);
    console.log(`  First 300 chars: ${p.content?.substring(0, 300) || 'NO CONTENT'}...`);
    console.log('');
  });
} else {
  console.log('❌ No Science passages found');
}

// Summary
console.log('\n' + '='.repeat(80));
console.log('📊 SUMMARY:\n');
console.log(`English Passages: ${engPassages?.length || 0}`);
console.log(`English Questions: ${engQuestions?.length || 0} (showing 10)`);
console.log(`Reading Passages: ${readPassages?.length || 0}`);
console.log(`Science Passages: ${sciPassages?.length || 0}`);
