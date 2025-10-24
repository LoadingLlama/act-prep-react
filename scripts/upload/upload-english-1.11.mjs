import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// CRITICAL: Must use SERVICE_ROLE_KEY not ANON_KEY for updates to work!
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadChapter11() {
  // Step 1: Upload the lesson content
  const lessonContent = fs.readFileSync('restructured-english-1.11-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'word-choice');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }
  console.log('✓ Lesson content uploaded for word-choice');

  // Step 2: Get lesson ID
  const { data: lessonData, error: fetchError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'word-choice')
    .single();

  if (fetchError || !lessonData) {
    console.error('Error fetching lesson:', fetchError);
    process.exit(1);
  }

  const lessonId = lessonData.id;
  console.log(`✓ Lesson ID: ${lessonId}`);

  // Step 3: Create 4 examples (one per H3 section)
  const examples = [
    {
      lesson_id: lessonId,
      title: 'Identifying Context',
      position: 1,
      problem_text: 'The documentary <u>exhibited</u> rare footage of the endangered species in its natural habitat.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'displayed', letter: 'B' },
        { text: 'revealed', letter: 'C' },
        { text: 'outlined', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: 'The context suggests the footage was previously unseen or hidden. "Revealed" means to uncover or make known something that was hidden, which fits perfectly with "rare footage." "Exhibited" and "displayed" mean to show something on purpose, but don\'t capture the sense of discovery. "Outlined" means to give a summary, which doesn\'t fit visual footage. The answer is **C**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Testing Each Word',
      position: 2,
      problem_text: 'After reading my paper, my teacher was <u>adamant</u> that I needed to learn how to properly cite my sources.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'ecstatic', letter: 'B' },
        { text: 'eminent', letter: 'C' },
        { text: 'trivial', letter: 'D' }
      ],
      correct_answer: 'A',
      answer_explanation: '"Adamant" means firmly insistent, which fits the context of the teacher strongly emphasizing the need to cite sources. "Ecstatic" means extremely happy, which doesn\'t fit. "Eminent" means famous or distinguished, which describes a person\'s status, not their attitude. "Trivial" means unimportant, which is the opposite of what the teacher is conveying. The answer is **A**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Using Known Words',
      position: 3,
      problem_text: 'When I first moved in, the passing train woke me up every night. However, I can now just <u>tune it out</u> and sleep through the entire night.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'scorn it', letter: 'B' },
        { text: 'snub it', letter: 'C' },
        { text: 'overlook it', letter: 'D' }
      ],
      correct_answer: 'A',
      answer_explanation: '"Tune it out" is a common phrase meaning to ignore or block out a sound, which perfectly fits the context of ignoring train noise. "Scorn" means to treat with contempt, which doesn\'t fit ignoring a sound. "Snub" means to deliberately ignore someone in a rude way. "Overlook" means to fail to notice, but the speaker is aware of the train—they\'re choosing to ignore it. The simple, familiar phrase "tune it out" is correct. The answer is **A**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Similar Meanings, Different Uses',
      position: 4,
      problem_text: 'The officials must be <u>dispassionate about</u> the outcome of the game in order to do their jobs properly.\n\nWhich choice is clearest and most precise in context?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'unbiased with', letter: 'B' },
        { text: 'disinterested in', letter: 'C' },
        { text: 'without care in regarding', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: 'Officials need to be neutral and not favor one side. "Disinterested" means impartial or unbiased, which is exactly what officials should be. "Dispassionate" means without emotion, which is related but doesn\'t emphasize the lack of favoritism. "Unbiased with" has the wrong preposition (should be "about" or nothing). "Without care in regarding" is wordy and awkward. The answer is **C**.',
      solution_steps: [],
      is_worked_example: false
    }
  ];

  // Insert all examples
  for (let i = 0; i < examples.length; i++) {
    const { error: exampleError } = await supabase
      .from('lesson_examples')
      .insert(examples[i]);

    if (exampleError) {
      console.error(`Error inserting example ${i + 1}:`, exampleError);
      process.exit(1);
    }
    console.log(`✓ Example ${i + 1} inserted`);
  }

  console.log('\n✓ All Chapter 11 content uploaded successfully!');
}

uploadChapter11();
