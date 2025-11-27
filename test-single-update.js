const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSingleUpdate() {
  const testId = '3d06bded-490f-4dc0-bd09-57566f14d8f4'; // adding-deleting question

  console.log('Fetching current data...\n');
  const { data: before } = await supabase
    .from('lesson_examples')
    .select('title, answer_explanation, choices')
    .eq('id', testId)
    .single();

  console.log('BEFORE UPDATE:');
  console.log(`Title: ${before.title}`);
  console.log(`Explanation preview: ${before.answer_explanation.substring(0, 150)}...`);
  console.log(`Choice A explanation: ${before.choices[0].explanation}\n`);

  // Create specific explanation
  const newExplanation = `**Should we add this sentence?** No, because it doesn't fit the paragraph's focus.

• **Choice C is correct**: "No, because it does not relate to the paragraph's discussion of her research methods."
  The paragraph discusses HOW Dr. Martinez researches (her methods), not WHERE she studied (her credentials). Adding information about Harvard Medical School would disrupt the paragraph's focus on research methodology.

• Choice A is wrong: "Yes, because it establishes Dr. Martinez's qualifications."
  This reasoning is flawed - while credentials may be interesting, they don't relate to what the paragraph is actually discussing (research methods).

• Choice B is wrong: "Yes, because it indicates where Dr. Martinez received her training."
  Same problem as Choice A - training location is about credentials, not research methods.

• Choice D is wrong: "No, because it does not indicate what she studied in medical school."
  This reasoning misses the point. The issue isn't that we need MORE detail about medical school - it's that medical school information doesn't belong in a paragraph about research methods at all.

Key principle: Only add information that directly supports the paragraph's main focus. Delete anything that's irrelevant, redundant, or off-topic.`;

  const newChoices = before.choices.map((choice, idx) => {
    const explanations = [
      "While the sentence might establish qualifications, that's not what the paragraph is about. The paragraph discusses her research METHODS, not her credentials. This would introduce irrelevant information.",
      "Same issue as Choice A - training location is about credentials, not research methods. Adding this would disrupt the paragraph's focus.",
      "Correct. The proposed sentence about Harvard Medical School discusses her educational background/credentials, while the paragraph is about her research methodology. These are different topics, so the addition would be off-topic.",
      "This reasoning is backwards. We're not rejecting the sentence because it needs MORE detail about medical school - we're rejecting it because medical school information doesn't belong in a paragraph about research methods."
    ];
    return {
      ...choice,
      explanation: explanations[idx]
    };
  });

  console.log('Attempting update...\n');

  const { data: updateResult, error } = await supabase
    .from('lesson_examples')
    .update({
      answer_explanation: newExplanation,
      choices: newChoices
    })
    .eq('id', testId)
    .select();

  if (error) {
    console.log('❌ UPDATE FAILED:', error);
    return;
  }

  console.log('✓ Update reported success');
  console.log('Update result:', updateResult);

  // Fetch again to verify
  console.log('\nFetching data again to verify...\n');
  const { data: after } = await supabase
    .from('lesson_examples')
    .select('title, answer_explanation, choices')
    .eq('id', testId)
    .single();

  console.log('AFTER UPDATE:');
  console.log(`Title: ${after.title}`);
  console.log(`Explanation preview: ${after.answer_explanation.substring(0, 150)}...`);
  console.log(`Choice A explanation: ${after.choices[0].explanation}\n`);

  // Check if it actually changed
  if (after.answer_explanation === before.answer_explanation) {
    console.log('❌ PROBLEM: Data did NOT change after update!');
  } else {
    console.log('✓ SUCCESS: Data was actually updated!');
  }
}

testSingleUpdate();
