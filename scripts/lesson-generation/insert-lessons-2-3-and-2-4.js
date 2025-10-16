const { supabase } = require('./generate-and-insert-lesson');
const fs = require('fs');

async function executeSQLFile(filepath, lessonKey) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Inserting Lesson ${lessonKey} from ${filepath}`);
  console.log('='.repeat(60));

  const sql = fs.readFileSync(filepath, 'utf8');

  // Extract and execute each INSERT statement
  // This is a simplified parser - extracts VALUES content

  try {
    // Extract lesson metadata
    const metadataMatch = sql.match(/INSERT INTO lesson_metadata.*?VALUES\s*\(\s*'([^']+)'::uuid,\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(\d+),\s*(\d+),\s*(\d+),\s*(true|false)/s);

    if (metadataMatch) {
      const [, id, lesson_key, title, subject, category, difficulty_level, duration_minutes, order_index, is_published] = metadataMatch;

      console.log('→ Inserting lesson metadata...');
      const { error: metaError } = await supabase
        .from('lesson_metadata')
        .insert({
          id,
          lesson_key,
          title,
          subject,
          category,
          difficulty_level: parseInt(difficulty_level),
          duration_minutes: parseInt(duration_minutes),
          order_index: parseInt(order_index),
          is_published: is_published === 'true'
        });

      if (metaError) throw metaError;
      console.log('✓ Lesson metadata inserted');
    }

    // Extract section
    const sectionMatch = sql.match(/INSERT INTO lesson_sections.*?VALUES\s*\(\s*'([^']+)'::uuid,\s*'([^']+)'::uuid,\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(\d+)/s);

    if (sectionMatch) {
      const [, section_id, lesson_id, section_key, section_title, section_type, order_index] = sectionMatch;

      console.log('→ Inserting lesson section...');
      const { error: sectionError } = await supabase
        .from('lesson_sections')
        .insert({
          id: section_id,
          lesson_id,
          section_key,
          title: section_title,
          section_type,
          order_index: parseInt(order_index)
        });

      if (sectionError) throw sectionError;
      console.log('✓ Lesson section inserted');
    }

    // Extract content - this is the tricky part with large HTML
    const contentMatch = sql.match(/INSERT INTO section_content.*?VALUES\s*\(\s*'([^']+)'::uuid,\s*'([^']+)'::uuid,\s*'html',\s*'(.*?)',\s*(\d+)\s*\);/s);

    if (contentMatch) {
      const [, content_id, section_id, content, order_index] = contentMatch;

      console.log('→ Inserting section content...');
      const { error: contentError } = await supabase
        .from('section_content')
        .insert({
          id: content_id,
          section_id,
          content_type: 'html',
          content: content.replace(/''/g, "'"), // Fix escaped quotes
          order_index: parseInt(order_index)
        });

      if (contentError) throw contentError;
      console.log('✓ Section content inserted');
    }

    // Extract quiz
    const quizMatch = sql.match(/INSERT INTO quizzes.*?VALUES\s*\(\s*'([^']+)'::uuid,\s*'([^']+)'::uuid,\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(\d+),\s*(true|false)/s);

    if (quizMatch) {
      const [, quiz_id, lesson_id, quiz_title, intro, quiz_type, position, is_required] = quizMatch;

      console.log('→ Inserting quiz...');
      const { error: quizError } = await supabase
        .from('quizzes')
        .insert({
          id: quiz_id,
          lesson_id,
          title: quiz_title,
          intro,
          quiz_type,
          position: parseInt(position),
          is_required: is_required === 'true'
        });

      if (quizError) throw quizError;
      console.log('✓ Quiz inserted');
    }

    // Extract questions
    const questionMatches = [...sql.matchAll(/INSERT INTO quiz_questions.*?VALUES\s*\('([^']+)'::uuid,\s*'([^']+)'::uuid,\s*'((?:[^']|'')+)',\s*(\d+)\);/gs)];

    console.log(`→ Inserting ${questionMatches.length} quiz questions...`);
    for (const match of questionMatches) {
      const [, question_id, quiz_id, question_text, question_order] = match;

      const { error: qError } = await supabase
        .from('quiz_questions')
        .insert({
          id: question_id,
          quiz_id,
          question_text: question_text.replace(/''/g, "'"),
          question_order: parseInt(question_order)
        });

      if (qError) throw qError;
    }
    console.log('✓ Quiz questions inserted');

    // Extract options - this gets all option sets
    const optionMatches = [...sql.matchAll(/INSERT INTO quiz_options.*?VALUES\s*((?:\([^)]+\),?\s*)+);/gs)];

    let optionCount = 0;
    console.log('→ Inserting quiz options...');

    for (const optionBlock of optionMatches) {
      const optionText = optionBlock[1];
      const individualOptions = [...optionText.matchAll(/\('([^']+)'::uuid,\s*'((?:[^']|'')+)',\s*(true|false|null),\s*(?:'((?:[^']|'')*)'|null),\s*(\d+)\)/g)];

      for (const opt of individualOptions) {
        const [, question_id, option_text, is_correct, explanation, option_order] = opt;

        const { error: optError } = await supabase
          .from('quiz_options')
          .insert({
            question_id,
            option_text: option_text.replace(/''/g, "'"),
            is_correct: is_correct === 'true',
            explanation: explanation ? explanation.replace(/''/g, "'") : null,
            option_order: parseInt(option_order)
          });

        if (optError) throw optError;
        optionCount++;
      }
    }
    console.log(`✓ ${optionCount} quiz options inserted`);

    console.log(`\n✅ Successfully inserted Lesson ${lessonKey}!\n`);
    return true;

  } catch (error) {
    console.error(`\n❌ Error inserting Lesson ${lessonKey}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Starting insertion of lessons 2.3 and 2.4...\n');

  const success23 = await executeSQLFile('./INSERT_LESSON_2_3.sql', '2.3');
  const success24 = await executeSQLFile('./INSERT_LESSON_2_4.sql', '2.4');

  console.log('\n' + '='.repeat(60));
  console.log('INSERTION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Lesson 2.3: ${success23 ? '✅ SUCCESS' : '❌ FAILED'}`);
  console.log(`Lesson 2.4: ${success24 ? '✅ SUCCESS' : '❌ FAILED'}`);
  console.log('='.repeat(60));
}

main();
