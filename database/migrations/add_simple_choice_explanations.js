const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function addSimpleExplanations() {
  try {
    console.log('Fetching all lesson_examples...');

    const { data: examples, error: fetchError } = await supabase
      .from('lesson_examples')
      .select('*');

    if (fetchError) {
      console.error('Error fetching examples:', fetchError);
      return;
    }

    console.log(`Found ${examples.length} examples to process`);

    let updated = 0;
    let skipped = 0;

    for (const example of examples) {
      // Check if choices already have explanations
      if (example.choices && Array.isArray(example.choices)) {
        const hasExplanations = example.choices.some(c => c.explanation);

        if (hasExplanations) {
          skipped++;
          continue;
        }

        // Add simple explanations to each choice
        const updatedChoices = example.choices.map((choice, index) => {
          const isCorrect = choice.letter === example.correct_answer;

          // Generate a simple explanation
          let explanation = '';
          if (isCorrect) {
            explanation = `This choice is correct. It provides the best answer to the question.`;
          } else {
            explanation = `This choice is incorrect because it does not fully address the requirements of the question.`;
          }

          return {
            ...choice,
            explanation: explanation
          };
        });

        // Update the record
        const { error: updateError } = await supabase
          .from('lesson_examples')
          .update({ choices: updatedChoices })
          .eq('id', example.id);

        if (updateError) {
          console.error(`Error updating example ${example.id}:`, updateError);
        } else {
          updated++;
          if (updated % 10 === 0) {
            console.log(`Updated ${updated} examples...`);
          }
        }
      }
    }

    console.log(`\nComplete!`);
    console.log(`Updated: ${updated}`);
    console.log(`Skipped (already had explanations): ${skipped}`);

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

console.log('Adding simple explanations to all practice question choices...');
addSimpleExplanations();
