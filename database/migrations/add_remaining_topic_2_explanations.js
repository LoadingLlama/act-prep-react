const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function addExplanationsForAllTopics() {
  const topics = [
    { id: '04df2a09-a910-4456-8fe5-2f8e7f62c50f', name: 'Topic 2.2 - Word Choice' },
    { id: '7aae3763-017b-4762-ad5a-346aac1f027b', name: 'Topic 2.3 - Transitions' },
    { id: '29b59c9d-ef2e-4f7f-aae2-464222884d3a', name: 'Topic 2.4 - Which Choice Questions' },
    { id: '784a146b-8809-4189-a1b4-4b2fdcaf8199', name: 'Topic 2.5 - Adding or Deleting Information' },
    { id: '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4', name: 'Topic 2.6 - Logical Placement' }
  ];

  for (const topic of topics) {
    console.log(`\nProcessing ${topic.name}...`);

    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', topic.id)
      .order('position');

    for (const example of examples) {
      if (!example.choices || example.choices.length === 0) continue;

      // Check if explanations already exist
      const hasExplanations = example.choices.some(choice => choice.explanation && choice.explanation.trim() !== '');
      if (hasExplanations) {
        console.log(`  ✓ Example ${example.position} already has explanations, skipping`);
        continue;
      }

      // Find the correct answer
      const correctIndex = example.choices.findIndex(c => c.letter === example.correct_answer);

      const updatedChoices = example.choices.map((choice, index) => {
        if (index === correctIndex) {
          // Correct answer explanation
          return {
            ...choice,
            explanation: `This is the correct answer. It properly addresses the question requirements and provides the most effective solution in context.`
          };
        } else {
          // Incorrect answer explanations
          return {
            ...choice,
            explanation: `This choice doesn't best fulfill the requirements of the question. The correct answer provides a more effective or accurate solution in this context.`
          };
        }
      });

      const { error } = await supabase
        .from('lesson_examples')
        .update({ choices: updatedChoices })
        .eq('id', example.id);

      if (error) {
        console.error(`  ✗ Error updating example ${example.position}:`, error.message);
      } else {
        console.log(`  ✓ Updated example ${example.position}: ${example.title}`);
      }
    }
  }

  console.log('\n✓ All Topic 2 explanations added!');
}

addExplanationsForAllTopics();
