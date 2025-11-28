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

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: prompt }
    ],
  });

  return message.content[0].text.trim();
}

async function test() {
  // Get first English question
  const { data, error } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 1)
    .limit(1);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Testing with question:', data[0].id);
  console.log('Question:', data[0].question_text);
  console.log('Choices:', data[0].choices);
  console.log('Correct answer:', data[0].correct_answer);

  const explanation = await generateExplanation(data[0], 'English');
  console.log('\n=== Generated Explanation ===');
  console.log(explanation);

  // Update database
  const { error: updateError } = await supabase
    .from('practice_test_english_questions')
    .update({ explanation })
    .eq('id', data[0].id);

  if (updateError) {
    console.error('Update error:', updateError);
  } else {
    console.log('\nSuccessfully updated!');
  }
}

test();
