import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// CRITICAL: Must use SERVICE_ROLE_KEY not ANON_KEY for updates to work!
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadChapter10() {
  // Step 1: Upload the lesson content
  const lessonContent = fs.readFileSync('restructured-english-1.10-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'redundancy');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }
  console.log('✓ Lesson content uploaded for redundancy');

  // Step 2: Get lesson ID
  const { data: lessonData, error: fetchError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'redundancy')
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
      title: 'Redundancy in Context',
      position: 1,
      problem_text: 'After two years of traveling abroad, Jerome finally <u>returned back home</u> to his family in California.',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'returned home', letter: 'B' },
        { text: 'came back home', letter: 'C' },
        { text: 'returned back', letter: 'D' }
      ],
      correct_answer: 'B',
      answer_explanation: 'The word "returned" already means to come back, so adding "back" is redundant. Choice B eliminates the redundancy while preserving the meaning. Choice C is also redundant because "came back" means the same as "returned." Choice D keeps the redundancy. The answer is **B**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Eliminating Wordiness',
      position: 2,
      problem_text: 'The committee met <u>at this point in time</u> to discuss the upcoming budget proposals.',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'currently at the present moment', letter: 'B' },
        { text: 'now', letter: 'C' },
        { text: 'in the current time period', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: '"At this point in time" is unnecessarily wordy. It can be replaced with the single word "now" without losing any meaning. Choices A, B, and D all use multiple words when one word suffices. The shortest, clearest option is C. The answer is **C**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Removing Irrelevant Information',
      position: 3,
      problem_text: 'The marathon runner crossed the finish line in first place. <u>Marathon running became an Olympic sport in 1896.</u> The crowd erupted in cheers as she raised her arms in victory.',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'Marathons are 26.2 miles long.', letter: 'B' },
        { text: 'She had trained for months for this moment.', letter: 'C' },
        { text: 'DELETE the underlined sentence.', letter: 'D' }
      ],
      correct_answer: 'D',
      answer_explanation: 'The passage is about this specific runner crossing the finish line and the crowd\'s reaction. Historical facts about the Olympic marathon or the race distance are irrelevant to this moment. Choice C adds relevant information about her training, but the flow from crossing the finish line to the crowd cheering works better without interruption. The answer is **D**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Identifying Question Type',
      position: 4,
      problem_text: 'The July 4th "Walk for Wags" event raised over $10,000 <u>this year for local dog shelters</u>.\n\nWhich choice is the least redundant in context?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'this year', letter: 'B' },
        { text: 'for local dog shelters', letter: 'C' },
        { text: 'in July', letter: 'D' }
      ],
      correct_answer: 'B',
      answer_explanation: 'The question specifically asks for the least redundant choice, so we pick the shortest answer. The event name already mentions it\'s for "Wags" (dogs) and "July 4th" tells us when it occurred. The passage already establishes this is a fundraising event for dog shelters, making "for local dog shelters" redundant. "July" is also redundant since "July 4th" appears in the event name. The shortest, least redundant option is simply "this year." The answer is **B**.',
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

  console.log('\n✓ All Chapter 10 content uploaded successfully!');
}

uploadChapter10();
