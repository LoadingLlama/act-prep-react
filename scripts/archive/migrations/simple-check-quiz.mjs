/**
 * Simple check for quiz questions
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get quiz questions for geometry-angles
const { data: questions, error } = await supabase
  .from('quiz_questions')
  .select('id, question_text, diagram, quiz_id')
  .order('order_index');

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log(`Total quiz questions in database: ${questions.length}\n`);

const questionsWithDiagrams = questions.filter(q => q.diagram);
console.log(`Questions with diagrams: ${questionsWithDiagrams.length}\n`);

if (questionsWithDiagrams.length > 0) {
  console.log('Questions with diagrams:');
  questionsWithDiagrams.forEach((q, idx) => {
    console.log(`  ${idx + 1}. ${q.question_text?.substring(0, 60) || 'No text'}...`);
    console.log(`     Quiz ID: ${q.quiz_id}`);
    console.log(`     Diagram: ${q.diagram.substring(0, 100)}...`);
    console.log('');
  });
}
