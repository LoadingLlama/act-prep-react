/**
 * Complete all English lessons to 50 questions
 * Following the difficulty pattern: 1-4 (intro), 5-14 (easy), 15-34 (medium), 35-50 (hard)
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Lesson IDs from database
const LESSONS = {
  'commas': '3e8f0696-1bf7-4b5c-880d-fb5359923b7d',
  'punctuation': '66776383-9334-4efb-bd72-74b1bbeab8ac',
  'verbs': '10fff941-59e1-4d3a-84b7-d0fe8f9985ef',
  'pronouns': '3c3585a1-f137-4331-8390-29ef1f5e889f',
  'modifiers': 'f7ac1d6c-6416-47fd-9720-807224100517',
  'parallel-structure': 'e6153221-e330-4db4-8cc7-9c5a1d51a301',
  'misc-topics': '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16',
  'redundancy': '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734',
  'word-choice': '04df2a09-a910-4456-8fe5-2f8e7f62c50f',
  'transitions': '7aae3763-017b-4762-ad5a-346aac1f027b',
  'which-choice': '29b59c9d-ef2e-4f7f-aae2-464222884d3a',
  'adding-deleting': '784a146b-8809-4189-a1b4-4b2fdcaf8199',
  'logical-placement': '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4'
};

async function addQuestion(lessonId, question) {
  const { error } = await supabase.from('lesson_examples').insert({
    lesson_id: lessonId,
    position: question.position,
    title: question.title,
    problem_text: question.problem_text,
    choices: question.choices,
    correct_answer: question.correct_answer,
    solution_steps: [],
    answer_explanation: question.answer_explanation,
    is_worked_example: false
  });

  if (error) {
    console.error(`  ✗ Error at position ${question.position}:`, error.message);
    return false;
  }
  return true;
}

// COMMAS - Position 6 (EASY)
const commasQuestions = [
  {
    position: 6,
    title: 'Simple Run-on with Comma Needed',
    problem_text: 'The museum opens at 9 AM<u> but</u> the special exhibit doesn\'t start until noon.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: ', but' },
      { letter: 'C', text: '; but' },
      { letter: 'D', text: ' and but' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When using a FANBOYS conjunction (but) to connect two independent clauses, a comma must come before the conjunction.'
  }
];

// PUNCTUATION - Position 7 (EASY)
const punctuationQuestions = [
  {
    position: 7,
    title: 'Basic Semicolon Usage',
    problem_text: 'The conference was informative<u>, the</u> workshops were particularly engaging.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: '; the' },
      { letter: 'C', text: ', and the' },
      { letter: 'D', text: ' the' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Two independent clauses cannot be joined with just a comma (comma splice). A semicolon correctly connects closely related independent clauses.'
  }
];

// VERBS - Positions 47-50 (HARD)
const verbsQuestions = [
  {
    position: 47,
    title: 'Advanced Subjunctive Mood',
    problem_text: 'The board of directors insisted that the CEO <u>submits</u> a detailed financial report before the next quarterly meeting.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'submit' },
      { letter: 'C', text: 'had submitted' },
      { letter: 'D', text: 'will submit' }
    ],
    correct_answer: 'B',
    answer_explanation: 'After verbs of demand, recommendation, or requirement (like "insisted"), the subjunctive mood requires the base form of the verb "submit" rather than "submits."'
  },
  {
    position: 48,
    title: 'Complex Tense Sequence',
    problem_text: 'By the time the research team <u>will have completed</u> their fieldwork, they will have spent three consecutive summers in the Arctic.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'completes' },
      { letter: 'C', text: 'has completed' },
      { letter: 'D', text: 'had completed' }
    ],
    correct_answer: 'C',
    answer_explanation: '"By the time" with a future perfect in the main clause requires present perfect in the dependent clause, not future perfect.'
  },
  {
    position: 49,
    title: 'Irregular Verb in Conditional',
    problem_text: 'If the ancient manuscript <u>was</u> authentic, it would revolutionize our understanding of medieval literature.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'were' },
      { letter: 'C', text: 'is' },
      { letter: 'D', text: 'had been' }
    ],
    correct_answer: 'B',
    answer_explanation: 'In hypothetical or contrary-to-fact conditions, the subjunctive "were" is required regardless of the subject.'
  },
  {
    position: 50,
    title: 'Sophisticated Tense Agreement',
    problem_text: 'The archaeologist claimed that the artifacts <u>were dating</u> back to the Bronze Age, predating previously discovered relics by several centuries.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'dated' },
      { letter: 'C', text: 'had dated' },
      { letter: 'D', text: 'date' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Simple past "dated" is correct here because it describes a completed state in the past, not an ongoing process.'
  }
];

// PRONOUNS - Positions 47-50 (HARD)
const pronounsQuestions = [
  {
    position: 47,
    title: 'Advanced Pronoun Case in Comparisons',
    problem_text: 'The scholarship committee selected candidates who demonstrated more creativity than <u>them</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'they' },
      { letter: 'C', text: 'those' },
      { letter: 'D', text: 'themselves' }
    ],
    correct_answer: 'B',
    answer_explanation: 'In comparisons with "than," complete the implied clause: "than they demonstrated." Use the nominative case "they" as the subject of the implied verb.'
  },
  {
    position: 48,
    title: 'Complex Relative Pronoun Selection',
    problem_text: 'The research methodology, <u>that</u> requires extensive field observations, has been adopted by universities worldwide.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'which' },
      { letter: 'C', text: 'what' },
      { letter: 'D', text: 'of which' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "which" (not "that") to introduce non-restrictive clauses that are set off by commas and provide additional information.'
  },
  {
    position: 49,
    title: 'Ambiguous Pronoun Reference',
    problem_text: 'When the director met with the lead actor, <u>he</u> expressed concerns about the revised script.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'the director' },
      { letter: 'C', text: 'they' },
      { letter: 'D', text: 'one' }
    ],
    correct_answer: 'B',
    answer_explanation: '"He" is ambiguous—it could refer to either the director or the actor. Using "the director" clarifies who expressed concerns.'
  },
  {
    position: 50,
    title: 'Sophisticated Pronoun Agreement',
    problem_text: 'Each of the committee members must submit <u>their</u> recommendations before the deadline.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'his or her' },
      { letter: 'C', text: 'its' },
      { letter: 'D', text: 'our' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Each" is singular, requiring a singular pronoun. While "their" is increasingly accepted, the traditional rule requires "his or her" on the ACT.'
  }
];

async function main() {
  console.log('Completing all English lessons to 50 questions...\n');
  console.log('='.repeat(70) + '\n');

  let totalAdded = 0;

  // Add commas question
  console.log('COMMAS (adding 1 question):');
  for (const q of commasQuestions) {
    if (await addQuestion(LESSONS.commas, q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      totalAdded++;
    }
  }

  // Add punctuation question
  console.log('\nPUNCTUATION (adding 1 question):');
  for (const q of punctuationQuestions) {
    if (await addQuestion(LESSONS.punctuation, q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      totalAdded++;
    }
  }

  // Add verbs questions
  console.log('\nVERBS (adding 4 HARD questions):');
  for (const q of verbsQuestions) {
    if (await addQuestion(LESSONS.verbs, q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      totalAdded++;
    }
  }

  // Add pronouns questions
  console.log('\nPRONOUNS (adding 4 HARD questions):');
  for (const q of pronounsQuestions) {
    if (await addQuestion(LESSONS.pronouns, q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      totalAdded++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n✅ Part 1 Complete! Added ${totalAdded} questions.`);
  console.log('\nNext: Run complete_all_lessons_part2.js for remaining lessons');
}

main();
