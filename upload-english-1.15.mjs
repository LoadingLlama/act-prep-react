import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function uploadChapter15() {
  const lessonContent = fs.readFileSync('restructured-english-1.15-v1.html', 'utf8');

  const { error: lessonError } = await supabase
    .from('lessons')
    .update({
      content: lessonContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'logical-placement');

  if (lessonError) {
    console.error('Error updating lesson:', lessonError);
    process.exit(1);
  }
  console.log('✓ Lesson content uploaded for logical-placement');

  const { data: lessonData, error: fetchError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'logical-placement')
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
      title: 'Bracketed Numbers - Read Carefully',
      position: 1,
      problem_text: '[1] Most Americans have never tried truly great chocolate. [2] Sure, we have Hershey\'s chocolate bars, which are delicious. [3] But have you ever had chocolate from Switzerland? [4] Take a real Swiss chocolate like Lindt, for example. [5] The higher percentage of cacao, 23 percent in Lindt chocolate in comparison with only 11 percent in Hershey\'s, results in a much darker, richer taste, and the lower sugar content brings out the natural bitterness of the chocolate. [6] The Swiss really know how to make chocolate properly. [7] <u>It just melts in your mouth and has such a rich, bold flavor with just the right amount of bitterness.</u>\n\nFor the sake of logic and coherence, Sentence 7 should be placed:',
      choices: [
        { text: 'where it is now', letter: 'A' },
        { text: 'after sentence 2', letter: 'B' },
        { text: 'after sentence 4', letter: 'C' },
        { text: 'after sentence 5', letter: 'D' }
      ],
      correct_answer: 'D',
      answer_explanation: 'Sentence 7 describes how the chocolate tastes ("melts in your mouth," "rich, bold flavor," "right amount of bitterness"). This description directly follows from sentence 5, which explains the cacao percentage and sugar content that CREATE those taste qualities. Sentence 6 is a general statement about the Swiss, but sentence 7\'s specific taste description logically follows the technical explanation in sentence 5. The answer is **D**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Pronoun References - Must Come After',
      position: 2,
      problem_text: '[1] Cancer occurs when cells undergo a DNA mutation and begin to replicate uncontrollably. [2] <u>Most mutations are "silent" mutations that have no tangible effects.</u> [3] These cancerous cells begin to divide uncontrollably and form dangerous tumors. [4] What most people do not know is that mutations occur in our cells all the time. [5] Only mutations to specific parts of certain genes, like the p-53 gene, can lead to cells becoming cancerous. [6] As a result, most cancer research to date has focused on p-53 and other similar genes.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
      choices: [
        { text: 'where it is now', letter: 'A' },
        { text: 'before sentence 1', letter: 'B' },
        { text: 'after sentence 4', letter: 'C' },
        { text: 'before sentence 6', letter: 'D' }
      ],
      correct_answer: 'C',
      answer_explanation: 'Sentence 2 talks about "most mutations" being silent with no effects. This sentence needs context about mutations happening first. Sentence 4 establishes that "mutations occur in our cells all the time." Sentence 2 logically follows by explaining that MOST of these mutations are harmless. Then sentence 5 continues by explaining that only SPECIFIC mutations cause cancer. The flow: mutations happen all the time → most are silent → only specific ones cause cancer. The answer is **C**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Topic Continuity - Group Related Ideas',
      position: 3,
      problem_text: '[1] Carnivorous pitcher plants have many symbiotic relationships in the animal kingdom. [2] Some have relationships with parasites and fungi. [3] However, only N. hemsleyana pitchers have acquired traits to attract bats. [4] They do not eat the bats but rather benefit from the bat\'s guano. [5] The bats benefit because the plants provide a perfectly sized shelter to rest in. [6] <u>These tropical pitcher plants have evolved in shape to stand out against a bat\'s echolocations.</u>\n\nFor the sake of logic and coherence, Sentence 6 should be placed:',
      choices: [
        { text: 'where it is now', letter: 'A' },
        { text: 'after sentence 1', letter: 'B' },
        { text: 'after sentence 2', letter: 'C' },
        { text: 'after sentence 3', letter: 'D' }
      ],
      correct_answer: 'D',
      answer_explanation: 'Sentence 6 describes how the plants "evolved in shape to stand out against a bat\'s echolocations"—this is HOW they attract bats. Sentence 3 states they "have acquired traits to attract bats." Sentence 6 should immediately follow sentence 3 to explain WHAT those traits are (evolved shape for echolocation). Then sentences 4-5 explain the mutual benefits. The logical flow: they attract bats → here\'s how (evolved shape) → here\'s why (mutual benefits). The answer is **D**.',
      solution_steps: [],
      is_worked_example: false
    },
    {
      lesson_id: lessonId,
      title: 'Chronological Order and Context',
      position: 4,
      problem_text: 'The writer wants to add the following sentence to the paragraph about Jackie Chan:\n\n<u>"As a child, he had always loved the slapstick comedy of Buster Keaton and Charlie Chaplin."</u>\n\n[1] When he was born in Hong Kong to poor parents, no one could have imagined Jackie Chan would grow up to be an American movie star. [2] It all started with his passion for Kung Fu and his academic struggles as a child. [3] This ultimately resulted in him joining the China Drama Academy where children were trained to be in Chinese movies. [4] The school was brutal, with daily training lasting 17-19 hours with little room for pleasure. [5] After over ten years in the school, Jackie graduated and, free to take roles of his own choosing, would often select roles that involved doing stunts no other actors dreamed of attempting. [6] After experiencing many failures and injuries, Jackie finally earned his first break as Bruce Lee\'s stunt double. [7] After Bruce Lee\'s death, Jackie tried to replicate Lee\'s onscreen persona but failed and realized he needed to do something different. [8] So, he decided to blend comedy and stunts and his career began to take off.\n\nThe sentence would most logically be placed:',
      choices: [
        { text: 'after sentence 1', letter: 'A' },
        { text: 'after sentence 2', letter: 'B' },
        { text: 'after sentence 4', letter: 'C' },
        { text: 'after sentence 7', letter: 'D' }
      ],
      correct_answer: 'D',
      answer_explanation: 'The sentence is about Jackie\'s childhood love of slapstick comedy. This is the KEY to understanding why he blended comedy and stunts in sentence 8. Sentence 7 says he "needed to do something different." Sentence 8 says "So, he decided to blend comedy and stunts." The new sentence explains WHERE this comedy inspiration came from—his childhood love of Keaton and Chaplin. It logically fits between 7 and 8: he needed something different → he loved slapstick comedy as a child → so he blended comedy and stunts. The answer is **D**.',
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

  console.log('\n✓ All Chapter 15 content uploaded successfully!');
}

uploadChapter15();
