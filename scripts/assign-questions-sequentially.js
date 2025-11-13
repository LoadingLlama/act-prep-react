const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Assign questions sequentially to passages in order
 * 40 questions / 6 passages = ~7 questions each
 */
async function assignSequentially() {
  console.log('🔧 Assigning questions sequentially to passages...\n');

  // Get passages
  const { data: passages } = await supabase
    .from('practice_test_science_passages')
    .select('id, passage_number')
    .eq('test_number', 1)
    .order('passage_number');

  console.log('Passages:', passages.map(p => `${p.passage_number} (ID: ${p.id})`).join(', '));

  // Sequential assignment: ~7 questions per passage
  const assignments = [
    { passageNum: 1, questions: [1, 2, 3, 4, 5, 6, 7] },
    { passageNum: 2, questions: [8, 9, 10, 11, 12, 13, 14] },
    { passageNum: 3, questions: [15, 16, 17, 18, 19, 20, 21] },
    { passageNum: 4, questions: [22, 23, 24, 25, 26, 27, 28] },
    { passageNum: 5, questions: [29, 30, 31, 32, 33, 34] },
    { passageNum: 6, questions: [35, 36, 37, 38, 39, 40] }
  ];

  for (const assignment of assignments) {
    const passage = passages.find(p => p.passage_number === assignment.passageNum);

    console.log(`\nPassage ${assignment.passageNum} (ID: ${passage.id})`);
    console.log(`  Assigning questions: ${assignment.questions.join(', ')}`);

    for (const qNum of assignment.questions) {
      const { error } = await supabase
        .from('practice_test_science_questions')
        .update({ passage_id: passage.id })
        .eq('test_number', 1)
        .eq('question_number', qNum);

      if (error) {
        console.error(`  ❌ Error updating Q${qNum}:`, error);
      }
    }

    console.log(`  ✅ Updated ${assignment.questions.length} questions`);
  }

  console.log('\n✅ Done!');
}

assignSequentially();
