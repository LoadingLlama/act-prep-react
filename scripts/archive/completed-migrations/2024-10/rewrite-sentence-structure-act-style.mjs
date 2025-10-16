import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const lessonKey = 'sentence-structure';

async function rewriteSentenceStructureQuizzes() {
  // Get lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', lessonKey)
    .single();

  // Delete all existing quizzes
  await supabase
    .from('quizzes')
    .delete()
    .eq('lesson_id', lesson.id);

  console.log('✓ Deleted old quizzes\n');

  const actStyleQuizzes = [
    {
      title: 'Practice: Clauses & Sentence Fragments',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: '<u>Because I studied hard</u> I passed the exam.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Missing comma after dependent clause at the start.', option_order: 1 },
            { text: 'Because I studied hard,', is_correct: true, explanation: 'Correct! Dependent clauses at the start need a comma.', option_order: 2 },
            { text: 'I studied hard', is_correct: false, explanation: 'Changes the meaning - loses the cause-and-effect relationship.', option_order: 3 },
            { text: 'Although I studied hard', is_correct: false, explanation: 'Still missing comma, and changes meaning.', option_order: 4 }
          ]
        },
        {
          question_text: 'The project <u>was completed, it was successful.</u>',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Comma splice - can\'t join two independent clauses with just a comma.', option_order: 1 },
            { text: 'was completed. It was successful.', is_correct: true, explanation: 'Correct! Use a period to separate two independent clauses.', option_order: 2 },
            { text: 'was completed it was successful.', is_correct: false, explanation: 'Run-on sentence - needs punctuation between independent clauses.', option_order: 3 },
            { text: 'was completed, and it was successful', is_correct: false, explanation: 'While grammatically OK, a period is clearer for these unrelated ideas.', option_order: 4 }
          ]
        },
        {
          question_text: '<u>Running through the park.</u> I saw a deer.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Fragment - "Running through the park" can\'t stand alone.', option_order: 1 },
            { text: 'Running through the park,', is_correct: true, explanation: 'Correct! Connects the dependent phrase to the independent clause.', option_order: 2 },
            { text: 'Running through the park', is_correct: false, explanation: 'Missing comma after the opening phrase.', option_order: 3 },
            { text: 'Running through the park;', is_correct: false, explanation: 'Semicolons join independent clauses, not fragments.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: FANBOYS & Compound Sentences',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'checkpoint',
      position: 9,
      is_required: true,
      questions: [
        {
          question_text: 'I wanted to go to the concert<u>, but</u> the tickets were sold out.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! FANBOYS need a comma before them when joining independent clauses.', option_order: 1 },
            { text: 'but', is_correct: false, explanation: 'Missing comma before FANBOYS conjunction.', option_order: 2 },
            { text: '; but', is_correct: false, explanation: 'Don\'t use semicolon with FANBOYS - use comma.', option_order: 3 },
            { text: '. But', is_correct: false, explanation: 'While grammatically OK, FANBOYS with comma is preferred for related ideas.', option_order: 4 }
          ]
        },
        {
          question_text: 'She studied all night<u>,</u> she still felt unprepared.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Comma splice - need FANBOYS or semicolon/period.', option_order: 1 },
            { text: ', so', is_correct: true, explanation: 'Correct! "So" shows cause-and-effect and properly joins the clauses.', option_order: 2 },
            { text: 'and', is_correct: false, explanation: 'Missing comma before FANBOYS.', option_order: 3 },
            { text: '', is_correct: false, explanation: 'Run-on sentence - need punctuation between independent clauses.', option_order: 4 }
          ]
        },
        {
          question_text: 'The movie was long<u>; and</u> it was boring.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Don\'t use semicolon with FANBOYS - use comma instead.', option_order: 1 },
            { text: ', and', is_correct: true, explanation: 'Correct! FANBOYS require comma, not semicolon.', option_order: 2 },
            { text: 'and', is_correct: false, explanation: 'Missing comma before FANBOYS.', option_order: 3 },
            { text: ';', is_correct: false, explanation: 'Semicolon works but is less clear than FANBOYS for these related ideas.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Comma Splices & Run-ons',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 13,
      is_required: true,
      questions: [
        {
          question_text: 'The storm approached quickly<u>, we</u> rushed inside.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Comma splice - can\'t join independent clauses with just a comma.', option_order: 1 },
            { text: ', so we', is_correct: true, explanation: 'Correct! Adding FANBOYS "so" fixes the comma splice.', option_order: 2 },
            { text: 'we', is_correct: false, explanation: 'Run-on sentence - missing punctuation.', option_order: 3 },
            { text: '; we', is_correct: false, explanation: 'While grammatically OK, FANBOYS better shows the cause-effect relationship.', option_order: 4 }
          ]
        },
        {
          question_text: 'I love reading<u>, my</u> favorite genre is mystery.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Comma splice - these are two independent clauses.', option_order: 1 },
            { text: '. My', is_correct: true, explanation: 'Correct! Period separates two independent but related ideas.', option_order: 2 },
            { text: 'my', is_correct: false, explanation: 'Run-on sentence - needs punctuation.', option_order: 3 },
            { text: ', and my', is_correct: false, explanation: '"And" doesn\'t show the right relationship - second clause narrows the topic.', option_order: 4 }
          ]
        },
        {
          question_text: 'The test was <u>difficult however</u> I passed.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Missing punctuation around transitional word "however."', option_order: 1 },
            { text: 'difficult; however,', is_correct: true, explanation: 'Correct! Semicolon before and comma after "however" when joining clauses.', option_order: 2 },
            { text: 'difficult, however,', is_correct: false, explanation: 'Comma splice - need semicolon before "however."', option_order: 3 },
            { text: 'difficult, however', is_correct: false, explanation: 'Comma splice and missing comma after "however."', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: Sentence Structure Mastery',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: '<u>When the bell rang</u> students rushed to the cafeteria.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Missing comma after opening dependent clause.', option_order: 1 },
            { text: 'When the bell rang,', is_correct: true, explanation: 'Correct! Dependent clauses at the start need commas.', option_order: 2 },
            { text: 'The bell rang', is_correct: false, explanation: 'Changes meaning - loses the time relationship.', option_order: 3 },
            { text: 'When the bell rang;', is_correct: false, explanation: 'Semicolons join independent clauses, not dependent ones.', option_order: 4 }
          ]
        },
        {
          question_text: 'The concert was <u>amazing, and</u> the crowd loved it.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! FANBOYS with comma properly joins independent clauses.', option_order: 1 },
            { text: 'amazing and', is_correct: false, explanation: 'Missing comma before FANBOYS.', option_order: 2 },
            { text: 'amazing; and', is_correct: false, explanation: 'Don\'t use semicolon with FANBOYS - use comma.', option_order: 3 },
            { text: 'amazing. And', is_correct: false, explanation: 'While OK, FANBOYS with comma is preferred for closely related ideas.', option_order: 4 }
          ]
        },
        {
          question_text: 'She studied for hours<u> she</u> still failed the test.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Run-on sentence - needs punctuation between independent clauses.', option_order: 1 },
            { text: ', but she', is_correct: true, explanation: 'Correct! "But" shows contrast and properly joins the clauses.', option_order: 2 },
            { text: ', she', is_correct: false, explanation: 'Comma splice - need FANBOYS or stronger punctuation.', option_order: 3 },
            { text: 'and she', is_correct: false, explanation: 'Missing comma before FANBOYS, and "and" doesn\'t show contrast.', option_order: 4 }
          ]
        },
        {
          question_text: 'The team <u>won, the</u> fans celebrated wildly.',
          question_order: 4,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Comma splice - can\'t join independent clauses with just a comma.', option_order: 1 },
            { text: 'won, and the', is_correct: true, explanation: 'Correct! FANBOYS "and" with comma properly joins the clauses.', option_order: 2 },
            { text: 'won the', is_correct: false, explanation: 'Run-on sentence - creates confusion about what the team won.', option_order: 3 },
            { text: 'won; the', is_correct: false, explanation: 'While grammatically OK, FANBOYS better shows the sequence relationship.', option_order: 4 }
          ]
        },
        {
          question_text: '<u>After finishing my homework.</u> I watched TV.',
          question_order: 5,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Fragment - "After finishing my homework" can\'t stand alone.', option_order: 1 },
            { text: 'After finishing my homework,', is_correct: true, explanation: 'Correct! Connects the dependent phrase to the independent clause.', option_order: 2 },
            { text: 'After finishing my homework', is_correct: false, explanation: 'Missing comma after opening phrase.', option_order: 3 },
            { text: 'Finishing my homework,', is_correct: false, explanation: 'Loses the time relationship that "after" provides.', option_order: 4 }
          ]
        }
      ]
    }
  ];

  // Insert new ACT-style quizzes
  for (const quiz of actStyleQuizzes) {
    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        lesson_id: lesson.id,
        title: quiz.title,
        intro: quiz.intro,
        quiz_type: quiz.quiz_type,
        position: quiz.position,
        is_required: quiz.is_required
      })
      .select()
      .single();

    if (quizError) {
      console.error('Error inserting quiz:', quizError);
      continue;
    }

    console.log(`✓ Added: ${quiz.title} (position ${quiz.position})`);

    for (const question of quiz.questions) {
      const { data: questionData, error: questionError } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quizData.id,
          question_text: question.question_text,
          question_order: question.question_order
        })
        .select()
        .single();

      if (questionError) {
        console.error('Error inserting question:', questionError);
        continue;
      }

      for (const option of question.options) {
        const { error: optionError } = await supabase
          .from('quiz_options')
          .insert({
            question_id: questionData.id,
            option_text: option.text,
            is_correct: option.is_correct,
            explanation: option.explanation,
            option_order: option.option_order
          });

        if (optionError) {
          console.error('Error inserting option:', optionError);
        }
      }
    }
  }

  console.log('\n✅ All Sentence Structure quizzes rewritten in ACT style!');
}

rewriteSentenceStructureQuizzes();
