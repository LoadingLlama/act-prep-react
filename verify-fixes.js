const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyFixes() {
  // Check a few fixed questions
  const testIds = [
    '3d06bded-490f-4dc0-bd09-57566f14d8f4', // adding-deleting
    'b5130bfe-7cb5-4e6c-baaf-6f61db735ee4', // commas
    '7faec793-cbd2-4e65-81a9-940c4a1ee2d5'  // word-choice (from earlier fix)
  ];

  for (const id of testIds) {
    const { data } = await supabase
      .from('lesson_examples')
      .select('title, answer_explanation, choices')
      .eq('id', id)
      .single();

    console.log(`\n${'='.repeat(80)}`);
    console.log(`Question: ${data.title}`);
    console.log(`\nExplanation:\n${data.answer_explanation.substring(0, 300)}...`);
    console.log(`\nFirst choice explanation:\n${data.choices[0].explanation.substring(0, 200)}...`);
  }
}

verifyFixes();
