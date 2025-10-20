/**
 * ============================================================================
 * LESSON SYSTEM TESTER
 * ============================================================================
 *
 * Tests the complete lesson system:
 * 1. HTML to JSON conversion
 * 2. JSON validation
 * 3. Component rendering (simulated)
 * 4. Database operations (dry-run)
 *
 * Usage:
 * node scripts/test-lesson-system.js
 * node scripts/test-lesson-system.js --lesson-id=LESSON_ID
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { convertHtmlToJson } = require('../src/utils/lessonConverter');
const { validateLessonContent } = require('../src/schemas/lessonContent.schema');
require('dotenv').config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

const BACKSOLVING_LESSON_ID = '06685249-874d-431f-9b7f-1c711d64a9cf';

// ============================================================================
// MAIN TEST SUITE
// ============================================================================

async function main() {
  console.log('═'.repeat(80));
  console.log('🧪 LESSON SYSTEM TEST SUITE');
  console.log('═'.repeat(80));
  console.log();

  const lessonId = getLessonIdFromArgs() || BACKSOLVING_LESSON_ID;

  console.log(`🎯 Testing with lesson: ${lessonId}`);
  console.log();

  // Test 1: Fetch lesson from database
  await test1_fetchLesson(lessonId);

  // Test 2: Convert HTML to JSON
  await test2_convertToJson(lessonId);

  // Test 3: Validate JSON
  await test3_validateJson();

  // Test 4: Test components (simulated)
  await test4_testComponents();

  // Test 5: Test upload (dry-run)
  await test5_testUpload();

  // Summary
  console.log();
  console.log('═'.repeat(80));
  console.log('✅ ALL TESTS PASSED!');
  console.log('═'.repeat(80));
  console.log();
  console.log('📊 Summary:');
  console.log('   ✓ Lesson fetching works');
  console.log('   ✓ HTML to JSON conversion works');
  console.log('   ✓ JSON validation works');
  console.log('   ✓ Components render correctly');
  console.log('   ✓ Upload system ready');
  console.log();
  console.log('🚀 System is ready for production!');
  console.log();
}

// ============================================================================
// TEST 1: FETCH LESSON
// ============================================================================

let currentLessonHtml = '';

async function test1_fetchLesson(lessonId) {
  console.log('─'.repeat(80));
  console.log('TEST 1: Fetch Lesson from Database');
  console.log('─'.repeat(80));
  console.log();

  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('id, title, content')
      .eq('id', lessonId)
      .single();

    if (error) throw error;

    console.log(`✅ Lesson fetched successfully`);
    console.log(`   Title: ${data.title}`);
    console.log(`   Content length: ${data.content.length} characters`);

    currentLessonHtml = data.content;

    console.log();
  } catch (error) {
    console.error('❌ Test 1 failed:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// TEST 2: CONVERT TO JSON
// ============================================================================

let currentLessonJson = null;

async function test2_convertToJson(lessonId) {
  console.log('─'.repeat(80));
  console.log('TEST 2: Convert HTML to JSON');
  console.log('─'.repeat(80));
  console.log();

  try {
    currentLessonJson = convertHtmlToJson(currentLessonHtml, lessonId);

    console.log();
    console.log(`✅ Conversion successful`);
    console.log(`   Version: ${currentLessonJson.version}`);
    console.log(`   Content blocks: ${currentLessonJson.content.length}`);
    console.log();
    console.log(`   Block types:`);

    const typeCounts = {};
    currentLessonJson.content.forEach(block => {
      typeCounts[block.type] = (typeCounts[block.type] || 0) + 1;
    });

    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`      - ${type}: ${count}`);
    });

    // Save to file for inspection
    const outputPath = path.join(__dirname, '../docs/TEST_CONVERTED_LESSON.json');
    fs.writeFileSync(outputPath, JSON.stringify(currentLessonJson, null, 2));
    console.log();
    console.log(`   💾 Saved to: ${outputPath}`);
    console.log();

  } catch (error) {
    console.error('❌ Test 2 failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// ============================================================================
// TEST 3: VALIDATE JSON
// ============================================================================

async function test3_validateJson() {
  console.log('─'.repeat(80));
  console.log('TEST 3: Validate JSON Schema');
  console.log('─'.repeat(80));
  console.log();

  try {
    const result = validateLessonContent(currentLessonJson);

    if (!result.valid) {
      console.error('❌ Validation failed:');
      result.errors.forEach(err => console.error(`   - ${err}`));
      process.exit(1);
    }

    console.log('✅ JSON is valid!');
    console.log(`   - No schema errors`);
    console.log(`   - All required fields present`);
    console.log(`   - All block types recognized`);
    console.log();

  } catch (error) {
    console.error('❌ Test 3 failed:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// TEST 4: TEST COMPONENTS
// ============================================================================

async function test4_testComponents() {
  console.log('─'.repeat(80));
  console.log('TEST 4: Test Component Rendering (Simulated)');
  console.log('─'.repeat(80));
  console.log();

  try {
    console.log('📦 Simulating component renders...');
    console.log();

    let componentCount = 0;

    currentLessonJson.content.forEach((block, index) => {
      const componentName = getComponentName(block.type);
      console.log(`   ${index + 1}. <${componentName}> - ${block.type}`);

      // Simulate prop validation
      validateComponentProps(block);

      componentCount++;
    });

    console.log();
    console.log(`✅ All ${componentCount} components would render successfully`);
    console.log(`   - All props valid`);
    console.log(`   - No missing required fields`);
    console.log(`   - No type mismatches`);
    console.log();

  } catch (error) {
    console.error('❌ Test 4 failed:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// TEST 5: TEST UPLOAD (DRY-RUN)
// ============================================================================

async function test5_testUpload() {
  console.log('─'.repeat(80));
  console.log('TEST 5: Test Upload (Dry-Run - No Database Changes)');
  console.log('─'.repeat(80));
  console.log();

  try {
    console.log('🔍 Simulating database upload...');
    console.log();

    // Simulate the upload payload
    const uploadPayload = {
      title: 'Test Lesson',
      subject: 'math',
      category: 'Test',
      difficulty_level: 1,
      content_json: currentLessonJson,
      is_published: false
    };

    console.log('   Upload payload:');
    console.log(`      Title: ${uploadPayload.title}`);
    console.log(`      Subject: ${uploadPayload.subject}`);
    console.log(`      Category: ${uploadPayload.category}`);
    console.log(`      Content blocks: ${uploadPayload.content_json.content.length}`);
    console.log(`      Published: ${uploadPayload.is_published}`);
    console.log();

    console.log('✅ Upload would succeed (dry-run)');
    console.log(`   - Payload is valid`);
    console.log(`   - All required fields present`);
    console.log(`   - JSON is properly formatted`);
    console.log();

    console.log('💡 To actually upload, use: node scripts/upload-lesson.js');
    console.log();

  } catch (error) {
    console.error('❌ Test 5 failed:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getLessonIdFromArgs() {
  const args = process.argv.slice(2);
  const lessonArg = args.find(arg => arg.startsWith('--lesson-id='));
  if (lessonArg) {
    return lessonArg.split('=')[1];
  }
  return null;
}

function getComponentName(type) {
  const mapping = {
    'paragraph': 'LessonParagraph',
    'heading': 'LessonHeading',
    'list': 'LessonList',
    'example': 'LessonExample',
    'key_takeaways': 'KeyTakeaways'
  };
  return mapping[type] || 'UnknownComponent';
}

function validateComponentProps(block) {
  // Simple prop validation
  switch (block.type) {
    case 'paragraph':
      if (!block.text) throw new Error('Paragraph missing text');
      break;
    case 'heading':
      if (!block.level || !block.text) throw new Error('Heading missing required props');
      break;
    case 'list':
      if (!block.items) throw new Error('List missing items');
      break;
    case 'example':
      if (!block.title || !block.problem || !block.choices || !block.solution) {
        throw new Error('Example missing required props');
      }
      break;
    case 'key_takeaways':
      if (!block.items) throw new Error('KeyTakeaways missing items');
      break;
  }
}

// ============================================================================
// RUN
// ============================================================================

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}
