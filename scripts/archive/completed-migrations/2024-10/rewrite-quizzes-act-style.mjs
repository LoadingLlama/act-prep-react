import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const lessonId = '004d1c35-daf4-432b-9b7d-6c363d328713'; // Commas lesson

async function rewriteQuizzesACTStyle() {
  // Delete all existing quizzes
  await supabase
    .from('quizzes')
    .delete()
    .eq('lesson_id', lessonId);

  console.log('✓ Deleted old quizzes\n');

  const actStyleQuizzes = [
    {
      title: 'Practice: Unnecessary Information Commas',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 7,
      is_required: true,
      questions: [
        {
          question_text: 'The museum <u>exhibit, which features ancient artifacts,</u> opens next week.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! "which features ancient artifacts" is unnecessary information and needs commas.', option_order: 1 },
            { text: 'exhibit which features ancient artifacts', is_correct: false, explanation: '"Which" phrases always need commas.', option_order: 2 },
            { text: 'exhibit, which features ancient artifacts', is_correct: false, explanation: 'Missing closing comma after "artifacts."', option_order: 3 },
            { text: 'exhibit which features ancient artifacts,', is_correct: false, explanation: 'Missing opening comma before "which."', option_order: 4 }
          ]
        },
        {
          question_text: 'Sarah <u>exhausted from the long hike</u> decided to rest.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"exhausted from the long hike" is unnecessary info and needs commas.', option_order: 1 },
            { text: 'exhausted from the long hike,', is_correct: false, explanation: 'Missing opening comma before "exhausted."', option_order: 2 },
            { text: ', exhausted from the long hike,', is_correct: true, explanation: 'Correct! Unnecessary information needs commas on both sides.', option_order: 3 },
            { text: 'exhausted, from the long hike', is_correct: false, explanation: 'Comma is in the wrong place within the phrase.', option_order: 4 }
          ]
        },
        {
          question_text: 'The laptop <u>on the desk, the silver one</u> needs charging.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Missing closing comma after "one" to complete the unnecessary info.', option_order: 1 },
            { text: 'on the desk, the silver one,', is_correct: true, explanation: 'Correct! "the silver one" is unnecessary and needs commas on both sides.', option_order: 2 },
            { text: 'on the desk the silver one,', is_correct: false, explanation: 'Missing opening comma before "the silver one."', option_order: 3 },
            { text: 'on the desk the silver one', is_correct: false, explanation: 'Unnecessary information needs to be set off by commas.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Names and That/Which Rules',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 10,
      is_required: true,
      questions: [
        {
          question_text: 'My <u>friend, Maria,</u> just moved to Seattle.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'If you have multiple friends, Maria is necessary info and shouldn\'t have commas.', option_order: 1 },
            { text: 'friend Maria', is_correct: true, explanation: 'Correct! "friend" is not specific, so the name Maria is necessary.', option_order: 2 },
            { text: 'friend, Maria', is_correct: false, explanation: 'Can\'t mix - need either both commas or no commas.', option_order: 3 },
            { text: 'friend Maria,', is_correct: false, explanation: 'Can\'t have just one comma for a name.', option_order: 4 }
          ]
        },
        {
          question_text: 'The book <u>that I borrowed</u> from the library is overdue.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! "That" phrases never get commas.', option_order: 1 },
            { text: ', that I borrowed,', is_correct: false, explanation: '"That" phrases are always necessary and never get commas.', option_order: 2 },
            { text: 'that I borrowed,', is_correct: false, explanation: '"That" phrases never get commas.', option_order: 3 },
            { text: ', that I borrowed', is_correct: false, explanation: '"That" phrases never get commas.', option_order: 4 }
          ]
        },
        {
          question_text: 'My car <u>which I bought last year</u> needs new tires.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Which" phrases always need commas.', option_order: 1 },
            { text: ', which I bought last year,', is_correct: true, explanation: 'Correct! "Which" phrases are always unnecessary and need commas.', option_order: 2 },
            { text: 'which I bought last year,', is_correct: false, explanation: 'Missing opening comma before "which."', option_order: 3 },
            { text: ', which I bought last year', is_correct: false, explanation: 'Missing closing comma after "year."', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Prepositional & Transitional Words',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 16,
      is_required: true,
      questions: [
        {
          question_text: '<u>After the storm</u> the sky cleared beautifully.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Opening prepositional phrases need a comma after them.', option_order: 1 },
            { text: 'After the storm,', is_correct: true, explanation: 'Correct! Prepositional phrases at the start always get a comma.', option_order: 2 },
            { text: 'After, the storm', is_correct: false, explanation: 'Comma is in the wrong place.', option_order: 3 },
            { text: 'After the storm;', is_correct: false, explanation: 'Use a comma, not a semicolon.', option_order: 4 }
          ]
        },
        {
          question_text: 'The exam was difficult<u>; however,</u> I managed to pass.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Semicolon before and comma after when "however" joins independent clauses.', option_order: 1 },
            { text: ', however,', is_correct: false, explanation: 'Creates comma splice - need semicolon before "however."', option_order: 2 },
            { text: '; however', is_correct: false, explanation: 'Missing comma after "however."', option_order: 3 },
            { text: 'however,', is_correct: false, explanation: 'Missing semicolon before "however" to join the clauses.', option_order: 4 }
          ]
        },
        {
          question_text: 'The concert<u>, nevertheless,</u> was amazing despite the rain.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Transitional words in the middle need commas on both sides.', option_order: 1 },
            { text: 'nevertheless,', is_correct: false, explanation: 'Missing opening comma before "nevertheless."', option_order: 2 },
            { text: ', nevertheless', is_correct: false, explanation: 'Missing closing comma after "nevertheless."', option_order: 3 },
            { text: 'nevertheless', is_correct: false, explanation: 'Transitional words in the middle need commas on both sides.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Listing Commas & Adjectives',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 22,
      is_required: true,
      questions: [
        {
          question_text: 'I need to buy <u>eggs, milk, and bread</u> from the store.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Lists of 3+ items need commas.', option_order: 1 },
            { text: 'eggs and milk and bread', is_correct: false, explanation: 'Lists of 3+ items need commas, not just "and."', option_order: 2 },
            { text: 'eggs, and, milk, and bread', is_correct: false, explanation: 'Too many commas - only separate items, not before every "and."', option_order: 3 },
            { text: 'eggs milk and bread', is_correct: false, explanation: 'Missing commas to separate list items.', option_order: 4 }
          ]
        },
        {
          question_text: 'The <u>tall, handsome</u> stranger walked into the room.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! "handsome tall" works, so you can switch them - need comma.', option_order: 1 },
            { text: 'tall handsome', is_correct: false, explanation: 'These adjectives can be switched, so they need a comma.', option_order: 2 },
            { text: 'tall; handsome', is_correct: false, explanation: 'Use comma, not semicolon, between adjectives.', option_order: 3 },
            { text: 'tall and handsome', is_correct: false, explanation: 'While grammatically ok, ACT prefers comma for switchable adjectives.', option_order: 4 }
          ]
        },
        {
          question_text: 'She wore a beautiful <u>silk</u> dress to the party.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! "silk beautiful" doesn\'t work - can\'t switch, so no comma.', option_order: 1 },
            { text: 'silk,', is_correct: false, explanation: 'These adjectives can\'t be switched, so no comma needed.', option_order: 2 },
            { text: 'silk and', is_correct: false, explanation: 'No comma or "and" needed when adjectives can\'t be switched.', option_order: 3 },
            { text: 'silk;', is_correct: false, explanation: 'No punctuation needed between these adjectives.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: All Comma Types',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'My youngest brother<u>, Jake,</u> is learning guitar.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! "youngest brother" is specific, so Jake is unnecessary.', option_order: 1 },
            { text: 'brother, Jake', is_correct: false, explanation: 'Missing closing comma - need both or neither.', option_order: 2 },
            { text: 'brother Jake,', is_correct: false, explanation: 'Missing opening comma - need both or neither.', option_order: 3 },
            { text: 'brother Jake', is_correct: false, explanation: '"Youngest brother" is specific to one person, so name needs commas.', option_order: 4 }
          ]
        },
        {
          question_text: 'The restaurant<u>, which serves Italian food,</u> has great pasta.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! "Which" phrases always need commas.', option_order: 1 },
            { text: 'which serves Italian food', is_correct: false, explanation: '"Which" phrases always need commas.', option_order: 2 },
            { text: ', which serves Italian food', is_correct: false, explanation: 'Missing closing comma after "food."', option_order: 3 },
            { text: 'that serves Italian food', is_correct: false, explanation: '"That" would work but changes meaning - original "which" needs commas.', option_order: 4 }
          ]
        },
        {
          question_text: '<u>Running through the park,</u> I saw three deer.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Opening phrase gets a comma before main clause.', option_order: 1 },
            { text: 'Running through the park', is_correct: false, explanation: 'Missing comma after opening phrase.', option_order: 2 },
            { text: 'Running, through the park,', is_correct: false, explanation: 'Comma incorrectly splits the opening phrase.', option_order: 3 },
            { text: 'Running through the park;', is_correct: false, explanation: 'Use comma, not semicolon, after opening phrase.', option_order: 4 }
          ]
        },
        {
          question_text: 'The talented<u>, young,</u> musician performed beautifully.',
          question_order: 4,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! "young talented" works - switchable adjectives need comma.', option_order: 1 },
            { text: 'young', is_correct: false, explanation: 'These adjectives are switchable, so they need a comma.', option_order: 2 },
            { text: 'and young', is_correct: false, explanation: 'Use comma, not "and," for switchable adjectives.', option_order: 3 },
            { text: '; young,', is_correct: false, explanation: 'Use comma, not semicolon, between adjectives.', option_order: 4 }
          ]
        },
        {
          question_text: 'I studied for hours<u>; however,</u> I still felt unprepared.',
          question_order: 5,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Semicolon + comma when "however" joins independent clauses.', option_order: 1 },
            { text: ', however,', is_correct: false, explanation: 'Comma splice - need semicolon before "however."', option_order: 2 },
            { text: '; however', is_correct: false, explanation: 'Missing comma after "however."', option_order: 3 },
            { text: 'however,', is_correct: false, explanation: 'Need semicolon before "however" to join independent clauses.', option_order: 4 }
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
        lesson_id: lessonId,
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

  console.log('\n✅ All quizzes rewritten in ACT style!');
  console.log('\nKey changes:');
  console.log('  • Questions show sentence with <u>underlined portion</u>');
  console.log('  • First answer is always "NO CHANGE"');
  console.log('  • Alternatives show the underlined part with variations');
  console.log('  • Matches real ACT English question format\n');
}

rewriteQuizzesACTStyle();
