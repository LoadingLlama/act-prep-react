import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const lessonId = '004d1c35-daf4-432b-9b7d-6c363d328713'; // Commas lesson

const quizzes = [
  {
    title: 'Quiz: Unnecessary Information Commas',
    intro: 'Test your understanding of unnecessary information commas and the crossing-out trick.',
    quiz_type: 'practice',
    position: 5,
    is_required: true,
    questions: [
      {
        question_text: 'Which sentence correctly uses unnecessary information commas?',
        question_order: 1,
        options: [
          { text: 'The painting in the gallery, the one with bright colors is my favorite.', is_correct: false, explanation: 'Missing comma after "colors" to close the unnecessary information.', option_order: 1 },
          { text: 'The painting in the gallery, the one with bright colors, is my favorite.', is_correct: true, explanation: 'Correct! "the one with bright colors" is unnecessary information and is properly set off by commas.', option_order: 2 },
          { text: 'The painting, in the gallery the one with bright colors, is my favorite.', is_correct: false, explanation: 'Incorrect comma placement - "in the gallery" is not unnecessary information.', option_order: 3 },
          { text: 'The painting in the gallery the one with bright colors is my favorite.', is_correct: false, explanation: 'Missing commas to set off the unnecessary information.', option_order: 4 }
        ]
      },
      {
        question_text: 'Which sentence is punctuated correctly?',
        question_order: 2,
        options: [
          { text: 'Sarah, exhausted from the race sat down on the bench.', is_correct: false, explanation: 'Missing comma after "race" to close the unnecessary phrase.', option_order: 1 },
          { text: 'Sarah exhausted from the race, sat down on the bench.', is_correct: false, explanation: 'Missing comma before "exhausted" to open the unnecessary phrase.', option_order: 2 },
          { text: 'Sarah, exhausted from the race, sat down on the bench.', is_correct: true, explanation: 'Correct! "exhausted from the race" is unnecessary information and is properly enclosed by commas.', option_order: 3 },
          { text: 'Sarah exhausted from the race sat down on the bench.', is_correct: false, explanation: 'Missing both commas to set off the unnecessary phrase.', option_order: 4 }
        ]
      },
      {
        question_text: 'Use the crossing-out trick: "The laptop on the desk the silver one needs to be charged." Where should commas go?',
        question_order: 3,
        options: [
          { text: 'The laptop on the desk, the silver one, needs to be charged.', is_correct: true, explanation: 'Correct! Crossing out "the silver one" leaves a complete sentence, so it\'s unnecessary information.', option_order: 1 },
          { text: 'The laptop, on the desk, the silver one needs to be charged.', is_correct: false, explanation: 'Crossing out "on the desk" would make "the laptop the silver one" which doesn\'t work.', option_order: 2 },
          { text: 'The laptop on the desk the silver one, needs to be charged.', is_correct: false, explanation: 'Incomplete - missing opening comma for the unnecessary information.', option_order: 3 },
          { text: 'The laptop on the desk the silver one needs to be charged.', is_correct: false, explanation: 'Missing both commas to set off "the silver one."', option_order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Quiz: Names and That/Which Rules',
    intro: 'Test your knowledge of comma rules with names, "that," and "which" phrases.',
    quiz_type: 'practice',
    position: 8,
    is_required: true,
    questions: [
      {
        question_text: 'Which sentence correctly applies the names rule?',
        question_order: 1,
        options: [
          { text: 'My sister, Emma, is studying abroad in Paris.', is_correct: false, explanation: 'If you have multiple sisters, Emma is necessary information and shouldn\'t have commas.', option_order: 1 },
          { text: 'My oldest sister Emma is studying abroad in Paris.', is_correct: true, explanation: 'Correct for someone with multiple sisters! "oldest sister" is specific, making Emma unnecessary.', option_order: 2 },
          { text: 'My teacher Mr. Johnson, assigns homework every day.', is_correct: false, explanation: 'Incorrect - needs a comma before Mr. Johnson or no commas at all.', option_order: 3 },
          { text: 'The author, Stephen King writes horror novels.', is_correct: false, explanation: 'Missing comma after "King" if treating the name as unnecessary.', option_order: 4 }
        ]
      },
      {
        question_text: 'Which sentence uses "that" or "which" correctly?',
        question_order: 2,
        options: [
          { text: 'The book, that I borrowed from the library, is overdue.', is_correct: false, explanation: '"That" phrases never get commas - they\'re always necessary information.', option_order: 1 },
          { text: 'The book that I borrowed from the library is overdue.', is_correct: true, explanation: 'Correct! "That" phrases are always necessary and never get commas.', option_order: 2 },
          { text: 'My favorite book which is on the shelf is a mystery novel.', is_correct: false, explanation: '"Which" phrases always need commas - missing comma before "which."', option_order: 3 },
          { text: 'The car which, I bought last year is red.', is_correct: false, explanation: 'Comma placement is wrong - should be "The car, which I bought last year, is red."', option_order: 4 }
        ]
      },
      {
        question_text: 'Identify the correctly punctuated sentence:',
        question_order: 3,
        options: [
          { text: 'The movie, which won an Oscar, was filmed in Italy.', is_correct: true, explanation: 'Correct! "Which" phrases are always unnecessary and need commas.', option_order: 1 },
          { text: 'The movie which won an Oscar was filmed in Italy.', is_correct: false, explanation: '"Which" phrases always need commas.', option_order: 2 },
          { text: 'The movie, that won an Oscar, was filmed in Italy.', is_correct: false, explanation: '"That" phrases never get commas.', option_order: 3 },
          { text: 'My best friend Sarah, works at the hospital.', is_correct: false, explanation: 'Incorrect - "best friend" is specific, so Sarah needs commas: "My best friend, Sarah, works..."', option_order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Quiz: Prepositional Phrases & Transitional Words',
    intro: 'Practice identifying correct comma usage with prepositional phrases and transitional words.',
    quiz_type: 'practice',
    position: 12,
    is_required: true,
    questions: [
      {
        question_text: 'Which sentence correctly punctuates a prepositional phrase?',
        question_order: 1,
        options: [
          { text: 'After the storm, the sky cleared up beautifully.', is_correct: true, explanation: 'Correct! Prepositional phrases at the front of the sentence always get a comma.', option_order: 1 },
          { text: 'After the storm the sky cleared up beautifully.', is_correct: false, explanation: 'Missing comma after the opening prepositional phrase.', option_order: 2 },
          { text: 'The keys are, on the table, next to the lamp.', is_correct: false, explanation: 'Prepositional phrases in the middle/end almost never get commas.', option_order: 3 },
          { text: 'In the morning I like to, exercise before breakfast.', is_correct: false, explanation: 'Comma is in the wrong place - should be after "morning," not before "exercise."', option_order: 4 }
        ]
      },
      {
        question_text: 'How should "however" be punctuated in this sentence? "The exam was difficult _____ I managed to pass."',
        question_order: 2,
        options: [
          { text: 'difficult, however I', is_correct: false, explanation: 'When "however" links two independent clauses, it needs a semicolon before and comma after.', option_order: 1 },
          { text: 'difficult; however, I', is_correct: true, explanation: 'Correct! Semicolon before and comma after when joining independent clauses.', option_order: 2 },
          { text: 'difficult however, I', is_correct: false, explanation: 'Missing semicolon before "however" to properly join the independent clauses.', option_order: 3 },
          { text: 'difficult, however, I', is_correct: false, explanation: 'Creates a comma splice - need a semicolon before "however."', option_order: 4 }
        ]
      },
      {
        question_text: 'Which sentence correctly uses a transitional word?',
        question_order: 3,
        options: [
          { text: 'The weather was perfect for hiking. Therefore we decided to climb the mountain.', is_correct: false, explanation: 'Missing comma after "Therefore" at the start of the sentence.', option_order: 1 },
          { text: 'The concert, nevertheless was amazing despite the rain.', is_correct: false, explanation: 'Missing comma after "nevertheless" when it\'s in the middle of a sentence.', option_order: 2 },
          { text: 'I studied for hours; however, I still felt unprepared.', is_correct: true, explanation: 'Correct! Transitional word between two independent clauses uses semicolon and comma.', option_order: 3 },
          { text: 'She wanted to go swimming however, the pool was closed.', is_correct: false, explanation: 'Missing semicolon before "however" when linking independent clauses.', option_order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Quiz: Listing Commas & Adjectives',
    intro: 'Test your understanding of listing commas and when to use commas between adjectives.',
    quiz_type: 'practice',
    position: 16,
    is_required: true,
    questions: [
      {
        question_text: 'Which sentence correctly uses listing commas?',
        question_order: 1,
        options: [
          { text: 'I need to buy eggs, milk and bread from the store.', is_correct: true, explanation: 'Correct! Lists of 3+ items need commas. The Oxford comma is optional.', option_order: 1 },
          { text: 'I need to buy eggs and, milk from the store.', is_correct: false, explanation: 'Lists of only 2 items don\'t need a comma.', option_order: 2 },
          { text: 'The movie was both exciting, and suspenseful.', is_correct: false, explanation: 'No comma needed between only two items joined by "and."', option_order: 3 },
          { text: 'She enjoys reading, writing, painting, and, hiking.', is_correct: false, explanation: 'Too many commas - remove the comma before "hiking."', option_order: 4 }
        ]
      },
      {
        question_text: 'Use the switching trick: Which sentence is correctly punctuated?',
        question_order: 2,
        options: [
          { text: 'The bright red balloon floated away.', is_correct: true, explanation: 'Correct! "red bright balloon" doesn\'t work, so no comma needed.', option_order: 1 },
          { text: 'The bright, red balloon floated away.', is_correct: false, explanation: 'You can\'t switch to "red bright balloon," so no comma is needed.', option_order: 2 },
          { text: 'The tall handsome stranger walked in.', is_correct: false, explanation: 'You CAN switch to "handsome tall stranger," so need a comma: "tall, handsome"', option_order: 3 },
          { text: 'The new sports car was expensive.', is_correct: true, explanation: 'Correct! "sports new car" doesn\'t work, so no comma needed.', option_order: 4 }
        ]
      },
      {
        question_text: 'Which sentence demonstrates proper comma usage with multiple adjectives?',
        question_order: 3,
        options: [
          { text: 'The old, rusty, broken bicycle sat in the garage.', is_correct: true, explanation: 'Correct! All adjectives can be switched, so commas are needed.', option_order: 1 },
          { text: 'The big yellow school bus stopped at the corner.', is_correct: true, explanation: 'Correct! "yellow big" and "school big" don\'t work, so no commas needed.', option_order: 2 },
          { text: 'The hot, summer day made everyone tired.', is_correct: false, explanation: '"Summer hot day" doesn\'t work, so no comma between "hot" and "summer."', option_order: 3 },
          { text: 'She wore a beautiful, silk blue dress.', is_correct: false, explanation: '"Silk beautiful" and "blue silk" placements are specific, so no commas needed.', option_order: 4 }
        ]
      }
    ]
  },
  {
    title: 'Final Mastery: Commas - All Types',
    intro: 'Comprehensive quiz covering all four types of commas from this chapter.',
    quiz_type: 'final',
    position: 999,
    is_required: true,
    questions: [
      {
        question_text: 'Identify the type of comma error: "My coach who always motivates us led the team to victory."',
        question_order: 1,
        options: [
          { text: 'Missing commas for unnecessary information', is_correct: true, explanation: 'Correct! "who always motivates us" is unnecessary and needs commas around it.', option_order: 1 },
          { text: 'Missing comma for dependent clause', is_correct: false, explanation: 'This is not a dependent clause situation - it\'s unnecessary information.', option_order: 2 },
          { text: 'Incorrect listing commas', is_correct: false, explanation: 'This is not a list - it\'s unnecessary information.', option_order: 3 },
          { text: 'No error', is_correct: false, explanation: 'There is an error - missing commas for unnecessary information.', option_order: 4 }
        ]
      },
      {
        question_text: 'Which sentence has NO comma errors?',
        question_order: 2,
        options: [
          { text: 'Before the concert we grabbed dinner, and then we found our seats.', is_correct: false, explanation: 'Missing comma after "concert" (opening prepositional phrase).', option_order: 1 },
          { text: 'The book that I recommended is available at the library.', is_correct: true, explanation: 'Correct! "That" phrases never get commas, and this is properly punctuated.', option_order: 2 },
          { text: 'My youngest brother Jake is learning to play guitar.', is_correct: false, explanation: '"Youngest brother" is specific, so Jake should have commas around it.', option_order: 3 },
          { text: 'The warm, sunny beach day was perfect for swimming.', is_correct: false, explanation: '"Sunny warm" works, but "beach" is a category, not switchable quality - "beach warm day" doesn\'t work.', option_order: 4 }
        ]
      },
      {
        question_text: 'Fix this sentence: "The restaurant which serves Italian food has the best pasta pizza and salad."',
        question_order: 3,
        options: [
          { text: 'The restaurant which serves Italian food has the best pasta, pizza, and salad.', is_correct: false, explanation: '"Which" phrases need commas around them.', option_order: 1 },
          { text: 'The restaurant, which serves Italian food, has the best pasta, pizza, and salad.', is_correct: true, explanation: 'Correct! Commas around "which" phrase and in the list of 3+ items.', option_order: 2 },
          { text: 'The restaurant, which serves Italian food has the best pasta, pizza, and salad.', is_correct: false, explanation: 'Missing closing comma after "food" for the "which" phrase.', option_order: 3 },
          { text: 'The restaurant which serves Italian food, has the best pasta, pizza and, salad.', is_correct: false, explanation: 'Missing commas around "which" and incorrect comma placement in list.', option_order: 4 }
        ]
      },
      {
        question_text: 'Apply the 1-comma rule: "Running through the park I saw three deer."',
        question_order: 4,
        options: [
          { text: 'Running through the park, I saw three deer.', is_correct: true, explanation: 'Correct! Opening phrase followed by independent clause - proper use of single comma.', option_order: 1 },
          { text: 'Running, through the park I saw three deer.', is_correct: false, explanation: 'Incorrect comma placement - splits the opening phrase incorrectly.', option_order: 2 },
          { text: 'Running through the park I saw, three deer.', is_correct: false, explanation: 'Comma in wrong place - creates fragment before comma.', option_order: 3 },
          { text: 'Running through the park I saw three deer.', is_correct: false, explanation: 'Missing comma after the opening phrase.', option_order: 4 }
        ]
      },
      {
        question_text: 'Choose the sentence with perfect comma usage:',
        question_order: 5,
        options: [
          { text: 'The talented, young musician performed beautifully; however, the audience remained silent.', is_correct: true, explanation: 'Correct! Adjective comma (switchable), and proper semicolon + comma with "however."', option_order: 1 },
          { text: 'My friend, Maria and I went shopping for new winter coats.', is_correct: false, explanation: 'If Maria is one friend among many, no commas. If she\'s your only friend there, need commas around Maria.', option_order: 2 },
          { text: 'Although it was raining we decided to hike the trail.', is_correct: false, explanation: 'Missing comma after opening dependent clause "Although it was raining."', option_order: 3 },
          { text: 'The bright, orange, autumn leaves fell from the trees.', is_correct: false, explanation: '"Orange" and "autumn" can\'t be switched ("autumn orange leaves" doesn\'t work), so remove comma between them.', option_order: 4 }
        ]
      }
    ]
  }
];

async function addQuizzesToLesson() {
  for (const quiz of quizzes) {
    // Insert quiz
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

    // Insert questions
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

      // Insert options
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

  console.log('\n✅ All quizzes added successfully!');
  console.log(`\nQuiz positions:
  - Quiz 1: Unnecessary Information (position 5)
  - Quiz 2: Names & That/Which (position 8)
  - Quiz 3: Prepositional & Transitional (position 12)
  - Quiz 4: Listing & Adjectives (position 16)
  - Final Quiz: All Types (position 999)`);
}

addQuizzesToLesson();
