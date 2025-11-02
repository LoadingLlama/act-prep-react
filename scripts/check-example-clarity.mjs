#!/usr/bin/env node

/**
 * Check for examples that might be unclear or have formatting issues
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkExampleClarity() {
  console.log('🔍 Checking examples for clarity issues...\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*');

  const issues = [];

  examples?.forEach(ex => {
    const problems = [];

    // Check for missing underline
    if (!ex.problem_text?.includes('<u>') && !ex.problem_text?.includes('underlined')) {
      problems.push('No underlined portion found');
    }

    // Check for very short problem text
    if (ex.problem_text && ex.problem_text.length < 50) {
      problems.push(`Very short problem text (${ex.problem_text.length} chars)`);
    }

    // Check for missing question
    const hasQuestion = ex.problem_text?.includes('?') ||
                       ex.problem_text?.toLowerCase().includes('which of the following') ||
                       ex.problem_text?.toLowerCase().includes('what is the');
    if (!hasQuestion) {
      problems.push('No clear question found');
    }

    // Check for missing choices
    if (!ex.choices || ex.choices.length === 0) {
      problems.push('No answer choices');
    }

    // Check for choices with very short text
    if (ex.choices && ex.choices.some(c => !c.text || c.text.length < 2)) {
      problems.push('Some choices have very short text');
    }

    if (problems.length > 0) {
      issues.push({
        title: ex.title,
        position: ex.position,
        problems
      });
    }
  });

  console.log(`Found ${issues.length} examples with potential clarity issues:\n`);

  issues.forEach((issue, i) => {
    console.log(`${i + 1}. "${issue.title}" (position ${issue.position})`);
    issue.problems.forEach(p => console.log(`   ⚠️  ${p}`));
    console.log('');
  });

  if (issues.length === 0) {
    console.log('✅ All examples appear clear and well-formatted!');
  }
}

checkExampleClarity().then(() => process.exit(0));
