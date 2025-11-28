/**
 * Complete REDUNDANCY lesson (30 questions)
 * Missing positions: 5-7, 9-10, 13-16, 19-21, 23-24, 29, 33-36, 38-41, 43-44, 46-50
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734'; // redundancy

async function addQuestion(question) {
  const { error } = await supabase.from('lesson_examples').insert({
    lesson_id: LESSON_ID,
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

const questions = [
  // EASY (positions 5-7, 9-10, 13-14)
  {
    position: 5,
    title: 'Basic Redundant Pair',
    problem_text: 'The students will <u>collaborate together</u> on the group project.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'collaborate' },
      { letter: 'C', text: 'work together in collaboration' },
      { letter: 'D', text: 'be collaborating together' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Collaborate" already means "work together," so "together" is redundant.'
  },
  {
    position: 6,
    title: 'Simple Wordiness',
    problem_text: 'The museum <u>is located in the city of</u> Boston.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'is in' },
      { letter: 'C', text: 'can be found in the city of' },
      { letter: 'D', text: 'has its location in' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Is in" is more concise than "is located in the city of" and conveys the same meaning.'
  },
  {
    position: 7,
    title: 'Redundant Adjective',
    problem_text: 'She received a <u>free gift</u> with her purchase.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'gift that was free' },
      { letter: 'C', text: 'gift' },
      { letter: 'D', text: 'complimentary free gift' }
    ],
    correct_answer: 'C',
    answer_explanation: 'By definition, a gift is free, so "free" is redundant.'
  },
  {
    position: 9,
    title: 'Basic Time Redundancy',
    problem_text: 'The meeting will begin <u>at 3 PM in the afternoon</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'at 3 PM' },
      { letter: 'C', text: 'in the afternoon at 3 PM' },
      { letter: 'D', text: 'at 3 o\'clock PM in the afternoon' }
    ],
    correct_answer: 'B',
    answer_explanation: 'PM already indicates afternoon, making "in the afternoon" redundant.'
  },
  {
    position: 10,
    title: 'Simple DELETE Option',
    problem_text: 'The final outcome <u>of the experiment</u> was surprising.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'result of the experiment' },
      { letter: 'C', text: 'DELETE the underlined portion' },
      { letter: 'D', text: 'of the experiment\'s results' }
    ],
    correct_answer: 'C',
    answer_explanation: '"Final outcome" is already specific; "of the experiment" is implied from context and should be deleted.'
  },
  {
    position: 13,
    title: 'Wordy Phrase Elimination',
    problem_text: '<u>Due to the fact that</u> it was raining, the game was postponed.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Because' },
      { letter: 'C', text: 'For the reason that' },
      { letter: 'D', text: 'On account of the fact that' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Because" is more concise than "due to the fact that" and means the same thing.'
  },
  {
    position: 14,
    title: 'Basic Redundant Verb',
    problem_text: 'The author <u>continues to persist</u> in her research despite funding challenges.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'persists' },
      { letter: 'C', text: 'continues persistently' },
      { letter: 'D', text: 'is continuing to persist' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Persist" already means "continue," so both words together are redundant.'
  },

  // MEDIUM (positions 15-16, 19-21, 23-24, 29, 33-34)
  {
    position: 15,
    title: 'Contextual Redundancy',
    problem_text: 'The archaeologist discovered an <u>ancient artifact from long ago</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'ancient artifact' },
      { letter: 'C', text: 'artifact from ancient times long ago' },
      { letter: 'D', text: 'old ancient artifact' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Ancient" already means "from long ago," making the additional phrase redundant.'
  },
  {
    position: 16,
    title: 'Complex Wordy Construction',
    problem_text: 'The scientist made <u>an announcement stating that she had discovered</u> a new species.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'an announcement of her discovery of' },
      { letter: 'C', text: 'the announcement that she discovered' },
      { letter: 'D', text: 'announced she had discovered' }
    ],
    correct_answer: 'D',
    answer_explanation: 'The verb "announced" is more direct and concise than the wordy noun phrase "made an announcement stating that."'
  },
  {
    position: 19,
    title: 'Implicit Information',
    problem_text: 'The recipe requires <u>a total of three cups of flour in all</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'three cups of flour total' },
      { letter: 'C', text: 'three cups of flour' },
      { letter: 'D', text: 'a total number of three cups of flour' }
    ],
    correct_answer: 'C',
    answer_explanation: 'Both "a total of" and "in all" are redundant; the number alone is sufficient.'
  },
  {
    position: 20,
    title: 'Subtle Redundant Modifier',
    problem_text: 'The committee will <u>completely eliminate</u> unnecessary regulations.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'eliminate' },
      { letter: 'C', text: 'totally eliminate' },
      { letter: 'D', text: 'eliminate entirely' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Eliminate" already means to remove completely, so "completely" is redundant.'
  },
  {
    position: 21,
    title: 'Redundant Comparison',
    problem_text: 'The new model is <u>more superior than</u> the previous version.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'superior to' },
      { letter: 'C', text: 'more better than' },
      { letter: 'D', text: 'superior than' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Superior" already indicates "more," so "more superior" is redundant. Also, "superior" takes "to," not "than."'
  },
  {
    position: 23,
    title: 'Complex DELETE Decision',
    problem_text: 'The festival, <u>which celebrates local culture and traditions,</u> attracts thousands of visitors each year.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'a celebration of local culture and traditions,' },
      { letter: 'C', text: 'DELETE the underlined portion' },
      { letter: 'D', text: 'celebrating local culture and traditions,' }
    ],
    correct_answer: 'A',
    answer_explanation: 'This information is NOT redundant; it provides essential context about what the festival celebrates.'
  },
  {
    position: 24,
    title: 'Wordy Passive Construction',
    problem_text: 'The decision <u>was made by the board to approve</u> the budget.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'to approve the budget was made by the board' },
      { letter: 'C', text: 'by the board was to approve' },
      { letter: 'D', text: 'by the board approved' }
    ],
    correct_answer: 'D',
    answer_explanation: 'The active voice "the board approved" is more concise than the passive "was made by the board to approve."'
  },
  {
    position: 29,
    title: 'Sophisticated Redundancy',
    problem_text: 'The study <u>first began</u> in 2010 and continues today.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'began' },
      { letter: 'C', text: 'started to begin' },
      { letter: 'D', text: 'initially began' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Began" already indicates the first occurrence, so "first" is redundant.'
  },
  {
    position: 33,
    title: 'Nuanced Wordiness',
    problem_text: 'The professor <u>has the ability to explain</u> complex concepts clearly.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'can explain' },
      { letter: 'C', text: 'possesses the ability to explain' },
      { letter: 'D', text: 'is able to have the ability to explain' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Can explain" is more concise than "has the ability to explain" while conveying the same meaning.'
  },
  {
    position: 34,
    title: 'Implicit Meaning Redundancy',
    problem_text: 'The new policy will <u>provide benefits that are advantageous</u> to employees.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'provide beneficial advantages' },
      { letter: 'C', text: 'benefit' },
      { letter: 'D', text: 'provide advantageous benefits' }
    ],
    correct_answer: 'C',
    answer_explanation: 'Benefits are by definition advantageous. The verb "benefit" alone is most concise.'
  },

  // HARD (positions 35-36, 38-41, 43-44, 46-50)
  {
    position: 35,
    title: 'Complex Contextual Redundancy',
    problem_text: 'The museum\'s extensive collection includes rare manuscripts, <u>some of which are one-of-a-kind unique documents</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'some being unique one-of-a-kind documents' },
      { letter: 'C', text: 'some of which are unique' },
      { letter: 'D', text: 'including unique one-of-a-kind ones' }
    ],
    correct_answer: 'C',
    answer_explanation: '"One-of-a-kind" and "unique" mean the same thing. Choose one or the other, not both.'
  },
  {
    position: 36,
    title: 'Sophisticated DELETE Analysis',
    problem_text: 'The renovation, <u>undertaken by the city to modernize the facility,</u> cost $2 million.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'which the city undertook to modernize the facility,' },
      { letter: 'C', text: 'DELETE the underlined portion' },
      { letter: 'D', text: 'a modernization project by the city,' }
    ],
    correct_answer: 'C',
    answer_explanation: 'The phrase is redundant; renovations, by definition, modernize facilities. The context makes this clear.'
  },
  {
    position: 38,
    title: 'Advanced Wordy Phrase',
    problem_text: '<u>In spite of the fact that</u> funding was limited, the project succeeded.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'Although' },
      { letter: 'C', text: 'Despite the fact that' },
      { letter: 'D', text: 'Regardless of the fact that' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The single word "Although" replaces the wordy phrase "in spite of the fact that."'
  },
  {
    position: 39,
    title: 'Complex Implicit Redundancy',
    problem_text: 'The author\'s memoir <u>recounts her personal experiences</u> growing up in rural Montana.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'recounts her experiences' },
      { letter: 'C', text: 'tells of her personal experiences' },
      { letter: 'D', text: 'personally recounts her experiences' }
    ],
    correct_answer: 'B',
    answer_explanation: 'A memoir, by definition, contains personal experiences, so "personal" is redundant.'
  },
  {
    position: 40,
    title: 'Sophisticated Verb Redundancy',
    problem_text: 'The company plans to <u>advance forward</u> with the expansion project.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'proceed forward' },
      { letter: 'C', text: 'advance' },
      { letter: 'D', text: 'move forward in advancing' }
    ],
    correct_answer: 'C',
    answer_explanation: '"Advance" already means "move forward," so "forward" is redundant.'
  },
  {
    position: 41,
    title: 'Nuanced Contextual Analysis',
    problem_text: 'The sculpture, created by a local artist, <u>visually depicts</u> the town\'s industrial heritage.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'depicts' },
      { letter: 'C', text: 'shows visually' },
      { letter: 'D', text: 'provides a visual depiction of' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sculptures are inherently visual; "visually" is redundant with "depicts."'
  },
  {
    position: 43,
    title: 'Advanced Implicit Meaning',
    problem_text: 'The laboratory uses <u>cutting-edge modern technology</u> for genetic research.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'modern cutting-edge technology' },
      { letter: 'C', text: 'cutting-edge technology' },
      { letter: 'D', text: 'technology that is cutting-edge and modern' }
    ],
    correct_answer: 'C',
    answer_explanation: '"Cutting-edge" already implies modern; both words together are redundant.'
  },
  {
    position: 44,
    title: 'Complex Wordy Substitution',
    problem_text: 'The committee <u>reached a consensus of agreement</u> on the new policy.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'came to a consensus' },
      { letter: 'C', text: 'reached consensus' },
      { letter: 'D', text: 'achieved an agreement and consensus' }
    ],
    correct_answer: 'C',
    answer_explanation: 'Consensus already means agreement, making "of agreement" redundant.'
  },
  {
    position: 46,
    title: 'Sophisticated Phrase Reduction',
    problem_text: '<u>The reason why</u> the experiment failed was inadequate temperature control.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'The reason that' },
      { letter: 'C', text: 'Why' },
      { letter: 'D', text: 'The reason for why' }
    ],
    correct_answer: 'C',
    answer_explanation: 'The single word "Why" replaces the wordy "the reason why" effectively.'
  },
  {
    position: 47,
    title: 'Advanced DELETE Decision',
    problem_text: 'The documentary examines climate change, <u>a phenomenon affecting global temperatures,</u> and its impact on ecosystems.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'which affects global temperatures,' },
      { letter: 'C', text: 'DELETE the underlined portion' },
      { letter: 'D', text: 'affecting temperatures globally,' }
    ],
    correct_answer: 'C',
    answer_explanation: 'The phrase is redundant; "climate change" already implies effects on global temperatures.'
  },
  {
    position: 48,
    title: 'Complex Nested Redundancy',
    problem_text: 'The program offers <u>various different options</u> for professional development.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'various options' },
      { letter: 'C', text: 'different various options' },
      { letter: 'D', text: 'options that are different and various' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Various" and "different" are synonymous in this context; use only one.'
  },
  {
    position: 49,
    title: 'Sophisticated Conciseness',
    problem_text: 'The treaty <u>mutually benefits both countries</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'benefits both countries mutually' },
      { letter: 'C', text: 'benefits both countries' },
      { letter: 'D', text: 'provides mutual benefits to both countries' }
    ],
    correct_answer: 'C',
    answer_explanation: '"Both" already indicates mutual benefit; "mutually" is redundant.'
  },
  {
    position: 50,
    title: 'Advanced Contextual Wordiness',
    problem_text: 'The chef\'s innovative techniques <u>create dishes that are characterized by bold flavors</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'result in dishes characterized by bold flavors' },
      { letter: 'C', text: 'create boldly flavored dishes' },
      { letter: 'D', text: 'are creating dishes with characteristics of bold flavors' }
    ],
    correct_answer: 'C',
    answer_explanation: 'The concise phrase "create boldly flavored dishes" eliminates the wordy "create dishes that are characterized by bold flavors."'
  }
];

async function main() {
  console.log('Completing REDUNDANCY lesson (30 questions)...\n');
  console.log('='.repeat(70) + '\n');

  let added = 0;
  for (const q of questions) {
    if (await addQuestion(q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      added++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n✅ REDUNDANCY Complete! Added ${added}/30 questions.`);
}

main();
