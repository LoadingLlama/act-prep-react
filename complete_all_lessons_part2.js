/**
 * Complete remaining Chapter 1 lessons: modifiers, parallel-structure, misc-topics
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSONS = {
  'modifiers': 'f7ac1d6c-6416-47fd-9720-807224100517',
  'parallel-structure': 'e6153221-e330-4db4-8cc7-9c5a1d51a301',
  'misc-topics': '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16'
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

// MODIFIERS - Positions 47-50 (HARD)
const modifiersQuestions = [
  {
    position: 47,
    title: 'Complex Dangling Modifier',
    problem_text: '<u>Having been revised multiple times</u>, the committee finally approved the comprehensive policy proposal.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'The committee finally approved the comprehensive policy proposal, which had been revised multiple times.' },
      { letter: 'C', text: 'The comprehensive policy proposal was finally approved by the committee, having been revised multiple times.' },
      { letter: 'D', text: 'After having been revised multiple times, the committee finally approved the comprehensive policy proposal.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The opening phrase "Having been revised" must modify "proposal," not "committee." Only choice B correctly places "proposal" as the subject being modified.'
  },
  {
    position: 48,
    title: 'Sophisticated Misplaced Modifier',
    problem_text: 'The museum curator displayed artifacts from ancient civilizations <u>that had been meticulously restored in glass cases</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'in glass cases that had been meticulously restored' },
      { letter: 'C', text: 'that, in glass cases, had been meticulously restored' },
      { letter: 'D', text: ', meticulously restored, in glass cases' }
    ],
    correct_answer: 'D',
    answer_explanation: 'The phrase "that had been meticulously restored" should modify "artifacts," not "glass cases." Choice D correctly places the modifier next to "artifacts."'
  },
  {
    position: 49,
    title: 'Advanced Squinting Modifier',
    problem_text: 'The researcher who analyzed the data <u>carefully documented</u> patterns that emerged from the longitudinal study.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'documented carefully' },
      { letter: 'C', text: 'carefully, documented' },
      { letter: 'D', text: 'documented, carefully,' }
    ],
    correct_answer: 'A',
    answer_explanation: 'The placement is correct; "carefully" clearly modifies "documented" in this position, indicating how the documentation was done.'
  },
  {
    position: 50,
    title: 'Complex Participial Phrase Placement',
    problem_text: '<u>Spanning three decades of research</u>, numerous scientists contributed to the groundbreaking discovery.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'The groundbreaking discovery was made by numerous scientists, spanning three decades of research.' },
      { letter: 'C', text: 'Numerous scientists contributed to the groundbreaking discovery, which spanned three decades of research.' },
      { letter: 'D', text: 'The groundbreaking discovery, spanning three decades of research, was contributed to by numerous scientists.' }
    ],
    correct_answer: 'C',
    answer_explanation: 'The opening phrase must modify what immediately follows. "Spanning three decades" should modify the research/discovery, not "scientists." Choice C correctly restructures the sentence.'
  }
];

// PARALLEL STRUCTURE - Positions 47-50 (HARD)
const parallelQuestions = [
  {
    position: 47,
    title: 'Complex Correlative Conjunction Parallelism',
    problem_text: 'The research findings were significant not only because of <u>their statistical validity but also the methodology was innovative</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'their statistical validity but also because of their innovative methodology' },
      { letter: 'C', text: 'having statistical validity but also innovative in methodology' },
      { letter: 'D', text: 'the statistical validity but also for the innovative methodology' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The correlative conjunction "not only...but also" requires parallel structure. Both parts must have the same grammatical form: "because of X...but also because of Y."'
  },
  {
    position: 48,
    title: 'Sophisticated List Parallelism',
    problem_text: 'The conference featured presentations on climate modeling, <u>developing sustainable energy, and what the economic impacts are</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'sustainable energy development, and economic impacts' },
      { letter: 'C', text: 'the development of sustainable energy, and the economic impacts' },
      { letter: 'D', text: 'developing sustainable energy, and the economic impacts' }
    ],
    correct_answer: 'B',
    answer_explanation: 'All items in a list must be parallel. The first item "climate modeling" is a noun phrase, so the others should also be noun phrases: "sustainable energy development" and "economic impacts."'
  },
  {
    position: 49,
    title: 'Advanced Comparison Parallelism',
    problem_text: 'The new software is more efficient than <u>using the previous version</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'the previous version' },
      { letter: 'C', text: 'to use the previous version' },
      { letter: 'D', text: 'when you use the previous version' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Comparisons must be parallel. You\'re comparing "the new software" (a thing) to "the previous version" (also a thing), not to the action of "using."'
  },
  {
    position: 50,
    title: 'Complex Verb Form Parallelism',
    problem_text: 'The committee recommended revising the guidelines, <u>to implement new training protocols</u>, and strengthening interdepartmental communication.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'implementing new training protocols' },
      { letter: 'C', text: 'implementation of new training protocols' },
      { letter: 'D', text: 'that new training protocols be implemented' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The list items must be parallel. "Revising" and "strengthening" are gerunds, so "implementing" (not the infinitive "to implement") maintains parallel structure.'
  }
];

// MISC-TOPICS - Positions 45, 46, 47, 49, 50 (HARD)
const miscQuestions = [
  {
    position: 45,
    title: 'Idiomatic Preposition Usage',
    problem_text: 'The research team was concerned <u>of</u> the potential impact on local ecosystems.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'about' },
      { letter: 'C', text: 'with' },
      { letter: 'D', text: 'for' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The correct idiom is "concerned about," not "concerned of." Different adjectives require specific prepositions.'
  },
  {
    position: 46,
    title: 'Commonly Confused Words: Effect/Affect',
    problem_text: 'The policy changes will greatly <u>effect</u> small business operations across the region.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'affect' },
      { letter: 'C', text: 'have an effect on' },
      { letter: 'D', text: 'be affecting' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Affect" is the verb meaning to influence. "Effect" is usually a noun. The sentence needs the verb form.'
  },
  {
    position: 47,
    title: 'Advanced Active vs. Passive Voice',
    problem_text: 'Although the manuscript had been written by the author twenty years earlier, <u>publication was not achieved until</u> 2020.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'it was not published until' },
      { letter: 'C', text: 'its publication was not until' },
      { letter: 'D', text: 'publishing did not occur until' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Active voice ("it was not published") is clearer and more concise than the passive construction "publication was not achieved."'
  },
  {
    position: 49,
    title: 'Sophisticated Word Choice: Precision',
    problem_text: 'The diplomat\'s <u>nice</u> handling of the negotiations prevented a potential crisis.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'good' },
      { letter: 'C', text: 'deft' },
      { letter: 'D', text: 'pleasant' }
    ],
    correct_answer: 'C',
    answer_explanation: '"Deft" (skillful and quick) is more precise than the vague "nice." Precision in word choice strengthens writing.'
  },
  {
    position: 50,
    title: 'Complex Idiomatic Expression',
    problem_text: 'The scholarship provides students <u>with the opportunity of studying</u> abroad for a full academic year.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'the opportunity to study' },
      { letter: 'C', text: 'with opportunities for studying' },
      { letter: 'D', text: 'opportunities of study' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The correct idiom is "opportunity to [verb]," not "opportunity of [gerund]." Use the infinitive form after "opportunity."'
  }
];

async function main() {
  console.log('Completing Chapter 1 remaining lessons...\n');
  console.log('='.repeat(70) + '\n');

  let totalAdded = 0;

  // Add modifiers questions
  console.log('MODIFIERS (adding 4 HARD questions):');
  for (const q of modifiersQuestions) {
    if (await addQuestion(LESSONS.modifiers, q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      totalAdded++;
    }
  }

  // Add parallel-structure questions
  console.log('\nPARALLEL-STRUCTURE (adding 4 HARD questions):');
  for (const q of parallelQuestions) {
    if (await addQuestion(LESSONS['parallel-structure'], q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      totalAdded++;
    }
  }

  // Add misc-topics questions
  console.log('\nMISC-TOPICS (adding 5 HARD questions):');
  for (const q of miscQuestions) {
    if (await addQuestion(LESSONS['misc-topics'], q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      totalAdded++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n✅ Part 2 Complete! Added ${totalAdded} questions.`);
  console.log('\nAll Chapter 1 lessons (1.1-1.8) now have 50 questions!');
  console.log('\nNext: Run complete_chapter2_lessons.js for Chapter 2 (Rhetorical Skills)');
}

main();
