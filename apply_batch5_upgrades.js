const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function applyBatch5Upgrades() {
  console.log('='.repeat(100));
  console.log('APPLYING BATCH 5 - 100 ACT-AUTHENTIC QUESTION UPGRADES');
  console.log('='.repeat(100));
  console.log();

  const data = JSON.parse(fs.readFileSync('/tmp/act_replacements_batch5_fixed.json'));

  const replacements = data.replacements || data.generated_questions || [];

  console.log(`Loaded ${replacements.length} replacement questions\n`);
  console.log('Applying updates to database...\n');

  let successful = 0;
  let failed = 0;

  for (let i = 0; i < replacements.length; i++) {
    const replacement = replacements[i];

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
      console.error(`✗ [${i+1}/${replacements.length}] Failed: ${replacement.original_text.substring(0, 40)}...`);
      console.error(`  Error: ${error.message}`);
      failed++;
    } else if (result && result.length > 0) {
      console.log(`✓ [${i+1}/${replacements.length}] Upgraded: ${result[0].title}`);
      successful++;
    } else {
      console.log(`⚠ [${i+1}/${replacements.length}] No rows affected for ${replacement.id}`);
      failed++;
    }

    if ((i + 1) % 20 === 0) {
      console.log(`  Progress: ${i+1}/${replacements.length} (${successful} successful, ${failed} failed)`);
    }
  }

  console.log('\n' + '='.repeat(100));
  console.log('BATCH 5 RESULTS:');
  console.log('='.repeat(100));
  console.log(`✅ Successfully upgraded:  ${successful}/${replacements.length}`);
  console.log(`❌ Failed:                 ${failed}/${replacements.length}`);
  console.log(`📊 Success rate:           ${(successful/replacements.length*100).toFixed(1)}%`);
  console.log();
  console.log(`CUMULATIVE PROGRESS:`);
  console.log(`  Batch 1: 53 questions`);
  console.log(`  Batch 2: 100 questions`);
  console.log(`  Batch 3: 100 questions`);
  console.log(`  Batch 4: 100 questions`);
  console.log(`  Batch 5: ${successful} questions`);
  console.log(`  Total:   ${353 + successful} / 1412 weak questions (${((353 + successful)/1412*100).toFixed(1)}%)`);
  console.log(`  Remaining: ${1412 - 353 - successful} questions`);
  console.log('='.repeat(100));
}

applyBatch5Upgrades().catch(console.error);
