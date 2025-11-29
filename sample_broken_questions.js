const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function sampleBrokenQuestions() {
  // Sample questions with no choices
  const ids = [
    '86f716f9-dfda-472c-8c2b-0e3fb8d59d64', // Exponential Growth Question 16
    '3b76fb79-10e7-4ece-8fb6-eba97d312756', // Quadratics Practice 41
    '4d65f41e-3ae2-4941-956e-5251f58ecc84'  // Number Theory Practice 5
  ];

  console.log('='.repeat(100));
  console.log('SAMPLE OF BROKEN QUESTIONS (No Choices)');
  console.log('='.repeat(100));

  for (const id of ids) {
    const { data, error } = await supabase
      .from('practice_questions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching ${id}:`, error);
      continue;
    }

    console.log(`\n${'='.repeat(100)}`);
    console.log(`Title: ${data.title}`);
    console.log(`Subject: ${data.subject}`);
    console.log(`Difficulty: ${data.difficulty}`);
    console.log(`Problem: ${data.problem_text}`);
    console.log(`\nChoices type: ${typeof data.choices}`);
    console.log(`Choices value: ${JSON.stringify(data.choices)}`);
    console.log(`\nCorrect Answer: ${data.correct_answer}`);
    console.log(`Answer Explanation: ${data.answer_explanation ? data.answer_explanation.substring(0, 100) + '...' : 'NONE'}`);
    console.log(`Solution Steps: ${data.solution_steps ? JSON.stringify(data.solution_steps).substring(0, 100) + '...' : 'NONE'}`);
  }

  console.log(`\n${'='.repeat(100)}`);
}

sampleBrokenQuestions().catch(console.error);
