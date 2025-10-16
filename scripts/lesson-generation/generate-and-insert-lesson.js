const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Insert a complete lesson directly into Supabase
 * @param {Object} lessonData - Complete lesson data structure
 */
async function insertLesson(lessonData) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Inserting: ${lessonData.metadata.title}`);
  console.log('='.repeat(60));

  try {
    // 1. Insert lesson metadata
    console.log('→ Inserting lesson metadata...');
    const { data: metadataResult, error: metadataError } = await supabase
      .from('lesson_metadata')
      .insert(lessonData.metadata)
      .select();

    if (metadataError) {
      console.error('❌ Metadata error:', metadataError.message);
      return false;
    }
    console.log('✓ Lesson metadata inserted');

    // 2. Insert lesson sections
    console.log('→ Inserting lesson sections...');
    for (const section of lessonData.sections) {
      const { error: sectionError } = await supabase
        .from('lesson_sections')
        .insert(section);

      if (sectionError) {
        console.error(`❌ Section error (${section.title}):`, sectionError.message);
        return false;
      }
      console.log(`  ✓ Section: ${section.title}`);

      // 3. Insert section content
      if (lessonData.content[section.id]) {
        for (const content of lessonData.content[section.id]) {
          const { error: contentError } = await supabase
            .from('section_content')
            .insert(content);

          if (contentError) {
            console.error(`❌ Content error:`, contentError.message);
            return false;
          }
        }
        console.log(`  ✓ Content inserted`);
      }
    }

    // 4. Insert quiz (if exists)
    if (lessonData.quiz) {
      console.log('→ Inserting quiz...');
      const { error: quizError } = await supabase
        .from('quizzes')
        .insert(lessonData.quiz);

      if (quizError) {
        console.error('❌ Quiz error:', quizError.message);
        return false;
      }
      console.log('✓ Quiz inserted');

      // 5. Insert quiz questions
      console.log('→ Inserting quiz questions...');
      for (const question of lessonData.questions) {
        const { error: questionError } = await supabase
          .from('quiz_questions')
          .insert(question);

        if (questionError) {
          console.error(`❌ Question error:`, questionError.message);
          return false;
        }

        // 6. Insert quiz options
        const questionOptions = lessonData.options.filter(
          opt => opt.question_id === question.id
        );

        for (const option of questionOptions) {
          const { error: optionError } = await supabase
            .from('quiz_options')
            .insert(option);

          if (optionError) {
            console.error(`❌ Option error:`, optionError.message);
            return false;
          }
        }
      }
      console.log(`✓ ${lessonData.questions.length} questions with options inserted`);
    }

    console.log(`\n✅ Successfully inserted: ${lessonData.metadata.title}\n`);
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    return false;
  }
}

module.exports = { insertLesson, supabase };
