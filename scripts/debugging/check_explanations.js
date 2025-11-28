const data = require('./all_215_questions.json');

let counts = {
  complete: 0,      // Has both parts
  incomplete: 0,    // Only has "Why Other Answers" section
  missing: 0        // No explanation at all
};

Object.entries(data).forEach(([subject, questions]) => {
  console.log(`\n${subject}:`);
  questions.forEach(q => {
    if (!q.explanation || q.explanation.trim() === '') {
      counts.missing++;
    } else if (q.explanation.includes('Why Other Answers') &&
               !q.explanation.includes('margin-bottom: 0.75rem')) {
      counts.incomplete++;
      if (counts.incomplete <= 3) {
        console.log(`  ID ${q.id}: INCOMPLETE (missing main explanation)`);
      }
    } else {
      counts.complete++;
    }
  });
});

console.log('\n=== SUMMARY ===');
console.log(`Complete: ${counts.complete}`);
console.log(`Incomplete (missing main explanation): ${counts.incomplete}`);
console.log(`Missing entirely: ${counts.missing}`);
console.log(`Total: ${counts.complete + counts.incomplete + counts.missing}`);
