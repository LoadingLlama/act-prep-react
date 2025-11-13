const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = 'e6153221-e330-4db4-8cc7-9c5a1d51a301'; // Topic 1.7 - Parallel Structure

const questions = require('../../parallel-structure-questions-topic-1-7.js');

async function addTopic17Questions() {
  try {
    console.log('Adding 46 practice questions for Topic 1.7 - Parallel Structure...\n');

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

addTopic17Questions();
