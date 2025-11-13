const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '10fff941-59e1-4d3a-84b7-d0fe8f9985ef'; // Topic 1.4 - Verbs

const questions = require('../../verb-questions-topic-1-4.js');

async function addTopic14Questions() {
  try {
    console.log('Adding 46 practice questions for Topic 1.4 - Verbs...\n');

    let added = 0;
    let errors = 0;

    for (const question of questions) {
      try {
        const { error } = await supabase
          .from('lesson_examples')
          .insert({
            lesson_id: LESSON_ID,
            position: question.position,
            title: question.title,
            problem_text: question.problem_text,
            choices: question.choices,
            correct_answer: question.correct_answer,
            solution_steps: [],
            answer_explanation: question.answer_explanation,
            is_worked_example: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error(`Error adding question ${question.position}:`, error);
          errors++;
        } else {
          added++;
          console.log(`✓ Added: ${question.title}`);
        }
      } catch (err) {
        console.error(`Exception adding question ${question.position}:`, err.message);
        errors++;
      }
    }

    console.log(`\n✓ Complete! Added ${added}/46 questions (${errors} errors)`);

  } catch (err) {
    console.error('Error:', err);
  }
}

addTopic14Questions();
