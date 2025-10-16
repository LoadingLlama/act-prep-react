import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const missingExamples = [
  // SENTENCE-STRUCTURE
  {
    lesson_key: 'sentence-structure',
    position: 1,
    title: 'Identifying Sentence Fragments',
    problem_text: 'Although the bakery opens at 6 AM every morning. It always has a line of customers waiting outside.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'morning, it' },
      { letter: 'C', text: 'morning; it' },
      { letter: 'D', text: 'morning it' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: '"Although the bakery opens at 6 AM every morning" is a dependent clause.' },
      { step: 2, text: 'Dependent clauses cannot stand alone - Choice A creates a sentence fragment.' },
      { step: 3, text: 'Must connect to the independent clause that follows.' },
      { step: 4, text: 'Choice B correctly uses a comma to join the dependent and independent clauses.' }
    ],
    answer_explanation: 'Use a comma to connect a dependent clause to an independent clause.',
    is_worked_example: false
  },
  {
    lesson_key: 'sentence-structure',
    position: 2,
    title: 'Fixing Run-On Sentences',
    problem_text: 'The students studied for hours they wanted to do well on the exam.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'hours, they' },
      { letter: 'C', text: 'hours; they' },
      { letter: 'D', text: 'hours and they' }
    ],
    correct_answer: 'C',
    solution_steps: [
      { step: 1, text: 'Two independent clauses: "The students studied for hours" and "they wanted to do well."' },
      { step: 2, text: 'Choice A is a run-on sentence - two complete sentences without punctuation.' },
      { step: 3, text: 'Choice B creates a comma splice.' },
      { step: 4, text: 'Choice C correctly uses a semicolon to separate independent clauses.' }
    ],
    answer_explanation: 'Use a semicolon to separate two independent clauses.',
    is_worked_example: false
  },

  // GRAMMAR-REVIEW
  {
    lesson_key: 'grammar-review',
    position: 1,
    title: 'Mixed Grammar Review',
    problem_text: 'Neither the teachers nor the principal were aware of the students plan to organize a surprise assembly.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'was aware of the students\' plan' },
      { letter: 'C', text: 'were aware of the students\' plan' },
      { letter: 'D', text: 'was aware of the student\'s plan' }
    ],
    correct_answer: 'C',
    solution_steps: [
      { step: 1, text: 'With "neither...nor," the verb agrees with the closest subject: "principal" (singular).' },
      { step: 2, text: 'However, "students plan" needs an apostrophe for possession.' },
      { step: 3, text: 'Multiple students = "students\'" (plural possessive).' },
      { step: 4, text: 'Choice C fixes the possessive while maintaining correct verb agreement.' }
    ],
    answer_explanation: 'Use "students\'" for plural possessive and match verb to nearest subject.',
    is_worked_example: false
  },
  {
    lesson_key: 'grammar-review',
    position: 2,
    title: 'Comprehensive Error Identification',
    problem_text: 'The committee have been meeting regularly, however they still haven\'t reached a consensus.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'has been meeting regularly; however, they' },
      { letter: 'C', text: 'have been meeting regularly; however, it' },
      { letter: 'D', text: 'has been meeting regularly; however, it' }
    ],
    correct_answer: 'D',
    solution_steps: [
      { step: 1, text: '"Committee" is a collective noun treated as singular in American English.' },
      { step: 2, text: 'Use "has" (not "have") with singular subjects.' },
      { step: 3, text: 'Two independent clauses require semicolon before "however."' },
      { step: 4, text: 'Pronoun "it" (not "they") agrees with singular "committee."' }
    ],
    answer_explanation: 'Collective nouns are singular: use "has" and "it" with proper punctuation.',
    is_worked_example: false
  },

  // MISC-TOPICS
  {
    lesson_key: 'misc-topics',
    position: 1,
    title: 'Relative Pronouns',
    problem_text: 'The scientist that discovered the new species was awarded a grant.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'who discovered' },
      { letter: 'C', text: 'whom discovered' },
      { letter: 'D', text: 'which discovered' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'Use "who/whom" for people, "that/which" for things.' },
      { step: 2, text: 'The scientist is a person, so "that" should be "who."' },
      { step: 3, text: 'The pronoun is the subject of "discovered," so use "who" (not "whom").' },
      { step: 4, text: '"Which" is for things, not people.' }
    ],
    answer_explanation: 'Use "who" for people when the pronoun is the subject.',
    is_worked_example: false
  },
  {
    lesson_key: 'misc-topics',
    position: 2,
    title: 'Idiomatic Expressions',
    problem_text: 'The solution was different than what we expected.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'different from what' },
      { letter: 'C', text: 'different to what' },
      { letter: 'D', text: 'different with what' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: 'The idiom is "different from" (not "different than").' },
      { step: 2, text: 'In formal writing, "different from" is preferred.' },
      { step: 3, text: 'Options C and D use incorrect prepositions.' },
      { step: 4, text: 'Memorize common prepositional idioms for the ACT.' }
    ],
    answer_explanation: 'The correct idiom is "different from" in formal writing.',
    is_worked_example: false
  }
];

async function createMissingExamples() {
  console.log('📝 CREATING MISSING ENGLISH EXAMPLES');
  console.log('=====================================\n');

  let successCount = 0;
  let errorCount = 0;

  for (const example of missingExamples) {
    // Get lesson UUID
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id, title')
      .eq('lesson_key', example.lesson_key)
      .single();

    if (lessonError || !lesson) {
      console.log(`❌ Lesson ${example.lesson_key} not found`);
      errorCount++;
      continue;
    }

    // Insert example
    const { error: insertError } = await supabase
      .from('examples')
      .insert({
        lesson_id: lesson.id,
        position: example.position,
        title: example.title,
        problem_text: example.problem_text,
        choices: example.choices,
        correct_answer: example.correct_answer,
        solution_steps: example.solution_steps,
        answer_explanation: example.answer_explanation,
        is_worked_example: example.is_worked_example,
        diagram_svg: null
      });

    if (insertError) {
      console.log(`❌ ${example.lesson_key} Example ${example.position}: ${insertError.message}`);
      errorCount++;
    } else {
      console.log(`✅ ${example.lesson_key} - Example ${example.position}: ${example.title}`);
      successCount++;
    }
  }

  console.log('\n=====================================');
  console.log(`✅ Created: ${successCount} examples`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('\n✅ All English lessons now have interactive examples!');
}

createMissingExamples().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
