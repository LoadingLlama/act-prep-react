import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * English interactive examples to add to database
 * These will render using ExampleCard component (same as Math examples)
 */
const englishExamples = [
  // TRANSITIONS - Example 1
  {
    lesson_key: 'transitions',
    position: 1,
    title: 'Identifying the Correct Transition',
    problem_text: 'From a distance, the ocean looked pretty calm today even though a storm had arrived last night. [Transition], the scene was much more chaotic with big waves and strong riptides.',
    choices: [
      { letter: 'A', text: 'NO CHANGE (Under the circumstances,)' },
      { letter: 'B', text: 'For instance,' },
      { letter: 'C', text: 'Up close,' },
      { letter: 'D', text: 'For example,' }
    ],
    correct_answer: 'C',
    solution_steps: [
      { step: 1, text: 'Read the context: First sentence says "from a distance" the ocean looked calm.' },
      { step: 2, text: 'The second sentence describes chaos with big waves and riptides.' },
      { step: 3, text: 'We need a transition that contrasts "from a distance" with what\'s happening closer.' },
      { step: 4, text: '"Up close" is the logical opposite of "from a distance" and properly connects these contrasting observations.' }
    ],
    answer_explanation: '"Up close" creates a clear contrast with "from a distance" in the previous sentence.',
    is_worked_example: false
  },

  // TRANSITIONS - Example 2
  {
    lesson_key: 'transitions',
    position: 2,
    title: 'Determining if a Transition is Necessary',
    problem_text: 'Stepping out on the island\'s port on Monday, the new couple debuted their own classic take on beach attire. [Transition] the actor opted for a classic white tee and board shorts while his model counterpart wore a floral print coverup and strappy sandals.',
    choices: [
      { letter: 'A', text: 'NO CHANGE (As a result,)' },
      { letter: 'B', text: 'In other words, the' },
      { letter: 'C', text: 'Consequently, the' },
      { letter: 'D', text: 'The' }
    ],
    correct_answer: 'D',
    solution_steps: [
      { step: 1, text: 'Check if a transition is needed by reading without one: "...take on beach attire. The actor opted for..."' },
      { step: 2, text: 'The sentence flows naturally without a transition - it\'s simply describing what they wore.' },
      { step: 3, text: 'Transitions like "as a result" or "consequently" suggest cause-and-effect, which doesn\'t apply here.' },
      { step: 4, text: 'The sentence is just continuing the description, so no transition is necessary.' }
    ],
    answer_explanation: 'No transition is needed - the sentence simply continues describing their outfits.',
    is_worked_example: false
  },

  // WHICH CHOICE - Example 1
  {
    lesson_key: 'which-choice',
    position: 1,
    title: 'Choosing the Most Concise Option',
    problem_text: 'The committee spent months researching the topic before they made their final decision about what to do.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'before making their final decision.' },
      { letter: 'C', text: 'before they ultimately decided.' },
      { letter: 'D', text: 'before deciding.' }
    ],
    correct_answer: 'D',
    solution_steps: [
      { step: 1, text: 'Identify redundancy: "made their final decision about what to do" is wordy.' },
      { step: 2, text: 'Option A keeps unnecessary words like "about what to do" (redundant with "decision").' },
      { step: 3, text: 'Options B and C still include "their final" or "ultimately" which is implied.' },
      { step: 4, text: 'Option D "before deciding" is the most concise while maintaining full meaning.' }
    ],
    answer_explanation: '"Before deciding" is the most concise option without losing any meaning.',
    is_worked_example: false
  },

  // WHICH CHOICE - Example 2
  {
    lesson_key: 'which-choice',
    position: 2,
    title: 'Selecting the Most Specific Detail',
    problem_text: 'The artist used various colors in her painting to create a vibrant atmosphere.',
    choices: [
      { letter: 'A', text: 'NO CHANGE' },
      { letter: 'B', text: 'bold reds, deep blues, and golden yellows' },
      { letter: 'C', text: 'different shades' },
      { letter: 'D', text: 'lots of paint' }
    ],
    correct_answer: 'B',
    solution_steps: [
      { step: 1, text: '"Various colors" is vague and doesn\'t create a vivid image for the reader.' },
      { step: 2, text: 'Option B provides specific color names that support "vibrant atmosphere."' },
      { step: 3, text: 'Options C and D are even more vague than the original.' },
      { step: 4, text: 'Specific details make writing stronger and more engaging.' }
    ],
    answer_explanation: 'Specific color names create a more vivid, vibrant image than "various colors."',
    is_worked_example: false
  },

  // WORD CHOICE - Example 1
  {
    lesson_key: 'word-choice',
    position: 1,
    title: 'Selecting the Correct Word in Context',
    problem_text: 'The company\'s new policy will [affect/effect] all employees starting next month.',
    choices: [
      { letter: 'A', text: 'affect (verb - to influence)' },
      { letter: 'B', text: 'effect (noun - a result)' },
      { letter: 'C', text: 'effect (verb - to bring about)' },
      { letter: 'D', text: 'affect (noun - emotion)' }
    ],
    correct_answer: 'A',
    solution_steps: [
      { step: 1, text: 'Determine the part of speech needed: "will [blank] all employees" needs a verb.' },
      { step: 2, text: 'We need the verb meaning "to influence" - that\'s "affect."' },
      { step: 3, text: 'Option B "effect" as a noun doesn\'t fit grammatically here.' },
      { step: 4, text: 'Option C "effect" as a verb means "to bring about" (usually with a noun like "change"), which doesn\'t fit the context.' }
    ],
    answer_explanation: '"Affect" (verb) means to influence, which is what the policy does to employees.',
    is_worked_example: false
  }
];

/**
 * Upload English examples to Supabase
 */
async function createEnglishExamples() {
  console.log('📝 CREATING ENGLISH INTERACTIVE EXAMPLES');
  console.log('=========================================\n');

  let successCount = 0;
  let errorCount = 0;

  for (const example of englishExamples) {
    // Get lesson UUID
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id, title')
      .eq('lesson_key', example.lesson_key)
      .single();

    if (lessonError || !lesson) {
      console.log(`❌ Lesson ${example.lesson_key} not found in database`);
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
      console.log(`❌ Error inserting ${example.lesson_key} Example ${example.position}: ${insertError.message}`);
      errorCount++;
    } else {
      console.log(`✓ ${example.lesson_key} - Example ${example.position}: ${example.title}`);
      successCount++;
    }
  }

  console.log('\n=========================================');
  console.log(`✅ COMPLETE!`);
  console.log(`   Created: ${successCount} examples`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`\n   All examples will render using ExampleCard component`);
  console.log(`   with same styling as Math examples (JSX/React)`);
}

// Run creation
createEnglishExamples().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
