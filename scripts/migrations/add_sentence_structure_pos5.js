const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function addPosition5() {
  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac'; // sentence-structure

  const question = {
    lesson_id: lessonId,
    position: 5,
    title: 'Fragment: Missing Subject',
    problem_text: 'During the storm last night, <u>was raining</u> heavily for three hours.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'it was raining' },
      { letter: 'C', text: 'raining' },
      { letter: 'D', text: 'had rained' }
    ],
    correct_answer: 'B',
    solution_steps: [],
    answer_explanation: 'The sentence needs a subject. "It was raining" provides the necessary subject "it" to complete the sentence.',
    is_worked_example: false
  };

  const { error } = await supabase.from('lesson_examples').insert(question);

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('✓ Added position 5 to sentence-structure');
  }
}

addPosition5();
