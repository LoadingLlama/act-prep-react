/**
 * Clean up and reformat solution sections for better readability
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fetching geometry-angles lesson...\n');

const { data, error } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

if (error) {
  console.error('Error fetching lesson:', error);
  process.exit(1);
}

let content = data.content;

// Function to reformat solution content
function reformatSolution(solutionHTML) {
  // Extract the steps and answer
  const steps = [];
  const stepMatches = solutionHTML.matchAll(/<li[^>]*>(.*?)<\/li>/g);

  for (const match of stepMatches) {
    steps.push(match[1]);
  }

  // Extract the answer line
  const answerMatch = solutionHTML.match(/Answer:\s*([A-E])/i);
  const answer = answerMatch ? answerMatch[1] : null;

  // Build clean formatted solution
  let formattedSolution = '';

  // Add steps with better formatting
  if (steps.length > 0) {
    formattedSolution += '<div style="margin-bottom: 1rem;">\n';
    steps.forEach((step, index) => {
      // Remove "Step N:" prefix if it exists and clean the text
      let cleanStep = step.replace(/^Step \d+:\s*/i, '').trim();

      formattedSolution += `  <div style="margin-bottom: 0.5rem; display: flex; gap: 0.5rem;">\n`;
      formattedSolution += `    <span style="color: #2563eb; font-weight: 600; min-width: 20px;">${index + 1}.</span>\n`;
      formattedSolution += `    <span style="color: #374151; line-height: 1.6;">${cleanStep}</span>\n`;
      formattedSolution += `  </div>\n`;
    });
    formattedSolution += '</div>\n\n';
  }

  // Add answer with highlighting
  if (answer) {
    formattedSolution += '<div style="margin-top: 1rem; padding: 0.75rem 1rem; background-color: #eff6ff; border-radius: 6px; border-left: 3px solid #2563eb;">\n';
    formattedSolution += `  <span style="color: #1e40af; font-weight: 600; font-size: 0.95rem;">Answer: <span style="font-size: 1.1rem;">${answer}</span></span>\n`;
    formattedSolution += '</div>';
  }

  return formattedSolution;
}

// Find all solution sections and reformat them
const solutionRegex = /<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>([\s\S]*?)(?=<\/div>|$)/gi;

content = content.replace(solutionRegex, (match, solutionContent) => {
  console.log('\n--- Reformatting solution ---');
  const reformatted = reformatSolution(solutionContent);
  return `<p style="font-weight: 600; margin-bottom: 0.75rem; color: #374151;">Solution:</p>\n${reformatted}`;
});

console.log('\n✓ Reformatted all solution sections');

// Update the database
console.log('\nUpdating database...');
const { error: updateError } = await supabase
  .from('lessons')
  .update({ content: content })
  .eq('lesson_key', 'geometry-angles');

if (updateError) {
  console.error('❌ Error updating:', updateError);
  process.exit(1);
}

console.log('✅ Successfully updated lesson!');
console.log('Solutions are now cleaner and better formatted');
