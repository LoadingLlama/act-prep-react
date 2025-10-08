import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function fixCommasLesson() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'commas')
    .single();

  // Find the "Unnecessary Information Commas" section and add context about ing/ed phrases
  let updatedContent = lesson.content;

  // Add explanation right after the examples in Unnecessary Information section
  const insertPoint = updatedContent.indexOf('<h3>Unnecessary vs. Necessary Information</h3>');

  const ingEdExplanation = `
            <div class="tip-box">
                <h4>Note: "ing" and "ed" Phrases</h4>
                <p>Unnecessary information can also include phrases starting with "ing" or "ed" (called participle phrases). These phrases often describe the subject and can be removed without breaking the sentence.</p>
                <p><strong>Examples:</strong></p>
                <ul>
                    <li><em>Sitting behind the table</em>, Mark waited to jump out.</li>
                    <li>Sarah, <em>exhausted from the race</em>, sat down on the bench.</li>
                    <li>The dog, <em>excited for the car ride</em>, started to jump up and down.</li>
                </ul>
                <p>Use the crossing-out trick: if you can remove the phrase and the sentence still works, it's unnecessary and needs commas!</p>
            </div>

`;

  updatedContent = updatedContent.slice(0, insertPoint) + ingEdExplanation + updatedContent.slice(insertPoint);

  // Update the lesson
  const { error } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('id', lesson.id);

  if (error) {
    console.error('Error updating lesson:', error);
    return;
  }

  console.log('✅ Fixed Commas lesson!');
  console.log('\nAdded explanation of "ing" and "ed" phrases BEFORE Quiz 1 (position 5)');
  console.log('Students will now understand these phrases before being quizzed on them.\n');
}

fixCommasLesson();
