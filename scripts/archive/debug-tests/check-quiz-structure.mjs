import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkQuizzes() {
  console.log('Checking quiz storage structure...\n');

  // Check if there's a quizzes table
  const { data: tables, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public');

  if (!error && tables) {
    const quizTables = tables.filter(t =>
      t.table_name.includes('quiz') ||
      t.table_name.includes('question') ||
      t.table_name.includes('mastery')
    );
    console.log('Quiz-related tables:', quizTables.map(t => t.table_name));
  }

  // Try to find backsolving quiz
  const lessonId = '27a6d67b-48d3-412e-91b7-eafdf9472693';

  // Check different possible table names
  const tablesToCheck = [
    'lesson_quizzes',
    'mastery_check',
    'quiz_questions',
    'lesson_quiz_questions'
  ];

  for (const tableName of tablesToCheck) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('lesson_id', lessonId)
        .limit(1);

      if (!error && data) {
        console.log(`\n✓ Found quiz data in table: ${tableName}`);
        console.log('Sample data:', JSON.stringify(data, null, 2));
      }
    } catch (e) {
      // Table doesn't exist, skip
    }
  }

  // Check if quizzes are embedded in sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lessonId);

  console.log('\nLesson sections for backsolving:');
  sections?.forEach(s => {
    console.log(`  - ${s.section_key} (${s.section_type || 'content'})`);
  });

  // Check content for quiz markup
  const { data: allContent } = await supabase
    .from('section_content')
    .select('*')
    .limit(100);

  const quizContent = allContent?.filter(c =>
    c.content?.includes('mastery') ||
    c.content?.includes('quiz') ||
    c.content?.includes('data-answer')
  );

  if (quizContent?.length > 0) {
    console.log(`\n✓ Found ${quizContent.length} content blocks with quiz markup`);
    console.log('Sample quiz content:');
    console.log(quizContent[0]?.content?.substring(0, 500));
  }
}

checkQuizzes().catch(console.error);
