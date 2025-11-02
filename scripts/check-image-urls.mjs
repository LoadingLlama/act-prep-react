/**
 * Check image URLs in practice test questions
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkImages() {
  // Check math questions with images
  const { data: mathQuestions } = await supabase
    .from('practice_test_math_questions')
    .select('question_number, image_url')
    .eq('test_number', 1)
    .not('image_url', 'is', null);

  console.log('Math questions with images:', mathQuestions?.length || 0);
  if (mathQuestions && mathQuestions.length > 0) {
    console.log('\nSample image URLs:');
    mathQuestions.slice(0, 3).forEach(q => {
      console.log(`Q${q.question_number}: ${q.image_url}`);
    });
  }

  // Check science questions with images
  const { data: scienceQuestions } = await supabase
    .from('practice_test_science_questions')
    .select('question_number, image_url')
    .eq('test_number', 1)
    .not('image_url', 'is', null);

  console.log('\nScience questions with images:', scienceQuestions?.length || 0);
  if (scienceQuestions && scienceQuestions.length > 0) {
    console.log('\nSample image URLs:');
    scienceQuestions.slice(0, 3).forEach(q => {
      console.log(`Q${q.question_number}: ${q.image_url}`);
    });
  }
}

checkImages().then(() => process.exit(0));
