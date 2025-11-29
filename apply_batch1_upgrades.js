const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

// Use SERVICE ROLE KEY to bypass RLS
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function applyBatch1Upgrades() {
  console.log('='.repeat(100));
  console.log('APPLYING BATCH 1 - 53 ACT-AUTHENTIC QUESTION UPGRADES');
  console.log('='.repeat(100));
  console.log();

  // Read the fixed replacements
  const data = JSON.parse(fs.readFileSync('/tmp/act_replacements_batch1_fixed.json'));

  console.log(`Loaded ${data.replacements.length} replacement questions\n`);
  console.log('Applying updates to database...\n');

  let successful = 0;
  let failed = 0;

  for (let i = 0; i < data.replacements.length; i++) {
    const replacement = data.replacements[i];

    // Parse choices if they're strings (shouldn't be, but just in case)
    let choices = replacement.new_choices;
    if (typeof choices === 'string') {
      try {
        choices = JSON.parse(choices);
      } catch (e) {
        console.error(`✗ Failed to parse choices for ${replacement.id}`);
        failed++;
        continue;
      }
    }

    const update = {
      problem_text: replacement.new_problem_text,
      choices: choices,
      correct_answer: replacement.correct_answer,
      answer_explanation: replacement.answer_explanation
    };

    const { data: result, error } = await supabase
      .from('practice_questions')
      .update(update)
      .eq('id', replacement.id)
      .select();

    if (error) {
      console.error(`✗ [${i+1}/${data.replacements.length}] Failed: ${replacement.original_text.substring(0, 40)}...`);
      console.error(`  Error: ${error.message}`);
      failed++;
    } else if (result && result.length > 0) {
      console.log(`✓ [${i+1}/${data.replacements.length}] Upgraded: ${result[0].title}`);
      successful++;
    } else {
      console.log(`⚠ [${i+1}/${data.replacements.length}] No rows affected for ${replacement.id}`);
      failed++;
    }

    // Progress indicator every 10 questions
    if ((i + 1) % 10 === 0) {
      console.log(`  Progress: ${i+1}/${data.replacements.length} (${successful} successful, ${failed} failed)`);
    }
  }

  console.log('\n' + '='.repeat(100));
  console.log('BATCH 1 RESULTS:');
  console.log('='.repeat(100));
  console.log(`✅ Successfully upgraded:  ${successful}/${data.replacements.length}`);
  console.log(`❌ Failed:                 ${failed}/${data.replacements.length}`);
  console.log(`📊 Success rate:           ${(successful/data.replacements.length*100).toFixed(1)}%`);
  console.log('='.repeat(100));
}

applyBatch1Upgrades().catch(console.error);
