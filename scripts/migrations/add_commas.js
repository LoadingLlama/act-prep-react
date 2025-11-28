const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function addQuestions() {
  const questions = JSON.parse(fs.readFileSync('english_questions.json', 'utf8'));

  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'commas')
    .single();

  // Find missing position
  const { data: existing } = await supabase
    .from('lesson_examples')
    .select('position')
    .eq('lesson_id', lesson.id)
    .order('position');

  const positions = existing.map(e => e.position);
  let missingPos = null;
  for (let i = 0; i <= 50; i++) {
    if (!positions.includes(i)) {
      missingPos = i;
      break;
    }
  }

  console.log('Adding to position:', missingPos);

  const q = questions[1];
  const choices = q.choices.map(c => ({ letter: c.charAt(0), text: c.substring(3).trim() }));

  const { error } = await supabase.from('lesson_examples').insert({
    lesson_id: lesson.id,
    position: missingPos,
    title: `Practice Question ${missingPos + 1}`,
    problem_text: q.question_text,
    choices,
    correct_answer: q.correct_answer,
    solution_steps: [],
    answer_explanation: q.explanation || '',
    is_worked_example: false
  });

  if (error) console.error('Error:', error);
  else console.log('✓ Added 1 question to commas');
}

addQuestions();
