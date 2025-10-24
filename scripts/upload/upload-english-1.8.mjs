import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function uploadChapter8() {
  // Step 1: Upload the lesson content
  const lessonContent = fs.readFileSync('restructured-english-1.8-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'misc-topics');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }
  console.log('✓ Lesson content uploaded for misc-topics');

  // Step 2: Get lesson ID
  const { data: lessonData, error: fetchError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'misc-topics')
    .single();

  if (fetchError || !lessonData) {
    console.error('Error fetching lesson:', fetchError);
    process.exit(1);
  }

  const lessonId = lessonData.id;
  console.log(`✓ Lesson ID: ${lessonId}`);

  // Step 3: Create 6 examples (one per H3 section)
  const examples = [
    {
      lesson_id: lessonId,
      title: 'Affect vs. Effect',
      position: 1,
      problem_text: 'The documentary explored the effect that social media has on teenagers, showing how constant connectivity <u>affects</u> their mental health and self-esteem.',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'effects', letter: 'B' },
        { text: 'has an affect on', letter: 'C' },
        { text: 'effecting', letter: 'D' }
      ],
      correct_answer: 'A',
      answer_explanation: 'The verb "affects" is correct here because we need a verb meaning "to produce a change in." The first use is correctly "effect" (noun), and the second is "affects" (verb).',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Than vs. Then',
      position: 2,
      problem_text: 'The coach explained that winning requires more practice <u>than</u> natural talent alone can provide.',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'then', letter: 'B' },
        { text: 'compared to when there is', letter: 'C' },
        { text: 'as opposed to', letter: 'D' }
      ],
      correct_answer: 'A',
      answer_explanation: 'Use "than" for comparisons. Since this sentence is comparing practice to natural talent, "than" is correct. "Then" is only for time sequences or if/then statements.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Have vs. Of',
      position: 3,
      problem_text: 'If Sarah had studied more diligently, she <u>could of</u> earned a higher score on the exam.',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'could have', letter: 'B' },
        { text: 'might of', letter: 'C' },
        { text: 'would of', letter: 'D' }
      ],
      correct_answer: 'B',
      answer_explanation: 'Always use "could have" not "could of." The confusion comes from the contraction "could\'ve" sounding like "could of," but "of" is never correct after could, should, would, or might.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Countable vs. Non-countable',
      position: 4,
      problem_text: 'The research showed that the <u>amount of students</u> participating in after-school programs has increased significantly.',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'number of students', letter: 'B' },
        { text: 'less students', letter: 'C' },
        { text: 'much students', letter: 'D' }
      ],
      correct_answer: 'B',
      answer_explanation: 'Students are countable (you can count individual students), so use "number" not "amount." For countable nouns, use: number, many, fewer, few. For non-countable nouns, use: amount, much, less, little.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Active vs. Passive Voice',
      position: 5,
      problem_text: 'The new policy <u>was announced by the principal</u> during the morning assembly.',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'the principal announced', letter: 'B' },
        { text: 'being announced, the principal spoke about it', letter: 'C' },
        { text: 'had been made an announcement by the principal', letter: 'D' }
      ],
      correct_answer: 'B',
      answer_explanation: 'Active voice is always better than passive voice on the ACT. Choice A is passive (the subject "policy" is acted upon). Choice B is active (the subject "principal" performs the action). Active voice is clearer and more direct.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Prepositional Idioms',
      position: 6,
      problem_text: 'The young child was afraid <u>by</u> the thunderstorm and hid under the bed.',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'about', letter: 'B' },
        { text: 'of', letter: 'C' },
        { text: 'from', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: 'The correct prepositional idiom is "afraid of" not "afraid by." Certain words must be paired with specific prepositions. When you see these questions, rely on what sounds best to you.',
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

  console.log('\n✓ All Chapter 8 content uploaded successfully!');
}

uploadChapter8();
