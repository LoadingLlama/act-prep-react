const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkExamplesWithoutExplanations() {
  // Get all lessons with examples
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('subject', 'english')
    .order('title');

  console.log('Checking examples for explanations in English lessons...\n');

  let totalExamples = 0;
  let totalMissing = 0;
  const lessonsMissingExplanations = [];

  for (const lesson of lessons) {
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    if (!examples || examples.length === 0) continue;

    totalExamples += examples.length;

    // Check if any choices are missing explanations
    let missingCount = 0;
    const examplesWithMissing = [];

    for (const example of examples) {
      if (!example.choices) continue;

      let exampleHasMissing = false;
      for (const choice of example.choices) {
        if (!choice.explanation || choice.explanation.trim() === '') {
          missingCount++;
          exampleHasMissing = true;
        }
      }

      if (exampleHasMissing) {
        examplesWithMissing.push({
          position: example.position,
          title: example.title
        });
      }
    }

    if (missingCount > 0) {
      lessonsMissingExplanations.push({
        title: lesson.title,
        id: lesson.id,
        exampleCount: examples.length,
        missingCount,
        examples: examplesWithMissing
      });
      totalMissing += missingCount;
    }
  }

  console.log('Summary:');
  console.log('Total examples:', totalExamples);
  console.log('Total choices missing explanations:', totalMissing);
  console.log('\nLessons with missing explanations:\n');

  lessonsMissingExplanations.forEach(lesson => {
    console.log(`${lesson.title}`);
    console.log(`  ID: ${lesson.id}`);
    console.log(`  Total examples: ${lesson.exampleCount}`);
    console.log(`  Missing: ${lesson.missingCount} choice explanations`);
    console.log('  Examples with missing explanations:');
    lesson.examples.forEach(ex => {
      console.log(`    - Position ${ex.position}: ${ex.title}`);
    });
    console.log('');
  });
}

checkExamplesWithoutExplanations();
