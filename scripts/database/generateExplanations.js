const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

// This will be populated from your environment or passed as argument
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

async function generateExplanation(question, passage, questionType) {
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const prompt = `You are writing a SIMPLE, CLEAR explanation for an ACT ${questionType} test question.

PASSAGE:
${passage}

QUESTION: ${question.question_text}

CHOICES:
${typeof question.choices === 'string' ? JSON.parse(question.choices).join('\n') : question.choices.join('\n')}

CORRECT ANSWER: ${question.correct_answer}

Write an explanation in this EXACT HTML format:

<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
[1-2 sentences explaining why the correct answer is right. For Reading: reference what the passage says. For Science: cite specific data (Table X, Figure Y, values). Keep it brief and clear.]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${getWrongChoiceTemplate(question.correct_answer, question.choices)}
</div>
</div>

Requirements:
- Total length: 600-900 characters
- Use simple language
- Be specific and reference the ${questionType === 'Reading' ? 'passage' : 'data'}
- Keep it concise`;

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  return message.content[0].text;
}

function getWrongChoiceTemplate(correctAnswer, choices) {
  const choicesList = typeof choices === 'string' ? JSON.parse(choices) : choices;
  const letters = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J'];

  return choicesList
    .map((choice, idx) => {
      const letter = choice.match(/^([A-Z]):/)?.[1] || letters[idx];
      if (letter === correctAnswer) return null;
      return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> [Why wrong]</div>`;
    })
    .filter(Boolean)
    .join('\n');
}

async function processReadingQuestions() {
  console.log('Fetching reading questions and passages...');

  const { data: questions, error: qError } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .order('id', { ascending: true })
    .limit(40);

  if (qError) {
    console.error('Error fetching questions:', qError);
    return;
  }

  // Get unique passage IDs
  const passageIds = [...new Set(questions.map(q => q.passage_id))];

  const { data: passages, error: pError } = await supabase
    .from('practice_test_reading_passages')
    .select('*')
    .in('id', passageIds);

  if (pError) {
    console.error('Error fetching passages:', pError);
    return;
  }

  // Create passage lookup
  const passageMap = {};
  passages.forEach(p => {
    passageMap[p.id] = p.passage_text;
  });

  console.log(`Processing ${questions.length} reading questions...`);

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const passage = passageMap[question.passage_id];

    console.log(`\nProcessing question ${i + 1}/${questions.length} (ID: ${question.id})`);

    try {
      const explanation = await generateExplanation(question, passage, 'Reading');

      const { error: updateError } = await supabase
        .from('practice_test_reading_questions')
        .update({ explanation })
        .eq('id', question.id);

      if (updateError) {
        console.error(`Error updating question ${question.id}:`, updateError);
      } else {
        console.log(`✓ Updated question ${i + 1}`);
      }

      // Report progress every 15 questions
      if ((i + 1) % 15 === 0) {
        console.log(`\n========== PROGRESS: ${i + 1}/${questions.length} Reading questions complete ==========\n`);
      }

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error processing question ${question.id}:`, error);
    }
  }

  console.log('\n========== ALL READING QUESTIONS COMPLETE ==========\n');
}

async function processScienceQuestions() {
  console.log('Fetching science questions and passages...');

  const { data: questions, error: qError } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .order('id', { ascending: true })
    .limit(40);

  if (qError) {
    console.error('Error fetching questions:', qError);
    return;
  }

  // Get unique passage IDs
  const passageIds = [...new Set(questions.map(q => q.passage_id))];

  const { data: passages, error: pError } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .in('id', passageIds);

  if (pError) {
    console.error('Error fetching passages:', pError);
    return;
  }

  // Create passage lookup
  const passageMap = {};
  passages.forEach(p => {
    passageMap[p.id] = p.passage_text;
  });

  console.log(`Processing ${questions.length} science questions...`);

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const passage = passageMap[question.passage_id];

    console.log(`\nProcessing question ${i + 1}/${questions.length} (ID: ${question.id})`);

    try {
      const explanation = await generateExplanation(question, passage, 'Science');

      const { error: updateError } = await supabase
        .from('practice_test_science_questions')
        .update({ explanation })
        .eq('id', question.id);

      if (updateError) {
        console.error(`Error updating question ${question.id}:`, updateError);
      } else {
        console.log(`✓ Updated question ${i + 1}`);
      }

      // Report progress every 15 questions
      if ((i + 1) % 15 === 0) {
        console.log(`\n========== PROGRESS: ${i + 1}/${questions.length} Science questions complete ==========\n`);
      }

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error processing question ${question.id}:`, error);
    }
  }

  console.log('\n========== ALL SCIENCE QUESTIONS COMPLETE ==========\n');
}

async function main() {
  console.log('Starting explanation generation...\n');

  // Process Reading questions first
  await processReadingQuestions();

  // Then Science questions
  await processScienceQuestions();

  console.log('\n========== ALL 80 EXPLANATIONS COMPLETE ==========');
}

main().catch(console.error);
