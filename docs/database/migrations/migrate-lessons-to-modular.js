/**
 * Migration Script: Convert Large Lesson Content to Modular Structure
 *
 * This script takes existing lessons with huge content blobs and breaks them
 * into smaller, manageable pieces across multiple related tables.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Parse lesson content and extract different types of content
 */
function parseLessonContent(content) {
  if (!content) return null;

  const sections = [];
  const examples = [];
  const concepts = [];
  const tips = [];

  // Try to parse the content if it's HTML or structured text
  const contentString = typeof content === 'string' ? content : JSON.stringify(content);

  // Extract sections based on common patterns
  const sectionMatches = contentString.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/gi) || [];

  sectionMatches.forEach((match, index) => {
    const title = match.replace(/<\/?h[2-3][^>]*>/gi, '');
    sections.push({
      section_key: `section-${index + 1}`,
      title: title,
      section_type: determineS ectionType(title),
      order_index: index
    });
  });

  // Extract examples (look for patterns like "Example:", "Problem:", etc.)
  const exampleMatches = contentString.match(/(?:Example|Problem|Exercise)[\s:]+([^<]+)/gi) || [];

  exampleMatches.forEach((match, index) => {
    examples.push({
      problem_text: match.replace(/^(?:Example|Problem|Exercise)[\s:]+/i, ''),
      difficulty: 1,
      order_index: index
    });
  });

  // Extract key concepts (look for definitions, formulas, etc.)
  const conceptMatches = contentString.match(/(?:Definition|Formula|Key\s+(?:Concept|Idea))[\s:]+([^<]+)/gi) || [];

  conceptMatches.forEach((match, index) => {
    const conceptText = match.replace(/^(?:Definition|Formula|Key\s+(?:Concept|Idea))[\s:]+/i, '');
    concepts.push({
      concept_key: `concept-${index + 1}`,
      concept_title: conceptText.substring(0, 50),
      definition: conceptText,
      order_index: index
    });
  });

  // Extract tips (look for Note:, Tip:, Important:, etc.)
  const tipMatches = contentString.match(/(?:Note|Tip|Important|Warning|Hint)[\s:]+([^<]+)/gi) || [];

  tipMatches.forEach((match, index) => {
    const tipText = match.replace(/^(?:Note|Tip|Important|Warning|Hint)[\s:]+/i, '');
    const tipType = match.match(/^(Note|Tip|Important|Warning|Hint)/i)?.[1]?.toLowerCase() || 'hint';
    tips.push({
      tip_type: tipType === 'important' ? 'warning' : tipType,
      tip_text: tipText,
      order_index: index
    });
  });

  return {
    sections,
    examples,
    concepts,
    tips,
    rawContent: contentString
  };
}

/**
 * Determine section type based on title
 */
function determineSectionType(title) {
  const titleLower = title.toLowerCase();

  if (titleLower.includes('introduction') || titleLower.includes('overview')) {
    return 'introduction';
  }
  if (titleLower.includes('example') || titleLower.includes('problem')) {
    return 'example';
  }
  if (titleLower.includes('practice') || titleLower.includes('exercise')) {
    return 'practice';
  }
  if (titleLower.includes('summary') || titleLower.includes('conclusion')) {
    return 'summary';
  }

  return 'concept';
}

/**
 * Split content into smaller chunks
 */
function splitContentIntoChunks(content, maxChunkSize = 2000) {
  if (!content) return [];

  const contentString = typeof content === 'string' ? content : JSON.stringify(content);
  const chunks = [];

  // Split by paragraphs or sections
  const paragraphs = contentString.split(/\n\n+|<\/p>\s*<p>|<br\s*\/?>\s*<br\s*\/?>/);

  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = paragraph;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Migrate a single lesson to the new structure
 */
async function migrateSingleLesson(lesson) {
  console.log(`Migrating lesson: ${lesson.title}`);

  try {
    // 1. Create lesson metadata
    const { data: metadata, error: metadataError } = await supabase
      .from('lesson_metadata')
      .insert({
        lesson_key: lesson.lesson_key || lesson.id,
        title: lesson.title,
        subject: lesson.subject || 'general',
        category: lesson.category,
        difficulty_level: lesson.difficulty || 1,
        duration_minutes: lesson.duration || 30,
        order_index: lesson.order_index || 0,
        is_published: true
      })
      .select()
      .single();

    if (metadataError) {
      console.error(`Error creating metadata for ${lesson.title}:`, metadataError);
      return false;
    }

    const lessonId = metadata.id;

    // 2. Parse the content
    const parsed = parseLessonContent(lesson.content);

    if (!parsed) {
      console.log(`No content to parse for ${lesson.title}`);
      return true;
    }

    // 3. Create sections
    for (const section of parsed.sections) {
      const { data: sectionData, error: sectionError } = await supabase
        .from('lesson_sections')
        .insert({
          lesson_id: lessonId,
          ...section
        })
        .select()
        .single();

      if (sectionError) {
        console.error(`Error creating section:`, sectionError);
        continue;
      }

      // Add content chunks for this section
      const chunks = splitContentIntoChunks(parsed.rawContent);

      for (let i = 0; i < Math.min(chunks.length, 3); i++) {
        await supabase
          .from('section_content')
          .insert({
            section_id: sectionData.id,
            content_type: 'html',
            content: chunks[i],
            order_index: i
          });
      }
    }

    // 4. Create examples
    for (const example of parsed.examples) {
      await supabase
        .from('lesson_examples')
        .insert({
          lesson_id: lessonId,
          ...example
        });
    }

    // 5. Create concepts
    for (const concept of parsed.concepts) {
      await supabase
        .from('lesson_concepts')
        .insert({
          lesson_id: lessonId,
          ...concept
        });
    }

    // 6. Create tips
    for (const tip of parsed.tips) {
      await supabase
        .from('lesson_tips')
        .insert({
          lesson_id: lessonId,
          ...tip
        });
    }

    // 7. Create default objectives
    const objectives = [
      'Understand the core concepts presented in this lesson',
      'Apply learned techniques to solve problems',
      'Identify common patterns and mistakes'
    ];

    for (let i = 0; i < objectives.length; i++) {
      await supabase
        .from('lesson_objectives')
        .insert({
          lesson_id: lessonId,
          objective_text: objectives[i],
          order_index: i
        });
    }

    console.log(`✓ Successfully migrated lesson: ${lesson.title}`);
    return true;

  } catch (error) {
    console.error(`Error migrating lesson ${lesson.title}:`, error);
    return false;
  }
}

/**
 * Main migration function
 */
async function migrateAllLessons() {
  console.log('Starting lesson migration to modular structure...\n');

  // Fetch all existing lessons
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index');

  if (error) {
    console.error('Error fetching lessons:', error);
    return;
  }

  console.log(`Found ${lessons.length} lessons to migrate\n`);

  let successCount = 0;
  let errorCount = 0;

  // Migrate each lesson
  for (const lesson of lessons) {
    const success = await migrateSingleLesson(lesson);

    if (success) {
      successCount++;
    } else {
      errorCount++;
    }

    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n=== Migration Complete ===');
  console.log(`✓ Successful: ${successCount} lessons`);
  console.log(`✗ Errors: ${errorCount} lessons`);
  console.log('\nYou can now edit lesson content in smaller, manageable pieces!');
}

// Run the migration
migrateAllLessons()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });