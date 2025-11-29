const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

// Use SERVICE ROLE KEY to bypass RLS
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function applyBatch2Upgrades() {
  console.log('='.repeat(100));
  console.log('APPLYING BATCH 2 - 100 ACT-AUTHENTIC QUESTION UPGRADES');
  console.log('='.repeat(100));
  console.log();

  // Read the generated replacements
  const data = JSON.parse(fs.readFileSync('/tmp/act_replacements_batch2_generated.json'));

  console.log(`Loaded ${data.replacements.length} replacement questions\n`);
  console.log('Applying updates to database...\n');

  let successful = 0;
  let failed = 0;

  for (let i = 0; i < data.replacements.length; i++) {
    const replacement = data.replacements[i];

    const update = {
      problem_text: replacement.new_problem_text,
      choices: replacement.new_choices,
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

    // Progress indicator every 20 questions
    if ((i + 1) % 20 === 0) {
      console.log(`  Progress: ${i+1}/${data.replacements.length} (${successful} successful, ${failed} failed)`);
    }
  }

  console.log('\n' + '='.repeat(100));
  console.log('BATCH 2 RESULTS:');
  console.log('='.repeat(100));
  console.log(`✅ Successfully upgraded:  ${successful}/${data.replacements.length}`);
  console.log(`❌ Failed:                 ${failed}/${data.replacements.length}`);
  console.log(`📊 Success rate:           ${(successful/data.replacements.length*100).toFixed(1)}%`);
  console.log();
  console.log(`CUMULATIVE PROGRESS:`);
  console.log(`  Batch 1: 53 questions upgraded`);
  console.log(`  Batch 2: ${successful} questions upgraded`);
  console.log(`  Total:   ${53 + successful} / 1412 weak questions (${((53 + successful)/1412*100).toFixed(1)}%)`);
  console.log('='.repeat(100));
}

applyBatch2Upgrades().catch(console.error);
