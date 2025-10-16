import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const lessonId = '1b366fa7-1b6b-4bf6-b37d-636efa9cf523'; // Punctuation lesson

const quizzes = [
  {
    title: 'Quiz: Semicolons & Colons',
    intro: 'Test your understanding of semicolons and colons and their proper usage.',
    quiz_type: 'practice',
    position: 4,
    is_required: true,
    questions: [
      {
        question_text: 'Which sentence correctly uses a semicolon?',
        question_order: 1,
        options: [
          { text: 'I love to read; mystery novels are my favorite.', is_correct: true, explanation: 'Correct! Both sides of the semicolon are independent clauses.', option_order: 1 },
          { text: 'I love to read; especially mystery novels.', is_correct: false, explanation: '"especially mystery novels" is not an independent clause.', option_order: 2 },
          { text: 'After finishing my book; I started another one.', is_correct: false, explanation: '"After finishing my book" is not an independent clause.', option_order: 3 },
          { text: 'The library was closed, I went home instead.', is_correct: false, explanation: 'This is a comma splice - needs a semicolon, not a comma.', option_order: 4 }
        ]
      },
      {
        question_text: 'Choose the sentence with correct colon usage:',
        question_order: 2,
        options: [
          { text: 'I need to buy: eggs, milk, and bread.', is_correct: false, explanation: 'The part before the colon is not an independent clause.', option_order: 1 },
          { text: 'I need to buy three items: eggs, milk, and bread.', is_correct: true, explanation: 'Correct! Independent clause before the colon, list after.', option_order: 2 },
          { text: 'For dinner I made: chicken and rice.', is_correct: false, explanation: 'The part before the colon is not an independent clause.', option_order: 3 },
          { text: 'My shopping list includes: apples and oranges.', is_correct: false, explanation: 'The part before the colon is not an independent clause.', option_order: 4 }
        ]
      },
      {
        question_text: 'Which sentence violates colon rules?',
        question_order: 3,
        options: [
          { text: 'She loves all genres of music: jazz, rock, and classical.', is_correct: false, explanation: 'This correctly uses a colon - independent clause followed by a list.', option_order: 1 },
          { text: 'I have one goal for the year: to run a marathon.', is_correct: false, explanation: 'This correctly uses a colon - independent clause followed by explanation.', option_order: 2 },
          { text: 'The menu includes: burgers, fries, and shakes.', is_correct: true, explanation: 'Incorrect! "The menu includes" is not an independent clause. Should be "The menu includes burgers, fries, and shakes."', option_order: 3 },
          { text: 'Remember this rule: never use colons with "including."', is_correct: false, explanation: 'This correctly uses a colon - independent clause followed by definition/rule.', option_order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Quiz: Dashes & Apostrophes',
    intro: 'Practice using dashes for emphasis and apostrophes for possession and contractions.',
    quiz_type: 'practice',
    position: 7,
    is_required: true,
    questions: [
      {
        question_text: 'Which sentence correctly uses a pair of dashes?',
        question_order: 1,
        options: [
          { text: 'The concert – which was amazing, ended at midnight.', is_correct: false, explanation: 'Cannot mix punctuation - use either two dashes or two commas.', option_order: 1 },
          { text: 'The concert – which was amazing – ended at midnight.', is_correct: true, explanation: 'Correct! Pair of dashes properly sets off unnecessary information.', option_order: 2 },
          { text: 'The concert, which was amazing – ended at midnight.', is_correct: false, explanation: 'Cannot mix punctuation - use matching pairs.', option_order: 3 },
          { text: 'The concert which was amazing – ended at midnight.', is_correct: false, explanation: 'Need a dash before "which" to open the unnecessary information.', option_order: 4 }
        ]
      },
      {
        question_text: 'Identify the sentence with correct apostrophe usage:',
        question_order: 2,
        options: [
          { text: "The dogs bone was buried in the backyard.", is_correct: false, explanation: 'Missing apostrophe - should be "dog\'s bone" for singular possession.', option_order: 1 },
          { text: "The dogs\' toys were scattered across the floor.", is_correct: true, explanation: 'Correct! Plural possessive: apostrophe after the "s" for multiple dogs.', option_order: 2 },
          { text: "Its\' a beautiful day for a picnic.", is_correct: false, explanation: 'Incorrect - "It\'s" (it is) needs apostrophe before "s", and possessive "its" has no apostrophe.', option_order: 3 },
          { text: "The childrens\' playground was renovated.", is_correct: false, explanation: 'Incorrect - "children" is already plural, so it\'s "children\'s" not "childrens\'"', option_order: 4 }
        ]
      },
      {
        question_text: 'Which shows correct singular possessive usage?',
        question_order: 3,
        options: [
          { text: "James car is parked outside.", is_correct: false, explanation: 'Missing apostrophe - should be "James\'s" or "James\'" for singular possession.', option_order: 1 },
          { text: "James\' car is parked outside.", is_correct: true, explanation: 'Correct! Singular noun ending in "s" can add just an apostrophe.', option_order: 2 },
          { text: "The womens\' team won the championship.", is_correct: false, explanation: 'Incorrect - "women" is already plural, should be "women\'s"', option_order: 3 },
          { text: "Its raining outside today.", is_correct: false, explanation: 'Missing apostrophe - contraction "it is" should be "It\'s"', option_order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Quiz: All Punctuation Types',
    intro: 'Test your comprehensive understanding of semicolons, colons, dashes, and apostrophes.',
    quiz_type: 'practice',
    position: 10,
    is_required: true,
    questions: [
      {
        question_text: 'Choose the correctly punctuated sentence:',
        question_order: 1,
        options: [
          { text: 'The companys profits increased; they hired more employees.', is_correct: false, explanation: 'Missing apostrophe - should be "company\'s profits"', option_order: 1 },
          { text: 'The company\'s profits increased; they hired more employees.', is_correct: true, explanation: 'Correct! Proper possessive apostrophe and semicolon joining two independent clauses.', option_order: 2 },
          { text: 'The companies profit\'s increased; they hired more employees.', is_correct: false, explanation: 'Incorrect apostrophe placement - "profits" is plural, not possessive.', option_order: 3 },
          { text: 'The company\'s profits increased, they hired more employees.', is_correct: false, explanation: 'Comma splice - need semicolon to join independent clauses.', option_order: 4 }
        ]
      },
      {
        question_text: 'Which sentence demonstrates proper use of a single dash?',
        question_order: 2,
        options: [
          { text: 'She wanted one thing – to win the race.', is_correct: true, explanation: 'Correct! Single dash acts like a colon, with independent clause before it.', option_order: 1 },
          { text: 'She wanted – to win the race.', is_correct: false, explanation: 'Incorrect - not an independent clause before the dash.', option_order: 2 },
          { text: 'She wanted one thing – including a victory.', is_correct: false, explanation: 'Never use dash or colon with "including"', option_order: 3 },
          { text: 'She wanted one thing, to win the race.', is_correct: false, explanation: 'Should use a dash or colon here, not a comma.', option_order: 4 }
        ]
      },
      {
        question_text: 'Fix this sentence: "The students who studied hard passed their exams the others didnt."',
        question_order: 3,
        options: [
          { text: 'The students who studied hard passed their exams; the others didn\'t.', is_correct: true, explanation: 'Correct! Semicolon joins independent clauses, and "didn\'t" is properly contracted.', option_order: 1 },
          { text: 'The students who studied hard passed their exams, the others didn\'t.', is_correct: false, explanation: 'Comma splice - need semicolon to join independent clauses.', option_order: 2 },
          { text: 'The students who studied hard passed their exams; the others did\'nt.', is_correct: false, explanation: 'Incorrect contraction - should be "didn\'t" not "did\'nt"', option_order: 3 },
          { text: 'The students who studied hard passed their exams: the others didn\'t.', is_correct: false, explanation: 'Colon is incorrect here - second clause doesn\'t explain or define the first.', option_order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Final Mastery: Advanced Punctuation',
    intro: 'Comprehensive final quiz covering all punctuation concepts from this chapter.',
    quiz_type: 'final',
    position: 999,
    is_required: true,
    questions: [
      {
        question_text: 'Identify the sentence with NO punctuation errors:',
        question_order: 1,
        options: [
          { text: 'My favorite foods are: pizza, tacos, and sushi.', is_correct: false, explanation: 'Colon error - "My favorite foods are" is not an independent clause.', option_order: 1 },
          { text: 'I have three favorite foods: pizza, tacos, and sushi.', is_correct: true, explanation: 'Correct! Independent clause before colon, proper list after.', option_order: 2 },
          { text: 'My brother\'s friend\'s, including Mark, are coming over.', is_correct: false, explanation: 'Incorrect apostrophe in "friend\'s" - should be "friends" (plural).', option_order: 3 },
          { text: 'The presentation was excellent; however the conclusion was weak.', is_correct: false, explanation: 'Missing comma after "however"', option_order: 4 }
        ]
      },
      {
        question_text: 'Which correctly uses both semicolons and apostrophes?',
        question_order: 2,
        options: [
          { text: 'The dog\'s collar is blue; it\'s owner loves that color.', is_correct: false, explanation: '"it\'s" should be "its" (possessive, no apostrophe).', option_order: 1 },
          { text: 'The dogs collar is blue; its owner loves that color.', is_correct: false, explanation: 'Missing apostrophe in "dog\'s"', option_order: 2 },
          { text: 'The dog\'s collar is blue; its owner loves that color.', is_correct: true, explanation: 'Correct! "dog\'s" is possessive, semicolon joins clauses, "its" is possessive pronoun.', option_order: 3 },
          { text: 'The dogs\' collar is blue; it\'s owner loves that color.', is_correct: false, explanation: 'Wrong apostrophe in "dogs\'" (should be "dog\'s" for one dog) and "it\'s" (should be "its").', option_order: 4 }
        ]
      },
      {
        question_text: 'Select the sentence that uses dashes correctly:',
        question_order: 3,
        options: [
          { text: 'The recipe – a family secret, has been passed down for generations.', is_correct: false, explanation: 'Cannot mix punctuation - need matching dashes or commas.', option_order: 1 },
          { text: 'The recipe – a family secret – has been passed down for generations.', is_correct: true, explanation: 'Correct! Pair of dashes properly sets off unnecessary information.', option_order: 2 },
          { text: 'The recipe, a family secret – has been passed down for generations.', is_correct: false, explanation: 'Cannot mix punctuation - need matching pairs.', option_order: 3 },
          { text: 'The recipe a family secret – has been passed down for generations.', is_correct: false, explanation: 'Missing opening dash or comma before "a family secret"', option_order: 4 }
        ]
      },
      {
        question_text: 'Complex sentence: "The teachers lounge a quiet space is where faculty members relax between classes."',
        question_order: 4,
        options: [
          { text: 'The teachers\' lounge – a quiet space – is where faculty members relax between classes.', is_correct: true, explanation: 'Correct! Plural possessive "teachers\'" and pair of dashes for unnecessary info.', option_order: 1 },
          { text: 'The teacher\'s lounge – a quiet space, is where faculty members relax between classes.', is_correct: false, explanation: 'Cannot mix dash and comma - need matching pairs.', option_order: 2 },
          { text: 'The teachers lounge – a quiet space – is where faculty members relax between classes.', is_correct: false, explanation: 'Missing apostrophe - should be "teachers\'" (plural possessive).', option_order: 3 },
          { text: 'The teachers\' lounge, a quiet space – is where faculty members relax between classes.', is_correct: false, explanation: 'Cannot mix comma and dash - need matching pairs.', option_order: 4 }
        ]
      },
      {
        question_text: 'Choose the sentence with perfect punctuation:',
        question_order: 5,
        options: [
          { text: 'After reviewing the data; the researchers concluded: the experiment was a success.', is_correct: false, explanation: 'Semicolon error - "After reviewing the data" is not independent. Colon is correct.', option_order: 1 },
          { text: 'After reviewing the data, the researchers concluded the experiment was a success.', is_correct: true, explanation: 'Correct! Comma after dependent clause, no colon needed as sentence continues naturally.', option_order: 2 },
          { text: 'After reviewing the data the researchers concluded: the experiment was a success.', is_correct: false, explanation: 'Missing comma after opening dependent clause.', option_order: 3 },
          { text: 'After reviewing the data; the researchers concluded the experiment was a success.', is_correct: false, explanation: 'Semicolon error - first part is not an independent clause.', option_order: 4 }
        ]
      }
    ]
  }
];

async function addQuizzesToLesson() {
  for (const quiz of quizzes) {
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

    console.log(`✓ Added quiz: ${quiz.title} at position ${quiz.position}`);

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

  console.log('\n✅ All quizzes added to Punctuation lesson!');
  console.log(`\nQuiz positions:
  - Quiz 1: Semicolons & Colons (position 4)
  - Quiz 2: Dashes & Apostrophes (position 7)
  - Quiz 3: All Punctuation Types (position 10)
  - Final Quiz: Advanced Punctuation (position 999)`);
}

addQuizzesToLesson();
