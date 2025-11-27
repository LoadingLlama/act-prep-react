const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpdateV2() {
  const testId = '3d06bded-490f-4dc0-bd09-57566f14d8f4';

  // First, verify the ID exists and get current data
  console.log(`Looking for ID: ${testId}\n`);
  const { data: current, error: fetchError } = await supabase
    .from('lesson_examples')
    .select('id, title, answer_explanation')
    .eq('id', testId)
    .single();

  if (fetchError) {
    console.log('Error fetching:', fetchError);
    return;
  }

  console.log('✓ Found question:');
  console.log(`  ID: ${current.id}`);
  console.log(`  Title: ${current.title}`);
  console.log(`  Current explanation starts with: "${current.answer_explanation.substring(0, 80)}..."\n`);

  // Try a simple update WITHOUT .select()
  const testExplanation = `TEST UPDATE ${Date.now()} - This is a test to see if updates work`;

  console.log('Attempting update without .select()...\n');
  const { error: updateError } = await supabase
    .from('lesson_examples')
    .update({ answer_explanation: testExplanation })
    .eq('id', testId);

  if (updateError) {
    console.log('❌ Update error:', updateError);
    return;
  }

  console.log('✓ Update command completed without error\n');

  // Fetch again to check if it actually changed
  console.log('Fetching again to verify...\n');
  const { data: after } = await supabase
    .from('lesson_examples')
    .select('id, title, answer_explanation')
    .eq('id', testId)
    .single();

  console.log(`After update, explanation starts with: "${after.answer_explanation.substring(0, 80)}..."\n`);

  if (after.answer_explanation.includes('TEST UPDATE')) {
    console.log('✓✓✓ SUCCESS! The update actually worked!');
    console.log('    This means updates DO work, so the issue in robust-fix is something else.\n');

    // Restore original
    console.log('Restoring original content...');
    await supabase
      .from('lesson_examples')
      .update({ answer_explanation: current.answer_explanation })
      .eq('id', testId);
    console.log('✓ Restored\n');
  } else {
    console.log('❌❌❌ FAILED! The update did NOT persist.');
    console.log('    There may be an RLS policy or permission issue.\n');
  }
}

testUpdateV2();
