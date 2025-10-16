import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase configuration
// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Subject mapping based on lesson keys
const subjectMapping = {
  // English lessons
  'getting-started': 'english',
  'sentence-structure': 'english',
  'punctuation': 'english',
  'grammar': 'english',
  'subject-verb-agreement': 'english',
  'pronoun-clarity': 'english',
  'modifier-placement': 'english',
  'parallelism': 'english',
  'verb-forms': 'english',
  'comma-usage': 'english',
  'apostrophes': 'english',
  'colons-semicolons': 'english',
  'dashes-parentheses': 'english',
  'transitions': 'english',
  'relevance-purpose': 'english',
  'precision-concision': 'english',
  'style-tone': 'english',
  'organization-logic': 'english',

  // Math lessons
  'pre-algebra': 'math',
  'elementary-algebra': 'math',
  'intermediate-algebra': 'math',
  'coordinate-geometry': 'math',
  'plane-geometry': 'math',
  'trigonometry': 'math',
  'backsolving': 'math',
  'picking-numbers': 'math',
  'elimination': 'math',
  'ratios-proportions': 'math',
  'percentages': 'math',
  'exponents-radicals': 'math',
  'quadratic-equations': 'math',
  'linear-equations': 'math',
  'inequalities': 'math',
  'functions': 'math',
  'polynomials': 'math',
  'sequences': 'math',
  'systems-equations': 'math',
  'word-problems': 'math',
  'angles-triangles': 'math',
  'circles': 'math',
  'polygons': 'math',
  'area-perimeter': 'math',
  'volume-surface-area': 'math',
  'coordinate-plane': 'math',
  'slope-distance': 'math',
  'transformations': 'math',
  'basic-trig': 'math',
  'trig-identities': 'math',
  'unit-circle': 'math',

  // Reading lessons
  'reading-strategies': 'reading',
  'main-idea': 'reading',
  'supporting-details': 'reading',
  'inference': 'reading',
  'vocabulary-context': 'reading',
  'authors-purpose': 'reading',
  'tone-mood': 'reading',
  'comparison-contrast': 'reading',
  'cause-effect': 'reading',
  'sequence': 'reading',
  'fact-opinion': 'reading',
  'literary-devices': 'reading',
  'character-analysis': 'reading',
  'plot-structure': 'reading',
  'theme': 'reading',
  'point-of-view': 'reading',
  'prose-fiction': 'reading',
  'social-science': 'reading',
  'humanities': 'reading',
  'natural-science': 'reading',

  // Science lessons
  'science-strategies': 'science',
  'data-representation': 'science',
  'research-summaries': 'science',
  'conflicting-viewpoints': 'science',
  'graphs-charts': 'science',
  'tables-data': 'science',
  'scientific-notation': 'science',
  'units-conversions': 'science',
  'experimental-design': 'science',
  'variables': 'science',
  'controls': 'science',
  'hypothesis-testing': 'science',
  'biology': 'science',
  'chemistry': 'science',
  'physics': 'science',
  'earth-science': 'science',
};

// Parse the JavaScript file to extract lessons
function parseAllLessons(filePath) {
  console.log(`Reading lessons from: ${filePath}`);
  const fileContent = readFileSync(filePath, 'utf-8');

  // Extract the object content between 'export const allLessons = {' and the closing '};'
  // We need to find the matching closing brace
  const startMatch = fileContent.match(/export\s+const\s+allLessons\s*=\s*\{/);

  if (!startMatch) {
    throw new Error('Could not find allLessons export in file');
  }

  const startIndex = startMatch.index + startMatch[0].length - 1; // Include the opening brace

  // Find the matching closing brace
  let braceCount = 0;
  let endIndex = startIndex;

  for (let i = startIndex; i < fileContent.length; i++) {
    if (fileContent[i] === '{') braceCount++;
    if (fileContent[i] === '}') braceCount--;

    if (braceCount === 0) {
      endIndex = i + 1;
      break;
    }
  }

  if (braceCount !== 0) {
    throw new Error('Unmatched braces in allLessons object');
  }

  const objectContent = fileContent.substring(startIndex, endIndex);

  // Use eval to parse the JavaScript object (safe in this controlled context)
  try {
    const lessons = eval(`(${objectContent})`);
    return lessons;
  } catch (error) {
    console.error('Error parsing lessons:', error);
    console.error('First 500 chars of object:', objectContent.substring(0, 500));
    throw error;
  }
}

// Create lesson_questions table if it doesn't exist
async function createLessonQuestionsTable() {
  console.log('\nChecking if lesson_questions table exists...');

  // First check if table exists by trying to select from it
  const { error: checkError } = await supabase
    .from('lesson_questions')
    .select('id')
    .limit(1);

  if (checkError && checkError.code === '42P01') {
    console.log('Table does not exist. Attempting to create it...');

    // Try to create the table using the SQL RPC method
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS lesson_questions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
        practice_section_title TEXT,
        practice_section_description TEXT,
        question_id INTEGER,
        passage TEXT,
        question TEXT,
        choices JSONB,
        correct_answer INTEGER,
        explanation TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_lesson_questions_lesson_id ON lesson_questions(lesson_id);
      CREATE INDEX IF NOT EXISTS idx_lesson_questions_question_id ON lesson_questions(question_id);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_questions_unique ON lesson_questions(lesson_id, practice_section_title, question_id);
    `;

    // Try using rpc to execute the SQL
    const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });

    if (createError) {
      console.log('Could not create table automatically. This is normal.');
      console.log('\nIMPORTANT: You need to create the lesson_questions table manually.');
      console.log('Run this SQL in your Supabase SQL Editor:\n');
      console.log(createTableSQL);
      console.log('\nThe migration will continue and attempt to insert questions.');
      console.log('If the table does not exist, question insertion will be skipped.');
    } else {
      console.log('Table created successfully!');
    }
  } else if (checkError) {
    console.log('Error checking table:', checkError);
  } else {
    console.log('lesson_questions table already exists.');
  }
}

// Check existing lessons in database
async function getExistingLessons() {
  console.log('\nFetching existing lessons from Supabase...');
  const { data, error } = await supabase
    .from('lessons')
    .select('lesson_key, id, title');

  if (error) {
    console.error('Error fetching existing lessons:', error);
    return new Map();
  }

  console.log(`Found ${data.length} existing lessons in database.`);

  // Create a map of lesson_key -> lesson data for quick lookup
  const lessonMap = new Map();
  data.forEach(lesson => {
    lessonMap.set(lesson.lesson_key, lesson);
  });

  return lessonMap;
}

// Migrate lessons to Supabase
async function migrateLessons(lessons, existingLessons) {
  const lessonsToInsert = [];
  const lessonsToUpdate = [];
  let orderIndex = 0;

  console.log('\nProcessing lessons...');

  for (const [lessonKey, lessonData] of Object.entries(lessons)) {
    const subject = subjectMapping[lessonKey] || 'english'; // Default to english if not found

    const lessonRecord = {
      subject,
      lesson_key: lessonKey,
      title: lessonData.title,
      content: lessonData.content,
      order_index: orderIndex++,
      updated_at: new Date().toISOString(),
    };

    if (existingLessons.has(lessonKey)) {
      // Update existing lesson
      lessonRecord.id = existingLessons.get(lessonKey).id;
      lessonsToUpdate.push(lessonRecord);
    } else {
      // Insert new lesson
      lessonRecord.created_at = new Date().toISOString();
      lessonsToInsert.push(lessonRecord);
    }
  }

  console.log(`\nLessons to insert: ${lessonsToInsert.length}`);
  console.log(`Lessons to update: ${lessonsToUpdate.length}`);

  // Insert new lessons
  let insertedCount = 0;
  if (lessonsToInsert.length > 0) {
    console.log('\nInserting new lessons...');

    // Insert in batches of 100 to avoid timeouts
    const batchSize = 100;
    for (let i = 0; i < lessonsToInsert.length; i += batchSize) {
      const batch = lessonsToInsert.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from('lessons')
        .insert(batch)
        .select();

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      } else {
        insertedCount += data.length;
        console.log(`Inserted batch ${i / batchSize + 1}: ${data.length} lessons`);

        // Add inserted lessons to existing map for question migration
        data.forEach(lesson => {
          existingLessons.set(lesson.lesson_key, lesson);
        });
      }
    }
  }

  // Update existing lessons
  let updatedCount = 0;
  if (lessonsToUpdate.length > 0) {
    console.log('\nUpdating existing lessons...');

    for (const lesson of lessonsToUpdate) {
      const { error } = await supabase
        .from('lessons')
        .update({
          title: lesson.title,
          content: lesson.content,
          order_index: lesson.order_index,
          updated_at: lesson.updated_at,
        })
        .eq('id', lesson.id);

      if (error) {
        console.error(`Error updating lesson ${lesson.lesson_key}:`, error);
      } else {
        updatedCount++;
      }
    }
  }

  console.log(`\nInserted ${insertedCount} new lessons.`);
  console.log(`Updated ${updatedCount} existing lessons.`);

  return { insertedCount, updatedCount };
}

// Migrate practice questions to Supabase
async function migrateQuestions(lessons, existingLessons) {
  console.log('\n\nMigrating practice questions...');

  // First, get all existing questions to avoid duplicates
  const { data: existingQuestions, error: fetchError } = await supabase
    .from('lesson_questions')
    .select('lesson_id, practice_section_title, question_id');

  if (fetchError && fetchError.code !== '42P01') {
    console.error('Error fetching existing questions:', fetchError);
    return { insertedCount: 0, skippedCount: 0 };
  }

  const existingQuestionsSet = new Set();
  if (existingQuestions) {
    existingQuestions.forEach(q => {
      existingQuestionsSet.add(`${q.lesson_id}-${q.practice_section_title}-${q.question_id}`);
    });
  }

  const questionsToInsert = [];
  let skippedCount = 0;

  for (const [lessonKey, lessonData] of Object.entries(lessons)) {
    const lessonRecord = existingLessons.get(lessonKey);

    if (!lessonRecord) {
      console.log(`Warning: Lesson ${lessonKey} not found in database, skipping questions.`);
      continue;
    }

    // Check if lesson has interactive data with practice sections
    if (lessonData.interactiveData && lessonData.interactiveData.practiceSections) {
      for (const section of lessonData.interactiveData.practiceSections) {
        const sectionTitle = section.title || 'Practice';
        const sectionDescription = section.description || '';

        if (section.questions && Array.isArray(section.questions)) {
          for (const question of section.questions) {
            const questionKey = `${lessonRecord.id}-${sectionTitle}-${question.id}`;

            if (existingQuestionsSet.has(questionKey)) {
              skippedCount++;
              continue;
            }

            questionsToInsert.push({
              lesson_id: lessonRecord.id,
              practice_section_title: sectionTitle,
              practice_section_description: sectionDescription,
              question_id: question.id,
              passage: question.passage || '',
              question: question.question || '',
              choices: question.choices || [],
              correct_answer: question.correct !== undefined ? question.correct : null,
              explanation: question.explanation || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }
        }
      }
    }
  }

  console.log(`\nQuestions to insert: ${questionsToInsert.length}`);
  console.log(`Questions skipped (already exist): ${skippedCount}`);

  let insertedCount = 0;
  if (questionsToInsert.length > 0) {
    console.log('\nInserting practice questions...');

    // Insert in batches of 100
    const batchSize = 100;
    for (let i = 0; i < questionsToInsert.length; i += batchSize) {
      const batch = questionsToInsert.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from('lesson_questions')
        .insert(batch)
        .select();

      if (error) {
        console.error(`Error inserting question batch ${i / batchSize + 1}:`, error);
        console.error('Error details:', error.message);

        // If table doesn't exist, show instructions again
        if (error.code === '42P01') {
          console.log('\n=== TABLE CREATION REQUIRED ===');
          console.log('The lesson_questions table does not exist yet.');
          console.log('Please create it in Supabase SQL Editor with this SQL:\n');
          console.log(`
CREATE TABLE IF NOT EXISTS lesson_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  practice_section_title TEXT,
  practice_section_description TEXT,
  question_id INTEGER,
  passage TEXT,
  question TEXT,
  choices JSONB,
  correct_answer INTEGER,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lesson_questions_lesson_id ON lesson_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_questions_question_id ON lesson_questions(question_id);
          `);
          break;
        }
      } else {
        insertedCount += data.length;
        console.log(`Inserted question batch ${i / batchSize + 1}: ${data.length} questions`);
      }
    }
  }

  console.log(`\nInserted ${insertedCount} practice questions.`);

  return { insertedCount, skippedCount };
}

// Main migration function
async function main() {
  console.log('=== ACT Prep Lesson Migration ===\n');
  console.log('Starting migration process...\n');

  try {
    // Step 1: Parse lessons from file
    const lessonsFilePath = join(__dirname, 'src', 'data', 'allLessons-backup.js');
    const lessons = parseAllLessons(lessonsFilePath);
    const totalLessons = Object.keys(lessons).length;
    console.log(`Parsed ${totalLessons} lessons from file.`);

    // Step 2: Check/create lesson_questions table
    await createLessonQuestionsTable();

    // Step 3: Get existing lessons
    const existingLessons = await getExistingLessons();

    // Step 4: Migrate lessons
    const { insertedCount, updatedCount } = await migrateLessons(lessons, existingLessons);

    // Step 5: Migrate practice questions
    const { insertedCount: questionsInserted, skippedCount: questionsSkipped } =
      await migrateQuestions(lessons, existingLessons);

    // Summary
    console.log('\n\n=== MIGRATION SUMMARY ===');
    console.log(`Total lessons processed: ${totalLessons}`);
    console.log(`New lessons inserted: ${insertedCount}`);
    console.log(`Existing lessons updated: ${updatedCount}`);
    console.log(`Practice questions inserted: ${questionsInserted}`);
    console.log(`Practice questions skipped: ${questionsSkipped}`);
    console.log('\nMigration completed successfully!');

  } catch (error) {
    console.error('\n\n=== MIGRATION FAILED ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the migration
main();
