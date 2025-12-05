const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('/tmp/aggressive_act_audit.json'));

// Sort by severity (most issues first)
const sortedFails = audit.categories.FAILS
  .sort((a, b) => b.reasons.length - a.reasons.length);

console.log('='.repeat(100));
console.log('PREPARING BATCHES 7-15 (859 questions remaining)');
console.log('='.repeat(100));
console.log();

// Batch 7: questions 554-653 (100 questions)
// Batch 8: questions 654-753 (100 questions)
// Batch 9: questions 754-853 (100 questions)
// Batch 10: questions 854-953 (100 questions)
// Batch 11: questions 954-1053 (100 questions)
// Batch 12: questions 1054-1153 (100 questions)
// Batch 13: questions 1154-1253 (100 questions)
// Batch 14: questions 1254-1353 (100 questions)
// Batch 15: questions 1354-1412 (59 questions)

const batches = [
  { num: 7, start: 553, end: 653 },
  { num: 8, start: 653, end: 753 },
  { num: 9, start: 753, end: 853 },
  { num: 10, start: 853, end: 953 },
  { num: 11, start: 953, end: 1053 },
  { num: 12, start: 1053, end: 1153 },
  { num: 13, start: 1153, end: 1253 },
  { num: 14, start: 1253, end: 1353 },
  { num: 15, start: 1353, end: 1412 }
];

batches.forEach(batch => {
  const questions = sortedFails.slice(batch.start, batch.end);

  console.log(`Batch ${batch.num}: ${questions.length} questions (indices ${batch.start}-${batch.end-1})`);

  fs.writeFileSync(`/tmp/batch${batch.num}_replacements_needed.json`, JSON.stringify({
    batch: batch.num,
    total: questions.length,
    questions: questions.map(q => ({
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
console.log('BATCH PREPARATION SUMMARY:');
console.log('='.repeat(100));
console.log(`  Total batches: 9`);
console.log(`  Total questions: 859`);
console.log(`  Batches 7-14: 100 questions each (800 total)`);
console.log(`  Batch 15: 59 questions (final batch)`);
console.log();
console.log('Ready to generate 859 ACT-authentic replacement questions!');
console.log('='.repeat(100));
