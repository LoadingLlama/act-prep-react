const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const CONDENSING_PROMPT = `You are a concise editor. Condense this ACT English question explanation while keeping it SPECIFIC and CLEAR.

RULES:
1. Main explanation: 1-2 sentences max (aim for 200-400 chars)
2. Wrong answers: One concise sentence each explaining the error
3. Remove ALL repetition and wordiness
4. Keep specific grammar terminology and exact text references
5. NO fluff or redundant phrases

EXAMPLE INPUT:
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
This choice transforms "There are thousands of new animal species" into "Of the thousands of new animal species," creating a subordinate prepositional phrase instead of an independent clause. This eliminates the comma splice error that occurs when the original version joins two independent clauses ("There are thousands of new animal species identified each year" and "the vast majority are small") with only a comma.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A (NO CHANGE):</strong> "There are thousands of new animal species identified each year, the vast majority are small" creates a comma splice by joining two independent clauses with only a comma. Both clauses can stand alone as complete sentences, so they cannot be connected with just a comma.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> "Scientists say thousands of new animal species are identified each year, the vast majority are small" still contains the same comma splice error. While it adds "Scientists say," it doesn't address the fundamental problem of two independent clauses being improperly joined.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> "Thousands of new animal species are identified each year, the vast majority are small" also creates a comma splice. Like choice A, this joins two complete thoughts with only a comma instead of using proper punctuation (semicolon, period, or conjunction with comma).</div>
</div>
</div>

EXAMPLE OUTPUT:
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
"Of the thousands of new animal species" creates a subordinate phrase that eliminates the comma splice in the original sentence.
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice A:</strong> Creates a comma splice by joining two independent clauses with only a comma.</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice B:</strong> Still contains the comma splice error despite adding "Scientists say."</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice D:</strong> Also creates a comma splice by improperly connecting two complete thoughts with just a comma.</div>
</div>
</div>

Now condense this explanation:`;

async function condenseExplanation(explanation, questionNum) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `${CONDENSING_PROMPT}\n\n${explanation}`
      }]
    });

    return message.content[0].text.trim();
  } catch (error) {
    console.error(`Error condensing question ${questionNum}:`, error.message);
    return null;
  }
}

async function fetchEnglishQuestions() {
  const { data, error } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .order('question_number', { ascending: true });

  if (error) {
    console.error('Error fetching questions:', error);
    process.exit(1);
  }

  // Filter to only English questions (question_number 1-75)
  return data.filter(q => q.question_number >= 1 && q.question_number <= 75);
}

async function updateQuestion(id, condensedExplanation) {
  const { error } = await supabase
    .from('practice_test_english_questions')
    .update({ explanation: condensedExplanation })
    .eq('id', id);

  if (error) {
    console.error(`Error updating question ${id}:`, error);
    throw error;
  }
}

async function main() {
  console.log('Fetching English questions...');
  const questions = await fetchEnglishQuestions();
  console.log(`Found ${questions.length} English questions to condense\n`);

  const results = [];
  let processed = 0;

  for (const question of questions) {
    const questionNum = question.question_number;
    console.log(`Processing Question ${questionNum}...`);

    const condensed = await condenseExplanation(question.explanation, questionNum);

    if (condensed) {
      await updateQuestion(question.id, condensed);
      results.push({
        id: question.id,
        question_number: questionNum,
        success: true,
        original_length: question.explanation.length,
        condensed_length: condensed.length
      });
      console.log(`✓ Question ${questionNum} condensed: ${question.explanation.length} → ${condensed.length} chars`);
    } else {
      results.push({
        id: question.id,
        question_number: questionNum,
        success: false
      });
      console.log(`✗ Question ${questionNum} failed`);
    }

    processed++;

    // Report progress every 20 questions
    if (processed % 20 === 0) {
      console.log(`\n=== PROGRESS: ${processed}/75 questions completed ===\n`);
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Save results
  fs.writeFileSync('condensing_results.json', JSON.stringify(results, null, 2));

  console.log('\n=== FINAL SUMMARY ===');
  const successful = results.filter(r => r.success).length;
  console.log(`Total processed: ${results.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${results.length - successful}`);

  const avgReduction = results
    .filter(r => r.success)
    .reduce((acc, r) => acc + (r.original_length - r.condensed_length), 0) / successful;
  console.log(`Average reduction: ${Math.round(avgReduction)} characters`);
}

main().catch(console.error);
