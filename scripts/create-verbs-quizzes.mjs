import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createVerbsQuizzes() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'verbs')
    .single();

  const actStyleQuizzes = [
    {
      title: 'Practice: Subject-Verb Agreement',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'The collection of stamps <u>are</u> valuable.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Singular subject "collection" needs singular verb "is."', option_order: 1 },
            { text: 'is', is_correct: true, explanation: 'Correct! "Collection" is singular, so use "is."', option_order: 2 },
            { text: 'were', is_correct: false, explanation: '"Collection" is singular, not plural.', option_order: 3 },
            { text: 'have been', is_correct: false, explanation: '"Collection" is singular; needs singular verb.', option_order: 4 }
          ]
        },
        {
          question_text: 'Each of the students <u>have</u> completed the assignment.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Each" is singular and needs singular verb "has."', option_order: 1 },
            { text: 'has', is_correct: true, explanation: 'Correct! "Each" is always singular.', option_order: 2 },
            { text: 'are', is_correct: false, explanation: '"Each" is singular, not plural.', option_order: 3 },
            { text: 'were', is_correct: false, explanation: '"Each" requires a singular verb.', option_order: 4 }
          ]
        },
        {
          question_text: 'The team, along with their coach, <u>are</u> celebrating.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Subject is "team" (singular), so use "is."', option_order: 1 },
            { text: 'is', is_correct: true, explanation: 'Correct! Ignore "along with" phrase - subject "team" is singular.', option_order: 2 },
            { text: 'were', is_correct: false, explanation: '"Team" is singular in this context.', option_order: 3 },
            { text: 'have been', is_correct: false, explanation: 'Subject "team" needs singular verb.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Verb Tenses',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 9,
      is_required: true,
      questions: [
        {
          question_text: 'Yesterday, I <u>go</u> to the store.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Yesterday" indicates past tense; use "went."', option_order: 1 },
            { text: 'went', is_correct: true, explanation: 'Correct! "Yesterday" requires past tense.', option_order: 2 },
            { text: 'have gone', is_correct: false, explanation: 'Present perfect doesn\'t work with specific past time "yesterday."', option_order: 3 },
            { text: 'will go', is_correct: false, explanation: 'Future tense doesn\'t match "yesterday."', option_order: 4 }
          ]
        },
        {
          question_text: 'By next year, she <u>will complete</u> her degree.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"By next year" requires future perfect "will have completed."', option_order: 1 },
            { text: 'will have completed', is_correct: true, explanation: 'Correct! Use future perfect for actions completed by a future time.', option_order: 2 },
            { text: 'completes', is_correct: false, explanation: 'Simple present doesn\'t show future completion.', option_order: 3 },
            { text: 'has completed', is_correct: false, explanation: 'Present perfect is for past actions, not future.', option_order: 4 }
          ]
        },
        {
          question_text: 'I <u>have lived</u> here since 2010.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Present perfect for actions starting in past and continuing.', option_order: 1 },
            { text: 'lived', is_correct: false, explanation: 'Simple past suggests action is over; still living here.', option_order: 2 },
            { text: 'am living', is_correct: false, explanation: 'Present progressive doesn\'t show the "since 2010" duration.', option_order: 3 },
            { text: 'had lived', is_correct: false, explanation: 'Past perfect is for actions before another past action.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Irregular Verbs & Advanced Tenses',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 13,
      is_required: true,
      questions: [
        {
          question_text: 'She has <u>wrote</u> three books.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Past participle of "write" is "written," not "wrote."', option_order: 1 },
            { text: 'written', is_correct: true, explanation: 'Correct! Use "written" with "has" (present perfect).', option_order: 2 },
            { text: 'writing', is_correct: false, explanation: 'Present participle doesn\'t work with "has."', option_order: 3 },
            { text: 'write', is_correct: false, explanation: 'Base form doesn\'t work with "has."', option_order: 4 }
          ]
        },
        {
          question_text: 'If I <u>was</u> you, I would study harder.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Conditional hypotheticals use "were" for all subjects.', option_order: 1 },
            { text: 'were', is_correct: true, explanation: 'Correct! Use "were" in hypothetical conditions.', option_order: 2 },
            { text: 'am', is_correct: false, explanation: 'Conditional requires subjunctive "were."', option_order: 3 },
            { text: 'had been', is_correct: false, explanation: 'Past perfect is unnecessarily complex here.', option_order: 4 }
          ]
        },
        {
          question_text: 'The water had <u>freezed</u> overnight.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Past participle of "freeze" is "frozen," not "freezed."', option_order: 1 },
            { text: 'frozen', is_correct: true, explanation: 'Correct! Use "frozen" with "had" (past perfect).', option_order: 2 },
            { text: 'froze', is_correct: false, explanation: '"Froze" is simple past, not past participle.', option_order: 3 },
            { text: 'freezing', is_correct: false, explanation: 'Present participle doesn\'t work with "had."', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: Verb Mastery',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'Neither the teacher nor the students <u>was</u> ready.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'With "neither/nor," verb agrees with closer subject "students" (plural).', option_order: 1 },
            { text: 'were', is_correct: true, explanation: 'Correct! Verb matches "students" (the closer subject).', option_order: 2 },
            { text: 'is', is_correct: false, explanation: 'Verb must agree with "students," not "teacher."', option_order: 3 },
            { text: 'are', is_correct: false, explanation: 'Wrong tense - context requires past.', option_order: 4 }
          ]
        },
        {
          question_text: 'By the time we arrived, the show <u>started</u> already.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Action before another past action requires past perfect.', option_order: 1 },
            { text: 'had started', is_correct: true, explanation: 'Correct! Past perfect shows action completed before "we arrived."', option_order: 2 },
            { text: 'has started', is_correct: false, explanation: 'Present perfect doesn\'t work with past context.', option_order: 3 },
            { text: 'starts', is_correct: false, explanation: 'Present tense doesn\'t fit past context.', option_order: 4 }
          ]
        },
        {
          question_text: 'She <u>don\'t</u> understand the assignment.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"She" is singular and requires "doesn\'t," not "don\'t."', option_order: 1 },
            { text: 'doesn\'t', is_correct: true, explanation: 'Correct! Singular subject "she" needs "doesn\'t."', option_order: 2 },
            { text: 'do not', is_correct: false, explanation: '"She" requires "does not," not "do not."', option_order: 3 },
            { text: 'didn\'t', is_correct: false, explanation: 'Present tense is needed, not past.', option_order: 4 }
          ]
        },
        {
          question_text: 'The books that <u>was</u> on the shelf have been moved.',
          question_order: 4,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Plural subject "books" needs plural verb "were."', option_order: 1 },
            { text: 'were', is_correct: true, explanation: 'Correct! "Books" (plural) requires "were."', option_order: 2 },
            { text: 'is', is_correct: false, explanation: '"Books" is plural, not singular.', option_order: 3 },
            { text: 'are', is_correct: false, explanation: 'Context requires past tense, not present.', option_order: 4 }
          ]
        },
        {
          question_text: 'He has <u>ran</u> five miles every day this week.',
          question_order: 5,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Past participle of "run" is "run," not "ran."', option_order: 1 },
            { text: 'run', is_correct: true, explanation: 'Correct! Use "run" (not "ran") with "has."', option_order: 2 },
            { text: 'running', is_correct: false, explanation: 'Present participle doesn\'t work with "has" in this context.', option_order: 3 },
            { text: 'runned', is_correct: false, explanation: '"Runned" is not a word - "run" is the past participle.', option_order: 4 }
          ]
        }
      ]
    }
  ];

  console.log('Creating Verbs quizzes...\n');

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

  console.log('\n✅ All Verbs quizzes created in ACT style!');
}

createVerbsQuizzes();
