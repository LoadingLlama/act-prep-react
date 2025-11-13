const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = 'f7ac1d6c-6416-47fd-9720-807224100517'; // Topic 1.6 - Misplaced Modifiers

const questions = require('../../modifier-questions-topic-1-6.js');

async function addTopic16Questions() {
  try {
    console.log('Adding 46 practice questions for Topic 1.6 - Misplaced Modifiers...\n');

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

addTopic16Questions();
