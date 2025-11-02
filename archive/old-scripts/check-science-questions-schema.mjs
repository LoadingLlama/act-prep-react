#!/usr/bin/env node

/**
 * CHECK SCIENCE QUESTIONS TABLE SCHEMA
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkScienceQuestionsSchema() {
  console.log('📊 CHECKING SCIENCE QUESTIONS TABLE SCHEMA...');

  try {
    // Try to select all columns to see what exists
    const { data, error } = await supabase
      .from('act_science_questions')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ Error accessing table:', error.message);
    } else {
      console.log('✅ Science questions table exists');
      console.log('📋 Sample data structure:', data);
    }

    // Also check if there are any existing questions
    const { data: existingQuestions, error: countError } = await supabase
      .from('act_science_questions')
      .select('question_number, question_stem, correct_answer')
      .eq('test_number', 3);

    if (countError) {
      console.log('❌ Error checking existing questions:', countError.message);
    } else {
      console.log(`❓ Existing Science questions for Test 3: ${existingQuestions?.length || 0}`);
      if (existingQuestions?.length > 0) {
        existingQuestions.forEach(q => {
          console.log(`  Question ${q.question_number}: ${q.question_stem.substring(0, 50)}... (${q.correct_answer})`);
        });
      }
    }

  } catch (err) {
    console.log('❌ Error:', err.message);
  }
}

checkScienceQuestionsSchema().catch(console.error);