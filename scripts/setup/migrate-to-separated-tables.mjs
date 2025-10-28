/**
 * Migrate Practice Test Data to Separated Tables
 * Moves data from practice_test_questions to section-specific tables
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Migrate English section data
 */
async function migrateEnglish() {
  console.log('\n📝 Migrating English section...');

  // Fetch all English questions from old table
  const { data: oldQuestions, error: fetchError } = await supabase
    .from('practice_test_questions')
    .select('*')
    .eq('section', 'english')
    .eq('test_number', 1)
    .order('question_number');

  if (fetchError) {
    console.error('❌ Error fetching English questions:', fetchError);
    return false;
  }

  console.log(`  Found ${oldQuestions.length} English questions`);

  // Group questions by passage
  const passageMap = new Map();
  oldQuestions.forEach((q) => {
    const passageText = q.passage || '';
    if (!passageMap.has(passageText)) {
      passageMap.set(passageText, []);
    }
    passageMap.get(passageText).push(q);
  });

  console.log(`  Identified ${passageMap.size} unique passages`);

  // Determine passage types based on question ranges
  const passageTypes = [
    'literary_narrative',   // Q1-15
    'social_studies',       // Q16-30
    'natural_science',      // Q31-45
    'humanities',           // Q46-60
    'personal_essay'        // Q61-75
  ];

  // Insert passages and map to IDs
  const passageIdMap = new Map();
  let passageNumber = 1;

  for (const [passageText, questions] of passageMap.entries()) {
    if (!passageText) continue; // Skip empty passages

    const firstQuestion = questions[0].question_number;
    const passageTypeIndex = Math.floor((firstQuestion - 1) / 15);
    const passageType = passageTypes[passageTypeIndex] || 'general';

    const { data: insertedPassage, error: passageError } = await supabase
      .from('practice_test_english_passages')
      .insert({
        test_number: 1,
        passage_number: passageNumber,
        passage_type: passageType,
        passage_text: passageText,
        word_count: passageText.split(/\s+/).length
      })
      .select()
      .single();

    if (passageError) {
      console.error(`❌ Error inserting passage ${passageNumber}:`, passageError);
      continue;
    }

    passageIdMap.set(passageText, insertedPassage.id);
    console.log(`  ✓ Inserted passage ${passageNumber} (${passageType}, ${questions.length} questions)`);
    passageNumber++;
  }

  // Insert questions with passage references
  const questionsToInsert = oldQuestions.map((q) => ({
    test_number: 1,
    question_number: q.question_number,
    passage_id: passageIdMap.get(q.passage || ''),
    question_text: q.question,
    choices: q.choices,
    correct_answer: q.correct_answer,
    explanation: q.explanation,
    question_type: 'general', // Can be updated later
    difficulty: 'medium'
  }));

  const { error: questionsError } = await supabase
    .from('practice_test_english_questions')
    .insert(questionsToInsert);

  if (questionsError) {
    console.error('❌ Error inserting English questions:', questionsError);
    return false;
  }

  console.log(`  ✅ Migrated ${questionsToInsert.length} English questions`);
  return true;
}

/**
 * Migrate Math section data
 */
async function migrateMath() {
  console.log('\n🔢 Migrating Math section...');

  const { data: oldQuestions, error: fetchError } = await supabase
    .from('practice_test_questions')
    .select('*')
    .eq('section', 'math')
    .eq('test_number', 1)
    .order('question_number');

  if (fetchError) {
    console.error('❌ Error fetching Math questions:', fetchError);
    return false;
  }

  console.log(`  Found ${oldQuestions.length} Math questions`);

  const questionsToInsert = oldQuestions.map((q) => {
    // Determine question type based on question number ranges
    let questionType = 'algebra';
    if (q.question_number >= 1 && q.question_number <= 20) {
      questionType = 'basic_algebra';
    } else if (q.question_number >= 21 && q.question_number <= 40) {
      questionType = 'geometry';
    } else {
      questionType = 'advanced';
    }

    return {
      test_number: 1,
      question_number: q.question_number,
      question_text: q.question,
      choices: q.choices,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      question_type: questionType,
      difficulty: q.question_number <= 20 ? 'easy' : q.question_number <= 40 ? 'medium' : 'hard'
    };
  });

  const { error: insertError } = await supabase
    .from('practice_test_math_questions')
    .insert(questionsToInsert);

  if (insertError) {
    console.error('❌ Error inserting Math questions:', insertError);
    return false;
  }

  console.log(`  ✅ Migrated ${questionsToInsert.length} Math questions`);
  return true;
}

/**
 * Migrate Reading section data
 */
async function migrateReading() {
  console.log('\n📖 Migrating Reading section...');

  const { data: oldQuestions, error: fetchError } = await supabase
    .from('practice_test_questions')
    .select('*')
    .eq('section', 'reading')
    .eq('test_number', 1)
    .order('question_number');

  if (fetchError) {
    console.error('❌ Error fetching Reading questions:', fetchError);
    return false;
  }

  console.log(`  Found ${oldQuestions.length} Reading questions`);

  // Group by passage (4 passages, 10 questions each)
  const passageMap = new Map();
  oldQuestions.forEach((q) => {
    const passageText = q.passage || '';
    if (!passageMap.has(passageText)) {
      passageMap.set(passageText, []);
    }
    passageMap.get(passageText).push(q);
  });

  console.log(`  Identified ${passageMap.size} unique passages`);

  const passageTypes = [
    'literary_narrative',  // Q1-10
    'social_science',      // Q11-20
    'humanities',          // Q21-30
    'natural_science'      // Q31-40
  ];

  const passageIdMap = new Map();
  let passageNumber = 1;

  for (const [passageText, questions] of passageMap.entries()) {
    if (!passageText) continue;

    const firstQuestion = questions[0].question_number;
    const passageTypeIndex = Math.floor((firstQuestion - 1) / 10);
    const passageType = passageTypes[passageTypeIndex] || 'general';

    const { data: insertedPassage, error: passageError } = await supabase
      .from('practice_test_reading_passages')
      .insert({
        test_number: 1,
        passage_number: passageNumber,
        passage_type: passageType,
        passage_title: `Passage ${passageNumber}`,
        passage_text: passageText,
        word_count: passageText.split(/\s+/).length
      })
      .select()
      .single();

    if (passageError) {
      console.error(`❌ Error inserting passage ${passageNumber}:`, passageError);
      continue;
    }

    passageIdMap.set(passageText, insertedPassage.id);
    console.log(`  ✓ Inserted passage ${passageNumber} (${passageType}, ${questions.length} questions)`);
    passageNumber++;
  }

  const questionsToInsert = oldQuestions.map((q) => ({
    test_number: 1,
    question_number: q.question_number,
    passage_id: passageIdMap.get(q.passage || ''),
    question_text: q.question,
    choices: q.choices,
    correct_answer: q.correct_answer,
    explanation: q.explanation,
    question_type: 'comprehension',
    difficulty: 'medium'
  }));

  const { error: questionsError } = await supabase
    .from('practice_test_reading_questions')
    .insert(questionsToInsert);

  if (questionsError) {
    console.error('❌ Error inserting Reading questions:', questionsError);
    return false;
  }

  console.log(`  ✅ Migrated ${questionsToInsert.length} Reading questions`);
  return true;
}

/**
 * Migrate Science section data
 */
async function migrateScience() {
  console.log('\n🔬 Migrating Science section...');

  const { data: oldQuestions, error: fetchError } = await supabase
    .from('practice_test_questions')
    .select('*')
    .eq('section', 'science')
    .eq('test_number', 1)
    .order('question_number');

  if (fetchError) {
    console.error('❌ Error fetching Science questions:', fetchError);
    return false;
  }

  console.log(`  Found ${oldQuestions.length} Science questions`);

  // Group by passage
  const passageMap = new Map();
  oldQuestions.forEach((q) => {
    const passageText = q.passage || '';
    if (!passageMap.has(passageText)) {
      passageMap.set(passageText, []);
    }
    passageMap.get(passageText).push(q);
  });

  console.log(`  Identified ${passageMap.size} unique passages`);

  // Science passage types based on question ranges
  const passageTypeMap = [
    { range: [1, 5], type: 'data_representation' },
    { range: [6, 11], type: 'research_summary' },
    { range: [12, 16], type: 'data_representation' },
    { range: [17, 22], type: 'research_summary' },
    { range: [23, 27], type: 'data_representation' },
    { range: [28, 33], type: 'research_summary' },
    { range: [34, 40], type: 'conflicting_viewpoints' }
  ];

  const passageIdMap = new Map();
  let passageNumber = 1;

  for (const [passageText, questions] of passageMap.entries()) {
    if (!passageText) continue;

    const firstQuestion = questions[0].question_number;
    const passageInfo = passageTypeMap.find(
      (p) => firstQuestion >= p.range[0] && firstQuestion <= p.range[1]
    );
    const passageType = passageInfo?.type || 'data_representation';

    const { data: insertedPassage, error: passageError } = await supabase
      .from('practice_test_science_passages')
      .insert({
        test_number: 1,
        passage_number: passageNumber,
        passage_type: passageType,
        passage_title: `${passageType.replace('_', ' ')} ${passageNumber}`,
        passage_text: passageText
      })
      .select()
      .single();

    if (passageError) {
      console.error(`❌ Error inserting passage ${passageNumber}:`, passageError);
      continue;
    }

    passageIdMap.set(passageText, insertedPassage.id);
    console.log(`  ✓ Inserted passage ${passageNumber} (${passageType}, ${questions.length} questions)`);
    passageNumber++;
  }

  const questionsToInsert = oldQuestions.map((q) => ({
    test_number: 1,
    question_number: q.question_number,
    passage_id: passageIdMap.get(q.passage || ''),
    question_text: q.question,
    choices: q.choices,
    correct_answer: q.correct_answer,
    explanation: q.explanation,
    question_type: 'data_interpretation',
    difficulty: 'medium'
  }));

  const { error: questionsError } = await supabase
    .from('practice_test_science_questions')
    .insert(questionsToInsert);

  if (questionsError) {
    console.error('❌ Error inserting Science questions:', questionsError);
    return false;
  }

  console.log(`  ✅ Migrated ${questionsToInsert.length} Science questions`);
  return true;
}

/**
 * Verify migration
 */
async function verifyMigration() {
  console.log('\n📊 Verifying migration...\n');

  const sections = [
    { name: 'English', questionTable: 'practice_test_english_questions', passageTable: 'practice_test_english_passages' },
    { name: 'Math', questionTable: 'practice_test_math_questions', passageTable: null },
    { name: 'Reading', questionTable: 'practice_test_reading_questions', passageTable: 'practice_test_reading_passages' },
    { name: 'Science', questionTable: 'practice_test_science_questions', passageTable: 'practice_test_science_passages' }
  ];

  for (const section of sections) {
    const { count: questionCount } = await supabase
      .from(section.questionTable)
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 1);

    console.log(`  ${section.name}: ${questionCount} questions`);

    if (section.passageTable) {
      const { count: passageCount } = await supabase
        .from(section.passageTable)
        .select('*', { count: 'exact', head: true })
        .eq('test_number', 1);

      console.log(`  ${section.name}: ${passageCount} passages`);
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting migration to separated tables...\n');
  console.log('⚠️  This will migrate Practice Test 1 from practice_test_questions');
  console.log('   to the new separated table structure.\n');

  try {
    // Run migrations
    const englishSuccess = await migrateEnglish();
    const mathSuccess = await migrateMath();
    const readingSuccess = await migrateReading();
    const scienceSuccess = await migrateScience();

    if (englishSuccess && mathSuccess && readingSuccess && scienceSuccess) {
      await verifyMigration();
      console.log('\n✅ Migration completed successfully!');
      console.log('\n📝 Next steps:');
      console.log('   1. Review the new tables in Supabase');
      console.log('   2. Update the service layer to use new tables');
      console.log('   3. Test the practice test functionality');
      console.log('   4. Once confirmed, you can drop the old practice_test_questions table');
    } else {
      console.log('\n⚠️  Migration completed with some errors. Please review the logs.');
    }

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
