const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '3e8f0696-1bf7-4b5c-880d-fb5359923b7d';

// Get the existing questions and add explanations to their choices
async function updateFirst4Questions() {
  try {
    console.log('Updating first 4 questions with explanations...\n');

    // Get the first 4 questions
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', LESSON_ID)
      .in('position', [1, 2, 3, 4])
      .order('position');

    // Update each question with explanations based on their content
    for (const q of questions) {
      let updatedChoices;

      if (q.position === 1) {
        // Question 1: Identifying Comma + FANBOYS
        updatedChoices = [
          { ...q.choices[0], explanation: 'This choice lacks the required comma before the coordinating conjunction <em>"but"</em> when joining two independent clauses.' },
          { ...q.choices[1], explanation: 'This choice correctly places a comma before <em>"but"</em> when joining the two independent clauses.' },
          { ...q.choices[2], explanation: 'This choice incorrectly uses a semicolon. FANBOYS conjunctions require a comma, not a semicolon.' },
          { ...q.choices[3], explanation: 'This choice incorrectly uses a dash instead of a comma before the conjunction.' }
        ];
      } else if (q.position === 2) {
        // Question 2: Unnecessary Information with Names
        updatedChoices = q.choices.map((choice, i) => {
          const explanations = [
            'This choice incorrectly uses commas around the essential name, suggesting the speaker has only one brother.',
            'This choice correctly omits commas because the name is essential to identify which brother is meant.',
            'This choice incorrectly adds only an opening comma, creating inconsistent punctuation.',
            'This choice incorrectly adds only a closing comma, creating inconsistent punctuation.'
          ];
          return { ...choice, explanation: explanations[i] };
        });
      } else if (q.position === 3) {
        // Question 3: Transitional Words (However)
        updatedChoices = q.choices.map((choice, i) => {
          const explanations = [
            'This choice lacks the required commas around the parenthetical conjunctive adverb <em>"however"</em> in the middle of the sentence.',
            'This choice correctly sets off the interrupter <em>"however"</em> with commas on both sides.',
            'This choice lacks the opening comma before <em>"however."</em>',
            'This choice lacks the closing comma after <em>"however."</em>'
          ];
          return { ...choice, explanation: explanations[i] };
        });
      } else if (q.position === 4) {
        // Question 4: Unnecessary Information (Crossing-Out Trick)
        updatedChoices = q.choices.map((choice, i) => {
          const explanations = [
            'This choice lacks commas around the non-essential appositive phrase describing the novel.',
            'This choice correctly sets off the non-essential appositive phrase <em>"a bestselling thriller"</em> with commas on both sides.',
            'This choice lacks the opening comma before the appositive phrase.',
            'This choice lacks the closing comma after the appositive phrase.'
          ];
          return { ...choice, explanation: explanations[i] };
        });
      }

      // Update the question in the database
      const { error } = await supabase
        .from('lesson_examples')
        .update({ choices: updatedChoices })
        .eq('id', q.id);

      if (error) {
        console.error(`Error updating question ${q.position}:`, error);
      } else {
        console.log(`✓ Updated question ${q.position}: ${q.title}`);
      }
    }

    console.log('\n✓ Complete! Updated first 4 questions with explanations.');

  } catch (err) {
    console.error('Error:', err);
  }
}

updateFirst4Questions();
