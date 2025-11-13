/**
 * Export all Test #1 questions with their current question_type and chapter values
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function exportTest1() {
  console.log('=== EXPORTING TEST #1 QUESTIONS ===\n');

  const sections = ['english', 'math', 'reading', 'science'];
  const allQuestions = {};

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('test_number', 1)
      .order('question_number');

    if (error) {
      console.error(`Error fetching ${section}:`, error);
      continue;
    }

    console.log(`${section.toUpperCase()}: ${data.length} questions`);

    // Show first question structure
    if (data.length > 0) {
      console.log(`Sample columns:`, Object.keys(data[0]));
      console.log(`Sample question #1:`, {
        id: data[0].id,
        question_number: data[0].question_number,
        question_type: data[0].question_type,
        chapter: data[0].chapter,
        question_text: data[0].question_text?.substring(0, 100) + '...'
      });
      console.log();
    }

    allQuestions[section] = data.map(q => ({
      id: q.id,
      section: section,
      question_number: q.question_number,
      question_type: q.question_type || null,
      chapter: q.chapter || null,
      question_text: q.question_text?.substring(0, 150)
    }));
  }

  // Save to JSON file
  fs.writeFileSync(
    '/Users/cadenchiang/Desktop/act-prep-react/test1_questions_export.json',
    JSON.stringify(allQuestions, null, 2)
  );

  console.log('\n✓ Exported to test1_questions_export.json');

  // Summary
  console.log('\n=== SUMMARY ===');
  for (const section of sections) {
    const questions = allQuestions[section];
    const withQuestionType = questions.filter(q => q.question_type).length;
    const withChapter = questions.filter(q => q.chapter).length;

    console.log(`${section.toUpperCase()}:`);
    console.log(`  Total: ${questions.length}`);
    console.log(`  With question_type: ${withQuestionType}`);
    console.log(`  With chapter: ${withChapter}`);
  }
}

exportTest1().then(() => process.exit(0));
