import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const lessonKey = 'punctuation';

async function rewritePunctuationQuizzes() {
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
      title: 'Practice: Semicolons & Colons',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 4,
      is_required: true,
      questions: [
        {
          question_text: 'I have meetings in three cities<u>: Boston,</u> New York, and Chicago.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Colons introduce lists.', option_order: 1 },
            { text: '; Boston,', is_correct: false, explanation: 'Semicolons separate items in complex lists, not introduce them.', option_order: 2 },
            { text: ', Boston,', is_correct: false, explanation: 'Need colon to introduce the list after a complete sentence.', option_order: 3 },
            { text: '— Boston,', is_correct: false, explanation: 'While dashes can introduce lists, colons are preferred.', option_order: 4 }
          ]
        },
        {
          question_text: 'The concert was canceled<u>; the</u> weather was too severe.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Semicolons join closely related independent clauses.', option_order: 1 },
            { text: ': the', is_correct: false, explanation: 'Colons introduce explanations but need specific setup phrases.', option_order: 2 },
            { text: ', the', is_correct: false, explanation: 'Comma splice - need semicolon or FANBOYS.', option_order: 3 },
            { text: 'because the', is_correct: false, explanation: 'While this works, semicolon better emphasizes the cause-effect relationship.', option_order: 4 }
          ]
        },
        {
          question_text: 'She had one goal<u>: to</u> win the championship.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Colons introduce explanations or elaborations.', option_order: 1 },
            { text: '; to', is_correct: false, explanation: 'Semicolons join independent clauses; "to win" isn\'t independent.', option_order: 2 },
            { text: ', to', is_correct: false, explanation: 'Need colon to emphasize and introduce the specific goal.', option_order: 3 },
            { text: '— to', is_correct: false, explanation: 'While dashes work, colons are preferred for formal emphasis.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Dashes & Apostrophes',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 7,
      is_required: true,
      questions: [
        {
          question_text: 'The decision <u>was made—the</u> team would compete.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Missing space after dash.', option_order: 1 },
            { text: 'was made — the', is_correct: true, explanation: 'Correct! Dashes need spaces on both sides.', option_order: 2 },
            { text: 'was made—', is_correct: false, explanation: 'Missing "the" and creates an incomplete thought.', option_order: 3 },
            { text: 'was made: the', is_correct: false, explanation: 'Colon works but dash adds more dramatic emphasis.', option_order: 4 }
          ]
        },
        {
          question_text: 'The <u>childrens</u> toys were scattered everywhere.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Missing apostrophe for plural possession.', option_order: 1 },
            { text: 'children\'s', is_correct: true, explanation: 'Correct! Children is already plural, so just add apostrophe-s.', option_order: 2 },
            { text: 'childrens\'', is_correct: false, explanation: '"Children" is already plural - don\'t add extra s.', option_order: 3 },
            { text: 'children', is_correct: false, explanation: 'Missing possessive apostrophe - the toys belong to the children.', option_order: 4 }
          ]
        },
        {
          question_text: 'My brother <u>— who lives in Boston —</u> is visiting.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Two dashes set off nonessential information.', option_order: 1 },
            { text: ', who lives in Boston,', is_correct: false, explanation: 'Commas work but dashes add more emphasis.', option_order: 2 },
            { text: '— who lives in Boston', is_correct: false, explanation: 'Missing closing dash after nonessential info.', option_order: 3 },
            { text: 'who lives in Boston —', is_correct: false, explanation: 'Missing opening dash before nonessential info.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Apostrophes & Quotation Marks',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 10,
      is_required: true,
      questions: [
        {
          question_text: '<u>Its</u> important to check the car before <u>it\'s</u> too late.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'First "its" should be "it\'s" (it is). Second is correct.', option_order: 1 },
            { text: 'It\'s important... its too late', is_correct: true, explanation: 'Correct! "It\'s" = it is, "its" = possessive pronoun.', option_order: 2 },
            { text: 'Its important... its too late', is_correct: false, explanation: 'First needs apostrophe for "it is."', option_order: 3 },
            { text: 'It\'s important... it\'s too late', is_correct: false, explanation: 'Second should be "its" (possessive).', option_order: 4 }
          ]
        },
        {
          question_text: 'The <u>Jones\'</u> house is beautiful.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Family names add apostrophe-s for possession.', option_order: 1 },
            { text: 'Jones\'s', is_correct: true, explanation: 'Correct! Names ending in "s" add apostrophe-s.', option_order: 2 },
            { text: 'Joneses\'', is_correct: false, explanation: 'This would be for multiple Jones families.', option_order: 3 },
            { text: 'Jones', is_correct: false, explanation: 'Missing possessive form - the house belongs to the Joneses.', option_order: 4 }
          ]
        },
        {
          question_text: 'She said<u>, "The test was difficult."</u>',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Comma before quote, period inside quotation marks.', option_order: 1 },
            { text: ' "The test was difficult."', is_correct: false, explanation: 'Missing comma before the quotation.', option_order: 2 },
            { text: ', "The test was difficult".', is_correct: false, explanation: 'Period should be inside quotation marks.', option_order: 3 },
            { text: ': "The test was difficult."', is_correct: false, explanation: 'Use comma (not colon) with "said" introducing quotes.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: Advanced Punctuation',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'The team needs three things<u>: dedication,</u> practice, and teamwork.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Colon introduces list after complete sentence.', option_order: 1 },
            { text: ', dedication,', is_correct: false, explanation: 'Need colon to introduce list after complete clause.', option_order: 2 },
            { text: '; dedication,', is_correct: false, explanation: 'Semicolons separate complex list items, not introduce lists.', option_order: 3 },
            { text: '— dedication,', is_correct: false, explanation: 'Dash could work but colon is preferred for lists.', option_order: 4 }
          ]
        },
        {
          question_text: 'The result was clear<u>; we</u> had won.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Semicolon joins closely related independent clauses.', option_order: 1 },
            { text: ': we', is_correct: false, explanation: 'Colons need specific setup for explanations.', option_order: 2 },
            { text: ', we', is_correct: false, explanation: 'Comma splice - need semicolon or conjunction.', option_order: 3 },
            { text: '. We', is_correct: false, explanation: 'Period works but weakens the close relationship.', option_order: 4 }
          ]
        },
        {
          question_text: 'The book <u>— a mystery novel —</u> kept me awake.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Paired dashes set off nonessential info with emphasis.', option_order: 1 },
            { text: ', a mystery novel,', is_correct: false, explanation: 'Commas work but dashes add emphasis to the appositive.', option_order: 2 },
            { text: '— a mystery novel', is_correct: false, explanation: 'Missing closing dash.', option_order: 3 },
            { text: 'a mystery novel —', is_correct: false, explanation: 'Missing opening dash.', option_order: 4 }
          ]
        },
        {
          question_text: '<u>Whos</u> responsible for the project\'s success?',
          question_order: 4,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Missing apostrophe in contraction "who is."', option_order: 1 },
            { text: 'Who\'s', is_correct: true, explanation: 'Correct! "Who\'s" = who is. Second apostrophe (project\'s) is correct.', option_order: 2 },
            { text: 'Whose', is_correct: false, explanation: '"Whose" is possessive - need "who\'s" (who is) here.', option_order: 3 },
            { text: 'Who is', is_correct: false, explanation: 'While technically correct, "who\'s" is preferred in conversational questions.', option_order: 4 }
          ]
        },
        {
          question_text: 'The teacher announced<u>, "Class is canceled."</u>',
          question_order: 5,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Comma before quote, period inside quotation marks.', option_order: 1 },
            { text: ' "Class is canceled."', is_correct: false, explanation: 'Missing comma before quotation.', option_order: 2 },
            { text: ': "Class is canceled."', is_correct: false, explanation: 'Use comma with "announced," not colon.', option_order: 3 },
            { text: ', "Class is canceled".', is_correct: false, explanation: 'Period belongs inside quotation marks.', option_order: 4 }
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

  console.log('\n✅ All Punctuation quizzes rewritten in ACT style!');
}

rewritePunctuationQuizzes();
