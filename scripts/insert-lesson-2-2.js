import { supabaseUrl, supabaseServiceKey } from './config.mjs';
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// supabaseUrl imported from config.mjs
// supabaseServiceKey imported from config.mjs

async function insertLesson() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    console.log('Connecting to Supabase...');

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '..', 'INSERT_LESSON_2_2.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Executing SQL script...');

    // Use rpc to execute raw SQL (if available) or use individual inserts
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // If RPC doesn't exist, we'll do individual inserts
      console.log('RPC not available, using direct inserts...');
      await insertDirectly(supabase);
    } else {
      console.log('✓ Lesson 2.2 inserted successfully!');
      console.log('Result:', data);
    }

  } catch (error) {
    console.error('Error inserting lesson:', error.message);
    console.error('Details:', error);
    process.exit(1);
  }
}

async function insertDirectly(supabase) {
  // Insert lesson metadata
  const { data: lessonData, error: lessonError } = await supabase
    .from('lesson_metadata')
    .insert({
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      lesson_key: '2.2',
      title: 'Topic 2.2 - Areas, Volumes & Triangles',
      subject: 'math',
      category: 'Geometry',
      difficulty_level: 2,
      duration_minutes: 45,
      order_index: 22,
      is_published: true
    })
    .select();

  if (lessonError) throw lessonError;
  console.log('✓ Lesson metadata inserted');

  // Insert lesson section
  const { data: sectionData, error: sectionError } = await supabase
    .from('lesson_sections')
    .insert({
      id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      lesson_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      section_key: '2.2-main',
      title: 'Main Content',
      section_type: 'content',
      order_index: 0
    })
    .select();

  if (sectionError) throw sectionError;
  console.log('✓ Lesson section inserted');

  // Read the HTML content from the separate file
  const htmlContent = fs.readFileSync(path.join(__dirname, 'lesson-2-2-content.html'), 'utf8');

  // Insert section content
  const { data: contentData, error: contentError } = await supabase
    .from('section_content')
    .insert({
      id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
      section_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      content_type: 'html',
      content: htmlContent,
      order_index: 0
    })
    .select();

  if (contentError) throw contentError;
  console.log('✓ Section content inserted');

  console.log('✓ Lesson 2.2 inserted successfully via direct inserts!');
}

insertLesson();
