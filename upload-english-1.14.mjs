import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadChapter14() {
  const lessonContent = fs.readFileSync('restructured-english-1.14-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'adding-deleting');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }
  console.log('✓ Lesson content uploaded for adding-deleting');

  const { data: lessonData, error: fetchError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'adding-deleting')
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
      title: 'Adding Information - Read Paragraph Twice',
      position: 1,
      problem_text: 'The following sentence discusses Dr. Martinez\'s research methods: <u>"She spent months analyzing data from thousands of patients across multiple hospitals."</u>\n\nShould the writer add this sentence about Dr. Martinez\'s educational background at this point?\n\nProposed addition: "Dr. Martinez graduated from Harvard Medical School in 2005."',
      choices: [
        { text: 'Yes, because it establishes Dr. Martinez\'s qualifications.', letter: 'A' },
        { text: 'Yes, because it indicates where Dr. Martinez received her training.', letter: 'B' },
        { text: 'No, because it does not relate to the paragraph\'s discussion of her research methods.', letter: 'C' },
        { text: 'No, because it does not indicate what she studied in medical school.', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: 'The paragraph is about Dr. Martinez\'s RESEARCH METHODS, not her educational background. The sentence about graduating from Harvard is irrelevant to the paragraph\'s focus on how she analyzed patient data. Choice C correctly identifies that the information doesn\'t relate to the research methods discussion. The answer is **C**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Only Consider What the Sentence Says',
      position: 2,
      problem_text: 'The passage discusses the economic impact of the new highway.\n\nShould the writer add this sentence: <u>"The highway construction created 500 jobs."</u>',
      choices: [
        { text: 'Yes, because it proves the highway was beneficial to the entire region.', letter: 'A' },
        { text: 'Yes, because it provides specific detail about employment created by the project.', letter: 'B' },
        { text: 'No, because it does not mention what types of jobs were created.', letter: 'C' },
        { text: 'No, because it is not relevant to the economic discussion.', letter: 'D' }
      ],
      correct_answer: 'B',
      answer_explanation: 'The sentence says "created 500 jobs"—that\'s specific employment information relevant to economic impact. Choice A goes too far saying it "proves" benefit to the "entire region"—the sentence only mentions 500 jobs, not region-wide benefit. Choice B accurately describes what the sentence provides: specific employment detail. The answer is **B**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'When to Delete Information',
      position: 3,
      problem_text: 'The paragraph discusses how bees communicate through dance patterns to share location information about flowers.\n\nShould the writer delete this sentence: <u>"Bees also produce honey, which has been valued by humans for thousands of years."</u>',
      choices: [
        { text: 'Yes, because the information about honey production is irrelevant to the paragraph\'s focus on bee communication.', letter: 'A' },
        { text: 'Yes, because it does not specify how much honey bees produce.', letter: 'B' },
        { text: 'No, because it provides important context about why bees are studied.', letter: 'C' },
        { text: 'No, because it connects bee behavior to human interests.', letter: 'D' }
      ],
      correct_answer: 'A',
      answer_explanation: 'The paragraph is about bee COMMUNICATION through dance patterns. The sentence about honey production is completely irrelevant to this focus—it distracts from the main idea. Choice A correctly identifies that honey production doesn\'t relate to communication. The answer is **A**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Avoid Wrong Answer Traps',
      position: 4,
      problem_text: 'The passage discusses Maria\'s career as a chef.\n\nShould the writer add this sentence: <u>"Maria won first place in a regional cooking competition in 2018."</u>',
      choices: [
        { text: 'Yes, because it proves Maria is the best chef in her field.', letter: 'A' },
        { text: 'Yes, because it provides specific detail about an achievement in her career.', letter: 'B' },
        { text: 'No, because it does not mention what dish she prepared for the competition.', letter: 'C' },
        { text: 'No, because it focuses on competition rather than her restaurant work.', letter: 'D' }
      ],
      correct_answer: 'B',
      answer_explanation: 'Choice A uses absolute language "proves...the best chef in her field"—winning one regional competition doesn\'t prove this. The sentence only states she won first place regionally. Choice B accurately describes what the sentence provides: specific career achievement detail. Choices C and D reference information NOT in the sentence or make assumptions. The answer is **B**.',
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

  console.log('\n✓ All Chapter 14 content uploaded successfully!');
}

uploadChapter14();
