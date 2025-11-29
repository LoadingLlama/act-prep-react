const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('/tmp/aggressive_act_audit.json'));

// Get questions 54-153 (next 100)
const batch2Questions = audit.categories.FAILS
  .sort((a, b) => b.reasons.length - a.reasons.length)
  .slice(53, 153);

console.log('='.repeat(100));
console.log('PREPARING BATCH 2: Questions 54-153');
console.log('='.repeat(100));
console.log();
console.log(`Total questions in batch 2: ${batch2Questions.length}`);
console.log();

// Save for AI generation
fs.writeFileSync('/tmp/batch2_replacements_needed.json', JSON.stringify({
  batch: 2,
  total: batch2Questions.length,
  questions: batch2Questions.map(q => ({
    id: q.id,
    original_title: q.title,
    original_text: q.text,
    subject: q.subject,
    difficulty: q.difficulty,
    issues: q.reasons
  }))
}, null, 2));

console.log('Sample questions from batch 2:');
console.log('-'.repeat(100));
batch2Questions.slice(0, 10).forEach((q, i) => {
  console.log(`${(i+1).toString().padStart(2)}. ${q.title}`);
  console.log(`    "${q.text}"`);
});
console.log(`... and ${batch2Questions.length - 10} more`);

console.log();
console.log('✓ Batch 2 list saved to: /tmp/batch2_replacements_needed.json');
console.log('='.repeat(100));
