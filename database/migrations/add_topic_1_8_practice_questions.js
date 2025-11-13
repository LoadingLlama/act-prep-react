const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16'; // Topic 1.8 - Miscellaneous Topics

const questions = require('../../miscellaneous-questions-topic-1-8.js');

async function addTopic18Questions() {
  try {
    console.log('Adding 44 practice questions for Topic 1.8 - Miscellaneous Topics...\n');

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

    console.log(`\n✓ Complete! Added ${added}/44 questions (${errors} errors)`);

  } catch (err) {
    console.error('Error:', err);
  }
}

addTopic18Questions();
