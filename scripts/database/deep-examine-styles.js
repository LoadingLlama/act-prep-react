const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const lessonsNeedingQuestions = [
  'logical-placement',
  'misc-topics',
  'redundancy',
  'transitions',
  'which-choice',
  'word-choice'
];

async function deepExamine() {
  let output = '';

  for (const key of lessonsNeedingQuestions) {
    const { data: lessonData } = await supabase.from('lessons').select('id, title').eq('lesson_key', key).single();
    const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lessonData.id).order('position');

    output += '='.repeat(100) + '\n';
    output += `${key.toUpperCase()} - ${lessonData.title}\n`;
    output += `Total questions: ${questions.length}\n`;
    output += '='.repeat(100) + '\n\n';

    // Sample 10 questions from different parts (beginning, middle, end)
    const samplesToShow = [];
    if (questions.length > 0) samplesToShow.push(questions[0]); // First
    if (questions.length > 5) samplesToShow.push(questions[Math.floor(questions.length / 4)]); // 25%
    if (questions.length > 10) samplesToShow.push(questions[Math.floor(questions.length / 2)]); // 50%
    if (questions.length > 15) samplesToShow.push(questions[Math.floor(questions.length * 3 / 4)]); // 75%
    if (questions.length > 1) samplesToShow.push(questions[questions.length - 1]); // Last

    for (const q of samplesToShow) {
      output += `Position ${q.position}: ${q.title}\n`;
      output += '-'.repeat(100) + '\n';
      output += `Problem Text:\n${q.problem_text}\n\n`;
      output += `Choices:\n`;
      q.choices.forEach(c => {
        output += `  ${c.letter}. ${c.text}\n`;
      });
      output += `\nCorrect Answer: ${q.correct_answer}\n\n`;
      output += `Explanations:\n`;
      q.choices.forEach(c => {
        output += `  ${c.letter}. ${c.explanation}\n\n`;
      });
      output += '\n' + '~'.repeat(100) + '\n\n';
    }
    output += '\n\n';
  }

  fs.writeFileSync('question-styles-analysis.txt', output);
  console.log('✓ Analysis saved to question-styles-analysis.txt');
}

deepExamine();
