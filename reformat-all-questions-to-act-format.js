const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Convert <u> tags to proper ACT format with visible [position] brackets
 * Example: "During the storm, <u>was raining</u> heavily"
 *       → "During the storm, [38] <u>was raining</u> heavily"
 */
function reformatQuestionText(problemText, position) {
  if (!problemText) return problemText;

  // Check if this is a Logical Placement question (has [1], [2], [3] sentence markers)
  // These don't need additional brackets
  if (/\[\d+\]\s+[A-Z]/.test(problemText)) {
    // This appears to be a sentence placement question
    // Just return as is - it already has proper bracket format
    return problemText;
  }

  // Add visible bracket number before underlined portions
  // Format: [position] before the <u> tag
  let reformatted = problemText.replace(/<u>/gi, `[${position}] <u>`);

  return reformatted;
}

/**
 * Main reformatting function
 */
async function reformatAllQuestions() {
  console.log('Starting to reformat all 678 questions to proper ACT format...\n');

  // Get all English lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('subject', 'english')
    .order('title');

  let totalReformatted = 0;
  let errors = 0;

  for (const lesson of lessons) {
    console.log(`\nProcessing: ${lesson.title}`);

    // Get all questions for this lesson
    const { data: questions, error } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    if (error) {
      console.error(`Error fetching questions for ${lesson.title}:`, error);
      errors++;
      continue;
    }

    if (!questions || questions.length === 0) {
      console.log(`  No questions found`);
      continue;
    }

    console.log(`  Found ${questions.length} questions`);

    // Reformat each question
    for (const q of questions) {
      const reformattedText = reformatQuestionText(q.problem_text, q.position);

      // Update in database
      const { error: updateError } = await supabase
        .from('lesson_examples')
        .update({ problem_text: reformattedText })
        .eq('id', q.id);

      if (updateError) {
        console.error(`    Error updating question ${q.position}:`, updateError);
        errors++;
      } else {
        totalReformatted++;
      }
    }

    console.log(`  ✓ Reformatted ${questions.length} questions`);
  }

  console.log('\n' + '='.repeat(80));
  console.log(`COMPLETE!`);
  console.log(`Total questions reformatted: ${totalReformatted}`);
  console.log(`Errors: ${errors}`);
  console.log('='.repeat(80));
}

reformatAllQuestions().catch(console.error);
