/**
 * Fetch Gold Standard Lesson (2.1 Geometry-Angles)
 * This will be our template for all other lessons
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchGoldStandard() {
  console.log('🔍 Fetching gold standard lesson (Math 2.1 - Angles & Lines)...\n');

  // Fetch all math lessons to find the geometry one
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .ilike('subject', 'math');

  if (error) {
    console.error('❌ Error fetching lessons:', error);
    process.exit(1);
  }

  // Find the angles/geometry lesson
  const lesson = lessons?.find(l => l.title.includes('Angles') && l.title.includes('Lines'));

  if (!lesson) {
    console.log('⚠️  Gold standard lesson not found');
    console.log('Available Math lessons:');
    lessons.forEach(l => console.log(`  - ${l.title}`));
    return;
  }

  console.log('✅ Found gold standard lesson:\n');
  console.log(`📖 ${lesson.title}`);
  console.log(`   Subject: ${lesson.subject}`);
  console.log(`   Topic: ${lesson.topic_number}`);
  console.log(`   Examples: ${lesson.examples ? lesson.examples.length : 0}`);
  console.log(`   Quiz ID: ${lesson.quiz_id || 'None'}`);
  console.log();

  // Save to file for reference
  const outputPath = resolve(__dirname, '../GOLD_STANDARD_LESSON.json');
  fs.writeFileSync(outputPath, JSON.stringify(lesson, null, 2));
  console.log(`💾 Saved to: ${outputPath}`);
  console.log();

  // Analyze structure
  console.log('📋 LESSON STRUCTURE:');
  console.log('─'.repeat(80));

  // Count sections
  const contentHtml = lesson.content || '';
  const h3Count = (contentHtml.match(/<h3/g) || []).length;
  const h4Count = (contentHtml.match(/<h4/g) || []).length;
  const blueUnderlines = (contentHtml.match(/style="[^"]*border-bottom:[^"]*2px solid #3b82f6/g) || []).length;
  const redBoxes = (contentHtml.match(/border: 2px solid #dc2626/g) || []).length;

  console.log(`  Sections (h3): ${h3Count}`);
  console.log(`  Subsections (h4): ${h4Count}`);
  console.log(`  Blue underlined terms: ${blueUnderlines}`);
  console.log(`  Red example boxes: ${redBoxes}`);
  console.log(`  Examples: ${lesson.examples ? lesson.examples.length : 0}`);
  console.log(`  Quiz: ${lesson.quiz_id ? 'Yes' : 'No'}`);
  console.log();

  // Format requirements
  console.log('✅ GOLD STANDARD FORMAT REQUIREMENTS:');
  console.log('─'.repeat(80));
  console.log('  1. Blue bold underlines for key terms (with definitions in Supabase)');
  console.log('  2. Multiple bullet points for explanations');
  console.log('  3. Red example boxes with interactive answer choices');
  console.log('  4. Photomath-style solutions (compact, black text, answer at top)');
  console.log('  5. Interactive quiz at the end');
  console.log('  6. ALL data stored in Supabase (no hardcoding)');
  console.log();
}

fetchGoldStandard();
