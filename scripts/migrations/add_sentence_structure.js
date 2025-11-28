const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function addQuestions() {
  const questions = JSON.parse(fs.readFileSync('english_questions.json', 'utf8'));

  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'sentence-structure')
    .single();

  const q = questions[0];
  const choices = q.choices.map(c => ({ letter: c.charAt(0), text: c.substring(3).trim() }));

  const { error } = await supabase.from('lesson_examples').insert({
    lesson_id: lesson.id,
    position: 5,
    title: 'Practice Question 6',
    problem_text: q.question_text,
    choices,
    correct_answer: q.correct_answer,
    solution_steps: [],
    answer_explanation: q.explanation || '',
    is_worked_example: false
  });

  if (error) console.error('Error:', error);
  else console.log('✓ Added 1 question to sentence-structure');
}

addQuestions();
