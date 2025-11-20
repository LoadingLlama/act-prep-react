const fs = require('fs');

// Load both files
const englishQuestions = JSON.parse(fs.readFileSync('english_questions.json', 'utf8'));
const diagnosticQuestions = JSON.parse(fs.readFileSync('diagnostic_questions.json', 'utf8'));

console.log('ENGLISH QUESTIONS ANALYSIS\n');
console.log('english_questions.json: ' + englishQuestions.length + ' total questions');

// Count by question_type
const byType = {};
englishQuestions.forEach(q => {
  const type = q.question_type || 'Unknown';
  byType[type] = (byType[type] || 0) + 1;
});

console.log('\nBy Question Type:');
Object.keys(byType).sort().forEach(type => {
  console.log('  ' + type + ': ' + byType[type]);
});

// Count diagnostic English questions
const diagnosticEnglish = diagnosticQuestions.filter(q => q.subject === 'English');
console.log('\ndiagnostic_questions.json: ' + diagnosticEnglish.length + ' English questions');

console.log('\nTotal unique English ACT questions available: ~' + (englishQuestions.length + diagnosticEnglish.length));
