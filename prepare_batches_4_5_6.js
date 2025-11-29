const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('/tmp/aggressive_act_audit.json'));

// Sort by severity (most issues first)
const sortedFails = audit.categories.FAILS
  .sort((a, b) => b.reasons.length - a.reasons.length);

// Batch 4: questions 254-353
const batch4 = sortedFails.slice(253, 353);

// Batch 5: questions 354-453
const batch5 = sortedFails.slice(353, 453);

// Batch 6: questions 454-553
const batch6 = sortedFails.slice(453, 553);

console.log('='.repeat(100));
console.log('PREPARING BATCHES 4, 5, 6 (300 questions total)');
console.log('='.repeat(100));
console.log();

[
  { num: 4, questions: batch4 },
  { num: 5, questions: batch5 },
  { num: 6, questions: batch6 }
].forEach(batch => {
  console.log(`Batch ${batch.num}: ${batch.questions.length} questions`);

  fs.writeFileSync(`/tmp/batch${batch.num}_replacements_needed.json`, JSON.stringify({
    batch: batch.num,
    total: batch.questions.length,
    questions: batch.questions.map(q => ({
      id: q.id,
      original_title: q.title,
      original_text: q.text,
      subject: q.subject,
      difficulty: q.difficulty,
      issues: q.reasons
    }))
  }, null, 2));

  console.log(`  ✓ Saved to /tmp/batch${batch.num}_replacements_needed.json`);
});

console.log();
console.log('='.repeat(100));
console.log('Ready to generate 300 ACT-authentic replacement questions');
console.log('='.repeat(100));
