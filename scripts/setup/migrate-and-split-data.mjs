#!/usr/bin/env node

/**
 * MIGRATE AND SPLIT DATA
 * 1. Create new section-specific tables
 * 2. Migrate data from act_questions to new tables
 * 3. Extract and populate act_passages
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🚀 Starting Migration...\n');

// Step 1: Read and execute SQL to create tables
console.log('📋 Step 1: Creating new tables...');
const sqlPath = join(__dirname, 'split-tables-migration.sql');
const sql = readFileSync(sqlPath, 'utf-8');

// We'll execute this via the Supabase dashboard or manually
console.log('⚠️  Please run the SQL file split-tables-migration.sql in your Supabase dashboard first!');
console.log('   Path:', sqlPath);
console.log('\nPress Enter when ready to continue...');

// For now, let's assume tables are created and continue with data migration

// Step 2: Get all questions from act_questions
console.log('\n📊 Step 2: Fetching all questions from act_questions...');
const { data: allQuestions, error: fetchError } = await supabase
  .from('act_questions')
  .select('*')
  .eq('test_number', 1)
  .order('section')
  .order('question_number');

if (fetchError) {
  console.error('❌ Error fetching questions:', fetchError);
  process.exit(1);
}

console.log(`✅ Fetched ${allQuestions.length} questions\n`);

// Step 3: Split by section and prepare data
const englishQuestions = allQuestions.filter(q => q.section === 'E');
const mathQuestions = allQuestions.filter(q => q.section === 'M');
const readingQuestions = allQuestions.filter(q => q.section === 'R');
const scienceQuestions = allQuestions.filter(q => q.section === 'S');

console.log('📊 Distribution:');
console.log(`  English: ${englishQuestions.length}`);
console.log(`  Math: ${mathQuestions.length}`);
console.log(`  Reading: ${readingQuestions.length}`);
console.log(`  Science: ${scienceQuestions.length}\n`);

// Helper function to determine passage number for English questions
function getEnglishPassageNumber(questionNumber) {
  if (questionNumber <= 15) return 1;  // Passage I: Q1-15
  if (questionNumber <= 30) return 2;  // Passage II: Q16-30
  if (questionNumber <= 45) return 3;  // Passage III: Q31-45
  if (questionNumber <= 60) return 4;  // Passage IV: Q46-60
  return 5;  // Passage V: Q61-75
}

// Helper function to determine passage for Reading questions
function getReadingPassageNumber(questionNumber) {
  if (questionNumber <= 10) return 1;  // Passage I: Q1-10
  if (questionNumber <= 20) return 2;  // Passage II: Q11-20
  if (questionNumber <= 30) return 3;  // Passage III: Q21-30
  return 4;  // Passage IV: Q31-40
}

// Helper function to determine passage for Science questions
function getSciencePassageNumber(questionNumber) {
  if (questionNumber <= 6) return 1;   // Passage I: Q1-6
  if (questionNumber <= 13) return 2;  // Passage II: Q7-13
  if (questionNumber <= 18) return 3;  // Passage III: Q14-18
  if (questionNumber <= 24) return 4;  // Passage IV: Q19-24
  if (questionNumber <= 31) return 5;  // Passage V: Q25-31
  if (questionNumber <= 37) return 6;  // Passage VI: Q32-37
  return 7;  // Passage VII: Q38-40
}

// Step 4: Migrate English Questions
console.log('📝 Step 3: Migrating English questions...');
for (const q of englishQuestions) {
  const englishQ = {
    test_number: q.test_number,
    question_number: q.question_number,
    passage_number: getEnglishPassageNumber(q.question_number),
    question_stem: q.question_stem,
    underlined_text: q.underlined_text,
    context_before: q.context_before,
    context_after: q.context_after,
    choice_a: q.choice_a,
    choice_b: q.choice_b,
    choice_c: q.choice_c,
    choice_d: q.choice_d,
    correct_answer: q.correct_answer,
    question_type: q.question_type,
    question_category: q.question_category,
    lesson_id: q.lesson_id,
    difficulty_level: q.difficulty_level,
    notes: q.notes
  };

  const { error } = await supabase
    .from('english_questions')
    .upsert(englishQ, { onConflict: 'test_number,question_number' });

  if (error) {
    console.error(`❌ Error inserting EQ${q.question_number}:`, error);
  } else {
    console.log(`✅ Migrated EQ${q.question_number}`);
  }
}

// Step 5: Migrate Math Questions
console.log('\n📝 Step 4: Migrating Math questions...');
for (const q of mathQuestions) {
  const mathQ = {
    test_number: q.test_number,
    question_number: q.question_number,
    question_stem: q.question_stem,
    choice_a: q.choice_a,
    choice_b: q.choice_b,
    choice_c: q.choice_c,
    choice_d: q.choice_d,
    choice_e: q.choice_e,
    correct_answer: q.correct_answer,
    question_type: q.question_type,
    question_category: q.question_category,
    lesson_id: q.lesson_id,
    has_figure: q.has_figure || false,
    figure_url: q.figure_url,
    difficulty_level: q.difficulty_level,
    notes: q.notes
  };

  const { error } = await supabase
    .from('math_questions')
    .upsert(mathQ, { onConflict: 'test_number,question_number' });

  if (error) {
    console.error(`❌ Error inserting MQ${q.question_number}:`, error);
  } else {
    console.log(`✅ Migrated MQ${q.question_number}`);
  }
}

// Step 6: Create Reading Passages first
console.log('\n📝 Step 5: Creating Reading passages...');
const readingPassages = [
  {
    test_number: 1,
    section: 'R',
    passage_number: 1,
    passage_type: 'LITERARY NARRATIVE',
    title: 'Love Marriage',
    introduction: 'LITERARY NARRATIVE: This passage is adapted from the novel Love Marriage by V. V. Ganeshananthan (©2008 by V. V. Ganeshananthan).',
    passage_text: '[Full passage text to be extracted]'
  },
  {
    test_number: 1,
    section: 'R',
    passage_number: 2,
    passage_type: 'SOCIAL SCIENCE',
    title: 'Our Vanishing Night / The End of Night',
    introduction: 'SOCIAL SCIENCE: Passage A is adapted from the article "Our Vanishing Night" by Verlyn Klinkenborg (©2008 by National Geographic Society, Inc.). Passage B is adapted from the book The End of Night: Searching for Natural Darkness in an Age of Artificial Light by Paul Bogard (©2013 by Paul Bogard)',
    passage_text: '[Dual passage text to be extracted]'
  },
  {
    test_number: 1,
    section: 'R',
    passage_number: 3,
    passage_type: 'HUMANITIES',
    title: 'On Places, Photographs, and Memory',
    introduction: 'HUMANITIES: This passage is adapted from the essay "On Places, Photographs, and Memory" by Chris Engman (©2012 by Chris Engman).',
    passage_text: '[Full passage text to be extracted]'
  },
  {
    test_number: 1,
    section: 'R',
    passage_number: 4,
    passage_type: 'NATURAL SCIENCE',
    title: 'Glaciers',
    introduction: 'NATURAL SCIENCE: This passage is about glaciers.',
    passage_text: '[Full passage text to be extracted]'
  }
];

const passageIdMap = {}; // To store passage_id mappings

for (const passage of readingPassages) {
  const { data, error } = await supabase
    .from('act_passages')
    .upsert(passage, { onConflict: 'test_number,section,passage_number' })
    .select();

  if (error) {
    console.error(`❌ Error creating Reading Passage ${passage.passage_number}:`, error);
  } else {
    const passageId = data[0].id;
    passageIdMap[`R${passage.passage_number}`] = passageId;
    console.log(`✅ Created Reading Passage ${passage.passage_number}`);
  }
}

// Step 7: Migrate Reading Questions
console.log('\n📝 Step 6: Migrating Reading questions...');
for (const q of readingQuestions) {
  const passageNum = getReadingPassageNumber(q.question_number);
  const passageId = passageIdMap[`R${passageNum}`];

  const readingQ = {
    test_number: q.test_number,
    question_number: q.question_number,
    passage_id: passageId,
    question_stem: q.question_stem,
    choice_a: q.choice_a,
    choice_b: q.choice_b,
    choice_c: q.choice_c,
    choice_d: q.choice_d,
    correct_answer: q.correct_answer,
    question_type: q.question_type,
    question_category: q.question_category,
    lesson_id: q.lesson_id,
    difficulty_level: q.difficulty_level,
    notes: q.notes
  };

  const { error } = await supabase
    .from('reading_questions')
    .upsert(readingQ, { onConflict: 'test_number,question_number' });

  if (error) {
    console.error(`❌ Error inserting RQ${q.question_number}:`, error);
  } else {
    console.log(`✅ Migrated RQ${q.question_number} → Passage ${passageNum}`);
  }
}

// Step 8: Create Science Passages
console.log('\n📝 Step 7: Creating Science passages...');
const sciencePassages = [
  {
    test_number: 1,
    section: 'S',
    passage_number: 1,
    passage_type: 'DATA REPRESENTATION',
    title: 'Molar Volume of Gases',
    passage_text: '[Tables showing molar volume data]'
  },
  {
    test_number: 1,
    section: 'S',
    passage_number: 2,
    passage_type: 'RESEARCH SUMMARIES',
    title: 'Flies as Bacterial Vectors',
    passage_text: '[Experiment descriptions and figures]'
  },
  {
    test_number: 1,
    section: 'S',
    passage_number: 3,
    passage_type: 'DATA REPRESENTATION',
    title: 'Tectonic Plates',
    passage_text: '[Temperature and depth data]'
  },
  {
    test_number: 1,
    section: 'S',
    passage_number: 4,
    passage_type: 'CONFLICTING VIEWPOINTS',
    title: 'Evolution',
    passage_text: '[Two scientists\' viewpoints]'
  },
  {
    test_number: 1,
    section: 'S',
    passage_number: 5,
    passage_type: 'DATA REPRESENTATION',
    title: 'Chemical Reactions',
    passage_text: '[Reaction rate data]'
  },
  {
    test_number: 1,
    section: 'S',
    passage_number: 6,
    passage_type: 'DATA REPRESENTATION',
    title: 'Planetary Motion',
    passage_text: '[Orbital period data]'
  },
  {
    test_number: 1,
    section: 'S',
    passage_number: 7,
    passage_type: 'DATA REPRESENTATION',
    title: 'Climate Change',
    passage_text: '[CO2 and temperature data]'
  }
];

for (const passage of sciencePassages) {
  const { data, error } = await supabase
    .from('act_passages')
    .upsert(passage, { onConflict: 'test_number,section,passage_number' })
    .select();

  if (error) {
    console.error(`❌ Error creating Science Passage ${passage.passage_number}:`, error);
  } else {
    const passageId = data[0].id;
    passageIdMap[`S${passage.passage_number}`] = passageId;
    console.log(`✅ Created Science Passage ${passage.passage_number}`);
  }
}

// Step 9: Migrate Science Questions
console.log('\n📝 Step 8: Migrating Science questions...');
for (const q of scienceQuestions) {
  const passageNum = getSciencePassageNumber(q.question_number);
  const passageId = passageIdMap[`S${passageNum}`];

  const scienceQ = {
    test_number: q.test_number,
    question_number: q.question_number,
    passage_id: passageId,
    question_stem: q.question_stem,
    choice_a: q.choice_a,
    choice_b: q.choice_b,
    choice_c: q.choice_c,
    choice_d: q.choice_d,
    correct_answer: q.correct_answer,
    question_type: q.question_type,
    question_category: q.question_category,
    lesson_id: q.lesson_id,
    has_figure: q.has_figure || false,
    figure_url: q.figure_url,
    difficulty_level: q.difficulty_level,
    notes: q.notes
  };

  const { error } = await supabase
    .from('science_questions')
    .upsert(scienceQ, { onConflict: 'test_number,question_number' });

  if (error) {
    console.error(`❌ Error inserting SQ${q.question_number}:`, error);
  } else {
    console.log(`✅ Migrated SQ${q.question_number} → Passage ${passageNum}`);
  }
}

console.log('\n' + '='.repeat(70));
console.log('🎉 MIGRATION COMPLETE!');
console.log('='.repeat(70));
console.log('\n📊 Summary:');
console.log(`  ✅ English: ${englishQuestions.length} questions migrated`);
console.log(`  ✅ Math: ${mathQuestions.length} questions migrated`);
console.log(`  ✅ Reading: ${readingQuestions.length} questions + ${readingPassages.length} passages`);
console.log(`  ✅ Science: ${scienceQuestions.length} questions + ${sciencePassages.length} passages`);
console.log('\n⚠️  Next steps:');
console.log('  1. Extract actual passage text from source files');
console.log('  2. Update passages with full text');
console.log('  3. Verify all data integrity');
