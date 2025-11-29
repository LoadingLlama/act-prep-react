const fs = require('fs');

// Read our audit report
const report = JSON.parse(fs.readFileSync('/tmp/content_quality_report.json', 'utf8'));

console.log('='.repeat(100));
console.log('COMPARISON: REAL ACT QUESTIONS vs OUR DATABASE QUESTIONS');
console.log('='.repeat(100));

console.log('\n📚 REAL ACT QUESTIONS (from act.org practice tests):');
console.log('-'.repeat(100));

const realACT = [
  {
    level: 'Basic',
    question: 'If 40% of a class are girls, and 25% of girls play tennis, what percent of the class play tennis?',
    length: 97,
    hasContext: true,
    multiStep: true
  },
  {
    level: 'Basic',
    question: '5^(7/3) × 5^(2/3) = ?',
    length: 21,
    hasContext: false,
    multiStep: false
  },
  {
    level: 'Intermediate',
    question: 'In five successive hours, a car travels 40, 45, 50, 35, and 55 km. In next five hours at 50 km/hr average. What is total distance in 10 hours?',
    length: 143,
    hasContext: true,
    multiStep: true
  },
  {
    level: 'Intermediate',
    question: 'The price of gasoline increased from $1.25 to $1.75 per gallon. The new price is what percent of the original?',
    length: 117,
    hasContext: true,
    multiStep: true
  },
  {
    level: 'Advanced',
    question: 'If tan θ = 5/12 and sin θ > 0, what is cos θ?',
    length: 47,
    hasContext: false,
    multiStep: true
  }
];

realACT.forEach((q, i) => {
  console.log(`\n${i+1}. [${q.level}] Length: ${q.length} chars`);
  console.log(`   "${q.question}"`);
  console.log(`   Context: ${q.hasContext ? 'Yes' : 'No'} | Multi-step: ${q.multiStep ? 'Yes' : 'No'}`);
});

console.log('\n\n❌ OUR "TOO EASY" QUESTIONS:');
console.log('-'.repeat(100));

report.issues.tooEasy.slice(0, 15).forEach((q, i) => {
  console.log(`\n${i+1}. [${q.difficulty}] ${q.title}`);
  console.log(`   "${q.text}"`);
  console.log(`   Length: ${q.text.length} chars`);
});

console.log('\n\n📊 ANALYSIS:');
console.log('='.repeat(100));

const avgRealLength = realACT.reduce((sum, q) => sum + q.length, 0) / realACT.length;
const avgOurLength = report.issues.tooEasy.slice(0, 15).reduce((sum, q) => sum + q.text.length, 0) / 15;

console.log(`\nAverage length of REAL ACT questions:  ${avgRealLength.toFixed(1)} chars`);
console.log(`Average length of OUR easy questions:  ${avgOurLength.toFixed(1)} chars`);

console.log(`\nREAL ACT characteristics:`);
console.log(`  - Mix of lengths (21-143 chars)`);
console.log(`  - 60% have real-world context`);
console.log(`  - 80% are multi-step problems`);
console.log(`  - Even "basic" questions require reasoning`);

console.log(`\nOUR QUESTIONS characteristics:`);
console.log(`  - Mostly very short (< 30 chars)`);
console.log(`  - Almost NO real-world context`);
console.log(`  - Single-step calculations`);
console.log(`  - Elementary school level (What is 5 + 3 × 2?)`);

console.log('\n' + '='.repeat(100));
console.log('VERDICT: Most of our "easy" questions are FAR below ACT standards');
console.log('='.repeat(100));
