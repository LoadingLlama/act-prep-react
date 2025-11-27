const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyRobustFixes() {
  console.log('Verifying fixes across all lessons...\n');

  // Test samples from different lessons
  const testSamples = [
    { id: '3d06bded-490f-4dc0-bd09-57566f14d8f4', lesson: 'adding-deleting' },
    { id: 'b5130bfe-7cb5-4e6c-baaf-6f61db735ee4', lesson: 'commas' },
    { id: 'ea6c1614-bd47-414e-aae3-98442418f693', lesson: 'logical-placement' },
    { id: 'f6dde1da-2675-4f7b-9142-8b4d2f448de6', lesson: 'logical-placement (pronoun)' }
  ];

  for (const sample of testSamples) {
    const { data } = await supabase
      .from('lesson_examples')
      .select('title, answer_explanation, choices')
      .eq('id', sample.id)
      .single();

    console.log('='.repeat(80));
    console.log(`Lesson: ${sample.lesson}`);
    console.log(`Question: ${data.title}`);
    console.log('\nAnswer Explanation:');
    console.log(data.answer_explanation.substring(0, 400));
    console.log('\nChoice A Explanation:');
    console.log(data.choices[0].explanation.substring(0, 200));
    console.log('\nChoice B Explanation:');
    console.log(data.choices[1].explanation.substring(0, 200));
    console.log('\n');

    // Check for generic patterns
    const hasGeneric =
      data.answer_explanation.includes("doesn't satisfy the requirements") ||
      data.answer_explanation.includes("doesn't best fulfill the requirements") ||
      data.answer_explanation.includes("might seem plausible at first") ||
      data.choices.some(c => c.explanation.includes("doesn't best fulfill"));

    if (hasGeneric) {
      console.log('⚠️  WARNING: Still contains generic explanation patterns!\n');
    } else {
      console.log('✓ Looks good - specific explanations present!\n');
    }
  }

  // Count any remaining generic explanations across ALL lessons
  console.log('='.repeat(80));
  console.log('Scanning ALL questions for any remaining generic patterns...\n');

  const { data: allQuestions } = await supabase
    .from('lesson_examples')
    .select('id, title, answer_explanation, choices')
    .order('id');

  let genericCount = 0;
  const genericQuestions = [];

  for (const q of allQuestions) {
    const hasGenericMain = q.answer_explanation && (
      q.answer_explanation.includes("doesn't satisfy the requirements") ||
      q.answer_explanation.includes("doesn't best fulfill the requirements") ||
      q.answer_explanation.includes("might seem plausible at first")
    );

    const hasGenericChoice = q.choices && q.choices.some(c =>
      c.explanation && (
        c.explanation.includes("doesn't best fulfill") ||
        c.explanation.includes("doesn't satisfy the requirements")
      )
    );

    if (hasGenericMain || hasGenericChoice) {
      genericCount++;
      genericQuestions.push(q.title);
    }
  }

  console.log('='.repeat(80));
  console.log(`Total questions scanned: ${allQuestions.length}`);
  console.log(`Questions with generic explanations: ${genericCount}`);

  if (genericCount > 0) {
    console.log('\n⚠️  Questions still needing fixes:');
    genericQuestions.forEach(title => console.log(`  - ${title}`));
  } else {
    console.log('\n✓ SUCCESS! All explanations are now specific and educational!');
  }
  console.log('='.repeat(80));
}

verifyRobustFixes();
