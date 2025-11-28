#!/usr/bin/env node

/**
 * COMPLETE EXPLANATION GENERATOR for ACT Diagnostic Test
 * 
 * This script generates highly specific explanations for all 215 questions.
 * 
 * REQUIREMENTS:
 * 1. Set ANTHROPIC_API_KEY environment variable
 * 2. Run: node generate_all_explanations_complete.js
 * 
 * The script will:
 * - Load all questions and passages
 * - Generate detailed explanations using Claude API
 * - Update the database with new explanations
 * - Report progress every 25 questions
 * - Save samples for verification
 */

const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

// Configuration
const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

// Check API key
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY environment variable is not set!');
  console.error('Please set it with: export ANTHROPIC_API_KEY=your_key_here');
  process.exit(1);
}

// Initialize clients
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * Generate a highly specific explanation using Claude API
 */
async function generateExplanation(question, passages) {
  const passage = question.passage_id && passages[question.passage_id] 
    ? passages[question.passage_id] 
    : null;

  let prompt = `You are an expert ACT test prep tutor. Generate a HIGHLY SPECIFIC explanation for this question.

SUBJECT: ${question.section.toUpperCase()}
QUESTION #${question.question_number}
QUESTION TYPE: ${question.question_type}

`;

  if (passage) {
    prompt += `PASSAGE CONTEXT:\n${passage.passage_text}\n\n`;
  }

  prompt += `QUESTION TEXT:\n${question.question_text}\n\n`;
  prompt += `CHOICES:\n`;
  question.choices.forEach(choice => {
    prompt += `${choice}\n`;
  });
  prompt += `\nCORRECT ANSWER: ${question.correct_answer}\n\n`;

  prompt += `INSTRUCTIONS:
Write a complete explanation with TWO sections in HTML format:

1. FIRST SECTION: Explain why the correct answer is RIGHT
   - Be EXTREMELY specific
   - Reference actual text, numbers, or content from the question
   - For grammar questions, identify the specific grammatical concept
   - For math questions, show the specific calculation or reasoning
   - For reading/science, reference specific lines or data from the passage

2. SECOND SECTION: Explain why EACH wrong answer is WRONG
   - Address EVERY incorrect choice by letter
   - Be specific about what makes each one wrong
   - Don't be generic - explain the exact error

FORMAT (use this exact HTML structure):
<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
[SPECIFIC explanation of why correct answer works]
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
<div style="margin-bottom: 0.375rem;"><strong>Choice X:</strong> [Specific reason]</div>
<div style="margin-bottom: 0.375rem;"><strong>Choice Y:</strong> [Specific reason]</div>
<div><strong>Choice Z:</strong> [Specific reason]</div>
</div>
</div>

Generate the explanation NOW:`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      temperature: 0.3,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    return message.content[0].text.trim();
  } catch (error) {
    console.error(`    ERROR generating: ${error.message}`);
    return null;
  }
}

/**
 * Update explanation in database
 */
async function updateExplanation(question, explanation) {
  const tableName = `practice_test_${question.section}_questions`;
  
  try {
    const { error } = await supabase
      .from(tableName)
      .update({ explanation })
      .eq('id', question.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`    ERROR updating DB: ${error.message}`);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(80));
  console.log('ACT DIAGNOSTIC TEST - EXPLANATION GENERATOR');
  console.log('='.repeat(80));
  console.log();

  // Load data
  console.log('Loading questions and passages...');
  const questions = JSON.parse(fs.readFileSync('./all_diagnostic_questions.json', 'utf8'));
  const passages = JSON.parse(fs.readFileSync('./all_passages.json', 'utf8'));
  
  console.log(`Loaded: ${questions.length} questions, ${Object.keys(passages).length} passages\n`);

  // Group by section
  const bySection = {
    english: questions.filter(q => q.section === 'english'),
    math: questions.filter(q => q.section === 'math'),
    reading: questions.filter(q => q.section === 'reading'),
    science: questions.filter(q => q.section === 'science')
  };

  console.log('Breakdown:');
  Object.entries(bySection).forEach(([section, qs]) => {
    console.log(`  ${section.padEnd(10)}: ${qs.length} questions`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('STARTING GENERATION...');
  console.log('='.repeat(80) + '\n');

  let total = 0;
  let successful = 0;
  let failed = 0;
  const samples = [];

  for (const [section, sectionQuestions] of Object.entries(bySection)) {
    console.log(`\n### ${section.toUpperCase()} (${sectionQuestions.length} questions) ###\n`);

    for (let i = 0; i < sectionQuestions.length; i++) {
      const question = sectionQuestions[i];
      const qNum = question.question_number;
      
      process.stdout.write(`  [${i+1}/${sectionQuestions.length}] Q#${qNum}... `);

      // Generate explanation
      const explanation = await generateExplanation(question, passages);

      if (explanation) {
        // Update database
        const updated = await updateExplanation(question, explanation);
        
        if (updated) {
          console.log('OK');
          successful++;
          
          // Save first 3 as samples
          if (samples.length < 3) {
            samples.push({
              question_number: qNum,
              section: section,
              question_text: question.question_text,
              choices: question.choices,
              correct_answer: question.correct_answer,
              explanation: explanation
            });
          }
        } else {
          console.log('FAILED (DB update)');
          failed++;
        }
      } else {
        console.log('FAILED (generation)');
        failed++;
      }

      total++;

      // Progress report every 25
      if (total % 25 === 0) {
        console.log(`\n--- PROGRESS: ${total}/215 (${successful} OK, ${failed} failed) ---\n`);
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`COMPLETED: ${successful}/${total} successful, ${failed} failed`);
  console.log('='.repeat(80) + '\n');

  // Save samples
  if (samples.length > 0) {
    fs.writeFileSync('./sample_explanations.json', JSON.stringify(samples, null, 2));
    console.log('Saved sample explanations to sample_explanations.json\n');
  }
}

main().catch(console.error);
