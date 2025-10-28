#!/usr/bin/env node
/**
 * COPY ACT_ TO PRACTICE_TEST_ TABLES
 *
 * Copies all Tests 1-7 from act_ tables to practice_test_ tables
 * Maintains OLD format structure (75/60/40/40)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('📋 COPYING ACT TESTS TO PRACTICE_TEST TABLES\n');
console.log('='.repeat(80) + '\n');

async function copyTest(testNumber) {
  console.log(`\n🔄 Processing Test ${testNumber}...\n`);

  // 1. Copy Reading Passages
  const { data: readingPassages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', testNumber);

  if (readingPassages && readingPassages.length > 0) {
    const readingPassageInserts = readingPassages.map(p => ({
      test_number: testNumber,
      passage_number: p.passage_number,
      passage_type: p.passage_type,
      passage_title: p.title,
      passage_text: p.passage_text,
      word_count: p.passage_text?.split(/\s+/).filter(w => w.length > 0).length || 0
    }));

    const { data: insertedReadingP, error: rpe } = await supabase
      .from('practice_test_reading_passages')
      .insert(readingPassageInserts)
      .select();

    if (rpe) {
      console.log(`  ❌ Reading passages error: ${rpe.message}`);
      return;
    }

    console.log(`  ✅ Reading: ${insertedReadingP.length} passages`);

    // Map passage IDs
    const readingPassageIds = {};
    insertedReadingP.forEach(p => {
      readingPassageIds[p.passage_number] = p.id;
    });

    // Copy Reading Questions
    const { data: readingQuestions } = await supabase
      .from('act_reading_questions')
      .select('*')
      .eq('test_number', testNumber)
      .order('question_number');

    if (readingQuestions && readingQuestions.length > 0) {
      const readingQInserts = readingQuestions.map(q => {
        const passageNum = Math.floor((q.question_number - 1) / 10) + 1;
        const choices = [
          `A. ${q.choice_a || ''}`,
          `B. ${q.choice_b || ''}`,
          `C. ${q.choice_c || ''}`,
          `D. ${q.choice_d || ''}`
        ];
        const correctIndex = ['A', 'B', 'C', 'D'].indexOf(q.correct_answer);

        return {
          test_number: testNumber,
          question_number: q.question_number,
          question_text: q.question_stem,
          choices: JSON.stringify(choices),
          correct_answer: correctIndex,
          explanation: q.explanation,
          passage_id: readingPassageIds[passageNum]
        };
      });

      const { error: rqe } = await supabase
        .from('practice_test_reading_questions')
        .insert(readingQInserts);

      if (rqe) {
        console.log(`  ❌ Reading questions error: ${rqe.message}`);
      } else {
        console.log(`  ✅ Reading: ${readingQInserts.length} questions`);
      }
    }
  }

  // 2. Copy Science Passages
  const { data: sciencePassages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', testNumber);

  if (sciencePassages && sciencePassages.length > 0) {
    const sciencePassageInserts = sciencePassages.map(p => ({
      test_number: testNumber,
      passage_number: p.passage_number,
      passage_type: p.passage_type,
      passage_title: p.title,
      passage_text: p.passage_text,
      passage_data: p.passage_data
    }));

    const { data: insertedScienceP, error: spe } = await supabase
      .from('practice_test_science_passages')
      .insert(sciencePassageInserts)
      .select();

    if (spe) {
      console.log(`  ❌ Science passages error: ${spe.message}`);
      return;
    }

    console.log(`  ✅ Science: ${insertedScienceP.length} passages`);

    // Map passage IDs
    const sciencePassageIds = {};
    insertedScienceP.forEach(p => {
      sciencePassageIds[p.passage_number] = p.id;
    });

    // Copy Science Questions (distribute across passages)
    const { data: scienceQuestions } = await supabase
      .from('act_science_questions')
      .select('*')
      .eq('test_number', testNumber)
      .order('question_number');

    if (scienceQuestions && scienceQuestions.length > 0) {
      const scienceQInserts = scienceQuestions.map((q, idx) => {
        const passageNum = Math.floor(idx / (40 / insertedScienceP.length)) + 1;
        const choices = [
          `A. ${q.choice_a || ''}`,
          `B. ${q.choice_b || ''}`,
          `C. ${q.choice_c || ''}`,
          `D. ${q.choice_d || ''}`
        ];
        const correctIndex = ['A', 'B', 'C', 'D'].indexOf(q.correct_answer);

        return {
          test_number: testNumber,
          question_number: q.question_number,
          question_text: q.question_stem,
          choices: JSON.stringify(choices),
          correct_answer: correctIndex,
          explanation: q.explanation,
          passage_id: sciencePassageIds[Math.min(passageNum, insertedScienceP.length)]
        };
      });

      const { error: sqe } = await supabase
        .from('practice_test_science_questions')
        .insert(scienceQInserts);

      if (sqe) {
        console.log(`  ❌ Science questions error: ${sqe.message}`);
      } else {
        console.log(`  ✅ Science: ${scienceQInserts.length} questions`);
      }
    }
  }

  // 3. Copy English Questions (will build passages)
  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', testNumber)
    .order('question_number');

  if (englishQuestions && englishQuestions.length > 0) {
    // Group by passage
    const byPassage = {};
    englishQuestions.forEach(q => {
      const pNum = q.passage_number || 1;
      if (!byPassage[pNum]) byPassage[pNum] = [];
      byPassage[pNum].push(q);
    });

    // Create passages
    const englishPassageInserts = [];
    for (const [pNum, questions] of Object.entries(byPassage)) {
      let passageText = '';
      questions.forEach((q, idx) => {
        passageText += (q.context_before || '') + ' ';
        passageText += `<u id="q${q.question_number}">${q.underlined_text || ''}</u> `;
        passageText += (q.context_after || '') + ' ';
      });

      const wordCount = passageText.split(/\s+/).filter(w => w.length > 0).length;
      englishPassageInserts.push({
        test_number: testNumber,
        passage_number: parseInt(pNum),
        passage_type: 'EXPOSITORY',
        passage_title: `English Passage ${pNum}`,
        passage_text: passageText.trim(),
        word_count: wordCount
      });
    }

    const { data: insertedEnglishP, error: epe } = await supabase
      .from('practice_test_english_passages')
      .insert(englishPassageInserts)
      .select();

    if (epe) {
      console.log(`  ❌ English passages error: ${epe.message}`);
      return;
    }

    console.log(`  ✅ English: ${insertedEnglishP.length} passages`);

    // Map passage IDs
    const englishPassageIds = {};
    insertedEnglishP.forEach(p => {
      englishPassageIds[p.passage_number] = p.id;
    });

    // Insert English questions
    const englishQInserts = englishQuestions.map(q => {
      const questionText = `${q.context_before || ''} <u>${q.underlined_text || ''}</u> ${q.context_after || ''}`.trim();
      const choices = [
        `A. ${q.choice_a || ''}`,
        `B. ${q.choice_b || ''}`,
        `C. ${q.choice_c || ''}`,
        `D. ${q.choice_d || ''}`
      ];
      const correctIndex = ['A', 'B', 'C', 'D'].indexOf(q.correct_answer);

      return {
        test_number: testNumber,
        question_number: q.question_number,
        question_text: questionText,
        choices: JSON.stringify(choices),
        correct_answer: correctIndex,
        explanation: q.explanation,
        passage_id: englishPassageIds[q.passage_number || 1]
      };
    });

    const { error: eqe } = await supabase
      .from('practice_test_english_questions')
      .insert(englishQInserts);

    if (eqe) {
      console.log(`  ❌ English questions error: ${eqe.message}`);
    } else {
      console.log(`  ✅ English: ${englishQInserts.length} questions`);
    }
  }

  // 4. Copy Math Questions (no passages)
  const { data: mathQuestions } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', testNumber)
    .order('question_number');

  if (mathQuestions && mathQuestions.length > 0) {
    const mathQInserts = mathQuestions.map(q => {
      const choices = [
        `A. ${q.choice_a || ''}`,
        `B. ${q.choice_b || ''}`,
        `C. ${q.choice_c || ''}`,
        `D. ${q.choice_d || ''}`,
        q.choice_e ? `E. ${q.choice_e}` : null
      ].filter(c => c !== null);

      const correctIndex = ['A', 'B', 'C', 'D', 'E'].indexOf(q.correct_answer);

      return {
        test_number: testNumber,
        question_number: q.question_number,
        question_text: q.question_stem,
        choices: JSON.stringify(choices),
        correct_answer: correctIndex,
        explanation: q.explanation,
        question_image_url: q.question_image_url
      };
    });

    const { error: mqe } = await supabase
      .from('practice_test_math_questions')
      .insert(mathQInserts);

    if (mqe) {
      console.log(`  ❌ Math questions error: ${mqe.message}`);
    } else {
      console.log(`  ✅ Math: ${mathQInserts.length} questions`);
    }
  }

  console.log(`\n✅ Test ${testNumber} complete!`);
}

async function copyAllTests() {
  for (let testNum = 1; testNum <= 7; testNum++) {
    await copyTest(testNum);
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n🎉 ALL TESTS COPIED SUCCESSFULLY!\n');
  console.log('Tests 1-7 are now available in practice_test_ tables\n');
}

copyAllTests().catch(console.error);
