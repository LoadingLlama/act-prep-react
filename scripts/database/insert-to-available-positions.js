const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const newQuestions = require('./all-new-questions.js');
const remainingQuestions = require('./remaining-questions.js');
const finalQuestions = require('./final-questions.js');

const allQuestions = {
  ...newQuestions,
  'transitions': remainingQuestions.transitions,
  'which-choice': finalQuestions['which-choice'],
  'word-choice': finalQuestions['word-choice']
};

// Available positions for each lesson
const availablePositions = {
  'logical-placement': [8, 11, 12, 17, 18, 20, 22, 25, 27, 28, 31],
  'misc-topics': [48],
  'redundancy': [8, 11, 12, 17, 18, 22, 25, 27, 28, 31, 37],
  'transitions': [8, 11, 12, 17, 18, 22, 25, 27, 28, 31, 37],
  'which-choice': [5, 8, 11, 12, 17, 18, 22, 25, 26, 27, 28, 30, 31],
  'word-choice': [8, 11, 12, 17, 18, 22, 25, 27, 28, 31, 37]
};

async function insertToAvailablePositions() {
  console.log('='.repeat(80));
  console.log('INSERTING QUESTIONS TO AVAILABLE POSITIONS');
  console.log('='.repeat(80));

  let totalInserted = 0;
  const summary = {};

  for (const [lessonKey, questions] of Object.entries(allQuestions)) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`${lessonKey.toUpperCase()}`);
    console.log('='.repeat(80));

    const { data: lessonData } = await supabase.from('lessons').select('id, title').eq('lesson_key', lessonKey).single();

    if (!lessonData) {
      console.log(`✗ Lesson not found: ${lessonKey}`);
      continue;
    }

    const available = availablePositions[lessonKey] || [];
    const questionsToInsert = questions.slice(0, available.length);

    console.log(`Available positions: ${available.join(', ')}`);
    console.log(`Questions to insert: ${questionsToInsert.length}`);

    let lessonInserted = 0;

    for (let i = 0; i < questionsToInsert.length; i++) {
      const q = questionsToInsert[i];
      const newPosition = available[i];

      const choices = q.choices.map(choice => ({
        text: choice.text,
        letter: choice.letter,
        explanation: q.explanations[choice.letter]
      }));

      const questionData = {
        lesson_id: lessonData.id,
        position: newPosition,
        title: q.title,
        problem_text: q.problem_text,
        choices: choices,
        correct_answer: q.correct_answer,
        answer_explanation: '',
        solution_steps: []
      };

      const { error } = await supabase.from('lesson_examples').insert([questionData]);

      if (error) {
        console.log(`✗ Failed position ${newPosition}: ${error.message}`);
      } else {
        console.log(`✓ Inserted position ${newPosition}: ${q.title}`);
        lessonInserted++;
        totalInserted++;
      }
    }

    summary[lessonKey] = {
      available: available.length,
      inserted: lessonInserted
    };
  }

  console.log('\n' + '='.repeat(80));
  console.log('INSERTION SUMMARY');
  console.log('='.repeat(80));
  for (const [lesson, stats] of Object.entries(summary)) {
    console.log(`${lesson.padEnd(20)}: ${stats.inserted}/${stats.available} inserted`);
  }
  console.log('='.repeat(80));
  console.log(`TOTAL: ${totalInserted} questions inserted successfully`);
  console.log('='.repeat(80));
}

insertToAvailablePositions();
