const fs = require('fs');

// Show how the explanation will appear in the UI
const example = {
  problem_text: "A bacteria colony doubles every hour. Starting with 1 bacterium, how many bacteria will there be after 5 hours?",
  choices: [
    { letter: "A", text: "10" },
    { letter: "B", text: "25" },
    { letter: "C", text: "32" },
    { letter: "D", text: "64" }
  ],
  correct_answer: "C",
  answer_explanation: "**Calculate exponential growth:**\n\nThe bacteria double every hour, so after 5 hours we calculate 2⁵.\n\n```\n2⁵ = 2 × 2 × 2 × 2 × 2 = 32 bacteria\n```\n\n**Verification:** Starting with 1 bacterium:\n- After 1 hour: 2\n- After 2 hours: 4\n- After 3 hours: 8\n- After 4 hours: 16\n- After 5 hours: 32 ✓"
};

console.log('╔' + '═'.repeat(98) + '╗');
console.log('║' + ' HOW IT APPEARS IN THE UI (Diagnostic/Practice Test Format)'.padEnd(98) + '║');
console.log('╚' + '═'.repeat(98) + '╝');
console.log('');

console.log('QUESTION:');
console.log(example.problem_text);
console.log('');

console.log('ANSWER CHOICES:');
example.choices.forEach(c => {
  const marker = c.letter === example.correct_answer ? '●' : '○';
  console.log(`  ${marker} ${c.letter}. ${c.text}`);
});

console.log('');
console.log('─'.repeat(100));
console.log('EXPLANATION (Shows underneath after answering):');
console.log('─'.repeat(100));
console.log(example.answer_explanation);
console.log('');

console.log('='.repeat(100));
console.log('This is the format that will display in DiagnosticTest and PracticeTest components');
console.log('='.repeat(100));
