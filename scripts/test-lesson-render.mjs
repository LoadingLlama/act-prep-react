#!/usr/bin/env node

/**
 * Test Lesson Rendering
 * Fetches a lesson and checks if HTML renders correctly
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🧪 Testing Lesson Rendering...\n');

async function testLesson(lessonKey) {
  console.log(`📚 Fetching: ${lessonKey}\n`);

  // Fetch lesson metadata
  const { data: lesson, error: metaError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  if (metaError) {
    console.error('❌ Error fetching lesson:', metaError.message);
    return;
  }

  console.log(`✅ Lesson: ${lesson.title}`);
  console.log(`   ID: ${lesson.id}`);
  console.log(`   Subject: ${lesson.subject}`);
  console.log(`   Category: ${lesson.category}\n`);

  // Fetch sections
  const { data: sections, error: sectionsError } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index', { ascending: true });

  if (sectionsError) {
    console.error('❌ Error fetching sections:', sectionsError.message);
    return;
  }

  console.log(`📑 Sections: ${sections.length}\n`);

  // Fetch content
  let fullHTML = '';
  for (const section of sections) {
    const { data: content, error: contentError } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index', { ascending: true });

    if (contentError) {
      console.error('❌ Error fetching content:', contentError.message);
      continue;
    }

    console.log(`  📄 Section: ${section.title}`);
    console.log(`     Content blocks: ${content.length}`);
    console.log(`     Total chars: ${content.reduce((sum, c) => sum + c.content.length, 0).toLocaleString()}\n`);

    const sectionHTML = content.map(c => c.content).join('\n');
    fullHTML += sectionHTML;
  }

  // Check for formatting features
  const hasTipBoxes = fullHTML.includes('💡 TIP:') || fullHTML.includes('background-color: #eff6ff');
  const hasKeyTakeaways = fullHTML.includes('Key Takeaways');
  const hasHighlightedTerms = fullHTML.includes('color: #2563eb; text-decoration: underline;');
  const hasH3Headers = fullHTML.includes('<h3');

  console.log('🔍 Formatting Check:');
  console.log(`   ${hasTipBoxes ? '✅' : '❌'} TIP boxes`);
  console.log(`   ${hasKeyTakeaways ? '✅' : '❌'} Key Takeaways`);
  console.log(`   ${hasHighlightedTerms ? '✅' : '❌'} Highlighted terms`);
  console.log(`   ${hasH3Headers ? '✅' : '❌'} H3 headers\n`);

  // Create test HTML file
  const testHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lesson.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      background-color: #f9fafb;
    }
    .lesson-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .lesson-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
  </style>
</head>
<body>
  <div class="lesson-header">
    <h1>${lesson.title}</h1>
    <p><strong>Subject:</strong> ${lesson.subject} | <strong>Category:</strong> ${lesson.category}</p>
    <p><strong>Duration:</strong> ${lesson.duration_minutes} minutes | <strong>Difficulty:</strong> Level ${lesson.difficulty_level}</p>
  </div>

  <div class="lesson-content">
    ${fullHTML}
  </div>

  <div style="margin-top: 2rem; padding: 1rem; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #22c55e;">
    <p style="margin: 0; color: #166534;"><strong>✅ Lesson loaded successfully from database!</strong></p>
    <p style="margin: 0.5rem 0 0 0; color: #166534; font-size: 14px;">This is a test render to verify HTML formatting.</p>
  </div>
</body>
</html>`;

  const outputPath = '/Users/cadenchiang/Desktop/act-prep-react/TEST_LESSON_RENDER.html';
  fs.writeFileSync(outputPath, testHTML);

  console.log(`✅ Test HTML saved to: TEST_LESSON_RENDER.html`);
  console.log(`📊 Total content: ${fullHTML.length.toLocaleString()} characters\n`);
  console.log(`🌐 Opening in browser...\n`);

  return outputPath;
}

// Test sentence-structure lesson (has TIP boxes)
testLesson('sentence-structure')
  .then(async (outputPath) => {
    if (outputPath) {
      // Also test the app is running
      console.log('🔍 Checking if app is running on localhost:3000...\n');

      try {
        const response = await fetch('http://localhost:3000');
        if (response.ok) {
          console.log('✅ App is running on http://localhost:3000');
          console.log('📖 You can view lessons in the app now!\n');
          console.log('To test the enhanced lesson:');
          console.log('  1. Open http://localhost:3000 in your browser');
          console.log('  2. Navigate to English lessons');
          console.log('  3. Select "Topic 1.1 - Building Complete Sentences"');
          console.log('  4. You should see TIP boxes and Key Takeaways!\n');
        }
      } catch (err) {
        console.log('⚠️  App may not be running. Start it with: npm start\n');
      }

      // Open test file
      console.log('🚀 Opening test HTML file in browser...');
      const { exec } = await import('child_process');
      exec(`open "${outputPath}"`);
    }
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });
