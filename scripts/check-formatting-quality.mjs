/**
 * Check for formatting quality issues in all examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkFormattingQuality() {
  const { data: examples, error } = await supabase
    .from('lesson_examples')
    .select('*');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Checking ${examples.length} examples for formatting issues...\n`);

  const issues = {
    missingLineBreaks: [],
    tooManySteps: [],
    poorChoiceFormatting: [],
    tooLong: [],
    tooComplex: []
  };

  for (const ex of examples) {
    const exp = ex.answer_explanation || '';

    // Check for missing line breaks after "Step X:"
    if (exp.match(/Step \d+:[A-Z]/)) {
      issues.missingLineBreaks.push({
        id: ex.id,
        title: ex.title
      });
    }

    // Check if has too many steps (over 4)
    const stepMatches = exp.match(/Step \d+:/g);
    if (stepMatches && stepMatches.length > 4) {
      issues.tooManySteps.push({
        id: ex.id,
        title: ex.title,
        count: stepMatches.length
      });
    }

    // Check for poor choice formatting (missing spaces, weird characters)
    if (exp.includes('Fragment! -') || exp.match(/[A-E]\s*\([^)]+\):[A-Z]/) || exp.includes('✗')) {
      issues.poorChoiceFormatting.push({
        id: ex.id,
        title: ex.title
      });
    }

    // Check if explanation is too long (over 800 chars)
    if (exp.length > 800) {
      issues.tooLong.push({
        id: ex.id,
        title: ex.title,
        length: exp.length
      });
    }

    // Check for overly complex explanations (lots of nested structure)
    if (exp.split('\n').length > 20) {
      issues.tooComplex.push({
        id: ex.id,
        title: ex.title,
        lines: exp.split('\n').length
      });
    }
  }

  console.log('═'.repeat(80));
  console.log('FORMATTING QUALITY REPORT');
  console.log('═'.repeat(80));

  const printIssues = (title, items, showExtra = null) => {
    if (items.length > 0) {
      console.log(`\n⚠️  ${title}: ${items.length} examples`);
      items.slice(0, 10).forEach((item, idx) => {
        console.log(`   ${idx + 1}. ${item.title || 'Untitled'} (${item.id.substring(0, 8)}...)`);
        if (showExtra) showExtra(item);
      });
      if (items.length > 10) {
        console.log(`   ... and ${items.length - 10} more`);
      }
    } else {
      console.log(`\n✅ ${title}: None`);
    }
  };

  printIssues('Missing line breaks after steps', issues.missingLineBreaks);
  printIssues('Too many steps (>4)', issues.tooManySteps, (item) => console.log(`      Steps: ${item.count}`));
  printIssues('Poor choice formatting', issues.poorChoiceFormatting);
  printIssues('Too long (>800 chars)', issues.tooLong, (item) => console.log(`      Length: ${item.length} chars`));
  printIssues('Too complex (>20 lines)', issues.tooComplex, (item) => console.log(`      Lines: ${item.lines}`));

  console.log('\n' + '═'.repeat(80));
}

checkFormattingQuality().then(() => process.exit(0));
