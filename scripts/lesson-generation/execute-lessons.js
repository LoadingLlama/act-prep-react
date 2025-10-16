const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function executeSQLFile(filepath) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Executing: ${path.basename(filepath)}`);
  console.log('='.repeat(60));

  const sql = fs.readFileSync(filepath, 'utf8');

  // Split SQL into individual statements (rough split by semicolons)
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('--') && !s.match(/^SELECT.*status/i));

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    if (!statement) continue;

    try {
      // Use Supabase's rpc to execute raw SQL
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement + ';' });

      if (error) {
        console.error(`❌ Error in statement ${i + 1}:`, error.message);
        // Try direct table inserts as fallback
        if (statement.includes('INSERT INTO lesson_metadata')) {
          console.log('Attempting direct lesson_metadata insert...');
          await insertLessonMetadata(statement);
        } else if (statement.includes('INSERT INTO lesson_sections')) {
          console.log('Attempting direct lesson_sections insert...');
          await insertLessonSection(statement);
        } else if (statement.includes('INSERT INTO section_content')) {
          console.log('Attempting direct section_content insert...');
          await insertSectionContent(statement);
        } else if (statement.includes('INSERT INTO quizzes')) {
          console.log('Attempting direct quizzes insert...');
          await insertQuiz(statement);
        } else if (statement.includes('INSERT INTO quiz_questions')) {
          console.log('Attempting direct quiz_questions insert...');
          await insertQuizQuestion(statement);
        } else if (statement.includes('INSERT INTO quiz_options')) {
          console.log('Attempting direct quiz_options insert...');
          await insertQuizOptions(statement);
        }
      } else {
        console.log(`✓ Statement ${i + 1} executed successfully`);
      }
    } catch (err) {
      console.error(`❌ Exception in statement ${i + 1}:`, err.message);
    }
  }

  console.log(`\n✅ Completed: ${path.basename(filepath)}\n`);
}

// Helper functions to parse and insert data
function parseInsertValues(sql) {
  const match = sql.match(/VALUES\s*\((.*)\)/is);
  if (!match) return null;
  const values = match[1];
  return values;
}

async function insertLessonMetadata(sql) {
  // Extract VALUES and parse them
  const valuesMatch = sql.match(/VALUES\s*\((.*?)\)/is);
  if (!valuesMatch) return;

  const parts = valuesMatch[1].split(',').map(p => p.trim());
  const data = {
    id: parts[0].replace(/'/g, '').replace(/::uuid/g, ''),
    lesson_key: parts[1].replace(/'/g, ''),
    title: parts[2].replace(/'/g, ''),
    subject: parts[3].replace(/'/g, ''),
    category: parts[4].replace(/'/g, ''),
    difficulty_level: parseInt(parts[5]),
    duration_minutes: parseInt(parts[6]),
    order_index: parseInt(parts[7]),
    is_published: parts[8] === 'true'
  };

  const { error } = await supabase.from('lesson_metadata').insert(data);
  if (error) console.error('Insert error:', error);
  else console.log('✓ lesson_metadata inserted');
}

async function insertLessonSection(sql) {
  const valuesMatch = sql.match(/VALUES\s*\((.*?)\)/is);
  if (!valuesMatch) return;

  const parts = valuesMatch[1].split(',').map(p => p.trim());
  const data = {
    id: parts[0].replace(/'/g, '').replace(/::uuid/g, ''),
    lesson_id: parts[1].replace(/'/g, '').replace(/::uuid/g, ''),
    section_key: parts[2].replace(/'/g, ''),
    title: parts[3].replace(/'/g, ''),
    section_type: parts[4].replace(/'/g, ''),
    order_index: parseInt(parts[5])
  };

  const { error } = await supabase.from('lesson_sections').insert(data);
  if (error) console.error('Insert error:', error);
  else console.log('✓ lesson_sections inserted');
}

async function insertSectionContent(sql) {
  // This is complex due to HTML content, use regex carefully
  const match = sql.match(/INSERT INTO section_content.*?VALUES\s*\((.*?),\s*'html',\s*'(.*?)',\s*(\d+)\)/is);
  if (!match) {
    console.log('Could not parse section_content, trying alternate method');
    return;
  }

  const ids = match[1].split(',').map(p => p.trim());
  const data = {
    id: ids[0].replace(/'/g, '').replace(/::uuid/g, ''),
    section_id: ids[1].replace(/'/g, '').replace(/::uuid/g, ''),
    content_type: 'html',
    content: match[2],
    order_index: parseInt(match[3])
  };

  const { error } = await supabase.from('section_content').insert(data);
  if (error) console.error('Insert error:', error);
  else console.log('✓ section_content inserted');
}

async function insertQuiz(sql) {
  const valuesMatch = sql.match(/VALUES\s*\((.*?)\)/is);
  if (!valuesMatch) return;

  const parts = valuesMatch[1].split(',').map(p => p.trim());
  const data = {
    id: parts[0].replace(/'/g, '').replace(/::uuid/g, ''),
    lesson_id: parts[1].replace(/'/g, '').replace(/::uuid/g, ''),
    title: parts[2].replace(/'/g, ''),
    intro: parts[3].replace(/'/g, ''),
    quiz_type: parts[4].replace(/'/g, ''),
    position: parseInt(parts[5]),
    is_required: parts[6] === 'true'
  };

  const { error } = await supabase.from('quizzes').insert(data);
  if (error) console.error('Insert error:', error);
  else console.log('✓ quizzes inserted');
}

async function insertQuizQuestion(sql) {
  const valuesMatch = sql.match(/VALUES\s*\((.*?),\s*'(.*?)',\s*(\d+)\)/is);
  if (!valuesMatch) return;

  const ids = valuesMatch[1].split(',').map(p => p.trim());
  const data = {
    id: ids[0].replace(/'/g, '').replace(/::uuid/g, ''),
    quiz_id: ids[1].replace(/'/g, '').replace(/::uuid/g, ''),
    question_text: valuesMatch[2],
    question_order: parseInt(valuesMatch[3])
  };

  const { error } = await supabase.from('quiz_questions').insert(data);
  if (error) console.error('Insert error:', error);
  else console.log('✓ quiz_questions inserted');
}

async function insertQuizOptions(sql) {
  // Parse multiple options from single INSERT statement
  const matches = sql.matchAll(/\('(.*?)',\s*'(.*?)',\s*(true|false|null),\s*(?:'(.*?)'|null),\s*(\d+)\)/g);

  for (const match of matches) {
    const data = {
      question_id: match[1].replace(/::uuid/g, ''),
      option_text: match[2],
      is_correct: match[3] === 'true',
      explanation: match[4] || null,
      option_order: parseInt(match[5])
    };

    const { error } = await supabase.from('quiz_options').insert(data);
    if (error) console.error('Insert quiz_options error:', error);
    else console.log('✓ quiz_option inserted');
  }
}

async function main() {
  const lessonFiles = [
    'INSERT_LESSON_2_2.sql',
    'INSERT_LESSON_2_3.sql',
    'INSERT_LESSON_2_4.sql'
  ].map(f => path.join(__dirname, f));

  for (const file of lessonFiles) {
    if (fs.existsSync(file)) {
      await executeSQLFile(file);
    } else {
      console.log(`⚠️  File not found: ${path.basename(file)}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('ALL LESSONS EXECUTED');
  console.log('='.repeat(60));
}

main().catch(console.error);
