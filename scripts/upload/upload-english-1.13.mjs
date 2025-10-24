import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadChapter13() {
  const lessonContent = fs.readFileSync('restructured-english-1.13-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'which-choice');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }
  console.log('✓ Lesson content uploaded for which-choice');

  const { data: lessonData, error: fetchError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'which-choice')
    .single();

  if (fetchError || !lessonData) {
    console.error('Error fetching lesson:', fetchError);
    process.exit(1);
  }

  const lessonId = lessonData.id;
  console.log(`✓ Lesson ID: ${lessonId}`);

  const examples = [
    {
      lesson_id: lessonId,
      title: 'Specific Description',
      position: 1,
      problem_text: 'Before refrigerators, Americans kept food cold in <u>iceboxes, which required ice to be bought and placed into the box each week</u>.\n\nWhich choice most specifically describes what was used to build iceboxes?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'iceboxes, which were only cold enough to keep food cool but not freeze anything.', letter: 'B' },
        { text: 'wooden boxes with tin and insulated with cork and sawdust.', letter: 'C' },
        { text: 'the very first invention that allowed people to keep food cold in their houses.', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: 'The question asks what was used to BUILD iceboxes—materials and construction. Only choice C mentions materials (wooden boxes, tin, cork, sawdust). Choice A talks about using the icebox, not building it. Choice B describes what it could do, not what it was made of. Choice D is vague history. The answer is **C**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Emphasis Question',
      position: 2,
      problem_text: 'Harold always begged for grow-in-water dinosaurs that <u>sprawl</u> when placed into water.\n\nWhich choice most clearly emphasizes how the dinosaurs increase in size?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'change in size', letter: 'B' },
        { text: 'expand', letter: 'C' },
        { text: 'soak', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: 'The question asks which word emphasizes the SIZE INCREASE. "Expand" directly means to increase in size. "Sprawl" means to spread out carelessly. "Change in size" is vague. "Soak" describes absorbing water, not growing. The answer is **C**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Don\'t Overthink It',
      position: 3,
      problem_text: 'The scientist discovered <u>a new species of butterfly in the rainforest</u>.\n\nWhich choice provides the most relevant detail about where in the rainforest the discovery was made?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'a new species of butterfly near the river in the lower canopy of the rainforest', letter: 'B' },
        { text: 'a new species of butterfly, which was very colorful', letter: 'C' },
        { text: 'a beautiful new species of butterfly in the rainforest', letter: 'D' }
      ],
      correct_answer: 'B',
      answer_explanation: 'The question asks for detail about WHERE IN THE RAINFOREST. Choice B is the only one that specifies location within the rainforest (near the river, lower canopy). Choice A just says "in the rainforest" without specifics. Choice C describes the butterfly, not location. Choice D adds "beautiful" but no location detail. The answer is **B**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Just Answer What\'s Asked',
      position: 4,
      problem_text: 'The concert was <u>loud and energetic</u>.\n\nWhich choice best conveys the overwhelming intensity of the concert experience?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'fun', letter: 'B' },
        { text: 'an assault on the senses', letter: 'C' },
        { text: 'attended by many people', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: 'The question asks for OVERWHELMING INTENSITY. "An assault on the senses" conveys intense, almost overwhelming sensation. "Loud and energetic" is accurate but not overwhelming. "Fun" is too casual. "Attended by many people" doesn\'t describe intensity at all. The answer is **C**.',
      solution_steps: [],
      is_worked_example: false
    }
  ];

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

  console.log('\n✓ All Chapter 13 content uploaded successfully!');
}

uploadChapter13();
