/**
 * Insert Sentence Structure Practice Quiz into Database
 * Creates a quiz with 4 practice questions
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertQuiz() {
  console.log('🚀 Starting insertion of sentence-structure quiz...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac'; // sentence-structure lesson

  try {
    // Step 1: Create the quiz
    console.log('📝 Creating quiz...');
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        lesson_id: lessonId,
        title: 'Building Complete Sentences',
        intro: 'Test your understanding of sentence structure with these practice questions.',
        quiz_type: 'practice',
        position: 5, // Show at the end after all content sections
        is_required: false
      })
      .select()
      .single();

    if (quizError) throw quizError;
    console.log('✅ Quiz created:', quiz.id);

    const quizId = quiz.id;

    // Step 2: Create Question 1
    console.log('\n📝 Creating Question 1...');
    const { data: q1, error: q1Error } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: quizId,
        question_text: 'In the late 1960s, the "must-have" toy at the Cincinnati Toy <u>Fair a</u> new type of diecast toy car that would later become the popular brand Hot Wheels.',
        question_order: 1
      })
      .select()
      .single();

    if (q1Error) throw q1Error;
    console.log('✅ Question 1 created');

    // Create options for Question 1
    await supabase.from('quiz_options').insert([
      {
        question_id: q1.id,
        option_text: 'NO CHANGE',
        option_order: 1,
        is_correct: false,
        explanation: 'This is a fragment - missing the main verb "was".'
      },
      {
        question_id: q1.id,
        option_text: 'Fair,',
        option_order: 2,
        is_correct: false,
        explanation: 'Adding a comma doesn\'t fix the missing verb.'
      },
      {
        question_id: q1.id,
        option_text: 'Fair;',
        option_order: 3,
        is_correct: false,
        explanation: 'A semicolon is incorrect here; the sentence needs a verb.'
      },
      {
        question_id: q1.id,
        option_text: 'Fair was',
        option_order: 4,
        is_correct: true,
        explanation: 'Correct! "Was" is the linking verb that completes the sentence.'
      }
    ]);
    console.log('✅ Options for Question 1 created');

    // Step 3: Create Question 2
    console.log('\n📝 Creating Question 2...');
    const { data: q2, error: q2Error } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: quizId,
        question_text: 'After hummingbirds evolved long, thin beaks to reach pollen in flowers<u>, however this</u> evolutionary advantage allowed them to survive entirely on flower nectar, tree sap, and pollen.',
        question_order: 2
      })
      .select()
      .single();

    if (q2Error) throw q2Error;
    console.log('✅ Question 2 created');

    // Create options for Question 2
    await supabase.from('quiz_options').insert([
      {
        question_id: q2.id,
        option_text: 'NO CHANGE',
        option_order: 1,
        is_correct: false,
        explanation: '"However" is not a FANBOYS conjunction.'
      },
      {
        question_id: q2.id,
        option_text: ', therefore this',
        option_order: 2,
        is_correct: false,
        explanation: '"Therefore" is not a FANBOYS conjunction either.'
      },
      {
        question_id: q2.id,
        option_text: ' and this',
        option_order: 3,
        is_correct: true,
        explanation: 'Correct! "And" is a FANBOYS word that properly connects the clauses.'
      },
      {
        question_id: q2.id,
        option_text: 'DELETE the underlined portion',
        option_order: 4,
        is_correct: false,
        explanation: 'Deleting creates an unclear connection between the ideas.'
      }
    ]);
    console.log('✅ Options for Question 2 created');

    // Step 4: Create Question 3
    console.log('\n📝 Creating Question 3...');
    const { data: q3, error: q3Error } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: quizId,
        question_text: 'Hockey is my favorite <u>sport, although</u> I cannot skate very well.\n\nWhich of the following alternatives to the underlined portion would be acceptable?',
        question_order: 3
      })
      .select()
      .single();

    if (q3Error) throw q3Error;
    console.log('✅ Question 3 created');

    // Create options for Question 3
    await supabase.from('quiz_options').insert([
      {
        question_id: q3.id,
        option_text: 'sport, but',
        option_order: 1,
        is_correct: true,
        explanation: 'Correct! This uses comma + FANBOYS to connect two independent clauses.'
      },
      {
        question_id: q3.id,
        option_text: 'sport even though',
        option_order: 2,
        is_correct: false,
        explanation: 'This needs a comma before "even though".'
      },
      {
        question_id: q3.id,
        option_text: 'sport, so',
        option_order: 3,
        is_correct: false,
        explanation: '"So" changes the meaning - it suggests the second clause is a result of the first.'
      }
    ]);
    console.log('✅ Options for Question 3 created');

    // Step 5: Create Question 4
    console.log('\n📝 Creating Question 4...');
    const { data: q4, error: q4Error } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: quizId,
        question_text: '<u>While the bakery varies its types of bread</u> with the seasons, ranging from tomato basil loafs in the summer to olive rosemary focaccia in the fall, and always has a line around the block.',
        question_order: 4
      })
      .select()
      .single();

    if (q4Error) throw q4Error;
    console.log('✅ Question 4 created');

    // Create options for Question 4
    await supabase.from('quiz_options').insert([
      {
        question_id: q4.id,
        option_text: 'NO CHANGE',
        option_order: 1,
        is_correct: false,
        explanation: 'This creates a fragment - the whole sentence is a dependent clause.'
      },
      {
        question_id: q4.id,
        option_text: 'Having various types of bread',
        option_order: 2,
        is_correct: false,
        explanation: 'This creates a participial phrase, not an independent clause.'
      },
      {
        question_id: q4.id,
        option_text: 'With the bakery having varied bread types',
        option_order: 3,
        is_correct: false,
        explanation: 'This creates a prepositional phrase, still no independent clause.'
      },
      {
        question_id: q4.id,
        option_text: 'The bakery varies its types of bread',
        option_order: 4,
        is_correct: true,
        explanation: 'Correct! Removing "While" creates an independent clause with a clear subject and verb.'
      }
    ]);
    console.log('✅ Options for Question 4 created');

    // Verify the quiz
    console.log('\n🔍 Verifying quiz...');
    const { data: verifyQuiz, error: verifyError } = await supabase
      .from('quizzes')
      .select(`
        id,
        title,
        quiz_questions (
          id,
          question_text,
          question_order,
          quiz_options (
            option_text,
            is_correct
          )
        )
      `)
      .eq('id', quizId)
      .single();

    if (verifyError) throw verifyError;

    console.log('\n✅ Quiz created successfully!');
    console.log('📊 Quiz ID:', verifyQuiz.id);
    console.log('📊 Number of questions:', verifyQuiz.quiz_questions.length);
    console.log('📊 Total options:', verifyQuiz.quiz_questions.reduce((sum, q) => sum + q.quiz_options.length, 0));

    console.log('\n🎉 All done! The practice quiz is now live in the lesson.');
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

insertQuiz();
