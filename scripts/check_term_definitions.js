/**
 * Script to check lesson_term_definitions table in Supabase
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTermDefinitions() {
  console.log('\n🔍 Checking lesson_term_definitions table...\n');

  // Lesson keys we're checking
  const lessonKeys = [
    'sentence-structure',
    'verbs',
    'pronouns',
    'modifiers',
    'parallel-structure',
    'punctuation',
    'commas',
    'misc-topics',
    'grammar-review',
    'redundancy',
    'word-choice',
    'transitions',
    'which-choice',
    'adding-deleting',
    'logical-placement'
  ];

  try {
    // Get all term definitions
    const { data: allTerms, error: allError } = await supabase
      .from('lesson_term_definitions')
      .select('*');

    if (allError) {
      console.error('❌ Error querying database:', allError.message);
      return;
    }

    console.log(`✅ Total terms in database: ${allTerms ? allTerms.length : 0}\n`);

    if (!allTerms || allTerms.length === 0) {
      console.log('⚠️  NO TERMS FOUND IN DATABASE!\n');
      console.log('This is why tooltips are not working. The database is empty.\n');
      return;
    }

    // Group by lesson_key
    const termsByLesson = {};
    allTerms.forEach(term => {
      const key = term.lesson_key || 'null';
      if (!termsByLesson[key]) {
        termsByLesson[key] = [];
      }
      termsByLesson[key].push(term.term);
    });

    console.log('📊 Terms grouped by lesson_key:\n');
    Object.keys(termsByLesson).sort().forEach(lessonKey => {
      console.log(`  ${lessonKey}:`);
      console.log(`    - ${termsByLesson[lessonKey].length} terms`);
      console.log(`    - ${termsByLesson[lessonKey].slice(0, 5).join(', ')}${termsByLesson[lessonKey].length > 5 ? '...' : ''}\n`);
    });

    // Check which lesson keys are missing
    console.log('\n🔎 Checking for missing lesson keys:\n');
    lessonKeys.forEach(key => {
      if (!termsByLesson[key] && !termsByLesson['null']) {
        console.log(`  ❌ "${key}" - NO TERMS FOUND`);
      } else if (termsByLesson[key]) {
        console.log(`  ✅ "${key}" - ${termsByLesson[key].length} terms`);
      } else if (termsByLesson['null']) {
        console.log(`  ⚠️  "${key}" - No specific terms, but ${termsByLesson['null'].length} global terms available`);
      }
    });

    // Show sample terms
    console.log('\n📝 Sample terms from database:\n');
    allTerms.slice(0, 10).forEach(term => {
      console.log(`  - "${term.term}" (lesson: ${term.lesson_key || 'global'})`);
      console.log(`    Definition: ${term.definition.substring(0, 80)}...`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkTermDefinitions();
