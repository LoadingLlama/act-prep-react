import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('🤖 Auto-generating simple solutions for all examples...\n');

async function generateSimpleSolution(example) {
  const problemHtml = example.problem_text || '';
  const problemText = problemHtml.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');

  const choicesText = example.choices.map(c =>
    `${c.letter}. ${c.text}`
  ).join('\n');

  const prompt = `Given this ACT practice question, write a SUPER SIMPLE solution that just explains why each answer choice is right or wrong. Keep it minimal - one short line per choice.

PROBLEM:
${problemText}

CHOICES:
${choicesText}

CORRECT ANSWER: ${example.correct_answer}

Write the solution in this exact format (no extra text, no "Step 1", no explanations before the choices):

A. [brief reason why wrong/right] ✗ or ✓
B. [brief reason why wrong/right] ✗ or ✓
C. [brief reason why wrong/right] ✗ or ✓
D. [brief reason why wrong/right] ✗ or ✓
E. [brief reason why wrong/right] ✗ or ✓ (if exists)

Keep each line under 15 words. Be direct and clear.`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  return message.content[0].text.trim();
}

// Get all examples
const { data: examples } = await supabase
  .from('lesson_examples')
  .select('*')
  .not('choices', 'is', null)
  .order('created_at', { ascending: true });

console.log(`Found ${examples.length} examples to process\n`);

let successCount = 0;
let errorCount = 0;

for (let i = 0; i < examples.length; i++) {
  const example = examples[i];

  try {
    console.log(`[${i+1}/${examples.length}] Processing: ${example.title}`);

    const simpleSolution = await generateSimpleSolution(example);

    const { error } = await supabase
      .from('lesson_examples')
      .update({ answer_explanation: simpleSolution })
      .eq('id', example.id);

    if (error) {
      console.log(`  ❌ Database error: ${error.message}`);
      errorCount++;
    } else {
      console.log(`  ✅ Updated`);
      successCount++;
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));

  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
    errorCount++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Auto-Generation Complete');
console.log('='.repeat(60));
console.log(`Success: ${successCount} examples`);
console.log(`Errors: ${errorCount} examples`);
