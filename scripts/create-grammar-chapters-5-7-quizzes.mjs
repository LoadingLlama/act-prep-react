import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createQuizForLesson(lessonKey, quizzes) {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('lesson_key', lessonKey)
    .single();

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

async function createAllGrammarQuizzes() {
  // Chapter 5: Pronouns
  await createQuizForLesson('pronouns', [
    {
      title: 'Practice: Pronoun-Antecedent Agreement',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'Each student must bring <u>their</u> own lunch.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Each" is singular and needs singular pronoun "his or her."', option_order: 1 },
            { text: 'his or her', is_correct: true, explanation: 'Correct! Singular "each" requires singular pronoun.', option_order: 2 },
            { text: 'our', is_correct: false, explanation: 'Doesn\'t match "each student" as antecedent.', option_order: 3 },
            { text: 'its', is_correct: false, explanation: '"Its" is for objects, not people.', option_order: 4 }
          ]
        },
        {
          question_text: 'The team celebrated <u>their</u> victory.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: true, explanation: 'Correct! Collective nouns can take plural pronouns when emphasizing individuals.', option_order: 1 },
            { text: 'its', is_correct: false, explanation: 'While grammatically acceptable, "their" is more natural for team members celebrating.', option_order: 2 },
            { text: 'his', is_correct: false, explanation: '"Team" is a group, not a single person.', option_order: 3 },
            { text: 'it\'s', is_correct: false, explanation: '"It\'s" means "it is" - need possessive pronoun.', option_order: 4 }
          ]
        },
        {
          question_text: '<u>Me and Sarah</u> went to the store.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Subject requires "I," not "me." Also put yourself last.', option_order: 1 },
            { text: 'Sarah and I', is_correct: true, explanation: 'Correct! Use "I" for subject, and put other person first.', option_order: 2 },
            { text: 'Sarah and me', is_correct: false, explanation: 'Subject needs "I," not "me."', option_order: 3 },
            { text: 'I and Sarah', is_correct: false, explanation: 'Use "I" is correct, but put other person first.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Pronoun Case & Reference',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 9,
      is_required: true,
      questions: [
        {
          question_text: 'The award went to Sarah and <u>I</u>.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Object of preposition "to" requires "me."', option_order: 1 },
            { text: 'me', is_correct: true, explanation: 'Correct! Use "me" after prepositions.', option_order: 2 },
            { text: 'myself', is_correct: false, explanation: '"Myself" is reflexive; use "me" here.', option_order: 3 },
            { text: 'we', is_correct: false, explanation: '"We" is plural subject form; need singular object "me."', option_order: 4 }
          ]
        },
        {
          question_text: '<u>Who</u> did you give the book to?',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Object of "to" requires "whom."', option_order: 1 },
            { text: 'Whom', is_correct: true, explanation: 'Correct! "Whom" is object form.', option_order: 2 },
            { text: 'Whose', is_correct: false, explanation: '"Whose" shows possession, not needed here.', option_order: 3 },
            { text: 'Which', is_correct: false, explanation: '"Which" is for things, not people.', option_order: 4 }
          ]
        },
        {
          question_text: 'The book, <u>that</u> was on the table, is mine.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Use "which" for nonessential clauses (with commas).', option_order: 1 },
            { text: 'which', is_correct: true, explanation: 'Correct! Commas indicate nonessential info; use "which."', option_order: 2 },
            { text: 'who', is_correct: false, explanation: '"Who" is for people, not things.', option_order: 3 },
            { text: 'what', is_correct: false, explanation: '"What" doesn\'t work in relative clauses.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: Pronoun Mastery',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'Everyone should do <u>their</u> best on the test.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Everyone" is singular and needs "his or her."', option_order: 1 },
            { text: 'his or her', is_correct: true, explanation: 'Correct! Singular indefinite pronouns need singular pronouns.', option_order: 2 },
            { text: 'our', is_correct: false, explanation: 'Doesn\'t match "everyone."', option_order: 3 },
            { text: 'your', is_correct: false, explanation: 'Doesn\'t match "everyone."', option_order: 4 }
          ]
        },
        {
          question_text: 'Between you and <u>I</u>, this is difficult.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Object of preposition "between" requires "me."', option_order: 1 },
            { text: 'me', is_correct: true, explanation: 'Correct! Use "me" after prepositions.', option_order: 2 },
            { text: 'myself', is_correct: false, explanation: 'Reflexive not needed; use "me."', option_order: 3 },
            { text: 'we', is_correct: false, explanation: '"We" is subject form; need object "me."', option_order: 4 }
          ]
        },
        {
          question_text: 'The person <u>who</u> I saw was tall.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Object of "saw" requires "whom."', option_order: 1 },
            { text: 'whom', is_correct: true, explanation: 'Correct! "Whom" is the object of "saw."', option_order: 2 },
            { text: 'that', is_correct: false, explanation: 'While "that" works, "whom" is more precise for people as objects.', option_order: 3 },
            { text: 'which', is_correct: false, explanation: '"Which" is for things, not people.', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Chapter 6: Modifiers
  await createQuizForLesson('modifiers', [
    {
      title: 'Practice: Misplaced Modifiers',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: '<u>Walking to school, the</u> rain started falling.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Dangling modifier - rain can\'t walk. Needs clear subject.', option_order: 1 },
            { text: 'Walking to school, I noticed the', is_correct: true, explanation: 'Correct! Modifier "walking" now clearly modifies "I."', option_order: 2 },
            { text: 'The rain, walking to school,', is_correct: false, explanation: 'Still suggests rain is walking.', option_order: 3 },
            { text: 'Walking to school,', is_correct: false, explanation: 'Dangling modifier - no clear subject performing the action.', option_order: 4 }
          ]
        },
        {
          question_text: 'I <u>only</u> ate three cookies.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Only" should modify "three," not "ate."', option_order: 1 },
            { text: 'ate only', is_correct: true, explanation: 'Correct! Place "only" next to what it modifies ("three").', option_order: 2 },
            { text: 'ate three only', is_correct: false, explanation: 'Awkward placement at end.', option_order: 3 },
            { text: 'ate cookies only', is_correct: false, explanation: 'Changes meaning - suggests limitation on type of food.', option_order: 4 }
          ]
        },
        {
          question_text: '<u>Covered in chocolate, I</u> ate the strawberry.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Misplaced modifier - "I" am not covered in chocolate.', option_order: 1 },
            { text: 'I ate the strawberry covered in chocolate', is_correct: true, explanation: 'Correct! Modifier now clearly describes the strawberry.', option_order: 2 },
            { text: 'Covered in chocolate, the strawberry I', is_correct: false, explanation: 'Awkward and unclear structure.', option_order: 3 },
            { text: 'I ate, covered in chocolate, the strawberry', is_correct: false, explanation: 'Awkward placement of modifier.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: Modifier Mastery',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: '<u>Hoping to win, the</u> race was very close.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Dangling modifier - race can\'t hope. Need clear subject.', option_order: 1 },
            { text: 'Hoping to win, we watched as the', is_correct: true, explanation: 'Correct! "We" can hope to win; modifier has clear subject.', option_order: 2 },
            { text: 'The race, hoping to win,', is_correct: false, explanation: 'Still suggests race is hoping.', option_order: 3 },
            { text: 'Hoping to win,', is_correct: false, explanation: 'Leaves dangling modifier without clear subject.', option_order: 4 }
          ]
        },
        {
          question_text: 'She <u>almost</u> drove her kids to school every day.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: '"Almost" should modify "every day," not "drove."', option_order: 1 },
            { text: 'drove her kids to school almost every day', is_correct: true, explanation: 'Correct! "Almost" now modifies "every day" (frequency).', option_order: 2 },
            { text: 'drove almost her kids', is_correct: false, explanation: 'Nonsensical - can\'t "almost" drive kids.', option_order: 3 },
            { text: 'drove her kids almost to school', is_correct: false, explanation: 'Changes meaning - suggests she didn\'t reach school.', option_order: 4 }
          ]
        },
        {
          question_text: '<u>Frozen for years, scientists</u> discovered the ancient ice.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Misplaced modifier - scientists weren\'t frozen.', option_order: 1 },
            { text: 'Scientists discovered the ancient ice frozen for years', is_correct: true, explanation: 'Correct! Modifier now clearly describes the ice.', option_order: 2 },
            { text: 'Scientists, frozen for years, discovered', is_correct: false, explanation: 'Suggests scientists were frozen.', option_order: 3 },
            { text: 'Frozen for years, the ice scientists', is_correct: false, explanation: 'Awkward and creates confusion about "ice scientists."', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  // Chapter 7: Parallel Structure
  await createQuizForLesson('parallel-structure', [
    {
      title: 'Practice: Parallel Structure in Lists',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 5,
      is_required: true,
      questions: [
        {
          question_text: 'I like swimming, biking, and <u>to run</u>.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need parallel structure - use "running" to match other -ing forms.', option_order: 1 },
            { text: 'running', is_correct: true, explanation: 'Correct! Matches parallel structure of "swimming" and "biking."', option_order: 2 },
            { text: 'to be running', is_correct: false, explanation: 'Doesn\'t match parallel structure of other items.', option_order: 3 },
            { text: 'run', is_correct: false, explanation: 'Base form doesn\'t match -ing form of other items.', option_order: 4 }
          ]
        },
        {
          question_text: 'The job requires dedication, patience, and <u>being creative</u>.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need noun form "creativity" to match "dedication" and "patience."', option_order: 1 },
            { text: 'creativity', is_correct: true, explanation: 'Correct! Noun form matches other nouns in list.', option_order: 2 },
            { text: 'to be creative', is_correct: false, explanation: 'Infinitive doesn\'t match noun forms.', option_order: 3 },
            { text: 'creative', is_correct: false, explanation: 'Adjective doesn\'t match noun forms.', option_order: 4 }
          ]
        },
        {
          question_text: 'She is talented, hardworking, and <u>has dedication</u>.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need adjective "dedicated" to match "talented" and "hardworking."', option_order: 1 },
            { text: 'dedicated', is_correct: true, explanation: 'Correct! Adjective matches other adjectives in list.', option_order: 2 },
            { text: 'with dedication', is_correct: false, explanation: 'Prepositional phrase doesn\'t match adjective forms.', option_order: 3 },
            { text: 'dedication', is_correct: false, explanation: 'Noun doesn\'t match adjective forms.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Practice: Parallel Structure in Comparisons',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'practice',
      position: 9,
      is_required: true,
      questions: [
        {
          question_text: 'Playing soccer is more fun than <u>to watch TV</u>.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need -ing form "watching" to match "playing."', option_order: 1 },
            { text: 'watching TV', is_correct: true, explanation: 'Correct! Gerund matches "playing" for parallel structure.', option_order: 2 },
            { text: 'watch TV', is_correct: false, explanation: 'Base form doesn\'t match -ing form.', option_order: 3 },
            { text: 'TV watching', is_correct: false, explanation: 'While parallel, changes meaning slightly.', option_order: 4 }
          ]
        },
        {
          question_text: 'I would rather read a book than <u>watching a movie</u>.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need base form "watch" to match "read."', option_order: 1 },
            { text: 'watch a movie', is_correct: true, explanation: 'Correct! Base form matches "read" after "rather...than."', option_order: 2 },
            { text: 'to watch a movie', is_correct: false, explanation: 'Infinitive doesn\'t match base form "read."', option_order: 3 },
            { text: 'a movie', is_correct: false, explanation: 'Incomplete - needs verb for parallel structure.', option_order: 4 }
          ]
        },
        {
          question_text: 'The essay is well-written, insightful, and <u>it is persuasive</u>.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need adjective "persuasive" to match other adjectives.', option_order: 1 },
            { text: 'persuasive', is_correct: true, explanation: 'Correct! Adjective matches "well-written" and "insightful."', option_order: 2 },
            { text: 'persuades', is_correct: false, explanation: 'Verb doesn\'t match adjective forms.', option_order: 3 },
            { text: 'with persuasion', is_correct: false, explanation: 'Prepositional phrase doesn\'t match adjectives.', option_order: 4 }
          ]
        }
      ]
    },
    {
      title: 'Final Assessment: Parallel Structure Mastery',
      intro: 'Choose the best alternative for each underlined portion.',
      quiz_type: 'final',
      position: 999,
      is_required: true,
      questions: [
        {
          question_text: 'The course teaches students to think critically, write clearly, and <u>how to communicate</u>.',
          question_order: 1,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need infinitive "to communicate" to match other infinitives.', option_order: 1 },
            { text: 'to communicate', is_correct: true, explanation: 'Correct! Infinitive matches "to think" and "[to] write."', option_order: 2 },
            { text: 'communicating', is_correct: false, explanation: 'Gerund doesn\'t match infinitive forms.', option_order: 3 },
            { text: 'communication', is_correct: false, explanation: 'Noun doesn\'t match infinitive forms.', option_order: 4 }
          ]
        },
        {
          question_text: 'He enjoys hiking, camping, and <u>to fish</u>.',
          question_order: 2,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need gerund "fishing" to match "hiking" and "camping."', option_order: 1 },
            { text: 'fishing', is_correct: true, explanation: 'Correct! Gerund maintains parallel structure.', option_order: 2 },
            { text: 'fish', is_correct: false, explanation: 'Base form doesn\'t match gerunds.', option_order: 3 },
            { text: 'that he fishes', is_correct: false, explanation: 'Clause doesn\'t match gerund forms.', option_order: 4 }
          ]
        },
        {
          question_text: 'The movie was boring, predictable, and <u>it was too long</u>.',
          question_order: 3,
          options: [
            { text: 'NO CHANGE', is_correct: false, explanation: 'Need adjective "lengthy" or "long" to match other adjectives.', option_order: 1 },
            { text: 'too long', is_correct: true, explanation: 'Correct! Adjective phrase matches "boring" and "predictable."', option_order: 2 },
            { text: 'lengthy', is_correct: false, explanation: 'While parallel, loses the "too" emphasis.', option_order: 3 },
            { text: 'having excessive length', is_correct: false, explanation: 'Wordy phrase doesn\'t match simple adjectives.', option_order: 4 }
          ]
        }
      ]
    }
  ]);

  console.log('\n✅ All grammar chapters 5-7 quizzes created!');
}

createAllGrammarQuizzes();
