/**
 * Insert 4 practice examples for sentence-structure lesson
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertExamples() {
  console.log('🚀 Inserting practice examples...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';

  try {
    // Delete existing examples first
    await supabase.from('lesson_examples').delete().eq('lesson_id', lessonId);
    console.log('✅ Cleared existing examples');

    // Insert Example 1
    console.log('📝 Creating Example 1...');
    const { error: e1 } = await supabase.from('lesson_examples').insert({
      lesson_id: lessonId,
      position: 1,
      title: 'Identifying Sentence Fragments',
      problem_text: 'In the late 1960s, the "must-have" toy at the Cincinnati Toy <u>Fair a</u> new type of diecast toy car that would later become the popular brand Hot Wheels.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Fair,' },
        { letter: 'C', text: 'Fair;' },
        { letter: 'D', text: 'Fair was' }
      ],
      correct_answer: 'D',
      solution_steps: [],
      answer_explanation: 'The original sentence is a fragment because it lacks a main verb. "Fair was" adds the linking verb that completes the sentence.',
      is_worked_example: false
    });
    if (e1) throw e1;
    console.log('✅ Example 1 created');

    // Insert Example 2
    console.log('📝 Creating Example 2...');
    const { error: e2 } = await supabase.from('lesson_examples').insert({
      lesson_id: lessonId,
      position: 2,
      title: 'Comma + FANBOYS vs. Comma Splices',
      problem_text: 'After hummingbirds evolved long, thin beaks to reach pollen in flowers<u>, however this</u> evolutionary advantage allowed them to survive entirely on flower nectar, tree sap, and pollen.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: ', therefore this' },
        { letter: 'C', text: 'and this' },
        { letter: 'D', text: 'DELETE the underlined portion' }
      ],
      correct_answer: 'C',
      solution_steps: [],
      answer_explanation: '"And" is a FANBOYS word that properly connects the dependent and independent clauses.',
      is_worked_example: false
    });
    if (e2) throw e2;
    console.log('✅ Example 2 created');

    // Insert Example 3
    console.log('📝 Creating Example 3...');
    const { error: e3 } = await supabase.from('lesson_examples').insert({
      lesson_id: lessonId,
      position: 3,
      title: 'Fixing Comma Splices',
      problem_text: 'Hockey is my favorite <u>sport, although</u> I cannot skate very well.',
      choices: [
        { letter: 'A', text: 'sport, but' },
        { letter: 'B', text: 'sport even though' },
        { letter: 'C', text: 'sport, so' }
      ],
      correct_answer: 'A',
      solution_steps: [],
      answer_explanation: '"Sport, but" uses comma + FANBOYS to correctly connect two independent clauses.',
      is_worked_example: false
    });
    if (e3) throw e3;
    console.log('✅ Example 3 created');

    // Insert Example 4
    console.log('📝 Creating Example 4...');
    const { error: e4 } = await supabase.from('lesson_examples').insert({
      lesson_id: lessonId,
      position: 4,
      title: 'Dependent Clauses Creating Fragments',
      problem_text: '<u>While the bakery varies its types of bread</u> with the seasons, ranging from tomato basil loafs in the summer to olive rosemary focaccia in the fall, and always has a line around the block.',
      choices: [
        { letter: 'A', text: 'NO CHANGE' },
        { letter: 'B', text: 'Having various types of bread' },
        { letter: 'C', text: 'With the bakery having varied bread types' },
        { letter: 'D', text: 'The bakery varies its types of bread' }
      ],
      correct_answer: 'D',
      solution_steps: [],
      answer_explanation: 'Removing "While" transforms the dependent clause into an independent clause with a clear subject and verb.',
      is_worked_example: false
    });
    if (e4) throw e4;
    console.log('✅ Example 4 created');

    // Verify
    const { data } = await supabase
      .from('lesson_examples')
      .select('id, title, correct_answer')
      .eq('lesson_id', lessonId)
      .order('position');

    console.log('\n✅ All examples inserted!');
    console.table(data);
    console.log('\n🎉 Refresh the page and click Topic 1.1 now!');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

insertExamples();
