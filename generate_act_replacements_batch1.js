const fs = require('fs');

// Read the audit report
const audit = JSON.parse(fs.readFileSync('/tmp/aggressive_act_audit.json'));

// Get worst 100 questions (prioritize those with multiple failure reasons)
const worst100 = audit.categories.FAILS
  .sort((a, b) => b.reasons.length - a.reasons.length)
  .slice(0, 100);

console.log('='.repeat(100));
console.log('GENERATING ACT-AUTHENTIC REPLACEMENTS - BATCH 1 (100 questions)');
console.log('='.repeat(100));
console.log('\nWorst 100 questions to replace:\n');

worst100.slice(0, 20).forEach((q, i) => {
  console.log(`${(i+1).toString().padStart(3)}. ${q.title}`);
  console.log(`     Original: "${q.text}"`);
  console.log(`     Issues: ${q.reasons.join(', ')}\n`);
});

console.log(`\n... and 80 more\n`);
console.log('='.repeat(100));

// Group by topic for systematic replacement
const bySubject = {};
worst100.forEach(q => {
  const subject = q.subject || 'unknown';
  if (!bySubject[subject]) bySubject[subject] = [];
  bySubject[subject].push(q);
});

console.log('\nBREAKDOWN BY SUBJECT:');
console.log('-'.repeat(100));
Object.entries(bySubject).forEach(([subject, questions]) => {
  console.log(`${subject.padEnd(20)}: ${questions.length} questions`);
});

// Save list for manual/AI replacement generation
fs.writeFileSync('/tmp/batch1_replacements_needed.json', JSON.stringify({
  total: worst100.length,
  questions: worst100.map(q => ({
    id: q.id,
    original_title: q.title,
    original_text: q.text,
    subject: q.subject,
    difficulty: q.difficulty,
    issues: q.reasons,
    needs: {
      min_length: 70,
      context_type: 'real-world narrative with names/situations',
      complexity: 'multi-step reasoning',
      choice_explanations: 'all 4 choices need 40-80 char explanations',
      overall_explanation: 'detailed solution with steps'
    }
  }))
}, null, 2));

console.log('\n📄 Batch 1 questions list saved to: /tmp/batch1_replacements_needed.json');
console.log('='.repeat(100));
