const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

// Load all questions
const newQuestions = require('./all-new-questions.js');
const remainingQuestions = require('./remaining-questions.js');
const finalQuestions = require('./final-questions.js');

// Combine all questions
const allQuestions = {
  ...newQuestions,
  'transitions': remainingQuestions.transitions,
  'which-choice': finalQuestions['which-choice'],
  'word-choice': finalQuestions['word-choice']
};

async function insertAllQuestions() {
  console.log('='.repeat(80));
  console.log('INSERTING ALL 70 NEW QUESTIONS INTO DATABASE');
  console.log('='.repeat(80));

  let totalInserted = 0;
  const summary = {};

  for (const [lessonKey, questions] of Object.entries(allQuestions)) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`${lessonKey.toUpperCase()}: Inserting ${questions.length} questions`);
    console.log('='.repeat(80));

    const { data: lessonData } = await supabase.from('lessons').select('id, title').eq('lesson_key', lessonKey).single();

    if (!lessonData) {
      console.log(`✗ Lesson not found: ${lessonKey}`);
      continue;
    }

    let lessonInserted = 0;

    for (const q of questions) {
      // Format choices with explanations
      const choices = q.choices.map(choice => ({
        text: choice.text,
        letter: choice.letter,
        explanation: q.explanations[choice.letter]
      }));

      // Create the question object
      const questionData = {
        lesson_id: lessonData.id,
        position: q.position,
        title: q.title,
        problem_text: q.problem_text,
        choices: choices,
        correct_answer: q.correct_answer,
        answer_explanation: '', // Using per-choice explanations
        solution_steps: [] // Empty array for solution steps
      };

      const { error } = await supabase.from('lesson_examples').insert([questionData]);

      if (error) {
        console.log(`✗ Failed to insert position ${q.position}: ${error.message}`);
      } else {
        console.log(`✓ Inserted position ${q.position}: ${q.title}`);
        lessonInserted++;
        totalInserted++;
      }
    }

    summary[lessonKey] = {
      attempted: questions.length,
      inserted: lessonInserted
    };
  }

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('INSERTION SUMMARY');
  console.log('='.repeat(80));
  for (const [lesson, stats] of Object.entries(summary)) {
    console.log(`${lesson.padEnd(20)}: ${stats.inserted}/${stats.attempted} inserted`);
  }
  console.log('='.repeat(80));
  console.log(`TOTAL: ${totalInserted}/70 questions inserted successfully`);
  console.log('='.repeat(80));
}

insertAllQuestions();
