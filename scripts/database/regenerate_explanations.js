const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');

// Supabase setup
const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

// Anthropic setup
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Generates an explanation for a question using Claude
 * @param {Object} question - Question object with text, choices, and correct answer
 * @param {string} subject - Subject area (English, Math, Reading, Science)
 * @returns {Promise<string>} Generated explanation in HTML format
 */
async function generateExplanation(question, subject) {
  const { question_text, choices, correct_answer, passage_id } = question;

  // Parse choices - handle both array and string formats
  let parsedChoices;
  if (typeof choices === 'string') {
    parsedChoices = JSON.parse(choices);
  } else {
    parsedChoices = choices;
  }

  // Extract choice letters (A, B, C, D or F, G, H, J for Reading/Science)
  const choiceLetters = parsedChoices.map(choice => {
    const match = choice.match(/^([A-J])\./);
    return match ? match[1] : null;
  }).filter(Boolean);

  // Get wrong choices
  const wrongChoices = choiceLetters.filter(letter => letter !== correct_answer);

  let prompt = `You are an expert ACT ${subject} tutor. Generate a clear, accurate explanation for this ACT question.

QUESTION: ${question_text}

${passage_id ? `[This question relates to a reading passage]\n\n` : ''}ANSWER CHOICES:
${parsedChoices.join('\n')}

CORRECT ANSWER: ${correct_answer}

IMPORTANT FORMAT REQUIREMENTS:
1. The UI already shows "Correct answer: ${correct_answer}" above your explanation
2. DO NOT repeat "Correct Answer: ${correct_answer}" in your explanation
3. Start directly with WHY the correct answer is right (don't mention the letter)
4. Then explain why each wrong answer is wrong

Output your explanation in this exact HTML format:

<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
[Direct explanation of why the correct answer is right, without stating the letter ${correct_answer}]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongChoices.map(letter => `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> [Why this is wrong]</div>`).join('\n')}
</div>
</div>

IMPORTANT:
- Be specific to THIS question
- For Math: show the calculation/logic clearly
- For English: cite grammar rules and explain errors
- For Reading: reference the passage context if relevant
- For Science: explain the scientific reasoning
- Output ONLY the HTML, no other text`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [
        { role: 'user', content: prompt }
      ],
    });

    return message.content[0].text.trim();
  } catch (error) {
    console.error(`Error generating explanation: ${error.message}`);
    throw error;
  }
}

/**
 * Process questions for a specific table
 * @param {string} tableName - Name of the table to process
 * @param {string} subject - Subject area
 */
async function processTable(tableName, subject) {
  console.log(`\n=== Processing ${subject} (${tableName}) ===`);

  // Fetch only diagnostic test (test_number 1) questions
  const { data: questions, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('test_number', 1)
    .order('id');

  if (error) {
    console.error(`Error fetching from ${tableName}:`, error);
    return;
  }

  console.log(`Found ${questions.length} diagnostic test questions`);

  let completed = 0;
  let failed = 0;

  for (const question of questions) {
    try {
      console.log(`Processing question ${question.id}...`);

      const explanation = await generateExplanation(question, subject);

      // Update the database
      const { error: updateError } = await supabase
        .from(tableName)
        .update({ explanation })
        .eq('id', question.id);

      if (updateError) {
        console.error(`Error updating question ${question.id}:`, updateError);
        failed++;
      } else {
        completed++;
        console.log(`${subject}: ${completed}/${questions.length} complete`);
      }

      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`Failed to process question ${question.id}:`, error);
      if (error.status) console.error(`Status: ${error.status}`);
      if (error.error) console.error(`Error details:`, error.error);
      failed++;
    }
  }

  console.log(`\n${subject} Summary: ${completed} completed, ${failed} failed`);
}

/**
 * Main function to process all tables
 */
async function main() {
  console.log('Starting explanation regeneration for all 215 questions...\n');

  const tables = [
    { name: 'practice_test_english_questions', subject: 'English' },
    { name: 'practice_test_math_questions', subject: 'Math' },
    { name: 'practice_test_reading_questions', subject: 'Reading' },
    { name: 'practice_test_science_questions', subject: 'Science' },
  ];

  for (const table of tables) {
    await processTable(table.name, table.subject);
  }

  console.log('\n=== ALL COMPLETE ===');
}

// Run the script
main().catch(console.error);
