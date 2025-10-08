import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createQuizForLesson(lessonKey, quizzes) {
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('lesson_key', lessonKey)
    .single();

  if (lessonError || !lesson) {
    console.error(`Error fetching lesson ${lessonKey}:`, lessonError);
    return;
  }

  console.log(`\n=== ${lesson.title} ===\n`);

  for (const quiz of quizzes) {
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
}

async function createAllRemainingQuizzes() {
  // Chapter 10: Redundancy
  await createQuizForLesson('redundancy', [
    {
      title: 'Practice: Eliminating Redundancy',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'The end result <u>was</u> successful.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"End result" is redundant. Just use "result."', option_order: 1 },
            { text: 'DELETE the underlined portion and write: The result was', is_correct: true, explanation: 'Correct! "End" is redundant with "result."', option_order: 2 },
            { text: 'turned out to be', is_correct: false, explanation: 'Doesn\'t eliminate redundancy.', option_order: 3 },
            { text: 'ended up being', is_correct: false, explanation: 'Even wordier.', option_order: 4 }
          ]
        },
        {
          question_text: 'She <u>returned back</u> to her hometown.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Returned back" is redundant - "returned" means "went back."', option_order: 1 },
            { text: 'returned', is_correct: true, explanation: 'Correct! "Returned" already means "came/went back."', option_order: 2 },
            { text: 'went back and returned', is_correct: false, explanation: 'Extremely redundant.', option_order: 3 },
            { text: 'came back', is_correct: false, explanation: 'While not redundant, "returned" is more concise.', option_order: 4 }
          ]
        },
        {
          question_text: 'In <u>my personal opinion</u>, the movie was great.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"My opinion" is inherently personal.', option_order: 1 },
            { text: 'my opinion', is_correct: true, explanation: 'Correct! "Personal" is redundant with "my opinion."', option_order: 2 },
            { text: 'my own personal opinion', is_correct: false, explanation: 'Even more redundant.', option_order: 3 },
            { text: 'my view and opinion', is_correct: false, explanation: 'Redundant - view and opinion are synonyms.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: Conciseness Mastery',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'The <u>past history</u> of the building is fascinating.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'History is always about the past.', option_order: 1 },
            { text: 'history', is_correct: true, explanation: 'Correct! "Past" is redundant with "history."', option_order: 2 },
            { text: 'past historical record', is_correct: false, explanation: 'Extremely redundant.', option_order: 3 },
            { text: 'historical past', is_correct: false, explanation: 'Still redundant.', option_order: 4 }
          ]
        },
        {
          question_text: 'They <u>surrounded</u> the building <u>on all sides</u>.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Surrounded" means "on all sides."', option_order: 1 },
            { text: 'surrounded the building', is_correct: true, explanation: 'Correct! "Surrounded" already means "on all sides."', option_order: 2 },
            { text: 'encircled the building on all sides', is_correct: false, explanation: 'Still redundant.', option_order: 3 },
            { text: 'surrounded completely the building', is_correct: false, explanation: '"Completely" is also redundant with "surrounded."', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Chapter 11: Word Choice
  await createQuizForLesson('word-choice', [
    {
      title: 'Practice: Precise Word Choice',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'The storm had a significant <u>affect</u> on the crops.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Affect" is usually a verb; need noun "effect."', option_order: 1 },
            { text: 'effect', is_correct: true, explanation: 'Correct! "Effect" is the noun meaning "result."', option_order: 2 },
            { text: 'affectation', is_correct: false, explanation: '"Affectation" means "pretense," not "result."', option_order: 3 },
            { text: 'effective', is_correct: false, explanation: '"Effective" is an adjective, need a noun.', option_order: 4 }
          ]
        },
        {
          question_text: 'The data <u>suggests</u> a clear pattern.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Data" is plural; need "suggest."', option_order: 1 },
            { text: 'suggest', is_correct: true, explanation: 'Correct! "Data" is plural (datum is singular).', option_order: 2 },
            { text: 'is suggesting', is_correct: false, explanation: 'Still uses singular verb incorrectly.', option_order: 3 },
            { text: 'were suggesting', is_correct: false, explanation: 'Wrong tense for the context.', option_order: 4 }
          ]
        },
        {
          question_text: 'She was <u>disinterested</u> in the gossip.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Disinterested" means "impartial." Use "uninterested."', option_order: 1 },
            { text: 'uninterested', is_correct: true, explanation: 'Correct! "Uninterested" means "not interested."', option_order: 2 },
            { text: 'non-interested', is_correct: false, explanation: 'Not standard usage; use "uninterested."', option_order: 3 },
            { text: 'disinteresting', is_correct: false, explanation: 'Not a real word.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: Word Choice Mastery',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'The movie had <u>less</u> action scenes than expected.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Countable items use "fewer," not "less."', option_order: 1 },
            { text: 'fewer', is_correct: true, explanation: 'Correct! Use "fewer" for countable nouns.', option_order: 2 },
            { text: 'lesser', is_correct: false, explanation: '"Lesser" compares importance, not quantity.', option_order: 3 },
            { text: 'not as many', is_correct: false, explanation: 'While correct, "fewer" is more concise.', option_order: 4 }
          ]
        },
        {
          question_text: 'The answer <u>implies</u> a deeper problem.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! "Implies" means "suggests indirectly."', option_order: 1 },
            { text: 'infers', is_correct: false, explanation: 'People infer; things imply.', option_order: 2 },
            { text: 'insinuates', is_correct: false, explanation: 'Usually negative; "implies" is neutral.', option_order: 3 },
            { text: 'alludes to', is_correct: false, explanation: '"Alludes" is for indirect references, not suggestions.', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Chapter 12: Transitions
  await createQuizForLesson('transitions', [
    {
      title: 'Practice: Choosing Transitions',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'The weather was terrible. <u>Therefore</u>, we went to the beach.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Therefore" shows cause-effect, but going to beach despite bad weather is contrast.', option_order: 1 },
            { text: 'However', is_correct: true, explanation: 'Correct! Shows contrast between bad weather and still going.', option_order: 2 },
            { text: 'Furthermore', is_correct: false, explanation: '"Furthermore" adds supporting info, doesn\'t fit here.', option_order: 3 },
            { text: 'Consequently', is_correct: false, explanation: 'Shows result, but beach trip isn\'t result of bad weather.', option_order: 4 }
          ]
        },
        {
          question_text: 'She studied hard. <u>In addition</u>, she passed with honors.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"In addition" suggests adding info, but this is a result.', option_order: 1 },
            { text: 'As a result', is_correct: true, explanation: 'Correct! Shows cause (studying) and effect (passing).', option_order: 2 },
            { text: 'On the other hand', is_correct: false, explanation: 'Shows contrast, not result.', option_order: 3 },
            { text: 'For example', is_correct: false, explanation: 'Introduces examples, not results.', option_order: 4 }
          ]
        },
        {
          question_text: 'The experiment failed. <u>Similarly</u>, the follow-up test was unsuccessful.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! "Similarly" shows both had same outcome.', option_order: 1 },
            { text: 'However', is_correct: false, explanation: 'Shows contrast, but both failed (similar outcome).', option_order: 2 },
            { text: 'Therefore', is_correct: false, explanation: 'Shows cause-effect, not similarity.', option_order: 3 },
            { text: 'In contrast', is_correct: false, explanation: 'Wrong - both had same result.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: Transition Mastery',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'The plan was risky. <u>Nevertheless</u>, it succeeded.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Shows contrast between risky and successful.', option_order: 1 },
            { text: 'Therefore', is_correct: false, explanation: 'Success isn\'t because it was risky.', option_order: 2 },
            { text: 'Additionally', is_correct: false, explanation: 'Doesn\'t show the contrast.', option_order: 3 },
            { text: 'For instance', is_correct: false, explanation: 'Introduces examples, doesn\'t fit.', option_order: 4 }
          ]
        },
        {
          question_text: 'First, mix the ingredients. <u>Next</u>, bake for 30 minutes.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Shows sequence of steps.', option_order: 1 },
            { text: 'However', is_correct: false, explanation: 'Shows contrast, not sequence.', option_order: 2 },
            { text: 'In other words', is_correct: false, explanation: 'Restates info, doesn\'t advance sequence.', option_order: 3 },
            { text: 'On the contrary', is_correct: false, explanation: 'Shows opposition, not sequence.', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Simplified quizzes for remaining lessons (strategy-focused)

  // Chapter 8: Misc Topics
  await createQuizForLesson('misc-topics', [
    {
      title: 'Practice: Commonly Confused Words',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: '<u>Their</u> going to the store.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need "they\'re" (they are), not possessive "their."', option_order: 1 },
            { text: 'They\'re', is_correct: true, explanation: 'Correct! "They\'re" = they are.', option_order: 2 },
            { text: 'There', is_correct: false, explanation: '"There" indicates location.', option_order: 3 },
            { text: 'They are', is_correct: false, explanation: 'While correct, contraction is preferred.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment',
      intro: 'Choose the best alternative.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'The policy will <u>effect</u> many students.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need verb "affect" (influence).', option_order: 1 },
            { text: 'affect', is_correct: true, explanation: 'Correct! "Affect" is the verb meaning "influence."', option_order: 2 },
            { text: 'effective', is_correct: false, explanation: 'Wrong part of speech.', option_order: 3 },
            { text: 'effected', is_correct: false, explanation: '"Effect" as verb means "bring about," not "influence."', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Chapter 9: Grammar Review
  await createQuizForLesson('grammar-review', [
    {
      title: 'Practice: Comprehensive Grammar Review',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'The students, <u>which</u> were excited, entered the room.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Use "who" for people, not "which."', option_order: 1 },
            { text: 'who', is_correct: true, explanation: 'Correct! "Who" is for people.', option_order: 2 },
            { text: 'that', is_correct: false, explanation: 'Would need no commas with "that."', option_order: 3 },
            { text: 'whom', is_correct: false, explanation: 'Need subject form "who," not object "whom."', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment',
      intro: 'Choose the best alternative.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'Neither the cats nor the dog <u>are</u> hungry.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Verb agrees with closer subject "dog" (singular).', option_order: 1 },
            { text: 'is', is_correct: true, explanation: 'Correct! Matches closer subject "dog."', option_order: 2 },
            { text: 'were', is_correct: false, explanation: 'Wrong tense and number.', option_order: 3 },
            { text: 'was', is_correct: false, explanation: 'Wrong tense (present needed).', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Chapter 13: Which Choice
  await createQuizForLesson('which-choice', [
    {
      title: 'Practice: "Which Choice" Questions',
      intro: 'Read the context and choose the best option.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'Which choice best emphasizes the building\'s age? The building is <u>old</u>.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Old" is vague and lacks emphasis.', option_order: 1 },
            { text: 'ancient and weathered', is_correct: true, explanation: 'Correct! More vivid and emphasizes age.', option_order: 2 },
            { text: 'not new', is_correct: false, explanation: 'Weak negative phrasing.', option_order: 3 },
            { text: 'standing', is_correct: false, explanation: 'Doesn\'t address age at all.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment',
      intro: 'Choose the best option.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'Which choice provides the most specific detail? She ate <u>food</u>.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Food" is too general.', option_order: 1 },
            { text: 'a homemade apple pie', is_correct: true, explanation: 'Correct! Most specific detail.', option_order: 2 },
            { text: 'something', is_correct: false, explanation: 'Even more vague.', option_order: 3 },
            { text: 'dinner', is_correct: false, explanation: 'Still general.', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Chapter 14: Adding/Deleting
  await createQuizForLesson('adding-deleting', [
    {
      title: 'Practice: Adding or Deleting Sentences',
      intro: 'Decide whether to add or delete information.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'The essay discusses climate change. Should the following sentence be added: "Pizza is my favorite food."',
          question_order: 1,
          options: [
            { text: 'Yes, it adds personal detail', is_correct: false, explanation: 'Irrelevant to climate change topic.', option_order: 1 },
            { text: 'No, it\'s off-topic', is_correct: true, explanation: 'Correct! Sentence is irrelevant.', option_order: 2 },
            { text: 'Yes, it shows author\'s personality', is_correct: false, explanation: 'Personality isn\'t relevant to academic essay.', option_order: 3 },
            { text: 'Yes, it provides variety', is_correct: false, explanation: 'Variety shouldn\'t come at cost of relevance.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment',
      intro: 'Make decisions about content.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'A paragraph about Einstein\'s theories. Should this sentence be deleted: "Einstein was born in Germany."',
          question_order: 1,
          options: [
            { text: 'No, it provides biographical context', is_correct: true, explanation: 'Correct! Relevant background for theory discussion.', option_order: 1 },
            { text: 'Yes, it\'s not about theories', is_correct: false, explanation: 'Biographical context can support theory discussion.', option_order: 2 },
            { text: 'Yes, everyone knows this', is_correct: false, explanation: 'Assumption that everyone knows this isn\'t valid.', option_order: 3 },
            { text: 'No, because it\'s interesting', is_correct: false, explanation: '"Interesting" isn\'t enough - must be relevant.', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Chapter 15: Logical Placement
  await createQuizForLesson('logical-placement', [
    {
      title: 'Practice: Sentence Placement',
      intro: 'Choose the best placement for sentences.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'Where should this sentence go: "This discovery changed everything." [1] Scientists worked for years. [2] They made a breakthrough. [3] Research continues today.',
          question_order: 1,
          options: [
            { text: 'After sentence 1', is_correct: false, explanation: 'No discovery mentioned yet.', option_order: 1 },
            { text: 'After sentence 2', is_correct: true, explanation: 'Correct! Refers to the breakthrough just mentioned.', option_order: 2 },
            { text: 'After sentence 3', is_correct: false, explanation: 'Too late - disconnected from breakthrough.', option_order: 3 },
            { text: 'Before sentence 1', is_correct: false, explanation: 'Nothing for "this discovery" to refer to.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment',
      intro: 'Place sentences logically.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'Best placement for "However, not everyone agreed": [1] The plan was popular. [2] It passed easily. [3] Some concerns remained.',
          question_order: 1,
          options: [
            { text: 'After sentence 1', is_correct: false, explanation: 'Contradicts without establishing popularity first.', option_order: 1 },
            { text: 'After sentence 2', is_correct: true, explanation: 'Correct! Provides contrast after success mentioned.', option_order: 2 },
            { text: 'After sentence 3', is_correct: false, explanation: 'Concerns already mentioned; transition comes too late.', option_order: 3 },
            { text: 'Before sentence 1', is_correct: false, explanation: 'Nothing to contrast with yet.', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Getting Started
  await createQuizForLesson('getting-started', [
    {
      title: 'Practice: ACT Test Strategy',
      intro: 'Choose the best test-taking strategy.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'What should you do if you don\'t know an answer?',
          question_order: 1,
          options: [
            { text: 'Leave it blank', is_correct: false, explanation: 'No penalty for guessing - always answer.', option_order: 1 },
            { text: 'Make your best guess', is_correct: true, explanation: 'Correct! No guessing penalty on ACT.', option_order: 2 },
            { text: 'Spend extra time figuring it out', is_correct: false, explanation: 'Better to move on and come back if time allows.', option_order: 3 },
            { text: 'Ask the proctor', is_correct: false, explanation: 'Not allowed during test.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment',
      intro: 'Test your strategy knowledge.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'Which approach is best for the ACT English section?',
          question_order: 1,
          options: [
            { text: 'Read entire passage first', is_correct: false, explanation: 'Wastes time; questions guide you.', option_order: 1 },
            { text: 'Answer questions as you read', is_correct: true, explanation: 'Correct! Most efficient approach.', option_order: 2 },
            { text: 'Skip to hardest questions', is_correct: false, explanation: 'Do easier ones first to build momentum.', option_order: 3 },
            { text: 'Memorize all grammar rules first', is_correct: false, explanation: 'Understanding patterns is more important.', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  console.log('\n✅✅✅ ALL ENGLISH LESSONS NOW HAVE ACT-STYLE QUIZZES! ✅✅✅');
}

createAllRemainingQuizzes();
