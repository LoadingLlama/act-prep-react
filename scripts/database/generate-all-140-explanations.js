const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

/**
 * Comprehensive Explanation Generator for All 140 ACT Questions
 * Uses Claude AI to generate detailed, accurate explanations
 */

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Load data
const mathQuestions = JSON.parse(fs.readFileSync('./data/math-questions.json', 'utf8'));
const readingQuestions = JSON.parse(fs.readFileSync('./data/reading-questions.json', 'utf8'));
const readingPassages = JSON.parse(fs.readFileSync('./data/reading-passages.json', 'utf8'));
const scienceQuestions = JSON.parse(fs.readFileSync('./data/science-questions.json', 'utf8'));
const sciencePassages = JSON.parse(fs.readFileSync('./data/science-passages.json', 'utf8'));

function parseChoices(choices) {
  if (Array.isArray(choices)) return choices;
  try { return JSON.parse(choices); } catch (e) { return []; }
}

function getPassageById(passages, passageId) {
  return passages.find(p => p.id === passageId);
}

// Sleep function for rate limiting
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateExplanation(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return message.content[0].text;
    } catch (error) {
      console.error(`Error generating explanation (attempt ${i + 1}/${retries}):`, error.message);
      if (i < retries - 1) {
        await sleep(2000 * (i + 1)); // Exponential backoff
      } else {
        throw error;
      }
    }
  }
}

async function generateMathExplanation(question) {
  const choices = parseChoices(question.choices);
  const choicesText = choices.join('\n');

  const prompt = `Generate a comprehensive ACT Math explanation for the following question.

Question ${question.question_number}: ${question.question_text}

Choices:
${choicesText}

Correct Answer: ${question.correct_answer}
Question Type: ${question.question_type}

Format your response EXACTLY as shown below (use HTML formatting):

<div style="margin-bottom: 0.75rem;">
<strong style="color: #10b981; font-size: 0.875rem;">Correct Answer: ${question.correct_answer}</strong>
<div style="margin-top: 0.25rem; line-height: 1.6;">[Explain the mathematical concept, show the calculation step-by-step, and explain why this answer is correct. Reference specific numbers from the problem.]</div>
</div>

<div>
<strong style="font-size: 0.875rem;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6;">
<div style="margin-bottom: 0.375rem;"><strong>Choice [LETTER]:</strong> [Explain what common mistake leads to this answer]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice [LETTER]:</strong> [Explain what common mistake leads to this answer]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice [LETTER]:</strong> [Explain what common mistake leads to this answer]</div>
<div><strong>Choice [LETTER]:</strong> [Explain what common mistake leads to this answer]</div>
</div>
</div>

Important:
- Show mathematical calculations clearly
- Explain the underlying concept (algebra, geometry, etc.)
- For wrong answers, explain what calculation error or conceptual misunderstanding leads to each one
- Be specific and reference numbers from the problem`;

  return await generateExplanation(prompt);
}

async function generateReadingExplanation(question, passage) {
  const choices = parseChoices(question.choices);
  const choicesText = choices.join('\n');

  const prompt = `Generate a comprehensive ACT Reading explanation for the following question.

Passage Title: ${passage.passage_title}
Passage Text:
${passage.passage_text}

Question ${question.question_number}: ${question.question_text}

Choices:
${choicesText}

Correct Answer: ${question.correct_answer}
Question Type: ${question.question_type}

Format your response EXACTLY as shown below (use HTML formatting):

<div style="margin-bottom: 0.75rem;">
<strong style="color: #10b981; font-size: 0.875rem;">Correct Answer: ${question.correct_answer}</strong>
<div style="margin-top: 0.25rem; line-height: 1.6;">[Explain why this answer is correct. Reference specific lines or evidence from the passage. Explain how the passage supports this answer.]</div>
</div>

<div>
<strong style="font-size: 0.875rem;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6;">
<div style="margin-bottom: 0.375rem;"><strong>Choice [LETTER]:</strong> [Explain why this is wrong - is it too broad, too narrow, contradicts the passage, or lacks textual evidence?]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice [LETTER]:</strong> [Explain why this is wrong]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice [LETTER]:</strong> [Explain why this is wrong]</div>
<div><strong>Choice [LETTER]:</strong> [Explain why this is wrong]</div>
</div>
</div>

Important:
- Reference specific lines or evidence from the passage
- Explain how the passage supports the correct answer
- For wrong answers, explain if they're too broad, too narrow, contradict evidence, or aren't supported by the text
- Focus on textual evidence and reasoning`;

  return await generateExplanation(prompt);
}

async function generateScienceExplanation(question, passage) {
  const choices = parseChoices(question.choices);
  const choicesText = choices.join('\n');

  const prompt = `Generate a comprehensive ACT Science explanation for the following question.

Passage Title: ${passage.passage_title}
Passage Type: ${passage.passage_type}
Passage Text:
${passage.passage_text}

Question ${question.question_number}: ${question.question_text}

Choices:
${choicesText}

Correct Answer: ${question.correct_answer}
Question Type: ${question.question_type}

Format your response EXACTLY as shown below (use HTML formatting):

<div style="margin-bottom: 0.75rem;">
<strong style="color: #10b981; font-size: 0.875rem;">Correct Answer: ${question.correct_answer}</strong>
<div style="margin-top: 0.25rem; line-height: 1.6;">[Explain why this answer is correct. Reference specific data from tables, graphs, or experimental descriptions. Explain the scientific reasoning.]</div>
</div>

<div>
<strong style="font-size: 0.875rem;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6;">
<div style="margin-bottom: 0.375rem;"><strong>Choice [LETTER]:</strong> [Explain what misinterpretation of data or faulty reasoning leads to this answer]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice [LETTER]:</strong> [Explain what misinterpretation leads to this answer]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice [LETTER]:</strong> [Explain what misinterpretation leads to this answer]</div>
<div><strong>Choice [LETTER]:</strong> [Explain what misinterpretation leads to this answer]</div>
</div>
</div>

Important:
- Reference specific data points from tables, graphs, or experimental results
- Explain the scientific concept or principle
- For wrong answers, explain what data misinterpretation or reasoning error leads to each one
- Be precise with data and scientific terminology`;

  return await generateExplanation(prompt);
}

async function main() {
  console.log('Starting comprehensive explanation generation for all 140 questions...\n');

  const mathExplanations = [];
  const readingExplanations = [];
  const scienceExplanations = [];

  // Generate Math explanations (60 questions)
  console.log('Generating Math explanations (60 questions)...');
  for (let i = 0; i < mathQuestions.length; i++) {
    const question = mathQuestions[i];
    console.log(`  Processing Math question ${i + 1}/${mathQuestions.length} (ID: ${question.id})...`);

    try {
      const explanation = await generateMathExplanation(question);
      mathExplanations.push({
        question_id: question.id,
        question_number: question.question_number,
        explanation: explanation
      });

      // Save progress every 10 questions
      if ((i + 1) % 10 === 0) {
        fs.writeFileSync('./data/math-explanations.json', JSON.stringify(mathExplanations, null, 2));
        console.log(`  ✓ Saved progress: ${i + 1} math explanations`);
      }

      // Rate limiting - wait 1 second between requests
      await sleep(1000);
    } catch (error) {
      console.error(`  ✗ Failed to generate explanation for question ${question.id}:`, error.message);
      mathExplanations.push({
        question_id: question.id,
        question_number: question.question_number,
        explanation: `<!-- ERROR: Failed to generate explanation - ${error.message} -->`
      });
    }
  }

  fs.writeFileSync('./data/math-explanations.json', JSON.stringify(mathExplanations, null, 2));
  console.log(`✓ Completed all ${mathExplanations.length} math explanations\n`);

  // Generate Reading explanations (40 questions)
  console.log('Generating Reading explanations (40 questions)...');
  for (let i = 0; i < readingQuestions.length; i++) {
    const question = readingQuestions[i];
    const passage = getPassageById(readingPassages, question.passage_id);
    console.log(`  Processing Reading question ${i + 1}/${readingQuestions.length} (ID: ${question.id})...`);

    try {
      const explanation = await generateReadingExplanation(question, passage);
      readingExplanations.push({
        question_id: question.id,
        question_number: question.question_number,
        explanation: explanation
      });

      // Save progress every 10 questions
      if ((i + 1) % 10 === 0) {
        fs.writeFileSync('./data/reading-explanations.json', JSON.stringify(readingExplanations, null, 2));
        console.log(`  ✓ Saved progress: ${i + 1} reading explanations`);
      }

      // Rate limiting
      await sleep(1000);
    } catch (error) {
      console.error(`  ✗ Failed to generate explanation for question ${question.id}:`, error.message);
      readingExplanations.push({
        question_id: question.id,
        question_number: question.question_number,
        explanation: `<!-- ERROR: Failed to generate explanation - ${error.message} -->`
      });
    }
  }

  fs.writeFileSync('./data/reading-explanations.json', JSON.stringify(readingExplanations, null, 2));
  console.log(`✓ Completed all ${readingExplanations.length} reading explanations\n`);

  // Generate Science explanations (40 questions)
  console.log('Generating Science explanations (40 questions)...');
  for (let i = 0; i < scienceQuestions.length; i++) {
    const question = scienceQuestions[i];
    const passage = getPassageById(sciencePassages, question.passage_id);
    console.log(`  Processing Science question ${i + 1}/${scienceQuestions.length} (ID: ${question.id})...`);

    try {
      const explanation = await generateScienceExplanation(question, passage);
      scienceExplanations.push({
        question_id: question.id,
        question_number: question.question_number,
        explanation: explanation
      });

      // Save progress every 10 questions
      if ((i + 1) % 10 === 0) {
        fs.writeFileSync('./data/science-explanations.json', JSON.stringify(scienceExplanations, null, 2));
        console.log(`  ✓ Saved progress: ${i + 1} science explanations`);
      }

      // Rate limiting
      await sleep(1000);
    } catch (error) {
      console.error(`  ✗ Failed to generate explanation for question ${question.id}:`, error.message);
      scienceExplanations.push({
        question_id: question.id,
        question_number: question.question_number,
        explanation: `<!-- ERROR: Failed to generate explanation - ${error.message} -->`
      });
    }
  }

  fs.writeFileSync('./data/science-explanations.json', JSON.stringify(scienceExplanations, null, 2));
  console.log(`✓ Completed all ${scienceExplanations.length} science explanations\n`);

  // Summary
  console.log('='.repeat(60));
  console.log('EXPLANATION GENERATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Math explanations: ${mathExplanations.length}/60`);
  console.log(`Reading explanations: ${readingExplanations.length}/40`);
  console.log(`Science explanations: ${scienceExplanations.length}/40`);
  console.log(`TOTAL: ${mathExplanations.length + readingExplanations.length + scienceExplanations.length}/140`);
  console.log('\nFiles saved:');
  console.log('  - ./data/math-explanations.json');
  console.log('  - ./data/reading-explanations.json');
  console.log('  - ./data/science-explanations.json');
}

// Run the generator
main().catch(console.error);
