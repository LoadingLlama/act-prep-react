import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadChapter12() {
  const lessonContent = fs.readFileSync('restructured-english-1.12-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'transitions');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }
  console.log('✓ Lesson content uploaded for transitions');

  const { data: lessonData, error: fetchError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'transitions')
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
      title: 'Reading for Context',
      position: 1,
      problem_text: 'The new restaurant received excellent reviews. <u>However,</u> the chef had trained at the finest culinary schools in France.\n\nWhich transition word is the most logical in context?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'In fact,', letter: 'B' },
        { text: 'For example,', letter: 'C' },
        { text: 'Therefore,', letter: 'D' }
      ],
      correct_answer: 'B',
      answer_explanation: 'The second sentence provides additional information that supports why the restaurant received excellent reviews. "However" creates incorrect contrast. "In fact" emphasizes and adds to the previous statement, which fits perfectly. "For example" would need a specific instance, and "Therefore" shows cause/effect in the wrong direction. The answer is **B**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'All Transitions Type',
      position: 2,
      problem_text: 'From a distance, the ocean looked pretty calm today even though a storm had arrived last night. <u>Under the circumstances,</u> the scene was much more chaotic with big waves and strong riptides.\n\nWhich transition word is the most logical in context?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'For instance,', letter: 'B' },
        { text: 'Up close,', letter: 'C' },
        { text: 'For example,', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: 'The first sentence describes how the ocean looked "from a distance." The second sentence contrasts this with how it actually was. "Up close" creates the perfect contrast with "from a distance." The other transitions don\'t establish this spatial relationship. The answer is **C**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'No Transition Option',
      position: 3,
      problem_text: 'Stepping out on the island\'s port on Monday, the new couple debuted their own classic take on beach attire. <u>As a result,</u> the actor opted for a classic white tee and board shorts while his model counterpart wore a floral print coverup and strappy sandals.\n\nWhich transition word, if any, is the most logical in context?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'In other words, the', letter: 'B' },
        { text: 'Consequently, the', letter: 'C' },
        { text: 'The', letter: 'D' }
      ],
      correct_answer: 'D',
      answer_explanation: 'The second sentence simply describes what the couple wore—it\'s not a result, rephrasing, or consequence of the first sentence. The sentences flow naturally without a transition. "As a result," "In other words," and "Consequently" all incorrectly imply a cause/effect or explanatory relationship. The answer is **D**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Transition Categories',
      position: 4,
      problem_text: 'The study showed that exercise improves cardiovascular health. <u>For instance,</u> regular exercise can reduce the risk of heart disease by up to 35%.\n\nWhich transition word is the most logical in context?',
      choices: [
        { text: 'NO CHANGE', letter: 'A' },
        { text: 'Nevertheless,', letter: 'B' },
        { text: 'In contrast,', letter: 'C' },
        { text: 'Otherwise,', letter: 'D' }
      ],
      correct_answer: 'A',
      answer_explanation: 'The second sentence provides a specific example that supports the general claim in the first sentence. "For instance" is perfect for introducing an example. "Nevertheless" and "In contrast" create incorrect opposition, and "Otherwise" suggests an alternative, which doesn\'t fit. The answer is **A**.',
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

  console.log('\n✓ All Chapter 12 content uploaded successfully!');
}

uploadChapter12();
