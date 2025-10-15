#!/usr/bin/env node

/**
 * Generate SQL UPDATE statements for all English lessons
 * Updates lesson content in database with PrepPros formatted HTML
 */

import fs from 'fs';
import path from 'path';

console.log('📝 Generating SQL UPDATE Statements...\n');

const lessonsDir = '/Users/cadenchiang/Desktop/act-prep-react/docs/preppros-lessons';
const summary = JSON.parse(fs.readFileSync(`${lessonsDir}/SUMMARY.json`, 'utf-8'));

// SQL escape function
function escapeSql(text) {
  return text.replace(/'/g, "''");
}

// Generate UPDATE SQL for each lesson
let fullSQL = `-- ============================================================
-- UPDATE ENGLISH LESSONS WITH PREPPROS CONTENT
-- Generated: ${new Date().toISOString()}
-- Updates 16 English lessons with full PrepPros textbook content
-- ============================================================

BEGIN;

`;

console.log('Generating SQL for each lesson...\n');

summary.results.forEach((result, index) => {
  const htmlPath = `${lessonsDir}/${result.lessonKey}.html`;
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const escaped = escapeSql(html);

  console.log(`${index + 1}. ${result.lessonKey} (${result.htmlLength} chars)`);

  fullSQL += `-- ============================================================
-- ${result.title}
-- Lesson: ${result.lessonKey}
-- Lesson ID: ${result.lessonId}
-- Content length: ${result.htmlLength} characters
-- ============================================================

-- Delete existing sections and content for this lesson
DELETE FROM section_content
WHERE section_id IN (
  SELECT id FROM lesson_sections WHERE lesson_id = '${result.lessonId}'
);

DELETE FROM lesson_sections WHERE lesson_id = '${result.lessonId}';

-- Insert new section with full content
INSERT INTO lesson_sections (lesson_id, section_key, title, section_type, order_index)
VALUES (
  '${result.lessonId}',
  '${result.lessonKey}-main',
  'Main Content',
  'content',
  0
);

-- Insert content
INSERT INTO section_content (section_id, content_type, content, order_index)
SELECT
  ls.id,
  'html',
  '${escaped}',
  0
FROM lesson_sections ls
WHERE ls.lesson_id = '${result.lessonId}'
  AND ls.section_key = '${result.lessonKey}-main';

-- Update lesson metadata timestamp
UPDATE lesson_metadata
SET updated_at = NOW()
WHERE id = '${result.lessonId}';

`;
});

fullSQL += `
COMMIT;

-- ============================================================
-- VERIFICATION QUERY
-- Check that all lessons were updated
-- ============================================================

SELECT
  lm.lesson_key,
  lm.title,
  COUNT(DISTINCT ls.id) as section_count,
  COUNT(sc.id) as content_count,
  SUM(LENGTH(sc.content)) as total_content_length,
  lm.updated_at
FROM lesson_metadata lm
LEFT JOIN lesson_sections ls ON lm.id = ls.lesson_id
LEFT JOIN section_content sc ON ls.id = sc.section_id
WHERE lm.subject = 'english'
GROUP BY lm.id, lm.lesson_key, lm.title, lm.updated_at
ORDER BY lm.order_index;
`;

// Save SQL file
const sqlPath = '/Users/cadenchiang/Desktop/act-prep-react/UPDATE_ENGLISH_LESSONS.sql';
fs.writeFileSync(sqlPath, fullSQL);

console.log(`\n✅ Generated SQL file: ${sqlPath}`);
console.log(`📊 File size: ${(fs.statSync(sqlPath).size / 1024).toFixed(2)} KB`);
console.log(`\n${'='.repeat(60)}`);
console.log('READY TO EXECUTE');
console.log('='.repeat(60));
console.log('\n📋 Instructions:');
console.log('1. Open Supabase SQL Editor');
console.log('2. Copy the SQL from UPDATE_ENGLISH_LESSONS.sql');
console.log('3. Execute the SQL');
console.log('4. Run the verification query at the end');
console.log('\n⚠️  IMPORTANT: This will replace ALL existing content');
console.log('   Make sure you have a backup if needed!\n');
