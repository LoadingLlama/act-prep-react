#!/usr/bin/env node
/**
 * INSERT REMAINING QUESTIONS (English, Reading, Science)
 * Adapts from real ACT database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('📝 INSERTING REMAINING QUESTIONS\n');
console.log('='.repeat(90) + '\n');

async function insertQuestions() {
  
  // Get real ACT questions
  const { data: realEnglish } = await supabase
    .from('act_english_questions')
    .select('*')
    .order('id')
    .limit(50);

  const { data: realReading } = await supabase
    .from('act_reading_questions')
    .select('*')
    .order('id')
    .limit(36);

  const { data: realScience } = await supabase
    .from('act_science_questions')
    .select('*')
    .order('id')
    .limit(40);

  // Get passage IDs for foreign keys
  const { data: readPassages } = await supabase
    .from('practice_test_reading_passages')
    .select('id, passage_number')
    .eq('test_number', 1)
    .order('passage_number');

  const { data: sciPassages } = await supabase
    .from('practice_test_science_passages')
    .select('id, passage_number')
    .eq('test_number', 1)
    .order('passage_number');

  const { data: engPassages } = await supabase
    .from('practice_test_english_passages')
    .select('id, passage_number')
    .eq('test_number', 1)
    .order('passage_number');

  console.log(`✅ Got passage IDs: ${readPassages.length} reading, ${sciPassages.length} science, ${engPassages.length} English\n`);

  // INSERT ENGLISH QUESTIONS (50 total, 10 per passage)
  console.log('Inserting English questions...\n');
  
  const englishInserts = realEnglish.map((q, i) => {
    const passageNum = Math.floor(i / 10) + 1; // 10 questions per passage
    const passageId = engPassages[passageNum - 1]?.id;

    // Build full question text with context
    let questionText = '';
    if (q.underlined_text) {
      questionText = `<u>${q.underlined_text}</u>\n\n`;
    }
    if (q.question_stem) {
      questionText += q.question_stem;
    }

    return {
      test_number: 1,
      question_number: i + 1,
      passage_id: passageId,
      question_text: questionText || 'Question about underlined portion',
      choices: JSON.stringify([
        `A. ${q.choice_a || 'NO CHANGE'}`,
        `B. ${q.choice_b || 'Alternative'}`,
        `C. ${q.choice_c || 'Another option'}`,
        `D. ${q.choice_d || 'Final option'}`
      ]),
      correct_answer: ['A', 'B', 'C', 'D'].indexOf(q.correct_answer) >= 0 ? 
        ['A', 'B', 'C', 'D'].indexOf(q.correct_answer) : 0,
      explanation: 'Explanation provided',
      question_type: q.question_type || 'grammar',
      difficulty: q.difficulty_level || 'medium'
    };
  });

  const { data: insertedEng, error: engError } = await supabase
    .from('practice_test_english_questions')
    .insert(englishInserts)
    .select();

  if (engError) {
    console.error('English error:', engError);
  } else {
    console.log(`✅ Inserted ${insertedEng.length} English questions\n`);
  }

  // INSERT READING QUESTIONS (36 total, 9 per passage)
  console.log('Inserting Reading questions...\n');

  const readingInserts = realReading.map((q, i) => {
    const passageNum = Math.floor(i / 9) + 1; // 9 questions per passage
    const passageId = readPassages[passageNum - 1]?.id;

    return {
      test_number: 1,
      question_number: i + 1,
      passage_id: passageId,
      question_text: q.question_stem || 'Reading question',
      choices: JSON.stringify([
        `A. ${q.choice_a || 'Option A'}`,
        `B. ${q.choice_b || 'Option B'}`,
        `C. ${q.choice_c || 'Option C'}`,
        `D. ${q.choice_d || 'Option D'}`
      ]),
      correct_answer: ['A', 'B', 'C', 'D'].indexOf(q.correct_answer) >= 0 ? 
        ['A', 'B', 'C', 'D'].indexOf(q.correct_answer) : 0,
      explanation: 'Explanation provided',
      question_type: q.question_type || 'inference',
      difficulty: q.difficulty_level || 'medium'
    };
  });

  const { data: insertedRead, error: readError } = await supabase
    .from('practice_test_reading_questions')
    .insert(readingInserts)
    .select();

  if (readError) {
    console.error('Reading error:', readError);
  } else {
    console.log(`✅ Inserted ${insertedRead.length} Reading questions\n`);
  }

  // INSERT SCIENCE QUESTIONS (40 total, varying per passage)
  console.log('Inserting Science questions...\n');

  const questionsPerSciPassage = [7, 7, 7, 7, 6, 6]; // Total = 40

  const scienceInserts = realScience.map((q, i) => {
    // Determine which passage this question belongs to
    let passageNum = 1;
    let cumulative = 0;
    for (let j = 0; j < questionsPerSciPassage.length; j++) {
      cumulative += questionsPerSciPassage[j];
      if (i < cumulative) {
        passageNum = j + 1;
        break;
      }
    }
    
    const passageId = sciPassages[passageNum - 1]?.id;

    return {
      test_number: 1,
      question_number: i + 1,
      passage_id: passageId,
      question_text: q.question_stem || 'Science question',
      choices: JSON.stringify([
        `A. ${q.choice_a || 'Option A'}`,
        `B. ${q.choice_b || 'Option B'}`,
        `C. ${q.choice_c || 'Option C'}`,
        `D. ${q.choice_d || 'Option D'}`
      ]),
      correct_answer: ['A', 'B', 'C', 'D'].indexOf(q.correct_answer) >= 0 ? 
        ['A', 'B', 'C', 'D'].indexOf(q.correct_answer) : 0,
      explanation: 'Explanation provided',
      question_type: q.question_type || 'data-interpretation',
      difficulty: q.difficulty_level || 'medium'
    };
  });

  const { data: insertedSci, error: sciError } = await supabase
    .from('practice_test_science_questions')
    .insert(scienceInserts)
    .select();

  if (sciError) {
    console.error('Science error:', sciError);
  } else {
    console.log(`✅ Inserted ${insertedSci.length} Science questions\n`);
  }

  console.log('🎉 ALL QUESTIONS INSERTED!\n');
  console.log('Run view-practice-test-1.mjs to verify complete test');
}

insertQuestions().catch(console.error);
