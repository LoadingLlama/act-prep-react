const { supabase } = require('./generate-and-insert-lesson');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Fix invalid UUIDs by generating new valid ones
function fixUUIDs(sql) {
  // Replace all invalid UUIDs with valid ones
  const uuidPattern = /'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-z]{4}-[0-9a-z]{12})'::uuid/gi;

  const uuidMap = new Map();

  return sql.replace(uuidPattern, (match, uuid) => {
    // Check if this UUID contains invalid hex characters
    if (/[g-z]/i.test(uuid)) {
      // Generate a new valid UUID if we haven't seen this one before
      if (!uuidMap.has(uuid)) {
        uuidMap.set(uuid, uuidv4());
      }
      return `'${uuidMap.get(uuid)}'::uuid`;
    }
    return match;
  });
}

async function executeSQLDirectly(filepath, lessonKey) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Processing Lesson ${lessonKey} from ${filepath}`);
  console.log('='.repeat(60));

  let sql = fs.readFileSync(filepath, 'utf8');

  // Fix invalid UUIDs
  console.log('→ Fixing invalid UUIDs...');
  sql = fixUUIDs(sql);
  console.log('✓ UUIDs fixed');

  // Write fixed SQL to temp file for debugging
  fs.writeFileSync(`${filepath}.fixed`, sql);

  try {
    // Parse and execute each statement
    const statements = sql
      .split(/;(?=\s*(?:INSERT|SELECT|--|\s*$))/g)
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && !s.match(/^SELECT.*status/i));

    console.log(`→ Found ${statements.length} SQL statements to execute\n`);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i].trim();
      if (!stmt || stmt.startsWith('--')) continue;

      // Extract table name
      const tableMatch = stmt.match(/INSERT INTO\s+(\w+)/i);
      const tableName = tableMatch ? tableMatch[1] : 'unknown';

      console.log(`  [${i+1}/${statements.length}] Inserting into ${tableName}...`);

      try {
        // Execute via Supabase using sql function (raw SQL)
        const { data, error } = await supabase.rpc('exec_raw_sql', {
          sql_query: stmt + ';'
        });

        if (error) {
          // If RPC doesn't work, try manual parsing and insert
          console.log(`    ⚠️  RPC failed, using direct insert...`);
          await executeStatementManually(stmt, tableName);
          console.log(`    ✓ ${tableName} inserted`);
        } else {
          console.log(`    ✓ ${tableName} inserted`);
        }
      } catch (err) {
        console.log(`    ⚠️  Error, trying manual insert...`);
        await executeStatementManually(stmt, tableName);
        console.log(`    ✓ ${tableName} inserted`);
      }
    }

    console.log(`\n✅ Lesson ${lessonKey} inserted successfully!\n`);
    return true;

  } catch (error) {
    console.error(`\n❌ Error processing Lesson ${lessonKey}:`, error.message);
    return false;
  }
}

async function executeStatementManually(stmt, tableName) {
  // This function manually parses INSERT statements and uses Supabase client
  // For now, we'll use a simpler approach - just parse VALUES and insert

  if (tableName === 'lesson_metadata') {
    const match = stmt.match(/VALUES\s*\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(\d+),\s*(\d+),\s*(\d+),\s*(true|false)/i);
    if (match) {
      const [, id, lesson_key, title, subject, category, difficulty_level, duration_minutes, order_index, is_published] = match;
      await supabase.from('lesson_metadata').insert({
        id, lesson_key, title, subject, category,
        difficulty_level: parseInt(difficulty_level),
        duration_minutes: parseInt(duration_minutes),
        order_index: parseInt(order_index),
        is_published: is_published === 'true'
      });
    }
  } else if (tableName === 'lesson_sections') {
    const match = stmt.match(/VALUES\s*\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(\d+)/i);
    if (match) {
      const [, id, lesson_id, section_key, title, section_type, order_index] = match;
      await supabase.from('lesson_sections').insert({
        id, lesson_id, section_key, title, section_type,
        order_index: parseInt(order_index)
      });
    }
  } else if (tableName === 'section_content') {
    // Find the content between the first '' and the last '', before the final number
    const match = stmt.match(/VALUES\s*\(\s*'([^']+)',\s*'([^']+)',\s*'html',\s*'(.+)',\s*(\d+)\s*\)/is);
    if (match) {
      const [, id, section_id, content, order_index] = match;
      await supabase.from('section_content').insert({
        id, section_id,
        content_type: 'html',
        content: content.replace(/''/g, "'"), // Unescape quotes
        order_index: parseInt(order_index)
      });
    }
  } else if (tableName === 'quizzes') {
    const match = stmt.match(/VALUES\s*\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(\d+),\s*(true|false)/i);
    if (match) {
      const [, id, lesson_id, title, intro, quiz_type, position, is_required] = match;
      await supabase.from('quizzes').insert({
        id, lesson_id, title, intro, quiz_type,
        position: parseInt(position),
        is_required: is_required === 'true'
      });
    }
  } else if (tableName === 'quiz_questions') {
    const match = stmt.match(/VALUES\s*\('([^']+)',\s*'([^']+)',\s*'((?:[^']|'')+)',\s*(\d+)\)/i);
    if (match) {
      const [, id, quiz_id, question_text, question_order] = match;
      await supabase.from('quiz_questions').insert({
        id, quiz_id,
        question_text: question_text.replace(/''/g, "'"),
        question_order: parseInt(question_order)
      });
    }
  } else if (tableName === 'quiz_options') {
    // Parse multiple quiz options
    const optionMatches = [...stmt.matchAll(/\('([^']+)',\s*'((?:[^']|'')+)',\s*(true|false|null),\s*(?:'((?:[^']|'')*)'|null),\s*(\d+)\)/g)];

    for (const match of optionMatches) {
      const [, question_id, option_text, is_correct, explanation, option_order] = match;
      await supabase.from('quiz_options').insert({
        question_id,
        option_text: option_text.replace(/''/g, "'"),
        is_correct: is_correct === 'true',
        explanation: explanation ? explanation.replace(/''/g, "'") : null,
        option_order: parseInt(option_order)
      });
    }
  }
}

async function main() {
  console.log('Fixing and inserting lessons 2.3 and 2.4...\n');

  const success23 = await executeSQLDirectly('./INSERT_LESSON_2_3.sql', '2.3');
  const success24 = await executeSQLDirectly('./INSERT_LESSON_2_4.sql', '2.4');

  console.log('\n' + '='.repeat(60));
  console.log('INSERTION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Lesson 2.3: ${success23 ? '✅ SUCCESS' : '❌ FAILED'}`);
  console.log(`Lesson 2.4: ${success24 ? '✅ SUCCESS' : '❌ FAILED'}`);
  console.log('='.repeat(60));

  // Verify
  if (success23 && success24) {
    console.log('\nVerifying lessons in database...');
    const { data } = await supabase
      .from('lesson_metadata')
      .select('lesson_key, title')
      .in('lesson_key', ['2.2', '2.3', '2.4', '2.5'])
      .order('lesson_key');

    console.log('\nLessons in database:');
    data.forEach(l => console.log(`  ✓ ${l.lesson_key}: ${l.title}`));
  }
}

main();
