/**
 * Create Sentence Structure Practice Lesson with 4 Questions
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createPracticeLesson() {
  console.log('🚀 Creating sentence-structure practice lesson...\n');

  try {
    // Step 1: Create the practice lesson
    console.log('📝 Creating practice lesson...');
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .insert({
        lesson_key: 'sentence-structure-practice',
        subject: 'english',
        title: 'Practice: Building Complete Sentences',
        duration: 30,
        order_index: 87,
        content: '<p>Complete these practice questions to test your understanding of sentence structure.</p>',
        topic_number: 1,
        topic_lesson_number: 11, // After main sentence-structure lesson
        topic_title: 'Practice'
      })
      .select()
      .single();

    if (lessonError) throw lessonError;
    console.log('✅ Practice lesson created:', lesson.id);

    const lessonId = lesson.id;

    // Step 2: Create the quiz for this practice lesson
    console.log('\n📝 Creating practice quiz...');
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        lesson_id: lessonId,
        title: 'Building Complete Sentences',
        intro: 'Test your understanding of sentence structure.',
        quiz_type: 'practice',
        position: 1, // Main quiz for this practice lesson
        is_required: false
      })
      .select()
      .single();

    if (quizError) throw quizError;
    console.log('✅ Quiz created:', quiz.id);

    const quizId = quiz.id;

    // Step 3: Create Question 1
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

    await supabase.from('quiz_options').insert([
      { question_id: q1.id, option_text: 'NO CHANGE', option_order: 1, is_correct: false, explanation: 'Fragment - missing verb' },
      { question_id: q1.id, option_text: 'Fair,', option_order: 2, is_correct: false, explanation: 'Still missing verb' },
      { question_id: q1.id, option_text: 'Fair;', option_order: 3, is_correct: false, explanation: 'Semicolon incorrect here' },
      { question_id: q1.id, option_text: 'Fair was', option_order: 4, is_correct: true, explanation: 'Correct! Adds the verb "was"' }
    ]);
    console.log('✅ Question 1 created');

    // Step 4: Create Question 2
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

    await supabase.from('quiz_options').insert([
      { question_id: q2.id, option_text: 'NO CHANGE', option_order: 1, is_correct: false, explanation: 'Not a FANBOYS word' },
      { question_id: q2.id, option_text: ', therefore this', option_order: 2, is_correct: false, explanation: 'Not FANBOYS either' },
      { question_id: q2.id, option_text: ' and this', option_order: 3, is_correct: true, explanation: 'Correct! "And" is FANBOYS' },
      { question_id: q2.id, option_text: 'DELETE the underlined portion', option_order: 4, is_correct: false, explanation: 'Creates unclear connection' }
    ]);
    console.log('✅ Question 2 created');

    // Step 5: Create Question 3
    console.log('\n📝 Creating Question 3...');
    const { data: q3, error: q3Error } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: quizId,
        question_text: 'Hockey is my favorite <u>sport, although</u> I cannot skate very well.\n\nWhich of the following alternatives would be acceptable?',
        question_order: 3
      })
      .select()
      .single();

    if (q3Error) throw q3Error;

    await supabase.from('quiz_options').insert([
      { question_id: q3.id, option_text: 'sport, but', option_order: 1, is_correct: true, explanation: 'Correct! Comma + FANBOYS' },
      { question_id: q3.id, option_text: 'sport even though', option_order: 2, is_correct: false, explanation: 'Needs a comma' },
      { question_id: q3.id, option_text: 'sport, so', option_order: 3, is_correct: false, explanation: 'Changes meaning incorrectly' }
    ]);
    console.log('✅ Question 3 created');

    // Step 6: Create Question 4
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

    await supabase.from('quiz_options').insert([
      { question_id: q4.id, option_text: 'NO CHANGE', option_order: 1, is_correct: false, explanation: 'Fragment - all dependent' },
      { question_id: q4.id, option_text: 'Having various types of bread', option_order: 2, is_correct: false, explanation: 'Participial phrase - fragment' },
      { question_id: q4.id, option_text: 'With the bakery having varied bread types', option_order: 3, is_correct: false, explanation: 'Prepositional phrase - fragment' },
      { question_id: q4.id, option_text: 'The bakery varies its types of bread', option_order: 4, is_correct: true, explanation: 'Correct! Creates independent clause' }
    ]);
    console.log('✅ Question 4 created');

    console.log('\n🎉 Practice lesson created successfully!');
    console.log('📊 Lesson ID:', lessonId);
    console.log('📊 Quiz ID:', quizId);
    console.log('📊 4 questions with options created');
    console.log('\n✅ Go to Practice page → English to see it!');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

createPracticeLesson();
