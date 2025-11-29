const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('/tmp/aggressive_act_audit.json'));

// Get questions 154-253 (next 100)
const batch3Questions = audit.categories.FAILS
  .sort((a, b) => b.reasons.length - a.reasons.length)
  .slice(153, 253);

console.log('='.repeat(100));
console.log('PREPARING BATCH 3: Questions 154-253');
console.log('='.repeat(100));
console.log();
console.log(`Total questions in batch 3: ${batch3Questions.length}`);
console.log();

// Save for AI generation
fs.writeFileSync('/tmp/batch3_replacements_needed.json', JSON.stringify({
  batch: 3,
  total: batch3Questions.length,
  questions: batch3Questions.map(q => ({
    id: q.id,
    original_title: q.title,
    original_text: q.text,
    subject: q.subject,
    difficulty: q.difficulty,
    issues: q.reasons
  }))
}, null, 2));

console.log('Sample questions from batch 3:');
console.log('-'.repeat(100));
batch3Questions.slice(0, 10).forEach((q, i) => {
  console.log(`${(i+1).toString().padStart(2)}. ${q.title}`);
  console.log(`    "${q.text}"`);
});
console.log(`... and ${batch3Questions.length - 10} more`);

console.log();
console.log('✓ Batch 3 list saved to: /tmp/batch3_replacements_needed.json');
console.log('='.repeat(100));
